import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects, getProjectBySlug } from "../../data-projects"
import ProjectPageClient from "../../../src/app/projects/[slug]/ProjectPageClient"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"

export const dynamic = "force-dynamic"

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug)
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

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex((item) => item.slug === project.slug)
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]
  const nextProject = projects[(currentIndex + 1) % projects.length]

  return <ProjectPageClient project={project} prevProject={prevProject} nextProject={nextProject} />
}

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}
