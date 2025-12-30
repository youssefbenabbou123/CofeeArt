"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, CreditCard, Lock, Gift } from "lucide-react"
import { createOrder, checkSquareConfig } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

interface CheckoutFormProps {
  cartItems: Array<{ id: string; title: string; price: number; quantity: number }>
  total: number
  onSuccess?: () => void
}

export default function CheckoutForm({ cartItems, total, onSuccess }: CheckoutFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [giftCardCode, setGiftCardCode] = useState('')
  const [giftCardApplied, setGiftCardApplied] = useState<any>(null)
  const [checkingGiftCard, setCheckingGiftCard] = useState(false)
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_postal_code: '',
    shipping_country: 'France',
  })

  const handleApplyGiftCard = async () => {
    if (!giftCardCode.trim()) {
      toast({
        title: "Code requis",
        description: "Veuillez entrer un code de carte cadeau",
        variant: "destructive",
      })
      return
    }

    setCheckingGiftCard(true)
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'
      const response = await fetch(`${apiUrl}/api/gift-cards/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: giftCardCode.toUpperCase(),
          order_total: total
        })
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.message || 'Erreur lors de l\'application de la carte cadeau')
      }

      setGiftCardApplied(data.data)
      toast({
        title: "Carte cadeau appliquée",
        description: `${data.data.amount_applied}€ appliqués. Reste à payer: ${data.data.remaining_to_pay}€`,
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'appliquer la carte cadeau",
        variant: "destructive",
      })
      setGiftCardApplied(null)
    } finally {
      setCheckingGiftCard(false)
    }
  }

  const handleRemoveGiftCard = () => {
    setGiftCardApplied(null)
    setGiftCardCode('')
  }

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First, check if Square is configured on the backend
      const squareConfig = await checkSquareConfig()
      
      if (!squareConfig.configured) {
        toast({
          title: "Configuration requise",
          description: "Le paiement Square n'est pas configuré sur le serveur. Veuillez ajouter SQUARE_ACCESS_TOKEN et SQUARE_APPLICATION_ID à votre backend. Pour les services déployés (Vercel/Railway), ajoutez-les dans les variables d'environnement du tableau de bord.",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Create order WITH checkout link using existing orders API
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: total,
        create_payment_intent: true, // This tells the backend to create a Square checkout link
        gift_card_code: giftCardApplied?.card_code || null,
        ...formData
      }

      const result = await createOrder(orderData)

      // Check if gift card fully covered the order
      if (result.gift_card?.fully_covered) {
        toast({
          title: "Commande payée",
          description: "Votre commande a été payée avec votre carte cadeau !",
        })
        if (onSuccess) onSuccess()
        router.push('/boutique?order=success')
        return
      }

      // Check if checkout link was created
      if (result.checkout?.checkout_url) {
        // Redirect to Square checkout page
        window.location.href = result.checkout.checkout_url
      } else {
        // Checkout link not available - check for error details
        const errorMsg = (result as any).payment_intent_error 
          ? `Erreur Square: ${(result as any).payment_intent_error}`
          : "Le paiement Square n'est pas configuré sur le serveur. Veuillez ajouter Square credentials à votre backend."
        
        toast({
          title: "Configuration requise",
          description: errorMsg,
          variant: "destructive",
        })
      }
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de créer la commande",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleInfoSubmit}
      className="space-y-6"
    >
      <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <User size={24} />
          Informations de livraison
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">
              Nom complet *
            </label>
            <input
              type="text"
              required
              value={formData.guest_name}
              onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="Jean Dupont"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-2">
              Email *
            </label>
            <input
              type="email"
              required
              value={formData.guest_email}
              onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="jean.dupont@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-2">
              Téléphone
            </label>
            <input
              type="tel"
              value={formData.guest_phone}
              onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-2">
              Adresse *
            </label>
            <input
              type="text"
              required
              value={formData.shipping_address}
              onChange={(e) => setFormData({ ...formData, shipping_address: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="123 Rue de la Céramique"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                Ville *
              </label>
              <input
                type="text"
                required
                value={formData.shipping_city}
                onChange={(e) => setFormData({ ...formData, shipping_city: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="Paris"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                Code postal *
              </label>
              <input
                type="text"
                required
                value={formData.shipping_postal_code}
                onChange={(e) => setFormData({ ...formData, shipping_postal_code: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="75001"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-primary mb-2">
              Pays
            </label>
            <input
              type="text"
              value={formData.shipping_country}
              onChange={(e) => setFormData({ ...formData, shipping_country: e.target.value })}
              className="w-full px-4 py-3 bg-white border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              placeholder="France"
            />
          </div>
        </div>
      </div>

      {/* Gift Card Section */}
      <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
          <Gift size={24} />
          Carte cadeau
        </h2>

        {!giftCardApplied ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={giftCardCode}
              onChange={(e) => setGiftCardCode(e.target.value.toUpperCase())}
              placeholder="Entrez votre code"
              className="flex-1 px-4 py-3 bg-white border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              maxLength={8}
            />
            <button
              type="button"
              onClick={handleApplyGiftCard}
              disabled={checkingGiftCard || !giftCardCode.trim()}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checkingGiftCard ? 'Vérification...' : 'Appliquer'}
            </button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-green-800">Carte cadeau appliquée</p>
                <p className="text-sm text-green-600">
                  Code: {giftCardApplied.card_code} • 
                  {giftCardApplied.amount_applied}€ appliqués • 
                  Reste: {giftCardApplied.remaining_to_pay}€
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveGiftCard}
                className="text-red-600 hover:text-red-800 font-bold text-sm"
              >
                Retirer
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Résumé de la commande</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Sous-total</span>
            <span className="font-bold">{total.toFixed(2)}€</span>
          </div>
          {giftCardApplied && (
            <>
              <div className="flex justify-between text-green-600">
                <span>Carte cadeau</span>
                <span className="font-bold">-{giftCardApplied.amount_applied.toFixed(2)}€</span>
              </div>
              <div className="border-t border-primary/20 pt-2 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{giftCardApplied.remaining_to_pay.toFixed(2)}€</span>
              </div>
            </>
          )}
          {!giftCardApplied && (
            <div className="border-t border-primary/20 pt-2 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{total.toFixed(2)}€</span>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Préparation du paiement...
          </>
        ) : (
          <>
            <CreditCard size={20} />
            Continuer vers le paiement
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Lock size={14} />
        <span>Paiement sécurisé par Square</span>
      </div>
    </motion.form>
  )
}
