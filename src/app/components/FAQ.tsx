"use client"

import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"

export interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  items: FAQItem[]
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const prefersReduced = useReducedMotion()

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <ScrollReveal key={item.question} delay={index * 0.05}>
          <div className="border border-[rgb(var(--cream-rgb)/0.16)] rounded-sm overflow-hidden bg-[rgb(var(--surface-2-rgb)/0.6)]">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-[rgb(var(--cream-rgb)/0.03)] transition-colors min-h-[56px]"
            >
              <span className="font-cormorant text-[16px] md:text-[17px] text-cream/85 pr-4">{item.question}</span>
              <motion.span
                animate={prefersReduced ? undefined : { rotate: openIndex === index ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-xl shrink-0 text-gold/80"
              >
                +
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={prefersReduced ? false : { height: 0, opacity: 0 }}
                  animate={prefersReduced ? { height: "auto", opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={prefersReduced ? { height: 0, opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 font-cormorant text-[15px] md:text-[16px] text-cream/70 leading-[1.7]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}
