# Deployment

Lundro is a Next.js 15 app (all current routes are statically prerendered). Node 22+.

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
