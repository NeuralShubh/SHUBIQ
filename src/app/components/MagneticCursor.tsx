"use client"
import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

export default function MagneticCursor() {
  const pathname = usePathname()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number>()
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const hasTouch = "ontouchstart" in window
    const shouldEnable = window.innerWidth >= 768 && !hasTouch
    setEnabled(shouldEnable)
  }, [pathname])

  useEffect(() => {
    if (!enabled) return

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      if (!target) return
      const interactive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        !!target.closest("a") ||
        !!target.closest("button") ||
        target.getAttribute("role") === "button"
      setIsHovering(interactive)
    }

    const onDown = () => setIsClicking(true)
    const onUp = () => setIsClicking(false)

    window.addEventListener("mousemove", onMove)
    window.addEventListener("mousedown", onDown)
    window.addEventListener("mouseup", onUp)

    const animate = () => {
      const ringSize = isHovering ? 56 : 40

      // Dot follows cursor directly
      if (dotRef.current) {
        dotRef.current.style.left = `${pos.current.x}px`
        dotRef.current.style.top = `${pos.current.y}px`
      }

      // Ring lags behind with lerp
      ring.current.x += (pos.current.x - ring.current.x) * 0.12
      ring.current.y += (pos.current.y - ring.current.y) * 0.12

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`
        ringRef.current.style.top = `${ring.current.y}px`
        ringRef.current.style.width = `${ringSize}px`
        ringRef.current.style.height = `${ringSize}px`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mousedown", onDown)
      window.removeEventListener("mouseup", onUp)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [enabled, isHovering])

  if (!enabled) return null

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: isClicking ? 6 : isHovering ? 16 : 10,
          height: isClicking ? 6 : isHovering ? 16 : 10,
          borderRadius: "50%",
          background: "rgb(var(--gold-rgb))",
          transform: "translate(-50%, -50%)",
          transition: "width 0.25s ease, height 0.25s ease, background 0.25s ease",
          willChange: "left, top, width, height",
          ...(isClicking ? { background: "rgb(var(--gold-light-rgb))" } : {}),
        }}
      />

      {/* Outer ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          border: `1.5px solid ${isHovering ? "rgb(var(--gold-rgb) / 0.9)" : "rgb(var(--gold-rgb) / 0.55)"}`,
          background: isHovering ? "rgb(var(--gold-rgb) / 0.12)" : "transparent",
          transform: "translate(-50%, -50%)",
          opacity: isHovering ? 0.85 : 0.6,
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background 0.25s ease, opacity 0.25s ease",
          willChange: "left, top, width, height",
        }}
      />
    </>
  )
}
