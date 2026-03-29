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

export default function InquiriesAdminPage() {
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
          <h1 className="text-2xl font-bold text-white flex items-center gap-3">
            Inquiries
            {unreadCount > 0 && (
              <span className="text-xs bg-[#3b82f6] text-white px-2 py-0.5 rounded-full">{unreadCount} new</span>
            )}
          </h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Manage contact form submissions.</p>
        </div>
      </div>

      <AdminCard className="p-0 overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-[#27272a] bg-[#18181b] flex items-center gap-3 sticky top-0 z-10">
          <Search size={16} className="text-[#71717a]" />
          <input 
            type="text" 
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-[#71717a] w-full"
          />
        </div>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="w-6 h-6 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-[#a1a1aa]">
            <p>No recent inquiries found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#09090b]/50 text-[#71717a] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-medium cursor-pointer w-8"></th>
                  <th className="px-6 py-3 font-medium">Contact</th>
                  <th className="px-6 py-3 font-medium">Status / Type</th>
                  <th className="px-6 py-3 font-medium">Received</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {filtered.map((i) => (
                  <tr 
                    key={i.id} 
                    onClick={() => handleOpenModal(i)}
                    className={`hover:bg-[#27272a]/30 transition-colors group cursor-pointer ${!i.is_read ? 'bg-[#3b82f6]/5' : ''}`}
                  >
                    <td className="px-6 py-4">
                      {!i.is_read ? <Mail size={16} className="text-[#3b82f6]" /> : <MailOpen size={16} className="text-[#71717a]" />}
                    </td>
                    <td className="px-6 py-4">
                      <p className={`font-semibold ${!i.is_read ? 'text-white' : 'text-[#a1a1aa]'}`}>{i.name || 'Anonymous'}</p>
                      <p className="text-xs text-[#71717a]">{i.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#a1a1aa] block text-xs mb-1">{i.status}</span>
                      <span className="px-2 py-1 bg-[#27272a] rounded-full text-xs text-[#a1a1aa]">{i.business_type || 'General'}</span>
                    </td>
                    <td className="px-6 py-4 text-[#a1a1aa]">
                      {new Date(i.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={(e) => confirmDelete(i.id, e)} className="p-1.5 text-red-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors">
                          <Trash2 size={16} />
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
        title="Delete Inquiry?" 
        message="This action cannot be undone. This contact form submission will be lost."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {/* Inquiry Detail Overlay */}
      {viewingInquiry && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-[#09090b] border-l border-[#27272a] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-[#27272a] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">Message Details</h2>
                <p className="text-xs text-[#a1a1aa]">{new Date(viewingInquiry.created_at).toLocaleString()}</p>
              </div>
              <button onClick={() => setViewingInquiry(null)} className="p-2 text-[#a1a1aa] hover:text-white rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#71717a] block mb-1">Name</label>
                  <p className="text-white text-sm">{viewingInquiry.name}</p>
                </div>
                <div>
                  <label className="text-xs text-[#71717a] block mb-1">Email</label>
                  <p className="text-white text-sm"><a href={'mailto:' + viewingInquiry.email} className="text-[#3b82f6] hover:underline">{viewingInquiry.email}</a></p>
                </div>
                {viewingInquiry.phone && (
                  <div>
                    <label className="text-xs text-[#71717a] block mb-1">Phone</label>
                    <p className="text-white text-sm">{viewingInquiry.phone}</p>
                  </div>
                )}
                <div>
                  <label className="text-xs text-[#71717a] block mb-1">Source</label>
                  <p className="text-[#a1a1aa] text-sm">{viewingInquiry.source || 'Website'}</p>
                </div>
              </div>

              <div className="border border-[#27272a] rounded-lg p-5 bg-[#18181b]">
                <label className="text-xs text-[#71717a] block mb-3 uppercase tracking-wider font-semibold">Message</label>
                <div className="text-sm text-[#e4e4e7] leading-relaxed whitespace-pre-wrap">
                  {viewingInquiry.message}
                </div>
              </div>

              <div className="pt-4 space-y-3 border-t border-[#27272a]">
                <label className="text-xs text-[#a1a1aa] font-medium block">Update Status</label>
                <div className="flex gap-2">
                  {['New', 'In Progress', 'Responded', 'Closed'].map(status => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(viewingInquiry.id, status)}
                      className={"px-3 py-1.5 rounded-md text-xs font-medium transition-colors " + (
                        viewingInquiry.status === status 
                        ? 'bg-[#3b82f6] text-white' 
                        : 'bg-[#27272a] text-[#a1a1aa] hover:text-white'
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[#27272a] bg-[#18181b] flex items-center justify-between shrink-0">
               <button onClick={() => confirmDelete(viewingInquiry.id)} className="text-sm text-red-500 hover:text-red-400 flex items-center gap-2">
                 <Trash2 size={16} /> Delete
               </button>
               <AdminButton variant="secondary" onClick={() => setViewingInquiry(null)}>Close</AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
