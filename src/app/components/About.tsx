"use client"
import { useInViewOnce } from "../lib/gsap-hooks"
import StaggerContainer, { StaggerItem } from "./StaggerContainer"
import SectionLabel from "./SectionLabel"

export default function About() {
  const [sectionRef, isInView] = useInViewOnce<HTMLElement>("120px 0px")

  return (
    <section id="about" ref={sectionRef} className="cv-auto pt-[96px] pb-[120px] px-4 sm:px-6 relative overflow-hidden">
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.03) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -left-28 top-24 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgb(var(--gold-rgb) / 0.02) 0%, transparent 72%)" }}
      />

      <div className="about-container">
        <div className="sm:hidden mb-5">
          <SectionLabel label="About" centered />
        </div>

        <div className="hidden sm:flex items-center gap-2.5 sm:gap-3 mb-5">
          <span className="w-1 h-1 rounded-full bg-gold/80" />
          <div className="font-rajdhani text-[14px] tracking-[7px] text-gold/85 uppercase">About</div>
          <span className="w-14 h-px bg-gradient-to-r from-gold/60 to-transparent" />
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 sm:gap-16 lg:gap-28 xl:gap-32 items-start">
          <div>
            <h2
              className={`reveal ${isInView ? "in-view" : ""} about-mobile-heading font-cinzel font-normal mb-4 sm:mb-6 md:mb-8 leading-[0.92] md:leading-[0.89] tracking-[0.35px] md:tracking-[0.5px]`}
              style={{ fontSize: "clamp(32px, 10vw, 78px)", animationDelay: "0.1s" }}
            >
              <span className="text-cream/92 text-[0.9em]">About </span>
              <span className="text-gold tracking-[1.4px] md:tracking-[1.8px]">SHUBIQ</span>
            </h2>

            <div className="about-mobile-copy-wrap mt-6 sm:mt-7 md:mt-0 space-y-4 sm:space-y-5 md:space-y-5 max-w-[580px]">
              <p
                className={`reveal ${isInView ? "in-view" : ""} about-mobile-copy font-cormorant text-cream/86 leading-[1.82] tracking-[0.1px] text-left`}
                style={{ fontSize: "clamp(17px, 4.6vw, 22px)", animationDelay: "0.25s" }}
              >
                <span className="font-semibold text-cream">SHUBIQ</span> is a premium digital engineering brand crafting high-performance web platforms, productivity
                apps, and intelligent systems for ambitious founders and teams.
              </p>

              <p
                className={`reveal ${isInView ? "in-view" : ""} about-mobile-copy font-cormorant text-cream/86 leading-[1.82] tracking-[0.1px] text-left`}
                style={{ fontSize: "clamp(17px, 4.6vw, 22px)", animationDelay: "0.38s" }}
              >
                We deliver conversion-first websites and AI-integrated product systems built for clarity, speed, and long-term scale, not just a good launch.
              </p>

              <p
                className={`reveal ${isInView ? "in-view" : ""} about-mobile-copy font-cormorant text-cream/82 leading-[1.75] tracking-[0.1px] text-left`}
                style={{ fontSize: "clamp(15.5px, 4.2vw, 20px)", animationDelay: "0.5s" }}
              >
                The SHUBIQ system blends strategy, engineering, and premium design to turn ambitious ideas into durable platforms that earn trust and compound value.
              </p>

              <div className="mt-[104px] max-[768px]:mt-12 max-[768px]:flex max-[768px]:justify-center">
                <a
                  href="/founder"
                  data-cursor="View"
                  className="hero-cta cta-ghost inline-flex items-center justify-center min-w-[220px] font-rajdhani text-[13px] sm:text-[15px] tracking-[2.8px] sm:tracking-[3.6px] uppercase px-8 sm:px-10 py-[14px] sm:py-3.5 font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold/60 border border-gold/30 text-cream"
                >
                  <span className="relative z-[1]">Meet the Founder</span>
                </a>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[520px] ml-auto">
            <div className="border border-[rgb(var(--cream-rgb)/0.14)] bg-card-soft rounded-sm p-5 sm:p-6">
              <div className="font-rajdhani text-[11px] tracking-[3px] uppercase text-gold/70 mb-4">Brand Foundations</div>
              <StaggerContainer staggerDelay={0.1} className="grid sm:grid-cols-2 gap-4 items-stretch">
                {[
                  { title: "Precision Engineering", desc: "High-performance systems designed for speed, stability, and scale." },
                  { title: "Product Intelligence", desc: "AI-integrated workflows that elevate outcomes, not noise." },
                  { title: "Premium UX", desc: "Design systems built to convert attention into action." },
                  { title: "Long-Term Architecture", desc: "Durable infrastructure that grows with your business." },
                ].map((item) => (
                  <StaggerItem key={item.title} className="h-full">
                    <div className="h-full border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb)/0.5)] p-4 flex flex-col">
                      <div className="font-cinzel text-[16px] text-cream/90">{item.title}</div>
                      <div className="font-cormorant text-cream/70 mt-2 text-[15px] leading-[1.55]">{item.desc}</div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
