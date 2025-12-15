"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const cards = [
  {
    title: "Introduction",
    body: (
      <p>
        La présente politique de confidentialité informe les utilisateurs du site sur la manière dont sont collectées, utilisées et protégées leurs données personnelles. Coffee Arts Paris s'engage à ce que la collecte et le traitement de vos données soient conformes au RGPD et à la législation française en vigueur.
      </p>
    )
  },
  {
    title: "Responsable du traitement",
    body: (
      <>
        <p>Coffee Arts Paris</p>
        <p>25 Boulevard du Temple, 75003 Paris</p>
        <p>Email : coffeeartsparis@gmail.com</p>
      </>
    )
  },
  {
    title: "Données collectées",
    body: (
      <>
        <p>Les données personnelles pouvant être collectées sur le site sont :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Nom, Prénom</li>
          <li>Adresse mail, Téléphone</li>
          <li>Informations saisies dans le champ “message” du formulaire de contact</li>
          <li>Données de navigation (IP, localisation, navigateur) via cookies à des fins statistiques</li>
        </ul>
      </>
    )
  },
  {
    title: "Finalités du traitement",
    body: (
      <ul className="list-disc list-inside space-y-1">
        <li>Répondre aux demandes envoyées via le formulaire de contact</li>
        <li>Assurer la gestion et le bon fonctionnement du site</li>
        <li>Analyser l'audience et améliorer les services proposés</li>
      </ul>
    )
  },
  {
    title: "Destinataires des données",
    body: (
      <p>Les données collectées sont destinées uniquement à Coffee Arts Paris et ne sont jamais cédées, louées ou vendues à des tiers.</p>
    )
  },
  {
    title: "Durée de conservation",
    body: (
      <>
        <p>Demandes de contact : 12 mois après le dernier échange.</p>
        <p>Cookies : jusqu'à 13 mois maximum après dépôt.</p>
      </>
    )
  },
  {
    title: "Droits des utilisateurs",
    body: (
      <>
        <p>Conformément au RGPD, vous disposez des droits suivants : accès, rectification, effacement, limitation, opposition, portabilité.</p>
        <p>Exercer vos droits : coffeeartsparis@gmail.com</p>
      </>
    )
  },
  {
    title: "Cookies",
    body: (
      <p>Le site utilise des cookies pour mesurer l'audience et améliorer l'expérience utilisateur. Un bandeau de consentement permet de gérer l'utilisation des cookies. Consultez la politique cookies pour plus d'informations.</p>
    )
  },
  {
    title: "Sécurité",
    body: (
      <p>Coffee Arts Paris met en œuvre des mesures techniques et organisationnelles pour garantir la sécurité et la confidentialité des données personnelles.</p>
    )
  },
  {
    title: "Modifications",
    body: (
      <p>La présente politique peut être modifiée à tout moment afin de rester conforme à la législation. Nous vous invitons à la consulter régulièrement.</p>
    )
  },
]

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-28 pb-16 md:pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8 mt-10">
          <span className="text-lg">←</span>
          Retour à l'accueil
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-primary">Politique de confidentialité</h1>
        </div>

        <div className="space-y-6">
          {cards.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="rounded-2xl border border-primary/40 bg-white/10 backdrop-blur-2xl shadow-[0_15px_50px_-20px_rgba(0,0,0,0.35)] p-6 md:p-8"
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

