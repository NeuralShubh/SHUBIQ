"use client"

import { motion, useReducedMotion } from "framer-motion"
import ScrollReveal from "./ScrollReveal"

export interface ProcessStep {
  number: string
  title: string
  description: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
}

export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const prefersReduced = useReducedMotion()

  return (
    <div className="relative">
      <div className="absolute left-5 md:left-6 top-0 bottom-0 w-[2px] bg-[rgb(var(--cream-rgb)/0.12)]" />
      <div className="space-y-10">
        {steps.map((step, index) => (
          <ScrollReveal key={step.number} delay={index * 0.08}>
            <div className="flex gap-5 md:gap-6 items-start">
              <motion.div
                className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-gold/60 bg-[rgb(var(--surface-2-rgb)/0.8)] flex items-center justify-center shrink-0"
                whileInView={prefersReduced ? undefined : { scale: [0.85, 1.05, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <span className="text-gold-light font-rajdhani text-[14px] tracking-[2px]">{step.number}</span>
              </motion.div>
              <div className="pt-1">
                <h3 className="font-cinzel text-[18px] md:text-[20px] text-cream mb-2">{step.title}</h3>
                <p className="font-cormorant text-[16px] md:text-[17px] text-cream/70 leading-[1.7]">
                  {step.description}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
