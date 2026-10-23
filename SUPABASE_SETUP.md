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

What the cleanup deletes, and nothing else:

- `interest_signups` rows with `status = 'pending'` whose latest request
  (`consent_at`) is more than 30 days old. Confirmed and unsubscribed rows are
  never deleted.
- `interest_rate_limits` rows older than 2 days (each limit only lasts one hour).

Run each step in **SQL Editor**, one at a time. Every check below returns
counts or yes/no values only, never email addresses.

**Step 1: check the starting point (read-only).**

```sql
select
  (select count(*) from pg_proc where proname = 'purge_stale_interest_data') as cleanup_function_exists,
  (select count(*) from pg_extension where extname = 'pg_cron') as cron_enabled,
  (select count(*) from public.interest_signups) as total_signups,
  (select count(*) from public.interest_signups where status = 'pending') as pending,
  (select count(*) from public.interest_signups
     where status = 'pending' and consent_at < now() - interval '30 days') as would_be_deleted_now;
```

`cleanup_function_exists` must be `1` (the first migration is applied).
`would_be_deleted_now` is how many rows the first run will remove; these are
exactly the unconfirmed requests the Privacy Policy says must be deleted.

**Step 2: apply the migration.** Paste and run the whole file
`supabase/migrations/20261023140000_schedule_interest_purge.sql`. It updates
the cleanup rule and schedules it for every day at 04:15 UTC. It deletes
nothing by itself.

**Step 3: confirm the job and the rule (read-only).**

```sql
select
  (select count(*) from cron.job where jobname = 'purge-stale-interest-data') as job_count,
  (select schedule from cron.job where jobname = 'purge-stale-interest-data') as schedule,
  (select active from cron.job where jobname = 'purge-stale-interest-data') as active,
  position('consent_at < now() - interval ''30 days''' in pg_get_functiondef('public.purge_stale_interest_data()'::regprocedure)) > 0 as counts_from_latest_request;
```

Expected: `job_count = 1`, `schedule = 15 4 * * *`, `active = true`,
`counts_from_latest_request = true`.

**Step 4: safe test (nothing is saved).** This adds five fake signups, runs
the cleanup, reports what is left, and then deliberately stops with an error
so everything, including any real deletions during the test, is undone.

```sql
do $$
declare
  remaining text;
begin
  insert into public.interest_signups
    (email, program_id, status, consent_at, consent_version, confirmed_at, unsubscribed_at, created_at)
  values
    ('retention-test-old-pending@example.com',    'camps', 'pending',      now() - interval '31 days', 'retention-test', null,                       null,                       now() - interval '31 days'),
    ('retention-test-new-pending@example.com',    'camps', 'pending',      now() - interval '1 day',   'retention-test', null,                       null,                       now() - interval '1 day'),
    ('retention-test-resubscribed@example.com',   'camps', 'pending',      now() - interval '1 day',   'retention-test', null,                       null,                       now() - interval '90 days'),
    ('retention-test-old-confirmed@example.com',  'camps', 'confirmed',    now() - interval '90 days', 'retention-test', now() - interval '89 days', null,                       now() - interval '90 days'),
    ('retention-test-old-unsubscribed@example.com','camps', 'unsubscribed', now() - interval '90 days', 'retention-test', null,                       now() - interval '60 days', now() - interval '90 days');

  perform public.purge_stale_interest_data();

  select string_agg(replace(split_part(email, '@', 1), 'retention-test-', ''), ', ' order by email)
    into remaining
    from public.interest_signups
    where email like 'retention-test-%@example.com';

  raise exception 'TEST ONLY - nothing was saved. Kept after cleanup: %', remaining;
end $$;
```

The SQL Editor shows this as an **error**, which is expected. The message must read:

`TEST ONLY - nothing was saved. Kept after cleanup: new-pending, old-confirmed, old-unsubscribed, resubscribed`

`old-pending` must be missing (it was deleted); the other four must be kept.

**Step 5: confirm the test left nothing behind (read-only).**

```sql
select count(*) as leftover_test_rows
from public.interest_signups
where email like 'retention-test-%@example.com';
```

Expected: `0`.

**Step 6: confirm a real scheduled run (after the next 04:15 UTC).**

```sql
select status, return_message, start_time, end_time
from cron.job_run_details
where jobid = (select jobid from cron.job where jobname = 'purge-stale-interest-data')
order by start_time desc
limit 5;
```

At least one row with `status = succeeded` means the daily job is working.
Until you see that, treat the cleanup as scheduled but not yet observed.

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
