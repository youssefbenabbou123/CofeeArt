"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function Carte() {
  const hotDrinks = [
    { name: "Espresso", desc: "Intense et riche", price: "2.50€", popular: true },
    { name: "Cappuccino", desc: "Mousseux et crémeux", price: "4.00€", popular: true },
    { name: "Flat white", desc: "Équilibré et onctueux", price: "4.50€", popular: true },
    { name: "Latte artisanal", desc: "Doux et velouté avec latte art", price: "4.50€", popular: false },
    { name: "Chocolat chaud", desc: "Chocolat belge artisanal", price: "5.00€", popular: true },
    { name: "Thé vert / noir / rooibos", desc: "Sélection premium", price: "4.00€", popular: false },
  ]

  const coldDrinks = [
    { name: "Limonade maison", desc: "Citron frais, menthe", price: "4.00€", popular: true },
    { name: "Jus pressé", desc: "Orange, pomme ou mix", price: "4.50€", popular: false },
    { name: "Soda artisanal", desc: "Sélection bio", price: "3.50€", popular: false },
    { name: "Eau minérale", desc: "Plate ou pétillante", price: "2.50€", popular: false },
  ]

  const pastriesMenu = [
    { name: "Croissant aux amandes", desc: "Fait maison, croustillant", price: "3.50€", popular: true },
    { name: "Pain au chocolat", desc: "Beurre AOP, chocolat belge", price: "3.00€", popular: true },
    { name: "Muffin du jour", desc: "Recette gourmande", price: "4.00€", popular: false },
    { name: "Tarte aux fruits", desc: "Fruits frais de saison", price: "5.50€", popular: false },
    { name: "Cookie maison", desc: "Chocolat noir et noisettes", price: "3.50€", popular: false },
    { name: "Tartelette citron", desc: "Meringue italienne", price: "5.00€", popular: false },
  ]

  const veganOptions = [
    { name: "Cookie vegan", desc: "Chocolat noir, huile de coco", price: "3.80€" },
    { name: "Brownie sans gluten", desc: "Farine de riz, cacao intense", price: "4.20€" },
    { name: "Lait végétal", desc: "Avoine ou amande pour toutes les boissons", price: "+0.50€" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-light overflow-hidden">
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
              Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">carte</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Découvrez nos cafés, pâtisseries et créations artisanales.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="pt-10 pb-20 md:pt-12 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Boissons chaudes */}
            <div className="group bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-4xl font-black text-primary leading-tight">Boissons chaudes</h2>
              </div>
              <div className="space-y-6">
                {hotDrinks.map((item, i) => (
                  <div key={i} className="group/item pb-6 border-b border-primary/10 last:border-0 hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-primary text-lg">{item.name}</h3>
                      </div>
                      <span className="font-black text-accent text-xl">{item.price}</span>
                    </div>
                    <p className="text-primary/60 text-sm font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Boissons froides */}
            <div className="group bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-up opacity-0" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-4xl font-black text-primary leading-tight">Boissons froides</h2>
              </div>
              <div className="space-y-6">
                {coldDrinks.map((item, i) => (
                  <div key={i} className="group/item pb-6 border-b border-primary/10 last:border-0 hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-primary text-lg">{item.name}</h3>
                      </div>
                      <span className="font-black text-accent text-xl">{item.price}</span>
                    </div>
                    <p className="text-primary/60 text-sm font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pâtisseries & snacks */}
            <div className="group bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-4 mb-10">
                <h2 className="text-4xl font-black text-primary leading-tight">Pâtisseries & snacks</h2>
              </div>
              <div className="space-y-6">
                {pastriesMenu.map((item, i) => (
                  <div key={i} className="group/item pb-6 border-b border-primary/10 last:border-0 hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-primary text-lg">{item.name}</h3>
                      </div>
                      <span className="font-black text-accent text-xl">{item.price}</span>
                    </div>
                    <p className="text-primary/60 text-sm font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Options vegan / sans gluten */}
          <div className="mt-20 bg-gradient-to-r from-accent/10 to-primary/10 backdrop-blur-xl rounded-[2rem] p-12 border border-white/50 shadow-xl animate-fade-up opacity-0" style={{ animationDelay: "0.7s" }}>
            <div className="max-w-4xl mx-auto text-center">
              <h3 className="text-4xl font-black text-primary mb-6">Options vegan / sans gluten</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                {veganOptions.map((item, i) => (
                  <div key={i} className="bg-white/60 rounded-2xl p-6 border border-primary/10 shadow-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-xl font-bold text-primary">{item.name}</h4>
                      <span className="font-black text-accent">{item.price}</span>
                    </div>
                    <p className="text-primary/70 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Nos cafés */}
          <div className="mt-12 bg-white/70 backdrop-blur-xl rounded-[2rem] p-12 border border-primary/10 shadow-xl animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
            <div className="text-center mb-8">
              <h3 className="text-3xl font-black text-primary mb-4">Nos cafés</h3>
              <p className="text-primary/70 mb-6">Découvrez l'origine de nos grains, nos méthodes d'extraction et nos collaborations</p>
              <Link
                href="/cafe/nos-cafes"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 hover:scale-105"
              >
                En savoir plus <ArrowRight size={20} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              {[
                {
                  title: "Origine des grains",
                  desc: "Sélection de cafés de spécialité issus de micro-torréfacteurs partenaires.",
                },
                {
                  title: "Méthodes d'extraction",
                  desc: "Espresso, V60, Chemex : nous adaptons la méthode au profil aromatique.",
                },
                {
                  title: "Collaboration torréfacteurs",
                  desc: "Partenariats locaux pour des profils fraîchement torréfiés et traçables.",
                },
              ].map((item, i) => (
                <div key={item.title} className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
                  <p className="text-primary/70 leading-relaxed text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
