"use client"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Bot, Code2, Cpu, Globe, Layers, LayoutDashboard, Smartphone, Wrench } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SERVICES } from "../data"
import { SUPABASE_ENABLED, supabase } from "../lib/supabase"

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

        <div className="mt-7 sm:mt-8 pt-2 flex items-center justify-end gap-2 text-gold/78 group-hover:text-gold transition-colors duration-300">
          <span className="w-8 h-px bg-current/70 transition-all duration-300 group-hover:w-10" />
          <span className="font-rajdhani text-[13px] sm:text-[12px] tracking-[3px] uppercase">Learn More</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
    </article>
  )
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const [items, setItems] = useState<MainService[]>(SERVICES)

  useEffect(() => {
    const load = async () => {
      if (!SUPABASE_ENABLED) return
      try {
        const { data, error } = await supabase.from("services").select("*").order("order_index", { ascending: true })
        if (error || !data?.length) return
        setItems(data.map((row: any) => ({
          id: String(row.id),
          icon: row.icon ?? "?",
          title: row.title ?? "",
          desc: row.desc ?? "",
          tag: row.tag ?? "",
          order_index: Number(row.order_index ?? 0),
        })))
      } catch {
        // no-op fallback to static data
      }
    }
    load()
  }, [])

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        gsap.fromTo(
          headingRef.current,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true },
          },
        )

        gsap.fromTo(
          dividerRef.current,
          { scaleX: 0, transformOrigin: "left center", opacity: 0.7 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.85,
            ease: "power2.out",
            scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true },
          },
        )

        const cards = sectionRef.current?.querySelectorAll(".service-card")
        if (cards) {
          gsap.fromTo(
            cards,
            { y: 42, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
              stagger: 0.14,
              scrollTrigger: { trigger: sectionRef.current, start: "top 74%", once: true },
            },
          )
        }
      } catch {
        // no-op
      }
    }
    init()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="min-h-screen flex items-center py-[96px] px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute -right-20 top-12 w-[380px] h-[380px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 52% 38% at 50% 38%, rgb(var(--gold-rgb) / 0.035) 0%, transparent 72%)" }}
      />

      <div className="max-w-7xl mx-auto w-full">
        <div ref={headingRef} className="mb-8 sm:mb-10 md:mb-12 opacity-0 max-w-3xl">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <span className="w-1 h-1 rounded-full bg-gold/80" />
            <div className="font-rajdhani text-[12px] sm:text-[13px] tracking-[4px] sm:tracking-[6px] text-gold/70 uppercase">Services</div>
            <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          </div>
          <h2 className="font-cinzel font-black text-gradient-gold leading-tight text-[clamp(29px,9vw,44px)] sm:text-[clamp(34px,5vw,68px)]">
            What We Do
          </h2>
          <div ref={dividerRef} className="w-16 sm:w-20 h-px bg-gradient-to-r from-gold/80 to-transparent mt-3 sm:mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-7 lg:gap-8">
          {items.map((service, i) => (
            <TiltCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
