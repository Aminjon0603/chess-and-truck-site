# Plan: the one-time "registration is open" email

Status: **design only**. The tables exist (`interest_notification_campaigns`,
`interest_notification_deliveries`); no sending code exists yet, and nothing
can send until this plan is built, reviewed, and approved.

## Who receives it

Only rows in `interest_signups` with `status = 'confirmed'` for that program.
Pending and unsubscribed rows are never included. Status is checked again
immediately before each email is sent, so an unsubscribe during sending is honored.

## Safety gates (all must pass before any email is sent)

1. **The program is actually open.** The sender calls the same launch gate as
   checkout (`checkRegistrationGate`). If registration is not ready, it stops.
2. **A campaign is approved.** You write the subject and text, then approve it
   (`approved_by`, `approved_at`). Drafts cannot send.
3. **One campaign per program.** A unique index allows only one non-cancelled
   campaign per program, so a second announcement cannot be created by mistake.
4. **Dry run first.** The sender first reports the recipient count and a sample
   email without sending. Sending requires a separate, explicit confirmation.
5. **Protected trigger.** Sending runs only from a server-side command or a
   protected admin-only function with its own secret, never from the public site.

## Duplicate-send prevention

- Each recipient gets one `interest_notification_deliveries` row per campaign.
  The unique key `(campaign_id, signup_id)` makes a second row impossible, so
  re-running the queue step cannot add duplicates.
- Workers claim small batches atomically (`FOR UPDATE SKIP LOCKED`), marking
  rows `sending`, so two workers can never pick up the same email.
- Each email is sent to Resend with an `Idempotency-Key` equal to the delivery
  ID, so a retry after a timeout does not send a second copy.
- A row is retried at most 3 times; rows stuck in `sending` for 15 minutes go
  back to `queued`.

## Delivery tracking

Each delivery row records `status` (queued, sending, sent, failed, skipped),
`attempts`, `provider_message_id` from Resend, `sent_at`, and a short
`last_error`. The campaign moves to `completed` when no rows are queued or sending.
A later Resend webhook can mark bounces and spam complaints as unsubscribed.

## Email content requirements

- Clear subject, for example "Chess Camps registration is open".
- One-click unsubscribe link (the same signed link used today) plus
  `List-Unsubscribe` and `List-Unsubscribe-Post` headers.
- A physical mailing address for Chess & Truck in the footer (required for
  commercial email under CAN-SPAM). **We will need this address from you.**
- No other marketing; one email per program launch, as promised in the consent text.

## Volume and cost

Resend's free tier allows about 100 emails a day. If a program's confirmed list
is larger, either send in daily batches or move to Resend's paid tier for the launch.

## Build order (Phase 2)

1. Database function to enqueue confirmed recipients and to claim batches.
2. Server-side sender with dry-run mode and the gates above.
3. Tests for gates, duplicates, retries, idempotency, and unsubscribes mid-send.
4. One end-to-end test on a preview with your own address before any real send.
