"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import StudioNavbar from "./StudioNavbar"
import Footer from "../components/Footer"
import ScrollReveal from "../components/ScrollReveal"
import SectionDivider from "../components/SectionDivider"
import FloatingInput from "../components/FloatingInput"
import FloatingSelect from "../components/FloatingSelect"
import MagneticButton from "../components/MagneticButton"
import NumberTicker from "../components/NumberTicker"
import { DEFAULT_STUDIO_CONTENT, type StudioContent } from "./studioContent"
import { projects, type Project } from "../data-projects"
import ProjectCardShowcase from "../components/ProjectCardShowcase"
import {
  CheckCircle2,
  ArrowRight,
  Clock3,
  Layers,
  Rocket,
  Zap,
  Shield,
  TrendingUp,
  Workflow,
} from "lucide-react"
import Services from "../components/Services"

// â”€â”€â”€ Data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

type StudioPortfolioProject = Project

const PRICING_ICON_MAP = {
  zap: Zap,
  trending: TrendingUp,
  shield: Shield,
} as const

// â”€â”€â”€ Section Label â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function SectionLabel({ label, centered = false }: { label: string; centered?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 mb-5 ${centered ? "justify-center" : ""}`}>
      <span className="w-14 h-px bg-gradient-to-r from-transparent to-gold/50" />
      <div className="font-rajdhani text-[12px] sm:text-[14px] tracking-[4px] sm:tracking-[7px] text-gold/85 uppercase">{label}</div>
      <span className="w-14 h-px bg-gradient-to-r from-gold/50 to-transparent" />
    </div>
  )
}

