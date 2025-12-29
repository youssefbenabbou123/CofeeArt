import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6 relative overflow-hidden selection:bg-primary-foreground/80 selection:text-primary z-50">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-8">
          {/* Brand */}
          <div 
            className="space-y-3"
            style={{
              marginLeft: "var(--footer-col1-ml, 0px)",
              marginRight: "var(--footer-col1-mr, 0px)",
            }}
          >
            <div>
              <Link href="/" className="flex items-center gap-2 mb-3">
                <Image
                  src="/Fichier 95.png"
                  alt="Coffee Arts Paris"
                  width={70}
                  height={22}
                  className="h-auto w-auto object-contain max-h-9 mt-1"
                  priority
                />
              </Link>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Un lieu unique où la céramique<br />
              rencontre le café artisanal à Paris.<br />
              Créer, déguster, partager.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/coffeearts.paris/" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-primary transition-all duration-300" aria-label="Instagram Coffee Arts Paris">
                <Instagram size={20} />
              </Link>
              <Link
                href="https://www.tiktok.com/@coffeeartsparis"
                className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-primary transition-all duration-300 relative group"
                aria-label="TikTok Coffee Arts Paris"
              >
                <span className="block h-5 w-5 relative">
                  <Image
                    src="/tiktok-beige.png"
                    alt="TikTok"
                    fill
                    sizes="20px"
                    className="object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-0"
                    style={{ filter: "brightness(1.15)" }}
                  />
                  <Image
                    src="/tiktok-green.png"
                    alt="TikTok"
                    fill
                    sizes="20px"
                    className="object-contain transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                  />
                </span>
              </Link>
            </div>
          </div>

          {/* Links - Two columns */}
          <div
            className="grid grid-cols-2"
            style={{
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            <h3 className="col-span-2 font-bold text-lg mb-3 text-center" style={{ color: "#e9d7c1", marginLeft: "-80px" }}>Découvrir</h3>
            <div>
              <ul className="space-y-2">
                {[
                  { label: "Café", href: "/carte" },
                  { label: "Céramique", href: "/ateliers" },
                  { label: "Boutique", href: "/boutique" },
                  { label: "Evénements", href: "/evenements" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ul className="space-y-2">
                {[
                  { label: "Blog", href: "/blog" },
                  { label: "À propos", href: "/apropos" },
                  { label: "Contact", href: "/contact" },
                  { label: "Espace client", href: "/espace-client" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-foreground/80 hover:text-accent hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact */}
          <div
            style={{
              marginLeft: "var(--footer-col3-ml, 0px)",
              marginRight: "var(--footer-col3-mr, 0px)",
            }}
          >
            <h3 className="font-bold text-lg mb-3" style={{ color: "#e9d7c1" }}>Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-primary-foreground/80 group">
                <span>07.66.91.82.94</span>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80 group">
                <Link 
                  href="mailto:coffeeartsparis@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  coffeeartsparis@gmail.com
                </Link>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/80 group">
                <span>25 Boulevard du Temple<br />75003 Paris</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div
            style={{
              marginLeft: "var(--footer-col4-ml, 0px)",
              marginRight: "var(--footer-col4-mr, 0px)",
            }}
          >
            <h3 className="font-bold text-lg mb-3" style={{ color: "#e9d7c1" }}>Horaires</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              <li className="border-b border-primary-foreground/10 pb-1 space-y-1">
                <div>Mardi - Mercredi - Jeudi - Vendredi</div>
                <div className="font-medium">08h - 20h</div>
              </li>
              <li className="border-b border-primary-foreground/10 pb-1 space-y-1">
                <div>Samedi - Dimanche</div>
                <div className="font-medium">10h - 21h</div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-4 mt-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} Coffee Arts Paris. Tous droits réservés.</p>
            
            {/* Payment Icons */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {/* Mastercard */}
              <div className="bg-white rounded-lg flex items-center justify-center shadow-sm w-10 h-10 p-1">
                <Image
                  src="/mastercard-png-8.png"
                  alt="Mastercard"
                  width={0}
                  height={0}
                  className="h-full w-full object-contain"
                />
              </div>
              {/* Visa */}
              <div className="bg-white rounded-lg flex items-center justify-center shadow-sm w-10 h-10 p-1.5">
                <Image
                  src="/visa-logo-png-transparent.png"
                  alt="Visa"
                  width={0}
                  height={0}
                  className="h-full w-full object-contain"
                />
              </div>
              {/* Google Pay */}
              <div className="bg-white rounded-lg flex items-center justify-center shadow-sm w-10 h-10 p-1.5">
                <Image
                  src="/Google_Pay_Logo.svg.webp"
                  alt="Google Pay"
                  width={0}
                  height={0}
                  className="h-full w-full object-contain"
                />
              </div>
              {/* Apple Pay */}
              <div className="bg-white rounded-lg flex items-center justify-center shadow-sm w-10 h-10 p-1.5">
                <Image
                  src="/Apple_Pay-Logo.wine.png"
                  alt="Apple Pay"
                  width={0}
                  height={0}
                  className="h-full w-full object-contain"
                />
              </div>
              {/* PayPal */}
              <div className="bg-white rounded-lg flex items-center justify-center shadow-sm w-10 h-10 p-1.5">
                <Image
                  src="/Paypal.png"
                  alt="PayPal"
                  width={0}
                  height={0}
                  className="h-3/4 w-3/4 object-contain"
                />
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex gap-6 flex-wrap justify-center md:justify-end">
              <Link href="/legal/politique-confidentialite" className="hover:text-accent transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/legal/cookies" className="hover:text-accent transition-colors">
                Politique cookies
              </Link>
              <Link href="/legal/mentions-legales" className="hover:text-accent transition-colors">
                Mentions légales
              </Link>
              <Link href="/legal/cgv" className="hover:text-accent transition-colors">
                CGV
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
