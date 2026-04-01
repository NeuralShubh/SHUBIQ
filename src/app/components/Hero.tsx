"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { SOCIAL_LINKS } from "../data"
import { useInViewOnce } from "../lib/gsap-hooks"

const EASE_PREMIUM = [0.25, 0.46, 0.45, 0.94] as const

const FOCUS_WORDS = ["Revenue", "Authority", "Momentum"]
const SIGNALS = [
  { label: "Current Lane", value: "Design + Engineering" },
  { label: "Delivery Pulse", value: "Weekly Iteration" },
  { label: "Response Standard", value: "< 24 Hours" },
]

export default function Hero() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>("120px 0px")
  const ring1Ref = useRef<HTMLDivElement>(null)
  const ring2Ref = useRef<HTMLDivElement>(null)
  const ring3Ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()

  const [ringsReady, setRingsReady] = useState(false)
  const [wordmarkReady, setWordmarkReady] = useState(false)
  const [copyReady, setCopyReady] = useState(false)
  const [ctaReady, setCtaReady] = useState(false)
  const [panelReady, setPanelReady] = useState(false)
  const [socialReady, setSocialReady] = useState(false)
  const [focusIndex, setFocusIndex] = useState(0)
  const [signalIndex, setSignalIndex] = useState(0)

  const stats = useMemo(
    () => [
      { label: "Projects Shipped", value: "40+", level: "84%" },
      { label: "Delivery Rhythm", value: "Weekly", level: "73%" },
      { label: "Response Standard", value: "< 24h", level: "91%" },
    ],
    [],
  )

  useEffect(() => {
    let a1 = 0
    let a2 = 0
    let a3 = 0
    let rafId: number

    const rotate = () => {
      a1 += 0.0022
      a2 -= 0.0013
      a3 += 0.0008
      if (ring1Ref.current) ring1Ref.current.style.rotate = `${a1}rad`
      if (ring2Ref.current) ring2Ref.current.style.rotate = `${a2}rad`
      if (ring3Ref.current) ring3Ref.current.style.rotate = `${a3}rad`
      rafId = requestAnimationFrame(rotate)
    }

    rafId = requestAnimationFrame(rotate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return

    const handleScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      if (ring1Ref.current) ring1Ref.current.style.transform = `translateY(${-30 * progress}%)`
      if (ring2Ref.current) ring2Ref.current.style.transform = `translateY(${-20 * progress}%)`
      if (ring3Ref.current) ring3Ref.current.style.transform = `translateY(${-12 * progress}%)`
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [sectionRef])

  useEffect(() => {
    const updateHeroState = () => {
      const active = window.scrollY < window.innerHeight * 0.65
      document.body.classList.toggle("hero-active", active)
    }
    updateHeroState()
    window.addEventListener("scroll", updateHeroState, { passive: true })
    window.addEventListener("resize", updateHeroState)

    return () => {
      window.removeEventListener("scroll", updateHeroState)
      window.removeEventListener("resize", updateHeroState)
      document.body.classList.remove("hero-active")
    }
  }, [])

  useEffect(() => {
    const saved = window.sessionStorage.getItem("shubiq-loaded")
    const base = saved ? 220 : 2300

    const t1 = window.setTimeout(() => setRingsReady(true), base)
    const t2 = window.setTimeout(() => setWordmarkReady(true), base + 260)
    const t3 = window.setTimeout(() => setCopyReady(true), base + 520)
    const t4 = window.setTimeout(() => setPanelReady(true), base + 700)
    const t5 = window.setTimeout(() => setCtaReady(true), base + 850)
    const t6 = window.setTimeout(() => setSocialReady(true), base + 980)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      window.clearTimeout(t4)
      window.clearTimeout(t5)
      window.clearTimeout(t6)
    }
  }, [])

  useEffect(() => {
    const wordTimer = window.setInterval(() => {
      setFocusIndex((prev) => (prev + 1) % FOCUS_WORDS.length)
    }, 2500)

    const signalTimer = window.setInterval(() => {
      setSignalIndex((prev) => (prev + 1) % SIGNALS.length)
    }, 2800)

    return () => {
      window.clearInterval(wordTimer)
      window.clearInterval(signalTimer)
    }
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    if ((window as any).__lenis) {
      ;(window as any).__lenis.scrollTo(el, { offset: -80 })
    } else {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate min-h-screen overflow-hidden px-5 max-[768px]:px-[14px] sm:px-6 pt-[8.3rem] max-[768px]:pt-[7.2rem] pb-10 sm:pb-16"
    >
      <div
        className="hero-bg hero-grid-overlay absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--gold-rgb) / 0.045) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--gold-rgb) / 0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 22% 28%, rgb(var(--gold-rgb) / 0.12) 0%, transparent 54%), radial-gradient(ellipse at 84% 74%, rgb(var(--gold-rgb) / 0.08) 0%, transparent 52%)",
        }}
      />

      <motion.div
        className="hero-bg hero-center-glow absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] md:w-[1200px] md:h-[1200px] rounded-full"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.085) 0%, transparent 66%)" }}
        initial={prefersReduced ? false : { opacity: 0, scale: 0.94 }}
        animate={ringsReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.85, ease: EASE_PREMIUM }}
      />

      <div
        ref={ring1Ref}
        className={`hero-bg hero-ring absolute top-[47%] left-1/2 ${isInView && ringsReady ? "in-view" : ""}`}
        style={{ width: 840, height: 840, marginLeft: -420, marginTop: -420, opacity: 0, animationDelay: "0.1s" }}
      >
        <div className="hero-ring-1-border absolute inset-0 rounded-full border border-[rgb(var(--gold-rgb)/0.14)]" />
      </div>
      <div
        ref={ring2Ref}
        className={`hero-bg hero-ring absolute top-[47%] left-1/2 ${isInView && ringsReady ? "in-view" : ""}`}
        style={{ width: 560, height: 560, marginLeft: -280, marginTop: -280, opacity: 0, animationDelay: "0.24s" }}
      >
        <div className="hero-ring-2-border absolute inset-0 rounded-full" style={{ border: "1px dashed rgb(var(--gold-rgb) / 0.12)" }} />
      </div>
      <div
        ref={ring3Ref}
        className={`hero-bg hero-ring absolute top-[47%] left-1/2 ${isInView && ringsReady ? "in-view" : ""}`}
        style={{ width: 320, height: 320, marginLeft: -160, marginTop: -160, opacity: 0, animationDelay: "0.36s" }}
      >
        <div className="hero-ring-3-border absolute inset-0 rounded-full" style={{ border: "1px solid rgb(var(--gold-rgb) / 0.1)" }} />
      </div>

      <div className="hero-content relative z-20 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1.03fr_0.97fr] lg:gap-12">
          <div>
            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
              animate={wordmarkReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.45, ease: EASE_PREMIUM }}
              className="mb-5 inline-flex items-center gap-2.5 border border-gold/24 bg-gold/[0.06] px-4 py-2"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-gold/80" />
              <span className="font-rajdhani text-[10px] tracking-[3px] uppercase text-gold/78">SHUBIQ Digital Systems Lab</span>
            </motion.div>

            <motion.h1
              initial={prefersReduced ? {} : { opacity: 0, y: 24, filter: "blur(3px)" }}
              animate={wordmarkReady ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 24, filter: "blur(3px)" }}
              transition={{ duration: 0.72, delay: 0.06, ease: EASE_PREMIUM }}
              className="font-cinzel font-black leading-[0.93] text-cream/95"
              style={{ fontSize: "clamp(42px, 7.2vw, 96px)" }}
            >
              Build Digital
              <span className="block text-gold/92">Advantage.</span>
            </motion.h1>

            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 20 }}
              animate={copyReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.12, ease: EASE_PREMIUM }}
              className="mt-5"
            >
              <p className="max-w-[680px] font-cormorant leading-[1.7] text-cream/84" style={{ fontSize: "clamp(17px, 1.35vw, 22px)" }}>
                SHUBIQ designs and engineers high-performance digital products for founders and ambitious brands.
                We move from strategy to launch with speed, precision, and measurable outcomes.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.24)] bg-[rgb(var(--gold-rgb)/0.09)] px-3 py-1.5">
                <span className="font-rajdhani text-[9px] tracking-[2.4px] uppercase text-cream/62">Built For</span>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={FOCUS_WORDS[focusIndex]}
                    initial={{ opacity: 0, y: 7, filter: "blur(2px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -7, filter: "blur(2px)" }}
                    transition={{ duration: 0.32 }}
                    className="font-rajdhani text-[10px] tracking-[2.8px] uppercase text-gold/82"
                  >
                    {FOCUS_WORDS[focusIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              className="hero-interactive relative z-30 mt-8 flex flex-wrap gap-4 max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:max-w-[360px]"
              initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
              animate={ctaReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE_PREMIUM }}
            >
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                data-cursor="View"
                className="hero-cta cta-ghost w-full sm:w-auto min-w-0 sm:min-w-[220px] max-w-none sm:max-w-[320px] font-rajdhani text-[13px] sm:text-[15px] tracking-[2.8px] sm:tracking-[3.6px] uppercase px-8 sm:px-10 py-[14px] sm:py-3.5 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 border border-gold/30 text-cream"
              >
                <span className="relative z-[1]">Explore Work</span>
              </button>
              <button
                type="button"
                onClick={() => scrollTo("contact")}
                data-cursor="Hire"
                className="hero-cta cta-ghost w-full sm:w-auto min-w-0 sm:min-w-[220px] max-w-none sm:max-w-[320px] font-rajdhani text-[13px] sm:text-[15px] tracking-[2.8px] sm:tracking-[3.6px] uppercase px-8 sm:px-10 py-[14px] sm:py-3.5 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 border border-gold/30 text-cream"
              >
                <span className="relative z-[1]">Hire Us</span>
              </button>
            </motion.div>

            <motion.div
              initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
              animate={socialReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE_PREMIUM }}
              className="mt-7"
            >
              <div className="mx-auto sm:mx-0 w-full max-[768px]:max-w-[360px] sm:w-fit border-t border-gold/15 pt-4 sm:pt-5 grid grid-cols-2 sm:flex gap-x-5 sm:gap-x-7 gap-y-3 sm:gap-y-0 justify-center items-center">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="site-hero-social font-rajdhani text-[11px] sm:text-[13px] tracking-[1.45px] sm:tracking-[3.1px] text-cream/68 uppercase hover:text-gold transition-colors duration-300 text-center whitespace-nowrap"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, x: 20 }}
            animate={panelReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.62, delay: 0.1, ease: EASE_PREMIUM }}
            className="relative"
          >
            <div className="rounded-[28px] border border-[rgb(var(--gold-rgb)/0.3)] bg-[linear-gradient(164deg,rgb(var(--gold-rgb)/0.15),rgb(var(--surface-1-rgb)/0.88)_46%)] p-6 sm:p-7">
              <div className="flex items-center justify-between gap-3">
                <p className="font-rajdhani text-[10px] tracking-[2.8px] uppercase text-gold/72">Command Dashboard</p>
                <span className="rounded-full border border-[rgb(var(--gold-rgb)/0.26)] bg-[rgb(var(--gold-rgb)/0.08)] px-3 py-1 font-rajdhani text-[8px] tracking-[2.2px] uppercase text-cream/70">
                  Live Mode
                </span>
              </div>

              <h3 className="mt-2 font-cinzel text-[34px] leading-[0.96] text-cream">Ship With Precision</h3>

              <div className="mt-5 rounded-2xl border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.03)] p-4">
                <p className="font-rajdhani text-[9px] tracking-[2.4px] uppercase text-cream/58">Signal Stream</p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={SIGNALS[signalIndex].label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.34 }}
                    className="mt-2"
                  >
                    <p className="font-cinzel text-[22px] leading-[1.02] text-cream">{SIGNALS[signalIndex].value}</p>
                    <p className="font-rajdhani text-[8px] tracking-[2.1px] uppercase text-gold/68">{SIGNALS[signalIndex].label}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-6 grid gap-3">
                {stats.map((row, index) => (
                  <motion.div
                    key={row.label}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.44, delay: 0.24 + index * 0.08 }}
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
                        transition={{ duration: 1.05, delay: 0.38 + index * 0.08, ease: "easeOut" }}
                        className="h-full bg-[linear-gradient(90deg,rgb(var(--gold-rgb)),rgb(var(--gold-light-rgb)))]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-1 sm:bottom-2 left-0 right-0 hidden sm:flex flex-col items-center gap-2 opacity-70"
        initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
        animate={socialReady ? { opacity: 0.7, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.5, delay: 0.12 }}
      >
        <motion.span
          className="font-rajdhani text-[14px] tracking-[5px] text-cream/60 uppercase"
          animate={prefersReduced ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.5 }}
        >
          Scroll
        </motion.span>
        <div className="w-px h-12 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-gold to-transparent animate-scroll-line" />
        </div>
      </motion.div>
    </section>
  )
}
