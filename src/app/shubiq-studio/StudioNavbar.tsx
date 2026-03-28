"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import ThemeToggle from "../components/ThemeToggle"

const STUDIO_LINKS = [
  { label: "Home", id: "studio-hero" },
  { label: "Services", id: "studio-services-anchor" },
  { label: "Portfolio", id: "studio-portfolio-anchor" },
  { label: "Pricing", id: "studio-pricing-anchor" },
  { label: "Contact", id: "studio-contact-anchor" },
]

export default function StudioNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState("studio-hero")
  const [menuOpen, setMenuOpen] = useState(false)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(latest > previous && latest > 150)
    setScrolled(latest > 24)
  })

  useEffect(() => {
    let ticking = false

    const updateNavState = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0

      const doc = document.documentElement
      const scrollable = Math.max(1, doc.scrollHeight - window.innerHeight)
      const progress = Math.min(100, (scrollTop / scrollable) * 100)
      if (progressBarRef.current) progressBarRef.current.style.width = `${progress}%`

      const activationLine = 140
      let nextActive = "studio-hero"

      for (const link of STUDIO_LINKS) {
        const section = document.getElementById(link.id)
        if (!section) continue
        if (section.getBoundingClientRect().top <= activationLine) {
          nextActive = link.id
        }
      }

      setActive(nextActive)
      ticking = false
    }

    const onScrollOrResize = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(updateNavState)
    }

    updateNavState()
    window.addEventListener("scroll", onScrollOrResize, { passive: true })
    window.addEventListener("resize", onScrollOrResize)
    return () => {
      window.removeEventListener("scroll", onScrollOrResize)
      window.removeEventListener("resize", onScrollOrResize)
    }
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ""
      return
    }
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        gsap.fromTo(
          navRef.current,
          { y: -60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.4 },
        )
      } catch {
        // no-op
      }
    }
    init()
  }, [])

  const scrollTo = (id: string) => {
    const target = document.getElementById(id)
    if (!target) return
    const navHeight = Math.ceil(navRef.current?.getBoundingClientRect().height ?? 56)
    const offset =
      id === "studio-services-anchor" ||
      id === "studio-portfolio-anchor" ||
      id === "studio-pricing-anchor"
        ? -(navHeight - 8)
        : -(navHeight + 10)

    const w = window as Window & {
      __lenis?: {
        scrollTo: (
          target: string | number | HTMLElement,
          options?: { duration?: number; offset?: number },
        ) => void
      }
    }

    if (w.__lenis) {
      w.__lenis.scrollTo(target, { duration: 0.8, offset })
    } else {
      const top = window.scrollY + target.getBoundingClientRect().top + offset
      window.scrollTo({ top, behavior: "smooth" })
    }

    setActive(id)
    setMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        className="site-navbar fixed top-0 left-0 right-0 z-[900] transition-all duration-500"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        style={{
          background: scrolled
            ? "linear-gradient(to bottom, rgb(var(--surface-2-rgb) / 0.96), rgb(var(--surface-1-rgb) / 0.92))"
            : "linear-gradient(to bottom, rgb(var(--surface-1-rgb) / 0.84), rgb(var(--ink-rgb) / 0.46))",
          backdropFilter: scrolled ? "blur(12px)" : "blur(6px)",
          borderBottom: scrolled
            ? "1px solid rgb(var(--gold-rgb) / 0.18)"
            : "1px solid rgb(var(--gold-rgb) / 0.1)",
          boxShadow: scrolled ? "0 8px 26px rgb(0 0 0 / 0.22)" : "none",
          opacity: 0,
        }}
      >
        <div
          ref={progressBarRef}
          className="absolute left-0 top-0 h-[2px] bg-gold/85"
          style={{ width: "0%", transition: "width 80ms linear" }}
        />
        <div className={`max-w-7xl mx-auto px-5 max-[768px]:px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[3.15rem] max-[768px]:h-[3.05rem]" : "h-[3.36rem] max-[768px]:h-[3.15rem]"}`}>
          <div className="flex items-center h-full gap-2.5">
            <button onClick={() => scrollTo("studio-hero")} className="group flex items-center h-full gap-[3px]">
              <Image
                src="https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Logo/SHUBIQ.png"
                alt="SHUBIQ"
                width={180}
                height={72}
                priority
                className={`w-auto object-contain transition-opacity duration-200 group-hover:opacity-95 ${scrolled ? "h-8 max-[768px]:h-[1.82rem] sm:h-[2.1rem] md:h-[2.2rem]" : "h-8 max-[768px]:h-[1.9rem] sm:h-[2.2rem] md:h-[2.35rem]"}`}
                style={{ filter: "drop-shadow(0 0 12px rgb(var(--gold-rgb) / 0.2))" }}
              />
              <span className="hidden sm:inline-block font-cinzel font-bold text-[19px] leading-none tracking-[1px] text-cream/92 group-hover:text-gold transition-colors duration-200">
                SHUBIQ Studio
              </span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            <Link
              href="/"
              className="site-nav-link nav-link relative font-rajdhani font-semibold text-[12px] tracking-[1px] uppercase transition-all duration-200 px-2.5 py-1.5 text-[rgb(var(--cream-rgb)/0.8)] hover:text-gold/90"
            >
              SHUBIQ
            </Link>
            {STUDIO_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                aria-current={active === link.id ? "page" : undefined}
                className={`site-nav-link nav-link relative font-rajdhani font-semibold text-[12px] tracking-[1px] uppercase transition-all duration-200 px-2.5 py-1.5 ${
                  active === link.id
                    ? "text-[rgb(var(--gold-light-rgb))] active"
                    : "text-[rgb(var(--cream-rgb)/0.8)] hover:text-gold/90"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => scrollTo("studio-contact-anchor")}
              className="site-nav-cta font-rajdhani text-[12px] font-semibold tracking-[1.7px] uppercase border border-gold/70 bg-gold text-ink px-[18px] py-[7px] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)]"
            >
              Start Project
            </button>
          </div>

          <button
            className={`md:hidden flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center flex-col gap-1.5 border border-[rgb(var(--cream-rgb)/0.22)] bg-ink/40 rounded-sm transition-opacity duration-300 active:opacity-75 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="block h-px bg-gold transition-all duration-300"
                style={{ width: i === 1 ? "16px" : "24px" }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      <div
        className="fixed inset-0 z-[950] md:hidden transition-opacity duration-300"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          background: "rgb(var(--ink-rgb) / 0.48)",
          backdropFilter: "blur(6px)",
        }}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className="absolute inset-y-0 right-0 w-[88vw] max-w-[360px] border-l border-gold/18 bg-[rgb(var(--surface-1-rgb)/0.95)] shadow-[-12px_0_36px_rgb(0_0_0_/_0.34)] transition-transform duration-[380ms] ease-out"
          style={{ transform: menuOpen ? "translateX(0%)" : "translateX(104%)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-10 h-[72px] border-b border-gold/16 px-5 backdrop-blur-md bg-[rgb(var(--surface-2-rgb)/0.72)] flex items-center justify-between">
            <span className="font-cinzel font-semibold text-[18px] tracking-[0.8px] text-cream/92">SHUBIQ Studio</span>
            <button
              onClick={() => setMenuOpen(false)}
              className="relative w-11 h-11 border border-gold/28 flex items-center justify-center rounded-sm active:opacity-75"
              aria-label="Close menu"
            >
              <span className="block w-4 h-px bg-gold rotate-45 absolute" />
              <span className="block w-4 h-px bg-gold -rotate-45 absolute" />
            </button>
          </div>

          <div className="px-5 py-5">
            <div className="flex flex-col">
              {STUDIO_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left min-h-[54px] py-3 border-b border-b-[0.5px] border-gold/18 transition-opacity duration-200 active:opacity-70"
                  style={{ color: active === link.id ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.92)" }}
                >
                  <span className="relative inline-block font-cinzel text-[1.4rem] leading-[1.08] tracking-[2px] uppercase">
                    {link.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <Link
                href="/"
                className="w-full text-center font-rajdhani text-[12px] font-semibold tracking-[2px] uppercase border border-[rgb(var(--cream-rgb)/0.24)] bg-[rgb(var(--surface-2-rgb)/0.42)] text-cream px-4 py-3 transition-colors duration-200 hover:border-gold/40 hover:text-gold"
              >
                Back Home
              </Link>
              <button
                onClick={() => scrollTo("studio-contact-anchor")}
                className="w-full font-rajdhani text-[12px] font-semibold tracking-[2px] uppercase border border-gold/70 bg-gold text-ink px-4 py-3 transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)]"
              >
                Start Project
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
