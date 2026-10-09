# Supabase setup

Supabase is managed PostgreSQL, so the existing Prisma schema and migration work unchanged.

1. Create a project at https://supabase.com/dashboard (region: US East). Save the database password.
2. Project Settings → Database → Connection string. Copy both:
   - **Transaction pooler** (port 6543) → `DATABASE_URL`, append `?pgbouncer=true&connection_limit=1`
   - **Direct connection** (port 5432) → `DIRECT_URL`
3. Create the tables and sample boats from your computer:
       export DATABASE_URL="<pooler url>" DIRECT_URL="<direct url>"
       npx prisma migrate deploy
       npm run db:seed
4. In Vercel (or your host) set `DATABASE_URL`, `DIRECT_URL` and `AUTH_SECRET`.
5. Security: the app talks to Postgres only from the server through Prisma. In the Supabase dashboard, leave the public API tables unexposed (Authentication → Policies, enable RLS on all tables with no public policies) so the anon key cannot read them.
6. Remove or change the demo accounts created by the seed before launch.
