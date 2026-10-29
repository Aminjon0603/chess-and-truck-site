import crypto from "node:crypto";
import { applyRateLimit } from "./_lib/rate-limit.js";
import { getRegistrationUnavailableMessage } from "../src/lib/programs.js";
import { validateLessonCheckoutFields } from "../src/lib/validation.js";
import { onlineLessonPackages } from "./_lib/priceCatalog.js";
import { checkRegistrationGate } from "./_lib/registrationGate.js";
import { getCheckoutExpiresAt } from "./_lib/checkoutExpiry.js";
import { LESSON_BOOKING_TYPE, LESSON_PROGRAM_ID } from "./_lib/lessonOrders.js";
import { TERMS_VERSION } from "../src/lib/legal.js";

const sanitize = (value, limit = 200) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\r\n/g, "\n").slice(0, limit);
};

const getBaseUrl = (request) => {
  const url = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host");
  const forwardedProto = request.headers.get("x-forwarded-proto");

  if (forwardedHost) {
    return `${forwardedProto || "https"}://${forwardedHost}`;
  }

  return url.origin;
};

export const buildLessonOrderNumber = () => {
  const dateCode = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `CT-L-${dateCode}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
};

// Live Stripe keys are used only by the Production deployment. Every other
// deployment (Preview, local) must use a test key, so no real card is charged.
export const isStripeKeyAllowed = (key, env = process.env) => {
  if (!key) {
    return false;
  }

  const isLiveKey = /^(sk|rk)_live_/.test(key);
  return env.VERCEL_ENV === "production" || !isLiveKey;
};

export const runtime = "nodejs";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    // Launch gate: runs before rate limiting and Stripe.
    const gate = await checkRegistrationGate(LESSON_PROGRAM_ID);

    if (!gate.ready) {
      return Response.json(
        { error: getRegistrationUnavailableMessage("Online lesson") },
        { status: 409 }
      );
    }

    const limited = applyRateLimit(request, "lesson-checkout", {
      limit: 8,
      windowMs: 15 * 60 * 1000,
      message: "Too many checkout attempts were sent from this network. Please try again shortly.",
    });

    if (limited) {
      return limited;
    }

    let payload;

    try {
      payload = await request.json();
    } catch {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    const data = {
      packageId: sanitize(payload.packageId, 16),
      parentName: sanitize(payload.parentName, 120),
      parentEmail: sanitize(payload.parentEmail, 180),
      parentPhone: sanitize(payload.parentPhone, 40),
      studentName: sanitize(payload.studentName, 120),
      studentAge: sanitize(String(payload.studentAge ?? ""), 3),
      studentLevel: sanitize(payload.studentLevel, 40),
      notes: sanitize(payload.notes, 480),
      acceptTerms: payload.acceptTerms === true,
      website: sanitize(payload.website, 120),
    };

    if (data.website) {
      return Response.json({ error: "Request rejected." }, { status: 400 });
    }

    const errors = validateLessonCheckoutFields(data);

    if (Object.keys(errors).length > 0) {
      return Response.json(
        { error: Object.values(errors)[0], fieldErrors: errors },
        { status: 400 }
      );
    }

    // The price always comes from the server catalog, never from the request.
    const lessonPackage = onlineLessonPackages[data.packageId];
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";

    if (!isStripeKeyAllowed(stripeSecretKey)) {
      return Response.json(
        { error: "Online payments are not available right now. Please contact us to book lessons." },
        { status: 503 }
      );
    }

    const orderNumber = buildLessonOrderNumber();
    const baseUrl = getBaseUrl(request);
    const params = new URLSearchParams();

    params.set("mode", "payment");
    params.set("expires_at", String(getCheckoutExpiresAt()));
    // Stripe replaces {CHECKOUT_SESSION_ID} (the form encoding is decoded first).
    params.set("success_url", `${baseUrl}/lessons/online/thank-you?session_id={CHECKOUT_SESSION_ID}`);
    params.set("cancel_url", `${baseUrl}/lessons/online/checkout?package=${data.packageId}&payment=cancelled`);
    params.set("payment_method_types[0]", "card");
    // Lets the team give discounts (for example financial aid) with Stripe promotion codes.
    params.set("allow_promotion_codes", "true");
    params.set("customer_email", data.parentEmail);
    params.set("client_reference_id", orderNumber);
    params.set("line_items[0][quantity]", "1");
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", String(lessonPackage.amount));
    params.set("line_items[0][price_data][product_data][name]", `Online Private Chess Lessons - ${lessonPackage.label}`);
    params.set("line_items[0][price_data][product_data][description]", lessonPackage.description);

    const metadata = {
      booking_type: LESSON_BOOKING_TYPE,
      program_id: LESSON_PROGRAM_ID,
      order_number: orderNumber,
      package_id: data.packageId,
      parent_name: data.parentName,
      parent_email: data.parentEmail,
      parent_phone: data.parentPhone,
      student_name: data.studentName,
      student_age: data.studentAge,
      student_level: data.studentLevel,
      notes: data.notes,
      // Which Terms of Service the buyer agreed to, and when (server time).
      terms_version: TERMS_VERSION,
      terms_accepted_at: new Date().toISOString(),
    };

    Object.entries(metadata).forEach(([key, value]) => {
      if (value) {
        params.set(`metadata[${key}]`, value);
        params.set(`payment_intent_data[metadata][${key}]`, value);
      }
    });

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
        "Idempotency-Key": orderNumber,
      },
      body: params.toString(),
    });

    const stripePayload = await stripeResponse.json().catch(() => ({}));

    if (!stripeResponse.ok || !stripePayload.url) {
      return Response.json(
        { error: "Checkout could not be started right now. Please try again or contact us." },
        { status: 502 }
      );
    }

    return Response.json({ url: stripePayload.url, orderNumber }, { status: 200 });
  },
};
