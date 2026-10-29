// Online private lessons: server prices, checkout, Stripe webhook fulfillment,
// idempotency, the thank-you status check, and that other programs stay closed.
// Network calls are stubbed: Stripe, Supabase, and Resend requests are recorded, never sent.
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { onlineLessonPackages } from "../api/_lib/priceCatalog.js";
import { programLaunchConfig } from "../api/_lib/launchConfig.js";
import { checkRegistrationGate } from "../api/_lib/registrationGate.js";
import { getUnusedLessonRefundCents, LESSON_POLICY_LINES, LESSON_THANK_YOU_MESSAGE } from "../api/_lib/lessonOrders.js";
import { TERMS_VERSION } from "../src/lib/legal.js";
import lessonCheckout, { isStripeKeyAllowed } from "../api/create-lesson-checkout.js";
import campCheckout from "../api/create-camp-checkout-session.js";
import tournamentCheckout from "../api/create-checkout-session.js";
import stripeWebhook from "../api/stripe-webhook.js";
import checkoutStatus from "../api/checkout-status.js";
import { onlineLessonsPage, privacyPage, termsPage } from "../src/siteData.js";

const results = [];
const test = async (name, fn) => {
  await fn();
  results.push(name);
};

// ------------------------------------------------------------ test env
const WEBHOOK_SECRET = "whsec_test_only_not_a_real_secret";
Object.assign(process.env, {
  STRIPE_SECRET_KEY: "sk_test_only_not_a_real_key",
  STRIPE_WEBHOOK_SECRET: WEBHOOK_SECRET,
  SUPABASE_URL: "https://testproject.supabase.co",
  SUPABASE_SECRET_KEY: "sb_secret_test_only_not_a_real_key",
  RESEND_API_KEY: "re_test_only",
  CONTACT_FROM_EMAIL: "Chess & Truck <test@example.test>",
  CONTACT_TO_EMAILS: "team@example.test",
});
delete process.env.VERCEL_ENV;

// ------------------------------------------------------------ network stub
const sentEmails = [];
const stripeCreates = [];
const stripeSessions = new Map();
let orders = [];
let supabaseDown = false;

const matchesFilters = (row, search) =>
  [...search.entries()].every(([column, condition]) => {
    if (column === "on_conflict") return true;
    if (condition === "is.null") return row[column] === null || row[column] === undefined;
    if (condition.startsWith("eq.")) return String(row[column]) === condition.slice(3);
    return true;
  });

globalThis.fetch = async (input, init = {}) => {
  const url = new URL(String(input));

  if (url.hostname === "api.resend.com") {
    sentEmails.push(JSON.parse(init.body));
    return new Response(JSON.stringify({ id: "email_test" }), { status: 200 });
  }

  if (url.hostname === "api.stripe.com") {
    if (init.method === "POST" && url.pathname === "/v1/checkout/sessions") {
      const params = new URLSearchParams(init.body);
      stripeCreates.push(params);
      return new Response(JSON.stringify({ id: "cs_test_created", url: "https://checkout.stripe.com/c/pay/cs_test_created" }), { status: 200 });
    }

    const id = decodeURIComponent(url.pathname.split("/").pop());
    const session = stripeSessions.get(id);
    return session
      ? new Response(JSON.stringify(session), { status: 200 })
      : new Response(JSON.stringify({ error: { message: "No such session" } }), { status: 404 });
  }

  if (url.hostname === "testproject.supabase.co") {
    if (supabaseDown) return new Response("down", { status: 503 });
    assert.equal(url.pathname, "/rest/v1/lesson_orders");
    const body = init.body ? JSON.parse(init.body) : null;

    if (init.method === "POST") {
      if (!orders.some((row) => row.stripe_session_id === body.stripe_session_id)) {
        orders.push({ ...body, notify_claimed_at: null, notified_at: null });
      }
      return new Response(null, { status: 201 });
    }

    if (init.method === "PATCH") {
      const matched = orders.filter((row) => matchesFilters(row, url.searchParams));
      matched.forEach((row) => Object.assign(row, body));
      return new Response(JSON.stringify(matched), { status: 200 });
    }
  }

  throw new Error(`Unexpected network call: ${url}`);
};

