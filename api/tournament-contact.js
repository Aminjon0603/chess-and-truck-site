import { applyRateLimit } from "./_lib/rate-limit.js";
import {
  getNotificationRecipients,
  getResendConfig,
  sendResendEmail,
} from "./_lib/resend.js";
import { validateContactFields } from "../src/lib/validation.js";

const sanitize = (value, limit = 2000) => {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\r\n/g, "\n").slice(0, limit);
};

const escapeHtml = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const formatMultiline = (value) => escapeHtml(value || "-").replaceAll("\n", "<br />");

const buildHtml = (data) => `
  <div style="font-family: Arial, sans-serif; color: #181411; line-height: 1.6;">
    <h1 style="margin: 0 0 16px; font-size: 22px;">New CHESS AND TRUCK message</h1>
    <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
      <tbody>
        ${[
          ["Name", data.name],
          ["Email", data.email],
          ["Phone", data.phone],
          ["Message", data.message],
        ]
          .map(
            ([label, value]) => `
              <tr>
                <td style="padding: 10px 0; width: 140px; vertical-align: top; font-weight: 700; border-top: 1px solid #e7dfd4;">
                  ${label}
                </td>
                <td style="padding: 10px 0; color: #5f5347; border-top: 1px solid #e7dfd4;">
                  ${formatMultiline(value)}
                </td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  </div>
`;

const buildText = (data) =>
  [
    "New CHESS AND TRUCK message",
    "",
    `Name: ${data.name || "-"}`,
    `Email: ${data.email || "-"}`,
    `Phone: ${data.phone || "-"}`,
    "",
    "Message:",
    data.message || "-",
  ].join("\n");

export const runtime = "nodejs";

export default {
  async fetch(request) {
    if (request.method !== "POST") {
      return Response.json({ error: "Method not allowed." }, { status: 405 });
    }

    const limited = applyRateLimit(request, "contact", {
      limit: 5,
      windowMs: 15 * 60 * 1000,
      message: "Too many messages were sent from this network. Please wait a little and try again.",
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
      name: sanitize(payload.name, 120),
      email: sanitize(payload.email, 180),
      phone: sanitize(payload.phone, 80),
      message: sanitize(payload.message, 4000),
      website: sanitize(payload.website, 120),
    };

    if (data.website) {
      return Response.json(
        {
          message: "Thanks. Your message was sent to the tournament team.",
        },
        { status: 200 }
      );
    }

    const errors = validateContactFields(data);

    if (Object.keys(errors).length > 0) {
      return Response.json(
        { error: Object.values(errors)[0] || "Please fill in your name, email, and message." },
        { status: 400 }
      );
    }

    const { apiKey, fromEmail } = getResendConfig();
    const recipients = getNotificationRecipients();

    if (!apiKey || !fromEmail) {
      return Response.json(
        {
          error:
            "The contact form is not configured yet. Add RESEND_API_KEY and CONTACT_FROM_EMAIL in Vercel to enable delivery.",
        },
        { status: 500 }
      );
    }

    const resendResponse = await sendResendEmail({
      to: recipients,
      subject: `New CHESS AND TRUCK inquiry - ${data.name}`,
      html: buildHtml(data),
      text: buildText(data),
      replyTo: data.email,
    });

    if (!resendResponse.ok) {
      return Response.json(
        {
          error:
            "The message could not be delivered right now. Please email the tournament team directly instead.",
        },
        { status: 502 }
      );
    }

    return Response.json(
      {
        message: "Thanks. Your message was sent to the tournament team.",
      },
      { status: 200 }
    );
  },
};
