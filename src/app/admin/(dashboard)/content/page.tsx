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
import { AlertTriangle, CheckCircle2, FileEdit, FileJson, ListPlus, Plus, RefreshCw, Save, Sparkles, Trash2, Type } from "lucide-react"

type BlogItem = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  readingTime: number
  tags: string[]
  content: unknown[]
}

type BlogEditorTemplate = {
  id: string
  name: string
  description: string
  content: unknown[]
}

type ParsedContentResult = {
  blocks: unknown[] | null
  error: string | null
}

type BlogCreateDraft = {
  form: Omit<BlogItem, "id">
  tagsInput: string
  contentJson: string
  templateId: string
  savedAt: number
}

type BlogEditDraft = {
  id: string
  blog: BlogItem
  tagsInput: string
  contentJson: string
  templateId: string
  savedAt: number
}

const BLOG_CREATE_DRAFT_KEY = "shubiq_admin_blog_create_draft_v1"
const BLOG_EDIT_DRAFT_KEY = "shubiq_admin_blog_edit_draft_v1"

const BLOG_EDITOR_TEMPLATES: BlogEditorTemplate[] = [
  {
    id: "insight-brief",
    name: "Insight Brief",
    description: "Fast publish format for one big idea with clear takeaways.",
    content: [
      { type: "h2", content: "The Core Insight" },
      { type: "p", content: "Start with the strongest idea in one clear paragraph." },
      { type: "blockquote", content: "Simple systems create predictable outcomes." },
      { type: "h3", content: "Why It Matters" },
      { type: "p", content: "Explain practical impact in your audience context." },
      { type: "ul", content: ["Decision speed improves", "Team execution aligns", "Output quality gets consistent"] },
      { type: "h3", content: "What To Do Next" },
      { type: "ol", content: ["Audit your current process", "Remove one friction point", "Ship one tighter iteration this week"] },
    ],
  },
  {
    id: "case-note",
    name: "Case Note",
    description: "Structured narrative for project breakdown and results.",
    content: [
      { type: "h2", content: "Context" },
      { type: "p", content: "Describe the business context and project goal in plain language." },
      { type: "h3", content: "Challenge" },
      { type: "p", content: "Explain constraints, blockers, and quality risks before execution." },
      { type: "h3", content: "Build Moves" },
      { type: "ul", content: ["Prioritized highest-leverage workflow", "Reduced handoff friction", "Shipped in focused weekly cycles"] },
      { type: "h3", content: "Outcome" },
      { type: "pullquote", content: "Tighter systems improved shipping speed and user trust." },
      { type: "p", content: "Close with metrics and what changed after launch." },
    ],
  },
  {
    id: "playbook",
    name: "Playbook",
    description: "Step-by-step tactical format for educational posts.",
    content: [
      { type: "h2", content: "Playbook Objective" },
      { type: "p", content: "Set the target outcome and timeframe." },
      { type: "h3", content: "Step 1: Define Signal" },
      { type: "p", content: "Choose the metric that tells you if progress is real." },
      { type: "h3", content: "Step 2: Build Cadence" },
      { type: "p", content: "Run short delivery loops with clear review checkpoints." },
      { type: "h3", content: "Step 3: Tighten System" },
      { type: "ol", content: ["Keep only useful rituals", "Document decisions", "Convert wins into reusable checklists"] },
    ],
  },
]

function ensureUniqueSlug(base: string, existing: string[]) {
  const source = base.trim() || "post"
  if (!existing.includes(source)) return source
  let index = 2
  while (existing.includes(`${source}-copy-${index}`)) {
    index += 1
  }
  return `${source}-copy-${index}`
}

