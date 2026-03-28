"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[rgb(var(--ink-rgb))] text-cream">
      <div className="text-center max-w-lg">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="text-[8rem] md:text-[12rem] font-bold leading-none opacity-[0.06] select-none block font-cinzel">
            404
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="-mt-12 md:-mt-16 relative z-10"
        >
          <h1 className="text-2xl md:text-3xl font-bold mb-3 font-cinzel">Page not found</h1>
          <p className="text-cream/60 mb-8 text-sm md:text-base font-cormorant">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link href="/">
            <motion.span
              className="inline-block px-8 py-3 rounded-lg bg-gold text-ink font-medium hover:opacity-90 transition-opacity text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Home
            </motion.span>
          </Link>

          <Link href="/projects">
            <motion.span
              className="inline-block px-8 py-3 rounded-lg border border-[rgb(var(--cream-rgb)/0.2)] hover:border-gold/40 hover:bg-[rgb(var(--surface-2-rgb)/0.6)] transition-all font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Projects
            </motion.span>
          </Link>

          <Link href="/shubiq-studio">
            <motion.span
              className="inline-block px-8 py-3 rounded-lg border border-[rgb(var(--cream-rgb)/0.2)] hover:border-gold/40 hover:bg-[rgb(var(--surface-2-rgb)/0.6)] transition-all font-medium text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Studio
            </motion.span>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-xs text-cream/50 font-rajdhani tracking-[0.3em] uppercase"
        >
          SHUBIQ · Intelligence That Wins
        </motion.p>
      </div>
    </div>
  )
}

