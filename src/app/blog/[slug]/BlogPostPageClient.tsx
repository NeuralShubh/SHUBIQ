"use client"

import { useEffect, useState } from "react"
import BlogPostClient from "../BlogPostClient"
import { getBlogPostBySlug, getBlogPosts, normalizeBlogPost, type BlogPost } from "../blogData"

export default function BlogPostPageClient({ slug }: { slug: string }) {
  const [post, setPost] = useState<BlogPost | null>(() => getBlogPostBySlug(slug) ?? null)
  const [allPosts, setAllPosts] = useState<BlogPost[]>(() => getBlogPosts())
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function loadPost() {
      try {
        const [postRes, listRes] = await Promise.all([
          fetch(`/api/blog-posts?slug=${encodeURIComponent(slug)}`, { cache: "no-store" }),
          fetch("/api/blog-posts", { cache: "no-store" }),
        ])

        if (!cancelled && listRes.ok) {
          const listJson = await listRes.json()
          const remoteList = Array.isArray(listJson?.items)
            ? listJson.items.map(normalizeBlogPost).filter((item: BlogPost | null): item is BlogPost => !!item)
            : []
          if (remoteList.length > 0) setAllPosts(remoteList)
        }

        if (!cancelled && postRes.ok) {
          const postJson = await postRes.json()
          const normalized = normalizeBlogPost(postJson?.item)
          if (normalized) setPost(normalized)
        }
      } catch {
        // Keep static fallback.
      } finally {
        if (!cancelled) setResolved(true)
      }
    }

    loadPost()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!post && resolved) {
    return (
      <main className="section-rhythm min-h-screen bg-[rgb(var(--ink-rgb))] text-cream px-6 py-28">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-cinzel text-3xl text-cream mb-3">Post Not Found</h1>
          <p className="text-cream/70">The blog post you requested does not exist.</p>
        </div>
      </main>
    )
  }
  if (!post) return null
  return <BlogPostClient post={post} allPosts={allPosts} />
}
