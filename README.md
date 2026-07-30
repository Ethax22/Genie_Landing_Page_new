# Genie Landing Page

Pre-launch waitlist landing page for **Genie** (Genie Hive Private Limited).
Built per [landing-page-spec.md](./landing-page-spec.md) — Next.js 14 (App Router), TypeScript, Tailwind, pure CSS/SVG (no animation library, no 3D).

## Commands

```bash
npm run dev          # dev server on :3000
npm run build        # copy sweep (banned words) + production build
npm run start        # serve the production build
npm run check:copy   # banned-word sweep only
npm run export:waitlist   # dump waitlist table to CSV
```

## Structure

- `src/content/copy.ts` — **all** page copy as typed constants (single source of truth; FAQ JSON-LD is generated from it)
- `src/components/` — one component per spec section
- `src/app/api/waitlist/route.ts` — waitlist POST: Zod validation, honeypot, min-fill-time, per-IP token bucket, generic success (no email enumeration), `UNIQUE COLLATE NOCASE` email
- `src/lib/db.ts` — SQLite via **`node:sqlite`** (built into Node ≥22.5; replaces the spec'd better-sqlite3 to avoid a native build step). DB file at `data/waitlist.db` (`DATA_DIR` env to override)
- `scripts/check-copy.mjs` — CI grep for `AI-powered|supercharge|unlock|revolutioni[sz]e|seamless` (runs as `prebuild`)

## Deploy

`Dockerfile` builds the standalone Next.js server on `node:24-alpine`; mount a volume at `/app/data` to persist the waitlist DB.

## Not yet built

- Custom OG image
- Playwright smoke tests + Lighthouse CI budget checks
- Azure deploy (nginx + certbot per the old plan)
- §12 scroll line-following mascot effect (spec: build last, only if time permits)
