"use client"

import Link from "next/link"
import { ArrowRight, Palette, Coffee, Users } from "lucide-react"

export default function Home() {
  return (
    <div className="pt-24">
      <section className="min-h-[600px] bg-gradient-to-br from-background to-accent flex items-center pt-8 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="hero-text mb-6">Bienvenue à Coffee Arts</h1>
              <p className="text-lg text-primary mb-8 leading-relaxed">
                Découvrez l'art de la céramique au cœur de Paris. Un espace unique combinant café artisanal, ateliers
                créatifs et boutique artisanale.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/ateliers" className="btn-primary">
                  <span className="flex items-center gap-2">
                    Réserver un atelier <ArrowRight size={20} />
                  </span>
                </Link>
                <Link href="/apropos" className="btn-secondary">
                  En savoir plus
                </Link>
              </div>
            </div>
            <div className="hidden md:flex justify-center">
              <img src="/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg" alt="Coffee Arts Café" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-16">Notre Concept</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Coffee,
                title: "Café Artisanal",
                description:
                  "Dégustez nos cafés sélectionnés avec soin, préparés par nos baristas passionnés dans une ambiance chaleureuse.",
              },
              {
                icon: Palette,
                title: "Ateliers Céramique",
                description:
                  "Apprenez l'art de la céramique avec nos instructeurs expérimentés. Du débutant au confirmé, tous les niveaux sont accueillis.",
              },
              {
                icon: Users,
                title: "Boutique Artisanale",
                description:
                  "Découvrez notre collection exclusive de pièces céramiques créées par nos artisans et partenaires de confiance.",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div
                  key={index}
                  className="bg-accent/30 p-8 rounded-lg hover:shadow-lg hover:-translate-y-1 transition-all border border-accent"
                >
                  <Icon className="text-primary mb-4" size={40} />
                  <h3 className="text-2xl font-bold text-primary mb-3">{item.title}</h3>
                  <p className="text-primary leading-relaxed">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="section-title mb-6">Explorez nos Ateliers</h2>
              <p className="text-primary text-lg mb-6 leading-relaxed">
                Que vous soyez novice ou expert, nos ateliers sont conçus pour vous permettre de créer, d'apprendre et
                de vous détendre. Découvrez le processus complet de création céramique.
              </p>
              <ul className="space-y-4 mb-8">
                {["Cours particuliers", "Ateliers en groupe", "Événements d'entreprise", "Anniversaires"].map(
                  (item, index) => (
                    <li key={index} className="flex items-center gap-3 text-primary font-medium">
                      <span className="w-3 h-3 bg-primary rounded-full"></span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <Link href="/ateliers" className="text-primary font-medium hover:text-accent transition-colors inline-flex items-center gap-2">
                Voir nos ateliers <ArrowRight size={20} />
              </Link>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <img src="/ceramic-pottery-workshop-hands-creating-clay-potte.jpg" alt="Ateliers Céramique" className="rounded-lg shadow-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Prêt à commencer votre expérience?</h2>
          <p className="text-primary-foreground text-lg mb-10 leading-relaxed opacity-90">
            Découvrez notre sélection de créations artisanales ou réservez votre prochain atelier dès maintenant.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/boutique"
              className="px-8 py-3 bg-accent text-primary font-bold rounded-lg hover:shadow-lg transition-all"
            >
              Visiter la Boutique
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 border-2 border-primary-foreground text-primary-foreground font-bold rounded-lg hover:bg-primary/80 transition-all"
            >
              Nous Contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
