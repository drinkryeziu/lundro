# API

All routes are Next.js route handlers under `app/api`. Auth is an HttpOnly signed cookie (`lundro_session`, 14 days). Set `AUTH_SECRET` in production.

| Method & path | Auth | Purpose |
|---|---|---|
| POST `/api/auth/register` | – | Create renter account `{name,email,password}` |
| POST `/api/auth/login` | – | Log in `{email,password}` |
| POST `/api/auth/logout` | – | Clear session |
| GET `/api/auth/me` | – | Current user or `null` |
| GET `/api/boats` | – | Active listings (search page) |
| GET `/api/boats/:id` | – | One listing |
| POST `/api/bookings` | optional | Create booking. Price, tax and fee are computed **server-side** with `lib/pricing.ts`; guest checkout creates the renter by email. Returns `409` if the boat/date/time is taken |
| GET `/api/bookings/:code` | code | Booking + price breakdown (confirmation page) |
| POST `/api/owner/signup` | optional | Create owner (+ first boat, `PENDING_REVIEW`) |
| GET `/api/owner/bookings` | owner | Bookings on the owner's boats |
| GET/POST `/api/admin/owners` | admin | List pending owners; approve/reject (approval publishes their boats) |

Demo accounts after `npm run db:seed` (password `lundro-demo-1`): `admin@lundro.test`, `owner@lundro.test`, `renter@lundro.test`. Change or remove them in production.

## Wired pages
Search (`/search`), Boat (`/boat?id=`), Checkout (`/checkout?boat=`), Confirmation (`/confirmation?code=`), Owner signup and `/login` use the API. The owner dashboard and admin screens still show prototype data; `/api/owner/bookings` and `/api/admin/owners` are ready for them.

## Not yet implemented
Real card payments (Stripe), email notifications, photo uploads, password reset.
