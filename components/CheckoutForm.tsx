"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, CreditCard, Lock } from "lucide-react"
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
  const [formData, setFormData] = useState({
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_postal_code: '',
    shipping_country: 'France',
  })

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
        ...formData
      }

      const result = await createOrder(orderData)

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
