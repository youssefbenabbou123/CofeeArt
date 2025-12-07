"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Image as ImageIcon, X, Upload } from "lucide-react"
import type { Product } from "@/lib/admin-api"
import Image from "next/image"
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload"
import { useToast } from "@/hooks/use-toast"

interface ProductFormProps {
  product?: Product | null
  onSubmit: (product: Omit<Product, "id" | "created_at">) => Promise<void>
  onCancel: () => void
}

const categories = [
  "Tasses",
  "Assiettes",
  "Bols",
  "Vases",
  "Théières",
  "Accessoires",
  "Décoration",
  "Plateaux",
  "Autres",
]

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    category: "",
    status: "active",
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        image: product.image || "",
        category: product.category || "",
        status: product.status || "active",
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSubmit({
        title: formData.title,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        image: formData.image || undefined,
        category: formData.category || undefined,
        status: formData.status,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Titre *</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Prix (€) *</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
            disabled={loading}
            className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          disabled={loading}
          className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Catégorie</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            disabled={loading}
            className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            <option value="">Sélectionner une catégorie</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-primary">Statut</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            disabled={loading}
            className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            <option value="active">Actif</option>
            <option value="inactive">Inactif</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Image</label>
        <div className="flex gap-4">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={async (e) => {
              const file = e.target.files?.[0]
              if (file) {
                setUploading(true)
                try {
                  const imageUrl = await uploadImageToCloudinary(file)
                  setFormData({ ...formData, image: imageUrl })
                  toast({
                    title: "Image uploadée",
                    description: "L'image a été uploadée avec succès sur Cloudinary",
                  })
                } catch (error: any) {
                  toast({
                    title: "Erreur",
                    description: error.message || "Erreur lors de l'upload de l'image",
                    variant: "destructive",
                  })
                } finally {
                  setUploading(false)
                }
              }
            }}
            disabled={loading || uploading}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading || uploading}
            className="px-4 py-3 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            <Upload size={18} />
            {uploading ? "Upload en cours..." : "Uploader une image"}
          </button>
          <input
            type="url"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            placeholder="Ou entrez une URL d'image"
            disabled={loading || uploading}
            className="flex-1 px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
          {formData.image && (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border border-primary/10">
              <Image
                src={formData.image}
                alt="Preview"
                fill
                className="object-cover"
                onError={() => setFormData({ ...formData, image: "" })}
              />
              <button
                type="button"
                onClick={() => setFormData({ ...formData, image: "" })}
                className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-3 border border-primary/20 text-primary rounded-xl font-bold hover:bg-primary/5 transition-all disabled:opacity-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : product ? "Mettre à jour" : "Créer"}
        </button>
      </div>
    </motion.form>
  )
}

