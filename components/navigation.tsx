"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, User, LogOut, ShoppingBag } from "lucide-react"
// import { Search } from "lucide-react" // Kept for future search functionality
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
  // Search functionality - kept for future use
  // const [searchQuery, setSearchQuery] = useState("")
  // const [showSearch, setShowSearch] = useState(false)
  // const [suggestions, setSuggestions] = useState<Array<{type: string, title: string, href: string}>>([])
  // const [showSuggestions, setShowSuggestions] = useState(false)
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

  // Search functionality - kept for future use
  // useEffect(() => {
  //   const fetchSuggestions = async () => {
  //     if (!searchQuery.trim() || searchQuery.length < 2) {
  //       setSuggestions([])
  //       setShowSuggestions(false)
  //       return
  //     }

  //     try {
  //       const query = searchQuery.toLowerCase()
  //       const allSuggestions: Array<{type: string, title: string, href: string}> = []

  //       // Fetch products
  //       try {
  //         const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'}/api/products`)
  //         if (productsRes.ok) {
  //           const productsData = await productsRes.json()
  //           const products = productsData.success ? productsData.data : []
  //           products
  //             .filter((p: any) => 
  //               p.title?.toLowerCase().includes(query) || 
  //               p.description?.toLowerCase().includes(query)
  //             )
  //             .slice(0, 3)
  //             .forEach((p: any) => {
  //               allSuggestions.push({
  //                 type: 'Produit',
  //                 title: p.title,
  //                 href: `/boutique/${p.id}`
  //               })
  //             })
  //         }
  //       } catch (err) {
  //         console.error('Error fetching products for suggestions:', err)
  //       }

  //       // Fetch blogs
  //       try {
  //         const blogsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'}/api/blogs`)
  //         if (blogsRes.ok) {
  //           const blogsData = await blogsRes.json()
  //           const blogs = blogsData.success ? blogsData.data : []
  //           blogs
  //             .filter((b: any) => 
  //               b.title?.toLowerCase().includes(query) ||
  //               b.excerpt?.toLowerCase().includes(query)
  //             )
  //             .slice(0, 2)
  //             .forEach((b: any) => {
  //               allSuggestions.push({
  //                 type: 'Article',
  //                 title: b.title,
  //                 href: `/blog/${b.slug || b.id}`
  //               })
  //             })
  //         }
  //       } catch (err) {
  //         console.error('Error fetching blogs for suggestions:', err)
  //       }

  //       // Fetch workshops
  //       try {
  //         const workshopsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://cofee-art-backend.vercel.app'}/api/workshops`)
  //         if (workshopsRes.ok) {
  //           const workshopsData = await workshopsRes.json()
  //           const workshops = workshopsData.success ? workshopsData.data : []
  //           workshops
  //             .filter((w: any) => 
  //               w.title?.toLowerCase().includes(query) ||
  //               w.description?.toLowerCase().includes(query)
  //             )
  //             .slice(0, 2)
  //             .forEach((w: any) => {
  //               allSuggestions.push({
  //                 type: 'Atelier',
  //                 title: w.title,
  //                 href: `/ateliers`
  //               })
  //             })
  //         }
  //       } catch (err) {
  //         console.error('Error fetching workshops for suggestions:', err)
  //       }

  //       setSuggestions(allSuggestions.slice(0, 5))
  //       setShowSuggestions(allSuggestions.length > 0)
  //     } catch (error) {
  //       console.error('Error fetching suggestions:', error)
  //       setSuggestions([])
  //       setShowSuggestions(false)
  //     }
  //   }

  //   const debounceTimer = setTimeout(fetchSuggestions, 300)
  //   return () => clearTimeout(debounceTimer)
  // }, [searchQuery])

  const handleLogout = () => {
    signOut()
    setUser(null)
    setShowUserMenu(false)
    router.push("/")
    router.refresh()
  }

  // Search functionality - kept for future use
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (searchQuery.trim()) {
  //     router.push(`/recherche?q=${encodeURIComponent(searchQuery.trim())}`)
  //     setSearchQuery("")
  //     setShowSearch(false)
  //     setShowSuggestions(false)
  //   }
  // }

  // const handleSuggestionClick = (href: string) => {
  //   router.push(href)
  //   setSearchQuery("")
  //   setShowSearch(false)
  //   setShowSuggestions(false)
  // }

  const leftLinks = [
    { href: "/carte", label: "Café" },
    { href: "/ateliers", label: "Céramique" },
    { href: "/boutique", label: "Boutique" },
    { href: "/evenements", label: "Événements" },
  ]

  const rightLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/apropos", label: "À propos" },
    { href: "/contact", label: "Contact" },
    { href: "/espace-client", label: "Espace client" },
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
              elementsScrolled ? "text-primary" : "text-[#e9d7c1]"
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
                  "font-medium hover:text-[#ACB792] transition-colors text-lg relative group",
                  elementsScrolled ? "text-primary" : "text-[#e9d7c1]"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ACB792] transition-all group-hover:w-full" />
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
              width={240}
              height={96}
              className={cn("object-contain transition-all", elementsScrolled ? "max-h-20 w-auto h-auto" : "max-h-24 w-auto h-auto")}
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
                  "font-medium hover:text-[#ACB792] transition-colors text-lg relative group",
                  elementsScrolled ? "text-primary" : "text-[#e9d7c1]"
                )}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#ACB792] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Cart and User Icons - Far Right */}
          <div className="hidden md:flex ml-auto items-center gap-3 z-10">
            {/* Search functionality - kept for future use */}
            {/* <div className="relative">
              {showSearch ? (
                <div className="relative">
                  <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value)
                          setShowSuggestions(true)
                        }}
                        onFocus={() => {
                          if (suggestions.length > 0) setShowSuggestions(true)
                        }}
                        placeholder="Rechercher..."
                        autoFocus
                        className={cn(
                          "px-4 py-2 rounded-xl border-2 transition-all text-sm w-64",
                          elementsScrolled
                            ? "bg-white border-primary/20 text-primary focus:border-primary"
                            : "bg-accent/10 border-accent/20 text-accent focus:border-accent"
                        )}
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <>
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setShowSuggestions(false)}
                          />
                          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-primary/20 z-50 max-h-80 overflow-y-auto">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => handleSuggestionClick(suggestion.href)}
                              className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-3 border-b border-primary/5 last:border-b-0"
                            >
                              <div className={cn(
                                "px-2 py-1 rounded text-xs font-bold",
                                suggestion.type === 'Produit' ? "bg-blue-100 text-blue-700" :
                                suggestion.type === 'Article' ? "bg-green-100 text-green-700" :
                                "bg-purple-100 text-purple-700"
                              )}>
                                {suggestion.type}
                              </div>
                              <span className="flex-1 text-primary font-medium">{suggestion.title}</span>
                            </button>
                          ))}
                          <button
                            type="button"
                            onClick={handleSearch}
                            className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-2 border-t border-primary/10 bg-primary/5"
                          >
                            <Search size={16} className="text-primary" />
                            <span className="text-primary font-bold">
                              Voir tous les résultats pour "{searchQuery}"
                            </span>
                          </button>
                        </div>
                        </>
                      )}
                    </div>
                    <button
                      type="submit"
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        elementsScrolled
                          ? "bg-primary text-white hover:bg-primary/90"
                          : "bg-accent text-white hover:bg-accent/90"
                      )}
                    >
                      <Search size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowSearch(false)
                        setSearchQuery("")
                        setShowSuggestions(false)
                      }}
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        elementsScrolled
                          ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      )}
                    >
                      <X size={18} />
                    </button>
                  </form>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    elementsScrolled
                      ? "bg-primary/5 hover:bg-primary/10 text-primary"
                      : "bg-accent/10 hover:bg-accent/20 text-accent"
                  )}
                  aria-label="Rechercher"
                >
                  <Search size={24} />
                </button>
              )}
            </div> */}

            {/* Cart Icon */}
            <Link
              href="/panier"
              className={cn(
                "relative p-2 rounded-full transition-colors",
                elementsScrolled
                  ? "bg-primary/5 hover:bg-primary/10 text-primary" 
                  : "bg-[#e9d7c1]/15 hover:bg-[#e9d7c1]/25 text-[#e9d7c1]"
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
                        : "bg-[#e9d7c1]/15 hover:bg-[#e9d7c1]/25 text-[#e9d7c1]"
                    )}>
                      <User size={24} />
                    </div>
                    <span className={cn(
                      "font-medium text-sm",
                      elementsScrolled ? "text-primary" : "text-[#e9d7c1]"
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
                      : "bg-[#e9d7c1]/15 hover:bg-[#e9d7c1]/25 text-[#e9d7c1]"
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
            {/* Search functionality - kept for future use */}
            {/* <button
              onClick={() => setShowSearch(!showSearch)}
              className={cn("p-2 transition-colors", elementsScrolled ? "text-primary" : "text-accent")}
              aria-label="Rechercher"
            >
              <Search size={24} />
            </button> */}

            {/* Cart Icon */}
            <Link
              href="/panier"
              className={cn("relative p-2 transition-colors", elementsScrolled ? "text-primary" : "text-[#e9d7c1]")}
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
                <span className={cn("text-sm font-medium", elementsScrolled ? "text-primary" : "text-[#e9d7c1]")}>
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className={cn("p-2 transition-colors", elementsScrolled ? "text-primary" : "text-[#e9d7c1]")}
                  aria-label="Déconnexion"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link
                href="/connexion"
                className={cn("p-2 transition-colors", elementsScrolled ? "text-primary" : "text-[#e9d7c1]")}
              >
                <User size={24} />
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Search Bar - kept for future use */}
        {/* {showSearch && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-primary/10 p-4 z-50">
            <div className="relative">
              <form onSubmit={handleSearch} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setShowSuggestions(true)
                    }}
                    onFocus={() => {
                      if (suggestions.length > 0) setShowSuggestions(true)
                    }}
                    placeholder="Rechercher..."
                    autoFocus
                    className="w-full px-4 py-2 border-2 border-primary/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary"
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-primary/20 z-50 max-h-64 overflow-y-auto">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion.href)}
                          className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-3 border-b border-primary/5 last:border-b-0"
                        >
                          <div className={cn(
                            "px-2 py-1 rounded text-xs font-bold",
                            suggestion.type === 'Produit' ? "bg-blue-100 text-blue-700" :
                            suggestion.type === 'Article' ? "bg-green-100 text-green-700" :
                            "bg-purple-100 text-purple-700"
                          )}>
                            {suggestion.type}
                          </div>
                          <span className="flex-1 text-primary font-medium">{suggestion.title}</span>
                        </button>
                      ))}
                      <button
                        type="button"
                        onClick={handleSearch}
                        className="w-full text-left px-4 py-3 hover:bg-primary/5 transition-colors flex items-center gap-2 border-t border-primary/10 bg-primary/5"
                      >
                        <Search size={16} className="text-primary" />
                        <span className="text-primary font-bold">
                          Voir tous les résultats
                        </span>
                      </button>
                    </div>
                  )}
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-bold"
                >
                  <Search size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowSearch(false)
                    setSearchQuery("")
                    setShowSuggestions(false)
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )} */}

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
