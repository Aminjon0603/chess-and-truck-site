-- Chess & Truck: enforce the Notify Me retention rule automatically.
--
-- The Privacy Policy says unconfirmed signups are deleted after 30 days.
-- public.purge_stale_interest_data() (from the previous migration) does that,
-- and also clears old rate-limit rows. This migration runs it once a day with
-- Supabase Cron (pg_cron). No tables, columns, or access rules change.

create extension if not exists pg_cron with schema pg_catalog;

-- Running this file again replaces the job instead of adding a second one.
select cron.unschedule(jobid) from cron.job where jobname = 'purge-stale-interest-data';

-- Every day at 04:15 UTC.
select cron.schedule(
  'purge-stale-interest-data',
  '15 4 * * *',
  $$select public.purge_stale_interest_data();$$
);
