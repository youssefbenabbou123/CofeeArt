"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
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
          '/SIGNATURES - PHOTO 8.jpg'
        ]

        signaturePhotos.forEach((photo, index) => {
          const photoIndex = index + 2; // Photo 2, 3, 4, 5, 6, 7, 8
          let link: string | undefined;
          
          // Configure links based on photo number
          if (photoIndex === 3) {
            link = '/blog'; // Link to blog/articles page
          } else if (photoIndex === 6) {
            link = '/ateliers'; // Link to ceramic/ateliers page
          }
          // Photo 2, 4, 5, 7, 8 have no link (undefined = no redirection)
          
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
            image: '/SIGNATURES - PHOTO 8.jpg',
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
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/PAGE D'ACCUEIL - PHOTO 1.jpg"
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
            <span className="italic text-[#e9d7c1]">céramique</span> & du café
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
            Un espace hybride unique où la créativité rencontre la dégustation.
            Ateliers, Boutique & Coffee Shop.
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

      {/* Concept Section - Bento Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4 text-[#58604C]">Notre concept</h2>
          <p className="text-[#58604C] text-lg max-w-2xl mx-auto">
            Trois univers réunis en un seul lieu pour une expérience sensorielle complète.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Café */}
          <div className="relative group overflow-hidden rounded-3xl cursor-pointer min-h-[400px]">
            <Image
              src="/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg"
              alt="Café"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="mb-2 text-accent h-5">
                  <span className="font-bold uppercase tracking-wider text-sm">Coffee Shop</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight h-16">Café de spécialité</h3>
                <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Grains sélectionnés et torréfiés localement.
                </p>
                <Link href="/carte" className="inline-flex items-center justify-center text-white font-medium border-b border-accent pb-1 hover:text-accent transition-colors">
                  Voir la carte
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Ateliers */}
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
                  <span className="font-bold uppercase tracking-wider text-sm">Ateliers</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight h-16">Ateliers créatifs</h3>
                <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Initiez-vous au tournage et au modelage.
                </p>
                <Link href="/ateliers" className="inline-flex items-center justify-center text-white font-medium border-b border-accent pb-1 hover:text-accent transition-colors">
                  Découvrir
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Boutique */}
          <div className="relative group overflow-hidden rounded-3xl cursor-pointer min-h-[400px]">
            <Image
              src="/boutique/tasse-artisanale.jpg"
              alt="La boutique"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="mb-2 text-accent h-5">
                  <span className="font-bold uppercase tracking-wider text-sm">Fait main</span>
                </div>
                <h3 className="text-3xl font-bold text-white mb-2 leading-tight h-16">La boutique</h3>
                <p className="text-white/80 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Céramiques artisanales et objets uniques.
                </p>
                <Link href="/boutique" className="inline-flex items-center justify-center text-white font-medium border-b border-accent pb-1 hover:text-accent transition-colors">
                  Découvrir
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Signatures Section - Video/Photos & New Items */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4 text-[#58604C]">Signatures</h2>
          <p className="text-[#58604C] text-lg max-w-2xl mx-auto">
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
          <h2 className="text-4xl md:text-6xl font-title text-[#58604C] mb-8 leading-tight">
            Prêt à mettre les mains <br /> dans la terre ?
          </h2>
          <p className="text-xl text-[#58604C] mb-8 max-w-2xl mx-auto">
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

