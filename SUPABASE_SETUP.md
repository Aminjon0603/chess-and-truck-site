# Supabase setup for the Notify Me interest list

The Notify Me form is built but **hidden**. It appears only after you connect
Supabase, set the server secrets, test on a Vercel preview, and turn on
`VITE_INTEREST_FORM_ENABLED`. Until then `/api/interest` answers 503 and stores nothing.

Never paste keys into chat, code, or GitHub. Keys go only into the Vercel
dashboard (Project → Settings → Environment Variables).

## 1. Create the Supabase project

1. Sign in at supabase.com and create a new project (organization: Chess & Truck).
2. Choose a region close to your Vercel functions (for example **East US (North Virginia)**).
3. Set a strong database password and store it in your password manager.

## 2. Create the tables

Option A (simplest): in the Supabase dashboard open **SQL Editor**, paste the
contents of `supabase/migrations/20261023120000_program_interest.sql`, and run it once.

Option B (CLI, keeps history): install the Supabase CLI, then from this folder run
`supabase link --project-ref <your-project-ref>` and `supabase db push`.

Afterwards, in **Table Editor**, each `interest_*` table should show
"RLS enabled". Do not add any policies: with no policies, the public API key
cannot read or write subscriber data.

## 3. Copy two values from Supabase (into Vercel, not chat)

In **Project Settings → API**:

- **Project URL** (looks like `https://abcd1234.supabase.co`) → Vercel variable `SUPABASE_URL`
- **Secret key** (`sb_secret_...`) → Vercel variable `SUPABASE_SECRET_KEY`
  (older projects show a **service_role** key instead; put that in `SUPABASE_SERVICE_ROLE_KEY`).

The secret key bypasses Row Level Security. Never use it in browser code,
never prefix it with `VITE_`, and never share it.

You do **not** need the publishable/anon key: the website never talks to Supabase directly.

## 4. Set the Vercel environment variables

Add these for **Preview** first:

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | Project URL from step 3 |
| `SUPABASE_SECRET_KEY` | Secret key from step 3 |
| `INTEREST_TOKEN_SECRET` | A new random value of at least 32 characters (for example from your password manager's generator). Changing it later breaks existing unsubscribe links. |
| `SITE_URL` | Used for the links in emails, so it must stay valid: on Preview, use the branch domain (`https://chess-and-truck-site-git-…vercel.app`, shown under the deployment's Domains), without a trailing slash. For production: `https://chessandtruck.com`. On Preview the form also accepts submissions from that deployment's own Vercel URLs; Production accepts only `SITE_URL`. |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL` | Already used for contact emails. The from-address domain must be verified in Resend. |
| `VITE_INTEREST_FORM_ENABLED` | `true` on Preview only while testing |

## 5. Test on a preview deployment

1. Deploy a preview and open `<preview-url>/api/interest` in a browser.
   It should show `"enabled": true`. If it says `false`, a variable is missing.
2. On a program page, submit the form with your own email. You should get one confirmation email.
3. Open the confirmation link and press **Confirm my email**. In Supabase,
   the row in `interest_signups` should show `status = confirmed`.
4. Use the unsubscribe link in the same email. The row should show `status = unsubscribed`.
5. Submit the same email again and check you get the same on-screen message.

## 6. Turn it on for visitors

When the preview test passes, add the same variables for **Production**
(with `SITE_URL=https://chessandtruck.com`), set `VITE_INTEREST_FORM_ENABLED=true`
for Production, and redeploy. To hide the form again, set it back to `false` and redeploy.

## 7. Automatic 30-day cleanup (required before turning on Notify Me in Production)

The Privacy Policy says unconfirmed signups are deleted after 30 days. That is
only true once this daily job is scheduled and tested.

1. In **SQL Editor**, run `supabase/migrations/20261023140000_schedule_interest_purge.sql`
   (or `supabase db push` with the CLI). It turns on Supabase Cron and schedules
   `public.purge_stale_interest_data()` every day at 04:15 UTC.
2. Check that the job exists:

   ```sql
   select jobname, schedule, active from cron.job where jobname = 'purge-stale-interest-data';
   ```

   You should see one row with `active = true`.
3. Test the cleanup with a fake old signup (no real data involved):

   ```sql
   insert into public.interest_signups (email, program_id, consent_at, consent_version, created_at)
   values ('retention-test@example.com', 'camps', now() - interval '31 days', 'retention-test', now() - interval '31 days');

   select public.purge_stale_interest_data();

   select count(*) from public.interest_signups where email = 'retention-test@example.com';
   ```

   The last query should return `0`.
4. After the first scheduled run (the next 04:15 UTC), confirm it succeeded:

   ```sql
   select status, start_time from cron.job_run_details
   where jobid = (select jobid from cron.job where jobname = 'purge-stale-interest-data')
   order by start_time desc limit 5;
   ```

   `status` should be `succeeded`.

## Expected monthly costs

Prices change; check each provider's pricing page before relying on these.

| Service | Plan | Cost | Notes |
| --- | --- | --- | --- |
| Supabase | Free | $0 | 500 MB database is far more than this list needs. Free projects **pause after about a week without activity**; a paused project makes the form show "not available", nothing is lost. |
| Supabase | Pro | about $25/month | No pausing, daily backups. Recommended once you rely on the list publicly. |
| Resend | Free | $0 | About 3,000 emails/month and 100/day. Enough for confirmations and a small launch email. |
| Resend | Pro | about $20/month | Needed only if a launch email goes to more than ~100 people in a day or 3,000 a month. |
| Vercel | Current plan | no change | Adds one serverless function (`/api/interest`). Vercel's Hobby plan is for non-commercial use; a business site should be on Pro (about $20/month per member) if it is not already. |

For a pre-launch list of a few hundred families, the realistic cost is **$0**
on free plans, or **about $25/month** if you upgrade Supabase to avoid pausing.
