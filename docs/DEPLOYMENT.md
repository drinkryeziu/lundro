# Deployment

Lundro is a Next.js 15 app (all current routes are statically prerendered). Node 22+.

Database: see [SUPABASE.md](SUPABASE.md) (also needs `DIRECT_URL`).

## Vercel (recommended, live in ~2 minutes)
1. Import the GitHub repo at https://vercel.com/new.
2. Framework preset: Next.js (auto-detected, `vercel.json` included). No env vars needed.
3. Deploy. Every push to `main` redeploys; PRs get preview URLs.

## Docker (any host: Fly.io, Render, Railway, VPS)
    docker build -t lundro .
    docker run -p 3000:3000 lundro

## Plain Node
    npm ci && npm run build && npm start   # port 3000

## CI
`.github/workflows/ci.yml` runs tests, typecheck and build on every push / PR.

## Prototype on the live site
The clickable prototype is served by the Next app at `/prototype` (file: `public/prototype/index.html`, copy of `prototypes/lundro-prototype.html`). Platform map: `/prototype/platform-map.html`. Update both copies together.
