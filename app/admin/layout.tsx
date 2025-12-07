"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser, isAdmin, getAuthToken } from "@/lib/auth"
import type { User } from "@/lib/auth"
import Sidebar from "@/components/admin/Sidebar"
import AdminHeader from "@/components/admin/AdminHeader"
import AdminFooter from "@/components/admin/AdminFooter"
import { motion } from "framer-motion"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkAdmin() {
      const token = getAuthToken()
      if (!token) {
        router.push("/connexion?return=/admin")
        return
      }

      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)

        if (!currentUser || !isAdmin(currentUser)) {
          router.push("/")
          return
        }

        setLoading(false)
      } catch (error) {
        console.error("Auth error:", error)
        router.push("/connexion?return=/admin")
      }
    }

    checkAdmin()

    const handleAuthChange = () => {
      checkAdmin()
    }

    window.addEventListener("auth-change", handleAuthChange)
    return () => window.removeEventListener("auth-change", handleAuthChange)
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!user || !isAdmin(user)) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="pt-16 pb-20 px-4 lg:px-6">
          <div className="pt-6">
            {children}
          </div>
        </main>
        <AdminFooter />
      </div>
    </div>
  )
}
