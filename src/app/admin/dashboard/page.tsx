"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"
import { SERVICES as DEFAULT_MAIN_SERVICES } from "../../data"
import { DEFAULT_STUDIO_CONTENT, STUDIO_CONTENT_STORAGE_KEY, type StudioContent } from "../../shubiq-studio/studioContent"

// Types
type Project = {
  id: string
  name: string
  tag: string
  desc: string
  tech: string[]
  stars: number
  link: string | null
  live: string | null
  featured: boolean
  status: "live" | "wip" | "archived" | "concept"
  order_index: number
  image_url?: string | null
}

type EcoItem = {
  id: string
  type: "project" | "app" | "tool" | "service" | "blog" | "case_study"
  title: string
  subtitle: string
  desc: string
  icon: string
  color: string
  status: "live" | "coming_soon" | "in_dev" | "concept"
  link: string | null
  tags: string[]
  featured: boolean
  order_index: number
  image_url?: string | null
}

type StudioPortfolioItem = {
  id: string
  name: string
  tag: string
  desc: string
  impact: string
  tech: string[]
  link: string | null
  status: "live" | "wip" | "concept"
  metric: string
  order_index: number
}

type ContactSubmission = {
  id: string
  name: string
  email: string
  phone?: string | null
  message: string
  source: string
  created_at: string | null
  read: boolean
}

type MainServiceItem = {
  id: string
  icon: string
  title: string
  desc: string
  tag: string
}

type StudioServiceItem = {
  id: string
  iconKey: "code" | "layout" | "bot" | "phone" | "globe" | "layers"
  title: string
  tag: string
  desc: string
  features: string[]
}

// --- Helpers ---
const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

const STORAGE_KEY_PROJECTS = "shubiq_projects"
const STORAGE_KEY_ECO = "shubiq_ecosystem"
const STORAGE_KEY_STUDIO_PORTFOLIO = "shubiq_studio_portfolio"
const STORAGE_KEY_SERVICES = "shubiq_services"
const STORAGE_KEY_STUDIO_SERVICES = "shubiq_studio_services"
const SUPABASE_ENABLED =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project.supabase.co")
const DEFAULT_PROJECTS: Project[] = [
  { id: "1", name: "SHUBIQ Studio", tag: "Agency | Live", desc: "A modern freelance business platform.", tech: ["Next.js", "Supabase"], stars: 16, link: "https://github.com/NeuralShubh/BuildWithShubh", live: "https://buildwithshubh.vercel.app", featured: true, status: "live", order_index: 0 },
  { id: "2", name: "Portfolio", tag: "Personal | Live", desc: "Personal portfolio showcasing projects.", tech: ["HTML", "CSS", "JS"], stars: 11, link: "https://github.com/NeuralShubh/Portfolio", live: "https://shubham95792.github.io/Portfolio/", featured: false, status: "live", order_index: 1 },
]
const DEFAULT_ECO: EcoItem[] = [
  { id: "1", type: "app", title: "SHUBIQ Studio", subtitle: "Full-service digital agency", desc: "End-to-end web & software solutions.", icon: "⬡", color: "rgb(var(--gold-rgb))", status: "coming_soon", link: null, tags: ["Agency", "AI"], featured: true, order_index: 0 },
  { id: "2", type: "tool", title: "AI Webapp Platform", subtitle: "Intelligence as a service", desc: "A no-code platform for AI capabilities.", icon: "⬟", color: "rgb(var(--gold-dark-rgb))", status: "concept", link: null, tags: ["AI", "No-code"], featured: false, order_index: 1 },
]
const DEFAULT_STUDIO_PORTFOLIO: StudioPortfolioItem[] = [
  {
    id: "s1",
    name: "SHUBIQ",
    tag: "Personal Brand Ecosystem",
    desc: "A structured digital ecosystem integrating brand presence, engineered systems, and scalable product layers under a unified architecture.",
    impact: "Unified multiple digital systems into one cohesive brand infrastructure.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
    link: "https://buildwithshubh.vercel.app",
    status: "live",
    metric: "97 Perf Score",
    order_index: 0,
  },
  {
    id: "s2",
    name: "SHUBHLEDGER",
    tag: "Financial Intelligence System",
    desc: "Architected for real-time portfolio intelligence with low-latency market data flows and a unified decision-support dashboard.",
    impact: "Continuous live market intelligence across digital assets.",
    tech: ["JavaScript", "CSS", "GSAP", "APIs"],
    link: "https://shubhledger.infinityfreeapp.com/",
    status: "live",
    metric: "Real-time Data",
    order_index: 1,
  },
]
const DEFAULT_SERVICES: MainServiceItem[] = DEFAULT_MAIN_SERVICES.map((item, index) => ({
  id: `svc-${index + 1}`,
  icon: item.icon,
  title: item.title,
  desc: item.desc,
  tag: item.tag,
}))
const DEFAULT_STUDIO_SERVICES: StudioServiceItem[] = [
  {
    id: "ss-1",
    iconKey: "code",
    title: "High-Performance Web Platforms",
    tag: "Core",
    desc: "Engineered for speed and scale, high-performance platforms built to convert, scale, and dominate competitive markets.",
    features: ["Modern frontend architecture", "Secure backend infrastructure", "Performance-first engineering"],
  },
  {
    id: "ss-2",
    iconKey: "layout",
    title: "Custom Software Architecture",
    tag: "Agency",
    desc: "Designed to solve complex operational challenges with scalable, data-driven architecture aligned to business execution.",
    features: ["Scalable system design", "Data-driven infrastructure", "Secure access control"],
  },
  {
    id: "ss-3",
    iconKey: "bot",
    title: "Applied AI Systems",
    tag: "Intelligence",
    desc: "Integrated AI systems and intelligent automation unlock measurable efficiency and strategic advantage.",
    features: ["AI workflow integration", "Smart data pipelines", "Intelligent automation systems"],
  },
  {
    id: "ss-4",
    iconKey: "phone",
    title: "Scalable Application Systems",
    tag: "Product",
    desc: "Production-grade application systems engineered for long-term scalability and performance resilience.",
    features: ["Web & mobile platforms", "Optimized performance", "Deployment & lifecycle support"],
  },
  {
    id: "ss-5",
    iconKey: "globe",
    title: "Digital Brand Infrastructure",
    tag: "Growth",
    desc: "Structured digital ecosystems convert attention into authority, trust, and sustainable growth.",
    features: ["Conversion-focused landing systems", "Portfolio & brand platforms", "Analytics & optimization"],
  },
  {
    id: "ss-6",
    iconKey: "layers",
    title: "Design & Component Architecture",
    tag: "Foundation",
    desc: "Structured design systems and component architecture ensuring speed, consistency, and scalable product growth.",
    features: ["Component libraries", "Design token systems", "Documentation & governance"],
  },
]

function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROJECTS)
    if (raw) return JSON.parse(raw)
  } catch {}
  return DEFAULT_PROJECTS
}

function loadEco(): EcoItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ECO)
    if (raw) return JSON.parse(raw)
  } catch {}
  return DEFAULT_ECO
}

function saveProjects(projects: Project[]) {
  localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(projects))
}
function saveEco(items: EcoItem[]) {
  localStorage.setItem(STORAGE_KEY_ECO, JSON.stringify(items))
}
function loadStudioPortfolio(): StudioPortfolioItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDIO_PORTFOLIO)
    if (raw) return JSON.parse(raw)
  } catch {}
  return DEFAULT_STUDIO_PORTFOLIO
}
function saveStudioPortfolio(items: StudioPortfolioItem[]) {
  localStorage.setItem(STORAGE_KEY_STUDIO_PORTFOLIO, JSON.stringify(items))
}
function loadServices(): MainServiceItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SERVICES)
    if (raw) return JSON.parse(raw)
  } catch {}
  return DEFAULT_SERVICES
}
function saveServices(items: MainServiceItem[]) {
  localStorage.setItem(STORAGE_KEY_SERVICES, JSON.stringify(items))
}
function loadStudioServices(): StudioServiceItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDIO_SERVICES)
    if (raw) return JSON.parse(raw)
  } catch {}
  return DEFAULT_STUDIO_SERVICES
}
function saveStudioServices(items: StudioServiceItem[]) {
  localStorage.setItem(STORAGE_KEY_STUDIO_SERVICES, JSON.stringify(items))
}
function loadStudioContent(): StudioContent {
  try {
    const raw = localStorage.getItem(STUDIO_CONTENT_STORAGE_KEY)
    if (!raw) return DEFAULT_STUDIO_CONTENT
    const parsed = JSON.parse(raw) as Partial<StudioContent>
    if (!parsed || !Array.isArray(parsed.plans)) return DEFAULT_STUDIO_CONTENT
    return {
      ...DEFAULT_STUDIO_CONTENT,
      ...parsed,
      plans: parsed.plans.map((plan, index) => ({
        ...DEFAULT_STUDIO_CONTENT.plans[index],
        ...plan,
      })),
    }
  } catch {}
  return DEFAULT_STUDIO_CONTENT
}
function saveStudioContent(content: StudioContent) {
  localStorage.setItem(STUDIO_CONTENT_STORAGE_KEY, JSON.stringify(content))
}

