"use client"

import type React from "react"
import { useState } from "react"
import { Send, Instagram } from "lucide-react"
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
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary/5 border border-primary/10 text-primary font-medium text-sm mb-8 tracking-wider uppercase backdrop-blur-sm">
              Échanger & partager
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              Contactez-<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">nous</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Une question sur nos ateliers, notre café ou nos produits ? Nous sommes là pour vous répondre.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info Side */}
          <div className="space-y-12 animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">Restons en contact</h2>
              <p className="text-primary/70 text-lg leading-relaxed">
                Passez nous voir au café pour discuter de vos projets céramiques autour d'un bon café, ou envoyez-nous un message pour toute demande spécifique.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div>
                  <h3 className="font-bold text-xl text-primary mb-2">Notre adresse</h3>
                  <p className="text-primary/70">25 Boulevard du Temple<br />75003 PARIS</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div>
                  <h3 className="font-bold text-xl text-primary mb-2">Téléphone</h3>
                  <p className="text-primary/70">+33 1 42 55 66 77</p>
                  <p className="text-sm text-primary/50 mt-1">Du lundi au vendredi, 9h-18h</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div>
                  <h3 className="font-bold text-xl text-primary mb-2">Email</h3>
                  <p className="text-primary/70">hello@coffeearts.fr</p>
                  <p className="text-sm text-primary/50 mt-1">Réponse sous 24h</p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-primary/10">
              <h3 className="font-bold text-xl text-primary mb-6">Suivez-nous</h3>
              <div className="flex gap-4">
                <Link 
                  href="https://www.instagram.com/coffeearts.paris/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  aria-label="Instagram Coffee Arts Paris"
                >
                  <Instagram size={20} />
                </Link>
                <Link
                  href="https://www.tiktok.com/@coffeeartsparis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 relative group"
                  aria-label="TikTok Coffee Arts Paris"
                >
                  <span className="block h-5 w-5 relative">
                    <Image
                      src="/tiktok-green.png"
                      alt="TikTok"
                      fill
                      sizes="20px"
                      className="object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    />
                    <Image
                      src="/tiktok-beige.png"
                      alt="TikTok"
                      fill
                      sizes="20px"
                      className="object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                      style={{ filter: "brightness(1.15)" }}
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="relative animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
            <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl -z-10 transform rotate-3" />
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 md:p-10 rounded-3xl shadow-xl">
              <h2 className="text-2xl font-bold text-primary mb-8">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
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
                  <div className="space-y-2">
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

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary ml-1">Sujet</label>
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

                <div className="space-y-2">
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
                  {loading ? "Envoi en cours..." : "Envoyer le message"} <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-16 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg border border-primary/10 z-10">
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-bold text-primary text-sm">Coffee Arts Paris</p>
                  <p className="text-primary/70 text-xs">25 Boulevard du Temple, 75003 PARIS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration / Influenceurs / Presse Section */}
      <section className="py-20 bg-gradient-to-b from-background to-neutral-light/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 md:p-12 shadow-xl border border-white/60"
          >
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 text-center">
              Partenariats & Presse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Collaborations</h3>
                <p className="text-primary/70 leading-relaxed">
                  Vous souhaitez collaborer avec Coffee Arts Paris ? Nous sommes ouverts aux partenariats créatifs et aux projets innovants qui partagent nos valeurs d'artisanat et d'authenticité.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  Contactez-nous pour discuter de votre projet et découvrir comment nous pouvons travailler ensemble.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Influenceurs</h3>
                <p className="text-primary/70 leading-relaxed">
                  Vous êtes influenceur ou créateur de contenu ? Nous serions ravis de vous accueillir dans notre espace pour découvrir notre univers unique.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  Pour toute demande de partenariat, merci de nous contacter avec vos statistiques et votre univers créatif.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">Presse</h3>
                <p className="text-primary/70 leading-relaxed">
                  Journalistes et médias, nous sommes disponibles pour répondre à vos questions et vous fournir les informations nécessaires à vos articles.
                </p>
                <p className="text-primary/70 leading-relaxed">
                  N'hésitez pas à nous contacter pour toute demande d'interview, de visuels ou d'informations complémentaires.
                </p>
              </div>
            </div>
            <div className="mt-10 text-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Nous contacter
              </Link>
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
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-4">FAQ</h2>
            <p className="text-xl text-primary/70">Questions fréquemment posées</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "Quels sont vos horaires d'ouverture ?",
                answer: "Nous sommes ouverts du mardi au vendredi de 8h à 20h, et le samedi et dimanche de 10h à 21h. Nous sommes fermés le lundi."
              },
              {
                question: "Faut-il réserver pour les ateliers ?",
                answer: "Oui, nous recommandons fortement de réserver vos ateliers à l'avance, surtout pour les weekends. Vous pouvez réserver directement en ligne ou nous contacter par téléphone."
              },
              {
                question: "Les débutants peuvent-ils participer aux ateliers ?",
                answer: "Absolument ! Nos ateliers sont ouverts à tous les niveaux, des débutants complets aux personnes expérimentées. Nos formateurs s'adaptent à votre niveau."
              },
              {
                question: "Combien de temps faut-il pour récupérer une pièce créée ?",
                answer: "Le temps de séchage et de cuisson varie selon la pièce, mais comptez généralement 2 à 3 semaines avant de pouvoir récupérer votre création émaillée et cuite."
              },
              {
                question: "Proposez-vous des ateliers pour les groupes ?",
                answer: "Oui, nous proposons des ateliers pour groupes et des privatisations. Contactez-nous pour discuter de vos besoins spécifiques et organiser votre événement."
              },
              {
                question: "Acceptez-vous les paiements par carte ?",
                answer: "Oui, nous acceptons les cartes bancaires, les espèces et les paiements sans contact. Nous acceptons également les chèques pour les réservations d'ateliers."
              },
              {
                question: "Vendez-vous du café en grains ?",
                answer: "Oui, nous proposons une sélection de cafés en grains de nos torréfacteurs partenaires. N'hésitez pas à nous demander conseil pour choisir selon vos préférences."
              },
              {
                question: "Organisez-vous des événements privés ?",
                answer: "Oui, nous proposons la privatisation de notre espace pour des événements privés, team building, anniversaires, EVJF, etc. Contactez-nous pour discuter de votre projet."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
