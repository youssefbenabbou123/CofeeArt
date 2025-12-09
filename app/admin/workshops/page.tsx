"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Plus, Calendar, Users, Edit, Trash2, Eye } from "lucide-react"
import { fetchAdminWorkshops, createWorkshop, updateWorkshop, deleteWorkshop, type Workshop } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null)
  const { toast } = useToast()

  const loadWorkshops = async () => {
    try {
      setLoading(true)
      const data = await fetchAdminWorkshops()
      setWorkshops(data)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les ateliers",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadWorkshops()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const workshopData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      level: formData.get('level') as string,
      duration: parseInt(formData.get('duration') as string),
      price: parseFloat(formData.get('price') as string),
      image: formData.get('image') as string,
      status: formData.get('status') as string,
      capacity: parseInt(formData.get('capacity') as string),
    }

    try {
      if (editingWorkshop) {
        await updateWorkshop(editingWorkshop.id, workshopData)
        toast({ title: "Succès", description: "Atelier mis à jour" })
      } else {
        await createWorkshop(workshopData)
        toast({ title: "Succès", description: "Atelier créé" })
      }
      setShowForm(false)
      setEditingWorkshop(null)
      loadWorkshops()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de sauvegarder",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet atelier ?')) return

    try {
      await deleteWorkshop(id)
      toast({ title: "Succès", description: "Atelier supprimé" })
      loadWorkshops()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer",
        variant: "destructive",
      })
    }
  }

  if (loading && workshops.length === 0) {
    return <LoadingSpinner message="Chargement des ateliers..." />
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-black text-primary mb-2">Ateliers</h1>
          <p className="text-muted-foreground">Gérez les ateliers céramique</p>
        </div>
        <button
          onClick={() => {
            setEditingWorkshop(null)
            setShowForm(true)
          }}
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Nouvel atelier
        </button>
      </motion.div>

      {/* Workshops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <motion.div
            key={workshop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-primary/10 shadow-lg"
          >
            {workshop.image && (
              <img src={workshop.image} alt={workshop.title} className="w-full h-48 object-cover rounded-xl mb-4" />
            )}
            <h3 className="text-xl font-bold text-primary mb-2">{workshop.title}</h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{workshop.description}</p>
            <div className="flex items-center justify-between text-sm text-primary mb-4">
              <span>Niveau: {workshop.level}</span>
              <span className="font-bold">{workshop.price.toFixed(2)}€</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditingWorkshop(workshop)
                  setShowForm(true)
                }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Modifier
              </button>
              <button
                onClick={() => handleDelete(workshop.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {workshops.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          Aucun atelier trouvé
        </div>
      )}

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-primary mb-6">
              {editingWorkshop ? 'Modifier l\'atelier' : 'Nouvel atelier'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Titre *</label>
                <input
                  type="text"
                  name="title"
                  required
                  defaultValue={editingWorkshop?.title}
                  className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Description</label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={editingWorkshop?.description}
                  className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Niveau</label>
                  <select
                    name="level"
                    defaultValue={editingWorkshop?.level || 'débutant'}
                    className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="débutant">Débutant</option>
                    <option value="avancé">Avancé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Durée (min)</label>
                  <input
                    type="number"
                    name="duration"
                    required
                    defaultValue={editingWorkshop?.duration || 120}
                    className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Prix (€) *</label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    required
                    defaultValue={editingWorkshop?.price}
                    className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Capacité</label>
                  <input
                    type="number"
                    name="capacity"
                    defaultValue={editingWorkshop?.capacity || 10}
                    className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  defaultValue={editingWorkshop?.image}
                  className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-primary mb-2">Statut</label>
                <select
                  name="status"
                  defaultValue={editingWorkshop?.status || 'active'}
                  className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="active">Actif</option>
                  <option value="inactive">Inactif</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
                >
                  {editingWorkshop ? 'Mettre à jour' : 'Créer'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingWorkshop(null)
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


