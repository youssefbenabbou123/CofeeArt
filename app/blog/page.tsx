"use client"

import Link from "next/link"
import { Calendar, User, ArrowRight, Sparkles, Target, Palette, Leaf, Coffee, TrendingUp, Users, ShieldCheck } from "lucide-react"

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "Les Secrets de la Céramique Japonaise",
      excerpt: "Découvrez les techniques millénaires qui font la beauté de la céramique japonaise.",
      date: "15 Novembre 2024",
      author: "Marie Dubois",
      category: "Techniques",
      icon: Sparkles,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
    {
      id: 2,
      title: "Guide Complet: Bien Choisir sa Tasse",
      excerpt: "Tous nos conseils pour sélectionner la tasse parfaite selon votre style et vos préférences.",
      date: "10 Novembre 2024",
      author: "Pierre Martin",
      category: "Conseils",
      icon: Target,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      id: 3,
      title: "Peinture et Glaçure: L'Art Décoratif",
      excerpt: "Explorez les différentes techniques de décoration pour sublimer vos créations céramiques.",
      date: "5 Novembre 2024",
      author: "Sophie Laurent",
      category: "Art",
      icon: Palette,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      id: 4,
      title: "Durabilité: La Céramique Écologique",
      excerpt: "Pourquoi la céramique est le choix idéal pour un mode de vie durable.",
      date: "1 Novembre 2024",
      author: "Jean Rousseau",
      category: "Écologie",
      icon: Leaf,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      id: 5,
      title: "Café & Céramique: L'Accord Parfait",
      excerpt: "Comment la forme de votre tasse influence la dégustation de votre café préféré.",
      date: "28 Octobre 2024",
      author: "Thomas Anderson",
      category: "Lifestyle",
      icon: Coffee,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
    {
      id: 6,
      title: "Les Tendances Céramique 2025",
      excerpt: "Minimalisme, textures brutes et couleurs terre : ce qui nous attend l'année prochaine.",
      date: "25 Octobre 2024",
      author: "Sarah Connor",
      category: "Tendances",
      icon: TrendingUp,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
    },
    {
      id: 7,
      title: "Rencontre avec Maître Potter",
      excerpt: "Interview exclusive avec l'un des plus grands artisans céramistes de Paris.",
      date: "20 Octobre 2024",
      author: "Journaliste",
      category: "Community",
      icon: Users,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      id: 8,
      title: "Guide: Entretenir sa Céramique",
      excerpt: "Les bons gestes pour faire durer vos pièces préférées toute une vie.",
      date: "15 Octobre 2024",
      author: "Expert",
      category: "Guide",
      icon: ShieldCheck,
      color: "text-teal-500",
      bg: "bg-teal-500/10",
    },
  ]

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 tracking-wider uppercase animate-fade-up opacity-0" style={{ animationDelay: "0.1s" }}>
            Lire & S'inspirer
          </span>
          <h1 className="hero-text mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s" }}>
            Notre Blog
          </h1>
          <p className="text-xl text-primary/70 max-w-2xl mx-auto mb-10 animate-fade-up opacity-0" style={{ animationDelay: "0.3s" }}>
            Plongez dans l'univers fascinant de la céramique artisanale et de l'art de vivre.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-gradient-to-b from-neutral-light to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-accent/5 to-transparent pointer-events-none" />
        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className="group relative bg-white/50 backdrop-blur-xl border border-white/60 p-10 rounded-[2rem] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] hover:border-white/80 transition-all duration-700 hover:-translate-y-6 hover:scale-[1.02] overflow-hidden animate-fade-up opacity-0 flex flex-col"
                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Animated border glow */}
                <div className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${post.bg} blur-xl`} />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Header: Icon & Category */}
                  <div className="flex items-start justify-between mb-8">
                    {/* Icon with gradient background */}
                    <div className={`relative p-5 rounded-3xl bg-gradient-to-br ${post.bg} ${post.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-lg`}>
                      <div className="absolute inset-0 bg-white/20 rounded-3xl" />
                      <post.icon size={40} strokeWidth={2} className="relative z-10" />
                    </div>
                    <span className={`text-xs font-black px-4 py-2 rounded-full ${post.bg} ${post.color} uppercase tracking-widest shadow-sm`}>
                      {post.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-xs text-primary/50 font-semibold uppercase tracking-wider">
                      <Calendar size={14} strokeWidth={2.5} />
                      {post.date}
                    </div>

                    <h2 className="text-3xl font-black text-primary mb-4 group-hover:text-accent transition-colors duration-500 leading-tight line-clamp-2">
                      {post.title}
                    </h2>
                    <p className="text-base text-primary/70 leading-relaxed line-clamp-3 font-medium">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-8 border-t-2 border-primary/10 group-hover:border-accent/30 transition-colors duration-500 mt-8">
                    <div className="flex items-center gap-3 text-sm text-primary/60 font-bold">
                      <div className={`w-10 h-10 rounded-full ${post.bg} flex items-center justify-center ${post.color} shadow-sm`}>
                        <User size={16} strokeWidth={2.5} />
                      </div>
                      {post.author}
                    </div>

                    <Link
                      href={`/blog/${post.id}`}
                      className={`inline-flex items-center gap-2 ${post.color} font-black group-hover:gap-4 transition-all duration-500 text-sm uppercase tracking-wide`}
                    >
                      Lire <ArrowRight size={18} strokeWidth={3} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
