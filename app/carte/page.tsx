export default function Carte() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-neutral-warm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="hero-text mb-4">Notre Carte</h1>
          <p className="text-xl text-primary-light">Découvrez nos cafés, pâtisseries et créations artisanales.</p>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Cafés */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">☕ Nos Cafés</h2>
              <div className="space-y-4">
                {[
                  { name: "Espresso", desc: "Intense et riche" },
                  { name: "Cappuccino", desc: "Mousseux et crémeux" },
                  { name: "Latte Artisanal", desc: "Doux et velouté" },
                  { name: "Americano", desc: "Classique et léger" },
                ].map((item, i) => (
                  <div key={i} className="pb-4 border-b border-neutral-warm">
                    <h3 className="font-bold text-primary">{item.name}</h3>
                    <p className="text-primary-light text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pâtisseries */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">🥐 Pâtisseries</h2>
              <div className="space-y-4">
                {[
                  { name: "Croissant aux amandes", desc: "Fait maison" },
                  { name: "Muffin céramique", desc: "Spécialité du jour" },
                  { name: "Tarte aux fruits", desc: "Fruits frais de saison" },
                  { name: "Macaron artisanal", desc: "Saveurs classiques et originales" },
                ].map((item, i) => (
                  <div key={i} className="pb-4 border-b border-neutral-warm">
                    <h3 className="font-bold text-primary">{item.name}</h3>
                    <p className="text-primary-light text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
