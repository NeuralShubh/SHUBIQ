"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"
import { SERVICES as DEFAULT_MAIN_SERVICES } from "../../data"
import { DEFAULT_STUDIO_CONTENT, STUDIO_CONTENT_STORAGE_KEY, type StudioContent } from "../../shubiq-studio/studioContent"

import { motion, AnimatePresence } from "framer-motion"
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
  video_url?: string | null
  video_poster?: string | null
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
  { id: "1", name: "SHUBIQ Studio", tag: "Agency | Live", desc: "A modern freelance business platform.", tech: ["Next.js", "Supabase"], stars: 16, link: "https://github.com/NeuralShubh/BuildWithShubh", live: "https://buildwithshubh.vercel.app", featured: true, status: "live", order_index: 0, video_url: null, video_poster: null },
  { id: "2", name: "Portfolio", tag: "Personal | Live", desc: "Personal portfolio showcasing projects.", tech: ["HTML", "CSS", "JS"], stars: 11, link: "https://github.com/NeuralShubh/Portfolio", live: "https://neuralshubh.github.io/Portfolio/", featured: false, status: "live", order_index: 1, video_url: null, video_poster: null },
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
  video_url: row.video_url ?? null,
  video_poster: row.video_poster ?? null,
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

// --- Components ---// --- Components ---
const inputClass = "admin-input font-cormorant text-[17px] text-cream/95 placeholder:text-cream/45"
const labelClass = "font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 block mb-2"
const primaryButtonClass = "flex-1 rounded-lg font-rajdhani text-[13px] tracking-[3.2px] uppercase bg-gold text-ink py-3.5 font-semibold transition-all duration-300 hover:tracking-[3.6px] hover:shadow-[0_10px_30px_rgb(var(--gold-rgb)_/_0.28)]"
const secondaryButtonClass = "rounded-lg border border-[rgb(var(--cream-rgb)/0.12)] font-rajdhani text-[12px] tracking-[3px] uppercase bg-[rgb(var(--surface-2-rgb)/0.4)] text-cream/88 px-6 py-3.5 transition-all duration-300 hover:text-gold hover:bg-[rgb(var(--cream-rgb)/0.03)]"

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
    <span className="font-rajdhani text-[8px] tracking-[2px] uppercase px-2 py-0.5 border rounded"
      style={{ color: colors[status] || "rgb(var(--muted-rgb))", borderColor: "rgb(var(--gold-rgb) / 0.24)" }}>
      {status.replace("_", " ")}
    </span>
  )
}

function AdminModal({ isOpen, title, onClose, onSave, children, isEditing, sectionLabel }: { isOpen: boolean, title: string, onClose: () => void, onSave: () => void, children: React.ReactNode, isEditing?: boolean, sectionLabel?: string }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999]"
        onClick={onClose}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="fixed inset-4 md:inset-auto md:left-1/2 md:top-[8%] md:-translate-x-1/2 md:max-w-[800px] md:w-full max-h-[85vh] flex flex-col bg-[#0a0a0a] border border-[rgb(var(--cream-rgb)/0.1)] rounded-2xl shadow-2xl z-[10000]"
      >
        <div className="flex items-center justify-between p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] flex-shrink-0">
          <h2 className="text-base font-semibold font-cinzel text-cream">{title || (isEditing ? 'Edit' : 'Add New') + ' ' + (sectionLabel || '')}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-lg hover:bg-[rgb(var(--cream-rgb)/0.05)] flex items-center justify-center text-sm text-cream transition-colors">✕</button>
        </div>
        <div className="p-5 overflow-y-auto min-h-0 flex-1">{children}</div>
      </motion.div>
    </AnimatePresence>
  )
}

