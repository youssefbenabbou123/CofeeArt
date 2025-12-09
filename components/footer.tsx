import Link from "next/link"
import { Mail, MapPin, Phone, Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <div className="text-3xl font-extrabold mb-2 tracking-tight">COFFEE ARTS</div>
              <div className="h-1 w-12 bg-accent rounded-full"></div>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Un lieu unique où la céramique rencontre le café artisanal à Paris. Créer, déguster, partager.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="p-2 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-primary transition-all duration-300">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-accent">Découvrir</h3>
            <ul className="space-y-4">
              {[
                { label: "Accueil", href: "/" },
                { label: "Nos Ateliers", href: "/ateliers" },
                { label: "La Boutique", href: "/boutique" },
                { label: "Le Blog", href: "/blog" },
                { label: "À Propos", href: "/apropos" },
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

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-accent">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-primary-foreground/80 group">
                <Phone size={20} className="mt-1 text-accent group-hover:text-white transition-colors" />
                <span>+33 1 42 55 66 77</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80 group">
                <Mail size={20} className="mt-1 text-accent group-hover:text-white transition-colors" />
                <span>hello@coffeearts.fr</span>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80 group">
                <MapPin size={20} className="mt-1 text-accent group-hover:text-white transition-colors" />
                <span>25 Boulevard du Temple<br />75003 PARIS</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-accent">Horaires</h3>
            <ul className="space-y-3 text-primary-foreground/80">
              <li className="flex justify-between border-b border-primary-foreground/10 pb-2">
                <span>Mardi - Mercredi - Jeudi - Vendredi</span>
                <span className="font-medium">08h - 20h</span>
              </li>
              <li className="flex justify-between border-b border-primary-foreground/10 pb-2">
                <span>Samedi - Dimanche</span>
                <span className="font-medium">10h - 21h</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-foreground/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/60 gap-4">
            <p>&copy; {new Date().getFullYear()} Coffee Arts Paris. Tous droits réservés.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-accent transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="#" className="hover:text-accent transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
