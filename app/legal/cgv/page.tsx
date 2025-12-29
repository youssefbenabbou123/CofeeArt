"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const cards = [
  {
    title: "Dernière mise à jour",
    body: <p>20/12/2025</p>
  },
  {
    title: "Identité du vendeur",
    body: (
      <>
        <p>Coffee Arts Paris</p>
        <p>25 Boulevard du Temple, 75003 Paris</p>
        <p>Email : coffeeartsparis@gmail.com</p>
      </>
    )
  },
  {
    title: "Produits et services",
    body: (
      <ul className="list-disc list-inside space-y-1">
        <li>Vente de produits</li>
        <li>Réservation d’ateliers</li>
      </ul>
    )
  },
  {
    title: "Prix",
    body: (
      <p>Les prix sont indiqués en euros TTC. Coffee Arts Paris peut les modifier, mais les commandes sont facturées sur la base des tarifs en vigueur lors de la validation.</p>
    )
  },
  {
    title: "Commande",
    body: (
      <>
        <p>La validation de la commande vaut acceptation des présentes CGV. Un email récapitulatif est envoyé.</p>
        <p>Coffee Arts Paris peut annuler une commande en cas de litige antérieur, défaut de paiement ou informations erronées.</p>
      </>
    )
  },
  {
    title: "Paiement",
    body: (
      <ul className="list-disc list-inside space-y-1">
        <li>Carte bancaire</li>
        <li>Square (si activé)</li>
      </ul>
    )
  },
  {
    title: "Abonnements & renouvellement",
    body: (
      <>
        <p>Certains services peuvent être proposés sous forme d’abonnement (mensuel ou annuel). Les modalités sont précisées sur la fiche produit.</p>
        <p>Renouvellement automatique : si prévu, indiqué lors de l’achat. Annulation possible depuis l’espace client ou par email (48h avant échéance).</p>
        <p>Résiliation : possible à tout moment, toute période commencée est due. Pas de remboursement prorata sauf exception.</p>
      </>
    )
  },
  {
    title: "Accès aux services",
    body: (
      <p>Après paiement, les accès ou instructions sont envoyés par email ou disponibles dans l’espace personnel. Coffee Arts Paris n’est pas responsable en cas de mauvaise configuration ou absence de matériel du client.</p>
    )
  },
  {
    title: "Livraison des produits physiques",
    body: (
      <>
        <p>France métropolitaine uniquement. Délais indicatifs : 3 à 7 jours ouvrés. Coffee Arts Paris n’est pas responsable des retards du transporteur.</p>
        <p>Frais de livraison affichés lors de la commande.</p>
      </>
    )
  },
  {
    title: "Droit de rétractation",
    body: (
      <>
        <p>Produits physiques : 14 jours (art. L221-18). Articles renvoyés neufs et dans l’emballage d’origine. Frais de retour à la charge du client.</p>
        <p>Services datés ou numériques : pas de rétractation pour prestations programmées, services déjà commencés ou contenus fournis immédiatement.</p>
      </>
    )
  },
  {
    title: "Remboursements",
    body: (
      <p>Effectués sous 14 jours via le moyen de paiement initial. Aucun remboursement pour abonnement en cours, séance non honorée ou produit retourné endommagé.</p>
    )
  },
  {
    title: "Responsabilité",
    body: (
      <ul className="list-disc list-inside space-y-1">
        <li>Inexécution ou mauvaise exécution due au client</li>
        <li>Problèmes indépendants de la volonté de Coffee Arts Paris (pannes, interruptions, maintenance…)</li>
        <li>Dommmages dus à un mauvais usage des produits vendus</li>
      </ul>
    )
  },
  {
    title: "Propriété intellectuelle",
    body: (
      <p>L’ensemble du contenu du site (textes, images, vidéos, logo) est la propriété exclusive de Coffee Arts Paris. Toute reproduction totale ou partielle est interdite.</p>
    )
  },
  {
    title: "Données personnelles",
    body: (
      <p>Les données personnelles sont traitées conformément à la Politique de confidentialité disponible sur le site.</p>
    )
  },
  {
    title: "Litiges",
    body: (
      <p>Les présentes CGV sont soumises au droit français. Une solution amiable sera recherchée. À défaut, les tribunaux français seront seuls compétents.</p>
    )
  },
  {
    title: "Contact",
    body: (
      <p>Pour toute question concernant les CGV, une commande ou un abonnement : coffeeartsparis@gmail.com</p>
    )
  },
]

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background pt-28 pb-16 md:pt-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:text-accent mb-8 mt-4">
          <span className="text-lg">←</span>
          Retour à l'accueil
        </Link>
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-black text-primary">Conditions Générales de Vente</h1>
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

