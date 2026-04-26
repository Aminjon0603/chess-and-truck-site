import crypto from "node:crypto";
import { getNotificationRecipients, sendResendEmail } from "./_lib/resend.js";

const processedEvents = globalThis.__chessTruckProcessedStripeEvents || new Map();
globalThis.__chessTruckProcessedStripeEvents = processedEvents;

const WEBHOOK_TOLERANCE_MS = 5 * 60 * 1000;

const safeCompareHex = (left, right) => {
  if (!left || !right || left.length !== right.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(Buffer.from(left, "hex"), Buffer.from(right, "hex"));
  } catch {
    return false;
  }
};

const parseStripeSignature = (signatureHeader) => {
  const parsed = { timestamp: "", signatures: [] };

  signatureHeader.split(",").forEach((part) => {
    const [key, value] = part.split("=");

    if (key === "t") parsed.timestamp = value;
    if (key === "v1") parsed.signatures.push(value);
  });

  return parsed;
};

const verifyStripeSignature = (payload, signatureHeader, secret) => {
  const { timestamp, signatures } = parseStripeSignature(signatureHeader);

  if (!timestamp || signatures.length === 0) {
    return false;
  }

  const age = Math.abs(Date.now() - Number(timestamp) * 1000);

  if (Number.isNaN(age) || age > WEBHOOK_TOLERANCE_MS) {
    return false;
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${timestamp}.${payload}`, "utf8")
    .digest("hex");

  return signatures.some((signature) => safeCompareHex(signature, expected));
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

const getProgramLabel = (session) => {
  const metadata = session.metadata || {};

  if (metadata.booking_type === "camp") {
    return metadata.program_name || "CHESS AND TRUCK Summer Camp";
  }

  return "CHESS AND TRUCK";
};

const buildCampReceiptLines = (session) => {
  const metadata = session.metadata || {};
  const addOns = metadata.add_ons || "None";
  const addOnsTotal = Number(metadata.add_ons_total || 0);
  const extraServices = metadata.extra_services || "None";
  const extraServicesTotal = Number(metadata.extra_services_total || 0);
  const selectedDays = metadata.selected_days || "";
  const combinedServices = [addOns, extraServices].filter((item) => item && item !== "None").join(", ");
  const combinedServicesTotal = addOnsTotal + extraServicesTotal;

  return [
    `Reference: ${metadata.registration_reference || session.client_reference_id || "-"}`,
    `Camp option: ${metadata.service_level || "-"}`,
    `Location: ${metadata.location || "-"}`,
    `Date: ${metadata.schedule_preference || "-"}`,
    selectedDays && selectedDays !== "None" ? `Selected days: ${selectedDays}` : null,
    `Camp time: ${metadata.camp_time || "9:00 AM - 3:00 PM"}`,
    `Parent name: ${metadata.parent_name || "-"}`,
    `Parent email: ${metadata.parent_email || session.customer_details?.email || "-"}`,
    `Parent phone: ${metadata.parent_phone || "-"}`,
    `Student name: ${metadata.student_name || "-"}`,
    `Student age: ${metadata.student_age || "-"}`,
    `Student level: ${metadata.student_level || "-"}`,
    `Additional services: ${combinedServices || "None"}`,
    combinedServices
      ? `Additional services total: ${formatAmount(combinedServicesTotal, session.currency)}`
      : null,
    `Notes: ${metadata.notes || "None"}`,
    `Amount paid: ${formatAmount(session.amount_total, session.currency)}`,
    `Stripe session ID: ${session.id}`,
  ].filter(Boolean);
};

const buildInternalText = (session) => {
  const metadata = session.metadata || {};
  const isCamp = metadata.booking_type === "camp";

  if (isCamp) {
    return [
      `Stripe payment confirmed for ${getProgramLabel(session)}.`,
      "",
      ...buildCampReceiptLines(session),
    ].join("\n");
  }

  return [
    `Stripe payment confirmed for ${getProgramLabel(session)}.`,
    "",
    `Reference: ${metadata.registration_reference || session.client_reference_id || "-"}`,
    `Parent email: ${metadata.parent_email || session.customer_details?.email || "-"}`,
    `Amount: ${formatAmount(session.amount_total, session.currency)}`,
    `Stripe session ID: ${session.id}`,
  ]
    .filter(Boolean)
    .join("\n");
};

const buildCustomerText = (session) => {
  const metadata = session.metadata || {};
  const isCamp = metadata.booking_type === "camp";

  if (isCamp) {
    return [
      `Your payment for ${getProgramLabel(session)} has been confirmed.`,
      "",
      ...buildCampReceiptLines(session).filter((line) => !line.startsWith("Stripe session ID:")),
      "",
      "The camp team can follow up with schedule and registration details using the contact information from your booking.",
    ].join("\n");
  }

  return [
    `Your payment for ${getProgramLabel(session)} has been confirmed.`,
    "",
    `Reference: ${metadata.registration_reference || session.client_reference_id || "-"}`,
    `Amount paid: ${formatAmount(session.amount_total, session.currency)}`,
    "",
    "The program team can follow up using the registration details you submitted before checkout.",
  ]
    .filter(Boolean)
    .join("\n");
};

const markProcessed = (eventId) => {
  processedEvents.set(eventId, Date.now());

  for (const [key, value] of processedEvents.entries()) {
    if (Date.now() - value > 24 * 60 * 60 * 1000) {
      processedEvents.delete(key);
    }
  }
};

export const runtime = "nodejs";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
      return Response.json(
        { error: "Stripe webhook secret is not configured yet." },
        { status: 500 }
      );
    }

    const signature = request.headers.get("stripe-signature") || "";
    const rawBody = await request.text();

    if (!verifyStripeSignature(rawBody, signature, webhookSecret)) {
      return Response.json({ error: "Invalid Stripe signature." }, { status: 400 });
    }

    let event;

    try {
      event = JSON.parse(rawBody);
    } catch {
      return Response.json({ error: "Invalid webhook payload." }, { status: 400 });
    }

    if (processedEvents.has(event.id)) {
      return Response.json({ received: true, duplicate: true }, { status: 200 });
    }

    const supportedTypes = new Set([
      "checkout.session.completed",
      "checkout.session.async_payment_succeeded",
    ]);

    if (!supportedTypes.has(event.type)) {
      markProcessed(event.id);
      return Response.json({ received: true, ignored: true }, { status: 200 });
    }

    const session = event.data?.object;

    if (!session || session.object !== "checkout.session" || session.payment_status !== "paid") {
      markProcessed(event.id);
      return Response.json({ received: true, ignored: true }, { status: 200 });
    }

    const metadata = session.metadata || {};
    const internalRecipients = getNotificationRecipients();
    const replyTo = metadata.parent_email || session.customer_details?.email || "";

    await sendResendEmail({
      to: internalRecipients,
      subject: `Payment confirmed - ${metadata.service_level || metadata.player_name || "Checkout payment"} (${metadata.registration_reference || session.client_reference_id || session.id})`,
      text: buildInternalText(session),
      replyTo,
    }).catch(() => null);

    const customerEmail = metadata.parent_email || session.customer_details?.email || "";

    if (customerEmail) {
      await sendResendEmail({
        to: [customerEmail],
        subject: `${getProgramLabel(session)} payment confirmed`,
        text: buildCustomerText(session),
      }).catch(() => null);
    }

    markProcessed(event.id);
    return Response.json({ received: true }, { status: 200 });
  },
};
