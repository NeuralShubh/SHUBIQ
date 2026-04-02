"use client"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
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

const APP_PLANS: StudioContent["plans"] = [
  {
    id: "app-basic",
    tier: "BASIC",
    tag: "APP BASIC",
    bestFor: "Best for MVP apps with production intent",
    price: 77999,
    meta: "One-time • Ready in 5-7 weeks",
    features: [
      "Product flow mapping and core UX",
      "Authentication, onboarding, and profile modules",
      "Backend setup with admin controls",
      "Crash-safe state handling and QA cycle",
      "Deployment support for first release",
    ],
    cta: "Get Started",
    highlighted: false,
    icon: "zap",
  },
  {
    id: "app-standard",
    tier: "STANDARD",
    tag: "APP STANDARD",
    bestFor: "Best for market-ready app products",
    price: 167999,
    meta: "One-time • Ready in 8-12 weeks",
    features: [
      "Cross-platform build with scalable architecture",
      "Payments, subscriptions, and transaction flows",
      "Analytics instrumentation + retention funnels",
      "Role-based dashboard and content controls",
      "Security hardening and release management",
    ],
    cta: "Get Started",
    highlighted: true,
    icon: "trending",
  },
  {
    id: "app-premium",
    tier: "PREMIUM",
    tag: "APP PREMIUM",
    bestFor: "Best for enterprise-grade app ecosystems",
    price: 329999,
    priceSuffix: "+",
    meta: "One-time • Ready in 12-18 weeks",
    features: [
      "Multi-role architecture with modular services",
      "Realtime systems, advanced API orchestration",
      "Compliance-grade security and monitoring",
      "Store optimization and launch operations",
      "Priority engineering and growth partnership",
    ],
    cta: "Get Started",
    highlighted: false,
    icon: "shield",
  },
]

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

function StudioTransitionRibbon() {
  return (
    <div className="px-5 sm:px-6">
      <div className="max-w-7xl mx-auto h-px bg-[linear-gradient(90deg,transparent,rgb(var(--gold-rgb)/0.26),transparent)]" />
    </div>
  )
}

