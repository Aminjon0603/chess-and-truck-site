# Opening a program for registration

No program can accept registrations or payments until **all** of these are true:

1. Its status is `"open"` in `src/lib/programs.js`.
2. Its launch details in `api/_lib/launchConfig.js` are complete and valid.
3. Its start dates are today or later (New York time).
4. Its approved prices match the server checkout prices in `api/_lib/priceCatalog.js` exactly, and that checkout has been reviewed.
5. It has an explicit approval that matches the current details.

The checkout API checks this on every request, before QA pricing or Stripe. The website only shows booking forms when the server confirms the same check.

## Steps

1. **Confirm the details.** Dates and daily schedule, venue (or online platform), prices for every checkout option, capacity, and eligibility or ages.
2. **Review the checkout.** In `api/_lib/priceCatalog.js`, update the prices and line-item text if needed, then set the program to `true` in `CHECKOUT_REVIEWED`. Camps and tournaments are the only programs with a checkout today; lessons, after-school, and the Dojo cannot open until a checkout exists for them.
3. **Fill in the launch details** for the program in `api/_lib/launchConfig.js` (field shapes are documented at the top of that file). Approved prices use the same option IDs and cent amounts the check prints, for example `{ optionId: "full-week", amountCents: 70000 }`.
4. **Run the check:** `npm run launch:check -- camps`. Fix every blocking issue until only `STATUS_NOT_OPEN` and `APPROVAL_MISSING` remain.
5. **Approve.** Copy the printed fingerprint into the program's `approval`:
   ```js
   approval: { approvedBy: "Your Name", approvedAt: "2027-03-01", fingerprint: "…" }
   ```
   Changing any launch detail afterwards changes the fingerprint and cancels the approval, so the program closes again until you re-approve.
6. **Open.** Set the program's status to `"open"` in `src/lib/programs.js`, run `npm run launch:check -- camps` (it should say `Ready to accept registrations: YES`), then `npm test` and `npm run build`.
7. **Test before announcing.** On a preview deployment with Stripe test keys, complete one booking and check the confirmation page and emails.

## Notes

- The June 15-19 camp dates, the 62 E 92nd Street venue, and the current prices are historical draft values. They are not approved.
- Visitors never see why a program is closed. They see "Registration Opening Soon" and a generic message; the reasons are written to the server log.
- The launch details are read through `loadLaunchConfig()` in `api/_lib/registrationGate.js`. To move them to a database such as Supabase, change only that function to read the same fields from a table.
