import type { Metadata } from "next"
import ProjectsIndexClient from "./ProjectsIndexClient"
import { getProjectsData } from "./project-data"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const metadata: Metadata = {
  title: "Projects | SHUBIQ",
  description: "Strategic product builds across web platforms, AI systems, and scalable business software.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects | SHUBIQ",
    description: "Strategic product builds across web platforms, AI systems, and scalable business software.",
    url: `${siteUrl}/projects`,
  },
}

export default async function ProjectsPage() {
  const projects = await getProjectsData()
  return <ProjectsIndexClient projects={projects} />
}
