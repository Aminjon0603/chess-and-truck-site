// Launch readiness validation, shared by the checkout API, the availability API,
// the launch-check script, and tests. It is a pure function: callers pass in the
// program status, its launch configuration, and the server's checkout prices, so
// the configuration can later come from a database (for example Supabase)
// without changing this file.

export const LAUNCH_TIME_ZONE = "America/New_York";

// Which launch fields each program must have before it can take registrations.
// "location" means a venue for in-person programs or a delivery format for online ones.
export const PROGRAM_REQUIREMENTS = {
  camps: ["sessions", "location", "pricing", "capacity", "eligibility"],
  tournaments: ["sessions", "location", "pricing", "capacity", "eligibility"],
  lessons: ["location", "pricing", "eligibility"],
  onlineLessons: ["location", "pricing", "eligibility"],
  inPersonLessons: ["location", "pricing", "eligibility"],
  groupLessons: ["sessions", "location", "pricing", "capacity", "eligibility"],
  afterSchool: ["sessions", "location", "pricing", "capacity", "eligibility"],
  dojo: ["sessions", "location", "pricing", "capacity", "eligibility"],
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

const isValidIsoDate = (value) => {
  if (typeof value !== "string" || !ISO_DATE.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const isNonEmptyText = (value) => typeof value === "string" && value.trim().length > 0;

const isPositiveInteger = (value) => Number.isInteger(value) && value > 0;

// Today's date (YYYY-MM-DD) in New York, so "in the past" matches the families' calendar.
export const getLaunchToday = (now = new Date()) =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone: LAUNCH_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);

// Stable JSON: object keys sorted so the same configuration always serializes the same way.
const stableStringify = (value) => {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }

  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }

  return JSON.stringify(value ?? null);
};

// Fingerprint of everything except the approval itself. An approval stores the
// fingerprint it was given for, so any later edit to dates, venue, prices,
// capacity, or eligibility invalidates the approval automatically.
export const fingerprintLaunchConfig = (config) => {
  const { approval, ...approvedContent } = config || {};
  void approval;
  const text = stableStringify(approvedContent);

  // FNV-1a, two passes with different seeds for a 64-bit hex fingerprint.
  const hash = (seed) => {
    let h = seed >>> 0;

    for (let index = 0; index < text.length; index += 1) {
      h ^= text.charCodeAt(index);
      h = Math.imul(h, 0x01000193) >>> 0;
    }

    return h.toString(16).padStart(8, "0");
  };

  return `${hash(0x811c9dc5)}${hash(0x01234567)}`;
};

const issue = (code, field, message) => ({ code, field, message });

const checkSessions = (config, today, issues) => {
  const sessions = config.sessions;

  if (!Array.isArray(sessions) || sessions.length === 0) {
    issues.push(issue("SESSIONS_MISSING", "sessions", "No confirmed dates or schedule."));
    return;
  }

  sessions.forEach((session, index) => {
    const field = `sessions[${index}]`;

    if (!isValidIsoDate(session?.startDate) || !isValidIsoDate(session?.endDate)) {
      issues.push(issue("SESSION_DATE_INVALID", field, "Start and end dates must be valid YYYY-MM-DD dates."));
      return;
    }

    if (session.endDate < session.startDate) {
      issues.push(issue("SESSION_DATE_ORDER", field, "End date is before the start date."));
    }

    if (session.startDate < today) {
      issues.push(issue("SESSION_DATE_PAST", field, `Start date ${session.startDate} is in the past.`));
    }

    if (!isNonEmptyText(session.schedule)) {
      issues.push(issue("SESSION_SCHEDULE_MISSING", field, "Daily schedule or times are missing."));
    }
  });
};

