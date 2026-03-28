"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

export default function BackToTop() {
  const [show, setShow] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    const lenis = (window as any).__lenis
    if (lenis && typeof lenis.scrollTo === "function") {
      lenis.scrollTo(0, { duration: 0.8 })
      return
    }
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={prefersReduced ? false : { opacity: 0, scale: 0.85 }}
          animate={prefersReduced ? { opacity: 1 } : { opacity: 1, scale: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-5 md:bottom-6 md:right-6 z-50 h-11 w-11 sm:h-12 sm:w-12 rounded-full border border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--surface-2-rgb)/0.7)] backdrop-blur-md flex items-center justify-center text-cream/80 hover:text-ink hover:bg-gold hover:border-gold transition-all duration-200 shadow-[0_10px_24px_rgb(0_0_0_/_0.35)]"
          whileHover={prefersReduced ? undefined : { scale: 1.06 }}
          whileTap={prefersReduced ? undefined : { scale: 0.95 }}
          aria-label="Back to top"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
