// Notify Me endpoint: subscribe, confirm, and unsubscribe for the interest list.
//
// Required server environment variables (set in Vercel, never in the browser):
//   SUPABASE_URL, SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY),
//   INTEREST_TOKEN_SECRET (32+ random characters), SITE_URL,
//   RESEND_API_KEY and CONTACT_FROM_EMAIL (existing).
// Without them every POST returns 503 and nothing is stored or sent.
import { getResendConfig, sendResendEmail } from "./_lib/resend.js";
import { createSupabaseInterestStore, getSupabaseConfig } from "./_lib/supabaseInterestStore.js";
import { createInterestHandler } from "./_lib/interestService.js";

export const runtime = "nodejs";

export default {
  async fetch(request) {
    const supabaseConfig = getSupabaseConfig();
    const resend = getResendConfig();

    const handler = createInterestHandler({
      store: supabaseConfig ? createSupabaseInterestStore(supabaseConfig) : null,
      sendEmail: (message) => sendResendEmail(message),
      siteUrl: String(process.env.SITE_URL || "").replace(/\/+$/, ""),
      tokenSecret: String(process.env.INTEREST_TOKEN_SECRET || ""),
      emailConfigured: Boolean(resend.apiKey && resend.fromEmail),
    });

    return handler(request);
  },
};
