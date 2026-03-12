"use client"
import { useEffect, useRef, useState } from "react"
import { SOCIAL_LINKS } from "../data"
import { useInViewOnce } from "../lib/gsap-hooks"

export default function Hero() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>("120px 0px")
  const titleRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const bioRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const socialRef = useRef<HTMLDivElement>(null)
  const ring1Ref = useRef<HTMLDivElement>(null)
  const ring2Ref = useRef<HTMLDivElement>(null)
  const ring3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let a1 = 0
    let a2 = 0
    let a3 = 0
    let rafId: number

    const rotate = () => {
      a1 += 0.0024
      a2 -= 0.00144
      a3 += 0.0008
      if (ring1Ref.current) ring1Ref.current.style.rotate = `${a1}rad`
      if (ring2Ref.current) ring2Ref.current.style.rotate = `${a2}rad`
      if (ring3Ref.current) ring3Ref.current.style.rotate = `${a3}rad`
      rafId = requestAnimationFrame(rotate)
    }

    rafId = requestAnimationFrame(rotate)
    return () => cancelAnimationFrame(rafId)
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const handleScroll = () => {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect) return
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)))
      const ring1 = ring1Ref.current
      const ring2 = ring2Ref.current
      if (ring1) ring1.style.transform = `translateY(${-30 * progress}%)`
      if (ring2) ring2.style.transform = `translateY(${-20 * progress}%)`
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [sectionRef])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="home" ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-visible px-5 max-[768px]:px-[14px] sm:px-6 pt-28 max-[768px]:pt-24 pb-12 sm:pb-20">
      <div
        className="hero-grid-overlay absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgb(var(--gold-rgb) / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--gold-rgb) / 0.05) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        className="hero-center-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[740px] h-[740px] md:w-[800px] md:h-[800px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.09) 0%, transparent 65%)" }}
      />

        <div
          ref={ring1Ref}
          className={`hero-ring absolute top-1/2 left-1/2 pointer-events-none ${isInView ? "in-view" : ""}`}
          style={{ width: 600, height: 600, marginLeft: -300, marginTop: -300, opacity: 0, animationDelay: "0.1s" }}
        >
        <div className="hero-ring-1-border absolute inset-0 rounded-full border border-[rgb(var(--gold-rgb)/0.14)]" />
        <div className="absolute top-0 left-1/2 w-2 h-2 rounded-full bg-gold/80 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-1 h-1 rounded-full bg-gold/30" />
        <div className="absolute top-1/3 right-0 w-1.5 h-1.5 rounded-full bg-gold/15" />
      </div>

        <div
          ref={ring2Ref}
          className={`hero-ring absolute top-1/2 left-1/2 pointer-events-none ${isInView ? "in-view" : ""}`}
          style={{ width: 380, height: 380, marginLeft: -190, marginTop: -190, opacity: 0, animationDelay: "0.28s" }}
        >
        <div className="hero-ring-2-border absolute inset-0 rounded-full" style={{ border: "1px dashed rgb(var(--gold-rgb) / 0.12)" }} />
        <div className="absolute top-0 left-1/2 w-1 h-1 rounded-full bg-gold/30 -translate-x-1/2" />
      </div>

      <div
        ref={ring3Ref}
        className={`hero-ring absolute top-1/2 left-1/2 pointer-events-none ${isInView ? "in-view" : ""}`}
        style={{ width: 220, height: 220, marginLeft: -110, marginTop: -110, opacity: 0, animationDelay: "0.46s" }}
      >
        <div className="hero-ring-3-border absolute inset-0 rounded-full" style={{ border: "1px solid rgb(var(--gold-rgb) / 0.1)" }} />
      </div>

      <div className="relative z-10 text-center max-w-[51rem] max-[768px]:max-w-[46rem] mx-auto md:-translate-y-8 overflow-visible">
        <div className="inline-block w-fit overflow-visible pb-[0.08em] md:pb-[0.12em] pr-[0.12em] md:pr-[0.18em]">
          <h1
            ref={titleRef}
            className={`hero-reveal ${isInView ? "in-view" : ""} font-cinzel font-black text-[clamp(32px,6.8vw,69px)] max-[768px]:text-[clamp(25.5px,8.5vw,38px)] md:text-[clamp(37px,4.2vw,67px)] leading-[1.12] max-[768px]:leading-[1.1] md:leading-[1.15] tracking-[1.3px] max-[768px]:tracking-[1px] md:tracking-[1.4px] mb-3 max-[768px]:mb-[8px] md:mb-4 text-gradient-gold perspective-1000 pb-[0.24em] md:pb-[0.3em] pr-[0.56em] max-[768px]:pr-[0.4em] md:pr-[0.62em] inline-block overflow-visible max-w-full break-normal whitespace-normal`}
            style={{ perspective: "800px", animationDelay: "0.3s" }}
          >
            SHUBIQ
          </h1>
        </div>

        <p
          ref={taglineRef}
          className={`hero-reveal ${isInView ? "in-view" : ""} site-hero-tagline font-cormorant font-medium italic text-gold uppercase mb-7 max-[768px]:mb-4 md:mb-8 tracking-[3px] md:tracking-[6px]`}
          style={{ fontSize: "clamp(18px, 2.5vw, 30px)", animationDelay: "0.75s" }}
        >
          Intelligence That Wins
        </p>

        <div className="flex items-center justify-center gap-4 mb-7 max-[768px]:mb-4 md:mb-8">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-gold" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        <p
          ref={bioRef}
          className={`hero-reveal ${isInView ? "in-view" : ""} site-hero-copy font-cormorant text-cream/84 leading-[1.62] max-[768px]:leading-[1.58] max-w-[860px] mx-auto mb-7 md:mb-8 px-2 max-[768px]:px-5 max-[768px]:text-[15.5px]`}
          style={{ fontSize: "clamp(16px, 1.38vw, 20px)", animationDelay: "0.9s" }}
        >
          <span
            className="block font-cinzel text-cream mb-6 max-[768px]:mb-4 md:mb-7 leading-[1.15] max-[768px]:text-[clamp(22px,8vw,32px)]"
            style={{ fontSize: "clamp(26px, 4vw, 56px)" }}
          >
            <span className="font-semibold">We Build </span>
            <span className="font-black">Digital Products</span>
            <span className="font-medium"> That Win.</span>
          </span>
          <span className="block">
            We design and engineer high-performance digital systems for brands that value precision and long-term impact.
          </span>
        </p>

        <div
          ref={ctaRef}
          className={`hero-reveal ${isInView ? "in-view" : ""} flex gap-3.5 max-[768px]:gap-2.5 sm:gap-4 justify-center max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:w-full max-[768px]:max-w-[360px] max-[768px]:mx-auto flex-wrap mb-9 sm:mb-10`}
          style={{ animationDelay: "1.05s" }}
        >
          <MagneticButton onClick={() => scrollTo("projects")} primary>
            Explore Work
          </MagneticButton>
          <MagneticButton onClick={() => scrollTo("contact")}>Hire Us</MagneticButton>
        </div>

        <div
          ref={socialRef}
          className={`hero-reveal ${isInView ? "in-view" : ""} mx-auto w-full max-[768px]:max-w-[360px] sm:w-fit border-t border-gold/15 pt-5 sm:pt-6 grid grid-cols-2 sm:flex max-[768px]:gap-x-6 gap-x-5 sm:gap-x-7 max-[768px]:gap-y-4 gap-y-3 sm:gap-8 justify-center items-center mb-6 sm:mb-10`}
          style={{ animationDelay: "1.2s" }}
        >
          {SOCIAL_LINKS.map((s) => (
            <div key={s.label} className="flex items-center justify-center">
              <a
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="site-hero-social font-rajdhani text-[11px] sm:text-[13px] tracking-[1.45px] sm:tracking-[3.1px] text-cream/68 uppercase hover:text-gold transition-colors duration-300 text-center whitespace-nowrap"
              >
                {s.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
        <span className="font-rajdhani text-[14px] tracking-[5px] text-cream/60 uppercase">Scroll</span>
        <div className="w-px h-12 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-b from-gold to-transparent animate-scroll-line" />
        </div>
      </div>
    </section>
  )
}

function MagneticButton({ children, onClick, primary }: { children: React.ReactNode; onClick: () => void; primary?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  const [isDesktopInteractions, setIsDesktopInteractions] = useState(false)

  useEffect(() => {
    const update = () => setIsDesktopInteractions(window.innerWidth >= 768 && !("ontouchstart" in window))
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktopInteractions) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - rect.left - rect.width / 2) * 0.3
    const dy = (e.clientY - rect.top - rect.height / 2) * 0.3
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const handleMouseLeave = () => {
    if (!isDesktopInteractions) return
    const el = ref.current
    if (!el) return
    el.style.transform = "translate(0px, 0px)"
    el.style.transition = "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
  }

  return (
    <button
      ref={ref}
      onClick={onClick}
      onMouseMove={isDesktopInteractions ? handleMouseMove : undefined}
      onMouseLeave={isDesktopInteractions ? handleMouseLeave : undefined}
      className={`w-full sm:w-auto min-w-0 sm:min-w-[220px] max-w-none sm:max-w-[320px] font-rajdhani text-[13px] sm:text-[15px] tracking-[2.8px] sm:tracking-[3.6px] uppercase px-8 sm:px-10 py-[14px] sm:py-3.5 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 ${
        primary
          ? `max-[768px]:rounded-sm max-[768px]:text-[13px] max-[768px]:tracking-[3.2px] max-[768px]:border-gold/70 max-[768px]:bg-gold max-[768px]:text-ink max-[768px]:py-3.5 bg-gold text-ink border border-gold/70 ${isDesktopInteractions ? "hover:bg-gold-light hover:shadow-[0_0_28px_rgb(var(--gold-rgb)/0.28)]" : ""}`
          : `border border-gold/30 text-cream ${isDesktopInteractions ? "hover:border-gold hover:text-gold hover:bg-gold/6" : ""}`
      }`}
    >
      {children}
    </button>
  )
}
