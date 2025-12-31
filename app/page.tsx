"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { fetchProducts, fetchWorkshops, fetchBlogs, type Product } from "@/lib/api"
import { ScrollAnimation } from "@/components/scroll-animation"

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
  const [ceramicProductId, setCeramicProductId] = useState<string | null>(null)
  const [latestProducts, setLatestProducts] = useState<Product[]>([])

  useEffect(() => {
    async function loadSignatureItems() {
      try {
        // Fetch products to get the "Gobelet Isotherme X Coffee Arts Paris" product ID
        const products = await fetchProducts()
        const gobeletProduct = products.find(p =>
          p.title?.toLowerCase().includes('gobelet') &&
          p.title?.toLowerCase().includes('isotherme')
        ) || products[0] // Fallback to first product if not found

        if (gobeletProduct) {
          setCeramicProductId(gobeletProduct.id)
        }

        // Get the 3 latest products (sorted by created_at DESC)
        const sortedProducts = [...products].sort((a, b) => {
          const dateA = a.created_at ? new Date(a.created_at).getTime() : 0
          const dateB = b.created_at ? new Date(b.created_at).getTime() : 0
          return dateB - dateA
        })
        setLatestProducts(sortedProducts.slice(0, 3))

        // Create signature items with video and static photos
        const items: SignatureItem[] = []

        // Add video item (Coffee pouring) - keep this intact
        items.push({
          id: 'coffee-pouring',
          category: 'Café du moment',
          name: 'Café de spécialité',
          video: '/coffevideo.mp4',
          type: 'video',
          link: '/carte'
        })

        // Add static signature photos (PHOTO 2 to PHOTO 8)
        const signaturePhotos = [
          '/SIGNATURES - PHOTO 2.jpg',
          '/SIGNATURES - PHOTO 3.jpg',
          '/SIGNATURES - PHOTO 4.jpg',
          '/SIGNATURES - PHOTO 5.jpg',
          '/SIGNATURES - PHOTO 6.jpg',
          '/SIGNATURES - PHOTO 7.jpg',
          '/SIGNATURES - PHOTO 8 REMPLACEMENT.JPG'
        ]

        signaturePhotos.forEach((photo, index) => {
          const photoIndex = index + 2; // Photo 2, 3, 4, 5, 6, 7, 8
          let link: string | undefined;

          // Configure links based on photo number
          if (photoIndex === 3) {
            // 3ème photo - link to Gobelet Isotherme X Coffee Arts Paris product
            link = gobeletProduct ? `/boutique/${gobeletProduct.id}` : undefined;
          } else if (photoIndex === 6) {
            link = '/ateliers'; // Link to ceramic/ateliers page
          }
          // Photo 2, 5, 7, 8 have no link (undefined = no redirection)

          items.push({
            id: `signature-photo-${photoIndex}`,
            category: 'Signature',
            name: `Photo ${photoIndex}`,
            image: photo,
            type: 'image',
            link: link
          })
        })

        setSignatureItems(items.slice(0, 8))
      } catch (error) {
        console.error('Error loading signature items:', error)
        // Fallback to video and static photos
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
            id: 'signature-photo-2',
            category: 'Signature',
            name: 'Photo 2',
            image: '/SIGNATURES - PHOTO 2.jpg',
            type: 'image'
            // No link - no redirection
          },
          {
            id: 'signature-photo-3',
            category: 'Signature',
            name: 'Photo 3',
            image: '/SIGNATURES - PHOTO 3.jpg',
            type: 'image',
            link: '/blog' // Link to blog/articles page
          },
          {
            id: 'signature-photo-4',
            category: 'Signature',
            name: 'Photo 4',
            image: '/SIGNATURES - PHOTO 4.jpg',
            type: 'image'
            // No link - no redirection
          },
          {
            id: 'signature-photo-5',
            category: 'Signature',
            name: 'Photo 5',
            image: '/SIGNATURES - PHOTO 5.jpg',
            type: 'image'
            // No link - no redirection
          },
          {
            id: 'signature-photo-6',
            category: 'Signature',
            name: 'Photo 6',
            image: '/SIGNATURES - PHOTO 6.jpg',
            type: 'image',
            link: '/ateliers' // Link to ceramic/ateliers page
          },
          {
            id: 'signature-photo-7',
            category: 'Signature',
            name: 'Photo 7',
            image: '/SIGNATURES - PHOTO 7.jpg',
            type: 'image'
            // No link - no redirection
          },
          {
            id: 'signature-photo-8',
            category: 'Signature',
            name: 'Photo 8',
            image: '/SIGNATURES - PHOTO 8 REMPLACEMENT.JPG',
            type: 'image'
            // No link - no redirection
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
        {/* Background Video with Overlay */}
        <div className="absolute inset-0 z-0">
          <video
            src="/VIDEO PAGE D'ACCUEIL.mov"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tight leading-tight animate-fade-up opacity-0 text-[#e9d7c1]" style={{ animationDelay: "0.4s" }}>
            Specialty coffee & Pottery studio
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.5s" }}>
            Sip, create and connect
          </p>
          <p className="text-xl md:text-2xl text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
            Un lieu hybride où l'on vient savourer un café, créer de ses mains et partager un moment, simplement.
          </p>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.65s" }}>
            25 boulevard du Temple, 75003 Paris
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
            <Link href="/ateliers" className="group relative px-8 py-4 bg-[#e9d7c1] text-[#58604C] font-bold rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95">
              <span className="relative z-10 flex items-center justify-center">
                Réserver un atelier
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
            <Link href="/carte" className="group px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
              Découvrir la carte
            </Link>
          </div>
        </div>

      </section>

      {/* Signatures Section - Video/Photos & New Items */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollAnimation direction="up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="section-title mb-4 text-[#58604C]">Au cœur de Coffee Arts Paris</h2>
            <p className="text-[#58604C] text-lg max-w-2xl mx-auto">
              Des images pour découvrir l'ambiance du lieu, ses matières, et les instants qui s'y vivent au quotidien.
            </p>
          </div>
        </ScrollAnimation>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-neutral-200 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {signatureItems.map((item, index) => {
              const content = (
                <div className="relative group overflow-hidden rounded-2xl aspect-square cursor-pointer bg-neutral-100">
                  {item.type === 'video' ? (
                    <video
                      src={item.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to image if video fails to load
                        const target = e.target as HTMLVideoElement
                        target.style.display = 'none'
                        const img = document.createElement('img')
                        img.src = item.image || '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg'
                        img.className = 'w-full h-full object-cover transition-all duration-700 group-hover:scale-110'
                        target.parentElement?.appendChild(img)
                      }}
                    />
                  ) : (
                    <Image
                      src={item.image || '/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  )}
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700" />
                </div>
              )

              return item.link ? (
                <ScrollAnimation key={item.id} direction="up" delay={index * 50}>
                  <Link href={item.link} className="block">
                    {content}
                  </Link>
                </ScrollAnimation>
              ) : (
                <ScrollAnimation key={item.id} direction="up" delay={index * 50}>
                  {content}
                </ScrollAnimation>
              )
            })}
          </div>
        )}
      </section>

      {/* Concept Section - Bento Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollAnimation direction="up" delay={0}>
          <div className="text-center mb-16">
            <h2 className="section-title mb-4 text-[#58604C]">Trois expériences, un même lieu</h2>
            <p className="text-[#58604C] text-lg max-w-2xl mx-auto">
              Un café de spécialité, des ateliers créatifs et une boutique, pensés pour se compléter.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Café */}
          <ScrollAnimation direction="up" delay={100}>
            <div className="relative group overflow-hidden rounded-3xl cursor-pointer min-h-[400px]">
              <Image
                src="/photo1.jpg"
                alt="Café"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2 text-accent h-5">
                    <span className="font-bold uppercase tracking-wider text-sm">DÉGUSTER</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 leading-tight h-16">Café de spécialité</h3>
                  <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Grains sélectionnés et torréfiés localement.
                  </p>
                  <Link href="/carte" className="inline-flex items-center justify-center text-white font-medium border-b border-accent pb-1 hover:text-accent transition-colors">
                    Découvrir la carte
                  </Link>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Card 2: Ateliers */}
          <ScrollAnimation direction="up" delay={200}>
            <div className="relative group overflow-hidden rounded-3xl cursor-pointer min-h-[400px]">
              <Image
                src="/ceramic-pottery-workshop-hands-creating-clay-potte.jpg"
                alt="Ateliers"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2 text-accent h-5">
                    <span className="font-bold uppercase tracking-wider text-sm">CRÉER</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 leading-tight h-16">Ateliers créatifs</h3>
                  <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Initiez-vous au tournage et au modelage.
                  </p>
                  <Link href="/ateliers" className="inline-flex items-center justify-center text-white font-medium border-b border-accent pb-1 hover:text-accent transition-colors">
                    Participer à un atelier
                  </Link>
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Card 3: Boutique */}
          <ScrollAnimation direction="up" delay={300}>
            <div className="relative group overflow-hidden rounded-3xl cursor-pointer min-h-[400px]">
              <Image
                src="/image3.jpg"
                alt="La boutique"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2 text-accent h-5">
                    <span className="font-bold uppercase tracking-wider text-sm">EMPORTER</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 leading-tight h-16">La boutique</h3>
                  <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    Céramiques artisanales et objets uniques.
                  </p>
                  <Link href="/boutique" className="inline-flex items-center justify-center text-white font-medium border-b border-accent pb-1 hover:text-accent transition-colors">
                    Explorer la boutique
                  </Link>
                </div>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Latest Products Section */}
      {latestProducts.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <ScrollAnimation direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="section-title mb-4 text-[#58604C]">Nos dernières nouveautés</h2>
              <p className="text-[#58604C] text-lg max-w-2xl mx-auto">
                Découvrez nos 3 derniers produits ajoutés à la boutique.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestProducts.map((product, index) => (
              <ScrollAnimation key={product.id} direction="up" delay={index * 100}>
                <Link href={`/boutique/${product.id}`} className="group block h-full">
                  <div className="relative h-full bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2">
                    <div className="aspect-[4/5] relative overflow-hidden bg-neutral-100">
                      <Image
                        src={product.image || '/boutique/placeholder.jpg'}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-lg text-primary group-hover:text-primary/80 transition-colors line-clamp-2">
                          {product.title}
                        </h3>
                        <span className="font-bold text-lg text-primary bg-primary/5 px-2 py-1 rounded-md flex-shrink-0 ml-2">
                          {typeof product.price === 'number' ? product.price.toFixed(2) : parseFloat(String(product.price)).toFixed(2)}€
                        </span>
                      </div>
                      {product.description && (
                        <p className="text-sm text-primary/70 line-clamp-2 mb-4">
                          {product.description}
                        </p>
                      )}
                      <div className="w-full h-px bg-primary/10 my-4 group-hover:bg-primary/20 transition-colors" />
                      <div className="flex items-center justify-center text-sm text-muted-foreground font-medium group-hover:text-primary transition-colors">
                        Voir le détail
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollAnimation>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-neutral-100 -z-10" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-primary/5 blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollAnimation direction="up" delay={0}>
            <h2 className="text-4xl md:text-6xl font-title text-[#58604C] mb-8 leading-tight">
              Un moment autour du café <br /> et de la création
            </h2>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={100}>
            <p className="text-xl text-[#58604C] mb-8 max-w-2xl mx-auto">
              Un lieu où l'on vient créer, discuter, boire un café et s'attarder.<br />Des moments simples, à vivre et à partager.
            </p>
          </ScrollAnimation>
          <ScrollAnimation direction="up" delay={200}>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/ateliers" className="btn-primary text-lg px-10 py-4 shadow-xl shadow-primary/20">
                Découvrir les ateliers
              </Link>
              <Link href="/boutique" className="btn-secondary text-lg px-10 py-4">
                Accéder à la boutique
              </Link>
            </div>
          </ScrollAnimation>
        </div>
      </section>

    </div>
  )
}

