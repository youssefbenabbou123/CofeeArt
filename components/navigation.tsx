"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, User, LogOut, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { getCurrentUser, signOut, type User as UserType } from "@/lib/auth"
import { getCartItemCount } from "@/lib/cart"

export default function Navigation() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<UserType | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname()
  const isHomePage = pathname === "/"

  useEffect(() => {
    // Always listen to scroll events for navbar background
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    // Set initial state after mount to avoid hydration mismatch
    if (typeof window !== 'undefined') {
      handleScroll()
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    // Check if user is logged in
    async function checkUser() {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    }
    checkUser()

    // Listen for storage changes (when user logs in/out in another tab)
    const handleStorageChange = () => {
      checkUser()
    }
    
    // Listen for auth changes (when user logs in/out in same tab)
    const handleAuthChange = () => {
      checkUser()
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('auth-change', handleAuthChange)
    
    // Also check on focus (when user comes back to tab)
    window.addEventListener('focus', checkUser)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('auth-change', handleAuthChange)
      window.removeEventListener('focus', checkUser)
    }
  }, [])

  useEffect(() => {
    // Update cart count
    function updateCartCount() {
      setCartCount(getCartItemCount())
    }

    updateCartCount()

    // Listen for cart updates
    window.addEventListener('cart-update', updateCartCount)

    return () => {
      window.removeEventListener('cart-update', updateCartCount)
    }
  }, [])

  const handleLogout = () => {
    signOut()
    setUser(null)
    setShowUserMenu(false)
    router.push("/")
    router.refresh()
  }

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
              className={cn("object-contain transition-all", elementsScrolled ? "max-h-16 w-auto h-auto" : "max-h-20 w-auto h-auto")}
              style={{ width: 'auto', height: 'auto' }}
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

          {/* Cart and User Icons - Far Right */}
          <div className="hidden md:flex ml-auto items-center gap-3 z-10">
            {/* Cart Icon */}
            <Link
              href="/panier"
              className={cn(
                "relative p-2 rounded-full transition-colors",
                elementsScrolled
                  ? "bg-primary/5 hover:bg-primary/10 text-primary" 
                  : "bg-accent/10 hover:bg-accent/20 text-accent"
              )}
              aria-label="Panier"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User Icon */}
            <div className="relative overflow-visible">
              {user ? (
                <>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2"
                    aria-label="Mon compte"
                  >
                    <div className={cn(
                      "p-2 rounded-full transition-colors flex items-center justify-center",
                      elementsScrolled
                        ? "bg-primary/5 hover:bg-primary/10 text-primary" 
                        : "bg-accent/10 hover:bg-accent/20 text-accent"
                    )}>
                      <User size={24} />
                    </div>
                    <span className={cn(
                      "font-medium text-sm",
                      elementsScrolled ? "text-primary" : "text-accent"
                    )}>{user.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowUserMenu(false)}
                      />
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-primary/10 py-2 z-50">
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-left text-primary hover:bg-primary/5 flex items-center gap-2 transition-colors"
                        >
                          <LogOut size={18} />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <Link
                  href="/connexion"
                  className={cn(
                    "inline-flex items-center justify-center p-2 rounded-full transition-colors",
                    elementsScrolled
                      ? "bg-primary/5 hover:bg-primary/10 text-primary" 
                      : "bg-accent/10 hover:bg-accent/20 text-accent"
                  )}
                  aria-label="Connexion"
                >
                  <User size={24} />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Cart and User Icons */}
          <div className="md:hidden ml-auto flex items-center gap-2 z-10">
            {/* Cart Icon */}
            <Link
              href="/panier"
              className={cn("relative p-2 transition-colors", elementsScrolled ? "text-primary" : "text-accent")}
              aria-label="Panier"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>

            {/* User Icon */}
            {user ? (
              <div className="flex items-center gap-2">
                <span className={cn("text-sm font-medium", elementsScrolled ? "text-primary" : "text-accent")}>
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className={cn("p-2 transition-colors", elementsScrolled ? "text-primary" : "text-accent")}
                  aria-label="Déconnexion"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/connexion"
                className={cn("p-2 transition-colors", elementsScrolled ? "text-primary" : "text-accent")}
              >
                <User size={24} />
              </Link>
            )}
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
              href="/panier"
              className="text-3xl font-bold text-primary hover:text-accent transition-colors flex items-center gap-3 justify-center"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingBag size={32} />
              Panier {cartCount > 0 && `(${cartCount})`}
            </Link>
            {user ? (
              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="text-primary font-bold text-xl">
                  {user.name}
                </div>
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-xl flex items-center gap-2"
                >
                  <LogOut size={20} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/connexion"
                className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-xl"
                onClick={() => setIsOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
