"use client"

import Link from "next/link"
import { ArrowRight, Clock, Users } from "lucide-react"

export default function Ateliers() {
  const workshops = [
    {
      id: 1,
      title: "Atelier Débutant",
      description: "Découvrez les bases du travail de la terre et créez votre première pièce céramique.",
      duration: "2 heures",
      participants: "1-4 personnes",
      price: "45€",
      image: "🎨",
    },
    {
      id: 2,
      title: "Atelier Intermédiaire",
      description: "Perfectionner votre technique et explorer différentes formes et textures.",
      duration: "3 heures",
      participants: "2-6 personnes",
      price: "65€",
      image: "🏺",
    },
    {
      id: 3,
      title: "Atelier en Groupe",
      description: "Une expérience collaborative idéale pour les équipes et amis.",
      duration: "2.5 heures",
      participants: "6-20 personnes",
      price: "40€/pers",
      image: "👥",
    },
    {
      id: 4,
      title: "Atelier Privatisé",
      description: "Un moment privé et personnalisé pour votre groupe spécial.",
      duration: "À définir",
      participants: "Personnalisé",
      price: "Sur devis",
      image: "⭐",
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-neutral-warm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="hero-text mb-4">Nos Ateliers</h1>
          <p className="text-xl text-primary-light">
            Découvrez nos différentes offres d'ateliers céramique adaptées à tous les niveaux.
          </p>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-neutral-warm p-8 rounded-lg border-2 border-accent hover:shadow-lg transition-all"
              >
                <div className="text-6xl mb-4">{workshop.image}</div>
                <h3 className="text-2xl font-bold text-primary mb-3">{workshop.title}</h3>
                <p className="text-primary-light mb-6">{workshop.description}</p>

                <div className="space-y-2 mb-6 text-sm text-primary">
                  <div className="flex items-center gap-2">
                    <Clock size={18} /> {workshop.duration}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={18} /> {workshop.participants}
                  </div>
                  <div className="text-xl font-bold text-primary">{workshop.price}</div>
                </div>

                <Link
                  href={`/ateliers/${workshop.id}`}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition-colors"
                >
                  Réserver <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-primary-foreground">Comment ça marche?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: 1, title: "Choisir", description: "Sélectionnez votre atelier parmi nos offres" },
              { step: 2, title: "Réserver", description: "Réservez votre créneaux et complétez votre inscription" },
              { step: 3, title: "Créer", description: "Venez créer dans notre espace chaleureux" },
              { step: 4, title: "Recueillir", description: "Récupérez votre pièce une fois cuite" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-primary-foreground text-primary rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2 text-primary-foreground">{item.title}</h3>
                <p className="text-primary-foreground text-sm opacity-90">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