function parseTagsInput(input: string): string[] {
  return input
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function formatTagsInput(tags: string[] | undefined): string {
  return Array.isArray(tags) ? tags.join(", ") : ""
}

function parseContentJson(input: string): unknown[] {
  const parsed = JSON.parse(input)
  if (!Array.isArray(parsed)) throw new Error("Content JSON must be an array")
  return parsed
}

function parseContentJsonSafe(input: string): ParsedContentResult {
  try {
    const parsed = parseContentJson(input)
    return { blocks: parsed, error: validateBlogBlocks(parsed) }
  } catch (error) {
    return { blocks: null, error: error instanceof Error ? error.message : "Invalid JSON" }
  }
}

function validateBlogBlocks(blocks: unknown[]): string | null {
  const textTypes = new Set(["h2", "h3", "p", "blockquote", "pullquote"])
  const listTypes = new Set(["ul", "ol"])

  for (let i = 0; i < blocks.length; i += 1) {
    const block = blocks[i]
    if (!block || typeof block !== "object") return `Block ${i + 1} must be an object`
    const row = block as { type?: unknown; content?: unknown }
    if (typeof row.type !== "string") return `Block ${i + 1} must include a string type`
    if (!textTypes.has(row.type) && !listTypes.has(row.type)) {
      return `Block ${i + 1} has unsupported type "${row.type}"`
    }
    if (textTypes.has(row.type) && typeof row.content !== "string") {
      return `Block ${i + 1} content must be a string for type "${row.type}"`
    }
    if (listTypes.has(row.type)) {
      if (!Array.isArray(row.content)) return `Block ${i + 1} content must be an array for type "${row.type}"`
      if (row.content.some((item) => typeof item !== "string")) return `Block ${i + 1} list items must be strings`
    }
  }

  return null
}

function formatContentJson(content: unknown[] | undefined): string {
  return JSON.stringify(Array.isArray(content) ? content : [], null, 2)
}

function wordsFromBlogBlocks(blocks: unknown[]): number {
  const tokens = blocks.flatMap((block) => {
    if (!block || typeof block !== "object") return []
    const row = block as { content?: unknown }
    if (typeof row.content === "string") return [row.content]
    if (Array.isArray(row.content)) return row.content.filter((item): item is string => typeof item === "string")
    return []
  })

  return tokens
    .join(" ")
    .split(/\s+/)
    .map((item) => item.trim())
    .filter(Boolean).length
}

function estimateReadingMinutes(blocks: unknown[]): number {
  return Math.max(1, Math.ceil(wordsFromBlogBlocks(blocks) / 200))
}

function buildExcerptFromBlocks(blocks: unknown[]): string {
  const text = blocks
    .flatMap((block) => {
      if (!block || typeof block !== "object") return []
      const row = block as { content?: unknown }
      if (typeof row.content === "string") return [row.content]
      if (Array.isArray(row.content)) return row.content.filter((item): item is string => typeof item === "string")
      return []
    })
    .join(" ")
    .replace(/\s+/g, " ")
    .trim()

  if (!text) return ""
  return `${text.slice(0, 170).trim().replace(/[.,;:]?$/, "")}...`
}

function readStorageJson<T>(key: string): T | null {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(key)
  if (!raw) return null
  try {
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function isDefaultCreateDraft(form: Omit<BlogItem, "id">, tagsInput: string, contentJson: string) {
  const hasTitle = form.title.trim().length > 0
  const hasExcerpt = form.excerpt.trim().length > 0
  const hasTags = tagsInput.trim().length > 0
  const hasCustomContent = contentJson.trim() !== "[]"
  return !hasTitle && !hasExcerpt && !hasTags && !hasCustomContent
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

function getInitialBlogForm(): Omit<BlogItem, "id"> {
  return {
    slug: "",
    title: "",
    excerpt: "",
    category: "Productivity",
    date: new Date().toISOString().slice(0, 10),
    author: "Shubham",
    readingTime: 5,
    tags: [],
    content: [],
  }
}

export default function ContentControlPage() {
  const [activeTab, setActiveTab] = useState<"studio" | "home" | "labs" | "blog">("studio")
  const [loadingStudio, setLoadingStudio] = useState(true)
  const [savingStudio, setSavingStudio] = useState(false)
  const [studioContent, setStudioContent] = useState<StudioContent>(DEFAULT_STUDIO_CONTENT)
  const [studioSnapshot, setStudioSnapshot] = useState(JSON.stringify(DEFAULT_STUDIO_CONTENT))
  const [loadingHome, setLoadingHome] = useState(true)
  const [savingHome, setSavingHome] = useState(false)
  const [homeContent, setHomeContent] = useState<HomeManagedContent>(DEFAULT_HOME_CONTENT)
  const [homeSnapshot, setHomeSnapshot] = useState(JSON.stringify(DEFAULT_HOME_CONTENT))
  const [loadingLabs, setLoadingLabs] = useState(true)
  const [savingLabs, setSavingLabs] = useState(false)
  const [labsContent, setLabsContent] = useState<LabsManagedContent>(DEFAULT_LABS_CONTENT)
  const [labsSnapshot, setLabsSnapshot] = useState(JSON.stringify(DEFAULT_LABS_CONTENT))

  const [blogLoading, setBlogLoading] = useState(true)
  const [blogItems, setBlogItems] = useState<BlogItem[]>([])
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null)
  const [editingTagsInput, setEditingTagsInput] = useState("")
  const [editingContentJson, setEditingContentJson] = useState("[]")
  const [creatingBlog, setCreatingBlog] = useState(false)
  const [blogForm, setBlogForm] = useState<Omit<BlogItem, "id">>(getInitialBlogForm())
  const [blogTagsInput, setBlogTagsInput] = useState("")
  const [blogContentJson, setBlogContentJson] = useState("[]")
  const [blogTemplateId, setBlogTemplateId] = useState(BLOG_EDITOR_TEMPLATES[0]?.id ?? "insight-brief")
  const [editingTemplateId, setEditingTemplateId] = useState(BLOG_EDITOR_TEMPLATES[0]?.id ?? "insight-brief")
  const [createDraftSavedAt, setCreateDraftSavedAt] = useState<number | null>(null)
  const [editDraftSavedAt, setEditDraftSavedAt] = useState<number | null>(null)

  const studioLastUpdatedText = useMemo(() => {
    return savingStudio ? "Saving..." : "Studio content controls pricing + CTA copy on /shubiq-studio"
  }, [savingStudio])

  const studioDirty = useMemo(() => JSON.stringify(studioContent) !== studioSnapshot, [studioContent, studioSnapshot])
  const homeDirty = useMemo(() => JSON.stringify(homeContent) !== homeSnapshot, [homeContent, homeSnapshot])
  const labsDirty = useMemo(() => JSON.stringify(labsContent) !== labsSnapshot, [labsContent, labsSnapshot])
  const hasUnsavedChanges = (activeTab === "studio" && studioDirty) || (activeTab === "home" && homeDirty) || (activeTab === "labs" && labsDirty)
  const createContentState = useMemo(() => parseContentJsonSafe(blogContentJson), [blogContentJson])
  const editContentState = useMemo(() => parseContentJsonSafe(editingContentJson), [editingContentJson])
  const createBlockCount = createContentState.blocks?.length ?? 0
  const editBlockCount = editContentState.blocks?.length ?? 0
  const createReadingSuggestion = useMemo(
    () => (createContentState.blocks ? estimateReadingMinutes(createContentState.blocks) : null),
    [createContentState],
  )
  const editReadingSuggestion = useMemo(
    () => (editContentState.blocks ? estimateReadingMinutes(editContentState.blocks) : null),
    [editContentState],
  )

  function currentTabDirty(tab: "studio" | "home" | "labs" | "blog") {
    if (tab === "studio") return studioDirty
    if (tab === "home") return homeDirty
    if (tab === "labs") return labsDirty
    return false
  }

  function switchTabWithGuard(nextTab: "studio" | "home" | "labs" | "blog") {
    if (nextTab === activeTab) return
    if (currentTabDirty(activeTab)) {
      const confirmed = window.confirm("You have unsaved changes in this tab. Switch anyway and keep changes unsaved?")
      if (!confirmed) return
    }
    setActiveTab(nextTab)
  }

  async function guardedReload(tab: "studio" | "home" | "labs") {
    if (currentTabDirty(tab)) {
      const confirmed = window.confirm("This will reload from server and overwrite unsaved edits in this tab. Continue?")
      if (!confirmed) return
    }

    if (tab === "studio") await loadStudioContent()
    if (tab === "home") await loadHomeContent()
    if (tab === "labs") await loadLabsContent()
  }

  async function loadStudioContent() {
    setLoadingStudio(true)
    try {
      const res = await fetch("/api/admin/content?key=studio_content", { cache: "no-store" })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Failed to load studio content")
      const merged = mergeStudioContent(json.content)
      setStudioContent(merged)
      setStudioSnapshot(JSON.stringify(merged))
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
      setStudioSnapshot(JSON.stringify(studioContent))
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
      const merged = mergeHomeManagedContent(json.content)
      setHomeContent(merged)
      setHomeSnapshot(JSON.stringify(merged))
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
      setHomeSnapshot(JSON.stringify(homeContent))
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
      const merged = mergeLabsManagedContent(json.content)
      setLabsContent(merged)
      setLabsSnapshot(JSON.stringify(merged))
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
      setLabsSnapshot(JSON.stringify(labsContent))
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
      setBlogItems(
        Array.isArray(json.items)
          ? json.items.map((item: Partial<BlogItem>) => ({
              id: String(item.id || ""),
              slug: String(item.slug || ""),
              title: String(item.title || ""),
              excerpt: String(item.excerpt || ""),
              category: String(item.category || "General"),
              date: String(item.date || ""),
              author: String(item.author || "Shubham"),
              readingTime: Number(item.readingTime || 4),
              tags: Array.isArray(item.tags) ? item.tags : [],
              content: Array.isArray(item.content) ? item.content : [],
            }))
          : [],
      )
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
      if (!createContentState.blocks || createContentState.error) {
        throw new Error(createContentState.error || "Invalid content JSON")
      }
      const parsedContent = createContentState.blocks
      const res = await fetch("/api/admin/blog-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, tags: parseTagsInput(blogTagsInput), content: parsedContent }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Create failed")
      toast.success("Blog post created")
      setCreatingBlog(false)
      setBlogForm(getInitialBlogForm())
      setBlogTagsInput("")
      setBlogContentJson("[]")
      setCreateDraftSavedAt(null)
      if (typeof window !== "undefined") window.localStorage.removeItem(BLOG_CREATE_DRAFT_KEY)
      await loadBlogItems()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Create failed")
    }
  }

  async function updateBlogPost() {
    if (!editingBlog) return
    try {
      if (!editContentState.blocks || editContentState.error) {
        throw new Error(editContentState.error || "Invalid content JSON")
      }
      const parsedContent = editContentState.blocks
      const res = await fetch("/api/admin/blog-posts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editingBlog, tags: parseTagsInput(editingTagsInput), content: parsedContent }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Update failed")
      toast.success("Blog post updated")
      setEditingBlog(null)
      setEditingTagsInput("")
      setEditingContentJson("[]")
      setEditDraftSavedAt(null)
      if (typeof window !== "undefined") window.localStorage.removeItem(BLOG_EDIT_DRAFT_KEY)
      await loadBlogItems()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed")
    }
  }

  function openBlogEditor(item: BlogItem) {
    const saved = readStorageJson<BlogEditDraft>(BLOG_EDIT_DRAFT_KEY)
    if (saved?.id === item.id && saved.blog) {
      const shouldRestore = window.confirm("Unsaved draft found for this post. Restore draft content?")
      if (shouldRestore) {
        setEditingBlog(saved.blog)
        setEditingTagsInput(saved.tagsInput || "")
        setEditingContentJson(saved.contentJson || "[]")
        setEditingTemplateId(saved.templateId || (BLOG_EDITOR_TEMPLATES[0]?.id ?? "insight-brief"))
        setEditDraftSavedAt(saved.savedAt || Date.now())
        return
      }
    }
    setEditingBlog(item)
    setEditingTagsInput(formatTagsInput(item.tags))
    setEditingContentJson(formatContentJson(item.content))
    setEditingTemplateId(BLOG_EDITOR_TEMPLATES[0]?.id ?? "insight-brief")
    setEditDraftSavedAt(null)
  }

  function toggleCreateBlogPanel() {
    setCreatingBlog((prev) => {
      const next = !prev
      if (next) {
        const saved = readStorageJson<BlogCreateDraft>(BLOG_CREATE_DRAFT_KEY)
        if (saved) {
          setBlogForm(saved.form || getInitialBlogForm())
          setBlogTagsInput(saved.tagsInput || "")
          setBlogContentJson(saved.contentJson || "[]")
          setBlogTemplateId(saved.templateId || (BLOG_EDITOR_TEMPLATES[0]?.id ?? "insight-brief"))
          setCreateDraftSavedAt(saved.savedAt || Date.now())
        }
      }
      return next
    })
  }

  function formatCreateContentJson() {
    if (!createContentState.blocks) return toast.error(createContentState.error || "Invalid content JSON")
    setBlogContentJson(formatContentJson(createContentState.blocks))
    toast.success("Create content JSON formatted")
  }

  function formatEditContentJson() {
    if (!editContentState.blocks) return toast.error(editContentState.error || "Invalid content JSON")
    setEditingContentJson(formatContentJson(editContentState.blocks))
    toast.success("Edit content JSON formatted")
  }

  function insertCreateBlock(type: "p" | "h2" | "ul" | "blockquote") {
    if (!createContentState.blocks) return toast.error(createContentState.error || "Fix JSON first")
    const next = [...createContentState.blocks]
    if (type === "p") next.push({ type: "p", content: "Write paragraph text here." })
    if (type === "h2") next.push({ type: "h2", content: "Section heading" })
    if (type === "ul") next.push({ type: "ul", content: ["First point", "Second point"] })
    if (type === "blockquote") next.push({ type: "blockquote", content: "Insight quote" })
    setBlogContentJson(formatContentJson(next))
  }

  function insertEditBlock(type: "p" | "h2" | "ul" | "blockquote") {
    if (!editContentState.blocks) return toast.error(editContentState.error || "Fix JSON first")
    const next = [...editContentState.blocks]
    if (type === "p") next.push({ type: "p", content: "Write paragraph text here." })
    if (type === "h2") next.push({ type: "h2", content: "Section heading" })
    if (type === "ul") next.push({ type: "ul", content: ["First point", "Second point"] })
    if (type === "blockquote") next.push({ type: "blockquote", content: "Insight quote" })
    setEditingContentJson(formatContentJson(next))
  }

  function applyTemplateToCreate() {
    const template = BLOG_EDITOR_TEMPLATES.find((entry) => entry.id === blogTemplateId)
    if (!template) return
    const shouldReplace = window.confirm("Replace current create content with selected template?")
    if (!shouldReplace) return
    setBlogContentJson(formatContentJson(template.content))
    toast.success(`Applied template: ${template.name}`)
  }

  function applyTemplateToEdit() {
    const template = BLOG_EDITOR_TEMPLATES.find((entry) => entry.id === editingTemplateId)
    if (!template) return
    const shouldReplace = window.confirm("Replace current editor content with selected template?")
    if (!shouldReplace) return
    setEditingContentJson(formatContentJson(template.content))
    toast.success(`Applied template: ${template.name}`)
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

  async function duplicateBlogPost(item: BlogItem) {
    try {
      const existingSlugs = blogItems.map((entry) => entry.slug)
      const payload = {
        slug: ensureUniqueSlug(`${item.slug}-copy`, existingSlugs),
        title: `${item.title} (Copy)`,
        excerpt: item.excerpt,
        category: item.category,
        date: new Date().toISOString().slice(0, 10),
        author: item.author,
        readingTime: item.readingTime,
        tags: item.tags,
        content: item.content,
      }

      const res = await fetch("/api/admin/blog-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Duplicate failed")
      toast.success("Blog post duplicated")
      await loadBlogItems()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Duplicate failed")
    }
  }

  useEffect(() => {
    loadStudioContent()
    loadHomeContent()
    loadLabsContent()
    loadBlogItems()
  }, [])

  useEffect(() => {
    if (activeTab !== "blog" || !creatingBlog) return
    if (isDefaultCreateDraft(blogForm, blogTagsInput, blogContentJson)) return
    if (typeof window === "undefined") return

    const savedAt = Date.now()
    const payload: BlogCreateDraft = {
      form: blogForm,
      tagsInput: blogTagsInput,
      contentJson: blogContentJson,
      templateId: blogTemplateId,
      savedAt,
    }
    window.localStorage.setItem(BLOG_CREATE_DRAFT_KEY, JSON.stringify(payload))
    setCreateDraftSavedAt(savedAt)
  }, [activeTab, creatingBlog, blogForm, blogTagsInput, blogContentJson, blogTemplateId])

  useEffect(() => {
    if (!editingBlog) return
    if (typeof window === "undefined") return

    const savedAt = Date.now()
    const payload: BlogEditDraft = {
      id: editingBlog.id,
      blog: editingBlog,
      tagsInput: editingTagsInput,
      contentJson: editingContentJson,
      templateId: editingTemplateId,
      savedAt,
    }
    window.localStorage.setItem(BLOG_EDIT_DRAFT_KEY, JSON.stringify(payload))
    setEditDraftSavedAt(savedAt)
  }, [editingBlog, editingTagsInput, editingContentJson, editingTemplateId])

  useEffect(() => {
    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!studioDirty && !homeDirty && !labsDirty) return
      event.preventDefault()
      event.returnValue = ""
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "s") {
        event.preventDefault()
        if (activeTab === "studio" && !loadingStudio && !savingStudio) void saveStudioContent()
        if (activeTab === "home" && !loadingHome && !savingHome) void saveHomeContent()
        if (activeTab === "labs" && !loadingLabs && !savingLabs) void saveLabsContent()
      }
    }

    window.addEventListener("beforeunload", onBeforeUnload)
    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload)
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [activeTab, loadingStudio, savingStudio, loadingHome, savingHome, loadingLabs, savingLabs, studioDirty, homeDirty, labsDirty, studioContent, homeContent, labsContent])

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel tracking-wide">Content Control</h1>
          <p className="text-[14px] text-cream/70 mt-1 font-medium">
            Manage Home, Studio, Labs copy and blog publishing from one panel.
            {hasUnsavedChanges ? " Unsaved changes in current tab." : " Press Ctrl/Cmd+S to save active tab quickly."}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <AdminButton variant={activeTab === "studio" ? "primary" : "secondary"} onClick={() => switchTabWithGuard("studio")}>
            Studio{studioDirty ? " *" : ""}
          </AdminButton>
          <AdminButton variant={activeTab === "home" ? "primary" : "secondary"} onClick={() => switchTabWithGuard("home")}>
            Home{homeDirty ? " *" : ""}
          </AdminButton>
          <AdminButton variant={activeTab === "labs" ? "primary" : "secondary"} onClick={() => switchTabWithGuard("labs")}>
            Labs{labsDirty ? " *" : ""}
          </AdminButton>
          <AdminButton variant={activeTab === "blog" ? "primary" : "secondary"} onClick={() => switchTabWithGuard("blog")}>
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
              <AdminButton variant="secondary" onClick={() => guardedReload("studio")} disabled={loadingStudio}>
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
                Home Content
              </h2>
              <p className="text-xs text-cream/50 mt-1">Controls Home hero, about, and services content.</p>
            </div>
            <div className="flex gap-2">
              <AdminButton variant="secondary" onClick={() => guardedReload("home")} disabled={loadingHome}>
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
            <AdminInput
              label="Services Label"
              value={homeContent.servicesLabel}
              onChange={(e) => setHomeContent((p) => ({ ...p, servicesLabel: e.target.value }))}
            />
            <AdminInput
              label="Services Heading Prefix"
              value={homeContent.servicesHeadingPrefix}
              onChange={(e) => setHomeContent((p) => ({ ...p, servicesHeadingPrefix: e.target.value }))}
            />
            <AdminInput
              label="Services Heading Accent"
              value={homeContent.servicesHeadingAccent}
              onChange={(e) => setHomeContent((p) => ({ ...p, servicesHeadingAccent: e.target.value }))}
            />
            <div className="lg:col-span-2 space-y-3 rounded-xl border border-[rgb(var(--cream-rgb)/0.12)] p-4">
              <h3 className="text-sm font-semibold text-cream/90">Services Cards</h3>
              <p className="text-xs text-cream/50">Edit icon key, title, description, and tag for each card.</p>
              {homeContent.servicesCards.map((card, index) => (
                <div key={`${card.title}-${index}`} className="space-y-3 rounded-lg border border-[rgb(var(--cream-rgb)/0.08)] p-3">
                  <p className="text-xs font-semibold uppercase tracking-[2px] text-gold/80">Card {index + 1}</p>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    <AdminInput
                      label="Icon Key"
                      value={card.icon}
                      onChange={(e) =>
                        setHomeContent((prev) => ({
                          ...prev,
                          servicesCards: prev.servicesCards.map((item, i) => (i === index ? { ...item, icon: e.target.value } : item)),
                        }))
                      }
                    />
                    <AdminInput
                      label="Tag"
                      value={card.tag}
                      onChange={(e) =>
                        setHomeContent((prev) => ({
                          ...prev,
                          servicesCards: prev.servicesCards.map((item, i) => (i === index ? { ...item, tag: e.target.value } : item)),
                        }))
                      }
                    />
                    <AdminInput
                      label="Title"
                      value={card.title}
                      onChange={(e) =>
                        setHomeContent((prev) => ({
                          ...prev,
                          servicesCards: prev.servicesCards.map((item, i) => (i === index ? { ...item, title: e.target.value } : item)),
                        }))
                      }
                    />
                    <div className="lg:col-span-2">
                      <AdminTextarea
                        label="Description"
                        rows={3}
                        value={card.desc}
                        onChange={(e) =>
                          setHomeContent((prev) => ({
                            ...prev,
                            servicesCards: prev.servicesCards.map((item, i) => (i === index ? { ...item, desc: e.target.value } : item)),
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <AdminInput
              label="Projects Label"
              value={homeContent.projectsLabel}
              onChange={(e) => setHomeContent((p) => ({ ...p, projectsLabel: e.target.value }))}
            />
            <AdminInput
              label="Projects Heading Prefix"
              value={homeContent.projectsHeadingPrefix}
              onChange={(e) => setHomeContent((p) => ({ ...p, projectsHeadingPrefix: e.target.value }))}
            />
            <AdminInput
              label="Projects Heading Accent"
              value={homeContent.projectsHeadingAccent}
              onChange={(e) => setHomeContent((p) => ({ ...p, projectsHeadingAccent: e.target.value }))}
            />
            <AdminInput
              label="Projects CTA Text"
              value={homeContent.projectsCtaText}
              onChange={(e) => setHomeContent((p) => ({ ...p, projectsCtaText: e.target.value }))}
            />
            <div className="lg:col-span-2">
              <AdminTextarea
                label="Featured Project Slugs (comma separated)"
                rows={2}
                value={homeContent.projectsFeaturedSlugs.join(", ")}
                onChange={(e) =>
                  setHomeContent((prev) => ({
                    ...prev,
                    projectsFeaturedSlugs: e.target.value
                      .split(",")
                      .map((slug) => slug.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </div>
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
              <AdminButton variant="secondary" onClick={() => guardedReload("labs")} disabled={loadingLabs}>
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
              <div>
                <h2 className="text-lg font-semibold text-cream">Blog Manager</h2>
                {(createDraftSavedAt || editDraftSavedAt) && (
                  <p className="text-xs text-cream/55 mt-1">
                    Draft autosave active
                    {createDraftSavedAt ? ` • Create: ${new Date(createDraftSavedAt).toLocaleTimeString()}` : ""}
                    {editDraftSavedAt ? ` • Edit: ${new Date(editDraftSavedAt).toLocaleTimeString()}` : ""}
                  </p>
                )}
              </div>
              <AdminButton variant={creatingBlog ? "secondary" : "primary"} onClick={toggleCreateBlogPanel}>
                <Plus size={14} />
                {creatingBlog ? "Close" : "New Post"}
              </AdminButton>
            </div>

            {creatingBlog && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 border border-[rgb(var(--cream-rgb)/0.12)] rounded-xl p-4">
                <div className="lg:col-span-2 flex justify-between items-center rounded-lg border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb))] px-3 py-2">
                  <p className="text-xs text-cream/65">
                    Drafts save automatically in this browser.
                    {createDraftSavedAt ? ` Last save: ${new Date(createDraftSavedAt).toLocaleTimeString()}` : ""}
                  </p>
                  <AdminButton
                    type="button"
                    variant="secondary"
                    className="px-3 py-1.5 text-[11px]"
                    onClick={() => {
                      if (typeof window !== "undefined") window.localStorage.removeItem(BLOG_CREATE_DRAFT_KEY)
                      setBlogForm(getInitialBlogForm())
                      setBlogTagsInput("")
                      setBlogContentJson("[]")
                      setBlogTemplateId(BLOG_EDITOR_TEMPLATES[0]?.id ?? "insight-brief")
                      setCreateDraftSavedAt(null)
                      toast.success("Create draft discarded")
                    }}
                  >
                    Discard Draft
                  </AdminButton>
                </div>
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
                <div className="space-y-2">
                  <p className="text-[13px] text-cream/70 font-semibold uppercase tracking-wider font-rajdhani">Reading Time Suggestion</p>
                  <div className="h-[42px] px-3 rounded-lg border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb))] flex items-center justify-between">
                    <span className="text-sm text-cream/75">
                      {createReadingSuggestion ? `${createReadingSuggestion} min from content` : "Add valid content JSON first"}
                    </span>
                    <AdminButton
                      type="button"
                      variant="secondary"
                      className="px-3 py-1.5 text-[11px]"
                      disabled={!createReadingSuggestion}
                      onClick={() => setBlogForm((p) => ({ ...p, readingTime: createReadingSuggestion ?? p.readingTime }))}
                    >
                      <Sparkles size={12} />
                      Apply
                    </AdminButton>
                  </div>
                </div>
                <AdminInput label="Tags (comma separated)" value={blogTagsInput} onChange={(e) => setBlogTagsInput(e.target.value)} />
                <div className="space-y-2">
                  <p className="text-[13px] text-cream/70 font-semibold uppercase tracking-wider font-rajdhani">Slug Helper</p>
                  <div className="h-[42px] px-3 rounded-lg border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb))] flex items-center justify-between">
                    <span className="text-sm text-cream/75 truncate pr-3">{blogForm.slug || slugify(blogForm.title || "post-title")}</span>
                    <AdminButton
                      type="button"
                      variant="secondary"
                      className="px-3 py-1.5 text-[11px]"
                      onClick={() => setBlogForm((p) => ({ ...p, slug: slugify(p.title || p.slug || "post-title") }))}
                    >
                      <FileJson size={12} />
                      Auto
                    </AdminButton>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <AdminTextarea label="Excerpt" rows={3} value={blogForm.excerpt} onChange={(e) => setBlogForm((p) => ({ ...p, excerpt: e.target.value }))} />
                  <div className="mt-2 flex justify-end">
                    <AdminButton
                      type="button"
                      variant="secondary"
                      className="px-3 py-1.5"
                      disabled={!createContentState.blocks}
                      onClick={() => {
                        const blocks = createContentState.blocks
                        if (!blocks) return
                        setBlogForm((p) => ({ ...p, excerpt: buildExcerptFromBlocks(blocks) || p.excerpt }))
                      }}
                    >
                      <Sparkles size={12} />
                      Auto Excerpt
                    </AdminButton>
                  </div>
                </div>
                <div className="lg:col-span-2">
                  <div className="mb-2 grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-2">
                    <select
                      className="w-full bg-[rgb(var(--surface-2-rgb))] border border-[rgb(var(--cream-rgb)/0.12)] rounded-lg px-3 py-2.5 text-sm text-cream focus:outline-none focus:border-gold/60"
                      value={blogTemplateId}
                      onChange={(e) => setBlogTemplateId(e.target.value)}
                    >
                      {BLOG_EDITOR_TEMPLATES.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name} - {template.description}
                        </option>
                      ))}
                    </select>
                    <AdminButton type="button" variant="secondary" className="px-3 py-2" onClick={applyTemplateToCreate}>
                      <ListPlus size={13} />
                      Apply Template
                    </AdminButton>
                    <AdminButton type="button" variant="secondary" className="px-3 py-2" onClick={formatCreateContentJson}>
                      <Type size={13} />
                      Format JSON
                    </AdminButton>
                  </div>
                  <AdminTextarea
                    label='Content JSON (array of blocks, e.g. [{"type":"p","content":"Text"}])'
                    rows={10}
                    value={blogContentJson}
                    onChange={(e) => setBlogContentJson(e.target.value)}
                  />
                  <div className="mt-2 flex flex-wrap gap-2">
                    <AdminButton type="button" variant="secondary" className="px-3 py-1.5" onClick={() => insertCreateBlock("h2")}>
                      Add H2
                    </AdminButton>
                    <AdminButton type="button" variant="secondary" className="px-3 py-1.5" onClick={() => insertCreateBlock("p")}>
                      Add Paragraph
                    </AdminButton>
                    <AdminButton type="button" variant="secondary" className="px-3 py-1.5" onClick={() => insertCreateBlock("ul")}>
                      Add List
                    </AdminButton>
                    <AdminButton type="button" variant="secondary" className="px-3 py-1.5" onClick={() => insertCreateBlock("blockquote")}>
                      Add Quote
                    </AdminButton>
                    {!createContentState.error ? (
                      <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                        <CheckCircle2 size={12} />
                        Valid JSON • {createBlockCount} blocks
                      </span>
                    ) : (
                      <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs border border-red-500/30 bg-red-500/10 text-red-300">
                        <AlertTriangle size={12} />
                        {createContentState.error}
                      </span>
                    )}
                  </div>
                </div>
                <div className="lg:col-span-2 flex justify-end">
                  <AdminButton onClick={createBlogPost} disabled={!!createContentState.error}>
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
                            <AdminButton variant="secondary" className="px-3 py-1.5" onClick={() => duplicateBlogPost(item)}>
                              Duplicate
                            </AdminButton>
                            <AdminButton variant="secondary" className="px-3 py-1.5" onClick={() => openBlogEditor(item)}>
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
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-cream">Edit Blog Post</h3>
              <p className="text-xs text-cream/55">
                Draft autosave
                {editDraftSavedAt ? ` • ${new Date(editDraftSavedAt).toLocaleTimeString()}` : ""}
              </p>
            </div>
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
              <div className="space-y-2">
                <p className="text-[13px] text-cream/70 font-semibold uppercase tracking-wider font-rajdhani">Reading Time Suggestion</p>
                <div className="h-[42px] px-3 rounded-lg border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-2-rgb))] flex items-center justify-between">
                  <span className="text-sm text-cream/75">
                    {editReadingSuggestion ? `${editReadingSuggestion} min from content` : "Add valid content JSON first"}
                  </span>
                  <AdminButton
                    type="button"
                    variant="secondary"
                    className="px-3 py-1.5 text-[11px]"
                    disabled={!editReadingSuggestion}
                    onClick={() => setEditingBlog((p) => (p ? { ...p, readingTime: editReadingSuggestion ?? p.readingTime } : p))}
                  >
                    <Sparkles size={12} />
                    Apply
                  </AdminButton>
                </div>
              </div>
              <AdminInput label="Tags (comma separated)" value={editingTagsInput} onChange={(e) => setEditingTagsInput(e.target.value)} />
              <div className="lg:col-span-2">
                <AdminTextarea
                  label="Excerpt"
                  rows={3}
                  value={editingBlog.excerpt}
                  onChange={(e) => setEditingBlog((p) => (p ? { ...p, excerpt: e.target.value } : p))}
                />
                <div className="mt-2 flex justify-end">
                  <AdminButton
                    type="button"
                    variant="secondary"
                    className="px-3 py-1.5"
                    disabled={!editContentState.blocks}
                    onClick={() => {
                      const blocks = editContentState.blocks
                      if (!blocks) return
                      setEditingBlog((p) => (p ? { ...p, excerpt: buildExcerptFromBlocks(blocks) || p.excerpt } : p))
                    }}
                  >
                    <Sparkles size={12} />
                    Auto Excerpt
                  </AdminButton>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="mb-2 grid grid-cols-1 lg:grid-cols-[1fr_auto_auto] gap-2">
                  <select
                    className="w-full bg-[rgb(var(--surface-2-rgb))] border border-[rgb(var(--cream-rgb)/0.12)] rounded-lg px-3 py-2.5 text-sm text-cream focus:outline-none focus:border-gold/60"
                    value={editingTemplateId}
                    onChange={(e) => setEditingTemplateId(e.target.value)}
                  >
                    {BLOG_EDITOR_TEMPLATES.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.name} - {template.description}
                      </option>
                    ))}
                  </select>
                  <AdminButton type="button" variant="secondary" className="px-3 py-2" onClick={applyTemplateToEdit}>
                    <ListPlus size={13} />
                    Apply Template
                  </AdminButton>
                  <AdminButton type="button" variant="secondary" className="px-3 py-2" onClick={formatEditContentJson}>
                    <Type size={13} />
                    Format JSON
                  </AdminButton>
                </div>
                <AdminTextarea
                  label='Content JSON (array of blocks, e.g. [{"type":"p","content":"Text"}])'
                  rows={12}
                  value={editingContentJson}
                  onChange={(e) => setEditingContentJson(e.target.value)}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  <AdminButton type="button" variant="secondary" className="px-3 py-1.5" onClick={() => insertEditBlock("h2")}>
                    Add H2
                  </AdminButton>
                  <AdminButton type="button" variant="secondary" className="px-3 py-1.5" onClick={() => insertEditBlock("p")}>
                    Add Paragraph
                  </AdminButton>
                  <AdminButton type="button" variant="secondary" className="px-3 py-1.5" onClick={() => insertEditBlock("ul")}>
                    Add List
                  </AdminButton>
                  <AdminButton type="button" variant="secondary" className="px-3 py-1.5" onClick={() => insertEditBlock("blockquote")}>
                    Add Quote
                  </AdminButton>
                  {!editContentState.error ? (
                    <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
                      <CheckCircle2 size={12} />
                      Valid JSON • {editBlockCount} blocks
                    </span>
                  ) : (
                    <span className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs border border-red-500/30 bg-red-500/10 text-red-300">
                      <AlertTriangle size={12} />
                      {editContentState.error}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <AdminButton
                variant="secondary"
                onClick={() => {
                  if (!window.confirm("Discard saved edit draft for this post?")) return
                  if (typeof window !== "undefined") window.localStorage.removeItem(BLOG_EDIT_DRAFT_KEY)
                  setEditDraftSavedAt(null)
                  toast.success("Edit draft discarded")
                }}
              >
                Discard Draft
              </AdminButton>
              <AdminButton
                variant="secondary"
                onClick={() => {
                  setEditingBlog(null)
                  setEditingTagsInput("")
                  setEditingContentJson("[]")
                }}
              >
                Cancel
              </AdminButton>
              <AdminButton onClick={updateBlogPost} disabled={!!editContentState.error}>
                Save
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
