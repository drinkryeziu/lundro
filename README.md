# Lundro web (Next.js)

Boat rental marketplace for NC lakes, starting with Lake Norman. 19 screens: renter, owner dashboard, admin.

    npm install
    npm run dev        # http://localhost:3000
    npm test           # pricing and tax tests
    npm run build && npm start

See also: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md), [CONTRIBUTING.md](CONTRIBUTING.md).

API and auth: [docs/API.md](docs/API.md). Database: see [docs/DATABASE.md](docs/DATABASE.md) (Postgres + Prisma).

Clickable design prototypes (open in a browser): [prototypes/](prototypes/).

Prototype index: open `index.html` (or enable GitHub Pages to serve it).

## Routes
`/` home, `/lake-norman`, `/search`, `/boat`, `/checkout`, `/confirmation`, `/owner/signup`,
`/owner` (+ calendar, bookings, boats, extras, customers, messages, earnings, reviews,
verification, settings), `/admin/review`.

## Structure
- `app/owner/(dash)/layout.jsx` is the one shared owner shell (sidebar, mobile tab bar, More menu), built with Tailwind. Nav items and badges live in `lib/owner-nav.ts`.
- `lib/pricing.ts` is the single source for boat, extras, captain, service fee and the State / County / Transit tax split, with exemptions. Checkout and Confirmation both use it; `lib/pricing.test.ts` covers it.
- `app/globals.css` holds the design tokens (Tailwind `@theme`), base styles and shared buttons. Tailwind is loaded without its reset, so existing screens are unchanged.
- `lib/dc.js` is the small state helper the pages' component classes extend.
- `design-source/` is the original canvas files, kept for reference only. The pages in `app/` are now the source of truth.

## Not done yet
Payments (Stripe), email, uploads, and wiring the owner dashboard/admin screens to the API. Screen bodies still use the design's inline styles and per-page CSS (only the shared pieces use Tailwind), and page logic is still plain JS in each page.
