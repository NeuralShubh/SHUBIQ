/* eslint-disable no-console */
const fs = require("fs")
const path = require("path")
const { Client } = require("pg")

const ROOT = process.cwd()
const ENV_PATH = path.join(ROOT, ".env.local")

function readDatabaseUrl() {
  const raw = fs.readFileSync(ENV_PATH, "utf8")
  const match = raw.match(/^DATABASE_URL=(.+)$/m)
  if (!match) throw new Error("DATABASE_URL not found in .env.local")
  return match[1].trim()
}

const MAIN_PROJECTS = [
  {
    name: "SHUBIQ Studio",
    tag: "Agency | Live",
    desc: "A modern business platform built with Next.js, Tailwind CSS, and Supabase, delivering fast, conversion-focused digital experiences for growing brands.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    stars: 16,
    link: "https://github.com/NeuralShubh/BuildWithShubh",
    live: "https://buildwithshubh.vercel.app",
    featured: true,
    status: "live",
  },
  {
    name: "Portfolio",
    tag: "Studio | Live",
    desc: "A personal portfolio showcasing selected work, technical capabilities, and execution quality across web and AI initiatives.",
    tech: ["HTML", "CSS", "JavaScript"],
    stars: 11,
    link: "https://github.com/NeuralShubh/Portfolio",
    live: "https://shubham95792.github.io/Portfolio/",
    featured: false,
    status: "live",
  },
  {
    name: "ShubhLedger",
    tag: "Crypto | Live",
    desc: "A web-based crypto portfolio tracker with real-time monitoring of holdings, investments, and portfolio value through a unified interactive dashboard.",
    tech: ["CSS", "JavaScript", "GSAP"],
    stars: 7,
    link: "https://github.com/NeuralShubh/ShubhLedger",
    live: "https://shubhledger.infinityfreeapp.com/",
    featured: false,
    status: "wip",
  },
  {
    name: "TejamOS",
    tag: "App | In Development",
    desc: "A unified personal productivity system designed to run your day in one place: tasks, habits, focus blocks, health routines, study, and goals.",
    tech: ["Productivity", "Life OS", "Focus"],
    stars: 0,
    link: "https://github.com/NeuralShubh/TejamOS",
    live: null,
    featured: false,
    status: "wip",
  },
]

const MAIN_SERVICES = [
  {
    icon: "?",
    title: "Web Development",
    desc: "High-performance, conversion-focused websites and web apps built with Next.js, React, and modern stacks. Fast, scalable, and beautifully crafted for small businesses.",
    tag: "Core Service",
  },
  {
    icon: "?",
    title: "Software Solutions",
    desc: "Custom web apps, dashboards, and SaaS tools tailored to solve real business problems with clean architecture and intelligent, future-proof design.",
    tag: "Agency",
  },
  {
    icon: "?",
    title: "AI Integration",
    desc: "Embedding intelligence into your products through chatbots, automation pipelines, ML models, and smart features that give your business a genuine winning edge.",
    tag: "Intelligence",
  },
  {
    icon: "?",
    title: "App Building",
    desc: "From idea to launch, building scalable mobile and web apps with clean architecture, polished UX, and production-ready performance.",
    tag: "Product",
  },
]

const MAIN_ECOSYSTEM = [
  {
    type: "agency",
    title: "SHUBIQ Studio",
    subtitle: "DIGITAL ENGINEERING AGENCY",
    desc: "SHUBIQ Studio partners with brands and founders to design, build, and launch websites, web applications, and custom software. Each project is crafted with precision and aligned with clear business goals.",
    icon: "?",
    color: "rgb(var(--gold-rgb))",
    status: "live",
    link: "https://buildwithshubh.vercel.app",
    tags: [],
    featured: true,
  },
  {
    type: "app",
    title: "SHUBIQ Labs",
    subtitle: "OWNED PRODUCT DEVELOPMENT",
    desc: "SHUBIQ Labs is where we design, build, and launch our own web and mobile applications under the SHUBIQ ecosystem. Every product is created in-house, driven by our vision, and engineered for clarity, performance, and long-term growth.",
    icon: "?",
    color: "rgb(var(--gold-dark-rgb))",
    status: "in_dev",
    link: "/#projects",
    tags: [],
    featured: false,
  },
]

