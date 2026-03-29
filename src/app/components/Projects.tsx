"use client"
import { useRef } from "react"
import Link from "next/link"
import { useInViewOnce } from "../lib/gsap-hooks"
import StaggerContainer, { StaggerItem } from "./StaggerContainer"
import ProjectCardShowcase from "./ProjectCardShowcase"
import SectionLabel from "./SectionLabel"
import { projects as fallbackProjects } from "../data-projects"

interface ProjectsProps {
  initialProjects: any[]
}

export default function Projects({ initialProjects }: ProjectsProps) {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>("160px 0px")
  const headingRef = useRef<HTMLDivElement>(null)
  
  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "")

  const sourceItems = initialProjects?.length ? initialProjects : fallbackProjects

  const items = sourceItems
    .map((item: any, index: number) => {
      if (item?.slug) return item
      const rawTag = typeof item?.tag === "string" ? item.tag : ""
      const [categoryRaw, statusRaw] = rawTag.split("|").map((part) => part.trim())
      return {
        id: item?.id ?? `project-${index}`,
        slug: item?.slug ?? slugify(item?.name ?? item?.title ?? `project-${index + 1}`),
        number: item?.number ?? String(index + 1).padStart(2, "0"),
        title: item?.name ?? item?.title ?? "Project",
        subtitle: item?.desc ?? item?.subtitle ?? "",
        description: item?.desc ?? item?.description ?? "",
        category: categoryRaw || item?.category || "Project",
        status: statusRaw || item?.status || "Live",
        videoUrl: item?.video_url ?? item?.videoUrl ?? "",
        videoPoster: item?.video_poster ?? item?.videoPoster ?? "",
        liveUrl: item?.live ?? item?.liveUrl ?? undefined,
        githubUrl: item?.link ?? item?.githubUrl ?? undefined,
        techStack: item?.tech ?? item?.techStack ?? [],
        impact: item?.impact ?? { headline: "", description: "" },
        features: item?.features ?? [],
        year: item?.year ?? "2026",
      }
    })
    .slice(0, 3)

  return (
    <section id="projects" ref={sectionRef} className="cv-auto py-[96px] max-md:py-16 px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute -right-20 top-16 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.05) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 54% 36% at 50% 40%, rgb(var(--gold-rgb) / 0.03) 0%, transparent 72%)" }}
      />
      <div className="max-w-7xl mx-auto w-full">
        <div ref={headingRef} className="mb-10 sm:mb-12 md:mb-14 text-center">
          <SectionLabel label="Portfolio" centered />
          <div className={`reveal ${isInView ? "in-view" : ""} flex flex-col items-center gap-4`} style={{ animationDelay: "0.1s" }}>
            <h2
              className="font-cinzel font-black leading-[0.92] tracking-[0.5px]"
              style={{ fontSize: "clamp(30px, 5.5vw, 62px)" }}
            >
              <span className="text-cream/90">Engineered </span>
              <span className="text-gold">Systems</span>
            </h2>
          </div>
        </div>

        <StaggerContainer staggerDelay={0.12} className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {items.map((project, i) => (
            <StaggerItem key={project.id}>
              <ProjectCardShowcase project={project} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-rajdhani text-[12px] tracking-[3px] uppercase text-cream/70 hover:text-gold transition-colors"
          >
            View All Projects
            <span className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  )
}


