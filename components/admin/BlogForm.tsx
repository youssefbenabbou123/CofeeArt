"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Image as ImageIcon, X, Upload } from "lucide-react"
import type { Blog } from "@/lib/admin-api"
import Image from "next/image"
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload"
import { useToast } from "@/hooks/use-toast"

interface BlogFormProps {
  blog?: Blog | null
  onSubmit: (blog: Omit<Blog, "id" | "created_at" | "updated_at">) => Promise<void>
  onCancel: () => void
}


export default function BlogForm({ blog, onSubmit, onCancel }: BlogFormProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
    slug: "",
    published: true,
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        content: blog.content || "",
        excerpt: blog.excerpt || "",
        image: blog.image || "",
        slug: blog.slug || "",
        published: blog.published !== false,
      })
    }
  }, [blog])

  // Auto-generate slug from title
  useEffect(() => {
    if (!blog && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
      setFormData((prev) => ({ ...prev, slug }))
    }
  }, [formData.title, blog])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSubmit({
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        image: formData.image,
        slug: formData.slug,
        published: formData.published,
      })
    } catch (error) {
      // Error is handled by parent
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une image",
        variant: "destructive",
      })
      return
    }

    setUploading(true)
    try {
      const url = await uploadImageToCloudinary(file)
      setFormData((prev) => ({ ...prev, image: url }))
      toast({
        title: "Succès",
        description: "Image uploadée avec succès",
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'uploader l'image",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 shadow-lg p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-primary mb-2">
              Titre *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-3 bg-white border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Slug */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-primary mb-2">
              Slug (URL)
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="auto-generé depuis le titre"
            />
          </div>

          {/* Excerpt */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-primary mb-2">
              Extrait (résumé)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-white border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
              placeholder="Court résumé du blog..."
            />
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-primary mb-2">
              Contenu *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={12}
              className="w-full px-4 py-3 bg-white border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none font-mono text-sm"
              placeholder="Contenu complet du blog..."
            />
          </div>


          {/* Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-primary mb-2">
              Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            {formData.image ? (
              <div className="relative">
                <div className="relative w-full h-64 rounded-xl overflow-hidden border border-primary/10">
                  <Image
                    src={formData.image}
                    alt="Blog image"
                    fill
                    className="object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-64 border-2 border-dashed border-primary/20 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-colors"
              >
                {uploading ? (
                  <div className="text-primary">Upload en cours...</div>
                ) : (
                  <>
                    <Upload size={32} className="text-primary/50 mb-2" />
                    <p className="text-sm text-primary/70">
                      Cliquez pour uploader une image
                    </p>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Published */}
          <div className="md:col-span-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded border-primary/20 text-primary focus:ring-primary/20"
              />
              <span className="text-sm font-bold text-primary">Publier</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 justify-end pt-4 border-t border-primary/10">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-white border border-primary/20 text-primary rounded-xl font-bold hover:bg-primary/5 transition-all"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Enregistrement..." : blog ? "Mettre à jour" : "Créer"}
          </button>
        </div>
      </form>
    </motion.div>
  )
}






