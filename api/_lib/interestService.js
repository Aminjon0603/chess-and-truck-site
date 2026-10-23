// Interest list ("Notify Me") request handling. Server-only.
//
// Dependencies are passed in so tests can use an in-memory store and a fake
// email sender. The Vercel endpoint (api/interest.js) wires in Supabase and Resend.
import {
  INTEREST_CONSENT_VERSION,
  INTEREST_PROGRAM_IDS,
  validateInterestRequest,
} from "../../src/lib/interestValidation.js";
import {
  createConfirmToken,
  createUnsubscribeToken,
  hashToken,
  isWellFormedConfirmToken,
  rateLimitKey,
  verifyUnsubscribeToken,
} from "./interestTokens.js";
import { DuplicateSignupError } from "./supabaseInterestStore.js";

export const INTEREST_PROGRAM_NAMES = {
  camps: "Chess Camps",
  tournaments: "Chess Tournaments",
  lessons: "Private Chess Lessons",
  afterSchool: "After-School Programs",
  dojo: "Chess Dojo",
};

export const INTEREST_LIMITS = {
  maxBodyBytes: 2048,
  confirmTokenHours: 48,
  resendCooldownMinutes: 10,
  subscribePerIpPerHour: 10,
  subscribePerEmailPerHour: 5,
  actionsPerIpPerHour: 30,
};

// Every successful-looking subscribe request gets exactly this reply, whether
// the email is new, pending, already confirmed, or the request was spam.
export const GENERIC_SUBSCRIBE_MESSAGE =
  "Thanks! Check your inbox for a link to confirm your email.";
export const CONFIRMED_MESSAGE = "You're all set. We'll email you when registration opens.";
export const INVALID_CONFIRM_MESSAGE = "This link has expired or was already used. Please sign up again on the program page.";
export const UNSUBSCRIBED_MESSAGE = "You're unsubscribed. We won't email you about this program.";
const UNAVAILABLE_MESSAGE = "Sorry, email sign-up isn't available right now. Please try again later.";
const RATE_LIMITED_MESSAGE = "Too many tries. Please wait a few minutes and try again.";

const json = (body, status) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

const getClientIp = (request) =>
  (request.headers.get("x-forwarded-for") || "").split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";

const buildConfirmationEmail = ({ programName, confirmUrl, unsubscribeUrl, hours }) => ({
  subject: `Confirm your email for Chess & Truck ${programName}`,
  text: [
    "Hi,",
    "",
    `Please confirm you'd like an email from Chess & Truck when ${programName} registration opens:`,
    confirmUrl,
    "",
    `This link expires in ${hours} hours. If you didn't sign up, you can ignore this email and you won't be added.`,
    "",
    `Unsubscribe: ${unsubscribeUrl}`,
    "",
    "Chess & Truck",
  ].join("\n"),
});

const VERCEL_HOST_PATTERN = /^[a-z0-9-]+(\.[a-z0-9-]+)*\.vercel\.app$/;

// A Vercel Preview is served on a per-build URL and a per-branch URL, and the
// visitor may open either. Both are set by Vercel itself for this deployment, so
// trusting them on Preview keeps the origin check strict. Production trusts only
// SITE_URL.
export const getPreviewOrigins = (env = process.env) => {
  if (env.VERCEL_ENV !== "preview") {
    return [];
  }

  return [env.VERCEL_URL, env.VERCEL_BRANCH_URL]
    .map((host) => String(host || "").trim().toLowerCase())
    .filter((host) => VERCEL_HOST_PATTERN.test(host))
    .map((host) => `https://${host}`);
};

/**
 * @param {{
 *   store: object | null,
 *   sendEmail: (message: object) => Promise<{ ok: boolean }>,
 *   siteUrl: string,
 *   extraOrigins?: string[],
 *   tokenSecret: string,
 *   emailConfigured: boolean,
 *   now?: () => Date,
 *   log?: (message: string) => void,
 * }} deps
 */
