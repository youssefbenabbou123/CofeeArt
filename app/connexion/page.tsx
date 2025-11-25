"use client"

import Link from "next/link"
import { useState } from "react"

export default function Connexion() {
  const [tab, setTab] = useState<"login" | "signup">("login")

  return (
    <div className="pt-20 min-h-screen bg-neutral-light flex items-center">
      <div className="max-w-md w-full mx-auto px-4 py-12">
        <div className="bg-neutral-warm p-8 rounded-lg border-2 border-accent">
          <h1 className="text-3xl font-bold text-primary text-center mb-8">Coffee Arts</h1>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setTab("login")}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                tab === "login"
                  ? "bg-primary text-neutral-light"
                  : "border-2 border-primary text-primary hover:bg-primary hover:text-neutral-light"
              }`}
            >
              Connexion
            </button>
            <button
              onClick={() => setTab("signup")}
              className={`flex-1 py-2 px-4 rounded-md font-semibold transition-colors ${
                tab === "signup"
                  ? "bg-primary text-neutral-light"
                  : "border-2 border-primary text-primary hover:bg-primary hover:text-neutral-light"
              }`}
            >
              Inscription
            </button>
          </div>

          {/* Login Form */}
          {tab === "login" && (
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border-2 border-primary rounded-md focus:outline-none focus:border-accent"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full px-4 py-3 border-2 border-primary rounded-md focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="w-full bg-primary text-neutral-light py-3 rounded-md font-bold hover:bg-primary-light"
              >
                Se connecter
              </button>
            </form>
          )}

          {/* Signup Form */}
          {tab === "signup" && (
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Nom complet"
                className="w-full px-4 py-3 border-2 border-primary rounded-md focus:outline-none focus:border-accent"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border-2 border-primary rounded-md focus:outline-none focus:border-accent"
              />
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full px-4 py-3 border-2 border-primary rounded-md focus:outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="w-full bg-primary text-neutral-light py-3 rounded-md font-bold hover:bg-primary-light"
              >
                Créer un compte
              </button>
            </form>
          )}

          <p className="text-center text-primary-light text-sm mt-6">
            {tab === "login" ? "Pas encore de compte? " : "Déjà inscrit? "}
            <button
              onClick={() => setTab(tab === "login" ? "signup" : "login")}
              className="text-primary font-bold hover:text-accent"
            >
              {tab === "login" ? "S'inscrire" : "Se connecter"}
            </button>
          </p>
        </div>

        <p className="text-center text-primary-light text-sm mt-6">
          <Link href="/" className="hover:text-primary font-semibold">
            ← Retour à l'accueil
          </Link>
        </p>
      </div>
    </div>
  )
}