const checkLocation = (config, issues) => {
  const location = config.location;

  if (!location || typeof location !== "object") {
    issues.push(issue("LOCATION_MISSING", "location", "No confirmed location or delivery format."));
    return;
  }

  if (location.type === "in_person") {
    if (!isNonEmptyText(location.name) || !isNonEmptyText(location.address)) {
      issues.push(issue("LOCATION_INCOMPLETE", "location", "In-person programs need a venue name and address."));
    }
  } else if (location.type === "online") {
    if (!isNonEmptyText(location.platform)) {
      issues.push(issue("LOCATION_INCOMPLETE", "location", "Online programs need a delivery platform."));
    }
  } else {
    issues.push(issue("LOCATION_TYPE_INVALID", "location", 'Location type must be "in_person" or "online".'));
  }

  if (location.confirmed !== true) {
    issues.push(issue("LOCATION_UNCONFIRMED", "location", "Location is not marked as confirmed."));
  }
};

// Approved prices must match the server's checkout prices exactly, in both directions:
// nothing can be charged that was not approved, and nothing approved can be charged differently.
const checkPricing = (config, priceCatalog, issues) => {
  const pricing = config.pricing;

  if (!Array.isArray(pricing) || pricing.length === 0) {
    issues.push(issue("PRICING_MISSING", "pricing", "No approved pricing."));
    return;
  }

  if (!priceCatalog || !priceCatalog.prices || typeof priceCatalog.prices !== "object" || Array.isArray(priceCatalog.prices)) {
    issues.push(issue("CHECKOUT_UNAVAILABLE", "pricing", "This program has no server-side checkout to compare prices with."));
    return;
  }

  if (priceCatalog.reviewed !== true) {
    issues.push(
      issue("CHECKOUT_UNREVIEWED", "pricing", "Server-side checkout prices and line-item text have not been reviewed for launch.")
    );
  }

  const approved = new Map();

  pricing.forEach((item, index) => {
    const field = `pricing[${index}]`;

    if (!isNonEmptyText(item?.optionId) || !Number.isInteger(item?.amountCents) || item.amountCents < 0) {
      issues.push(issue("PRICE_INVALID", field, "Each price needs an optionId and a whole-cent amount."));
      return;
    }

    if (approved.has(item.optionId)) {
      issues.push(issue("PRICE_DUPLICATE", field, `Option "${item.optionId}" is priced twice.`));
      return;
    }

    approved.set(item.optionId, item.amountCents);
  });

  Object.entries(priceCatalog.prices).forEach(([optionId, serverAmount]) => {
    if (!approved.has(optionId)) {
      issues.push(issue("PRICE_NOT_APPROVED", "pricing", `Checkout option "${optionId}" has no approved price.`));
    } else if (approved.get(optionId) !== serverAmount) {
      issues.push(
        issue(
          "PRICE_MISMATCH",
          "pricing",
          `Option "${optionId}" is approved at ${approved.get(optionId)} cents but checkout charges ${serverAmount} cents.`
        )
      );
    }
  });

  approved.forEach((_amount, optionId) => {
    if (!(optionId in priceCatalog.prices)) {
      issues.push(issue("PRICE_UNKNOWN_OPTION", "pricing", `Approved option "${optionId}" does not exist in checkout.`));
    }
  });
};

const checkCapacity = (config, issues) => {
  if (!isPositiveInteger(config.capacity?.maxParticipants)) {
    issues.push(issue("CAPACITY_MISSING", "capacity", "Capacity must be a positive whole number."));
  }
};

const checkEligibility = (config, issues) => {
  const eligibility = config.eligibility;

  if (!eligibility || !isNonEmptyText(eligibility.summary)) {
    issues.push(issue("ELIGIBILITY_MISSING", "eligibility", "Eligibility and age requirements are missing."));
    return;
  }

  const { minAge, maxAge } = eligibility;

  if (minAge !== undefined && !isPositiveInteger(minAge)) {
    issues.push(issue("ELIGIBILITY_INVALID", "eligibility", "Minimum age must be a whole number."));
  }

  if (maxAge !== undefined && !isPositiveInteger(maxAge)) {
    issues.push(issue("ELIGIBILITY_INVALID", "eligibility", "Maximum age must be a whole number."));
  }

  if (isPositiveInteger(minAge) && isPositiveInteger(maxAge) && minAge > maxAge) {
    issues.push(issue("ELIGIBILITY_INVALID", "eligibility", "Minimum age is greater than maximum age."));
  }
};