// â”€â”€â”€ Hero Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function StudioHero() {
  const [wordIndex, setWordIndex] = useState(0)
  const [signalIndex, setSignalIndex] = useState(0)
  const focusWords = ["Conversion", "Authority", "Momentum"]
  const signals = [
    { label: "Current Lane", value: "Design + Engineering" },
    { label: "Delivery Pulse", value: "Weekly Iteration" },
    { label: "Outcome Target", value: "Higher Revenue Signal" },
  ]

  useEffect(() => {
    const wordTimer = window.setInterval(() => {
      setWordIndex((prev) => (prev + 1) % focusWords.length)
    }, 2600)
    const signalTimer = window.setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % signals.length)
    }, 2900)
    return () => {
      window.clearInterval(wordTimer)
      window.clearInterval(signalTimer)
    }
  }, [focusWords.length, signals.length])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="studio-hero" className="relative min-h-[100vh] overflow-hidden px-5 sm:px-6 pt-[7.2rem] pb-12 md:pb-14">
      <div className="studio-hero-mesh pointer-events-none absolute inset-0" />
      <div className="studio-hero-beam pointer-events-none absolute inset-0" />
      <div className="studio-hero-aurora pointer-events-none absolute inset-0" />
      <div className="studio-hero-ring studio-hero-ring-a pointer-events-none absolute left-[14%] top-[18%]" />
      <div className="studio-hero-ring studio-hero-ring-b pointer-events-none absolute right-[12%] top-[20%]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:gap-12">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2.5 border border-gold/20 bg-gold/[0.05] px-4 py-2"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold/75" />
            <span className="font-rajdhani text-[10px] tracking-[3.2px] uppercase text-gold/75">SHUBIQ Studio - Digital Engineering</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.08 }}
            className="font-cinzel font-black leading-[0.95] text-cream/95"
            style={{ fontSize: "clamp(36px, 6.8vw, 90px)" }}
          >
            Design.
            <span className="block text-gold/92">Engineer. Scale.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.62, delay: 0.18 }}
            className="mt-5 max-w-[660px] font-cormorant leading-[1.72] text-cream/80"
            style={{ fontSize: "clamp(16px, 1.32vw, 21px)" }}
          >
            SHUBIQ Studio helps ambitious brands launch premium digital systems with speed and precision. We combine strategy, design,
            and engineering into one outcome-driven build process.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.58, delay: 0.24 }}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--gold-rgb)/0.08)] px-3 py-1.5"
          >
            <span className="font-rajdhani text-[9px] tracking-[2.5px] uppercase text-cream/62">Built For</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={focusWords[wordIndex]}
                initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -8, filter: "blur(2px)" }}
                transition={{ duration: 0.35 }}
                className="font-rajdhani text-[10px] tracking-[2.8px] uppercase text-gold/80"
              >
                {focusWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton
              onClick={() => scrollTo("studio-pricing")}
              data-cursor="View"
              className="labs-sheen-btn font-rajdhani text-[13px] tracking-[2.8px] uppercase px-8 sm:px-10 py-[10px] font-semibold bg-gold text-ink border border-gold/70 md:hover:bg-gold-light md:hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)] transition-all duration-300"
            >
              View Pricing
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo("studio-contact-anchor")}
              data-cursor="Start"
              className="font-rajdhani text-[13px] tracking-[2.8px] uppercase px-8 sm:px-10 py-[10px] font-semibold border border-gold/32 text-cream md:hover:border-gold/72 md:hover:bg-gold/[0.05] transition-all duration-300"
            >
              Start a Project
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.38 }}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2"
          >
            {["Architecture", "UX Systems", "Performance", "Conversion"].map((item) => (
              <span
                key={item}
                className="rounded-full border border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--cream-rgb)/0.04)] px-3 py-1 font-rajdhani text-[9px] tracking-[2.2px] uppercase text-cream/70"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 22 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.68, delay: 0.18 }}
          className="relative mt-2 lg:mt-0"
        >
          <div className="studio-hero-panel rounded-[28px] border border-[rgb(var(--gold-rgb)/0.3)] bg-[linear-gradient(165deg,rgb(var(--gold-rgb)/0.15),rgb(var(--surface-1-rgb)/0.86)_46%)] p-6 sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <p className="font-rajdhani text-[10px] tracking-[2.8px] uppercase text-gold/72">Studio Command View</p>
              <span className="rounded-full border border-[rgb(var(--gold-rgb)/0.26)] bg-[rgb(var(--gold-rgb)/0.08)] px-3 py-1 font-rajdhani text-[8px] tracking-[2.2px] uppercase text-cream/70">
                Live Mode
              </span>
            </div>
            <h3 className="mt-2 font-cinzel text-[34px] leading-[0.96] text-cream">Build Momentum</h3>
            <div className="mt-3 flex flex-wrap justify-end gap-2">
              <motion.span
                className="rounded-full border border-[rgb(var(--gold-rgb)/0.3)] bg-[rgb(var(--surface-2-rgb)/0.76)] px-3 py-1.5"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="font-rajdhani text-[8px] tracking-[2.2px] uppercase text-gold/72">Process Locked</span>
              </motion.span>
              <motion.span
                className="rounded-full border border-[rgb(var(--gold-rgb)/0.3)] bg-[rgb(var(--surface-2-rgb)/0.76)] px-3 py-1.5"
                animate={{ y: [0, -2, 0] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
              >
                <span className="font-rajdhani text-[8px] tracking-[2.2px] uppercase text-gold/72">Launch Ready</span>
              </motion.span>
            </div>

            <div className="mt-5 rounded-2xl border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.03)] p-4">
              <p className="font-rajdhani text-[9px] tracking-[2.4px] uppercase text-cream/58">Signal Stream</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={signals[signalIndex].label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="mt-2"
                >
                  <p className="font-cinzel text-[22px] leading-[1.02] text-cream">{signals[signalIndex].value}</p>
                  <p className="font-rajdhani text-[8px] tracking-[2.1px] uppercase text-gold/68">{signals[signalIndex].label}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                { label: "Systems Shipped", value: <NumberTicker value={10} suffix="+" />, level: "84%" },
                { label: "Delivery Rhythm", value: "Weekly", level: "73%" },
                { label: "Response Standard", value: "< 24h", level: "91%" },
              ].map((row, index) => (
                <motion.div
                  key={row.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.3 + index * 0.08 }}
                  className="rounded-2xl border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--gold-rgb)/0.08)] px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-rajdhani text-[9px] tracking-[2.2px] uppercase text-cream/62">{row.label}</p>
                    <span className="font-rajdhani text-[8px] tracking-[2px] uppercase text-gold/70">{row.level}</span>
                  </div>
                  <p className="mt-1 font-cinzel text-[26px] text-cream">{row.value}</p>
                  <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-[rgb(var(--cream-rgb)/0.14)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: row.level }}
                      transition={{ duration: 1.1, delay: 0.45 + index * 0.08, ease: "easeOut" }}
                      className="h-full bg-[linear-gradient(90deg,rgb(var(--gold-rgb)),rgb(var(--gold-light-rgb)))]"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.5 }}
        className="relative z-10 mx-auto mt-10 grid max-w-7xl gap-3 sm:grid-cols-3"
      >
        {[
          { label: "Build Discipline", value: "Design + Code Parallel" },
          { label: "Average Kickoff", value: "Within 72 Hours" },
          { label: "Project Direction", value: "Outcome-First Execution" },
        ].map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, delay: 0.6 + index * 0.08 }}
            className="rounded-2xl border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.03)] px-4 py-3"
          >
            <p className="font-rajdhani text-[9px] tracking-[2.3px] uppercase text-cream/60">{item.label}</p>
            <p className="mt-1 font-cormorant text-[18px] text-cream/80">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>
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
      <div className="max-w-7xl mx-auto rounded-[30px] border border-[rgb(var(--cream-rgb)/0.12)] bg-[linear-gradient(180deg,rgb(var(--surface-1-rgb)/0.82),rgb(var(--surface-0-rgb)/0.9))] p-6 sm:p-8">
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
            <p className="max-w-[640px] font-cormorant text-[clamp(15px,1.2vw,19px)] leading-[1.58] text-cream/76">
              Selected work where design precision and engineering depth translated into measurable business outcomes.
            </p>
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
  const [pricingMode, setPricingMode] = useState<"web" | "app">("web")
  const scrollToContact = () => document.getElementById("studio-contact-anchor")?.scrollIntoView({ behavior: "smooth" })
  const webPlans = content.plans?.length ? content.plans : DEFAULT_STUDIO_CONTENT.plans
  const pricingPlans = pricingMode === "web" ? webPlans : APP_PLANS

  return (
    <section id="studio-pricing" className="py-[96px] max-md:py-16 max-sm:py-14 px-5 max-sm:px-3.5 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 50%, rgb(var(--gold-rgb) / 0.04) 0%, transparent 65%)" }}
      />
      <div className="max-w-7xl mx-auto rounded-[30px] border border-[rgb(var(--cream-rgb)/0.12)] bg-[linear-gradient(180deg,rgb(var(--surface-1-rgb)/0.84),rgb(var(--surface-0-rgb)/0.9))] p-6 sm:p-8">
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
            <div className="mb-4 inline-flex rounded-full border border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--surface-2-rgb)/0.65)] p-1">
              <button
                onClick={() => setPricingMode("web")}
                className={`rounded-full px-4 py-2 font-rajdhani text-[10px] tracking-[2.4px] uppercase transition-colors ${
                  pricingMode === "web"
                    ? "bg-gold text-ink"
                    : "text-cream/72 hover:text-gold"
                }`}
              >
                Web Projects
              </button>
              <button
                onClick={() => setPricingMode("app")}
                className={`rounded-full px-4 py-2 font-rajdhani text-[10px] tracking-[2.4px] uppercase transition-colors ${
                  pricingMode === "app"
                    ? "bg-gold text-ink"
                    : "text-cream/72 hover:text-gold"
                }`}
              >
                App Projects
              </button>
            </div>
            <div className="font-rajdhani text-[10px] sm:text-[11px] tracking-[2.8px] sm:tracking-[3.6px] uppercase text-gold/55">
              {pricingMode === "web" ? `${content.pricingMicroLabel} • India Market Adjusted` : "App Build Investment • India Market Adjusted"}
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {[
                { label: "No Hidden Fees", icon: Shield },
                { label: "Clear Scope First", icon: Layers },
                { label: "Fast Start Window", icon: Rocket },
              ].map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--cream-rgb)/0.04)] px-3 py-1.5"
                >
                  <item.icon size={12} className="text-gold/75" />
                  <span className="font-rajdhani text-[9px] tracking-[2px] uppercase text-cream/66">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pricingMode}
            initial={{ opacity: 0, y: 16, filter: "blur(2px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -12, filter: "blur(2px)" }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-1 md:[grid-template-columns:1.03fr_1.08fr_1.03fr] gap-5 max-sm:gap-4.5 sm:gap-7 items-center"
          >
            {pricingPlans.map((plan, index) => {
            const Icon = PRICING_ICON_MAP[plan.icon] ?? TrendingUp
            return (
              <motion.article
                key={`${pricingMode}-${plan.id}`}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.38, delay: index * 0.06, ease: "easeOut" }}
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
                      <NumberTicker key={`${pricingMode}-${plan.id}-${plan.price}`} value={plan.price} prefix="₹" suffix={plan.priceSuffix ?? ""} locale="en-IN" start />
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
        </AnimatePresence>

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

        <div className="mt-6 rounded-2xl border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--gold-rgb)/0.08)] p-4">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { title: "Transparent Scope", copy: "Final quote is mapped to deliverables before execution begins." },
              { title: "Execution Cadence", copy: "Milestones are tracked weekly with visible progress checkpoints." },
              { title: "Outcome Priority", copy: "Design and engineering decisions are tied to growth outcomes." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[rgb(var(--gold-rgb)/0.2)] bg-[rgb(var(--gold-rgb)/0.06)] p-3">
                <p className="font-cinzel text-[20px] text-cream">{item.title}</p>
                <p className="mt-1 font-cormorant text-[16px] leading-[1.45] text-cream/76">{item.copy}</p>
              </div>
            ))}
          </div>
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
    "Under ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,00,000",
    "₹2,00,000 - ₹4,00,000",
    "₹4,00,000+",
    "Not sure yet",
  ]

  return (
    <section id="studio-contact" ref={sectionRef} className="py-[96px] max-md:py-16 max-sm:py-14 px-5 max-sm:px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 70%, rgb(var(--gold-rgb) / 0.05) 0%, transparent 60%)" }}
      />

      <div className="max-w-7xl mx-auto rounded-[30px] border border-[rgb(var(--cream-rgb)/0.12)] bg-[linear-gradient(180deg,rgb(var(--surface-1-rgb)/0.84),rgb(var(--surface-0-rgb)/0.9))] p-6 sm:p-8">
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

          <div className="mb-6 grid gap-3 sm:grid-cols-3">
            {[
              { title: "Step 1", text: "Share your brief and goals." },
              { title: "Step 2", text: "Get roadmap + exact scope." },
              { title: "Step 3", text: "Kickoff in aligned timeline." },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--cream-rgb)/0.03)] p-3 text-center">
                <p className="font-rajdhani text-[9px] tracking-[2.2px] uppercase text-gold/70">{item.title}</p>
                <p className="mt-1 font-cormorant text-[16px] leading-[1.4] text-cream/78">{item.text}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-wrap justify-center gap-2">
            <a
              href="mailto:shubiqofficial@gmail.com?subject=SHUBIQ%20Studio%20Project%20Inquiry"
              className="rounded-full border border-[rgb(var(--gold-rgb)/0.42)] px-4 py-1.5 font-rajdhani text-[9px] tracking-[2.1px] uppercase text-gold/78 hover:bg-[rgb(var(--gold-rgb)/0.1)] transition-colors"
            >
              Email Directly
            </a>
            <a
              href="mailto:shubiqofficial@gmail.com?subject=SHUBIQ%20Studio%20Schedule%20Call"
              className="rounded-full border border-[rgb(var(--gold-rgb)/0.42)] px-4 py-1.5 font-rajdhani text-[9px] tracking-[2.1px] uppercase text-gold/78 hover:bg-[rgb(var(--gold-rgb)/0.1)] transition-colors"
            >
              Request Call
            </a>
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
                  label="Estimated Budget (INR)"
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
        <StudioTransitionRibbon />
        <Services />
        <StudioTransitionRibbon />
        <div id="studio-portfolio-anchor" className="block h-0 scroll-mt-20" aria-hidden="true" />
        <StudioPortfolio />
        <StudioTransitionRibbon />
        <StudioDeliveryProcess />
        <div id="studio-pricing-anchor" className="block h-0 scroll-mt-20" aria-hidden="true" />
        <StudioPricing content={studioContent} />
        <StudioTransitionRibbon />
        <StudioContactCTA content={studioContent} />
      </main>
      <Footer />
    </>
  )
}
