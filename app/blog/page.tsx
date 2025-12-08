"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, User, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { fetchBlogs, type Blog } from "@/lib/api"
import LoadingSpinner from "@/components/admin/LoadingSpinner"
import Image from "next/image"

// Category icons mapping
const categoryIcons: Record<string, { icon: any; color: string; bg: string }> = {
  Techniques: { icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/10" },
  Conseils: { icon: ArrowRight, color: "text-blue-500", bg: "bg-blue-500/10" },
  Art: { icon: Sparkles, color: "text-purple-500", bg: "bg-purple-500/10" },
  Écologie: { icon: Sparkles, color: "text-green-500", bg: "bg-green-500/10" },
  Lifestyle: { icon: Sparkles, color: "text-orange-500", bg: "bg-orange-500/10" },
  Tendances: { icon: Sparkles, color: "text-pink-500", bg: "bg-pink-500/10" },
  Community: { icon: User, color: "text-indigo-500", bg: "bg-indigo-500/10" },
  Guide: { icon: Sparkles, color: "text-teal-500", bg: "bg-teal-500/10" },
}

const getCategoryIcon = (category?: string) => {
  if (!category) return { icon: Sparkles, color: "text-primary", bg: "bg-primary/10" }
  return categoryIcons[category] || { icon: Sparkles, color: "text-primary", bg: "bg-primary/10" }
}

export default function Blog() {
  const [posts, setPosts] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await fetchBlogs()
        setPosts(data)
      } catch (error) {
        console.error("Error loading blogs:", error)
      } finally {
        setLoading(false)
      }
    }
    loadBlogs()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Chargement des blogs..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary/5 border border-primary/10 text-primary font-medium text-sm mb-8 tracking-wider uppercase backdrop-blur-sm">
              <Sparkles size={14} />
              Lire & S'inspirer
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-primary mb-8 tracking-tight leading-tight">
              Notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Plongez dans l'univers fascinant de la céramique artisanale et de l'art de vivre.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20 bg-gradient-to-b from-neutral-light to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-accent/5 to-transparent pointer-events-none" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <Sparkles size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground">Aucun article de blog pour le moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {posts.map((post, index) => {
                const categoryStyle = getCategoryIcon(post.category)
                const Icon = categoryStyle.icon
                const date = post.created_at ? new Date(post.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : ''

                return (
                  <article
                    key={post.id}
                    className="group relative bg-white/50 backdrop-blur-xl border border-white/60 p-10 rounded-[2rem] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] hover:border-white/80 transition-all duration-700 hover:-translate-y-6 hover:scale-[1.02] overflow-hidden animate-fade-up opacity-0 flex flex-col"
                    style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className={`absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${categoryStyle.bg} blur-xl`} />

                    <div className="relative z-10 flex flex-col h-full">
                      {/* Header: Icon & Category */}
                      <div className="flex items-start justify-between mb-8">
                        <div className={`relative p-5 rounded-3xl bg-gradient-to-br ${categoryStyle.bg} ${categoryStyle.color} group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 shadow-lg`}>
                          <div className="absolute inset-0 bg-white/20 rounded-3xl" />
                          <Icon size={40} strokeWidth={2} className="relative z-10" />
                        </div>
                        {post.category && (
                          <span className={`text-xs font-black px-4 py-2 rounded-full ${categoryStyle.bg} ${categoryStyle.color} uppercase tracking-widest shadow-sm`}>
                            {post.category}
                          </span>
                        )}
                      </div>

                      {/* Image */}
                      {post.image && (
                        <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex items-center gap-2 text-xs text-primary/50 font-semibold uppercase tracking-wider">
                          <Calendar size={14} strokeWidth={2.5} />
                          {date}
                        </div>

                        <h2 className="text-3xl font-black text-primary mb-4 group-hover:text-accent transition-colors duration-500 leading-tight line-clamp-2">
                          {post.title}
                        </h2>
                        <p className="text-base text-primary/70 leading-relaxed line-clamp-3 font-medium">
                          {post.excerpt || post.content.substring(0, 150) + "..."}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-8 border-t-2 border-primary/10 group-hover:border-accent/30 transition-colors duration-500 mt-8">
                        <div className="flex items-center gap-3 text-sm text-primary/60 font-bold">
                          <div className={`w-10 h-10 rounded-full ${categoryStyle.bg} flex items-center justify-center ${categoryStyle.color} shadow-sm`}>
                            <User size={16} strokeWidth={2.5} />
                          </div>
                          {post.author || "Coffee Arts Paris"}
                        </div>

                        <Link
                          href={`/blog/${post.slug || post.id}`}
                          className={`inline-flex items-center gap-2 ${categoryStyle.color} font-black group-hover:gap-4 transition-all duration-500 text-sm uppercase tracking-wide`}
                        >
                          Lire <ArrowRight size={18} strokeWidth={3} />
                        </Link>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
