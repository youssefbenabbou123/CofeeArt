"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Users, Package, Mail, MailCheck, TrendingUp, TrendingDown } from "lucide-react"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { fetchStats, type Stats } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

const COLORS = ['#8B7355', '#E8D6C1', '#ACB792', '#D4C5B0', '#C9A96B']

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

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
      label: "Utilisateurs",
      value: stats.users,
      icon: Users,
      color: "bg-primary",
      change: "+12%",
    },
    {
      label: "Produits",
      value: stats.products,
      icon: Package,
      color: "bg-accent",
      change: "+5%",
    },
    {
      label: "Messages",
      value: stats.messages,
      icon: Mail,
      color: "bg-[#ACB792]",
      change: "+8%",
    },
    {
      label: "Non lus",
      value: stats.unreadMessages,
      icon: MailCheck,
      color: "bg-[#D4C5B0]",
      change: "-3%",
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-xl text-white`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-bold ${
                  stat.change.startsWith('-') ? 'text-red-600' : 'text-green-600'
                }`}>
                  {stat.change.startsWith('-') ? (
                    <TrendingDown size={16} />
                  ) : (
                    <TrendingUp size={16} />
                  )}
                  {stat.change}
                </div>
              </div>
              <h3 className="text-3xl font-black text-primary mb-1">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
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
          <h3 className="text-xl font-bold text-primary mb-6">Ventes mensuelles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8D6C1" />
              <XAxis dataKey="month" stroke="#8B7355" />
              <YAxis stroke="#8B7355" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #E8D6C1",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#8B7355"
                strokeWidth={3}
                dot={{ fill: "#8B7355", r: 5 }}
                activeDot={{ r: 8 }}
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
          <h3 className="text-xl font-bold text-primary mb-6">Répartition par catégorie</h3>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #E8D6C1",
                  borderRadius: "12px",
                }}
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
          <h3 className="text-xl font-bold text-primary mb-6">Inscriptions mensuelles</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.registrationsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8D6C1" />
              <XAxis dataKey="month" stroke="#8B7355" />
              <YAxis stroke="#8B7355" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #E8D6C1",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="users" fill="#8B7355" radius={[8, 8, 0, 0]} />
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
          <h3 className="text-xl font-bold text-primary mb-6">Messages par sujet</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { subject: "Général", count: 45 },
                { subject: "Privatisation", count: 23 },
                { subject: "Ateliers", count: 67 },
                { subject: "Partenariats", count: 12 },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E8D6C1" />
              <XAxis dataKey="subject" stroke="#8B7355" />
              <YAxis stroke="#8B7355" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid #E8D6C1",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="count" fill="#E8D6C1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  )
}

