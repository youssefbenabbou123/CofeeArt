"use client"

import Link from "next/link"
import { ShoppingCart } from "lucide-react"

export default function Boutique() {
  const products = [
    { id: 1, name: "Tasse Artisanale", price: "24€", category: "Tasses", emoji: "☕" },
    { id: 2, name: "Assiette Céramique", price: "32€", category: "Assiettes", emoji: "🍽️" },
    { id: 3, name: "Bol Fait Main", price: "28€", category: "Bols", emoji: "🥣" },
    { id: 4, name: "Vase Minimaliste", price: "45€", category: "Vases", emoji: "🌿" },
    { id: 5, name: "Théière Artisanale", price: "55€", category: "Théières", emoji: "🫖" },
    { id: 6, name: "Set de Baguettes", price: "18€", category: "Accessoires", emoji: "🥢" },
    { id: 7, name: "Pot Décoratif", price: "38€", category: "Décoration", emoji: "🏺" },
    { id: 8, name: "Plateaux Géométriques", price: "42€", category: "Plateaux", emoji: "📦" },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-neutral-warm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="hero-text mb-4">Notre Boutique</h1>
          <p className="text-xl text-primary-light">
            Découvrez notre sélection de pièces céramiques uniques créées par nos artisans.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-neutral-light py-8 border-b-2 border-neutral-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-primary text-neutral-light rounded-md font-semibold">Tous</button>
            <button className="px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-neutral-light transition-colors">
              Tasses
            </button>
            <button className="px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-neutral-light transition-colors">
              Assiettes
            </button>
            <button className="px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-neutral-light transition-colors">
              Vases
            </button>
            <button className="px-4 py-2 border-2 border-primary text-primary rounded-md hover:bg-primary hover:text-neutral-light transition-colors">
              Décoration
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-neutral-warm rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="aspect-square bg-primary flex items-center justify-center text-6xl">
                  {product.emoji}
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary-light mb-2">{product.category}</p>
                  <h3 className="font-bold text-primary mb-3">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg text-accent">{product.price}</span>
                    <button className="p-2 hover:bg-primary hover:text-neutral-light rounded-md transition-colors">
                      <ShoppingCart size={20} className="text-primary" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold mb-4 text-primary-foreground">Commandes spéciales et en gros</h2>
          <p className="text-primary-foreground mb-6 opacity-90">Vous recherchez une commande personnalisée ou une collaboration?</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-accent text-primary font-bold rounded-md hover:bg-neutral-warm transition-colors"
          >
            Nous Contacter
          </Link>
        </div>
      </section>
    </div>
  )
}
