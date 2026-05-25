import type { Metadata } from "next"
import BlogIndexClient from "./BlogIndexClient"

export const metadata: Metadata = {
  title: "Blog",
  description: "NexGravision Field Notes on productivity systems, focus rituals, and AI-enabled execution.",
}

export default function BlogIndexPage() {
  return <BlogIndexClient />
}

