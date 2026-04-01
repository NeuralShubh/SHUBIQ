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
      <motion.nav
        className="site-navbar fixed top-0 left-0 right-0 z-[9999] transition-[background,backdrop-filter,border-bottom,box-shadow] duration-700"
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
        <div className={`max-w-7xl mx-auto px-5 max-[768px]:px-4 sm:px-6 lg:px-12 flex items-center justify-between transition-all duration-500 ${scrolled ? "h-[3.15rem] max-[768px]:h-[3.05rem]" : "h-[3.36rem] max-[768px]:h-[3.15rem]"}`}>
          <button onClick={() => scrollTo("Home")} className="group flex items-center h-full gap-[3px]">
            <Image
              src="https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Logo/SHUBIQ.png"
              alt="SHUBIQ"
              width={160}
              height={64}
              priority
              className={`w-auto object-contain transition-opacity duration-200 group-hover:opacity-95 ${scrolled ? "h-8 max-[768px]:h-[1.82rem] sm:h-[2.1rem] md:h-[2.2rem]" : "h-8 max-[768px]:h-[1.9rem] sm:h-[2.2rem] md:h-[2.35rem]"}`}
              style={{ filter: "drop-shadow(0 0 12px rgb(var(--gold-rgb) / 0.2))" }}
            />
            <span className="hidden sm:inline-block font-cinzel font-bold text-[20px] leading-none tracking-[1px] text-cream/92 group-hover:text-gold transition-colors duration-200">
              SHUBIQ
            </span>
          </button>

          <div className="hidden md:flex items-center gap-[1.38rem] lg:gap-[1.84rem]">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className={`site-nav-link nav-link relative font-rajdhani font-semibold text-[12px] tracking-[0.72px] uppercase transition-colors duration-200 hover:text-gold/90 ${
                  active === link ? "active" : ""
                }`}
                style={{ color: active === link ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.8)" }}
              >
                {link}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <MagneticButton
              onClick={() => scrollTo("Contact")}
              data-cursor="Hire"
              className="site-nav-cta hire-pulse font-rajdhani text-[12px] font-semibold tracking-[1.7px] uppercase border border-gold/70 bg-gold text-ink px-[18px] py-[7px] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)]"
            >
              Hire Us
            </MagneticButton>
          </div>

          <button
            className={`md:hidden flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center flex-col gap-1.5 border border-[rgb(var(--cream-rgb)/0.22)] bg-ink/40 rounded-sm transition-opacity duration-300 active:opacity-75 ${menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} className="block h-px bg-gold transition-all duration-300"
                style={{
                  width: i === 1 ? (menuOpen ? "24px" : "16px") : "24px",
                  opacity: i === 1 && menuOpen ? 0 : 1,
                  transform: menuOpen ? i === 0 ? "translateY(7px) rotate(45deg)" : i === 2 ? "translateY(-7px) rotate(-45deg)" : "" : ""
                }}
              />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* ── Premium Mobile Drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mob-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
              className="fixed inset-0 z-[10000] md:hidden"
              style={{ background: "rgb(0 0 0 / 0.78)", backdropFilter: "blur(10px)" }}
              onClick={() => { setMenuOpen(false); setMobileThemeOpen(false) }}
            />

            {/* Panel */}
            <motion.div
              key="mob-panel"
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 340, damping: 38, mass: 0.85 }}
              className="fixed inset-y-0 right-0 z-[10001] md:hidden w-[82vw] max-w-[380px] flex flex-col overflow-hidden"
              style={{
                background: "linear-gradient(145deg, rgb(var(--surface-2-rgb)) 0%, rgb(var(--surface-0-rgb)) 100%)",
                boxShadow: "-20px 0 60px rgb(0 0 0 / 0.55), -1px 0 0 rgb(var(--gold-rgb) / 0.22)",
              }}
              onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; touchMoveX.current = e.touches[0].clientX }}
              onTouchMove={(e) => { touchMoveX.current = e.touches[0].clientX }}
              onTouchEnd={() => { if (touchMoveX.current - touchStartX.current > 60) { setMenuOpen(false); setMobileThemeOpen(false) } }}
            >
              {/* Ambient gold glow */}
              <div className="pointer-events-none absolute top-0 right-0 w-[260px] h-[260px] rounded-full opacity-[0.07]"
                style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb)) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />

              {/* Vertical gold accent bar */}
              <div className="absolute left-0 top-[15%] bottom-[15%] w-px"
                style={{ background: "linear-gradient(180deg, transparent, rgb(var(--gold-rgb) / 0.55) 40%, rgb(var(--gold-rgb) / 0.55) 60%, transparent)" }} />

              {/* ── Header ── */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between pl-8 pr-5 pt-7 pb-5"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Logo/SHUBIQ.png"
                    alt="SHUBIQ" width={160} height={64}
                    className="h-8 w-auto object-contain"
                    style={{ filter: "drop-shadow(0 0 14px rgb(var(--gold-rgb) / 0.35))" }}
                  />
                  <span className="font-cinzel font-bold text-[17px] tracking-[3px] text-cream/90">SHUBIQ</span>
                </div>

                <motion.button
                  onClick={() => { setMenuOpen(false); setMobileThemeOpen(false) }}
                  whileTap={{ scale: 0.88 }}
                  aria-label="Close menu"
                  className="relative w-10 h-10 flex items-center justify-center shrink-0"
                >
                  <motion.span
                    className="absolute inset-0 rounded-full border border-gold/25"
                    animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <span className="absolute w-[16px] h-px bg-gold rotate-45" />
                  <span className="absolute w-[16px] h-px bg-gold -rotate-45" />
                </motion.button>
              </motion.div>

              {/* Gold rule */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mx-8 h-px origin-left"
                style={{ background: "linear-gradient(90deg, rgb(var(--gold-rgb) / 0.7), rgb(var(--gold-rgb) / 0.2) 60%, transparent)" }}
              />

              {/* ── Nav links ── */}
              <div className="flex-1 overflow-y-auto pl-8 pr-6 pt-6 pb-3">
                <nav className="flex flex-col">
                  {NAV_LINKS.map((link, i) => {
                    const isActive = active === link
                    return (
                      <motion.button
                        key={link}
                        initial={{ opacity: 0, x: 36 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.16 + i * 0.055, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        onClick={() => scrollTo(link)}
                        className="group relative flex items-center gap-4 py-[11px] text-left active:opacity-60"
                      >
                        {/* Active side bar */}
                        <motion.span
                          className="absolute -left-8 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full"
                          animate={{ height: isActive ? "55%" : "0%", opacity: isActive ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{ background: "rgb(var(--gold-rgb))", boxShadow: "2px 0 12px rgb(var(--gold-rgb) / 0.6)" }}
                        />

                        {/* Index */}
                        <motion.span
                          animate={{ color: isActive ? "rgb(var(--gold-rgb))" : "rgb(var(--cream-rgb) / 0.25)" }}
                          transition={{ duration: 0.25 }}
                          className="font-rajdhani text-[10px] tracking-[2.5px] shrink-0 w-5 text-right"
                        >
                          {String(i + 1).padStart(2, "0")}
                        </motion.span>

                        {/* Label */}
                        <motion.span
                          animate={{ color: isActive ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.82)" }}
                          whileHover={{ color: "rgb(var(--gold-rgb))", x: 4 }}
                          transition={{ duration: 0.22 }}
                          className="font-cinzel text-[1.45rem] leading-none tracking-[1.8px] uppercase"
                        >
                          {link}
                        </motion.span>

                        {/* Arrow */}
                        <motion.span
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: isActive ? 0.7 : 0, x: isActive ? 0 : -6 }}
                          transition={{ duration: 0.25 }}
                          className="ml-auto font-rajdhani text-[14px] text-gold shrink-0"
                        >
                          →
                        </motion.span>
                      </motion.button>
                    )
                  })}
                </nav>
              </div>

              {/* ── Bottom block ── */}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.58, duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="pl-8 pr-6 pb-8 pt-4"
              >
                {/* Gold rule */}
                <div className="mb-5 h-px" style={{ background: "linear-gradient(90deg, rgb(var(--gold-rgb) / 0.3), transparent)" }} />

                {/* Hire Us CTA */}
                <motion.button
                  onClick={() => scrollTo("Contact")}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-[11px] mb-4 border border-gold/65 bg-gold text-ink font-rajdhani text-[12px] tracking-[2.8px] uppercase font-semibold transition-all duration-300 active:opacity-80"
                  style={{ boxShadow: "0 0 22px rgb(var(--gold-rgb) / 0.18)" }}
                >
                  Hire Us
                </motion.button>

                {/* Appearance toggle */}
                <button
                  type="button"
                  onClick={() => setMobileThemeOpen((v) => !v)}
                  className="w-full flex items-center gap-3 py-2 active:opacity-70"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-gold/70 shrink-0">
                    <circle cx="12" cy="12" r="9" /><path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9V3z" />
                  </svg>
                  <span className="font-rajdhani text-[11px] tracking-[2.5px] uppercase text-cream/45">Appearance</span>
                  <span className="ml-auto font-rajdhani text-[11px] tracking-[1.5px] uppercase text-gold/75">{currentThemeLabel}</span>
                  <motion.span
                    animate={{ rotate: mobileThemeOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-gold/50 text-[10px] shrink-0"
                  >▼</motion.span>
                </button>

                {/* Theme palette */}
                <AnimatePresence>
                  {mobileThemeOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3 grid grid-cols-2 gap-1.5">
                        {THEMES.map((t) => {
                          const activeTheme = t.id === mobileTheme
                          return (
                            <motion.button
                              key={t.id}
                              type="button"
                              onClick={() => applyMobileTheme(t.id)}
                              whileTap={{ scale: 0.95 }}
                              className="flex items-center gap-2 px-3 py-2 transition-all duration-200 active:opacity-70"
                              style={{
                                border: `1px solid ${activeTheme ? "rgb(var(--gold-rgb) / 0.55)" : "rgb(var(--cream-rgb) / 0.1)"}`,
                                background: activeTheme ? "rgb(var(--gold-rgb) / 0.1)" : "transparent",
                              }}
                            >
                              <span className="w-3 h-3 rounded-full shrink-0 border border-black/20"
                                style={{ background: activeTheme ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.35)" }} />
                              <span className="font-rajdhani text-[10px] tracking-[1.5px] uppercase truncate"
                                style={{ color: activeTheme ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.7)" }}>
                                {t.label.split(" ")[0]}
                              </span>
                              {activeTheme && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gold ml-auto shrink-0">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                            </motion.button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Footer mark */}
                <div className="mt-5 font-rajdhani text-[9px] tracking-[2.5px] uppercase text-cream/20">
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
