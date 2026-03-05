-- SHUBIQ: Optional starter data for full card CMS tables.
-- Run after all_cards_schema.sql

insert into public.projects (name, tag, "desc", tech, stars, link, live, featured, status, order_index)
select
  'SHUBIQ Studio',
  'Agency | Live',
  'A modern freelance business platform.',
  array['Next.js', 'Supabase'],
  16,
  'https://github.com/NeuralShubh/BuildWithShubh',
  'https://buildwithshubh.vercel.app',
  true,
  'live',
  0
where not exists (select 1 from public.projects);

insert into public.projects (name, tag, "desc", tech, stars, link, live, featured, status, order_index)
select
  'Portfolio',
  'Personal | Live',
  'Personal portfolio showcasing projects.',
  array['HTML', 'CSS', 'JS'],
  11,
  'https://github.com/NeuralShubh/Portfolio',
  'https://shubham95792.github.io/Portfolio/',
  false,
  'live',
  1
where (select count(*) from public.projects) = 1;

insert into public.services (icon, title, "desc", tag, order_index)
select
  'code',
  'High-Performance Web Platforms',
  'Engineered for speed and scale, high-performance platforms built to convert, scale, and dominate competitive markets.',
  'Core',
  0
where not exists (select 1 from public.services);

insert into public.services (icon, title, "desc", tag, order_index)
select
  'layout',
  'Custom Software Architecture',
  'Designed to solve complex operational challenges with scalable, data-driven architecture aligned to business execution.',
  'Agency',
  1
where (select count(*) from public.services) = 1;

insert into public.ecosystem (type, title, subtitle, "desc", icon, color, status, link, tags, featured, order_index)
select
  'app',
  'SHUBIQ Studio',
  'Full-service digital agency',
  'End-to-end web and software solutions.',
  '*',
  'rgb(var(--gold-rgb))',
  'live',
  '/shubiq-studio',
  array['Agency', 'AI'],
  true,
  0
where not exists (select 1 from public.ecosystem);

insert into public.studio_portfolio (name, tag, "desc", impact, tech, link, status, metric, order_index)
select
  'SHUBIQ',
  'Personal Brand Ecosystem',
  'A structured digital ecosystem integrating brand presence, engineered systems, and scalable product layers under a unified architecture.',
  'Unified multiple digital systems into one cohesive brand infrastructure.',
  array['Next.js', 'TypeScript', 'Supabase', 'Tailwind'],
  'https://buildwithshubh.vercel.app',
  'live',
  '97 Perf Score',
  0
where not exists (select 1 from public.studio_portfolio);

insert into public.studio_services (icon_key, title, tag, "desc", features, order_index)
select
  'code',
  'High-Performance Web Platforms',
  'Core',
  'Engineered for speed and scale, high-performance platforms built to convert, scale, and dominate competitive markets.',
  array['Modern frontend architecture', 'Secure backend infrastructure', 'Performance-first engineering'],
  0
where not exists (select 1 from public.studio_services);

insert into public.studio_pricing_plans (tier, tag, best_for, price, price_suffix, meta, features, cta, highlighted, icon, order_index)
select
  'Launch',
  'Starter',
  'Founders and small teams',
  499,
  '/ project',
  'Fast delivery',
  array['Strategy call', 'Design + development', 'Basic analytics'],
  'Get Started',
  false,
  'zap',
  0
where not exists (select 1 from public.studio_pricing_plans);
