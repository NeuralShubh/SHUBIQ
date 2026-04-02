'use client'

import { useEffect, useState } from 'react'
import { AdminButton, AdminCard, ConfirmModal } from '@/components/admin/AdminUI'
import { Trash2, Search, X, MailOpen, Mail, RefreshCw, CheckSquare, Square, Download, ChartNoAxesColumn, Activity } from 'lucide-react'
import { toast } from 'sonner'
import type { AdminRole } from '@/lib/admin-auth'
import { fetchAdminSessionInfo } from '@/lib/admin-session-client'

type Inquiry = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  source: string
  business_type: string
  status: string
  read: boolean
  created_at: string | null
}

type DashboardStats = {
  ok: boolean
  totals: {
    leads: number
    unread: number
    newToday: number
    blogPosts: number
  }
  leadStatus: {
    new: number
    inProgress: number
    responded: number
    closed: number
  }
  topSources: Array<{ source: string; count: number }>
  recentBlog: Array<{ id: string; title: string; slug: string; updatedAt: string | null }>
  recentContent: Array<{ key: string; updatedAt: string | null }>
}

type InboxPagination = {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

const STATUS_OPTIONS = ['New', 'In Progress', 'Responded', 'Closed']

export default function FormSubmissionsDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activeRole, setActiveRole] = useState<AdminRole>('viewer')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'new' | 'in-progress' | 'responded' | 'closed'>('all')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<10 | 20 | 50>(20)
  const [pagination, setPagination] = useState<InboxPagination>({ page: 1, pageSize: 20, total: 0, totalPages: 1 })
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingIds, setDeletingIds] = useState<string[]>([])

  function getServerFilters() {
    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('pageSize', String(pageSize))
    if (search.trim()) params.set('q', search.trim())

    if (filter === 'unread') {
      params.set('status', 'all')
      params.set('read', 'unread')
    } else {
      params.set('read', 'all')
      params.set('status', filter)
    }
    return params
  }

  async function fetchInquiries(silent = false) {
    if (silent) {
      setRefreshing(true)
    } else {
      setLoading(true)
    }

    try {
      const params = getServerFilters()
      const res = await fetch(`/api/admin/contact-submissions?${params.toString()}`, { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Failed to fetch inquiries')
      setInquiries(Array.isArray(json.submissions) ? json.submissions : [])
      if (json.pagination) {
        setPagination({
          page: Number(json.pagination.page || 1),
          pageSize: Number(json.pagination.pageSize || pageSize),
          total: Number(json.pagination.total || 0),
          totalPages: Number(json.pagination.totalPages || 1),
        })
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fetch inquiries')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  async function fetchStats(silent = false) {
    try {
      const res = await fetch('/api/admin/dashboard-stats', { cache: 'no-store' })
      const json = await res.json()
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Failed to load dashboard stats')
      setStats(json)
    } catch (error) {
      if (!silent) {
        toast.error(error instanceof Error ? error.message : 'Failed to load dashboard stats')
      }
    }
  }

  useEffect(() => {
    fetchStats()
    void fetchAdminSessionInfo()
      .then((session) => {
        setActiveRole(session.role)
      })
      .catch(() => {
        setActiveRole('viewer')
      })
  }, [])

  useEffect(() => {
    fetchInquiries()
  }, [search, filter, page, pageSize])

  async function markAsRead(id: string) {
    try {
      const res = await fetch('/api/admin/contact-submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, read: true }),
      })
      if (!res.ok) return
      setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, read: true } : item)))
      setViewingInquiry((prev) => (prev && prev.id === id ? { ...prev, read: true } : prev))
    } catch {
      // Non-blocking.
    }
  }

  const handleOpenModal = async (inquiry: Inquiry) => {
    setViewingInquiry(inquiry)
    if (!inquiry.read) await markAsRead(inquiry.id)
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!canEdit) {
      toast.error('Your role cannot update lead status')
      return
    }
    try {
      const res = await fetch('/api/admin/contact-submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      })
      const json = await res.json()
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Failed to update status')

      toast.success('Status updated')
      setInquiries((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
      setViewingInquiry((prev) => (prev && prev.id === id ? { ...prev, status: newStatus } : prev))
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update status')
    }
  }

  const confirmDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setDeletingIds([id])
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (deletingIds.length === 0) return
    try {
      const res = await fetch(`/api/admin/contact-submissions?ids=${encodeURIComponent(deletingIds.join(','))}`, { method: 'DELETE' })
      const json = await res.json()
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Failed to delete inquiry')

      toast.success(deletingIds.length === 1 ? 'Inquiry deleted' : 'Selected inquiries deleted')
      setInquiries((prev) => prev.filter((item) => !deletingIds.includes(item.id)))
      setSelectedIds((prev) => prev.filter((id) => !deletingIds.includes(id)))
      if (viewingInquiry && deletingIds.includes(viewingInquiry.id)) setViewingInquiry(null)
      await fetchStats(true)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Error deleting inquiry')
    } finally {
      setIsDeleteModalOpen(false)
      setDeletingIds([])
    }
  }

  const unreadCount = stats?.totals.unread ?? inquiries.filter((item) => !item.read).length
  const canEdit = activeRole === 'owner' || activeRole === 'admin' || activeRole === 'editor'
  const canDelete = activeRole === 'owner' || activeRole === 'admin'
  const allVisibleSelected = inquiries.length > 0 && inquiries.every((item) => selectedIds.includes(item.id))

  useEffect(() => {
    setPage(1)
  }, [filter, search, pageSize])

  function toggleSelectOne(id: string) {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]))
  }

  function toggleSelectVisible() {
    if (allVisibleSelected) {
      setSelectedIds((prev) => prev.filter((id) => !inquiries.some((item) => item.id === id)))
      return
    }

    const next = new Set(selectedIds)
    for (const item of inquiries) next.add(item.id)
    setSelectedIds(Array.from(next))
  }

  async function bulkUpdate(payload: { read?: boolean; status?: string }) {
    if (selectedIds.length === 0) return
    if (!canEdit) {
      toast.error('Your role cannot update lead status')
      return
    }

    try {
      const res = await fetch('/api/admin/contact-submissions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: selectedIds, ...payload }),
      })
      const json = await res.json()
      if (!res.ok || !json?.ok) throw new Error(json?.error || 'Bulk update failed')
      toast.success('Bulk update completed')
      await fetchInquiries(true)
      await fetchStats(true)
      setSelectedIds([])
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Bulk update failed')
    }
  }

  function confirmDeleteMany() {
    if (!canDelete) {
      toast.error('Only admin or owner can delete submissions')
      return
    }
    if (selectedIds.length === 0) return
    setDeletingIds(selectedIds)
    setIsDeleteModalOpen(true)
  }

  function exportFilteredCsv() {
    const rows: string[][] = []
    const baseParams = getServerFilters()
    baseParams.set('page', '1')
    baseParams.set('pageSize', '100')

    const fetchAll = async () => {
      let currentPage = 1
      let totalPages = 1
      while (currentPage <= totalPages) {
        baseParams.set('page', String(currentPage))
        const res = await fetch(`/api/admin/contact-submissions?${baseParams.toString()}`, { cache: 'no-store' })
        const json = await res.json()
        if (!res.ok || !json?.ok) throw new Error(json?.error || 'Export failed')
        const pageItems = Array.isArray(json.submissions) ? json.submissions : []
        for (const item of pageItems) {
          rows.push([
            item.name,
            item.email,
            item.phone,
            item.business_type,
            item.status,
            item.source,
            item.created_at || '',
            String(item.message || '').replace(/\n/g, ' '),
          ])
        }
        totalPages = Number(json?.pagination?.totalPages || 1)
        currentPage += 1
      }
    }

    const run = async () => {
      try {
        await fetchAll()
      } catch (error) {
        toast.error(error instanceof Error ? error.message : 'Failed to export CSV')
        return
      }

      const header = ['Name', 'Email', 'Phone', 'Business Type', 'Status', 'Source', 'Created At', 'Message']
      const csv = [header, ...rows]
        .map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(','))
        .join('\n')

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `shubiq-leads-${new Date().toISOString().slice(0, 10)}.csv`
      link.click()
      URL.revokeObjectURL(url)
      toast.success('CSV export downloaded')
    }
    void run()
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel tracking-wide flex items-center gap-3">
            Contact Inbox
            {unreadCount > 0 && (
              <span className="text-xs bg-gold/10 border border-gold/30 text-gold px-2 py-0.5 rounded-full font-rajdhani uppercase tracking-wider font-bold">
                {unreadCount} NEW
              </span>
            )}
          </h1>
          <p className="text-[14px] font-medium text-cream/70 mt-1">Manage contact inquiries and studio leads from one queue.</p>
        </div>
        <div className="flex items-center gap-2">
          <AdminButton variant="secondary" onClick={exportFilteredCsv}>
            <Download size={14} />
            Export CSV
          </AdminButton>
          <AdminButton
            variant="secondary"
            onClick={async () => {
              await fetchInquiries(true)
              await fetchStats(true)
            }}
            disabled={refreshing}
          >
            <RefreshCw size={14} className={refreshing ? 'animate-spin' : ''} />
            Refresh
          </AdminButton>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Leads', value: stats?.totals.leads ?? inquiries.length, icon: ChartNoAxesColumn },
          { label: 'Unread', value: stats?.totals.unread ?? unreadCount, icon: Mail },
          { label: 'Today', value: stats?.totals.newToday ?? '-', icon: Activity },
          { label: 'Blog Posts', value: stats?.totals.blogPosts ?? '-', icon: Download },
        ].map((metric) => (
          <AdminCard key={metric.label} className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] uppercase tracking-[2px] text-cream/50">{metric.label}</p>
              <metric.icon size={14} className="text-gold/80" />
            </div>
            <p className="text-2xl font-semibold text-cream mt-2">{metric.value}</p>
          </AdminCard>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <AdminCard className="p-4 space-y-3">
          <h3 className="text-sm uppercase tracking-[2px] text-cream/70">Lead Pipeline</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="rounded border border-[rgb(var(--cream-rgb)/0.12)] p-3 bg-[rgb(var(--surface-1-rgb))]">
              <p className="text-cream/60 text-xs uppercase tracking-[2px]">New</p>
              <p className="text-cream text-lg mt-1">{stats?.leadStatus.new ?? 0}</p>
            </div>
            <div className="rounded border border-[rgb(var(--cream-rgb)/0.12)] p-3 bg-[rgb(var(--surface-1-rgb))]">
              <p className="text-cream/60 text-xs uppercase tracking-[2px]">In Progress</p>
              <p className="text-cream text-lg mt-1">{stats?.leadStatus.inProgress ?? 0}</p>
            </div>
            <div className="rounded border border-[rgb(var(--cream-rgb)/0.12)] p-3 bg-[rgb(var(--surface-1-rgb))]">
              <p className="text-cream/60 text-xs uppercase tracking-[2px]">Responded</p>
              <p className="text-cream text-lg mt-1">{stats?.leadStatus.responded ?? 0}</p>
            </div>
            <div className="rounded border border-[rgb(var(--cream-rgb)/0.12)] p-3 bg-[rgb(var(--surface-1-rgb))]">
              <p className="text-cream/60 text-xs uppercase tracking-[2px]">Closed</p>
              <p className="text-cream text-lg mt-1">{stats?.leadStatus.closed ?? 0}</p>
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[2px] text-cream/55 mb-2">Top Sources</p>
            <div className="flex flex-wrap gap-2">
              {(stats?.topSources ?? []).map((source) => (
                <span key={source.source} className="text-xs px-2 py-1 rounded border border-[rgb(var(--cream-rgb)/0.14)] text-cream/75">
                  {source.source}: {source.count}
                </span>
              ))}
            </div>
          </div>
        </AdminCard>

        <AdminCard className="p-4 space-y-3">
          <h3 className="text-sm uppercase tracking-[2px] text-cream/70">Recent Updates</h3>
          <div>
            <p className="text-xs uppercase tracking-[2px] text-gold/80 mb-2">Blog</p>
            <div className="space-y-2">
              {(stats?.recentBlog ?? []).slice(0, 3).map((post) => (
                <div key={post.id} className="text-xs border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-1-rgb))] rounded px-3 py-2">
                  <p className="text-cream/90">{post.title}</p>
                  <p className="text-cream/50 mt-1">{post.updatedAt ? new Date(post.updatedAt).toLocaleString() : '-'}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[2px] text-gold/80 mb-2">Content</p>
            <div className="space-y-2">
              {(stats?.recentContent ?? []).slice(0, 3).map((item) => (
                <div key={item.key} className="text-xs border border-[rgb(var(--cream-rgb)/0.12)] bg-[rgb(var(--surface-1-rgb))] rounded px-3 py-2 flex items-center justify-between">
                  <p className="text-cream/90">{item.key}</p>
                  <p className="text-cream/50">{item.updatedAt ? new Date(item.updatedAt).toLocaleDateString() : '-'}</p>
                </div>
              ))}
            </div>
          </div>
        </AdminCard>
      </div>

      <AdminCard className="p-0 overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex flex-col gap-3 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <Search size={16} className="text-cream/40" />
            <input
              type="text"
              placeholder="Search by name, email, phone, message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-[13px] text-cream placeholder:text-cream/40 w-full font-medium"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: 'All' },
              { key: 'unread', label: 'Unread' },
              { key: 'new', label: 'New' },
              { key: 'in-progress', label: 'In Progress' },
              { key: 'responded', label: 'Responded' },
              { key: 'closed', label: 'Closed' },
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
          {selectedIds.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[11px] uppercase tracking-[2px] text-gold/80 font-rajdhani">{selectedIds.length} selected</span>
              <AdminButton variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => bulkUpdate({ read: true })} disabled={!canEdit}>
                Mark Read
              </AdminButton>
              <AdminButton variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => bulkUpdate({ status: 'In Progress' })} disabled={!canEdit}>
                Set In Progress
              </AdminButton>
              <AdminButton variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => bulkUpdate({ status: 'Responded' })} disabled={!canEdit}>
                Set Responded
              </AdminButton>
              <AdminButton variant="danger" className="px-3 py-1.5 text-xs" onClick={confirmDeleteMany} disabled={!canDelete}>
                Delete Selected
              </AdminButton>
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center p-12 bg-[rgb(var(--surface-0-rgb))]">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : inquiries.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-cream/40 bg-[rgb(var(--surface-0-rgb))] text-center">
            <Mail size={32} className="mb-4 opacity-50 text-gold" />
            <p className="font-cinzel text-lg tracking-wider text-cream">Inbox Empty</p>
            <p className="text-[13px] mt-2">No submissions found for the selected filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-[rgb(var(--surface-0-rgb))] pb-10">
            <div className="px-6 py-3 border-b border-[rgb(var(--cream-rgb)/0.08)] flex flex-wrap items-center gap-3 bg-[rgb(var(--surface-1-rgb))]">
              <span className="text-xs text-cream/60">
                Showing {(pagination.page - 1) * pagination.pageSize + 1}-{Math.min(pagination.page * pagination.pageSize, pagination.total)} of {pagination.total}
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <label className="text-xs text-cream/50">Rows</label>
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value) as 10 | 20 | 50)}
                  className="bg-[rgb(var(--surface-0-rgb))] border border-[rgb(var(--cream-rgb)/0.16)] rounded px-2 py-1 text-xs text-cream"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
              </div>
            </div>
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#09090b]/50 text-cream/50 text-[10px] uppercase font-bold tracking-[0.1em] font-rajdhani">
                <tr className="border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))]">
                  <th className="px-6 py-4 font-bold w-8">
                    <button
                      type="button"
                      onClick={toggleSelectVisible}
                      className="text-cream/60 hover:text-gold transition-colors"
                      title={allVisibleSelected ? 'Unselect visible' : 'Select visible'}
                    >
                      {allVisibleSelected ? <CheckSquare size={14} /> : <Square size={14} />}
                    </button>
                  </th>
                  <th className="px-6 py-4 font-bold">Contact</th>
                  <th className="px-6 py-4 font-bold">Status / Source</th>
                  <th className="px-6 py-4 font-bold">Received</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(var(--cream-rgb)/0.05)]">
                {inquiries.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => handleOpenModal(item)}
                    className={`hover:bg-[rgb(var(--surface-1-rgb))] transition-colors group cursor-pointer ${!item.read ? 'bg-gold/5 border-l-2 border-l-gold' : 'border-l-2 border-l-transparent'}`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleSelectOne(item.id)
                          }}
                          className="text-cream/60 hover:text-gold transition-colors"
                          title={selectedIds.includes(item.id) ? 'Unselect' : 'Select'}
                        >
                          {selectedIds.includes(item.id) ? <CheckSquare size={14} /> : <Square size={14} />}
                        </button>
                        {!item.read ? <Mail size={16} className="text-gold" /> : <MailOpen size={16} className="text-cream/30" />}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className={`font-semibold ${!item.read ? 'text-cream' : 'text-cream/70'}`}>{item.name || 'Anonymous'}</p>
                      <p className="text-[12px] text-cream/40 mt-1">{item.email}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                            item.status === 'New'
                              ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              : item.status === 'Responded'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : item.status === 'In Progress'
                                  ? 'bg-gold/10 text-gold border border-gold/20'
                                  : 'bg-[rgb(var(--surface-1-rgb))] text-cream/50 border border-[rgb(var(--cream-rgb)/0.1)]'
                          }`}
                        >
                          {item.status || 'New'}
                        </span>
                        <span className="text-[11px] text-cream/40 mt-1">{item.source || 'Website Home'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-cream/50 text-[13px] font-medium">
                      {item.created_at
                        ? new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                        : '-'}
                    </td>
                    <td className="px-6 py-5 text-right">
                      {canDelete && (
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => confirmDelete(item.id, e)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-3 border-t border-[rgb(var(--cream-rgb)/0.08)] flex items-center justify-end gap-2 bg-[rgb(var(--surface-1-rgb))]">
              <AdminButton variant="secondary" className="px-3 py-1.5 text-xs" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={pagination.page <= 1}>
                Prev
              </AdminButton>
              <span className="text-xs text-cream/60 px-2">
                Page {pagination.page} / {pagination.totalPages}
              </span>
              <AdminButton
                variant="secondary"
                className="px-3 py-1.5 text-xs"
                onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={pagination.page >= pagination.totalPages}
              >
                Next
              </AdminButton>
            </div>
          </div>
        )}
      </AdminCard>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        title="Delete Submission?"
        message="This action cannot be undone. This contact form submission will be lost permanently."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {viewingInquiry && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-[rgb(var(--surface-0-rgb))] border-l border-[rgb(var(--cream-rgb)/0.08)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-cream font-cinzel">Message Details</h2>
                <p className="text-[12px] font-medium text-cream/50 mt-1">
                  {viewingInquiry.created_at ? new Date(viewingInquiry.created_at).toLocaleString() : 'Unknown time'}
                </p>
              </div>
              <button
                onClick={() => setViewingInquiry(null)}
                className="p-2 text-cream/50 hover:text-cream bg-[rgb(var(--surface-2-rgb))] rounded-lg transition-colors border border-transparent hover:border-[rgb(var(--cream-rgb)/0.1)]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.08)] p-4 rounded-lg">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block mb-1">Name</label>
                  <p className="text-cream text-[14px] font-medium">{viewingInquiry.name || '-'}</p>
                </div>
                <div className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.08)] p-4 rounded-lg">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block mb-1">Email</label>
                  <p className="text-cream text-[14px] font-medium">
                    <a href={`mailto:${viewingInquiry.email}`} className="text-gold hover:underline">
                      {viewingInquiry.email}
                    </a>
                  </p>
                </div>
                <div className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.08)] p-4 rounded-lg">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block mb-1">Phone</label>
                  <p className="text-cream text-[14px] font-medium">{viewingInquiry.phone || 'N/A'}</p>
                </div>
                <div className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.08)] p-4 rounded-lg">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block mb-1">Business Type</label>
                  <p className="text-cream text-[14px] font-medium">{viewingInquiry.business_type || 'N/A'}</p>
                </div>
              </div>

              <div className="border border-[rgb(var(--cream-rgb)/0.08)] rounded-lg p-5 bg-[rgb(var(--surface-1-rgb))] relative">
                <label className="absolute -top-3 left-4 bg-[rgb(var(--surface-1-rgb))] px-2 text-[10px] text-gold uppercase tracking-wider font-bold">Message</label>
                <div className="text-[14px] text-cream/90 leading-relaxed whitespace-pre-wrap font-medium">
                  {viewingInquiry.message || <span className="text-cream/30 italic">No message provided.</span>}
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block text-center">Update Status</label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {STATUS_OPTIONS.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(viewingInquiry.id, status)}
                      disabled={!canEdit}
                      className={`px-4 py-2 rounded-full text-[12px] font-bold tracking-wide transition-all uppercase ${
                        viewingInquiry.status === status
                          ? 'bg-gold text-[rgb(var(--surface-0-rgb))] shadow-[0_0_15px_rgba(var(--gold-rgb),0.3)]'
                          : 'bg-[rgb(var(--surface-2-rgb))] text-cream/50 hover:text-cream border border-[rgb(var(--cream-rgb)/0.1)]'
                      } ${!canEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center justify-between shrink-0">
              {canDelete ? (
                <button
                  onClick={() => confirmDelete(viewingInquiry.id)}
                  className="text-xs font-bold uppercase tracking-wider text-red-500/80 hover:text-red-400 flex items-center gap-2 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                >
                  <Trash2 size={14} /> Delete
                </button>
              ) : (
                <span className="text-xs text-cream/40 uppercase tracking-[2px]">Read Only</span>
              )}
              <AdminButton variant="secondary" onClick={() => setViewingInquiry(null)}>
                Close Window
              </AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
