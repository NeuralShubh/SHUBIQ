"use client"

import { motion, useReducedMotion } from "framer-motion"

interface TextRevealProps {
  text: string
  as?: "h1" | "h2" | "h3" | "p" | "span"
  className?: string
  delay?: number
  mode?: "words" | "chars"
  once?: boolean
}

export default function TextReveal({
  text,
  as: Tag = "h2",
  className = "",
  delay = 0,
  mode = "words",
  once = true,
}: TextRevealProps) {
  const prefersReduced = useReducedMotion()
  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>
  }

  const items = mode === "words" ? text.split(" ") : text.split("")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mode === "words" ? 0.08 : 0.03,
        delayChildren: delay,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  }

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-50px" }}
        style={{ display: "flex", flexWrap: "wrap", gap: mode === "words" ? "0.3em" : 0 }}
      >
        {items.map((item, index) => (
          <motion.span key={`${item}-${index}`} variants={child} style={{ display: "inline-block" }}>
            {item}
            {mode === "words" && index < items.length - 1 ? "\u00A0" : ""}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  )
}

