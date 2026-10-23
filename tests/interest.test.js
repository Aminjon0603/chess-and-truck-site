// Notify Me / interest list tests: validation, consent, duplicates, verification,
// rate limits, unsubscribe, generic responses, fail-closed behavior, the
// Supabase REST client, and the database migration's access rules.
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { readFileSync } from "node:fs";
import { validateInterestRequest, INTEREST_CONSENT_VERSION } from "../src/lib/interestValidation.js";
import {
  createInterestHandler,
  getPreviewOrigins,
  CONFIRMED_MESSAGE,
  GENERIC_SUBSCRIBE_MESSAGE,
  INTEREST_LIMITS,
  INVALID_CONFIRM_MESSAGE,
  UNSUBSCRIBED_MESSAGE,
} from "../api/_lib/interestService.js";
import { createUnsubscribeToken, hashToken, verifyUnsubscribeToken } from "../api/_lib/interestTokens.js";
import {
  createSupabaseInterestStore,
  DuplicateSignupError,
  getSupabaseConfig,
} from "../api/_lib/supabaseInterestStore.js";
import interestEndpoint from "../api/interest.js";

const SITE = "https://chessandtruck.test";
const SECRET = "test-secret-".padEnd(48, "x");
const results = [];
const test = async (name, fn) => {
  await fn();
  results.push(name);
};

globalThis.fetch = async (url) => {
  throw new Error(`Unexpected network call in tests: ${url}`);
};

// In-memory stand-in for the Supabase table, with the same unique rule.
const createMemoryStore = () => {
  const rows = new Map();
  const limits = new Map();
  const store = {
    rows,
    failNext: false,
    async findByEmailAndProgram(email, programId) {
      return [...rows.values()].find((row) => row.email === email && row.program_id === programId) || null;
    },
    async findById(id) {
      return rows.get(id) || null;
    },
    async findByConfirmTokenHash(hash) {
      return [...rows.values()].find((row) => row.confirm_token_hash === hash) || null;
    },
    async insert(row) {
      if (store.failNext) {
        store.failNext = false;
        throw new Error("database unavailable");
      }
      if ([...rows.values()].some((item) => item.email === row.email && item.program_id === row.program_id)) {
        throw new DuplicateSignupError("duplicate");
      }
      const saved = { id: crypto.randomUUID(), confirmed_at: null, unsubscribed_at: null, ...row };
      rows.set(saved.id, saved);
      return saved;
    },
    async update(id, patch) {
      const saved = { ...rows.get(id), ...patch };
      rows.set(id, saved);
      return saved;
    },
    async consumeRateLimit(key, limit) {
      if (store.rateLimitDown) {
        throw new Error("rate limiter unavailable");
      }
      const hits = (limits.get(key) || 0) + 1;
      limits.set(key, hits);
      return hits <= limit;
    },
  };
  return store;
};

const setup = ({ now = new Date("2026-10-23T12:00:00Z"), emailOk = true, configured = true, extraOrigins } = {}) => {
  const store = createMemoryStore();
  const emails = [];
  const clock = { now };
  const handler = createInterestHandler({
    store: configured ? store : null,
    sendEmail: async (message) => {
      emails.push(message);
      if (emailOk === "throw") throw new Error("smtp down");
      return { ok: emailOk };
    },
    siteUrl: SITE,
    extraOrigins,
    tokenSecret: SECRET,
    emailConfigured: true,
    now: () => clock.now,
    log: () => {},
  });
  return { store, emails, clock, handler };
};

