"use client"

import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { ScrollAnimation } from "@/components/scroll-animation"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function APropos() {
  const [currentMemberIndex, setCurrentMemberIndex] = useState(0)
  const [activeSection, setActiveSection] = useState<string>("histoire")

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

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const offset = 100 // Offset for sticky navigation
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
      setActiveSection(sectionId)
    }
  }

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["histoire", "valeurs", "equipe", "engagement"]
      const scrollPosition = window.scrollY + 150

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navigationItems = [
    { id: "histoire", label: "Notre histoire" },
    { id: "valeurs", label: "Nos valeurs" },
    { id: "equipe", label: "L'équipe" },
    { id: "engagement", label: "Engagement écologique" },
  ]

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

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-center gap-2 md:gap-4 py-4 overflow-x-auto">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all duration-300",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "text-primary/70 hover:text-primary hover:bg-primary/10"
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Notre histoire Section */}
      <section id="histoire" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
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

      {/* Nos valeurs Section */}
      <section id="valeurs" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
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

      {/* L'équipe Section */}
      <section id="equipe" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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

      {/* Engagement écologique Section */}
      <section id="engagement" className="py-24 bg-primary/5 relative overflow-hidden">
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
