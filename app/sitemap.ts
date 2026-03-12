import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shubiq.com"
  const lastModified = new Date()

  return [
    { url: `${siteUrl}/`, lastModified },
    { url: `${siteUrl}/shubiq-studio`, lastModified },
    { url: `${siteUrl}/shubiq-labs`, lastModified },
    { url: `${siteUrl}/shubiq-labs/shubiq-flow`, lastModified },
  ]
}
