'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AdminButton, AdminCard } from '@/components/admin/AdminUI'
import { Activity, RefreshCw, Newspaper, Database, Mail, Download } from 'lucide-react'
import { toast } from 'sonner'
import { AdminApiError, adminFetchJson, adminLoginRedirectPath } from '@/lib/admin-api-client'

type ActivityItem = {
  id: string
  type: 'lead' | 'blog' | 'content'
  title: string
  description: string
  at: string
}

export default function AdminActivityPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [items, setItems] = useState<ActivityItem[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [filter, setFilter] = useState<'all' | 'lead' | 'blog' | 'content'>('all')
  const [days, setDays] = useState<7 | 30 | 90>(30)
  const [query, setQuery] = useState('')

  function handleApiError(error: unknown, fallback: string) {
    if (error instanceof AdminApiError && error.unauthorized) {
      const nextSearch = searchParams?.toString() ? `?${searchParams.toString()}` : ''
      router.push(adminLoginRedirectPath(pathname || '/admin/activity', nextSearch))
      return
    }
    toast.error(error instanceof Error ? error.message : fallback)
  }

  async function loadActivity(silent = false) {
    if (silent) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }
    try {
      const params = new URLSearchParams()
      params.set('type', filter)
      params.set('days', String(days))
      params.set('limit', '120')
      if (query.trim()) params.set('q', query.trim())

      const json = await adminFetchJson<any>(`/api/admin/activity?${params.toString()}`)
      if (!json?.ok) throw new Error(json?.error || 'Failed to load activity')
      setItems(Array.isArray(json.items) ? json.items : [])
    } catch (error) {
      handleApiError(error, 'Failed to load activity')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadActivity()
  }, [filter, days, query])

  const filtered = useMemo(() => items, [items])

  function getIcon(type: ActivityItem['type']) {
    if (type === 'lead') return Mail
    if (type === 'blog') return Newspaper
    return Database
  }

  function exportCsv() {
    const header = ['Type', 'Title', 'Description', 'Timestamp']
    const rows = filtered.map((item) => [item.type, item.title, item.description, item.at])
    const csv = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `shubiq-activity-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel tracking-wide flex items-center gap-2">
            <Activity size={20} className="text-gold" />
            Activity Feed
          </h1>
          <p className="text-[14px] font-medium text-cream/70 mt-1">Track recent lead, blog, and content updates across SHUBIQ.</p>
        </div>
        <div className="flex items-center gap-2">
          <AdminButton variant="secondary" onClick={exportCsv} disabled={filtered.length === 0}>
            <Download size={14} />
            Export CSV
          </AdminButton>
          <AdminButton variant="secondary" onClick={() => loadActivity(true)} disabled={refreshing}>
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </AdminButton>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'lead', label: 'Leads' },
            { key: 'blog', label: 'Blog' },
            { key: 'content', label: 'Content' },
          ].map((option) => (
            <button
              key={option.key}
              onClick={() => setFilter(option.key as typeof filter)}
              className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-[2px] font-rajdhani border transition-colors ${
                filter === option.key
                  ? 'bg-gold/15 text-gold border-gold/50'
                  : 'bg-transparent text-cream/60 border-[rgb(var(--cream-rgb)/0.18)] hover:text-cream hover:border-gold/35'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex flex-1 gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search activity..."
            className="flex-1 bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.16)] rounded-lg px-3 py-2 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-gold/50"
          />
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value) as 7 | 30 | 90)}
            className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.16)] rounded-lg px-3 py-2 text-sm text-cream outline-none focus:border-gold/50"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {[
          `Showing ${filtered.length} events`,
          query ? `Search: ${query}` : null,
          filter !== 'all' ? `Type: ${filter}` : null,
          `Range: ${days} days`,
        ]
          .filter(Boolean)
          .map((item) => (
            <span key={item} className="px-2.5 py-1 text-[11px] rounded border border-[rgb(var(--cream-rgb)/0.16)] text-cream/65">
              {item}
            </span>
          ))}
      </div>

      <AdminCard className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <RefreshCw size={18} className="animate-spin text-gold" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center text-cream/50">No activity found for this filter.</div>
        ) : (
          <div className="divide-y divide-[rgb(var(--cream-rgb)/0.08)]">
            {filtered.map((item) => {
              const Icon = getIcon(item.type)
              return (
                <div key={item.id} className="px-5 py-4 flex items-start gap-3 bg-[rgb(var(--surface-0-rgb))] hover:bg-[rgb(var(--surface-1-rgb))] transition-colors">
                  <div className="mt-0.5 w-8 h-8 rounded-full border border-[rgb(var(--cream-rgb)/0.18)] bg-[rgb(var(--surface-1-rgb))] flex items-center justify-center">
                    <Icon size={14} className="text-gold/85" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-cream font-medium">{item.title}</p>
                    <p className="text-xs text-cream/60 mt-1">{item.description}</p>
                  </div>
                  <span className="ml-auto text-[11px] text-cream/45 whitespace-nowrap">{new Date(item.at).toLocaleString()}</span>
                </div>
              )
            })}
          </div>
        )}
      </AdminCard>
    </div>
  )
}
