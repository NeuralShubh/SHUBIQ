"use client"
import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "../../lib/supabase"

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

// --- Helpers ---
const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2)

const STORAGE_KEY_PROJECTS = "shubiq_projects"
const STORAGE_KEY_ECO = "shubiq_ecosystem"
const STORAGE_KEY_STUDIO_PORTFOLIO = "shubiq_studio_portfolio"
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

// --- Components ---
const inputClass = "w-full rounded-sm bg-[rgb(var(--surface-1-rgb)/0.76)] border border-[rgb(var(--cream-rgb)/0.16)] text-cream/95 font-cormorant text-[17px] px-4 py-3.5 focus:outline-none focus:border-gold/56 focus:bg-[rgb(var(--surface-2-rgb)/0.92)] focus:shadow-[0_0_0_1px_rgb(var(--gold-rgb)_/_0.18),0_0_24px_rgb(var(--gold-rgb)_/_0.16),inset_0_1px_8px_rgb(var(--gold-rgb)_/_0.06)] transition-all duration-[360ms] ease-out placeholder:text-cream/45"
const labelClass = "font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 block mb-2"
const primaryButtonClass = "flex-1 rounded-sm font-rajdhani text-[13px] tracking-[3.2px] uppercase bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_58%,rgb(var(--gold-dark-rgb)))] text-ink py-3.5 font-semibold transition-all duration-300 hover:tracking-[3.6px] hover:shadow-[0_10px_30px_rgb(var(--gold-rgb)_/_0.28),inset_0_0_16px_rgb(var(--cream-rgb)_/_0.14)] hover:bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_42%,rgb(var(--gold-light-rgb)))]"
const secondaryButtonClass = "rounded-sm font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.22)] bg-[rgb(var(--surface-1-rgb)/0.4)] text-cream/78 px-6 py-3.5 transition-all duration-300 hover:border-gold/38 hover:text-gold/90 hover:bg-[rgb(var(--surface-2-rgb)/0.66)]"

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
  const ICON_OPTIONS = ["◈", "◎", "◉", "◌", "◆", "◇", "◍", "⬡", "⬢", "✦", "✧", "✶"]
  const blank: EcoItem = { id: generateId(), type: "app", title: "", subtitle: "", desc: "", icon: "◈", color: "#C9A84C", status: "concept", link: null, tags: [], featured: false, order_index: 0 }
  const [form, setForm] = useState<EcoItem>(initial || blank)
  const [tagInput, setTagInput] = useState(initial?.tags.join(", ") || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...form,
      tags: tagInput.split(",").map(t => t.trim()).filter(Boolean),
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className={labelClass}>Type</label>
          <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as any })} className={`${inputClass} cursor-pointer`}>
            {["project", "app", "tool", "service", "blog", "case_study"].map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Status</label>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as any })} className={`${inputClass} cursor-pointer`}>
            {["live", "coming_soon", "in_dev", "concept"].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Icon</label>
          <select value={form.icon} onChange={e => setForm({ ...form, icon: e.target.value })} className={`${inputClass} cursor-pointer`}>
            {ICON_OPTIONS.map((icon) => <option key={icon} value={icon}>{icon}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Quick Icon Pick</label>
        <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
          {ICON_OPTIONS.map((icon) => (
            <button
              type="button"
              key={`pick-${icon}`}
              onClick={() => setForm({ ...form, icon })}
              className={`h-10 rounded-sm border text-lg transition-colors duration-200 ${
                form.icon === icon
                  ? "border-gold/55 bg-gold/[0.12] text-gold"
                  : "border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--surface-1-rgb)/0.65)] text-cream/78 hover:border-gold/35 hover:text-gold/90"
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Live URL</label>
        <input value={form.link || ""} onChange={e => setForm({ ...form, link: e.target.value || null })} className={inputClass} placeholder="https://..." />
      </div>

      <div>
        <label className={labelClass}>Tags (comma separated)</label>
        <input value={tagInput} onChange={e => setTagInput(e.target.value)} className={inputClass} placeholder="AI, Web Dev, SaaS" />
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
        <div className="sm:col-span-2">
          <label className={labelClass}>Metric</label>
          <input value={form.metric} onChange={(e) => setForm({ ...form, metric: e.target.value })} className={inputClass} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Tech (comma separated)</label>
          <input value={techInput} onChange={(e) => setTechInput(e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Link</label>
          <input value={form.link || ""} onChange={(e) => setForm({ ...form, link: e.target.value || null })} className={inputClass} />
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

export default function AdminDashboard() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [pageScope, setPageScope] = useState<"main" | "studio">("main")
  const [mainSection, setMainSection] = useState<"projects" | "ecosystem">("projects")
  const [studioSection, setStudioSection] = useState<"portfolio">("portfolio")
  const [projects, setProjects] = useState<Project[]>([])
  const [eco, setEco] = useState<EcoItem[]>([])
  const [studioPortfolio, setStudioPortfolio] = useState<StudioPortfolioItem[]>([])
  const [modal, setModal] = useState<null | "add_project" | "edit_project" | "add_eco" | "edit_eco" | "add_studio_portfolio" | "edit_studio_portfolio">(null)
  const [editTarget, setEditTarget] = useState<Project | EcoItem | StudioPortfolioItem | null>(null)
  const [deleteTargetType, setDeleteTargetType] = useState<"project" | "eco" | "studio_portfolio">("project")
  const [toast, setToast] = useState("")
  const [search, setSearch] = useState("")
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [usingSupabase, setUsingSupabase] = useState(false)

  const showToast = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(""), 3000)
  }

  const refreshFromSupabase = async () => {
    const [{ data: pData, error: pErr }, { data: eData, error: eErr }] = await Promise.all([
      supabase.from("projects").select("*").order("order_index", { ascending: true }),
      supabase.from("ecosystem").select("*").order("order_index", { ascending: true }),
    ])
    if (pErr) throw pErr
    if (eErr) throw eErr
    setProjects((pData ?? []).map(mapProjectRow))
    setEco((eData ?? []).map(mapEcoRow))
  }

  useEffect(() => {
    const init = async () => {
      const ok = sessionStorage.getItem("shubiq_admin")
      if (!ok) { router.push("/admin"); return }
      setAuthed(true)

      if (!SUPABASE_ENABLED) {
        setProjects(loadProjects())
        setEco(loadEco())
        setStudioPortfolio(loadStudioPortfolio())
        return
      }

      try {
        await refreshFromSupabase()
        setUsingSupabase(true)
        setStudioPortfolio(loadStudioPortfolio())
      } catch {
        setUsingSupabase(false)
        setProjects(loadProjects())
        setEco(loadEco())
        setStudioPortfolio(loadStudioPortfolio())
        showToast("Supabase unavailable. Using local fallback.")
      }
    }

    init()
  }, [router])

  const logout = () => {
    sessionStorage.removeItem("shubiq_admin")
    router.push("/admin")
  }

  // Project CRUD
  const saveProject = async (p: Project) => {
    if (usingSupabase) {
      try {
        if (editTarget) {
          const { error } = await supabase
            .from("projects")
            .update({
              name: p.name,
              tag: p.tag,
              desc: p.desc,
              link: p.link,
              live: p.live,
              featured: p.featured,
            })
            .eq("id", p.id)
          if (error) throw error
        } else {
          const { error } = await supabase
            .from("projects")
            .insert({
              name: p.name,
              tag: p.tag,
              desc: p.desc,
              tech: [],
              stars: 0,
              link: p.link,
              live: p.live,
              featured: p.featured,
              status: "live",
              order_index: projects.length,
            })
          if (error) throw error
        }

        await refreshFromSupabase()
        setModal(null)
        setEditTarget(null)
        showToast(editTarget ? "Project updated!" : "Project created!")
        return
      } catch {
        showToast("Supabase write failed. Saved locally.")
      }
    }

    const updated = editTarget
      ? projects.map(x => x.id === p.id ? p : x)
      : [...projects, p]
    setProjects(updated)
    saveProjects(updated)
    setModal(null)
    setEditTarget(null)
    showToast(editTarget ? "Project updated!" : "Project created!")
  }

  const deleteProject = async (id: string) => {
    if (usingSupabase) {
      try {
        const { error } = await supabase.from("projects").delete().eq("id", id)
        if (error) throw error
        await refreshFromSupabase()
        setDeleteConfirm(null)
        showToast("Project deleted.")
        return
      } catch {
        showToast("Supabase delete failed. Deleted locally.")
      }
    }

    const updated = projects.filter(p => p.id !== id)
    setProjects(updated)
    saveProjects(updated)
    setDeleteConfirm(null)
    showToast("Project deleted.")
  }

  const toggleFeaturedProject = async (id: string) => {
    const current = projects.find((p) => p.id === id)
    if (!current) return

    if (usingSupabase) {
      try {
        const { error } = await supabase.from("projects").update({ featured: !current.featured }).eq("id", id)
        if (error) throw error
        await refreshFromSupabase()
        return
      } catch {
        showToast("Supabase update failed. Updated locally.")
      }
    }

    const updated = projects.map(p => p.id === id ? { ...p, featured: !p.featured } : p)
    setProjects(updated)
    saveProjects(updated)
  }

  // Eco CRUD
  const saveEcoItem = async (item: EcoItem) => {
    if (usingSupabase) {
      try {
        if (editTarget) {
          const { error } = await supabase
            .from("ecosystem")
            .update({
              type: item.type,
              title: item.title,
              subtitle: item.subtitle,
              desc: item.desc,
              icon: item.icon,
              status: item.status,
              link: item.link,
              tags: item.tags,
            })
            .eq("id", item.id)
          if (error) throw error
        } else {
          const { error } = await supabase
            .from("ecosystem")
            .insert({
              type: item.type,
              title: item.title,
              subtitle: item.subtitle,
              desc: item.desc,
              icon: item.icon,
              color: "rgb(var(--gold-rgb))",
              status: item.status,
              link: item.link,
              tags: item.tags,
              featured: false,
              order_index: eco.length,
            })
          if (error) throw error
        }

        await refreshFromSupabase()
        setModal(null)
        setEditTarget(null)
        showToast(editTarget ? "Item updated!" : "Item created!")
        return
      } catch {
        showToast("Supabase write failed. Saved locally.")
      }
    }

    const updated = editTarget
      ? eco.map(x => x.id === item.id ? item : x)
      : [...eco, item]
    setEco(updated)
    saveEco(updated)
    setModal(null)
    setEditTarget(null)
    showToast(editTarget ? "Item updated!" : "Item created!")
  }

  const deleteEcoItem = async (id: string) => {
    if (usingSupabase) {
      try {
        const { error } = await supabase.from("ecosystem").delete().eq("id", id)
        if (error) throw error
        await refreshFromSupabase()
        setDeleteConfirm(null)
        showToast("Item deleted.")
        return
      } catch {
        showToast("Supabase delete failed. Deleted locally.")
      }
    }

    const updated = eco.filter(e => e.id !== id)
    setEco(updated)
    saveEco(updated)
    setDeleteConfirm(null)
    showToast("Item deleted.")
  }

  const saveStudioPortfolioItem = (item: StudioPortfolioItem) => {
    const updated = editTarget
      ? studioPortfolio.map((x) => x.id === item.id ? item : x)
      : [...studioPortfolio, { ...item, order_index: studioPortfolio.length }]
    setStudioPortfolio(updated)
    saveStudioPortfolio(updated)
    setModal(null)
    setEditTarget(null)
    showToast(editTarget ? "Studio card updated!" : "Studio card created!")
  }

  const deleteStudioPortfolioItem = (id: string) => {
    const updated = studioPortfolio.filter((item) => item.id !== id)
    setStudioPortfolio(updated)
    saveStudioPortfolio(updated)
    setDeleteConfirm(null)
    showToast("Studio card deleted.")
  }

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.tag.toLowerCase().includes(search.toLowerCase())
  )

  const filteredEco = eco.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.type.toLowerCase().includes(search.toLowerCase())
  )

  const filteredStudioPortfolio = studioPortfolio.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.tag.toLowerCase().includes(search.toLowerCase())
  )

  const headerTitle = pageScope === "main" ? "main page" : "studio page"

  if (!authed) return null

  return (
    <div className="admin-readable min-h-screen bg-ink text-cream">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[9999] border border-gold/40 bg-[#0a0a0a] px-6 py-3 font-rajdhani text-[11px] tracking-[3px] uppercase text-gold animate-fade-in">
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
                else if (deleteTargetType === "eco") deleteEcoItem(deleteConfirm)
                else deleteStudioPortfolioItem(deleteConfirm)
              }} className="flex-1 font-rajdhani text-[10px] tracking-[3px] uppercase bg-red-500/20 border border-red-500/40 text-red-400 py-3 hover:bg-red-500/30 transition-colors duration-200">
                Delete
              </button>
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 font-rajdhani text-[10px] tracking-[3px] uppercase border border-gold/20 text-[#555] py-3 hover:border-gold/40 transition-colors duration-200">
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

      {/* Sidebar + Main */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 border-r border-gold/10 bg-[#070707] flex flex-col fixed h-full z-10">
          <div className="p-6 border-b border-gold/10">
            <div className="font-cinzel font-black text-xl tracking-[6px] text-gradient-gold mb-1">SHUBIQ</div>
            <div className="font-rajdhani text-[9px] tracking-[4px] uppercase text-gold/30">Admin Panel</div>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setPageScope("main")}
              className={`w-full flex items-center justify-between px-4 py-3 transition-all duration-200 border ${
                pageScope === "main" ? "bg-gold/10 border-gold/30" : "border-gold/10 hover:border-gold/20"
              }`}
            >
              <span className={`font-rajdhani text-[11px] tracking-[3px] uppercase ${pageScope === "main" ? "text-gold" : "text-[#666]"}`}>
                Main Page
              </span>
            </button>
            <button
              onClick={() => setPageScope("studio")}
              className={`w-full flex items-center justify-between px-4 py-3 transition-all duration-200 border ${
                pageScope === "studio" ? "bg-gold/10 border-gold/30" : "border-gold/10 hover:border-gold/20"
              }`}
            >
              <span className={`font-rajdhani text-[11px] tracking-[3px] uppercase ${pageScope === "studio" ? "text-gold" : "text-[#666]"}`}>
                Studio Page
              </span>
            </button>
          </nav>

          <div className="p-4 border-t border-gold/10 space-y-3">
            <a href="/" target="_blank" rel="noreferrer"
              className="w-full flex items-center gap-3 px-4 py-2 border border-gold/10 hover:border-gold/30 transition-colors duration-200">
              <span className="font-rajdhani text-[10px] tracking-[3px] uppercase text-[#444] hover:text-gold/60">View Site →</span>
            </a>
            <button onClick={logout}
              className="w-full font-rajdhani text-[10px] tracking-[3px] uppercase border border-red-500/20 text-[#444] hover:text-red-400 hover:border-red-500/40 px-4 py-2 transition-colors duration-200">
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-64 min-h-screen">
          {/* Header */}
          <div className="sticky top-0 bg-[#070707]/90 backdrop-blur-sm border-b border-gold/10 px-8 py-4 flex items-center justify-between z-10">
            <div>
              <h1 className="font-cinzel text-xl text-cream font-bold capitalize">{headerTitle}</h1>
              <div className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#333]">Manage selected section cards</div>
              <div className="flex items-center gap-2 mt-3">
                {pageScope === "main" ? (
                  <>
                    <button
                      onClick={() => setMainSection("projects")}
                      className={`font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 border transition-colors duration-200 ${
                        mainSection === "projects" ? "border-gold/40 text-gold bg-gold/10" : "border-gold/12 text-[#666] hover:border-gold/30"
                      }`}
                    >
                      Projects
                    </button>
                    <button
                      onClick={() => setMainSection("ecosystem")}
                      className={`font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 border transition-colors duration-200 ${
                        mainSection === "ecosystem" ? "border-gold/40 text-gold bg-gold/10" : "border-gold/12 text-[#666] hover:border-gold/30"
                      }`}
                    >
                      Ecosystem
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setStudioSection("portfolio")}
                    className="font-rajdhani text-[10px] tracking-[2px] uppercase px-3 py-1.5 border border-gold/40 text-gold bg-gold/10"
                  >
                    Portfolio
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search..."
                className="bg-[#0a0a0a] border border-gold/25 text-cream font-cormorant px-3 py-2.5 text-base focus:outline-none focus:border-gold/50 transition-colors duration-200 placeholder:text-cream/46 w-52"
              />
              <button
                onClick={() => {
                  setEditTarget(null)
                  if (pageScope === "main") {
                    setModal(mainSection === "projects" ? "add_project" : "add_eco")
                  } else {
                    setModal("add_studio_portfolio")
                  }
                }}
                className="font-rajdhani text-[10px] tracking-[3px] uppercase bg-gold text-ink px-5 py-2.5 font-semibold hover:bg-gold-light transition-colors duration-200 flex items-center gap-2"
              >
                <span>+ Add</span>
              </button>
            </div>
          </div>

          <div className="p-8">
            {/* Stats row */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {(pageScope === "main"
                ? (mainSection === "projects"
                    ? [
                        { label: "Total Projects", val: projects.length },
                        { label: "Featured", val: projects.filter(p => p.featured).length },
                        { label: "Live", val: projects.filter((p: any) => p.status === "live").length },
                        { label: "Other", val: projects.filter((p: any) => p.status !== "live").length },
                      ]
                    : [
                        { label: "Total Ecosystem", val: eco.length },
                        { label: "Featured", val: eco.filter((e) => e.featured).length },
                        { label: "Live", val: eco.filter((e) => e.status === "live").length },
                        { label: "Other", val: eco.filter((e) => e.status !== "live").length },
                      ])
                : [
                    { label: "Studio Cards", val: studioPortfolio.length },
                    { label: "Live", val: studioPortfolio.filter((p) => p.status === "live").length },
                    { label: "WIP", val: studioPortfolio.filter((p) => p.status === "wip").length },
                    { label: "Concept", val: studioPortfolio.filter((p) => p.status === "concept").length },
                  ]).map(stat => (
                <div key={stat.label} className="border border-gold/10 bg-[#0a0a0a] p-5">
                  <div className="font-cinzel text-2xl text-gold font-black">{stat.val}</div>
                  <div className="font-rajdhani text-[9px] tracking-[3px] uppercase text-[#333] mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

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
                            className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 border border-gold/10 text-[#444] hover:border-gold/30 hover:text-gold/60 transition-colors duration-200">
                            GH
                          </a>
                        )}
                        <button onClick={() => { setEditTarget(project); setModal("edit_project") }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 border border-gold/20 text-[#555] hover:border-gold hover:text-gold transition-colors duration-200">
                          Edit
                        </button>
                        <button onClick={() => { setDeleteTargetType("project"); setDeleteConfirm(project.id) }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 border border-red-500/20 text-[#444] hover:border-red-500/50 hover:text-red-400 transition-colors duration-200">
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
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 border border-gold/20 text-[#555] hover:border-gold hover:text-gold transition-colors duration-200">
                          Edit
                        </button>
                        <button onClick={() => { setDeleteTargetType("eco"); setDeleteConfirm(item.id) }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 border border-red-500/20 text-[#444] hover:border-red-500/50 hover:text-red-400 transition-colors duration-200">
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
                        <p className="font-cormorant text-[#333] text-sm">{item.metric}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => { setEditTarget(item); setModal("edit_studio_portfolio") }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 border border-gold/20 text-[#555] hover:border-gold hover:text-gold transition-colors duration-200">
                          Edit
                        </button>
                        <button onClick={() => { setDeleteTargetType("studio_portfolio"); setDeleteConfirm(item.id) }}
                          className="font-rajdhani text-[9px] tracking-[2px] uppercase px-3 py-1.5 border border-red-500/20 text-[#444] hover:border-red-500/50 hover:text-red-400 transition-colors duration-200">
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