export const createInterestHandler = (deps) => {
  const now = deps.now || (() => new Date());
  const log = deps.log || ((message) => console.warn(`[interest] ${message}`));

  const isConfigured = () =>
    Boolean(
      deps.store &&
        deps.emailConfigured &&
        typeof deps.tokenSecret === "string" &&
        deps.tokenSecret.length >= 32 &&
        /^https:\/\/[^/]+$|^http:\/\/localhost(:\d+)?$/.test(deps.siteUrl || "")
    );

  const allow = async (kind, value, limit) =>
    deps.store.consumeRateLimit(rateLimitKey(kind, value, deps.tokenSecret), limit, 60 * 60);

  const subscribe = async (body, request) => {
    // Spam bots fill the hidden field. Reply exactly as for a real request.
    if (typeof body.website === "string" && body.website.trim()) {
      return json({ ok: true, message: GENERIC_SUBSCRIBE_MESSAGE }, 202);
    }

    const { ok, errors, value } = validateInterestRequest(body);

    if (!ok) {
      return json({ error: "Please check the form and try again.", fieldErrors: errors }, 400);
    }

    const ipAllowed = await allow("ip", getClientIp(request), INTEREST_LIMITS.subscribePerIpPerHour);
    const emailAllowed = ipAllowed && (await allow("email", value.email, INTEREST_LIMITS.subscribePerEmailPerHour));

    if (!ipAllowed || !emailAllowed) {
      return json({ error: RATE_LIMITED_MESSAGE }, 429);
    }

    const current = now();
    const existing = await deps.store.findByEmailAndProgram(value.email, value.programId);

    // Already confirmed, or a confirmation email was sent recently: say nothing new.
    const cooldownMs = INTEREST_LIMITS.resendCooldownMinutes * 60 * 1000;
    const recentlySent =
      existing?.status === "pending" &&
      existing.confirmation_sent_at &&
      current.getTime() - Date.parse(existing.confirmation_sent_at) < cooldownMs;

    if (existing?.status === "confirmed" || recentlySent) {
      return json({ ok: true, message: GENERIC_SUBSCRIBE_MESSAGE }, 202);
    }

    const token = createConfirmToken();
    const nowIso = current.toISOString();
    const pendingFields = {
      status: "pending",
      consent_at: nowIso,
      consent_version: INTEREST_CONSENT_VERSION,
      confirm_token_hash: hashToken(token),
      confirm_token_expires_at: new Date(
        current.getTime() + INTEREST_LIMITS.confirmTokenHours * 60 * 60 * 1000
      ).toISOString(),
      confirmation_sent_at: nowIso,
    };

    let row;

    try {
      row = existing
        ? await deps.store.update(existing.id, pendingFields)
        : await deps.store.insert({ email: value.email, program_id: value.programId, ...pendingFields });
    } catch (error) {
      if (error instanceof DuplicateSignupError) {
        // A parallel request created the row first; the reply stays the same.
        return json({ ok: true, message: GENERIC_SUBSCRIBE_MESSAGE }, 202);
      }

      throw error;
    }

    const programName = INTEREST_PROGRAM_NAMES[value.programId];
    const message = buildConfirmationEmail({
      programName,
      confirmUrl: `${deps.siteUrl}/interest/confirm?token=${token}`,
      unsubscribeUrl: `${deps.siteUrl}/interest/unsubscribe?token=${createUnsubscribeToken(row.id, deps.tokenSecret)}`,
      hours: INTEREST_LIMITS.confirmTokenHours,
    });

    try {
      const result = await deps.sendEmail({ to: [value.email], ...message });

      if (!result?.ok) {
        log(`confirmation email not sent for ${value.programId}`);
      }
    } catch {
      log(`confirmation email failed for ${value.programId}`);
    }

    return json({ ok: true, message: GENERIC_SUBSCRIBE_MESSAGE }, 202);
  };

  const confirm = async (body, request) => {
    if (!(await allow("action", getClientIp(request), INTEREST_LIMITS.actionsPerIpPerHour))) {
      return json({ error: RATE_LIMITED_MESSAGE }, 429);
    }

    if (!isWellFormedConfirmToken(body.token)) {
      return json({ error: INVALID_CONFIRM_MESSAGE }, 400);
    }

    const row = await deps.store.findByConfirmTokenHash(hashToken(body.token));
    const current = now();

    if (
      !row ||
      row.status !== "pending" ||
      !row.confirm_token_expires_at ||
      Date.parse(row.confirm_token_expires_at) <= current.getTime()
    ) {
      return json({ error: INVALID_CONFIRM_MESSAGE }, 400);
    }

    await deps.store.update(row.id, {
      status: "confirmed",
      confirmed_at: current.toISOString(),
      confirm_token_hash: null,
      confirm_token_expires_at: null,
    });

    return json({ ok: true, message: CONFIRMED_MESSAGE }, 200);
  };

  const unsubscribe = async (body, request) => {
    if (!(await allow("action", getClientIp(request), INTEREST_LIMITS.actionsPerIpPerHour))) {
      return json({ error: RATE_LIMITED_MESSAGE }, 429);
    }

    if (typeof body.token !== "string" || !body.token || body.token.length > 120) {
      return json({ error: "This unsubscribe link is not valid." }, 400);
    }

    const signupId = verifyUnsubscribeToken(body.token, deps.tokenSecret);

    if (signupId) {
      const row = await deps.store.findById(signupId);

      if (row && row.status !== "unsubscribed") {
        await deps.store.update(signupId, {
          status: "unsubscribed",
          unsubscribed_at: now().toISOString(),
          confirm_token_hash: null,
          confirm_token_expires_at: null,
        });
      }
    }

    // Same reply for valid, already-used, and unknown links.
    return json({ ok: true, message: UNSUBSCRIBED_MESSAGE }, 200);
  };

  return async (request) => {
    if (request.method === "GET") {
      // Lets operators check configuration without revealing any details.
      return json({ enabled: isConfigured(), programs: INTEREST_PROGRAM_IDS }, 200);
    }

    if (request.method !== "POST") {
      return json({ error: "Method not allowed." }, 405);
    }

    if (!isConfigured()) {
      return json({ error: UNAVAILABLE_MESSAGE }, 503);
    }

    const origin = request.headers.get("origin");
    const trustedOrigins = [new URL(deps.siteUrl).origin, ...(deps.extraOrigins || [])];

    if (origin && !trustedOrigins.includes(origin)) {
      // Origins are public hostnames, never secrets; logged so a misconfigured
      // SITE_URL can be diagnosed from the deployment logs.
      log(`rejected request from origin ${origin.slice(0, 200)}`);
      return json({ error: "Request not allowed." }, 403);
    }

    let body;

    try {
      const text = await request.text();

      if (text.length > INTEREST_LIMITS.maxBodyBytes) {
        return json({ error: "Request too large." }, 413);
      }

      body = JSON.parse(text);
    } catch {
      return json({ error: "Invalid request." }, 400);
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return json({ error: "Invalid request." }, 400);
    }

    try {
      if (body.action === "subscribe") {
        return await subscribe(body, request);
      }

      if (body.action === "confirm") {
        return await confirm(body, request);
      }

      if (body.action === "unsubscribe") {
        return await unsubscribe(body, request);
      }

      return json({ error: "Invalid request." }, 400);
    } catch {
      // Database or network failure: fail closed with a generic message.
      log(`request failed for action ${String(body.action).slice(0, 20)}`);
      return json({ error: UNAVAILABLE_MESSAGE }, 503);
    }
  };
};
