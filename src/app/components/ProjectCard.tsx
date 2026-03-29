import Link from "next/link"
import type { Project } from "../data-projects"

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const number = project.number || String(index + 1).padStart(2, "0")
  const category = project.category ? project.category.toUpperCase() : "PROJECT"
  const status = project.status?.toUpperCase() || "LIVE"

  return (
    <div className="group h-full border border-[rgb(var(--cream-rgb)/0.18)] bg-card-soft hover:bg-card-soft-hover transition-all duration-400 hover:border-gold/40 hover:shadow-[0_18px_42px_rgb(0_0_0_/_0.35)]">
      <div className="relative h-[170px] sm:h-[210px] bg-[rgb(var(--surface-2-rgb)/0.72)]">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgb(var(--surface-3-rgb)/0.7)] via-transparent to-[rgb(var(--surface-1-rgb)/0.7)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
        <div className="absolute bottom-4 left-5 text-[11px] tracking-[3px] uppercase font-rajdhani text-gold/70">
          {number}
        </div>
        <div className="absolute bottom-4 right-5 text-[11px] tracking-[3px] uppercase font-rajdhani text-gold/70">
          {category} | {status}
        </div>
      </div>

      <div className="border-t border-[rgb(var(--cream-rgb)/0.18)] px-5 sm:px-6 py-5 sm:py-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-cinzel text-[22px] sm:text-[26px] text-cream group-hover:text-gradient-gold transition-colors">
            {project.title}
          </h3>
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

        <div className="mt-4 pt-4 border-t border-[rgb(var(--cream-rgb)/0.16)] grid grid-cols-2 gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="text-center font-rajdhani text-[11px] tracking-[3px] uppercase px-4 py-3 border border-[rgb(var(--cream-rgb)/0.2)] text-cream/80 hover:text-gold-light hover:border-gold/60 hover:bg-gold/[0.06] transition-colors"
            data-cursor="Open"
          >
            View Project &rarr;
          </Link>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="text-center font-rajdhani text-[11px] tracking-[3px] uppercase px-4 py-3 border border-gold/30 text-gold/80 hover:text-gold-light hover:border-gold/70 hover:bg-gold/[0.08] transition-colors"
            >
              Live
            </a>
          ) : (
            <span className="text-center font-rajdhani text-[11px] tracking-[3px] uppercase px-4 py-3 border border-[rgb(var(--cream-rgb)/0.12)] text-cream/35">
              Live
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
