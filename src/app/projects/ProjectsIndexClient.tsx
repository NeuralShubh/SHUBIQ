"use client"

import { useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import ScrollReveal from "../components/ScrollReveal"
import TextReveal from "../components/TextReveal"
import ProjectCard from "../components/ProjectCard"
import type { Project } from "../data-projects"
import BackLink from "../components/BackLink"
import UnifiedNavbar from "../components/UnifiedNavbar"

interface ProjectsIndexClientProps {
  projects: Project[]
}

export default function ProjectsIndexClient({ projects }: ProjectsIndexClientProps) {
  const [filter, setFilter] = useState("All")
  const categories = useMemo(() => ["All", ...new Set(projects.map((project) => project.category))], [])
  const filtered = filter === "All" ? projects : projects.filter((project) => project.category === filter)

  return (
    <>
      <UnifiedNavbar />
      <div className="min-h-screen px-4 sm:px-6 pt-28 pb-24">
        <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div>
            <BackLink href="/" label="Back to Home" className="mb-6" />
            <div className="flex items-center gap-3 mb-3">
              <span className="w-1 h-1 rounded-full bg-gold/85" />
              <div className="font-rajdhani text-[12px] tracking-[4px] text-gold/80 uppercase">Projects</div>
            </div>
            <TextReveal
              text="Digital Portfolio"
              as="h1"
              mode="words"
              className="font-cinzel text-[clamp(34px,7vw,64px)] text-cream leading-[1.05]"
            />
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
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        </div>
      </div>
    </>
  )
}
