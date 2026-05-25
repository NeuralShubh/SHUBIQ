"use client"

import Image from "next/image"

type CinematicMetric = {
  label: string
  value: string
}

interface CinematicMediaFrameProps {
  imageSrc: string
  alt: string
  badge: string
  caption?: string
  eyebrow?: string
  metrics?: CinematicMetric[]
  objectPosition?: string
  className?: string
}

export default function CinematicMediaFrame({
  imageSrc,
  alt,
  badge,
  caption,
  eyebrow,
  metrics = [],
  objectPosition = "center",
  className = "",
}: CinematicMediaFrameProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[34px] border border-[rgb(var(--gold-rgb)/0.16)] bg-[rgba(8,10,14,0.46)] p-3 shadow-[0_30px_90px_rgb(0_0_0/0.34)] backdrop-blur-xl sm:p-4 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(var(--gold-rgb)/0.06),transparent_24%,transparent_72%,rgb(var(--gold-rgb)/0.07))]" />
      <div className="relative overflow-hidden rounded-[28px] border border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--ink-rgb))]">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 46vw"
            className="object-cover"
            style={{ objectPosition }}
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,14,0.12)_0%,rgba(8,10,14,0.26)_42%,rgba(8,10,14,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgb(var(--gold-rgb)/0.12),transparent_18%),radial-gradient(circle_at_76%_10%,rgb(var(--gold-rgb)/0.08),transparent_20%)]" />

        <div className="absolute left-4 right-4 top-4 flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgba(8,10,14,0.44)] px-3 py-2 backdrop-blur-md">
            <Image src="/nexgravision-logo.png" alt="NexGravision" width={44} height={44} className="h-7 w-7 object-contain" />
            <span className="font-rajdhani text-[10px] uppercase tracking-[0.28em] text-cream/74">{badge}</span>
          </div>
          {eyebrow ? (
            <div className="rounded-full border border-[rgb(var(--gold-rgb)/0.18)] bg-[rgb(var(--surface-2-rgb)/0.58)] px-3 py-2 text-[9px] uppercase tracking-[0.28em] text-gold backdrop-blur-md">
              {eyebrow}
            </div>
          ) : null}
        </div>

        {(caption || metrics.length > 0) && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="rounded-[24px] border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgba(8,10,14,0.42)] p-4 backdrop-blur-md">
              {caption ? (
                <p className="font-rajdhani text-[10px] uppercase tracking-[0.34em] text-cream/55">{caption}</p>
              ) : null}

              {metrics.length > 0 ? (
                <div className={`mt-3 grid gap-2 ${metrics.length >= 3 ? "grid-cols-3" : "grid-cols-2"}`}>
                  {metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-[16px] border border-[rgb(var(--cream-rgb)/0.1)] bg-[rgb(var(--surface-2-rgb)/0.22)] px-3 py-3 text-center"
                    >
                      <div className="font-cinzel text-[17px] leading-none text-cream">{metric.value}</div>
                      <div className="mt-1 font-rajdhani text-[9px] uppercase tracking-[0.28em] text-cream/55">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
