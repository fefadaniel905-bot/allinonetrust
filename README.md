# allinone trust — Next.js Build Files (v2)

Everything built across our conversation, in one place. This is NOT a runnable
project on its own — these are files meant to be dropped into your existing
Next.js + Tailwind + TypeScript project at the paths shown below.

## What's new in this version
- `sql/schema.sql` now includes `photos`, `featured`, `featured_until`, and
  `availability_count` — none of these existed in the first version, added
  because the demo has since built the photo gallery, Featured badge/sort,
  and quantity-aware referral features that need real columns to read from.
- `app/api/join/route.ts` now checks for a duplicate business name under a
  different category (mirrors the check already in the demo's join wizard),
  and validates photo count (3–5) if photos are sent.

## Setup (do this first)
- `.env.local.example` — Supabase environment variables + full setup steps
- `sql/schema.sql` — run this in Supabase's SQL Editor to create the `businesses` table

## Backend (database connection)
- `lib/supabase.ts` — Supabase client (public + admin, kept separate on purpose)
- `app/api/join/route.ts` — API route the join form submits to (saves as "pending")
- `app/join/page.tsx` — the actual /join page — this is what makes JoinForm.tsx visible on the site
- `app/page.tsx` — the homepage, linking to /join, using the locked design tokens
- `components/JoinForm.tsx` — the connected join form (writes to the database + WhatsApp backup)

## Still not built (on purpose, per earlier scope decisions)
- Photo upload UI — the schema and API support it, but there's no upload
  button in JoinForm.tsx yet. Photos have to be added manually to a row
  until that pipeline exists.
- Owner self-service dashboard/login
- Payment automation / commission tracking
- Full search indexing beyond the two basic indexes

## Approving a new business
No dashboard exists yet (intentionally). Open Supabase → Table Editor → `businesses`
→ find the row with `status = pending` → change it to `approved` → save.

## Marking a business Featured (once they've paid N$150–200)
Same place — open their row → set `featured = true` → optionally set
`featured_until` to when their paid period ends.
