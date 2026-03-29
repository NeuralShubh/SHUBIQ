'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminCard, AdminButton, ConfirmModal } from '@/components/admin/AdminUI'
import { Trash2, Search, X, MailOpen, Mail } from 'lucide-react'
import { toast } from 'sonner'


type Inquiry = {
  id: string
  name: string
  email: string
  phone: string
  message: string
  source: string
  business_type: string
  status: string
  is_read: boolean
  created_at: string
}

export default function FormSubmissionsDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [viewingInquiry, setViewingInquiry] = useState<Inquiry | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const supabase = createClient()

  const fetchInquiries = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false })
    if (error) {
      toast.error('Failed to fetch inquiries: ' + error.message)
    } else {
      setInquiries(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const handleOpenModal = async (i: Inquiry) => {
    setViewingInquiry(i)
    if (!i.is_read) {
      // Mark as read immediately
      await supabase.from('contact_submissions').update({ is_read: true }).eq('id', i.id)
      fetchInquiries() // Background refresh
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    const { error } = await supabase.from('contact_submissions').update({ status: newStatus }).eq('id', id)
    if (error) {
      toast.error('Failed to update status')
    } else {
      toast.success('Status updated!')
      fetchInquiries()
      if (viewingInquiry && viewingInquiry.id === id) {
        setViewingInquiry({ ...viewingInquiry, status: newStatus })
      }
    }
  }

  const confirmDelete = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setDeletingId(id)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingId) return
    const { error } = await supabase.from('contact_submissions').delete().eq('id', deletingId)
    if (error) {
      toast.error('Error deleting inquiry: ' + error.message)
    } else {
      toast.success('Inquiry deleted!')
      fetchInquiries()
      if (viewingInquiry?.id === deletingId) setViewingInquiry(null)
    }
    setIsDeleteModalOpen(false)
    setDeletingId(null)
  }

  const filtered = inquiries.filter(p => 
    (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.email || '').toLowerCase().includes(search.toLowerCase())
  )

  const unreadCount = inquiries.filter(i => !i.is_read).length

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-cream font-cinzel tracking-wide flex items-center gap-3">
            Form Submissions
            {unreadCount > 0 && (
              <span className="text-xs bg-gold/10 border border-gold/30 text-gold px-2 py-0.5 rounded-full font-rajdhani uppercase tracking-wider font-bold">
                {unreadCount} NEW
              </span>
            )}
          </h1>
          <p className="text-[14px] font-medium text-cream/70 mt-1">Review contact inquiries and project onboarding briefs.</p>
        </div>
      </div>

      <AdminCard className="p-0 overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center gap-3 sticky top-0 z-10">
          <Search size={16} className="text-cream/40" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-[13px] text-cream placeholder:text-cream/40 w-full font-medium"
          />
        </div>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center p-12 bg-[rgb(var(--surface-0-rgb))]">
            <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-cream/40 bg-[rgb(var(--surface-0-rgb))] text-center">
            <Mail size={32} className="mb-4 opacity-50 text-gold" />
            <p className="font-cinzel text-lg tracking-wider text-cream">Inbox Empty</p>
            <p className="text-[13px] mt-2">No contact or studio briefs found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-[rgb(var(--surface-0-rgb))] pb-10">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#09090b]/50 text-cream/50 text-[10px] uppercase font-bold tracking-[0.1em] font-rajdhani">
                <tr className="border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))]">
                  <th className="px-6 py-4 font-bold w-8"></th>
                  <th className="px-6 py-4 font-bold">Contact</th>
                  <th className="px-6 py-4 font-bold">Status / Source</th>
                  <th className="px-6 py-4 font-bold">Received</th>
                  <th className="px-6 py-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgb(var(--cream-rgb)/0.05)]">
                {filtered.map((i) => (
                  <tr 
                    key={i.id} 
                    onClick={() => handleOpenModal(i)}
                    className={`hover:bg-[rgb(var(--surface-1-rgb))] transition-colors group cursor-pointer ${!i.is_read ? 'bg-gold/5 border-l-2 border-l-gold' : 'border-l-2 border-l-transparent'}`}
                  >
                    <td className="px-6 py-5">
                      {!i.is_read ? <Mail size={16} className="text-gold" /> : <MailOpen size={16} className="text-cream/30" />}
                    </td>
                    <td className="px-6 py-5">
                      <p className={`font-semibold ${!i.is_read ? 'text-cream' : 'text-cream/70'} flex items-center gap-2`}>
                        {i.name || 'Anonymous'}
                      </p>
                      <p className="text-[12px] text-cream/40 mt-1">{i.email}</p>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1 items-start">
                         <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                           i.status === 'New' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                           i.status === 'Responded' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 
                           i.status === 'In Progress' ? 'bg-gold/10 text-gold border border-gold/20' :
                           'bg-[rgb(var(--surface-1-rgb))] text-cream/50 border border-[rgb(var(--cream-rgb)/0.1)]'
                         }`}>
                           {i.status || 'New'}
                         </span>
                         <span className="text-[11px] text-cream/40 mt-1">{i.source || 'Website Home'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-cream/50 text-[13px] font-medium">
                      {new Date(i.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => confirmDelete(i.id, e)} className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {/* Inquiry Detail Overlay */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-[rgb(var(--surface-0-rgb))] border-l border-[rgb(var(--cream-rgb)/0.08)] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-cream font-cinzel">Message Details</h2>
                <p className="text-[12px] font-medium text-cream/50 mt-1 flex items-center gap-1">
                  Received via <span className="text-gold uppercase tracking-wider text-[10px] font-bold bg-gold/10 px-1 py-0.5 rounded">{viewingInquiry.source || 'Website'}</span>
                  • {new Date(viewingInquiry.created_at).toLocaleString()}
                </p>
              </div>
              <button onClick={() => setViewingInquiry(null)} className="p-2 text-cream/50 hover:text-cream bg-[rgb(var(--surface-2-rgb))] rounded-lg transition-colors border border-transparent hover:border-[rgb(var(--cream-rgb)/0.1)]">
                <X size={16} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.08)] p-4 rounded-lg">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block mb-1">Name</label>
                  <p className="text-cream text-[14px] font-medium">{viewingInquiry.name}</p>
                </div>
                <div className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.08)] p-4 rounded-lg">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block mb-1">Email</label>
                  <p className="text-cream text-[14px] font-medium"><a href={'mailto:' + viewingInquiry.email} className="text-gold hover:underline">{viewingInquiry.email}</a></p>
                </div>
                {(viewingInquiry.phone || viewingInquiry.business_type) && (
                  <>
                    <div className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.08)] p-4 rounded-lg">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block mb-1">Phone</label>
                      <p className="text-cream text-[14px] font-medium">{viewingInquiry.phone || 'N/A'}</p>
                    </div>
                    <div className="bg-[rgb(var(--surface-1-rgb))] border border-[rgb(var(--cream-rgb)/0.08)] p-4 rounded-lg">
                      <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block mb-1">Business Type</label>
                      <p className="text-cream text-[14px] font-medium">{viewingInquiry.business_type || 'N/A'}</p>
                    </div>
                  </>
                )}
              </div>

              <div className="border border-[rgb(var(--cream-rgb)/0.08)] rounded-lg p-5 bg-[rgb(var(--surface-1-rgb))] relative">
                <label className="absolute -top-3 left-4 bg-[rgb(var(--surface-1-rgb))] px-2 text-[10px] text-cream/50 text-gold uppercase tracking-wider font-bold">Message Contents</label>
                <div className="text-[14px] text-cream/90 leading-relaxed whitespace-pre-wrap font-medium">
                  {viewingInquiry.message || <span className="text-cream/30 italic">No message provided.</span>}
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <label className="text-[11px] font-bold uppercase tracking-widest text-cream/40 block text-center">Update Progress Status</label>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['New', 'In Progress', 'Responded', 'Closed'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(viewingInquiry.id, status)}
                      className={"px-4 py-2 rounded-full text-[12px] font-bold tracking-wide transition-all uppercase " + (
                        viewingInquiry.status === status 
                        ? 'bg-gold text-[rgb(var(--surface-0-rgb))] shadow-[0_0_15px_rgba(var(--gold-rgb),0.3)]' 
                        : 'bg-[rgb(var(--surface-2-rgb))] text-cream/50 hover:text-cream border border-[rgb(var(--cream-rgb)/0.1)]'
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[rgb(var(--cream-rgb)/0.08)] bg-[rgb(var(--surface-1-rgb))] flex items-center justify-between shrink-0">
               <button onClick={() => confirmDelete(viewingInquiry.id)} className="text-xs font-bold uppercase tracking-wider text-red-500/80 hover:text-red-400 flex items-center gap-2 hover:bg-red-500/10 px-3 py-2 rounded-lg transition-colors border border-transparent hover:border-red-500/20">
                 <Trash2 size={14} /> Delete
               </button>
               <AdminButton variant="secondary" onClick={() => setViewingInquiry(null)}>Close Window</AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
