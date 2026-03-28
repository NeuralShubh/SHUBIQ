"use client"
import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"
import { AppWindow, Boxes, Building2, Lightbulb, Rocket, Wrench } from "lucide-react"
import StaggerContainer, { StaggerItem } from "./StaggerContainer"
import type { LucideIcon } from "lucide-react"
import { ECOSYSTEM_ITEMS } from "../data"
import { projects } from "../data-projects"
import { LAB_PRODUCTS } from "../data-labs"
import { SUPABASE_ENABLED, getSupabaseClient } from "../lib/supabase-client"
import { useInViewOnce } from "../lib/gsap-hooks"
import NumberTicker from "./NumberTicker"

const TYPE_COLORS: Record<string, string> = {
  project: "rgb(var(--gold-light-rgb))",
  agency: "rgb(var(--gold-rgb))",
  app: "rgb(var(--gold-rgb))",
  tool: "rgb(var(--gold-light-rgb))",
  service: "rgb(var(--gold-rgb))",
  blog: "rgb(var(--gold-light-rgb))",
  case_study: "rgb(var(--gold-rgb))",
}

const STATUS_LABELS: Record<string, string> = {
  live: "LIVE",
  coming_soon: "Coming Soon",
  in_dev: "BUILDING",
  concept: "Concept",
}

const STATUS_COLORS: Record<string, string> = {
  live: "rgb(var(--gold-light-rgb))",
  coming_soon: "rgb(var(--gold-rgb))",
  in_dev: "rgb(var(--gold-rgb))",
  concept: "rgb(var(--muted-rgb))",
}

const TYPE_ICONS: Record<string, LucideIcon> = {
  agency: Building2,
  app: AppWindow,
  tool: Wrench,
  project: Boxes,
  service: Rocket,
  blog: Lightbulb,
  case_study: Lightbulb,
}

function StatCard({
  label,
  value,
  delay,
  reducedMotion,
  inView,
}: {
  label: string
  value: number
  delay: string
  reducedMotion: boolean
  inView: boolean
}) {
  return (
    <div
      className={`reveal ${inView ? "in-view" : ""} border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--cream-rgb)/0.02)] px-3 py-2.5 text-center md:border md:border-[rgb(var(--cream-rgb)/0.1)] md:bg-[rgb(var(--cream-rgb)/0.01)] md:px-4 md:py-5 md:transition-all md:duration-300 md:hover:border-gold/20 md:hover:bg-gold/[0.03] md:hover:shadow-[0_0_16px_rgb(var(--gold-rgb)_/_0.1)]`}
      style={{ animationDelay: delay }}
    >
      <div className="font-cinzel text-[34px] md:text-[44px] leading-none text-gold font-black">
        {reducedMotion ? value : <NumberTicker value={value} />}
      </div>
      <div className="font-rajdhani text-[10px] md:text-[11px] tracking-[2.6px] md:tracking-[3.4px] uppercase text-cream/55 mt-2">
        {label}
      </div>
      <div className="mt-3 h-px w-10 mx-auto bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </div>
  )
}