const mapProjectRow = (row: any): Project => ({
  id: String(row.id),
  name: row.name ?? "",
  tag: row.tag ?? "",
  desc: row.desc ?? "",
  tech: Array.isArray(row.tech) ? row.tech : [],
  stars: Number(row.stars ?? 0),
  link: row.link ?? null,
  live: row.live ?? null,
  featured: !!row.featured,
  status: (row.status ?? "live") as Project["status"],
  order_index: Number(row.order_index ?? 0),
  image_url: row.image_url ?? null,
})

const mapEcoRow = (row: any): EcoItem => ({
  id: String(row.id),
  type: (row.type ?? "app") as EcoItem["type"],
  title: row.title ?? "",
  subtitle: row.subtitle ?? "",
  desc: row.desc ?? "",
  icon: row.icon ?? "◈",
  color: row.color ?? "rgb(var(--gold-rgb))",
  status: (row.status ?? "concept") as EcoItem["status"],
  link: row.link ?? null,
  tags: Array.isArray(row.tags) ? row.tags : [],
  featured: !!row.featured,
  order_index: Number(row.order_index ?? 0),
  image_url: row.image_url ?? null,
})

const mapServiceRow = (row: any): MainServiceItem => ({
  id: String(row.id),
  icon: row.icon ?? "?",
  title: row.title ?? "",
  desc: row.desc ?? "",
  tag: row.tag ?? "",
})

const mapStudioPortfolioRow = (row: any): StudioPortfolioItem => ({
  id: String(row.id),
  name: row.name ?? "",
  tag: row.tag ?? "",
  desc: row.desc ?? "",
  impact: row.impact ?? "",
  tech: Array.isArray(row.tech) ? row.tech : [],
  link: row.link ?? null,
  status: (row.status ?? "live") as StudioPortfolioItem["status"],
  metric: row.metric ?? "",
  order_index: Number(row.order_index ?? 0),
})

const mapStudioServiceRow = (row: any): StudioServiceItem => ({
  id: String(row.id),
  iconKey: (row.icon_key ?? "code") as StudioServiceItem["iconKey"],
  title: row.title ?? "",
  tag: row.tag ?? "",
  desc: row.desc ?? "",
  features: Array.isArray(row.features) ? row.features : [],
})

const mapStudioPricingRow = (row: any): StudioContent["plans"][number] => ({
  id: String(row.id),
  tier: row.tier ?? "",
  tag: row.tag ?? "",
  bestFor: row.best_for ?? "",
  price: Number(row.price ?? 0),
  priceSuffix: row.price_suffix ?? "",
  meta: row.meta ?? "",
  features: Array.isArray(row.features) ? row.features : [],
  cta: row.cta ?? "Get Started",
  highlighted: !!row.highlighted,
  icon: (row.icon ?? "trending") as "zap" | "trending" | "shield",
})

// --- Components ---
const inputClass = "w-full rounded-sm bg-[rgb(var(--surface-1-rgb)/0.76)] border border-[rgb(var(--cream-rgb)/0.16)] text-cream/95 font-cormorant text-[17px] px-4 py-3.5 focus:outline-none focus:border-gold/56 focus:bg-[rgb(var(--surface-2-rgb)/0.92)] focus:shadow-[0_0_0_1px_rgb(var(--gold-rgb)_/_0.18),0_0_24px_rgb(var(--gold-rgb)_/_0.16),inset_0_1px_8px_rgb(var(--gold-rgb)_/_0.06)] transition-all duration-[360ms] ease-out placeholder:text-cream/45"
const labelClass = "font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 block mb-2"
const primaryButtonClass = "flex-1 rounded-sm font-rajdhani text-[13px] tracking-[3.2px] uppercase bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_58%,rgb(var(--gold-dark-rgb)))] text-ink py-3.5 font-semibold transition-all duration-300 hover:tracking-[3.6px] hover:shadow-[0_10px_30px_rgb(var(--gold-rgb)_/_0.28),inset_0_0_16px_rgb(var(--cream-rgb)_/_0.14)] hover:bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_42%,rgb(var(--gold-light-rgb)))]"
const secondaryButtonClass = "rounded-sm font-rajdhani text-[12px] tracking-[3px] uppercase bg-[rgb(var(--surface-2-rgb)/0.78)] text-cream/88 px-6 py-3.5 transition-all duration-300 hover:text-gold/95 hover:bg-[rgb(var(--surface-3-rgb)/0.92)] shadow-[inset_0_0_0_1px_rgb(var(--cream-rgb)/0.04)]"

function Badge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    live: "rgb(var(--gold-light-rgb))",
    coming_soon: "rgb(var(--gold-rgb))",
    in_dev: "rgb(var(--gold-rgb))",
    concept: "rgb(var(--muted-rgb))",
    wip: "rgb(var(--gold-rgb))",
    archived: "rgb(var(--muted-rgb) / 0.8)",
  }
  return (
    <span className="font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-0.5 border"
      style={{ color: colors[status] || "rgb(var(--muted-rgb))", borderColor: "rgb(var(--gold-rgb) / 0.24)" }}>
      {status.replace("_", " ")}
    </span>
  )
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: "rgb(var(--ink-rgb) / 0.85)", backdropFilter: "blur(8px)" }}>
      <div className="w-full max-w-2xl max-h-[calc(100vh-2rem)] border border-gold/20 bg-[#0a0a0a] flex flex-col shadow-[0_20px_60px_rgb(0_0_0_/_0.4)]">
        <div className="flex items-center justify-between p-6 border-b border-gold/12 bg-[#0a0a0a] z-10 flex-shrink-0">
          <h3 className="font-cinzel text-lg text-cream font-bold">{title}</h3>
          <button onClick={onClose} className="text-[#444] hover:text-gold transition-colors duration-200 text-xl font-light">✕</button>
        </div>
        <div className="p-6 overflow-y-auto min-h-0">{children}</div>
      </div>
    </div>
  )
}

// --- Project Form ---
function ProjectForm({ initial, onSave, onClose }: { initial?: Project; onSave: (p: Project) => void; onClose: () => void }) {
  const blank: Project = { id: generateId(), name: "", tag: "", desc: "", tech: [], stars: 0, link: null, live: null, featured: false, status: "live", order_index: 0 }
  const [form, setForm] = useState<Project>(initial || blank)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...form,
      tech: initial?.tech ?? [],
      stars: initial?.stars ?? 0,
      status: initial?.status ?? "live",
      order_index: initial?.order_index ?? 0,
      image_url: initial?.image_url ?? null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputClass} required placeholder="Project name" />
        </div>
        <div>
          <label className={labelClass}>Tag</label>
          <input value={form.tag} onChange={e => setForm({ ...form, tag: e.target.value })} className={inputClass} placeholder="Agency · Live" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description *</label>
        <textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} className={`${inputClass} resize-none`} rows={3} required placeholder="Project description" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>GitHub URL</label>
          <input value={form.link || ""} onChange={e => setForm({ ...form, link: e.target.value || null })} className={inputClass} placeholder="https://github.com/..." />
        </div>
        <div>
          <label className={labelClass}>Live URL</label>
          <input value={form.live || ""} onChange={e => setForm({ ...form, live: e.target.value || null })} className={inputClass} placeholder="https://..." />
        </div>
      </div>

      <label className="flex items-center gap-3 cursor-pointer">
        <div className={`w-5 h-5 border flex items-center justify-center transition-all duration-200 ${form.featured ? "border-gold bg-gold/20" : "border-gold/20"}`}
          onClick={() => setForm({ ...form, featured: !form.featured })}>
          {form.featured && <span className="text-gold text-xs">✓</span>}
        </div>
        <span className="font-rajdhani text-[10px] tracking-[3px] uppercase text-[#555]">Featured Project</span>
      </label>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button type="submit" className={primaryButtonClass}>
          {initial ? "Save Changes" : "Create Project"}
        </button>
        <button type="button" onClick={onClose} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  )
}

