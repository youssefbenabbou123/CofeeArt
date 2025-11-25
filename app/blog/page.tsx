"use client"

import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Les Secrets de la Céramique Japonaise",
      excerpt: "Découvrez les techniques millénaires qui font la beauté de la céramique japonaise.",
      date: "15 Novembre 2024",
      author: "Marie Dubois",
      category: "Techniques",
      emoji: "🇯🇵",
    },
    {
      id: 2,
      title: "Guide Complet: Bien Choisir sa Tasse",
      excerpt: "Tous nos conseils pour sélectionner la tasse parfaite selon votre style et vos préférences.",
      date: "10 Novembre 2024",
      author: "Pierre Martin",
      category: "Conseils",
      emoji: "🎯",
    },
    {
      id: 3,
      title: "Peinture et Glaçure: L'Art Décoratif",
      excerpt: "Explorez les différentes techniques de décoration pour sublimer vos créations céramiques.",
      date: "5 Novembre 2024",
      author: "Sophie Laurent",
      category: "Art",
      emoji: "🎨",
    },
    {
      id: 4,
      title: "Durabilité: La Céramique Écologique",
      excerpt: "Pourquoi la céramique est le choix idéal pour un mode de vie durable.",
      date: "1 Novembre 2024",
      author: "Jean Rousseau",
      category: "Écologie",
      emoji: "🌱",
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-neutral-warm py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="hero-text mb-4">Notre Blog</h1>
          <p className="text-xl text-primary-light">
            Articles, conseils et histoires du monde de la céramique et du café.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-neutral-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-neutral-warm p-8 rounded-lg border-l-4 border-accent hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{post.emoji}</div>
                  <span className="text-xs bg-accent text-primary px-3 py-1 rounded-full font-semibold">
                    {post.category}
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-primary mb-3">{post.title}</h2>
                <p className="text-primary-light mb-4">{post.excerpt}</p>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-4 border-t border-neutral-warm">
                  <div className="flex items-center gap-4 text-sm text-primary-light">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} /> {post.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} /> {post.author}
                    </div>
                  </div>
                  <Link
                    href={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent"
                  >
                    Lire plus <ArrowRight size={18} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
