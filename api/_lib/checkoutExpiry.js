// Stripe Checkout Sessions expire 24 hours after creation by default. Stripe
// allows any expiry from 30 minutes to 24 hours (expires_at, epoch seconds).
// Sessions here expire after 60 minutes, which limits how long a payment page
// created before a program closes or changes can still be paid.
export const CHECKOUT_SESSION_LIFETIME_MINUTES = 60;

export const getCheckoutExpiresAt = (now = Date.now()) =>
  Math.floor(now / 1000) + CHECKOUT_SESSION_LIFETIME_MINUTES * 60;
