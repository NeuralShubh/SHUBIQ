"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useReducedMotion, useSpring } from "framer-motion"

export default function CustomCursor() {
  const prefersReduced = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [label, setLabel] = useState("")
  const cursorRef = useRef({ x: 0, y: 0 })

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)

  useEffect(() => {
    if (prefersReduced) return
    const hasMouse = window.matchMedia("(pointer: fine)").matches
    if (!hasMouse) return
    setEnabled(true)
  }, [prefersReduced])

  useEffect(() => {
    if (!enabled) return

    const moveCursor = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY }
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [role=\"button\"], input, textarea, select, [data-cursor]")
      if (interactive) {
        setHovered(true)
        const cursorLabel = interactive.getAttribute("data-cursor")
        setLabel(cursorLabel || "")
      } else {
        setHovered(false)
        setLabel("")
      }
    }

    const handleMouseLeave = () => {
      setVisible(false)
    }

    document.addEventListener("mousemove", moveCursor)
    document.addEventListener("mouseover", handleMouseOver)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseleave", handleMouseLeave)

    document.documentElement.style.cursor = "none"
    const style = document.createElement("style")
    style.textContent = "a,button,input,textarea,select,[role=\"button\"],[data-cursor]{cursor:none!important}"
    document.head.appendChild(style)

    return () => {
      document.removeEventListener("mousemove", moveCursor)
      document.removeEventListener("mouseover", handleMouseOver)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.documentElement.style.cursor = ""
      style.remove()
    }
  }, [enabled, visible, x, y])

  if (!enabled || prefersReduced) return null

  return (
    <motion.div
      style={{ x, y }}
      className="fixed top-0 left-0 z-[999999] pointer-events-none mix-blend-difference"
      animate={{
        opacity: visible ? 1 : 0,
        scale: clicked ? 0.8 : hovered ? 2.5 : 1,
      }}
      transition={{ scale: { duration: 0.2 }, opacity: { duration: 0.2 } }}
    >
      <div
        className="w-4 h-4 -ml-2 -mt-2 rounded-full bg-white flex items-center justify-center"
        style={{
          transition: "width 0.2s, height 0.2s",
          width: hovered ? "40px" : "16px",
          height: hovered ? "40px" : "16px",
          marginLeft: hovered ? "-20px" : "-8px",
          marginTop: hovered ? "-20px" : "-8px",
          opacity: hovered ? 0.15 : 1,
          border: hovered ? "1px solid rgba(255,255,255,0.5)" : "none",
        }}
      >
        {label && hovered && (
          <span className="text-[10px] text-white font-medium whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </motion.div>
  )
}
