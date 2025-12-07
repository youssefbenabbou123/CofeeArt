"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Search, Filter } from "lucide-react"
import { fetchMessages, type ContactMessage } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import MessageCard from "@/components/admin/MessageCard"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRead, setFilterRead] = useState<boolean | undefined>(undefined)
  const { toast } = useToast()

  const loadMessages = async () => {
    try {
      setLoading(true)
      const data = await fetchMessages(
        filterRead,
        searchTerm || undefined
      )
      setMessages(data)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les messages",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMessages()
  }, [filterRead, toast])

  const filteredMessages = messages.filter((message) => {
    if (searchTerm) {
      return (
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    return true
  })

  const unreadCount = messages.filter((m) => !m.read).length

  if (loading) {
    return <LoadingSpinner message="Chargement des messages..." />
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-4xl font-black text-primary mb-2">Messages de Contact</h1>
          <p className="text-muted-foreground">Gérer les messages reçus via le formulaire de contact</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl">
          <Mail size={20} className="text-primary" />
          <span className="font-bold text-primary">
            {unreadCount > 0 && (
              <span className="text-red-600">{unreadCount} </span>
            )}
            {messages.length}
          </span>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Rechercher dans les messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-xl border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <select
            value={filterRead === undefined ? "all" : filterRead ? "read" : "unread"}
            onChange={(e) => {
              const value = e.target.value
              setFilterRead(
                value === "all" ? undefined : value === "read"
              )
            }}
            className="pl-12 pr-4 py-3 bg-white/80 backdrop-blur-xl border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
          >
            <option value="all">Tous</option>
            <option value="unread">Non lus</option>
            <option value="read">Lus</option>
          </select>
        </div>
      </motion.div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12 bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10">
            <Mail size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">Aucun message trouvé</p>
          </div>
        ) : (
          filteredMessages.map((message, index) => (
            <MessageCard
              key={message.id}
              message={message}
              onUpdate={loadMessages}
            />
          ))
        )}
      </div>
    </div>
  )
}

