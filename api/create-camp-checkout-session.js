import crypto from "node:crypto";
import { applyRateLimit } from "./_lib/rate-limit.js";
import { getRegistrationUnavailableMessage } from "../src/lib/programs.js";
import { getApprovedSessionLabels } from "../src/lib/launchReadiness.js";
import { campAddOns, campExtraServices, campOptions } from "./_lib/priceCatalog.js";
import { checkRegistrationGate } from "./_lib/registrationGate.js";

const flexPackOptionIds = new Set();
const dateSelectionOptionIds = new Set(["single-day", "half-day-am", "half-day-pm"]);

const sanitize = (value, limit = 120) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, limit);
};

const sanitizeAddOns = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => sanitize(item, 40))
    .filter((item, index, list) => item && list.indexOf(item) === index && campAddOns[item]);
};

const sanitizeServiceSelections = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.entries(campExtraServices).reduce((accumulator, [serviceId, service]) => {
    const rawSelection =
      value[serviceId] && typeof value[serviceId] === "object" ? value[serviceId] : {};

    if (rawSelection.option === "selected") {
      accumulator[serviceId] = {
        ...service,
      };
    }

    return accumulator;
  }, {});
};

const sanitizeSelectedDays = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => sanitize(item, 120))
    .filter((item, index, list) => item && list.indexOf(item) === index);
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

