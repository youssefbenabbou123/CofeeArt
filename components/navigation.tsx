"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

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

  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-24 relative">
          {/* Logo - Centered */}
          <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex-shrink-0">
            <Image
              src="/Fichier 129.png"
              alt="Coffee Arts Paris"
              width={200}
              height={80}
              className="h-auto w-auto max-h-20 object-contain"
              priority
            />
          </Link>

          {/* Left Links - Close to logo */}
          <div className="hidden md:flex gap-12 items-center absolute right-1/2 mr-[120px]">
            {leftLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary font-medium hover:text-accent transition-colors whitespace-nowrap text-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Links - Close to logo */}
          <div className="hidden md:flex gap-12 items-center absolute left-1/2 ml-[120px]">
            {rightLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary font-medium hover:text-accent transition-colors whitespace-nowrap text-lg"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Connexion - Far Right Edge */}
          <div className="hidden md:flex items-center absolute right-4 sm:right-6 lg:right-8">
            <Link
              href="/connexion"
              className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:shadow-md transition-all whitespace-nowrap"
            >
              Connexion
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 ml-auto" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-primary" size={24} /> : <Menu className="text-primary" size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2 border-t border-border">
            {[...leftLinks, ...rightLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 text-primary hover:bg-accent hover:text-primary rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/connexion"
              className="block px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
              onClick={() => setIsOpen(false)}
            >
              Connexion
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
