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
    videoPoster: "https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Thumbnails%20for%20Projects/Pragati%20Finance%20Banner.png",
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
  {
    id: "bramha-urban-performance",
    slug: "bramha-urban-performance",
    number: "02",
    title: "Bramha Urban Multistate",
    subtitle: "A performance portal for staff to log daily business, track targets, and view rankings in one place.",
    description:
      "This internal performance portal enables bank staff to log daily business entries, auto-calculate points based on FD tenure and Gold Loan processing rules, and track monthly targets in real time. Managers and admins get branch, segment, and employee visibility, while leaderboards show rank across FD, Gold, and Savings. Targets are assigned monthly, achievements update instantly, and reports export cleanly for audits. Role-based access ensures employees edit only their own entries, managers follow employee-level access, and admins retain full control.",
    category: "Finance",
    status: "Live",
    videoUrl: "https://drive.google.com/file/d/1aePwahvxamgn1VD6aGdbqwHboGYaJmE-/preview",
    videoPoster: "https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Thumbnails%20for%20Projects/bramha%20banner.png",
    liveUrl: "https://os.shubiq.com",
    githubUrl: "",
    techStack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Chart.js",
      "Lucide Icons",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "PM2",
      "Nginx",
      "Ubuntu VPS",
      "Let's Encrypt",
    ],
    impact: {
      headline: "Unified daily performance tracking with live targets and rankings",
      description:
        "Centralized staff performance tracking across branches and segments with automated scoring, real-time leaderboards, and exportable analytics.",
    },
    features: [
      "Daily FD / Gold Loan / Saving entry with auto points",
      "Monthly targets by segment with instant achievement view",
      "Leaderboards with segment filters and rank visibility",
      "Admin management for branches, employees, and bulk targets",
      "Exportable reports with date and segment filters",
    ],
    year: "2026",
    duration: "5 weeks",
  },
  {
    id: "shubiq-os",
    slug: "shubiq-os",
    number: "03",
    title: "SHUBIQ OS",
    subtitle: "A business operating system for founders, agencies, and small teams.",
    description:
      "SHUBIQ OS is a business operating system for founders, agencies, and small teams. It replaces scattered spreadsheets, invoicing tools, and project trackers with one clean command center. It manages clients, projects, invoices, income, and expenses while providing business analytics across Studio and Labs. Document workflows handle quotations, proposals, and invoices with auto numbering and PDF export, while revenue and expense modules show real-time cashflow, profitability, and subscription trends. Admin settings manage business profile details, tax, currency, and banking configuration for invoicing.",
    category: "Business",
    status: "Live",
    videoUrl: "https://drive.google.com/file/d/12XOuH7tOKqSKkYrZNqdcMjbuyh5j649a/preview",
    videoPoster: "https://cglzadzphyxgiqwwuwle.supabase.co/storage/v1/object/public/Thumbnails%20for%20Projects/SHUBIQ%20OS.png",
    liveUrl: "",
    githubUrl: "",
    techStack: [
      "HTML",
      "CSS",
      "JavaScript",
      "Chart.js",
      "Node.js",
      "Express",
      "SQLite",
      "PM2",
      "Nginx",
      "Helmet",
      "CORS",
      "Let's Encrypt",
    ],
    impact: {
      headline: "Unified client, project, and finance workflows into one operational command center",
      description:
        "Replaced fragmented tools with a single system for tracking delivery, revenue, expenses, and subscriptions in real time.",
    },
    features: [
      "Client profiles with relationship status tracking",
      "Project pipeline with budgets and balances",
      "Invoices, quotations, and proposals with PDF export",
      "Income and expense tracking with monthly trends",
      "Product and subscription revenue analytics",
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
