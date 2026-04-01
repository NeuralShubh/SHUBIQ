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
      bestFor: "Best for conversion-first business websites",
      price: 79999,
      meta: "One-time • Ready in 2-3 weeks",
      features: [
        "Brand-led website direction",
        "Up to 6 strategic conversion sections",
        "Responsive build with speed baseline",
        "Lead form and WhatsApp inquiry flow",
        "Launch QA + 30-day stability support",
      ],
      cta: "Get Started",
      highlighted: false,
      icon: "zap",
    },
    {
      id: "standard",
      tier: "STANDARD",
      tag: "WEB STANDARD",
      bestFor: "Best for growth-stage companies scaling online",
      price: 179999,
      meta: "One-time • Ready in 4-6 weeks",
      features: [
        "Custom UI system and page architecture",
        "CMS-ready dynamic content modules",
        "Advanced SEO foundation + analytics events",
        "CRM and automation form integration",
        "Post-launch optimization sprint",
      ],
      cta: "Get Started",
      highlighted: true,
      icon: "trending",
    },
    {
      id: "premium",
      tier: "PREMIUM",
      tag: "WEB PREMIUM",
      bestFor: "Best for flagship digital platforms",
      price: 349999,
      priceSuffix: "+",
      meta: "One-time • Ready in 7-10 weeks",
      features: [
        "Experience-led design and narrative system",
        "Advanced interactions and motion direction",
        "API integrations and secured workflows",
        "Performance engineering and technical SEO",
        "Priority support and growth roadmap",
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
