-- Chess & Truck: paid online private lesson orders.
--
-- One row per paid Stripe Checkout Session. The unique stripe_session_id makes
-- fulfillment idempotent: a repeated Stripe webhook, or the webhook and the
-- thank-you page arriving together, can never create a second order.
-- notify_claimed_at / notified_at make sure the confirmation emails go out once.
--
-- No parent or child details are stored here. They stay in Stripe metadata and
-- in the order emails. Only the server (secret key) can read or write this table.

create table if not exists public.lesson_orders (
  id bigint generated always as identity primary key,
  order_number text not null unique,
  stripe_session_id text not null unique,
  package_id text not null check (package_id in ('single', 'five', 'ten')),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'usd',
  livemode boolean not null default false,
  created_at timestamptz not null default now(),
  notify_claimed_at timestamptz,
  notified_at timestamptz
);

alter table public.lesson_orders enable row level security;

-- No policies: the anon and authenticated roles get no access at all.
revoke all on table public.lesson_orders from anon, authenticated;
