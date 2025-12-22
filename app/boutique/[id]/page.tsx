"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, Truck, Shield } from "lucide-react"
import { useState, use, useEffect } from "react"
import { useRouter } from "next/navigation"
import { fetchProduct, fetchProducts, type Product } from "@/lib/api"
import { addToCart } from "@/lib/cart"
import { addToWishlist, removeFromWishlist, isInWishlist } from "@/lib/wishlist"
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

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [addingToCart, setAddingToCart] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProduct(id);
      setProduct(data);
      setLoading(false);
      
      if (data) {
        // Check if product is in wishlist
        setIsFavorite(isInWishlist(data.id))
        
        // Load related products
        const allProducts = await fetchProducts();
        const category = getCategory(data.title);
        const related = allProducts
          .filter(p => p.id !== data.id && getCategory(p.title) === category)
          .slice(0, 3);
        setRelatedProducts(related);
      }
    }
    loadProduct();
    
    // Listen for wishlist updates
    const handleWishlistUpdate = () => {
      if (product) {
        setIsFavorite(isInWishlist(product.id))
      }
    }
    window.addEventListener('wishlist-update', handleWishlistUpdate)
    
    return () => {
      window.removeEventListener('wishlist-update', handleWishlistUpdate)
    }
  }, [id, product])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">Chargement...</div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Produit non trouvé</h1>
          <Link href="/boutique" className="text-accent hover:text-primary">
            Retour à la boutique
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          href="/boutique"
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
        >
          <ArrowLeft size={20} />
          Retour à la boutique
        </Link>
      </div>

      {/* Product Section */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square bg-neutral-warm rounded-lg overflow-hidden shadow-xl">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => {
                    if (product) {
                      if (isFavorite) {
                        removeFromWishlist(product.id)
                        toast({
                          title: "Retiré de la wishlist",
                          description: `${product.title} a été retiré`,
                        })
                      } else {
                        addToWishlist({
                          id: product.id,
                          title: product.title,
                          price: product.price,
                          image: product.image
                        })
                        toast({
                          title: "Ajouté à la wishlist",
                          description: `${product.title} a été ajouté`,
                        })
                      }
                      setIsFavorite(!isFavorite)
                    }
                  }}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isFavorite
                      ? "border-red-500 bg-red-500 text-white"
                      : "border-primary text-primary hover:bg-red-500 hover:border-red-500 hover:text-white"
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button className="p-3 rounded-lg border-2 border-[#8A8E74] text-[#58604C] hover:bg-[#ACB792] hover:text-[#58604C] transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-accent/30 text-primary text-sm font-semibold rounded-full mb-4">
                  {getCategory(product.title)}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                  {product.title}
                </h1>
                <div className="text-3xl font-bold text-primary mb-6">
                  {typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(product.price).toFixed(2)}€
                </div>
              </div>

              <p className="text-lg text-primary-light leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Product Details */}
              <div className="mb-8 space-y-3">
                <h3 className="font-bold text-lg text-primary mb-3">Caractéristiques</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-3 text-primary">
                    <Check size={18} className="text-accent flex-shrink-0" />
                    <span>Pièce artisanale unique</span>
                  </li>
                  <li className="flex items-center gap-3 text-primary">
                    <Check size={18} className="text-accent flex-shrink-0" />
                    <span>Fait main en France</span>
                  </li>
                  <li className="flex items-center gap-3 text-primary">
                    <Check size={18} className="text-accent flex-shrink-0" />
                    <span>Qualité céramique premium</span>
                  </li>
                </ul>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold text-primary">Quantité :</span>
                  <div className="flex items-center gap-2 border-2 border-[#8A8E74] rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-[#58604C] hover:bg-[#ACB792] hover:text-[#58604C] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-[#58604C] font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-[#58604C] hover:bg-[#ACB792] hover:text-[#58604C] transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button 
                  onClick={async (e) => {
                    e.preventDefault()
                    if (!product) return
                    
                    setAddingToCart(true)
                    try {
                      addToCart({
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image
                      }, quantity)
                      
                      // Show success feedback
                      const button = e.currentTarget
                      const originalText = button.innerHTML
                      button.innerHTML = '<span>✓ Ajouté!</span>'
                      button.classList.add('bg-green-500')
                      
                      setTimeout(() => {
                        button.innerHTML = originalText
                        button.classList.remove('bg-green-500')
                        setAddingToCart(false)
                      }, 2000)
                    } catch (error) {
                      console.error('Error adding to cart:', error)
                      setAddingToCart(false)
                    }
                  }}
                  disabled={addingToCart || !product}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={24} />
                  {addingToCart ? "Ajout..." : "Ajouter au panier"}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-accent">
                <div className="text-center">
                  <Truck className="mx-auto mb-2 text-primary" size={24} />
                  <p className="text-xs text-primary-light">Livraison gratuite</p>
                </div>
                <div className="text-center">
                  <Shield className="mx-auto mb-2 text-primary" size={24} />
                  <p className="text-xs text-primary-light">Paiement sécurisé</p>
                </div>
                <div className="text-center">
                  <Check className="mx-auto mb-2 text-primary" size={24} />
                  <p className="text-xs text-primary-light">Satisfait ou remboursé</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-primary mb-8">Produits similaires</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/boutique/${relatedProduct.id}`}
                  className="bg-neutral-warm rounded-lg overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="aspect-square bg-primary relative overflow-hidden">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary-light mb-2">{getCategory(relatedProduct.title)}</p>
                    <h3 className="font-bold text-primary mb-2">{relatedProduct.title}</h3>
                    <span className="font-bold text-lg text-primary">{typeof relatedProduct.price === 'number' ? relatedProduct.price.toFixed(2) : parseFloat(relatedProduct.price).toFixed(2)}€</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

