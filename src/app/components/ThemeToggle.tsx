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

export function applyTheme(theme: Theme) {
  const root = document.documentElement
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
      applyTheme(next)
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
    applyTheme(next)
    localStorage.setItem(STORAGE_KEY, next)
    window.dispatchEvent(new Event("shubiq-theme-change"))
    setOpen(false)
  }

  const activeLabel = THEMES.find((t) => t.id === theme)?.label ?? "Appearance"

  return (
    <div ref={wrapRef} className="theme-toggle-wrap relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="font-rajdhani text-[11px] tracking-[1.5px] uppercase border border-[0.7px] border-[rgb(var(--cream-rgb)/0.1)] text-cream/74 px-[9px] py-[4px] transition-colors duration-200 hover:border-[rgb(var(--gold-rgb)/0.28)] hover:text-cream/82 hover:bg-gold/5"
        aria-label="Open appearance selector"
        title={activeLabel}
        type="button"
      >
        Appearance
      </button>

      {open && (
        <div className="theme-toggle-menu absolute right-0 mt-2 w-64 border border-[rgb(var(--cream-rgb)/0.2)] bg-ink/95 backdrop-blur-md p-1.5 z-[1000] shadow-[0_8px_22px_rgb(0_0_0_/_0.28)]">
          {THEMES.map((t) => {
            const active = t.id === theme
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setThemeAndPersist(t.id)}
                className={`theme-toggle-option w-full text-left px-3 py-2.5 font-rajdhani text-[12px] tracking-[1.6px] uppercase transition-colors duration-200 ${
                  active ? "text-gold bg-gold/12" : "text-cream hover:text-gold hover:bg-gold/6"
                }`}
              >
                {t.label}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
