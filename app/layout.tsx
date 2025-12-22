import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import ConditionalNavigation from "@/components/conditional-navigation"
import ConditionalFooter from "@/components/conditional-footer"
import FloatingSocialIcons from "@/components/floating-social-icons"
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Coffee Arts Paris | Ceramic Workshop & Café",
  description:
    "Discover Coffee Arts Paris - a unique ceramic workshop café in Paris. Enjoy artisan coffee, ceramics classes, and handcrafted pottery.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Coffee Arts Paris",
    description: "Ceramic Workshop & Café",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-background text-foreground">
        <ConditionalNavigation />
        <main className="min-h-screen">{children}</main>
        <ConditionalFooter />
        <FloatingSocialIcons />
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
