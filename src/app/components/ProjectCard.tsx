import Link from "next/link"
import type { Project } from "../data-projects"

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = project.number || String(index + 1).padStart(2, "0")
  const category = project.category ? project.category.toUpperCase() : "PROJECT"
  const status = project.status?.toUpperCase() || "LIVE"

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block h-full border border-[rgb(var(--cream-rgb)/0.18)] bg-card-soft hover:bg-card-soft-hover transition-all duration-400"
      data-cursor="Open"
    >
      <div className="relative h-[170px] sm:h-[210px] bg-[rgb(var(--surface-2-rgb)/0.72)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--surface-3-rgb)/0.7)] via-transparent to-[rgb(var(--surface-1-rgb)/0.7)]" />
        <div className="absolute bottom-4 left-5 text-[11px] tracking-[3px] uppercase font-rajdhani text-gold/70">
          {number} - {category}
        </div>
      </div>

      <div className="border-t border-[rgb(var(--cream-rgb)/0.18)] px-5 sm:px-6 py-5 sm:py-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-cinzel text-[22px] sm:text-[26px] text-cream group-hover:text-gradient-gold transition-colors">
            {project.title}
          </h3>
          <span className="text-[10px] tracking-[3px] uppercase font-rajdhani text-cream/60">{status}</span>
        </div>

        <p className="font-cormorant text-[16px] sm:text-[17px] text-cream/75 leading-[1.6] mb-4">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[10px] tracking-[2.4px] uppercase font-rajdhani text-cream/70 border border-[rgb(var(--cream-rgb)/0.18)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="text-[11px] tracking-[3px] uppercase font-rajdhani text-gold/75">
          Watch Video &rarr;
        </div>
      </div>
    </Link>
  )
}
