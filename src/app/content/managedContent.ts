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
  return { ...DEFAULT_HOME_CONTENT, ...content }
}

export function mergeLabsManagedContent(input: unknown): LabsManagedContent {
  const content = (input && typeof input === "object" ? input : {}) as Partial<LabsManagedContent>
  return { ...DEFAULT_LABS_CONTENT, ...content }
}
