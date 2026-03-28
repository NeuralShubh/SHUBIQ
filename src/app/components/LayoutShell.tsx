"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import BackButton from "./BackButton"

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return (
      <div className="relative">
        <BackButton />
        {children}
      </div>
    )
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="relative"
      >
        <BackButton />
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
