"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { fetchWorkshops, type Workshop } from "@/lib/api"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function Ateliers() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadWorkshops() {
      try {
        const data = await fetchWorkshops()
        setWorkshops(data)
      } catch (error) {
        console.error("Error loading workshops:", error)
      } finally {
        setLoading(false)
      }
    }
    loadWorkshops()
  }, [])

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
              Apprendre & créer
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">ateliers</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Que vous soyez débutant ou confirmé, venez mettre les mains dans la terre et exprimer votre créativité dans notre atelier parisien.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3.1. Atelier de céramique Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 text-center">3.1. Atelier de céramique</h2>
        </div>

        {/* Présentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 md:p-12 shadow-xl border border-white/60 mb-12"
        >
          <h3 className="text-3xl font-black text-primary mb-6">Présentation de l'atelier</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-primary/80 leading-relaxed">
              <p>
                Notre atelier de céramique est un espace dédié à la création et à l'apprentissage de l'art de la terre. 
                Équipé de tours de potier professionnels et d'un four de cuisson, nous vous accueillons dans un cadre 
                chaleureux et inspirant au cœur de Paris.
              </p>
              <p>
                Que vous soyez débutant ou expérimenté, notre équipe de céramistes passionnés vous guide à chaque étape 
                de votre création, du façonnage à la cuisson finale.
              </p>
              <p>
                L'atelier peut accueillir jusqu'à 4 personnes simultanément, garantissant un suivi personnalisé et une 
                expérience de qualité pour chaque participant.
              </p>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden">
              <Image
                src="/ceramic-pottery-workshop-hands-creating-clay-potte.jpg"
                alt="Atelier de céramique"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Techniques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 md:p-12 shadow-xl border border-white/60 mb-12"
        >
          <h3 className="text-3xl font-black text-primary mb-6">Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-primary">Tournage</h4>
              <p className="text-primary/70 leading-relaxed">
                Apprenez à centrer l'argile sur le tour et à créer des formes symétriques. Technique emblématique 
                de la céramique, le tournage permet de réaliser des pièces élégantes et régulières.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-primary">Modelage</h4>
              <p className="text-primary/70 leading-relaxed">
                Créez des pièces uniques à la main en utilisant différentes techniques de modelage : colombin, plaque, 
                estampage. Plus libre et créatif, le modelage offre une grande liberté d'expression.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold text-primary">Émaillage</h4>
              <p className="text-primary/70 leading-relaxed">
                Découvrez l'art de l'émaillage pour donner couleur et finition à vos créations. Nous proposons une 
                palette variée d'émaux pour personnaliser vos pièces selon vos goûts.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Galerie photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 md:p-12 shadow-xl border border-white/60"
        >
          <h3 className="text-3xl font-black text-primary mb-6">Galerie photo</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "/ceramic-pottery-workshop-hands-creating-clay-potte.jpg",
              "/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg",
              "/boutique/tasse-artisanale.jpg",
              "/boutique/Assiette-Artisanale.jpg"
            ].map((img, index) => (
              <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={img}
                  alt={`Galerie ${index + 1}`}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3.2. Réserver un atelier Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">3.2. Réserver un atelier</h2>
          </div>

          {/* Planning */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 md:p-12 shadow-xl border border-white/60 mb-12"
          >
            <h3 className="text-3xl font-black text-primary mb-6">Planning</h3>
            <p className="text-primary/70 mb-6 leading-relaxed">
              Consultez notre planning en ligne pour voir les créneaux disponibles. Les ateliers sont proposés 
              tout au long de la semaine, avec des sessions le matin, l'après-midi et en soirée.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            >
              Voir le planning <ArrowRight size={20} />
            </Link>
          </motion.div>

          {/* Tarifs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 md:p-12 shadow-xl border border-white/60 mb-12"
          >
            <h3 className="text-3xl font-black text-primary mb-6">Tarifs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-primary/5 rounded-xl">
                <h4 className="text-xl font-bold text-primary mb-2">Atelier Initiation</h4>
                <p className="text-2xl font-black text-primary mb-2">50€</p>
                <p className="text-primary/70 text-sm">2h30 - Matériel inclus</p>
              </div>
              <div className="p-6 bg-primary/5 rounded-xl">
                <h4 className="text-xl font-bold text-primary mb-2">Atelier Perfectionnement</h4>
                <p className="text-2xl font-black text-primary mb-2">75€</p>
                <p className="text-primary/70 text-sm">3h00 - Coaching personnalisé</p>
              </div>
              <div className="p-6 bg-primary/5 rounded-xl">
                <h4 className="text-xl font-bold text-primary mb-2">Atelier Duo</h4>
                <p className="text-2xl font-black text-primary mb-2">90€</p>
                <p className="text-primary/70 text-sm">2h00 - Pour 2 personnes</p>
              </div>
              <div className="p-6 bg-primary/5 rounded-xl">
                <h4 className="text-xl font-bold text-primary mb-2">Privatisation</h4>
                <p className="text-2xl font-black text-primary mb-2">Sur devis</p>
                <p className="text-primary/70 text-sm">5-15 personnes - Sur mesure</p>
              </div>
            </div>
          </motion.div>

          {/* Formules */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 md:p-12 shadow-xl border border-white/60"
          >
            <h3 className="text-3xl font-black text-primary mb-6">Formules</h3>
            <div className="space-y-6">
              <div className="p-6 bg-white/60 rounded-xl border border-primary/10">
                <h4 className="text-xl font-bold text-primary mb-3">Initiation</h4>
                <p className="text-primary/70 mb-4">Parfait pour découvrir la céramique. Idéal pour les débutants.</p>
                <ul className="space-y-2 text-primary/70">
                  <li>• Découverte des techniques de base</li>
                  <li>• Création d'une première pièce</li>
                  <li>• Argile et matériel fournis</li>
                  <li>• Cuisson incluse</li>
                </ul>
              </div>
              <div className="p-6 bg-white/60 rounded-xl border border-primary/10">
                <h4 className="text-xl font-bold text-primary mb-3">Workshop</h4>
                <p className="text-primary/70 mb-4">Ateliers thématiques et sessions intensives pour approfondir vos compétences.</p>
                <ul className="space-y-2 text-primary/70">
                  <li>• Techniques avancées</li>
                  <li>• Projets plus complexes</li>
                  <li>• Accompagnement personnalisé</li>
                  <li>• Plusieurs créations possibles</li>
                </ul>
              </div>
              <div className="p-6 bg-white/60 rounded-xl border border-primary/10">
                <h4 className="text-xl font-bold text-primary mb-3">Cours privés</h4>
                <p className="text-primary/70 mb-4">Un accompagnement sur mesure pour progresser à votre rythme.</p>
                <ul className="space-y-2 text-primary/70">
                  <li>• Cours individuels ou en petit groupe</li>
                  <li>• Programme adapté à vos objectifs</li>
                  <li>• Flexibilité des horaires</li>
                  <li>• Suivi personnalisé</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-10 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-black text-primary mb-4">Nos ateliers disponibles</h2>
          <p className="text-primary/70">Réservez votre créneau parmi nos ateliers disponibles</p>
        </div>
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner message="Chargement des ateliers..." />
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Aucun atelier disponible pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workshops.map((workshop, index) => {
              const durationHours = Math.floor(workshop.duration / 60);
              const durationMinutes = workshop.duration % 60;
              const durationText = durationMinutes > 0 
                ? `${durationHours}h${durationMinutes.toString().padStart(2, '0')}`
                : `${durationHours}h00`;

              return (
                <motion.div
                  key={workshop.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={cn(
                    "group relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col",
                    "bg-white border border-border hover:border-primary",
                    "hover:bg-primary hover:text-white"
                  )}
                >
                  {workshop.image && (
                    <div className="relative h-32 mb-4 rounded-xl overflow-hidden">
                      <Image
                        src={workshop.image}
                        alt={workshop.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-70 text-accent group-hover:text-accent">
                      {workshop.level || "Tous niveaux"}
                    </span>
                    <h3 className="text-2xl font-bold mt-1 text-primary group-hover:text-white">
                      {workshop.title}
                    </h3>
                  </div>

                  <p className="text-sm mb-6 leading-relaxed flex-grow text-primary/70 group-hover:text-white/80">
                    {workshop.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2 text-sm font-medium text-primary/80 group-hover:text-white/90">
                      {durationText}
                    </div>
                    {workshop.next_session_date && (
                      <div className="flex items-center gap-2 text-sm font-medium text-primary/80 group-hover:text-white/90">
                        Prochaine session: {new Date(workshop.next_session_date).toLocaleDateString('fr-FR')}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/10 group-hover:border-white/10">
                    <span className="text-2xl font-bold text-primary group-hover:text-white">
                      {workshop.price.toFixed(2)}€
                    </span>
                    <Link
                      href={`/ateliers/${workshop.id}`}
                      className="p-3 rounded-xl transition-all duration-300 bg-primary text-white hover:bg-primary/90 group-hover:bg-white group-hover:text-primary group-hover:hover:bg-white group-hover:hover:text-primary group-hover:hover:scale-110 group-hover:hover:rotate-[-5deg]"
                    >
                      <ArrowRight size={20} className="transition-transform duration-300 group-hover:hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </section>

      {/* Process Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comment ça marche ?</h2>
            <p className="text-primary-foreground/70">Votre parcours créatif en 4 étapes simples</p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

            {[
              { step: 1, title: "Choisir", description: "Sélectionnez l'atelier qui vous correspond" },
              { step: 2, title: "Réserver", description: "Réservez votre créneau en ligne" },
              { step: 3, title: "Créer", description: "Profitez d'un moment de création unique" },
              { step: 4, title: "Récupérer", description: "Vos pièces cuites et émaillées sous 3 semaines" },
            ].map((item, index) => (
              <div key={item.step} className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300 bg-primary">
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-primary flex items-center justify-center font-bold text-sm shadow-lg">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed px-4">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
