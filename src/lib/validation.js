const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const cleanText = (value) => (typeof value === "string" ? value.trim() : "");

export const splitAdditionalEmails = (value = "") =>
  value
    .split(/[,\n;]+/)
    .map((item) => item.trim())
    .filter(Boolean);

export const isValidEmail = (value = "") => EMAIL_PATTERN.test(cleanText(value));

export const isValidPhone = (value = "") => cleanText(value).replace(/\D/g, "").length >= 7;

export function validateRegistrationFields(state) {
  const errors = {};
  const extraEmails = splitAdditionalEmails(state.additionalEmails);

  if (!cleanText(state.firstName)) errors.firstName = "First name is required.";
  if (!cleanText(state.lastName)) errors.lastName = "Last name is required.";

  if (!cleanText(state.phone)) {
    errors.phone = "Phone is required.";
  } else if (!isValidPhone(state.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!cleanText(state.email)) {
    errors.email = "Email is required.";
  } else if (!isValidEmail(state.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (extraEmails.some((email) => !isValidEmail(email))) {
    errors.additionalEmails = "One or more additional email addresses are invalid.";
  }

  if (!state.acceptSms) errors.acceptSms = "You must accept the terms.";
  if (!cleanText(state.playerFirstName)) errors.playerFirstName = "Required.";
  if (!cleanText(state.playerLastName)) errors.playerLastName = "Required.";
  if (!cleanText(state.playerGrade)) errors.playerGrade = "Required.";
  if (!cleanText(state.section)) errors.section = "Choose a section.";
  if (!cleanText(state.serviceLevel)) errors.serviceLevel = "Choose a service level.";

  if (state.section === "Open" && !cleanText(state.uscfId)) {
    errors.uscfId = "USCF ID is required for the Open section.";
  }

  if (!cleanText(state.parentName)) errors.parentName = "Required.";

  if (!cleanText(state.parentEmail)) {
    errors.parentEmail = "Required.";
  } else if (!isValidEmail(state.parentEmail)) {
    errors.parentEmail = "Enter a valid parent email address.";
  }

  if (!cleanText(state.parentPhone)) {
    errors.parentPhone = "Required.";
  } else if (!isValidPhone(state.parentPhone)) {
    errors.parentPhone = "Enter a valid phone number.";
  }

  if (!cleanText(state.emergencyName)) errors.emergencyName = "Required.";

  if (!cleanText(state.emergencyPhone)) {
    errors.emergencyPhone = "Required.";
  } else if (!isValidPhone(state.emergencyPhone)) {
    errors.emergencyPhone = "Enter a valid phone number.";
  }

  if (!cleanText(state.medicalInfo)) {
    errors.medicalInfo = "Medical information is required.";
  }

  return errors;
}

export function validateContactFields(state) {
  const errors = {};

  if (!cleanText(state.name)) errors.name = "Please fill in your name.";

  if (!cleanText(state.email)) {
    errors.email = "Please fill in your email.";
  } else if (!isValidEmail(state.email)) {
    errors.email = "Enter a valid email address.";
  }

  if (cleanText(state.phone) && !isValidPhone(state.phone)) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!cleanText(state.message)) {
    errors.message = "Please include a message.";
  } else if (cleanText(state.message).length < 8) {
    errors.message = "Please add a little more detail so the team can help.";
  }

  return errors;
}
