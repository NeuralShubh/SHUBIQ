"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import StudioNavbar from "./StudioNavbar"
import Footer from "../components/Footer"
import GoldLine from "../components/GoldLine"
import { DEFAULT_STUDIO_CONTENT, type StudioContent } from "./studioContent"
import { SUPABASE_ENABLED, supabase } from "../lib/supabase"
import {
  Code2,
  LayoutDashboard,
  Bot,
  Smartphone,
  Globe,
  Layers,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
} from "lucide-react"

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STUDIO_SERVICES = [
  {
    icon: Code2,
    title: "High-Performance Web Platforms",
    tag: "Core",
    desc: "Engineered for speed and scale, high-performance platforms built to convert, scale, and dominate competitive markets.",
    features: ["Modern frontend architecture", "Secure backend infrastructure", "Performance-first engineering"],
  },
  {
    icon: LayoutDashboard,
    title: "Custom Software Architecture",
    tag: "Agency",
    desc: "Designed to solve complex operational challenges with scalable, data-driven architecture aligned to business execution.",
    features: ["Scalable system design", "Data-driven infrastructure", "Secure access control"],
  },
  {
    icon: Bot,
    title: "Applied AI Systems",
    tag: "Intelligence",
    desc: "Integrated AI systems and intelligent automation unlock measurable efficiency and strategic advantage.",
    features: ["AI workflow integration", "Smart data pipelines", "Intelligent automation systems"],
  },
  {
    icon: Smartphone,
    title: "Scalable Application Systems",
    tag: "Product",
    desc: "Production-grade application systems engineered for long-term scalability and performance resilience.",
    features: ["Web & mobile platforms", "Optimized performance", "Deployment & lifecycle support"],
  },
  {
    icon: Globe,
    title: "Digital Brand Infrastructure",
    tag: "Growth",
    desc: "Structured digital ecosystems convert attention into authority, trust, and sustainable growth.",
    features: ["Conversion-focused landing systems", "Portfolio & brand platforms", "Analytics & optimization"],
  },
  {
    icon: Layers,
    title: "Design & Component Architecture",
    tag: "Foundation",
    desc: "Structured design systems and component architecture ensuring speed, consistency, and scalable product growth.",
    features: ["Component libraries", "Design token systems", "Documentation & governance"],
  },
]

type StudioPortfolioProject = {
  id?: string
  name: string
  tag: string
  desc: string
  impact: string
  tech: string[]
  link: string
  status: "live" | "wip" | "concept"
  metric: string
}


const PORTFOLIO: StudioPortfolioProject[] = [
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
const STUDIO_SERVICE_ICON_MAP = {
  code: Code2,
  layout: LayoutDashboard,
  bot: Bot,
  phone: Smartphone,
  globe: Globe,
  layers: Layers,
} as const

type StudioService = {
  iconKey: keyof typeof STUDIO_SERVICE_ICON_MAP
  title: string
  tag: string
  desc: string
  features: string[]
}

const DEFAULT_STUDIO_SERVICES: StudioService[] = [
  {
    iconKey: "code",
    title: "High-Performance Web Platforms",
    tag: "Core",
    desc: "Engineered for speed and scale, high-performance platforms built to convert, scale, and dominate competitive markets.",
    features: ["Modern frontend architecture", "Secure backend infrastructure", "Performance-first engineering"],
  },
  {
    iconKey: "layout",
    title: "Custom Software Architecture",
    tag: "Agency",
    desc: "Designed to solve complex operational challenges with scalable, data-driven architecture aligned to business execution.",
    features: ["Scalable system design", "Data-driven infrastructure", "Secure access control"],
  },
  {
    iconKey: "bot",
    title: "Applied AI Systems",
    tag: "Intelligence",
    desc: "Integrated AI systems and intelligent automation unlock measurable efficiency and strategic advantage.",
    features: ["AI workflow integration", "Smart data pipelines", "Intelligent automation systems"],
  },
  {
    iconKey: "phone",
    title: "Scalable Application Systems",
    tag: "Product",
    desc: "Production-grade application systems engineered for long-term scalability and performance resilience.",
    features: ["Web & mobile platforms", "Optimized performance", "Deployment & lifecycle support"],
  },
  {
    iconKey: "globe",
    title: "Digital Brand Infrastructure",
    tag: "Growth",
    desc: "Structured digital ecosystems convert attention into authority, trust, and sustainable growth.",
    features: ["Conversion-focused landing systems", "Portfolio & brand platforms", "Analytics & optimization"],
  },
  {
    iconKey: "layers",
    title: "Design & Component Architecture",
    tag: "Foundation",
    desc: "Structured design systems and component architecture ensuring speed, consistency, and scalable product growth.",
    features: ["Component libraries", "Design token systems", "Documentation & governance"],
  },
]

const PRICING_ICON_MAP = {
  zap: Zap,
  trending: TrendingUp,
  shield: Shield,
} as const

// â”€â”€â”€ Section Label â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function SectionLabel({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 mb-5 ${centered ? "justify-center" : ""}`}>
      <span className="w-1 h-1 rounded-full bg-gold/80" />
      <div className="font-rajdhani text-[12px] sm:text-[14px] tracking-[4px] sm:tracking-[7px] text-gold/85 uppercase">{label}</div>
    </div>
  )
}

