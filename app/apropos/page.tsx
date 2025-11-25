export default function APropos() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-neutral-warm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="hero-text mb-4">À Propos</h1>
          <p className="text-xl text-primary-light">L'histoire et la passion derrière Coffee Arts Paris.</p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div className="aspect-square bg-primary rounded-lg flex items-center justify-center text-6xl">🏺</div>
            <div>
              <h2 className="section-title mb-4">Notre Concept</h2>
              <p className="text-primary-light mb-4">
                Coffee Arts Paris est née d'une passion commune pour la céramique, le café artisanal et la création.
                Nous avons imaginé un espace où ces trois univers se rencontrent harmonieusement.
              </p>
              <p className="text-primary-light mb-4">
                Notre mission est de partager l'art de la céramique avec tous, tout en créant une communauté d'artisans
                et de passionnés qui valorisent l'artisanat authentique et durable.
              </p>
            </div>
          </div>

          <div className="bg-neutral-warm p-8 rounded-lg border-2 border-accent">
            <h2 className="section-title mb-6">Nos Valeurs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Authenticité", description: "Chaque pièce raconte une histoire" },
                { title: "Durabilité", description: "Respecter la nature et les ressources" },
                { title: "Créativité", description: "Encourager l'expression artistique" },
              ].map((value, index) => (
                <div key={index} className="text-center">
                  <h3 className="font-bold text-lg text-primary mb-2">{value.title}</h3>
                  <p className="text-primary-light">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-neutral-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center mb-12">Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Marie Dupont", role: "Fondatrice & Artisan", emoji: "👩‍🎨" },
              { name: "Thomas Bernard", role: "Maître Barista", emoji: "☕" },
              { name: "Léa Moreau", role: "Artiste Céramique", emoji: "🎨" },
            ].map((member, index) => (
              <div key={index} className="bg-neutral-light p-6 rounded-lg text-center">
                <div className="text-5xl mb-4">{member.emoji}</div>
                <h3 className="font-bold text-lg text-primary mb-1">{member.name}</h3>
                <p className="text-primary-light">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
