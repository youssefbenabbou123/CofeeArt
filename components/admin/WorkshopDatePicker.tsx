"use client"

import { useState } from "react"
import { Calendar, X, Clock } from "lucide-react"
import { motion } from "framer-motion"

interface WorkshopDatePickerProps {
  workshopId: string
  existingSessions?: Array<{ id: string; session_date: string; session_time: string; capacity: number }>
  onSessionsUpdate?: () => void
}

export default function WorkshopDatePicker({ workshopId, existingSessions = [], onSessionsUpdate }: WorkshopDatePickerProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [selectedTime, setSelectedTime] = useState("10:00")
  const [capacity, setCapacity] = useState(4)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [creating, setCreating] = useState(false)

  const timeSlots = [
    "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()
    
    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const isDateSelected = (date: Date) => {
    return selectedDates.some(
      selected => 
        selected.getDate() === date.getDate() &&
        selected.getMonth() === date.getMonth() &&
        selected.getFullYear() === date.getFullYear()
    )
  }

  const isDatePast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const toggleDate = (date: Date) => {
    if (isDatePast(date)) return
    
    setSelectedDates(prev => {
      const isSelected = isDateSelected(date)
      if (isSelected) {
        return prev.filter(
          d => !(d.getDate() === date.getDate() && 
                 d.getMonth() === date.getMonth() && 
                 d.getFullYear() === date.getFullYear())
        )
      } else {
        return [...prev, new Date(date)]
      }
    })
  }

  const createSessions = async () => {
    if (selectedDates.length === 0) return

    setCreating(true)
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      
      for (const date of selectedDates) {
        const dateStr = date.toISOString().split('T')[0]
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'}/api/admin/workshops/${workshopId}/sessions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...(token && { 'Authorization': `Bearer ${token}` })
            },
            body: JSON.stringify({
              session_date: dateStr,
              session_time: selectedTime,
              capacity: capacity
            })
          }
        )

        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Erreur lors de la création de la session')
        }
      }

      setSelectedDates([])
      setShowCalendar(false)
      if (onSessionsUpdate) {
        onSessionsUpdate()
      }
    } catch (error: any) {
      alert(error.message || 'Erreur lors de la création des sessions')
    } finally {
      setCreating(false)
    }
  }

  const deleteSession = async (sessionId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette session ?")) return

    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
      
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'}/api/admin/workshops/${workshopId}/sessions/${sessionId}`,
        {
          method: 'DELETE',
          headers: {
            ...(token && { 'Authorization': `Bearer ${token}` })
          }
        }
      )

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la session')
      }

      if (onSessionsUpdate) {
        onSessionsUpdate()
      }
    } catch (error: any) {
      alert(error.message || 'Erreur lors de la suppression')
    }
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"]
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-primary">Dates disponibles</h3>
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
          <Calendar size={18} />
          {showCalendar ? 'Masquer le calendrier' : 'Ajouter des dates'}
        </button>
      </div>

      {showCalendar && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-xl rounded-xl p-6 border border-primary/10"
        >
          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="px-3 py-1 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                ←
              </button>
              <h4 className="text-lg font-bold text-primary">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h4>
              <button
                onClick={nextMonth}
                className="px-3 py-1 text-primary hover:bg-primary/10 rounded-lg transition-colors"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-xs font-bold text-primary/70 py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => {
                if (!date) {
                  return <div key={index} className="aspect-square" />
                }
                
                const isSelected = isDateSelected(date)
                const isPast = isDatePast(date)
                const hasSession = existingSessions.some(
                  s => new Date(s.session_date).toDateString() === date.toDateString()
                )

                return (
                  <button
                    key={index}
                    onClick={() => toggleDate(date)}
                    disabled={isPast}
                    className={`
                      aspect-square rounded-lg transition-all text-sm font-medium
                      ${isPast 
                        ? 'text-gray-300 cursor-not-allowed' 
                        : isSelected
                        ? 'bg-primary text-white'
                        : hasSession
                        ? 'bg-accent/30 text-primary border-2 border-accent'
                        : 'bg-white text-primary hover:bg-primary/10 border border-primary/20'
                      }
                    `}
                  >
                    {date.getDate()}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                <Clock size={16} className="inline mr-1" />
                Heure
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {timeSlots.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-primary mb-2">
                Capacité
              </label>
              <input
                type="number"
                min="1"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value) || 4)}
                className="w-full px-3 py-2 border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          {selectedDates.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-primary/70 mb-2">
                {selectedDates.length} date{selectedDates.length > 1 ? 's' : ''} sélectionnée{selectedDates.length > 1 ? 's' : ''}:
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedDates.map((date, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm flex items-center gap-2"
                  >
                    {date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}
                    <button
                      onClick={() => toggleDate(date)}
                      className="hover:text-primary/70"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={createSessions}
            disabled={selectedDates.length === 0 || creating}
            className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {creating ? 'Création...' : `Créer ${selectedDates.length} session${selectedDates.length > 1 ? 's' : ''}`}
          </button>
        </motion.div>
      )}

      {/* Existing Sessions */}
      {existingSessions.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-primary/70">Sessions existantes</h4>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {existingSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-primary/10"
              >
                <div>
                  <div className="font-medium text-primary">
                    {new Date(session.session_date).toLocaleDateString('fr-FR', {
                      weekday: 'long',
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-primary/70">
                    {session.session_time} - Capacité: {session.capacity}
                  </div>
                </div>
                <button
                  onClick={() => deleteSession(session.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}


