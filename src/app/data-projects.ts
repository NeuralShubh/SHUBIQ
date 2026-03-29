export interface Project {
  id: string
  slug: string
  number: string
  title: string
  subtitle: string
  description: string
  category: string
  status: string
  videoUrl: string
  videoPoster: string
  liveUrl?: string
  githubUrl?: string
  techStack: string[]
  impact: {
    headline: string
    description: string
  }
  features: string[]
  year: string
  duration?: string
}

export const projects: Project[] = [
  {
    id: "pragati-finance",
    slug: "pragati-finance",
    number: "01",
    title: "Pragati Finance",
    subtitle: "A complete loan management system for microfinance and small-loan operations.",
    description:
      "Pragati Finance is a complete loan management system built for real-world microfinance and small-loan operations. It lets you create branches, centres, staff, and members, disburse loans, generate and track EMIs, record collections, and monitor recovery performance in real time. The dashboard provides key business metrics, while reports allow filtering and Excel export for audits and finance reviews. With role-based access, approval workflows for sensitive actions, and structured IDs for branches, centres, and members, it keeps operations organized, transparent, and scalable for day-to-day lending work.",
    category: "Finance",
    status: "Live",
    videoUrl: "https://drive.google.com/file/d/16F-AncQEXnmnUhgT4Z-Aw-n3SNnIudUY/preview",
    videoPoster: "",
    liveUrl: "",
    githubUrl: "",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Nginx",
      "PM2",
      "Ubuntu VPS",
      "Hostinger",
    ],
    impact: {
      headline: "Streamlined real-world lending operations with full EMI tracking and recovery visibility",
      description:
        "Centralized loan lifecycle management across branches, staff, and members with real-time recovery metrics and audit-ready reporting.",
    },
    features: [
      "Branch, centre, staff, and member management",
      "Loan disbursement with EMI schedules",
      "Collection tracking and recovery analytics",
      "Approval workflows and role-based access",
      "Reports with filters and Excel export",
    ],
    year: "2026",
    duration: "6 weeks",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug)
}
