"use client"
import { useEffect, useRef, useState } from "react"
import { PROJECTS } from "../data"
import { SUPABASE_ENABLED, supabase } from "../lib/supabase"

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function useScramble(text: string) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef<number>()

  const scramble = () => {
    let frame = 0
    const total = 20

    const animate = () => {
      const progress = frame / total
      const result = text
        .split("")
        .map((char, i) => {
          if (char === " ") return " "
          if (i < text.length * progress) return char
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
        })
        .join("")

      setDisplay(result)
      frame++
      if (frame <= total) rafRef.current = requestAnimationFrame(animate)
      else setDisplay(text)
    }

    rafRef.current = requestAnimationFrame(animate)
  }

  const reset = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    setDisplay(text)
  }

  return { display, scramble, reset }
}

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { display, scramble, reset } = useScramble(project.name)
  const [titleMain, ...titleRest] = display.split(" ")
  const titleSecondary = titleRest.join(" ")
  const actions = [
    project.link ? { href: project.link, label: "GitHub", primary: false } : null,
    project.live ? { href: project.live, label: "Live", primary: true } : null,
  ].filter(Boolean) as Array<{ href: string; label: string; primary: boolean }>

  return (
    <div
      className="project-card group relative flex h-full min-h-[338px] sm:min-h-[376px] flex-col border border-[rgb(var(--cream-rgb)/0.14)] rounded-sm bg-card-soft p-6 sm:p-8 transition-all duration-500 hover:border-gold/28 hover:bg-card-soft-hover hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgb(var(--gold-rgb)_/_0.14)_inset,0_22px_42px_rgb(0_0_0_/_0.32)] transform-gpu"
      onMouseEnter={() => scramble()}
      onMouseLeave={() => reset()}
      style={{ boxShadow: "0 0 0 1px rgb(var(--cream-rgb) / 0.05) inset, 0 20px 38px rgb(0 0 0 / 0.26)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(circle at 80% 10%, rgb(var(--gold-rgb) / 0.1), transparent 40%)" }}
      />
      <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/28 to-transparent" />
      <div className="absolute left-0 top-0 w-9 h-px bg-gold/45 pointer-events-none" />
      <div className="absolute left-0 top-0 w-px h-9 bg-gold/45 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-9 h-px bg-gold/45 pointer-events-none" />
      <div className="absolute right-0 bottom-0 w-px h-9 bg-gold/45 pointer-events-none" />
      <div className="absolute top-8 right-8 font-cinzel text-[22px] sm:text-[24px] leading-none text-cream/35 tracking-[0.01em] transition-all duration-300 group-hover:text-cream/55 group-hover:scale-[1.03]">
        {String(index + 1).padStart(2, "0")}
      </div>

      {project.featured && <div className="absolute -top-px left-8 h-px w-16 bg-gold" />}

      <div className="font-rajdhani text-[14px] sm:text-[16px] tracking-[3.8px] uppercase text-gold/75 mb-4">
        {project.tag}
      </div>

      <h3
        className="font-cinzel text-[34px] sm:text-[44px] leading-[1.02] text-cream mb-5 transition-colors duration-300 group-hover:text-gradient-gold"
        style={{ fontFeatureSettings: "'liga' 0, 'calt' 0" }}
      >
        <span>{titleMain}</span>
        {titleSecondary && <span className="ml-[0.58em]">{titleSecondary}</span>}
      </h3>

      <p
        className="font-cormorant text-[18px] sm:text-[17px] text-cream/80 leading-[1.72] sm:leading-[1.65] mb-4 max-w-[52ch] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
      >
        {project.desc}
      </p>

      <div className="mt-3 pt-2 border-t border-gold/20">
        <div className={`grid gap-2 ${actions.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noreferrer"
              className={`text-center font-rajdhani text-[12px] tracking-[3.2px] uppercase px-4 py-3 transition-all duration-300 ${
                action.primary
                  ? "text-gold/90 border border-gold/25 bg-gold/[0.06] hover:border-gold/50 hover:bg-gold/[0.1] hover:shadow-[0_0_20px_rgb(var(--gold-rgb)_/_0.14)]"
                  : "text-cream/75 border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.02)] hover:border-[rgb(var(--cream-rgb)/0.34)] hover:text-gold-light hover:shadow-[0_0_16px_rgb(var(--gold-rgb)_/_0.08)]"
              }`}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const [items, setItems] = useState(PROJECTS)

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)

        const tl = gsap.timeline({
          scrollTrigger: { trigger: headingRef.current, start: "top 80%", once: true },
        })

        tl.fromTo(
          titleRef.current,
          { y: 26, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.85, ease: "power3.out" },
        )
          .fromTo(
            dividerRef.current,
            { scaleX: 0, transformOrigin: "left center", opacity: 0.72 },
            { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=0.44",
          )
          .fromTo(
            subheadingRef.current,
            { y: 14, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.72, ease: "power2.out" },
            "-=0.35",
          )

        const cards = sectionRef.current?.querySelectorAll(".project-card")
        if (cards) {
          gsap.fromTo(
            cards,
            { y: 44, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.92,
              ease: "power3.out",
              stagger: 0.14,
              scrollTrigger: { trigger: sectionRef.current, start: "top 72%", once: true },
            },
          )
        }
      } catch {
        // no-op
      }
    }

    init()
  }, [])

  useEffect(() => {
    const load = async () => {
      if (!SUPABASE_ENABLED) return
      try {
        const { data, error } = await supabase.from("projects").select("*").order("order_index", { ascending: true })
        if (error || !data?.length) return
        const mapped = data.map((row: any) => ({
          name: row.name ?? "",
          tag: row.tag ?? "",
          desc: row.desc ?? "",
          tech: Array.isArray(row.tech) ? row.tech : [],
          stars: Number(row.stars ?? 0),
          link: row.link ?? null,
          live: row.live ?? null,
          featured: !!row.featured,
          status: row.status ?? "live",
        }))
        setItems(mapped)
      } catch {
        // no-op fallback to static data
      }
    }
    load()
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="min-h-screen flex items-center py-[96px] px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute -right-20 top-16 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 54% 36% at 50% 40%, rgb(var(--gold-rgb) / 0.03) 0%, transparent 72%)" }}
      />
      <div className="max-w-7xl mx-auto w-full">
        <div ref={headingRef} className="flex items-end justify-between mb-10 sm:mb-12 md:mb-14">
          <div>
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="w-1 h-1 rounded-full bg-gold/85" />
              <div className="font-rajdhani text-[12px] sm:text-[13px] tracking-[4px] sm:tracking-[6px] text-gold/78 uppercase">Projects</div>
              <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-gold/40 to-transparent" />
            </div>
            <h2
              ref={titleRef}
              className="font-cinzel font-black text-gradient-gold leading-[1.02] tracking-[-0.01em] text-[clamp(30px,8.8vw,46px)] sm:text-[clamp(36px,5vw,64px)]"
              style={{ opacity: 0 }}
            >
              Digital Portfolio
            </h2>
            <div ref={dividerRef} className="w-16 sm:w-20 h-px bg-gradient-to-r from-gold/80 to-transparent mt-3 sm:mt-4" />
            <p
              ref={subheadingRef}
              className="mt-3 sm:mt-4 font-cormorant text-[18px] sm:text-[20px] text-cream/74 max-w-2xl leading-[1.5]"
              style={{ opacity: 0 }}
            >
              Strategic product builds across web platforms, AI systems, and scalable business software.
            </p>
          </div>
          <a
            href="https://github.com/NeuralShubh"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center font-rajdhani text-[12px] tracking-[2.8px] uppercase text-cream/75 border border-transparent px-4 py-2 mb-3 hover:text-gold-light transition-all duration-300 group relative"
          >
            View All on GitHub
            <span className="absolute left-4 right-4 bottom-1 h-px bg-gold/55 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </a>
        </div>
        <a
          href="https://github.com/NeuralShubh"
          target="_blank"
          rel="noreferrer"
          className="md:hidden inline-block font-rajdhani text-[12px] tracking-[2.8px] uppercase text-cream/75 border border-transparent px-4 py-2 hover:text-gold-light transition-all duration-300 mb-8 group relative"
        >
          View All on GitHub
          <span className="absolute left-4 right-4 bottom-1 h-px bg-gold/55 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        </a>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
