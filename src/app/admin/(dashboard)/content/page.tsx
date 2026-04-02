"use client"

import { useEffect, useMemo, useState } from "react"
import { AdminButton, AdminCard, AdminInput, AdminTextarea } from "@/components/admin/AdminUI"
import { DEFAULT_STUDIO_CONTENT, type StudioContent } from "@/app/shubiq-studio/studioContent"
import {
  DEFAULT_HOME_CONTENT,
  DEFAULT_LABS_CONTENT,
  mergeHomeManagedContent,
  mergeLabsManagedContent,
  type HomeManagedContent,
  type LabsManagedContent,
} from "@/app/content/managedContent"
import { toast } from "sonner"
import { FileEdit, Plus, RefreshCw, Save, Trash2 } from "lucide-react"

type BlogItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  readingTime: number
}

function mergeStudioContent(input: unknown): StudioContent {
  const content = (input && typeof input === "object" ? input : {}) as Partial<StudioContent>
  return {
    ...DEFAULT_STUDIO_CONTENT,
    ...content,
    plans: Array.isArray(content.plans) && content.plans.length > 0 ? content.plans : DEFAULT_STUDIO_CONTENT.plans,
  }
}

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export default function ContentControlPage() {
  const [activeTab, setActiveTab] = useState<"studio" | "home" | "labs" | "blog">("studio")
  const [loadingStudio, setLoadingStudio] = useState(true)
  const [savingStudio, setSavingStudio] = useState(false)
  const [studioContent, setStudioContent] = useState<StudioContent>(DEFAULT_STUDIO_CONTENT)
  const [loadingHome, setLoadingHome] = useState(true)
  const [savingHome, setSavingHome] = useState(false)
  const [homeContent, setHomeContent] = useState<HomeManagedContent>(DEFAULT_HOME_CONTENT)
  const [loadingLabs, setLoadingLabs] = useState(true)
  const [savingLabs, setSavingLabs] = useState(false)
  const [labsContent, setLabsContent] = useState<LabsManagedContent>(DEFAULT_LABS_CONTENT)

  const [blogLoading, setBlogLoading] = useState(true)
  const [blogItems, setBlogItems] = useState<BlogItem[]>([])
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null)
  const [creatingBlog, setCreatingBlog] = useState(false)
  const [blogForm, setBlogForm] = useState<Omit<BlogItem, "id">>({
    slug: "",
    title: "",
    excerpt: "",
    category: "Productivity",
    date: new Date().toISOString().slice(0, 10),
    author: "Shubham",
    readingTime: 5,
  })

  const studioLastUpdatedText = useMemo(() => {
    return savingStudio ? "Saving..." : "Studio content controls pricing + CTA copy on /shubiq-studio"
  }, [savingStudio])

  async function loadStudioContent() {
    setLoadingStudio(true)
    try {
      const res = await fetch("/api/admin/content?key=studio_content", { cache: "no-store" })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to load studio content")
      setStudioContent(mergeStudioContent(json.content))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load studio content")
      setStudioContent(DEFAULT_STUDIO_CONTENT)
    } finally {
      setLoadingStudio(false)
    }
  }

  async function saveStudioContent() {
    setSavingStudio(true)
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "studio_content", content: studioContent }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Save failed")
      toast.success("Studio content saved")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save studio content")
    } finally {
      setSavingStudio(false)
    }
  }

  async function loadHomeContent() {
    setLoadingHome(true)
    try {
      const res = await fetch("/api/admin/content?key=home_content", { cache: "no-store" })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to load home content")
      setHomeContent(mergeHomeManagedContent(json.content))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load home content")
      setHomeContent(DEFAULT_HOME_CONTENT)
    } finally {
      setLoadingHome(false)
    }
  }

  async function saveHomeContent() {
    setSavingHome(true)
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "home_content", content: homeContent }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Save failed")
      toast.success("Home content saved")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save home content")
    } finally {
      setSavingHome(false)
    }
  }

  async function loadLabsContent() {
    setLoadingLabs(true)
    try {
      const res = await fetch("/api/admin/content?key=labs_content", { cache: "no-store" })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to load labs content")
      setLabsContent(mergeLabsManagedContent(json.content))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load labs content")
      setLabsContent(DEFAULT_LABS_CONTENT)
    } finally {
      setLoadingLabs(false)
    }
  }

  async function saveLabsContent() {
    setSavingLabs(true)
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "labs_content", content: labsContent }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Save failed")
      toast.success("Labs content saved")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save labs content")
    } finally {
      setSavingLabs(false)
    }
  }

  async function loadBlogItems() {
    setBlogLoading(true)
    try {
      const res = await fetch("/api/admin/blog-posts", { cache: "no-store" })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to load blog posts")
      setBlogItems(Array.isArray(json.items) ? json.items : [])
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to load blog posts")
    } finally {
      setBlogLoading(false)
    }
  }

  async function createBlogPost() {
    if (!blogForm.title.trim()) return toast.error("Title is required")
    const payload = { ...blogForm, slug: blogForm.slug.trim() || slugify(blogForm.title) }
    try {
      const res = await fetch("/api/admin/blog-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, content: [] }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Create failed")
      toast.success("Blog post created")
      setCreatingBlog(false)
      setBlogForm({
        slug: "",
        title: "",
        excerpt: "",
        category: "Productivity",
        date: new Date().toISOString().slice(0, 10),
        author: "Shubham",
        readingTime: 5,
      })
      await loadBlogItems()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Create failed")
    }
  }

  async function updateBlogPost() {
    if (!editingBlog) return
    try {
      const res = await fetch("/api/admin/blog-posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editingBlog, content: [] }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Update failed")
      toast.success("Blog post updated")
      setEditingBlog(null)
      await loadBlogItems()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed")
    }
  }

  async function deleteBlogPost(id: string) {
    if (!confirm("Delete this blog post?")) return
    try {
      const res = await fetch(`/api/admin/blog-posts?id=${encodeURIComponent(id)}`, { method: "DELETE" })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Delete failed")
      toast.success("Blog post deleted")
      await loadBlogItems()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Delete failed")
    }
  }

  useEffect(() => {
    loadStudioContent()
    loadHomeContent()
    loadLabsContent()
    loadBlogItems()
  }, [])

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel tracking-wide">Content Control</h1>
          <p className="text-[14px] text-cream/70 mt-1 font-medium">Manage Home, Studio, Labs copy and blog publishing from one panel.</p>
        </div>
        <div className="flex items-center gap-2">
          <AdminButton variant={activeTab === "studio" ? "primary" : "secondary"} onClick={() => setActiveTab("studio")}>
            Studio
          </AdminButton>
          <AdminButton variant={activeTab === "home" ? "primary" : "secondary"} onClick={() => setActiveTab("home")}>
            Home
          </AdminButton>
          <AdminButton variant={activeTab === "labs" ? "primary" : "secondary"} onClick={() => setActiveTab("labs")}>
            Labs
          </AdminButton>
          <AdminButton variant={activeTab === "blog" ? "primary" : "secondary"} onClick={() => setActiveTab("blog")}>
            Blog
          </AdminButton>
        </div>
      </div>

      {activeTab === "studio" && (
        <AdminCard className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-cream flex items-center gap-2">
                <FileEdit size={16} className="text-gold" />
                Studio Content
              </h2>
              <p className="text-xs text-cream/50 mt-1">{studioLastUpdatedText}</p>
            </div>
            <div className="flex gap-2">
              <AdminButton variant="secondary" onClick={loadStudioContent} disabled={loadingStudio}>
                <RefreshCw size={14} />
                Reload
              </AdminButton>
              <AdminButton onClick={saveStudioContent} disabled={loadingStudio || savingStudio}>
                <Save size={14} />
                Save
              </AdminButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AdminInput
              label="Pricing Label"
              value={studioContent.pricingSectionLabel}
              onChange={(e) => setStudioContent((p) => ({ ...p, pricingSectionLabel: e.target.value }))}
            />
            <AdminInput
              label="Pricing Heading Prefix"
              value={studioContent.pricingHeadingPrefix}
              onChange={(e) => setStudioContent((p) => ({ ...p, pricingHeadingPrefix: e.target.value }))}
            />
            <AdminInput
              label="Pricing Heading Accent"
              value={studioContent.pricingHeadingAccent}
              onChange={(e) => setStudioContent((p) => ({ ...p, pricingHeadingAccent: e.target.value }))}
            />
            <AdminInput
              label="Pricing Micro Label"
              value={studioContent.pricingMicroLabel}
              onChange={(e) => setStudioContent((p) => ({ ...p, pricingMicroLabel: e.target.value }))}
            />
            <div className="lg:col-span-2">
              <AdminTextarea
                label="Pricing Description"
                rows={3}
                value={studioContent.pricingDescription}
                onChange={(e) => setStudioContent((p) => ({ ...p, pricingDescription: e.target.value }))}
              />
            </div>
            <AdminInput
              label="Contact Label"
              value={studioContent.contactSectionLabel}
              onChange={(e) => setStudioContent((p) => ({ ...p, contactSectionLabel: e.target.value }))}
            />
            <AdminInput
              label="Contact Heading Prefix"
              value={studioContent.contactHeadingPrefix}
              onChange={(e) => setStudioContent((p) => ({ ...p, contactHeadingPrefix: e.target.value }))}
            />
            <AdminInput
              label="Contact Heading Accent"
              value={studioContent.contactHeadingAccent}
              onChange={(e) => setStudioContent((p) => ({ ...p, contactHeadingAccent: e.target.value }))}
            />
            <AdminInput
              label="Contact Button Text"
              value={studioContent.contactSubmitText}
              onChange={(e) => setStudioContent((p) => ({ ...p, contactSubmitText: e.target.value }))}
            />
            <div className="lg:col-span-2">
              <AdminTextarea
                label="Contact Description"
                rows={3}
                value={studioContent.contactDescription}
                onChange={(e) => setStudioContent((p) => ({ ...p, contactDescription: e.target.value }))}
              />
            </div>
          </div>
        </AdminCard>
      )}

      {activeTab === "home" && (
        <AdminCard className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-cream flex items-center gap-2">
                <FileEdit size={16} className="text-gold" />
                Home Hero Content
              </h2>
              <p className="text-xs text-cream/50 mt-1">Controls tagline and CTA text on the home hero section.</p>
            </div>
            <div className="flex gap-2">
              <AdminButton variant="secondary" onClick={loadHomeContent} disabled={loadingHome}>
                <RefreshCw size={14} />
                Reload
              </AdminButton>
              <AdminButton onClick={saveHomeContent} disabled={loadingHome || savingHome}>
                <Save size={14} />
                Save
              </AdminButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AdminInput
              label="Hero Tagline"
              value={homeContent.heroTagline}
              onChange={(e) => setHomeContent((p) => ({ ...p, heroTagline: e.target.value }))}
            />
            <AdminInput
              label="Explore CTA"
              value={homeContent.heroExploreCta}
              onChange={(e) => setHomeContent((p) => ({ ...p, heroExploreCta: e.target.value }))}
            />
            <AdminInput
              label="Hire CTA"
              value={homeContent.heroHireCta}
              onChange={(e) => setHomeContent((p) => ({ ...p, heroHireCta: e.target.value }))}
            />
            <AdminInput
              label="About Heading Prefix"
              value={homeContent.aboutHeadingPrefix}
              onChange={(e) => setHomeContent((p) => ({ ...p, aboutHeadingPrefix: e.target.value }))}
            />
            <AdminInput
              label="About Heading Accent"
              value={homeContent.aboutHeadingAccent}
              onChange={(e) => setHomeContent((p) => ({ ...p, aboutHeadingAccent: e.target.value }))}
            />
            <div className="lg:col-span-2">
              <AdminTextarea
                label="About Paragraph 1"
                rows={3}
                value={homeContent.aboutParagraph1}
                onChange={(e) => setHomeContent((p) => ({ ...p, aboutParagraph1: e.target.value }))}
              />
            </div>
            <div className="lg:col-span-2">
              <AdminTextarea
                label="About Paragraph 2"
                rows={3}
                value={homeContent.aboutParagraph2}
                onChange={(e) => setHomeContent((p) => ({ ...p, aboutParagraph2: e.target.value }))}
              />
            </div>
            <div className="lg:col-span-2">
              <AdminTextarea
                label="About Paragraph 3"
                rows={3}
                value={homeContent.aboutParagraph3}
                onChange={(e) => setHomeContent((p) => ({ ...p, aboutParagraph3: e.target.value }))}
              />
            </div>
            <AdminInput
              label="About Founder CTA"
              value={homeContent.aboutFounderCta}
              onChange={(e) => setHomeContent((p) => ({ ...p, aboutFounderCta: e.target.value }))}
            />
          </div>
        </AdminCard>
      )}

      {activeTab === "labs" && (
        <AdminCard className="space-y-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-cream flex items-center gap-2">
                <FileEdit size={16} className="text-gold" />
                Labs Hero Content
              </h2>
              <p className="text-xs text-cream/50 mt-1">Controls the hero badge, heading, description, and CTA text on /shubiq-labs.</p>
            </div>
            <div className="flex gap-2">
              <AdminButton variant="secondary" onClick={loadLabsContent} disabled={loadingLabs}>
                <RefreshCw size={14} />
                Reload
              </AdminButton>
              <AdminButton onClick={saveLabsContent} disabled={loadingLabs || savingLabs}>
                <Save size={14} />
                Save
              </AdminButton>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AdminInput
              label="Badge Label"
              value={labsContent.badgeLabel}
              onChange={(e) => setLabsContent((p) => ({ ...p, badgeLabel: e.target.value }))}
            />
            <AdminInput
              label="Hero Title Line 1"
              value={labsContent.heroTitleLine1}
              onChange={(e) => setLabsContent((p) => ({ ...p, heroTitleLine1: e.target.value }))}
            />
            <AdminInput
              label="Hero Title Line 2"
              value={labsContent.heroTitleLine2}
              onChange={(e) => setLabsContent((p) => ({ ...p, heroTitleLine2: e.target.value }))}
            />
            <AdminInput
              label="Primary CTA"
              value={labsContent.primaryCta}
              onChange={(e) => setLabsContent((p) => ({ ...p, primaryCta: e.target.value }))}
            />
            <AdminInput
              label="Secondary CTA"
              value={labsContent.secondaryCta}
              onChange={(e) => setLabsContent((p) => ({ ...p, secondaryCta: e.target.value }))}
            />
            <div className="lg:col-span-2">
              <AdminTextarea
                label="Hero Description"
                rows={4}
                value={labsContent.heroDescription}
                onChange={(e) => setLabsContent((p) => ({ ...p, heroDescription: e.target.value }))}
              />
            </div>
          </div>
        </AdminCard>
      )}

      {activeTab === "blog" && (
        <div className="space-y-5">
          <AdminCard className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-cream">Blog Manager</h2>
              <AdminButton variant={creatingBlog ? "secondary" : "primary"} onClick={() => setCreatingBlog((v) => !v)}>
                <Plus size={14} />
                {creatingBlog ? "Close" : "New Post"}
              </AdminButton>
            </div>

            {creatingBlog && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-[rgb(var(--cream-rgb)/0.12)] rounded-xl p-4">
                <AdminInput label="Title" value={blogForm.title} onChange={(e) => setBlogForm((p) => ({ ...p, title: e.target.value }))} />
                <AdminInput label="Slug" value={blogForm.slug} onChange={(e) => setBlogForm((p) => ({ ...p, slug: e.target.value }))} />
                <AdminInput label="Category" value={blogForm.category} onChange={(e) => setBlogForm((p) => ({ ...p, category: e.target.value }))} />
                <AdminInput label="Date" value={blogForm.date} onChange={(e) => setBlogForm((p) => ({ ...p, date: e.target.value }))} />
                <AdminInput label="Author" value={blogForm.author} onChange={(e) => setBlogForm((p) => ({ ...p, author: e.target.value }))} />
                <AdminInput
                  label="Reading Time (min)"
                  type="number"
                  value={blogForm.readingTime}
                  onChange={(e) => setBlogForm((p) => ({ ...p, readingTime: Number(e.target.value || 0) }))}
                />
                <div className="lg:col-span-2">
                  <AdminTextarea label="Excerpt" rows={3} value={blogForm.excerpt} onChange={(e) => setBlogForm((p) => ({ ...p, excerpt: e.target.value }))} />
                </div>
                <div className="lg:col-span-2 flex justify-end">
                  <AdminButton onClick={createBlogPost}>
                    <Save size={14} />
                    Create Post
                  </AdminButton>
                </div>
              </div>
            )}
          </AdminCard>

          <AdminCard>
            {blogLoading ? (
              <p className="text-cream/60 text-sm">Loading blog posts...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-cream/50 border-b border-[rgb(var(--cream-rgb)/0.12)]">
                      <th className="py-3 pr-3">Title</th>
                      <th className="py-3 pr-3">Slug</th>
                      <th className="py-3 pr-3">Category</th>
                      <th className="py-3 pr-3">Date</th>
                      <th className="py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogItems.map((item) => (
                      <tr key={item.id} className="border-b border-[rgb(var(--cream-rgb)/0.08)]">
                        <td className="py-3 pr-3">{item.title}</td>
                        <td className="py-3 pr-3 text-cream/60">{item.slug}</td>
                        <td className="py-3 pr-3">{item.category}</td>
                        <td className="py-3 pr-3">{item.date}</td>
                        <td className="py-3 text-right">
                          <div className="flex justify-end gap-2">
                            <AdminButton variant="secondary" className="px-3 py-1.5" onClick={() => setEditingBlog(item)}>
                              Edit
                            </AdminButton>
                            <AdminButton variant="danger" className="px-3 py-1.5" onClick={() => deleteBlogPost(item.id)}>
                              <Trash2 size={13} />
                            </AdminButton>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </AdminCard>
        </div>
      )}

      {editingBlog && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-3xl rounded-2xl border border-[rgb(var(--cream-rgb)/0.16)] bg-[rgb(var(--surface-0-rgb))] p-5 space-y-4">
            <h3 className="text-lg font-semibold text-cream">Edit Blog Post</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AdminInput label="Title" value={editingBlog.title} onChange={(e) => setEditingBlog((p) => (p ? { ...p, title: e.target.value } : p))} />
              <AdminInput label="Slug" value={editingBlog.slug} onChange={(e) => setEditingBlog((p) => (p ? { ...p, slug: e.target.value } : p))} />
              <AdminInput label="Category" value={editingBlog.category} onChange={(e) => setEditingBlog((p) => (p ? { ...p, category: e.target.value } : p))} />
              <AdminInput label="Date" value={editingBlog.date} onChange={(e) => setEditingBlog((p) => (p ? { ...p, date: e.target.value } : p))} />
              <AdminInput label="Author" value={editingBlog.author} onChange={(e) => setEditingBlog((p) => (p ? { ...p, author: e.target.value } : p))} />
              <AdminInput
                label="Reading Time"
                type="number"
                value={editingBlog.readingTime}
                onChange={(e) => setEditingBlog((p) => (p ? { ...p, readingTime: Number(e.target.value || 0) } : p))}
              />
              <div className="lg:col-span-2">
                <AdminTextarea
                  label="Excerpt"
                  rows={3}
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog((p) => (p ? { ...p, excerpt: e.target.value } : p))}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <AdminButton variant="secondary" onClick={() => setEditingBlog(null)}>
                Cancel
              </AdminButton>
              <AdminButton onClick={updateBlogPost}>
                Save
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
