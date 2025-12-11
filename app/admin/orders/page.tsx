"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { createPortal } from "react-dom"
import { Search, Filter, Download, FileText, RefreshCw, Eye, ChevronDown } from "lucide-react"
import { fetchAdminOrders, fetchAdminOrder, updateOrderStatus, processRefund, downloadInvoice, exportOrdersCSV, type Order } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

// Valid order statuses matching backend
const ORDER_STATUSES = ['confirmed', 'preparing', 'shipped', 'delivered', 'cancelled', 'refunded'] as const

// Status configuration with colors and French labels
const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string }> = {
  pending: { label: 'En attente', color: '#f59e0b', bgColor: '#fef3c7' }, // amber
  confirmed: { label: 'Confirmée', color: '#3b82f6', bgColor: '#dbeafe' }, // blue
  preparing: { label: 'En préparation', color: '#8b5cf6', bgColor: '#ede9fe' }, // purple
  shipped: { label: 'Expédiée', color: '#06b6d4', bgColor: '#cffafe' }, // cyan
  delivered: { label: 'Livrée', color: '#10b981', bgColor: '#d1fae5' }, // green
  cancelled: { label: 'Annulée', color: '#ef4444', bgColor: '#fee2e2' }, // red
  refunded: { label: 'Remboursée', color: '#6b7280', bgColor: '#f3f4f6' }, // gray
}

const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded']

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [openStatusDropdown, setOpenStatusDropdown] = useState<string | null>(null)
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number } | null>(null)
  const statusButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({})
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
      setOpenStatusDropdown(null)
      setDropdownPosition(null)
      loadOrders()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le statut",
        variant: "destructive",
      })
    }
  }

  const handleOpenDropdown = (orderId: string, button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect()
    setDropdownPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX
    })
    setOpenStatusDropdown(orderId)
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
              {ORDER_STATUSES.map(status => {
                const config = STATUS_CONFIG[status]
                return (
                  <option 
                    key={status} 
                    value={status}
                    style={{
                      color: config.color,
                    }}
                  >
                    {config.label}
                  </option>
                )
              })}
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
        <div className="overflow-x-auto" style={{ overflowY: 'visible' }}>
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
                    <button
                      ref={(el) => (statusButtonRefs.current[order.id] = el)}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation()
                        if (openStatusDropdown === order.id) {
                          setOpenStatusDropdown(null)
                          setDropdownPosition(null)
                        } else if (e.currentTarget) {
                          handleOpenDropdown(order.id, e.currentTarget)
                        }
                      }}
                      className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-full font-medium transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        color: STATUS_CONFIG[order.status]?.color || '#1a1a2e',
                        backgroundColor: STATUS_CONFIG[order.status]?.bgColor || '#f3f4f6',
                        border: `1px solid ${STATUS_CONFIG[order.status]?.color || '#1a1a2e'}40`,
                      }}
                    >
                      <span>{STATUS_CONFIG[order.status]?.label || order.status}</span>
                      <ChevronDown 
                        size={14} 
                        className={`transition-transform ${openStatusDropdown === order.id ? 'rotate-180' : ''}`}
                      />
                    </button>
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

      {/* Status Dropdown Portal */}
      {openStatusDropdown && dropdownPosition && typeof window !== 'undefined' && createPortal(
        <>
          <div 
            className="fixed inset-0 z-[9999]" 
            onClick={() => {
              setOpenStatusDropdown(null)
              setDropdownPosition(null)
            }}
          />
          <div 
            className="fixed z-[10000] bg-white rounded-lg shadow-xl border border-primary/20 py-1 w-[180px] max-h-[300px] overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)',
            }}
          >
            {ORDER_STATUSES.map(status => {
              const config = STATUS_CONFIG[status]
              const order = orders.find(o => o.id === openStatusDropdown)
              const isSelected = status === order?.status
              return (
                <button
                  key={status}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (openStatusDropdown && status !== order?.status) {
                      handleStatusChange(openStatusDropdown, status)
                    }
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                  style={{
                    color: config.color,
                    backgroundColor: isSelected ? config.bgColor : 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = config.bgColor + '80'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  <span>{config.label}</span>
                  {isSelected && (
                    <span className="ml-auto text-xs font-bold">✓</span>
                  )}
                </button>
              )
            })}
          </div>
        </>,
        document.body
      )}

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




