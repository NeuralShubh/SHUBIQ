"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"

interface PricingTeaserProps {
  startingPrice?: string
  note?: string
}

export default function PricingTeaser({ startingPrice, note }: PricingTeaserProps) {
  const prefersReduced = useReducedMotion()

  return (
    <ScrollReveal>
      <div className="relative overflow-hidden rounded-sm border border-[rgb(var(--cream-rgb)/0.16)] p-8 md:p-12 text-center bg-[rgb(var(--surface-2-rgb)/0.6)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--gold-rgb)/0.08)] to-transparent pointer-events-none" />

        <div className="relative z-10">
          <p className="font-rajdhani text-[11px] tracking-[3px] uppercase text-cream/60 mb-3">Investment</p>
          {startingPrice && (
            <p className="font-cinzel text-[28px] md:text-[36px] text-cream mb-2">Starting at {startingPrice}</p>
          )}
          {note && <p className="font-cormorant text-[15px] text-cream/70 mb-6">{note}</p>}

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/shubiq-studio#pricing">
              <motion.span
                className="inline-block px-8 py-3 rounded-sm bg-gold text-ink font-rajdhani text-[12px] tracking-[3px] uppercase"
                whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                whileTap={prefersReduced ? undefined : { scale: 0.98 }}
              >
                View Pricing Plans
              </motion.span>
            </Link>

            <Link href="/shubiq-studio#studio-contact-anchor">
              <motion.span
                className="inline-block px-8 py-3 rounded-sm border border-[rgb(var(--cream-rgb)/0.25)] text-cream/85 font-rajdhani text-[12px] tracking-[3px] uppercase hover:text-gold-light hover:border-gold/60 transition-colors"
                whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                whileTap={prefersReduced ? undefined : { scale: 0.98 }}
              >
                Request Custom Quote
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  )
}

