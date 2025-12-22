"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function Evenements() {
  const eventTypes = [
    {
      title: "Inauguration",
      description: "Célébrez le lancement de votre événement dans un cadre unique. Organisation complète, traiteur et animations sur mesure.",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Privatisations",
      description: "Privatisez notre espace pour vos événements privés : anniversaires, EVJF, retrouvailles entre amis. Ambiance chaleureuse garantie.",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Team building",
      description: "Renforcez la cohésion de votre équipe avec nos ateliers céramique et dégustations de café. Expérience créative et conviviale.",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Expositions / Marchés créateurs",
      description: "Mettez en avant vos créations dans notre espace. Nous accueillons régulièrement des expositions et marchés de créateurs.",
      color: "from-amber-500/20 to-orange-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 md:pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              Événements
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Transformez vos moments importants en expériences inoubliables dans notre espace unique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {eventTypes.map((event, index) => {
            return (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              >
                <h2 className="text-3xl font-black text-primary mb-4">{event.title}</h2>
                <p className="text-primary/80 leading-relaxed mb-6">{event.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl rounded-[2rem] p-12 border border-primary/20 text-center"
        >
          <h2 className="text-4xl font-black text-primary mb-6">Réserver un événement</h2>
          <p className="text-primary/80 text-lg mb-8 max-w-2xl mx-auto">
            Contactez-nous pour discuter de votre projet et créer un événement sur mesure.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Nous contacter
          </Link>
        </motion.div>
      </section>
    </div>
  )
}



