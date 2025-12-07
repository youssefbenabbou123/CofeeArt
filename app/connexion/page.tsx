"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { signUp, signIn } from "@/lib/auth"
import type { AuthResponse } from "@/lib/auth"
import { useToast } from "@/hooks/use-toast"

export default function Connexion() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('return') || '/'
  const [tab, setTab] = useState<"login" | "signup">("login")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const { toast } = useToast()
  
  // Form states
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-neutral-light to-background flex items-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-md w-full mx-auto px-4 py-12 relative z-10">
        <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl border border-white/50 shadow-2xl animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-4xl font-black text-primary text-center mb-10 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Coffee Arts
          </h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${tab === "login"
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50"
                }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 ${tab === "signup"
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50"
                }`}
            >
              Inscription
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-4 bg-red-50 border-2 border-red-200 text-red-700 rounded-xl animate-fade-up opacity-0" style={{ animationDelay: "0.35s" }}>
              {error}
            </div>
          )}

          {/* Login Form */}
          {tab === "login" && (
            <form 
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault()
                setError("")
                setLoading(true)
                
                try {
                  const response = await signIn(loginEmail, loginPassword)
                  // Dispatch custom event to notify navigation
                  window.dispatchEvent(new Event('auth-change'))
                  toast({
                    title: "Connexion réussie",
                    description: "Bienvenue ! Vous êtes maintenant connecté.",
                  })
                  // Redirect admin to admin panel, others to return URL
                  if (response.data?.user?.role === 'admin') {
                    router.push('/admin')
                  } else {
                    router.push(returnUrl)
                  }
                  router.refresh()
                } catch (err: any) {
                  setError(err.message || "Erreur lors de la connexion")
                } finally {
                  setLoading(false)
                }
              }}
            >
              <input
                type="email"
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-5 py-4 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 bg-white text-primary font-medium transition-all animate-fade-up opacity-0 disabled:opacity-50"
                style={{ animationDelay: "0.4s" }}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
                disabled={loading}
                className="w-full px-5 py-4 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 bg-white text-primary font-medium transition-all animate-fade-up opacity-0 disabled:opacity-50"
                style={{ animationDelay: "0.5s" }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-4 rounded-xl font-black hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-up opacity-0 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ animationDelay: "0.6s" }}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {tab === "signup" && (
            <form 
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault()
                setError("")
                setLoading(true)
                
                try {
                  const response = await signUp(signupName, signupEmail, signupPassword)
                  // Dispatch custom event to notify navigation
                  window.dispatchEvent(new Event('auth-change'))
                  toast({
                    title: "Inscription réussie",
                    description: "Votre compte a été créé avec succès. Bienvenue !",
                  })
                  // Redirect admin to admin panel, others to return URL
                  if (response.data?.user?.role === 'admin') {
                    router.push('/admin')
                  } else {
                    router.push(returnUrl)
                  }
                  router.refresh()
                } catch (err: any) {
                  setError(err.message || "Erreur lors de l'inscription")
                } finally {
                  setLoading(false)
                }
              }}
            >
              <input
                type="text"
                placeholder="Nom complet"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
                disabled={loading}
                className="w-full px-5 py-4 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 bg-white text-primary font-medium transition-all animate-fade-up opacity-0 disabled:opacity-50"
                style={{ animationDelay: "0.4s" }}
              />
              <input
                type="email"
                placeholder="Email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
                disabled={loading}
                className="w-full px-5 py-4 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 bg-white text-primary font-medium transition-all animate-fade-up opacity-0 disabled:opacity-50"
                style={{ animationDelay: "0.5s" }}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                className="w-full px-5 py-4 border-2 border-primary/20 rounded-xl focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 bg-white text-primary font-medium transition-all animate-fade-up opacity-0 disabled:opacity-50"
                style={{ animationDelay: "0.6s" }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-4 rounded-xl font-black hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-up opacity-0 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ animationDelay: "0.7s" }}
              >
                {loading ? "Création..." : "Créer un compte"}
              </button>
            </form>
          )}

          <p className="text-center text-primary/60 text-sm mt-8 font-medium animate-fade-up opacity-0" style={{ animationDelay: "0.7s" }}>
            {tab === "login" ? "Pas encore de compte? " : "Déjà inscrit? "}
            <button
              onClick={() => setTab(tab === "login" ? "signup" : "login")}
              className="text-primary font-bold hover:text-accent transition-colors"
            >
              {tab === "login" ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>

        <p className="text-center text-primary/60 text-sm mt-8 animate-fade-up opacity-0" style={{ animationDelay: "0.8s" }}>
          <Link href="/" className="inline-flex items-center gap-2 hover:text-primary font-bold transition-colors group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Retour à l'accueil
          </Link>
        </p>
      </div>
    </div>
  )
}
