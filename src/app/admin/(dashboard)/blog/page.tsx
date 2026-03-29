'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { AdminCard, AdminButton, ConfirmModal } from '@/components/admin/AdminUI'
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react'
import { toast } from 'sonner'

type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  author: string
  tags: string[]
  content: any[]
  readingTime: number
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<BlogPost>>({})
  const [contentString, setContentString] = useState('')

  const supabase = createClient()

  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false })
    if (error) {
      toast.error('Failed to fetch posts: ' + error.message)
    } else {
      const parsed = data.map(p => ({
        ...p,
        tags: typeof p.tags === 'string' ? JSON.parse(p.tags) : p.tags || [],
        content: typeof p.content === 'string' ? JSON.parse(p.content) : p.content || []
      }))
      setPosts(parsed)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleOpenModal = (post?: BlogPost) => {
    if (post) {
      setEditingId(post.id)
      setFormData(post)
      setContentString(JSON.stringify(post.content || [], null, 2))
    } else {
      setEditingId(null)
      setFormData({
        slug: '', title: '', excerpt: '', category: 'Productivity',
        date: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        author: 'Shubham', tags: [], readingTime: 5
      })
      setContentString('[\n  { "type": "p", "content": "Start writing here..." }\n]')
    }
    setIsModalOpen(true)
  }

  const handleSave = async () => {
    if (!formData.title || !formData.slug) {
      toast.error('Title and Slug are required')
      return
    }

    let parsedContent = []
    try {
      if (contentString.trim()) {
        parsedContent = JSON.parse(contentString)
      }
    } catch (e: any) {
      toast.error('Invalid JSON in content blocks: ' + e.message)
      return
    }

    const payload = {
      slug: formData.slug,
      title: formData.title,
      excerpt: formData.excerpt,
      category: formData.category,
      date: formData.date,
      author: formData.author,
      tags: formData.tags || [],
      content: parsedContent,
      readingTime: formData.readingTime || 5,
      updated_at: new Date().toISOString()
    }

    let error;
    if (editingId) {
      const res = await supabase.from('blog_posts').update(payload).eq('id', editingId)
      error = res.error
    } else {
      const res = await supabase.from('blog_posts').insert(payload)
      error = res.error
    }

    if (error) {
      toast.error('Error saving post: ' + error.message)
    } else {
      toast.success('Post saved successfully!')
      setIsModalOpen(false)
      fetchPosts()
    }
  }

  const confirmDelete = (id: string) => {
    setDeletingId(id)
    setIsDeleteModalOpen(true)
  }

  const handleDelete = async () => {
    if (!deletingId) return
    const { error } = await supabase.from('blog_posts').delete().eq('id', deletingId)
    if (error) {
      toast.error('Error deleting post: ' + error.message)
    } else {
      toast.success('Post deleted!')
      fetchPosts()
    }
    setIsDeleteModalOpen(false)
    setDeletingId(null)
  }

  const filteredPosts = posts.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.slug.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Manage field notes and insights.</p>
        </div>
        <AdminButton onClick={() => handleOpenModal()} className="w-full sm:w-auto">
          <Plus size={16} /> New Post
        </AdminButton>
      </div>

      <AdminCard className="p-0 overflow-hidden flex flex-col min-h-[400px]">
        <div className="p-4 border-b border-[#27272a] bg-[#18181b] flex items-center gap-3 sticky top-0 z-10">
          <Search size={16} className="text-[#71717a]" />
          <input 
            type="text" 
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-sm text-white placeholder:text-[#71717a] w-full"
          />
        </div>
        
        {loading ? (
          <div className="flex-1 flex items-center justify-center p-12">
            <div className="w-6 h-6 border-2 border-[#3b82f6] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-[#a1a1aa]">
            <p>No posts found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#09090b]/50 text-[#71717a] text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-medium">Post Title</th>
                  <th className="px-6 py-3 font-medium">Category</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272a]">
                {filteredPosts.map((p) => (
                  <tr key={p.id} className="hover:bg-[#27272a]/30 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-white truncate max-w-[250px]">{p.title}</p>
                      <p className="text-xs text-[#71717a]">{p.slug}</p>
                    </td>
                    <td className="px-6 py-4 text-[#a1a1aa]">
                      <span className="px-2 py-1 bg-[#27272a] rounded-full text-xs">{p.category}</span>
                    </td>
                    <td className="px-6 py-4 text-[#a1a1aa]">{p.date}</td>
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
        title="Delete Post?" 
        message="This action cannot be undone. This blog post will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteModalOpen(false)}
      />

      {/* Post Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl h-full bg-[#09090b] border-l border-[#27272a] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            
            <div className="flex items-center justify-between p-5 border-b border-[#27272a] shrink-0">
              <div>
                <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Post' : 'New Post'}</h2>
                <p className="text-xs text-[#a1a1aa]">Update blog content and metadata.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-[#a1a1aa] hover:text-white hover:bg-[#27272a] rounded-lg transition-colors">
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
              <div className="space-y-1.5">
                <label className="text-xs text-[#a1a1aa] font-medium">Title</label>
                <input type="text" className="admin-input" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Slug (URL)</label>
                  <input type="text" className="admin-input" value={formData.slug || ''} onChange={e => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/\\s+/g, '-')})} />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Category</label>
                  <select className="admin-input appearance-none" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Productivity">Productivity</option>
                    <option value="Focus">Focus</option>
                    <option value="AI Systems">AI Systems</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Date Formatted</label>
                  <input type="text" className="admin-input" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g. March 2026" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-[#a1a1aa] font-medium">Reading Time (mins)</label>
                  <input type="number" className="admin-input" value={formData.readingTime || ''} onChange={e => setFormData({...formData, readingTime: parseInt(e.target.value, 10)})} />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#a1a1aa] font-medium">Author</label>
                <input type="text" className="admin-input" value={formData.author || ''} onChange={e => setFormData({...formData, author: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#a1a1aa] font-medium">Excerpt</label>
                <textarea className="admin-input min-h-[60px]" value={formData.excerpt || ''} onChange={e => setFormData({...formData, excerpt: e.target.value})} />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-[#a1a1aa] font-medium">Body Content (JSON Array of Blocks)</label>
                <textarea 
                  className="admin-input min-h-[300px] font-mono text-xs whitespace-pre" 
                  value={contentString} 
                  onChange={e => setContentString(e.target.value)} 
                />
              </div>
            </div>

            <div className="p-5 border-t border-[#27272a] bg-[#18181b] shrink-0 flex items-center justify-end gap-3">
              <AdminButton variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</AdminButton>
              <AdminButton variant="primary" onClick={handleSave}>Save Post</AdminButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
