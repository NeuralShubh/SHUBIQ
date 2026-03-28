"use client"
import { useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { SOCIAL_LINKS } from "../data"
import { useInViewOnce } from "../lib/gsap-hooks"
import FloatingInput from "./FloatingInput"

export default function Contact() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>("200px 0px")
  const headingRef = useRef<HTMLDivElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const prefersReduced = useReducedMotion()
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [touched, setTouched] = useState({ name: false, email: false, message: false })
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [sent, setSent] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
  const nameError = touched.name && form.name.trim().length === 0
  const emailError = touched.email && !emailValid
  const messageError = touched.message && form.message.trim().length === 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (!form.name.trim() || !form.email.trim() || !emailValid || !form.message.trim()) {
      setSubmitState("error")
      setTimeout(() => setSubmitState("idle"), 2000)
      return
    }

    setSubmitState("loading")
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
      setSubmitState("success")
      setForm({ name: "", email: "", message: "" })
      setTimeout(() => setSent(true), 1200)
      setTimeout(() => setSubmitState("idle"), 3000)
    } catch {
      setErrorMsg("Unable to submit right now. Please try again.")
      setSubmitState("error")
      setTimeout(() => setSubmitState("idle"), 2000)
    }
  }

  const panelClass =
    "rounded-sm border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft p-6 sm:p-7 transition-all duration-[380ms] ease-out hover:border-gold/26 relative overflow-hidden hover:bg-card-soft-hover hover:shadow-[0_16px_36px_rgb(var(--ink-rgb)_/_0.36),0_0_0_1px_rgb(var(--gold-rgb)_/_0.18)]"

  return (
    <section id="contact" ref={sectionRef} className="cv-auto min-h-screen flex items-center py-[104px] px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 60%, rgb(var(--gold-rgb) / 0.05) 0%, transparent 65%)" }}
      />
      <div className="absolute -left-24 top-12 w-[340px] h-[340px] rounded-full pointer-events-none opacity-30"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.06) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto w-full">
        <div ref={headingRef} className={`reveal ${isInView ? "in-view" : ""} mb-2 sm:mb-4 md:mb-6 max-w-4xl`} style={{ animationDelay: "0.1s" }}>
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
            className={`reveal ${isInView ? "in-view" : ""} inline-flex items-center gap-2.5 mb-4 rounded-sm border border-[rgb(var(--cream-rgb)/0.2)] bg-[rgb(var(--cream-rgb)/0.02)] px-3 py-1.5 hover:border-gold/34 hover:shadow-[0_0_18px_rgb(var(--gold-rgb)_/_0.14)] transition-all duration-300`}
            style={{ animationDelay: "0.26s" }}
          >
            <span className="contact-status-dot w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="font-rajdhani text-[11px] tracking-[3.3px] uppercase text-cream/80">Available for select projects</span>
          </div>
          <div ref={dividerRef} className={`reveal-line ${isInView ? "in-view" : ""} h-px w-28 sm:w-36 bg-gradient-to-r from-gold/45 to-transparent`} style={{ animationDelay: "0.18s" }} />
        </div>

        <div ref={contentRef} className={`reveal ${isInView ? "in-view" : ""} grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-14 items-stretch`} style={{ animationDelay: "0.34s" }}>
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
                <form onSubmit={handleSubmit} className="space-y-6 relative h-full flex flex-col">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FloatingInput
                      label="Name"
                      name="name"
                      value={form.name}
                      required
                      onChange={(value) => setForm({ ...form, name: value })}
                      onBlur={() => setTouched((prev) => ({ ...prev, name: true }))}
                      error={nameError}
                    />
                    <FloatingInput
                      label="Email"
                      name="email"
                      type="email"
                      value={form.email}
                      required
                      onChange={(value) => setForm({ ...form, email: value })}
                      onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
                      error={emailError}
                    />
                  </div>

                  <FloatingInput
                    label="Message"
                    name="message"
                    multiline
                    value={form.message}
                    required
                    maxLength={500}
                    onChange={(value) => setForm({ ...form, message: value })}
                    onBlur={() => setTouched((prev) => ({ ...prev, message: true }))}
                    error={messageError}
                    helperText={`${form.message.length}/500`}
                  />

                  <motion.button
                    type="submit"
                    disabled={submitState === "loading"}
                    className="relative overflow-hidden w-full rounded-sm font-rajdhani text-[13px] tracking-[3.2px] uppercase border border-gold/70 bg-[linear-gradient(90deg,rgb(var(--gold-rgb)/0.16),rgb(var(--gold-rgb)/0.04))] bg-[length:0%_100%] bg-left bg-no-repeat text-gold-light py-3.5 font-semibold transition-all duration-300 hover:bg-[length:100%_100%] hover:text-ink hover:border-gold/80 disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={prefersReduced ? undefined : { scale: 1.02 }}
                    whileTap={prefersReduced ? undefined : { scale: 0.98 }}
                    animate={
                      submitState === "error" && !prefersReduced
                        ? { x: [0, -8, 8, -8, 8, 0] }
                        : undefined
                    }
                    transition={submitState === "error" ? { duration: 0.4 } : { duration: 0.2 }}
                  >
                    {submitState === "idle" && "Send Message"}
                    {submitState === "loading" && (
                      <span className="inline-flex items-center justify-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold/70 border-t-transparent" />
                        Sending
                      </span>
                    )}
                    {submitState === "success" && "✓ Sent!"}
                    {submitState === "error" && "Try Again"}
                  </motion.button>
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
              <a href="mailto:shubiqofficial@gmail.com" className="font-cormorant text-xl text-cream hover:text-gold transition-colors duration-300">
                shubiqofficial@gmail.com
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
