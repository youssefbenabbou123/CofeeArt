"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Palette, Coffee, Users, Star, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Home() {
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
          <div className="animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium mb-6 tracking-wider uppercase">
              Paris 11ème
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 tracking-tight leading-tight animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
            L'Art de la <br />
            <span className="text-accent italic">Céramique</span> & du Café
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/70">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white rounded-full animate-scroll" />
          </div>
        </div>
      </section>

      {/* Concept Section - Bento Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Notre Concept</h2>
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
                  <Coffee size={24} />
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
              <Palette className="text-accent w-10 h-10" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Ateliers Créatifs</h3>
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
                <Users className="text-primary w-10 h-10" />
                <div className="bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary uppercase">
                  Fait main
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-primary mb-2">La Boutique</h3>
                <p className="text-primary/80 text-sm mb-4">Céramiques artisanales et objets uniques.</p>
                <Link href="/boutique" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors shadow-lg">
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials - Scrolling Marquee */}
      <section className="py-16 bg-primary overflow-hidden">
        <div className="flex whitespace-nowrap">
          <div className="flex gap-8 animate-marquee">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-8">
                {[
                  "Ambiance incroyable", "Café délicieux", "Ateliers passionnants", "Super profs", "Lieu magnifique",
                  "Céramiques uniques", "Moment de détente", "À refaire absolument"
                ].map((text, j) => (
                  <div key={`${i}-${j}`} className="flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-sm rounded-full border border-white/10 flex-shrink-0">
                    <Star className="text-accent fill-accent" size={16} />
                    <span className="text-white font-medium text-lg">{text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
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
          <p className="text-xl text-primary/70 mb-12 max-w-2xl mx-auto">
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
