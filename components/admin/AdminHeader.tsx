"use client"

import { User, LogOut, Search, Bell } from "lucide-react"
import { motion } from "framer-motion"
import { signOut } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { useEffect, useState } from "react"
import type { User as UserType } from "@/lib/auth"
import { Input } from "@/components/ui/input"

export default function AdminHeader() {
  const router = useRouter()
  const [user, setUser] = useState<UserType | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    async function loadUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    loadUser()
  }, [])

  const handleLogout = () => {
    signOut()
    router.push("/")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Search in admin context - could search orders, users, products, etc.
      // For now, redirect to main search page
      router.push(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 z-50 bg-white/95 backdrop-blur-xl border-b border-primary/10 shadow-sm">
      <div className="flex items-center justify-between px-4 lg:px-6 h-full gap-4">
        <form onSubmit={handleSearch} className="flex-1 max-w-md min-w-0">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 w-full bg-primary/5 border-primary/20 focus:bg-white focus:border-primary rounded-xl text-sm"
            />
          </div>
        </form>

        <div className="flex items-center gap-2 lg:gap-4 flex-shrink-0">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </motion.button>

          <div className="flex items-center gap-2 lg:gap-3 px-2 lg:px-4 py-2 bg-primary/5 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
              <User size={16} />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-bold text-primary">{user?.name || "Admin"}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">{user?.email || ""}</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
            aria-label="Déconnexion"
            title="Déconnexion"
          >
            <LogOut size={20} />
          </motion.button>
        </div>
      </div>
    </header>
  )
}
