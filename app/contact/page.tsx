"use client"

import type React from "react"
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Merci! Votre message a été envoyé.")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 tracking-wider uppercase animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
            Échanger & Partager
          </span>
          <h1 className="hero-text mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Contactez-Nous
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
            Une question sur nos ateliers, notre café ou nos produits ? Nous sommes là pour vous répondre.
          </p>
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
                      placeholder="Votre nom"
                      className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary ml-1">Email</label>
                    <input
                      type="email"
                      placeholder="votre@email.com"
                      className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary ml-1">Sujet</label>
                  <select className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-primary/70">
                    <option>Renseignement général</option>
                    <option>Privatisation</option>
                    <option>Ateliers</option>
                    <option>Presse & Partenariats</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-primary ml-1">Message</label>
                  <textarea
                    placeholder="Comment pouvons-nous vous aider ?"
                    rows={5}
                    className="w-full px-4 py-3 bg-white/50 border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-xl font-bold hover:bg-primary/90 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Envoyer le message <Send size={18} />
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
