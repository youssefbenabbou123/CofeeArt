"use client"

import type React from "react"
import { useState } from "react"
import { Phone, Mail, Clock, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import Link from "next/link"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app';

export default function Contact() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Erreur lors de l\'envoi du message')
      }

      toast({
        title: "Message envoyé",
        description: "Merci ! Votre message a été envoyé avec succès.",
      })

      // Reset form
      if (e.currentTarget) {
        e.currentTarget.reset()
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-24 pb-6 md:pt-32 md:pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-4 tracking-tight leading-tight">
              Contactez-<span className="text-[#8A8E74]">nous</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-6 font-light leading-relaxed">
              Une question sur nos ateliers, notre café ou nos produits ? Nous sommes là pour vous répondre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 text-center md:text-left">
          <div className="flex items-center gap-3">
            <Phone size={20} className="text-primary" />
            <span className="text-primary/80">06.52.48.72.24</span>
            </div>
          <div className="flex items-center gap-3">
            <Mail size={20} className="text-primary" />
            <span className="text-primary/80">coffeeartsparis@gmail.com</span>
                </div>
          <div className="flex flex-col items-center gap-2 md:flex-row md:items-center">
            <Clock size={20} className="text-primary" />
            <div className="flex flex-col text-primary/80">
              <span>Mardi - Mercredi - Jeudi - Vendredi 08h - 20h</span>
              <span>Samedi - Dimanche 10h - 21h</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-primary mb-6">Formulaire de contact</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary ml-1">Nom</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
              <div className="space-y-1.5">
                    <label className="text-sm font-medium text-primary ml-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

            <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary ml-1">Objet</label>
                  <select
                    name="subject"
                    className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-primary/70"
                    required
                    disabled={loading}
                  >
                    <option>Renseignement général</option>
                    <option>Privatisation</option>
                    <option>Ateliers</option>
                    <option>Presse & partenariats</option>
                  </select>
                </div>

            <div className="space-y-1.5">
                  <label className="text-sm font-medium text-primary ml-1">Message</label>
                  <textarea
                    name="message"
                    placeholder="Comment pouvons-nous vous aider ?"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Envoi en cours..." : "Envoyer"}
                </button>
              </form>
            </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-title text-[#58604C] mb-4">Nous rendre visite</h2>
            <div className="flex items-center justify-center gap-2 text-primary/80">
              <MapPin size={20} className="text-primary" />
              <span>25 Boulevard du Temple, 75003 Paris</span>
            </div>
          </div>
          <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl border border-primary/10">
            <iframe
              src="https://www.google.com/maps?q=25+Boulevard+du+Temple+75003+PARIS&z=17&output=embed&hl=fr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
              title="Coffee Arts Paris Location"
            />
          </div>
        </div>
      </section>

      {/* Collaborations / Influenceurs / Presse Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 md:p-12 shadow-xl border border-white/60"
          >
            <h2 className="text-4xl md:text-5xl font-title text-primary mb-8 text-center">
              Collaborations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-bold text-primary">Collaborations</h3>
                <p className="text-primary/70 leading-relaxed">
                  Coffee Arts Paris s’associe à des projets créatifs choisis avec attention, en lien avec l’artisanat, la matière et l’expérience du lieu. Si votre projet résonne avec l’univers du lieu, nous serons ravis d’en discuter.
                </p>
              </div>
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-bold text-primary">Influenceurs</h3>
                <p className="text-primary/70 leading-relaxed">
                  Coffee Arts Paris collabore ponctuellement avec des créateurs de contenu dont l’univers et la sensibilité font écho au lieu. Nous privilégions les approches sincères, les échanges authentiques et les contenus pensés avec soin. Si cette approche vous correspond, nous vous invitons à nous écrire.
                </p>
              </div>
              <div className="space-y-4 text-center">
                <h3 className="text-2xl font-bold text-primary">Presse</h3>
                <p className="text-primary/70 leading-relaxed">
                  Pour toute demande presse, interview ou parution, Coffee Arts Paris reste à l’écoute des médias souhaitant découvrir le lieu, son univers et sa démarche. N’hésitez pas à nous contacter pour toute demande d’information.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-title text-primary mb-4">FAQ</h2>
            <p className="text-xl text-primary/70">On vous répond ici.</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Qu’est-ce que Coffee Arts Paris ?",
                answer: "Coffee Arts Paris est un coffee shop artisanal mêlant café de spécialité, création céramique et moments de partage, dans un lieu pensé pour prendre le temps."
              },
              {
                question: "Peut-on venir uniquement pour boire un café ?",
                answer: "Oui. Le lieu est avant tout un coffee shop. Il est tout à fait possible de venir simplement profiter d’un café, sans participer à un atelier."
              },
              {
                question: "Faut-il réserver pour venir chez Coffee Arts Paris ?",
                answer: "La réservation n’est pas nécessaire pour le café. Elle est en revanche recommandée pour les ateliers, notamment en période d’affluence."
              },
              {
                question: "Le lieu est-il accessible à tous ?",
                answer: "Oui, Coffee Arts Paris accueille aussi bien les curieux que les habitués. Aucun prérequis n’est nécessaire, que ce soit pour le café ou pour les ateliers."
              },
              {
                question: "Où trouver les informations pratiques (horaires, adresse) ?",
                answer: "Toutes les informations pratiques sont disponibles sur la page Contact, avec un lien direct vers Google Maps."
              },
              {
                question: "Quels types d’ateliers proposez-vous ?",
                answer: "Des ateliers de peinture sur céramique, de modelage et des initiations à la poterie sont proposés, selon les périodes et les thématiques."
              },
              {
                question: "Les ateliers sont-ils accessibles aux débutants ?",
                answer: "Oui. Les ateliers sont ouverts à tous, sans niveau requis. L’objectif est de découvrir et de créer dans un cadre détendu."
              },
              {
                question: "Comment réserver un atelier ?",
                answer: "Les réservations se font principalement en ligne via le site. Il est parfois possible de s’inscrire sur place, sous réserve de places disponibles."
              },
              {
                question: "Combien de personnes participent à un atelier ?",
                answer: "Les ateliers se déroulent en petits groupes afin de garantir une expérience agréable. Le nombre de places varie selon le type d’atelier."
              },
              {
                question: "Quelle est la politique d’annulation ou de modification ?",
                answer: "Les réservations peuvent être annulées ou modifiées jusqu’à 48 heures avant l’événement, par email."
              },
              {
                question: "Que peut-on retrouver dans la boutique en ligne ?",
                answer: "La boutique en ligne propose des kits créatifs, des accessoires et des objets en lien avec l’univers de Coffee Arts Paris."
              },
              {
                question: "Les produits sont-ils fabriqués à la main ?",
                answer: "Certains produits sont issus d’un travail artisanal ou de collaborations soigneusement sélectionnées, en cohérence avec l’esprit du lieu."
              },
              {
                question: "Quels sont les délais d’expédition et de livraison ?",
                answer: "Les commandes sont expédiées sous 24 à 72 heures. La livraison s’effectue ensuite en environ 5 jours en France, selon le transporteur."
              },
              {
                question: "Puis-je offrir un produit ou un kit en cadeau ?",
                answer: "Oui, les produits de la boutique se prêtent très bien aux cadeaux et peuvent être commandés directement en ligne. Il est également possible d’offrir une expérience Coffee Arts Paris grâce à nos cartes cadeaux."
              },
              {
                question: "Que faire en cas de question ou de problème avec une commande ?",
                answer: "Pour toute question liée à une commande, vous pouvez nous contacter via la page Contact."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white/50 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-lg border border-white/60 hover:shadow-xl transition-all"
              >
                <h3 className="text-xl font-bold text-primary mb-3">{faq.question}</h3>
                <p className="text-primary/70 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 text-center"
          >
            <p className="text-primary/70 mb-4">Vous ne trouvez pas la réponse à votre question ?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Contactez-nous
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
