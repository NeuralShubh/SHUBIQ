import { createClient } from "@/lib/supabase/server"
import type { Project } from "../data-projects"
import { projects as fallbackProjects } from "../data-projects"

type AdminProjectRow = {
  id?: string
  name?: string
  tag?: string
  desc?: string
  tech?: string[] | string | null
  link?: string | null
  live?: string | null
  status?: string | null
  order_index?: number | null
  video_url?: string | null
  video_poster?: string | null
}

const SUPABASE_ENABLED =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("your-project.supabase.co")

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")

const normalizeTech = (value: AdminProjectRow["tech"]) => {
  if (Array.isArray(value)) return value
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  }
  return []
}

const mapAdminProject = (row: AdminProjectRow, index: number): Project => {
  const rawTag = typeof row.tag === "string" ? row.tag : ""
  const [categoryRaw, statusRaw] = rawTag.split("|").map((part: string) => part.trim())
  const slug = slugify(row.name ?? row.id ?? `project-${index + 1}`)
  const fallback = fallbackProjects.find((project) => project.slug === slug)
  const tech = normalizeTech(row.tech)

  return {
    id: row.id ?? fallback?.id ?? `project-${index + 1}`,
    slug,
    number: fallback?.number ?? String(index + 1).padStart(2, "0"),
    title: row.name ?? fallback?.title ?? "Project",
    subtitle: row.desc ?? fallback?.subtitle ?? "",
    description: fallback?.description ?? row.desc ?? "",
    category: categoryRaw || fallback?.category || "Project",
    status: statusRaw || row.status || fallback?.status || "Live",
    videoUrl: row.video_url ?? fallback?.videoUrl ?? "",
    videoPoster: row.video_poster ?? fallback?.videoPoster ?? "",
    liveUrl: row.live ?? fallback?.liveUrl,
    githubUrl: row.link ?? fallback?.githubUrl,
    techStack: tech.length ? tech : fallback?.techStack ?? [],
    impact: fallback?.impact ?? {
      headline: "Operational clarity for real-world execution",
      description: "Built to keep teams aligned, metrics visible, and day-to-day delivery predictable.",
    },
    features: fallback?.features ?? [],
    year: fallback?.year ?? "2026",
    duration: fallback?.duration,
  }
}

export async function getProjectsData(): Promise<Project[]> {
  if (!SUPABASE_ENABLED) return fallbackProjects

  try {
    const supabase = await createClient()
    const { data, error } = await supabase.from("projects_admin").select("*").order("order_index")
    if (error || !data?.length) return fallbackProjects
    return data.map((row: AdminProjectRow, index: number) => mapAdminProject(row, index))
  } catch {
    return fallbackProjects
  }
}

export async function getProjectBySlugDynamic(slug: string): Promise<Project | undefined> {
  const list = await getProjectsData()
  return list.find((project) => project.slug === slug)
}
