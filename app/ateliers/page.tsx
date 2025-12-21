"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { fetchWorkshops, type Workshop } from "@/lib/api"
import LoadingSpinner from "@/components/admin/LoadingSpinner"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function Ateliers() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

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

  // Check for payment success/cancel in URL params
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      if (params.get('success') === 'true') {
        toast({
          title: "Paiement réussi !",
          description: "Votre réservation a été confirmée. Vous recevrez un email de confirmation.",
        })
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname)
        // Redirect to client space after a delay
        setTimeout(() => {
          router.push('/espace-client')
        }, 2000)
      } else if (params.get('cancelled') === 'true') {
        toast({
          title: "Paiement annulé",
          description: "Votre réservation n'a pas été confirmée. Vous pouvez réessayer.",
          variant: "destructive",
        })
        // Clean URL
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
  }, [toast, router])

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
              Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">ateliers</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Que vous soyez débutant ou confirmé, venez mettre les mains dans la terre et exprimer votre créativité dans notre atelier parisien.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Atelier de céramique Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Atelier de céramique</h2>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto">
            Découvrez l'art de la céramique dans notre espace dédié au cœur de Paris
          </p>
        </div>

        {/* Présentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 md:p-12 shadow-xl border border-white/60 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg md:text-xl text-primary leading-relaxed font-light">
                Notre atelier de céramique est un espace dédié à la création et à l'apprentissage de l'art de la terre. 
                Équipé de tours de potier professionnels et d'un four de cuisson, nous vous accueillons dans un cadre 
                chaleureux et inspirant au cœur de Paris.
              </p>
              <p className="text-lg md:text-xl text-primary leading-relaxed font-light">
                Que vous soyez débutant ou expérimenté, notre équipe de céramistes passionnés vous guide à chaque étape 
                de votre création, du façonnage à la cuisson finale.
              </p>
              <p className="text-lg md:text-xl text-primary leading-relaxed font-light">
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
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black text-primary mb-12 text-center">Techniques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-shadow"
            >
              <h4 className="text-2xl font-bold text-primary mb-4">Tournage</h4>
              <p className="text-primary/70 leading-relaxed">
                Apprenez à centrer l'argile sur le tour et à créer des formes symétriques. Technique emblématique 
                de la céramique, le tournage permet de réaliser des pièces élégantes et régulières.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-shadow"
            >
              <h4 className="text-2xl font-bold text-primary mb-4">Modelage</h4>
              <p className="text-primary/70 leading-relaxed">
                Créez des pièces uniques à la main en utilisant différentes techniques de modelage : colombin, plaque, 
                estampage. Plus libre et créatif, le modelage offre une grande liberté d'expression.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-shadow"
            >
              <h4 className="text-2xl font-bold text-primary mb-4">Émaillage</h4>
              <p className="text-primary/70 leading-relaxed">
                Découvrez l'art de l'émaillage pour donner couleur et finition à vos créations. Nous proposons une 
                palette variée d'émaux pour personnaliser vos pièces selon vos goûts.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* Galerie photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="-mx-4 sm:-mx-6 lg:-mx-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 sm:px-6 lg:px-8">
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

      {/* Nos ateliers disponibles Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6">Nos ateliers disponibles</h2>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              Réservez votre créneau parmi nos ateliers disponibles
            </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/60 hover:shadow-2xl transition-all group flex flex-col"
                  >
                    {workshop.image && (
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={workshop.image}
                          alt={workshop.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-grow">
                      <div className="mb-4 flex-grow">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-3">
                          {workshop.level || "Tous niveaux"}
                        </span>
                        <h3 className="text-2xl font-black text-primary mb-3">
                          {workshop.title}
                        </h3>
                        <p className="text-primary/70 leading-relaxed">
                          {workshop.description}
                        </p>
                      </div>

                      <div className="mt-auto pt-6 border-t border-primary/10">
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-2 text-sm font-medium text-primary/80">
                            <Clock size={16} />
                            {durationText}
                          </div>
                          {workshop.next_session_date && (
                            <div className="flex items-center gap-2 text-sm font-medium text-primary/80">
                              <Calendar size={16} />
                              {new Date(workshop.next_session_date).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-3xl font-black text-primary">
                            {typeof workshop.price === 'number' ? workshop.price.toFixed(2) : parseFloat(workshop.price).toFixed(2)}€
                          </span>
                          <Link
                            href={`/ateliers/${workshop.id}`}
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all hover:scale-105 flex items-center gap-2"
                          >
                            Réserver <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
