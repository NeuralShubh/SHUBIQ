"use client"
import { useEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { NAV_LINKS } from "../data"
import ThemeToggle, { STORAGE_KEY, THEMES, Theme, applyTheme } from "./ThemeToggle"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("Home")
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileThemeOpen, setMobileThemeOpen] = useState(false)
  const [mobileTheme, setMobileTheme] = useState<Theme>("gold")
  const touchStartX = useRef(0)
  const touchMoveX = useRef(0)

  useEffect(() => {
    let ticking = false

    const updateNavState = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0
      setScrolled(scrollTop > 24)
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
    applyTheme(next)
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
      <nav
        className="site-navbar fixed top-0 left-0 right-0 z-[9999] transition-[background,backdrop-filter,border-bottom,box-shadow] duration-700"
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
            <button
              onClick={() => scrollTo("Contact")}
              className="site-nav-cta hire-pulse font-rajdhani text-[12px] font-semibold tracking-[1.7px] uppercase border border-gold/70 bg-gold text-ink px-[18px] py-[7px] transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)]"
            >
              Hire Us
            </button>
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
      </nav>

      <div
        className="fixed inset-0 z-[950] md:hidden transition-opacity duration-300"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "all" : "none",
          background: "rgb(var(--ink-rgb) / 0.48)",
          backdropFilter: "blur(6px)",
        }}
        onClick={() => {
          setMenuOpen(false)
          setMobileThemeOpen(false)
        }}
      >
        <div
          className="absolute inset-y-0 right-0 w-[92vw] max-w-[420px] border-l border-gold/18 bg-[rgb(var(--surface-1-rgb)/0.95)] shadow-[-12px_0_36px_rgb(0_0_0_/_0.34)] transition-transform duration-[380ms] ease-out"
          style={{ transform: menuOpen ? "translateX(0%)" : "translateX(104%)" }}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX
            touchMoveX.current = e.touches[0].clientX
          }}
          onTouchMove={(e) => {
            touchMoveX.current = e.touches[0].clientX
          }}
          onTouchEnd={() => {
            if (touchMoveX.current - touchStartX.current > 70) {
              setMenuOpen(false)
              setMobileThemeOpen(false)
            }
          }}
        >
          <div className="sticky top-0 z-10 h-[76px] border-b border-gold/16 px-5 backdrop-blur-md bg-[rgb(var(--surface-2-rgb)/0.72)] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Image
                src="https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Logo/SHUBIQ.png"
                alt="SHUBIQ"
                width={160}
                height={64}
                className="h-9 w-auto object-contain"
                style={{ filter: "drop-shadow(0 0 10px rgb(var(--gold-rgb) / 0.2))" }}
              />
              <span className="font-cinzel font-semibold text-[18px] tracking-[0.8px] text-cream/92">SHUBIQ</span>
            </div>
            <button
              onClick={() => {
                setMenuOpen(false)
                setMobileThemeOpen(false)
              }}
              className="relative w-11 h-11 border border-gold/28 flex items-center justify-center rounded-sm active:opacity-75"
              aria-label="Close menu"
            >
              <span className="block w-4 h-px bg-gold rotate-45 absolute" />
              <span className="block w-4 h-px bg-gold -rotate-45 absolute" />
            </button>
          </div>

          <div className="h-[calc(100%-76px)] overflow-y-auto px-5 pt-6 pb-6">
            <div className="flex flex-col">
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left min-h-[56px] py-3 border-b border-b-[0.5px] border-gold/18 transition-opacity duration-200 active:opacity-70"
                  style={{ color: active === link ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.92)" }}
                >
                  <span className="relative inline-block font-cinzel text-[1.52rem] leading-[1.08] tracking-[2.2px] uppercase">
                    {link}
                    <span
                      className="absolute left-0 -bottom-1.5 h-[2px] bg-gold/90 transition-all duration-200"
                      style={{ width: active === link ? "100%" : "0%" }}
                    />
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5 h-px w-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

            <div className="mt-4 border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.5)] rounded-sm overflow-hidden">
              <button
                type="button"
                onClick={() => setMobileThemeOpen((v) => !v)}
                className="w-full min-h-[52px] px-4 py-3 text-left border-b border-b-[rgb(var(--cream-rgb)/0.12)] transition-colors duration-300 active:opacity-80"
              >
                <div className="font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/92">Appearance</div>
                <div className="font-rajdhani text-[11px] tracking-[1.8px] text-cream/68 mt-1">{currentThemeLabel}</div>
              </button>

              <div
                className="transition-all duration-300 ease-out overflow-hidden"
                style={{ maxHeight: mobileThemeOpen ? "520px" : "0px", opacity: mobileThemeOpen ? 1 : 0 }}
              >
                <div className="px-2 py-2">
                  {THEMES.map((t) => {
                    const activeTheme = t.id === mobileTheme
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => applyMobileTheme(t.id)}
                        className="w-full min-h-[44px] px-3 py-2 rounded-sm text-left flex items-center gap-2.5 transition-all duration-200 active:opacity-80"
                        style={{
                          color: activeTheme ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.88)",
                          background: activeTheme ? "rgb(var(--gold-rgb) / 0.13)" : "transparent",
                          boxShadow: activeTheme ? "0 0 18px rgb(var(--gold-rgb) / 0.16) inset" : "none",
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: activeTheme ? "rgb(var(--gold-light-rgb))" : "rgb(var(--cream-rgb) / 0.45)" }}
                        />
                        <span className="font-rajdhani text-[12px] tracking-[1.5px] uppercase">{t.label}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="h-4" />
          </div>
        </div>
      </div>
    </>
  )
}