const STUDIO_PORTFOLIO = [
  {
    name: "SHUBIQ",
    tag: "Personal Brand Ecosystem",
    desc: "A structured digital ecosystem integrating brand presence, engineered systems, and scalable product layers under a unified architecture.",
    impact: "Unified multiple digital systems into one cohesive brand infrastructure.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    link: "https://buildwithshubh.vercel.app",
    status: "live",
    metric: "97 Perf Score",
  },
  {
    name: "SHUBHLEDGER",
    tag: "Financial Intelligence System",
    desc: "Architected for real-time portfolio intelligence with low-latency market data flows and a unified decision-support dashboard.",
    impact: "Continuous live market intelligence across digital assets.",
    tech: ["JavaScript", "CSS", "GSAP", "APIs"],
    link: "https://shubhledger.infinityfreeapp.com/",
    status: "live",
    metric: "Real-time Data",
  },
  {
    name: "TEJAMOS",
    tag: "Personal Operating System",
    desc: "An integrated execution architecture unifying tasks, habits, focus systems, and planning into a single performance layer.",
    impact: "Unified fragmented workflows into one execution layer.",
    tech: ["React", "TypeScript", "Supabase", "AI"],
    link: "https://github.com/NeuralShubh/TejamOS",
    status: "wip",
    metric: "Coming Soon",
  },
]

const STUDIO_SERVICES = [
  {
    icon_key: "code",
    title: "High-Performance Web Platforms",
    tag: "Core",
    desc: "Engineered for speed and scale, high-performance platforms built to convert, scale, and dominate competitive markets.",
    features: ["Modern frontend architecture", "Secure backend infrastructure", "Performance-first engineering"],
  },
  {
    icon_key: "layout",
    title: "Custom Software Architecture",
    tag: "Agency",
    desc: "Designed to solve complex operational challenges with scalable, data-driven architecture aligned to business execution.",
    features: ["Scalable system design", "Data-driven infrastructure", "Secure access control"],
  },
  {
    icon_key: "bot",
    title: "Applied AI Systems",
    tag: "Intelligence",
    desc: "Integrated AI systems and intelligent automation unlock measurable efficiency and strategic advantage.",
    features: ["AI workflow integration", "Smart data pipelines", "Intelligent automation systems"],
  },
  {
    icon_key: "phone",
    title: "Scalable Application Systems",
    tag: "Product",
    desc: "Production-grade application systems engineered for long-term scalability and performance resilience.",
    features: ["Web & mobile platforms", "Optimized performance", "Deployment & lifecycle support"],
  },
  {
    icon_key: "globe",
    title: "Digital Brand Infrastructure",
    tag: "Growth",
    desc: "Structured digital ecosystems convert attention into authority, trust, and sustainable growth.",
    features: ["Conversion-focused landing systems", "Portfolio & brand platforms", "Analytics & optimization"],
  },
  {
    icon_key: "layers",
    title: "Design & Component Architecture",
    tag: "Foundation",
    desc: "Structured design systems and component architecture ensuring speed, consistency, and scalable product growth.",
    features: ["Component libraries", "Design token systems", "Documentation & governance"],
  },
]

const STUDIO_PRICING = [
  {
    tier: "BASIC",
    tag: "BASIC",
    best_for: "Best for first-phase businesses",
    price: 19999,
    price_suffix: "",
    meta: "One-time • Ready in 5-7 days",
    features: [
      "3 custom-designed pages",
      "Mobile-responsive layout",
      "Contact form",
      "Google Maps integration",
      "1 month free support",
    ],
    cta: "Get Started",
    highlighted: false,
    icon: "zap",
  },
  {
    tier: "STANDARD",
    tag: "STANDARD",
    best_for: "Best for growing local businesses",
    price: 39999,
    price_suffix: "",
    meta: "One-time • Ready in 10-14 days",
    features: [
      "5 custom-designed pages",
      "Speed optimization",
      "Google Search Console setup",
      "WhatsApp chat button",
      "3 months free support",
    ],
    cta: "Get Started",
    highlighted: true,
    icon: "trending",
  },
  {
    tier: "PREMIUM",
    tag: "PREMIUM",
    best_for: "Best for scale-focused businesses",
    price: 59999,
    price_suffix: "+",
    meta: "One-time • Ready in 14-21 days",
    features: [
      "Fully custom design",
      "Google Analytics setup",
      "Performance optimization",
      "3D Animation",
      "6 months free support",
    ],
    cta: "Get Started",
    highlighted: false,
    icon: "shield",
  },
]

async function syncByKey(client, cfg) {
  const existing = await client.query(`select id, ${cfg.key} from ${cfg.table}`)
  const byKey = new Map(
    existing.rows.map((row) => [String(row[cfg.key]).trim().toLowerCase(), row.id]),
  )
  const desiredKeys = new Set(cfg.rows.map((row) => String(row[cfg.key]).trim().toLowerCase()))

  for (let i = 0; i < cfg.rows.length; i += 1) {
    const row = cfg.rows[i]
    const keyVal = String(row[cfg.key]).trim().toLowerCase()
    const id = byKey.get(keyVal)
    const withOrder = { ...row, order_index: i }

    if (id) {
      const setCols = cfg.columns.map((c, idx) => `${c.col} = $${idx + 1}`).join(", ")
      const values = cfg.columns.map((c) => withOrder[c.field])
      await client.query(
        `update ${cfg.table} set ${setCols} where id = $${cfg.columns.length + 1}`,
        [...values, id],
      )
    } else {
      const cols = cfg.columns.map((c) => c.col).join(", ")
      const placeholders = cfg.columns.map((_, idx) => `$${idx + 1}`).join(", ")
      const values = cfg.columns.map((c) => withOrder[c.field])
      await client.query(
        `insert into ${cfg.table} (${cols}) values (${placeholders})`,
        values,
      )
    }
  }

  if (cfg.prune) {
    for (const row of existing.rows) {
      const keyVal = String(row[cfg.key]).trim().toLowerCase()
      if (!desiredKeys.has(keyVal)) {
        await client.query(`delete from ${cfg.table} where id = $1`, [row.id])
      }
    }
  }
}

