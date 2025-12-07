"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, ArrowRight, Sparkles } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchProducts, type Product } from "@/lib/api"
import { addToCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"

// Map product titles to categories
function getCategory(title: string): string {
  const titleLower = title.toLowerCase();
  if (titleLower.includes("tasse")) return "Tasses";
  if (titleLower.includes("assiette")) return "Assiettes";
  if (titleLower.includes("bol")) return "Bols";
  if (titleLower.includes("vase")) return "Vases";
  if (titleLower.includes("théière") || titleLower.includes("theiere")) return "Théières";
  if (titleLower.includes("baguette")) return "Accessoires";
  if (titleLower.includes("pot")) return "Décoration";
  if (titleLower.includes("plateau")) return "Plateaux";
  return "Autres";
}

export default function Boutique() {
  const [selectedFilter, setSelectedFilter] = useState<string>("Tous")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [])

  // Extract unique categories from products, ensuring "Tous" first
  const categories = ["Tous", ...Array.from(new Set(products.map(p => getCategory(p.title))))]

  const filteredProducts = selectedFilter === "Tous"
    ? products
    : products.filter(product => getCategory(product.title) === selectedFilter)

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary/5 border border-primary/10 text-primary font-medium text-sm mb-8 tracking-wider uppercase backdrop-blur-sm">
              <Sparkles size={14} />
              Collection Artisanale
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Boutique</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Une sélection curatée de pièces céramiques uniques, façonnées à la main pour sublimer votre quotidien.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="sticky top-20 z-40 py-6 backdrop-blur-xl bg-background/80 border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-2 md:pb-0 gap-3 no-scrollbar justify-start md:justify-center">
            {categories.map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${selectedFilter === filter
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  }`}
              >
                {selectedFilter === filter && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-neutral-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {loading ? (
              <div className="col-span-full text-center py-20">
                <div className="text-muted-foreground">Chargement des produits...</div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <div className="text-muted-foreground">Aucun produit trouvé</div>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                  <div className="group block h-full relative">
                    <Link
                      href={`/boutique/${product.id}`}
                      className="block h-full"
                    >
                      <div className="relative h-full bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                        <div className="aspect-[4/5] relative overflow-hidden bg-neutral-100">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1 bg-white/90 backdrop-blur text-xs font-bold text-primary rounded-full uppercase tracking-wider">
                              {getCategory(product.title)}
                            </span>
                          </div>

                          {/* Cart Button - Inside Card */}
                          <div className="absolute bottom-4 right-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
                            <button 
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                addToCart({
                                  id: product.id,
                                  title: product.title,
                                  price: product.price,
                                  image: product.image
                                }, 1)
                                
                                toast({
                                  title: "Ajouté au panier",
                                  description: `${product.title} a été ajouté avec succès`,
                                })
                              }}
                              className="bg-white text-primary p-3 rounded-full shadow-lg hover:bg-primary hover:text-white transition-all duration-300 hover:scale-110"
                              aria-label="Ajouter au panier"
                            >
                              <ShoppingCart size={20} />
                            </button>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-primary group-hover:text-primary/80 transition-colors">
                              {product.title}
                            </h3>
                            <span className="font-bold text-lg text-primary bg-primary/5 px-2 py-1 rounded-md">
                              {typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}€
                            </span>
                          </div>
                          <div className="w-full h-px bg-primary/10 my-4 group-hover:bg-primary/20 transition-colors" />
                          <div className="flex items-center text-sm text-muted-foreground font-medium group-hover:text-primary transition-colors">
                            Voir le détail <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        {/* <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" /> */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">
              Commandes Spéciales & En Gros
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
              Vous recherchez une commande personnalisée ou une collaboration ?
              Créez quelque chose d'unique avec nous.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-accent hover:text-primary transition-all duration-300 hover:scale-105 shadow-lg shadow-black/5"
            >
              Nous Contacter
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
