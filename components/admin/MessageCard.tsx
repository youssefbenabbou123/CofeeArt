"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, MailCheck, Trash2, ChevronDown, ChevronUp, Calendar, User, MessageSquare, Reply, Send, X, CheckCircle } from "lucide-react"
import type { ContactMessage } from "@/lib/admin-api"
import { updateMessage, deleteMessage, replyToMessage } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"

interface MessageCardProps {
  message: ContactMessage
  onUpdate: () => void
}

export default function MessageCard({ message, onUpdate }: MessageCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState("")
  const [replySubject, setReplySubject] = useState(`Re: ${message.subject}`)
  const [sending, setSending] = useState(false)
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

  const handleReply = async () => {
    if (!replyText.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez écrire une réponse",
        variant: "destructive",
      })
      return
    }

    setSending(true)
    try {
      await replyToMessage(message.id, replyText, replySubject)
      toast({
        title: "Succès",
        description: "Réponse envoyée avec succès",
      })
      setShowReplyForm(false)
      setReplyText("")
      onUpdate()
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'envoyer la réponse",
        variant: "destructive",
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.005, y: -2 }}
      className={`bg-white/80 backdrop-blur-xl rounded-2xl border-2 transition-all ${
        message.replied
          ? "border-green-200 bg-green-50/50"
          : message.read
          ? "border-primary/10"
          : "border-primary/30 shadow-lg"
      }`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${
                message.replied 
                  ? "bg-green-100 text-green-600"
                  : message.read 
                    ? "bg-primary/10" 
                    : "bg-primary text-white"
              }`}>
                {message.replied ? (
                  <CheckCircle size={20} />
                ) : message.read ? (
                  <MailCheck size={20} className="text-primary" />
                ) : (
                  <Mail size={20} className="text-white" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-primary">{message.subject}</h3>
                  {message.replied && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                      Répondu
                    </span>
                  )}
                </div>
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
            {!message.replied && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setShowReplyForm(!showReplyForm)
                  setExpanded(true)
                }}
                className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                aria-label="Répondre"
              >
                <Reply size={18} />
              </motion.button>
            )}
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

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-primary/10"
            >
              {/* Original Message */}
              <div className="mb-4">
                <div className="flex items-start gap-2 mb-3">
                  <MessageSquare size={18} className="text-primary mt-1" />
                  <h4 className="font-bold text-primary">Message original :</h4>
                </div>
                <p className="text-primary/80 leading-relaxed whitespace-pre-wrap bg-white/50 p-4 rounded-xl">
                  {message.message}
                </p>
              </div>

              {/* Previous Reply (if replied) */}
              {message.replied && message.reply_message && (
                <div className="mb-4 bg-green-50 p-4 rounded-xl border border-green-200">
                  <div className="flex items-start gap-2 mb-2">
                    <CheckCircle size={18} className="text-green-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-green-700">Votre réponse :</h4>
                      <p className="text-xs text-green-600">
                        Envoyée le {message.replied_at ? new Date(message.replied_at).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }) : 'N/A'}
                      </p>
                    </div>
                  </div>
                  <p className="text-green-800 leading-relaxed whitespace-pre-wrap mt-2">
                    {message.reply_message}
                  </p>
                </div>
              )}

              {/* Reply Form */}
              {showReplyForm && !message.replied && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-primary flex items-center gap-2">
                      <Reply size={18} />
                      Répondre à {message.name}
                    </h4>
                    <button
                      onClick={() => setShowReplyForm(false)}
                      className="p-1 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-primary mb-1 block">Sujet</label>
                      <input
                        type="text"
                        value={replySubject}
                        onChange={(e) => setReplySubject(e.target.value)}
                        className="w-full px-4 py-2 bg-white border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                        disabled={sending}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-primary mb-1 block">Votre réponse</label>
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Écrivez votre réponse ici..."
                        rows={5}
                        className="w-full px-4 py-3 bg-white border border-primary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        disabled={sending}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setShowReplyForm(false)}
                        disabled={sending}
                        className="px-4 py-2 text-primary hover:bg-primary/10 rounded-lg transition-colors disabled:opacity-50"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleReply}
                        disabled={sending || !replyText.trim()}
                        className="flex items-center gap-2 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                      >
                        <Send size={18} />
                        {sending ? "Envoi en cours..." : "Envoyer la réponse"}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
