// Online private lesson orders: idempotent fulfillment of a paid Stripe Checkout
// Session. Called by the Stripe webhook (signature-verified) and by the
// thank-you page's status check (session re-read from Stripe with the secret
// key), whichever arrives first. The order row in Supabase is unique per
// Checkout Session, and the confirmation emails are claimed atomically, so a
// repeated webhook or both paths together never create a second order or a
// second set of emails.
import { getSupabaseConfig } from "./supabaseInterestStore.js";
import { onlineLessonPackages } from "./priceCatalog.js";
import { getNotificationRecipients, sendResendEmail } from "./resend.js";
import { SITE_TERMS_URL } from "../../src/lib/legal.js";

export const LESSON_BOOKING_TYPE = "online_lessons";
export const LESSON_PROGRAM_ID = "onlineLessons";

export const LESSON_THANK_YOU_MESSAGE =
  "Thank you for your purchase! Our team will contact you by email to arrange your online lessons.";

// Same rules as the Terms of Service and the checkout summary.
export const LESSON_POLICY_LINES = [
  "Tell us at least 24 hours before a lesson to reschedule it at no cost.",
  "A lesson canceled with less than 24 hours' notice, or missed, counts as used. There is no extra charge.",
  "You can get a refund for unused lessons at your package's per-lesson price.",
  "Unused lessons never expire.",
  "Send rescheduling, cancellation, and refund requests to info@chessandtruck.com.",
];

// Refund for unused lessons: each one is worth the package's per-lesson price
// (single $150, five $135, ten $120). Used lessons are never repriced.
export const getPerLessonCents = (packageId) => {
  const lessonPackage = onlineLessonPackages[packageId];
  return lessonPackage ? lessonPackage.amount / lessonPackage.lessons : null;
};

export const getUnusedLessonRefundCents = (packageId, usedLessons) => {
  const lessonPackage = onlineLessonPackages[packageId];

  if (!lessonPackage || !Number.isInteger(usedLessons) || usedLessons < 0 || usedLessons > lessonPackage.lessons) {
    return null;
  }

  return (lessonPackage.lessons - usedLessons) * getPerLessonCents(packageId);
};

const TABLE = "lesson_orders";

