-- SHUBIQ: Contact submissions table for website lead form + admin panel

create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text not null default 'shubiq',
  "read" boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.contact_submissions
  add column if not exists name text,
  add column if not exists email text,
  add column if not exists message text,
  add column if not exists source text default 'shubiq',
  add column if not exists "read" boolean default false,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

create index if not exists idx_contact_submissions_created_at
  on public.contact_submissions (created_at desc);

create index if not exists idx_contact_submissions_read
  on public.contact_submissions ("read");

create index if not exists idx_contact_submissions_email
  on public.contact_submissions (email);

create or replace function public.set_contact_submissions_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_contact_submissions_updated_at on public.contact_submissions;
create trigger trg_contact_submissions_updated_at
before update on public.contact_submissions
for each row
execute function public.set_contact_submissions_updated_at();

alter table public.contact_submissions enable row level security;

-- No public read policy by default.
-- API routes in this project use SUPABASE_SERVICE_ROLE_KEY for admin operations.
