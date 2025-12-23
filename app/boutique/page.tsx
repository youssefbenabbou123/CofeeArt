"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Heart, Gift } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fetchProducts, type Product } from "@/lib/api"
import { addToCart } from "@/lib/cart"
import { addToWishlist, removeFromWishlist, isInWishlist, getWishlistItems, type WishlistItem } from "@/lib/wishlist"
import { useToast } from "@/hooks/use-toast"
import { loadStripe } from "@stripe/stripe-js"
import { getCurrentUser } from "@/lib/auth"
import { ScrollAnimation } from "@/components/scroll-animation"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

// Get category from product or use title-based fallback
function getCategory(product: Product): string {
  // Use product.category if available
  if (product.category) {
    return product.category;
  }
  
  // Fallback to title-based detection
  const titleLower = product.title.toLowerCase();
  if (titleLower.includes("tasse")) return "Tasses";
  if (titleLower.includes("assiette")) return "Assiettes";
  if (titleLower.includes("bol")) return "Bols";
  if (titleLower.includes("vase")) return "Vases";
  if (titleLower.includes("théière") || titleLower.includes("theiere")) return "Théières";
  if (titleLower.includes("gobelet") || titleLower.includes("isotherme")) return "Goodies / Lifestyle";
  if (titleLower.includes("baguette")) return "Accessoires";
  if (titleLower.includes("pot")) return "Décoration";
  if (titleLower.includes("plateau")) return "Plateaux";
  if (titleLower.includes("tote") || titleLower.includes("sac")) return "Tote bags";
  if (titleLower.includes("affiche") || titleLower.includes("print") || titleLower.includes("poster")) return "Affiches / prints";
  return "Autres";
}

// Check if product is ceramic (belongs to Céramiques section)
function isCeramic(category: string): boolean {
  const ceramicCategories = ["Céramiques", "Tasses", "Assiettes", "Bols", "Vases", "Théières", "Décoration", "Plateaux", "Accessoires"];
  return ceramicCategories.includes(category);
}

// Check if product is goodies/lifestyle
function isGoodies(category: string): boolean {
  return category === "Goodies / Lifestyle" || category === "Tote bags" || category === "Affiches / prints";
}

const giftCardTypes = [
  {
    id: "ateliers",
    title: "Ateliers",
    description: "Offrez un atelier de céramique pour découvrir l'art du tournage et du modelage",
    minAmount: 50,
    category: "Ateliers",
    image: "/ceramic-pottery-workshop-hands-creating-clay-potte.jpg"
  },
  {
    id: "cafe",
    title: "Consommations café",
    description: "Une carte cadeau pour déguster nos cafés de spécialité et nos pâtisseries",
    minAmount: 10,
    category: "Consommations café",
    image: "/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg"
  },
  {
    id: "montant-libre",
    title: "Montant libre",
    description: "Choisissez le montant de votre carte cadeau pour offrir ce qui vous plaît",
    minAmount: 10,
    category: "Montant libre",
    image: "/placeholder.jpg"
  }
]

