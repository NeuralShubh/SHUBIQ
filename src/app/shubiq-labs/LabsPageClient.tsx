"use client"

import { useMemo } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Sparkles,
  Smartphone,
  Globe,
  MonitorSmartphone,
  ArrowUpRight,
  Lock,
  Clock,
} from "lucide-react"
import { LAB_PRODUCTS } from "../data-labs"
import ScrollReveal from "../components/ScrollReveal"
import StaggerContainer, { StaggerItem } from "../components/StaggerContainer"
import Roadmap, { RoadmapItem } from "../components/Roadmap"
import SectionDivider from "../components/SectionDivider"

function SectionHeading({ label, title, description }: { label: string; title: string; description?: string }) {
  return (
    <ScrollReveal>
      <div className="mb-8 md:mb-12">
        <p className="text-xs uppercase tracking-[0.2em] text-cream/60 mb-2 font-rajdhani">{label}</p>
        <h2 className="text-2xl md:text-3xl font-cinzel text-cream">{title}</h2>
        {description ? <p className="text-cream/70 font-cormorant mt-2">{description}</p> : null}
      </div>
    </ScrollReveal>
  )
}

function ProductIcon({ category }: { category: string }) {
  if (category === "Mobile App") return <Smartphone size={18} className="text-gold" />
  if (category === "Web App") return <Globe size={18} className="text-gold" />
  return <MonitorSmartphone size={18} className="text-gold" />
}

