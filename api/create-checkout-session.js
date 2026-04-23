import crypto from "node:crypto";
import { applyRateLimit } from "./_lib/rate-limit.js";
import { getNotificationRecipients, sendResendEmail } from "./_lib/resend.js";
import { validateRegistrationFields } from "../src/lib/validation.js";

const serviceLevels = {
  entry: { label: "Tournament Entry", amount: 5500 },
  "entry-dojo": { label: "Tournament Entry + Master Training Dojo", amount: 15500 },
};

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

  return request.headers.get("origin") || url.origin;
};

const appendRawQueryParam = (url, key, value) => {
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${key}=${value}`;
};

const buildRegistrationReference = () => {
  const dateCode = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `CT-${dateCode}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
};

const buildMetadata = (data, serviceLevel, registrationReference) => ({
  registration_reference: registrationReference,
  player_name: `${data.playerFirstName} ${data.playerLastName}`.trim().slice(0, 120),
  section: data.section.slice(0, 32),
  service_level: serviceLevel.label.slice(0, 120),
  parent_email: data.parentEmail.slice(0, 180),
});

const buildInternalEmailText = (data, serviceLevel, registrationReference) =>
  [
    "A family completed the tournament form and was sent to Stripe checkout.",
    "",
    `Reference: ${registrationReference}`,
    `Primary contact: ${data.firstName} ${data.lastName}`,
    `Primary email: ${data.email}`,
    `Primary phone: ${data.phone}`,
    `Additional emails: ${data.additionalEmails || "-"}`,
    "",
    `Player: ${data.playerFirstName} ${data.playerLastName}`,
    `Grade: ${data.playerGrade}`,
    `School: ${data.schoolName || "-"}`,
    `Section: ${data.section}`,
    `Service level: ${serviceLevel.label}`,
    `USCF ID: ${data.uscfId || "-"}`,
    "",
    `Parent / Guardian: ${data.parentName}`,
    `Parent email: ${data.parentEmail}`,
    `Parent phone: ${data.parentPhone}`,
    "",
    `Emergency contact: ${data.emergencyName} (${data.emergencyPhone})`,
    `Medical information: ${data.medicalInfo}`,
    "",
    "Payment confirmation should be checked in Stripe or through the webhook notification.",
  ].join("\n");

export const runtime = "nodejs";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    const limited = applyRateLimit(request, "registration", {
      limit: 6,
      windowMs: 15 * 60 * 1000,
      message: "Too many registration attempts were sent from this network. Please try again shortly.",
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
      firstName: sanitize(payload.firstName, 120),
      lastName: sanitize(payload.lastName, 120),
      phone: sanitize(payload.phone, 80),
      email: sanitize(payload.email, 180),
      additionalEmails: sanitize(payload.additionalEmails, 400),
      acceptSms: Boolean(payload.acceptSms),
      playerFirstName: sanitize(payload.playerFirstName, 120),
      playerLastName: sanitize(payload.playerLastName, 120),
      playerGrade: sanitize(payload.playerGrade, 32),
      schoolName: sanitize(payload.schoolName, 120),
      section: sanitize(payload.section, 32),
      serviceLevel: sanitize(payload.serviceLevel, 32),
      uscfId: sanitize(payload.uscfId, 60),
      parentName: sanitize(payload.parentName, 120),
      parentEmail: sanitize(payload.parentEmail, 180),
      parentPhone: sanitize(payload.parentPhone, 80),
      emergencyName: sanitize(payload.emergencyName, 120),
      emergencyPhone: sanitize(payload.emergencyPhone, 80),
      medicalInfo: sanitize(payload.medicalInfo, 800),
      website: sanitize(payload.website, 120),
    };

    if (data.website) {
      return Response.json({ error: "Request rejected." }, { status: 400 });
    }

    const errors = validateRegistrationFields(data);

    if (Object.keys(errors).length > 0) {
      return Response.json(
        {
          error:
            Object.values(errors)[0] ||
            "Please complete all required registration fields before payment.",
          fieldErrors: errors,
        },
        { status: 400 }
      );
    }

    const serviceLevel = serviceLevels[data.serviceLevel];

    if (!serviceLevel) {
      return Response.json({ error: "Please choose a valid service level." }, { status: 400 });
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return Response.json(
        {
          error:
            "Stripe is not configured yet. Add STRIPE_SECRET_KEY in Vercel before using the payment flow.",
        },
        { status: 500 }
      );
    }

    const registrationReference = buildRegistrationReference();
    const internalRecipients = getNotificationRecipients();

    await sendResendEmail({
      to: internalRecipients,
      subject: `Registration started - ${data.playerFirstName} ${data.playerLastName} (${registrationReference})`,
      text: buildInternalEmailText(data, serviceLevel, registrationReference),
      replyTo: data.parentEmail || data.email,
    }).catch(() => null);

    const params = new URLSearchParams();
    const successUrl = appendRawQueryParam(
      `${getBaseUrl(request)}/register?payment=success`,
      "session_id",
      "{CHECKOUT_SESSION_ID}"
    );
    params.set("mode", "payment");
    params.set("success_url", successUrl);
    params.set("cancel_url", `${getBaseUrl(request)}/register?payment=cancel`);
    params.set("adaptive_pricing[enabled]", "false");
    params.set("customer_email", data.parentEmail || data.email);
    params.set("client_reference_id", registrationReference);
    params.set("allow_promotion_codes", "true");
    params.set("billing_address_collection", "auto");
    params.set("phone_number_collection[enabled]", "true");
    params.set("line_items[0][quantity]", "1");
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", String(serviceLevel.amount));
    params.set("line_items[0][price_data][product_data][name]", "Chess & Truck Tournament");
    params.set(
      "line_items[0][price_data][product_data][description]",
      `${serviceLevel.label} | ${data.section} section`
    );

    Object.entries(buildMetadata(data, serviceLevel, registrationReference)).forEach(
      ([key, value]) => {
        if (value) {
          params.set(`metadata[${key}]`, value);
        }
      }
    );

    const stripeResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const stripePayload = await stripeResponse.json().catch(() => ({}));

    if (!stripeResponse.ok || !stripePayload.url) {
      return Response.json(
        {
          error:
            stripePayload?.error?.message ||
            "Stripe checkout could not be created right now. Please try again.",
        },
        { status: 502 }
      );
    }

    return Response.json(
      {
        url: stripePayload.url,
        reference: registrationReference,
      },
      { status: 200 }
    );
  },
};
