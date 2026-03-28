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
    id: "buildwithshubh",
    slug: "buildwithshubh",
    number: "01",
    title: "BuildWithShubh",
    subtitle: "A modern business platform built with Next.js, Tailwind CSS, and Supabase",
    description:
      "A modern business platform built with Next.js, Tailwind CSS, and Supabase, delivering fast, conversion-focused digital experiences for growing brands. The platform showcases precision engineering and premium web architecture designed for business growth.",
    category: "Agency",
    status: "Live",
    videoUrl: "",
    videoPoster: "",
    liveUrl: "https://buildwithshubh.vercel.app",
    githubUrl: "https://github.com/NeuralShubh/BuildWithShubh",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    impact: {
      headline: "Unified multiple digital systems into one cohesive brand infrastructure",
      description:
        "Replaced scattered web presence with a single high-performance platform that loads in under 2 seconds and converts visitors into clients.",
    },
    features: [
      "Conversion-focused landing system with optimized CTAs",
      "Supabase-powered backend for real-time data",
      "Mobile-first responsive design across all breakpoints",
      "SEO-optimized architecture with structured data",
      "Performance score 90+ on Lighthouse",
    ],
    year: "2025",
    duration: "4 weeks",
  },
  {
    id: "portfolio",
    slug: "portfolio",
    number: "02",
    title: "Portfolio",
    subtitle: "A personal portfolio showcasing selected work and technical capabilities",
    description:
      "A personal portfolio showcasing selected work, technical capabilities, and execution quality across web and AI initiatives. Built as a clean, minimal showcase with emphasis on work quality over visual noise.",
    category: "Studio",
    status: "Live",
    videoUrl: "",
    videoPoster: "",
    liveUrl: "https://neuralshubh.github.io/Portfolio/",
    githubUrl: "https://github.com/NeuralShubh/Portfolio",
    techStack: ["HTML", "CSS", "JavaScript"],
    impact: {
      headline: "Clean technical portfolio that communicates capability through work samples",
      description:
        "Designed as a focused showcase that prioritizes project work over personal branding, letting the engineering speak for itself.",
    },
    features: [
      "Minimal design with focus on project showcases",
      "Fast static hosting for instant load times",
      "Responsive layout for all screen sizes",
      "Clean code architecture for easy maintenance",
    ],
    year: "2024",
  },
  {
    id: "shubhledger",
    slug: "shubhledger",
    number: "03",
    title: "ShubhLedger",
    subtitle: "Web-based crypto portfolio tracker with real-time monitoring",
    description:
      "A web-based crypto portfolio tracker with real-time monitoring of holdings, investments, and portfolio value through a unified interactive dashboard. Built for personal use to track and analyze cryptocurrency positions across multiple exchanges.",
    category: "Crypto",
    status: "Live",
    videoUrl: "",
    videoPoster: "",
    liveUrl: "https://shubhledger.infinityfreeapp.com/",
    githubUrl: "https://github.com/NeuralShubh/ShubhLedger",
    techStack: ["JavaScript", "CSS", "GSAP", "APIs"],
    impact: {
      headline: "Continuous live market intelligence across digital assets",
      description:
        "Unified crypto tracking across multiple positions into a single dashboard with real-time price feeds and portfolio analytics.",
    },
    features: [
      "Real-time crypto price tracking via API integration",
      "Interactive portfolio dashboard with live calculations",
      "GSAP-powered animations for data visualization",
      "Multi-asset support across major cryptocurrencies",
      "Investment tracking with profit/loss calculations",
    ],
    year: "2025",
    duration: "3 weeks",
  },
  {
    id: "shubiq-flow",
    slug: "shubiq-flow",
    number: "04",
    title: "SHUBIQ Flow",
    subtitle: "Unified personal productivity system for tasks, habits, and focus",
    description:
      "A unified personal productivity system designed to run your day in one place: tasks, habits, focus blocks, health routines, study, and goals. Built as a premium dark-mode Android app engineered for execution and deep work.",
    category: "App",
    status: "Live",
    videoUrl: "",
    videoPoster: "",
    liveUrl: "https://shubiq.com/shubiq-labs/shubiq-flow",
    githubUrl: "https://github.com/NeuralShubh/SHUBIQ-Flow",
    techStack: ["React Native", "TypeScript", "Supabase", "Expo"],
    impact: {
      headline: "Unified daily productivity systems into one focused execution layer",
      description:
        "Consolidated tasks, habits, focus sessions, and health tracking into a single ritual-driven app that replaces 5+ separate tools.",
    },
    features: [
      "Task management with priority and categorization",
      "Habit tracking with streak analytics",
      "Focus timer with deep work session support",
      "Health routine integration",
      "XP and analytics system for progress tracking",
      "Premium dark-mode UI designed for minimal distraction",
    ],
    year: "2026",
    duration: "8 weeks",
  },
]

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getAllProjectSlugs(): string[] {
  return projects.map((project) => project.slug)
}
