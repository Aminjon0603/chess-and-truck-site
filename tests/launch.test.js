// Launch safety tests: readiness rules, server price consistency, and direct API
// attempts to bypass the gate. No network calls are made; fetch is stubbed to fail.
import assert from "node:assert/strict";
import { fingerprintLaunchConfig, getLaunchReadiness } from "../src/lib/launchReadiness.js";
import { programStatuses, setRegistrationAvailability, getProgramStatus, isProgramOpen } from "../src/lib/programs.js";
import { serviceLevels as siteServiceLevels } from "../src/siteData.js";
import { programLaunchConfig } from "../api/_lib/launchConfig.js";
import { getServerPriceCatalog } from "../api/_lib/priceCatalog.js";
import { checkRegistrationGate, getPublicAvailability } from "../api/_lib/registrationGate.js";
import campCheckout from "../api/create-camp-checkout-session.js";
import tournamentCheckout from "../api/create-checkout-session.js";
import programAvailability from "../api/program-availability.js";

const NOW = new Date("2026-10-22T16:00:00Z");
const results = [];
const test = async (name, fn) => {
  await fn();
  results.push(name);
};

// Guard: any accidental network call (Stripe, Resend) fails the test run.
globalThis.fetch = async (url) => {
  throw new Error(`Unexpected network call in tests: ${url}`);
};
delete process.env.STRIPE_SECRET_KEY;
const warnings = [];
console.warn = (...args) => warnings.push(args.join(" "));

const originalStatuses = { ...programStatuses };
const originalConfigs = structuredClone(programLaunchConfig);
const restore = () => {
  Object.assign(programStatuses, originalStatuses);
  Object.keys(programLaunchConfig).forEach((id) => {
    programLaunchConfig[id] = structuredClone(originalConfigs[id]);
  });
  delete process.env.CAMP_QA_MODE;
  delete process.env.CAMP_QA_EMAILS;
};

const reviewedCampCatalog = () => ({ ...getServerPriceCatalog("camps"), reviewed: true });

// A complete, approved camp configuration that matches the server's prices.
const validCampConfig = () => {
  const config = {
    programId: "camps",
    sessions: [{ id: "week-1", startDate: "2027-07-12", endDate: "2027-07-16", schedule: "9:00 AM - 3:00 PM" }],
    location: { type: "in_person", name: "Test Venue", address: "1 Test Street, New York, NY", confirmed: true },
    pricing: Object.entries(getServerPriceCatalog("camps").prices).map(([optionId, amountCents]) => ({
      optionId,
      amountCents,
    })),
    capacity: { maxParticipants: 24 },
    eligibility: { summary: "Ages 6 - 14", minAge: 6, maxAge: 14 },
    approval: null,
  };
  config.approval = { approvedBy: "Test Owner", approvedAt: "2026-10-20", fingerprint: fingerprintLaunchConfig(config) };
  return config;
};

const readiness = (overrides = {}) =>
  getLaunchReadiness({
    programId: "camps",
    status: "open",
    config: validCampConfig(),
    priceCatalog: reviewedCampCatalog(),
    now: NOW,
    ...overrides,
  });

const codes = (result) => result.issues.map((item) => item.code);

