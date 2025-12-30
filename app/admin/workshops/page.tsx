"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Calendar, Users, Edit, Trash2, Eye, Upload, X, AlertTriangle, RefreshCw, Ban, DollarSign } from "lucide-react"
import { fetchAdminWorkshops, createWorkshop, updateWorkshop, deleteWorkshop, type Workshop, fetchWorkshopReservations, type WorkshopReservation, cancelBooking, refundBooking } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import LoadingSpinner from "@/components/admin/LoadingSpinner"
import { uploadImageToCloudinary } from "@/lib/cloudinary-upload"
import WorkshopDatePicker from "@/components/admin/WorkshopDatePicker"

// Permanent statuses that cannot be changed
const PERMANENT_STATUSES = ['cancelled', 'refunded']

// Status configuration
const STATUS_CONFIG: Record<string, { label: string; color: string; bgColor: string; confirmWord?: string }> = {
  confirmed: { label: 'Confirmé', color: '#10b981', bgColor: '#d1fae5' },
  pending: { label: 'En attente', color: '#f59e0b', bgColor: '#fef3c7' },
  waitlist: { label: "Liste d'attente", color: '#3b82f6', bgColor: '#dbeafe' },
  cancelled: { label: 'Annulé', color: '#ef4444', bgColor: '#fee2e2', confirmWord: 'ANNULER' },
  refunded: { label: 'Remboursé', color: '#6b7280', bgColor: '#f3f4f6', confirmWord: 'REMBOURSER' },
}

