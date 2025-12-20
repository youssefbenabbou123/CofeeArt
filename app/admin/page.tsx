"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Users, Package, Mail, MailCheck, TrendingUp, TrendingDown, Euro, ShoppingCart, DollarSign } from "lucide-react"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { fetchStats, type Stats } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

// Dynamic colors for charts - more vibrant and professional
const CHART_COLORS = {
  primary: '#3b82f6',      // Blue
  secondary: '#10b981',     // Green
  accent: '#f59e0b',        // Amber
  danger: '#ef4444',        // Red
  purple: '#8b5cf6',        // Purple
  teal: '#14b8a6',          // Teal
  pink: '#ec4899',          // Pink
  indigo: '#6366f1',        // Indigo
}

const PIE_COLORS = [CHART_COLORS.primary, CHART_COLORS.secondary, CHART_COLORS.accent, CHART_COLORS.purple, CHART_COLORS.teal]

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

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg"
        >
          <h3 className="text-xl font-bold text-primary mb-2">Ventes mensuelles</h3>
          <p className="text-sm text-muted-foreground mb-6">Chiffre d'affaires des 6 derniers mois</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                tickFormatter={(value) => `${value}€`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value.toFixed(2)}€`, 'Ventes']}
                labelFormatter={(label) => `Mois : ${label}`}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke={CHART_COLORS.primary}
                strokeWidth={3}
                dot={{ fill: CHART_COLORS.primary, r: 5 }}
                activeDot={{ r: 8, fill: CHART_COLORS.primary }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg"
        >
          <h3 className="text-xl font-bold text-primary mb-2">Répartition par catégorie</h3>
          <p className="text-sm text-muted-foreground mb-6">Quantité vendue par catégorie</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value} unités`, 'Quantité']}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* User Registrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg"
        >
          <h3 className="text-xl font-bold text-primary mb-2">Inscriptions mensuelles</h3>
          <p className="text-sm text-muted-foreground mb-6">Nouveaux utilisateurs des 6 derniers mois</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.registrationsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="month" 
                stroke="#6b7280"
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                label={{ value: 'Nombre d\'utilisateurs', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value} utilisateurs`, 'Inscriptions']}
                labelFormatter={(label) => `Mois : ${label}`}
              />
              <Bar dataKey="users" fill={CHART_COLORS.secondary} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Messages by Subject */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg"
        >
          <h3 className="text-xl font-bold text-primary mb-2">Messages par sujet</h3>
          <p className="text-sm text-muted-foreground mb-6">Répartition des messages reçus</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { subject: "Général", count: 45 },
                { subject: "Privatisation", count: 23 },
                { subject: "Ateliers", count: 67 },
                { subject: "Partenariats", count: 12 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis 
                dataKey="subject" 
                stroke="#6b7280"
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                stroke="#6b7280"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                label={{ value: 'Nombre de messages', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.98)",
                  border: "1px solid #e5e7eb",
                  borderRadius: "12px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
                formatter={(value: number) => [`${value} messages`, 'Total']}
                labelFormatter={(label) => `Sujet : ${label}`}
              />
              <Bar dataKey="count" fill={CHART_COLORS.purple} radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}

