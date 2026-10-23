// Central program status config, shared by the site and the api/ checkout handlers.
//
// Status alone does NOT open registration. A program accepts registrations only
// when its status is "open" AND its launch configuration passes the readiness
// check (see src/lib/launchReadiness.js and api/_lib/registrationGate.js).
// Checkout handlers enforce this on the server, so direct requests cannot bypass it.
export const PROGRAM_STATUS = {
  OPEN: "open",
  COMING_SOON: "coming_soon",
  CLOSED: "closed",
};

export const programStatuses = {
  camps: PROGRAM_STATUS.COMING_SOON,
  tournaments: PROGRAM_STATUS.COMING_SOON,
  lessons: PROGRAM_STATUS.COMING_SOON,
  afterSchool: PROGRAM_STATUS.COMING_SOON,
  dojo: PROGRAM_STATUS.COMING_SOON,
};

// The status as configured above, before the launch check.
export const getConfiguredStatus = (programId) =>
  programStatuses[programId] || PROGRAM_STATUS.COMING_SOON;

// Which programs the server has confirmed as ready (yes/no only). The website
// fills this from /api/program-availability; until then every program is closed.
const registrationAvailability = {};

export const setRegistrationAvailability = (availability) => {
  Object.keys(registrationAvailability).forEach((key) => delete registrationAvailability[key]);

  Object.entries(availability || {}).forEach(([programId, ready]) => {
    registrationAvailability[programId] = ready === true;
  });
};

export const hasOpenConfiguredStatus = () =>
  Object.keys(programStatuses).some((programId) => getConfiguredStatus(programId) === PROGRAM_STATUS.OPEN);

// The status visitors see. A program marked "open" that has not passed the launch
// check is shown as "coming soon" rather than open.
export const getProgramStatus = (programId) => {
  const status = getConfiguredStatus(programId);

  if (status === PROGRAM_STATUS.OPEN && registrationAvailability[programId] !== true) {
    return PROGRAM_STATUS.COMING_SOON;
  }

  return status;
};

export const isProgramOpen = (programId) => getProgramStatus(programId) === PROGRAM_STATUS.OPEN;

// Shown only if camps are set to "closed".
export const CAMP_REGISTRATION_CLOSED_MESSAGE =
  "Camp registration is closed. Questions? Call, text, or email us.";

export const getRegistrationUnavailableMessage = (programName) =>
  `${programName} registration is not open yet. Questions? Call, text, or email us.`;