interface ReservationAction {
  isOpen: boolean
  reservationId: string
  workshopId: string
  action: 'cancel' | 'refund'
  typedConfirmation: string
  reservation?: WorkshopReservation
}

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingWorkshop, setEditingWorkshop] = useState<Workshop | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadingImage, setUploadingImage] = useState(false)
  const [selectedWorkshopForDates, setSelectedWorkshopForDates] = useState<string | null>(null)
  const [workshopSessions, setWorkshopSessions] = useState<Record<string, any[]>>({})
  const [selectedWorkshopForReservations, setSelectedWorkshopForReservations] = useState<string | null>(null)
  const [workshopReservations, setWorkshopReservations] = useState<Record<string, WorkshopReservation[]>>({})
  const [loadingReservations, setLoadingReservations] = useState<Record<string, boolean>>({})
  const [processingAction, setProcessingAction] = useState(false)
  const [actionModal, setActionModal] = useState<ReservationAction>({
    isOpen: false,
    reservationId: '',
    workshopId: '',
    action: 'cancel',
    typedConfirmation: ''
  })
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

  const loadWorkshopReservations = async (workshopId: string, forceReload = false) => {
    if (workshopReservations[workshopId] && !forceReload) {
      // Already loaded, just toggle
      setSelectedWorkshopForReservations(
        selectedWorkshopForReservations === workshopId ? null : workshopId
      )
      return
    }

    try {
      setLoadingReservations(prev => ({ ...prev, [workshopId]: true }))
      const data = await fetchWorkshopReservations(workshopId)
      setWorkshopReservations(prev => ({ ...prev, [workshopId]: data }))
      setSelectedWorkshopForReservations(workshopId)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les réservations",
        variant: "destructive",
      })
    } finally {
      setLoadingReservations(prev => ({ ...prev, [workshopId]: false }))
    }
  }

  const openActionModal = (reservation: WorkshopReservation, workshopId: string, action: 'cancel' | 'refund') => {
    setActionModal({
      isOpen: true,
      reservationId: reservation.id,
      workshopId,
      action,
      typedConfirmation: '',
      reservation
    })
  }

  const closeActionModal = () => {
    setActionModal({
      isOpen: false,
      reservationId: '',
      workshopId: '',
      action: 'cancel',
      typedConfirmation: ''
    })
  }

  const handleConfirmAction = async () => {
    const { reservationId, workshopId, action, typedConfirmation } = actionModal
    const expectedWord = action === 'refund' ? 'REMBOURSER' : 'ANNULER'

    if (typedConfirmation.toUpperCase() !== expectedWord) {
      toast({
        title: "Confirmation incorrecte",
        description: `Veuillez taper "${expectedWord}" pour confirmer`,
        variant: "destructive",
      })
      return
    }

    try {
      setProcessingAction(true)
      
      if (action === 'refund') {
        await refundBooking(reservationId, 'Demande client', true)
        toast({
          title: "Remboursement effectué",
          description: "La réservation a été remboursée avec succès",
        })
      } else {
        await cancelBooking(reservationId, 'Demande client', true)
        toast({
          title: "Réservation annulée",
          description: "La réservation a été annulée",
        })
      }

      closeActionModal()
      // Reload reservations
      await loadWorkshopReservations(workshopId, true)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'effectuer l'action",
        variant: "destructive",
      })
    } finally {
      setProcessingAction(false)
    }
  }

  const loadWorkshopSessions = async (workshopId: string) => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'}/api/admin/workshops/${workshopId}/sessions`,
        {
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        }
      )
      if (response.ok) {
        const data = await response.json()
        setWorkshopSessions(prev => ({
          ...prev,
          [workshopId]: data.success ? data.data : []
        }))
      }
    } catch (error) {
      console.error('Error loading sessions:', error)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview(null)
    // Reset file input
    const fileInput = document.getElementById('image-upload') as HTMLInputElement
    if (fileInput) fileInput.value = ''
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    let imageUrl = formData.get('image') as string || editingWorkshop?.image || ''

    // Upload image to Cloudinary if a new file is selected
    if (imageFile) {
      try {
        setUploadingImage(true)
        imageUrl = await uploadImageToCloudinary(imageFile)
        toast({
          title: "Succès",
          description: "Image uploadée sur Cloudinary",
        })
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message || "Impossible d'uploader l'image",
          variant: "destructive",
        })
        setUploadingImage(false)
        return
      } finally {
        setUploadingImage(false)
      }
    }

    const workshopData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      level: formData.get('level') as string,
      duration: Math.round(parseFloat(formData.get('duration') as string) * 60), // Convert hours to minutes
      price: parseFloat(formData.get('price') as string),
      image: imageUrl,
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
      setImageFile(null)
      setImagePreview(null)
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
            setImageFile(null)
            setImagePreview(null)
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
                  setImageFile(null)
                  setImagePreview(workshop.image || null)
                  setShowForm(true)
                }}
                className="flex-1 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
              >
                <Edit size={16} />
                Modifier
              </button>
              <button
                onClick={() => loadWorkshopReservations(workshop.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                title="Voir les réservations"
              >
                <Users size={16} />
              </button>
              <button
                onClick={() => {
                  setSelectedWorkshopForDates(workshop.id)
                  loadWorkshopSessions(workshop.id)
                }}
                className="px-4 py-2 bg-accent text-primary rounded-lg hover:bg-accent/90 transition-colors"
                title="Gérer les dates"
              >
                <Calendar size={16} />
              </button>
              <button
                onClick={() => handleDelete(workshop.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
            
            {selectedWorkshopForReservations === workshop.id && (
              <div className="mt-4 pt-4 border-t border-primary/10">
                {loadingReservations[workshop.id] ? (
                  <div className="text-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                    <p className="text-sm text-muted-foreground mt-2">Chargement des réservations...</p>
                  </div>
                ) : workshopReservations[workshop.id]?.length > 0 ? (
                  <div className="space-y-3">
                    <h4 className="font-bold text-primary mb-3">Réservations ({workshopReservations[workshop.id].length})</h4>
                    <div className="max-h-96 overflow-y-auto space-y-2">
                      {workshopReservations[workshop.id].map((reservation) => {
                        const isPermanent = PERMANENT_STATUSES.includes(reservation.status)
                        const statusConfig = STATUS_CONFIG[reservation.status] || STATUS_CONFIG.pending
                        
                        return (
                          <div
                            key={reservation.id}
                            className="bg-white/50 rounded-lg p-3 border border-primary/10"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="font-semibold text-primary">
                                  {reservation.user_name || reservation.guest_name || 'Inconnu'}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {reservation.user_email || reservation.guest_email || ''}
                                  {reservation.guest_phone && ` • ${reservation.guest_phone}`}
                                </div>
                              </div>
                              <span
                                className="px-2 py-1 rounded text-xs font-semibold flex items-center gap-1"
                                style={{
                                  backgroundColor: statusConfig.bgColor,
                                  color: statusConfig.color
                                }}
                              >
                                {statusConfig.label}
                                {reservation.status === 'waitlist' && reservation.waitlist_position && ` #${reservation.waitlist_position}`}
                                {isPermanent && <span className="text-[10px]">🔒</span>}
                              </span>
                            </div>
                            <div className="text-sm text-primary space-y-1">
                              {reservation.session_date && (
                                <div>
                                  📅 {new Date(reservation.session_date).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                  })}
                                  {reservation.session_time && ` à ${reservation.session_time}`}
                                </div>
                              )}
                              <div>
                                👥 {reservation.quantity} place{reservation.quantity > 1 ? 's' : ''}
                                {reservation.session_capacity && reservation.booked_count !== undefined && (
                                  <span className="text-muted-foreground ml-2">
                                    ({reservation.booked_count}/{reservation.session_capacity})
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Réservé le {new Date(reservation.created_at).toLocaleDateString('fr-FR')}
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            {!isPermanent && (
                              <div className="mt-3 pt-3 border-t border-primary/10 flex gap-2">
                                <button
                                  onClick={() => openActionModal(reservation, workshop.id, 'cancel')}
                                  className="flex-1 px-3 py-1.5 text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors flex items-center justify-center gap-1"
                                >
                                  <Ban size={12} />
                                  Annuler
                                </button>
                                <button
                                  onClick={() => openActionModal(reservation, workshop.id, 'refund')}
                                  className="flex-1 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                                >
                                  <DollarSign size={12} />
                                  Rembourser
                                </button>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4 text-muted-foreground">
                    Aucune réservation pour cet atelier
                  </div>
                )}
              </div>
            )}
            {selectedWorkshopForDates === workshop.id && (
              <div className="mt-4 pt-4 border-t border-primary/10">
                <WorkshopDatePicker
                  workshopId={workshop.id}
                  existingSessions={workshopSessions[workshop.id] || []}
                  onSessionsUpdate={() => loadWorkshopSessions(workshop.id)}
                />
              </div>
            )}
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
                    <option value="intermédiaire">Intermédiaire</option>
                    <option value="avancé">Avancé</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-primary mb-2">Durée (heures)</label>
                  <input
                    type="number"
                    name="duration"
                    required
                    step="0.5"
                    min="0.5"
                    defaultValue={editingWorkshop?.duration ? (editingWorkshop.duration / 60).toFixed(1) : 2}
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
                <label className="block text-sm font-bold text-primary mb-2">Image</label>
                
                {/* Image Preview */}
                {(imagePreview || editingWorkshop?.image) && (
                  <div className="relative mb-4">
                    <img
                      src={imagePreview || editingWorkshop?.image || ''}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl border border-primary/20"
                    />
                    {imageFile && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                )}

                {/* File Upload */}
                <div className="space-y-2">
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-primary/30 rounded-xl hover:border-primary/50 transition-colors cursor-pointer bg-primary/5"
                  >
                    <Upload size={20} className="text-primary" />
                    <span className="text-sm font-medium text-primary">
                      {imageFile ? imageFile.name : 'Choisir une image'}
                    </span>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  
                  {/* Fallback URL input (optional) */}
                  <div className="text-xs text-muted-foreground text-center">
                    ou
                  </div>
                  <input
                    type="url"
                    name="image"
                    placeholder="URL de l'image (optionnel si vous uploadez un fichier)"
                    defaultValue={editingWorkshop?.image && !imageFile ? editingWorkshop.image : ''}
                    className="w-full px-4 py-2 border border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm"
                  />
                </div>
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
                  disabled={uploadingImage}
                  className="flex-1 px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {uploadingImage ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Upload en cours...
                    </>
                  ) : (
                    editingWorkshop ? 'Mettre à jour' : 'Créer'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setEditingWorkshop(null)
                    setImageFile(null)
                    setImagePreview(null)
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

      {/* Reservation Action Confirmation Modal */}
      <AnimatePresence>
        {actionModal.isOpen && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[20000] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      actionModal.action === 'refund' ? 'bg-red-100' : 'bg-amber-100'
                    }`}
                  >
                    <AlertTriangle 
                      size={24} 
                      className={actionModal.action === 'refund' ? 'text-red-600' : 'text-amber-600'}
                    />
                  </div>
                  <h2 className="text-xl font-bold text-primary">
                    {actionModal.action === 'refund' ? 'Rembourser la réservation' : 'Annuler la réservation'}
                  </h2>
                </div>
                <button
                  onClick={closeActionModal}
                  className="text-muted-foreground hover:text-primary p-1"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-muted-foreground mb-4">
                  {actionModal.action === 'refund' ? (
                    <>
                      Vous êtes sur le point de <strong className="text-red-500">rembourser</strong> la réservation de 
                      <strong> {actionModal.reservation?.user_name || actionModal.reservation?.guest_name || 'ce client'}</strong>.
                      <br /><br />
                      Le montant sera remboursé au client (Square et/ou carte cadeau).
                      <br />
                      Cette action est <strong className="text-red-500">irréversible</strong>.
                    </>
                  ) : (
                    <>
                      Vous êtes sur le point d'<strong className="text-amber-600">annuler</strong> la réservation de 
                      <strong> {actionModal.reservation?.user_name || actionModal.reservation?.guest_name || 'ce client'}</strong>.
                      <br /><br />
                      Le montant sera <strong className="text-amber-600">automatiquement remboursé</strong> au client (Square et/ou carte cadeau).
                      <br />
                      Cette action est <strong className="text-amber-600">irréversible</strong>.
                    </>
                  )}
                </p>
                <div className={`border rounded-xl p-4 mb-4 ${
                  actionModal.action === 'refund' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                }`}>
                  <p className={`text-sm font-medium ${
                    actionModal.action === 'refund' ? 'text-red-800' : 'text-amber-800'
                  }`}>
                    Pour confirmer, tapez <strong className={`font-mono px-2 py-0.5 rounded ${
                      actionModal.action === 'refund' ? 'bg-red-100' : 'bg-amber-100'
                    }`}>
                      {actionModal.action === 'refund' ? 'REMBOURSER' : 'ANNULER'}
                    </strong> ci-dessous :
                  </p>
                </div>
                <input
                  type="text"
                  value={actionModal.typedConfirmation}
                  onChange={(e) => setActionModal({
                    ...actionModal,
                    typedConfirmation: e.target.value
                  })}
                  placeholder={actionModal.action === 'refund' ? 'Tapez REMBOURSER' : 'Tapez ANNULER'}
                  className="w-full px-4 py-3 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-primary/50 text-center font-mono text-lg uppercase"
                  autoFocus
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={closeActionModal}
                  className="flex-1 px-4 py-3 border border-primary/20 text-primary rounded-xl hover:bg-primary/5 transition-colors font-medium"
                >
                  Retour
                </button>
                <button
                  onClick={handleConfirmAction}
                  disabled={
                    processingAction || 
                    actionModal.typedConfirmation.toUpperCase() !== (actionModal.action === 'refund' ? 'REMBOURSER' : 'ANNULER')
                  }
                  className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all ${
                    actionModal.action === 'refund'
                      ? 'bg-red-500 text-white hover:bg-red-600 disabled:bg-red-200'
                      : 'bg-amber-500 text-white hover:bg-amber-600 disabled:bg-amber-200'
                  } disabled:cursor-not-allowed`}
                >
                  {processingAction ? (
                    <span className="flex items-center justify-center gap-2">
                      <RefreshCw size={16} className="animate-spin" />
                      Traitement...
                    </span>
                  ) : (
                    'Confirmer'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}




