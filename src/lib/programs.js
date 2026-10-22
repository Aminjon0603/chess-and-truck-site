// Central program status config, shared by the site and the api/ checkout handlers.
// To launch a program, change its status to "open". Checkout handlers refuse
// payments for any program that is not "open", so direct URLs cannot bypass this.
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

export const getProgramStatus = (programId) =>
  programStatuses[programId] || PROGRAM_STATUS.COMING_SOON;

export const isProgramOpen = (programId) => getProgramStatus(programId) === PROGRAM_STATUS.OPEN;

// Shown only if camps are set to "closed".
export const CAMP_REGISTRATION_CLOSED_MESSAGE =
  "Camp registration is closed for this season. Contact us to hear when next season's dates open.";

export const getRegistrationUnavailableMessage = (programName) =>
  `${programName} registration is not open yet. Contact us and we will let you know when it opens.`;
