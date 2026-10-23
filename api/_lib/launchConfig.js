// Launch configuration for each program. SERVER-ONLY: this file is never
// imported by the website bundle, so visitors cannot see it.
//
// Every program starts empty and unapproved. The June 15-19 camp dates, the
// 62 E 92nd Street venue, and the prices in the old booking setup are draft
// values only. Chess & Truck has not run a camp yet, and none of those values
// are approved for launch.
//
// How to launch a program (see LAUNCH.md for the full checklist):
//   1. Fill in the fields below with confirmed details.
//   2. Run `npm run launch:check -- <programId>` and fix every reported issue.
//   3. Add `approval` with your name, today's date, and the fingerprint the
//      check prints. Editing any field later invalidates the approval.
//   4. Set the program's status to "open" in src/lib/programs.js.
//
// Field shapes:
//   sessions:    [{ id, startDate: "YYYY-MM-DD", endDate: "YYYY-MM-DD", schedule: "9:00 AM - 3:00 PM" }]
//   location:    { type: "in_person", name, address, confirmed: true }
//                or { type: "online", platform, confirmed: true }
//   pricing:     [{ optionId, amountCents }]  (must match api/_lib/priceCatalog.js exactly)
//   capacity:    { maxParticipants }
//   eligibility: { summary, minAge?, maxAge? }
//   approval:    { approvedBy, approvedAt: "YYYY-MM-DD", fingerprint }

const emptyConfig = (programId) => ({
  programId,
  sessions: [],
  location: null,
  pricing: [],
  capacity: null,
  eligibility: null,
  approval: null,
});

export const programLaunchConfig = {
  camps: emptyConfig("camps"),
  tournaments: emptyConfig("tournaments"),
  lessons: emptyConfig("lessons"),
  afterSchool: emptyConfig("afterSchool"),
  dojo: emptyConfig("dojo"),
};
