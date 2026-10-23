// Tokens for the interest list. Server-only.
//
// * Confirmation tokens: 32 random bytes, sent once by email, stored only as a
//   SHA-256 hash with an expiry. Single use.
// * Unsubscribe tokens: "<signupId>.<HMAC>" signed with INTEREST_TOKEN_SECRET.
//   Nothing is stored, and the same link keeps working in later emails.
// * Rate-limit keys: HMAC of the IP or email, so raw values are never stored.
import crypto from "node:crypto";

const TOKEN_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export const createConfirmToken = () => crypto.randomBytes(32).toString("base64url");

export const isWellFormedConfirmToken = (token) => typeof token === "string" && TOKEN_PATTERN.test(token);

export const hashToken = (token) => crypto.createHash("sha256").update(token, "utf8").digest("hex");

const hmac = (secret, value) => crypto.createHmac("sha256", secret).update(value, "utf8").digest();

export const createUnsubscribeToken = (signupId, secret) =>
  `${signupId}.${hmac(secret, `unsubscribe:${signupId}`).toString("base64url")}`;

// Returns the signup ID for a valid token, otherwise null. Constant-time compare.
export const verifyUnsubscribeToken = (token, secret) => {
  if (typeof token !== "string" || token.length > 120) {
    return null;
  }

  const [signupId, signature, extra] = token.split(".");

  if (extra !== undefined || !UUID_PATTERN.test(signupId || "") || !signature) {
    return null;
  }

  const expected = hmac(secret, `unsubscribe:${signupId}`);
  let provided;

  try {
    provided = Buffer.from(signature, "base64url");
  } catch {
    return null;
  }

  return provided.length === expected.length && crypto.timingSafeEqual(provided, expected) ? signupId : null;
};

export const rateLimitKey = (kind, value, secret) =>
  `${kind}:${crypto.createHmac("sha256", secret).update(`${kind}:${value}`, "utf8").digest("hex")}`;