// --- Ecosystem Form ---
function EcoForm({ initial, onSave, onClose }: { initial?: EcoItem; onSave: (e: EcoItem) => void; onClose: () => void }) {
  const blank: EcoItem = { id: generateId(), type: "app", title: "", subtitle: "", desc: "", icon: "*", color: "#C9A84C", status: "concept", link: null, tags: [], featured: false, order_index: 0 }
  const [form, setForm] = useState<EcoItem>(initial || blank)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...form,
      tags: initial?.tags ?? form.tags ?? [],
      icon: initial?.icon ?? form.icon ?? "*",
      color: initial?.color ?? "rgb(var(--gold-rgb))",
      featured: initial?.featured ?? false,
      order_index: initial?.order_index ?? 0,
      image_url: initial?.image_url ?? null,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Title *</label>
          <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} required placeholder="Item title" />
        </div>
        <div>
          <label className={labelClass}>Subtitle</label>
          <input value={form.subtitle} onChange={e => setForm({ ...form, subtitle: e.target.value })} className={inputClass} placeholder="Short tagline" />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description *</label>
        <textarea value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} className={`${inputClass} resize-none`} rows={3} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Type</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })} className={`${inputClass} cursor-pointer`}>
            {["agency", "app", "project", "tool", "service", "blog", "case_study"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} className={`${inputClass} cursor-pointer`}>
            {["live", "coming_soon", "in_dev", "concept"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Button URL</label>
        <input value={form.link || ""} onChange={e => setForm({ ...form, link: e.target.value || null })} className={inputClass} placeholder="https://..." />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button type="submit" className={primaryButtonClass}>
          {initial ? "Save Changes" : "Create Item"}
        </button>
        <button type="button" onClick={onClose} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  )
}

function StudioPortfolioForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: StudioPortfolioItem
  onSave: (item: StudioPortfolioItem) => void
  onClose: () => void
}) {
  const blank: StudioPortfolioItem = {
    id: generateId(),
    name: "",
    tag: "",
    desc: "",
    impact: "",
    tech: [],
    link: null,
    status: "live",
    metric: "",
    order_index: 0,
  }
  const [form, setForm] = useState<StudioPortfolioItem>(initial || blank)
  const [techInput, setTechInput] = useState((initial?.tech || []).join(", "))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...form,
      tech: techInput.split(",").map((t) => t.trim()).filter(Boolean),
      order_index: initial?.order_index ?? 0,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Name *</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Tag *</label>
          <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} required />
        </div>
      </div>

      <div>
        <label className={labelClass}>Description *</label>
        <textarea rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className={`${inputClass} resize-none`} required />
      </div>

      <div>
        <label className={labelClass}>Impact *</label>
        <textarea rows={2} value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} className={`${inputClass} resize-none`} required />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as StudioPortfolioItem["status"] })} className={`${inputClass} cursor-pointer`}>
            {["live", "wip", "concept"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>

      <div>
        <div>
          <label className={labelClass}>Tech (comma separated)</label>
          <input value={techInput} onChange={(e) => setTechInput(e.target.value)} className={inputClass} />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button type="submit" className={primaryButtonClass}>
          {initial ? "Save Changes" : "Create Card"}
        </button>
        <button type="button" onClick={onClose} className={secondaryButtonClass}>
          Cancel
        </button>
      </div>
    </form>
  )
}

function MainServiceForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: MainServiceItem
  onSave: (item: MainServiceItem) => void
  onClose: () => void
}) {
  const MAIN_SERVICE_ICON_OPTIONS = [
    { value: "code", label: "Code", preview: "</>" },
    { value: "layout", label: "Dashboard", preview: "▦" },
    { value: "bot", label: "AI", preview: "◎" },
    { value: "phone", label: "App", preview: "◫" },
    { value: "globe", label: "Global", preview: "◍" },
    { value: "layers", label: "Design System", preview: "◩" },
    { value: "tools", label: "Tools", preview: "⌁" },
    { value: "cpu", label: "Architecture", preview: "◈" },
  ] as const

  const blank: MainServiceItem = {
    id: generateId(),
    icon: "code",
    title: "",
    desc: "",
    tag: "",
  }
  const [form, setForm] = useState<MainServiceItem>(initial || blank)
  const iconOptions = MAIN_SERVICE_ICON_OPTIONS.some((option) => option.value === form.icon)
    ? MAIN_SERVICE_ICON_OPTIONS
    : [...MAIN_SERVICE_ICON_OPTIONS, { value: form.icon, label: "Custom", preview: "?" } as const]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Title *</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Tag</label>
          <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Description *</label>
        <textarea rows={4} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className={`${inputClass} resize-none`} required />
      </div>
      <div>
        <label className={labelClass}>Icon</label>
        <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={`${inputClass} cursor-pointer`}>
          {iconOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.preview}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className={labelClass}>Quick Icon Pick</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {MAIN_SERVICE_ICON_OPTIONS.map((option) => (
            <button
              type="button"
              key={option.value}
              onClick={() => setForm({ ...form, icon: option.value })}
              className={`flex items-center gap-2 rounded-sm px-3 py-2.5 text-left transition-colors duration-200 ${
                form.icon === option.value
                  ? "bg-gold/[0.18] text-gold shadow-[0_0_16px_rgb(var(--gold-rgb)/0.18)]"
                  : "bg-[rgb(var(--surface-1-rgb)/0.65)] text-cream/78 hover:bg-[rgb(var(--surface-2-rgb)/0.82)] hover:text-gold/90"
              }`}
            >
              <span className="font-cinzel text-base leading-none">{option.preview}</span>
              <span className="font-rajdhani text-[9px] tracking-[2px] uppercase">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button type="submit" className={primaryButtonClass}>{initial ? "Save Changes" : "Create Service"}</button>
        <button type="button" onClick={onClose} className={secondaryButtonClass}>Cancel</button>
      </div>
    </form>
  )
}

function StudioServiceForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: StudioServiceItem
  onSave: (item: StudioServiceItem) => void
  onClose: () => void
}) {
  const STUDIO_SERVICE_ICON_OPTIONS = [
    { value: "code", preview: "</>" },
    { value: "layout", preview: "▦" },
    { value: "bot", preview: "◎" },
    { value: "phone", preview: "◫" },
    { value: "globe", preview: "◍" },
    { value: "layers", preview: "◩" },
  ] as const

  const blank: StudioServiceItem = {
    id: generateId(),
    iconKey: "code",
    title: "",
    tag: "",
    desc: "",
    features: [],
  }
  const [form, setForm] = useState<StudioServiceItem>(initial || blank)
  const [featureInput, setFeatureInput] = useState((initial?.features || []).join(", "))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...form,
      features: featureInput.split(",").map((f) => f.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Title *</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Tag</label>
          <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div>
        <label className={labelClass}>Description *</label>
        <textarea rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className={`${inputClass} resize-none`} required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Icon</label>
          <select value={form.iconKey} onChange={(e) => setForm({ ...form, iconKey: e.target.value as StudioServiceItem["iconKey"] })} className={`${inputClass} cursor-pointer`}>
            {STUDIO_SERVICE_ICON_OPTIONS.map((icon) => (
              <option key={icon.value} value={icon.value}>{icon.preview}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Features (comma separated)</label>
          <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button type="submit" className={primaryButtonClass}>{initial ? "Save Changes" : "Create Service"}</button>
        <button type="button" onClick={onClose} className={secondaryButtonClass}>Cancel</button>
      </div>
    </form>
  )
}

function StudioPricingPlanForm({
  initial,
  onSave,
  onClose,
}: {
  initial?: StudioContent["plans"][number]
  onSave: (item: StudioContent["plans"][number]) => void
  onClose: () => void
}) {
  const blank: StudioContent["plans"][number] = {
    id: generateId(),
    tier: "",
    tag: "",
    bestFor: "",
    price: 0,
    priceSuffix: "",
    meta: "",
    features: [],
    cta: "Get Started",
    highlighted: false,
    icon: "trending",
  }
  const [form, setForm] = useState(initial || blank)
  const [featureInput, setFeatureInput] = useState((initial?.features || []).join(", "))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...form,
      price: Number(form.price || 0),
      features: featureInput.split(",").map((f) => f.trim()).filter(Boolean),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tier *</label>
          <input value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Tag</label>
          <input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Price *</label>
          <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Suffix</label>
          <input value={form.priceSuffix || ""} onChange={(e) => setForm({ ...form, priceSuffix: e.target.value })} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Icon</label>
          <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value as "zap" | "trending" | "shield" })} className={`${inputClass} cursor-pointer`}>
            {["zap", "trending", "shield"].map((icon) => (
              <option key={icon} value={icon}>{icon}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className={labelClass}>Best for *</label>
        <input value={form.bestFor} onChange={(e) => setForm({ ...form, bestFor: e.target.value })} className={inputClass} required />
      </div>
      <div>
        <label className={labelClass}>Meta</label>
        <input value={form.meta} onChange={(e) => setForm({ ...form, meta: e.target.value })} className={inputClass} />
      </div>
      <div>
        <label className={labelClass}>Features (comma separated)</label>
        <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className={inputClass} />
      </div>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.highlighted}
          onChange={(e) => setForm({ ...form, highlighted: e.target.checked })}
          className="w-4 h-4 accent-[rgb(var(--gold-rgb))]"
        />
        <span className="font-rajdhani text-[10px] tracking-[3px] uppercase text-[#555]">Highlighted</span>
      </label>
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button type="submit" className={primaryButtonClass}>{initial ? "Save Changes" : "Create Pricing Card"}</button>
        <button type="button" onClick={onClose} className={secondaryButtonClass}>Cancel</button>
      </div>
    </form>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [pageScope, setPageScope] = useState<"main" | "studio">("main")
  const [mainSection, setMainSection] = useState<"projects" | "services" | "ecosystem" | "form_data">("projects")
  const [studioSection, setStudioSection] = useState<"portfolio" | "services" | "pricing">("portfolio")
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<MainServiceItem[]>([])
  const [eco, setEco] = useState<EcoItem[]>([])
  const [studioPortfolio, setStudioPortfolio] = useState<StudioPortfolioItem[]>([])
  const [studioServices, setStudioServices] = useState<StudioServiceItem[]>([])
  const [studioContent, setStudioContent] = useState<StudioContent>(DEFAULT_STUDIO_CONTENT)
  const [modal, setModal] = useState<null | "add_project" | "edit_project" | "add_service" | "edit_service" | "add_eco" | "edit_eco" | "add_studio_portfolio" | "edit_studio_portfolio" | "add_studio_service" | "edit_studio_service" | "add_studio_pricing" | "edit_studio_pricing">(null)
  const [editTarget, setEditTarget] = useState<Project | MainServiceItem | EcoItem | StudioPortfolioItem | StudioServiceItem | StudioContent["plans"][number] | null>(null)
  const [deleteTargetType, setDeleteTargetType] = useState<"project" | "service" | "eco" | "studio_portfolio" | "studio_service" | "studio_pricing" | "contact_submission">("project")
  const [toast, setToast] = useState("")
  const [search, setSearch] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [usingSupabase, setUsingSupabase] = useState(false)
  const [dbIssue, setDbIssue] = useState<string | null>(null)
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [contactLoading, setContactLoading] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const refreshFromSupabase = async () => {
    const [
      { data: pData, error: pErr },
      { data: eData, error: eErr },
      { data: sData, error: sErr },
      { data: spData, error: spErr },
      { data: ssData, error: ssErr },
      { data: pricingData, error: pricingErr },
    ] = await Promise.all([
      supabase.from("projects").select("*").order("order_index", { ascending: true }),
      supabase.from("ecosystem").select("*").order("order_index", { ascending: true }),
      supabase.from("services").select("*").order("order_index", { ascending: true }),
      supabase.from("studio_portfolio").select("*").order("order_index", { ascending: true }),
      supabase.from("studio_services").select("*").order("order_index", { ascending: true }),
      supabase.from("studio_pricing_plans").select("*").order("order_index", { ascending: true }),
    ])
    if (pErr) throw pErr
    if (eErr) throw eErr
    if (sErr) throw sErr
    if (spErr) throw spErr
    if (ssErr) throw ssErr
    if (pricingErr) throw pricingErr
    setProjects((pData ?? []).map(mapProjectRow))
    setEco((eData ?? []).map(mapEcoRow))
    setServices((sData ?? []).map(mapServiceRow))
    setStudioPortfolio((spData ?? []).map(mapStudioPortfolioRow))
    setStudioServices((ssData ?? []).map(mapStudioServiceRow))
    setStudioContent((prev) => ({ ...prev, plans: (pricingData ?? []).map(mapStudioPricingRow) }))
  }

  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error && typeof error === "object" && "message" in error && typeof (error as { message?: unknown }).message === "string") {
      return (error as { message: string }).message
    }
    return fallback
  }

  const formatSubmissionDate = (iso: string | null) => {
    if (!iso) return "Unknown"
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return "Unknown"
    return d.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const fetchContactSubmissions = async () => {
    setContactLoading(true)
    try {
      const response = await fetch("/api/admin/contact-submissions", { cache: "no-store" })
      const json = (await response.json()) as { ok?: boolean; submissions?: ContactSubmission[]; error?: string }
      if (!response.ok || !json.ok) throw new Error(json.error || "Failed to load contact submissions")
      setContactSubmissions(Array.isArray(json.submissions) ? json.submissions : [])
    } catch {
      showToast("Unable to load form submissions.")
    } finally {
      setContactLoading(false)
    }
  }

  const toggleReadSubmission = async (id: string, read: boolean) => {
    try {
      const response = await fetch("/api/admin/contact-submissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, read }),
      })
      const json = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !json.ok) throw new Error(json.error || "Failed to update submission")
      setContactSubmissions((prev) => prev.map((item) => (item.id === id ? { ...item, read } : item)))
      showToast(read ? "Marked as read." : "Marked as unread.")
    } catch {
      showToast("Unable to update submission state.")
    }
  }

  const deleteSubmission = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contact-submissions?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      })
      const json = (await response.json()) as { ok?: boolean; error?: string }
      if (!response.ok || !json.ok) throw new Error(json.error || "Failed to delete submission")
      setContactSubmissions((prev) => prev.filter((item) => item.id !== id))
      setDeleteConfirm(null)
      showToast("Submission deleted.")
    } catch {
      showToast("Unable to delete submission.")
    }
  }

  useEffect(() => {
    const init = async () => {
      const ok = sessionStorage.getItem("shubiq_admin")
      if (!ok) { router.push("/admin"); return }
      setAuthed(true)
      setUsingSupabase(false)
      setDbIssue(null)
      setProjects(loadProjects())
      setServices(loadServices())
      setEco(loadEco())
      setStudioPortfolio(loadStudioPortfolio())
      setStudioServices(loadStudioServices())
      setStudioContent(loadStudioContent())
      await fetchContactSubmissions()
    }

    init()
  }, [router])

  const ensureDatabaseReady = () => {
    return true
  }

  const logout = () => {
    sessionStorage.removeItem("shubiq_admin")
    router.push("/admin")
  }

  // Project CRUD
  const saveProject = async (p: Project) => {
    const updated = editTarget
      ? projects.map((x) => (x.id === p.id ? p : x))
      : [...projects, { ...p, order_index: projects.length }]
    setProjects(updated)
    saveProjects(updated)
    setModal(null)
    setEditTarget(null)
    showToast(editTarget ? "Project updated!" : "Project created!")
  }

  const deleteProject = async (id: string) => {
    const updated = projects.filter((p) => p.id !== id)
    setProjects(updated)
    saveProjects(updated)
    setDeleteConfirm(null)
    showToast("Project deleted.")
  }

  const toggleFeaturedProject = async (id: string) => {
    const current = projects.find((p) => p.id === id)
    if (!current) return

    const updated = projects.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    setProjects(updated)
    saveProjects(updated)
  }

  // Main Services CRUD
  const saveServiceItem = async (item: MainServiceItem) => {
    const updated = editTarget
      ? services.map((x) => (x.id === item.id ? item : x))
      : [...services, item]
    setServices(updated)
    saveServices(updated)
    setModal(null)
    setEditTarget(null)
    showToast(editTarget ? "Service updated!" : "Service created!")
  }

  const deleteServiceItem = async (id: string) => {
    const updated = services.filter((item) => item.id !== id)
    setServices(updated)
    saveServices(updated)
    setDeleteConfirm(null)
    showToast("Service deleted.")
  }

  // Eco CRUD
  const saveEcoItem = async (item: EcoItem) => {
    const updated = editTarget
      ? eco.map((x) => (x.id === item.id ? item : x))
      : [...eco, item]
    setEco(updated)
    saveEco(updated)
    setModal(null)
    setEditTarget(null)
    showToast(editTarget ? "Item updated!" : "Item created!")
  }

  const deleteEcoItem = async (id: string) => {
    const updated = eco.filter((e) => e.id !== id)
    setEco(updated)
    saveEco(updated)
    setDeleteConfirm(null)
    showToast("Item deleted.")
  }

  const saveStudioPortfolioItem = async (item: StudioPortfolioItem) => {
    const updated = editTarget
      ? studioPortfolio.map((x) => (x.id === item.id ? item : x))
      : [...studioPortfolio, { ...item, order_index: studioPortfolio.length }]
    setStudioPortfolio(updated)
    saveStudioPortfolio(updated)
    setModal(null)
    setEditTarget(null)
    showToast(editTarget ? "Studio card updated!" : "Studio card created!")
  }

  const deleteStudioPortfolioItem = async (id: string) => {
    const updated = studioPortfolio.filter((item) => item.id !== id)
    setStudioPortfolio(updated)
    saveStudioPortfolio(updated)
    setDeleteConfirm(null)
    showToast("Studio card deleted.")
  }

  const saveStudioServiceItem = async (item: StudioServiceItem) => {
    const updated = editTarget
      ? studioServices.map((x) => (x.id === item.id ? item : x))
      : [...studioServices, item]
    setStudioServices(updated)
    saveStudioServices(updated)
    setModal(null)
    setEditTarget(null)
    showToast(editTarget ? "Studio service updated!" : "Studio service created!")
  }

  const deleteStudioServiceItem = async (id: string) => {
    const updated = studioServices.filter((item) => item.id !== id)
    setStudioServices(updated)
    saveStudioServices(updated)
    setDeleteConfirm(null)
    showToast("Studio service deleted.")
  }

  const saveStudioPricingPlan = async (item: StudioContent["plans"][number]) => {
    const updatedPlans = editTarget
      ? studioContent.plans.map((x) => (x.id === item.id ? item : x))
      : [...studioContent.plans, item]
    const updatedContent = { ...studioContent, plans: updatedPlans }
    setStudioContent(updatedContent)
    saveStudioContent(updatedContent)
    setModal(null)
    setEditTarget(null)
    showToast(editTarget ? "Pricing card updated!" : "Pricing card created!")
  }

  const deleteStudioPricingPlan = async (id: string) => {
    const updatedContent = { ...studioContent, plans: studioContent.plans.filter((plan) => plan.id !== id) }
    setStudioContent(updatedContent)
    saveStudioContent(updatedContent)
    setDeleteConfirm(null)
    showToast("Pricing card deleted.")
  }

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tag.toLowerCase().includes(search.toLowerCase())
  )

  const filteredEco = eco.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.type.toLowerCase().includes(search.toLowerCase())
  )
  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.tag.toLowerCase().includes(search.toLowerCase())
  )

  const filteredStudioPortfolio = studioPortfolio.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.tag.toLowerCase().includes(search.toLowerCase())
  )
  const filteredStudioServices = studioServices.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.tag.toLowerCase().includes(search.toLowerCase())
  )
  const filteredStudioPricing = studioContent.plans.filter((plan) =>
    plan.tier.toLowerCase().includes(search.toLowerCase()) ||
    plan.tag.toLowerCase().includes(search.toLowerCase()) ||
    plan.bestFor.toLowerCase().includes(search.toLowerCase())
  )

  const filteredContactSubmissions = contactSubmissions.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    (item.phone || "").toLowerCase().includes(search.toLowerCase()) ||
    item.message.toLowerCase().includes(search.toLowerCase()) ||
    item.source.toLowerCase().includes(search.toLowerCase())
  )

  const headerTitle =
    pageScope === "main"
      ? (mainSection === "form_data" ? "form data" : "main page")
      : "studio page"

  if (!authed) return null

  return (
    <div className="admin-readable min-h-screen bg-ink text-cream">
      {/* Toast */}
      {toast && (
        <div className="fixed top-3 right-3 md:top-6 md:right-6 z-[9999] border border-gold/40 bg-[#0a0a0a] px-4 md:px-6 py-2.5 md:py-3 font-rajdhani text-[10px] md:text-[11px] tracking-[2.4px] md:tracking-[3px] uppercase text-gold animate-fade-in max-w-[calc(100vw-1.5rem)] md:max-w-none">
          {toast}
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          style={{ background: "rgb(var(--ink-rgb) / 0.85)" }}>
          <div className="border border-red-500/30 bg-[#0a0a0a] p-8 max-w-sm w-full text-center">
            <div className="text-red-400 text-3xl mb-4">⚠</div>
            <h3 className="font-cinzel text-lg text-cream mb-2">Confirm Delete</h3>
            <p className="font-cormorant text-[#555] mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => {
                if (deleteTargetType === "project") deleteProject(deleteConfirm)
                else if (deleteTargetType === "service") deleteServiceItem(deleteConfirm)
                else if (deleteTargetType === "eco") deleteEcoItem(deleteConfirm)
                else if (deleteTargetType === "studio_service") deleteStudioServiceItem(deleteConfirm)
                else if (deleteTargetType === "studio_pricing") deleteStudioPricingPlan(deleteConfirm)
                else if (deleteTargetType === "contact_submission") deleteSubmission(deleteConfirm)
                else deleteStudioPortfolioItem(deleteConfirm)
              }} className="flex-1 font-rajdhani text-[10px] tracking-[3px] uppercase bg-[rgb(127_29_29/0.38)] text-red-300 py-3 hover:bg-[rgb(127_29_29/0.52)] transition-colors duration-200">
                Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 font-rajdhani text-[10px] tracking-[3px] uppercase bg-[rgb(var(--surface-2-rgb)/0.7)] text-cream/78 py-3 hover:bg-[rgb(var(--surface-3-rgb)/0.9)] transition-colors duration-200">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      {modal === "add_project" && (
        <Modal title="Add New Project" onClose={() => setModal(null)}>
          <ProjectForm onSave={saveProject} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === "edit_project" && editTarget && (
        <Modal title="Edit Project" onClose={() => { setModal(null); setEditTarget(null) }}>
          <ProjectForm initial={editTarget as Project} onSave={saveProject} onClose={() => { setModal(null); setEditTarget(null) }} />
        </Modal>
      )}
      {modal === "add_service" && (
        <Modal title="Add Main Service" onClose={() => setModal(null)}>
          <MainServiceForm onSave={saveServiceItem} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === "edit_service" && editTarget && (
        <Modal title="Edit Main Service" onClose={() => { setModal(null); setEditTarget(null) }}>
          <MainServiceForm initial={editTarget as MainServiceItem} onSave={saveServiceItem} onClose={() => { setModal(null); setEditTarget(null) }} />
        </Modal>
      )}
      {modal === "add_eco" && (
        <Modal title="Add Ecosystem Item" onClose={() => setModal(null)}>
          <EcoForm onSave={saveEcoItem} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === "edit_eco" && editTarget && (
        <Modal title="Edit Ecosystem Item" onClose={() => { setModal(null); setEditTarget(null) }}>
          <EcoForm initial={editTarget as EcoItem} onSave={saveEcoItem} onClose={() => { setModal(null); setEditTarget(null) }} />
        </Modal>
      )}
      {modal === "add_studio_portfolio" && (
        <Modal title="Add Studio Portfolio Card" onClose={() => setModal(null)}>
          <StudioPortfolioForm onSave={saveStudioPortfolioItem} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === "edit_studio_portfolio" && editTarget && (
        <Modal title="Edit Studio Portfolio Card" onClose={() => { setModal(null); setEditTarget(null) }}>
          <StudioPortfolioForm initial={editTarget as StudioPortfolioItem} onSave={saveStudioPortfolioItem} onClose={() => { setModal(null); setEditTarget(null) }} />
        </Modal>
      )}
      {modal === "add_studio_service" && (
        <Modal title="Add Studio Service" onClose={() => setModal(null)}>
          <StudioServiceForm onSave={saveStudioServiceItem} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === "edit_studio_service" && editTarget && (
        <Modal title="Edit Studio Service" onClose={() => { setModal(null); setEditTarget(null) }}>
          <StudioServiceForm initial={editTarget as StudioServiceItem} onSave={saveStudioServiceItem} onClose={() => { setModal(null); setEditTarget(null) }} />
        </Modal>
      )}
      {modal === "add_studio_pricing" && (
        <Modal title="Add Studio Pricing Card" onClose={() => setModal(null)}>
          <StudioPricingPlanForm onSave={saveStudioPricingPlan} onClose={() => setModal(null)} />
        </Modal>
      )}
      {modal === "edit_studio_pricing" && editTarget && (
        <Modal title="Edit Studio Pricing Card" onClose={() => { setModal(null); setEditTarget(null) }}>
          <StudioPricingPlanForm initial={editTarget as StudioContent["plans"][number]} onSave={saveStudioPricingPlan} onClose={() => { setModal(null); setEditTarget(null) }} />
        </Modal>
      )}

      {/* Sidebar + Main */}
      <div className="flex min-h-screen flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 border-r border-gold/10 bg-[#070707] flex-col fixed h-full z-10">
          <div className="p-6 border-b border-gold/10">
            <div className="font-cinzel font-black text-xl tracking-[6px] text-gradient-gold mb-1">SHUBIQ</div>
            <div className="font-rajdhani text-[9px] tracking-[4px] uppercase text-gold/30">Admin Panel</div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setPageScope("main")}
              className={`w-full flex items-center justify-between px-4 py-3 transition-all duration-200 ${
                pageScope === "main"
                  ? "bg-[linear-gradient(160deg,rgb(var(--gold-rgb)/0.24),rgb(var(--gold-dark-rgb)/0.16))] shadow-[0_0_24px_rgb(var(--gold-rgb)/0.16)]"
                  : "bg-[rgb(var(--surface-2-rgb)/0.62)] hover:bg-[rgb(var(--surface-3-rgb)/0.82)]"
              }`}
            >
              <span className={`font-rajdhani text-[11px] tracking-[3px] uppercase ${pageScope === "main" ? "text-gold" : "text-[#666]"}`}>
                Main Page
              </span>
            </button>
            <button
              onClick={() => setPageScope("studio")}
              className={`w-full flex items-center justify-between px-4 py-3 transition-all duration-200 ${
                pageScope === "studio"
                  ? "bg-[linear-gradient(160deg,rgb(var(--gold-rgb)/0.24),rgb(var(--gold-dark-rgb)/0.16))] shadow-[0_0_24px_rgb(var(--gold-rgb)/0.16)]"
                  : "bg-[rgb(var(--surface-2-rgb)/0.62)] hover:bg-[rgb(var(--surface-3-rgb)/0.82)]"
              }`}
            >
              <span className={`font-rajdhani text-[11px] tracking-[3px] uppercase ${pageScope === "studio" ? "text-gold" : "text-[#666]"}`}>
                Studio Page
              </span>
            </button>
          </nav>

          <div className="p-4 border-t border-gold/10 space-y-3">
            <a href="/" target="_blank" rel="noreferrer"
              className="w-full flex items-center gap-3 px-4 py-2 bg-[rgb(var(--surface-2-rgb)/0.7)] hover:bg-[rgb(var(--surface-3-rgb)/0.88)] transition-colors duration-200">
              <span className="font-rajdhani text-[10px] tracking-[3px] uppercase text-[#444] hover:text-gold/60">View Site →</span>
            </a>
            <button onClick={logout}
              className="w-full font-rajdhani text-[10px] tracking-[3px] uppercase bg-[rgb(127_29_29/0.36)] text-red-300 hover:bg-[rgb(127_29_29/0.5)] px-4 py-2 transition-colors duration-200">
              Logout
            </button>
          </div>
        </aside>

        {/* Mobile Top Bar */}
        <div className="md:hidden sticky top-0 z-20 bg-[#070707]/95 backdrop-blur border-b border-gold/10 px-4 py-3 space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-cinzel font-black text-lg tracking-[4px] text-gradient-gold">SHUBIQ</div>
              <div className="font-rajdhani text-[8px] tracking-[3px] uppercase text-gold/40">Admin Panel</div>
            </div>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="font-rajdhani text-[9px] tracking-[2.2px] uppercase bg-[rgb(var(--surface-2-rgb)/0.76)] text-cream/80 px-3 py-2"
            >
              View Site
            </a>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPageScope("main")}
              className={`font-rajdhani text-[10px] tracking-[2.6px] uppercase px-3 py-2.5 transition-colors duration-200 ${
                pageScope === "main"
                  ? "text-gold bg-[rgb(var(--gold-rgb)/0.2)] shadow-[0_0_18px_rgb(var(--gold-rgb)/0.12)]"
                  : "text-[#666] bg-[rgb(var(--surface-2-rgb)/0.62)]"
              }`}
            >
              Main Page
            </button>
            <button
              onClick={() => setPageScope("studio")}
              className={`font-rajdhani text-[10px] tracking-[2.6px] uppercase px-3 py-2.5 transition-colors duration-200 ${
                pageScope === "studio"
                  ? "text-gold bg-[rgb(var(--gold-rgb)/0.2)] shadow-[0_0_18px_rgb(var(--gold-rgb)/0.12)]"
                  : "text-[#666] bg-[rgb(var(--surface-2-rgb)/0.62)]"
              }`}
            >
              Studio Page
            </button>
          </div>
          <button
            onClick={logout}
            className="w-full font-rajdhani text-[9px] tracking-[2.2px] uppercase bg-[rgb(127_29_29/0.36)] text-red-300 px-3 py-2.5"
          >
            Logout
          </button>
        </div>

        {/* Main content */}
        <main className="flex-1 min-h-screen md:ml-64">
          {/* Header */}
          <div className="sticky top-[86px] md:top-0 bg-[#070707]/90 backdrop-blur-sm border-b border-gold/10 px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 z-10">
            <div className="min-w-0">
              <h1 className="font-cinzel text-xl text-cream font-bold capitalize">{headerTitle}</h1>
              <div className="font-rajdhani text-[8px] md:text-[9px] tracking-[2.4px] md:tracking-[3px] uppercase text-[#333]">Manage selected section cards</div>
              <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 text-[8px] md:text-[9px] font-rajdhani tracking-[2px] md:tracking-[2.5px] uppercase bg-emerald-900/25 text-emerald-300">
                <span>Cards: Local Storage</span>
                <span className="text-emerald-200/80">Forms: Supabase</span>
              </div>
              <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
                {pageScope === "main" ? (
                  <>
                    <button
                      onClick={() => setMainSection("projects")}
                      className={`font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 transition-colors duration-200 ${
                        mainSection === "projects"
                          ? "text-gold bg-[rgb(var(--gold-rgb)/0.2)] shadow-[0_0_18px_rgb(var(--gold-rgb)/0.12)]"
                          : "text-[#666] bg-[rgb(var(--surface-2-rgb)/0.62)] hover:bg-[rgb(var(--surface-3-rgb)/0.82)]"
                      }`}
                    >
                      Projects
                    </button>
                    <button
                      onClick={() => setMainSection("services")}
                      className={`font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 transition-colors duration-200 ${
                        mainSection === "services"
                          ? "text-gold bg-[rgb(var(--gold-rgb)/0.2)] shadow-[0_0_18px_rgb(var(--gold-rgb)/0.12)]"
                          : "text-[#666] bg-[rgb(var(--surface-2-rgb)/0.62)] hover:bg-[rgb(var(--surface-3-rgb)/0.82)]"
                      }`}
                    >
                      Services
                    </button>
                    <button
                      onClick={() => setMainSection("ecosystem")}
                      className={`font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 transition-colors duration-200 ${
                        mainSection === "ecosystem"
                          ? "text-gold bg-[rgb(var(--gold-rgb)/0.2)] shadow-[0_0_18px_rgb(var(--gold-rgb)/0.12)]"
                          : "text-[#666] bg-[rgb(var(--surface-2-rgb)/0.62)] hover:bg-[rgb(var(--surface-3-rgb)/0.82)]"
                      }`}
                    >
                      Ecosystem
                    </button>
                    <button
                      onClick={() => setMainSection("form_data")}
                      className={`font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 transition-colors duration-200 ${
                        mainSection === "form_data"
                          ? "text-gold bg-[rgb(var(--gold-rgb)/0.2)] shadow-[0_0_18px_rgb(var(--gold-rgb)/0.12)]"
                          : "text-[#666] bg-[rgb(var(--surface-2-rgb)/0.62)] hover:bg-[rgb(var(--surface-3-rgb)/0.82)]"
                      }`}
                    >
                      Form Data
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setStudioSection("portfolio")}
                      className={`font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 transition-colors duration-200 ${
                        studioSection === "portfolio"
                          ? "text-gold bg-[rgb(var(--gold-rgb)/0.2)] shadow-[0_0_18px_rgb(var(--gold-rgb)/0.12)]"
                          : "text-[#666] bg-[rgb(var(--surface-2-rgb)/0.62)] hover:bg-[rgb(var(--surface-3-rgb)/0.82)]"
                      }`}
                    >
                      Portfolio
                    </button>
                    <button
                      onClick={() => setStudioSection("services")}
                      className={`font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 transition-colors duration-200 ${
                        studioSection === "services"
                          ? "text-gold bg-[rgb(var(--gold-rgb)/0.2)] shadow-[0_0_18px_rgb(var(--gold-rgb)/0.12)]"
                          : "text-[#666] bg-[rgb(var(--surface-2-rgb)/0.62)] hover:bg-[rgb(var(--surface-3-rgb)/0.82)]"
                      }`}
                    >
                      Services
                    </button>
                    <button
                      onClick={() => setStudioSection("pricing")}
                      className={`font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 transition-colors duration-200 ${
                        studioSection === "pricing"
                          ? "text-gold bg-[rgb(var(--gold-rgb)/0.2)] shadow-[0_0_18px_rgb(var(--gold-rgb)/0.12)]"
                          : "text-[#666] bg-[rgb(var(--surface-2-rgb)/0.62)] hover:bg-[rgb(var(--surface-3-rgb)/0.82)]"
                      }`}
                    >
                      Pricing
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-[#0a0a0a] border border-gold/25 text-cream font-cormorant px-3 py-2.5 text-base focus:outline-none focus:border-gold/50 transition-colors duration-200 placeholder:text-cream/46 w-full md:w-52"
              />
              {pageScope === "main" && mainSection === "form_data" ? (
                <button
                  onClick={fetchContactSubmissions}
                  className="shrink-0 min-w-[108px] whitespace-nowrap justify-start font-rajdhani text-[10px] tracking-[2.2px] md:tracking-[3px] uppercase bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_58%,rgb(var(--gold-dark-rgb)))] text-ink px-4 md:px-5 py-2.5 font-semibold hover:brightness-110 transition-all duration-200 flex items-center gap-2 shadow-[0_8px_24px_rgb(var(--gold-rgb)/0.22)]"
                >
                  <span>{contactLoading ? "Refreshing..." : "Refresh"}</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                  setEditTarget(null)
                  if (pageScope === "main") {
                    if (mainSection === "projects") setModal("add_project")
                    else if (mainSection === "services") setModal("add_service")
                    else if (mainSection === "ecosystem") setModal("add_eco")
                  } else {
                    if (studioSection === "portfolio") setModal("add_studio_portfolio")
                    else if (studioSection === "services") setModal("add_studio_service")
                    else setModal("add_studio_pricing")
                  }
                }}
                className="shrink-0 min-w-[108px] whitespace-nowrap justify-start font-rajdhani text-[10px] tracking-[2.2px] md:tracking-[3px] uppercase px-4 md:px-5 py-2.5 font-semibold transition-all duration-200 flex items-center gap-2 shadow-[0_8px_24px_rgb(var(--gold-rgb)/0.22)] bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_58%,rgb(var(--gold-dark-rgb)))] text-ink hover:brightness-110"
                >
                  <span>+ Add</span>
                </button>
              )}
            </div>
          </div>

          <div className="p-4 md:p-8">
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
              {(pageScope === "main"
                ? (mainSection === "projects"
                    ? [
                        { label: "Total Projects", val: projects.length },
                        { label: "Featured", val: projects.filter(p => p.featured).length },
                        { label: "Live", val: projects.filter((p: any) => p.status === "live").length },
                        { label: "Other", val: projects.filter((p: any) => p.status !== "live").length },
                      ]
                    : mainSection === "services"
                      ? [
                          { label: "Total Services", val: services.length },
                          { label: "Core", val: services.filter((s) => s.tag.toLowerCase().includes("core")).length },
                          { label: "Filtered", val: filteredServices.length },
                          { label: "Search", val: search ? 1 : 0 },
                        ]
                    : mainSection === "ecosystem"
                      ? [
                          { label: "Total Ecosystem", val: eco.length },
                          { label: "Featured", val: eco.filter((e) => e.featured).length },
                          { label: "Live", val: eco.filter((e) => e.status === "live").length },
                          { label: "Other", val: eco.filter((e) => e.status !== "live").length },
                        ]
                      : [
                          { label: "Total Leads", val: contactSubmissions.length },
                          { label: "Unread", val: contactSubmissions.filter((s) => !s.read).length },
                          { label: "Read", val: contactSubmissions.filter((s) => s.read).length },
                          { label: "Filtered", val: filteredContactSubmissions.length },
                        ])
                : (studioSection === "portfolio"
                    ? [
                        { label: "Studio Cards", val: studioPortfolio.length },
                        { label: "Live", val: studioPortfolio.filter((p) => p.status === "live").length },
                        { label: "WIP", val: studioPortfolio.filter((p) => p.status === "wip").length },
                        { label: "Concept", val: studioPortfolio.filter((p) => p.status === "concept").length },
                      ]
                    : studioSection === "services"
                      ? [
                          { label: "Studio Services", val: studioServices.length },
                          { label: "Filtered", val: filteredStudioServices.length },
                          { label: "With Features", val: studioServices.filter((s) => s.features.length > 0).length },
                          { label: "Search", val: search ? 1 : 0 },
                        ]
                      : [
                          { label: "Pricing Cards", val: studioContent.plans.length },
                          { label: "Highlighted", val: studioContent.plans.filter((p) => p.highlighted).length },
                          { label: "Filtered", val: filteredStudioPricing.length },
                          { label: "Search", val: search ? 1 : 0 },
                        ])).map(stat => (
                <div key={stat.label} className="border border-gold/10 bg-[#0a0a0a] p-5">
                  <div className="font-cinzel text-2xl text-gold font-black">{stat.val}</div>
                  <div className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#333] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Main: Form Data */}
            {pageScope === "main" && mainSection === "form_data" && (
              <div className="space-y-4">
                {contactLoading && (
                  <div className="border border-gold/10 bg-[#0a0a0a] p-6">
                    <p className="font-rajdhani text-[10px] tracking-[3px] uppercase text-gold/70">Loading submissions...</p>
                  </div>
                )}

                {!contactLoading && filteredContactSubmissions.length === 0 && (
                  <div className="border border-gold/10 p-12 text-center">
                    <p className="font-cormorant text-[#333] text-lg">No form submissions found.</p>
                  </div>
                )}

                {!contactLoading && filteredContactSubmissions.length > 0 && (
                  <>
                    <div className="hidden md:block border border-gold/10 bg-[#0a0a0a] overflow-hidden">
                      <div className="grid grid-cols-[1.1fr_1.1fr_1fr_1.9fr_0.8fr_1.1fr_1.2fr] gap-3 px-5 py-3 border-b border-gold/10">
                        <span className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#555]">Name</span>
                        <span className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#555]">Email</span>
                        <span className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#555]">Phone</span>
                        <span className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#555]">Message</span>
                        <span className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#555]">State</span>
                        <span className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#555]">Received</span>
                        <span className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#555]">Actions</span>
                      </div>
                      {filteredContactSubmissions.map((item) => (
                        <div key={item.id} className="grid grid-cols-[1.1fr_1.1fr_1fr_1.9fr_0.8fr_1.1fr_1.2fr] gap-3 px-5 py-4 border-b border-gold/10 last:border-b-0 hover:bg-[rgb(var(--surface-1-rgb)/0.25)] transition-colors duration-200">
                          <div className="min-w-0">
                            <p className="font-cinzel text-sm text-cream truncate">{item.name}</p>
                            <p className="font-rajdhani text-[8px] tracking-[2px] uppercase text-[#444] mt-1">{item.source}</p>
                          </div>
                          <a href={`mailto:${item.email}`} className="font-cormorant text-sm text-cream/80 hover:text-gold transition-colors duration-200 truncate">
                            {item.email}
                          </a>
                          <a href={item.phone ? `tel:${item.phone}` : undefined} className="font-cormorant text-sm text-cream/80 hover:text-gold transition-colors duration-200 truncate pointer-events-auto">
                            {item.phone || "-"}
                          </a>
                          <p className="font-cormorant text-sm text-[#555] line-clamp-2">{item.message}</p>
                          <div>
                            <span className={`font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-1 border ${item.read ? "border-emerald-400/35 text-emerald-300" : "border-amber-400/35 text-amber-300"}`}>
                              {item.read ? "Read" : "Unread"}
                            </span>
                          </div>
                          <p className="font-cormorant text-sm text-[#444]">{formatSubmissionDate(item.created_at)}</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => toggleReadSubmission(item.id, !item.read)}
                              className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(var(--surface-2-rgb)/0.8)] text-cream/82 hover:bg-[rgb(var(--surface-3-rgb)/0.92)] hover:text-gold transition-colors duration-200"
                            >
                              {item.read ? "Unread" : "Read"}
                            </button>
                            <button
                              onClick={() => { setDeleteTargetType("contact_submission"); setDeleteConfirm(item.id) }}
                              className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(127_29_29/0.35)] text-red-300 hover:bg-[rgb(127_29_29/0.5)] transition-colors duration-200"
                            >
                              Del
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="md:hidden space-y-3">
                      {filteredContactSubmissions.map((item) => (
                        <div key={item.id} className="border border-gold/10 bg-[#0a0a0a] p-4">
                          <div className="flex items-center justify-between gap-3 mb-3">
                            <p className="font-cinzel text-base text-cream">{item.name}</p>
                            <span className={`font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-1 border ${item.read ? "border-emerald-400/35 text-emerald-300" : "border-amber-400/35 text-amber-300"}`}>
                              {item.read ? "Read" : "Unread"}
                            </span>
                          </div>
                          <a href={`mailto:${item.email}`} className="block font-cormorant text-sm text-gold/80 mb-2">
                            {item.email}
                          </a>
                          <a href={item.phone ? `tel:${item.phone}` : undefined} className="block font-cormorant text-sm text-gold/80 mb-2">
                            {item.phone || "-"}
                          </a>
                          <p className="font-cormorant text-sm text-[#555] mb-3">{item.message}</p>
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-rajdhani text-[8px] tracking-[2px] uppercase text-[#444]">
                              {formatSubmissionDate(item.created_at)}
                            </p>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleReadSubmission(item.id, !item.read)}
                                className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(var(--surface-2-rgb)/0.8)] text-cream/82 hover:bg-[rgb(var(--surface-3-rgb)/0.92)] hover:text-gold transition-colors duration-200"
                              >
                                {item.read ? "Unread" : "Read"}
                              </button>
                              <button
                                onClick={() => { setDeleteTargetType("contact_submission"); setDeleteConfirm(item.id) }}
                                className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(127_29_29/0.35)] text-red-300 hover:bg-[rgb(127_29_29/0.5)] transition-colors duration-200"
                              >
                                Del
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Main: Projects */}
            {pageScope === "main" && mainSection === "projects" && (
              <div className="space-y-3">
                {filteredProjects.length === 0 && (
                  <div className="border border-gold/10 p-12 text-center">
                    <p className="font-cormorant text-[#333] text-lg">No projects found.</p>
                  </div>
                )}
                {filteredProjects.map((project) => (
                  <div key={project.id} className="border border-gold/10 bg-[#0a0a0a] p-5 hover:border-gold/20 transition-colors duration-200 group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-cinzel text-base text-cream font-bold">{project.name}</span>
                          <Badge status={project.status} />
                          {project.featured && (
                            <span className="font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-0.5 border border-gold/40 text-gold">Featured</span>
                          )}
                        </div>
                        <p className="font-cormorant text-[#444] text-sm mb-3 line-clamp-2">{project.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {project.tech.map(t => (
                            <span key={t} className="font-rajdhani text-[8px] tracking-[1px] uppercase text-[#333] border border-[#1a1a1a] px-2 py-0.5">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {project.link && (
                          <a href={project.link} target="_blank" rel="noreferrer"
                            className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(var(--surface-2-rgb)/0.7)] text-cream/72 hover:bg-[rgb(var(--surface-3-rgb)/0.9)] hover:text-gold/80 transition-colors duration-200">
                            GH
                          </a>
                        )}
                        <button onClick={() => { setEditTarget(project); setModal("edit_project") }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(var(--surface-2-rgb)/0.8)] text-cream/82 hover:bg-[rgb(var(--surface-3-rgb)/0.92)] hover:text-gold transition-colors duration-200">
                          Edit
                        </button>
                        <button onClick={() => { setDeleteTargetType("project"); setDeleteConfirm(project.id) }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(127_29_29/0.35)] text-red-300 hover:bg-[rgb(127_29_29/0.5)] transition-colors duration-200">
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Main: Services */}
            {pageScope === "main" && mainSection === "services" && (
              <div className="space-y-3">
                {filteredServices.length === 0 && (
                  <div className="border border-gold/10 p-12 text-center">
                    <p className="font-cormorant text-[#333] text-lg">No services found.</p>
                  </div>
                )}
                {filteredServices.map((service) => (
                  <div key={service.id} className="border border-gold/10 bg-[#0a0a0a] p-5 hover:border-gold/20 transition-colors duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-cinzel text-base text-cream font-bold">{service.title}</span>
                          <span className="font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-0.5 border border-gold/20 text-gold/50">
                            {service.tag || "service"}
                          </span>
                        </div>
                        <p className="font-cormorant text-[#444] text-sm line-clamp-2">{service.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => { setEditTarget(service); setModal("edit_service") }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(var(--surface-2-rgb)/0.8)] text-cream/82 hover:bg-[rgb(var(--surface-3-rgb)/0.92)] hover:text-gold transition-colors duration-200">
                          Edit
                        </button>
                        <button onClick={() => { setDeleteTargetType("service"); setDeleteConfirm(service.id) }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(127_29_29/0.35)] text-red-300 hover:bg-[rgb(127_29_29/0.5)] transition-colors duration-200">
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Main: Ecosystem */}
            {pageScope === "main" && mainSection === "ecosystem" && (
              <div className="space-y-3">
                {filteredEco.length === 0 && (
                  <div className="border border-gold/10 p-12 text-center">
                    <p className="font-cormorant text-[#333] text-lg">No ecosystem items found.</p>
                  </div>
                )}
                {filteredEco.map((item) => (
                  <div key={item.id} className="border border-gold/10 bg-[#0a0a0a] p-5 hover:border-gold/20 transition-colors duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="text-xl">{item.icon}</span>
                          <span className="font-cinzel text-base text-cream font-bold">{item.title}</span>
                          <span className="font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-0.5 border border-gold/20 text-gold/50">
                            {item.type}
                          </span>
                          <Badge status={item.status} />
                        </div>
                        <p className="font-cormorant text-[#444] text-sm mb-2">{item.subtitle}</p>
                        <p className="font-cormorant text-[#333] text-sm line-clamp-2">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => { setEditTarget(item); setModal("edit_eco") }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(var(--surface-2-rgb)/0.8)] text-cream/82 hover:bg-[rgb(var(--surface-3-rgb)/0.92)] hover:text-gold transition-colors duration-200">
                          Edit
                        </button>
                        <button onClick={() => { setDeleteTargetType("eco"); setDeleteConfirm(item.id) }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(127_29_29/0.35)] text-red-300 hover:bg-[rgb(127_29_29/0.5)] transition-colors duration-200">
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Studio: Portfolio */}
            {pageScope === "studio" && studioSection === "portfolio" && (
              <div className="space-y-3">
                {filteredStudioPortfolio.length === 0 && (
                  <div className="border border-gold/10 p-12 text-center">
                    <p className="font-cormorant text-[#333] text-lg">No studio portfolio cards found.</p>
                  </div>
                )}
                {filteredStudioPortfolio.map((item) => (
                  <div key={item.id} className="border border-gold/10 bg-[#0a0a0a] p-5 hover:border-gold/20 transition-colors duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-cinzel text-base text-cream font-bold">{item.name}</span>
                          <Badge status={item.status} />
                          <span className="font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-0.5 border border-gold/20 text-gold/50">
                            {item.tag}
                          </span>
                        </div>
                        <p className="font-cormorant text-[#444] text-sm mb-2 line-clamp-2">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => { setEditTarget(item); setModal("edit_studio_portfolio") }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(var(--surface-2-rgb)/0.8)] text-cream/82 hover:bg-[rgb(var(--surface-3-rgb)/0.92)] hover:text-gold transition-colors duration-200">
                          Edit
                        </button>
                        <button onClick={() => { setDeleteTargetType("studio_portfolio"); setDeleteConfirm(item.id) }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(127_29_29/0.35)] text-red-300 hover:bg-[rgb(127_29_29/0.5)] transition-colors duration-200">
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Studio: Services */}
            {pageScope === "studio" && studioSection === "services" && (
              <div className="space-y-3">
                {filteredStudioServices.length === 0 && (
                  <div className="border border-gold/10 p-12 text-center">
                    <p className="font-cormorant text-[#333] text-lg">No studio service cards found.</p>
                  </div>
                )}
                {filteredStudioServices.map((item) => (
                  <div key={item.id} className="border border-gold/10 bg-[#0a0a0a] p-5 hover:border-gold/20 transition-colors duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-cinzel text-base text-cream font-bold">{item.title}</span>
                          <span className="font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-0.5 border border-gold/20 text-gold/50">
                            {item.tag}
                          </span>
                        </div>
                        <p className="font-cormorant text-[#444] text-sm mb-2 line-clamp-2">{item.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {item.features.map((f) => (
                            <span key={f} className="font-rajdhani text-[8px] tracking-[1px] uppercase text-[#333] border border-[#1a1a1a] px-2 py-0.5">{f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => { setEditTarget(item); setModal("edit_studio_service") }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(var(--surface-2-rgb)/0.8)] text-cream/82 hover:bg-[rgb(var(--surface-3-rgb)/0.92)] hover:text-gold transition-colors duration-200">
                          Edit
                        </button>
                        <button onClick={() => { setDeleteTargetType("studio_service"); setDeleteConfirm(item.id) }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(127_29_29/0.35)] text-red-300 hover:bg-[rgb(127_29_29/0.5)] transition-colors duration-200">
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Studio: Pricing */}
            {pageScope === "studio" && studioSection === "pricing" && (
              <div className="space-y-3">
                {filteredStudioPricing.length === 0 && (
                  <div className="border border-gold/10 p-12 text-center">
                    <p className="font-cormorant text-[#333] text-lg">No pricing cards found.</p>
                  </div>
                )}
                {filteredStudioPricing.map((plan) => (
                  <div key={plan.id} className="border border-gold/10 bg-[#0a0a0a] p-5 hover:border-gold/20 transition-colors duration-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <span className="font-cinzel text-base text-cream font-bold">{plan.tier}</span>
                          <span className="font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-0.5 border border-gold/20 text-gold/50">
                            {plan.tag}
                          </span>
                          {plan.highlighted && (
                            <span className="font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-0.5 border border-gold/40 text-gold">
                              Highlighted
                            </span>
                          )}
                        </div>
                        <p className="font-cormorant text-[#444] text-sm mb-2">{plan.bestFor}</p>
                        <p className="font-cormorant text-[#333] text-sm mb-2">₹{Number(plan.price || 0).toLocaleString("en-IN")}{plan.priceSuffix || ""} - {plan.meta}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {plan.features.map((f) => (
                            <span key={f} className="font-rajdhani text-[8px] tracking-[1px] uppercase text-[#333] border border-[#1a1a1a] px-2 py-0.5">{f}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => { setEditTarget(plan); setModal("edit_studio_pricing") }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(var(--surface-2-rgb)/0.8)] text-cream/82 hover:bg-[rgb(var(--surface-3-rgb)/0.92)] hover:text-gold transition-colors duration-200">
                          Edit
                        </button>
                        <button onClick={() => { setDeleteTargetType("studio_pricing"); setDeleteConfirm(plan.id) }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 bg-[rgb(127_29_29/0.35)] text-red-300 hover:bg-[rgb(127_29_29/0.5)] transition-colors duration-200">
                          Del
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  )
}