export default function LabsPageClient() {
  const orderedProducts = useMemo(() => {
    const flow = LAB_PRODUCTS.find((p) => p.id === "shubiq-flow")
    const atlas = LAB_PRODUCTS.find((p) => p.id === "future-web")
    const pulse = LAB_PRODUCTS.find((p) => p.id === "future-suite")
    return [flow, atlas, pulse].filter(Boolean)
  }, [])

  const roadmapData: RoadmapItem[] = [
    {
      quarter: "Q3 2025",
      title: "SHUBIQ Flow - Concept and Design",
      description: "Product vision defined. Core feature set mapped. UI and UX system established.",
      status: "completed",
      product: "Flow",
    },
    {
      quarter: "Q4 2025",
      title: "SHUBIQ Flow - Core Development",
      description: "Tasks, habits, and focus modules built. Dark premium UI implemented. Internal testing begins.",
      status: "completed",
      product: "Flow",
    },
    {
      quarter: "Q1 2026",
      title: "SHUBIQ Flow - Beta Launch",
      description: "Android beta released for private testing. Download hub established. Stability validation underway.",
      status: "current",
      product: "Flow",
    },
    {
      quarter: "Q2 2026",
      title: "SHUBIQ Flow - Play Store Launch",
      description: "Public launch on Google Play Store. Pro tier with sync features. Onboarding flow refined.",
      status: "upcoming",
      product: "Flow",
    },
    {
      quarter: "Q2 2026",
      title: "SHUBIQ Atlas - Development Begins",
      description: "Knowledge system architecture finalized. Research vault and linked notes modules in development.",
      status: "upcoming",
      product: "Atlas",
    },
    {
      quarter: "Q3 2026",
      title: "SHUBIQ Pulse - Design Phase",
      description: "Performance OS concept validated. Planning, execution, and retrospective systems being designed.",
      status: "upcoming",
      product: "Pulse",
    },
  ]

  return (
    <main className="min-h-screen bg-[rgb(var(--ink-rgb))] text-cream">
      <section className="relative pt-[110px] sm:pt-[130px] pb-14 px-5 sm:px-8 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 40% 30%, rgb(var(--gold-rgb) / 0.08) 0%, transparent 58%), radial-gradient(ellipse at 70% 10%, rgb(var(--gold-light-rgb) / 0.06) 0%, transparent 50%)",
          }}
        />
        <div className="max-w-6xl mx-auto relative">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 border border-gold/20 bg-gold/[0.04] px-3.5 py-2 mb-6">
              <Sparkles size={14} className="text-gold" />
              <span className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/80">
                SHUBIQ Labs - Product Division
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <h1 className="font-cinzel font-black leading-[1.02] text-[clamp(32px,6.2vw,68px)] mb-4">
              The SHUBIQ
              <span className="text-gold"> Product Stack</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.4}>
            <p
              className="font-cormorant text-cream/75 leading-[1.7] max-w-[640px]"
              style={{ fontSize: "clamp(16px,1.4vw,20px)" }}
            >
              A focused ecosystem of apps, web platforms, and performance tools engineered under SHUBIQ. Each product is
              built for clarity, speed, and long-term execution power.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.6}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/shubiq-labs/shubiq-flow"
                className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/70 bg-gold text-ink px-5 py-3 hover:bg-gold-light transition-all duration-300"
              >
                View Live Beta
                <ArrowRight size={14} />
              </Link>
              <div className="flex flex-col gap-1">
                <a
                  href="mailto:shubiqofficial@gmail.com?subject=SHUBIQ%20Labs%20Early%20Access"
                  className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.25)] px-5 py-3 text-cream/80 hover:text-gold hover:border-gold transition-all duration-300"
                >
                  Request Early Access
                  <ArrowUpRight size={14} />
                </a>
                <span className="font-rajdhani text-[9px] tracking-[2.6px] uppercase text-cream/50">
                  Join the beta testing group
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <SectionDivider />

      <section className="py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            label="Products"
            title="Execution-Ready Product Lines"
            description="Live, in-development, and planned SHUBIQ Labs systems engineered for personal performance."
          />
          <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderedProducts.map((product) => {
              if (!product) return null
              const isLive = product.status === "Live Beta"
              const isInDev = product.status === "In Dev"
              const isPlanned = !isLive && !isInDev
              const badge = isLive ? (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium uppercase tracking-[2px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Beta
                </span>
              ) : isInDev ? (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-[10px] font-medium uppercase tracking-[2px]">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  In Development
                </span>
              ) : (
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-[rgb(var(--cream-rgb)/0.08)] text-cream/55 text-[10px] font-medium uppercase tracking-[2px]">
                  <span className="w-2 h-2 rounded-full bg-[rgb(var(--cream-rgb)/0.35)]" />
                  Planned
                </span>
              )

              return (
                <StaggerItem key={product.id}>
                  <div
                    className={`group relative border rounded-sm p-6 sm:p-7 overflow-hidden transition-all duration-300 ${
                      isLive
                        ? "border-gold/45 bg-card-soft shadow-[0_28px_60px_rgb(0_0_0_/_0.34)] hover:shadow-[0_34px_70px_rgb(0_0_0_/_0.42)] hover:-translate-y-1"
                        : isInDev
                          ? "border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--surface-2-rgb)/0.6)] opacity-90 hover:-translate-y-0.5"
                          : "border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-2-rgb)/0.5)] opacity-65"
                    }`}
                  >
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: isLive
                          ? "linear-gradient(160deg, rgb(var(--gold-rgb)/0.16), transparent 55%)"
                          : "linear-gradient(160deg, rgb(var(--gold-rgb)/0.06), transparent 50%)",
                      }}
                    />
                    {isPlanned && (
                      <div className="absolute inset-0 flex items-center justify-center text-cream/10 font-rajdhani text-[32px] tracking-[6px] uppercase">
                        Coming Soon
                      </div>
                    )}

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 border flex items-center justify-center ${isLive ? "border-gold/35 bg-gold/[0.12]" : "border-gold/25 bg-gold/[0.08]"}`}>
                            <ProductIcon category={product.category} />
                          </div>
                          <div>
                            <div className="font-rajdhani text-[10px] tracking-[2.8px] uppercase text-gold/70">{product.category}</div>
                            <div className="mt-1">{badge}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-cinzel text-[20px] text-cream/90 flex items-center justify-end gap-2">
                            {product.name}
                            {isPlanned && <Lock size={14} className="text-cream/50" />}
                            {isInDev && <Clock size={14} className="text-amber-400" />}
                          </div>
                          <div className="font-rajdhani text-[11px] tracking-[2px] uppercase text-gold/70">{product.subtitle}</div>
                        </div>
                      </div>

                      <p className="font-cormorant text-cream/75 leading-[1.6] mb-5">{product.desc}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {product.highlights.map((h) => (
                          <span
                            key={h}
                            className="px-3 py-1 text-[10px] tracking-[2px] uppercase font-rajdhani border border-gold/25 text-gold/75"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {isInDev && (
                        <div className="mb-5">
                          <div className="flex items-center justify-between text-[10px] uppercase tracking-[2px] font-rajdhani text-amber-300/80 mb-2">
                            <span>Progress</span>
                            <span>40%</span>
                          </div>
                          <div className="h-1 bg-[rgb(var(--cream-rgb)/0.1)] rounded-full overflow-hidden">
                            <div className="h-full w-[40%] bg-amber-400" />
                          </div>
                        </div>
                      )}

                      {product.disabled ? (
                        <button
                          className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-[rgb(var(--cream-rgb)/0.2)] px-5 py-3 text-cream/60 cursor-not-allowed"
                          disabled
                        >
                          {product.cta}
                        </button>
                      ) : (
                        <Link
                          href={product.href}
                          className="inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase border border-gold/60 px-5 py-3 text-cream hover:text-gold hover:border-gold transition-all duration-300"
                        >
                          {product.cta}
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      <SectionDivider />

      <section className="py-14 sm:py-16 px-5 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <Roadmap items={roadmapData} />
        </div>
      </section>
    </main>
  )
}
