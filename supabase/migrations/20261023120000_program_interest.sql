-- Chess & Truck: program interest list ("Notify Me").
--
-- Privacy model
--   * Only an adult contact email, the program, consent and status timestamps
--     are stored. No child names, ages, birthdays, ratings, or medical data.
--   * Row Level Security is enabled on every table with NO policies, and all
--     privileges are revoked from the public "anon" and "authenticated" roles.
--     Visitors using the public API key can never read or write these tables.
--   * Only the server (Vercel functions using the secret / service_role key)
--     can access them. That key must never be sent to the browser.
--   * Confirmation tokens are stored only as SHA-256 hashes. Rate-limit keys
--     are HMAC hashes, so raw IP addresses are never stored.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------- signups

create table public.interest_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null
    check (email = lower(btrim(email)) and char_length(email) between 3 and 254 and position('@' in email) > 1),
  program_id text not null
    check (program_id in ('camps', 'tournaments', 'lessons', 'afterSchool', 'dojo')),
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'unsubscribed')),
  consent_at timestamptz not null,
  consent_version text not null check (char_length(consent_version) between 1 and 40),
  confirm_token_hash text check (confirm_token_hash is null or confirm_token_hash ~ '^[0-9a-f]{64}$'),
  confirm_token_expires_at timestamptz,
  confirmation_sent_at timestamptz,
  confirmed_at timestamptz,
  unsubscribed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- One row per email and program: prevents duplicate subscriptions while
  -- allowing the same email to follow several programs.
  constraint interest_signups_email_program_key unique (email, program_id),
  constraint interest_signups_confirmed_has_timestamp check (status <> 'confirmed' or confirmed_at is not null),
  constraint interest_signups_unsubscribed_has_timestamp check (status <> 'unsubscribed' or unsubscribed_at is not null)
);

create unique index interest_signups_confirm_token_hash_key
  on public.interest_signups (confirm_token_hash)
  where confirm_token_hash is not null;

create index interest_signups_program_status_idx
  on public.interest_signups (program_id, status);

create or replace function public.interest_touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger interest_signups_touch_updated_at
  before update on public.interest_signups
  for each row execute function public.interest_touch_updated_at();

-- ------------------------------------------------------- durable rate limits

create table public.interest_rate_limits (
  key text primary key check (key ~ '^[a-z]+:[0-9a-f]{64}$'),
  window_started_at timestamptz not null,
  hits integer not null check (hits >= 0)
);

-- Atomically counts one request in a fixed window. Returns true when the
-- request is allowed. Works across all serverless instances.
create or replace function public.consume_interest_rate_limit(p_key text, p_limit integer, p_window_seconds integer)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_hits integer;
begin
  if p_limit < 1 or p_window_seconds < 1 then
    return false;
  end if;

  insert into public.interest_rate_limits as r (key, window_started_at, hits)
  values (p_key, now(), 1)
  on conflict (key) do update
    set hits = case
          when r.window_started_at < now() - make_interval(secs => p_window_seconds) then 1
          else r.hits + 1
        end,
        window_started_at = case
          when r.window_started_at < now() - make_interval(secs => p_window_seconds) then now()
          else r.window_started_at
        end
  returning hits into v_hits;

  return v_hits <= p_limit;
end;
$$;

-- ------------------------------------------- launch notifications (Phase 2)
-- Created now so the design is reviewed with the schema. Nothing sends yet.

create table public.interest_notification_campaigns (
  id uuid primary key default gen_random_uuid(),
  program_id text not null
    check (program_id in ('camps', 'tournaments', 'lessons', 'afterSchool', 'dojo')),
  subject text not null check (char_length(subject) between 1 and 200),
  body_text text not null check (char_length(body_text) between 1 and 10000),
  status text not null default 'draft'
    check (status in ('draft', 'approved', 'sending', 'completed', 'cancelled')),
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint interest_campaigns_approved_fields check (
    status in ('draft', 'cancelled') or (approved_by is not null and approved_at is not null)
  )
);

-- One launch announcement per program: a second non-cancelled campaign for the
-- same program cannot be created.
create unique index interest_campaigns_one_per_program
  on public.interest_notification_campaigns (program_id)
  where status <> 'cancelled';

create trigger interest_campaigns_touch_updated_at
  before update on public.interest_notification_campaigns
  for each row execute function public.interest_touch_updated_at();

create table public.interest_notification_deliveries (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.interest_notification_campaigns (id) on delete cascade,
  signup_id uuid not null references public.interest_signups (id) on delete cascade,
  status text not null default 'queued'
    check (status in ('queued', 'sending', 'sent', 'failed', 'skipped')),
  attempts integer not null default 0 check (attempts between 0 and 10),
  provider_message_id text,
  last_error text,
  claimed_at timestamptz,
  sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- Duplicate-send prevention: one delivery per subscriber per campaign.
  constraint interest_deliveries_campaign_signup_key unique (campaign_id, signup_id)
);

create index interest_deliveries_campaign_status_idx
  on public.interest_notification_deliveries (campaign_id, status);

create trigger interest_deliveries_touch_updated_at
  before update on public.interest_notification_deliveries
  for each row execute function public.interest_touch_updated_at();

-- --------------------------------------------------------------- retention

-- Removes unconfirmed signups after 30 days and old rate-limit rows.
-- Run manually or schedule with Supabase Cron (pg_cron) once a day.
create or replace function public.purge_stale_interest_data()
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  delete from public.interest_signups
  where status = 'pending' and created_at < now() - interval '30 days';

  delete from public.interest_rate_limits
  where window_started_at < now() - interval '2 days';
end;
$$;

-- ------------------------------------------------------- access control

alter table public.interest_signups enable row level security;
alter table public.interest_rate_limits enable row level security;
alter table public.interest_notification_campaigns enable row level security;
alter table public.interest_notification_deliveries enable row level security;

-- No policies are created: with RLS enabled, anon and authenticated get nothing.
revoke all on table public.interest_signups from public, anon, authenticated;
revoke all on table public.interest_rate_limits from public, anon, authenticated;
revoke all on table public.interest_notification_campaigns from public, anon, authenticated;
revoke all on table public.interest_notification_deliveries from public, anon, authenticated;

grant select, insert, update, delete on table public.interest_signups to service_role;
grant select, insert, update, delete on table public.interest_rate_limits to service_role;
grant select, insert, update, delete on table public.interest_notification_campaigns to service_role;
grant select, insert, update, delete on table public.interest_notification_deliveries to service_role;

revoke all on function public.consume_interest_rate_limit(text, integer, integer) from public, anon, authenticated;
revoke all on function public.purge_stale_interest_data() from public, anon, authenticated;
revoke all on function public.interest_touch_updated_at() from public, anon, authenticated;
grant execute on function public.consume_interest_rate_limit(text, integer, integer) to service_role;
grant execute on function public.purge_stale_interest_data() to service_role;
