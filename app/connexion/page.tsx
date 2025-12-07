"use client"

import { Suspense } from 'react'
import Connexion from './Connexion'

export default function Page() {
  return (
    <Suspense fallback={
      <div className="pt-20 min-h-screen bg-gradient-to-b from-neutral-light to-background flex items-center justify-center">
        <div className="text-primary">Chargement...</div>
      </div>
    }>
      <Connexion />
    </Suspense>
  )
}
