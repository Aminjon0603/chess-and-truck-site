import { checkRegistrationGate } from "./_lib/registrationGate.js";
import {
  describeLessonSession,
  fulfillLessonOrder,
  isLessonSession,
  LESSON_THANK_YOU_MESSAGE,
} from "./_lib/lessonOrders.js";

const sanitize = (value, limit = 180) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, limit);
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
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    if (!sessionId) {
      return Response.json({ error: "Checkout session ID is required." }, { status: 400 });
    }

    if (!stripeSecretKey) {
      return Response.json(
        { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY in Vercel." },
        { status: 500 }
      );
    }

    const stripeResponse = await fetch(
      `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
        },
      }
    );

    const stripePayload = await stripeResponse.json().catch(() => ({}));

    if (!stripeResponse.ok) {
      return Response.json(
        {
          error:
            stripePayload?.error?.message ||
            "Stripe payment status could not be retrieved right now.",
        },
        { status: 502 }
      );
    }

    if (stripePayload.payment_status !== "paid") {
      return Response.json(
        {
          status: stripePayload.payment_status || "pending",
          error: "Payment is not marked as paid yet.",
        },
        { status: 409 }
      );
    }

    // Online lessons: the session was just re-read from Stripe with the secret
    // key and is paid, so the order can be recorded here too (once) in case
    // the webhook is late. The webhook does the same and nothing is duplicated.
    if (isLessonSession(stripePayload)) {
      await fulfillLessonOrder(stripePayload).catch(() => null);
      const order = describeLessonSession(stripePayload);

      return Response.json(
        {
          status: "paid",
          bookingType: "online_lessons",
          message: LESSON_THANK_YOU_MESSAGE,
          orderNumber: order.orderNumber,
          packageLabel: order.packageLabel,
          lessons: order.lessonPackage?.lessons || null,
          amountTotal: order.amountCents !== null ? order.amountCents / 100 : null,
          customerEmail: order.parentEmail,
        },
        { status: 200, headers: { "Cache-Control": "no-store" } }
      );
    }

    const metadata = stripePayload.metadata || {};
    const isCamp = metadata.booking_type === "camp";
    const programId = metadata.program_id || (isCamp ? "camps" : "tournaments");
    // A payment for a program that is not open is not shown as a confirmed registration.
    const { ready: programIsOpen } = await checkRegistrationGate(programId, { log: false }).catch(() => ({
      ready: false,
    }));

    return Response.json(
      {
        status: "paid",
        // True when the payment belongs to a program that is not open, so the
        // site shows "payment received" instead of a confirmed registration.
        requiresReview: !programIsOpen,
        message: !programIsOpen
          ? "Payment received. Our team will contact you about your registration."
          : isCamp
            ? "Camp payment confirmed successfully."
            : "Payment confirmed successfully.",
        customerEmail: stripePayload.customer_details?.email || stripePayload.customer_email || "",
        reference:
          metadata.registration_reference || stripePayload.client_reference_id || stripePayload.id,
        playerName: metadata.player_name || "the registered player",
        section: metadata.section || "",
        serviceLevel: metadata.service_level || "",
        bookingType: metadata.booking_type || "",
        selectedDays: metadata.selected_days || "",
        amountTotal:
          typeof stripePayload.amount_total === "number"
            ? stripePayload.amount_total / 100
            : null,
      },
      { status: 200 }
    );
  },
};
