"use client"

import { useEffect, useRef, useState } from "react"
import { useReducedMotion } from "framer-motion"

interface NumberTickerProps {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  locale?: string
  start?: boolean
}

export default function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  duration = 1500,
  className = "",
  locale,
  start,
}: NumberTickerProps) {
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(prefersReduced ? value : 0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)
  const rafId = useRef<number | null>(null)

  useEffect(() => {
    started.current = false

    if (prefersReduced) {
      setDisplay(value)
      return
    }
    if (start === false) {
      setDisplay(0)
      return
    }

    const run = () => {
      if (started.current) return
      started.current = true
      const startTime = Date.now()
      const scrambleDuration = duration * 0.6
      const countDuration = duration * 0.4

      const tick = () => {
        const elapsed = Date.now() - startTime
        if (elapsed < scrambleDuration) {
          setDisplay(Math.floor(Math.random() * value * 1.3))
          rafId.current = requestAnimationFrame(tick)
        } else if (elapsed < duration) {
          const countProgress = (elapsed - scrambleDuration) / countDuration
          const eased = 1 - Math.pow(1 - countProgress, 3)
          setDisplay(Math.round(eased * value))
          rafId.current = requestAnimationFrame(tick)
        } else {
          setDisplay(value)
          rafId.current = null
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }

    if (typeof start === "boolean") {
      if (start) run()
      return () => {
        if (rafId.current !== null) {
          cancelAnimationFrame(rafId.current)
          rafId.current = null
        }
      }
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => {
      observer.disconnect()
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
    }
  }, [value, duration, prefersReduced, start])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString(locale)}
      {suffix}
    </span>
  )
}
