"use client"

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis
    // Expose globally so other components can call lenis.scrollTo
    ;(window as any).__lenis = lenis

    // Integrate with Next.js anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest("a[href^='#']") as HTMLAnchorElement | null
      if (!anchor) return
      e.preventDefault()
      const id = anchor.getAttribute("href")?.slice(1)
      if (!id) return
      const el = document.getElementById(id)
      if (el) lenis.scrollTo(el, { offset: -80 })
    }

    document.addEventListener("click", handleAnchorClick)

    let rafId: number
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener("click", handleAnchorClick)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
