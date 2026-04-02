"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import type { Theme } from "./ThemeToggle"

const THEME_LOGOS: Record<Theme, string> = {
  gold: "/shubiq-icons/themes/shubiq-signature-gold.svg",
  cobalt: "/shubiq-icons/themes/shubiq-cobalt-noir.svg",
  emerald: "/shubiq-icons/themes/shubiq-emerald-core.svg",
  violet: "/shubiq-icons/themes/shubiq-violet-dusk.svg",
  crimson: "/shubiq-icons/themes/shubiq-crimson-noir.svg",
  silver: "/shubiq-icons/themes/shubiq-silver-alloy.svg",
  amber: "/shubiq-icons/themes/shubiq-amber-smoke.svg",
}

function getCurrentTheme(): Theme {
  if (typeof document === "undefined") return "gold"
  const attr = document.documentElement.getAttribute("data-theme")
  const validThemes = new Set<Theme>(["gold", "cobalt", "emerald", "violet", "crimson", "silver", "amber"])
  return attr && validThemes.has(attr as Theme) ? (attr as Theme) : "gold"
}

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true)
  const [activeTheme, setActiveTheme] = useState<Theme>("gold")

  useEffect(() => {
    const minTime = new Promise((resolve) => setTimeout(resolve, 2000))
    const pageLoad = new Promise((resolve) => {
      if (document.readyState === "complete") resolve(true)
      else window.addEventListener("load", () => resolve(true), { once: true })
    })

    Promise.all([minTime, pageLoad]).then(() => {
      setLoading(false)
      window.sessionStorage.setItem("shubiq-loaded", "1")
    })
  }, [])

  useEffect(() => {
    const syncTheme = () => setActiveTheme(getCurrentTheme())
    syncTheme()
    window.addEventListener("shubiq-theme-change", syncTheme as EventListener)
    window.addEventListener("storage", syncTheme)
    return () => {
      window.removeEventListener("shubiq-theme-change", syncTheme as EventListener)
      window.removeEventListener("storage", syncTheme)
    }
  }, [])

  useEffect(() => {
    if (loading) {
      window.dispatchEvent(new Event("shubiq-loading-start"))
      return
    }
    const doneId = window.setTimeout(() => {
      window.dispatchEvent(new Event("shubiq-loading-complete"))
    }, 520)
    return () => window.clearTimeout(doneId)
  }, [loading])

  useEffect(() => {
    let timeoutId: number | undefined

    const handleNavLoading = () => {
      setLoading(true)
      timeoutId = window.setTimeout(() => {
        setLoading(false)
      }, 900)
    }

    window.addEventListener("shubiq-nav-loading", handleNavLoading)
    return () => {
      window.removeEventListener("shubiq-nav-loading", handleNavLoading)
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          style={{ backgroundColor: "rgb(var(--ink-rgb))" }}
        >
          <div className="relative flex flex-col items-center justify-center gap-6">
            <motion.div
              className="relative flex h-[260px] w-[260px] items-center justify-center md:h-[340px] md:w-[340px]"
              initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgb(var(--gold-rgb)/0.95), rgb(var(--gold-rgb)/0.2) 35%, rgb(var(--gold-rgb)/0.06) 62%, transparent 80%)",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
              />
              <div className="absolute inset-[7px] rounded-full bg-[rgb(var(--ink-rgb))]" />
              <div className="absolute inset-[22px] rounded-full border border-[rgb(var(--gold-rgb)/0.24)]" />
              <Image
                src={THEME_LOGOS[activeTheme]}
                alt="SHUBIQ"
                width={512}
                height={512}
                priority
                className="relative z-10 h-44 w-44 object-contain md:h-56 md:w-56"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-cream/60 text-[10px] tracking-[0.3em] uppercase font-rajdhani"
            >
              Intelligence That Wins
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
