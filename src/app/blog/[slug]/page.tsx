import type { Metadata } from "next"
import BlogPostPageClient from "./BlogPostPageClient"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Blog | ${slug.replace(/-/g, " ")}`,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  return <BlogPostPageClient slug={slug} />
}

