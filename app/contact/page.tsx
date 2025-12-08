"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

const API_BASE_URL = '';  // Use relative URL to route through Next.js rewrites (bypasses CORS)

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
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary/5 border border-primary/10 text-primary font-medium text-sm mb-8 tracking-wider uppercase backdrop-blur-sm">
              <Mail size={14} />
              Échanger & Partager
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              Contactez-<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Nous</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
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
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary mb-2">Notre Adresse</h3>
                  <p className="text-primary/70">12 Rue de la Céramique<br />75011 Paris, France</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-primary mb-2">Téléphone</h3>
                  <p className="text-primary/70">+33 1 42 55 66 77</p>
                  <p className="text-sm text-primary/50 mt-1">Du lundi au vendredi, 9h-18h</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Mail size={24} />
                </div>
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
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                    <Icon size={20} />
                  </a>
                ))}
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
                    <option>Presse & Partenariats</option>
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
              src="https://www.google.com/maps?q=48.8634,2.3797&z=17&output=embed&hl=fr"
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
                <MapPin size={20} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-bold text-primary text-sm">Coffee Arts Paris</p>
                  <p className="text-primary/70 text-xs">12 Rue de la Céramique, 75011 Paris</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
