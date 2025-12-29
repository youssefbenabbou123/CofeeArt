"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, Users, MapPin, Check, CreditCard } from "lucide-react"
import { fetchWorkshop, type Workshop, type WorkshopSession } from "@/lib/api"
import { getCurrentUser } from "@/lib/auth"
import { motion } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
// Square will be handled via backend checkout session

export default function WorkshopDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [workshop, setWorkshop] = useState<(Workshop & { sessions: WorkshopSession[] }) | null>(null)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [selectedSession, setSelectedSession] = useState<string>("")
  const [quantity, setQuantity] = useState(1)
  const [booking, setBooking] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    phone: ""
  })
  const { toast } = useToast()

  useEffect(() => {
    async function loadWorkshop() {
      try {
        const data = await fetchWorkshop(id)
        console.log("Workshop data loaded:", data) // Debug log
        if (data) {
          setWorkshop(data)
          if (data.sessions && data.sessions.length > 0) {
            // Find first available session (not fully booked)
            const availableSession = data.sessions.find((s: any) => {
              const spots = s.capacity - s.booked_count
              return s.status === 'active' && spots > 0
            })
            if (availableSession) {
              setSelectedSession(availableSession.id)
            }
            // If no available session, don't select any (user will see all are fully booked)
          }
        } else {
          console.error("No workshop data returned")
        }
      } catch (error) {
        console.error("Error loading workshop:", error)
        toast({
          title: "Erreur",
          description: "Impossible de charger l'atelier",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    async function loadUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      if (currentUser) {
        setGuestInfo({
          name: currentUser.name || "",
          email: currentUser.email || "",
          phone: ""
        })
      }
    }

    // Check for payment success/cancel in URL params
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

    loadWorkshop()
    loadUser()
  }, [id, toast, router])

  const handleBooking = async () => {
    if (!selectedSession) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une session",
        variant: "destructive",
      })
      return
    }

    // Check if selected session is fully booked
    const selectedSessionData = sessions.find(s => s.id === selectedSession)
    if (selectedSessionData) {
      const availableSpots = selectedSessionData.capacity - selectedSessionData.booked_count
      if (availableSpots <= 0) {
        toast({
          title: "Erreur",
          description: "Cette session est complète. Veuillez choisir une autre session.",
          variant: "destructive",
        })
        return
      }
      if (quantity > availableSpots) {
        toast({
          title: "Erreur",
          description: `Il ne reste que ${availableSpots} place${availableSpots > 1 ? 's' : ''} disponible${availableSpots > 1 ? 's' : ''} pour cette session.`,
          variant: "destructive",
        })
        return
      }
    }

    if (!user && (!guestInfo.name || !guestInfo.email)) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir vos informations",
        variant: "destructive",
      })
      return
    }

    setBooking(true)
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      
      // First, create the booking
      const bookingResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'}/api/workshops/${id}/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify({
          session_id: selectedSession,
          quantity: quantity,
          guest_name: !user ? guestInfo.name : undefined,
          guest_email: !user ? guestInfo.email : undefined,
          guest_phone: guestInfo.phone || undefined,
          create_payment_intent: true
        })
      })

      const bookingData = await bookingResponse.json()

      if (!bookingData.success) {
        throw new Error(bookingData.message || 'Erreur lors de la réservation')
      }

      // If checkout URL is provided, redirect to Square
      if (bookingData.data.checkout_url) {
        window.location.href = bookingData.data.checkout_url
      } else if (bookingData.data.payment_intent?.client_secret) {
        // Square checkout is handled via redirect to Square's hosted checkout
        // For now, redirect to a payment page or show success
        toast({
          title: "Réservation en attente de paiement",
          description: "Vous allez être redirigé vers la page de paiement",
        })
        // Square checkout redirects to hosted checkout page
        router.push(`/paiement?payment_intent=${bookingData.data.payment_intent.payment_intent_id}`)
      } else {
        // Booking confirmed without payment
        toast({
          title: "Réservation confirmée",
          description: "Votre réservation a été enregistrée avec succès",
        })
        router.push('/espace-client')
      }
    } catch (error: any) {
      console.error('Error booking workshop:', error)
      toast({
        title: "Erreur",
        description: error.message || "Impossible de finaliser la réservation",
        variant: "destructive",
      })
    } finally {
      setBooking(false)
    }
  }

  if (loading) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-muted-foreground">Chargement...</div>
        </div>
      </div>
    )
  }

  if (!workshop) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">Atelier non trouvé</h1>
          <Link href="/ateliers" className="text-accent hover:text-primary">
            Retour aux ateliers
          </Link>
        </div>
      </div>
    )
  }

  // The API returns workshop data directly with sessions property
  // Ensure workshop exists before accessing properties
  if (!workshop) {
    return null
  }
  
  const w = workshop
  const sessions = workshop.sessions || []
  const duration = w.duration || 120 // Default to 120 minutes if not provided
  const durationHours = Math.floor(duration / 60)
  const durationMinutes = duration % 60
  const durationText = durationMinutes > 0 
    ? `${durationHours}h${durationMinutes.toString().padStart(2, '0')}`
    : `${durationHours}h00`

  const selectedSessionData = sessions.find(s => s.id === selectedSession)
  const availableSpots = selectedSessionData 
    ? selectedSessionData.capacity - selectedSessionData.booked_count 
    : 0

  return (
    <div className="pt-20 min-h-screen bg-background">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link 
          href="/ateliers"
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
        >
          <ArrowLeft size={20} />
          Retour aux ateliers
        </Link>
      </div>

      {/* Workshop Header */}
      <section className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="relative">
              <div className="aspect-square bg-neutral-100 rounded-2xl overflow-hidden shadow-xl">
                {w?.image ? (
                  <Image
                    src={w.image}
                    alt={w?.title || "Atelier"}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                    <Calendar size={64} className="text-primary/30" />
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                  {w?.level || "Tous niveaux"}
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
                  {w?.title || "Atelier"}
                </h1>
                <div className="text-3xl font-bold text-primary mb-6">
                  {w?.price ? (typeof w.price === 'number' ? w.price.toFixed(2) : parseFloat(w.price).toFixed(2)) : "0.00"}€
                </div>
              </div>

              <p className="text-lg text-primary/80 leading-relaxed mb-8">
                {w?.description || "Description de l'atelier"}
              </p>

              {/* Details */}
              <div className="mb-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Clock size={20} className="text-accent flex-shrink-0" />
                  <span className="font-semibold">Durée : {durationText}</span>
                </div>
                {w?.next_session_date && (
                  <div className="flex items-center gap-3 text-primary">
                    <Calendar size={20} className="text-accent flex-shrink-0" />
                    <span className="font-semibold">
                      Prochaine session: {new Date(w.next_session_date).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </div>

              {/* Booking Button */}
              <button
                onClick={() => setShowBookingForm(true)}
                className="w-full px-6 py-4 bg-[#ACB792] text-[#58604C] rounded-xl font-bold hover:bg-[#ACB792]/90 transition-colors text-lg"
              >
                Réserver cet atelier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {showBookingForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-3xl font-black text-primary">Réserver l'atelier</h2>
              <button
                onClick={() => setShowBookingForm(false)}
                className="text-primary hover:text-primary/70 text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Session Selection */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-primary/70 mb-2">
                Choisir une session
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {sessions.filter(s => s.status === 'active').map((session) => {
                  const spots = session.capacity - session.booked_count
                  const isFullyBooked = spots <= 0
                  return (
                    <button
                      key={session.id}
                      onClick={() => !isFullyBooked && setSelectedSession(session.id)}
                      disabled={isFullyBooked}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isFullyBooked
                          ? 'border-gray-300 bg-gray-100 opacity-60 cursor-not-allowed'
                          : selectedSession === session.id
                          ? 'border-primary bg-primary/5'
                          : 'border-primary/10 hover:border-primary/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className={`font-bold ${isFullyBooked ? 'text-gray-500' : 'text-primary'}`}>
                            {new Date(session.session_date).toLocaleDateString('fr-FR', {
                              weekday: 'long',
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric'
                            })}
                          </div>
                          <div className={`text-sm mt-1 ${isFullyBooked ? 'text-gray-400' : 'text-primary/70'}`}>
                            {session.session_time} - {isFullyBooked ? 'Complet' : `${spots} place${spots > 1 ? 's' : ''} disponible${spots > 1 ? 's' : ''}`}
                          </div>
                        </div>
                        {selectedSession === session.id && !isFullyBooked && (
                          <Check size={20} className="text-primary" />
                        )}
                        {isFullyBooked && (
                          <span className="text-xs text-gray-500 font-semibold">COMPLET</span>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-primary/70 mb-2">
                Nombre de participants
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="px-4 py-2 border-2 border-[#8A8E74] rounded-lg text-[#58604C] hover:bg-[#ACB792] hover:text-[#58604C] transition-colors disabled:opacity-50"
                >
                  -
                </button>
                <span className="px-4 py-2 text-[#58604C] font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(availableSpots, quantity + 1))}
                  disabled={quantity >= availableSpots}
                  className="px-4 py-2 border-2 border-[#8A8E74] rounded-lg text-[#58604C] hover:bg-[#ACB792] hover:text-[#58604C] transition-colors disabled:opacity-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Guest Info (if not logged in) */}
            {!user && (
              <div className="mb-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-primary/70 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={guestInfo.name}
                    onChange={(e) => setGuestInfo({ ...guestInfo, name: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-primary/10 rounded-xl focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary/70 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={guestInfo.email}
                    onChange={(e) => setGuestInfo({ ...guestInfo, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-primary/10 rounded-xl focus:border-primary focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary/70 mb-2">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={guestInfo.phone}
                    onChange={(e) => setGuestInfo({ ...guestInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-primary/10 rounded-xl focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Total */}
            <div className="mb-6 p-4 bg-primary/5 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="font-bold text-primary">Total :</span>
                <span className="text-2xl font-black text-primary">
                  {w?.price ? ((typeof w.price === 'number' ? w.price : parseFloat(w.price)) * quantity).toFixed(2) : "0.00"}€
                </span>
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleBooking}
              disabled={booking || !selectedSession}
              className="w-full px-6 py-4 bg-[#ACB792] text-[#58604C] rounded-xl font-bold hover:bg-[#ACB792]/90 transition-colors text-lg disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {booking ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#58604C]"></div>
                  Traitement...
                </>
              ) : (
                <>
                  <CreditCard size={20} />
                  Payer et réserver
                </>
              )}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}

