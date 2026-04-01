"use client"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion"
import { NAV_LINKS } from "../data"
import ThemeToggle, { STORAGE_KEY, THEMES, Theme, applyTheme } from "./ThemeToggle"
import MagneticButton from "./MagneticButton"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [active, setActive] = useState("Home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileThemeOpen, setMobileThemeOpen] = useState(false)
  const [mobileTheme, setMobileTheme] = useState<Theme>("gold")
  const touchStartX = useRef(0)
  const touchMoveX = useRef(0)
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

      const sectionEntries = NAV_LINKS.map((name) => ({
        name,
        el: document.getElementById(name.toLowerCase().replace(/\s/g, "-")),
      })).filter((entry): entry is { name: string; el: HTMLElement } => !!entry.el)

      if (!sectionEntries.length) return

      const activationLine = 140
      let nextActive = "Home"

      for (const section of sectionEntries) {
        const top = section.el.getBoundingClientRect().top
        if (top <= activationLine) nextActive = section.name
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
    const saved = localStorage.getItem(STORAGE_KEY)
    const migrated = saved === "cyan" ? "cobalt" : saved
    const initial: Theme = THEMES.some((t) => t.id === migrated) ? (migrated as Theme) : "gold"
    setMobileTheme(initial)
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
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false)
        setMobileThemeOpen(false)
      }
    }
    window.addEventListener("keydown", onEsc)
    return () => window.removeEventListener("keydown", onEsc)
  }, [])


  const scrollTo = (section: string) => {
    if (section === "Studio") {
      router.push("/shubiq-studio")
      setMenuOpen(false)
      setMobileThemeOpen(false)
      return
    }
    if (section === "Labs") {
      router.push("/shubiq-labs")
      setMenuOpen(false)
      setMobileThemeOpen(false)
      return
    }
    if (section === "Projects" && pathname !== "/") {
      router.push("/projects")
      setMenuOpen(false)
      setMobileThemeOpen(false)
      return
    }
    const id = section.toLowerCase().replace(/\s/g, "-")
    const target = document.getElementById(id)
    if (!target) {
      router.push(`/#${id}`)
      setMenuOpen(false)
      setMobileThemeOpen(false)
      return
    }

    const w = window as Window & {
      __lenis?: { scrollTo: (target: string | number | HTMLElement, options?: { duration?: number }) => void }
    }

    if (w.__lenis) {
      w.__lenis.scrollTo(target, { duration: 0.8 })
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" })
    }

    setActive(section)
    setMenuOpen(false)
    setMobileThemeOpen(false)
  }

  const applyMobileTheme = (next: Theme) => {
    setMobileTheme(next)
    applyTheme(next, true)
    localStorage.setItem(STORAGE_KEY, next)
    window.dispatchEvent(new Event("shubiq-theme-change"))
  }

  const currentThemeLabel = THEMES.find((t) => t.id === mobileTheme)?.label ?? "Current (Gold & Ink)"

  useEffect(() => {
    if (pathname === "/") return
    if (pathname.startsWith("/projects")) {
      setActive("Projects")
      return
    }
    if (pathname.startsWith("/services")) {
      setActive("Services")
      return
    }
    if (pathname.startsWith("/shubiq-labs")) {
      setActive("Labs")
      return
    }
    if (pathname.startsWith("/shubiq-studio")) {
      setActive("Studio")
      return
    }
    if (pathname.startsWith("/founder")) {
      setActive("About")
      return
    }
    setActive("Home")
  }, [pathname])

  if (pathname === "/shubiq-studio") return null

  return (
    <>
      {/* ── Desktop Navbar (hidden on mobile) ── */}
      <motion.nav
        className="site-navbar hidden md:block fixed top-0 left-0 right-0 z-[9999] transition-[background,backdrop-filter,border-bottom,box-shadow] duration-700"
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        style={{
          background: scrolled
            ? "linear-gradient(to bottom, rgb(var(--surface-2-rgb) / 0.97), rgb(var(--surface-1-rgb) / 0.94))"
            : "linear-gradient(to bottom, rgb(var(--surface-3-rgb) / 0.88), rgb(var(--surface-2-rgb) / 0.72))",
          backdropFilter: scrolled ? "blur(16px)" : "blur(12px)",
          borderBottom: scrolled
            ? "1px solid rgb(var(--gold-rgb) / 0.22)"
            : "1px solid rgb(var(--gold-rgb) / 0.18)",
          boxShadow: scrolled
            ? "0 2px 20px rgb(0 0 0 / 0.32)"
            : "0 1px 12px rgb(0 0 0 / 0.28)",
        }}
      >
        <div className={`max-w-7xl mx-auto px-5 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[3.15rem]" : "h-[3.36rem]"}`}>
          <button onClick={() => scrollTo("Home")} className="group flex items-center h-full gap-[3px]">
            <Image
              src="https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Logo/SHUBIQ.png"
              alt="SHUBIQ" width={160} height={64} priority
              className={`w-auto object-contain transition-opacity duration-200 group-hover:opacity-95 ${scrolled ? "h-8 md:h-[2.2rem]" : "h-8 md:h-[2.35rem]"}`}
              style={{ filter: "drop-shadow(0 0 12px rgb(var(--gold-rgb) / 0.2))" }}
            />
            <span className="hidden sm:inline-block font-cinzel font-bold text-[20px] leading-none tracking-[1px] text-cream/92 group-hover:text-gold transition-colors duration-200">
              SHUBIQ
            </span>
          </button>

          <div className="flex items-center gap-[1.38rem] lg:gap-[1.84rem]">
            {NAV_LINKS.map((link) => (
              <button key={link} onClick={() => scrollTo(link)}
                className={`site-nav-link nav-link relative font-rajdhani font-semibold text-[12px] tracking-[0.72px] uppercase transition-colors duration-200 hover:text-gold/90 ${active === link ? "active" : ""}`}
                style={{ color: active === link ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.8)" }}
              >{link}</button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton onClick={() => scrollTo("Contact")} data-cursor="Hire"
              className="site-nav-cta hire-pulse font-rajdhani text-[12px] font-semibold tracking-[1.7px] uppercase border border-gold/70 bg-gold text-ink px-[18px] py-[7px] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)]">
              Hire Us
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Floating Hamburger ── */}
      <motion.button
        className="md:hidden fixed top-4 right-4 z-[9999] w-11 h-11 flex flex-col items-center justify-center gap-[5px]"
        onClick={() => setMenuOpen(true)}
        animate={{ opacity: menuOpen ? 0 : 1, scale: menuOpen ? 0.8 : 1, pointerEvents: menuOpen ? "none" : "auto" }}
        transition={{ duration: 0.2 }}
        aria-label="Open menu"
        style={{ filter: "drop-shadow(0 2px 8px rgb(0 0 0 / 0.4))" }}
      >
        <span className="block w-6 h-px bg-gold" />
        <span className="block w-4 h-px bg-gold/70 ml-auto" />
        <span className="block w-6 h-px bg-gold" />
      </motion.button>

      {/* ── Full-Screen Cinematic Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* nothing here — panel is the full overlay */}

            {/* Full-screen takeover */}
            <motion.div
              key="fullscreen-menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-[10000] md:hidden flex flex-col overflow-hidden"
              style={{ background: "rgb(var(--surface-0-rgb))" }}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; touchMoveX.current = e.touches[0].clientX }}
              onTouchMove={(e) => { touchMoveX.current = e.touches[0].clientX }}
              onTouchEnd={() => { if (touchMoveX.current - touchStartX.current > 70) { setMenuOpen(false); setMobileThemeOpen(false) } }}
            >
              {/* Deep background glow */}
              <div className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgb(var(--gold-rgb) / 0.07) 0%, transparent 65%)" }} />
              <div className="pointer-events-none absolute inset-0"
                style={{ background: "radial-gradient(ellipse 50% 40% at 90% -10%, rgb(var(--gold-rgb) / 0.04) 0%, transparent 60%)" }} />

              {/* Top gold bar — draws from left */}
              <motion.div
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="h-[2px] w-full origin-left shrink-0"
                style={{ background: "linear-gradient(90deg, rgb(var(--gold-rgb)), rgb(var(--gold-rgb) / 0.4) 60%, transparent)" }}
              />

              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.06, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between px-7 pt-6 pb-4 shrink-0"
              >
                <button onClick={() => scrollTo("Home")} className="flex items-center gap-2.5">
                  <Image src="https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Logo/SHUBIQ.png"
                    alt="SHUBIQ" width={160} height={64} className="h-7 w-auto object-contain"
                    style={{ filter: "drop-shadow(0 0 10px rgb(var(--gold-rgb) / 0.3))" }} />
                  <span className="font-cinzel font-bold text-[15px] tracking-[3.5px] text-cream/85">SHUBIQ</span>
                </button>

                <motion.button
                  onClick={() => { setMenuOpen(false); setMobileThemeOpen(false) }}
                  whileTap={{ scale: 0.85 }}
                  aria-label="Close menu"
                  className="relative w-10 h-10 flex items-center justify-center"
                >
                  <motion.span className="absolute inset-[3px] rounded-full border border-gold/20"
                    animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />
                  <span className="absolute w-[15px] h-px bg-gold rotate-45" />
                  <span className="absolute w-[15px] h-px bg-gold -rotate-45" />
                </motion.button>
              </motion.div>

              {/* Divider */}
              <motion.div initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.14, duration: 0.4 }} className="mx-7 h-px origin-left shrink-0"
                style={{ background: "linear-gradient(90deg, rgb(var(--gold-rgb) / 0.5), transparent)" }} />

              {/* ── Nav items with curtain-reveal ── */}
              <nav className="flex-1 flex flex-col justify-center px-7 py-4 overflow-hidden">
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link
                  return (
                    <div key={link} className="overflow-hidden">
                      <motion.button
                        initial={{ y: "115%", opacity: 0 }}
                        animate={{ y: "0%", opacity: 1 }}
                        exit={{ y: "-105%", opacity: 0 }}
                        transition={{ delay: 0.1 + i * 0.068, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => scrollTo(link)}
                        className="group w-full flex items-center gap-4 py-[7px] text-left active:opacity-50"
                      >
                        {/* Number */}
                        <span className="font-rajdhani text-[10px] tracking-[2px] w-[22px] text-right shrink-0 transition-colors duration-300"
                          style={{ color: isActive ? "rgb(var(--gold-rgb))" : "rgb(var(--cream-rgb) / 0.2)" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        {/* Link text */}
                        <span className="relative font-cinzel leading-none tracking-[1.5px] uppercase transition-colors duration-300"
                          style={{
                            fontSize: "clamp(1.55rem, 6.5vw, 2rem)",
                            color: isActive ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.88)",
                          }}>
                          {link}
                          {/* Active underline */}
                          <motion.span className="absolute left-0 -bottom-1 h-[1.5px] origin-left"
                            animate={{ scaleX: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{ background: "rgb(var(--gold-rgb))", width: "100%", boxShadow: "0 0 8px rgb(var(--gold-rgb) / 0.5)" }}
                          />
                        </span>

                        {/* Active dot */}
                        {isActive && (
                          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="ml-auto w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: "rgb(var(--gold-rgb))", boxShadow: "0 0 8px rgb(var(--gold-rgb) / 0.7)" }} />
                        )}
                      </motion.button>
                    </div>
                  )
                })}
              </nav>

              {/* ── Bottom actions ── */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.62, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="px-7 pb-10 pt-3 shrink-0"
              >
                <div className="mb-4 h-px" style={{ background: "linear-gradient(90deg, rgb(var(--gold-rgb) / 0.25), transparent)" }} />

                {/* Hire Us */}
                <motion.button
                  onClick={() => scrollTo("Contact")}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-3 mb-3 font-rajdhani text-[13px] tracking-[3px] uppercase font-semibold text-ink transition-all duration-300 active:opacity-80"
                  style={{ background: "rgb(var(--gold-rgb))", boxShadow: "0 0 28px rgb(var(--gold-rgb) / 0.22), 0 4px 16px rgb(0 0 0 / 0.3)" }}
                >
                  Hire Us
                </motion.button>

                {/* Appearance row */}
                <button type="button" onClick={() => setMobileThemeOpen((v) => !v)}
                  className="w-full flex items-center gap-2 py-1.5 active:opacity-60">
                  <span className="font-rajdhani text-[10px] tracking-[2.5px] uppercase text-cream/35">Appearance</span>
                  <span className="mx-1 h-px flex-1" style={{ background: "rgb(var(--cream-rgb) / 0.08)" }} />
                  <span className="font-rajdhani text-[10px] tracking-[1.5px] uppercase text-gold/65">{currentThemeLabel}</span>
                  <motion.span animate={{ rotate: mobileThemeOpen ? 180 : 0 }} transition={{ duration: 0.22 }}
                    className="text-[8px] text-gold/40 shrink-0 ml-1">▼</motion.span>
                </button>

                <AnimatePresence>
                  {mobileThemeOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden">
                      <div className="pt-3 grid grid-cols-2 gap-1.5">
                        {THEMES.map((t) => {
                          const isT = t.id === mobileTheme
                          return (
                            <motion.button key={t.id} type="button" onClick={() => applyMobileTheme(t.id)}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-3 py-2 transition-all duration-200"
                              style={{
                                border: `1px solid ${isT ? "rgb(var(--gold-rgb)/0.5)" : "rgb(var(--cream-rgb)/0.1)"}`,
                                background: isT ? "rgb(var(--gold-rgb)/0.09)" : "transparent",
                              }}>
                              <span className="w-2.5 h-2.5 rounded-full shrink-0"
                                style={{ background: isT ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb)/0.3)" }} />
                              <span className="font-rajdhani text-[9px] tracking-[1.5px] uppercase truncate"
                                style={{ color: isT ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb)/0.65)" }}>
                                {t.label.split(" ")[0]}
                              </span>
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="mt-4 font-rajdhani text-[9px] tracking-[2.5px] uppercase text-cream/18 text-center">
                  © {new Date().getFullYear()} SHUBIQ · Intelligence That Wins
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