// --- Project Form ---
function ProjectForm({ initial, onSave, onClose }: { initial?: Project; onSave: (p: Project) => void; onClose: () => void }) {
  const blank: Project = { id: generateId(), name: "", tag: "", desc: "", tech: [], stars: 0, link: null, live: null, featured: false, status: "live", order_index: 0, video_url: null, video_poster: null }
  const [form, setForm] = useState<Project>(initial || blank)
  const [techInput, setTechInput] = useState((initial?.tech || []).join(", "))
  const [uploading, setUploading] = useState<null | "video" | "poster">(null)

  const uploadToStorage = async (file: File, kind: "video" | "poster") => {
    if (!SUPABASE_ENABLED) return
    try {
      setUploading(kind)
      const ext = file.name.split(".").pop() || "bin"
      const path = `projects/${form.id}/${kind}-${Date.now()}.${ext}`
      const { error } = await supabase.storage.from("project-media").upload(path, file, { upsert: true })
      if (error) throw error
      const { data } = supabase.storage.from("project-media").getPublicUrl(path)
      if (kind === "video") setForm((prev) => ({ ...prev, video_url: data.publicUrl }))
      else setForm((prev) => ({ ...prev, video_poster: data.publicUrl }))
    } catch {
      console.warn("Upload failed. Check storage bucket and try again.")
    } finally {
      setUploading(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...form,
      tech: techInput.split(",").map((t) => t.trim()).filter(Boolean),
      stars: initial?.stars ?? 0,
      order_index: initial?.order_index ?? 0,
      image_url: initial?.image_url ?? null,
    })
  }

  return (
    <form id="project-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-5">
      <div className="md:col-span-3 space-y-4">
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
        <div>
          <label className={labelClass}>Tech Stack (comma separated)</label>
          <input value={techInput} onChange={(e) => setTechInput(e.target.value)} className={inputClass} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all duration-200 ${form.featured ? "border-gold bg-gold/20" : "border-gold/20"}`}
              onClick={() => setForm({ ...form, featured: !form.featured })}>
              {form.featured && <span className="text-gold text-xs">✓</span>}
            </div>
            <span className="font-rajdhani text-[10px] tracking-[3px] uppercase text-[#555]">Featured Project</span>
          </label>
          <div>
            <label className={labelClass}>Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Project["status"] })} className={`${inputClass} cursor-pointer`}>
              {["live", "wip", "concept", "archived"].map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
        <div>
          <label className={labelClass}>GitHub URL</label>
          <input value={form.link || ""} onChange={e => setForm({ ...form, link: e.target.value || null })} className={inputClass} placeholder="https://github.com/..." />
        </div>
        <div>
          <label className={labelClass}>Live URL</label>
          <input value={form.live || ""} onChange={e => setForm({ ...form, live: e.target.value || null })} className={inputClass} placeholder="https://..." />
        </div>
        <div>
          <label className={labelClass}>Video URL</label>
          <input value={form.video_url || ""} onChange={e => setForm({ ...form, video_url: e.target.value || null })} className={inputClass} placeholder="https://youtube.com/..." />
        </div>
        <div>
          <label className={labelClass}>Poster Image</label>
          <div className="border-2 border-dashed border-[rgb(var(--cream-rgb)/0.1)] rounded-xl p-6 text-center hover:border-gold/30 transition-colors cursor-pointer relative mt-1">
            {form.video_poster ? (
              <div className="relative">
                <img src={form.video_poster} className="w-full rounded-lg" alt="Preview" />
                <button type="button" onClick={(e) => { e.stopPropagation(); setForm({ ...form, video_poster: null }); }} className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 text-white text-xs flex items-center justify-center">✕</button>
              </div>
            ) : (
              <div className="py-4">
                <p className="text-sm opacity-30">Drop image or click to upload</p>
                <p className="text-xs opacity-20 mt-1">PNG, JPG up to 2MB</p>
              </div>
            )}
            <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) uploadToStorage(file, "poster")
            }} />
          </div>
          {uploading === "poster" && <span className="text-[11px] text-cream/50 mt-1 block">Uploading...</span>}
        </div>
      </div>
      <div className="md:col-span-5 flex justify-end gap-3 pt-4 border-t border-[rgb(var(--cream-rgb)/0.08)] mt-2">
        <button type="button" onClick={onClose} className={secondaryButtonClass}>Cancel</button>
        <button type="submit" className={primaryButtonClass}>{initial ? "Save Changes" : "Create Project"}</button>
      </div>
    </form>
  )
}

// --- Ecosystem Form ---
function EcoForm({ initial, onSave, onClose }: { initial?: EcoItem; onSave: (e: EcoItem) => void; onClose: () => void }) {
  const blank: EcoItem = { id: generateId(), type: "app", title: "", subtitle: "", desc: "", icon: "*", color: "#C9A84C", status: "concept", link: null, tags: [], featured: false, order_index: 0 }
  const [form, setForm] = useState<EcoItem>(initial || blank)
  const [tagsInput, setTagsInput] = useState((initial?.tags || []).join(", "))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...form,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      icon: form.icon || "*",
      color: form.color || "rgb(var(--gold-rgb))",
      featured: form.featured ?? false,
      order_index: initial?.order_index ?? 0,
    })
  }

  return (
    <form id="eco-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-5">
      <div className="md:col-span-3 space-y-4">
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
        <div>
          <label className={labelClass}>Tags (comma separated)</label>
          <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} className={inputClass} />
        </div>
      </div>
      <div className="md:col-span-2 space-y-4">
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
        <div>
          <label className={labelClass}>Icon & Color</label>
          <div className="flex gap-2">
            <input value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className={`${inputClass} w-16 text-center`} placeholder="⬡" />
            <input value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} className={inputClass} placeholder="#ffffff" />
          </div>
        </div>
        <div>
          <label className={labelClass}>Button URL</label>
          <input value={form.link || ""} onChange={e => setForm({ ...form, link: e.target.value || null })} className={inputClass} placeholder="https://..." />
        </div>
        <label className="flex items-center gap-3 cursor-pointer pt-2">
          <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all duration-200 ${form.featured ? "border-gold bg-gold/20" : "border-gold/20"}`}
            onClick={() => setForm({ ...form, featured: !form.featured })}>
            {form.featured && <span className="text-gold text-xs">✓</span>}
          </div>
          <span className="font-rajdhani text-[10px] tracking-[3px] uppercase text-[#555]">Featured Item</span>
        </label>
      </div>
      <div className="md:col-span-5 flex justify-end gap-3 pt-4 border-t border-[rgb(var(--cream-rgb)/0.08)] mt-2">
        <button type="button" onClick={onClose} className={secondaryButtonClass}>Cancel</button>
        <button type="submit" className={primaryButtonClass}>{initial ? "Save Changes" : "Create Item"}</button>
      </div>
    </form>
  )
}

function StudioPortfolioForm({ initial, onSave, onClose }: { initial?: StudioPortfolioItem; onSave: (item: StudioPortfolioItem) => void; onClose: () => void }) {
  const blank: StudioPortfolioItem = { id: generateId(), name: "", tag: "", desc: "", impact: "", tech: [], link: null, status: "live", metric: "", order_index: 0 }
  const [form, setForm] = useState<StudioPortfolioItem>(initial || blank)
  const [techInput, setTechInput] = useState((initial?.tech || []).join(", "))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ ...form, tech: techInput.split(",").map((t) => t.trim()).filter(Boolean), order_index: initial?.order_index ?? 0 })
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-5">
      <div className="md:col-span-3 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label className={labelClass}>Name *</label><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} required /></div>
          <div><label className={labelClass}>Tag *</label><input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} required /></div>
        </div>
        <div><label className={labelClass}>Description *</label><textarea rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className={`${inputClass} resize-none`} required /></div>
        <div><label className={labelClass}>Impact *</label><textarea rows={2} value={form.impact} onChange={(e) => setForm({ ...form, impact: e.target.value })} className={`${inputClass} resize-none`} required /></div>
      </div>
      <div className="md:col-span-2 space-y-4">
        <div><label className={labelClass}>Metric</label><input value={form.metric} onChange={e => setForm({ ...form, metric: e.target.value })} className={inputClass} /></div>
        <div>
          <label className={labelClass}>Status</label>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as StudioPortfolioItem["status"] })} className={`${inputClass} cursor-pointer`}>
            {["live", "wip", "concept"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div><label className={labelClass}>Tech Stack</label><input value={techInput} onChange={(e) => setTechInput(e.target.value)} className={inputClass} /></div>
        <div><label className={labelClass}>Link URL</label><input value={form.link || ""} onChange={e => setForm({ ...form, link: e.target.value || null })} className={inputClass} placeholder="https://..." /></div>
      </div>
      <div className="md:col-span-5 flex justify-end gap-3 pt-4 border-t border-[rgb(var(--cream-rgb)/0.08)] mt-2">
        <button type="button" onClick={onClose} className={secondaryButtonClass}>Cancel</button>
        <button type="submit" className={primaryButtonClass}>{initial ? "Save Changes" : "Create Card"}</button>
      </div>
    </form>
  )
}