// â”€â”€â”€ Hero Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StudioHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const authorityRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        const titleLines = titleRef.current?.querySelectorAll<HTMLElement>(".hero-title-line") ?? []
        const ctaItems = ctaRef.current?.children ?? []
        const statItems = statsRef.current?.children ?? []

        const tl = gsap.timeline({ delay: 0.12 })
        tl.fromTo(
          titleLines,
          { yPercent: 105 },
          { yPercent: 0, duration: 0.9, ease: "power2.out", stagger: 0.08 },
          0,
        )
          .fromTo(
            bodyRef.current,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.24,
          )
          .fromTo(
            ctaItems,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.1 },
            0.42,
          )
          .fromTo(
            authorityRef.current,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
            0.6,
          )
          .fromTo(
            statItems,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.12 },
            0.72,
          )

        if (titleRef.current) {
          gsap.to(titleRef.current, {
            y: -2,
            duration: 7,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          })
        }

        if (gridRef.current) {
          gsap.to(gridRef.current, {
            yPercent: -3,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.8,
            },
          })
        }
      } catch {
        // no-op
      }
    }

    init()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={sectionRef}
      id="studio-hero"
      className="relative min-h-[100vh] max-md:min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-5 sm:px-6 pt-16 max-md:pt-[5.25rem] md:pt-[4.5rem] pb-12 max-md:pb-10 md:pb-14"
    >
      <div
        ref={gridRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--gold-rgb) / 0.022) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--gold-rgb) / 0.022) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 56%, rgb(0 0 0 / 0.22) 100%)",
        }}
      />

      <div className="relative z-10 text-center max-w-[54rem] max-md:max-w-[34rem] mx-auto">
        <div className="inline-flex items-center gap-2.5 border border-gold/14 bg-gold/[0.025] px-4 max-md:px-3.5 py-2 mb-7 max-md:mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/65" />
          <span className="font-rajdhani text-[10px] sm:text-[12px] tracking-[2.5px] sm:tracking-[4px] uppercase text-gold/66">SHUBIQ Studio - Digital Engineering</span>
        </div>

        <h1
          ref={titleRef}
          className="font-cinzel font-black leading-[1.06] max-md:leading-[1.04] mb-7 max-md:mb-5"
        >
          <span className="block overflow-hidden mb-2.5">
            <span className="hero-title-line inline-block text-[clamp(32px,7vw,84px)] tracking-[1.2px] sm:tracking-[2.2px] md:tracking-[2.6px] text-cream/95">Digital Systems.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-title-line inline-block text-[clamp(27px,5.7vw,68px)] tracking-[0.8px] sm:tracking-[1.3px] md:tracking-[1.5px] text-cream/94">
              <span className="text-gold/88">Engineered</span> to Win.
            </span>
          </span>
        </h1>

        <p
          ref={bodyRef}
          className="font-cormorant text-cream/80 leading-[1.75] sm:leading-[1.86] max-w-[610px] mx-auto mb-10 max-md:mb-8 px-1 sm:px-2"
          style={{ fontSize: "clamp(15px, 1.34vw, 19px)", opacity: 0 }}
        >
          SHUBIQ Studio partners with founders and brands to design and engineer high-performance digital systems built for scale, speed, and long-term competitive advantage.
        </p>

        <div ref={ctaRef} className="flex max-sm:flex-col gap-4 sm:gap-5 justify-center flex-wrap mb-12 max-md:mb-9 max-sm:w-full max-sm:max-w-[22rem] max-sm:mx-auto">
          <button
            onClick={() => scrollTo("studio-pricing")}
            className="font-rajdhani text-[13px] sm:text-[14px] tracking-[2.6px] sm:tracking-[3px] uppercase px-8 sm:px-11 py-[10px] font-semibold bg-gold text-ink border border-gold/70 md:hover:bg-gold-light md:hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)] transition-all duration-300 max-sm:w-full"
          >
            View Pricing
          </button>
          <button
            onClick={() => scrollTo("studio-contact-anchor")}
            className="font-rajdhani text-[13px] sm:text-[14px] tracking-[2.6px] sm:tracking-[3px] uppercase px-8 sm:px-11 py-[10px] font-semibold border border-gold/24 text-cream md:hover:border-gold/72 md:hover:bg-gold/[0.04] transition-all duration-300 max-sm:w-full"
          >
            Start a Project
          </button>
        </div>

        <div ref={authorityRef} className="mt-0 mb-14 max-md:mb-9" style={{ opacity: 0.9 }}>
          <p className="font-rajdhani text-[8px] sm:text-[9px] tracking-[4.3px] uppercase text-gold/40 mb-3">
            ENGINEERING DISCIPLINES
          </p>
          <div className="flex items-center justify-center flex-wrap gap-x-2.5 sm:gap-x-3.5 gap-y-2">
            {["ARCHITECTURE", "INFRASTRUCTURE", "INTELLIGENCE", "PERFORMANCE"].map((item, index) => (
              <div key={item} className="flex items-center">
                {index > 0 && <span className="w-[1px] h-3 bg-gold/20 mr-2.5 sm:mr-3.5" />}
                <span className="font-rajdhani text-[8px] sm:text-[10px] tracking-[2px] sm:tracking-[3px] uppercase text-gold/54">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[760px] mx-auto h-px bg-[rgb(var(--gold-rgb)/0.1)]" />
        <div
          ref={statsRef}
          className="pt-7 max-md:pt-6 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-9 max-w-[760px] mx-auto"
        >
          {[
            { val: "10+", label: "Production Systems" },
            { val: "3+", label: "Years Engineering" },
            { val: "Precision-Driven", label: "Delivery" },
          ].map((s) => (
            <div key={s.label} className="text-center min-h-[72px] flex flex-col items-center justify-start">
              <div className="font-cinzel font-black text-gold/88 leading-none" style={{ fontSize: "clamp(24px, 3.35vw, 34px)" }}>{s.val}</div>
              <div className="font-rajdhani text-[9px] tracking-[2.1px] uppercase text-cream/44 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
        <div className="w-px h-10 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-gold to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  )
}
function StudioServices() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [services, setServices] = useState<StudioService[]>(DEFAULT_STUDIO_SERVICES)

  useEffect(() => {
    const load = async () => {
      if (!SUPABASE_ENABLED) return
      try {
        const { data, error } = await supabase.from("studio_services").select("*").order("order_index", { ascending: true })
        if (error || !data?.length) return
        setServices(data.map((row: any) => ({
          iconKey: (row.icon_key ?? "code") as StudioService["iconKey"],
          title: row.title ?? "",
          tag: row.tag ?? "",
          desc: row.desc ?? "",
          features: Array.isArray(row.features) ? row.features : [],
        })))
      } catch {
        // no-op fallback to defaults
      }
    }
    load()
  }, [])

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)
        const isMobile = window.innerWidth <= 768
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: isMobile ? "top 82%" : "top 72%", once: true },
        })
        tl.fromTo(headingRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out" })
          .fromTo(
            gridRef.current?.children ?? [],
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.08 },
            "-=0.3",
          )
      } catch { /* no-op */ }
    }
    init()
  }, [])

  return (
    <section id="studio-services-section" ref={sectionRef} className="py-[96px] max-md:py-16 max-sm:py-14 px-5 max-sm:px-3.5 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 38%, rgb(var(--gold-rgb) / 0.055) 0%, transparent 62%)",
          mixBlendMode: "soft-light",
        }}
      />
      <div
        className="absolute right-0 top-1/3 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.03) 0%, transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} style={{ opacity: 0 }}>
          <SectionLabel label="Services" centered />
          <div className="flex flex-col items-center gap-4 max-md:gap-3 mb-8 max-md:mb-6 sm:mb-10 text-center">
            <h2
              className="font-cinzel font-black leading-[0.92] tracking-[0.5px] max-md:leading-[0.96]"
              style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}
            >
              <span className="text-cream/90">Systems We </span>
              <span className="text-gold">Engineer</span>
            </h2>
          </div>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4.5 max-sm:gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = STUDIO_SERVICE_ICON_MAP[service.iconKey] ?? Code2
            const slug = service.title
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
            return (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                Icon={Icon}
                isDimmed={hoveredCard !== null && hoveredCard !== index}
                onHoverChange={(active) => setHoveredCard(active ? index : null)}
                anchorId={`service-${slug}`}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
  Icon,
  isDimmed,
  onHoverChange,
  anchorId,
}: {
  service: StudioService
  index: number
  Icon: React.ElementType
  isDimmed: boolean
  onHoverChange: (active: boolean) => void
  anchorId: string
}) {
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current
    const card = e.currentTarget
    if (!card || !glow) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgb(var(--gold-rgb) / 0.1) 0%, transparent 62%)`
    glow.style.opacity = "1"
  }

  const handleMouseLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0"
    onHoverChange(false)
  }

  const handleMouseEnter = () => {
    onHoverChange(true)
  }

  return (
    <article
      id={anchorId}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`service-card group relative p-5.5 max-sm:p-4 sm:p-7 border bg-card-soft hover:bg-card-soft-hover transform-gpu transition-[transform,border-color,background-color,box-shadow,opacity,filter] duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:rounded-[20px] ${
        isDimmed
          ? "opacity-[0.85] saturate-[0.92]"
          : "opacity-100 saturate-100"
      } border-[rgb(var(--cream-rgb)/0.14)] hover:border-[rgb(var(--gold-rgb)/0.34)] hover:-translate-y-1 hover:scale-[1.01] max-md:hover:translate-y-0 max-md:hover:scale-100`}
      style={{
        willChange: "transform, opacity, filter",
        boxShadow: "0 10px 24px rgb(0 0 0 / 0.18), 0 0 0 1px rgb(var(--cream-rgb) / 0.05) inset",
      }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-6 sm:mb-6 max-md:items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-rajdhani text-[9px] sm:text-[11px] tracking-[1.5px] sm:tracking-[2px] uppercase text-gold/65">{`0${index + 1}`}</span>
            <span className="w-9 h-9 max-sm:w-7.5 max-sm:h-7.5 border border-gold/40 bg-gold/[0.07] flex items-center justify-center text-gold/90">
              <Icon size={15} strokeWidth={1.8} />
            </span>
          </div>
          <span
            className="font-rajdhani text-[11px] max-sm:text-[9px] tracking-[2px] max-sm:tracking-[1.2px] uppercase text-gold/80 border px-2.5 max-sm:px-1.5 py-1 max-sm:py-[3px] bg-gold/[0.05]"
            style={{ borderColor: "rgb(var(--gold-rgb) / 0.4)" }}
          >
            {service.tag}
          </span>
        </div>

        <h3 className="font-cinzel font-bold text-cream/93 mb-4 sm:mb-4 tracking-[0.2px] sm:tracking-[0.4px] leading-[1.16] max-sm:leading-[1.14] transition-[letter-spacing] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[0.9px]" style={{ fontSize: "clamp(16.8px, 1.5vw, 21px)" }}>
          {service.title}
        </h3>

        <p className="font-cormorant text-cream/74 leading-[1.6] sm:leading-[1.7] mb-6 sm:mb-6 flex-1 transition-opacity duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-cream/78" style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}>
          {service.desc}
        </p>

        <div className="h-px w-full bg-[rgb(var(--gold-rgb)/0.16)] transition-[background-color] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[rgb(var(--gold-rgb)/0.28)]" />
        <ul className="space-y-3 sm:space-y-2 pt-5 sm:pt-5">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-2 sm:gap-2.5">
              <CheckCircle2 size={12} className="text-gold/60 shrink-0 mt-[2px]" strokeWidth={2} />
              <span className="font-rajdhani text-[12px] sm:text-[12px] tracking-[0.35px] sm:tracking-[0.9px] text-cream/86 uppercase max-sm:normal-case leading-[1.35]">
                {f}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

// â”€â”€â”€ Portfolio Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StudioPortfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const [portfolioProjects, setPortfolioProjects] = useState<StudioPortfolioProject[]>(PORTFOLIO)

  useEffect(() => {
    const load = async () => {
      if (!SUPABASE_ENABLED) return
      try {
        const { data, error } = await supabase.from("studio_portfolio").select("*").order("order_index", { ascending: true })
        if (error || !data?.length) return
        setPortfolioProjects(data.map((row: any) => ({
          id: String(row.id),
          name: row.name ?? "",
          tag: row.tag ?? "",
          desc: row.desc ?? "",
          impact: row.impact ?? "",
          tech: Array.isArray(row.tech) ? row.tech : [],
          link: row.link ?? "",
          status: (row.status ?? "live") as StudioPortfolioProject["status"],
          metric: row.metric ?? "",
        })))
      } catch {
        // no-op fallback to defaults
      }
    }
    load()
  }, [])

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)
        const isMobile = window.innerWidth <= 768
        gsap.fromTo(headingRef.current, { y: 24, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: isMobile ? "top 82%" : "top 72%", once: true },
        })
        gsap.fromTo(
          cardsRef.current?.children ?? [],
          { y: 32, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.65, ease: "power3.out", stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current, start: isMobile ? "top 82%" : "top 72%", once: true },
          },
        )
      } catch { /* no-op */ }
    }
    init()
  }, [])

  return (
    <section id="studio-portfolio" ref={sectionRef} className="py-[96px] max-md:py-16 px-5 sm:px-6 relative overflow-hidden">
      <div
        className="absolute left-0 top-1/2 w-72 h-72 rounded-full pointer-events-none hidden md:block"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.03) 0%, transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} style={{ opacity: 0 }}>
          <SectionLabel label="Portfolio" centered />
          <div className="flex flex-col items-center gap-4 mb-8 sm:mb-10 text-center">
            <h2
              className="font-cinzel font-black leading-[0.92] tracking-[0.5px]"
              style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}
            >
              <span className="text-cream/90">Engineered </span>
              <span className="text-gold">Systems</span>
            </h2>
          </div>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 gap-6 sm:gap-6">
          {portfolioProjects.map((project, index) => (
            <ProjectCard key={`${project.name}-${index}`} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: StudioPortfolioProject; index: number }) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    card.style.transform = `perspective(980px) rotateX(${-dy * 4.4}deg) rotateY(${dx * 4.4}deg) translateY(-4px)`
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgb(var(--gold-rgb) / 0.08) 0%, transparent 62%)`
    glow.style.opacity = "1"
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = "perspective(980px) rotateX(0deg) rotateY(0deg) translateY(0px)"
      cardRef.current.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)"
    }
    if (glowRef.current) glowRef.current.style.opacity = "0"
  }

  const handleMouseEnter = () => {
    if (cardRef.current) cardRef.current.style.transition = "transform 0.14s ease"
  }

  return (
    <a
      ref={cardRef}
      href={project.link}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="project-card group relative block p-5 max-sm:p-5 sm:p-9 border border-[rgb(var(--cream-rgb)/0.12)] bg-card-soft hover:bg-card-soft-hover hover:border-gold/35 transition-[transform,border-color,background-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] max-md:rounded-[20px] max-md:hover:translate-y-0 max-md:hover:scale-100 max-md:cursor-default"
      style={{ willChange: "transform", boxShadow: "0 12px 28px rgb(0 0 0 / 0.2), 0 0 0 1px rgb(var(--cream-rgb) / 0.05) inset" }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="flex items-center justify-between mb-5 sm:mb-5">
        <span className="font-rajdhani text-[10px] sm:text-[11px] tracking-[2px] sm:tracking-[2.5px] uppercase text-cream/55">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="font-rajdhani text-[9.5px] sm:text-[11px] tracking-[1.5px] sm:tracking-[2.5px] uppercase border px-2 max-sm:px-1.5 py-[3px] sm:px-2.5 sm:py-1"
          style={{
            color: project.status === "live" ? "rgb(var(--gold-rgb) / 0.86)" : "rgb(var(--gold-rgb) / 0.75)",
            borderColor: project.status === "live" ? "rgb(var(--gold-rgb) / 0.45)" : "rgb(var(--gold-rgb) / 0.3)",
            background: project.status === "live" ? "rgb(var(--gold-rgb) / 0.08)" : "rgb(var(--gold-rgb) / 0.04)",
          }}
        >
          {project.status === "live"
            ? "LIVE"
            : project.status === "wip"
              ? "IN DEVELOPMENT"
              : "COMING SOON"}
        </span>
      </div>

      <div className="h-px w-full bg-[rgb(var(--gold-rgb)/0.22)] shadow-[0_0_8px_rgb(var(--gold-rgb)_/_0.08)] mb-5 sm:mb-6" />

      <div className="mb-2.5 sm:mb-2">
        <h3
          className="font-cinzel font-bold text-cream/93 tracking-[0.4px] group-hover:text-gold transition-colors duration-300"
          style={{ fontSize: "clamp(18px, 1.6vw, 23px)" }}
        >
          {project.name}
        </h3>
      </div>

      <div className="font-rajdhani text-[10px] sm:text-[11px] tracking-[1.4px] sm:tracking-[2px] uppercase text-gold/60 mb-3.5 sm:mb-3">{project.tag}</div>

      <p className="font-cormorant text-cream/76 leading-[1.56] sm:leading-[1.7] mb-5 sm:mb-6" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
        {project.desc}
      </p>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/14 to-transparent mb-4 sm:mb-0" />
      <div className="mb-5 border-l border-gold/28 pl-3 max-sm:border-l-0 max-sm:pl-0">
        <div className="font-rajdhani text-[10px] sm:text-[11px] font-semibold tracking-[1.8px] sm:tracking-[2.4px] uppercase text-gold/88 mb-1">Impact</div>
        <p className="font-cormorant text-cream/90 leading-[1.52]" style={{ fontSize: "clamp(14.5px, 1.05vw, 15.5px)" }}>
          {project.impact}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 sm:gap-2 pt-4 border-t border-gold/12">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-rajdhani text-[10px] sm:text-[10px] tracking-[1.1px] sm:tracking-[1.5px] uppercase text-cream/72 border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.6)] px-2.5 sm:px-2.5 py-1"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  )
}

