// Security tests: QA-mode limits, fail-closed behavior, approved booking dates,
// availability parsing, webhook review notifications, legacy Stripe sessions,
// confirmation-page responses, and Checkout Session expiry.
// Network calls are stubbed: Resend and Stripe requests are recorded, never sent.
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { readFileSync } from "node:fs";
import { getApprovedSessionLabels, getLaunchReadiness } from "../src/lib/launchReadiness.js";
import { buildCampDayOptions, buildCampWeekOptions, parseAvailabilityResponse } from "../src/lib/registrationAvailability.js";
import { programStatuses } from "../src/lib/programs.js";
import { programLaunchConfig } from "../api/_lib/launchConfig.js";
import { checkRegistrationGate, getPublicAvailability } from "../api/_lib/registrationGate.js";
import { CHECKOUT_SESSION_LIFETIME_MINUTES, getCheckoutExpiresAt } from "../api/_lib/checkoutExpiry.js";
import campCheckout, { isQaModeEnabled, validateApprovedSchedule } from "../api/create-camp-checkout-session.js";
import tournamentCheckout from "../api/create-checkout-session.js";
import programAvailability from "../api/program-availability.js";
import stripeWebhook from "../api/stripe-webhook.js";
import checkoutStatus from "../api/checkout-status.js";

const PROGRAM_IDS = ["camps", "tournaments", "lessons", "onlineLessons", "inPersonLessons", "groupLessons", "afterSchool", "dojo"];
// Online private lessons are the only program on sale (owner approval 2026-10-28).
const OPEN_PROGRAM_IDS = ["onlineLessons"];
const results = [];
const test = async (name, fn) => {
  await fn();
  results.push(name);
};

// ------------------------------------------------------------ network stub
const sentEmails = [];
const stripeSessions = new Map();

globalThis.fetch = async (input, init = {}) => {
  const url = String(input);

  if (url.startsWith("https://api.resend.com/")) {
    sentEmails.push(JSON.parse(init.body));
    return new Response(JSON.stringify({ id: "email_test" }), { status: 200 });
  }

  const match = url.match(/^https:\/\/api\.stripe\.com\/v1\/checkout\/sessions\/([^/?]+)$/);

  if (match && (!init.method || init.method === "GET") && stripeSessions.has(decodeURIComponent(match[1]))) {
    return new Response(JSON.stringify(stripeSessions.get(decodeURIComponent(match[1]))), { status: 200 });
  }

  throw new Error(`Unexpected network call in tests: ${init.method || "GET"} ${url}`);
};

console.warn = () => {};
process.env.RESEND_API_KEY = "re_test_only";
process.env.CONTACT_FROM_EMAIL = "site@example.test";
process.env.CONTACT_TO_EMAILS = "owner@example.test";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test_only";

const originalStatuses = { ...programStatuses };
const restore = () => {
  Object.assign(programStatuses, originalStatuses);
  delete process.env.STRIPE_SECRET_KEY;
};

const signedWebhookRequest = (event, secret = process.env.STRIPE_WEBHOOK_SECRET) => {
  const payload = JSON.stringify(event);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", secret).update(`${timestamp}.${payload}`, "utf8").digest("hex");

  return new Request("https://example.test/api/stripe-webhook", {
    method: "POST",
    headers: { "stripe-signature": `t=${timestamp},v1=${signature}` },
    body: payload,
  });
};

let eventCounter = 0;
const paidSessionEvent = (metadata) => ({
  id: `evt_test_${Date.now()}_${(eventCounter += 1)}`,
  type: "checkout.session.completed",
  data: {
    object: {
      id: `cs_test_${eventCounter}`,
      object: "checkout.session",
      payment_status: "paid",
      amount_total: 70000,
      currency: "usd",
      customer_details: { email: "family@example.test" },
      metadata,
    },
  },
});

