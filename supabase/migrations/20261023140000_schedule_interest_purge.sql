-- Chess & Truck: enforce the Notify Me retention rule automatically.
--
-- The Privacy Policy says unconfirmed signups are deleted after 30 days.
-- This migration (1) makes the cleanup measure those 30 days from the latest
-- request and (2) runs it once a day with Supabase Cron (pg_cron).
-- No tables, columns, or access rules change.

-- The 30 days count from consent_at, the time of the person's latest request.
-- A repeat signup reuses the same row and resets consent_at, but not
-- created_at, so counting from created_at could delete a request made today.
-- Only rows with status 'pending' are ever deleted; confirmed and unsubscribed
-- rows are never touched. Rate-limit rows older than 2 days are cleared too
-- (their windows last one hour). CREATE OR REPLACE keeps the function's owner
-- and its existing grants (service_role only).
create or replace function public.purge_stale_interest_data()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.interest_signups
  where status = 'pending' and consent_at < now() - interval '30 days';

  delete from public.interest_rate_limits
  where window_started_at < now() - interval '2 days';
end;
$$;

create extension if not exists pg_cron with schema pg_catalog;

-- Running this file again replaces the job instead of adding a second one.
select cron.unschedule(jobid) from cron.job where jobname = 'purge-stale-interest-data';

-- Every day at 04:15 UTC.
select cron.schedule(
  'purge-stale-interest-data',
  '15 4 * * *',
  $$select public.purge_stale_interest_data();$$
);
