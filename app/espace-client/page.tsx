"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { User, Package, Heart, Truck, LogOut } from "lucide-react"
import { getCurrentUser, signOut } from "@/lib/auth"
import { motion } from "framer-motion"
import Link from "next/link"

export default function EspaceClient() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"compte" | "historique" | "wishlist" | "suivi">("compte")

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
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab.id
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
            </motion.div>
          )}

          {activeTab === "wishlist" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-primary mb-6">Ma wishlist</h2>
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
            </motion.div>
          )}

          {activeTab === "suivi" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-primary mb-6">Suivi de commande</h2>
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
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}




