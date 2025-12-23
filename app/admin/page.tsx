"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Users, Package, Mail, MailCheck, TrendingUp, TrendingDown, Euro, ShoppingCart, DollarSign, Calendar, BookOpen, Gift } from "lucide-react"
import { fetchStats, type Stats } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"


export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await fetchStats()
        setStats(data)
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message || "Impossible de charger les statistiques",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }
    loadStats()
  }, [toast])

  if (loading || !stats) {
    return <LoadingSpinner message="Chargement des statistiques..." />
  }

  const statCards = [
    {
      label: "Revenus totaux",
      value: `${stats.revenue.toFixed(2)}€`,
      icon: Euro,
      color: "bg-gradient-to-br from-green-500 to-emerald-600",
      description: "Chiffre d'affaires",
      href: "/admin/orders",
    },
    {
      label: "Commandes",
      value: stats.orders,
      icon: ShoppingCart,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      description: "Total des commandes",
      href: "/admin/orders",
    },
    {
      label: "Utilisateurs",
      value: stats.users,
      icon: Users,
      color: "bg-gradient-to-br from-purple-500 to-pink-600",
      description: "Comptes actifs",
      href: "/admin/users",
    },
    {
      label: "Produits",
      value: stats.products,
      icon: Package,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      description: "En catalogue",
      href: "/admin/products",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: Mail,
      color: "bg-gradient-to-br from-teal-500 to-cyan-600",
      description: "Total reçus",
      href: "/admin/messages",
    },
    {
      label: "Non lus",
      value: stats.unreadMessages,
      icon: MailCheck,
      color: "bg-gradient-to-br from-red-500 to-rose-600",
      description: "Messages en attente",
      href: "/admin/messages",
    },
    {
      label: "Ateliers",
      value: stats.workshops || 0,
      icon: Calendar,
      color: "bg-gradient-to-br from-indigo-500 to-blue-600",
      description: "Ateliers en cours",
      href: "/admin/workshops",
    },
    {
      label: "Blogs",
      value: stats.blogs || 0,
      icon: BookOpen,
      color: "bg-gradient-to-br from-pink-500 to-rose-600",
      description: "Articles publiés",
      href: "/admin/blogs",
    },
    {
      label: "Cartes cadeaux",
      value: stats.giftCards || 0,
      icon: Gift,
      color: "bg-gradient-to-br from-yellow-500 to-orange-600",
      description: "Cartes disponibles",
      href: "/admin/gift-cards",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black text-primary mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Vue d'ensemble de votre activité</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              onClick={() => router.push(stat.href)}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl text-white shadow-lg`}>
                  <Icon size={24} />
                </div>
              </div>
              <h3 className="text-3xl font-black text-primary mb-1">{stat.value}</h3>
              <p className="text-sm font-semibold text-primary">{stat.label}</p>
              {stat.description && (
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              )}
            </motion.div>
          )
        })}
      </div>

    </div>
  )
}

