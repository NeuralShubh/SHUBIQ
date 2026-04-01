"use client"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import { motion, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, Bot, Code2, Cpu, Globe, Layers, LayoutDashboard, Smartphone, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SERVICES } from "../data"
import SectionLabel from "./SectionLabel"

const SERVICE_ICONS = [Code2, LayoutDashboard, Bot, Smartphone]
const MAIN_SERVICE_ICON_MAP: Record<string, LucideIcon> = {
  code: Code2,
  web: Code2,
  development: Code2,
  layout: LayoutDashboard,
  dashboard: LayoutDashboard,
  bot: Bot,
  ai: Bot,
  phone: Smartphone,
  app: Smartphone,
  globe: Globe,
  layers: Layers,
  tools: Wrench,
  cpu: Cpu,
  "?": Code2,
}

const resolveServiceIcon = (icon: string, index: number) => {
  const key = (icon || "").trim().toLowerCase()
  return MAIN_SERVICE_ICON_MAP[key] || SERVICE_ICONS[index % SERVICE_ICONS.length] || Code2
}
type MainService = {
  id?: string
  icon: string
  title: string
  desc: string
  tag: string
  order_index?: number
}

function TiltCard({ service, index }: { service: MainService; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const Icon = resolveServiceIcon(service.icon, index)
  const slug = service.title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  const href = `/services/${slug}`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const glow = glowRef.current
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)

    card.style.transform = `perspective(900px) rotateX(${-dy * 4.4}deg) rotateY(${dx * 4.4}deg) translateY(-4px)`

    if (glow) {
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      glow.style.background = `radial-gradient(circle at ${x}% ${y}%, rgb(var(--gold-rgb) / 0.11) 0%, transparent 62%)`
      glow.style.opacity = "1"
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (card) {
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)"
      card.style.transition = "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)"
    }
    if (glowRef.current) glowRef.current.style.opacity = "0"
  }

  const handleMouseEnter = () => {
    const card = cardRef.current
    if (card) {
      card.style.transition = "transform 0.12s ease"
      card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(-2px)"
    }
    if (glowRef.current) glowRef.current.style.opacity = "1"
  }

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="service-card group relative min-h-[280px] sm:min-h-[330px] p-5 sm:p-7 lg:p-8 border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft hover:bg-card-soft-hover hover:border-gold/38 transform-gpu transition-[transform,border-color,background-color,box-shadow] duration-300"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
        boxShadow: "0 16px 34px rgb(0 0 0 / 0.24), 0 0 0 1px rgb(var(--cream-rgb) / 0.05) inset",
      }}
    >
      <div ref={glowRef} className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300" />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent" />
      <span
        className={[
          "corner-cut",
          index === 0 ? "corner-cut-br" : "",
          index === 1 ? "corner-cut-bl" : "",
          index === 2 ? "corner-cut-tr" : "",
          index === 3 ? "corner-cut-tl" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between mb-5 sm:mb-6">
          <div className="flex items-center">
            <span className="w-10 h-10 sm:w-9 sm:h-9 border border-gold/45 bg-gold/[0.07] flex items-center justify-center text-gold/95">
              <Icon size={18} strokeWidth={1.9} />
            </span>
          </div>
          <span
            className="font-rajdhani text-[13px] sm:text-[12px] leading-none tracking-[2.2px] uppercase text-gold/85 border px-3 py-1.5 bg-gold/[0.05]"
            style={{ borderColor: "rgb(var(--gold-rgb) / 0.45)" }}
          >
            {service.tag}
          </span>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-gold/20 via-gold/8 to-transparent mb-5 sm:mb-6" />

        <h3 className="font-cinzel text-[28px] sm:text-[34px] leading-[1.06] sm:leading-[1.05] text-cream mb-3 sm:mb-4">
          {service.title}
        </h3>

        <p className="font-cormorant text-[18px] sm:text-[17px] text-cream/72 leading-[1.72] sm:leading-[1.65] max-w-[52ch]">
          {service.desc}
        </p>

        <Link
          href={href}
          className="mt-7 sm:mt-8 pt-2 flex items-center justify-end gap-2 text-gold/78 group-hover:text-gold transition-colors duration-300"
        >
          <span className="w-8 h-px bg-current/70 transition-all duration-300 group-hover:w-10" />
          <span className="font-rajdhani text-[13px] sm:text-[12px] tracking-[3px] uppercase">Learn More</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </div>
    </article>
  )
}

interface ServicesProps {
  initialServices?: MainService[]
}

export default function Services({ initialServices }: ServicesProps = {}) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { amount: 0.35 })
  const prefersReduced = useReducedMotion()
  const [items, setItems] = useState<MainService[]>(initialServices?.length ? initialServices : SERVICES)

  useEffect(() => {
    setItems(initialServices?.length ? initialServices : SERVICES)
  }, [initialServices])

  const cardOffsets = useMemo(
    () => [
      { x: -80, y: -60 },
      { x: 80, y: -60 },
      { x: -80, y: 60 },
      { x: 80, y: 60 },
    ],
    [],
  )

  return (
    <section id="services" ref={sectionRef} className="cv-auto min-h-screen flex items-center py-[96px] px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute -right-20 top-12 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 52% 38% at 50% 38%, rgb(var(--gold-rgb) / 0.035) 0%, transparent 72%)" }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          ref={headingRef}
          className="mb-10 sm:mb-12 md:mb-14 text-center"
          initial={prefersReduced ? {} : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionLabel label="Services" centered />
          <div className="mt-4 flex flex-col items-center gap-4">
            <h2 className="font-shubiq-heading font-normal leading-[0.92]" style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}>
              <span className="text-cream/90">What We </span>
              <span className="text-gold">Do</span>
            </h2>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-7 lg:gap-8">
          {items.map((service, i) => {
            const offset = cardOffsets[i % cardOffsets.length]
            return (
              <motion.div
                key={service.title}
                initial={prefersReduced ? {} : { opacity: 0, x: offset.x, y: offset.y, scale: 0.98 }}
                animate={inView ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: offset.x, y: offset.y, scale: 0.98 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: prefersReduced ? 0 : 0.08 * i }}
              >
                <TiltCard service={service} index={i} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
