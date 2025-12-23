"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
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
              Nos <span className="text-[#8A8E74]">ateliers</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Des ateliers de céramique pour explorer la matière, s’initier aux gestes et vivre une expérience créative, au rythme de chacun.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Atelier de céramique Section */}
      <section className="pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Présentation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 shadow-xl border border-white/60 mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-5 md:space-y-6">
              <p className="text-base md:text-lg text-primary leading-relaxed font-light">
                L’atelier de céramique est un espace ouvert à celles et ceux qui souhaitent découvrir la matière, expérimenter et créer de leurs mains.
              </p>
              <p className="text-base md:text-lg text-primary leading-relaxed font-light">
                Peinture sur céramique, modelage ou initiation à la poterie : chaque atelier est pensé comme un moment accessible, guidé et sans pression.
              </p>
              <p className="text-base md:text-lg text-primary leading-relaxed font-light">
                Que vous veniez pour la première fois ou que vous ayez déjà pratiqué, l’accompagnement se fait pas à pas, dans une atmosphère conviviale.
              </p>
              <p className="text-base md:text-lg text-primary leading-relaxed font-light">
                L’objectif n’est pas la performance, mais le plaisir de créer, d’apprendre et de prendre le temps.
              </p>
              <p className="text-base md:text-lg text-primary leading-relaxed font-light">
                Les ateliers se déroulent en petits groupes, afin de garantir une expérience attentive et personnalisée pour chaque participant.
              </p>
            </div>
            <div className="relative h-72 md:h-[420px] rounded-2xl overflow-hidden">
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
          <h2 className="text-4xl md:text-5xl font-title text-[#58604C] mb-12 text-center">Une expérience pour tous</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Ouvert à tous les niveaux",
                desc: "Les ateliers sont ouverts aux débutants comme aux personnes ayant déjà pratiqué. Chacun avance à son rythme, accompagné pas à pas, sans prérequis."
              },
              {
                title: "En petits groupes",
                desc: "Les sessions se déroulent en groupes réduits afin de garantir un accompagnement attentif. Un cadre propice à l’échange, à la concentration et au plaisir de créer."
              },
              {
                title: "Une expérience encadrée",
                desc: "Chaque atelier est pensé pour être fluide, structuré et accessible. Le geste, la matière et le plaisir de créer restent au cœur de la pratique."
              }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                className="bg-white/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/60 hover:shadow-2xl transition-shadow"
              >
                <h4 className="text-2xl font-bold text-[#58604C] mb-4">{item.title}</h4>
                <p className="text-[#58604C] leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Nos ateliers disponibles Section */}
      <section className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-title text-[#58604C] mb-6">Nos ateliers</h2>
            <p className="text-xl text-[#58604C] max-w-2xl mx-auto">
              Choisissez votre atelier et réservez un moment dédié à la création.
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
                        <p className="text-[#58604C] leading-relaxed">
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
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-all hover:scale-105 flex items-center justify-center"
                          >
                            Réserver
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