const run = async () => {
  // ------------------------------------------------------------ QA mode
  await test("QA $1 pricing is off in production, even with a test key", async () => {
    assert.equal(
      isQaModeEnabled({ CAMP_QA_MODE: "true", VERCEL_ENV: "production", STRIPE_SECRET_KEY: "sk_test_abc" }),
      false
    );
  });

  await test("QA $1 pricing is off with a live Stripe key outside production", async () => {
    assert.equal(isQaModeEnabled({ CAMP_QA_MODE: "true", VERCEL_ENV: "preview", STRIPE_SECRET_KEY: "sk_live_abc" }), false);
    assert.equal(isQaModeEnabled({ CAMP_QA_MODE: "true", VERCEL_ENV: "preview", STRIPE_SECRET_KEY: "rk_live_abc" }), false);
    assert.equal(isQaModeEnabled({ CAMP_QA_MODE: "true", VERCEL_ENV: "preview" }), false);
  });

  await test("QA $1 pricing needs the flag, a non-production deployment, and a test key", async () => {
    assert.equal(isQaModeEnabled({ VERCEL_ENV: "preview", STRIPE_SECRET_KEY: "sk_test_abc" }), false);
    assert.equal(isQaModeEnabled({ CAMP_QA_MODE: "true", VERCEL_ENV: "preview", STRIPE_SECRET_KEY: "sk_test_abc" }), true);
    assert.equal(isQaModeEnabled({ CAMP_QA_MODE: "true", STRIPE_SECRET_KEY: "rk_test_abc" }), true);
  });

  // ------------------------------------------------------------ fail closed
  await test("missing launch configuration fails closed", async () => {
    const saved = programLaunchConfig.camps;
    delete programLaunchConfig.camps;
    programStatuses.camps = "open";
    const result = await checkRegistrationGate("camps", { log: false });
    assert.equal(result.ready, false);
    assert.ok(result.issues.some((item) => item.code === "CONFIG_MISSING"));
    programLaunchConfig.camps = saved;
    restore();
  });

  await test("an unavailable configuration source fails closed", async () => {
    const saved = programLaunchConfig.camps;
    Object.defineProperty(programLaunchConfig, "camps", {
      configurable: true,
      enumerable: true,
      get() {
        throw new Error("database unavailable");
      },
    });
    programStatuses.camps = "open";
    const result = await checkRegistrationGate("camps", { log: false });
    assert.equal(result.ready, false);
    assert.equal(result.config, null);

    const response = await programAvailability.fetch(new Request("https://example.test/api/program-availability"));
    const body = await response.json();
    assert.equal(body.programs.camps, false);
    assert.deepEqual(body.sessions.camps, []);

    const checkout = await campCheckout.fetch(
      new Request("https://example.test/api", { method: "POST", body: JSON.stringify({ optionId: "full-week" }) })
    );
    assert.equal(checkout.status, 409);

    Object.defineProperty(programLaunchConfig, "camps", { configurable: true, enumerable: true, writable: true, value: saved });
    restore();
  });

  await test("invalid configuration values fail closed without throwing", async () => {
    const malformed = [
      { programId: "camps", sessions: "June", location: "UES", pricing: "free", capacity: "lots", eligibility: "kids", approval: "yes" },
      { programId: "camps", sessions: [null, 5], location: { type: "in_person" }, pricing: [null, { optionId: 1 }], capacity: { maxParticipants: -1 }, eligibility: { summary: 3 }, approval: {} },
      { programId: "lessons" },
      null,
    ];

    for (const config of malformed) {
      const result = getLaunchReadiness({ programId: "camps", status: "open", config, priceCatalog: { reviewed: true, prices: null } });
      assert.equal(result.ready, false);
      assert.ok(result.issues.length > 0);
    }

    assert.equal(getLaunchReadiness({ programId: "unknown", status: "open", config: {} }).ready, false);
    assert.equal(getLaunchReadiness(undefined).ready, false);
  });

  await test("public availability stays closed for every program except online lessons", async () => {
    const availability = await getPublicAvailability();
    assert.deepEqual(Object.keys(availability).sort(), [...PROGRAM_IDS].sort());
    Object.entries(availability).forEach(([programId, value]) =>
      assert.equal(value, OPEN_PROGRAM_IDS.includes(programId), programId)
    );
  });

  // --------------------------------------------------------- booking dates
  const approvedSessions = [{ startDate: "2027-07-12", endDate: "2027-07-16" }];

  await test("unapproved booking dates are rejected, including the old June dates", async () => {
    const base = { sessions: approvedSessions };
    assert.equal(validateApprovedSchedule({ ...base, optionId: "single-day", schedulePreference: "", selectedDays: ["Monday, June 15"] }), false);
    assert.equal(validateApprovedSchedule({ ...base, optionId: "single-day", schedulePreference: "", selectedDays: ["Saturday, July 17"] }), false);
    assert.equal(validateApprovedSchedule({ ...base, optionId: "single-day", schedulePreference: "", selectedDays: [] }), false);
    assert.equal(validateApprovedSchedule({ ...base, optionId: "full-week", schedulePreference: "Week of June 15", selectedDays: ["Monday, July 12"] }), false);
    assert.equal(validateApprovedSchedule({ optionId: "single-day", schedulePreference: "", selectedDays: ["Monday, July 12"], sessions: [] }), false);
  });

  await test("approved booking dates are accepted", async () => {
    const base = { sessions: approvedSessions };
    assert.equal(validateApprovedSchedule({ ...base, optionId: "half-day-am", schedulePreference: "", selectedDays: ["Monday, July 12", "Friday, July 16"] }), true);
    assert.equal(validateApprovedSchedule({ ...base, optionId: "full-week", schedulePreference: "Week of July 12", selectedDays: ["Tuesday, July 13"] }), true);
  });

  await test("the website's day picker uses exactly the server's approved labels", async () => {
    const days = buildCampDayOptions(approvedSessions);
    const weeks = buildCampWeekOptions(days);
    const server = getApprovedSessionLabels(approvedSessions);
    assert.deepEqual(new Set(days.map((item) => item.value)), server.days);
    assert.deepEqual(new Set(weeks.map((item) => item.value)), server.weeks);
    assert.equal(buildCampDayOptions([]).length, 0);
  });

  // --------------------------------------------------- availability parsing
  await test("malformed availability responses parse as closed", async () => {
    const closed = Object.fromEntries(PROGRAM_IDS.map((id) => [id, false]));
    const cases = [
      null,
      "open",
      [],
      { programs: "all" },
      { programs: [true, true] },
      { programs: { camps: "true", tournaments: 1, lessons: {}, afterSchool: null } },
      { programs: { camps: true }, sessions: { camps: "June 15" } },
      { programs: { camps: true }, sessions: { camps: [{ startDate: "2027-02-30", endDate: "2027-03-01" }] } },
      { programs: { camps: true }, sessions: { camps: [{ startDate: "2027-07-16", endDate: "2027-07-12" }] } },
      { programs: { camps: true }, sessions: { camps: [] } },
    ];

    cases.forEach((payload) => {
      const parsed = parseAvailabilityResponse(payload, PROGRAM_IDS);
      assert.deepEqual(parsed.programs, closed, JSON.stringify(payload));
      assert.deepEqual(parsed.campSessions, []);
    });
  });

  await test("camp sessions are ignored unless camps are open", async () => {
    const parsed = parseAvailabilityResponse(
      { programs: { camps: false, tournaments: true }, sessions: { camps: approvedSessions } },
      PROGRAM_IDS
    );
    assert.equal(parsed.programs.tournaments, true);
    assert.deepEqual(parsed.campSessions, []);
  });

  await test("a valid availability response is accepted", async () => {
    const parsed = parseAvailabilityResponse({ programs: { camps: true }, sessions: { camps: approvedSessions } }, PROGRAM_IDS);
    assert.equal(parsed.programs.camps, true);
    assert.deepEqual(parsed.campSessions, approvedSessions);
  });

  // ----------------------------------------------------------- webhook
  await test("the webhook rejects unsigned and wrongly signed events", async () => {
    const event = paidSessionEvent({ program_id: "camps" });
    const unsigned = await stripeWebhook.fetch(new Request("https://example.test", { method: "POST", body: JSON.stringify(event) }));
    assert.equal(unsigned.status, 400);
    const wrong = await stripeWebhook.fetch(signedWebhookRequest(event, "whsec_wrong"));
    assert.equal(wrong.status, 400);
  });

  await test("an unexpected payment triggers a review notification, not a confirmation", async () => {
    sentEmails.length = 0;
    const response = await stripeWebhook.fetch(
      signedWebhookRequest(paidSessionEvent({ program_id: "camps", booking_type: "camp", parent_email: "family@example.test" }))
    );
    assert.equal(response.status, 200);

    const internal = sentEmails.find((email) => email.to.includes("owner@example.test"));
    const family = sentEmails.find((email) => email.to.includes("family@example.test"));
    assert.match(internal.subject, /^\[REVIEW NEEDED\]/);
    assert.match(internal.text, /not open/);
    assert.match(family.subject, /payment received/i);
    assert.doesNotMatch(family.subject + family.text, /confirmed/i);
  });

  await test("legacy Stripe sessions without program metadata still get review notifications", async () => {
    for (const metadata of [{}, { booking_type: "camp" }, { player_name: "Old Player" }]) {
      sentEmails.length = 0;
      const response = await stripeWebhook.fetch(signedWebhookRequest(paidSessionEvent(metadata)));
      assert.equal(response.status, 200);
      const internal = sentEmails.find((email) => email.to.includes("owner@example.test"));
      assert.match(internal.subject, /^\[REVIEW NEEDED\]/, JSON.stringify(metadata));
      const expectedProgram = metadata.booking_type === "camp" ? "camps" : "tournaments";
      assert.match(internal.subject, new RegExp(expectedProgram));
    }
  });

  // ----------------------------------------------------- confirmation page
  await test("the confirmation response flags payments that need manual review", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_only";

    for (const [sessionId, metadata] of [
      ["cs_test_review_camp", { program_id: "camps", booking_type: "camp" }],
      ["cs_test_legacy_camp", { booking_type: "camp" }],
      ["cs_test_legacy_none", {}],
    ]) {
      stripeSessions.set(sessionId, {
        id: sessionId,
        payment_status: "paid",
        amount_total: 15000,
        customer_details: { email: "family@example.test" },
        metadata,
      });

      const response = await checkoutStatus.fetch(
        new Request("https://example.test/api/checkout-status", { method: "POST", body: JSON.stringify({ sessionId }) })
      );
      const body = await response.json();
      assert.equal(response.status, 200);
      assert.equal(body.status, "paid");
      assert.equal(body.requiresReview, true, sessionId);
      assert.match(body.message, /Payment received/);
      assert.doesNotMatch(body.message, /confirmed/i);
    }

    restore();
  });

  // --------------------------------------------------- checkout expiry
  await test("Checkout Sessions expire after 60 minutes, within Stripe's allowed range", async () => {
    const now = Date.UTC(2027, 0, 1, 12, 0, 0);
    const expiresAt = getCheckoutExpiresAt(now);
    assert.equal(CHECKOUT_SESSION_LIFETIME_MINUTES, 60);
    assert.equal(expiresAt - now / 1000, 60 * 60);
    assert.ok(expiresAt - now / 1000 >= 30 * 60 && expiresAt - now / 1000 <= 24 * 60 * 60);

    for (const file of ["api/create-camp-checkout-session.js", "api/create-checkout-session.js"]) {
      const source = readFileSync(new URL(`../${file}`, import.meta.url), "utf8");
      assert.match(source, /params\.set\("expires_at", String\(getCheckoutExpiresAt\(\)\)\)/, file);
    }
  });

  // ------------------------------------------------- checkout endpoints
  await test("both checkout endpoints reject unapproved requests", async () => {
    for (const status of ["coming_soon", "open"]) {
      programStatuses.camps = status;
      programStatuses.tournaments = status;
      const camp = await campCheckout.fetch(
        new Request("https://example.test/api", { method: "POST", body: JSON.stringify({ optionId: "single-day", selectedDays: ["Monday, June 15"] }) })
      );
      const tournament = await tournamentCheckout.fetch(
        new Request("https://example.test/api", { method: "POST", body: JSON.stringify({ serviceLevel: "entry" }) })
      );
      assert.equal(camp.status, 409, `camps ${status}`);
      assert.equal(tournament.status, 409, `tournaments ${status}`);
    }
    restore();
  });

  restore();
  console.log(`Security tests passed (${results.length}):`);
  results.forEach((name) => console.log(`  ok - ${name}`));
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
