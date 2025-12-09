"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Download, FileText, RefreshCw, Eye } from "lucide-react"
import { fetchAdminOrders, fetchAdminOrder, updateOrderStatus, processRefund, downloadInvoice, exportOrdersCSV, type Order } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

const ORDER_STATUSES = ['pending', 'paid', 'preparing', 'shipped', 'delivered', 'cancelled', 'refunded']
const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded']

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [filters, setFilters] = useState({
    status: '',
    payment_status: '',
    search: ''
  })
  const { toast } = useToast()

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminOrders(filters)
      setOrders(data)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les commandes",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [filters.status, filters.payment_status])

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      toast({
        title: "Succès",
        description: "Statut de la commande mis à jour",
      })
      loadOrders()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le statut",
        variant: "destructive",
      })
    }
  }

  const handleViewOrder = async (orderId: string) => {
    try {
      const order = await fetchAdminOrder(orderId)
      setSelectedOrder(order)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger la commande",
        variant: "destructive",
      })
    }
  }

  const handleDownloadInvoice = async (orderId: string) => {
    try {
      const blob = await downloadInvoice(orderId)
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `facture-${orderId.substring(0, 8)}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      toast({
        title: "Succès",
        description: "Facture téléchargée",
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de télécharger la facture",
        variant: "destructive",
      })
    }
  }

  const handleExportCSV = async () => {
    try {
      await exportOrdersCSV()
      toast({
        title: "Succès",
        description: "Export CSV en cours",
      })
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'exporter",
        variant: "destructive",
      })
    }
  }

  if (loading && orders.length === 0) {
    return <LoadingSpinner message="Chargement des commandes..." />
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-black text-primary mb-2">Commandes</h1>
        <p className="text-muted-foreground">Gérez les commandes en ligne</p>
      </motion.div>

      {/* Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Recherche</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <input
                type="text"
                placeholder="Nom, email, ID..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Statut</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Tous</option>
              {ORDER_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold text-primary mb-2">Paiement</label>
            <select
              value={filters.payment_status}
              onChange={(e) => setFilters({ ...filters, payment_status: e.target.value })}
              className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Tous</option>
              {PAYMENT_STATUSES.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            <button
              onClick={handleExportCSV}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <Download size={18} />
              Export CSV
            </button>
            <button
              onClick={loadOrders}
              className="px-4 py-2 bg-accent text-primary rounded-xl hover:bg-accent/90 transition-colors"
            >
              <RefreshCw size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Orders List */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10 shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary/5">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary">ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary">Client</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary">Total</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary">Statut</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary">Paiement</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-primary">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/10">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-primary/5 transition-colors">
                  <td className="px-6 py-4 text-sm text-primary font-mono">
                    {order.id.substring(0, 8)}
                  </td>
                  <td className="px-6 py-4 text-sm text-primary">
                    {order.guest_name || 'Client'}
                    {order.guest_email && (
                      <div className="text-xs text-muted-foreground">{order.guest_email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-primary">
                    {parseFloat(order.total as any).toFixed(2)}€
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="text-sm px-3 py-1 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      {ORDER_STATUSES.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-primary">
                    {order.payment_status || 'unpaid'}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewOrder(order.id)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Voir détails"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDownloadInvoice(order.id)}
                        className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        title="Télécharger facture"
                      >
                        <FileText size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {orders.length === 0 && (
          <div className="p-12 text-center text-muted-foreground">
            Aucune commande trouvée
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-primary">Commande #{selectedOrder.id.substring(0, 8)}</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-muted-foreground hover:text-primary"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-primary mb-2">Client</h3>
                <p>{selectedOrder.guest_name || 'Client'}</p>
                {selectedOrder.guest_email && <p className="text-sm text-muted-foreground">{selectedOrder.guest_email}</p>}
              </div>
              {selectedOrder.items && (
                <div>
                  <h3 className="font-bold text-primary mb-2">Articles</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.title} x{item.quantity}</span>
                        <span className="font-bold">{(item.price * item.quantity).toFixed(2)}€</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{parseFloat(selectedOrder.total as any).toFixed(2)}€</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}


