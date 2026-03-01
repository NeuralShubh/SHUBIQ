import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const SUPABASE_ENABLED = !!supabaseUrl && !!supabaseAnonKey

// Keep client creation safe for preview/visual deploys where env vars are not set yet.
const fallbackUrl = "https://placeholder.supabase.co"
const fallbackAnonKey = "placeholder-anon-key"

export const supabase = createClient(
  supabaseUrl || fallbackUrl,
  supabaseAnonKey || fallbackAnonKey,
)

// Types
export type Project = {
  id: string
  name: string
  tag: string
  desc: string
  tech: string[]
  stars: number
  link: string | null
  live: string | null
  featured: boolean
  image_url?: string | null
  status: 'live' | 'wip' | 'archived'
  created_at: string
  order_index: number
}

export type EcosystemItem = {
  id: string
  type: 'project' | 'app' | 'tool' | 'service' | 'blog' | 'case_study'
  title: string
  subtitle: string
  desc: string
  icon: string
  color: string
  status: 'live' | 'coming_soon' | 'in_dev' | 'concept'
  link: string | null
  tags: string[]
  image_url?: string | null
  featured: boolean
  order_index: number
  created_at: string
}

export type Service = {
  id: string
  icon: string
  title: string
  desc: string
  tag: string
  order_index: number
}