async function main() {
  const client = new Client({
    connectionString: readDatabaseUrl(),
    ssl: { rejectUnauthorized: false },
  })
  await client.connect()

  try {
    await client.query("begin")

    await syncByKey(client, {
      table: "public.projects",
      key: "name",
      prune: true,
      rows: MAIN_PROJECTS,
      columns: [
        { col: "name", field: "name" },
        { col: "tag", field: "tag" },
        { col: "\"desc\"", field: "desc" },
        { col: "tech", field: "tech" },
        { col: "stars", field: "stars" },
        { col: "link", field: "link" },
        { col: "live", field: "live" },
        { col: "featured", field: "featured" },
        { col: "status", field: "status" },
        { col: "order_index", field: "order_index" },
      ],
    })

    await syncByKey(client, {
      table: "public.services",
      key: "title",
      prune: true,
      rows: MAIN_SERVICES,
      columns: [
        { col: "icon", field: "icon" },
        { col: "title", field: "title" },
        { col: "\"desc\"", field: "desc" },
        { col: "tag", field: "tag" },
        { col: "order_index", field: "order_index" },
      ],
    })

    await syncByKey(client, {
      table: "public.ecosystem",
      key: "title",
      prune: true,
      rows: MAIN_ECOSYSTEM,
      columns: [
        { col: "type", field: "type" },
        { col: "title", field: "title" },
        { col: "subtitle", field: "subtitle" },
        { col: "\"desc\"", field: "desc" },
        { col: "icon", field: "icon" },
        { col: "color", field: "color" },
        { col: "status", field: "status" },
        { col: "link", field: "link" },
        { col: "tags", field: "tags" },
        { col: "featured", field: "featured" },
        { col: "order_index", field: "order_index" },
      ],
    })

    await syncByKey(client, {
      table: "public.studio_portfolio",
      key: "name",
      prune: true,
      rows: STUDIO_PORTFOLIO,
      columns: [
        { col: "name", field: "name" },
        { col: "tag", field: "tag" },
        { col: "\"desc\"", field: "desc" },
        { col: "impact", field: "impact" },
        { col: "tech", field: "tech" },
        { col: "link", field: "link" },
        { col: "status", field: "status" },
        { col: "metric", field: "metric" },
        { col: "order_index", field: "order_index" },
      ],
    })

    await syncByKey(client, {
      table: "public.studio_services",
      key: "title",
      prune: true,
      rows: STUDIO_SERVICES,
      columns: [
        { col: "icon_key", field: "icon_key" },
        { col: "title", field: "title" },
        { col: "tag", field: "tag" },
        { col: "\"desc\"", field: "desc" },
        { col: "features", field: "features" },
        { col: "order_index", field: "order_index" },
      ],
    })

    await syncByKey(client, {
      table: "public.studio_pricing_plans",
      key: "tier",
      prune: true,
      rows: STUDIO_PRICING,
      columns: [
        { col: "tier", field: "tier" },
        { col: "tag", field: "tag" },
        { col: "best_for", field: "best_for" },
        { col: "price", field: "price" },
        { col: "price_suffix", field: "price_suffix" },
        { col: "meta", field: "meta" },
        { col: "features", field: "features" },
        { col: "cta", field: "cta" },
        { col: "highlighted", field: "highlighted" },
        { col: "icon", field: "icon" },
        { col: "order_index", field: "order_index" },
      ],
    })

    await client.query("commit")

    const counts = await client.query(`
      select
        (select count(*) from public.projects) as projects,
        (select count(*) from public.services) as services,
        (select count(*) from public.ecosystem) as ecosystem,
        (select count(*) from public.studio_portfolio) as studio_portfolio,
        (select count(*) from public.studio_services) as studio_services,
        (select count(*) from public.studio_pricing_plans) as studio_pricing_plans
    `)
    console.log("SYNC_OK", counts.rows[0])
  } catch (error) {
    await client.query("rollback")
    throw error
  } finally {
    await client.end()
  }
}

main().catch((error) => {
  console.error("SYNC_FAILED", error.message)
  process.exit(1)
})
