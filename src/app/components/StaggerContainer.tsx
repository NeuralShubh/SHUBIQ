"use client"

import React, { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

const SPRING = [0.16, 1, 0.3, 1] as const
const EASE_OUT = [0.4, 0, 1, 1] as const

interface StaggerContainerProps {
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}

export default function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  const items = React.Children.toArray(children)

  return (
    <div className={className}>
      {items.map((child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<{ delay?: number }>, {
              delay: index * staggerDelay,
            })
          : child
      )}
    </div>
  )
}

export function StaggerItem({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: false, margin: "-60px 0px -60px 0px" })

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 52, scale: 0.88, filter: "blur(6px)" }
      }
      transition={
        isInView
          ? { duration: 0.78, ease: SPRING, delay }
          : { duration: 0.32, ease: EASE_OUT, delay: 0 }
      }
      className={className}
      style={{ willChange: "transform, opacity, filter" }}
    >
      {children}
    </motion.div>
  )
}
