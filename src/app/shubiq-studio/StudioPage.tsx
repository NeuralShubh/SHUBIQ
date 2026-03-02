"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import StudioNavbar from "./StudioNavbar"
import Footer from "../components/Footer"
import GoldLine from "../components/GoldLine"
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

const PORTFOLIO = [
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

const PRICING = [
  {
    tier: "BASIC",
    tag: "BASIC",
    bestFor: "Best for first-phase businesses",
    price: 19999,
    currency: "INR",
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
    icon: Zap,
  },
  {
    tier: "STANDARD",
    tag: "STANDARD",
    bestFor: "Best for growing local businesses",
    price: 39999,
    currency: "INR",
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
    icon: TrendingUp,
  },
  {
    tier: "PREMIUM",
    tag: "PREMIUM",
    bestFor: "Best for scale-focused businesses",
    price: 59999,
    priceSuffix: "+",
    currency: "INR",
    meta: "One-time • Ready in 14-21 days",
    features: [
      "Fully custom design",
      "Google Analytics setup",
      "Performance optimization",
      "Blog / CMS setup",
      "6 months free support",
    ],
    cta: "Get Started",
    highlighted: false,
    icon: Shield,
  },
]

// â”€â”€â”€ Section Label â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function SectionLabel({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 mb-5 ${centered ? "justify-center" : ""}`}>
      <span className="w-1 h-1 rounded-full bg-gold/80" />
      <div className="font-rajdhani text-[14px] tracking-[7px] text-gold/85 uppercase">{label}</div>
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
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-5 sm:px-6 pt-16 md:pt-[4.5rem] pb-12 md:pb-14"
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

      <div className="relative z-10 text-center max-w-[54rem] mx-auto">
        <div className="inline-flex items-center gap-2.5 border border-gold/14 bg-gold/[0.025] px-4 py-2 mb-7">
          <span className="w-1.5 h-1.5 rounded-full bg-gold/65" />
          <span className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/66">SHUBIQ Studio - Digital Engineering</span>
        </div>

        <h1
          ref={titleRef}
          className="font-cinzel font-black leading-[1.06] mb-7"
        >
          <span className="block overflow-hidden mb-2.5">
            <span className="hero-title-line inline-block text-[clamp(40px,7vw,84px)] tracking-[2.2px] md:tracking-[2.6px] text-cream/95">Digital Systems.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="hero-title-line inline-block text-[clamp(33px,5.7vw,68px)] tracking-[1.3px] md:tracking-[1.5px] text-cream/94">
              <span className="text-gold/88">Engineered</span> to Win.
            </span>
          </span>
        </h1>

        <p
          ref={bodyRef}
          className="font-cormorant text-cream/80 leading-[1.86] max-w-[610px] mx-auto mb-10 px-2"
          style={{ fontSize: "clamp(17px, 1.34vw, 19px)", opacity: 0 }}
        >
          SHUBIQ Studio partners with founders and brands to design and engineer high-performance digital systems built for scale, speed, and long-term competitive advantage.
        </p>

        <div ref={ctaRef} className="flex gap-4.5 sm:gap-5 justify-center flex-wrap mb-12">
          <button
            onClick={() => scrollTo("studio-pricing")}
            className="font-rajdhani text-[13px] sm:text-[14px] tracking-[3px] uppercase px-10 sm:px-11 py-[10px] font-semibold bg-gold text-ink border border-gold/70 hover:bg-gold-light hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)] transition-all duration-300"
          >
            View Pricing
          </button>
          <button
            onClick={() => scrollTo("studio-contact-anchor")}
            className="font-rajdhani text-[13px] sm:text-[14px] tracking-[3px] uppercase px-10 sm:px-11 py-[10px] font-semibold border border-gold/24 text-cream hover:border-gold/72 hover:bg-gold/[0.04] transition-all duration-300"
          >
            Start a Project
          </button>
        </div>

        <div ref={authorityRef} className="mt-0 mb-14" style={{ opacity: 0.9 }}>
          <p className="font-rajdhani text-[8px] sm:text-[9px] tracking-[4.3px] uppercase text-gold/40 mb-3">
            ENGINEERING DISCIPLINES
          </p>
          <div className="flex items-center justify-center flex-wrap gap-x-3.5 gap-y-2">
            {["ARCHITECTURE", "INFRASTRUCTURE", "INTELLIGENCE", "PERFORMANCE"].map((item, index) => (
              <div key={item} className="flex items-center">
                {index > 0 && <span className="w-[1px] h-3 bg-gold/20 mr-3.5" />}
                <span className="font-rajdhani text-[9px] sm:text-[10px] tracking-[3px] uppercase text-gold/54">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-[760px] mx-auto h-px bg-[rgb(var(--gold-rgb)/0.1)]" />
        <div
          ref={statsRef}
          className="pt-7 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-9 max-w-[760px] mx-auto"
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
    <section id="studio-services-section" ref={sectionRef} className="py-[96px] px-5 sm:px-6 relative overflow-hidden">
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
          <SectionLabel label="Services" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <h2
              className="font-cinzel font-black leading-[0.92] tracking-[0.5px]"
              style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}
            >
              <span className="text-cream/90">Systems We </span>
              <span className="text-gold">Engineer</span>
            </h2>
          </div>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {STUDIO_SERVICES.map((service, index) => {
            const Icon = service.icon
            return (
              <ServiceCard
                key={service.title}
                service={service}
                index={index}
                Icon={Icon}
                isDimmed={hoveredCard !== null && hoveredCard !== index}
                onHoverChange={(active) => setHoveredCard(active ? index : null)}
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
}: {
  service: (typeof STUDIO_SERVICES)[0]
  index: number
  Icon: React.ElementType
  isDimmed: boolean
  onHoverChange: (active: boolean) => void
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`service-card group relative p-6 sm:p-7 border bg-card-soft hover:bg-card-soft-hover transform-gpu transition-[transform,border-color,background-color,box-shadow,opacity,filter] duration-[460ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isDimmed
          ? "opacity-[0.85] saturate-[0.92]"
          : "opacity-100 saturate-100"
      } border-[rgb(var(--cream-rgb)/0.14)] hover:border-[rgb(var(--gold-rgb)/0.34)] hover:-translate-y-1 hover:scale-[1.01]`}
      style={{
        willChange: "transform, opacity, filter",
        boxShadow: "0 10px 24px rgb(0 0 0 / 0.18), 0 0 0 1px rgb(var(--cream-rgb) / 0.05) inset",
      }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <span className="font-rajdhani text-[11px] tracking-[2px] uppercase text-gold/65">{`0${index + 1}`}</span>
            <span className="w-9 h-9 border border-gold/40 bg-gold/[0.07] flex items-center justify-center text-gold/90">
              <Icon size={17} strokeWidth={1.8} />
            </span>
          </div>
          <span
            className="font-rajdhani text-[11px] tracking-[2px] uppercase text-gold/80 border px-2.5 py-1 bg-gold/[0.05]"
            style={{ borderColor: "rgb(var(--gold-rgb) / 0.4)" }}
          >
            {service.tag}
          </span>
        </div>

        <h3 className="font-cinzel font-bold text-cream/93 mb-3 tracking-[0.4px] transition-[letter-spacing] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:tracking-[0.9px]" style={{ fontSize: "clamp(17px, 1.5vw, 21px)" }}>
          {service.title}
        </h3>

        <p className="font-cormorant text-cream/72 leading-[1.7] mb-5 flex-1 transition-opacity duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:text-cream/78" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
          {service.desc}
        </p>

        <div className="h-px w-[60%] bg-[rgb(var(--gold-rgb)/0.22)] transition-[width] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:w-full" />
        <ul className="space-y-1.5 pt-4">
          {service.features.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-gold/60 shrink-0" strokeWidth={2} />
              <span className="font-rajdhani text-[12px] tracking-[1px] text-cream/70 uppercase">{f}</span>
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
    <section id="studio-portfolio" ref={sectionRef} className="py-[96px] px-5 sm:px-6 relative overflow-hidden">
      <div
        className="absolute left-0 top-1/2 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.03) 0%, transparent 70%)" }}
      />
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} style={{ opacity: 0 }}>
          <SectionLabel label="Portfolio" />
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 sm:mb-10">
            <h2
              className="font-cinzel font-black leading-[0.92] tracking-[0.5px]"
              style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}
            >
              <span className="text-cream/90">Engineered </span>
              <span className="text-gold">Systems</span>
            </h2>
          </div>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 gap-5 sm:gap-6">
          {PORTFOLIO.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, index }: { project: (typeof PORTFOLIO)[0]; index: number }) {
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
      className="project-card group relative block p-7 sm:p-9 border border-[rgb(var(--cream-rgb)/0.12)] bg-card-soft hover:bg-card-soft-hover hover:border-gold/35 transition-[transform,border-color,background-color,box-shadow] duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
      style={{ willChange: "transform", boxShadow: "0 12px 28px rgb(0 0 0 / 0.2), 0 0 0 1px rgb(var(--cream-rgb) / 0.05) inset" }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="flex items-start justify-between mb-5">
        <span className="font-rajdhani text-[11px] tracking-[2.5px] uppercase text-cream/55">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="font-rajdhani text-[11px] tracking-[2.5px] uppercase border px-2.5 py-1"
          style={{
            color: project.status === "live" ? "rgb(16 185 129)" : "rgb(var(--gold-rgb) / 0.75)",
            borderColor: project.status === "live" ? "rgb(16 185 129 / 0.4)" : "rgb(var(--gold-rgb) / 0.3)",
            background: project.status === "live" ? "rgb(16 185 129 / 0.06)" : "rgb(var(--gold-rgb) / 0.04)",
          }}
        >
          {project.status === "live"
            ? "LIVE"
            : project.status === "wip"
              ? "IN DEVELOPMENT"
              : "COMING SOON"}
        </span>
      </div>

      <div className="mb-2">
        <h3
          className="font-cinzel font-bold text-cream/93 tracking-[0.4px] group-hover:text-gold transition-colors duration-300"
          style={{ fontSize: "clamp(18px, 1.6vw, 23px)" }}
        >
          {project.name}
        </h3>
      </div>

      <div className="font-rajdhani text-[11px] tracking-[2px] uppercase text-gold/60 mb-3">{project.tag}</div>

      <p className="font-cormorant text-cream/72 leading-[1.7] mb-6" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
        {project.desc}
      </p>

      <div className="mb-5 border-l border-gold/28 pl-3">
        <div className="font-rajdhani text-[11px] font-semibold tracking-[2.4px] uppercase text-gold/88 mb-1">Impact</div>
        <p className="font-cormorant text-cream/88 leading-[1.55]" style={{ fontSize: "clamp(14px, 1.05vw, 15.5px)" }}>
          {project.impact}
        </p>
      </div>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-gold/12">
        {project.tech.map((t) => (
          <span
            key={t}
            className="font-rajdhani text-[10px] tracking-[1.5px] uppercase text-cream/65 border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.6)] px-2.5 py-1"
          >
            {t}
          </span>
        ))}
      </div>
    </a>
  )
}

// â”€â”€â”€ Pricing Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StudioPricing() {
  const scrollToContact = () => document.getElementById("studio-contact-anchor")?.scrollIntoView({ behavior: "smooth" })

  return (
    <section id="studio-pricing" className="py-[96px] px-5 sm:px-6 relative overflow-hidden">
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
          <SectionLabel label="Pricing" centered />
          <div className="text-center mb-11 sm:mb-12">
            <h2
              className="font-cinzel font-black leading-[0.92] tracking-[0.5px] mb-4"
              style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}
            >
              <span className="text-cream/90">PROJECT </span>
              <span className="text-gold">INVESTMENT</span>
            </h2>
            <p className="font-cormorant text-cream/88 leading-[1.62] max-w-[700px] mx-auto mb-5" style={{ fontSize: "clamp(16px, 1.1vw, 18px)" }}>
              Structured project investment tiers designed for measurable outcomes, faster delivery, and dependable execution quality.
            </p>
            <div className="font-rajdhani text-[11px] tracking-[3.6px] uppercase text-gold/55">
              Structured Project Investment
            </div>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-center"
        >
          {PRICING.map((plan) => {
            const Icon = plan.icon
            return (
              <motion.article
                key={plan.tier}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`group relative flex flex-col rounded-[28px] p-7 sm:px-9 sm:py-9 border opacity-95 overflow-visible duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] transition-[transform,border-color,box-shadow,color] hover:border-gold/65 hover:shadow-[0_20px_50px_rgba(40,90,255,0.12)] ${
                  plan.highlighted
                    ? "md:scale-[1.03] md:min-h-[690px] pt-10 sm:pt-[54px] sm:pb-[44px] opacity-100 border-gold/32 bg-gradient-to-b from-[rgb(var(--surface-2-rgb)/0.98)] to-[rgb(var(--surface-1-rgb)/0.95)] shadow-[0_14px_34px_rgb(var(--gold-rgb)/0.10)]"
                    : plan.tier === "ENTERPRISE"
                      ? "border-gold/30 sm:py-12 bg-[linear-gradient(180deg,#0c1325_0%,#0a1120_100%)]"
                      : "border-[rgb(var(--cream-rgb)/0.12)] bg-[linear-gradient(180deg,#11192d_0%,#0c1425_100%)]"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold text-ink font-rajdhani text-[11px] tracking-[2px] uppercase font-semibold">
                    Most Popular
                  </div>
                )}
                <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/76 mb-2">{plan.tag}</div>
                    <p className={`font-cormorant ${plan.highlighted ? "text-cream/92" : "text-cream/80"}`} style={{ fontSize: "clamp(15px, 0.95vw, 16.5px)" }}>
                      {plan.bestFor}
                    </p>
                  </div>
                  <span className={`w-10 h-10 border flex items-center justify-center ${plan.highlighted ? "border-gold/45 bg-gold/[0.12] text-gold" : "border-gold/35 bg-gold/[0.08] text-gold/85"}`}>
                    <Icon size={17} strokeWidth={1.8} />
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-end gap-1.5 min-h-[80px]">
                    <span className="font-cinzel font-bold text-5xl leading-[0.94] text-gold">
                      <span className="inline-block align-top text-[0.8em]">₹</span>
                      {plan.price.toLocaleString("en-IN")}{plan.priceSuffix ?? ""}
                    </span>
                  </div>
                  <div className={`font-rajdhani text-[13px] tracking-[0.7px] mt-1 ${plan.highlighted ? "text-cream/84" : "text-cream/76"}`}>{plan.meta}</div>
                </div>

                <div className={`mb-7 border-b pb-6 ${plan.highlighted ? "border-gold/28" : "border-gold/20"}`} />

                <ul className="space-y-5 flex-1 mb-6">
                  {plan.features.map((f, index) => (
                    <motion.li
                      key={f}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.35 }}
                      className="flex items-start gap-3"
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-[3px] ${plan.highlighted ? "bg-gold/16 text-gold" : "bg-gold/12 text-gold/85"}`}>
                        <CheckCircle2 size={14} strokeWidth={2} />
                      </span>
                      <span className={`font-cormorant leading-[1.5] ${plan.highlighted ? "text-cream/94" : "text-cream/90"}`} style={{ fontSize: "clamp(15px, 0.92vw, 16px)" }}>
                        {f}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  onClick={scrollToContact}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.12 }}
                  className={`w-full font-rajdhani text-[13px] tracking-[1.8px] uppercase py-3.5 font-semibold transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center gap-2 group border rounded-2xl ${
                    plan.highlighted
                      ? "text-ink border-gold/70 bg-[linear-gradient(90deg,rgb(var(--gold-rgb))_0%,rgb(255_220_132)_50%,rgb(var(--gold-rgb))_100%)] bg-[length:200%_100%] bg-left hover:bg-right hover:brightness-105"
                      : "text-cream border-gold/30 bg-[rgb(var(--surface-2-rgb)/0.75)] hover:bg-[rgb(var(--surface-2-rgb)/0.95)] hover:border-gold/50"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={14} className="translate-x-0 group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="mt-10 text-center">
          <p className="font-cormorant text-cream/78 leading-[1.55]" style={{ fontSize: "clamp(16px, 1vw, 18px)" }}>
            Need a custom scope?{" "}
            <button onClick={scrollToContact} className="text-gold hover:text-gold-light font-semibold transition-colors duration-200">
              Request a custom quote.
            </button>
          </p>
        </div>
      </div>
    </section>
  )
}

// â”€â”€â”€ Contact CTA Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StudioContactCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: "", email: "", project: "", budget: "" })
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
          message: `[SHUBIQ Studio Inquiry]\nProject: ${form.project}\nBudget: ${form.budget}`,
          source: "shubiq-studio",
        }),
      })
      if (!res.ok) throw new Error("Failed")
      setSent(true)
      setForm({ name: "", email: "", project: "", budget: "" })
    } catch {
      setError("Unable to submit right now. Please try again or email us directly.")
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    "w-full rounded-sm bg-[rgb(var(--surface-1-rgb)/0.76)] border border-[rgb(var(--cream-rgb)/0.16)] text-cream/95 font-cormorant text-[17px] px-4 py-3.5 focus:outline-none focus:border-gold/56 focus:bg-[rgb(var(--surface-2-rgb)/0.92)] focus:shadow-[0_0_0_1px_rgb(var(--gold-rgb)_/_0.18),0_0_24px_rgb(var(--gold-rgb)_/_0.16),inset_0_1px_8px_rgb(var(--gold-rgb)_/_0.06)] transition-all duration-[360ms] ease-out placeholder:text-cream/45"

  return (
    <section id="studio-contact" ref={sectionRef} className="py-[96px] px-5 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 70%, rgb(var(--gold-rgb) / 0.05) 0%, transparent 60%)" }}
      />

      <div className="max-w-4xl mx-auto">
        <div ref={contentRef} style={{ opacity: 0 }}>
          <div id="studio-contact-anchor" className="text-center mb-12 scroll-mt-24 sm:scroll-mt-28">
            <SectionLabel label="Start a Project" centered />
            <h2
              className="font-cinzel font-black leading-[0.92] tracking-[0.5px] mb-4"
              style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}
            >
              <span className="text-cream/90">Let's </span>
              <span className="text-gold">Build Together</span>
            </h2>
            <div className="flex items-center justify-center gap-4 mb-5">
              <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/50" />
              <div className="w-1 h-1 rounded-full bg-gold" />
              <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/50" />
            </div>
            <p className="font-cormorant text-cream/65 leading-[1.65] max-w-[500px] mx-auto" style={{ fontSize: "clamp(16px, 1.3vw, 19px)" }}>
              Tell us about your project. We'll review it and get back to you within 24 hours with a detailed plan and proposal.
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
            <form onSubmit={handleSubmit} className="relative border border-[rgb(var(--cream-rgb)/0.12)] bg-card-soft p-7 sm:p-10">
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 mb-2">
                    Your Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 mb-2">
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

              <div className="mb-4">
                <label className="block font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 mb-2">
                  Project Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={form.project}
                  onChange={(e) => setForm((f) => ({ ...f, project: e.target.value }))}
                  placeholder="Tell us about your project..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="mb-6">
                <label className="block font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 mb-2">
                  Estimated Budget
                </label>
                <input
                  type="text"
                  value={form.budget}
                  onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))}
                  placeholder="e.g., ₹50,000 - ₹1,20,000"
                  className={inputClass}
                />
              </div>

              {error && (
                <p className="font-rajdhani text-[12px] tracking-[1.5px] text-red-400/80 mb-4">{error}</p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-sm font-rajdhani text-[13px] tracking-[3.2px] uppercase bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_58%,rgb(var(--gold-dark-rgb)))] text-ink py-3.5 font-semibold transition-all duration-300 hover:tracking-[3.6px] hover:shadow-[0_10px_30px_rgb(var(--gold-rgb)_/_0.28),inset_0_0_16px_rgb(var(--cream-rgb)_/_0.14)] hover:bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_42%,rgb(var(--gold-light-rgb)))] hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {sending ? "Sending..." : "Send Project Brief"}
                {!sending && <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />}
              </button>

              <p className="font-rajdhani text-[10px] tracking-[2.5px] uppercase text-cream/70 text-center mt-4">
                No commitment required. We'll reply within 24 hours.
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
        <StudioPricing />
        <GoldLine />
        <StudioContactCTA />
      </main>
      <Footer />
    </>
  )
}




