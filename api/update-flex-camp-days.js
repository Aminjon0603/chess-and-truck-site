import { getNotificationRecipients, sendResendEmail } from "./_lib/resend.js";

const DAYS_REQUIRED = 5;

const sanitize = (value, limit = 180) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, limit);
};

const buildCampDayOptions = () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const values = [];
  const endDate = new Date(2026, 7, 21);

  for (let current = new Date(2026, 5, 15); current <= endDate; ) {
    if (current.getDay() !== 0 && current.getDay() !== 6) {
      values.push(formatter.format(current));
    }

    current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1);
  }

  return values;
};

const ALLOWED_DAYS = new Set(buildCampDayOptions());

const parseSelectedDays = (value) => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => sanitize(item, 120))
    .filter((item, index, list) => item && list.indexOf(item) === index);
};

const formatAmount = (amountTotal, currency = "usd") => {
  if (typeof amountTotal !== "number") {
    return "Paid in Stripe";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountTotal / 100);
};

const buildManageReceiptLines = (session, selectedDays) => {
  const metadata = session.metadata || {};
  const addOns = metadata.add_ons || "None";
  const addOnsTotal = Number(metadata.add_ons_total || 0);

  return [
    `Reference: ${metadata.registration_reference || session.client_reference_id || session.id}`,
    `Camp option: ${metadata.service_level || "Flexible 5-Day Pack"}`,
    `Location: ${metadata.location || "-"}`,
    `Selected camp days: ${selectedDays.join(", ")}`,
    `Camp time: ${metadata.camp_time || "9:00 AM - 12:00 PM"}`,
    `Parent name: ${metadata.parent_name || "-"}`,
    `Parent email: ${metadata.parent_email || session.customer_details?.email || "-"}`,
    `Parent phone: ${metadata.parent_phone || "-"}`,
    `Student name: ${metadata.student_name || "-"}`,
    `Student age: ${metadata.student_age || "-"}`,
    `Student level: ${metadata.student_level || "-"}`,
    `Additional services: ${addOns}`,
    addOns !== "None" ? `Additional services total: ${formatAmount(addOnsTotal, session.currency)}` : null,
    `Notes: ${metadata.notes || "None"}`,
    `Amount paid: ${formatAmount(session.amount_total, session.currency)}`,
    `Stripe session ID: ${session.id}`,
  ].filter(Boolean);
};

export const runtime = "nodejs";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    let payload;

    try {
      payload = await request.json();
    } catch {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    const sessionId = sanitize(payload.sessionId, 120);
    const selectedDays = parseSelectedDays(payload.selectedDays);
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!sessionId) {
      return Response.json({ error: "Checkout session ID is required." }, { status: 400 });
    }

    if (!stripeSecretKey) {
      return Response.json({ error: "Stripe is not configured yet." }, { status: 500 });
    }

    if (selectedDays.length !== DAYS_REQUIRED) {
      return Response.json(
        { error: `Please select exactly ${DAYS_REQUIRED} camp days.` },
        { status: 400 }
      );
    }

    if (selectedDays.some((item) => !ALLOWED_DAYS.has(item))) {
      return Response.json(
        { error: "One or more selected days are not valid camp weekdays." },
        { status: 400 }
      );
    }

    const retrieveResponse = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
        },
      }
    );

    const session = await retrieveResponse.json().catch(() => ({}));

    if (!retrieveResponse.ok) {
      return Response.json(
        { error: session?.error?.message || "Stripe session could not be retrieved." },
        { status: 502 }
      );
    }

    if (session.payment_status !== "paid") {
      return Response.json({ error: "Payment must be completed before choosing camp days." }, { status: 409 });
    }

    if (session.metadata?.booking_type !== "camp" || session.metadata?.camp_option !== "full-week") {
      return Response.json({ error: "This checkout session is not a flexible camp pack." }, { status: 400 });
    }

    const params = new URLSearchParams();
    params.set("metadata[selected_days]", selectedDays.join(" | "));
    params.set("metadata[schedule_preference]", selectedDays.join(", "));
    params.set("metadata[day_selection_status]", "confirmed");

    const updateResponse = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      }
    );

    const updatedSession = await updateResponse.json().catch(() => ({}));

    if (!updateResponse.ok) {
      return Response.json(
        { error: updatedSession?.error?.message || "Camp days could not be saved right now." },
        { status: 502 }
      );
    }

    const internalRecipients = getNotificationRecipients();
    const replyTo = updatedSession.metadata?.parent_email || updatedSession.customer_details?.email || "";
    const textLines = buildManageReceiptLines(updatedSession, selectedDays);
    const origin = new URL(request.url).origin;
    const manageUrl = `${origin}/camps/confirmed?session_id=${encodeURIComponent(updatedSession.id)}`;

    await sendResendEmail({
      to: internalRecipients,
      subject: `Flexible camp days selected (${updatedSession.metadata?.registration_reference || updatedSession.id})`,
      text: [
        "Flexible camp days have been selected.",
        "",
        ...textLines,
        `Manage link: ${manageUrl}`,
      ].join("\n"),
      replyTo,
    }).catch(() => null);

    const customerEmail = updatedSession.metadata?.parent_email || updatedSession.customer_details?.email || "";

    if (customerEmail) {
      await sendResendEmail({
        to: [customerEmail],
        subject: "Your flexible camp days are confirmed",
        text: [
          "Your flexible 5-day camp pack dates are confirmed.",
          "",
          ...textLines.filter((line) => !line.startsWith("Stripe session ID:")),
          "",
          `Need to review or update later? Use this link: ${manageUrl}`,
        ].join("\n"),
      }).catch(() => null);
    }

    return Response.json(
      {
        ok: true,
        message: "Your camp days have been saved.",
        selectedDays,
      },
      { status: 200 }
    );
  },
};
