'use client'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Globe,
  Megaphone,
  ShoppingCart,
  RefreshCcw,
  ShieldCheck,
  MessageCircleQuestion,
  CheckCircle2,
} from 'lucide-react'

const services = [
  {
    Icon: Globe,
    title: 'Business Platforms',
    desc: 'Strategic web platforms built to communicate value clearly, support operations, and convert intent into qualified action.',
    chip: 'BW',
    glow: 'from-blue-500/15 to-cyan-400/15',
    iconClass: 'text-blue-700 bg-blue-50 border-blue-100',
    outcome: 'Authority + trust',
  },
  {
    Icon: Megaphone,
    title: 'Conversion Systems',
    desc: 'Campaign-focused conversion journeys designed to turn traffic into high-quality leads and revenue-ready opportunities.',
    chip: 'LP',
    glow: 'from-violet-500/15 to-blue-500/15',
    iconClass: 'text-violet-700 bg-violet-50 border-violet-100',
    outcome: 'Lead quality uplift',
  },
  {
    Icon: ShoppingCart,
    title: 'Commerce Infrastructure',
    desc: 'End-to-end commerce architecture including catalog systems, checkout flows, and secure payments engineered for scale.',
    chip: 'EC',
    glow: 'from-emerald-500/15 to-teal-400/15',
    iconClass: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    outcome: 'Scalable monetization',
  },
  {
    Icon: RefreshCcw,
    title: 'Experience Revamp',
    desc: 'Legacy digital experiences restructured with stronger UX clarity, faster performance, and better conversion architecture.',
    chip: 'WR',
    glow: 'from-sky-500/15 to-indigo-500/15',
    iconClass: 'text-sky-700 bg-sky-50 border-sky-100',
    outcome: 'Stronger conversion flow',
  },
  {
    Icon: ShieldCheck,
    title: 'Growth Maintenance',
    desc: 'Ongoing technical support, release updates, and reliability monitoring to sustain momentum after launch.',
    chip: 'WM',
    glow: 'from-amber-500/15 to-orange-400/15',
    iconClass: 'text-amber-700 bg-amber-50 border-amber-100',
    outcome: 'Operational continuity',
  },
]

export default function Services() {
  return (
    <section id="services" className="relative py-24 px-6 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-4">
            Studio Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">Studio Capabilities</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Premium web and product systems designed for startups, modern brands, and scaling companies.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${s.glow}`} />

              <div className="flex items-center justify-between mb-5">
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${s.iconClass}`}>
                  <s.Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold tracking-wider text-slate-400">{s.chip}</span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-2 leading-tight">{s.title}</h3>
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-full px-2.5 py-1 mb-4">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {s.outcome}
              </p>
              <p className="text-[15px] text-slate-600 leading-relaxed mb-6">{s.desc}</p>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-800 hover:text-blue-600 transition-colors"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.article>
          ))}

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="relative rounded-2xl p-8 text-white overflow-hidden bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 shadow-2xl"
          >
            <div className="absolute -top-20 -right-16 h-48 w-48 rounded-full bg-white/15 blur-2xl" />
            <div className="absolute -bottom-14 -left-10 h-40 w-40 rounded-full bg-emerald-300/20 blur-2xl" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/15 border border-white/20 rounded-xl flex items-center justify-center mb-5">
                <MessageCircleQuestion className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Not sure what you need?</h3>
              <p className="text-blue-100 text-[15px] leading-relaxed mb-7">
                Start with a studio consultation to define your scope, priorities, and execution roadmap.
              </p>
              <div className="text-xs uppercase tracking-wider font-semibold text-blue-100/90 mb-4">
                Strategic consultation • Structured scope
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-lg transition-colors"
              >
                Book Studio Call
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}
