"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Image as ImageIcon, X, Upload, Plus } from "lucide-react"
import type { Product } from "@/lib/admin-api"
import Image from "next/image"
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload"
import { useToast } from "@/hooks/use-toast"

interface ProductFormProps {
  product?: Product | null
  onSubmit: (product: Omit<Product, "id" | "created_at">) => Promise<void>
  onCancel: () => void
}

// Main categories used in boutique
const mainCategories = [
  "Tasses",
  "Assiettes",
  "Pièces uniques",
  "Collections spéciales",
]

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
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
    features: [] as string[], // Array of features/characteristics
  })
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)


  useEffect(() => {
    if (product) {
      // Get images array from product, fallback to single image
      const images = product.images && product.images.length > 0 
        ? product.images 
        : product.image 
          ? [product.image] 
          : [];
      
      // Get features array from product
      const features = (product as any).features && Array.isArray((product as any).features) 
        ? (product as any).features 
        : [];
      
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        image: images[0] || product.image || "", // First image for backward compatibility
        images: images,
        category: product.category || "",
        status: product.status || "active",
        features: features,
      })
    }
  }, [product])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.category && !mainCategories.includes(formData.category)) {
      toast({
        title: "Erreur",
        description: "La catégorie doit être une des catégories céramique disponibles",
        variant: "destructive",
      })
      return
    }
    
    setLoading(true)

    try {
      // Use images array if available, otherwise fallback to single image
      const images = formData.images.length > 0 ? formData.images : (formData.image ? [formData.image] : []);
      
      await onSubmit({
        title: formData.title,
        description: formData.description || undefined,
        price: parseFloat(formData.price),
        image: images[0] || undefined, // First image for backward compatibility
        images: images.length > 0 ? images : undefined,
        category: formData.category || undefined,
        status: formData.status,
        features: formData.features.length > 0 ? formData.features : undefined,
      } as any)
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
          <div className="space-y-2">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              disabled={loading}
              className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option value="">Sélectionner une catégorie</option>
              {mainCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden border-2 border-primary/10">
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
                      onClick={() => {
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
                  <button
                    type="button"
                    onClick={() => {
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
                    }}
                    className="mt-2 w-full px-2 py-1 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors"
                    disabled={index === 0}
                  >
                    {index === 0 ? "Image principale" : "Définir comme principale"}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Features/Characteristics Section */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-primary">Caractéristiques</label>
        <div className="space-y-3">
          {formData.features.map((feature, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input
                type="text"
                value={feature}
                onChange={(e) => {
                  const newFeatures = [...formData.features]
                  newFeatures[index] = e.target.value
                  setFormData({ ...formData, features: newFeatures })
                }}
                placeholder="Caractéristique"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button
                type="button"
                onClick={() => {
                  const newFeatures = formData.features.filter((_, i) => i !== index)
                  setFormData({ ...formData, features: newFeatures })
                }}
                disabled={loading}
                className="p-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500/20 transition-all disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData({ ...formData, features: [...formData.features, ''] })
            }}
            disabled={loading}
            className="w-full px-4 py-3 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Plus size={18} />
            Ajouter une caractéristique
          </button>
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

