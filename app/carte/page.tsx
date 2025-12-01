"use client"

import { Coffee, Croissant, Wine, Sparkles, Heart, Leaf } from "lucide-react"

export default function Carte() {
  const coffeeMenu = [
    { name: "Espresso", desc: "Intense et riche", price: "2.50€", popular: true },
    { name: "Cappuccino", desc: "Mousseux et crémeux", price: "4.00€", popular: true },
    { name: "Latte Artisanal", desc: "Doux et velouté avec latte art", price: "4.50€", popular: false },
    { name: "Americano", desc: "Classique et léger", price: "3.00€", popular: false },
    { name: "Flat White", desc: "Équilibré et onctueux", price: "4.50€", popular: true },
    { name: "Cortado", desc: "Espresso avec lait chaud", price: "3.50€", popular: false },
    { name: "Café Allongé", desc: "Espresso allongé à l'eau", price: "2.80€", popular: false },
    { name: "Café Noisette", desc: "Espresso avec une touche de lait", price: "3.00€", popular: false },
  ]

  const pastriesMenu = [
    { name: "Croissant aux amandes", desc: "Fait maison, croustillant", price: "3.50€", popular: true },
    { name: "Pain au chocolat", desc: "Beurre AOP, chocolat belge", price: "3.00€", popular: true },
    { name: "Muffin céramique", desc: "Spécialité du jour", price: "4.00€", popular: false },
    { name: "Tarte aux fruits", desc: "Fruits frais de saison", price: "5.50€", popular: false },
    { name: "Macaron artisanal", desc: "Saveurs classiques et originales", price: "2.50€", popular: true },
    { name: "Cookie maison", desc: "Chocolat noir et noisettes", price: "3.50€", popular: false },
    { name: "Brownie", desc: "Fondant au chocolat", price: "4.00€", popular: false },
    { name: "Tartelette citron", desc: "Meringue italienne", price: "5.00€", popular: false },
  ]

  const drinksMenu = [
    { name: "Thé vert", desc: "Sélection premium", price: "4.00€", popular: false },
    { name: "Thé noir", desc: "Earl Grey ou English Breakfast", price: "4.00€", popular: false },
    { name: "Thé rooibos", desc: "Sans théine, naturellement doux", price: "4.50€", popular: false },
    { name: "Chocolat chaud", desc: "Chocolat belge artisanal", price: "5.00€", popular: true },
    { name: "Jus pressé", desc: "Orange, pomme ou mix", price: "4.50€", popular: false },
    { name: "Limonade maison", desc: "Citron frais et menthe", price: "4.00€", popular: true },
    { name: "Eau minérale", desc: "Vittel ou Perrier", price: "2.50€", popular: false },
    { name: "Soda bio", desc: "Sélection de sodas artisanaux", price: "3.50€", popular: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-light overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 tracking-wider uppercase animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
            Déguster & Savourer
          </span>
          <h1 className="hero-text mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Notre Carte
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
            Découvrez nos cafés, pâtisseries et créations artisanales.
          </p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 relative">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cafés */}
            <div className="group bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-up opacity-0" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl">
                  <Coffee size={32} className="text-amber-600" strokeWidth={2} />
                </div>
                <h2 className="text-4xl font-black text-primary">Nos Cafés</h2>
              </div>
              <div className="space-y-6">
                {coffeeMenu.map((item, i) => (
                  <div key={i} className="group/item pb-6 border-b border-primary/10 last:border-0 hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-primary text-lg">{item.name}</h3>
                        {item.popular && (
                          <Heart size={14} className="text-accent fill-accent" />
                        )}
                      </div>
                      <span className="font-black text-accent text-xl">{item.price}</span>
                    </div>
                    <p className="text-primary/60 text-sm font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pâtisseries */}
            <div className="group bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-up opacity-0" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-2xl">
                  <Croissant size={32} className="text-pink-600" strokeWidth={2} />
                </div>
                <h2 className="text-4xl font-black text-primary">Pâtisseries</h2>
              </div>
              <div className="space-y-6">
                {pastriesMenu.map((item, i) => (
                  <div key={i} className="group/item pb-6 border-b border-primary/10 last:border-0 hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-primary text-lg">{item.name}</h3>
                        {item.popular && (
                          <Heart size={14} className="text-accent fill-accent" />
                        )}
                      </div>
                      <span className="font-black text-accent text-xl">{item.price}</span>
                    </div>
                    <p className="text-primary/60 text-sm font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Boissons & Autres */}
            <div className="group bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-fade-up opacity-0" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-4 mb-10">
                <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl">
                  <Wine size={32} className="text-green-600" strokeWidth={2} />
                </div>
                <h2 className="text-4xl font-black text-primary leading-tight">Boissons & Autres</h2>
              </div>
              <div className="space-y-6">
                {drinksMenu.map((item, i) => (
                  <div key={i} className="group/item pb-6 border-b border-primary/10 last:border-0 hover:scale-105 transition-transform duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-black text-primary text-lg">{item.name}</h3>
                        {item.popular && (
                          <Heart size={14} className="text-accent fill-accent" />
                        )}
                      </div>
                      <span className="font-black text-accent text-xl">{item.price}</span>
                    </div>
                    <p className="text-primary/60 text-sm font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Note Section */}
          <div className="mt-20 bg-gradient-to-r from-accent/10 to-primary/10 backdrop-blur-xl rounded-[2rem] p-12 border border-white/50 shadow-xl animate-fade-up opacity-0" style={{ animationDelay: "0.7s" }}>
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-block p-4 bg-white/50 rounded-2xl mb-6">
                <Leaf size={32} className="text-primary" strokeWidth={2} />
              </div>
              <h3 className="text-4xl font-black text-primary mb-6">Nos Engagements</h3>
              <p className="text-primary/80 leading-relaxed text-lg font-medium">
                Tous nos cafés sont torréfiés localement avec des grains sélectionnés. Nos pâtisseries sont préparées quotidiennement sur place avec des ingrédients de qualité.
                Nous privilégions les produits bio et locaux lorsque c'est possible.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