// â”€â”€â”€ Hero Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StudioHero() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const bodyRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const tagsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        const titleLines = titleRef.current?.querySelectorAll<HTMLElement>(".hero-title-line") ?? []
        const titleLineOne = titleLines[0]
        const titleLineTwo = titleLines[1]
        const ctaItems = ctaRef.current?.children ?? []
        const statItems = statsRef.current?.children ?? []
        const tagItems = tagsRef.current?.querySelectorAll<HTMLElement>("[data-tag-item]") ?? []

        const tl = gsap.timeline({ delay: 0.05 })
        tl.fromTo(
          badgeRef.current,
          { y: -10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.55, ease: "power2.out" },
          0,
        )
          .fromTo(
            titleLineOne,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.75, ease: "power2.out" },
            0.2,
          )
          .fromTo(
            titleLineTwo,
            { yPercent: 110 },
            { yPercent: 0, duration: 0.75, ease: "power2.out" },
            0.4,
          )
          .fromTo(
            bodyRef.current,
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
            0.6,
          )
          .fromTo(
            ctaItems,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", stagger: 0.12 },
            0.8,
          )
          .fromTo(
            statItems,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.12 },
            1,
          )
          .fromTo(
            tagItems,
            { x: -14, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.15 },
            1.2,
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
        <div ref={badgeRef} className="inline-flex items-center gap-2.5 border border-gold/14 bg-gold/[0.025] px-4 max-md:px-3.5 py-2 mb-7 max-md:mb-6">
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
          <MagneticButton
            onClick={() => scrollTo("studio-pricing")}
            data-cursor="View"
            className="font-rajdhani text-[13px] sm:text-[14px] tracking-[2.6px] sm:tracking-[3px] uppercase px-8 sm:px-11 py-[10px] font-semibold bg-gold text-ink border border-gold/70 md:hover:bg-gold-light md:hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)] transition-all duration-300 max-sm:w-full"
          >
            View Pricing
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("studio-contact-anchor")}
            data-cursor="Start"
            className="font-rajdhani text-[13px] sm:text-[14px] tracking-[2.6px] sm:tracking-[3px] uppercase px-8 sm:px-11 py-[10px] font-semibold border border-gold/24 text-cream md:hover:border-gold/72 md:hover:bg-gold/[0.04] transition-all duration-300 max-sm:w-full"
          >
            Start a Project
          </MagneticButton>
        </div>

        <div ref={tagsRef} className="mt-0 mb-14 max-md:mb-9" style={{ opacity: 0.9 }}>
          <p className="font-rajdhani text-[8px] sm:text-[9px] tracking-[4.3px] uppercase text-gold/40 mb-3">
            ENGINEERING DISCIPLINES
          </p>
          <div className="flex items-center justify-center flex-wrap gap-x-2.5 sm:gap-x-3.5 gap-y-2">
            {["ARCHITECTURE", "INFRASTRUCTURE", "INTELLIGENCE", "PERFORMANCE"].map((item, index) => (
              <div key={item} className="flex items-center" data-tag-item>
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
            { val: <NumberTicker value={10} suffix="+" />, label: "Production Systems" },
            { val: <NumberTicker value={3} suffix="+" />, label: "Years Engineering" },
            { val: "Precision-Driven", label: "Delivery" },
          ].map((s) => (
            <div key={s.label} className="text-center min-h-[72px] flex flex-col items-center justify-start">
              <div className="font-cinzel font-black text-gold/88 leading-none" style={{ fontSize: "clamp(24px, 3.35vw, 34px)" }}>
                {s.val}
              </div>
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

function StudioExecutionGrid() {
  const cards = [
    {
      title: "Strategy Layer",
      desc: "Positioning, offer architecture, and conversion intent mapped before design starts.",
      icon: Layers,
    },
    {
      title: "System Design",
      desc: "Information architecture, interaction flow, and component system aligned for scale.",
      icon: Workflow,
    },
    {
      title: "Launch Velocity",
      desc: "Engineering and deployment tuned for speed, reliability, and measurable outcomes.",
      icon: Rocket,
    },
  ]

  return (
    <section className="relative py-[88px] max-md:py-14 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mb-8 text-center"
        >
          <SectionLabel label="Execution Model" centered />
          <h2 className="font-cinzel font-black leading-[0.94] text-cream/92" style={{ fontSize: "clamp(30px, 5vw, 60px)" }}>
            Built As
            <span className="text-gold"> A Performance System</span>
          </h2>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="rounded-[22px] border border-[rgb(var(--cream-rgb)/0.14)] bg-[linear-gradient(170deg,rgb(var(--cream-rgb)/0.06),rgb(var(--surface-2-rgb)/0.72))] p-6"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gold/35 bg-gold/[0.1]">
                <card.icon size={16} className="text-gold" />
              </div>
              <h3 className="mt-4 font-cinzel text-[24px] leading-[1.02] text-cream">{card.title}</h3>
              <p className="mt-3 font-cormorant text-[18px] leading-[1.5] text-cream/76">{card.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function StudioDeliveryProcess() {
  const steps = [
    { step: "01", title: "Discovery", text: "We align objectives, constraints, and project success metrics." },
    { step: "02", title: "Design + Build", text: "UX and engineering run in tight cycles to reduce handoff friction." },
    { step: "03", title: "Launch + Iterate", text: "Deploy fast, monitor signal, and optimize based on real behavior." },
  ]

  return (
    <section className="relative py-[90px] max-md:py-14 px-5 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto rounded-[28px] border border-[rgb(var(--gold-rgb)/0.26)] bg-[linear-gradient(165deg,rgb(var(--gold-rgb)/0.16),rgb(var(--surface-1-rgb)/0.86)_44%)] p-6 sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2">
            <Clock3 size={14} className="text-gold" />
            <p className="font-rajdhani text-[10px] tracking-[2.8px] uppercase text-gold/70">Delivery Process</p>
          </div>
          <h3 className="mt-3 font-cinzel font-black leading-[0.95]" style={{ fontSize: "clamp(30px, 4.5vw, 56px)" }}>
            Fast. Structured.
            <span className="text-gold"> Outcome-Focused.</span>
          </h3>
        </motion.div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="rounded-2xl border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--gold-rgb)/0.08)] p-4"
            >
              <p className="font-rajdhani text-[10px] tracking-[2.5px] uppercase text-cream/64">{item.step}</p>
              <p className="mt-1 font-cinzel text-[22px] text-cream">{item.title}</p>
              <p className="mt-2 font-cormorant text-[17px] leading-[1.45] text-cream/78">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
// â”€â”€â”€ Portfolio Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StudioPortfolio() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const portfolioProjects = projects.slice(0, 3)

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

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6">
          {portfolioProjects.map((project, index) => (
            <ProjectCardShowcase key={`${project.slug}-${index}`} project={project} index={index} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase text-cream/70 hover:text-gold transition-colors"
          >
            View All Projects
            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Project cards now use the shared component from src/app/components/ProjectCard.tsx

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
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid grid-cols-1 md:[grid-template-columns:1.03fr_1.08fr_1.03fr] gap-5 max-sm:gap-4.5 sm:gap-7 items-center"
        >
          {pricingPlans.map((plan) => {
            const Icon = PRICING_ICON_MAP[plan.icon] ?? TrendingUp
            return (
              <motion.article
                key={plan.id}
                variants={{
                  hidden: { opacity: 0, y: 40, scale: plan.highlighted ? 0.95 : 0.98 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.6, ease: "easeOut", delay: plan.highlighted ? 0.12 : 0 }}
                className={`group relative flex flex-col rounded-[22px] sm:rounded-[28px] p-5 max-sm:p-4.5 sm:px-9 sm:py-9 border opacity-95 overflow-visible duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] transition-[transform,border-color,box-shadow,color] hover:border-gold/65 hover:shadow-[0_20px_50px_rgba(40,90,255,0.12)] hover:scale-[1.03] max-md:hover:translate-y-0 max-md:hover:scale-100 ${
                  plan.highlighted
                    ? "studio-popular-pulse gradient-border md:scale-[1.03] md:min-h-[690px] pt-7 sm:pt-[54px] pb-6 sm:pb-[44px] opacity-100 border-2 border-gold/45 bg-gradient-to-b from-[rgb(var(--surface-2-rgb)/0.98)] to-[rgb(var(--surface-1-rgb)/0.95)] shadow-[0_14px_34px_rgb(var(--gold-rgb)/0.10)]"
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
                      <NumberTicker value={plan.price} prefix="₹" suffix={plan.priceSuffix ?? ""} locale="en-IN" />
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
                  data-cursor="Start"
                  className={`w-full font-rajdhani text-[11px] sm:text-[13px] tracking-[1.3px] sm:tracking-[1.8px] uppercase py-3.5 font-semibold transition-all duration-[350ms] ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center justify-center gap-2 group border rounded-[14px] sm:rounded-2xl ${
                    plan.highlighted
                      ? "text-ink border-gold/70 bg-[linear-gradient(90deg,rgb(var(--gold-rgb))_0%,rgb(255_220_132)_50%,rgb(var(--gold-rgb))_100%)] bg-[length:200%_100%] bg-left md:hover:bg-right md:hover:brightness-105"
                      : "text-cream border-gold/30 bg-[rgb(var(--surface-2-rgb)/0.75)] bg-[length:0%_100%] bg-left bg-no-repeat md:hover:bg-[length:100%_100%] md:hover:border-gold/50"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight size={14} className="translate-x-0 md:group-hover:translate-x-1 transition-transform duration-200" />
                </motion.button>
              </motion.article>
            )
          })}
        </motion.div>

        <div className="mt-8 sm:mt-10 flex justify-center">
          <button
            onClick={scrollToContact}
            className="group border border-dashed border-[rgb(var(--cream-rgb)/0.28)] px-6 py-4 rounded-sm text-center hover:border-gold/60 hover:bg-gold/[0.04] transition-all duration-300"
          >
            <div className="font-cormorant text-cream/78 leading-[1.55]" style={{ fontSize: "clamp(16px, 1vw, 18px)" }}>
              {content.pricingFooterPrefix}{" "}
              <span className="text-gold md:group-hover:text-gold-light font-semibold transition-colors duration-200">
                {content.pricingFooterCta}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-center gap-2 text-gold/70 font-rajdhani text-[10px] tracking-[2.6px] uppercase">
              Custom Scope
              <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </div>
          </button>
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
  const [touched, setTouched] = useState({ name: false, email: false, phone: false, project: false })
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")
  const prefersReduced = !!useReducedMotion()

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  const nameError = touched.name && form.name.trim().length === 0
  const emailError = touched.email && !emailValid
  const phoneError = touched.phone && form.phone.trim().length === 0
  const projectError = touched.project && form.project.trim().length === 0

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
    setTouched({ name: true, email: true, phone: true, project: true })
    if (!form.name.trim() || !form.email.trim() || !emailValid || !form.phone.trim() || !form.project.trim()) {
      setSubmitState("error")
      setError("Please complete the required fields.")
      setTimeout(() => setSubmitState("idle"), 2000)
      return
    }

    setSubmitState("loading")
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
      setSubmitState("success")
      setTimeout(() => setSubmitState("idle"), 3000)
    } catch {
      setError("Unable to submit right now. Please try again or email us directly.")
      setSubmitState("error")
      setTimeout(() => setSubmitState("idle"), 2000)
    } finally {
      if (submitState === "loading") setSubmitState("idle")
    }
  }

  const budgetOptions = [
    "Under ₹20,000",
    "₹20,000 - ₹40,000",
    "₹40,000 - ₹60,000",
    "₹60,000+",
    "Not sure yet",
  ]

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
                <FloatingInput
                  label="Your Name"
                  name="studio-name"
                  value={form.name}
                  required
                  onChange={(value) => setForm((f) => ({ ...f, name: value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                  error={nameError}
                />
                <FloatingInput
                  label="Email Address"
                  name="studio-email"
                  type="email"
                  value={form.email}
                  required
                  onChange={(value) => setForm((f) => ({ ...f, email: value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                  error={emailError}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 mb-3.5 sm:mb-4">
                <FloatingInput
                  label="Phone Number"
                  name="studio-phone"
                  type="tel"
                  value={form.phone}
                  required
                  onChange={(value) => setForm((f) => ({ ...f, phone: value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, phone: true }))}
                  error={phoneError}
                />
                <FloatingSelect
                  label="Estimated Cost"
                  name="studio-budget"
                  value={form.budget}
                  options={budgetOptions}
                  onChange={(value) => setForm((f) => ({ ...f, budget: value }))}
                />
              </div>

              <div className="mb-6 sm:mb-6">
                <FloatingInput
                  label="Project Description"
                  name="studio-project"
                  value={form.project}
                  required
                  multiline
                  onChange={(value) => setForm((f) => ({ ...f, project: value }))}
                  onBlur={() => setTouched((prev) => ({ ...prev, project: true }))}
                  error={projectError}
                />
              </div>

              {error && (
                <p className="font-rajdhani text-[12px] tracking-[1.5px] text-red-400/80 mb-4">{error}</p>
              )}

              <motion.button
                type="submit"
                disabled={submitState === "loading"}
                className="w-full mt-1 rounded-[10px] sm:rounded-[6px] font-rajdhani text-[12px] sm:text-[13px] tracking-[1.4px] sm:tracking-[3.2px] uppercase border border-gold/70 bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_58%,rgb(var(--gold-dark-rgb)))] text-ink py-3 sm:py-3.5 font-semibold transition-all duration-300 md:hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={prefersReduced ? undefined : { scale: 1.01 }}
                whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                animate={submitState === "error" && !prefersReduced ? { x: [0, -6, 6, -6, 6, 0] } : undefined}
                transition={submitState === "error" ? { duration: 0.35 } : { duration: 0.2 }}
              >
                {submitState === "idle" && content.contactSubmitText}
                {submitState === "loading" && (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink/70 border-t-transparent" />
                    Sending
                  </span>
                )}
                {submitState === "success" && "✓ Sent!"}
                {submitState === "error" && "Try Again"}
                {submitState === "idle" && <ArrowRight size={15} />}
              </motion.button>

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
    setStudioContent(DEFAULT_STUDIO_CONTENT)
  }, [])

  return (
    <>
      <StudioNavbar />
      <main className="studio-premium-bg relative overflow-hidden">
        <div className="studio-grid-overlay pointer-events-none absolute inset-0" />
        <div className="studio-glow-orb pointer-events-none absolute -left-20 top-28 h-72 w-72 rounded-full" />
        <div className="studio-glow-orb-2 pointer-events-none absolute right-[-100px] top-[420px] h-96 w-96 rounded-full" />
        <StudioHero />
        <StudioExecutionGrid />
        <div id="studio-services-anchor" className="block h-0 scroll-mt-20" aria-hidden="true" />
        <SectionDivider />
        <Services />
        <div id="studio-portfolio-anchor" className="block h-0 scroll-mt-20" aria-hidden="true" />
        <SectionDivider />
        <StudioPortfolio />
        <StudioDeliveryProcess />
        <div id="studio-pricing-anchor" className="block h-0 scroll-mt-20" aria-hidden="true" />
        <SectionDivider />
        <StudioPricing content={studioContent} />
        <SectionDivider />
        <StudioContactCTA content={studioContent} />
      </main>
      <Footer />
    </>
  )
}



