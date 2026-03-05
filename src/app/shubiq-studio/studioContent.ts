export type StudioPlan = {
  id: string
  tier: string
  tag: string
  bestFor: string
  price: number
  priceSuffix?: string
  meta: string
  features: string[]
  cta: string
  highlighted: boolean
  icon: "zap" | "trending" | "shield"
}

export type StudioContent = {
  pricingSectionLabel: string
  pricingHeadingPrefix: string
  pricingHeadingAccent: string
  pricingDescription: string
  pricingMicroLabel: string
  pricingFooterPrefix: string
  pricingFooterCta: string
  plans: StudioPlan[]
  contactSectionLabel: string
  contactHeadingPrefix: string
  contactHeadingAccent: string
  contactDescription: string
  contactSubmitText: string
  contactResponseNote: string
}

export const STUDIO_CONTENT_STORAGE_KEY = "shubiq_studio_content"

export const DEFAULT_STUDIO_CONTENT: StudioContent = {
  pricingSectionLabel: "Pricing",
  pricingHeadingPrefix: "PROJECT",
  pricingHeadingAccent: "INVESTMENT",
  pricingDescription:
    "Structured project investment tiers designed for measurable outcomes, faster delivery, and dependable execution quality.",
  pricingMicroLabel: "Structured Project Investment",
  pricingFooterPrefix: "Need a custom scope?",
  pricingFooterCta: "Request a custom quote.",
  plans: [
    {
      id: "basic",
      tier: "BASIC",
      tag: "BASIC",
      bestFor: "Best for first-phase businesses",
      price: 19999,
      meta: "One-time • Ready in 5-7 days",
      features: [
        "3 custom-designed pages",
        "Mobile-responsive layout",
        "Contact form",
        "Google Maps integration",
        "1 month free support",
      ],
      cta: "Get Started",
      highlighted: false,
      icon: "zap",
    },
    {
      id: "standard",
      tier: "STANDARD",
      tag: "STANDARD",
      bestFor: "Best for growing local businesses",
      price: 39999,
      meta: "One-time • Ready in 10-14 days",
      features: [
        "5 custom-designed pages",
        "Speed optimization",
        "Google Search Console setup",
        "WhatsApp chat button",
        "3 months free support",
      ],
      cta: "Get Started",
      highlighted: true,
      icon: "trending",
    },
    {
      id: "premium",
      tier: "PREMIUM",
      tag: "PREMIUM",
      bestFor: "Best for scale-focused businesses",
      price: 59999,
      priceSuffix: "+",
      meta: "One-time • Ready in 14-21 days",
      features: [
        "Fully custom design",
        "Google Analytics setup",
        "Performance optimization",
        "3D Animation",
        "6 months free support",
      ],
      cta: "Get Started",
      highlighted: false,
      icon: "shield",
    },
  ],
  contactSectionLabel: "Start a Project",
  contactHeadingPrefix: "Let's",
  contactHeadingAccent: "Build Together",
  contactDescription:
    "Tell us about your project. We'll review it and get back to you within 24 hours with a detailed plan and proposal.",
  contactSubmitText: "Send Project Brief",
  contactResponseNote: "No commitment required. We'll reply within 24 hours.",
}
