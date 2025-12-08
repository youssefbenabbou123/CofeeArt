"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, CreditCard } from "lucide-react"
import { createOrder } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { clearCart } from "@/lib/cart"

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: total,
        ...formData
      }

      const result = await createOrder(orderData)
      
      toast({
        title: "Commande confirmée!",
        description: `Votre commande #${result.order_id.substring(0, 8)} a été créée avec succès.`,
      })

      // Clear cart
      clearCart()
      
      // Call success callback
      if (onSuccess) {
        onSuccess()
      } else {
        // Redirect to success page or home
        router.push('/boutique?order=success')
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
      onSubmit={handleSubmit}
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
            Traitement...
          </>
        ) : (
          <>
            <CreditCard size={20} />
            Confirmer la commande
          </>
        )}
      </button>
    </motion.form>
  )
}

