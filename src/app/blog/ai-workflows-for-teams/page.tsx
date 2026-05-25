import type { Metadata } from "next"
import BlogPostClient from "../BlogPostClient"
import { getBlogPostBySlug } from "../blogData"

export default function AiWorkflowsForTeamsPage() {
  const post = getBlogPostBySlug("ai-workflows-for-teams")
  if (!post) return null

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author ?? "Shubham",
    },
    publisher: {
      "@type": "Organization",
      name: "NexGravision",
      url: "https://NexGravision.com",
    },
    mainEntityOfPage: `https://NexGravision.com/blog/${post.slug}`,
  }

  return (
    <>
      <BlogPostClient post={post} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  )
}

export const metadata: Metadata = {
  title: "AI Workflows for Small Teams",
  description: "Practical AI workflows that remove manual drag and improve decision speed.",
}

