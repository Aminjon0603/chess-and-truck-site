# CHESS AND TRUCK

Standalone React + Vercel project for the `CHESS AND TRUCK` tournament website.

This folder is intentionally separate from the old `premium-websites-nyc` project so you can deploy it to a different Vercel project without replacing the previous live site.

## Local development

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
npm run lint
```

## Required Vercel environment variables

Create these in the new Vercel project only:

```bash
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
CONTACT_FROM_EMAIL=
CONTACT_TO_EMAILS=info@chessandtruck.com
```

`STRIPE_WEBHOOK_SECRET` is used by `/api/stripe-webhook` so the site can receive a trusted payment confirmation directly from Stripe after checkout completes.

## Deploy safely

1. Create a new GitHub repository for this folder only.
2. In this folder run:

```bash
git remote add origin <your-new-github-repo-url>
git push -u origin main
```

3. In Vercel click `Add New` -> `Project`.
4. Import the new GitHub repository for `chess-and-truck-site`.
5. Confirm the root directory is this repository and keep the default Vite build settings.
6. Add the environment variables above in that new Vercel project.
7. Deploy.
8. Do not connect `premium-websites-nyc` to the same repository or Vercel project.

## Main app files

- `src/ChessTruckApp.jsx` - multi-page site app and route handling
- `src/siteData.js` - CHESS AND TRUCK page copy and labels
- `src/site.css` - active site styling
- `src/lib/validation.js` - shared validation rules for frontend and API handlers
- `api/create-checkout-session.js` - Stripe Checkout session creation
- `api/checkout-status.js` - payment confirmation lookup
- `api/tournament-contact.js` - contact form email handler
- `api/stripe-webhook.js` - trusted Stripe payment confirmation webhook
