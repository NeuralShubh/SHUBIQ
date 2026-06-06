"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowUpRight, Target, Zap, Shield, Users, Award, TrendingUp } from "lucide-react"
import SectionLabel from "./SectionLabel"

const services = [
  {
    icon: Target,
    title: "Strategic Planning",
    description: "Data-driven strategies that align with your business goals and market positioning.",
  },
  {
    icon: Zap,
    title: "High-Performance Development",
    description: "Lightning-fast applications built with cutting-edge technologies and best practices.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Robust security measures to protect your data and ensure compliance.",
  },
  {
    icon: Users,
    title: "User Experience Design",
    description: "Intuitive interfaces that engage users and drive conversions.",
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "Rigorous testing and quality control to ensure flawless performance.",
  },
  {
    icon: TrendingUp,
    title: "Growth Optimization",
    description: "Continuous improvement strategies to scale your digital presence.",
  },
]

const stats = [
  { value: "100+", label: "Projects Completed" },
  { value: "50+", label: "Happy Clients" },
  { value: "99%", label: "Success Rate" },
  { value: "24/7", label: "Support Available" },
]

export default function About() {
  const prefersReduced = useReducedMotion()

  const motionProps = (delay = 0) =>
    prefersReduced
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: "easeOut" as const },
        }

  return (
    <section id="about" className="relative isolate overflow-hidden px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgb(var(--surface-0-rgb)),rgb(var(--ink-rgb)))]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgb(var(--gold-rgb)/0.08),transparent_70%)]" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="relative z-10"
          {...motionProps(0)}
        >
          <SectionLabel label="About NexGravision" />

          <div className="mt-12 text-center max-w-4xl mx-auto">
            <h2 className="font-heading text-[clamp(40px,6vw,64px)] font-bold leading-[1.1] text-cream">
              Transforming Ideas Into
              <span className="block text-gold">Digital Excellence</span>
            </h2>

            <p className="mt-8 text-xl leading-relaxed text-cream/80">
              We are a team of passionate innovators, designers, and developers dedicated to creating exceptional digital experiences that drive business growth and inspire users worldwide.
            </p>
          </div>

          <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                {...motionProps(0.1 + index * 0.05)}
                className="group rounded-2xl border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgb(var(--surface-2-rgb)/0.4)] p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-[rgb(var(--surface-2-rgb)/0.6)] hover:shadow-[0_0_40px_rgb(var(--gold-rgb)/0.15)]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-[rgb(var(--ink-rgb))]">
                  <service.icon size={28} />
                </div>
                <h3 className="mt-6 font-heading text-xl font-semibold text-cream">{service.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-cream/70">{service.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-24 rounded-3xl border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgb(var(--surface-2-rgb)/0.4)] p-12 backdrop-blur-sm"
            {...motionProps(0.4)}
          >
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-5xl font-bold text-gold sm:text-6xl">{stat.value}</p>
                  <p className="mt-3 font-sans text-sm font-medium uppercase tracking-wider text-cream/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="mt-16 text-center"
            {...motionProps(0.5)}
          >
            <p className="text-lg text-cream/70 mb-8">Ready to start your next project?</p>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-8 py-4 font-sans text-base font-semibold text-[rgb(var(--ink-rgb))] transition-transform hover:scale-105 shadow-[0_0_30px_rgb(var(--gold-rgb)/0.4)]"
            >
              Get in Touch
              <ArrowUpRight size={20} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
