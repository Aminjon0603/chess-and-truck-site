// Shared input rules for the "Notify Me" interest list, used by the website
// form and the /api/interest endpoint. Only an adult contact email, the
// program, and explicit consent are collected.

export const INTEREST_PROGRAM_IDS = ["camps", "tournaments", "lessons", "afterSchool", "dojo"];

// Bump this when the consent wording below changes; it is stored with each signup.
export const INTEREST_CONSENT_VERSION = "2026-10-notify-v1";

export const getInterestConsentText = (programName) =>
  `I am a parent or guardian (18+) and agree to receive an email from Chess & Truck when ${programName} registration opens. I can unsubscribe at any time.`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Control characters are never valid in an email address.
const hasControlCharacters = (value) => [...value].some((character) => character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127);

export const normalizeInterestEmail = (value) => (typeof value === "string" ? value.trim().toLowerCase() : "");

export const isValidInterestEmail = (value) => {
  const email = normalizeInterestEmail(value);
  return email.length >= 3 && email.length <= 254 && !hasControlCharacters(email) && EMAIL_PATTERN.test(email);
};

/**
 * Validate a Notify Me request. Consent must be the boolean `true`.
 * @returns {{ ok: boolean, errors: Record<string, string>, value: { email: string, programId: string } }}
 */
export const validateInterestRequest = (input) => {
  const source = input && typeof input === "object" ? input : {};
  const email = normalizeInterestEmail(source.email);
  const programId = typeof source.programId === "string" ? source.programId : "";
  const errors = {};

  if (!email) {
    errors.email = "Enter your email address.";
  } else if (!isValidInterestEmail(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!INTEREST_PROGRAM_IDS.includes(programId)) {
    errors.programId = "Choose a program.";
  }

  if (source.consent !== true) {
    errors.consent = "Please confirm you agree to receive this email.";
  }

  return { ok: Object.keys(errors).length === 0, errors, value: { email, programId } };
};
