-- Chess & Truck: record Zelle lesson orders next to Stripe ones.
--
-- A Zelle order has no Stripe Checkout Session and is not paid when it is
-- placed: the family sends the money from their bank and the team confirms it
-- by hand. Existing rows are Stripe orders that are already paid, so the
-- defaults keep them exactly as they are. Access rules do not change.

alter table public.lesson_orders
  add column if not exists payment_method text not null default 'stripe',
  add column if not exists payment_status text not null default 'paid';

alter table public.lesson_orders
  alter column stripe_session_id drop not null;

alter table public.lesson_orders
  drop constraint if exists lesson_orders_payment_method_check,
  add constraint lesson_orders_payment_method_check check (payment_method in ('stripe', 'zelle')),
  drop constraint if exists lesson_orders_payment_status_check,
  add constraint lesson_orders_payment_status_check check (payment_status in ('paid', 'awaiting_payment')),
  -- Stripe orders always keep their Checkout Session, which makes them idempotent.
  drop constraint if exists lesson_orders_stripe_session_check,
  add constraint lesson_orders_stripe_session_check check (payment_method <> 'stripe' or stripe_session_id is not null);