function MainServiceForm({ initial, onSave, onClose }: { initial?: MainServiceItem; onSave: (item: MainServiceItem) => void; onClose: () => void }) {
  const blank: MainServiceItem = { id: generateId(), icon: "code", title: "", desc: "", tag: "" }
  const [form, setForm] = useState<MainServiceItem>(initial || blank)
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave(form); }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={labelClass}>Title *</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required /></div>
        <div><label className={labelClass}>Tag</label><input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} /></div>
      </div>
      <div><label className={labelClass}>Description *</label><textarea rows={4} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className={`${inputClass} resize-none`} required /></div>
      <div><label className={labelClass}>Icon</label><input value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })} className={`${inputClass}`} /></div>
      <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--cream-rgb)/0.08)] mt-2">
        <button type="button" onClick={onClose} className={secondaryButtonClass}>Cancel</button>
        <button type="submit" className={primaryButtonClass}>{initial ? "Save Changes" : "Create Service"}</button>
      </div>
    </form>
  )
}

function StudioServiceForm({ initial, onSave, onClose }: { initial?: StudioServiceItem; onSave: (item: StudioServiceItem) => void; onClose: () => void }) {
  const blank: StudioServiceItem = { id: generateId(), iconKey: "code", title: "", tag: "", desc: "", features: [] }
  const [form, setForm] = useState<StudioServiceItem>(initial || blank)
  const [featureInput, setFeatureInput] = useState((initial?.features || []).join(", "))
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave({ ...form, features: featureInput.split(",").map((f) => f.trim()).filter(Boolean) }); }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={labelClass}>Title *</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} required /></div>
        <div><label className={labelClass}>Tag</label><input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} /></div>
      </div>
      <div><label className={labelClass}>Description *</label><textarea rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} className={`${inputClass} resize-none`} required /></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={labelClass}>Icon Key</label><input value={form.iconKey} onChange={(e) => setForm({ ...form, iconKey: e.target.value as any })} className={inputClass} /></div>
        <div><label className={labelClass}>Features</label><input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className={inputClass} /></div>
      </div>
      <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--cream-rgb)/0.08)] mt-2">
        <button type="button" onClick={onClose} className={secondaryButtonClass}>Cancel</button>
        <button type="submit" className={primaryButtonClass}>{initial ? "Save Changes" : "Create Service"}</button>
      </div>
    </form>
  )
}

function StudioPricingPlanForm({ initial, onSave, onClose }: { initial?: StudioContent["plans"][number]; onSave: (item: StudioContent["plans"][number]) => void; onClose: () => void }) {
  const blank: StudioContent["plans"][number] = { id: generateId(), tier: "", tag: "", bestFor: "", price: 0, priceSuffix: "", meta: "", features: [], cta: "Get Started", highlighted: false, icon: "trending" }
  const [form, setForm] = useState(initial || blank)
  const [featureInput, setFeatureInput] = useState((initial?.features || []).join(", "))
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSave({ ...form, price: Number(form.price || 0), features: featureInput.split(",").map((f) => f.trim()).filter(Boolean) }); }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={labelClass}>Tier *</label><input value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className={inputClass} required /></div>
        <div><label className={labelClass}>Tag</label><input value={form.tag} onChange={(e) => setForm({ ...form, tag: e.target.value })} className={inputClass} /></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div><label className={labelClass}>Price *</label><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} className={inputClass} required /></div>
        <div><label className={labelClass}>Suffix</label><input value={form.priceSuffix || ""} onChange={(e) => setForm({ ...form, priceSuffix: e.target.value })} className={inputClass} /></div>
        <div><label className={labelClass}>Icon</label><select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value as any })} className={`${inputClass} cursor-pointer`}><option value="zap">zap</option><option value="trending">trending</option><option value="shield">shield</option></select></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={labelClass}>Best for *</label><input value={form.bestFor} onChange={(e) => setForm({ ...form, bestFor: e.target.value })} className={inputClass} required /></div>
        <div><label className={labelClass}>Meta</label><input value={form.meta} onChange={(e) => setForm({ ...form, meta: e.target.value })} className={inputClass} /></div>
      </div>
      <div><label className={labelClass}>Features</label><input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} className={inputClass} /></div>
      <label className="flex items-center gap-3 cursor-pointer">
        <div className={`w-5 h-5 border rounded flex items-center justify-center transition-all duration-200 ${form.highlighted ? "border-gold bg-gold/20" : "border-gold/20"}`} onClick={() => setForm({ ...form, highlighted: !form.highlighted })}>{form.highlighted && <span className="text-gold text-xs">✓</span>}</div>
        <span className="font-rajdhani text-[10px] tracking-[3px] uppercase text-[#555]">Highlighted</span>
      </label>
      <div className="flex justify-end gap-3 pt-4 border-t border-[rgb(var(--cream-rgb)/0.08)] mt-2">
        <button type="button" onClick={onClose} className={secondaryButtonClass}>Cancel</button>
        <button type="submit" className={primaryButtonClass}>{initial ? "Save Changes" : "Create Pricing Card"}</button>
      </div>
    </form>
  )
}
function StatCard({ label, value, accent, highlight }: { label: string; value: number; accent?: boolean; highlight?: boolean }) {
  return (
    <div className={`p-4 md:p-5 rounded-xl border transition-all ${highlight ? 'border-gold/30 bg-gold/[0.04]' : 'border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--cream-rgb)/0.02)]'}`}>
      <span className="font-rajdhani text-[11px] uppercase tracking-[0.15em] opacity-40 block mb-1">{label}</span>
      <span className={`font-cinzel text-3xl font-bold ${accent ? 'text-green-400' : ''} ${highlight ? 'text-gold' : 'text-cream'}`}>{value}</span>
    </div>
  )
}

