import crypto from "node:crypto";
import { applyRateLimit } from "./_lib/rate-limit.js";

const campOptions = {
  "full-week": {
    label: "Full Week Camp",
    amount: 45000,
    description: "Five camp days in one week at the House of Chess and Checkers, Central Park.",
  },
  "single-day": {
    label: "Single Day",
    amount: 10000,
    description: "One camp day with lessons, coached games, and structured chess work in Central Park.",
  },
};

const sanitize = (value, limit = 120) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, limit);
};

const normalizeReturnPath = (value, optionId) => {
  const fallback = `/camps/book?option=${optionId}`;

  if (typeof value !== "string") {
    return fallback;
  }

  const trimmed = value.trim();

  if (!trimmed.startsWith("/camps/book")) {
    return fallback;
  }

  return trimmed.slice(0, 200);
};

const validateCampBookingPayload = (payload) => {
  const errors = {};

  if (!sanitize(payload.parentFirstName)) errors.parentFirstName = "Parent first name is required.";
  if (!sanitize(payload.parentLastName)) errors.parentLastName = "Parent last name is required.";

  const email = sanitize(payload.email, 180);
  if (!email) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const phone = sanitize(payload.phone, 40);
  if (!phone) {
    errors.phone = "Phone is required.";
  } else if (phone.replace(/\D/g, "").length < 7) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!sanitize(payload.studentName)) errors.studentName = "Student name is required.";
  if (!sanitize(payload.studentAge)) errors.studentAge = "Student age or grade is required.";
  if (!sanitize(payload.studentLevel)) errors.studentLevel = "Student level is required.";
  if (!sanitize(payload.schedulePreference, 140)) {
    errors.schedulePreference = "Preferred week or day is required.";
  }

  return errors;
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

const buildReference = () => {
  const dateCode = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `CT-CAMP-${dateCode}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
};

const appendRawQueryParam = (url, key, value) => {
  const separator = url.search ? "&" : "?";
  return `${url.toString()}${separator}${key}=${value}`;
};

export const runtime = "nodejs";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    const limited = applyRateLimit(request, "camp-checkout", {
      limit: 10,
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

    const optionId = sanitize(payload.optionId, 32);
    const selectedOption = campOptions[optionId];

    if (!selectedOption) {
      return Response.json({ error: "Please choose a valid camp option." }, { status: 400 });
    }

    if (sanitize(payload.website, 10)) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    const fieldErrors = validateCampBookingPayload(payload);

    if (Object.keys(fieldErrors).length > 0) {
      return Response.json(
        { error: "Please review the booking details and try again.", fieldErrors },
        { status: 400 }
      );
    }

    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!stripeSecretKey) {
      return Response.json(
        { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY in Vercel first." },
        { status: 500 }
      );
    }

    const reference = buildReference();
    const returnPath = normalizeReturnPath(payload.returnPath, optionId);
    const successUrl = new URL("/camps/confirmed", getBaseUrl(request));
    successUrl.searchParams.set("payment", "success");
    const successUrlString = appendRawQueryParam(successUrl, "session_id", "{CHECKOUT_SESSION_ID}");

    const cancelUrl = new URL(returnPath, getBaseUrl(request));
    cancelUrl.searchParams.set("payment", "cancel");

    const parentFirstName = sanitize(payload.parentFirstName, 80);
    const parentLastName = sanitize(payload.parentLastName, 80);
    const email = sanitize(payload.email, 180);
    const phone = sanitize(payload.phone, 40);
    const studentName = sanitize(payload.studentName, 120);
    const studentAge = sanitize(payload.studentAge, 80);
    const studentLevel = sanitize(payload.studentLevel, 120);
    const schedulePreference = sanitize(payload.schedulePreference, 140);
    const notes = sanitize(payload.notes, 300);

    const params = new URLSearchParams();

    params.set("mode", "payment");
    params.set("success_url", successUrlString);
    params.set("cancel_url", cancelUrl.toString());
    params.set("adaptive_pricing[enabled]", "false");
    params.set("allow_promotion_codes", "true");
    params.set("billing_address_collection", "auto");
    params.set("phone_number_collection[enabled]", "true");
    params.set("customer_email", email);
    params.set("line_items[0][quantity]", "1");
    params.set("line_items[0][adjustable_quantity][enabled]", "true");
    params.set("line_items[0][adjustable_quantity][minimum]", "1");
    params.set("line_items[0][adjustable_quantity][maximum]", "6");
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", String(selectedOption.amount));
    params.set("line_items[0][price_data][product_data][name]", "Chess and Truck Summer Camp");
    params.set(
      "line_items[0][price_data][product_data][description]",
      `${selectedOption.label} | June 15 - August 21 | House of Chess and Checkers, Central Park`
    );
    params.set("client_reference_id", reference);
    params.set("metadata[booking_type]", "camp");
    params.set("metadata[service_level]", selectedOption.label);
    params.set("metadata[camp_option]", optionId);
    params.set("metadata[program_name]", "Chess and Truck Summer Camp");
    params.set("metadata[location]", "House of Chess and Checkers, Central Park");
    params.set("metadata[parent_name]", `${parentFirstName} ${parentLastName}`.trim());
    params.set("metadata[parent_email]", email);
    params.set("metadata[parent_phone]", phone);
    params.set("metadata[student_name]", studentName);
    params.set("metadata[student_age]", studentAge);
    params.set("metadata[student_level]", studentLevel);
    params.set("metadata[schedule_preference]", schedulePreference);
    params.set("metadata[notes]", notes);

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
            "Camp checkout could not be created right now. Please try again.",
        },
        { status: 502 }
      );
    }

    return Response.json({ url: stripePayload.url, reference }, { status: 200 });
  },
};
