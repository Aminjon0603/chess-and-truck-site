export const fallbackRecipients = [
  "info@chessandtruck.com",
];

export function getNotificationRecipients() {
  const configured = (process.env.CONTACT_TO_EMAILS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return configured.length ? configured : fallbackRecipients;
}

export function getResendConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY || "",
    fromEmail: process.env.CONTACT_FROM_EMAIL || "",
  };
}

export async function sendResendEmail({ to, subject, text, html, replyTo }) {
  const { apiKey, fromEmail } = getResendConfig();

  if (!apiKey || !fromEmail) {
    return { ok: false, skipped: true };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "User-Agent": "chessandtruck.com/1.0",
    },
    body: JSON.stringify({
      from: fromEmail,
      to,
      subject,
      text,
      html,
      headers: replyTo
        ? {
            "Reply-To": replyTo,
          }
        : undefined,
    }),
  });

  return { ok: response.ok, skipped: false, response };
}
