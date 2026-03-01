"use client"
import { useEffect, useRef, useState } from "react"
import { SOCIAL_LINKS } from "../data"

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            once: true,
          },
        })

        tl.fromTo(
          headingRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.76, ease: "power3.out" },
        )
          .fromTo(
            dividerRef.current,
            { scaleX: 0, opacity: 0.35, transformOrigin: "left center" },
            { scaleX: 1, opacity: 1, duration: 0.72, ease: "power2.out" },
            "-=0.48",
          )
          .fromTo(
            badgeRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.56, ease: "power2.out" },
            "-=0.46",
          )
          .fromTo(
            contentRef.current,
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            "-=0.36",
          )
      } catch {
        // no-op
      }
    }
    init()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setErrorMsg("")

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      source: "shubiq",
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Contact submit failed")
      setSent(true)
      setForm({ name: "", email: "", message: "" })
    } catch {
      setErrorMsg("Unable to submit right now. Please try again.")
    } finally {
      setSending(false)
    }
  }

  const inputClass =
    "w-full rounded-sm bg-[rgb(var(--surface-1-rgb)/0.76)] border border-[rgb(var(--cream-rgb)/0.16)] text-cream/95 font-cormorant text-[17px] px-4 py-3.5 focus:outline-none focus:border-gold/56 focus:bg-[rgb(var(--surface-2-rgb)/0.92)] focus:shadow-[0_0_0_1px_rgb(var(--gold-rgb)_/_0.18),0_0_24px_rgb(var(--gold-rgb)_/_0.16),inset_0_1px_8px_rgb(var(--gold-rgb)_/_0.06)] transition-all duration-[360ms] ease-out placeholder:text-cream/45"
  const panelClass =
    "rounded-sm border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft p-6 sm:p-7 transition-all duration-[380ms] ease-out hover:border-gold/26 relative overflow-hidden hover:-translate-y-0.5 hover:bg-card-soft-hover hover:shadow-[0_16px_36px_rgb(var(--ink-rgb)_/_0.36),0_0_0_1px_rgb(var(--gold-rgb)_/_0.18)]"

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen flex items-center py-[104px] px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgb(var(--gold-rgb) / 0.05) 0%, transparent 65%)" }}
      />
      <div className="absolute -left-24 top-12 w-[340px] h-[340px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto w-full">
        <div ref={headingRef} className="mb-2 sm:mb-4 md:mb-6 max-w-4xl">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
            <span className="w-1 h-1 rounded-full bg-gold/85" />
            <div className="font-rajdhani text-[12px] sm:text-[13px] tracking-[4px] sm:tracking-[6px] text-gold/78 uppercase">Contact</div>
            <span className="w-12 sm:w-16 h-px bg-gradient-to-r from-gold/40 to-transparent" />
          </div>
          <h2 className="font-cinzel font-black leading-tight mb-4" style={{ fontSize: "clamp(38px, 5.3vw, 68px)" }}>
            <span className="text-cream">Let&apos;s Build </span>
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgb(var(--gold-rgb)) 18%, rgb(var(--gold-light-rgb)) 52%, rgb(var(--gold-rgb)) 92%)",
              }}
            >
              Together
            </span>
          </h2>
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 mb-4 rounded-sm border border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--cream-rgb)/0.02)] px-3 py-1.5 hover:border-gold/34 hover:shadow-[0_0_18px_rgb(var(--gold-rgb)_/_0.14)] transition-all duration-300"
          >
            <span className="contact-status-dot w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-rajdhani text-[11px] tracking-[3.3px] uppercase text-cream/80">Available for select projects</span>
          </div>
          <div ref={dividerRef} className="h-px w-28 sm:w-36 bg-gradient-to-r from-gold/45 to-transparent" />
        </div>

        <div ref={contentRef} className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-stretch">
          <div className="h-full">
            {sent ? (
              <div className={`${panelClass} text-center`}>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(140deg, rgb(var(--gold-rgb) / 0.08), transparent 35%, transparent 75%, rgb(var(--gold-rgb) / 0.07))" }}
                />
                <div className="w-9 h-9 mx-auto mb-4 rounded-full border border-gold/35 flex items-center justify-center text-gold">+</div>
                <h3 className="font-cinzel text-xl text-gold mb-2">Message Received</h3>
                <p className="font-cormorant text-cream/72 text-lg">I will get back to you within 24 hours.</p>
              </div>
            ) : (
              <div className={`${panelClass} h-full`}>
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(140deg, rgb(var(--gold-rgb) / 0.08), transparent 35%, transparent 75%, rgb(var(--gold-rgb) / 0.07))" }}
                />
                <form onSubmit={handleSubmit} className="space-y-5 relative h-full flex flex-col">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 block mb-2">Name</label>
                      <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Your name"
                        className={inputClass}
                        required
                      />
                    </div>
                    <div>
                      <label className="font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 block mb-2">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="font-rajdhani text-[12px] tracking-[3px] uppercase text-gold/85 block mb-2">Message</label>
                    <textarea
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us about your project..."
                      className={`${inputClass} resize-none`}
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full rounded-sm font-rajdhani text-[13px] tracking-[3.2px] uppercase bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_58%,rgb(var(--gold-dark-rgb)))] text-ink py-3.5 font-semibold transition-all duration-300 hover:tracking-[3.6px] hover:shadow-[0_10px_30px_rgb(var(--gold-rgb)_/_0.28),inset_0_0_16px_rgb(var(--cream-rgb)_/_0.14)] hover:bg-[linear-gradient(160deg,rgb(var(--gold-light-rgb)),rgb(var(--gold-rgb))_42%,rgb(var(--gold-light-rgb)))] hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                  {errorMsg && <p className="font-cormorant text-red-300 text-center">{errorMsg}</p>}
                  <p className="font-rajdhani text-[10px] tracking-[2.5px] uppercase text-cream/70 text-center">Response usually within 24 hours</p>
                </form>
              </div>
            )}
          </div>

          <div className="space-y-6 sm:space-y-8 lg:space-y-6 h-full flex flex-col">
            <div className={`${panelClass} min-h-[130px] flex flex-col justify-center`}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(160deg, rgb(var(--gold-rgb) / 0.06), transparent 35%, transparent 78%, rgb(var(--gold-rgb) / 0.06))" }}
              />
              <div className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/85 mb-3">Email</div>
              <a href="mailto:shubham95792@gmail.com" className="font-cormorant text-xl text-cream hover:text-gold transition-colors duration-300">
                shubham95792@gmail.com
              </a>
            </div>

            <div className={`${panelClass} flex-1`}>
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(160deg, rgb(var(--gold-rgb) / 0.06), transparent 35%, transparent 78%, rgb(var(--gold-rgb) / 0.06))" }}
              />
              <div className="font-rajdhani text-[12px] tracking-[4px] uppercase text-gold/85 mb-4">Socials</div>
              <div className="grid grid-cols-2 gap-3">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group rounded-sm flex flex-col p-3 border border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--cream-rgb)/0.015)] hover:border-[rgb(var(--cream-rgb)/0.68)] hover:shadow-[0_0_0_1px_rgb(var(--cream-rgb)_/_0.32),0_0_24px_rgb(var(--gold-rgb)_/_0.12)] hover:bg-[rgb(var(--cream-rgb)/0.035)] focus-visible:outline-none focus-visible:border-[rgb(var(--cream-rgb)/0.72)] transition-all duration-[320ms]"
                  >
                    <span className="font-rajdhani text-[12px] tracking-[3px] uppercase text-cream/72 group-hover:text-gold/90 transition-colors duration-300 mb-1">
                      {s.label}
                    </span>
                    <span className="font-cormorant text-cream/84 text-sm group-hover:text-cream transition-colors duration-300">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
