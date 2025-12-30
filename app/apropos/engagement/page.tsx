"use client"

import { motion } from "framer-motion"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function Engagement() {
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              <span className="text-[#8A8E74]">Engagement</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Nos valeurs et notre engagement écologique.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nos valeurs Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollAnimation direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="section-title text-primary-foreground mb-6">Nos valeurs</h2>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Une manière d'être, de créer et de recevoir.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Le café comme point de départ",
                description: "Nous sommes avant tout un coffee shop, avec des boissons de qualité et une vraie exigence gustative. La création vient enrichir l'expérience, sans jamais la remplacer."
              },
              {
                title: "La création comme prolongement",
                description: "Chez Coffee Arts Paris, la création n'est pas une performance. On vient pour essayer, apprendre, toucher et prendre plaisir au geste, simplement."
              },
              {
                title: "Un espace où l'on se sent bien",
                description: "Coffee Arts Paris a été pensé comme un lieu calme et accueillant, où l'on peut s'attarder, se retrouver et faire une pause, seul ou à plusieurs."
              },
            ].map((value, index) => (
              <ScrollAnimation key={index} direction="up" delay={index * 100}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2">
                  <h3 className="text-2xl font-bold mb-4 text-center">{value.title}</h3>
                  <p className="text-center text-primary-foreground/90 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement écologique Section */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation direction="up" delay={0}>
            <div className="text-center mb-16">
              <h2 className="section-title mb-6">Engagement écologique</h2>
              <p className="text-xl text-primary/80 max-w-2xl mx-auto">
                Une attention portée aux matières, aux ressources et aux gestes.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/60"
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-black text-primary">Choisir avec attention</h3>
              </div>
              <p className="text-primary/80 leading-relaxed">
                Nous faisons le choix de fournisseurs sélectionnés avec soin, en tenant compte de la provenance des produits et de leur impact, à notre échelle.
              </p>
              <p className="text-primary/80 leading-relaxed mt-4">
                Une démarche progressive, guidée par le bon sens et le respect des ressources.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/60"
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-black text-primary">Matières & usages</h3>
              </div>
              <p className="text-primary/80 leading-relaxed">
                Des argiles utilisées à l'atelier aux consommables du lieu, nous faisons des choix réfléchis pour limiter les déchets et favoriser des usages plus responsables.
              </p>
              <p className="text-primary/80 leading-relaxed mt-4">
                Des choix intégrés au quotidien, dans la manière de faire et d'utiliser.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/60"
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-black text-primary">Des pratiques raisonnées</h3>
              </div>
              <p className="text-primary/80 leading-relaxed">
                Dans le fonctionnement du café comme de l'atelier, nous veillons à réduire les déchets et à ajuster nos usages lorsque cela est possible.
              </p>
              <p className="text-primary/80 leading-relaxed mt-4">
                Une attention constante portée aux gestes du quotidien.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-8 shadow-xl border border-white/60"
            >
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-2xl font-black text-primary">Sensibiliser par la pratique</h3>
              </div>
              <p className="text-primary/80 leading-relaxed">
                À travers les ateliers et la vie du lieu, nous cherchons à transmettre des gestes simples et plus conscients.
              </p>
              <p className="text-primary/80 leading-relaxed mt-4">
                Une approche naturelle, par l'expérience et le faire.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

