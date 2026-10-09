# Database

PostgreSQL 16 via Prisma. Schema: `prisma/schema.prisma`; migrations: `prisma/migrations/`. Money is integer cents.

## Local setup
    docker compose up -d db
    cp .env.example .env
    npm install
    npm run db:migrate     # apply migrations (dev)
    npm run db:seed        # sample lake, admin, owner, renter, boat
    npm run db:studio      # browse data

Production: set `DATABASE_URL` (Neon, Supabase, RDS, Vercel Postgres...) and run `npm run db:deploy` on release.

## Tables
| Area | Models |
|---|---|
| Accounts | User (RENTER/OWNER/ADMIN), Owner (individual/company, service fee %, payout account, verification) |
| Compliance | Document (ID, registration, insurance, captain licence; reviewed in /admin/review) |
| Inventory | Lake, Boat, BoatPhoto, Extra, BoatExtra, CalendarBlock |
| Bookings | Booking (price/tax breakdown mirrors `lib/pricing.ts`), BookingExtra (snapshot of price at booking time) |
| Feedback | Review (with owner reply) |
| Messaging | Conversation, ConversationParticipant, Message |
| Money | Payout (groups bookings paid to an owner) |

Use `lib/db.ts` (`import { db } from '@/lib/db'`) for the shared client.
