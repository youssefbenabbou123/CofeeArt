"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, UserCircle, ShoppingCart, Calendar } from "lucide-react"
import { fetchAdminClients, fetchAdminClient, type Client } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [search, setSearch] = useState("")
  const { toast } = useToast()

  const loadClients = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminClients({ search: search || undefined })
      setClients(data)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les clients",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadClients()
  }, [search])

  const handleViewClient = async (id: string) => {
    try {
      const client = await fetchAdminClient(id)
      setSelectedClient(client)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger le client",
        variant: "destructive",
      })
    }
  }

  if (loading && clients.length === 0) {
    return <LoadingSpinner message="Chargement des clients..." />
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black text-primary mb-2">Clients</h1>
        <p className="text-muted-foreground">Gérez vos clients</p>
      </motion.div>

      {/* Search */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Rechercher par nom, email, téléphone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Clients List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            onClick={() => handleViewClient(client.id)}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <UserCircle size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-primary">{client.name}</h3>
                {client.email && (
                  <p className="text-sm text-muted-foreground">{client.email}</p>
                )}
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Commandes</span>
                <span className="font-bold text-primary">{client.total_orders}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total dépensé</span>
                <span className="font-bold text-primary">{client.total_spent.toFixed(2)}€</span>
              </div>
              {client.last_order_date && (
                <div className="text-xs text-muted-foreground">
                  Dernière commande: {new Date(client.last_order_date).toLocaleDateString('fr-FR')}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {clients.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucun client trouvé
        </div>
      )}

      {/* Client Detail Modal */}
      {selectedClient && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">{selectedClient.name}</h2>
              <button
                onClick={() => setSelectedClient(null)}
                className="text-muted-foreground hover:text-primary"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-primary mb-2">Informations</h3>
                <div className="space-y-2 text-sm">
                  {selectedClient.email && <p><strong>Email:</strong> {selectedClient.email}</p>}
                  {selectedClient.phone && <p><strong>Téléphone:</strong> {selectedClient.phone}</p>}
                  {selectedClient.address && <p><strong>Adresse:</strong> {selectedClient.address}</p>}
                  <p><strong>Total commandes:</strong> {selectedClient.total_orders}</p>
                  <p><strong>Total dépensé:</strong> {selectedClient.total_spent.toFixed(2)}€</p>
                </div>
              </div>
              {selectedClient.orders && selectedClient.orders.length > 0 && (
                <div>
                  <h3 className="font-bold text-primary mb-2 flex items-center gap-2">
                    <ShoppingCart size={18} />
                    Commandes ({selectedClient.orders.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedClient.orders.map((order) => (
                      <div key={order.id} className="p-3 bg-primary/5 rounded-lg">
                        <div className="flex justify-between">
                          <span className="font-mono text-xs">{order.id.substring(0, 8)}</span>
                          <span className="font-bold">{parseFloat(order.total as any).toFixed(2)}€</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(order.created_at).toLocaleDateString('fr-FR')} - {order.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}






