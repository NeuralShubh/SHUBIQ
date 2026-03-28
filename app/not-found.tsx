"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center max-w-lg relative">
        <motion.span
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[9rem] md:text-[12rem] font-black leading-none opacity-[0.04] select-none block text-cream"
        >
          404
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="-mt-14 md:-mt-20 relative z-10"
        >
          <h1 className="text-2xl md:text-3xl font-cinzel text-cream mb-3">Page not found</h1>
          <p className="text-cream/70 mb-8 text-sm md:text-base font-cormorant">
            This page does not exist or has been moved. Let us get you back on track.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            href="/"
            className="px-8 py-3 rounded-lg bg-gold text-ink font-rajdhani text-[12px] tracking-[2.8px] uppercase hover:bg-gold-light transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="px-8 py-3 rounded-lg border border-[rgb(var(--cream-rgb)/0.2)] text-cream/80 font-rajdhani text-[12px] tracking-[2.8px] uppercase hover:text-gold hover:border-gold/60 hover:bg-gold/[0.05] transition-colors"
          >
            View Projects
          </Link>
          <Link
            href="/shubiq-studio"
            className="px-8 py-3 rounded-lg border border-[rgb(var(--cream-rgb)/0.2)] text-cream/80 font-rajdhani text-[12px] tracking-[2.8px] uppercase hover:text-gold hover:border-gold/60 hover:bg-gold/[0.05] transition-colors"
          >
            Explore Studio
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-[10px] tracking-[3px] uppercase text-cream/50 font-rajdhani"
        >
          SHUBIQ · Intelligence That Wins
        </motion.p>
      </div>
    </div>
  )
}
