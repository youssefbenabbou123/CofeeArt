"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Package, Search, Edit, Trash2, Image as ImageIcon } from "lucide-react"
import {
  fetchAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type Product,
} from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import ProductForm from "@/components/admin/ProductForm"
import Image from "next/image"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const categories = [
    "Tasses",
    "Assiettes",
    "Pièces uniques",
    "Collections spéciales",
  ]

  // Helper function to check if product is goodies/lifestyle
  const isGoodies = (product: Product): boolean => {
    const category = product.category?.toLowerCase() || ''
    const titleLower = product.title.toLowerCase()
    
    return (
      category === 'cup' ||
      category === 'casquette' ||
      category === 'chaussette' ||
      category === 'tee-shirt' ||
      category === 'tote bag' ||
      // Also check old categories for backward compatibility
      category === 'goodies / lifestyle' ||
      category === 'tote bags' ||
      category === 'affiches / prints' ||
      titleLower.includes('cup') ||
      titleLower.includes('casquette') ||
      titleLower.includes('chaussette') ||
      titleLower.includes('tee-shirt') ||
      titleLower.includes('t-shirt') ||
      titleLower.includes('tote') ||
      titleLower.includes('sac') ||
      titleLower.includes('print') ||
      titleLower.includes('affiche') ||
      titleLower.includes('poster')
    )
  }

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminProducts(
        selectedCategory || undefined,
        undefined
      )
      // Filter out goodies/lifestyle products
      const filteredData = data.filter(product => !isGoodies(product))
      setProducts(filteredData)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les produits",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [selectedCategory, toast])

  const handleCreate = async (productData: Omit<Product, "id" | "created_at">) => {
    try {
      await createProduct(productData)
      toast({
        title: "Succès",
        description: "Produit créé avec succès",
      })
      setShowForm(false)
      loadProducts()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer le produit",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleUpdate = async (productData: Omit<Product, "id" | "created_at">) => {
    if (!editingProduct) return

    try {
      await updateProduct(editingProduct.id, productData)
      toast({
        title: "Succès",
        description: "Produit mis à jour",
      })
      setEditingProduct(null)
      setShowForm(false)
      loadProducts()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le produit",
        variant: "destructive",
      })
      throw error
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return

    try {
      await deleteProduct(id)
      toast({
        title: "Succès",
        description: "Produit supprimé",
      })
      loadProducts()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le produit",
        variant: "destructive",
      })
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return <LoadingSpinner message="Chargement des produits céramique..." />
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
          <h1 className="text-4xl font-black text-primary mb-2">Céramique</h1>
          <p className="text-muted-foreground">Créer, modifier et supprimer des produits céramique</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingProduct(null)
            setShowForm(true)
          }}
          className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all shadow-lg"
        >
          <Plus size={20} />
          Nouveau produit céramique
        </motion.button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Rechercher un produit céramique..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-xl border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-white/80 backdrop-blur-xl border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Form */}
      {showForm && (
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onCancel={() => {
            setShowForm(false)
            setEditingProduct(null)
          }}
        />
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 shadow-lg overflow-hidden hover:shadow-xl transition-all"
          >
            <div className="relative h-48 bg-neutral-100">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
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
                    setEditingProduct(product)
                    setShowForm(true)
                  }}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-primary hover:bg-primary hover:text-white transition-colors"
                >
                  <Edit size={16} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(product.id)}
                  className="p-2 bg-white/90 backdrop-blur-sm rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={16} />
                </motion.button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-primary mb-2">{product.title}</h3>
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {product.description || "Aucune description"}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-black text-primary">
                  {product.price.toFixed(2)}€
                </span>
                <div className="flex gap-2">
                  {product.category && (
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                      {product.category}
                    </span>
                  )}
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded-full ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <Package size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Aucun produit céramique trouvé</p>
        </div>
      )}
    </div>
  )
}

