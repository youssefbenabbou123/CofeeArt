"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Gift, ArrowRight, Check } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { loadStripe } from "@stripe/stripe-js"
import { getCurrentUser } from "@/lib/auth"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

const giftCardTypes = [
  {
    id: "ateliers",
    title: "Ateliers",
    description: "Offrez un atelier de céramique pour découvrir l'art du tournage et du modelage",
    minAmount: 50,
    category: "Ateliers",
    image: "/ceramic-pottery-workshop-hands-creating-clay-potte.jpg"
  },
  {
    id: "cafe",
    title: "Consommations café",
    description: "Une carte cadeau pour déguster nos cafés de spécialité et nos pâtisseries",
    minAmount: 10,
    category: "Consommations café",
    image: "/artisan-coffee-cafe-with-ceramic-pottery-handmade-.jpg"
  },
  {
    id: "montant-libre",
    title: "Montant libre",
    description: "Choisissez le montant de votre carte cadeau pour offrir ce qui vous plaît",
    minAmount: 10,
    category: "Montant libre",
    image: "/placeholder.jpg"
  }
]

export default function GiftCardsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [amount, setAmount] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [recipientEmail, setRecipientEmail] = useState("")
  const [purchaserName, setPurchaserName] = useState("")
  const [purchaserEmail, setPurchaserEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handlePurchase = async () => {
    if (!selectedType) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un type de carte cadeau",
        variant: "destructive",
      })
      return
    }

    const selectedCard = giftCardTypes.find(t => t.id === selectedType)
    const cardAmount = parseFloat(amount)

    if (!cardAmount || cardAmount < selectedCard!.minAmount) {
      toast({
        title: "Erreur",
        description: `Le montant minimum est de ${selectedCard!.minAmount}€`,
        variant: "destructive",
      })
      return
    }

    if (!recipientEmail || !purchaserEmail) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    try {
      const user = await getCurrentUser()
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'}/api/gift-cards/purchase`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` })
          },
          body: JSON.stringify({
            category: selectedCard!.category,
            amount: cardAmount,
            recipient_name: recipientName || undefined,
            recipient_email: recipientEmail,
            purchaser_name: purchaserName,
            purchaser_email: purchaserEmail,
            create_payment_intent: true
          })
        }
      )

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de la création de la carte cadeau')
      }

      if (data.data.checkout_url) {
        // Redirect directly to Stripe Checkout URL
        window.location.href = data.data.checkout_url
      } else if (data.data.checkout_session_id) {
        // Fallback: if only session ID is provided, construct the URL
        // This shouldn't happen if backend is updated, but keeping for compatibility
        window.location.href = `https://checkout.stripe.com/pay/${data.data.checkout_session_id}`
      } else {
        toast({
          title: "Succès",
          description: "Carte cadeau créée avec succès ! Le code vous a été envoyé par email.",
        })
        // Reset form
        setSelectedType(null)
        setAmount("")
        setRecipientName("")
        setRecipientEmail("")
        setPurchaserName("")
        setPurchaserEmail("")
      }
    } catch (error: any) {
      console.error("Purchase error:", error)
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'achat",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-primary mb-6">Cartes cadeaux</h1>
            <p className="text-xl text-primary/70 max-w-2xl mx-auto">
              Offrez une expérience unique avec nos cartes cadeaux
            </p>
          </div>

          {!selectedType ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {giftCardTypes.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  onClick={() => setSelectedType(card.id)}
                  className="bg-white/50 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl border border-white/60 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                >
                  <div className="relative h-48">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-black text-primary mb-3">{card.title}</h3>
                    <p className="text-primary/70 mb-4 leading-relaxed">{card.description}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-primary/10">
                      <span className="font-bold text-primary">
                        {card.minAmount > 0 ? `À partir de ${card.minAmount}€` : "Montant libre"}
                      </span>
                      <div className="px-4 py-2 bg-primary text-primary-foreground rounded-xl font-bold text-sm flex items-center gap-2">
                        Choisir <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto bg-white/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/60"
            >
              <button
                onClick={() => setSelectedType(null)}
                className="mb-6 text-primary hover:text-primary/70 flex items-center gap-2"
              >
                ← Retour
              </button>

              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl font-black text-primary mb-2">
                    {giftCardTypes.find(t => t.id === selectedType)?.title}
                  </h2>
                  <p className="text-primary/70">
                    {giftCardTypes.find(t => t.id === selectedType)?.description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-primary mb-2">
                    Montant (€) *
                  </label>
                  <input
                    type="number"
                    min={giftCardTypes.find(t => t.id === selectedType)?.minAmount || 10}
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={`Minimum ${giftCardTypes.find(t => t.id === selectedType)?.minAmount || 10}€`}
                    className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">
                      Nom du destinataire
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">
                      Email du destinataire *
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">
                      Votre nom *
                    </label>
                    <input
                      type="text"
                      value={purchaserName}
                      onChange={(e) => setPurchaserName(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-primary mb-2">
                      Votre email *
                    </label>
                    <input
                      type="email"
                      value={purchaserEmail}
                      onChange={(e) => setPurchaserEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePurchase}
                  disabled={loading}
                  className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Traitement...
                    </>
                  ) : (
                    <>
                      <Gift size={20} />
                      Commander pour {amount ? `${parseFloat(amount).toFixed(2)}€` : '...'}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}


