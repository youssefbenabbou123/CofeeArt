"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Mail, Search, Filter, Inbox, CheckCircle, MailCheck } from "lucide-react"
import { fetchMessages, type ContactMessage } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import MessageCard from "@/components/admin/MessageCard"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

type TabType = 'pending' | 'answered'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<TabType>('pending')
  const { toast } = useToast()

  const loadMessages = async () => {
    try {
      setLoading(true)
      // Fetch messages based on active tab
      const replied = activeTab === 'answered'
      const data = await fetchMessages(undefined, replied, searchTerm || undefined)
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
  }, [activeTab, toast])

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

  const unreadCount = messages.filter((m) => !m.read && !m.replied).length
  const pendingCount = messages.filter((m) => !m.replied).length

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
          <p className="text-muted-foreground">Gérer et répondre aux messages reçus</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl">
          <Mail size={20} className="text-primary" />
          <span className="font-bold text-primary">
            {unreadCount > 0 && (
              <span className="text-red-600">{unreadCount} non lu{unreadCount > 1 ? 's' : ''} · </span>
            )}
            {messages.length} message{messages.length > 1 ? 's' : ''}
          </span>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex gap-2"
      >
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'pending'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white/80 text-primary hover:bg-primary/10 border border-primary/10'
          }`}
        >
          <Inbox size={20} />
          En attente
          {pendingCount > 0 && activeTab !== 'pending' && (
            <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
              {pendingCount}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('answered')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            activeTab === 'answered'
              ? 'bg-primary text-white shadow-lg'
              : 'bg-white/80 text-primary hover:bg-primary/10 border border-primary/10'
          }`}
        >
          <CheckCircle size={20} />
          Répondus
        </button>
      </motion.div>

      {/* Search */}
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
      </motion.div>

      {/* Messages List */}
      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12 bg-white/80 backdrop-blur-xl rounded-2xl border border-primary/10">
            {activeTab === 'pending' ? (
              <>
                <Inbox size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucun message en attente</p>
              </>
            ) : (
              <>
                <MailCheck size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Aucun message répondu</p>
              </>
            )}
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
