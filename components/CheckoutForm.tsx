"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { User, CreditCard, Lock, CheckCircle } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { createOrder, confirmPayment, checkStripeConfig } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { clearCart } from "@/lib/cart"

// Get Stripe publishable key
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''

// Load Stripe only if key is provided
const stripePromise = stripePublishableKey 
  ? loadStripe(stripePublishableKey)
  : null

// Warn if Stripe key is missing (only in development)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development' && !stripePublishableKey) {
  console.warn('⚠️ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set. Stripe payments will not work.')
  console.warn('   Add it to your .env.local file. Get your key from: https://dashboard.stripe.com/apikeys')
}

interface CheckoutFormProps {
  cartItems: Array<{ id: string; title: string; price: number; quantity: number }>
  total: number
  onSuccess?: () => void
}

// Payment form component (uses Stripe hooks)
function PaymentForm({
  onSuccess,
  orderId,
  paymentIntentId
}: {
  onSuccess: () => void
  orderId: string
  paymentIntentId: string
}) {
  const stripe = useStripe()
  const elements = useElements()
  const { toast } = useToast()
  const [processing, setProcessing] = useState(false)
  const [ready, setReady] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/boutique?order=success`,
        },
        redirect: 'if_required',
      })

      if (error) {
        toast({
          title: "Erreur de paiement",
          description: error.message || "Le paiement a échoué",
          variant: "destructive",
        })
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Confirm payment on backend to update order status
        try {
          await confirmPayment(orderId, paymentIntent.id)
          console.log('✅ Payment confirmed on backend, order status updated to paid')
        } catch (e: any) {
          console.error('❌ Error confirming payment on backend:', e)
          // Still show success to user since Stripe payment succeeded
          toast({
            title: "Paiement réussi",
            description: "Le paiement a été traité, mais il y a eu un problème lors de la mise à jour du statut. Veuillez contacter le support.",
            variant: "default",
          })
        }

        // Clear cart
        clearCart()

        toast({
          title: "Paiement réussi!",
          description: "Votre commande a été confirmée.",
        })

        onSuccess()
      }
    } catch (err: any) {
      toast({
        title: "Erreur",
        description: err.message || "Une erreur est survenue",
        variant: "destructive",
      })
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-xl p-4 border border-primary/10">
        <PaymentElement
          onReady={() => setReady(true)}
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Lock size={14} />
        <span>Paiement sécurisé par Stripe</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || processing || !ready}
        className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {processing ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Traitement en cours...
          </>
        ) : (
          <>
            <CreditCard size={20} />
            Payer maintenant
          </>
        )}
      </button>
    </form>
  )
}

export default function CheckoutForm({ cartItems, total, onSuccess }: CheckoutFormProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [step, setStep] = useState<'info' | 'payment'>('info')
  const [loading, setLoading] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null)
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
      // First, check if Stripe is configured on the backend
      const stripeConfig = await checkStripeConfig()
      
      if (!stripeConfig.configured) {
        toast({
          title: "Configuration requise",
          description: "Le paiement Stripe n'est pas configuré sur le serveur. Veuillez ajouter STRIPE_SECRET_KEY à votre backend. Pour les services déployés (Vercel/Railway), ajoutez-la dans les variables d'environnement du tableau de bord.",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Create order WITH payment intent using existing orders API
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        total: total,
        create_payment_intent: true, // This tells the backend to create a Stripe PaymentIntent
        ...formData
      }

      const result = await createOrder(orderData)
      setOrderId(result.order_id)

      // Check if payment intent was created
      if (result.payment_intent?.client_secret) {
        setClientSecret(result.payment_intent.client_secret)
        setPaymentIntentId(result.payment_intent.payment_intent_id)
        setStep('payment')
      } else {
        // Payment intent not available - check for error details
        const errorMsg = (result as any).payment_intent_error 
          ? `Erreur Stripe: ${(result as any).payment_intent_error}`
          : "Le paiement Stripe n'est pas configuré sur le serveur. Veuillez ajouter STRIPE_SECRET_KEY à votre backend."
        
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

  const handlePaymentSuccess = () => {
    if (onSuccess) {
      onSuccess()
    } else {
      router.push('/boutique?order=success')
    }
  }

  if (step === 'payment' && clientSecret && orderId && paymentIntentId) {
    // Check if Stripe is configured
    if (!stripePromise) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-red-600 mb-2">Stripe non configuré</h2>
            <p className="text-red-600">
              Le paiement Stripe n'est pas configuré. Veuillez ajouter NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY à votre fichier .env.local
            </p>
          </div>
        </motion.div>
      )
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle size={24} className="text-green-500" />
            <h2 className="text-xl font-bold text-primary">Commande créée</h2>
          </div>

          <div className="mb-6 p-4 bg-primary/5 rounded-xl">
            <p className="text-sm text-muted-foreground mb-1">Total à payer</p>
            <p className="text-2xl font-bold text-primary">{total.toFixed(2)}€</p>
          </div>

          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance: {
                theme: 'stripe',
                variables: {
                  colorPrimary: '#1a1a2e',
                  colorBackground: '#ffffff',
                  colorText: '#1a1a2e',
                  colorDanger: '#df1b41',
                  fontFamily: 'system-ui, sans-serif',
                  spacingUnit: '4px',
                  borderRadius: '12px',
                },
              },
            }}
          >
            <PaymentForm
              onSuccess={handlePaymentSuccess}
              orderId={orderId}
              paymentIntentId={paymentIntentId}
            />
          </Elements>
        </div>

        <button
          onClick={() => setStep('info')}
          className="w-full text-primary hover:text-accent transition-colors text-sm font-medium"
        >
          ← Modifier mes informations
        </button>
      </motion.div>
    )
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
        <span>Paiement sécurisé par Stripe</span>
      </div>
    </motion.form>
  )
}
