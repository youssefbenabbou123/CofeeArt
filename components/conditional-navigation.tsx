"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"

export default function ConditionalNavigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Don't show regular navigation on admin pages
  if (!mounted || pathname?.startsWith("/admin")) {
    return null
  }
  
  return <Navigation />
}

