"use client"

import Image from "next/image"
import { Heart, Leaf, Lightbulb, Users } from "lucide-react"
import { cn } from "@/lib/utils"

export default function APropos() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 tracking-wider uppercase animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
            Découvrir & Connaître
          </span>
          <h1 className="hero-text mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Notre Histoire
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
            La rencontre passionnée entre l'art de la terre et l'art du café.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg"
              alt="Notre concept"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <h2 className="section-title">La Genèse</h2>
            <div className="space-y-6 text-lg text-primary/80 leading-relaxed">
              <p>
                Coffee Arts Paris est née d'une vision simple mais ambitieuse : créer un lieu de vie où le temps s'arrête, où la créativité s'exprime et où les sens sont en éveil.
              </p>
              <p>
                Fondé en 2023, notre espace a été conçu comme un refuge urbain. D'un côté, le calme et la concentration de l'atelier de céramique. De l'autre, la convivialité et les arômes d'un café de spécialité.
              </p>
              <p>
                Nous croyons que l'artisanat est une forme de méditation active. Que ce soit en façonnant l'argile ou en dégustant un café torréfié avec soin, nous vous invitons à reconnecter avec la matière et le moment présent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Nos Valeurs</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Les piliers qui soutiennent notre démarche au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Passion & Authenticité",
                description: "Nous mettons du cœur dans chaque geste, chaque tasse servie et chaque pièce façonnée."
              },
              {
                icon: Leaf,
                title: "Durabilité",
                description: "Nous privilégions les circuits courts, les matériaux naturels et une approche respectueuse de l'environnement."
              },
              {
                icon: Lightbulb,
                title: "Transmission",
                description: "Le partage du savoir-faire est au cœur de notre mission. Apprendre, c'est grandir ensemble."
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center text-primary mb-6 mx-auto shadow-lg">
                  <value.icon size={28} />
                </div>
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
              role: "Fondatrice & Céramiste",
              image: "/team-1.jpg", // Placeholder, using a generic div if image missing
              color: "bg-[#E8D6C1]"
            },
            {
              name: "Thomas Bernard",
              role: "Chef Barista",
              image: "/team-2.jpg",
              color: "bg-[#ACB792]"
            },
            {
              name: "Léa Moreau",
              role: "Formatrice Tournage",
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
    </div>
  )
}
