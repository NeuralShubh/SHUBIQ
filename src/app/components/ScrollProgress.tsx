"use client"

import { usePathname } from "next/navigation"
import { motion, useReducedMotion, useScroll } from "framer-motion"

export default function ScrollProgress() {
  const prefersReduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const pathname = usePathname()

  if (pathname.startsWith("/blog/")) return null
  if (prefersReduced) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[9999] origin-left"
      style={{
        scaleX: scrollYProgress,
        backgroundColor: "rgb(var(--gold-rgb))",
      }}
    />
  )
}
