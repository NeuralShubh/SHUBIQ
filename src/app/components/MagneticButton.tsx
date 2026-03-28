"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  strength?: number
  as?: "button" | "a" | "div"
  onClick?: () => void
  href?: string
  type?: "button" | "submit"
  [key: string]: any
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "button",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const hasMouse = window.matchMedia("(pointer: fine)").matches
    setEnabled(hasMouse)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || !enabled) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Component = (motion as any)[as] || motion.button

  return (
    <Component
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={enabled ? { x: position.x, y: position.y } : { x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.2 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}

