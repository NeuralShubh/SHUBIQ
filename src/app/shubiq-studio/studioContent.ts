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
      tag: "WEB BASIC",
      bestFor: "Best for focused launch websites",
      price: 29999,
      meta: "One-time • Ready in 10-14 days",
      features: [
        "Conversion-first UX structure",
        "5 premium custom sections",
        "Responsive performance build",
        "Lead capture and CTA wiring",
        "Launch support + QA pass",
      ],
      cta: "Get Started",
      highlighted: false,
      icon: "zap",
    },
    {
      id: "standard",
      tier: "STANDARD",
      tag: "WEB STANDARD",
      bestFor: "Best for scaling brand websites",
      price: 59999,
      meta: "One-time • Ready in 3-5 weeks",
      features: [
        "Multi-page content architecture",
        "CMS-ready dynamic sections",
        "Advanced SEO + analytics setup",
        "Speed optimization and audits",
        "Growth sprint support",
      ],
      cta: "Get Started",
      highlighted: true,
      icon: "trending",
    },
    {
      id: "premium",
      tier: "PREMIUM",
      tag: "WEB PREMIUM",
      bestFor: "Best for flagship web platforms",
      price: 89999,
      priceSuffix: "+",
      meta: "One-time • Ready in 6-9 weeks",
      features: [
        "Custom system design direction",
        "Complex interaction architecture",
        "API integrations and workflows",
        "Premium motion and storytelling",
        "Launch, scale, and priority support",
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