let ipCounter = 0;
const post = (handler, body, { ip, origin = SITE, raw } = {}) =>
  handler(
    new Request(`${SITE}/api/interest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-forwarded-for": ip || `203.0.113.${(ipCounter += 1) % 250}`,
        ...(origin ? { origin } : {}),
      },
      body: raw ?? JSON.stringify(body),
    })
  );

const subscribeBody = (overrides = {}) => ({
  action: "subscribe",
  email: "Parent@Example.com ",
  programId: "camps",
  consent: true,
  website: "",
  ...overrides,
});

const tokenFromEmail = (message, kind) => {
  const match = message.text.match(new RegExp(`/interest/${kind}\\?token=([^\\s]+)`));
  return match ? match[1] : null;
};

const run = async () => {
  // ---------------------------------------------------------- validation
  await test("validation rejects bad emails, unknown programs, and missing consent", async () => {
    for (const email of ["", "not-an-email", "a@b", "a b@example.com", `${"x".repeat(250)}@example.com`, "a@exa\u0007mple.com", "a@exa\nmple.com"]) {
      assert.equal(validateInterestRequest({ email, programId: "camps", consent: true }).ok, false, email);
    }
    assert.equal(validateInterestRequest({ email: "a@example.com", programId: "chess", consent: true }).ok, false);
    for (const consent of [false, "true", 1, "yes", undefined]) {
      const result = validateInterestRequest({ email: "a@example.com", programId: "dojo", consent });
      assert.equal(result.ok, false);
      assert.ok(result.errors.consent);
    }
    const ok = validateInterestRequest({ email: "  A@Example.COM ", programId: "afterSchool", consent: true });
    assert.equal(ok.ok, true);
    assert.equal(ok.value.email, "a@example.com");
  });

  await test("the endpoint rejects invalid input without storing anything", async () => {
    const { handler, store, emails } = setup();
    const response = await post(handler, subscribeBody({ consent: "true" }));
    assert.equal(response.status, 400);
    assert.equal(store.rows.size, 0);
    assert.equal(emails.length, 0);
  });

  await test("only email, program, consent, and status data are stored", async () => {
    const { handler, store } = setup();
    await post(handler, subscribeBody({ childName: "Kid", age: 9, rating: 1200, medical: "none" }));
    const [row] = [...store.rows.values()];
    assert.deepEqual(Object.keys(row).sort(), [
      "confirm_token_expires_at",
      "confirm_token_hash",
      "confirmation_sent_at",
      "confirmed_at",
      "consent_at",
      "consent_version",
      "email",
      "id",
      "program_id",
      "status",
      "unsubscribed_at",
    ]);
    assert.equal(row.email, "parent@example.com");
    assert.equal(row.status, "pending");
    assert.equal(row.consent_version, INTEREST_CONSENT_VERSION);
    assert.equal(row.consent_at, "2026-10-23T12:00:00.000Z");
  });

  // ----------------------------------------------------------- subscribe
  await test("a new signup is pending and gets one confirmation email", async () => {
    const { handler, store, emails } = setup();
    const response = await post(handler, subscribeBody());
    assert.equal(response.status, 202);
    assert.equal((await response.json()).message, GENERIC_SUBSCRIBE_MESSAGE);
    assert.equal(emails.length, 1);
    assert.deepEqual(emails[0].to, ["parent@example.com"]);
    const confirmToken = tokenFromEmail(emails[0], "confirm");
    const unsubscribeToken = tokenFromEmail(emails[0], "unsubscribe");
    assert.ok(confirmToken && unsubscribeToken);
    const [row] = [...store.rows.values()];
    assert.equal(row.confirm_token_hash, hashToken(confirmToken));
    assert.ok(!JSON.stringify(row).includes(confirmToken), "raw token is not stored");
  });

  await test("responses are identical for new, pending, confirmed, and spam requests", async () => {
    const { handler, emails } = setup();
    const first = await (await post(handler, subscribeBody())).json();
    const pending = await (await post(handler, subscribeBody())).json();
    const token = tokenFromEmail(emails[0], "confirm");
    await post(handler, { action: "confirm", token });
    const confirmed = await (await post(handler, subscribeBody())).json();
    const spam = await (await post(handler, subscribeBody({ website: "http://spam.example" }))).json();
    assert.deepEqual(first, pending);
    assert.deepEqual(first, confirmed);
    assert.deepEqual(first, spam);
  });

  await test("duplicates are prevented and the honeypot stores nothing", async () => {
    const { handler, store, emails } = setup();
    await post(handler, subscribeBody());
    await post(handler, subscribeBody({ email: "PARENT@example.com" }));
    assert.equal(store.rows.size, 1);
    assert.equal(emails.length, 1, "no second email inside the cooldown");

    const spam = setup();
    await post(spam.handler, subscribeBody({ website: "x" }));
    assert.equal(spam.store.rows.size, 0);
    assert.equal(spam.emails.length, 0);
  });

  await test("one email can follow several programs", async () => {
    const { handler, store } = setup();
    for (const programId of ["camps", "tournaments", "dojo"]) {
      await post(handler, subscribeBody({ programId }));
    }
    assert.equal(store.rows.size, 3);
  });

  await test("a parallel duplicate insert still returns the generic reply", async () => {
    const { handler, store } = setup();
    const original = store.findByEmailAndProgram;
    await post(handler, subscribeBody());
    store.findByEmailAndProgram = async () => null; // simulate a race
    const response = await post(handler, subscribeBody());
    store.findByEmailAndProgram = original;
    assert.equal(response.status, 202);
    assert.equal(store.rows.size, 1);
  });

  await test("after the cooldown a pending signup gets a fresh link and the old one stops working", async () => {
    const { handler, emails, clock } = setup();
    await post(handler, subscribeBody());
    const oldToken = tokenFromEmail(emails[0], "confirm");
    clock.now = new Date(clock.now.getTime() + (INTEREST_LIMITS.resendCooldownMinutes + 1) * 60 * 1000);
    await post(handler, subscribeBody());
    assert.equal(emails.length, 2);
    const oldResult = await post(handler, { action: "confirm", token: oldToken });
    assert.equal(oldResult.status, 400);
    const newResult = await post(handler, { action: "confirm", token: tokenFromEmail(emails[1], "confirm") });
    assert.equal(newResult.status, 200);
  });

  await test("an email delivery failure still returns the generic reply", async () => {
    for (const emailOk of [false, "throw"]) {
      const { handler, store } = setup({ emailOk });
      const response = await post(handler, subscribeBody());
      assert.equal(response.status, 202);
      assert.equal((await response.json()).message, GENERIC_SUBSCRIBE_MESSAGE);
      assert.equal([...store.rows.values()][0].status, "pending");
    }
  });

  // -------------------------------------------------------- verification
  await test("a subscription is confirmed only through the emailed link", async () => {
    const { handler, store, emails, clock } = setup();
    await post(handler, subscribeBody());
    const [row] = [...store.rows.values()];
    assert.equal(row.status, "pending");
    assert.equal(row.confirmed_at, null);

    const token = tokenFromEmail(emails[0], "confirm");
    clock.now = new Date(clock.now.getTime() + 60 * 1000);
    const response = await post(handler, { action: "confirm", token });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).message, CONFIRMED_MESSAGE);
    const confirmed = store.rows.get(row.id);
    assert.equal(confirmed.status, "confirmed");
    assert.equal(confirmed.confirmed_at, "2026-10-23T12:01:00.000Z");
    assert.equal(confirmed.confirm_token_hash, null);
  });

  await test("confirmation links are single use and expire", async () => {
    const { handler, emails, clock } = setup();
    await post(handler, subscribeBody());
    const token = tokenFromEmail(emails[0], "confirm");
    assert.equal((await post(handler, { action: "confirm", token })).status, 200);
    const reuse = await post(handler, { action: "confirm", token });
    assert.equal(reuse.status, 400);
    assert.equal((await reuse.json()).error, INVALID_CONFIRM_MESSAGE);

    const second = setup();
    await post(second.handler, subscribeBody());
    second.clock.now = new Date(second.clock.now.getTime() + (INTEREST_LIMITS.confirmTokenHours + 1) * 60 * 60 * 1000);
    const expired = await post(second.handler, { action: "confirm", token: tokenFromEmail(second.emails[0], "confirm") });
    assert.equal(expired.status, 400);
    void clock;
  });

  await test("made-up or malformed confirmation tokens are rejected", async () => {
    const { handler } = setup();
    for (const token of ["", "abc", crypto.randomBytes(32).toString("base64url"), { $ne: null }, null]) {
      const response = await post(handler, { action: "confirm", token });
      assert.equal(response.status, 400);
    }
  });

  // ---------------------------------------------------------- unsubscribe
  await test("unsubscribe works, is generic, and blocks a pending confirmation", async () => {
    const { handler, store, emails } = setup();
    await post(handler, subscribeBody());
    const [row] = [...store.rows.values()];
    const response = await post(handler, { action: "unsubscribe", token: tokenFromEmail(emails[0], "unsubscribe") });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).message, UNSUBSCRIBED_MESSAGE);
    assert.equal(store.rows.get(row.id).status, "unsubscribed");
    assert.ok(store.rows.get(row.id).unsubscribed_at);

    const confirmAfter = await post(handler, { action: "confirm", token: tokenFromEmail(emails[0], "confirm") });
    assert.equal(confirmAfter.status, 400);
  });

  await test("forged unsubscribe links change nothing but get the same reply", async () => {
    const { handler, store } = setup();
    await post(handler, subscribeBody());
    const [row] = [...store.rows.values()];
    const forged = createUnsubscribeToken(row.id, "a-different-secret-".padEnd(40, "y"));
    const response = await post(handler, { action: "unsubscribe", token: forged });
    assert.equal(response.status, 200);
    assert.equal((await response.json()).message, UNSUBSCRIBED_MESSAGE);
    assert.equal(store.rows.get(row.id).status, "pending");
    assert.equal(verifyUnsubscribeToken(`${row.id}.tampered`, SECRET), null);
    assert.equal(verifyUnsubscribeToken(createUnsubscribeToken(row.id, SECRET), SECRET), row.id);
  });

  await test("signing up again after unsubscribing needs a new confirmation", async () => {
    const { handler, store, emails, clock } = setup();
    await post(handler, subscribeBody());
    await post(handler, { action: "confirm", token: tokenFromEmail(emails[0], "confirm") });
    await post(handler, { action: "unsubscribe", token: tokenFromEmail(emails[0], "unsubscribe") });
    clock.now = new Date(clock.now.getTime() + 60 * 60 * 1000);
    await post(handler, subscribeBody());
    const [row] = [...store.rows.values()];
    assert.equal(row.status, "pending");
    assert.equal(emails.length, 2);
  });

  // ---------------------------------------------------------- rate limits
  await test("subscribe requests are rate limited per IP and per email", async () => {
    const ipTest = setup();
    let lastStatus;
    for (let index = 0; index <= INTEREST_LIMITS.subscribePerIpPerHour; index += 1) {
      lastStatus = (await post(ipTest.handler, subscribeBody({ email: `p${index}@example.com` }), { ip: "198.51.100.7" })).status;
    }
    assert.equal(lastStatus, 429);

    const emailTest = setup();
    for (let index = 0; index <= INTEREST_LIMITS.subscribePerEmailPerHour; index += 1) {
      lastStatus = (await post(emailTest.handler, subscribeBody())).status;
    }
    assert.equal(lastStatus, 429);
  });

  await test("confirm and unsubscribe requests are rate limited per IP", async () => {
    const { handler } = setup();
    let lastStatus;
    for (let index = 0; index <= INTEREST_LIMITS.actionsPerIpPerHour; index += 1) {
      lastStatus = (await post(handler, { action: "confirm", token: "x" }, { ip: "198.51.100.9" })).status;
    }
    assert.equal(lastStatus, 429);
  });

  await test("rate-limit keys never contain the raw IP or email", async () => {
    const keys = [];
    const { handler, store } = setup();
    const original = store.consumeRateLimit;
    store.consumeRateLimit = async (key, ...rest) => {
      keys.push(key);
      return original(key, ...rest);
    };
    await post(handler, subscribeBody(), { ip: "192.0.2.55" });
    assert.equal(keys.length, 2);
    keys.forEach((key) => {
      assert.match(key, /^[a-z]+:[0-9a-f]{64}$/);
      assert.ok(!key.includes("192.0.2.55") && !key.includes("parent"));
    });
  });

  // -------------------------------------------------------- fail closed
  await test("an unconfigured backend returns 503 and stores nothing", async () => {
    const { handler } = setup({ configured: false });
    const response = await post(handler, subscribeBody());
    assert.equal(response.status, 503);
    const status = await handler(new Request(`${SITE}/api/interest`));
    assert.deepEqual((await status.json()).enabled, false);

    process.env.SUPABASE_URL = "";
    const live = await interestEndpoint.fetch(
      new Request(`${SITE}/api/interest`, { method: "POST", body: JSON.stringify(subscribeBody()) })
    );
    assert.equal(live.status, 503);
  });

  await test("database and rate-limiter failures fail closed with a generic error", async () => {
    const down = setup();
    down.store.rateLimitDown = true;
    const response = await post(down.handler, subscribeBody());
    assert.equal(response.status, 503);
    assert.equal(down.store.rows.size, 0);

    const dbDown = setup();
    dbDown.store.failNext = true;
    const insertFail = await post(dbDown.handler, subscribeBody());
    assert.equal(insertFail.status, 503);
    assert.equal(dbDown.emails.length, 0);
  });

  await test("cross-site, oversized, and malformed requests are rejected", async () => {
    const { handler, store } = setup();
    assert.equal((await post(handler, subscribeBody(), { origin: "https://evil.example" })).status, 403);
    assert.equal((await post(handler, null, { raw: "{" })).status, 400);
    assert.equal((await post(handler, null, { raw: "[1,2]" })).status, 400);
    assert.equal((await post(handler, null, { raw: JSON.stringify(subscribeBody({ email: "a".repeat(3000) })) })).status, 413);
    assert.equal((await post(handler, { action: "drop-table" })).status, 400);
    assert.equal(store.rows.size, 0);
  });

  await test("Preview trusts only its own Vercel URLs; Production trusts only SITE_URL", async () => {
    const env = {
      VERCEL_ENV: "preview",
      VERCEL_URL: "site-abc123-team.vercel.app",
      VERCEL_BRANCH_URL: "site-git-redesign-team.vercel.app",
    };
    assert.deepEqual(getPreviewOrigins(env), ["https://site-abc123-team.vercel.app", "https://site-git-redesign-team.vercel.app"]);
    assert.deepEqual(getPreviewOrigins({ ...env, VERCEL_ENV: "production" }), []);
    assert.deepEqual(getPreviewOrigins({ ...env, VERCEL_ENV: undefined }), []);
    assert.deepEqual(getPreviewOrigins({ VERCEL_ENV: "preview", VERCEL_URL: "evil.example", VERCEL_BRANCH_URL: "x.vercel.app.evil.example" }), []);
    assert.deepEqual(getPreviewOrigins({ VERCEL_ENV: "preview", VERCEL_URL: "a.vercel.app/path" }), []);

    const { handler, store } = setup({ extraOrigins: getPreviewOrigins(env) });
    assert.equal((await post(handler, subscribeBody({ email: "a@example.com" }), { origin: "https://site-abc123-team.vercel.app" })).status, 202);
    assert.equal((await post(handler, subscribeBody({ email: "b@example.com" }), { origin: "https://site-git-redesign-team.vercel.app" })).status, 202);
    assert.equal((await post(handler, subscribeBody({ email: "c@example.com" }))).status, 202);
    assert.equal((await post(handler, subscribeBody({ email: "d@example.com" }), { origin: "https://other-team.vercel.app" })).status, 403);
    assert.equal((await post(handler, subscribeBody({ email: "e@example.com" }), { origin: "http://site-abc123-team.vercel.app" })).status, 403);
    assert.equal(store.rows.size, 3);
  });

  // ------------------------------------------------- Supabase REST client
  await test("the Supabase client keeps the key server-side and writes only allowed columns", async () => {
    assert.equal(getSupabaseConfig({ SUPABASE_URL: "https://evil.example.com", SUPABASE_SECRET_KEY: "x".repeat(30) }), null);
    assert.equal(getSupabaseConfig({ SUPABASE_URL: "https://abc.supabase.co", SUPABASE_SECRET_KEY: "short" }), null);
    const config = getSupabaseConfig({ SUPABASE_URL: "https://abc.supabase.co/", SUPABASE_SECRET_KEY: "sb_secret_" + "k".repeat(30) });
    assert.equal(config.url, "https://abc.supabase.co");

    const calls = [];
    const fakeFetch = async (url, init) => {
      calls.push({ url, init });
      if (url.includes("/rpc/")) return new Response("true", { status: 200 });
      if (init.method === "POST") return new Response(JSON.stringify([{ id: "1" }]), { status: 201 });
      return new Response("[]", { status: 200 });
    };
    const store = createSupabaseInterestStore(config, fakeFetch);
    await store.findByEmailAndProgram("a+b@example.com", "camps");
    await store.insert({ email: "a@example.com", program_id: "camps", status: "pending", childName: "x", id: "forced" });
    assert.equal(await store.consumeRateLimit("ip:" + "a".repeat(64), 5, 3600), true);

    assert.match(calls[0].url, /email=eq\.a%2Bb%40example\.com&program_id=eq\.camps/);
    assert.equal(calls[0].init.headers.apikey, config.key);
    assert.equal(calls[0].init.headers.Authorization, undefined, "secret keys are not sent as Bearer tokens");
    assert.deepEqual(Object.keys(JSON.parse(calls[1].init.body)).sort(), ["email", "program_id", "status"]);

    const conflict = createSupabaseInterestStore(config, async () => new Response("{}", { status: 409 }));
    await assert.rejects(conflict.insert({ email: "a@example.com" }), DuplicateSignupError);
  });

  // ---------------------------------------------------- migration rules
  await test("the migration enables RLS and gives public roles no access", async () => {
    const sql = readFileSync(new URL("../supabase/migrations/20261023120000_program_interest.sql", import.meta.url), "utf8");
    const tables = ["interest_signups", "interest_rate_limits", "interest_notification_campaigns", "interest_notification_deliveries"];
    tables.forEach((table) => {
      assert.match(sql, new RegExp(`alter table public\\.${table} enable row level security`));
      assert.match(sql, new RegExp(`revoke all on table public\\.${table} from public, anon, authenticated`));
    });
    assert.doesNotMatch(sql, /create policy/i, "no policies: anon and authenticated cannot read or write");
    assert.match(sql, /unique \(email, program_id\)/);
    assert.match(sql, /unique \(campaign_id, signup_id\)/);
    assert.match(sql, /revoke all on function public\.consume_interest_rate_limit\(text, integer, integer\) from public, anon, authenticated/);
    const statements = sql.replace(/--[^\n]*/g, "");
    assert.doesNotMatch(statements, /child|birth|rating|medical|student/i, "no child data columns");
  });

  await test("unconfirmed signups are purged after 30 days on a daily schedule", async () => {
    const base = readFileSync(new URL("../supabase/migrations/20261023120000_program_interest.sql", import.meta.url), "utf8");
    assert.match(base, /delete from public\.interest_signups\s+where status = 'pending' and created_at < now\(\) - interval '30 days'/);

    const sql = readFileSync(new URL("../supabase/migrations/20261023140000_schedule_interest_purge.sql", import.meta.url), "utf8");
    const statements = sql.replace(/--[^\n]*/g, "");
    assert.match(statements, /create extension if not exists pg_cron/);
    assert.match(statements, /cron\.unschedule\(jobid\) from cron\.job where jobname = 'purge-stale-interest-data'/);
    assert.match(statements, /cron\.schedule\(\s*'purge-stale-interest-data',\s*'15 4 \* \* \*',\s*\$\$select public\.purge_stale_interest_data\(\);\$\$/);
    assert.doesNotMatch(statements, /grant|revoke|create policy|alter table|drop /i, "scheduling only: no access or schema changes");
  });

  console.log(`Interest list tests passed (${results.length}):`);
  results.forEach((name) => console.log(`  ok - ${name}`));
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
