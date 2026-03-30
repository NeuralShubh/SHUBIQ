"use client"
import { useEffect, useRef, useState } from "react"

export type Theme = "gold" | "cobalt" | "emerald" | "violet" | "crimson" | "silver" | "amber"

export const STORAGE_KEY = "shubiq-theme"

export const THEMES: { id: Theme; label: string }[] = [
  { id: "gold", label: "Signature Gold" },
  { id: "cobalt", label: "Cobalt Noir" },
  { id: "emerald", label: "Emerald Core" },
  { id: "violet", label: "Violet Dusk" },
  { id: "crimson", label: "Crimson Noir" },
  { id: "silver", label: "Silver Alloy" },
  { id: "amber", label: "Amber Smoke" },
]

export function applyTheme(theme: Theme, withTransition = false) {
  const root = document.documentElement
  if (withTransition) {
    root.classList.add("theme-transitioning")
    window.setTimeout(() => root.classList.remove("theme-transitioning"), 520)
  }
  if (theme === "gold") root.removeAttribute("data-theme")
  else root.setAttribute("data-theme", theme)
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("gold")
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const migrated = saved === "cyan" ? "cobalt" : saved
    const initial: Theme = THEMES.some((t) => t.id === migrated) ? (migrated as Theme) : "gold"
    setTheme(initial)
    applyTheme(initial)
  }, [])

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    const onThemeSync = () => {
      const saved = localStorage.getItem(STORAGE_KEY)
      const migrated = saved === "cyan" ? "cobalt" : saved
      const next: Theme = THEMES.some((t) => t.id === migrated) ? (migrated as Theme) : "gold"
      setTheme(next)
      applyTheme(next, true)
    }
    document.addEventListener("mousedown", onDocClick)
    document.addEventListener("keydown", onEsc)
    window.addEventListener("storage", onThemeSync)
    window.addEventListener("shubiq-theme-change", onThemeSync as EventListener)
    return () => {
      document.removeEventListener("mousedown", onDocClick)
      document.removeEventListener("keydown", onEsc)
      window.removeEventListener("storage", onThemeSync)
      window.removeEventListener("shubiq-theme-change", onThemeSync as EventListener)
    }
  }, [])

  const setThemeAndPersist = (next: Theme) => {
    setTheme(next)
    applyTheme(next, true)
    localStorage.setItem(STORAGE_KEY, next)
    window.dispatchEvent(new Event("shubiq-theme-change"))
    setOpen(false)
  }

  const activeLabel = THEMES.find((t) => t.id === theme)?.label ?? "Appearance"
  const swatches: Record<Theme, string[]> = {
    gold: ["rgb(196, 164, 88)", "rgb(8, 10, 14)", "rgb(233, 230, 222)"],
    cobalt: ["rgb(94, 154, 233)", "rgb(8, 10, 14)", "rgb(229, 236, 247)"],
    emerald: ["rgb(34, 180, 146)", "rgb(8, 10, 14)", "rgb(220, 235, 230)"],
    violet: ["rgb(145, 118, 228)", "rgb(8, 10, 14)", "rgb(232, 227, 246)"],
    crimson: ["rgb(203, 92, 102)", "rgb(8, 10, 14)", "rgb(240, 226, 227)"],
    silver: ["rgb(178, 190, 208)", "rgb(8, 10, 14)", "rgb(235, 239, 244)"],
    amber: ["rgb(224, 152, 79)", "rgb(8, 10, 14)", "rgb(241, 233, 218)"],
  }

  return (
    <div ref={wrapRef} className="theme-toggle-wrap relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 font-rajdhani text-[11px] tracking-[1.5px] uppercase border border-[0.7px] border-[rgb(var(--cream-rgb)/0.1)] text-cream/74 px-[9px] py-[4px] transition-colors duration-200 hover:border-[rgb(var(--gold-rgb)/0.28)] hover:text-cream/82 hover:bg-gold/5"
        aria-label="Open appearance selector"
        title={activeLabel}
        type="button"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gold/90"
          aria-hidden
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3a9 9 0 0 0 0 18 4.5 4.5 0 0 0 0-9V3z" />
          <circle cx="8.5" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="12.5" cy="8.5" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="15.5" cy="12.5" r="0.6" fill="currentColor" stroke="none" />
        </svg>
        Appearance
      </button>

      
      {open && (
        <div className="theme-toggle-menu absolute right-0 mt-2 w-72 border border-[rgb(var(--cream-rgb)/0.2)] bg-ink/95 backdrop-blur-md p-2 z-[1000] shadow-[0_8px_22px_rgb(0_0_0_/_0.28)] animate-fade-in">
          {THEMES.map((t) => {
            const active = t.id === theme
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeAndPersist(t.id)}
                className={`theme-toggle-option w-full text-left px-3 py-2.5 rounded-lg font-rajdhani text-[12px] tracking-[1.6px] uppercase transition-colors duration-200 flex items-center gap-3 ${
                  active ? "text-gold bg-gold/12" : "text-cream hover:text-gold hover:bg-gold/6"
                }`}
              >
                <div className="flex -space-x-1">
                  {swatches[t.id].map((color, index) => (
                    <span
                      key={`${t.id}-${index}`}
                      className="w-4 h-4 rounded-full border-2 border-ink"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <span className="flex-1">{t.label}</span>
                {active && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gold">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
