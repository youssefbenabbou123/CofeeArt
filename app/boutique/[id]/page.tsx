"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ShoppingCart, Heart, Share2, Check, Truck, Shield } from "lucide-react"
import { useState, use } from "react"

// Product data with full details
const products = [
  { 
    id: 1, 
    name: "Tasse Artisanale", 
    price: "24€", 
    category: "Tasses", 
    image: "/boutique/tasse-artisanale.jpg",
    description: "Une tasse artisanale unique, façonnée à la main par nos céramistes. Chaque pièce est unique et témoigne du savoir-faire traditionnel. Parfaite pour votre café du matin ou votre thé de l'après-midi.",
    details: [
      "Façonné à la main",
      "Céramique émaillée",
      "Lavable au lave-vaisselle",
      "Capacité: 250ml",
      "100% fait en France"
    ],
    dimensions: "H: 9cm, D: 8cm",
    material: "Céramique émaillée"
  },
  { 
    id: 2, 
    name: "Assiette Céramique", 
    price: "32€", 
    category: "Assiettes", 
    image: "/boutique/Assiette-Artisanale.jpg",
    description: "Une assiette céramique élégante et fonctionnelle, parfaite pour sublimer vos plats. Le design minimaliste met en valeur la qualité de la céramique artisanale.",
    details: [
      "Design minimaliste",
      "Surface lisse et douce",
      "Lavable au lave-vaisselle",
      "Microwaves safe",
      "Pièce unique"
    ],
    dimensions: "D: 28cm",
    material: "Céramique fine"
  },
  { 
    id: 3, 
    name: "Bol Fait Main", 
    price: "28€", 
    category: "Bols", 
    image: "/boutique/bol-fait.jpg",
    description: "Un bol artisanal chaleureux et généreux, idéal pour vos soupes, salades ou céréales. Sa forme ergonomique et sa finition soignée en font un objet du quotidien raffiné.",
    details: [
      "Forme ergonomique",
      "Finition soignée",
      "Lavable au lave-vaisselle",
      "Capacité: 500ml",
      "Texture naturelle"
    ],
    dimensions: "H: 7cm, D: 18cm",
    material: "Grès émaillé"
  },
  { 
    id: 4, 
    name: "Vase Minimaliste", 
    price: "45€", 
    category: "Vases", 
    image: "/boutique/vase-minimaliste.jpg",
    description: "Un vase minimaliste aux lignes épurées qui met en valeur vos bouquets. Design contemporain alliant esthétique et fonctionnalité, parfait pour créer une ambiance zen.",
    details: [
      "Design épuré",
      "Lignes modernes",
      "Texture mate",
      "Hauteur: 25cm",
      "Idéal pour fleurs sèches ou fraîches"
    ],
    dimensions: "H: 25cm, D: 12cm",
    material: "Céramique brute"
  },
  { 
    id: 5, 
    name: "Théière Artisanale", 
    price: "55€", 
    category: "Théières", 
    image: "/boutique/Théière-Artisanale.jpg",
    description: "Une théière artisanale élégante, parfaite pour vos cérémonies de thé. Sa forme traditionnelle et son design raffiné en font un objet de collection.",
    details: [
      "Design traditionnel",
      "Poignée ergonomique",
      "Passe-thé intégré",
      "Capacité: 600ml",
      "Conserve la chaleur"
    ],
    dimensions: "H: 18cm, L: 20cm",
    material: "Porcelaine fine"
  },
  { 
    id: 6, 
    name: "Set de Baguettes", 
    price: "18€", 
    category: "Accessoires", 
    image: "/boutique/Set de Baguettes.webp",
    description: "Un set de baguettes en céramique artisanale, alliant tradition et modernité. Parfait pour accompagner vos plats asiatiques ou pour une décoration élégante.",
    details: [
      "Set de 2 baguettes",
      "Design élégant",
      "Finitions soignées",
      "Longueur: 23cm",
      "Faciles à tenir"
    ],
    dimensions: "L: 23cm",
    material: "Céramique laquée"
  },
  { 
    id: 7, 
    name: "Pot Décoratif", 
    price: "38€", 
    category: "Décoration", 
    image: "/boutique/Pot Décoratif.png",
    description: "Un pot décoratif aux motifs subtils, parfait pour apporter une touche d'élégance à votre intérieur. Peut également servir de rangement pour vos objets précieux.",
    details: [
      "Motifs subtils",
      "Versatile",
      "Design unique",
      "Hauteur: 15cm",
      "Parfait pour décoration"
    ],
    dimensions: "H: 15cm, D: 14cm",
    material: "Céramique décorative"
  },
  { 
    id: 8, 
    name: "Plateaux Géométriques", 
    price: "42€", 
    category: "Plateaux", 
    image: "/boutique/Plateaux Géométriques.jpg",
    description: "Des plateaux géométriques modernes aux formes épurées. Parfaits pour servir vos apéritifs, petits-déjeuners ou comme éléments décoratifs.",
    details: [
      "Design géométrique",
      "Set de 2 plateaux",
      "Formes différentes",
      "Faciles à nettoyer",
      "Polyvalents"
    ],
    dimensions: "Variable selon pièce",
    material: "Céramique émaillée"
  },
]

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const productId = parseInt(id)
  const product = products.find(p => p.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

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

  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3)

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
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg border-2 transition-colors ${
                    isFavorite
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  }`}
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </button>
                <button className="p-3 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-accent/30 text-primary text-sm font-semibold rounded-full mb-4">
                  {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                  {product.name}
                </h1>
                <div className="text-3xl font-bold text-primary mb-6">
                  {product.price}
                </div>
              </div>

              <p className="text-lg text-primary-light leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Product Details */}
              <div className="mb-8 space-y-3">
                <h3 className="font-bold text-lg text-primary mb-3">Caractéristiques</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-3 text-primary">
                      <Check size={18} className="text-accent flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mb-8 p-4 bg-neutral-warm rounded-lg">
                <h3 className="font-bold text-lg text-primary mb-3">Spécifications</h3>
                <div className="space-y-2 text-sm text-primary-light">
                  <div><span className="font-semibold">Dimensions:</span> {product.dimensions}</div>
                  <div><span className="font-semibold">Matériau:</span> {product.material}</div>
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mt-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-semibold text-primary">Quantité:</span>
                  <div className="flex items-center gap-2 border-2 border-primary rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-primary font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-4 rounded-lg font-bold text-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-3 mb-4">
                  <ShoppingCart size={24} />
                  Ajouter au panier
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
        <section className="py-16 bg-neutral-light">
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
                      alt={relatedProduct.name}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-primary-light mb-2">{relatedProduct.category}</p>
                    <h3 className="font-bold text-primary mb-2">{relatedProduct.name}</h3>
                    <span className="font-bold text-lg text-primary">{relatedProduct.price}</span>
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

