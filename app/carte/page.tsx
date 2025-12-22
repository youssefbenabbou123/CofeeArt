"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function Carte() {

  return (
    <div className="min-h-screen bg-background overflow-hidden">
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
              Notre <span className="text-[#8A8E74]">carte</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Découvrez nos cafés, pâtisseries et créations artisanales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="pt-10 pb-20 md:pt-12 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Menu Images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group rounded-[2rem] p-6 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{ backgroundColor: '#f2eadf' }}
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/MENU PARTIE 1.jpg"
                  alt="Menu Partie 1"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group rounded-[2rem] p-6 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden"
              style={{ backgroundColor: '#f2eadf' }}
            >
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/MENU PARTIE 2.jpg"
                  alt="Menu Partie 2"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>

          {/* Nos cafés */}
          <div className="mt-12 bg-white/70 backdrop-blur-xl rounded-[2rem] p-12 border border-primary/10 shadow-xl animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-title text-[#58604C] mb-4">Nos cafés</h3>
              <p className="text-[#58604C] mb-6">Découvrez l'origine de nos grains, nos méthodes d'extraction et nos collaborations</p>
              <Link
                href="/cafe/nos-cafes"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                En savoir plus
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                {
                  title: "Origine des grains",
                  desc: "Sélection de cafés de spécialité issus de micro-torréfacteurs partenaires.",
                },
                {
                  title: "Méthodes d'extraction",
                  desc: "Espresso, V60, Chemex : nous adaptons la méthode au profil aromatique.",
                },
                {
                  title: "Collaboration torréfacteurs",
                  desc: "Partenariats locaux pour des profils fraîchement torréfiés et traçables.",
                },
              ].map((item, i) => (
                <div key={item.title} className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                  <p className="text-primary/70 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
