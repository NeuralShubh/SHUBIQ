export type HomeManagedContent = {
  heroTagline: string
  heroExploreCta: string
  heroHireCta: string
  aboutHeadingPrefix: string
  aboutHeadingAccent: string
  aboutParagraph1: string
  aboutParagraph2: string
  aboutParagraph3: string
  aboutFounderCta: string
  servicesLabel: string
  servicesHeadingPrefix: string
  servicesHeadingAccent: string
  servicesCards: HomeServiceCard[]
}

export type HomeServiceCard = {
  icon: string
  title: string
  desc: string
  tag: string
}

export type LabsManagedContent = {
  badgeLabel: string
  heroTitleLine1: string
  heroTitleLine2: string
  heroDescription: string
  primaryCta: string
  secondaryCta: string
}

export const DEFAULT_HOME_CONTENT: HomeManagedContent = {
  heroTagline: "Intelligence That Wins",
  heroExploreCta: "Explore Work",
  heroHireCta: "Hire Us",
  aboutHeadingPrefix: "About",
  aboutHeadingAccent: "SHUBIQ",
  aboutParagraph1:
    "SHUBIQ is a premium digital engineering brand crafting high-performance web platforms, productivity apps, and intelligent systems for ambitious founders and teams.",
  aboutParagraph2:
    "We deliver conversion-first websites and AI-integrated product systems built for clarity, speed, and long-term scale, not just a good launch.",
  aboutParagraph3:
    "The SHUBIQ system blends strategy, engineering, and premium design to turn ambitious ideas into durable platforms that earn trust and compound value.",
  aboutFounderCta: "Meet the Founder",
  servicesLabel: "Services",
  servicesHeadingPrefix: "Systems We",
  servicesHeadingAccent: "Engineer",
  servicesCards: [
    {
      icon: "code",
      title: "Web Development",
      desc: "High-performance, conversion-focused websites and web apps built with modern stacks. Fast, scalable, and engineered for clarity.",
      tag: "Core Service",
    },
    {
      icon: "layout",
      title: "Software Solutions",
      desc: "Custom web apps, dashboards, and internal tools engineered for stability, clarity, and long-term scale.",
      tag: "Agency",
    },
    {
      icon: "bot",
      title: "AI Integration",
      desc: "Embed intelligence into your products with AI systems that save time, reduce cost, and improve decision-making.",
      tag: "Intelligence",
    },
    {
      icon: "app",
      title: "App Building",
      desc: "From idea to launch, we build scalable mobile apps with clean architecture, polished UX, and production-grade performance.",
      tag: "Product",
    },
  ],
}

export const DEFAULT_LABS_CONTENT: LabsManagedContent = {
  badgeLabel: "SHUBIQ Labs Product Division",
  heroTitleLine1: "Systems For",
  heroTitleLine2: "Elite Execution",
  heroDescription:
    "SHUBIQ Labs builds precision products for people who treat performance as craft. Every app is engineered to remove noise, accelerate decisions, and compound execution quality over time.",
  primaryCta: "Explore Flow Beta",
  secondaryCta: "Join Early Access",
}

export function mergeHomeManagedContent(input: unknown): HomeManagedContent {
  const content = (input && typeof input === "object" ? input : {}) as Partial<HomeManagedContent>
  const mergedCards =
    Array.isArray(content.servicesCards) && content.servicesCards.length > 0
      ? content.servicesCards.map((card, index) => ({
          ...DEFAULT_HOME_CONTENT.servicesCards[index % DEFAULT_HOME_CONTENT.servicesCards.length],
          ...card,
        }))
      : DEFAULT_HOME_CONTENT.servicesCards
  return { ...DEFAULT_HOME_CONTENT, ...content, servicesCards: mergedCards }
}

export function mergeLabsManagedContent(input: unknown): LabsManagedContent {
  const content = (input && typeof input === "object" ? input : {}) as Partial<LabsManagedContent>
  return { ...DEFAULT_LABS_CONTENT, ...content }
}
