// Public registration availability on the website.
//
// The site never stores launch approvals. It reads /api/program-availability,
// which returns only yes/no per program and, for camps that are open, the
// approved session dates. Anything malformed is treated as "closed".

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_SESSIONS = 20;
const DAY_MS = 24 * 60 * 60 * 1000;

const isValidIsoDate = (value) => {
  if (typeof value !== "string" || !ISO_DATE.test(value)) {
    return false;
  }

  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
};

const isPlainObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);

/**
 * Strictly parse the availability API response.
 * Only literal `true` counts as open. Camp sessions are accepted only when camps
 * are open and every entry has valid dates; otherwise there are none.
 */
export const parseAvailabilityResponse = (payload, programIds) => {
  const programs = Object.fromEntries(programIds.map((programId) => [programId, false]));
  const source = isPlainObject(payload) && isPlainObject(payload.programs) ? payload.programs : {};

  programIds.forEach((programId) => {
    programs[programId] = source[programId] === true;
  });

  let campSessions = [];
  const rawSessions = isPlainObject(payload?.sessions) ? payload.sessions.camps : null;

  if (programs.camps && Array.isArray(rawSessions) && rawSessions.length <= MAX_SESSIONS) {
    const cleaned = rawSessions.map((session) =>
      isPlainObject(session) &&
      isValidIsoDate(session.startDate) &&
      isValidIsoDate(session.endDate) &&
      session.startDate <= session.endDate
        ? { startDate: session.startDate, endDate: session.endDate }
        : null
    );

    campSessions = cleaned.every(Boolean) ? cleaned : [];
  }

  // Open camps without usable dates cannot be booked, so treat them as closed.
  if (programs.camps && campSessions.length === 0) {
    programs.camps = false;
  }

  return { programs, campSessions };
};

// Labels match the server's approved-session check exactly (UTC, en-US):
// days are "Monday, July 12" and weeks are "Week of July 12".
const dayFormatter = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "long", month: "long", day: "numeric" });
const monthDayFormatter = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "long", day: "numeric" });
const shortDateFormatter = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short", day: "numeric" });
const shortWeekdayFormatter = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "short" });

export const buildCampDayOptions = (sessions = []) => {
  const byIsoDate = new Map();

  sessions.forEach((session) => {
    const end = new Date(`${session.endDate}T00:00:00Z`);

    for (let current = new Date(`${session.startDate}T00:00:00Z`); current <= end; current = new Date(current.getTime() + DAY_MS)) {
      const weekday = current.getUTCDay();

      if (weekday === 0 || weekday === 6) {
        continue;
      }

      const isoDate = current.toISOString().slice(0, 10);
      const label = dayFormatter.format(current);

      byIsoDate.set(isoDate, {
        value: label,
        label,
        dayOfWeek: weekday,
        shortLabel: shortDateFormatter.format(current),
        compactLabel: `${shortWeekdayFormatter.format(current)}, ${shortDateFormatter.format(current)}`,
        isoDate,
      });
    }
  });

  return [...byIsoDate.values()].sort((left, right) => left.isoDate.localeCompare(right.isoDate));
};

// One week option per Monday, holding that week's approved weekdays.
export const buildCampWeekOptions = (dayOptions) =>
  dayOptions
    .filter((item) => item.dayOfWeek === 1)
    .map((monday) => {
      const mondayTime = new Date(`${monday.isoDate}T00:00:00Z`).getTime();
      const weekDays = dayOptions.filter((day) => {
        const offset = new Date(`${day.isoDate}T00:00:00Z`).getTime() - mondayTime;
        return offset >= 0 && offset < 5 * DAY_MS;
      });
      const weekLabel = `Week of ${monthDayFormatter.format(new Date(mondayTime))}`;
      const rangeLabel = `${weekDays[0]?.shortLabel || ""} - ${weekDays[weekDays.length - 1]?.shortLabel || ""}`;

      return {
        value: weekLabel,
        label: `${weekLabel} (${rangeLabel})`,
        rangeLabel,
        days: weekDays.map((day) => day.label),
      };
    });

// Approved camp booking options for the current page. Empty until the server
// confirms camps are open with approved dates.
let campDayOptions = [];
let campWeekOptions = [];
let campDayOrder = new Map();

export const setApprovedCampSessions = (sessions) => {
  campDayOptions = buildCampDayOptions(Array.isArray(sessions) ? sessions : []);
  campWeekOptions = buildCampWeekOptions(campDayOptions);
  campDayOrder = new Map(campDayOptions.map((item, index) => [item.value, index]));
};

export const getCampDayOptions = () => campDayOptions;
export const getCampWeekOptions = () => campWeekOptions;
export const getCampDayOrder = () => campDayOrder;
