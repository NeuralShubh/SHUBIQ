import type { MetadataRoute } from "next"
import { projects } from "../src/app/data-projects"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"
  const lastModified = new Date()

  return [
    { url: `${siteUrl}/`, lastModified },
    { url: `${siteUrl}/projects`, lastModified },
    ...projects.map((project) => ({ url: `${siteUrl}/projects/${project.slug}`, lastModified })),
    { url: `${siteUrl}/shubiq-studio`, lastModified },
    { url: `${siteUrl}/shubiq-labs`, lastModified },
    { url: `${siteUrl}/shubiq-labs/shubiq-flow`, lastModified },
    { url: `${siteUrl}/founder`, lastModified },
    { url: `${siteUrl}/blog`, lastModified },
    { url: `${siteUrl}/blog/productivity-system-2026`, lastModified },
    { url: `${siteUrl}/blog/deep-focus-stack`, lastModified },
    { url: `${siteUrl}/blog/ai-workflows-for-teams`, lastModified },
    { url: `${siteUrl}/services/web-development`, lastModified },
    { url: `${siteUrl}/services/software-solutions`, lastModified },
    { url: `${siteUrl}/services/ai-integration`, lastModified },
    { url: `${siteUrl}/services/app-building`, lastModified },
  ]
}
