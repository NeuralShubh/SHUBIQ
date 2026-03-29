"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import ScrollReveal from "../../components/ScrollReveal"
import StaggerContainer, { StaggerItem } from "../../components/StaggerContainer"
import VideoPlayer from "../../components/VideoPlayer"
import BackLink from "../../components/BackLink"
import type { Project } from "../../data-projects"

interface ProjectPageClientProps {
  project: Project
  prevProject: Project
  nextProject: Project
}

const statusStyles: Record<string, string> = {
  live: "bg-emerald-400",
  "in dev": "bg-amber-400",
  planned: "bg-rose-400",
}

export default function ProjectPageClient({ project, prevProject, nextProject }: ProjectPageClientProps) {
  const statusKey = project.status.toLowerCase()
  const statusDot = statusStyles[statusKey] ?? "bg-gold"

  return (
    <div className="min-h-screen px-4 sm:px-6 pt-28 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between text-sm font-rajdhani tracking-[2px] uppercase text-cream/70"
        >
          <BackLink href="/projects" label="Back to Projects" />
          <span className="flex items-center gap-2 text-cream/60">
            <span className={`w-2 h-2 rounded-full ${statusDot}`} />
            {project.category} | {project.status}
          </span>
        </motion.div>

        <section className="relative mt-10">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 0.12, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute -top-6 right-0 text-[120px] sm:text-[160px] font-cinzel tracking-[0.3em] text-cream/10 select-none pointer-events-none"
          >
            {project.number}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-cinzel text-[clamp(36px,7vw,64px)] text-cream leading-[1.02]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 max-w-3xl font-cormorant text-[20px] sm:text-[22px] text-cream/70 leading-[1.6]"
          >
            {project.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10"
          >
            <VideoPlayer src={project.videoUrl} poster={project.videoPoster} title={project.title} />
          </motion.div>
        </section>

        <ScrollReveal className="mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_0.85fr] gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-1 h-1 rounded-full bg-gold/85" />
                  <div className="font-rajdhani text-[12px] tracking-[4px] text-gold/80 uppercase">About this project</div>
                </div>
                <p className="font-cormorant text-[18px] sm:text-[20px] text-cream/78 leading-[1.75]">
                  {project.description}
                </p>
                <p className="mt-4 font-cormorant text-[17px] sm:text-[19px] text-cream/68 leading-[1.7]">
                  Built with {project.techStack.slice(0, 3).join(", ")} and engineered for clarity, speed, and long-term scale.
                </p>
              </div>

              <div>
                <div className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/70 mb-4">Key Features</div>
                <StaggerContainer staggerDelay={0.08} className="grid gap-3">
                  {project.features.map((feature) => (
                    <StaggerItem key={feature}>
                      <div className="flex items-start gap-3 text-cream/80">
                        <span className="mt-1 w-5 h-5 rounded-full border border-gold/40 flex items-center justify-center">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-gold">
                            <path d="M2 6.5 4.8 9 10 3" />
                          </svg>
                        </span>
                        <span className="font-cormorant text-[18px] leading-[1.6]">{feature}</span>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft p-5 sm:p-6 rounded-sm">
                <div className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/70 mb-4">Project Details</div>
                <div className="space-y-3 text-cream/75 text-[15px]">
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[2px] text-cream/55">Status</span>
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${statusDot}`} />
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[2px] text-cream/55">Category</span>
                    <span>{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="uppercase tracking-[2px] text-cream/55">Year</span>
                    <span>{project.year}</span>
                  </div>
                  {project.duration && (
                    <div className="flex items-center justify-between">
                      <span className="uppercase tracking-[2px] text-cream/55">Duration</span>
                      <span>{project.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/70 mb-4">Tech Stack</div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-[12px] tracking-[2px] uppercase text-cream/80 border border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--cream-rgb)/0.04)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/70 mb-4">Links</div>
                <div className="grid gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center font-rajdhani text-[12px] tracking-[3.2px] uppercase px-4 py-3 border border-gold/40 bg-gold/10 text-gold-light hover:bg-gold/20 hover:shadow-[0_0_20px_rgb(var(--gold-rgb)_/_0.18)] transition-all"
                    >
                      View Live &rarr;
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full text-center font-rajdhani text-[12px] tracking-[3.2px] uppercase px-4 py-3 border border-[rgb(var(--cream-rgb)/0.2)] text-cream/80 hover:text-gold-light hover:border-[rgb(var(--cream-rgb)/0.4)] transition-all"
                    >
                      View Source &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.7)] rounded-sm p-6 sm:p-8">
            <div className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/70 mb-3">Impact</div>
            <h2 className="font-cinzel text-[clamp(24px,4vw,36px)] text-cream leading-[1.2]">
              {project.impact.headline}
            </h2>
            <p className="mt-3 font-cormorant text-[18px] text-cream/75 leading-[1.7] max-w-3xl">
              {project.impact.description}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-14">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-stretch">
            <Link
              href={`/projects/${prevProject.slug}`}
              className="flex-1 border border-[rgb(var(--cream-rgb)/0.18)] bg-card-soft p-5 sm:p-6 rounded-sm hover:border-gold/40 transition-all"
            >
              <div className="text-cream/50 text-xs tracking-[3px] uppercase font-rajdhani">Previous Project</div>
              <div className="mt-3 font-cinzel text-[18px] sm:text-[20px] text-cream">
                <span className="sm:hidden">&larr; {prevProject.number}</span>
                <span className="hidden sm:inline">&larr; {prevProject.number} {prevProject.title}</span>
              </div>
            </Link>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="flex-1 border border-[rgb(var(--cream-rgb)/0.18)] bg-card-soft p-5 sm:p-6 rounded-sm text-right hover:border-gold/40 transition-all"
            >
              <div className="text-cream/50 text-xs tracking-[3px] uppercase font-rajdhani">Next Project</div>
              <div className="mt-3 font-cinzel text-[18px] sm:text-[20px] text-cream">
                <span className="sm:hidden">{nextProject.number} &rarr;</span>
                <span className="hidden sm:inline">{nextProject.number} {nextProject.title} &rarr;</span>
              </div>
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal className="mt-16">
          <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-[rgb(var(--surface-2-rgb)/0.75)] rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <div className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/70 mb-2">Let us build</div>
              <h3 className="font-cinzel text-[clamp(24px,4vw,34px)] text-cream">Interested in a similar project?</h3>
              <p className="mt-2 font-cormorant text-[17px] text-cream/70 max-w-xl">
                Let us craft a premium system tailored to your brand, with the same level of precision and cinematic motion.
              </p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center font-rajdhani text-[12px] tracking-[3.2px] uppercase px-5 py-3 border border-gold/40 bg-gold/10 text-gold-light hover:bg-gold/20 transition-all"
            >
              Start a Project
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}


