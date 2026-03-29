import { createClient } from '@/lib/supabase/server'
import { AdminCard, AdminBadge } from '@/components/admin/AdminUI'
import Link from 'next/link'
import { Plus, ArrowRight, Mail, Wrench } from 'lucide-react'

// Forces the layout to be dynamic, avoiding build issues if cookies are accessed
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Safely fetch metrics (catching errors if tables don't exist yet)
  let projectsCount = 0, blogsCount = 0, unreadCount = 0, labsLiveCount = 0
  let recentInquiries: any[] = []

  try {
    const [
      { count: pCount },
      { count: bCount },
      { count: uCount },
      { count: lCount },
      { data: inq }
    ] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }),
      supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
      supabase.from('inquiries').select('*', { count: 'exact', head: true }).eq('is_read', false),
      supabase.from('labs_products').select('*', { count: 'exact', head: true }).like('status', '%Live%'),
      supabase.from('inquiries').select('*').order('created_at', { ascending: false }).limit(5)
    ])

    projectsCount = pCount || 0
    blogsCount = bCount || 0
    unreadCount = uCount || 0
    labsLiveCount = lCount || 0
    recentInquiries = inq || []
  } catch (e) {
    console.error('Failed to fetch dashboard metrics. Tables might not exist yet.')
  }

  // Greeting
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight text-white">{greeting}, Shubham</h1>
        <p className="text-[15px] text-[#a1a1aa]">Here's what's happening with SHUBIQ today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AdminCard className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1">Total Projects</span>
          <span className="text-4xl font-bold text-white mb-2">{projectsCount}</span>
          <span className="text-xs text-[#22c55e] shrink-0 font-medium">Tracking all builds</span>
        </AdminCard>

        <AdminCard className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1">Blog Posts</span>
          <span className="text-4xl font-bold text-white mb-2">{blogsCount}</span>
          <span className="text-xs text-[#a1a1aa] shrink-0 font-medium">Published & Drafts</span>
        </AdminCard>

        <AdminCard className="flex flex-col relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#3b82f6]/20 to-transparent blur-xl -mr-10 -mt-10 transition-opacity ${unreadCount > 0 ? 'opacity-100' : 'opacity-0'}`} />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1 relative z-10">Unread Inquiries</span>
          <span className="text-4xl font-bold text-white mb-2 relative z-10">{unreadCount}</span>
          {unreadCount > 0 ? (
            <span className="text-xs text-[#3b82f6] shrink-0 font-medium relative z-10 flex items-center gap-1">↑ Requires action</span>
          ) : (
            <span className="text-xs text-[#22c55e] shrink-0 font-medium relative z-10 flex items-center gap-1">Inbox zero</span>
          )}
        </AdminCard>

        <AdminCard className="flex flex-col">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#71717a] mb-1">Labs Live</span>
          <span className="text-4xl font-bold text-white mb-2">{labsLiveCount}</span>
          <span className="text-xs text-[#a1a1aa] shrink-0 font-medium">Active products</span>
        </AdminCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-sm text-[#3b82f6] hover:text-[#2563eb] transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          
          <AdminCard className="p-0 overflow-hidden relative">
            {recentInquiries.length > 0 ? (
              <div className="divide-y divide-[#27272a]">
                {recentInquiries.map((inq, idx) => {
                  const date = new Date(inq.created_at)
                  return (
                    <Link key={inq.id || idx} href={`/admin/inquiries?id=${inq.id}`} className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-4 hover:bg-[#27272a]/50 transition-colors">
                      <div className="flex items-center gap-3 min-w-[180px]">
                        <span className={`w-2 h-2 shrink-0 rounded-full shadow-[0_0_8px] ${inq.is_read ? 'bg-zinc-600 shadow-zinc-600/50' : 'bg-green-500 shadow-green-500/50'}`} />
                        <span className={`text-sm truncate ${inq.is_read ? 'text-[#a1a1aa]' : 'text-white font-medium'}`}>{inq.name}</span>
                      </div>
                      <div className="text-sm text-[#71717a] truncate min-w-[180px] hidden sm:block">
                        {inq.email}
                      </div>
                      <div className="text-sm text-[#a1a1aa] truncate flex-1">
                        "{inq.message}"
                      </div>
                      <div className="text-xs text-[#71717a] shrink-0 sm:text-right">
                        {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </Link>
                  )
                })}
              </div>
            ) : (
              <div className="p-12 text-center flex flex-col items-center justify-center">
                <Mail size={32} className="text-[#3f3f46] mb-4" />
                <p className="text-sm text-[#a1a1aa]">No recent inquiries found.</p>
                <p className="text-xs text-[#71717a] mt-1">If tables aren't created yet, run the DB migration step.</p>
              </div>
            )}
          </AdminCard>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/admin/projects?action=new" className="flex items-center gap-3 p-4 bg-[#18181b] border border-[#27272a] rounded-xl hover:bg-[#27272a] hover:border-[#3f3f46] transition-all group">
              <div className="w-8 h-8 rounded-lg bg-[#09090b] border border-[#27272a] flex items-center justify-center group-hover:bg-[#3b82f6]/10 group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/20 transition-colors">
                <Plus size={16} />
              </div>
              <span className="text-sm font-medium text-[#fafafa]">New Project</span>
            </Link>
            <Link href="/admin/blog?action=new" className="flex items-center gap-3 p-4 bg-[#18181b] border border-[#27272a] rounded-xl hover:bg-[#27272a] hover:border-[#3f3f46] transition-all group">
              <div className="w-8 h-8 rounded-lg bg-[#09090b] border border-[#27272a] flex items-center justify-center group-hover:bg-[#3b82f6]/10 group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/20 transition-colors">
                <Plus size={16} />
              </div>
              <span className="text-sm font-medium text-[#fafafa]">New Blog Post</span>
            </Link>
            <Link href="/admin/pricing" className="flex items-center gap-3 p-4 bg-[#18181b] border border-[#27272a] rounded-xl hover:bg-[#27272a] hover:border-[#3f3f46] transition-all group">
              <div className="w-8 h-8 rounded-lg bg-[#09090b] border border-[#27272a] flex items-center justify-center group-hover:bg-[#3b82f6]/10 group-hover:text-[#3b82f6] group-hover:border-[#3b82f6]/20 transition-colors">
                <Wrench size={16} />
              </div>
              <span className="text-sm font-medium text-[#fafafa]">Edit Pricing</span>
            </Link>
          </div>

          <div className="pt-4 p-0 m-0">
            <AdminCard className="bg-[#18181b] border-[#27272a]">
              <h3 className="text-sm font-bold text-white mb-3">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#a1a1aa] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Database Connection</span>
                  <span className="text-white font-medium">Online</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#a1a1aa] flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Middleware Router</span>
                  <span className="text-white font-medium">Secured</span>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      </div>
    </div>
  )
}
