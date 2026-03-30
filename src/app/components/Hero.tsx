"use client"
import { useEffect, useRef } from "react"
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
      className="relative isolate min-h-screen flex items-center justify-center overflow-visible px-5 max-[768px]:px-[14px] sm:px-6 pt-[14vh] max-[768px]:pt-[12vh] pb-10 sm:pb-16"
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
      <div
        className="hero-bg hero-center-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] md:w-[1100px] md:h-[1100px] rounded-full"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.09) 0%, transparent 65%)" }}
      />

      {/* Animated rings (CSS-based, keep existing) */}
      <div
        ref={ring1Ref}
        className={`hero-bg hero-ring absolute top-1/2 left-1/2 ${isInView ? "in-view" : ""}`}
        style={{ width: 720, height: 720, marginLeft: -360, marginTop: -360, opacity: 0, animationDelay: "0.1s" }}
      >
        <div className="hero-ring-1-border absolute inset-0 rounded-full border border-[rgb(var(--gold-rgb)/0.14)]" />
        <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-gold/80 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-[8%] w-1 h-1 rounded-full bg-gold/25" />
        <div className="absolute top-1/3 right-0 w-1.5 h-1.5 rounded-full bg-gold/15" />
      </div>
      <div
        ref={ring2Ref}
        className={`hero-bg hero-ring absolute top-1/2 left-1/2 ${isInView ? "in-view" : ""}`}
        style={{ width: 460, height: 460, marginLeft: -230, marginTop: -230, opacity: 0, animationDelay: "0.28s" }}
      >
        <div className="hero-ring-2-border absolute inset-0 rounded-full" style={{ border: "1px dashed rgb(var(--gold-rgb) / 0.12)" }} />
        <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-gold/30 -translate-x-1/2" />
      </div>
      <div
        ref={ring3Ref}
        className={`hero-bg hero-ring absolute top-1/2 left-1/2 ${isInView ? "in-view" : ""}`}
        style={{ width: 270, height: 270, marginLeft: -135, marginTop: -135, opacity: 0, animationDelay: "0.46s" }}
      >
        <div className="hero-ring-3-border absolute inset-0 rounded-full" style={{ border: "1px solid rgb(var(--gold-rgb) / 0.1)" }} />
      </div>

      {/* Main content — cinematic entrance */}
      <div className="hero-content relative z-20 text-center max-w-[51rem] max-[768px]:max-w-[46rem] w-full mx-auto md:-translate-y-10 overflow-visible">

        {/* SHUBIQ wordmark — blur + scale entrance */}
        <div className="inline-block w-fit overflow-visible pb-[0.08em] md:pb-[0.12em] pr-[0.12em] md:pr-[0.18em] relative">
          <div
            className="absolute inset-0 -z-10 blur-2xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgb(var(--gold-rgb) / 0.35) 0%, transparent 70%)",
              transform: "translateY(6px)",
            }}
          />
        <motion.h1
          className="font-cinzel font-normal text-[clamp(98px,20.1vw,206px)] max-[768px]:text-[clamp(77px,24.5vw,114px)] md:text-[clamp(108px,12.6vw,201px)] leading-[1.12] max-[768px]:leading-[1.1] md:leading-[1.15] tracking-[1.5px] max-[768px]:tracking-[1.1px] md:tracking-[1.6px] mb-4 max-[768px]:mb-[10px] md:mb-5 text-gradient-gold perspective-1000 pb-[0.24em] md:pb-[0.3em] pr-[0.56em] max-[768px]:pr-[0.4em] md:pr-[0.62em] inline-block overflow-visible max-w-full break-normal whitespace-normal -mt-[10px]"
          style={{ perspective: "800px", fontFamily: "'Algerian','Cinzel',serif" }}
          initial={prefersReduced ? {} : { opacity: 0, scale: 0.98, filter: "blur(4px)", y: 16 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, ease: EASE_PREMIUM }}
          >
            SHUBIQ
          </motion.h1>
        </div>

        {/* Tagline with lines */}
        <motion.div
          className="hero-tagline-row mb-2 max-[768px]:mb-1.5 md:mb-3 -mt-4 md:-mt-5"
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25, ease: EASE_PREMIUM }}
        >
          <span className="hero-tagline-line" />
          <span className="site-hero-tagline font-cormorant font-medium italic text-gold uppercase tracking-[3.6px] md:tracking-[7px]">
            Intelligence That Wins
          </span>
          <span className="hero-tagline-line" />
        </motion.div>

        {/* Spacing before CTAs */}
        <div className="h-3 sm:h-4" />

        {/* CTA Buttons */}
        <motion.div
          className="hero-interactive relative z-30 flex gap-6 max-[768px]:gap-4 sm:gap-7 justify-center max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:w-full max-[768px]:max-w-[360px] max-[768px]:mx-auto flex-wrap mt-8 sm:mt-10 mb-5 sm:mb-6"
          initial={prefersReduced ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.45, ease: EASE_PREMIUM }}
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

        {/* Social links */}
        <motion.div
          className="mx-auto w-full max-[768px]:max-w-[360px] sm:w-fit border-t border-gold/15 pt-3 sm:pt-4 grid grid-cols-2 sm:flex max-[768px]:gap-x-6 gap-x-5 sm:gap-x-7 max-[768px]:gap-y-4 gap-y-3 sm:gap-8 justify-center items-center mb-6 sm:mb-8"
          initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.6, ease: EASE_PREMIUM }}
        >
          {SOCIAL_LINKS.map((s) => (
            <div key={s.label} className="flex items-center justify-center">
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="site-hero-social font-rajdhani text-[11px] sm:text-[13px] tracking-[1.45px] sm:tracking-[3.1px] text-cream/68 uppercase hover:text-gold transition-colors duration-300 text-center whitespace-nowrap"
              >
                {s.label}
              </a>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator with bounce */}
      <motion.div
        className="absolute bottom-1 sm:bottom-2 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 opacity-70"
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