const validateCampBookingPayload = (payload, optionId) => {
  const errors = {};
  const selectedDays = sanitizeSelectedDays(payload.selectedDays);
  const isWeeklyOption = optionId === "full-week";
  const isDateSelectionOption = dateSelectionOptionIds.has(optionId);

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
  if (isWeeklyOption && !sanitize(payload.schedulePreference, 140)) {
    errors.schedulePreference = "Preferred week is required.";
  }
  if (isWeeklyOption && selectedDays.length === 0) {
    errors.selectedDays = "Please choose at least one camp day in the selected week.";
  }
  if (isDateSelectionOption && selectedDays.length === 0) {
    errors.selectedDays =
      optionId === "single-day"
        ? "Please choose at least one camp day."
        : "Please choose at least one half-day session.";
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

const parseCsvEnv = (value) => {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
};

const normalizeQaEmail = (value) => sanitize(value, 180).toLowerCase();

const normalizeQaPhone = (value) => sanitize(value, 40).replace(/\D/g, "");

// $1 QA pricing is test-only: it needs the flag, a non-production deployment,
// AND a Stripe test-mode key. With a live key or in production it is always off.
export const isQaModeEnabled = (env = process.env) =>
  String(env.CAMP_QA_MODE || "").toLowerCase() === "true" &&
  env.VERCEL_ENV !== "production" &&
  /^(sk|rk)_test_/.test(String(env.STRIPE_SECRET_KEY || ""));

const isQaEligibleBooking = ({ email, phone }) => {
  if (!isQaModeEnabled()) {
    return false;
  }

  const allowedEmails = new Set(parseCsvEnv(process.env.CAMP_QA_EMAILS).map(normalizeQaEmail));
  const allowedPhones = new Set(parseCsvEnv(process.env.CAMP_QA_PHONES).map(normalizeQaPhone));

  const normalizedEmail = normalizeQaEmail(email);
  const normalizedPhone = normalizeQaPhone(phone);

  return (
    (normalizedEmail && allowedEmails.has(normalizedEmail)) ||
    (normalizedPhone && allowedPhones.has(normalizedPhone))
  );
};

const getQaAmountOverride = (amount, isQaEligible) => (isQaEligible ? 100 : amount);

const weeklyOptionIds = new Set(["full-week"]);

// Only days and weeks inside approved launch sessions can be booked, so stale
// or hand-crafted dates are rejected even after camps open.
export const validateApprovedSchedule = ({ optionId, schedulePreference, selectedDays, sessions }) => {
  const { days, weeks } = getApprovedSessionLabels(sessions);

  if (weeklyOptionIds.has(optionId) && !weeks.has(schedulePreference)) {
    return false;
  }

  if ((weeklyOptionIds.has(optionId) || dateSelectionOptionIds.has(optionId)) && selectedDays.length === 0) {
    return false;
  }

  return selectedDays.every((day) => days.has(day));
};

const formatApprovedLocation = (location) =>
  location?.type === "online"
    ? `Online (${location.platform})`
    : [location?.name, location?.address].filter(Boolean).join(", ");

export const runtime = "nodejs";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    // Launch gate: runs before rate limiting, QA pricing, and Stripe.
    const gate = await checkRegistrationGate("camps");

    if (!gate.ready) {
      return Response.json(
        { error: getRegistrationUnavailableMessage("Camp") },
        { status: 409 }
      );
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

    const fieldErrors = validateCampBookingPayload(payload, optionId);

    if (Object.keys(fieldErrors).length > 0) {
      return Response.json(
        { error: "Please review the booking details and try again.", fieldErrors },
        { status: 400 }
      );
    }

    const scheduleIsApproved = validateApprovedSchedule({
      optionId,
      schedulePreference: sanitize(payload.schedulePreference, 140),
      selectedDays: sanitizeSelectedDays(payload.selectedDays),
      sessions: gate.config?.sessions,
    });

    if (!scheduleIsApproved) {
      return Response.json(
        { error: "Please choose an available camp date.", fieldErrors: { selectedDays: "Please choose an available camp date." } },
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
    const selectedDays = sanitizeSelectedDays(payload.selectedDays);
    const selectedDaysSummary = selectedDays.join(", ");
    const isDateSelectionOption = dateSelectionOptionIds.has(optionId);
    const isFlexiblePackOption = flexPackOptionIds.has(optionId);
    const allowsAddOns =
      optionId === "full-week" || isDateSelectionOption || isFlexiblePackOption;
    const selectedAddOns = allowsAddOns ? sanitizeAddOns(payload.addOns) : [];
    const selectedExtraServices = allowsAddOns ? sanitizeServiceSelections(payload.serviceSelections) : {};
    const addOnSummary = selectedAddOns.map((item) => campAddOns[item].label).join(", ");
    const extraServiceSummary = Object.values(selectedExtraServices)
      .map((item) => item.label)
      .join(", ");
    const dayQuantity = isDateSelectionOption ? selectedDays.length : 1;
    const addOnUnitTotal = selectedAddOns.reduce((sum, item) => sum + campAddOns[item].amount, 0);
    const extraServicesTotal = Object.values(selectedExtraServices).reduce(
      (sum, item) => sum + item.amount,
      0
    );
    const addOnTotal = allowsAddOns
      ? isDateSelectionOption
        ? addOnUnitTotal * dayQuantity
        : isFlexiblePackOption
          ? 0
        : addOnUnitTotal
      : 0;
    const totalAmount =
      isDateSelectionOption
        ? selectedOption.amount * dayQuantity + addOnTotal + extraServicesTotal
        : selectedOption.amount + addOnTotal + extraServicesTotal;
    const scheduleSummary =
      optionId === "single-day" || optionId === "half-day-am" || optionId === "half-day-pm"
        ? selectedDays.length === 1
          ? selectedDays[0]
          : `${selectedDays.length} selected ${optionId === "single-day" ? "camp days" : "half-day sessions"}`
        : schedulePreference;
    const notes = sanitize(payload.notes, 300);
    const isQaEligible = isQaEligibleBooking({ email, phone });
    const baseLineItemAmount = getQaAmountOverride(
      isDateSelectionOption ? selectedOption.amount + addOnUnitTotal : totalAmount,
      isQaEligible
    );

    const params = new URLSearchParams();

    params.set("mode", "payment");
    params.set("success_url", successUrlString);
    params.set("cancel_url", cancelUrl.toString());
    params.set("adaptive_pricing[enabled]", "false");
    params.set("allow_promotion_codes", "true");
    params.set("billing_address_collection", "auto");
    params.set("phone_number_collection[enabled]", "true");
    params.set("customer_email", email);
    params.set("line_items[0][quantity]", String(dayQuantity));
    params.set("line_items[0][price_data][currency]", "usd");
    params.set("line_items[0][price_data][unit_amount]", String(baseLineItemAmount));
    params.set(
      "line_items[0][price_data][product_data][name]",
      selectedOption.label
    );
    params.set(
      "line_items[0][price_data][product_data][description]",
      `${selectedOption.description} | ${scheduleSummary}${
        selectedDaysSummary ? ` | ${selectedDaysSummary}` : ""
      }${
        addOnSummary ? ` | ${addOnSummary}` : ""
      }${
        extraServiceSummary ? ` | ${extraServiceSummary}` : ""
      }`
    );
    params.set("client_reference_id", reference);
    params.set("metadata[registration_reference]", reference);
    params.set("metadata[booking_type]", "camp");
    params.set("metadata[program_id]", "camps");
    params.set("metadata[service_level]", selectedOption.label);
    params.set("metadata[camp_option]", optionId);
    params.set("metadata[program_name]", "Chess and Truck Summer Camp");
    params.set("metadata[location]", formatApprovedLocation(gate.config?.location));
    params.set("metadata[camp_time]", selectedOption.campTime || "9:00 AM - 3:00 PM");
    params.set("metadata[parent_name]", `${parentFirstName} ${parentLastName}`.trim());
    params.set("metadata[parent_first_name]", parentFirstName);
    params.set("metadata[parent_last_name]", parentLastName);
    params.set("metadata[parent_email]", email);
    params.set("metadata[parent_phone]", phone);
    params.set("metadata[student_name]", studentName);
    params.set("metadata[student_age]", studentAge);
    params.set("metadata[student_level]", studentLevel);
    params.set("metadata[schedule_preference]", scheduleSummary);
    params.set("metadata[selected_days]", selectedDaysSummary || "None");
    params.set("metadata[add_ons]", addOnSummary || "None");
    params.set("metadata[add_ons_total]", String(addOnTotal));
    params.set("metadata[extra_services]", extraServiceSummary || "None");
    params.set("metadata[extra_services_total]", String(extraServicesTotal));
    params.set("metadata[notes]", notes);
    params.set("metadata[qa_mode]", isQaEligible ? "enabled" : "disabled");

    Object.values(selectedExtraServices).forEach((item, index) => {
      const lineItemIndex = index + 1;
      params.set(`line_items[${lineItemIndex}][quantity]`, "1");
      params.set(`line_items[${lineItemIndex}][price_data][currency]`, "usd");
      params.set(
        `line_items[${lineItemIndex}][price_data][unit_amount]`,
        String(getQaAmountOverride(item.amount, isQaEligible))
      );
      params.set(`line_items[${lineItemIndex}][price_data][product_data][name]`, item.label);
      params.set(
        `line_items[${lineItemIndex}][price_data][product_data][description]`,
        item.description
      );
    });

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
