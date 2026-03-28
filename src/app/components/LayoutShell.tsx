"use client"

import { usePathname } from "next/navigation"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import Navbar from "./Navbar"
import Footer from "./Footer"

// Renders the shared Navbar + Footer for all routes except /shubiq-studio.
// Also provides smooth page transitions via AnimatePresence.
export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname === "/shubiq-studio"
  const prefersReduced = useReducedMotion()

  return (
    <>
      {!isStudio && <Navbar />}
      {prefersReduced ? (
        children
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      )}
      {!isStudio && <Footer />}
    </>
  )
}
