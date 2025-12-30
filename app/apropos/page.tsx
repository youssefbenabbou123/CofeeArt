"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollAnimation } from "@/components/scroll-animation"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function APropos() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0)

  const teamMembers = [
    {
      name: "Kenza",
      role: "Fondatrice",
      description: "Créative, têtue et perfectionniste, Kenza est toujours en quête du moindre détail. Elle aime tout imaginer, tout structurer et garder le contrôle pour offrir une expérience soignée et harmonieuse. Exigeante mais passionnée, elle veille à ce que chaque élément du lieu reflète son univers.",
      favorite: "Son péché mignon : le matcha lait d'avoine rose.",
      image: "/KENZA.png"
    },
    {
      name: "Anis",
      role: "Fondateur & Comptable",
      description: "Véritable pilier du projet, Anis apporte stabilité et vision à Coffee Arts Paris. Doté d'un esprit calme et ambitieux, il veille à l'équilibre et au bon développement du café, tout en soutenant chaque étape du projet avec sérénité et détermination.",
      favorite: "Son péché mignon : la limonade prune (sa boisson signature d'ailleurs).",
      image: "/ANIS.JPG"
    },
    {
      name: "Nisrine",
      role: "Community Manager & Créatrice de contenu",
      description: "Organisée, créative et toujours à l'affût des tendances, Nisrine est la voix de Coffee Arts Paris sur les réseaux sociaux. Entre création de contenu et storytelling visuel elle donne vie à l'univers du coffee shop.",
      favorite: "Son péché mignon : le soda melon.",
      image: "/NISRINE.JPG"
    }
  ]

  const nextMember = () => {
    setCurrentMemberIndex((prev) => (prev + 1) % teamMembers.length)
  }

  const prevMember = () => {
    setCurrentMemberIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  const currentMember = teamMembers[currentMemberIndex]

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
              À <span className="text-[#8A8E74]">propos</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Un coffee shop créatif où l'on vient pour le café, et où l'on reste pour l'expérience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Notre histoire Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
        <ScrollAnimation direction="up" delay={0}>
          <div className="text-center mb-12">
            <h2 className="section-title">Notre histoire</h2>
          </div>
        </ScrollAnimation>
        
        <ScrollAnimation direction="up" delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 order-2 md:order-1">
              <h3 className="text-3xl font-bold text-primary">Le point de départ</h3>
              <div className="space-y-6 text-lg text-[#58604C] leading-relaxed">
                <p>Nous sommes Kenza et Anis, deux âmes sensibles au beau, au geste et au temps qui passe lentement.</p>
                <p>Notre histoire commence bien avant l'ouverture d'un lieu : elle naît de nos passions mêlées, entre la chaleur d'un café soigneusement préparé et la poésie d'une pièce façonnée à la main. Nous avons voulu créer un espace qui nous ressemble — doux, brut, vivant.</p>
                <p>Un lieu où chaque détail raconte quelque chose, où chaque matière respire, où l'on entre comme on entre dans un atelier, dans un refuge, dans un moment suspendu.</p>
              </div>
            </div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2 group">
              <Image
                src="/LA GENESE.jpg"
                alt="La genèse"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700" />
            </div>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-1 group">
              <Image
                src="/PAGE D'ACCUEIL - PHOTO 1.jpg"
                alt="Coffee Arts Paris"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700" />
            </div>
            <div className="space-y-8 order-2 md:order-2">
              <h3 className="text-3xl font-bold text-primary">L'aventure Coffee Arts Paris</h3>
              <div className="space-y-6 text-lg text-[#58604C] leading-relaxed">
                <p>De fil en aiguille, nous avons rêvé un coffee shop qui n'en est pas vraiment un : c'est un terrain de jeu pour les créatifs, un havre pour les sensibles, une parenthèse pour ceux qui aiment prendre le temps.</p>
                <p>Chaque choix a été fait avec intention : la lumière qui glisse doucement sur les tables, les teintes naturelles, les formes imparfaites, la chaleur du bois, la simplicité assumée…</p>
                <p>Nous avons façonné ce lieu comme on façonne une pièce de céramique — avec patience, intuition et amour du geste.</p>
                <p>Notre café-poterie est né ainsi : de l'envie de partager un espace où l'on peut s'attarder, respirer profondément, créer, rêver, goûter, et peut-être même se retrouver.</p>
                <p>Aujourd'hui, nous continuons d'écrire cette histoire à deux mains, avec vous, à chaque tasse servie, à chaque idée qui naît, à chaque rencontre.</p>
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </section>

      {/* L'équipe Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollAnimation direction="up" delay={0}>
          <h2 className="section-title text-center mb-16">L'équipe</h2>
        </ScrollAnimation>
        <ScrollAnimation direction="up" delay={100}>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/50 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-xl border border-white/60">
              {/* Text Content */}
              <div className="space-y-6 order-2 md:order-1">
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-primary mb-2">{currentMember.name}</h3>
                  <p className="text-xl text-[#8A8E74] font-medium mb-6">{currentMember.role}</p>
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMemberIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <p className="text-lg text-[#58604C] leading-relaxed">
                      {currentMember.description}
                    </p>
                    <p className="text-base text-[#58604C] italic leading-relaxed">
                      {currentMember.favorite}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Image */}
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg order-1 md:order-2 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMemberIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={currentMember.image}
                      alt={currentMember.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-700" />
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevMember}
                className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Membre précédent"
              >
                <ChevronLeft size={24} />
              </button>
              
              {/* Dots indicator */}
              <div className="flex gap-2">
                {teamMembers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMemberIndex(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300",
                      index === currentMemberIndex
                        ? "bg-primary w-8"
                        : "bg-primary/30 hover:bg-primary/50"
                    )}
                    aria-label={`Aller à ${teamMembers[index].name}`}
                  />
                ))}
              </div>

              <button
                onClick={nextMember}
                className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 hover:scale-110 shadow-lg"
                aria-label="Membre suivant"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  )
}
