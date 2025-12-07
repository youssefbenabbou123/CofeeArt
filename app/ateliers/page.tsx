"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Clock, Users, Palette, Layers, UsersRound, Sparkles, Calendar, CheckCircle2 } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function Ateliers() {
  const workshops = [
    {
      id: 1,
      title: "Initiation",
      subtitle: "Découverte",
      description: "Plongez dans l'univers de la céramique. Apprenez les gestes fondamentaux du tournage et repartez avec votre première création.",
      duration: "2h30",
      participants: "Max 4 pers.",
      price: "50€",
      icon: Palette,
      color: "bg-[#E8D6C1]",
      features: ["Argile incluse", "Cuisson comprise", "Boisson offerte"]
    },
    {
      id: 2,
      title: "Perfectionnement",
      subtitle: "Technique",
      description: "Affinez votre technique, apprenez à tourner des formes plus complexes et maîtrisez les finitions.",
      duration: "3h00",
      participants: "Max 4 pers.",
      price: "75€",
      icon: Layers,
      color: "bg-[#ACB792]",
      features: ["Argile illimitée", "2 pièces cuites", "Coaching personnalisé"]
    },
    {
      id: 3,
      title: "Atelier Duo",
      subtitle: "Partage",
      description: "Une expérience unique à partager à deux. Créez ensemble dans une ambiance intimiste et chaleureuse.",
      duration: "2h00",
      participants: "2 pers.",
      price: "90€",
      icon: UsersRound,
      color: "bg-[#D4C5B0]",
      features: ["Prix pour 2", "Privatisation partielle", "Photos souvenirs"]
    },
    {
      id: 4,
      title: "Privatisation",
      subtitle: "Sur Mesure",
      description: "EVJF, Team Building ou Anniversaire. Privatisez l'atelier pour un événement inoubliable.",
      duration: "Sur mesure",
      participants: "5-15 pers.",
      price: "Sur devis",
      icon: Sparkles,
      color: "bg-primary",
      textColor: "text-white",
      features: ["Programme adapté", "Traiteur possible", "Cadeaux invités"]
    },
  ]

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
              <Palette size={14} />
              Apprendre & Créer
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Ateliers</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Que vous soyez débutant ou confirmé, venez mettre les mains dans la terre et exprimer votre créativité dans notre atelier parisien.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Workshops Grid */}
      <section className="py-10 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workshops.map((workshop, index) => {
            const Icon = workshop.icon

            return (
              <div
                key={workshop.id}
                className={cn(
                  "group relative rounded-3xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col",
                  "bg-white border border-border hover:border-primary",
                  "hover:bg-primary hover:text-white"
                )}
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-colors",
                  "bg-accent/20 text-primary",
                  "group-hover:bg-white/10 group-hover:text-white"
                )}>
                  <Icon size={24} />
                </div>

                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider opacity-70 text-accent group-hover:text-accent">
                    {workshop.subtitle}
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
                    <Clock size={16} /> {workshop.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary/80 group-hover:text-white/90">
                    <Users size={16} /> {workshop.participants}
                  </div>
                  <div className="pt-2 space-y-2">
                    {workshop.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-primary/60 group-hover:text-white/70">
                        <CheckCircle2 size={12} className="text-accent" /> {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/10 group-hover:border-white/10">
                  <span className="text-2xl font-bold text-primary group-hover:text-white">{workshop.price}</span>
                  <Link
                    href={`/ateliers/${workshop.id}`}
                    className="p-3 rounded-xl transition-all duration-300 bg-primary text-white hover:bg-primary/90 group-hover:bg-white group-hover:text-primary group-hover:hover:bg-white group-hover:hover:text-primary group-hover:hover:scale-110 group-hover:hover:rotate-[-5deg]"
                  >
                    <ArrowRight size={20} className="transition-transform duration-300 group-hover:hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
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
              { step: 1, title: "Choisir", description: "Sélectionnez l'atelier qui vous correspond", icon: Calendar },
              { step: 2, title: "Réserver", description: "Réservez votre créneau en ligne", icon: CheckCircle2 },
              { step: 3, title: "Créer", description: "Profitez d'un moment de création unique", icon: Palette },
              { step: 4, title: "Récupérer", description: "Vos pièces cuites et émaillées sous 3 semaines", icon: Sparkles },
            ].map((item, index) => (
              <div key={item.step} className="relative flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-primary-foreground/5 border border-primary-foreground/10 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300 bg-primary">
                  <item.icon size={32} className="text-accent" />
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
