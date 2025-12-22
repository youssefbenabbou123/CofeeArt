"use client"

import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

export default function FloatingSocialIcons() {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-4">
      <Link 
        href="https://www.instagram.com/coffeearts.paris/" 
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 shadow-xl hover:scale-110 border border-primary/20" 
        style={{ 
          animation: "slide-in-right 0.6s ease-out 0.3s forwards"
        }}
        aria-label="Instagram Coffee Arts Paris"
      >
        <Instagram size={24} />
      </Link>
      <Link
        href="https://www.tiktok.com/@coffeeartsparis"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 bg-primary/90 backdrop-blur-sm text-primary-foreground rounded-full flex items-center justify-center hover:bg-accent hover:text-primary transition-all duration-300 shadow-xl hover:scale-110 relative group border border-primary/20"
        style={{ 
          animation: "slide-in-right 0.6s ease-out 0.5s forwards"
        }}
        aria-label="TikTok Coffee Arts Paris"
      >
        <span className="block h-6 w-6 relative">
          <Image
            src="/tiktok-beige.png"
            alt="TikTok"
            fill
            sizes="24px"
            className="object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
            style={{ filter: "brightness(1.15)" }}
          />
          <Image
            src="/tiktok-green.png"
            alt="TikTok"
            fill
            sizes="24px"
            className="object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          />
        </span>
      </Link>
    </div>
  )
}

