"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, Package, Mail, Settings, Menu, X, FileText, ShoppingCart, Calendar, Gift } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Commandes", icon: ShoppingCart },
  { href: "/admin/products", label: "Produits", icon: Package },
  { href: "/admin/workshops", label: "Ateliers", icon: Calendar },
  { href: "/admin/gift-cards", label: "Cartes cadeaux", icon: Gift },
  { href: "/admin/blogs", label: "Blogs", icon: FileText },
  { href: "/admin/users", label: "Utilisateurs", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Paramètres", icon: Settings },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-white rounded-lg shadow-lg"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-white/80 backdrop-blur-xl border-r border-primary/10 z-40",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
            <div className="flex flex-col h-full p-6 pt-4">
              {/* Logo */}
              <div className="mb-8">
                <Link href="/admin" className="flex items-center gap-2">
                  <Image
                    src="/Fichier 123.png"
                    alt="Coffee Arts Paris"
                    width={80}
                    height={32}
                    className="h-auto w-auto object-contain max-h-12"
                    priority
                  />
                  <Image
                    src="/Fichier 96.png"
                    alt="Coffee Arts Paris"
                    width={60}
                    height={24}
                    className="h-auto w-auto object-contain max-h-8"
                    priority
                  />
                </Link>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                        isActive
                          ? "bg-primary text-white shadow-lg shadow-primary/20"
                          : "text-primary hover:bg-primary/5 hover:text-primary"
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={20} className={cn(isActive && "text-white")} />
                      </motion.div>
                      <span className="font-medium">{item.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute right-2 w-2 h-2 bg-white rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>
                  )
                })}
              </nav>
            </div>

      </motion.aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  )
}

