"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const cards = [
  {
    title: "Cookies Coffee Arts Paris",
    body: (
      <>
        <p>Le site utilise des cookies pour mesurer l'audience et améliorer l'expérience utilisateur.</p>
        <p>Lors de votre première visite, un bandeau de consentement permet d'accepter ou de refuser tout ou partie des cookies.</p>
        <p>Vous pouvez également gérer les cookies via les paramètres de votre navigateur.</p>
      </>
    )
  },
  {
    title: "Finalités",
    body: (
      <ul className="list-disc list-inside space-y-1">
        <li>Mesurer l'audience</li>
        <li>Améliorer l'expérience utilisateur</li>
      </ul>
    )
  },
  {
    title: "Durée de conservation",
    body: (
      <p>Les cookies sont conservés jusqu'à 13 mois maximum après leur dépôt.</p>
    )
  },
  {
    title: "Vos choix",
    body: (
      <>
        <p>Vous pouvez ajuster vos préférences via le bandeau de consentement ou votre navigateur.</p>
        <p>Pour plus d'informations, consultez la politique de confidentialité.</p>
      </>
    )
  },
  {
    title: "Sécurité & modifications",
    body: (
      <>
        <p>Coffee Arts Paris met en œuvre des mesures pour protéger vos données de navigation.</p>
        <p>La présente politique cookies peut être mise à jour pour rester conforme à la réglementation.</p>
      </>
    )
  },
]

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-28 pb-16 md:pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8 mt-4">
          <span className="text-lg">←</span>
          Retour à l'accueil
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-primary">Politique cookies</h1>
        </div>

        <div className="space-y-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-2xl border border-green-200/50 bg-white/10 backdrop-blur-2xl shadow-[0_15px_50px_-20px_rgba(0,0,0,0.35)] p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-primary mb-3">{card.title}</h2>
              <div className="space-y-2 text-primary/80 leading-relaxed">
                {card.body}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

