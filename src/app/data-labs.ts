export interface LabProduct {
  id: string
  name: string
  subtitle: string
  status: "Live Beta" | "Planned" | "In Dev" | "Concept"
  category: string
  desc: string
  highlights: string[]
  cta: string
  href: string
  disabled?: boolean
}

export const LAB_PRODUCTS: LabProduct[] = [
  {
    id: "shubiq-flow",
    name: "SHUBIQ Flow",
    subtitle: "Tasks, Habits & Focus",
    status: "Live Beta",
    category: "Mobile App",
    desc: "A premium productivity system that fuses tasks, habits, and deep focus into one ritual-driven workflow.",
    highlights: ["Tasks + Habits + Focus", "XP + Analytics", "Dark premium UX"],
    cta: "Explore Product",
    href: "/shubiq-labs/shubiq-flow",
  },
  {
    id: "future-suite",
    name: "SHUBIQ Pulse",
    subtitle: "Performance OS (Coming Soon)",
    status: "Planned",
    category: "System",
    desc: "Unified personal performance stack for planning, execution, and retrospectives across your life systems.",
    highlights: ["Life OS", "Deep Analytics", "Automation"],
    cta: "Planned",
    href: "#",
    disabled: true,
  },
  {
    id: "future-web",
    name: "SHUBIQ Atlas",
    subtitle: "Knowledge System (Coming Soon)",
    status: "In Dev",
    category: "Web App",
    desc: "A knowledge and research workspace designed to connect ideas into actionable outcomes.",
    highlights: ["Research Vault", "Linked Notes", "AI Layer"],
    cta: "Planned",
    href: "#",
    disabled: true,
  },
]