// ------------------------------------------------------------ helpers
const validForm = (packageId = "five") => ({
  packageId,
  parentName: "Pat Parent",
  parentEmail: "parent@example.test",
  parentPhone: "(212) 555-0123",
  studentName: "Sam",
  studentAge: "9",
  studentLevel: "Beginner",
  notes: "Weekday evenings work best.",
  acceptTerms: true,
  website: "",
});

const post = (handler, body, headers = {}) =>
  handler.fetch(
    new Request("https://preview.example.test/api", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );

let ipCounter = 0;
const checkout = (body) => post(lessonCheckout, body, { "x-forwarded-for": `10.0.0.${(ipCounter += 1)}` });

const paidSession = (id, packageId = "five", overrides = {}) => ({
  id,
  object: "checkout.session",
  payment_status: "paid",
  livemode: false,
  currency: "usd",
  amount_total: onlineLessonPackages[packageId].amount,
  client_reference_id: `CT-L-20261028-${id.slice(-6).toUpperCase()}`,
  customer_details: { email: "parent@example.test" },
  metadata: {
    booking_type: "online_lessons",
    program_id: "onlineLessons",
    order_number: `CT-L-20261028-${id.slice(-6).toUpperCase()}`,
    package_id: packageId,
    parent_name: "Pat Parent",
    parent_email: "parent@example.test",
    student_name: "Sam",
    student_age: "9",
    student_level: "Beginner",
  },
  ...overrides,
});

const signedWebhook = (event) => {
  const payload = JSON.stringify(event);
  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto.createHmac("sha256", WEBHOOK_SECRET).update(`${timestamp}.${payload}`, "utf8").digest("hex");
  return stripeWebhook.fetch(
    new Request("https://preview.example.test/api/stripe-webhook", {
      method: "POST",
      headers: { "stripe-signature": `t=${timestamp},v1=${signature}` },
      body: payload,
    })
  );
};

const completedEvent = (eventId, session) => ({
  id: eventId,
  type: "checkout.session.completed",
  data: { object: session },
});

const reset = () => {
  sentEmails.length = 0;
  stripeCreates.length = 0;
  orders = [];
  supabaseDown = false;
};

const run = async () => {
  // ------------------------------------------------------------ prices and gate
  await test("the three packages cost exactly $150, $675, and $1,200 on the server", async () => {
    assert.equal(onlineLessonPackages.single.amount, 15000);
    assert.equal(onlineLessonPackages.five.amount, 67500);
    assert.equal(onlineLessonPackages.ten.amount, 120000);
    assert.deepEqual(
      programLaunchConfig.onlineLessons.pricing.map((item) => [item.optionId, item.amountCents]),
      [["single", 15000], ["five", 67500], ["ten", 120000]]
    );
  });

  await test("the website shows the same prices the server charges", async () => {
    const shown = Object.fromEntries(onlineLessonsPage.pricing.plans.map((plan) => [plan.packageId, plan.price]));
    assert.deepEqual(shown, { single: "$150", five: "$675", ten: "$1,200" });
  });

  await test("online lessons pass the launch gate; every other program stays closed", async () => {
    assert.equal((await checkRegistrationGate("onlineLessons", { log: false })).ready, true);

    for (const programId of ["camps", "tournaments", "lessons", "inPersonLessons", "groupLessons", "afterSchool", "dojo"]) {
      assert.equal((await checkRegistrationGate(programId, { log: false })).ready, false, programId);
    }

    assert.equal((await post(campCheckout, { optionId: "full-week" })).status, 409);
    assert.equal((await post(tournamentCheckout, {})).status, 409);
  });

  // ------------------------------------------------------------ checkout
  await test("each package opens Stripe Checkout with the server price", async () => {
    reset();

    for (const packageId of ["single", "five", "ten"]) {
      const response = await checkout({ ...validForm(packageId), amount: 1, price: 1 });
      assert.equal(response.status, 200);
      const payload = await response.json();
      assert.match(payload.url, /^https:\/\/checkout\.stripe\.com\//);
      assert.match(payload.orderNumber, /^CT-L-\d{8}-[0-9A-F]{6}$/);
    }

    assert.deepEqual(
      stripeCreates.map((params) => params.get("line_items[0][price_data][unit_amount]")),
      ["15000", "67500", "120000"]
    );

    const params = stripeCreates[1];
    assert.equal(params.get("mode"), "payment");
    assert.equal(params.get("metadata[booking_type]"), "online_lessons");
    assert.equal(params.get("metadata[package_id]"), "five");
    assert.equal(params.get("metadata[student_name]"), "Sam");
    assert.equal(params.get("customer_email"), "parent@example.test");
    assert.equal(params.get("allow_promotion_codes"), "true");
    assert.equal(params.get("success_url"), "https://preview.example.test/lessons/online/thank-you?session_id={CHECKOUT_SESSION_ID}");
    assert.equal(params.get("cancel_url"), "https://preview.example.test/lessons/online/checkout?package=five&payment=cancelled");
  });

  await test("checkout rejects unknown packages, missing details, and bots", async () => {
    reset();
    assert.equal((await checkout({ ...validForm(), packageId: "twenty" })).status, 400);
    assert.equal((await checkout({ ...validForm(), parentEmail: "nope" })).status, 400);
    assert.equal((await checkout({ ...validForm(), studentName: "" })).status, 400);
    assert.equal((await checkout({ ...validForm(), acceptTerms: false })).status, 400);
    assert.equal((await checkout({ ...validForm(), acceptTerms: "yes" })).status, 400);
    assert.equal((await checkout({ ...validForm(), website: "spam.example" })).status, 400);
    assert.equal((await checkout("not json")).status, 400);
    assert.equal(stripeCreates.length, 0);
  });

  await test("live Stripe keys are refused outside Production", async () => {
    assert.equal(isStripeKeyAllowed("sk_test_abc", {}), true);
    assert.equal(isStripeKeyAllowed("sk_live_abc", { VERCEL_ENV: "preview" }), false);
    assert.equal(isStripeKeyAllowed("rk_live_abc", {}), false);
    assert.equal(isStripeKeyAllowed("sk_live_abc", { VERCEL_ENV: "production" }), true);
    assert.equal(isStripeKeyAllowed("", { VERCEL_ENV: "production" }), false);

    reset();
    process.env.STRIPE_SECRET_KEY = "sk_live_only_a_test_value";
    process.env.VERCEL_ENV = "preview";
    assert.equal((await checkout(validForm())).status, 503);
    assert.equal(stripeCreates.length, 0);
    process.env.STRIPE_SECRET_KEY = "sk_test_only_not_a_real_key";
    delete process.env.VERCEL_ENV;
  });

  // ------------------------------------------------------------ webhook
  await test("a verified payment records one order and emails the parent and the team", async () => {
    reset();
    const session = paidSession("cs_test_aaa111", "ten");
    const response = await signedWebhook(completedEvent("evt_1", session));
    assert.equal(response.status, 200);
    assert.equal(orders.length, 1);
    assert.equal(orders[0].package_id, "ten");
    assert.equal(orders[0].amount_cents, 120000);
    assert.ok(orders[0].notified_at);
    assert.equal(sentEmails.length, 2);

    const [team, parent] = sentEmails;
    assert.deepEqual(team.to, ["team@example.test"]);
    assert.match(team.subject, /^\[TEST\] New online lesson purchase - 10-Lesson Package \(CT-L-20261028-AAA111\)$/);
    assert.match(team.text, /Student: Sam/);
    assert.match(team.text, /Parent email: parent@example\.test/);
    assert.deepEqual(parent.to, ["parent@example.test"]);
    assert.match(parent.text, new RegExp(LESSON_THANK_YOU_MESSAGE.replace(/[.!]/g, "\\$&")));
    assert.match(parent.text, /Order number: CT-L-20261028-AAA111/);
    assert.match(parent.text, /Package: 10-Lesson Package \(10 private online lessons, 60 minutes each\)/);
    assert.doesNotMatch(parent.text, /within|hours of|business day/i);
  });

  await test("repeated webhooks never create a second order or second emails", async () => {
    reset();
    const session = paidSession("cs_test_bbb222", "single");
    await signedWebhook(completedEvent("evt_2", session));
    await signedWebhook(completedEvent("evt_2", session));
    await signedWebhook(completedEvent("evt_2_retry_with_new_id", session));
    await signedWebhook({ ...completedEvent("evt_2_async", session), type: "checkout.session.async_payment_succeeded" });
    assert.equal(orders.length, 1);
    assert.equal(sentEmails.length, 2);
  });

  await test("an unsigned or tampered webhook is rejected", async () => {
    reset();
    const unsigned = await stripeWebhook.fetch(
      new Request("https://preview.example.test/api/stripe-webhook", {
        method: "POST",
        headers: { "stripe-signature": "t=1,v1=00" },
        body: JSON.stringify(completedEvent("evt_bad", paidSession("cs_test_ccc333"))),
      })
    );
    assert.equal(unsigned.status, 400);
    assert.equal(orders.length, 0);
    assert.equal(sentEmails.length, 0);
  });

  await test("an unpaid or expired session creates no order", async () => {
    reset();
    await signedWebhook(completedEvent("evt_unpaid", paidSession("cs_test_ddd444", "five", { payment_status: "unpaid" })));
    await signedWebhook({ id: "evt_expired", type: "checkout.session.expired", data: { object: paidSession("cs_test_eee555", "five", { payment_status: "unpaid" }) } });
    assert.equal(orders.length, 0);
    assert.equal(sentEmails.length, 0);
  });

  await test("if the order store is down, the webhook fails so Stripe retries, then succeeds once", async () => {
    reset();
    supabaseDown = true;
    const session = paidSession("cs_test_fff666", "five");
    assert.equal((await signedWebhook(completedEvent("evt_retry", session))).status, 500);
    assert.equal(sentEmails.length, 0);
    supabaseDown = false;
    assert.equal((await signedWebhook(completedEvent("evt_retry", session))).status, 200);
    assert.equal(orders.length, 1);
    assert.equal(sentEmails.length, 2);
  });

  await test("a paid amount that differs from the package price is flagged for review", async () => {
    reset();
    await signedWebhook(completedEvent("evt_mismatch", paidSession("cs_test_ggg777", "five", { amount_total: 100 })));
    assert.match(sentEmails[0].subject, /\[REVIEW NEEDED\]/);
    assert.match(sentEmails[0].text, /does not match the package price/);
  });

  await test("a promotion code discount is shown to the team and not flagged as a price mismatch", async () => {
    reset();
    await signedWebhook(
      completedEvent(
        "evt_promo",
        paidSession("cs_test_kkk111", "single", { amount_subtotal: 15000, amount_total: 100, total_details: { amount_discount: 14900 } })
      )
    );
    assert.doesNotMatch(sentEmails[0].subject, /REVIEW NEEDED/);
    assert.match(sentEmails[0].text, /Amount paid: \$1\.00/);
    assert.match(sentEmails[0].text, /Promotion code discount: \$149\.00/);
    assert.match(sentEmails[1].text, /Amount paid: \$1\.00/);
  });

  // ------------------------------------------------------------ thank-you page
  await test("the thank-you page shows the order after Stripe confirms payment, without duplicating it", async () => {
    reset();
    const session = paidSession("cs_test_hhh888", "five");
    stripeSessions.set(session.id, session);

    const first = await post(checkoutStatus, { sessionId: session.id });
    assert.equal(first.status, 200);
    const payload = await first.json();
    assert.equal(payload.status, "paid");
    assert.equal(payload.message, LESSON_THANK_YOU_MESSAGE);
    assert.equal(payload.orderNumber, "CT-L-20261028-HHH888");
    assert.equal(payload.packageLabel, "5-Lesson Package");
    assert.equal(payload.amountTotal, 675);

    await post(checkoutStatus, { sessionId: session.id });
    await signedWebhook(completedEvent("evt_after_page", session));
    assert.equal(orders.length, 1);
    assert.equal(sentEmails.length, 2);
  });

  await test("an unpaid session is not shown as a purchase", async () => {
    reset();
    const session = paidSession("cs_test_iii999", "single", { payment_status: "unpaid" });
    stripeSessions.set(session.id, session);
    const response = await post(checkoutStatus, { sessionId: session.id });
    assert.equal(response.status, 409);
    assert.equal(orders.length, 0);
    assert.equal(sentEmails.length, 0);
  });


  // ------------------------------------------------------------ terms and refunds
  await test("refunds use the package's per-lesson price (the $405 example in the Terms)", async () => {
    assert.equal(getUnusedLessonRefundCents("five", 2), 40500);
    assert.equal(getUnusedLessonRefundCents("single", 0), 15000);
    assert.equal(getUnusedLessonRefundCents("single", 1), 0);
    assert.equal(getUnusedLessonRefundCents("ten", 3), 84000);
    assert.equal(getUnusedLessonRefundCents("five", 6), null);
    assert.equal(getUnusedLessonRefundCents("unknown", 0), null);
    const termsText = JSON.stringify(termsPage);
    assert.ok(termsText.includes("3 × $135 = $405"), "Terms show the $405 example");
  });

  await test("Terms, checkout summary, and emails state the same lesson rules", async () => {
    const termsText = JSON.stringify(termsPage);
    for (const fact of ["$150", "$675", "$1,200", "$135 per lesson", "$120 per lesson", "24 hours", "do not expire", "no automatic renewal", "parent or legal guardian", "CHESS AND TRUCK", "info@chessandtruck.com"]) {
      assert.ok(termsText.includes(fact), `Terms mention ${fact}`);
    }
    assert.doesNotMatch(termsText, /all sales are final|non-refundable|refund fee of|expire after/i);

    const summary = onlineLessonsPage.checkout.summary.join(" ");
    for (const fact of ["upfront", "24 hours", "counts as used", "per-lesson price", "never expire"]) {
      assert.ok(summary.includes(fact), `checkout summary mentions ${fact}`);
    }

    const emailRules = LESSON_POLICY_LINES.join(" ");
    for (const fact of ["24 hours", "counts as used", "per-lesson price", "never expire", "info@chessandtruck.com"]) {
      assert.ok(emailRules.includes(fact), `emails mention ${fact}`);
    }

    const privacyText = JSON.stringify(privacyPage);
    for (const provider of ["Stripe", "Supabase", "Resend", "Vercel", "Google Fonts"]) {
      assert.ok(privacyText.includes(provider), `Privacy names ${provider}`);
    }
    assert.doesNotMatch(privacyText, /not intended for children|we store (your )?card/i);
  });

  await test("checkout records the Terms version and time, and both appear in the order emails", async () => {
    reset();
    const before = Date.now();
    await checkout(validForm("five"));
    const params = stripeCreates[0];
    assert.equal(params.get("metadata[terms_version]"), TERMS_VERSION);
    const acceptedAt = Date.parse(params.get("metadata[terms_accepted_at]"));
    assert.ok(acceptedAt >= before - 1000 && acceptedAt <= Date.now() + 1000);

    const session = paidSession("cs_test_jjj000", "five");
    session.metadata.terms_version = TERMS_VERSION;
    session.metadata.terms_accepted_at = "2026-10-28T15:00:00.000Z";
    await signedWebhook(completedEvent("evt_terms", session));
    const [team, parent] = sentEmails;
    assert.match(team.text, new RegExp(`Terms of Service accepted: version ${TERMS_VERSION} at 2026-10-28T15:00:00.000Z`));
    assert.match(team.text, /Refund value per unused lesson: \$135\.00/);
    assert.match(parent.text, /Per-lesson price for refunds: \$135\.00/);
    assert.match(parent.text, /Unused lessons never expire\./);
    assert.match(parent.text, /https:\/\/www\.chessandtruck\.com\/terms/);
  });

  results.forEach((name) => console.log(`  ok - ${name}`));
  console.log(`${results.length} online lesson checks passed.`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
