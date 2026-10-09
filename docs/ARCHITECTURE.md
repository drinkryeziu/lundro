# Architecture

- **Framework:** Next.js 15 App Router, React 19, Tailwind 4 (no preflight reset).
- **Routes:** 19 screens, grouped as renter (`/`, `/lake-norman`, `/search`, `/boat`, `/checkout`, `/confirmation`), owner (`/owner/signup`, `/owner/*` dashboard under the shared `(dash)` layout) and admin (`/admin/review`).
- **Pricing:** `lib/pricing.ts` is the single source for boat, extras, captain, service fee and State/County/Transit tax split with exemptions; tested in `lib/pricing.test.ts`.
- **Navigation:** owner nav items/badges in `lib/owner-nav.ts`.
- **Design source:** `design-source/` holds the original canvas files for reference.

## Booking flow
Home / Lake page -> Search -> Boat detail -> Checkout -> Confirmation.
Owner flow: Signup -> Verification -> Dashboard (calendar, bookings, boats, extras, customers, messages, earnings, reviews, settings). Admin reviews owner verification at `/admin/review`.

## Current limits / roadmap
Data is prototype/mock and client-side only. Next steps: database (bookings, boats, users), auth, Stripe payments, messaging backend, and migrating per-page inline styles to Tailwind components.
