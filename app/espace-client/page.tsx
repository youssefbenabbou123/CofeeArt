"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Package, Heart, Truck, LogOut, ShoppingCart, Trash2, Calendar, MapPin, Clock } from "lucide-react"
import { getCurrentUser, signOut } from "@/lib/auth"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { fetchUserOrders, fetchOrderDetails, fetchUserReservations, type UserOrder, type OrderDetail, type UserReservation } from "@/lib/api"
import { getWishlistItems, removeFromWishlist, type WishlistItem } from "@/lib/wishlist"
import { addToCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"

export default function EspaceClient() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"compte" | "historique" | "wishlist" | "suivi" | "ateliers">("compte")
  const [orders, setOrders] = useState<UserOrder[]>([])
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [reservations, setReservations] = useState<UserReservation[]>([])
  const [selectedOrder, setSelectedOrder] = useState<OrderDetail | null>(null)
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [loadingReservations, setLoadingReservations] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    async function checkAuth() {
      const currentUser = await getCurrentUser()
      if (!currentUser) {
        router.push("/connexion?return=/espace-client")
        return
      }
      setUser(currentUser)
      setLoading(false)
    }
    checkAuth()
  }, [router])

  // Load orders when historique or suivi tab is active
  useEffect(() => {
    if ((activeTab === "historique" || activeTab === "suivi") && user) {
      loadOrders()
    }
  }, [activeTab, user])

  // Load reservations when ateliers tab is active
  useEffect(() => {
    if (activeTab === "ateliers" && user) {
      loadReservations()
    }
  }, [activeTab, user])

  // Load wishlist when wishlist tab is active
  useEffect(() => {
    if (activeTab === "wishlist") {
      loadWishlist()
      window.addEventListener('wishlist-update', loadWishlist)
      return () => {
        window.removeEventListener('wishlist-update', loadWishlist)
      }
    }
  }, [activeTab])

  async function loadOrders() {
    setLoadingOrders(true)
    try {
      const data = await fetchUserOrders()
      setOrders(data)
    } catch (error) {
      console.error('Error loading orders:', error)
    } finally {
      setLoadingOrders(false)
    }
  }

  async function loadReservations() {
    setLoadingReservations(true)
    try {
      const data = await fetchUserReservations()
      setReservations(data)
    } catch (error) {
      console.error('Error loading reservations:', error)
      toast({
        title: "Erreur",
        description: "Impossible de charger vos réservations",
        variant: "destructive",
      })
    } finally {
      setLoadingReservations(false)
    }
  }

  function loadWishlist() {
    setWishlistItems(getWishlistItems())
  }

  async function handleViewOrder(orderId: string) {
    try {
      const order = await fetchOrderDetails(orderId)
      setSelectedOrder(order)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de charger les détails de la commande",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary">Chargement...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const tabs = [
    { id: "compte" as const, label: "Mon compte", icon: User },
    { id: "historique" as const, label: "Historique", icon: Package },
    { id: "wishlist" as const, label: "Wishlist", icon: Heart },
    { id: "suivi" as const, label: "Suivi de commande", icon: Truck },
    { id: "ateliers" as const, label: "Mes ateliers", icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-background pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-black text-primary mb-4">Espace client</h1>
          <p className="text-primary/70 text-lg">Bienvenue, {user.name}</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-primary/10 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${activeTab === tab.id
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-white/50 text-primary hover:bg-primary/5"
                  }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white/50 backdrop-blur-xl rounded-[2rem] p-10 shadow-xl border border-white/60 min-h-[400px]">
          {activeTab === "compte" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-primary mb-6">Informations personnelles</h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-bold text-primary/70 mb-2 block">Nom complet</label>
                  <div className="px-4 py-3 bg-white/50 rounded-xl border border-primary/10 text-primary">
                    {user.name}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-bold text-primary/70 mb-2 block">Email</label>
                  <div className="px-4 py-3 bg-white/50 rounded-xl border border-primary/10 text-primary">
                    {user.email}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-colors mt-8"
                >
                  <LogOut size={20} />
                  Déconnexion
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "historique" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-primary mb-6">Historique des commandes</h2>
              {loadingOrders ? (
                <div className="text-center py-12 text-primary/60">
                  <div>Chargement...</div>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-12 text-primary/60">
                  <Package size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Aucune commande pour le moment</p>
                  <Link
                    href="/boutique"
                    className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    Découvrir la boutique
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-white/50 rounded-xl p-6 border border-primary/10 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <Package size={20} className="text-primary" />
                            <span className="font-bold text-primary">Commande #{order.id.slice(0, 8)}</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                  order.status === 'delivered' ? 'bg-primary/20 text-primary' :
                                    'bg-gray-100 text-gray-700'
                              }`}>
                              {order.status === 'confirmed' ? 'Confirmée' :
                                order.status === 'shipped' ? 'Expédiée' :
                                  order.status === 'delivered' ? 'Livrée' :
                                    order.status}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-primary/70">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(order.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </div>
                            <div>{order.item_count} article{order.item_count > 1 ? 's' : ''}</div>
                            <div className="font-bold text-primary">{typeof order.total === 'number' ? order.total.toFixed(2) : parseFloat(order.total).toFixed(2)}€</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors"
                        >
                          Voir les détails
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black text-primary">Détails de la commande</h3>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-primary hover:text-primary/70"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-bold text-primary mb-2">Articles :</p>
                        <div className="space-y-2">
                          {selectedOrder.items && selectedOrder.items.length > 0 ? (
                            selectedOrder.items.map((item, idx) => {
                              const productImage = item.image || item.product_image
                              const productTitle = item.title || item.product_title || 'Produit'
                              return (
                                <div key={idx} className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                                  {productImage ? (
                                    <Image
                                      src={productImage}
                                      alt={productTitle}
                                      width={60}
                                      height={60}
                                      className="rounded-lg object-cover"
                                    />
                                  ) : (
                                    <div className="w-[60px] h-[60px] bg-primary/10 rounded-lg flex items-center justify-center">
                                      <Package size={24} className="text-primary/50" />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <p className="font-semibold text-primary">{productTitle}</p>
                                    <p className="text-sm text-primary/70">Quantité : {item.quantity}</p>
                                    <p className="text-xs text-primary/50">Prix unitaire: {typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}€</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-primary">{((typeof item.price === 'number' ? item.price : parseFloat(item.price)) * item.quantity).toFixed(2)}€</p>
                                  </div>
                                </div>
                              )
                            })
                          ) : (
                            <p className="text-primary/60 text-center py-4">Aucun article trouvé</p>
                          )}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-primary/10">
                        <p className="text-right font-black text-xl text-primary">Total : {typeof selectedOrder.total === 'number' ? selectedOrder.total.toFixed(2) : parseFloat(selectedOrder.total).toFixed(2)}€</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "wishlist" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-primary mb-6">Ma wishlist</h2>
              {wishlistItems.length === 0 ? (
                <div className="text-center py-12 text-primary/60">
                  <Heart size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Votre wishlist est vide</p>
                  <Link
                    href="/boutique"
                    className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    Découvrir la boutique
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white/50 rounded-xl overflow-hidden border border-primary/10 hover:shadow-lg transition-shadow"
                    >
                      <Link href={`/boutique/${item.id}`}>
                        <div className="relative aspect-square">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="p-4">
                        <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                        <p className="text-lg font-bold text-primary mb-4">{typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}€</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              addToCart({
                                id: item.id,
                                title: item.title,
                                price: item.price,
                                image: item.image
                              }, 1)
                              toast({
                                title: "Ajouté au panier",
                                description: `${item.title} a été ajouté`,
                              })
                            }}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors"
                          >
                            <ShoppingCart size={18} />
                            Ajouter au panier
                          </button>
                          <button
                            onClick={() => {
                              removeFromWishlist(item.id)
                              loadWishlist()
                              toast({
                                title: "Retiré de la wishlist",
                                description: `${item.title} a été retiré`,
                              })
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "suivi" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-primary mb-6">Suivi de commande</h2>
              {loadingOrders ? (
                <div className="text-center py-12 text-primary/60">
                  <div>Chargement...</div>
                </div>
              ) : orders.filter(o => o.status !== 'delivered').length === 0 ? (
                <div className="text-center py-12 text-primary/60">
                  <Truck size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Aucune commande en cours</p>
                  <Link
                    href="/boutique"
                    className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    Découvrir la boutique
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.filter(o => o.status !== 'delivered').map((order) => (
                    <div
                      key={order.id}
                      className="bg-white/50 rounded-xl p-6 border border-primary/10"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <Truck size={24} className="text-primary" />
                        <span className="font-bold text-xl text-primary">Commande #{order.id.slice(0, 8)}</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-primary/70">
                          <Calendar size={14} />
                          <span>Commandée le {new Date(order.created_at).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-primary/70">
                          <Package size={14} />
                          <span>{order.item_count} article{order.item_count > 1 ? 's' : ''}</span>
                        </div>
                        <div className="pt-3 border-t border-primary/10">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-primary">Statut:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${order.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                order.status === 'shipped' ? 'bg-blue-100 text-blue-700' :
                                  'bg-gray-100 text-gray-700'
                              }`}>
                              {order.status === 'confirmed' ? 'Confirmée' :
                                order.status === 'shipped' ? 'Expédiée' :
                                  order.status}
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewOrder(order.id)}
                          className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-primary/90 transition-colors"
                        >
                          Voir les détails
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-black text-primary">Détails de la commande</h3>
                      <button
                        onClick={() => setSelectedOrder(null)}
                        className="text-primary hover:text-primary/70 text-2xl"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="font-bold text-primary mb-2">Articles :</p>
                        <div className="space-y-2">
                          {selectedOrder.items && selectedOrder.items.length > 0 ? (
                            selectedOrder.items.map((item, idx) => {
                              const productImage = item.image || item.product_image
                              const productTitle = item.title || item.product_title || 'Produit'
                              return (
                                <div key={idx} className="flex items-center gap-4 p-3 bg-primary/5 rounded-lg">
                                  {productImage ? (
                                    <Image
                                      src={productImage}
                                      alt={productTitle}
                                      width={60}
                                      height={60}
                                      className="rounded-lg object-cover"
                                    />
                                  ) : (
                                    <div className="w-[60px] h-[60px] bg-primary/10 rounded-lg flex items-center justify-center">
                                      <Package size={24} className="text-primary/50" />
                                    </div>
                                  )}
                                  <div className="flex-1">
                                    <p className="font-semibold text-primary">{productTitle}</p>
                                    <p className="text-sm text-primary/70">Quantité : {item.quantity}</p>
                                    <p className="text-xs text-primary/50">Prix unitaire: {typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}€</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-bold text-primary">{((typeof item.price === 'number' ? item.price : parseFloat(item.price)) * item.quantity).toFixed(2)}€</p>
                                  </div>
                                </div>
                              )
                            })
                          ) : (
                            <p className="text-primary/60 text-center py-4">Aucun article trouvé</p>
                          )}
                        </div>
                      </div>
                      <div className="pt-4 border-t border-primary/10">
                        <p className="text-right font-black text-xl text-primary">Total : {typeof selectedOrder.total === 'number' ? selectedOrder.total.toFixed(2) : parseFloat(selectedOrder.total).toFixed(2)}€</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "ateliers" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-primary mb-6">Mes ateliers réservés</h2>
              {loadingReservations ? (
                <div className="text-center py-12 text-primary/60">
                  <div>Chargement...</div>
                </div>
              ) : reservations.length === 0 ? (
                <div className="text-center py-12 text-primary/60">
                  <Calendar size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Aucun atelier réservé pour le moment</p>
                  <Link
                    href="/ateliers"
                    className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
                  >
                    Réserver un atelier
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reservation) => {
                    const durationHours = Math.floor(reservation.duration / 60);
                    const durationMinutes = reservation.duration % 60;
                    const durationText = durationMinutes > 0
                      ? `${durationHours}h${durationMinutes.toString().padStart(2, '0')}`
                      : `${durationHours}h00`;

                    return (
                      <div
                        key={reservation.id}
                        className="bg-white/50 rounded-xl p-6 border border-primary/10 hover:shadow-lg transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          {reservation.workshop_image && (
                            <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                              <Image
                                src={reservation.workshop_image}
                                alt={reservation.workshop_title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-2xl font-black text-primary mb-2">
                                  {reservation.workshop_title}
                                </h3>
                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${reservation.status === 'confirmed' ? 'bg-green-100 text-green-700' :
                                    reservation.status === 'waitlist' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-gray-100 text-gray-700'
                                  }`}>
                                  {reservation.status === 'confirmed' ? 'Confirmé' :
                                    reservation.status === 'waitlist' ? 'Liste d\'attente' :
                                      reservation.status}
                                </span>
                                {reservation.waitlist_position && (
                                  <p className="text-sm text-primary/70">
                                    Position dans la liste d'attente : #{reservation.waitlist_position}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2 text-primary/70">
                                <Calendar size={18} />
                                <span className="font-medium">
                                  {new Date(reservation.session_date).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-primary/70">
                                <Clock size={18} />
                                <span className="font-medium">{reservation.session_time}</span>
                                <span className="text-primary/50">•</span>
                                <span>{durationText}</span>
                              </div>
                              <div className="flex items-center gap-2 text-primary/70">
                                <span className="font-medium">Niveau : {reservation.level}</span>
                                <span className="text-primary/50">•</span>
                                <span>Quantité : {reservation.quantity} place{reservation.quantity > 1 ? 's' : ''}</span>
                              </div>
                              <div className="pt-3 border-t border-primary/10">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-primary">Prix total :</span>
                                  <span className="text-2xl font-black text-primary">
                                    {(reservation.price * reservation.quantity).toFixed(2)}€
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Link
                              href={`/ateliers#${reservation.workshop_id}`}
                              className="inline-block mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 transition-colors"
                            >
                              Voir l'atelier
                            </Link>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}





