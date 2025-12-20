"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { fetchProducts, fetchWorkshops, fetchBlogs, type Product } from "@/lib/api"

interface SignatureItem {
  id: string
  category: string
  name: string
  image?: string
  video?: string
  link?: string
  type: 'image' | 'video'
}

export default function Home() {
  const [signatureItems, setSignatureItems] = useState<SignatureItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSignatureItems() {
      try {
        const [products, workshops, blogs] = await Promise.all([
          fetchProducts(),
          fetchWorkshops(),
          fetchBlogs()
        ])

        // Create signature items from fetched data
        const items: SignatureItem[] = []

        // Add video item (Coffee pouring)
        items.push({
          id: 'coffee-pouring',
          category: 'Café du moment',
          name: 'Café de spécialité',
          video: '/coffevideo.mp4',
          type: 'video',
          link: '/carte'
        })

        // Helper function to check if product is goodies (exclude prints, affiches, tote bags)
        const isGoodies = (product: Product & { category?: string }): boolean => {
          const titleLower = product.title.toLowerCase()
          const category = product.category?.toLowerCase() || ''
          
          return (
            titleLower.includes('print') ||
            titleLower.includes('affiche') ||
            titleLower.includes('poster') ||
            titleLower.includes('tote') ||
            titleLower.includes('sac') ||
            category === 'goodies / lifestyle' ||
            category === 'tote bags' ||
            category === 'affiches / prints'
          )
        }

        // Filter out goodies and get only real products
        const realProducts = products.filter(p => !isGoodies(p))

        // Add real products (up to 3) with categories DRINK, BAKE, FOOD
        realProducts.slice(0, 3).forEach((product, index) => {
          const categories = ['DRINK', 'BAKE', 'FOOD']
          items.push({
            id: product.id,
            category: categories[index] || 'BAKE',
            name: product.title.toLowerCase(),
            image: product.image || '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg',
            type: 'image',
            link: `/boutique/${product.id}`
          })
        })

        // Add workshops (up to 2)
        workshops.slice(0, 2).forEach((workshop) => {
          items.push({
            id: workshop.id,
            category: 'ATELIER',
            name: workshop.title.toLowerCase(),
            image: workshop.image,
            type: 'image',
            link: `/ateliers#${workshop.id}`
          })
        })

        // Add blog/coffee of the moment (1 item)
        if (blogs.length > 0) {
          items.push({
            id: blogs[0].id,
            category: 'CAFÉ DU MOMENT',
            name: blogs[0].title.toLowerCase(),
            image: blogs[0].image,
            type: 'image',
            link: `/blog/${blogs[0].slug || blogs[0].id}`
          })
        }

        // Ensure we have exactly 8 items (pad with placeholders if needed)
        while (items.length < 8) {
          items.push({
            id: `placeholder-${items.length}`,
            category: 'BAKE',
            name: 'nouveauté',
            image: '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg',
            type: 'image'
          })
        }

        setSignatureItems(items.slice(0, 8))
      } catch (error) {
        console.error('Error loading signature items:', error)
        // Fallback to placeholder items
        setSignatureItems([
          {
            id: 'coffee-pouring',
            category: 'Café du moment',
            name: 'Café de spécialité',
            video: '/coffevideo.mp4',
            type: 'video',
            link: '/carte'
          },
          {
            id: 'flat-white',
            category: 'DRINK',
            name: 'flat white',
            image: '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg',
            type: 'image',
            link: '/carte'
          },
          {
            id: 'espresso-tonic',
            category: 'DRINK',
            name: 'espresso tonic',
            image: '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg',
            type: 'image',
            link: '/carte'
          },
          {
            id: 'cinnamon-rolls',
            category: 'BAKE',
            name: 'cinnamon & cardamom rolls',
            image: '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg',
            type: 'image',
            link: '/boutique'
          },
          {
            id: 'matcha',
            category: 'DRINK',
            name: 'matcha',
            image: '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg',
            type: 'image',
            link: '/carte'
          },
          {
            id: 'granolas',
            category: 'FOOD',
            name: 'homemade granolas',
            image: '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg',
            type: 'image',
            link: '/boutique'
          },
          {
            id: 'banana-bread',
            category: 'BAKE',
            name: 'banana bread',
            image: '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg',
            type: 'image',
            link: '/boutique'
          },
          {
            id: 'matcha-cookies',
            category: 'BAKE',
            name: 'matcha cookies',
            image: '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg',
            type: 'image',
            link: '/boutique'
          }
        ])
      } finally {
        setLoading(false)
      }
    }

    loadSignatureItems()
  }, [])
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg"
            alt="Coffee Arts Paris Interior"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight leading-tight animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
            L'Art de la <br />
            <span className="text-accent italic">Céramique</span> & du Café
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
            Un espace hybride unique où la créativité rencontre la dégustation.
            Ateliers, Boutique & Coffee Shop.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
            <Link href="/ateliers" className="group relative px-8 py-4 bg-accent text-primary font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center gap-2">
                Réserver un atelier <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link href="/carte" className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
              Découvrir la carte
            </Link>
          </div>
        </div>

      </section>

      {/* Concept Section - Bento Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Notre concept</h2>
          <p className="text-primary/70 text-lg max-w-2xl mx-auto">
            Trois univers réunis en un seul lieu pour une expérience sensorielle complète.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[600px]">
          {/* Card 1: Café - Large Left */}
          <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl cursor-pointer">
            <Image
              src="/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg"
              alt="Café"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-2 text-accent">
                  <span className="font-bold uppercase tracking-wider text-sm">Coffee Shop</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Café de Spécialité</h3>
                <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Des grains sélectionnés avec soin, torréfiés localement et préparés par nos baristas passionnés.
                </p>
                <Link href="/carte" className="inline-flex items-center gap-2 text-white font-medium border-b border-accent pb-1 hover:text-accent transition-colors">
                  Voir la carte <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Ateliers - Top Right */}
          <div className="relative group overflow-hidden rounded-3xl cursor-pointer min-h-[280px]">
            <Image
              src="/ceramic-pottery-workshop-hands-creating-clay-potte.jpg"
              alt="Ateliers"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-primary/80 group-hover:bg-primary/70 transition-colors p-8 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ateliers créatifs</h3>
                <p className="text-white/80 text-sm mb-4">Initiez-vous au tournage et au modelage.</p>
                <Link href="/ateliers" className="absolute inset-0" aria-label="Voir les ateliers" />
              </div>
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                <ArrowUpRight className="text-white" size={20} />
              </div>
            </div>
          </div>

          {/* Card 3: Boutique - Bottom Right */}
          <div className="relative group overflow-hidden rounded-3xl cursor-pointer min-h-[280px] bg-[#E8D6C1]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl -ml-5 -mb-5" />

            <div className="relative h-full p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                  Fait main
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">La boutique</h3>
                <p className="text-primary/80 text-sm mb-4">Céramiques artisanales et objets uniques.</p>
                <Link href="/boutique" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg">
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signatures Section - Video/Photos & New Items */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Signatures</h2>
          <p className="text-primary/70 text-lg max-w-2xl mx-auto">
            Vidéo / photos du lieu et mise en avant des nouveautés (produits, ateliers, café du moment).
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-neutral-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {signatureItems.map((item) => {
              const content = (
                <div className="relative group overflow-hidden rounded-2xl aspect-square cursor-pointer bg-neutral-100">
                  {item.type === 'video' ? (
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to image if video fails to load
                        const target = e.target as HTMLVideoElement
                        target.style.display = 'none'
                        const img = document.createElement('img')
                        img.src = item.image || '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg'
                        img.className = 'w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                        target.parentElement?.appendChild(img)
                      }}
                    />
                  ) : (
                    <Image
                      src={item.image || '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    {/* Category at top */}
                    <div className="self-start">
                      <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-wider bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    {/* Name at bottom */}
                    <div className="self-start">
                      <h3 className="text-white font-medium text-sm md:text-base leading-tight drop-shadow-lg">
                        {item.name}
                      </h3>
                    </div>
                  </div>
                </div>
              )

              return item.link ? (
                <Link key={item.id} href={item.link} className="block">
                  {content}
                </Link>
              ) : (
                <div key={item.id}>{content}</div>
              )
            })}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-100 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-primary/5 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-primary mb-8 leading-tight">
            Prêt à mettre les mains <br /> dans la terre ?
          </h2>
          <p className="text-xl text-primary/70 mb-8 max-w-2xl mx-auto">
            Rejoignez-nous pour un moment de création et de partage. Réservez votre atelier ou passez nous voir pour un café.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/ateliers" className="btn-primary text-lg px-10 py-4 shadow-xl shadow-primary/20">
              Voir le planning
            </Link>
            <Link href="/contact" className="btn-secondary text-lg px-10 py-4">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