export default function AdminDashboard() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("dashboard")
  const [projects, setProjects] = useState<Project[]>([])
  const [services, setServices] = useState<MainServiceItem[]>([])
  const [eco, setEco] = useState<EcoItem[]>([])
  const [studioPortfolio, setStudioPortfolio] = useState<StudioPortfolioItem[]>([])
  const [studioServices, setStudioServices] = useState<StudioServiceItem[]>([])
  const [studioContent, setStudioContent] = useState<StudioContent>(DEFAULT_STUDIO_CONTENT)
  const [modal, setModal] = useState<string | null>(null)
  const [editTarget, setEditTarget] = useState<any>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [deleteTargetType, setDeleteTargetType] = useState<string>("project")
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null)
  const [search, setSearch] = useState("")
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [contactLoading, setContactLoading] = useState(false)
  const [leadFilter, setLeadFilter] = useState("All")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 2500)
  }

  const formatSubmissionDate = (iso: string | null) => {
    if (!iso) return "Unknown"
    const d = new Date(iso)
    if (Number.isNaN(d.getTime())) return "Unknown"
    return d.toLocaleString("en-IN", { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" })
  }

  const fetchContactSubmissions = async () => {
    setContactLoading(true)
    try {
      const response = await fetch("/api/admin/contact-submissions", { cache: "no-store" })
      const json = await response.json()
      if (!response.ok || !json.ok) throw new Error(json.error || "Failed")
      setContactSubmissions(Array.isArray(json.submissions) ? json.submissions : [])
    } catch {
      showToast("Unable to load form submissions.", 'error')
    } finally {
      setContactLoading(false)
    }
  }

  const toggleReadSubmission = async (id: string, read: boolean) => {
    try {
      const response = await fetch("/api/admin/contact-submissions", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, read }) })
      const json = await response.json()
      if (!response.ok || !json.ok) throw new Error(json.error || "Failed")
      setContactSubmissions((prev) => prev.map((item) => (item.id === id ? { ...item, read } : item)))
      showToast(read ? "Marked as read." : "Marked as unread.", 'info')
    } catch {
      showToast("Unable to update submission state.", 'error')
    }
  }

  const deleteSubmission = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/contact-submissions?id=${encodeURIComponent(id)}`, { method: "DELETE" })
      const json = await response.json()
      if (!response.ok || !json.ok) throw new Error(json.error || "Failed")
      setContactSubmissions((prev) => prev.filter((item) => item.id !== id))
      setDeleteConfirm(null)
      showToast("Submission deleted.", 'info')
    } catch {
      showToast("Unable to delete submission.", 'error')
    }
  }

  useEffect(() => {
    const init = async () => {
      if (sessionStorage.getItem("shubiq_admin") !== "true") { router.push("/admin"); return }
      setAuthed(true)
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

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') { e.preventDefault(); handleGlobalAdd(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); document.querySelector<HTMLInputElement>('input[placeholder*="Search"]')?.focus(); }
      if (e.key === 'Escape') setModal(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeSection])

  const handleGlobalAdd = () => {
    setEditTarget(null)
    if (activeSection === "projects") setModal("add_project")
    else if (activeSection === "services") setModal("add_service")
    else if (activeSection === "ecosystem") setModal("add_eco")
    else if (activeSection === "studio-portfolio") setModal("add_studio_portfolio")
    else if (activeSection === "studio-services") setModal("add_studio_service")
    else if (activeSection === "studio-pricing") setModal("add_studio_pricing")
  }

  const handleLogout = () => {
    if (window.confirm('Log out of admin panel?')) {
      sessionStorage.removeItem("shubiq_admin")
      window.location.href = "/"
    }
  }

  // CRUD Implementations
  const saveItem = (arr: any[], setArr: any, saveFn: any, item: any, typeName: string) => {
    const updated = editTarget ? arr.map(x => x.id === item.id ? item : x) : [...arr, { ...item, order_index: typeof item.order_index === 'number' ? item.order_index : arr.length }]
    setArr(updated); saveFn(updated); setModal(null); setEditTarget(null); showToast(`${typeName} ${editTarget ? 'updated' : 'created'} successfully!`);
  }
  const deleteItem = (arr: any[], setArr: any, saveFn: any, id: string, typeName: string) => {
    const updated = arr.filter(x => x.id !== id); setArr(updated); saveFn(updated); setDeleteConfirm(null); showToast(`${typeName} deleted successfully.`, 'info');
  }

  const saveProject = (p: Project) => saveItem(projects, setProjects, saveProjects, p, "Project")
  const deleteProject = (id: string) => deleteItem(projects, setProjects, saveProjects, id, "Project")
  const saveServiceItem = (s: MainServiceItem) => saveItem(services, setServices, saveServices, s, "Service")
  const deleteServiceItem = (id: string) => deleteItem(services, setServices, saveServices, id, "Service")
  const saveEcoItem = (e: EcoItem) => saveItem(eco, setEco, saveEco, e, "Ecosystem Item")
  const deleteEcoItem = (id: string) => deleteItem(eco, setEco, saveEco, id, "Ecosystem Item")
  const saveStudioPortfolioItem = (s: StudioPortfolioItem) => saveItem(studioPortfolio, setStudioPortfolio, saveStudioPortfolio, s, "Portfolio Card")
  const deleteStudioPortfolioItem = (id: string) => deleteItem(studioPortfolio, setStudioPortfolio, saveStudioPortfolio, id, "Portfolio Card")
  const saveStudioServiceItem = (s: StudioServiceItem) => saveItem(studioServices, setStudioServices, saveStudioServices, s, "Studio Service")
  const deleteStudioServiceItem = (id: string) => deleteItem(studioServices, setStudioServices, saveStudioServices, id, "Studio Service")
  const saveStudioPricingPlan = (p: StudioContent["plans"][number]) => {
    const updatedPlans = editTarget ? studioContent.plans.map(x => x.id === p.id ? p : x) : [...studioContent.plans, p]
    const updated = { ...studioContent, plans: updatedPlans }; setStudioContent(updated); saveStudioContent(updated); setModal(null); setEditTarget(null); showToast("Pricing Card saved successfully!");
  }
  const deleteStudioPricingPlan = (id: string) => {
    const updated = { ...studioContent, plans: studioContent.plans.filter(p => p.id !== id) }; setStudioContent(updated); saveStudioContent(updated); setDeleteConfirm(null); showToast("Pricing Card deleted.", 'info');
  }

  // Sidebar config
  const unreadCount = contactSubmissions.filter(s => !s.read).length
  const sidebarSections = [
    { id: 'dashboard', label: 'Dashboard', icon: '◫' },
    { type: 'label', text: 'Main Site' },
    { id: 'projects', label: 'Projects', icon: '◧' },
    { id: 'services', label: 'Services', icon: '◨' },
    { id: 'ecosystem', label: 'Ecosystem', icon: '◉' },
    { type: 'label', text: 'Studio' },
    { id: 'studio-portfolio', label: 'Portfolio', icon: '◧' },
    { id: 'studio-services', label: 'Services', icon: '◨' },
    { id: 'studio-pricing', label: 'Pricing', icon: '◈' },
    { type: 'label', text: 'Data' },
    { id: 'leads', label: 'Form Leads', icon: '◩', badge: unreadCount },
  ]

  const totalItems = projects.length + services.length + eco.length + studioPortfolio.length + studioServices.length + studioContent.plans.length
  const liveItemsCount = [...projects, ...eco, ...studioPortfolio].filter(i => i.status?.toLowerCase().includes('live')).length

  if (!authed) return null

  // Filtered Lists
  const getFilteredList = (list: any[], searchKeys: string[]) => 
    list.filter(item => searchKeys.some(key => (item[key] || '').toString().toLowerCase().includes(search.toLowerCase())))

  const renderSection = () => {
    if (activeSection === 'dashboard') {
      return (
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold font-cinzel text-cream">Welcome back, Shubham</h1>
              <p className="font-cormorant text-base text-cream/60">Manage your SHUBIQ ecosystem</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Items" value={totalItems} />
            <StatCard label="Live Entities" value={liveItemsCount} accent />
            <StatCard label="Total Leads" value={contactSubmissions.length} />
            <StatCard label="Unread Leads" value={unreadCount} highlight={unreadCount > 0} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="font-rajdhani text-sm text-gold/50 mb-4 uppercase tracking-[2px]">Recent Leads</h3>
              <div className="space-y-3">
                {contactSubmissions.slice(0, 4).map(lead => (
                  <div key={lead.id} className="p-4 rounded-xl border border-[rgb(var(--cream-rgb)/0.06)] bg-[rgb(var(--cream-rgb)/0.015)] flex justify-between items-center">
                    <div>
                      <p className="font-cinzel text-sm text-cream">{lead.name}</p>
                      <p className="font-cormorant text-xs text-cream/50 mt-1">{lead.source} lead · {formatSubmissionDate(lead.created_at)}</p>
                    </div>
                    {!lead.read && <span className="w-2 h-2 rounded-full bg-gold shrink-0" />}
                  </div>
                ))}
                {contactSubmissions.length === 0 && <p className="text-sm opacity-50">No recent leads.</p>}
              </div>
            </div>
            <div>
              <h3 className="font-rajdhani text-sm text-gold/50 mb-4 uppercase tracking-[2px]">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <button onClick={() => { setActiveSection("projects"); setModal("add_project"); }} className="w-full text-left p-4 rounded-xl border border-[rgb(var(--cream-rgb)/0.06)] bg-[rgb(var(--cream-rgb)/0.015)] hover:border-gold/40 transition-colors flex items-center gap-3">
                  <span className="text-gold">+</span> <span className="font-rajdhani tracking-wider text-sm">New Project</span>
                </button>
                <button onClick={() => { setActiveSection("ecosystem"); setModal("add_eco"); }} className="w-full text-left p-4 rounded-xl border border-[rgb(var(--cream-rgb)/0.06)] bg-[rgb(var(--cream-rgb)/0.015)] hover:border-gold/40 transition-colors flex items-center gap-3">
                  <span className="text-gold">+</span> <span className="font-rajdhani tracking-wider text-sm">New Ecosystem Item</span>
                </button>
                <a href="/" target="_blank" className="w-full text-left p-4 rounded-xl border border-[rgb(var(--cream-rgb)/0.06)] bg-[rgb(var(--cream-rgb)/0.015)] hover:border-gold/40 transition-colors flex items-center gap-3">
                  <span className="opacity-50">↗</span> <span className="font-rajdhani tracking-wider text-sm">View Live Site</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (activeSection === 'leads') {
      const filtered = contactSubmissions.filter(l => {
        if (leadFilter === 'Unread' && l.read) return false;
        if (leadFilter === 'Studio' && !l.source.toLowerCase().includes('studio')) return false;
        if (leadFilter === 'SHUBIQ' && !l.source.toLowerCase().includes('shubiq')) return false;
        if (search && !Object.values(l).some(v => v?.toString().toLowerCase().includes(search.toLowerCase()))) return false;
        return true;
      });
      return (
        <div>
          <div className="flex flex-wrap gap-2 mb-6">
            {['All', 'Unread', 'Studio', 'SHUBIQ'].map(filter => (
              <button key={filter} onClick={() => setLeadFilter(filter)} className={`font-rajdhani px-4 py-2 text-xs rounded-lg tracking-widest uppercase transition-all ${leadFilter === filter ? 'bg-gold/15 text-gold border border-gold/30' : 'border border-[rgb(var(--cream-rgb)/0.08)] opacity-60 hover:opacity-100 text-cream'}`}>
                {filter} {filter === 'Unread' && unreadCount > 0 && `(${unreadCount})`}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(lead => (
              <div key={lead.id} className={`group p-5 rounded-xl border transition-all ${!lead.read ? 'border-gold/15 bg-gold/[0.02]' : 'border-[rgb(var(--cream-rgb)/0.06)] bg-transparent'} hover:border-[rgb(var(--cream-rgb)/0.15)] relative overflow-hidden`}>
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-2">
                    {!lead.read && <span className="w-2 h-2 rounded-full bg-gold shrink-0 shadow-[0_0_8px_rgb(var(--gold-rgb))]" />}
                    <span className="font-cinzel font-bold text-cream">{lead.name}</span>
                    <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border border-[rgb(var(--cream-rgb)/0.1)] opacity-40">{lead.source}</span>
                    <span className="text-xs font-cormorant opacity-40 ml-auto">{formatSubmissionDate(lead.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-cormorant opacity-60 mb-3">
                    <a href={`mailto:${lead.email}`} className="hover:text-gold transition-colors">{lead.email}</a>
                    {lead.phone && lead.phone !== '-' && <a href={`tel:${lead.phone}`} className="hover:text-gold transition-colors">{lead.phone}</a>}
                  </div>
                  <p className="font-cormorant text-sm opacity-60 mb-4 line-clamp-3">{lead.message}</p>
                  <div className="mt-auto flex gap-3 pt-3 border-t border-[rgb(var(--cream-rgb)/0.05)] opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => toggleReadSubmission(lead.id, !lead.read)} className="font-rajdhani px-3 py-1.5 text-xs tracking-wider uppercase rounded-lg border border-[rgb(var(--cream-rgb)/0.1)] hover:border-gold/50 transition-all">{lead.read ? 'Mark Unread' : 'Mark Read'}</button>
                    <button onClick={() => { setDeleteTargetType("contact_submission"); setDeleteConfirm(lead.id) }} className="font-rajdhani px-3 py-1.5 text-xs tracking-wider uppercase rounded-lg border border-red-500/15 hover:border-red-500/40 hover:text-red-400 transition-all">Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <p className="col-span-full text-center py-12 opacity-50 font-cormorant text-lg">No leads match your filters.</p>}
          </div>
        </div>
      )
    }

    // Common List Render functionality
    const renderList = (data: any[], typeName: string, renderContent: (item: any) => React.ReactNode, getUrls?: (item: any) => { GH?: string, Live?: string }) => {
      if (data.length === 0) return <div className="text-center py-12 opacity-50 font-cormorant text-lg">No items found.</div>
      return (
        <div className="flex flex-col gap-3">
          {data.map(item => (
            <div key={item.id} className="group relative flex flex-col md:flex-row md:items-start gap-4 p-5 rounded-xl border border-[rgb(var(--cream-rgb)/0.04)] bg-[rgb(var(--cream-rgb)/0.01)] hover:border-[rgb(var(--cream-rgb)/0.15)] hover:bg-[rgb(var(--cream-rgb)/0.02)] transition-all">
              <span className={`hidden md:block w-2 h-2 mt-2 rounded-full shrink-0 ${item.status === 'live' ? 'bg-green-400' : item.status === 'concept' ? 'bg-yellow-400/60' : 'bg-gold/30'}`} />
              <div className="flex-1 min-w-0">
                {renderContent(item)}
              </div>
              <div className="flex gap-2 mt-4 md:mt-0 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity shrink-0 items-start">
                {getUrls?.(item)?.GH && <a href={getUrls(item).GH} target="_blank" className="font-rajdhani px-3 py-1.5 text-xs rounded-lg tracking-widest uppercase border border-[rgb(var(--cream-rgb)/0.1)] hover:border-gold/40 transition-all">GH</a>}
                <button onClick={() => { setEditTarget(item); setModal(`edit_${typeName}`) }} className="font-rajdhani px-3 py-1.5 text-xs rounded-lg tracking-widest uppercase border border-[rgb(var(--cream-rgb)/0.1)] hover:border-gold/40 hover:text-gold transition-all">Edit</button>
                {deleteConfirm === item.id ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/40 bg-red-500/10">
                    <button onClick={() => {
                        if (typeName==='project') deleteProject(item.id)
                        else if (typeName==='service') deleteServiceItem(item.id)
                        else if (typeName==='eco') deleteEcoItem(item.id)
                        else if (typeName==='studio_portfolio') deleteStudioPortfolioItem(item.id)
                        else if (typeName==='studio_service') deleteStudioServiceItem(item.id)
                        else if (typeName==='studio_pricing') deleteStudioPricingPlan(item.id)
                      }} className="text-red-400 text-xs font-rajdhani tracking-widest uppercase hover:underline">Yes</button>
                    <button onClick={() => setDeleteConfirm(null)} className="text-cream/50 text-xs font-rajdhani tracking-widest uppercase hover:text-cream">No</button>
                  </div>
                ) : (
                  <button onClick={() => { setDeleteTargetType(typeName); setDeleteConfirm(item.id); }} className="font-rajdhani px-3 py-1.5 text-xs tracking-widest uppercase rounded-lg border border-red-500/15 hover:border-red-500/40 hover:text-red-400 transition-all">Del</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )
    }

    if (activeSection === 'projects') return renderList(getFilteredList(projects, ['name', 'tag', 'desc']), 'project', (item: Project) => (
      <>
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <span className="font-cinzel font-bold text-cream text-lg">{item.name}</span>
          <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-[rgb(var(--cream-rgb)/0.1)] opacity-50">{item.tag}</span>
          {item.featured && <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-widest bg-gold/15 text-gold border border-gold/20">Featured</span>}
        </div>
        <p className="font-cormorant text-base opacity-60 mb-3">{item.desc}</p>
        <div className="flex gap-2 flex-wrap">
          {item.tech.map(t => <span key={t} className="font-rajdhani px-2 py-0.5 rounded text-[9px] uppercase tracking-widest border border-[rgb(var(--cream-rgb)/0.06)] bg-[rgb(var(--cream-rgb)/0.02)] opacity-70">{t}</span>)}
        </div>
      </>
    ), (item: Project) => ({ GH: item.link || undefined }))

    if (activeSection === 'services') return renderList(getFilteredList(services, ['title', 'desc', 'tag']), 'service', (item: MainServiceItem) => (
      <>
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <span className="font-cinzel font-bold text-cream text-lg">{item.title}</span>
          <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-[rgb(var(--cream-rgb)/0.1)] opacity-50">{item.tag}</span>
        </div>
        <p className="font-cormorant text-base opacity-60">{item.desc}</p>
      </>
    ))

    if (activeSection === 'ecosystem') return renderList(getFilteredList(eco, ['title', 'subtitle', 'desc', 'type']), 'eco', (item: EcoItem) => (
      <>
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <span className="text-xl" style={{color: item.color}}>{item.icon}</span>
          <span className="font-cinzel font-bold text-cream text-lg">{item.title}</span>
          <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-[rgb(var(--cream-rgb)/0.1)] opacity-50">{item.type}</span>
          <Badge status={item.status} />
          {item.featured && <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-widest bg-gold/15 text-gold">Featured</span>}
        </div>
        <p className="font-cormorant text-sm opacity-50 mb-1">{item.subtitle}</p>
        <p className="font-cormorant text-base opacity-70">{item.desc}</p>
      </>
    ))

    if (activeSection === 'studio-portfolio') return renderList(getFilteredList(studioPortfolio, ['name', 'desc', 'tag']), 'studio_portfolio', (item: StudioPortfolioItem) => (
      <>
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <span className="font-cinzel font-bold text-cream text-lg">{item.name}</span>
          <Badge status={item.status} />
          <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-[rgb(var(--cream-rgb)/0.1)] opacity-50">{item.tag}</span>
        </div>
        <p className="font-cormorant text-base opacity-70 mb-2">{item.desc}</p>
        <p className="font-cormorant text-sm opacity-50 mb-3 ml-3 border-l-2 border-gold/30 pl-3">{item.impact}</p>
        <div className="flex gap-2 flex-wrap">
          {item.tech.map(t => <span key={t} className="font-rajdhani px-2 py-0.5 rounded text-[9px] uppercase tracking-widest border border-[rgb(var(--cream-rgb)/0.06)] opacity-70">{t}</span>)}
        </div>
      </>
    ))

    if (activeSection === 'studio-services') return renderList(getFilteredList(studioServices, ['title', 'desc', 'tag']), 'studio_service', (item: StudioServiceItem) => (
      <>
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <span className="font-cinzel font-bold text-cream text-lg">{item.title}</span>
          <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-[rgb(var(--cream-rgb)/0.1)] opacity-50">{item.tag}</span>
        </div>
        <p className="font-cormorant text-base opacity-70 mb-3">{item.desc}</p>
        <ul className="list-disc list-inside font-cormorant text-sm opacity-50 ml-2 space-y-1">
          {item.features.map(f => <li key={f}>{f}</li>)}
        </ul>
      </>
    ))

    if (activeSection === 'studio-pricing') return renderList(getFilteredList(studioContent.plans, ['tier', 'bestFor', 'tag']), 'studio_pricing', (plan: StudioContent["plans"][number]) => (
      <>
        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
          <span className="font-cinzel font-bold text-cream text-lg">{plan.tier}</span>
          <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-widest border border-[rgb(var(--cream-rgb)/0.1)] opacity-50">{plan.tag}</span>
          {plan.highlighted && <span className="font-rajdhani px-2 py-0.5 rounded text-[10px] uppercase tracking-widest bg-gold/15 text-gold border border-gold/20">Highlighted</span>}
        </div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="font-cinzel text-xl text-gold">₹{Number(plan.price || 0).toLocaleString("en-IN")}{plan.priceSuffix || ""}</span>
          <span className="font-cormorant text-sm opacity-50">- {plan.meta}</span>
        </div>
        <p className="font-cormorant text-base opacity-70 mb-3">Best for: {plan.bestFor}</p>
        <div className="flex gap-2 flex-wrap">
          {plan.features.slice(0, 3).map(f => <span key={f} className="font-rajdhani px-2 py-0.5 rounded text-[9px] uppercase tracking-widest border border-[rgb(var(--cream-rgb)/0.06)] opacity-70">{f}</span>)}
          {plan.features.length > 3 && <span className="font-rajdhani px-2 py-0.5 rounded text-[9px] uppercase tracking-widest opacity-50">+{plan.features.length - 3} more</span>}
        </div>
      </>
    ))

    return null
  }

  const PageTitle = sidebarSections.find(s => s.id === activeSection)?.label || 'Dashboard'

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-cream flex flex-col md:flex-row font-cormorant selection:bg-gold/30">
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: 20, x: '-50%' }} animate={{ opacity: 1, y: 0, x: '-50%' }} exit={{ opacity: 0, y: 20, x: '-50%' }}
            className={`fixed bottom-6 left-1/2 z-[9999] px-6 py-3.5 rounded-xl text-sm font-medium border backdrop-blur-md font-rajdhani uppercase tracking-widest whitespace-nowrap
            ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' : ''}
            ${toast.type === 'error' ? 'bg-red-500/10 border-red-500/25 text-red-400' : ''}
            ${toast.type === 'info' ? 'bg-gold/10 border-gold/25 text-gold' : ''}`}>
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <AdminModal isOpen={modal === "add_project"} title="Add Project" onClose={() => setModal(null)} onSave={() => {}}>
        <ProjectForm onSave={saveProject} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "edit_project"} isEditing title="Edit Project" onClose={() => setModal(null)} onSave={() => {}}>
        <ProjectForm initial={editTarget} onSave={saveProject} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "add_eco"} title="Add Ecosystem Item" onClose={() => setModal(null)} onSave={() => {}}>
        <EcoForm onSave={saveEcoItem} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "edit_eco"} isEditing title="Edit Ecosystem Item" onClose={() => setModal(null)} onSave={() => {}}>
        <EcoForm initial={editTarget} onSave={saveEcoItem} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "add_service"} title="Add Main Service" onClose={() => setModal(null)} onSave={() => {}}>
        <MainServiceForm onSave={saveServiceItem} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "edit_service"} isEditing title="Edit Main Service" onClose={() => setModal(null)} onSave={() => {}}>
        <MainServiceForm initial={editTarget} onSave={saveServiceItem} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "add_studio_portfolio"} title="Add Studio Portfolio Card" onClose={() => setModal(null)} onSave={() => {}}>
        <StudioPortfolioForm onSave={saveStudioPortfolioItem} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "edit_studio_portfolio"} isEditing title="Edit Studio Portfolio Card" onClose={() => setModal(null)} onSave={() => {}}>
        <StudioPortfolioForm initial={editTarget} onSave={saveStudioPortfolioItem} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "add_studio_service"} title="Add Studio Service" onClose={() => setModal(null)} onSave={() => {}}>
        <StudioServiceForm onSave={saveStudioServiceItem} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "edit_studio_service"} isEditing title="Edit Studio Service" onClose={() => setModal(null)} onSave={() => {}}>
        <StudioServiceForm initial={editTarget} onSave={saveStudioServiceItem} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "add_studio_pricing"} title="Add Pricing Card" onClose={() => setModal(null)} onSave={() => {}}>
        <StudioPricingPlanForm onSave={saveStudioPricingPlan} onClose={() => setModal(null)} />
      </AdminModal>
      <AdminModal isOpen={modal === "edit_studio_pricing"} isEditing title="Edit Pricing Card" onClose={() => setModal(null)} onSave={() => {}}>
        <StudioPricingPlanForm initial={editTarget} onSave={saveStudioPricingPlan} onClose={() => setModal(null)} />
      </AdminModal>

      {/* Flat Navigation Sidebar */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-[#0a0a0a]/95 backdrop-blur-xl border-r border-[rgb(var(--cream-rgb)/0.08)] flex flex-col z-40 transition-transform duration-300 md:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-[rgb(var(--cream-rgb)/0.08)] flex justify-between items-center">
          <div>
            <div className="font-cinzel font-black text-xl tracking-[4px] text-cream">SHUBIQ</div>
            <div className="font-rajdhani text-[9px] tracking-[3px] uppercase text-gold">Admin Panel</div>
          </div>
          <button className="md:hidden text-cream p-2" onClick={() => setMobileMenuOpen(false)}>✕</button>
        </div>
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1 scrollbar-hide">
          {sidebarSections.map((item, idx) => {
            if (item.type === 'label') return <div key={`label-${idx}`} className="font-rajdhani text-[10px] tracking-widest uppercase text-cream/30 pt-6 pb-2 px-3">{item.text}</div>
            const isActive = activeSection === item.id
            return (
              <button key={item.id} onClick={() => { setActiveSection(item.id!); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left font-rajdhani tracking-widest uppercase ${isActive ? 'bg-gold/10 text-gold border-l-2 border-gold shadow-[inset_0_0_20px_rgb(var(--gold-rgb)/0.05)]' : 'text-cream/60 hover:text-cream hover:bg-white/[0.03] border-l-2 border-transparent'}`}>
                <span className="text-xs opacity-60 w-4 text-center">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge ? <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-gold/20 text-gold font-medium">{item.badge}</span> : null}
              </button>
            )
          })}
        </nav>
        <div className="p-4 border-t border-[rgb(var(--cream-rgb)/0.08)] space-y-3">
          <a href="/" target="_blank" className="w-full flex justify-between items-center px-3 py-2.5 rounded-lg text-sm text-cream/60 hover:text-cream hover:bg-white/[0.03] transition-all font-rajdhani tracking-widest uppercase">
            <span>View Site</span> <span className="opacity-50 text-xs">↗</span>
          </a>
          <div className="flex justify-between items-center px-3">
            <button onClick={handleLogout} className="text-xs font-rajdhani tracking-widest uppercase text-red-400 hover:text-red-300 transition-colors">Logout</button>
            <span className="text-[9px] font-rajdhani tracking-[0.2em] text-cream/20">⌘K · ⌘N</span>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Mobile Header */}
        <div className="md:hidden sticky top-0 z-30 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[rgb(var(--cream-rgb)/0.08)] p-4 flex items-center justify-between">
          <button onClick={() => setMobileMenuOpen(true)} className="text-cream p-1">☰</button>
          <span className="font-cinzel text-lg font-bold">{PageTitle}</span>
          <div className="w-6" />
        </div>

        {/* Main Header */}
        {activeSection !== 'dashboard' && (
          <header className="sticky top-0 z-20 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[rgb(var(--cream-rgb)/0.08)] px-6 md:px-10 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="font-cinzel text-2xl font-bold">{PageTitle}</h1>
            </div>
            <div className="flex items-center gap-3">
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search... (⌘K)" className="admin-input py-2 md:w-64" />
              {activeSection !== 'leads' ? (
                <button onClick={handleGlobalAdd} className={primaryButtonClass.replace('py-3.5', 'py-2 px-5')}>+ Add</button>
              ) : (
                <button onClick={fetchContactSubmissions} className={primaryButtonClass.replace('py-3.5', 'py-2 px-5 min-w-[100px]')}>{contactLoading ? "..." : "Refresh"}</button>
              )}
            </div>
          </header>
        )}

        <main className="p-6 md:p-10 flex-1 max-w-7xl">
          <AnimatePresence mode="wait">
            <motion.div key={activeSection} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15, ease: 'easeOut' }}>
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
