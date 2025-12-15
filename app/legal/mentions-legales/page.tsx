"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const cards = [
  {
    title: "Éditeur du site",
    body: (
      <>
        <p>Coffee Arts Paris</p>
        <p>25 Boulevard du Temple, 75003 Paris</p>
        <p>coffeeartsparis@gmail.com</p>
        <p>Directeur de publication : Coffee Arts Paris</p>
      </>
    )
  },
  {
    title: "Hébergement du site",
    body: (
      <>
        <p>IONOS SARL</p>
        <p>7 place de la Gare, 57200 Sarreguemines, France</p>
        <Link href="https://www.ionos.fr" className="text-accent hover:underline">https://www.ionos.fr</Link>
      </>
    )
  },
  {
    title: "Propriété intellectuelle",
    body: (
      <p>
        L'ensemble du contenu du site (textes, images, photos, vidéos, éléments graphiques, logos, structure générale…) est protégé par la législation en vigueur. Toute reproduction, modification ou diffusion, totale ou partielle, sans accord préalable écrit de l'éditeur est interdite.
      </p>
    )
  },
  {
    title: "Données personnelles",
    body: (
      <>
        <p>Des données peuvent être collectées via le formulaire de contact et par l'utilisation de cookies.</p>
        <p>Responsable du traitement : Coffee Arts Paris — coffeeartsparis@gmail.com</p>
        <p>Le traitement est conforme au RGPD et à la législation française. Pour plus de détails, consultez la Politique de confidentialité.</p>
        <p>Les utilisateurs disposent des droits : accès, rectification, suppression, opposition, portabilité, limitation du traitement.</p>
        <p>Exercer vos droits : coffeeartsparis@gmail.com</p>
      </>
    )
  },
  {
    title: "Cookies",
    body: (
      <>
        <p>Le site utilise des cookies pour mesurer l'audience et améliorer l'expérience utilisateur. Un bandeau de consentement permet de gérer leur utilisation.</p>
        <p>Pour plus d'informations, consultez la politique cookies.</p>
      </>
    )
  },
  {
    title: "Responsabilité",
    body: (
      <ul className="list-disc list-inside space-y-1">
        <li>d'interruptions temporaires du site</li>
        <li>de dysfonctionnements indépendants de sa volonté</li>
        <li>de tout dommage indirect lié à l'utilisation du site</li>
      </ul>
    )
  },
  {
    title: "Liens externes",
    body: (
      <p>Le site peut contenir des liens vers des sites tiers. Coffee Arts Paris décline toute responsabilité concernant leur contenu ou leur politique de confidentialité.</p>
    )
  },
  {
    title: "Modification des mentions légales",
    body: (
      <p>Les mentions légales peuvent être modifiées à tout moment pour rester conformes à la réglementation.</p>
    )
  },
  {
    title: "Droit applicable",
    body: (
      <p>Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.</p>
    )
  },
  {
    title: "Crédits",
    body: (
      <>
        <p>Site web conçu et développé par Melissa BONNET – Auto-entrepreneure</p>
        <p>SIRET : 934 160 318 00010</p>
        <Link href="https://melissabonnet.fr" className="text-accent hover:underline">https://melissabonnet.fr</Link>
      </>
    )
  },
]

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-28 pb-16 md:pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8 mt-4">
          <span className="text-lg">←</span>
          Retour à l'accueil
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-primary">Mentions légales</h1>
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

