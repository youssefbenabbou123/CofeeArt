"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, MailCheck, Trash2, ChevronDown, ChevronUp, Calendar, User, MessageSquare } from "lucide-react"
import type { ContactMessage } from "@/lib/admin-api"
import { updateMessage, deleteMessage } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"

interface MessageCardProps {
  message: ContactMessage
  onUpdate: () => void
}

export default function MessageCard({ message, onUpdate }: MessageCardProps) {
  const [expanded, setExpanded] = useState(false)
  const { toast } = useToast()

  const handleToggleRead = async () => {
    try {
      await updateMessage(message.id, !message.read)
      toast({
        title: "Succès",
        description: message.read ? "Message marqué comme non lu" : "Message marqué comme lu",
      })
      onUpdate()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le message",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async () => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce message ?")) return

    try {
      await deleteMessage(message.id)
      toast({
        title: "Succès",
        description: "Message supprimé",
      })
      onUpdate()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer le message",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01, y: -2 }}
      className={`bg-white/80 backdrop-blur-xl rounded-2xl border-2 transition-all ${
        message.read
          ? "border-primary/10"
          : "border-primary/30 shadow-lg"
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${message.read ? "bg-primary/10" : "bg-primary text-white"}`}>
                {message.read ? (
                  <MailCheck size={20} className={message.read ? "text-primary" : "text-white"} />
                ) : (
                  <Mail size={20} className="text-white" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-primary">{message.subject}</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    {message.name}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(message.created_at).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{message.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleRead}
              className={`p-2 rounded-lg transition-colors ${
                message.read
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
              aria-label={message.read ? "Marquer comme non lu" : "Marquer comme lu"}
            >
              {message.read ? <Mail size={18} /> : <MailCheck size={18} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleDelete}
              className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
              aria-label="Supprimer"
            >
              <Trash2 size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setExpanded(!expanded)}
              className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              aria-label={expanded ? "Réduire" : "Développer"}
            >
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </motion.button>
          </div>
        </div>

        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-primary/10"
          >
            <div className="flex items-start gap-2 mb-3">
              <MessageSquare size={18} className="text-primary mt-1" />
              <h4 className="font-bold text-primary">Message :</h4>
            </div>
            <p className="text-primary/80 leading-relaxed whitespace-pre-wrap">{message.message}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