// â”€â”€â”€ Pricing Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StudioPricing({ content }: { content: StudioContent }) {
  const scrollToContact = () => document.getElementById("studio-contact-anchor")?.scrollIntoView({ behavior: "smooth" })
  const pricingPlans = content.plans?.length ? content.plans : DEFAULT_STUDIO_CONTENT.plans

  return (
    <section id="studio-pricing" className="py-[96px] max-md:py-16 max-sm:py-14 px-5 max-sm:px-3.5 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgb(var(--gold-rgb) / 0.04) 0%, transparent 65%)" }}
      />
      <div className="max-w-[1180px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionLabel label={content.pricingSectionLabel} centered />
          <div className="text-center mb-8 sm:mb-12">
            <h2
              className="font-cinzel font-black leading-[0.92] tracking-[0.5px] mb-4"
              style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}
            >
              <span className="text-cream/90">{content.pricingHeadingPrefix} </span>
              <span className="text-gold">{content.pricingHeadingAccent}</span>
            </h2>
            <p className="font-cormorant text-cream/88 leading-[1.58] sm:leading-[1.62] max-w-[700px] mx-auto mb-4 sm:mb-5" style={{ fontSize: "clamp(15px, 1.1vw, 18px)" }}>
              {content.pricingDescription}
            </p>
            <div className="font-rajdhani text-[10px] sm:text-[11px] tracking-[2.8px] sm:tracking-[3.6px] uppercase text-gold/55">
              {content.pricingMicroLabel}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="visible"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:[grid-template-columns:1.03fr_1.08fr_1.03fr] gap-5 max-sm:gap-4.5 sm:gap-7 items-center"
        >
          {pricingPlans.map((plan) => {
            const Icon = PRICING_ICON_MAP[plan.icon] ?? TrendingUp
            return (
              <motion.article
                key={plan.id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`group relative flex flex-col rounded-[22px] sm:rounded-[28px] p-5 max-sm:p-4.5 sm:px-9 sm:py-9 border opacity-95 overflow-visible duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] transition-[transform,border-color,box-shadow,color] hover:border-gold/65 hover:shadow-[0_20px_50px_rgba(40,90,255,0.12)] max-md:hover:translate-y-0 max-md:hover:scale-100 ${
                  plan.highlighted
                    ? "md:scale-[1.03] md:min-h-[690px] pt-7 sm:pt-[54px] pb-6 sm:pb-[44px] opacity-100 border-gold/32 bg-gradient-to-b from-[rgb(var(--surface-2-rgb)/0.98)] to-[rgb(var(--surface-1-rgb)/0.95)] shadow-[0_14px_34px_rgb(var(--gold-rgb)/0.10)]"
                    : "border-[rgb(var(--cream-rgb)/0.12)] bg-[linear-gradient(180deg,#11192d_0%,#0c1425_100%)]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 sm:px-4 py-1 rounded-full bg-gold text-ink font-rajdhani text-[9.5px] sm:text-[11px] tracking-[1.4px] sm:tracking-[2px] uppercase font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="flex items-start justify-between mb-3.5 sm:mb-4">
                  <div>
                    <div className="font-cormorant text-[10px] sm:text-[12px] tracking-[2px] sm:tracking-[3px] uppercase text-gold/76 mb-1.5 sm:mb-2">{plan.tag}</div>
                    <p className={`font-cormorant ${plan.highlighted ? "text-cream/92" : "text-cream/80"} leading-[1.4]`} style={{ fontSize: "clamp(14px, 0.95vw, 16.5px)" }}>
                      {plan.bestFor}
                    </p>
                  </div>
                  <span className={`w-9 h-9 sm:w-10 sm:h-10 border flex items-center justify-center ${plan.highlighted ? "border-gold/45 bg-gold/[0.12] text-gold" : "border-gold/35 bg-gold/[0.08] text-gold/85"}`}>
                    <Icon size={16} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="mb-3.5 sm:mb-4">
                  <div className="flex items-end gap-1.5 min-h-[62px] sm:min-h-[80px]">
                    <span className="font-cinzel font-bold text-[2.25rem] sm:text-5xl leading-[0.94] text-gold">
                      <span className="inline-block align-top text-[0.8em]">₹</span>
                      {plan.price.toLocaleString("en-IN")}{plan.priceSuffix ?? ""}
                    </span>
                  </div>
                  <div className={`font-cormorant text-[12px] sm:text-[13px] tracking-[0.5px] sm:tracking-[0.7px] mt-1 ${plan.highlighted ? "text-cream/84" : "text-cream/76"}`}>{plan.meta}</div>
                </div>

                <div className={`mb-5 sm:mb-7 border-b pb-5 sm:pb-6 ${plan.highlighted ? "border-gold/28" : "border-gold/20"}`} />

                <ul className="space-y-3.5 sm:space-y-5 flex-1 mb-5 sm:mb-6">
                  {plan.features.map((f, index) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.35 }}
                      className="flex items-start gap-3"
                    >
                      <span className={`w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0 mt-[2px] sm:mt-[3px] ${plan.highlighted ? "bg-gold/16 text-gold" : "bg-gold/12 text-gold/85"}`}>
                        <CheckCircle2 size={14} strokeWidth={2} />
                      </span>
                      <span className={`font-cormorant leading-[1.45] sm:leading-[1.5] ${plan.highlighted ? "text-cream/94" : "text-cream/90"}`} style={{ fontSize: "clamp(14px, 0.92vw, 16px)" }}>
                        {f}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  onClick={scrollToContact}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className={`w-full font-rajdhani text-[11px] sm:text-[13px] tracking-[1.3px] sm:tracking-[1.8px] uppercase py-3.5 font-semibold transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center gap-2 group border rounded-[14px] sm:rounded-2xl ${
                    plan.highlighted
                      ? "text-ink border-gold/70 bg-[linear-gradient(90deg,rgb(var(--gold-rgb))_0%,rgb(255_220_132)_50%,rgb(var(--gold-rgb))_100%)] bg-[length:200%_100%] bg-left md:hover:bg-right md:hover:brightness-105"
                      : "text-cream border-gold/30 bg-[rgb(var(--surface-2-rgb)/0.75)] md:hover:bg-[rgb(var(--surface-2-rgb)/0.95)] md:hover:border-gold/50"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={14} className="translate-x-0 md:group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="mt-8 sm:mt-10 text-center">
          <p className="font-cormorant text-cream/78 leading-[1.55]" style={{ fontSize: "clamp(16px, 1vw, 18px)" }}>
            {content.pricingFooterPrefix}{" "}
            <button onClick={scrollToContact} className="text-gold md:hover:text-gold-light font-semibold transition-colors duration-200">
              {content.pricingFooterCta}
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}

// â”€â”€â”€ Contact CTA Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StudioContactCTA({ content }: { content: StudioContent }) {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: "", email: "", phone: "", project: "", budget: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)
        const isMobile = window.innerWidth <= 768
        gsap.fromTo(contentRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
            scrollTrigger: { trigger: sectionRef.current, start: isMobile ? "top 82%" : "top 75%", once: true },
          })
      } catch { /* no-op */ }
    }
    init()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          message: `[SHUBIQ Studio Inquiry]\nProject: ${form.project}\nBudget: ${form.budget}`,
          source: "studio",
        }),
      })
      if (!res.ok) throw new Error("Failed")
      setSent(true)
      setForm({ name: "", email: "", phone: "", project: "", budget: "" })
    } catch {
      setError("Unable to submit right now. Please try again or email us directly.")
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    "w-full rounded-[10px] sm:rounded-[6px] bg-[rgb(var(--surface-2-rgb)/0.56)] sm:bg-[rgb(var(--surface-1-rgb)/0.82)] border border-[rgb(var(--cream-rgb)/0.16)] sm:border-[rgb(var(--cream-rgb)/0.12)] text-cream/94 font-cormorant text-[16px] sm:text-[17px] px-5 py-3 sm:py-3.5 focus:outline-none focus:border-gold/50 focus:bg-[rgb(var(--surface-2-rgb)/0.9)] focus:shadow-[0_0_0_1px_rgb(var(--gold-rgb)_/_0.12),0_0_10px_rgb(var(--gold-rgb)_/_0.08)] transition-all duration-300 ease-out placeholder:text-cream/44 sm:placeholder:text-cream/32"

  return (
    <section id="studio-contact" ref={sectionRef} className="py-[96px] max-md:py-16 max-sm:py-14 px-5 max-sm:px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 70%, rgb(var(--gold-rgb) / 0.05) 0%, transparent 60%)" }}
      />

      <div className="max-w-4xl mx-auto">
        <div ref={contentRef} style={{ opacity: 0 }}>
          <div id="studio-contact-anchor" className="text-center mb-8 sm:mb-12 scroll-mt-24 sm:scroll-mt-28">
            <SectionLabel label={content.contactSectionLabel} centered />
            <h2
              className="font-cinzel font-black leading-[0.92] max-sm:leading-[0.96] tracking-[0.5px] mb-3.5 sm:mb-4"
              style={{ fontSize: "clamp(28px, 5.5vw, 62px)" }}
            >
              <span className="text-cream/90">{content.contactHeadingPrefix} </span>
              <span className="text-gold">{content.contactHeadingAccent}</span>
            </h2>
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
              <div className="w-1 h-1 rounded-full bg-gold" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
            </div>
            <p className="font-cormorant text-cream/68 leading-[1.52] sm:leading-[1.65] max-w-[500px] mx-auto" style={{ fontSize: "clamp(14px, 1.3vw, 19px)" }}>
              {content.contactDescription}
            </p>
          </div>

          {sent ? (
            <div className="border border-gold/30 bg-gold/[0.06] p-10 text-center">
              <div className="w-12 h-12 border border-gold/40 bg-gold/[0.1] flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={24} className="text-gold" />
              </div>
              <h3 className="font-cinzel font-bold text-gold mb-2" style={{ fontSize: "clamp(20px, 2vw, 26px)" }}>
                Message Received
              </h3>
              <p className="font-cormorant text-cream/70 leading-[1.65]" style={{ fontSize: "clamp(16px, 1.2vw, 18px)" }}>
                We'll review your project and reach out within 24 hours. Talk soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="relative border border-[rgb(var(--cream-rgb)/0.1)] bg-card-soft max-sm:bg-[rgb(var(--surface-2-rgb)/0.58)] p-5.5 max-sm:p-4 sm:p-10 max-md:rounded-[18px] max-sm:rounded-[16px] max-sm:border-[rgb(var(--cream-rgb)/0.12)] max-sm:shadow-[0_12px_28px_rgb(0_0_0_/_0.28)]">
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent hidden sm:block" />

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-3.5 sm:mb-4">
                <div>
                  <label className="block pl-[2px] font-rajdhani text-[11px] sm:text-[12px] tracking-[1.1px] sm:tracking-[3px] uppercase text-gold/78 mb-1.5 sm:mb-2">
                    Your Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Enter your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block pl-[2px] font-rajdhani text-[11px] sm:text-[12px] tracking-[1.1px] sm:tracking-[3px] uppercase text-gold/78 mb-1.5 sm:mb-2">
                    Email Address *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-3.5 sm:mb-4">
                <div>
                  <label className="block pl-[2px] font-rajdhani text-[11px] sm:text-[12px] tracking-[1.1px] sm:tracking-[3px] uppercase text-gold/78 mb-1.5 sm:mb-2">
                    Phone Number *
                  </label>
                  <input
                    required
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block pl-[2px] font-rajdhani text-[11px] sm:text-[12px] tracking-[1.1px] sm:tracking-[3px] uppercase text-gold/78 mb-1.5 sm:mb-2">
                    Estimated Cost
                  </label>
                  <input
                    type="text"
                    value={form.budget}
                    onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                    placeholder="Enter your estimated budget"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mb-6 sm:mb-6">
                <label className="block pl-[2px] font-rajdhani text-[11px] sm:text-[12px] tracking-[1.1px] sm:tracking-[3px] uppercase text-gold/78 mb-1.5 sm:mb-2">
                  Project Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={form.project}
                  onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
                  placeholder="Tell us about your project..."
                  className={`${inputClass} resize-none min-h-[122px] sm:min-h-[150px]`}
                />
              </div>

              {error && (
                <p className="font-rajdhani text-[12px] tracking-[1.5px] text-red-400/80 mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full mt-1 rounded-[10px] sm:rounded-[6px] font-rajdhani text-[12px] sm:text-[13px] tracking-[1.4px] sm:tracking-[3.2px] uppercase border border-gold/70 bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_58%,rgb(var(--gold-dark-rgb)))] text-ink py-3 sm:py-3.5 font-semibold transition-all duration-300 md:hover:bg-gold-light md:hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)] md:hover:brightness-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {sending ? "Sending..." : content.contactSubmitText}
                {!sending && <ArrowRight size={15} />}
              </button>

              <p className="font-rajdhani text-[7.5px] sm:text-[10px] tracking-[0.8px] sm:tracking-[2.5px] uppercase text-cream/55 sm:text-cream/70 text-center mt-3 sm:mt-4">
                {content.contactResponseNote}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

// â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export default function StudioPage() {
  const [studioContent, setStudioContent] = useState<StudioContent>(DEFAULT_STUDIO_CONTENT)

  useEffect(() => {
    const load = async () => {
      if (!SUPABASE_ENABLED) return
      try {
        const { data, error } = await supabase.from("studio_pricing_plans").select("*").order("order_index", { ascending: true })
        if (error || !data?.length) return
        setStudioContent((prev) => ({
          ...prev,
          plans: data.map((row: any) => ({
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
          })),
        }))
      } catch {
        // no-op fallback to defaults
      }
    }
    load()
  }, [])

  return (
    <>
      <StudioNavbar />
      <main>
        <StudioHero />
        <div id="studio-services-anchor" className="block h-0 scroll-mt-20" aria-hidden="true" />
        <GoldLine />
        <StudioServices />
        <div id="studio-portfolio-anchor" className="block h-0 scroll-mt-20" aria-hidden="true" />
        <GoldLine />
        <StudioPortfolio />
        <div id="studio-pricing-anchor" className="block h-0 scroll-mt-20" aria-hidden="true" />
        <GoldLine />
        <StudioPricing content={studioContent} />
        <GoldLine />
        <StudioContactCTA content={studioContent} />
      </main>
      <Footer />
    </>
  )
}




