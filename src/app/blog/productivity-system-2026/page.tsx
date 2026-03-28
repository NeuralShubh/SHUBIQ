import type { Metadata } from "next"
import BlogPostClient from "../BlogPostClient"
import { getBlogPostBySlug } from "../blogData"

export default function ProductivitySystem2026Page() {
  const post = getBlogPostBySlug("productivity-system-2026")
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
      name: "SHUBIQ",
      url: "https://shubiq.com",
    },
    mainEntityOfPage: `https://shubiq.com/blog/${post.slug}`,
  }

  return (
    <>
      <BlogPostClient post={post} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
    </>
  )
}

export const metadata: Metadata = {
  title: "How to Build a Productivity System in 2026",
  description:
    "A practical, no-fluff system for tasks, habits, and focus that scales with your life and team.",
}
