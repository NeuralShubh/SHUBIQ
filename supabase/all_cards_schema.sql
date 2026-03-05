-- SHUBIQ: Full card CMS schema (main + studio) for admin panel integration
-- Run this in Supabase SQL editor.

create extension if not exists pgcrypto;

-- Main page cards
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tag text not null default '',
  "desc" text not null default '',
  tech text[] not null default '{}',
  stars int not null default 0,
  link text,
  live text,
  featured boolean not null default false,
  status text not null default 'live',
  order_index int not null default 0,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ecosystem (
  id uuid primary key default gen_random_uuid(),
  type text not null default 'app',
  title text not null,
  subtitle text not null default '',
  "desc" text not null default '',
  icon text not null default '*',
  color text not null default 'rgb(var(--gold-rgb))',
  status text not null default 'concept',
  link text,
  tags text[] not null default '{}',
  featured boolean not null default false,
  order_index int not null default 0,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  icon text not null default '?',
  title text not null,
  "desc" text not null,
  tag text not null default '',
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Studio page cards
create table if not exists public.studio_portfolio (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tag text not null default '',
  "desc" text not null,
  impact text not null default '',
  tech text[] not null default '{}',
  link text,
  status text not null default 'live',
  metric text not null default '',
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.studio_services (
  id uuid primary key default gen_random_uuid(),
  icon_key text not null default 'code',
  title text not null,
  tag text not null default '',
  "desc" text not null,
  features text[] not null default '{}',
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.studio_pricing_plans (
  id uuid primary key default gen_random_uuid(),
  tier text not null,
  tag text not null default '',
  best_for text not null default '',
  price numeric(12,2) not null default 0,
  price_suffix text not null default '',
  meta text not null default '',
  features text[] not null default '{}',
  cta text not null default 'Get Started',
  highlighted boolean not null default false,
  icon text not null default 'trending',
  order_index int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Common updated_at trigger
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_services_updated_at on public.services;
create trigger trg_services_updated_at
before update on public.services
for each row execute function public.set_updated_at();

drop trigger if exists trg_projects_updated_at on public.projects;
create trigger trg_projects_updated_at
before update on public.projects
for each row execute function public.set_updated_at();

drop trigger if exists trg_ecosystem_updated_at on public.ecosystem;
create trigger trg_ecosystem_updated_at
before update on public.ecosystem
for each row execute function public.set_updated_at();

drop trigger if exists trg_studio_portfolio_updated_at on public.studio_portfolio;
create trigger trg_studio_portfolio_updated_at
before update on public.studio_portfolio
for each row execute function public.set_updated_at();

drop trigger if exists trg_studio_services_updated_at on public.studio_services;
create trigger trg_studio_services_updated_at
before update on public.studio_services
for each row execute function public.set_updated_at();

drop trigger if exists trg_studio_pricing_plans_updated_at on public.studio_pricing_plans;
create trigger trg_studio_pricing_plans_updated_at
before update on public.studio_pricing_plans
for each row execute function public.set_updated_at();

-- Indexes
create index if not exists idx_projects_order on public.projects (order_index);
create index if not exists idx_ecosystem_order on public.ecosystem (order_index);
create index if not exists idx_services_order on public.services (order_index);
create index if not exists idx_studio_portfolio_order on public.studio_portfolio (order_index);
create index if not exists idx_studio_services_order on public.studio_services (order_index);
create index if not exists idx_studio_pricing_order on public.studio_pricing_plans (order_index);

-- RLS
alter table public.projects enable row level security;
alter table public.ecosystem enable row level security;
alter table public.services enable row level security;
alter table public.studio_portfolio enable row level security;
alter table public.studio_services enable row level security;
alter table public.studio_pricing_plans enable row level security;

-- Public read policies
drop policy if exists "Public read projects" on public.projects;
create policy "Public read projects" on public.projects
for select to anon using (true);

drop policy if exists "Public read ecosystem" on public.ecosystem;
create policy "Public read ecosystem" on public.ecosystem
for select to anon using (true);

drop policy if exists "Public read services" on public.services;
create policy "Public read services" on public.services
for select to anon using (true);

drop policy if exists "Public read studio_portfolio" on public.studio_portfolio;
create policy "Public read studio_portfolio" on public.studio_portfolio
for select to anon using (true);

drop policy if exists "Public read studio_services" on public.studio_services;
create policy "Public read studio_services" on public.studio_services
for select to anon using (true);

drop policy if exists "Public read studio_pricing_plans" on public.studio_pricing_plans;
create policy "Public read studio_pricing_plans" on public.studio_pricing_plans
for select to anon using (true);

-- Admin writes from current client-admin flow (uses anon key in browser).
-- For stricter security, replace this with server-side service-role APIs.
drop policy if exists "Anon write projects" on public.projects;
create policy "Anon write projects" on public.projects
for all to anon using (true) with check (true);

drop policy if exists "Anon write ecosystem" on public.ecosystem;
create policy "Anon write ecosystem" on public.ecosystem
for all to anon using (true) with check (true);

drop policy if exists "Anon write services" on public.services;
create policy "Anon write services" on public.services
for all to anon using (true) with check (true);

drop policy if exists "Anon write studio_portfolio" on public.studio_portfolio;
create policy "Anon write studio_portfolio" on public.studio_portfolio
for all to anon using (true) with check (true);

drop policy if exists "Anon write studio_services" on public.studio_services;
create policy "Anon write studio_services" on public.studio_services
for all to anon using (true) with check (true);

drop policy if exists "Anon write studio_pricing_plans" on public.studio_pricing_plans;
create policy "Anon write studio_pricing_plans" on public.studio_pricing_plans
for all to anon using (true) with check (true);
