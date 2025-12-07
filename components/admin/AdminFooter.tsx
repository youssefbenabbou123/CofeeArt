"use client"

import { motion } from "framer-motion"
import { Coffee } from "lucide-react"

export default function AdminFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-0 left-0 lg:left-64 right-0 border-t border-primary/10 bg-white/95 backdrop-blur-xl z-40"
    >
      <div className="px-4 lg:px-6 py-3">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Coffee size={18} className="text-primary" />
            <span className="text-sm">
              Coffee Arts Paris Admin Panel © {currentYear}
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Version 1.0.0</span>
            <span>•</span>
            <span>Administration</span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}