const postJson = (body) =>
  new Request("https://example.test/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

const campBody = {
  optionId: "full-week",
  parentFirstName: "Test",
  parentLastName: "Parent",
  email: "qa@example.com",
  phone: "6465550100",
  studentName: "Student",
  studentAge: "9",
  studentLevel: "Beginner",
  schedulePreference: "Week of June 15",
  returnPath: "/camps/book?option=full-week",
};

const assertGenericRejection = async (response, label) => {
  assert.equal(response.status, 409, `${label}: expected 409`);
  const body = await response.json();
  assert.match(body.error, /registration is not open yet/i, `${label}: generic message`);
  const text = JSON.stringify(body);
  assert.ok(!/approval|fingerprint|PRICE_|SESSION|LOCATION|CONFIG|issues/i.test(text), `${label}: no internal details`);
};

const run = async () => {
  // ---------------------------------------------------------------- readiness


  await test("all five programs are blocked with the shipped configuration", async () => {
    for (const programId of Object.keys(programStatuses)) {
      const result = await checkRegistrationGate(programId, { now: NOW, log: false });
      assert.equal(result.ready, false, programId);
      assert.ok(codes(result).includes("STATUS_NOT_OPEN"), programId);
      assert.ok(codes(result).includes("APPROVAL_MISSING"), programId);
    }
  });

  await test("a complete, approved, open configuration passes", async () => {
    const result = readiness();
    assert.deepEqual(result.issues, []);
    assert.equal(result.ready, true);
  });

  await test("status other than open blocks even a valid configuration", async () => {
    assert.ok(codes(readiness({ status: "coming_soon" })).includes("STATUS_NOT_OPEN"));
  });

  await test("incomplete configuration is blocked", async () => {
    const config = validCampConfig();
    config.location = null;
    config.capacity = null;
    config.eligibility = { summary: "" };
    config.approval.fingerprint = fingerprintLaunchConfig(config);
    const result = readiness({ config });
    assert.equal(result.ready, false);
    ["LOCATION_MISSING", "CAPACITY_MISSING", "ELIGIBILITY_MISSING"].forEach((code) => assert.ok(codes(result).includes(code), code));
  });

  await test("unconfirmed location is blocked", async () => {
    const config = validCampConfig();
    config.location.confirmed = false;
    config.approval.fingerprint = fingerprintLaunchConfig(config);
    assert.ok(codes(readiness({ config })).includes("LOCATION_UNCONFIRMED"));
  });

  await test("outdated dates are blocked, including the June 15-19 draft dates", async () => {
    const config = validCampConfig();
    config.sessions = [{ id: "draft", startDate: "2026-06-15", endDate: "2026-06-19", schedule: "9:00 AM - 3:00 PM" }];
    config.approval.fingerprint = fingerprintLaunchConfig(config);
    const result = readiness({ config });
    assert.equal(result.ready, false);
    assert.ok(codes(result).includes("SESSION_DATE_PAST"));
  });

  await test("invalid dates are blocked", async () => {
    const config = validCampConfig();
    config.sessions = [{ id: "bad", startDate: "2027-02-30", endDate: "2027-02-01", schedule: "x" }];
    config.approval.fingerprint = fingerprintLaunchConfig(config);
    assert.ok(codes(readiness({ config })).includes("SESSION_DATE_INVALID"));
  });

  await test("missing approval is blocked", async () => {
    const config = validCampConfig();
    config.approval = null;
    assert.ok(codes(readiness({ config })).includes("APPROVAL_MISSING"));
  });

  await test("editing details after approval invalidates the approval", async () => {
    const config = validCampConfig();
    config.capacity.maxParticipants = 40;
    assert.ok(codes(readiness({ config })).includes("APPROVAL_STALE"));
  });

  await test("approval dated in the future is blocked", async () => {
    const config = validCampConfig();
    config.approval.approvedAt = "2027-01-01";
    assert.ok(codes(readiness({ config })).includes("APPROVAL_INVALID"));
  });

  await test("an approved price that differs from the server checkout is blocked", async () => {
    const config = validCampConfig();
    config.pricing = config.pricing.map((item) =>
      item.optionId === "full-week" ? { ...item, amountCents: 60000 } : item
    );
    config.approval.fingerprint = fingerprintLaunchConfig(config);
    assert.ok(codes(readiness({ config })).includes("PRICE_MISMATCH"));
  });

  await test("an unapproved checkout option or unknown approved option is blocked", async () => {
    const config = validCampConfig();
    config.pricing = config.pricing.filter((item) => item.optionId !== "extra:pizza");
    config.pricing.push({ optionId: "mystery-option", amountCents: 100 });
    config.approval.fingerprint = fingerprintLaunchConfig(config);
    const result = codes(readiness({ config }));
    assert.ok(result.includes("PRICE_NOT_APPROVED"));
    assert.ok(result.includes("PRICE_UNKNOWN_OPTION"));
  });

  await test("unreviewed checkout prices (the historical draft) are blocked", async () => {
    assert.ok(codes(readiness({ priceCatalog: getServerPriceCatalog("camps") })).includes("CHECKOUT_UNREVIEWED"));
  });

  await test("programs without a server checkout can never open", async () => {
    const config = { ...validCampConfig(), programId: "lessons" };
    config.approval.fingerprint = fingerprintLaunchConfig(config);
    const result = getLaunchReadiness({ programId: "lessons", status: "open", config, priceCatalog: null, now: NOW });
    assert.ok(codes(result).includes("CHECKOUT_UNAVAILABLE"));
  });

  // ------------------------------------------------ server price consistency

  await test("tournament checkout prices match the prices shown on the site", async () => {
    const catalog = getServerPriceCatalog("tournaments").prices;
    siteServiceLevels.forEach((item) => assert.equal(catalog[item.id], item.amount * 100, item.id));
  });

  // --------------------------------------------------- website availability

  await test("an 'open' status without server confirmation still shows as coming soon", async () => {
    programStatuses.camps = "open";
    setRegistrationAvailability({});
    assert.equal(isProgramOpen("camps"), false);
    assert.equal(getProgramStatus("camps"), "coming_soon");
    restore();
  });

  // ------------------------------------------------- direct API bypass attempts

  await test("camp checkout rejects requests while camps are coming soon", async () => {
    await assertGenericRejection(await campCheckout.fetch(postJson(campBody)), "camps coming soon");
  });

  await test("setting camps to open without valid configuration still blocks checkout", async () => {
    programStatuses.camps = "open";
    await assertGenericRejection(await campCheckout.fetch(postJson(campBody)), "camps open, empty config");
    assert.ok(warnings.some((line) => line.includes("[launch-gate] camps")), "blocked attempt is logged server-side");
    restore();
  });

  await test("open camps with a complete approval of the unreviewed draft prices still block checkout", async () => {
    programStatuses.camps = "open";
    programLaunchConfig.camps = validCampConfig();
    await assertGenericRejection(await campCheckout.fetch(postJson(campBody)), "camps draft prices");
    restore();
  });

  await test("the $1 QA mode cannot bypass the launch gate", async () => {
    process.env.CAMP_QA_MODE = "true";
    process.env.CAMP_QA_EMAILS = "qa@example.com";
    await assertGenericRejection(await campCheckout.fetch(postJson(campBody)), "QA mode, coming soon");
    programStatuses.camps = "open";
    await assertGenericRejection(await campCheckout.fetch(postJson(campBody)), "QA mode, open but not ready");
    restore();
  });

  await test("tournament checkout rejects entry and Dojo add-on, even when marked open", async () => {
    for (const serviceLevel of ["entry", "entry-dojo"]) {
      await assertGenericRejection(await tournamentCheckout.fetch(postJson({ serviceLevel })), `tournament ${serviceLevel}`);
    }
    programStatuses.tournaments = "open";
    programStatuses.dojo = "open";
    for (const serviceLevel of ["entry", "entry-dojo"]) {
      await assertGenericRejection(await tournamentCheckout.fetch(postJson({ serviceLevel })), `tournament open ${serviceLevel}`);
    }
    restore();
  });

  await test("the public availability API returns only yes/no values", async () => {
    programStatuses.camps = "open";
    const response = await programAvailability.fetch(new Request("https://example.test/api/program-availability"));
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.deepEqual(Object.keys(body).sort(), ["programs", "sessions"]);
    assert.deepEqual(body.sessions, { camps: [] });
    Object.values(body.programs).forEach((value) => assert.equal(value, false));
    assert.deepEqual(await getPublicAvailability({ now: NOW }), body.programs);
    restore();
  });

  restore();
  console.log(`Launch safety tests passed (${results.length}):`);
  results.forEach((name) => console.log(`  ok - ${name}`));
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
