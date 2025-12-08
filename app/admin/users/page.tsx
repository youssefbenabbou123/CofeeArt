"use client"

import { useEffect, useState } from "react"
import { Search, Users as UsersIcon, Filter } from "lucide-react"
import { fetchUsers, type User } from "@/lib/admin-api"
import { useToast } from "@/hooks/use-toast"
import UserTable from "@/components/admin/UserTable"
import LoadingSpinner from "@/components/admin/LoadingSpinner"

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const { toast } = useToast()

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await fetchUsers()
      setUsers(data)
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les utilisateurs",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [toast])

  const filteredUsers = users.filter(
    (user) => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesRole = roleFilter === "all" || user.role === roleFilter
      
      return matchesSearch && matchesRole
    }
  )

  if (loading) {
    return <LoadingSpinner message="Chargement des utilisateurs..." />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-primary mb-2">Gestion des Utilisateurs</h1>
          <p className="text-muted-foreground">Gérer les utilisateurs et leurs rôles</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-xl">
            <UsersIcon size={20} className="text-primary" />
            <span className="font-bold text-primary">{filteredUsers.length}</span>
            {roleFilter !== "all" && (
              <span className="text-sm text-muted-foreground">
                / {users.length} total
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/80 backdrop-blur-xl border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="pl-12 pr-8 py-3 bg-white/80 backdrop-blur-xl border border-primary/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none cursor-pointer"
          >
            <option value="all">Tous les rôles</option>
            <option value="client">Clients</option>
            <option value="admin">Admins</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <UserTable users={filteredUsers} onUpdate={loadUsers} />
    </div>
  )
}

