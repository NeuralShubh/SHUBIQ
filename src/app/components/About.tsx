"use client"
import { useEffect, useRef } from "react"

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRefs = useRef<HTMLParagraphElement[]>([])
  const photoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const init = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        gsap.registerPlugin(ScrollTrigger)
        const isMobile = window.innerWidth <= 768
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: isMobile ? "top 82%" : "top 72%", once: isMobile },
        })

        tl.fromTo(
          headingRef.current,
          { y: isMobile ? 18 : 26, opacity: 0 },
          { y: 0, opacity: 1, duration: isMobile ? 0.72 : 0.6, ease: "power2.out", force3D: true },
        ).fromTo(
          textRefs.current,
          { y: isMobile ? 14 : 24, opacity: 0 },
          { y: 0, opacity: 1, duration: isMobile ? 0.66 : 0.6, ease: "power2.out", stagger: isMobile ? 0.12 : 0.08, force3D: true },
          0.15,
        ).fromTo(
          photoRef.current,
          { y: isMobile ? 16 : 28, opacity: 0 },
          { y: 0, opacity: 1, duration: isMobile ? 0.68 : 0.6, ease: "power2.out", force3D: true },
          0.2,
        )
      } catch {
        // no-op
      }
    }
    init()
  }, [])

  const addTextRef = (el: HTMLParagraphElement | null, i: number) => {
    if (el) textRefs.current[i] = el
  }

  return (
    <section id="about" ref={sectionRef} className="min-h-screen flex items-center py-[96px] relative overflow-hidden">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.03) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -left-28 top-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.02) 0%, transparent 72%)" }}
      />

      <div className="about-container">
        <div className="flex items-center gap-2.5 sm:gap-3 mb-5">
          <span className="w-1 h-1 rounded-full bg-gold/80" />
          <div className="font-rajdhani text-[14px] tracking-[7px] text-gold/85 uppercase">About</div>
          <span className="hidden sm:block w-14 h-px bg-gradient-to-r from-gold/60 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-32 xl:gap-36 items-center">
          <div>
            <h2
              ref={headingRef}
              className="about-mobile-heading font-cinzel font-black mb-4 sm:mb-6 md:mb-8 leading-[0.92] md:leading-[0.89] tracking-[0.35px] md:tracking-[0.5px]"
              style={{ fontSize: "clamp(32px, 10vw, 78px)", opacity: 0 }}
            >
              <span className="text-cream/92 font-semibold text-[0.9em]">The Mind</span>
              <br />
              <span className="text-gold font-black tracking-[1.4px] md:tracking-[1.8px] -mt-[5px] block">Behind SHUBIQ</span>
            </h2>

            <div className="w-16 sm:w-24 h-px bg-gradient-to-r from-gold/90 via-gold/45 to-transparent mb-6 sm:mb-7 md:mb-9" />

            <div className="md:hidden about-mobile-photo-wrap mb-8 sm:mb-10">
              <div className="about-mobile-photo-card relative corner-gold p-3 pb-6 bg-[rgb(var(--surface-1-rgb)/0.88)] border border-[rgb(var(--cream-rgb)/0.14)] w-[82%] max-w-[310px] mx-auto">
                <div
                  className="pointer-events-none absolute inset-0 -z-10 rounded-[6px]"
                  style={{ background: "radial-gradient(circle at 50% 35%, rgb(var(--gold-rgb) / 0.08), transparent 68%)" }}
                />
                <div className="aspect-[3/4] w-full overflow-hidden border border-gold/15">
                  <img
                    src="https://res.cloudinary.com/dl1jueuj3/image/upload/v1772213832/Image_ky1fkg.png"
                    alt="Shubham Patil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="about-mobile-nameplate absolute -bottom-3 left-1/2 -translate-x-1/2 border border-gold/25 bg-[rgb(var(--surface-2-rgb)/0.95)] px-3 py-1.5">
                  <div className="font-cinzel text-[15px] leading-none text-gold">Shubham Patil</div>
                </div>
              </div>
            </div>

            <div className="about-mobile-copy-wrap space-y-7 sm:space-y-8 md:space-y-9 max-w-[530px]">
              <p
                ref={(el) => addTextRef(el, 0)}
                className="about-mobile-copy font-cormorant text-cream/86 leading-[1.82] tracking-[0.1px] text-left"
                style={{ fontSize: "clamp(17px, 4.6vw, 22px)", opacity: 0 }}
              >
                SHUBIQ is led by <span className="font-semibold text-cream">Shubham Patil</span>, a technology builder focused on designing{" "}
                <span className="text-gold/80 italic">intelligent systems</span> and future-ready digital products. Every solution is engineered for long-term
                impact, not short-term trends.
              </p>

              <p
                ref={(el) => addTextRef(el, 1)}
                className="about-mobile-copy font-cormorant text-cream/86 leading-[1.82] tracking-[0.1px] text-left"
                style={{ fontSize: "clamp(17px, 4.6vw, 22px)", opacity: 0 }}
              >
                As a brand, <span className="font-semibold text-cream">SHUBIQ</span> creates platforms that combine{" "}
                <span className="font-semibold text-cream">artificial intelligence, productivity, and scalable software</span> to solve real-world business
                problems and turn bold ideas into products people actually use.
              </p>

              <div className="about-mobile-quote mt-9 border-l-[4px] border-gold/38 pl-8 py-1">
                <p
                  ref={(el) => addTextRef(el, 2)}
                  className="about-mobile-quote-text font-cormorant text-gold/66 italic leading-[1.42]"
                  style={{ fontSize: "clamp(18.3px, 6vw, 30.8px)", opacity: 0, textShadow: "0 0 14px rgb(var(--gold-rgb) / 0.07)" }}
                >
                  <span className="about-mobile-quote-mark text-gold/95 mr-1">"</span>
                  The future belongs to those who build intelligent tools, not just consume them.
                  <span className="about-mobile-quote-mark text-gold/95 ml-1">"</span>
                </p>
              </div>
            </div>
          </div>

          <div ref={photoRef} style={{ opacity: 0 }} className="hidden md:block w-full max-w-[400px] lg:max-w-[440px] ml-auto">
            <div
              className="relative corner-gold group p-[14px] lg:p-4 bg-[rgb(var(--surface-1-rgb)/0.9)] border border-[rgb(var(--cream-rgb)/0.14)]"
              style={{ boxShadow: "0 22px 34px rgb(0 0 0 / 0.46), 0 0 0 1px rgb(var(--gold-rgb) / 0.07) inset" }}
            >
              <div className="absolute -inset-[4px] border border-[0.8px] border-gold/12 pointer-events-none" />
              <div className="aspect-[3/4] w-full overflow-hidden border border-[0.8px] border-[rgb(var(--cream-rgb)/0.1)]">
                <img
                  src="https://res.cloudinary.com/dl1jueuj3/image/upload/v1772213832/Image_ky1fkg.png"
                  alt="Shubham Patil"
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.01]"
                />
              </div>
              <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, transparent 70%, rgb(var(--ink-rgb) / 0.12) 100%)" }} />
              <div className="absolute left-5 right-5 top-5 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[76%] border border-gold/22 bg-[rgb(var(--surface-1-rgb)/0.99)] backdrop-blur-sm px-4 py-3 text-center">
                <div className="h-px w-full mb-2 bg-gradient-to-r from-transparent via-gold/28 to-transparent" />
                <div className="font-cinzel font-bold text-[23px] leading-none text-gold">Shubham Patil</div>
                <div className="font-rajdhani text-[9px] tracking-[4.1px] uppercase text-cream/56 mt-1">Creative Director | SHUBIQ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
