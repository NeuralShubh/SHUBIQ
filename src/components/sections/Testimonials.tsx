'use client'
import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Dr. Ramesh Kulkarni',
    role: 'Owner, CareFirst Clinic - Pune',
    text: "SHUBIQ Studio delivered a high-trust digital experience for our clinic with clear patient pathways and fast performance. Results came quickly after launch.",
    avatar: 'R',
    bg: 'from-blue-700 to-blue-500',
  },
  {
    name: 'Priya Nair',
    role: 'Founder, Spice Garden Restaurant - Mumbai',
    text: 'SHUBIQ Studio brought structure, speed, and design clarity to our digital presence. The improved customer flow had a direct impact on online orders.',
    avatar: 'P',
    bg: 'from-emerald-700 to-emerald-500',
  },
  {
    name: 'Advocate Sanjay Sharma',
    role: 'Managing Partner, Sharma & Associates - Delhi',
    text: 'SHUBIQ Studio delivered a professional, confidence-led web system that improved how prospective clients understand our credibility before first contact.',
    avatar: 'S',
    bg: 'from-violet-700 to-violet-500',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative py-24 px-6 bg-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/50 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-flex items-center text-xs font-bold tracking-widest text-blue-600 bg-blue-50 border border-blue-100 rounded-full px-4 py-2 mb-4">
            TESTIMONIALS
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">Clients Who Love Their Websites</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Real feedback from brands that partnered with SHUBIQ Studio for digital execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-7 shadow-sm hover:-translate-y-1.5 hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-4 h-4 text-slate-300" />
              </div>

              <p className="text-slate-700 text-[15px] leading-relaxed italic mb-7">&quot;{t.text}&quot;</p>

              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.bg} flex items-center justify-center text-white font-bold text-base flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
