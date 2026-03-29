'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminCard, AdminButton, AdminBadge, ConfirmModal } from '@/components/admin/AdminUI'
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react'
import { toast } from 'sonner'

type Project = {
  id: string
  slug: string
  number: string
  title: string
  subtitle: string
  description: string
  category: string
  status: string
  videoUrl: string
  videoPoster: string
  liveUrl: string
  githubUrl: string
  techStack: string[]
  impact: { headline: string; description: string }
  features: string[]
  year: string
  duration: string
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({})

  const supabase = createClient()

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('projects_admin').select('*').order('created_at', { ascending: false })
    if (error) {
      toast.error('Failed to fetch projects: ' + error.message)
    } else {
      // Parse JSONB fields
      const parsed = data.map(p => ({
        ...p,
        techStack: typeof p.techStack === 'string' ? JSON.parse(p.techStack) : p.techStack || [],
        impact: typeof p.impact === 'string' ? JSON.parse(p.impact) : p.impact || { headline: '', description: '' },
        features: typeof p.features === 'string' ? JSON.parse(p.features) : p.features || []
      }))
      setProjects(parsed)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleOpenModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id)
      setFormData(project)
    } else {
      setEditingId(null)
      setFormData({
        slug: '', number: '01', title: '', subtitle: '', description: '',
        category: 'Agency', status: 'Dev', videoUrl: '', videoPoster: '',
        liveUrl: '', githubUrl: '', techStack: [], features: [],
        impact: { headline: '', description: '' }, year: new Date().getFullYear().toString(), duration: ''
      })
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      toast.error('Title and Slug are required')
      return
    }

    const payload = {
      slug: formData.slug,
      number: formData.number,
      title: formData.title,
      subtitle: formData.subtitle,
      description: formData.description,
      category: formData.category,
      status: formData.status,
      videoUrl: formData.videoUrl,
      videoPoster: formData.videoPoster,
      liveUrl: formData.liveUrl,
      githubUrl: formData.githubUrl,
      techStack: formData.techStack || [],
      impact: formData.impact || { headline: '', description: '' },
      features: formData.features || [],
      year: formData.year,
      duration: formData.duration,
      updated_at: new Date().toISOString()
    }

    let error;
    if (editingId) {
      const res = await supabase.from('projects_admin').update(payload).eq('id', editingId)
      error = res.error
    } else {
      const res = await supabase.from('projects_admin').insert(payload)
      error = res.error
    }

    if (error) {
      toast.error('Error saving project: ' + error.message)
    } else {
      toast.success('Project saved successfully!')
      setIsModalOpen(false)
      fetchProjects()
    }
  }

  const confirmDelete = (id: string) => {
    setDeletingId(id)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingId) return
    const { error } = await supabase.from('projects_admin').delete().eq('id', deletingId)
    if (error) {
      toast.error('Error deleting project: ' + error.message)
    } else {
      toast.success('Project deleted!')
      fetchProjects()
    }
    setIsDeleteModalOpen(false)
    setDeletingId(null)
  }

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.slug.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Manage the digital portfolio and client builds.</p>
        </div>
        <AdminButton onClick={() => handleOpenModal()} className="w-full sm:w-auto">
          <Plus size={16} /> New Project
        </AdminButton>
      </div>

      <AdminCard className="p-0 overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-[#27272a] bg-[#18181b] flex items-center gap-3 sticky top-0 z-10">
          <Search size={16} className="text-[#71717a]" />
          <input 
            type="text" 
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-[#71717a] w-full"
          />
        </div>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="w-6 h-6 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-[#a1a1aa]">
            <p>No projects found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#09090b]/50 text-[#71717a] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-medium">Project</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Year</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {filteredProjects.map((p) => (
                  <tr key={p.id} className="hover:bg-[#27272a]/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white">{p.title}</p>
                      <p className="text-xs text-[#71717a]">{p.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-[#a1a1aa]">{p.category}</td>
                    <td className="px-6 py-4">
                      <AdminBadge status={p.status} />
                    </td>
                    <td className="px-6 py-4 text-[#a1a1aa]">{p.year}</td>
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
        title="Delete Project?" 
        message="This action cannot be undone. This project will be permanently removed from the website."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {/* Project Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl h-full bg-[#09090b] border-l border-[#27272a] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="flex items-center justify-between p-5 border-b border-[#27272a] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Project' : 'New Project'}</h2>
                <p className="text-xs text-[#a1a1aa]">Update project details and settings.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Title</label>
                  <input type="text" className="admin-input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. BuildWithShubh" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Slug (URL)</label>
                  <input type="text" className="admin-input" value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} placeholder="e.g. buildwithshubh" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Number (e.g. 01)</label>
                  <input type="text" className="admin-input" value={formData.number || ''} onChange={e => setFormData({...formData, number: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Category</label>
                  <select className="admin-input appearance-none" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Agency">Agency</option>
                    <option value="Studio">Studio</option>
                    <option value="Crypto">Crypto</option>
                    <option value="App">App</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#a1a1aa] font-medium">Subtitle</label>
                <input type="text" className="admin-input" value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#a1a1aa] font-medium">Description</label>
                <textarea className="admin-input min-h-[100px] resize-y" value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Status</label>
                  <select className="admin-input appearance-none" value={formData.status || ''} onChange={e => setFormData({...formData, status: e.target.value})}>
                    <option value="Live">Live</option>
                    <option value="Dev">Dev</option>
                    <option value="Planned">Planned</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Year</label>
                  <input type="text" className="admin-input" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Live URL</label>
                  <input type="text" className="admin-input" value={formData.liveUrl || ''} onChange={e => setFormData({...formData, liveUrl: e.target.value})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">GitHub URL</label>
                  <input type="text" className="admin-input" value={formData.githubUrl || ''} onChange={e => setFormData({...formData, githubUrl: e.target.value})} />
                </div>
              </div>

              <div className="space-y-4 border-t border-[#27272a] pt-6">
                <h3 className="text-sm font-semibold text-white">Impact Section</h3>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Headline</label>
                  <input type="text" className="admin-input" value={formData.impact?.headline || ''} onChange={e => setFormData({...formData, impact: { ...formData.impact!, headline: e.target.value }})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Detailed Description</label>
                  <textarea className="admin-input min-h-[80px]" value={formData.impact?.description || ''} onChange={e => setFormData({...formData, impact: { ...formData.impact!, description: e.target.value }})} />
                </div>
              </div>
            </div>

            <div className="p-5 border-t border-[#27272a] bg-[#18181b] shrink-0 flex items-center justify-end gap-3">
              <AdminButton variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
              <AdminButton variant="primary" onClick={handleSave}>Save Project</AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
