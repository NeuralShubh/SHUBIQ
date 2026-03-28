"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import ScrollReveal from "../components/ScrollReveal"
import { projects } from "../data-projects"

export default function ProjectsIndexClient() {
  const [filter, setFilter] = useState("All")
  const categories = useMemo(() => ["All", ...new Set(projects.map((project) => project.category))], [])
  const filtered = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <div className="min-h-screen px-4 sm:px-6 pt-28 pb-24">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1 h-1 rounded-full bg-gold/85" />
              <div className="font-rajdhani text-[12px] tracking-[4px] text-gold/80 uppercase">Projects</div>
            </div>
            <h1 className="font-cinzel text-[clamp(34px,7vw,64px)] text-cream leading-[1.05]">Digital Portfolio</h1>
            <p className="mt-3 font-cormorant text-[19px] sm:text-[21px] text-cream/70 max-w-3xl leading-[1.6]">
              Strategic product builds across web platforms, AI systems, and scalable business software.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = category === filter
            return (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-[12px] uppercase tracking-[3px] font-rajdhani transition-all ${
                  active
                    ? "bg-gold text-ink shadow-[0_0_18px_rgb(var(--gold-rgb)_/_0.24)]"
                    : "border border-[rgb(var(--cream-rgb)/0.2)] text-cream/70 hover:text-gold-light hover:border-[rgb(var(--cream-rgb)/0.4)]"
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {filtered.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
              >
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full border border-[rgb(var(--cream-rgb)/0.16)] bg-card-soft rounded-sm overflow-hidden hover:border-gold/40 transition-all"
                >
                  <div className="relative w-full aspect-[16/9] bg-[rgb(var(--surface-2-rgb)/0.8)]">
                    {project.videoPoster ? (
                      <img
                        src={project.videoPoster}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-black via-[rgb(var(--surface-2-rgb))] to-black" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-cream/70 font-rajdhani text-[12px] tracking-[3px] uppercase">
                      {project.number} · {project.category}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-cinzel text-[24px] text-cream group-hover:text-gradient-gold transition-colors">
                        {project.title}
                      </h3>
                      <span className="text-cream/50 text-xs tracking-[2px] uppercase">{project.status}</span>
                    </div>
                    <p className="mt-3 font-cormorant text-[17px] text-cream/70 leading-[1.6]">
                      {project.subtitle}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-[11px] tracking-[2px] uppercase text-cream/70 border border-[rgb(var(--cream-rgb)/0.18)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 text-gold/80 text-[12px] tracking-[3px] uppercase font-rajdhani">
                      View Project ?
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
