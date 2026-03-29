'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminCard, AdminButton, ConfirmModal } from '@/components/admin/AdminUI'
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react'
import { toast } from 'sonner'

type PricingPlan = {
  id: string
  tier: string
  tag: string
  best_for: string
  price: number
  price_suffix: string
  meta: string
  features: string[]
  cta: string
  highlighted: boolean
  icon: string
  order_index: number
}

export default function PricingAdminPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<PricingPlan>>({})
  const [featuresString, setFeaturesString] = useState('')

  const supabase = createClient()

  const fetchPlans = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('studio_pricing_plans').select('*').order('order_index', { ascending: true })
    if (error) {
      toast.error('Failed to fetch pricing plans: ' + error.message)
    } else {
      const parsed = data.map(p => ({
        ...p,
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features || []
      }))
      setPlans(parsed)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  const handleOpenModal = (plan?: PricingPlan) => {
    if (plan) {
      setEditingId(plan.id)
      setFormData(plan)
      setFeaturesString(plan.features.join('\n'))
    } else {
      setEditingId(null)
      setFormData({
        tier: 'BASIC', tag: 'Core', best_for: 'Startups',
        price: 9999, price_suffix: '', meta: 'One-time',
        cta: 'Get Started', highlighted: false, icon: 'zap', order_index: plans.length
      })
      setFeaturesString('3 custom pages\nResponsive layout\nContact form')
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!formData.tier) {
      toast.error('Tier name is required')
      return
    }

    const payload = {
      tier: formData.tier,
      tag: formData.tag,
      best_for: formData.best_for,
      price: formData.price || 0,
      price_suffix: formData.price_suffix || '',
      meta: formData.meta,
      features: featuresString.split('\n').map(f => f.trim()).filter(Boolean),
      cta: formData.cta,
      highlighted: formData.highlighted || false,
      icon: formData.icon,
      order_index: formData.order_index || 0,
      updated_at: new Date().toISOString()
    }

    let error;
    if (editingId) {
      const res = await supabase.from('studio_pricing_plans').update(payload).eq('id', editingId)
      error = res.error
    } else {
      const res = await supabase.from('studio_pricing_plans').insert(payload)
      error = res.error
    }

    if (error) {
      toast.error('Error saving plan: ' + error.message)
    } else {
      toast.success('Pricing plan saved successfully!')
      setIsModalOpen(false)
      fetchPlans()
    }
  }

  const confirmDelete = (id: string) => {
    setDeletingId(id)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingId) return
    const { error } = await supabase.from('studio_pricing_plans').delete().eq('id', deletingId)
    if (error) {
      toast.error('Error deleting plan: ' + error.message)
    } else {
      toast.success('Plan deleted!')
      fetchPlans()
    }
    setIsDeleteModalOpen(false)
    setDeletingId(null)
  }

  const filtered = plans.filter(p => 
    p.tier.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Pricing Plans</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Manage studio offerings and productized tiers.</p>
        </div>
        <AdminButton onClick={() => handleOpenModal()} className="w-full sm:w-auto">
          <Plus size={16} /> New Plan
        </AdminButton>
      </div>

      <AdminCard className="p-0 overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-[#27272a] bg-[#18181b] flex items-center gap-3 sticky top-0 z-10">
          <Search size={16} className="text-[#71717a]" />
          <input 
            type="text" 
            placeholder="Search plans..."
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
            <p>No pricing plans found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#09090b]/50 text-[#71717a] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-medium">Tier Name</th>
                  <th className="px-6 py-3 font-medium">Price</th>
                  <th className="px-6 py-3 font-medium">Highlighted</th>
                  <th className="px-6 py-3 font-medium">Sort Order</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#27272a]/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">{p.tier}</p>
                      <p className="text-xs text-[#71717a]">{p.meta}</p>
                    </td>
                    <td className="px-6 py-4 text-[#a1a1aa]">
                      <span className="text-gold">₹{p.price.toLocaleString()}</span>{p.price_suffix}
                    </td>
                    <td className="px-6 py-4">
                      <span className={"px-2 py-1 text-xs rounded-full " + (p.highlighted ? 'bg-[#3b82f6]/20 text-[#3b82f6]' : 'bg-[#27272a] text-[#a1a1aa]')}>
                        {p.highlighted ? 'Yes' : 'No'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[#a1a1aa]">{p.order_index}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenModal(p)} className="p-1.5 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] rounded-md transition-colors">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => confirmDelete(p.id)} className="p-1.5 text-red-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors">
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
        title="Delete Plan?" 
        message="This action cannot be undone. It will be removed from the public website immediately."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl h-full bg-[#09090b] border-l border-[#27272a] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-5 border-b border-[#27272a] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Plan' : 'New Plan'}</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#a1a1aa] hover:text-white rounded-lg">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Tier Name (e.g. PREMIUM)</label>
                  <input type="text" className="admin-input" value={formData.tier || ''} onChange={e => setFormData({...formData, tier: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Tagline / Badge</label>
                  <input type="text" className="admin-input" value={formData.tag || ''} onChange={e => setFormData({...formData, tag: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Target Audience (Best for)</label>
                  <input type="text" className="admin-input" value={formData.best_for || ''} onChange={e => setFormData({...formData, best_for: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Meta Description</label>
                  <input type="text" className="admin-input" value={formData.meta || ''} onChange={e => setFormData({...formData, meta: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 border-y border-[#27272a] py-4 my-4">
                <div className="space-y-1.5 col-span-2">
                  <label className="text-xs text-[#a1a1aa]">Price (Number only)</label>
                  <input type="number" className="admin-input" value={formData.price || 0} onChange={e => setFormData({...formData, price: parseInt(e.target.value, 10)})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Suffix (e.g. +)</label>
                  <input type="text" className="admin-input" value={formData.price_suffix || ''} onChange={e => setFormData({...formData, price_suffix: e.target.value})} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#a1a1aa]">Features List (One per line)</label>
                <textarea className="admin-input min-h-[120px] whitespace-pre-wrap" value={featuresString} onChange={e => setFeaturesString(e.target.value)} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Call To Action Text</label>
                  <input type="text" className="admin-input" value={formData.cta || ''} onChange={e => setFormData({...formData, cta: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Icon Tag</label>
                  <input type="text" className="admin-input" value={formData.icon || ''} onChange={e => setFormData({...formData, icon: e.target.value})} />
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa]">Order Index</label>
                  <input type="number" className="admin-input w-24" value={formData.order_index || 0} onChange={e => setFormData({...formData, order_index: parseInt(e.target.value, 10)})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] block">Highlight Plan</label>
                  <div className="h-10 flex items-center px-1">
                    <input type="checkbox" checked={formData.highlighted || false} onChange={e => setFormData({...formData, highlighted: e.target.checked})} className="scale-125 accent-[#3b82f6]" />
                  </div>
                </div>
              </div>

            </div>
            <div className="p-5 border-t border-[#27272a] bg-[#18181b] flex justify-end gap-3 shrink-0">
              <AdminButton variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
              <AdminButton variant="primary" onClick={handleSave}>Save Plan</AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
