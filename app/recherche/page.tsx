"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search, Package, FileText, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { fetchProducts } from "@/lib/api"
import { fetchBlogs } from "@/lib/api"
import type { Product, Blog } from "@/lib/api"

interface Workshop {
  id: string
  title: string
  description: string
  price: number
  image?: string
}

function SearchContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const query = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(query)
  const [products, setProducts] = useState<Product[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setSearchTerm(query)
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = async (term: string) => {
    if (!term.trim()) {
      setProducts([])
      setBlogs([])
      setWorkshops([])
      return
    }

    setLoading(true)
    try {
      // Search products
      const allProducts = await fetchProducts()
      const filteredProducts = allProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(term.toLowerCase()) ||
          p.description?.toLowerCase().includes(term.toLowerCase())
      )

      // Search blogs
      const allBlogs = await fetchBlogs()
      const filteredBlogs = allBlogs.filter(
        (b) =>
          b.title.toLowerCase().includes(term.toLowerCase()) ||
          b.excerpt?.toLowerCase().includes(term.toLowerCase()) ||
          b.content?.toLowerCase().includes(term.toLowerCase())
      )

      // Search workshops (we'll fetch from API)
      try {
        const workshopsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002'}/api/workshops`)
        if (workshopsRes.ok) {
          const workshopsData = await workshopsRes.json()
          const allWorkshops = workshopsData.success ? workshopsData.data : []
          const filteredWorkshops = allWorkshops.filter(
            (w: Workshop) =>
              w.title?.toLowerCase().includes(term.toLowerCase()) ||
              w.description?.toLowerCase().includes(term.toLowerCase())
          )
          setWorkshops(filteredWorkshops)
        }
      } catch (err) {
        console.error('Error fetching workshops:', err)
      }

      setProducts(filteredProducts)
      setBlogs(filteredBlogs)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/recherche?q=${encodeURIComponent(searchTerm)}`)
    }
  }

  const totalResults = products.length + blogs.length + workshops.length

  return (
    <div className="min-h-screen pt-32 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={24} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher des produits, articles, ateliers..."
                className="w-full pl-14 pr-4 py-4 bg-white/80 backdrop-blur-xl border-2 border-primary/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-bold"
              >
                Rechercher
              </button>
            </div>
          </form>
        </motion.div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">
            Recherche en cours...
          </div>
        ) : query ? (
          <>
            {/* Results Summary */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <p className="text-muted-foreground">
                {totalResults} résultat{totalResults > 1 ? 's' : ''} pour "{query}"
              </p>
            </motion.div>

            {/* Products Results */}
            {products.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Package size={24} className="text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Produits ({products.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/boutique/${product.id}`}
                      className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                    >
                      <div className="relative h-48 bg-neutral-100">
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={48} className="text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2">{product.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                        <p className="text-xl font-bold text-primary">{product.price.toFixed(2)}€</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Blogs Results */}
            {blogs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FileText size={24} className="text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Articles ({blogs.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.slug || blog.id}`}
                      className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                    >
                      <div className="relative h-48 bg-neutral-100">
                        {blog.image ? (
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText size={48} className="text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2">{blog.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                          {blog.excerpt || blog.content?.substring(0, 150)}
                        </p>
                        {blog.category && (
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full">
                            {blog.category}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Workshops Results */}
            {workshops.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Calendar size={24} className="text-primary" />
                  <h2 className="text-2xl font-bold text-primary">Ateliers ({workshops.length})</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {workshops.map((workshop) => (
                    <Link
                      key={workshop.id}
                      href={`/ateliers#${workshop.id}`}
                      className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 shadow-lg overflow-hidden hover:shadow-xl transition-all group"
                    >
                      <div className="relative h-48 bg-neutral-100">
                        {workshop.image ? (
                          <Image
                            src={workshop.image}
                            alt={workshop.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Calendar size={48} className="text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-primary mb-2 line-clamp-2">{workshop.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{workshop.description}</p>
                        <p className="text-xl font-bold text-primary">{workshop.price.toFixed(2)}€</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}

            {/* No Results */}
            {totalResults === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Search size={64} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-bold text-primary mb-2">Aucun résultat trouvé</h3>
                <p className="text-muted-foreground">
                  Essayez avec d'autres mots-clés ou parcourez nos catégories
                </p>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search size={64} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-2">Recherchez quelque chose</h3>
            <p className="text-muted-foreground">
              Entrez un terme de recherche pour trouver des produits, articles et ateliers
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12 text-muted-foreground">
            Chargement...
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}

