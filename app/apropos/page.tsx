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
              Notre <span className="text-[#8A8E74]">histoire</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              La rencontre passionnée entre l'art de la terre et l'art du café.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 md:order-1">
            <h2 className="section-title">La genèse</h2>
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
          <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl order-1 md:order-2">
            <Image
              src="/LA GENESE.jpg"
              alt="La genèse"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-title mb-6">Nos valeurs</h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Les piliers qui soutiennent notre démarche au quotidien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Passion & authenticité",
                description: "Nous mettons du cœur dans chaque geste, chaque tasse servie et chaque pièce façonnée."
              },
              {
                title: "Durabilité",
                description: "Nous privilégions les circuits courts, les matériaux naturels et une approche respectueuse de l'environnement."
              },
              {
                title: "Transmission",
                description: "Le partage du savoir-faire est au cœur de notre mission. Apprendre, c'est grandir ensemble."
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

      {/* Engagement écologique Section */}
      <section className="py-24 bg-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6">Engagement écologique</h2>
            <p className="text-xl text-primary/80 max-w-2xl mx-auto">
              Notre engagement pour un avenir plus durable et responsable.
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
                <h3 className="text-2xl font-black text-primary">Circuits courts</h3>
              </div>
              <p className="text-primary/80 leading-relaxed">
                Nous privilégions les producteurs locaux et les circuits courts pour nos ingrédients. 
                Nos grains de café sont sélectionnés auprès de torréfacteurs parisiens, réduisant ainsi 
                notre empreinte carbone tout en soutenant l'économie locale.
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
                <h3 className="text-2xl font-black text-primary">Matériaux durables</h3>
              </div>
              <p className="text-primary/80 leading-relaxed">
                Dans notre atelier, nous utilisons des argiles naturelles et des émaux sans plomb. 
                Nos céramiques sont conçues pour durer, réduisant ainsi la consommation et les déchets. 
                Nous favorisons également le réemploi et le recyclage de nos matériaux.
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
                <h3 className="text-2xl font-black text-primary">Commerce équitable</h3>
              </div>
              <p className="text-primary/80 leading-relaxed">
                Nous travaillons avec des partenaires engagés dans le commerce équitable, garantissant 
                des conditions de travail justes et des rémunérations équitables pour les producteurs. 
                Chaque achat contribue à un monde plus juste.
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
                <h3 className="text-2xl font-black text-primary">Sensibilisation</h3>
              </div>
              <p className="text-primary/80 leading-relaxed">
                À travers nos ateliers et nos événements, nous sensibilisons nos clients à l'importance 
                de la durabilité. Nous partageons nos connaissances sur les pratiques écologiques et 
                encourageons un mode de vie plus responsable.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