const checkApproval = (config, today, issues) => {
  const approval = config.approval;

  if (!approval || typeof approval !== "object") {
    issues.push(issue("APPROVAL_MISSING", "approval", "Launch has not been explicitly approved."));
    return;
  }

  if (!isNonEmptyText(approval.approvedBy)) {
    issues.push(issue("APPROVAL_INVALID", "approval", "Approval must name who approved the launch."));
  }

  if (!isValidIsoDate(approval.approvedAt) || approval.approvedAt > today) {
    issues.push(issue("APPROVAL_INVALID", "approval", "Approval date must be a valid date that is not in the future."));
  }

  if (approval.fingerprint !== fingerprintLaunchConfig(config)) {
    issues.push(
      issue("APPROVAL_STALE", "approval", "Launch details changed after approval. Review and approve the current version.")
    );
  }
};

const CHECKS = {
  sessions: (config, context, issues) => checkSessions(config, context.today, issues),
  location: (config, _context, issues) => checkLocation(config, issues),
  pricing: (config, context, issues) => checkPricing(config, context.priceCatalog, issues),
  capacity: (config, _context, issues) => checkCapacity(config, issues),
  eligibility: (config, _context, issues) => checkEligibility(config, issues),
};

/**
 * Decide whether a program may accept registrations.
 * @returns {{ ready: boolean, issues: Array<{code: string, field: string, message: string}> }}
 * Issues are for the owner and server logs only; never show them to visitors.
 */
export const getLaunchReadiness = (input) => {
  // Any unexpected error means "not ready": the gate must fail closed.
  try {
    return evaluateLaunchReadiness(input);
  } catch {
    return { ready: false, issues: [issue("READINESS_ERROR", "config", "Launch details could not be validated.")] };
  }
};

const evaluateLaunchReadiness = ({ programId, status, config, priceCatalog, now = new Date() }) => {
  const issues = [];
  const requirements = PROGRAM_REQUIREMENTS[programId];

  if (!requirements) {
    return { ready: false, issues: [issue("PROGRAM_UNKNOWN", "programId", `Unknown program "${programId}".`)] };
  }

  if (status !== "open") {
    issues.push(issue("STATUS_NOT_OPEN", "status", `Program status is "${status}", not "open".`));
  }

  if (!config || typeof config !== "object" || config.programId !== programId) {
    issues.push(issue("CONFIG_MISSING", "config", "No launch configuration for this program."));
    return { ready: false, issues };
  }

  const context = { today: getLaunchToday(now), priceCatalog };
  requirements.forEach((field) => CHECKS[field](config, context, issues));
  checkApproval(config, context.today, issues);

  return { ready: issues.length === 0, issues };
};

const dayLabelFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "long",
  month: "long",
  day: "numeric",
});

const weekLabelFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "long",
  day: "numeric",
});

/**
 * Camp day and week labels for approved sessions, in the format the booking form
 * sends ("Monday, July 12" and "Week of July 12"). Weekdays only, like the form.
 * Used by checkout to reject days that are not part of an approved session.
 */
export const getApprovedSessionLabels = (sessions) => {
  const days = new Set();
  const weeks = new Set();

  (Array.isArray(sessions) ? sessions : []).forEach((session) => {
    if (!isValidIsoDate(session?.startDate) || !isValidIsoDate(session?.endDate)) {
      return;
    }

    const end = new Date(`${session.endDate}T00:00:00Z`);

    for (let current = new Date(`${session.startDate}T00:00:00Z`); current <= end; ) {
      const weekday = current.getUTCDay();

      if (weekday !== 0 && weekday !== 6) {
        days.add(dayLabelFormatter.format(current));
      }

      if (weekday === 1) {
        weeks.add(`Week of ${weekLabelFormatter.format(current)}`);
      }

      current = new Date(current.getTime() + 24 * 60 * 60 * 1000);
    }
  });

  return { days, weeks };
};
