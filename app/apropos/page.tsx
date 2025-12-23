"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function APropos() {
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
              Un lieu <span className="text-[#8A8E74]">pensé pour prendre le temps</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Un coffee shop créatif où l’on vient pour le café, et où l’on reste pour l’expérience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <h2 className="section-title">Le point de départ</h2>
            <div className="space-y-6 text-lg text-[#58604C] leading-relaxed">
              <p>Nous sommes Kenza et Anis, deux âmes sensibles au beau, au geste et au temps qui passe lentement.</p>
              <p>Notre histoire commence bien avant l’ouverture d’un lieu : elle naît de nos passions mêlées, entre la chaleur d’un café soigneusement préparé et la poésie d’une pièce façonnée à la main. Nous avons voulu créer un espace qui nous ressemble — doux, brut, vivant.</p>
              <p>Un lieu où chaque détail raconte quelque chose, où chaque matière respire, où l’on entre comme on entre dans un atelier, dans un refuge, dans un moment suspendu.</p>
            </div>
          </div>
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2">
            <Image
              src="/LA GENESE.jpg"
              alt="La genèse"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-1">
            <Image
              src="/PAGE D'ACCUEIL - PHOTO 1.jpg"
              alt="Coffee Arts Paris"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8 order-2 md:order-2">
            <h2 className="section-title">Notre histoire</h2>
            <div className="space-y-6 text-lg text-[#58604C] leading-relaxed">
              <p>De fil en aiguille, nous avons rêvé un coffee shop qui n’en est pas vraiment un : c’est un terrain de jeu pour les créatifs, un havre pour les sensibles, une parenthèse pour ceux qui aiment prendre le temps.</p>
              <p>Chaque choix a été fait avec intention : la lumière qui glisse doucement sur les tables, les teintes naturelles, les formes imparfaites, la chaleur du bois, la simplicité assumée…</p>
              <p>Nous avons façonné ce lieu comme on façonne une pièce de céramique — avec patience, intuition et amour du geste.</p>
              <p>Notre café-poterie est né ainsi : de l’envie de partager un espace où l’on peut s’attarder, respirer profondément, créer, rêver, goûter, et peut-être même se retrouver.</p>
              <p>Aujourd’hui, nous continuons d’écrire cette histoire à deux mains, avec vous, à chaque tasse servie, à chaque idée qui naît, à chaque rencontre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* L'esprit du lieu Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-title mb-6">L’esprit du lieu</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Une manière d’être, de créer et de recevoir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Le café comme point de départ",
                description: "Nous sommes avant tout un coffee shop, avec des boissons de qualité et une vraie exigence gustative. La création vient enrichir l’expérience, sans jamais la remplacer."
              },
              {
                title: "La création comme prolongement",
                description: "Chez Coffee Arts Paris, la création n’est pas une performance. On vient pour essayer, apprendre, toucher et prendre plaisir au geste, simplement."
              },
              {
                title: "Un espace où l’on se sent bien",
                description: "Coffee Arts Paris a été pensé comme un lieu calme et accueillant, où l’on peut s’attarder, se retrouver et faire une pause, seul ou à plusieurs."
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-2xl font-bold mb-4 text-center">{value.title}</h3>
                <p className="text-center text-primary-foreground/90 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="section-title text-center mb-16">L'Équipe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Marie Dupont",
              role: "Fondatrice & céramiste",
              image: "/team-1.jpg", // Placeholder, using a generic div if image missing
              color: "bg-[#E8D6C1]"
            },
            {
              name: "Thomas Bernard",
              role: "Chef barista",
              image: "/team-2.jpg",
              color: "bg-[#ACB792]"
            },
            {
              name: "Léa Moreau",
              role: "Formatrice tournage",
              image: "/team-3.jpg",
              color: "bg-[#D4C5B0]"
            },
          ].map((member, index) => (
            <div key={index} className="group relative">
              <div className={cn("aspect-[3/4] rounded-2xl overflow-hidden relative shadow-lg transition-all duration-500 group-hover:shadow-2xl", member.color)}>
                {/* Fallback for missing images */}
                <div className="absolute inset-0 flex items-center justify-center text-primary/20 font-bold text-9xl select-none">
                  {member.name.charAt(0)}
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-bold text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {member.name}
                  </h3>
                  <p className="text-accent font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {member.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Engagements écologiques */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">Nos engagements écologiques</h2>
            <p className="text-xl text-primary/80 max-w-2xl mx-auto">
              Une attention portée aux matières, aux ressources et aux gestes.
            </p>
          </div>

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
                Des argiles utilisées à l’atelier aux consommables du lieu, nous faisons des choix réfléchis pour limiter les déchets et favoriser des usages plus responsables.
              </p>
              <p className="text-primary/80 leading-relaxed mt-4">
                Des choix intégrés au quotidien, dans la manière de faire et d’utiliser.
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
                Dans le fonctionnement du café comme de l’atelier, nous veillons à réduire les déchets et à ajuster nos usages lorsque cela est possible.
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
                Une approche naturelle, par l’expérience et le faire.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
