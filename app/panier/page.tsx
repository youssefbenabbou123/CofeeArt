"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowLeft, ShoppingCart, Plus, Minus, Trash2, X } from "lucide-react"
import { getCartItems, removeFromCart, updateCartItemQuantity, getCartTotal, clearCart, type CartItem } from "@/lib/cart"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import CheckoutForm from "@/components/CheckoutForm"

export default function Panier() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [total, setTotal] = useState(0)
  const [user, setUser] = useState<any>(null)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [showCheckout, setShowCheckout] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    async function checkAuth() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      setCheckingAuth(false)
    }
    checkAuth()

    function loadCart() {
      const items = getCartItems()
      setCartItems(items)
      setTotal(getCartTotal())
    }

    loadCart()

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart()
    }
    window.addEventListener('cart-update', handleCartUpdate)

    // Listen for auth changes
    const handleAuthChange = () => {
      checkAuth()
    }
    window.addEventListener('auth-change', handleAuthChange)

    return () => {
      window.removeEventListener('cart-update', handleCartUpdate)
      window.removeEventListener('auth-change', handleAuthChange)
    }
  }, [])

  const handleRemove = (productId: string) => {
    removeFromCart(productId)
    const items = getCartItems()
    setCartItems(items)
    setTotal(getCartTotal())
  }

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateCartItemQuantity(productId, newQuantity)
    const items = getCartItems()
    setCartItems(items)
    setTotal(getCartTotal())
  }

  const handleCheckout = () => {
    // Show checkout form (works for both logged in and guest users)
    setShowCheckout(true)
  }

  const handleOrderSuccess = () => {
    setShowCheckout(false)
    router.push('/boutique?order=success')
  }

  if (cartItems.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            href="/boutique"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
          >
            <ArrowLeft size={20} />
            Retour à la boutique
          </Link>

          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingCart size={64} className="text-muted-foreground mb-6" />
            <h1 className="text-4xl font-bold text-primary mb-4">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-8 text-lg">Découvrez nos produits artisanaux</p>
            <Link
              href="/boutique"
              className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
            >
              Découvrir la boutique
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          href="/boutique"
          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Retour à la boutique
        </Link>

        <h1 className="text-4xl font-black text-primary mb-8">Mon panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col md:flex-row gap-6"
              >
                {/* Product Image */}
                <Link href={`/boutique/${item.id}`} className="flex-shrink-0">
                  <div className="w-32 h-32 md:w-24 md:h-24 rounded-xl overflow-hidden bg-neutral-100 relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                </Link>

                {/* Product Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/boutique/${item.id}`}>
                      <h3 className="text-xl font-bold text-primary mb-2 hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-lg font-bold text-primary mb-4">
                      {item.price.toFixed(2)}€
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="p-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                        aria-label="Diminuer la quantité"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="text-lg font-bold text-primary w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="p-2 rounded-lg border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors"
                        aria-label="Augmenter la quantité"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex flex-col justify-between items-end">
                  <p className="text-2xl font-bold text-primary">
                    {(item.price * item.quantity).toFixed(2)}€
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary / Checkout */}
          <div className="lg:col-span-1">
            {!showCheckout ? (
              <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 sticky top-24">
                <h2 className="text-2xl font-bold text-primary mb-6">Résumé</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-primary">
                    <span>Sous-total</span>
                    <span className="font-bold">{total.toFixed(2)}€</span>
                  </div>
                  <div className="flex justify-between text-primary">
                    <span>Livraison</span>
                    <span className="font-bold">Gratuite</span>
                  </div>
                  <div className="border-t border-primary/20 pt-4 flex justify-between text-xl font-bold text-primary">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors mb-4"
                >
                  Passer la commande
                </button>

                {user && (
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Connecté en tant que {user.name}
                  </p>
                )}

                {!user && (
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    Vous pouvez commander sans créer de compte
                  </p>
                )}

                <button
                  onClick={() => {
                    clearCart()
                    setCartItems([])
                    setTotal(0)
                  }}
                  className="w-full text-primary hover:text-accent transition-colors text-sm font-medium"
                >
                  Vider le panier
                </button>
              </div>
            ) : (
              <div className="bg-white/40 backdrop-blur-md border border-white/20 rounded-2xl p-6 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-primary">Commande</h2>
                  <button
                    onClick={() => setShowCheckout(false)}
                    className="text-primary hover:text-accent transition-colors"
                  >
                    ← Retour
                  </button>
                </div>

                <div className="mb-6 p-4 bg-primary/5 rounded-xl">
                  <div className="flex justify-between text-primary mb-2">
                    <span>Total</span>
                    <span className="font-bold text-xl">{total.toFixed(2)}€</span>
                  </div>
                </div>

                <CheckoutForm
                  cartItems={cartItems}
                  total={total}
                  onSuccess={handleOrderSuccess}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

