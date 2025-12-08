"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, FileText, Search, Edit, Trash2, Image as ImageIcon, Eye, EyeOff } from "lucide-react"
import {
  fetchAdminBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  type Blog,
} from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import BlogForm from "@/components/admin/BlogForm"
import Image from "next/image"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const loadBlogs = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminBlogs()
      setBlogs(data)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les blogs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBlogs()
  }, [toast])

  const handleCreate = async (blogData: Omit<Blog, "id" | "created_at" | "updated_at">) => {
    try {
      await createBlog(blogData)
      toast({
        title: "Succès",
        description: "Blog créé avec succès",
      })
      setShowForm(false)
      loadBlogs()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le blog",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleUpdate = async (blogData: Omit<Blog, "id" | "created_at" | "updated_at">) => {
    if (!editingBlog) return

    try {
      await updateBlog(editingBlog.id, blogData)
      toast({
        title: "Succès",
        description: "Blog mis à jour",
      })
      setEditingBlog(null)
      loadBlogs()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le blog",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce blog ?")) return

    try {
      await deleteBlog(id)
      toast({
        title: "Succès",
        description: "Blog supprimé",
      })
      loadBlogs()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le blog",
        variant: "destructive",
      })
    }
  }

  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner message="Chargement des blogs..." />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-black text-primary mb-2">Gestion des Blogs</h1>
          <p className="text-muted-foreground">Créer, modifier et supprimer des articles de blog</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingBlog(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg"
        >
          <Plus size={20} />
          Nouveau blog
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Rechercher un blog..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-xl border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        />
      </motion.div>

      {/* Form */}
      {showForm && (
        <BlogForm
          blog={editingBlog}
          onSubmit={editingBlog ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false)
            setEditingBlog(null)
          }}
        />
      )}

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((blog, index) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 shadow-lg overflow-hidden hover:shadow-xl transition-all flex flex-col"
          >
            <div className="relative h-48 bg-neutral-100">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon size={48} className="text-muted-foreground" />
                </div>
              )}
              <div className="absolute top-2 right-2 flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setEditingBlog(blog)
                    setShowForm(true)
                  }}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Edit size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(blog.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
              {!blog.published && (
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <EyeOff size={12} />
                    Brouillon
                  </span>
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2">{blog.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-3 flex-1">
                {blog.excerpt || blog.content.substring(0, 150) + "..."}
              </p>
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-primary/10">
                <div className="flex gap-2 flex-wrap">
                  {blog.category && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                      {blog.category}
                    </span>
                  )}
                  {blog.author && (
                    <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full">
                      {blog.author}
                    </span>
                  )}
                </div>
                {blog.published ? (
                  <Eye size={16} className="text-green-600" />
                ) : (
                  <EyeOff size={16} className="text-yellow-600" />
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredBlogs.length === 0 && (
        <div className="text-center py-12">
          <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Aucun blog trouvé</p>
        </div>
      )}
    </div>
  )
}

