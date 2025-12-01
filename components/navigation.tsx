"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, X, User } from "lucide-react"
import { cn } from "@/lib/utils"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    // Always listen to scroll events for navbar background
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    // Set initial state
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const leftLinks = [
    { href: "/carte", label: "Carte" },
    { href: "/ateliers", label: "Ateliers" },
    { href: "/boutique", label: "Boutique" },
  ]

  const rightLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/apropos", label: "À Propos" },
    { href: "/contact", label: "Contact" },
  ]

  const menuLinks = [...leftLinks, ...rightLinks]
  
  // On home page, use scrolled state. On other pages, always use scrolled state for elements.
  const elementsScrolled = isHomePage ? scrolled : true

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-2" : "bg-transparent py-4"
      )}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">

          {/* Mobile Menu Button */}
          <button
            className={cn(
              "md:hidden p-2 hover:bg-primary/10 rounded-full transition-colors z-10",
              elementsScrolled ? "text-primary" : "text-accent"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation - Left side (3 items close to logo) */}
          <div className="hidden md:flex items-center gap-10 absolute right-1/2 mr-25 mx-8">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium hover:text-accent transition-colors text-lg relative group",
                  elementsScrolled ? "text-primary" : "text-accent"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Logo - Centered */}
          <Link
            href="/"
            className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0 transition-all duration-300 z-10"
          >
            <Image
              src={elementsScrolled ? "/Fichier 129.png" : "/Fichier 128.png"}
              alt="Coffee Arts Paris"
              width={200}
              height={80}
              className={cn("h-auto w-auto object-contain transition-all", elementsScrolled ? "max-h-16" : "max-h-20")}
              priority
            />
          </Link>

          {/* Desktop Navigation - Right side (3 items close to logo) */}
          <div className="hidden md:flex items-center gap-10 absolute left-1/2 ml-25 mx-8">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium hover:text-accent transition-colors text-lg relative group",
                  elementsScrolled ? "text-primary" : "text-accent"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* User Icon - Far Right */}
          <div className="hidden md:flex ml-auto z-10">
            <Link
              href="/connexion"
              className={cn(
                "p-2 rounded-full transition-colors",
                elementsScrolled
                  ? "bg-primary/5 hover:bg-primary/10 text-primary" 
                  : "bg-accent/10 hover:bg-accent/20 text-accent"
              )}
              aria-label="Connexion"
            >
              <User size={24} />
            </Link>
          </div>

          {/* Mobile User Icon */}
          <div className="md:hidden ml-auto z-10">
            <Link
              href="/connexion"
              className={cn("p-2 transition-colors", elementsScrolled ? "text-primary" : "text-accent")}
            >
              <User size={24} />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Overlay */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ease-in-out flex flex-col justify-center items-center space-y-8",
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          )}
          style={{ top: "0", height: "100vh" }}
        >
          <button
            className="absolute top-6 right-6 p-2 text-primary"
            onClick={() => setIsOpen(false)}
          >
            <X size={32} />
          </button>

          <div className="flex flex-col items-center space-y-6 text-center">
            {menuLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-3xl font-bold text-primary hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/connexion"
              className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-xl"
              onClick={() => setIsOpen(false)}
            >
              Connexion
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
