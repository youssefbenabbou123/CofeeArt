"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Image as ImageIcon, X, Upload, Plus } from "lucide-react"
import type { Product } from "@/lib/admin-api"
import { fetchProductCategories, createProductCategory, type ProductCategory } from "@/lib/admin-api"
import Image from "next/image"
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload"
import { useToast } from "@/hooks/use-toast"

interface GoodiesProductFormProps {
  product?: Product | null
  onSubmit: (product: Omit<Product, "id" | "created_at">) => Promise<void>
  onCancel: () => void
}

// Goodies categories only
const goodiesCategories = [
  "Goodies / Lifestyle",
  "Tote bags",
  "Affiches / prints",
]

export default function GoodiesProductForm({ product, onSubmit, onCancel }: GoodiesProductFormProps) {
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    images: [] as string[], // Array of image URLs
    category: "",
    status: "active",
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [categories, setCategories] = useState<ProductCategory[]>([])
  const [showNewCategory, setShowNewCategory] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState("")
  const [creatingCategory, setCreatingCategory] = useState(false)

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchProductCategories()
        // Filter only goodies categories
        const goodiesCats = data.filter(cat => goodiesCategories.includes(cat.name))
        setCategories(goodiesCats)
      } catch (error) {
        console.error("Error loading categories:", error)
      }
    }
    loadCategories()
  }, [])

  useEffect(() => {
    if (product) {
      // Get images array from product, fallback to single image
      const images = product.images && product.images.length > 0 
        ? product.images 
        : product.image 
          ? [product.image] 
          : [];
      
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        image: product.image || "",
        images: images,
        category: product.category || "",
        status: product.status || "active",
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.category) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une catégorie",
        variant: "destructive",
      })
      return
    }

    if (!goodiesCategories.includes(formData.category)) {
      toast({
        title: "Erreur",
        description: "La catégorie doit être une catégorie goodies / lifestyle",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      await onSubmit({
        title: formData.title,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        image: formData.images.length > 0 ? formData.images[0] : formData.image || undefined,
        images: formData.images.length > 0 ? formData.images : undefined,
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
          <label className="text-sm font-medium text-primary">Catégorie *</label>
          <div className="space-y-2">
            <select
              value={formData.category}
              onChange={(e) => {
                if (e.target.value === "new") {
                  setShowNewCategory(true)
                  setFormData({ ...formData, category: "" })
                } else {
                  setFormData({ ...formData, category: e.target.value })
                  setShowNewCategory(false)
                }
              }}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option value="">Sélectionner une catégorie</option>
              {goodiesCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
              {categories
                .filter(cat => !goodiesCategories.includes(cat.name))
                .map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
            </select>
            
            {showNewCategory && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Nom de la nouvelle catégorie"
                  disabled={creatingCategory}
                  className="flex-1 px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  onClick={async () => {
                    if (!newCategoryName.trim()) {
                      toast({
                        title: "Erreur",
                        description: "Veuillez entrer un nom de catégorie",
                        variant: "destructive",
                      })
                      return
                    }
                    setCreatingCategory(true)
                    try {
                      const newCategory = await createProductCategory(newCategoryName.trim())
                      setCategories([...categories, newCategory])
                      setFormData({ ...formData, category: newCategory.name })
                      setShowNewCategory(false)
                      setNewCategoryName("")
                      toast({
                        title: "Succès",
                        description: "Catégorie créée avec succès",
                      })
                    } catch (error: any) {
                      toast({
                        title: "Erreur",
                        description: error.message || "Impossible de créer la catégorie",
                        variant: "destructive",
                      })
                    } finally {
                      setCreatingCategory(false)
                    }
                  }}
                  disabled={creatingCategory || !newCategoryName.trim()}
                  className="px-4 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Plus size={18} />
                  {creatingCategory ? "Création..." : "Créer"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowNewCategory(false)
                    setNewCategoryName("")
                  }}
                  className="px-4 py-3 border border-primary/20 text-primary rounded-xl font-bold hover:bg-primary/5 transition-all"
                >
                  Annuler
                </button>
              </div>
            )}
          </div>
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
        <label className="text-sm font-medium text-primary">Images</label>
        
        {/* Multiple file input */}
        <div className="space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            multiple
            onChange={async (e) => {
              const files = Array.from(e.target.files || [])
              if (files.length > 0) {
                setUploading(true)
                try {
                  const uploadPromises = files.map(file => uploadImageToCloudinary(file))
                  const imageUrls = await Promise.all(uploadPromises)
                  
                  setFormData({ 
                    ...formData, 
                    images: [...formData.images, ...imageUrls],
                    image: formData.images.length === 0 ? imageUrls[0] : formData.image // Set first image if none exists
                  })
                  
                  toast({
                    title: "Images uploadées",
                    description: `${imageUrls.length} image(s) uploadée(s) avec succès`,
                  })
                } catch (error: any) {
                  toast({
                    title: "Erreur",
                    description: error.message || "Erreur lors de l'upload des images",
                    variant: "destructive",
                  })
                } finally {
                  setUploading(false)
                  // Reset input
                  if (fileInputRef.current) {
                    fileInputRef.current.value = ''
                  }
                }
              }
            }}
            disabled={loading || uploading}
            className="hidden"
          />
          
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading || uploading}
              className="px-4 py-3 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-all disabled:opacity-50 flex items-center gap-2"
            >
              <Upload size={18} />
              {uploading ? "Upload en cours..." : "Ajouter des images"}
            </button>
            
            <input
              type="url"
              placeholder="Ou entrez une URL d'image"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  const url = e.currentTarget.value.trim()
                  if (url) {
                    setFormData({ 
                      ...formData, 
                      images: [...formData.images, url],
                      image: formData.images.length === 0 ? url : formData.image
                    })
                    e.currentTarget.value = ''
                    toast({
                      title: "Image ajoutée",
                      description: "L'URL a été ajoutée",
                    })
                  }
                }
              }}
              disabled={loading || uploading}
              className="flex-1 px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
          
          {/* Display all images with remove option */}
          {formData.images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <div 
                    className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-primary/10 cursor-pointer"
                    onClick={() => {
                      if (index !== 0) {
                        // Move image to first position
                        const newImages = [...formData.images]
                        const [moved] = newImages.splice(index, 1)
                        newImages.unshift(moved)
                        setFormData({ 
                          ...formData, 
                          images: newImages,
                          image: newImages[0]
                        })
                        toast({
                          title: "Image principale",
                          description: "Cette image est maintenant l'image principale",
                        })
                      }
                    }}
                  >
                    <Image
                      src={img}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={() => {
                        // Remove broken image
                        const newImages = formData.images.filter((_, i) => i !== index)
                        setFormData({ 
                          ...formData, 
                          images: newImages,
                          image: index === 0 && newImages.length > 0 ? newImages[0] : formData.image
                        })
                      }}
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        const newImages = formData.images.filter((_, i) => i !== index)
                        setFormData({ 
                          ...formData, 
                          images: newImages,
                          image: index === 0 && newImages.length > 0 ? newImages[0] : (newImages.length > 0 ? newImages[0] : '')
                        })
                        toast({
                          title: "Image supprimée",
                          description: "L'image a été retirée",
                        })
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 z-10"
                    >
                      <X size={16} />
                    </button>
                    {index === 0 && (
                      <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary text-white text-xs font-bold rounded">
                        Principale
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-center mt-1 text-muted-foreground">
                    Image {index + 1}
                    {index === 0 && " (Principale)"}
                    {index !== 0 && " (Cliquez pour définir comme principale)"}
                  </p>
                </div>
              ))}
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