export const createLessonOrderStore = ({ url, key }, fetchImpl = (...args) => fetch(...args)) => {
  const headers = {
    apikey: key,
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(key.startsWith("eyJ") ? { Authorization: `Bearer ${key}` } : {}),
  };

  const request = async (path, { method = "GET", body, prefer } = {}) => {
    const response = await fetchImpl(`${url}/rest/v1/${path}`, {
      method,
      headers: prefer ? { ...headers, Prefer: prefer } : headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Supabase request failed (${response.status})`);
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  };

  const bySession = (sessionId) => `stripe_session_id=eq.${encodeURIComponent(sessionId)}`;

  return {
    // Inserts the order once. A second call for the same session inserts nothing.
    async record(row) {
      await request(`${TABLE}?on_conflict=stripe_session_id`, {
        method: "POST",
        body: {
          order_number: row.orderNumber,
          stripe_session_id: row.sessionId,
          package_id: row.packageId,
          amount_cents: row.amountCents,
          currency: row.currency,
          livemode: row.livemode,
        },
        prefer: "resolution=ignore-duplicates,return=minimal",
      });
    },

    // Only one caller gets true: the claim is a conditional update.
    async claimNotification(sessionId) {
      const rows = await request(`${TABLE}?${bySession(sessionId)}&notify_claimed_at=is.null`, {
        method: "PATCH",
        body: { notify_claimed_at: new Date().toISOString() },
        prefer: "return=representation",
      });
      return Array.isArray(rows) && rows.length === 1;
    },

    async markNotified(sessionId) {
      await request(`${TABLE}?${bySession(sessionId)}`, {
        method: "PATCH",
        body: { notified_at: new Date().toISOString() },
        prefer: "return=minimal",
      });
    },

    // Lets a later webhook retry send the emails if sending failed.
    async releaseNotification(sessionId) {
      await request(`${TABLE}?${bySession(sessionId)}&notified_at=is.null`, {
        method: "PATCH",
        body: { notify_claimed_at: null },
        prefer: "return=minimal",
      });
    },
  };
};

export const getLessonOrderStore = (env = process.env) => {
  const config = getSupabaseConfig(env);
  return config ? createLessonOrderStore(config) : null;
};

const formatUsd = (cents) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

export const isLessonSession = (session) => session?.metadata?.booking_type === LESSON_BOOKING_TYPE;

// What a paid lesson session means, checked against the server's catalog.
export const describeLessonSession = (session) => {
  const metadata = session?.metadata || {};
  const lessonPackage = onlineLessonPackages[metadata.package_id];

  return {
    orderNumber: metadata.order_number || session?.client_reference_id || "",
    packageId: metadata.package_id || "",
    lessonPackage,
    packageLabel: lessonPackage ? lessonPackage.label : "Unknown package",
    amountCents: typeof session?.amount_total === "number" ? session.amount_total : null,
    // The price before any promotion code must match the catalog; otherwise the
    // order is flagged for review.
    amountMatches:
      Boolean(lessonPackage) &&
      (typeof session?.amount_subtotal === "number" ? session.amount_subtotal : session?.amount_total) ===
        lessonPackage.amount,
    discountCents: session?.total_details?.amount_discount || 0,
    livemode: session?.livemode === true,
    parentName: metadata.parent_name || "",
    parentEmail: metadata.parent_email || session?.customer_details?.email || "",
    parentPhone: metadata.parent_phone || session?.customer_details?.phone || "",
    studentName: metadata.student_name || "",
    studentAge: metadata.student_age || "",
    studentLevel: metadata.student_level || "",
    notes: metadata.notes || "",
    termsVersion: metadata.terms_version || "",
    termsAcceptedAt: metadata.terms_accepted_at || "",
  };
};

const packageLine = (order) =>
  order.lessonPackage
    ? `${order.packageLabel} (${order.lessonPackage.lessons} private online lesson${order.lessonPackage.lessons > 1 ? "s" : ""}, 60 minutes each)`
    : order.packageLabel;

export const buildParentEmailText = (order) =>
  [
    LESSON_THANK_YOU_MESSAGE,
    "",
    `Order number: ${order.orderNumber}`,
    `Package: ${packageLine(order)}`,
    order.amountCents !== null ? `Amount paid: ${formatUsd(order.amountCents)}` : null,
    order.studentName ? `Student: ${order.studentName}` : null,
    "",
    order.lessonPackage
      ? `Per-lesson price for refunds: ${formatUsd(order.lessonPackage.amount / order.lessonPackage.lessons)}`
      : null,
    "",
    "Booking & Rescheduling Policy",
    ...LESSON_POLICY_LINES.map((line) => `- ${line}`),
    "",
    `Terms of Service: ${SITE_TERMS_URL}`,
    "",
    "Questions? Reply to this email or write to info@chessandtruck.com.",
    "",
    "Chess & Truck",
  ]
    .filter((line) => line !== null)
    .join("\n");

export const buildTeamEmailText = (order, session) =>
  [
    order.livemode ? null : "TEST MODE: no real money was charged.",
    order.amountMatches ? null : "REVIEW NEEDED: the amount paid does not match the package price.",
    "A family bought online private lessons. Please contact them by email to arrange the lessons.",
    "",
    `Order number: ${order.orderNumber}`,
    `Package: ${packageLine(order)}`,
    `Amount paid: ${order.amountCents !== null ? formatUsd(order.amountCents) : "-"}`,
    order.discountCents
      ? `Promotion code discount: ${formatUsd(order.discountCents)}. Refunds for discounted purchases need a manual decision.`
      : null,
    "",
    `Parent / guardian: ${order.parentName || "-"}`,
    `Parent email: ${order.parentEmail || "-"}`,
    `Parent phone: ${order.parentPhone || "-"}`,
    "",
    `Student: ${order.studentName || "-"}`,
    `Student age: ${order.studentAge || "-"}`,
    `Chess level: ${order.studentLevel || "-"}`,
    `Notes for the coach: ${order.notes || "-"}`,
    "",
    order.lessonPackage
      ? `Refund value per unused lesson: ${formatUsd(order.lessonPackage.amount / order.lessonPackage.lessons)}`
      : null,
    `Terms of Service accepted: version ${order.termsVersion || "-"} at ${order.termsAcceptedAt || "-"}`,
    "",
    `Stripe Checkout Session: ${session.id}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

/**
 * Records a paid lesson session once and sends the parent and team emails once.
 * Throws when the order store is unavailable, so the webhook returns an error
 * and Stripe retries later.
 * @returns {Promise<{ order: object, notified: boolean }>}
 */
export const fulfillLessonOrder = async (
  session,
  { store = getLessonOrderStore(), send = sendResendEmail, teamRecipients = getNotificationRecipients() } = {}
) => {
  if (!isLessonSession(session) || session.payment_status !== "paid") {
    throw new Error("Not a paid lesson session.");
  }

  if (!store) {
    throw new Error("Lesson order store is not configured.");
  }

  const order = describeLessonSession(session);

  await store.record({
    orderNumber: order.orderNumber || session.id,
    sessionId: session.id,
    packageId: order.lessonPackage ? order.packageId : "single",
    amountCents: order.amountCents || 1,
    currency: session.currency || "usd",
    livemode: order.livemode,
  });

  if (!(await store.claimNotification(session.id))) {
    return { order, notified: false };
  }

  const testTag = order.livemode ? "" : "[TEST] ";
  const reviewTag = order.amountMatches ? "" : "[REVIEW NEEDED] ";

  const team = await send({
    to: teamRecipients,
    subject: `${testTag}${reviewTag}New online lesson purchase - ${order.packageLabel} (${order.orderNumber})`,
    text: buildTeamEmailText(order, session),
    replyTo: order.parentEmail || undefined,
  }).catch(() => ({ ok: false }));

  const parent = order.parentEmail
    ? await send({
        to: [order.parentEmail],
        subject: `${testTag}Your Chess & Truck online lessons - order ${order.orderNumber}`,
        text: buildParentEmailText(order),
        replyTo: teamRecipients[0],
      }).catch(() => ({ ok: false }))
    : { ok: false };

  if (team?.ok || parent?.ok) {
    await store.markNotified(session.id);
    return { order, notified: true };
  }

  // Nothing was delivered: let a later webhook retry try again.
  await store.releaseNotification(session.id).catch(() => null);
  throw new Error("Lesson order emails could not be sent.");
};
