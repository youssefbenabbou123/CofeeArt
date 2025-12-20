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
import GoodiesProductForm from "@/components/admin/GoodiesProductForm"
import Image from "next/image"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function GoodiesPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [showForm, setShowForm] = useState(false)
  const { toast } = useToast()

  const goodiesCategories = [
    "Tote bags",
    "Affiches / prints",
  ]

  const loadProducts = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminProducts(
        undefined,
        undefined
      )
      // Filter only goodies/lifestyle products
      const goodiesProducts = data.filter(p => {
        const category = p.category || ""
        return category === "Tote bags" || category === "Affiches / prints"
      })
      setProducts(goodiesProducts)
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
  }, [toast])

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
  ).filter(
    (product) => !selectedCategory || product.category === selectedCategory
  )

  if (loading) {
    return <LoadingSpinner message="Chargement des goodies..." />
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
          <h1 className="text-4xl font-black text-primary mb-2">Goodies / Lifestyle</h1>
          <p className="text-muted-foreground">Gérez les tote bags et affiches / prints</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setEditingProduct(null)
            setShowForm(true)
          }}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Nouveau produit
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
            placeholder="Rechercher un produit..."
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
          {goodiesCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Form */}
      {showForm && (
        <GoodiesProductForm
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
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all"
          >
            {product.image && (
              <div className="relative h-48 mb-4 rounded-xl overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-primary flex-1">{product.title}</h3>
                <span className="text-2xl font-black text-primary ml-2">
                  {typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}€
                </span>
              </div>
              {product.category && (
                <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-2">
                  {product.category}
                </span>
              )}
              {product.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                  {product.description}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingProduct(product)
                  setShowForm(true)
                }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Modifier
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          {searchTerm || selectedCategory
            ? "Aucun produit trouvé avec ces critères"
            : "Aucun produit goodies / lifestyle pour le moment"}
        </div>
      )}
    </div>
  )
}

