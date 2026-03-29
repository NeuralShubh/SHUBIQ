import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects as fallbackProjects } from "../../data-projects"
import { getProjectsData, getProjectBySlugDynamic } from "../project-data"
import ProjectPageClient from "./ProjectPageClient"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectBySlugDynamic(params.slug)
  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    }
  }

  return {
    title: `${project.title} | SHUBIQ Projects`,
    description: project.subtitle,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | SHUBIQ`,
      description: project.subtitle,
      url: `${siteUrl}/projects/${project.slug}`,
      images: project.videoPoster ? [project.videoPoster] : [],
    },
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const list = await getProjectsData()
  const project = list.find((item) => item.slug === params.slug)
  if (!project) return notFound()

  const source = list.length ? list : fallbackProjects
  const currentIndex = source.findIndex((item) => item.slug === project.slug)
  const prevProject = source[(currentIndex - 1 + source.length) % source.length]
  const nextProject = source[(currentIndex + 1) % source.length]

  return <ProjectPageClient project={project} prevProject={prevProject} nextProject={nextProject} />
}
