import assert from "node:assert/strict";
import {
  splitAdditionalEmails,
  validateContactFields,
  validateRegistrationFields,
} from "../src/lib/validation.js";

assert.deepEqual(splitAdditionalEmails("a@test.com, b@test.com;\nc@test.com"), [
  "a@test.com",
  "b@test.com",
  "c@test.com",
]);

{
  const errors = validateRegistrationFields({
    firstName: "A",
    lastName: "B",
    phone: "+1 (555) 111-2222",
    email: "bad-email",
    additionalEmails: "",
    acceptSms: true,
    playerFirstName: "Player",
    playerLastName: "One",
    playerGrade: "5",
    schoolName: "",
    section: "Open",
    serviceLevel: "entry",
    uscfId: "",
    parentName: "Parent",
    parentEmail: "parent@example.com",
    parentPhone: "+1 (555) 111-3333",
    emergencyName: "Emergency",
    emergencyPhone: "+1 (555) 111-4444",
    medicalInfo: "No allergies",
  });

  assert.equal(errors.email, "Enter a valid email address.");
  assert.equal(errors.uscfId, "USCF ID is required for the Open section.");
}

{
  const errors = validateContactFields({
    name: "Parent",
    email: "wrong",
    phone: "123",
    message: "Hi",
  });

  assert.equal(errors.email, "Enter a valid email address.");
  assert.equal(errors.phone, "Enter a valid phone number.");
  assert.equal(errors.message, "Please add a little more detail so the team can help.");
}

console.log("Validation smoke tests passed.");
