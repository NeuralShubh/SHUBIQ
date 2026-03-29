'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminCard, AdminButton, ConfirmModal } from '@/components/admin/AdminUI'
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react'
import { toast } from 'sonner'

type Service = {
  id: string
  icon: string
  title: string
  desc: string
  tag: string
  order_index: number
}

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Service>>({})

  const supabase = createClient()

  const fetchServices = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('services').select('*').order('order_index', { ascending: true })
    if (error) {
      toast.error('Failed to fetch services: ' + error.message)
    } else {
      setServices(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setEditingId(service.id)
      setFormData(service)
    } else {
      setEditingId(null)
      setFormData({ icon: 'code', title: '', desc: '', tag: 'Core Service', order_index: services.length })
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!formData.title) {
      toast.error('Title is required')
      return
    }

    const payload = {
      icon: formData.icon,
      title: formData.title,
      desc: formData.desc,
      tag: formData.tag,
      order_index: formData.order_index || 0,
      updated_at: new Date().toISOString()
    }

    let error;
    if (editingId) {
      const res = await supabase.from('services').update(payload).eq('id', editingId)
      error = res.error
    } else {
      const res = await supabase.from('services').insert(payload)
      error = res.error
    }

    if (error) {
      toast.error('Error saving service: ' + error.message)
    } else {
      toast.success('Service saved successfully!')
      setIsModalOpen(false)
      fetchServices()
    }
  }

  const confirmDelete = (id: string) => {
    setDeletingId(id)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingId) return
    const { error } = await supabase.from('services').delete().eq('id', deletingId)
    if (error) {
      toast.error('Error deleting service: ' + error.message)
    } else {
      toast.success('Service deleted!')
      fetchServices()
    }
    setIsDeleteModalOpen(false)
    setDeletingId(null)
  }

  const filtered = services.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Services</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Manage core offerings and studio capabilities.</p>
        </div>
        <AdminButton onClick={() => handleOpenModal()} className="w-full sm:w-auto">
          <Plus size={16} /> New Service
        </AdminButton>
      </div>

      <AdminCard className="p-0 overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-[#27272a] bg-[#18181b] flex items-center gap-3 sticky top-0 z-10">
          <Search size={16} className="text-[#71717a]" />
          <input 
            type="text" 
            placeholder="Search services..."
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
            <p>No services found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#09090b]/50 text-[#71717a] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-medium">Service</th>
                  <th className="px-6 py-3 font-medium">Tag</th>
                  <th className="px-6 py-3 font-medium">Icon Map</th>
                  <th className="px-6 py-3 font-medium">Sort Order</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#27272a]/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white truncate max-w-[200px]">{p.title}</p>
                    </td>
                    <td className="px-6 py-4 text-[#a1a1aa]">{p.tag}</td>
                    <td className="px-6 py-4 text-[#a1a1aa]">{p.icon}</td>
                    <td className="px-6 py-4 text-[#a1a1aa]">{p.order_index}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(p)} className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] rounded-md transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => confirmDelete(p.id)} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-md transition-colors">
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
        title="Delete Service?" 
        message="This action cannot be undone. It will be removed from the public site immediately."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-[#09090b] border-l border-[#27272a] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-[#27272a] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Service' : 'New Service'}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#a1a1aa] hover:text-white rounded-lg">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-1.5">
                <label className="text-xs text-[#a1a1aa]">Title</label>
                <input type="text" className="admin-input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Tag (e.g. Core Service)</label>
                  <input type="text" className="admin-input" value={formData.tag || ''} onChange={e => setFormData({...formData, tag: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Icon Name (e.g. code)</label>
                  <input type="text" className="admin-input" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Order Index</label>
                  <input type="number" className="admin-input" value={formData.order_index || 0} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value, 10)})} />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs text-[#a1a1aa]">Description</label>
                <textarea className="admin-input min-h-[100px]" value={formData.desc || ''} onChange={e => setFormData({...formData, desc: e.target.value})} />
              </div>
            </div>
            <div className="p-5 border-t border-[#27272a] bg-[#18181b] shrink-0 flex items-center justify-end gap-3">
              <AdminButton variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
              <AdminButton variant="primary" onClick={handleSave}>Save</AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
