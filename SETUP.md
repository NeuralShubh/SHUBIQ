# SHUBIQ v2 — Setup Guide

## Stack
- **Next.js 14** (App Router)
- **GSAP 3** (ScrollTrigger, split text, stagger, parallax)
- **Lenis** (buttery smooth scroll)
- **Supabase** (database for projects & ecosystem)
- **Tailwind CSS** (styling)
- **TypeScript**

---

## 5 Premium Effects

| Effect | Where |
|--------|-------|
| **1. Magnetic Cursor** | `MagneticCursor.tsx` — cursor follows with lag + expands on hover |
| **2. Split Text Reveal** | `Hero.tsx` — each letter of "SHUBIQ" flies in with rotateX |
| **3. Text Scramble** | `Projects.tsx` — hover project title to see chars scramble to final text |
| **4. 3D Card Tilt** | `Services.tsx` — cards tilt in 3D following your cursor with glow |
| **5. GSAP ScrollTrigger** | All sections — pinned scroll-triggered reveals with stagger |

Plus: **Lenis smooth scroll** wraps the entire site for silky 60fps scrolling.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env.local

# 3. Fill in .env.local (Supabase credentials)

# 4. Run dev server
npm run dev
```

## Admin Panel

Visit `/admin` → enter your password (default: `shubiq_admin_2024`)

**Change the password** in `.env.local`:
```
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password
```

### Admin Features
- ✅ Add / Edit / Delete projects
- ✅ Add / Edit / Delete ecosystem items
- ✅ Toggle featured status
- ✅ Status management (live, wip, concept, etc.)
- ✅ Search & filter
- ✅ Stats dashboard
- ✅ Currently uses localStorage (works with zero config)

---

## Supabase Setup (Optional but Recommended)

### 1. Create a Supabase project at https://app.supabase.com

### 2. Run this SQL in the SQL editor:

```sql
-- Projects table
create table projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  tag text,
  desc text,
  tech text[] default '{}',
  stars int default 0,
  link text,
  live text,
  featured boolean default false,
  status text default 'live',
  order_index int default 0,
  image_url text,
  created_at timestamptz default now()
);

-- Ecosystem table
create table ecosystem (
  id uuid default gen_random_uuid() primary key,
  type text not null,
  title text not null,
  subtitle text,
  desc text,
  icon text default '◈',
  color text default '#C9A84C',
  status text default 'concept',
  link text,
  tags text[] default '{}',
  featured boolean default false,
  order_index int default 0,
  image_url text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table projects enable row level security;
alter table ecosystem enable row level security;

-- Public read only
create policy "Public read projects"
  on projects for select to anon using (true);

create policy "Public read ecosystem"
  on ecosystem for select to anon using (true);

-- For admin writes (service role only - keep this key server-side)
create policy "Service role write projects"
  on projects for all to service_role using (true);

create policy "Service role write ecosystem"  
  on ecosystem for all to service_role using (true);
```

### 3. Add credentials to `.env.local`

### 4. The admin panel stores to localStorage by default.
To sync to Supabase, update `src/app/admin/dashboard/page.tsx` 
to use the Supabase client from `src/app/lib/supabase.ts`.

---

## Ecosystem Section

The Ecosystem section supports these item types:
- `project` — GitHub/code projects
- `app` — Products and apps
- `tool` — Dev tools and utilities  
- `service` — Offered services
- `blog` — Blog posts/articles
- `case_study` — Case studies

Add new items via the Admin Panel at `/admin/dashboard` → Ecosystem tab.

---

## Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Settings → Environment Variables
```

---

## File Structure

```
src/app/
├── components/
│   ├── MagneticCursor.tsx   ← Premium cursor
│   ├── SmoothScroll.tsx     ← Lenis provider
│   ├── Navbar.tsx
│   ├── Hero.tsx             ← Split text + GSAP
│   ├── About.tsx            ← ScrollTrigger reveals
│   ├── Services.tsx         ← 3D tilt cards
│   ├── Projects.tsx         ← Text scramble
│   ├── Ecosystem.tsx        ← NEW section
│   ├── Marquee.tsx
│   ├── Contact.tsx
│   ├── Footer.tsx
│   └── GoldLine.tsx
├── admin/
│   ├── page.tsx             ← Login
│   └── dashboard/
│       └── page.tsx         ← Full CRUD admin
├── lib/
│   ├── supabase.ts          ← Supabase client + types
│   └── gsap-hooks.ts        ← Reusable GSAP utilities
├── data.ts                  ← Static fallback data
├── globals.css
├── layout.tsx
└── page.tsx
```
