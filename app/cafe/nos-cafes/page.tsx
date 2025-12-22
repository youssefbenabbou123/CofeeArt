"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NosCafes() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/carte"
            className="inline-flex items-center gap-2 text-primary/70 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Retour au menu</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              Nos <span className="text-[#8A8E74]">cafés</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Découvrez l'origine de nos grains, nos méthodes d'extraction et nos collaborations avec les meilleurs torréfacteurs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-16">
          {/* Origine des grains */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl font-black text-primary">Origine des grains</h2>
            </div>
            <div className="space-y-4 text-primary/80 leading-relaxed">
              <p>
                Nous sélectionnons rigoureusement nos grains de café auprès de producteurs engagés dans une agriculture durable et équitable. 
                Chaque origine est choisie pour ses caractéristiques uniques et son terroir exceptionnel.
              </p>
              <p>
                Nos cafés proviennent principalement d'Amérique latine (Colombie, Brésil, Guatemala) et d'Afrique de l'Est (Éthiopie, Kenya), 
                régions reconnues pour la qualité exceptionnelle de leurs récoltes.
              </p>
              <p>
                Nous privilégions les relations directes avec les producteurs, garantissant ainsi une traçabilité complète et un impact positif 
                sur les communautés locales.
              </p>
            </div>
          </motion.div>

          {/* Méthodes d'extraction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl font-black text-primary">Méthodes d'extraction</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Espresso</h3>
                <p className="text-primary/80 leading-relaxed">
                  Extraction sous pression de 9 bars, révélant les arômes intenses et la crème caractéristique. 
                  Notre machine professionnelle permet un contrôle précis de la température et du temps d'extraction.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Filtre / Chemex</h3>
                <p className="text-primary/80 leading-relaxed">
                  Méthode douce qui met en valeur la complexité des arômes. Le café filtre révèle des notes plus subtiles 
                  et une acidité équilibrée, parfaite pour découvrir les nuances de chaque origine.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Cold Brew</h3>
                <p className="text-primary/80 leading-relaxed">
                  Infusion à froid pendant 12 à 24 heures, créant un café doux, peu acide et naturellement sucré. 
                  Idéal pour les chaudes journées d'été.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Aeropress</h3>
                <p className="text-primary/80 leading-relaxed">
                  Méthode moderne combinant immersion et pression, produisant un café riche et aromatique en quelques minutes. 
                  Parfaite pour les amateurs de café nomades.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Collaboration avec torréfacteurs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60"
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl font-black text-primary">Collaboration avec torréfacteurs</h2>
            </div>
            <div className="space-y-4 text-primary/80 leading-relaxed">
              <p>
                Nous travaillons en étroite collaboration avec des torréfacteurs artisanaux parisiens et français, 
                partageant nos valeurs de qualité, de durabilité et d'excellence.
              </p>
              <p>
                Nos partenaires torréfacteurs maîtrisent l'art de la torréfaction, ajustant chaque profil selon l'origine 
                et la saison pour révéler le meilleur de chaque grain. Ils torréfient nos cafés en petites quantités, 
                garantissant une fraîcheur optimale.
              </p>
              <p>
                Cette collaboration nous permet d'offrir une rotation régulière de cafés d'exception, avec des sélections 
                limitées et des découvertes gustatives constantes pour nos clients.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}



