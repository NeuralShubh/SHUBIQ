# SHUBIQ Setup

## Run locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Required env vars (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
NEXT_PUBLIC_ADMIN_PASSWORD=...
DATABASE_URL=...
```

## Supabase database setup
Run these SQL files in Supabase SQL Editor:

1. `supabase/all_cards_schema.sql`
2. `supabase/contact_submissions.sql`
3. `supabase/seed_cards.sql` (optional starter content)

Then restart:
```bash
npm run dev
```

## Admin panel
- Login: `/admin`
- Dashboard: `/admin/dashboard`
- Card CMS now uses Supabase as the source of truth for all cards:
  - Main page: `projects`, `services`, `ecosystem`
  - Studio page: `studio_portfolio`, `studio_services`, `studio_pricing_plans`
- Form submissions are shown in `Form Data` from `contact_submissions`.

## Notes
- If database tables or env vars are missing, admin shows a database-required status and blocks card CRUD until fixed.
- Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.
