"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Gift, Search, Edit, Trash2 } from "lucide-react"
import { fetchAdminGiftCards, createGiftCard, updateGiftCard, deleteGiftCard, type GiftCard } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function GiftCardsPage() {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCard, setEditingCard] = useState<GiftCard | null>(null)
  const [search, setSearch] = useState("")
  const { toast } = useToast()

  const loadGiftCards = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminGiftCards({ search: search || undefined })
      setGiftCards(data)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les cartes cadeaux",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadGiftCards()
  }, [search])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const cardData = {
      amount: parseFloat(formData.get('amount') as string),
      expiry_date: formData.get('expiry_date') as string || undefined,
    }

    try {
      if (editingCard) {
        await updateGiftCard(editingCard.id, cardData)
        toast({ title: "Succès", description: "Carte cadeau mise à jour" })
      } else {
        await createGiftCard(cardData)
        toast({ title: "Succès", description: "Carte cadeau créée" })
      }
      setShowForm(false)
      setEditingCard(null)
      loadGiftCards()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de sauvegarder",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette carte cadeau ?')) return

    try {
      await deleteGiftCard(id)
      toast({ title: "Succès", description: "Carte cadeau supprimée" })
      loadGiftCards()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer",
        variant: "destructive",
      })
    }
  }

  if (loading && giftCards.length === 0) {
    return <LoadingSpinner message="Chargement des cartes cadeaux..." />
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-black text-primary mb-2">Cartes cadeaux</h1>
          <p className="text-muted-foreground">Gérez les cartes cadeaux</p>
        </div>
        <button
          onClick={() => {
            setEditingCard(null)
            setShowForm(true)
          }}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Nouvelle carte
        </button>
      </motion.div>

      {/* Search */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            placeholder="Rechercher par code..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Gift Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {giftCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Gift size={24} className="text-primary" />
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                card.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
              }`}>
                {card.status}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">Code</p>
              <p className="text-xl font-bold text-primary font-mono">{card.code}</p>
            </div>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Montant</span>
                <span className="font-bold text-primary">{card.amount.toFixed(2)}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Solde</span>
                <span className="font-bold text-primary">{card.balance.toFixed(2)}€</span>
              </div>
              {card.expiry_date && (
                <div className="text-xs text-muted-foreground">
                  Expire le: {new Date(card.expiry_date).toLocaleDateString('fr-FR')}
                </div>
              )}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingCard(card)
                  setShowForm(true)
                }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Modifier
              </button>
              <button
                onClick={() => handleDelete(card.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {giftCards.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucune carte cadeau trouvée
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-md w-full"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              {editingCard ? 'Modifier la carte' : 'Nouvelle carte cadeau'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Montant (€) *</label>
                <input
                  type="number"
                  step="0.01"
                  name="amount"
                  required
                  defaultValue={editingCard?.amount}
                  className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Date d'expiration</label>
                <input
                  type="date"
                  name="expiry_date"
                  defaultValue={editingCard?.expiry_date ? editingCard.expiry_date.split('T')[0] : ''}
                  className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {editingCard && (
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Solde (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    name="balance"
                    defaultValue={editingCard.balance}
                    className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              )}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  {editingCard ? 'Mettre à jour' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingCard(null)
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}






