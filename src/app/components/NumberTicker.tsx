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
}

export default function NumberTicker({
  value,
  suffix = "",
  prefix = "",
  duration = 1500,
  className = "",
  locale,
}: NumberTickerProps) {
  const prefersReduced = useReducedMotion()
  const [display, setDisplay] = useState(prefersReduced ? value : 0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    if (prefersReduced) {
      setDisplay(value)
      return
    }
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = Date.now()
          const scrambleDuration = duration * 0.6
          const countDuration = duration * 0.4

          const tick = () => {
            const elapsed = Date.now() - startTime
            if (elapsed < scrambleDuration) {
              setDisplay(Math.floor(Math.random() * value * 1.3))
              requestAnimationFrame(tick)
            } else if (elapsed < duration) {
              const countProgress = (elapsed - scrambleDuration) / countDuration
              const eased = 1 - Math.pow(1 - countProgress, 3)
              setDisplay(Math.round(eased * value))
              requestAnimationFrame(tick)
            } else {
              setDisplay(value)
            }
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, duration, prefersReduced])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString(locale)}
      {suffix}
    </span>
  )
}
