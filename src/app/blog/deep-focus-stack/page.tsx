import type { Metadata } from "next"
import BlogPostClient from "../BlogPostClient"
import { getBlogPostBySlug } from "../blogData"

export default function DeepFocusStackPage() {
  const post = getBlogPostBySlug("deep-focus-stack")
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
  title: "The Deep Focus Stack: Rituals That Actually Work",
  description: "A lightweight focus ritual used inside SHUBIQ to ship faster without sacrificing quality.",
}
