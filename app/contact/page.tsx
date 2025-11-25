"use client"

import type React from "react"

import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Merci! Votre message a été envoyé.")
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-neutral-warm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="hero-text mb-4">Contactez-Nous</h1>
          <p className="text-xl text-primary-light">Des questions? Nous sommes là pour vous aider.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Phone, title: "Téléphone", content: "+33 1 XX XX XX XX" },
              { icon: Mail, title: "Email", content: "hello@coffeearts.fr" },
              { icon: MapPin, title: "Localisation", content: "Paris, France" },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="bg-neutral-warm p-8 rounded-lg border-2 border-accent text-center">
                  <Icon className="text-primary mb-4 mx-auto" size={40} />
                  <h3 className="font-bold text-lg text-primary mb-2">{item.title}</h3>
                  <p className="text-primary-light">{item.content}</p>
                </div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="bg-neutral-warm p-8 md:p-12 rounded-lg">
            <h2 className="text-2xl font-bold text-primary mb-8">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Votre nom"
                  className="w-full px-4 py-3 border-2 border-primary rounded-md focus:outline-none focus:border-accent"
                  required
                />
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full px-4 py-3 border-2 border-primary rounded-md focus:outline-none focus:border-accent"
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Sujet"
                className="w-full px-4 py-3 border-2 border-primary rounded-md focus:outline-none focus:border-accent"
                required
              />
              <textarea
                placeholder="Votre message"
                rows={6}
                className="w-full px-4 py-3 border-2 border-primary rounded-md focus:outline-none focus:border-accent resize-none"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold hover:bg-primary/90 transition-colors"
              >
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Hours Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Clock className="mx-auto mb-4 text-primary-foreground" size={40} />
          <h2 className="text-2xl font-bold mb-6 text-primary-foreground">Nos Horaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="font-semibold mb-2 text-primary-foreground">Lundi - Jeudi</p>
              <p className="text-primary-foreground opacity-90">10:00 - 20:00</p>
            </div>
            <div>
              <p className="font-semibold mb-2 text-primary-foreground">Vendredi - Samedi</p>
              <p className="text-primary-foreground opacity-90">10:00 - 22:00</p>
            </div>
            <div className="md:col-span-2">
              <p className="font-semibold mb-2 text-primary-foreground">Dimanche</p>
              <p className="text-primary-foreground opacity-90">11:00 - 19:00</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