function EcoCard({ item }: { item: typeof ECOSYSTEM_ITEMS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = TYPE_ICONS[item.type] ?? AppWindow
  const isComingSoon = item.status === "coming_soon"
  const isPlaceholderCard = isComingSoon && !item.subtitle && !item.desc && item.tags.length === 0 && !item.link
  const [titleMain, ...titleRest] = item.title.split(" ")
  const titleSecondary = titleRest.join(" ")
  const ctaHref = item.title === "SHUBIQ Studio" ? "/shubiq-studio" : item.link
  const isInternalHref = !!ctaHref && ctaHref.startsWith("/")
  const ctaLabel =
    item.title === "SHUBIQ Studio"
      ? "EXPLORE STUDIO"
      : item.title === "SHUBIQ Labs"
        ? "EXPLORE PRODUCTS"
        : "LEARN MORE"

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty("--gx", `${x}%`)
    el.style.setProperty("--gy", `${y}%`)
  }

  if (isPlaceholderCard) {
    return (
      <div
        ref={cardRef}
        className="eco-card relative group min-h-[360px] p-6 sm:p-7 transition-all duration-500 overflow-hidden hover:-translate-y-1 flex flex-col border border-[rgb(var(--cream-rgb)/0.14)] rounded-sm bg-card-soft hover:bg-card-soft-hover"
        onMouseMove={handleMouseMove}
        style={
          {
            "--gx": "50%",
            "--gy": "50%",
            boxShadow: "0 18px 36px rgb(0 0 0 / 0.2), 0 0 0 1px rgb(var(--cream-rgb) / 0.05) inset",
          } as React.CSSProperties
        }
      >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[400ms] group-hover:opacity-100 opacity-0"
        style={{ background: "radial-gradient(circle at var(--gx) var(--gy), rgb(var(--gold-rgb) / 0.05) 0%, transparent 58%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgb(var(--surface-3-rgb) / 0.18), transparent 42%, rgb(var(--ink-rgb) / 0.2) 100%)" }}
      />
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          style={{ background: "linear-gradient(140deg, rgb(var(--gold-rgb) / 0.08), transparent 35%, transparent 75%, rgb(var(--gold-rgb) / 0.06))" }}
        />
        <div className="absolute top-0 right-6 h-px w-16 bg-gold/60" />
        <div className="absolute left-6 right-6 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--cream-rgb)/0.1)] to-transparent pointer-events-none" />

        <div className="flex items-center justify-end mb-6">
          <div className="flex items-center gap-1.5 px-2.5 py-1 border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--cream-rgb)/0.03)]">
            <div className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="font-rajdhani text-[12px] tracking-[2px] uppercase text-gold">Coming Soon</span>
          </div>
        </div>

        <h3 className="font-cinzel text-[34px] sm:text-[38px] leading-[1.02] font-black text-cream text-center">More Soon +</h3>
        <div className="mt-2 h-[17px]" />

        <div className="mt-6 flex-1 border border-dashed border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--surface-1-rgb)/0.72)] rounded-sm p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between font-rajdhani text-[11px] tracking-[2px] uppercase text-gold/70">
            <span>Pipeline</span>
            <span>Queued</span>
          </div>
          <div className="h-px w-full bg-gradient-to-r from-gold/35 via-gold/10 to-transparent" />
          <div className="grid grid-cols-3 gap-2">
            {["Discover", "Design", "Deploy"].map((step) => (
              <div key={step} className="text-center border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--cream-rgb)/0.02)] py-1.5">
                <span className="font-rajdhani text-[10px] tracking-[2px] uppercase text-cream/60">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className="eco-card relative group min-h-[380px] sm:min-h-[420px] bg-card-soft p-6 sm:p-8 transition-all duration-[400ms] overflow-hidden hover:-translate-y-1.5 flex flex-col border border-[rgb(var(--cream-rgb)/0.16)] hover:border-[rgb(var(--cream-rgb)/0.34)] rounded-sm hover:bg-card-soft-hover hover:shadow-[0_0_0_1px_rgb(var(--gold-rgb)_/_0.16)_inset,0_24px_48px_rgb(0_0_0_/_0.3)] transform-gpu"
      onMouseMove={handleMouseMove}
      style={{
        "--gx": "50%",
        "--gy": "50%",
        boxShadow: isComingSoon
          ? "0 24px 46px rgb(0 0 0 / 0.2), 0 0 0 1px rgb(var(--cream-rgb) / 0.05) inset"
          : "0 26px 56px rgb(0 0 0 / 0.24), 0 0 0 1px rgb(var(--cream-rgb) / 0.06) inset",
      } as React.CSSProperties}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[400ms] group-hover:opacity-100 opacity-0"
        style={{ background: "radial-gradient(circle at var(--gx) var(--gy), rgb(var(--gold-rgb) / 0.06) 0%, transparent 58%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgb(var(--surface-3-rgb) / 0.2), transparent 42%, rgb(var(--ink-rgb) / 0.18) 100%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none rounded-sm opacity-25 group-hover:opacity-40 transition-opacity duration-300"
        style={{ background: "linear-gradient(140deg, rgb(var(--gold-rgb) / 0.09), transparent 30%, transparent 72%, rgb(var(--gold-rgb) / 0.07))" }}
      />
      <div className="absolute left-0 top-0 h-8 w-px bg-gold/45" />
      <div className="absolute left-0 top-0 h-px w-8 bg-gold/45" />
      <div className="absolute right-0 bottom-0 h-8 w-px bg-gold/45" />
      <div className="absolute right-0 bottom-0 h-px w-8 bg-gold/45" />

      <div
        className="absolute top-0 right-8 h-px w-16 transition-all duration-300 group-hover:w-24"
        style={{ background: TYPE_COLORS[item.type] || "rgb(var(--gold-rgb))" }}
      />
      <div className="absolute left-8 right-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[rgb(var(--cream-rgb)/0.14)] to-transparent pointer-events-none" />

      <div className="flex items-start justify-between mb-6">
        <div
          className="w-12 h-12 flex items-center justify-center text-gold transition-all duration-300 group-hover:scale-105 border border-[rgb(var(--cream-rgb)/0.24)]"
          style={{ background: "linear-gradient(160deg, rgb(var(--gold-rgb) / 0.14), rgb(var(--gold-rgb) / 0.06))" }}
        >
          <Icon size={20} strokeWidth={1.8} />
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--cream-rgb)/0.03)]">
            <div
              className="eco-status-dot w-1.5 h-1.5 rounded-full transition-all duration-300 group-hover:shadow-[0_0_8px_rgb(var(--gold-rgb)_/_0.5)]"
              style={{
                background: STATUS_COLORS[item.status],
                boxShadow: "none",
                animation: "status-pulse 2.4s ease-in-out infinite",
              }}
            />
            <span className="font-rajdhani font-semibold text-[12px] tracking-[2.6px] uppercase transition-all duration-300 group-hover:drop-shadow-[0_0_7px_rgb(var(--gold-rgb)_/_0.32)]" style={{ color: STATUS_COLORS[item.status] }}>
              {STATUS_LABELS[item.status]}
            </span>
          </div>
        </div>
      </div>

      <h3
        className="font-cinzel text-[34px] sm:text-[44px] leading-[1.08] text-cream mb-3 pb-[0.08em] transition-colors duration-300 group-hover:text-gradient-gold"
        style={{ fontFeatureSettings: "'liga' 0, 'calt' 0" }}
      >
        <span>{titleMain}</span>
        {titleSecondary && <span className="ml-[0.58em]">{titleSecondary}</span>}
      </h3>
      {item.subtitle && (
        <div className="font-rajdhani text-[14px] sm:text-[16px] tracking-[3.8px] uppercase text-gold/75 mb-5">
          {item.subtitle}
        </div>
      )}
      {item.desc && (
        <p className="font-cormorant text-[18px] sm:text-[17px] text-cream/80 leading-[1.72] sm:leading-[1.65] max-w-[52ch] mb-6">
          {item.desc}
        </p>
      )}

      {ctaHref && (
        <div className="mt-auto pt-4 flex justify-end">
          <a
            href={ctaHref}
            target={isInternalHref ? undefined : "_blank"}
            rel={isInternalHref ? undefined : "noreferrer"}
            className="inline-flex items-center justify-center min-w-[186px] font-rajdhani text-[12px] tracking-[3.5px] uppercase text-cream/90 bg-[linear-gradient(90deg,rgb(var(--gold-rgb)/0.06),rgb(var(--gold-rgb)/0.02))] bg-[length:0%_100%] bg-left bg-no-repeat border border-[rgb(var(--cream-rgb)/0.24)] px-6 py-3 hover:bg-[length:100%_100%] hover:text-gold-light hover:border-[rgb(var(--cream-rgb)/0.42)] hover:shadow-[0_0_18px_rgb(var(--gold-rgb)_/_0.14),0_0_0_1px_rgb(var(--gold-rgb)_/_0.12)_inset] transition-all duration-300"
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </div>
  )
}

export default function Ecosystem() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>("200px 0px")
  const headingRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const [filter, setFilter] = useState<string>("all")
  const [items, setItems] = useState(ECOSYSTEM_ITEMS)
  const prefersReduced = !!useReducedMotion()

  const types = ["all", ...Array.from(new Set(items.map((i) => i.type)))]
  const filtered = (filter === "all" ? items : items.filter((i) => i.type === filter)).sort(
    (a, b) => a.order_index - b.order_index,
  )
  const studioItems = projects.map((project) => ({ status: project.status }))
  const labItems = LAB_PRODUCTS.map((product) => ({ status: product.status }))
  const allItems = [...studioItems, ...labItems]

  const isLive = (status: string) => status.toLowerCase().includes("live")
  const isInDev = (status: string) => status.toLowerCase().includes("in dev")
  const isPlanned = (status: string) =>
    status.toLowerCase().includes("planned") || status.toLowerCase().includes("concept") || status.toLowerCase().includes("coming")

  const stats = [
    { label: "Total Items", val: allItems.length },
    { label: "Live", val: allItems.filter((item) => isLive(item.status)).length },
    { label: "In Dev", val: allItems.filter((item) => isInDev(item.status)).length },
    { label: "Planned", val: allItems.filter((item) => isPlanned(item.status)).length },
  ]

  useEffect(() => {
    const load = async () => {
      if (!SUPABASE_ENABLED) return
      try {
        const supabase = await getSupabaseClient()
        if (!supabase) return
        const { data, error } = await supabase.from("ecosystem").select("*").order("order_index", { ascending: true })
        if (error || !data?.length) return
        const mapped = data.map((row: any) => ({
          id: String(row.id),
          type: row.type ?? "app",
          title: row.title ?? "",
          subtitle: row.subtitle ?? "",
          desc: row.desc ?? "",
          icon: row.icon ?? "*",
          color: row.color ?? "rgb(var(--gold-rgb))",
          status: row.status ?? "concept",
          link: row.link ?? null,
          tags: Array.isArray(row.tags) ? row.tags : [],
          featured: !!row.featured,
          order_index: Number(row.order_index ?? 0),
        }))
        setItems(mapped)
      } catch {
        // no-op fallback to static data
      }
    }
    load()
  }, [])

  return (
    <section id="ecosystem" ref={sectionRef} className="cv-auto min-h-screen flex items-center py-[96px] px-4 sm:px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgb(var(--gold-rgb)/0.04),transparent_45%)]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 52% 36% at 50% 48%, rgb(var(--gold-rgb) / 0.03) 0%, transparent 72%)" }}
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-[0.012] -translate-x-1/4">
        <div ref={orbitRef} className="absolute inset-0 rounded-full orbit-spin" style={{ boxShadow: "inset 0 0 0 1px rgb(var(--gold-rgb) / 0.2)" }} />
        <div className="absolute inset-[15%] rounded-full" style={{ boxShadow: "inset 0 0 0 1px rgb(var(--gold-rgb) / 0.14)" }} />
        <div className="absolute inset-[30%] rounded-full" style={{ boxShadow: "inset 0 0 0 1px rgb(var(--gold-rgb) / 0.18)" }} />
      </div>

      <div className="max-w-7xl mx-auto w-full relative">
        <div ref={headingRef} className={`reveal ${isInView ? "in-view" : ""} mb-5 sm:mb-6 md:mb-8`} style={{ animationDelay: "0.1s" }}>
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <span className="w-1 h-1 rounded-full bg-gold/85" />
            <div className="font-rajdhani text-[12px] sm:text-[13px] tracking-[4px] sm:tracking-[6px] text-gold/78 uppercase">Ecosystem</div>
            <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          </div>
          <h2 className="font-cinzel font-black text-gradient-gold leading-[1.02] tracking-[0.01em] text-[clamp(32px,9vw,52px)] sm:text-[clamp(38px,5.2vw,68px)] mb-4">
            <span className="text-cream">The</span>{" "}
            <span className="bg-[linear-gradient(135deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb)))] bg-clip-text text-transparent">Universe</span>
          </h2>
          <div ref={dividerRef} className={`reveal-line ${isInView ? "in-view" : ""} w-16 sm:w-20 h-px bg-gradient-to-r from-gold/80 to-transparent`} style={{ animationDelay: "0.22s" }} />
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-10">
          {types.map((type, idx) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              aria-pressed={filter === type}
              aria-label={`Filter ${type.replace("_", " ")}`}
              className={`eco-filter reveal ${isInView ? "in-view" : ""} font-rajdhani text-[11px] sm:text-[12px] tracking-[2.8px] uppercase px-3.5 sm:px-4 py-2 rounded-sm transition-all duration-300 border hover:text-cream/88 hover:border-[rgb(var(--cream-rgb)/0.3)] hover:bg-[rgb(var(--cream-rgb)/0.04)]`}
              style={{
                color: filter === type ? "rgb(var(--cream-rgb) / 0.92)" : "rgb(var(--cream-rgb) / 0.5)",
                background: filter === type ? "rgb(var(--cream-rgb) / 0.05)" : "rgb(var(--cream-rgb) / 0.015)",
                borderColor: filter === type ? "rgb(var(--cream-rgb) / 0.34)" : "rgb(var(--cream-rgb) / 0.16)",
                boxShadow: filter === type ? "0 0 0 1px rgb(var(--gold-rgb) / 0.16) inset, 0 0 18px rgb(var(--gold-rgb) / 0.12)" : "none",
                animationDelay: `${0.2 + idx * 0.06}s`,
              }}
            >
              {type === "all" ? "All" : type.replace("_", " ")}
            </button>
          ))}
        </div>

        <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {filtered.map((item) => (
            <StaggerItem key={item.id}>
              <EcoCard item={item} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 sm:mt-12 pt-8 sm:pt-10 border-t border-[rgb(var(--cream-rgb)/0.1)] grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {stats.map((stat, idx) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.val}
              delay={`${0.4 + idx * 0.08}s`}
              reducedMotion={prefersReduced}
              inView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
