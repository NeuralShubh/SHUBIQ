import type { Metadata } from "next"
import BlogPostPage from "../../../src/app/blog/[slug]/page"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Blog | ${slug.replace(/-/g, " ")}`,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }
}

export default function Page(props: Props) {
  return <BlogPostPage {...props} />
}