export default function Boutique() {
  const [selectedSection, setSelectedSection] = useState<string>("ceramiques")
  const [selectedFilter, setSelectedFilter] = useState<string>("Tous")
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [selectedGiftCardType, setSelectedGiftCardType] = useState<string | null>(null)
  const [giftCardAmount, setGiftCardAmount] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [purchaserName, setPurchaserName] = useState("")
  const [purchaserEmail, setPurchaserEmail] = useState("")
  const [giftCardLoading, setGiftCardLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function loadProducts() {
      const data = await fetchProducts();
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, [])

  // Load wishlist on mount and listen for updates
  useEffect(() => {
    function loadWishlist() {
      setWishlistItems(getWishlistItems())
    }
    
    loadWishlist()
    window.addEventListener('wishlist-update', loadWishlist)
    
    return () => {
      window.removeEventListener('wishlist-update', loadWishlist)
    }
  }, [])

  // Separate products by type
  const ceramicProducts = products.filter(p => {
    const cat = getCategory(p);
    return isCeramic(cat);
  });

  const goodiesProducts = products.filter(p => {
    const cat = getCategory(p);
    return isGoodies(cat);
  });

  // Ceramic categories
  const ceramicCategories = ["Tous", "Tasses", "Assiettes", "Pièces uniques", "Collections spéciales"];
  
  // Filter ceramic products
  const filteredCeramicProducts = selectedFilter === "Tous"
    ? ceramicProducts
    : selectedFilter === "Pièces uniques"
    ? ceramicProducts.filter(p => {
        const cat = getCategory(p);
        return !["Tasses", "Assiettes"].includes(cat);
      })
    : selectedFilter === "Collections spéciales"
    ? ceramicProducts.filter(p => {
        const cat = getCategory(p);
        return ["Vases", "Théières", "Plateaux"].includes(cat);
      })
    : ceramicProducts.filter(product => getCategory(product) === selectedFilter);

  // Filter goodies products
  const filteredGoodiesProducts = goodiesProducts;

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-primary-foreground">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              La <span className="text-[#8A8E74]">boutique</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Des pièces choisies avec soin, à utiliser au quotidien ou à offrir, dans l’esprit du café et de l’atelier.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section Tabs */}
      <section className="sticky top-20 z-40 py-6 backdrop-blur-xl bg-background/80 border-y border-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Categories - Larger, more prominent */}
          <div className="flex overflow-x-auto pb-4 md:pb-6 gap-4 no-scrollbar justify-start md:justify-center mb-4 border-b border-primary/10">
            {[
              { id: "ceramiques", label: "Céramiques" },
              { id: "goodies", label: "Goodies / Lifestyle" },
              { id: "cartes", label: "Cartes cadeaux" },
            ].map((section) => (
              <button
                key={section.id}
                onClick={() => {
                  setSelectedSection(section.id);
                  setSelectedFilter("Tous");
                }}
                className={`relative px-8 py-3 rounded-full font-semibold text-base transition-all duration-300 whitespace-nowrap ${
                  selectedSection === section.id
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                }`}
              >
                {selectedSection === section.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{section.label}</span>
              </button>
            ))}
          </div>

          {/* Filters for Céramiques - Smaller, secondary style */}
          {selectedSection === "ceramiques" && (
            <div className="flex overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar justify-start md:justify-center">
              {ceramicCategories.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`relative px-4 py-1.5 rounded-full font-normal text-xs transition-all duration-300 whitespace-nowrap ${
                    selectedFilter === filter
                      ? "text-primary-foreground bg-primary"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10 bg-primary/5"
                  }`}
                >
                  <span className="relative z-10">{filter}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Céramiques Section */}
      {selectedSection === "ceramiques" && (
        <section className="py-20 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {loading ? (
                <div className="col-span-full text-center py-20">
                  <div className="text-muted-foreground">Chargement des produits...</div>
                </div>
              ) : filteredCeramicProducts.length === 0 ? (
                <div className="col-span-full text-center py-20">
                  <div className="text-muted-foreground">Aucun produit trouvé</div>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {filteredCeramicProducts.map((product, index) => (
                  <ScrollAnimation key={product.id} direction="up" delay={index * 50}>
                  <motion.div
                    layout
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

                          {/* Wishlist Button - Top Right */}
                          <div className="absolute top-4 right-4 z-20">
                            <button 
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                const inWishlist = isInWishlist(product.id)
                                if (inWishlist) {
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
                                setWishlistItems(getWishlistItems())
                              }}
                              className="bg-white/90 backdrop-blur-sm text-primary p-2.5 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                              aria-label={isInWishlist(product.id) ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
                            >
                              <Heart size={18} className={isInWishlist(product.id) ? "fill-red-500 text-red-500 group-hover:fill-white group-hover:text-white" : ""} />
                            </button>
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
                          <div className="flex items-center justify-center text-sm text-muted-foreground font-medium group-hover:text-primary transition-colors">
                            Voir le détail
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                  </motion.div>
                  </ScrollAnimation>
                ))}
                  </AnimatePresence>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Goodies / Lifestyle Section */}
        {selectedSection === "goodies" && (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-primary mb-4">Goodies / Lifestyle</h2>
                <p className="text-primary/70">Découvrez nos accessoires et objets lifestyle</p>
              </div>
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {loading ? (
                  <div className="col-span-full text-center py-20">
                    <div className="text-muted-foreground">Chargement des produits...</div>
                  </div>
                ) : filteredGoodiesProducts.length === 0 ? (
                  <div className="col-span-full text-center py-20">
                    <div className="text-muted-foreground">Aucun produit trouvé</div>
                  </div>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {filteredGoodiesProducts.map((product, index) => (
                      <ScrollAnimation key={product.id} direction="up" delay={index * 50}>
                      <motion.div
                        layout
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
                                {/* Wishlist Button - Top Right */}
                                <div className="absolute top-4 right-4 z-20">
                                  <button 
                                    onClick={(e) => {
                                      e.preventDefault()
                                      e.stopPropagation()
                                      const inWishlist = isInWishlist(product.id)
                                      if (inWishlist) {
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
                                      setWishlistItems(getWishlistItems())
                                    }}
                                    className="bg-white/90 backdrop-blur-sm text-primary p-2.5 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all duration-300 hover:scale-110"
                                    aria-label={isInWishlist(product.id) ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
                                  >
                                    <Heart size={18} className={isInWishlist(product.id) ? "fill-red-500 text-red-500 group-hover:fill-white group-hover:text-white" : ""} />
                                  </button>
                                </div>
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
                                <div className="flex items-center justify-center text-sm text-muted-foreground font-medium group-hover:text-primary transition-colors">
                                  Voir le détail
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </motion.div>
                      </ScrollAnimation>
                    ))}
                  </AnimatePresence>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Cartes cadeaux Section */}
        {selectedSection === "cartes" && (
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-primary mb-4">Cartes cadeaux</h2>
                <p className="text-primary/70">Offrez une expérience unique avec nos cartes cadeaux</p>
              </div>

              {!selectedGiftCardType ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {giftCardTypes.map((card, index) => (
                    <ScrollAnimation key={card.id} direction="up" delay={index * 100}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        onClick={() => setSelectedGiftCardType(card.id)}
                        className="bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                      >
                      <div className="relative h-48">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-2xl font-black text-primary mb-3">{card.title}</h3>
                        <p className="text-primary/70 mb-4 leading-relaxed">{card.description}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                          <span className="font-bold text-primary">
                            {card.minAmount > 0 ? `À partir de ${card.minAmount}€` : "Montant libre"}
                          </span>
                          <div className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm flex items-center justify-center">
                            Commander
                          </div>
                        </div>
                      </div>
                      </motion.div>
                    </ScrollAnimation>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-2xl mx-auto bg-white/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/60"
                >
                  <button
                    onClick={() => {
                      setSelectedGiftCardType(null)
                      setGiftCardAmount("")
                      setRecipientName("")
                      setRecipientEmail("")
                      setPurchaserName("")
                      setPurchaserEmail("")
                    }}
                    className="mb-6 text-primary hover:text-primary/70 flex items-center gap-2"
                  >
                    ← Retour
                  </button>

                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-black text-primary mb-2">
                        {giftCardTypes.find(t => t.id === selectedGiftCardType)?.title}
                      </h2>
                      <p className="text-primary/70">
                        {giftCardTypes.find(t => t.id === selectedGiftCardType)?.description}
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-primary mb-2">
                        Montant (€) *
                      </label>
                      <input
                        type="number"
                        min={giftCardTypes.find(t => t.id === selectedGiftCardType)?.minAmount || 10}
                        step="0.01"
                        value={giftCardAmount}
                        onChange={(e) => setGiftCardAmount(e.target.value)}
                        placeholder={`Minimum ${giftCardTypes.find(t => t.id === selectedGiftCardType)?.minAmount || 10}€`}
                        className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-primary mb-2">
                          Nom du destinataire
                        </label>
                        <input
                          type="text"
                          value={recipientName}
                          onChange={(e) => setRecipientName(e.target.value)}
                          className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-primary mb-2">
                          Email du destinataire *
                        </label>
                        <input
                          type="email"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-primary mb-2">
                          Votre nom *
                        </label>
                        <input
                          type="text"
                          value={purchaserName}
                          onChange={(e) => setPurchaserName(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-primary mb-2">
                          Votre email *
                        </label>
                        <input
                          type="email"
                          value={purchaserEmail}
                          onChange={(e) => setPurchaserEmail(e.target.value)}
                          required
                          className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <button
                      onClick={async () => {
                        if (!selectedGiftCardType) {
                          toast({
                            title: "Erreur",
                            description: "Veuillez sélectionner un type de carte cadeau",
                            variant: "destructive",
                          })
                          return
                        }

                        const selectedCard = giftCardTypes.find(t => t.id === selectedGiftCardType)
                        const cardAmount = parseFloat(giftCardAmount)

                        if (!cardAmount || cardAmount < selectedCard!.minAmount) {
                          toast({
                            title: "Erreur",
                            description: `Le montant minimum est de ${selectedCard!.minAmount}€`,
                            variant: "destructive",
                          })
                          return
                        }

                        if (!recipientEmail || !purchaserEmail) {
                          toast({
                            title: "Erreur",
                            description: "Veuillez remplir tous les champs",
                            variant: "destructive",
                          })
                          return
                        }

                        setGiftCardLoading(true)
                        try {
                          const user = await getCurrentUser()
                          const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

                          const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'
                          
                          const response = await fetch(
                            `${apiUrl}/api/gift-cards/purchase`,
                            {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                ...(token && { 'Authorization': `Bearer ${token}` })
                              },
                              body: JSON.stringify({
                                category: selectedCard!.category,
                                amount: cardAmount,
                                recipient_name: recipientName || undefined,
                                recipient_email: recipientEmail,
                                purchaser_name: purchaserName,
                                purchaser_email: purchaserEmail,
                                create_payment_intent: true
                              })
                            }
                          )

                          if (!response.ok) {
                            const errorData = await response.json().catch(() => ({ message: 'Erreur serveur' }))
                            throw new Error(errorData.message || `Erreur ${response.status}: ${response.statusText}`)
                          }

                          const data = await response.json()

                          if (!data.success) {
                            throw new Error(data.message || 'Erreur lors de la création de la carte cadeau')
                          }

                          if (data.data?.checkout_url) {
                            // Redirect directly to Stripe Checkout URL
                            window.location.href = data.data.checkout_url
                          } else if (data.data?.checkout_session_id || data.data?.checkoutSessionId) {
                            // Fallback: if only session ID is provided, construct the URL
                            // This shouldn't happen if backend is updated, but keeping for compatibility
                            const sessionId = data.data.checkout_session_id || data.data.checkoutSessionId
                            window.location.href = `https://checkout.stripe.com/pay/${sessionId}`
                          } else {
                            toast({
                              title: "Succès",
                              description: "Carte cadeau créée avec succès ! Le code vous a été envoyé par email.",
                            })
                            // Reset form
                            setSelectedGiftCardType(null)
                            setGiftCardAmount("")
                            setRecipientName("")
                            setRecipientEmail("")
                            setPurchaserName("")
                            setPurchaserEmail("")
                          }
                        } catch (error: any) {
                          console.error("Purchase error:", error)
                          toast({
                            title: "Erreur",
                            description: error.message || "Une erreur est survenue lors de l'achat",
                            variant: "destructive",
                          })
                        } finally {
                          setGiftCardLoading(false)
                        }
                      }}
                      disabled={giftCardLoading}
                      className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {giftCardLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Traitement...
                        </>
                      ) : (
                        <>
                          <Gift size={20} />
                          Commander pour {giftCardAmount ? `${parseFloat(giftCardAmount).toFixed(2)}€` : '...'}
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </section>
        )}

      {/* Commandes sur mesure */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        {/* <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay" /> */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-16 text-center shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-title mb-6 text-white tracking-tight">
              Commandes sur mesure
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light">
              Vous avez un projet particulier, une envie spécifique ou un besoin pour <br className="hidden sm:block" /> un événement ? Nous étudions les demandes au cas par cas, selon les possibilités de l’atelier.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-bold rounded-xl hover:bg-accent hover:text-primary transition-all duration-300 hover:scale-105 shadow-lg shadow-black/5"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
