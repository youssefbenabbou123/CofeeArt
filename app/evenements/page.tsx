"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function Evenements() {
  const eventTypes = [
    {
      title: "Inauguration",
      description: "Nous accueillons des inaugurations au sein du café, selon les possibilités du lieu et le format souhaité.",
      color: "from-purple-500/20 to-pink-500/20",
    },
    {
      title: "Privatisation",
      description: "Nous proposons des privatisations du café, selon les possibilités du lieu et le format envisagé.",
      color: "from-blue-500/20 to-cyan-500/20",
    },
    {
      title: "Team building",
      description: "Le café peut accueillir des formats de team building autour du café et de la création, selon les possibilités du lieu.",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Expositions - marché créateurs",
      description: "Nous accueillons ponctuellement des expositions ou des temps dédiés aux créateurs, en lien avec l’univers du lieu.",
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
              Moments partagés
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Le café s’ouvre ponctuellement à des événements, pensés pour s’intégrer naturellement au lieu.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {eventTypes.map((event, index) => {
            return (
              <ScrollAnimation key={event.title} direction="up" delay={index * 100}>
                <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <h2 className="text-3xl font-title text-[#58604C] mb-4">{event.title}</h2>
                  <p className="text-[#58604C] leading-relaxed mb-6">{event.description}</p>
                </div>
              </ScrollAnimation>
            )
          })}
        </div>

        {/* CTA Section */}
        <ScrollAnimation direction="up" delay={400}>
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-xl rounded-[2rem] p-12 border border-primary/20 text-center">
          <h2 className="text-4xl font-title text-[#58604C] mb-6">Informations & demandes</h2>
          <p className="text-[#58604C] text-lg mb-8 max-w-4xl mx-auto">
            Nous sommes disponibles pour discuter de votre événement et des possibilités du lieu.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Nous contacter
          </Link>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  )
}



