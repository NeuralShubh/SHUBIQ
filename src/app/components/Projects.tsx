"use client"
import { useRef } from "react"
import Link from "next/link"
import { projects } from "../data-projects"
import { useInViewOnce } from "../lib/gsap-hooks"
import StaggerContainer, { StaggerItem } from "./StaggerContainer"
import ProjectCard from "./ProjectCard"

export default function Projects() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>("160px 0px")
  const headingRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const subheadingRef = useRef<HTMLParagraphElement>(null)
  const items = projects.slice(0, 3)

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


