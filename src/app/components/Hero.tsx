"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SOCIAL_LINKS } from "../data"
import { useInViewOnce } from "../lib/gsap-hooks"

const EASE_PREMIUM = [0.25, 0.46, 0.45, 0.94] as const

export default function Hero() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>("120px 0px")
  const ring1Ref = useRef<HTMLDivElement>(null)
  const ring2Ref = useRef<HTMLDivElement>(null)
  const ring3Ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [ringsReady, setRingsReady] = useState(false)
  const [wordmarkReady, setWordmarkReady] = useState(false)
  const [taglineReady, setTaglineReady] = useState(false)
  const [ctaReady, setCtaReady] = useState(false)
  const [socialReady, setSocialReady] = useState(false)

  // Ring rotation RAF
  useEffect(() => {
    let a1 = 0, a2 = 0, a3 = 0, rafId: number
    const rotate = () => {
      a1 += 0.0024; a2 -= 0.00144; a3 += 0.0008
      if (ring1Ref.current) ring1Ref.current.style.rotate = `${a1}rad`
      if (ring2Ref.current) ring2Ref.current.style.rotate = `${a2}rad`
      if (ring3Ref.current) ring3Ref.current.style.rotate = `${a3}rad`
      rafId = requestAnimationFrame(rotate)
    }
    rafId = requestAnimationFrame(rotate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  // Ring parallax on scroll
  useEffect(() => {
    if (!sectionRef.current) return
    const handleScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      if (ring1Ref.current) ring1Ref.current.style.transform = `translateY(${-30 * progress}%)`
      if (ring2Ref.current) ring2Ref.current.style.transform = `translateY(${-20 * progress}%)`
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [sectionRef])

  // Allow hero CTAs to be clickable while the hero is active
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

  // Delay hero sequence until after loading screen exit
  useEffect(() => {
    let timeoutId: number | undefined
    const saved = window.sessionStorage.getItem("shubiq-loaded")
    const base = saved ? 220 : 2300
    timeoutId = window.setTimeout(() => setRingsReady(true), base)
    const t2 = window.setTimeout(() => setWordmarkReady(true), base + 700)
    const t3 = window.setTimeout(() => setTaglineReady(true), base + 1050)
    const t4 = window.setTimeout(() => setCtaReady(true), base + 1350)
    const t5 = window.setTimeout(() => setSocialReady(true), base + 1550)
    return () => {
      if (timeoutId) window.clearTimeout(timeoutId)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      window.clearTimeout(t4)
      window.clearTimeout(t5)
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

  // Shared entrance transition factory
  const fadeUp = (delay: number, duration = 0.5) =>
    prefersReduced
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, delay, ease: "easeOut" as const },
        }

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate min-h-screen max-[768px]:min-h-[66svh] flex items-center max-[768px]:items-start justify-center overflow-visible px-5 max-[768px]:px-[14px] sm:px-6 pt-[14vh] max-[768px]:pt-[24vh] pb-10 max-[768px]:pb-0 sm:pb-16"
    >
      {/* Background grid */}
      <div
        className="hero-bg hero-grid-overlay absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--gold-rgb) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--gold-rgb) / 0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <motion.div
        className="hero-bg hero-center-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] md:w-[1100px] md:h-[1100px] rounded-full"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.09) 0%, transparent 65%)" }}
        initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
        animate={ringsReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.9, ease: EASE_PREMIUM }}
      />

      {/* Animated rings (CSS-based, keep existing) */}
      <div
        ref={ring1Ref}
        className={`hero-bg hero-ring absolute top-1/2 left-1/2 max-[768px]:scale-[0.86] ${isInView && ringsReady ? "in-view" : ""}`}
        style={{ width: 720, height: 720, marginLeft: -360, marginTop: -360, opacity: 0, animationDelay: "0.1s" }}
      >
        <div className="hero-ring-1-border absolute inset-0 rounded-full border border-[rgb(var(--gold-rgb)/0.14)]" />
        <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-gold/80 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-[8%] w-1 h-1 rounded-full bg-gold/25" />
        <div className="absolute top-1/3 right-0 w-1.5 h-1.5 rounded-full bg-gold/15" />
      </div>
      <div
        ref={ring2Ref}
        className={`hero-bg hero-ring absolute top-1/2 left-1/2 max-[768px]:scale-[0.86] ${isInView && ringsReady ? "in-view" : ""}`}
        style={{ width: 460, height: 460, marginLeft: -230, marginTop: -230, opacity: 0, animationDelay: "0.28s" }}
      >
        <div className="hero-ring-2-border absolute inset-0 rounded-full" style={{ border: "1px dashed rgb(var(--gold-rgb) / 0.12)" }} />
        <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-gold/30 -translate-x-1/2" />
      </div>
      <div
        ref={ring3Ref}
        className={`hero-bg hero-ring absolute top-1/2 left-1/2 max-[768px]:scale-[0.86] ${isInView && ringsReady ? "in-view" : ""}`}
        style={{ width: 270, height: 270, marginLeft: -135, marginTop: -135, opacity: 0, animationDelay: "0.46s" }}
      >
        <div className="hero-ring-3-border absolute inset-0 rounded-full" style={{ border: "1px solid rgb(var(--gold-rgb) / 0.1)" }} />
      </div>

      {/* Main content — cinematic entrance */}
      <div className="hero-content relative z-20 text-center w-full mx-auto md:-translate-y-10 max-[768px]:translate-y-0 overflow-visible">

        {/* SHUBIQ wordmark — blur + scale entrance */}
        <div className="inline-block w-fit overflow-visible pb-[0.08em] md:pb-[0.12em] pr-[0.12em] md:pr-[0.18em] relative">
          <div
            className="absolute inset-0 -z-10 blur-2xl opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgb(var(--gold-rgb) / 0.22) 0%, transparent 70%)",
              transform: "translateY(6px)",
            }}
          />
        {(() => {
          const letters = ["S", "H", "U", "B", "I", "Q"]
          const offsets = [
            { x: -90, y: -70, rotate: -14 },
            { x: 80, y: -82, rotate: 12 },
            { x: -64, y: 70, rotate: -11 },
            { x: 72, y: 54, rotate: 13 },
            { x: -88, y: -12, rotate: -9 },
            { x: 96, y: 22, rotate: 10 },
          ]
          const containerVariants = {
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.12,
                delayChildren: 0.05,
              },
            },
          }
          const letterVariants = {
            hidden: (i: number) =>
              prefersReduced
                ? { opacity: 1 }
                : {
                    opacity: 0,
                    x: offsets[i].x,
                    y: offsets[i].y,
                    rotate: offsets[i].rotate,
                    scale: 0.92,
                    filter: "blur(8px)",
                  },
            visible: {
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: { duration: 0.9, ease: EASE_PREMIUM },
            },
          }

          return (
            <motion.h1
              className="font-cinzel font-normal text-[clamp(98px,20.1vw,206px)] max-[768px]:text-[clamp(72px,23vw,104px)] md:text-[clamp(108px,12.6vw,201px)] leading-[1.12] max-[768px]:leading-[1.04] md:leading-[1.15] tracking-[1.5px] max-[768px]:tracking-[0.9px] md:tracking-[1.6px] mb-0 perspective-1000 pb-[0.24em] md:pb-[0.3em] px-[0.22em] max-[768px]:px-[0.1em] md:px-[0.26em] inline-block overflow-visible whitespace-nowrap -mt-[10px]"
              style={{ perspective: "800px", fontFamily: "'Algerian','Cinzel',serif" }}
              variants={containerVariants}
              initial="hidden"
              animate={wordmarkReady ? "visible" : "hidden"}
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={letter}
                  custom={i}
                  variants={letterVariants}
                  className="inline-block text-gradient-gold"
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>
          )
        })()}
        </div>

        {/* Tagline with lines */}
        <motion.div
          className="hero-tagline-row mb-2 max-[768px]:mb-1 md:mb-3 -mt-12 max-[768px]:-mt-5 md:-mt-16"
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={taglineReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.55, delay: 0.05, ease: EASE_PREMIUM }}
        >
          <span className="hero-tagline-line" />
          <span className="site-hero-tagline font-cormorant font-medium italic text-gold uppercase tracking-[3.6px] md:tracking-[7px]">
            Intelligence That Wins
          </span>
          <span className="hero-tagline-line" />
        </motion.div>

        {/* Spacing before CTAs */}
        <div className="h-4 sm:h-10 max-[768px]:h-20" />

        <div className="max-[768px]:mx-auto max-[768px]:w-full max-[768px]:max-w-[342px] max-[768px]:rounded-[16px] max-[768px]:bg-[linear-gradient(180deg,rgb(var(--gold-rgb)/0.06),rgb(var(--surface-1-rgb)/0.04))] max-[768px]:px-1 max-[768px]:pt-1 max-[768px]:pb-0">
          {/* CTA Buttons */}
          <motion.div
            className="hero-interactive relative z-30 flex gap-6 max-[768px]:gap-2.5 sm:gap-7 justify-center max-[768px]:flex-col max-[768px]:items-center max-[768px]:w-full max-[768px]:max-w-[360px] max-[768px]:mx-auto flex-wrap mt-8 max-[768px]:mt-0 sm:mt-14 mb-5 max-[768px]:mb-3 sm:mb-6"
            initial={prefersReduced ? {} : { opacity: 0, y: 18 }}
            animate={ctaReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE_PREMIUM }}
          >
            <button
              type="button"
              onClick={() => scrollTo("projects")}
              data-cursor="View"
              className="hero-cta cta-ghost w-full sm:w-auto max-[768px]:w-[76%] min-w-0 sm:min-w-[220px] max-w-none max-[768px]:max-w-[252px] sm:max-w-[320px] font-rajdhani text-[13px] sm:text-[15px] tracking-[2.8px] sm:tracking-[3.6px] uppercase px-8 sm:px-10 py-[14px] sm:py-3.5 max-[768px]:py-[10px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 border border-gold/30 text-cream"
            >
              <span className="relative z-[1]">Explore Work</span>
            </button>
            <button
              type="button"
              onClick={() => scrollTo("contact")}
              data-cursor="Hire"
              className="hero-cta cta-ghost w-full sm:w-auto max-[768px]:w-[76%] min-w-0 sm:min-w-[220px] max-w-none max-[768px]:max-w-[252px] sm:max-w-[320px] font-rajdhani text-[13px] sm:text-[15px] tracking-[2.8px] sm:tracking-[3.6px] uppercase px-8 sm:px-10 py-[14px] sm:py-3.5 max-[768px]:py-[10px] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 border border-gold/30 text-cream"
            >
              <span className="relative z-[1]">Hire Us</span>
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="mx-auto w-full max-[768px]:max-w-[320px] sm:w-fit border-t border-gold/15 max-[768px]:border-t-0 pt-4 sm:pt-5 max-[768px]:pt-0 grid max-[768px]:grid-cols-3 grid-cols-2 sm:flex max-[768px]:gap-x-2 gap-x-5 sm:gap-x-7 max-[768px]:gap-y-2 gap-y-3 sm:gap-8 justify-center items-center mb-6 max-[768px]:mb-0 sm:mb-8 mt-6 max-[768px]:mt-10 sm:mt-8"
            initial={prefersReduced ? {} : { opacity: 0, y: 16 }}
            animate={socialReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.55, delay: 0.05, ease: EASE_PREMIUM }}
          >
            {SOCIAL_LINKS.map((s) => (
              <div key={s.label} className="flex items-center justify-center">
                <a
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="site-hero-social font-rajdhani text-[11px] sm:text-[13px] tracking-[1.2px] sm:tracking-[3.1px] text-cream/70 uppercase hover:text-gold transition-colors duration-300 text-center whitespace-nowrap"
                >
                  {s.label}
                </a>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator with bounce */}
        <motion.div
          className="absolute bottom-1 sm:bottom-2 left-0 right-0 hidden sm:flex flex-col items-center gap-2 opacity-70"
        {...fadeUp(1.1, 0.4)}
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
