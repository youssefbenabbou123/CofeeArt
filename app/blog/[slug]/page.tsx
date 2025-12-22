"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Share2 } from "lucide-react"
import { motion } from "framer-motion"
import { fetchBlog, type Blog } from "@/lib/api"
import LoadingSpinner from "@/components/admin/LoadingSpinner"
import Image from "next/image"
import Link from "next/link"

export default function BlogDetail() {
  const params = useParams()
  const router = useRouter()
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadBlog() {
      try {
        const identifier = params.slug as string
        const data = await fetchBlog(identifier)
        if (!data) {
          router.push("/blog")
          return
        }
        setBlog(data)
      } catch (error) {
        console.error("Error loading blog:", error)
        router.push("/blog")
      } finally {
        setLoading(false)
      }
    }
    loadBlog()
  }, [params.slug, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner message="Chargement de l'article..." />
      </div>
    )
  }

  if (!blog) {
    return null
  }

  const date = blog.created_at ? new Date(blog.created_at).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }) : ''

  return (
    <div className="min-h-screen bg-background">
      {/* Back Link */}
      <section className="relative pt-20 md:pt-32 pb-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary/70 hover:text-primary mb-8 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Retour aux blogs</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Image - First */}
      {blog.image && (
        <section className="relative w-full h-[400px] md:h-[500px] mb-8">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </section>
      )}

      {/* Title and Date - Below Image */}
      <section className="relative pb-4 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-4 leading-tight">
              {blog.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-primary/60 mb-2">
              <div className="flex items-center gap-2">
                <span>{date}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div
            className="text-primary/80 leading-relaxed space-y-6 text-xl"
            dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
          />
        </motion.article>

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-primary/10"
        >
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: blog.title,
                  text: blog.excerpt || blog.content.substring(0, 150),
                  url: window.location.href,
                })
              } else {
                navigator.clipboard.writeText(window.location.href)
                alert("Lien copié dans le presse-papiers!")
              }
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors font-medium"
          >
            <Share2 size={20} />
            <span>Partager</span>
          </button>
        </motion.div>
      </section>
    </div>
  )
}






