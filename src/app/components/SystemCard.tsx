"use client"

import { useRouter } from "next/navigation"
import { animate, motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion"
import { useRef } from "react"

type PortfolioItem = {
  name: string
  tag: string
  desc: string
  impact: string
  tech: string[]
  link: string
  status: string
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v))
}

export default function SystemCard({ project, index }: { project: PortfolioItem; index: number }) {
  const router = useRouter()
  const cardRef = useRef<HTMLAnchorElement>(null)
  const rotateXRaw = useMotionValue(0)
  const rotateYRaw = useMotionValue(0)
  const glowXRaw = useMotionValue(50)
  const glowYRaw = useMotionValue(50)

  const rotateX = useSpring(rotateXRaw, { stiffness: 120, damping: 18, mass: 0.6 })
  const rotateY = useSpring(rotateYRaw, { stiffness: 120, damping: 18, mass: 0.6 })
  const glowX = useSpring(glowXRaw, { stiffness: 120, damping: 18, mass: 0.6 })
  const glowY = useSpring(glowYRaw, { stiffness: 120, damping: 18, mass: 0.6 })

  const ambientGlow = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, rgba(80,120,255,0.08), transparent 45%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY

    const nextX = clamp(deltaY / 25, -6, 6)
    const nextY = clamp(-deltaX / 25, -6, 6)
    rotateXRaw.set(nextX)
    rotateYRaw.set(nextY)

    const xPct = ((e.clientX - rect.left) / rect.width) * 100
    const yPct = ((e.clientY - rect.top) / rect.height) * 100
    glowXRaw.set(clamp(xPct, 0, 100))
    glowYRaw.set(clamp(yPct, 0, 100))
  }

  const handleMouseLeave = () => {
    animate(rotateXRaw, 0, { type: "spring", stiffness: 80, damping: 20 })
    animate(rotateYRaw, 0, { type: "spring", stiffness: 80, damping: 20 })
    glowXRaw.set(50)
    glowYRaw.set(50)
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const href = project.link
    setTimeout(() => {
      if (href.startsWith("/")) {
        router.push(href)
      } else {
        window.open(href, "_blank", "noopener,noreferrer")
      }
    }, 120)
  }

  return (
    <div className="relative" style={{ perspective: 1000 }}>
      <motion.a
        ref={cardRef}
        href={project.link}
        target={project.link.startsWith("/") ? undefined : "_blank"}
        rel={project.link.startsWith("/") ? undefined : "noreferrer"}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -8, scale: 1.01 }}
        whileTap={{ scale: 0.97 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="system-card system-card-trace group relative block p-7 sm:p-9 border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft hover:bg-card-soft-hover hover:border-[rgb(var(--gold-rgb)/0.34)]"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
          boxShadow: "0 12px 30px rgb(0 0 0 / 0.2), 0 0 0 1px rgb(var(--gold-rgb) / 0.1) inset",
        }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ background: ambientGlow }}
        />
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

        <div className="flex items-start justify-between mb-5">
          <span className="system-card-index font-rajdhani text-[11px] tracking-[2.5px] uppercase text-cream/45">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-rajdhani text-[11px] tracking-[2.5px] uppercase border px-2.5 py-1 ${project.status === "live" ? "system-badge-live" : ""}`}
            style={{
              color: project.status === "live" ? "rgb(16 185 129)" : "rgb(var(--gold-rgb) / 0.75)",
              borderColor: project.status === "live" ? "rgb(16 185 129 / 0.4)" : "rgb(var(--gold-rgb) / 0.3)",
              background: project.status === "live" ? "rgb(16 185 129 / 0.06)" : "rgb(var(--gold-rgb) / 0.04)",
            }}
          >
            {project.status === "live"
              ? "LIVE"
              : project.status === "wip"
                ? "IN DEVELOPMENT"
                : "COMING SOON"}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3 mb-2">
          <h3
            className="font-cinzel font-bold text-cream/93 tracking-[0.4px] group-hover:text-gold transition-colors duration-300"
            style={{ fontSize: "clamp(18px, 1.6vw, 23px)" }}
          >
            {project.name}
          </h3>
        </div>

        <div className="font-rajdhani text-[11px] tracking-[2px] uppercase text-gold/60 mb-3">{project.tag}</div>

        <p className="font-cormorant text-cream/72 leading-[1.7] mb-6" style={{ fontSize: "clamp(15px, 1.1vw, 17px)" }}>
          {project.desc}
        </p>

        <div className="mb-5 border-l border-gold/28 pl-3">
          <div className="font-rajdhani text-[11px] font-semibold tracking-[2.4px] uppercase text-gold/88 mb-1">Impact</div>
          <p className="font-cormorant text-cream/88 leading-[1.55]" style={{ fontSize: "clamp(14px, 1.05vw, 15.5px)" }}>
            {project.impact}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 pt-4 border-t border-gold/12">
          {project.tech.map((t) => (
            <span
              key={t}
              className="font-rajdhani text-[10px] tracking-[1.5px] uppercase text-cream/65 border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.6)] px-2.5 py-1"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.a>
    </div>
  )
}
