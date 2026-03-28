"use client"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { projects, Project } from "../data-projects"
import { useInViewOnce } from "../lib/gsap-hooks"
import StaggerContainer, { StaggerItem } from "./StaggerContainer"

const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

function useScramble(text: string) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef<number | null>(null)

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
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    setDisplay(text)
  }

  return { display, scramble, reset }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const router = useRouter()
  const { display, scramble, reset } = useScramble(project.title)
  const [titleMain, ...titleRest] = display.split(" ")
  const titleSecondary = titleRest.join(" ")
  const actions = [
    { href: `/projects/${project.slug}`, label: "View Project &rarr;", primary: false, external: false },
    project.liveUrl ? { href: project.liveUrl, label: "Live", primary: true, external: true } : null,
  ].filter(Boolean) as Array<{ href: string; label: string; primary: boolean; external: boolean }>
  const tag = `${project.category} | ${project.status}`

  return (
    <div
      className="project-card group relative flex h-full min-h-[338px] sm:min-h-[376px] flex-col border border-[rgb(var(--cream-rgb)/0.14)] rounded-sm bg-card-soft p-6 sm:p-8 transition-all duration-500 hover:border-gold/28 hover:bg-card-soft-hover hover:-translate-y-1 hover:shadow-[0_0_0_1px_rgb(var(--gold-rgb)_/_0.14)_inset,0_22px_42px_rgb(0_0_0_/_0.32)] transform-gpu cursor-pointer"
      onMouseEnter={() => scramble()}
      onMouseLeave={() => reset()}
      onClick={() => router.push(`/projects/${project.slug}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault()
          router.push(`/projects/${project.slug}`)
        }
      }}
      role="link"
      tabIndex={0}
      aria-label={`View ${project.title} project details`}
      data-cursor="Open"
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
      {project.id === "buildwithshubh" && <div className="absolute -top-px left-8 h-px w-16 bg-gold" />}

      <div className="flex items-center justify-between mb-4">
        <div className="font-cinzel text-[14px] sm:text-[16px] leading-none text-cream/35 tracking-[0.01em] transition-all duration-300 group-hover:text-cream/55 group-hover:scale-[1.03]">
          {project.number || String(index + 1).padStart(2, "0")}
        </div>
        <div className="font-rajdhani text-[14px] sm:text-[16px] tracking-[3.8px] uppercase text-gold/75 text-right">
          {tag}
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-gold/20 via-gold/8 to-transparent mb-5 sm:mb-6" />

      <h3
        className="font-cinzel text-[28px] sm:text-[34px] leading-[1.06] sm:leading-[1.05] text-cream mb-5 transition-colors duration-300 group-hover:text-gradient-gold"
        style={{ fontFeatureSettings: "'liga' 0, 'calt' 0" }}
      >
        <span>{titleMain}</span>
        {titleSecondary && <span className="ml-[0.58em]">{titleSecondary}</span>}
      </h3>

      <p
        className="font-cormorant text-[18px] sm:text-[17px] text-cream/80 leading-[1.72] sm:leading-[1.65] mb-4 max-w-[52ch] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]"
      >
        {project.subtitle}
      </p>

      <div className="mt-auto pt-1 flex items-center justify-between text-cream/55 text-[11px] font-rajdhani tracking-[3px] uppercase">
        <span className="flex items-center gap-2">
          Case Study
          <span className="text-gold/80">&rarr;</span>
        </span>
        <span className="text-cream/45">View Details</span>
      </div>

      <div className="mt-3 pt-2 border-t border-gold/20">
        <div className={`grid gap-2 ${actions.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
          {actions.map((action) => (
            action.external ? (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className={`text-center font-rajdhani text-[12px] tracking-[3.2px] uppercase px-4 py-3 transition-all duration-300 ${
                  action.primary
                    ? "text-gold/90 border border-gold/25 bg-gold/[0.06] hover:border-gold/50 hover:bg-gold/[0.1] hover:shadow-[0_0_20px_rgb(var(--gold-rgb)_/_0.14)]"
                    : "text-cream/75 border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.02)] hover:border-[rgb(var(--cream-rgb)/0.34)] hover:text-gold-light hover:shadow-[0_0_16px_rgb(var(--gold-rgb)_/_0.08)]"
                }`}
              >
                {action.label}
              </a>
            ) : (
              <button
                key={action.label}
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  router.push(action.href)
                }}
                className={`text-center font-rajdhani text-[12px] tracking-[3.2px] uppercase px-4 py-3 transition-all duration-300 ${
                  action.primary
                    ? "text-gold/90 border border-gold/25 bg-gold/[0.06] hover:border-gold/50 hover:bg-gold/[0.1] hover:shadow-[0_0_20px_rgb(var(--gold-rgb)_/_0.14)]"
                    : "text-cream/75 border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--cream-rgb)/0.02)] hover:border-[rgb(var(--cream-rgb)/0.34)] hover:text-gold-light hover:shadow-[0_0_16px_rgb(var(--gold-rgb)_/_0.08)]"
                }`}
              >
                {action.label}
              </button>
            )
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>("160px 0px")
  const headingRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const items = projects

  return (
    <section id="projects" ref={sectionRef} className="cv-auto min-h-screen flex items-center py-[96px] px-4 sm:px-6 relative overflow-hidden">
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
              className={`reveal ${isInView ? "in-view" : ""} font-cinzel font-black text-gradient-gold leading-[1.02] tracking-[-0.01em] text-[clamp(29px,9vw,44px)] sm:text-[clamp(34px,5vw,68px)]`}
              style={{ animationDelay: "0.1s" }}
            >
              Digital Portfolio
            </h2>
            <div ref={dividerRef} className={`reveal-line ${isInView ? "in-view" : ""} w-16 sm:w-20 h-px bg-gradient-to-r from-gold/80 to-transparent mt-3 sm:mt-4`} style={{ animationDelay: "0.22s" }} />
            <p
              ref={subheadingRef}
              className={`reveal ${isInView ? "in-view" : ""} mt-3 sm:mt-4 font-cormorant text-[18px] sm:text-[20px] text-cream/74 max-w-2xl leading-[1.5]`}
              style={{ animationDelay: "0.32s" }}
            >
              Strategic product builds across web platforms, AI systems, and scalable business software.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden md:inline-flex items-center font-rajdhani text-[12px] tracking-[2.8px] uppercase text-cream/75 border border-transparent px-4 py-2 mb-3 hover:text-gold-light transition-all duration-300 group relative"
          >
            View All Projects
            <span className="absolute left-4 right-4 bottom-1 h-px bg-gold/55 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
          </Link>
        </div>
        <Link
          href="/projects"
          className="md:hidden inline-block font-rajdhani text-[12px] tracking-[2.8px] uppercase text-cream/75 border border-transparent px-4 py-2 hover:text-gold-light transition-all duration-300 mb-8 group relative"
        >
          View All Projects
          <span className="absolute left-4 right-4 bottom-1 h-px bg-gold/55 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
        </Link>

        <StaggerContainer staggerDelay={0.12} className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((project, i) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}


