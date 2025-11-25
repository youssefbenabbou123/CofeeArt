import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-neutral-light py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-2xl font-extrabold mb-2 text-primary-foreground">COFFEE ARTS</div>
            <p className="text-primary-foreground text-sm opacity-90">
              Un lieu unique où la céramique rencontre le café artisanal à Paris.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-bold text-primary-foreground mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-primary-foreground hover:text-accent transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/ateliers" className="text-primary-foreground hover:text-accent transition-colors">
                  Ateliers
                </Link>
              </li>
              <li>
                <Link href="/boutique" className="text-primary-foreground hover:text-accent transition-colors">
                  Boutique
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-foreground hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-primary-foreground mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-foreground">
              <li className="flex items-center gap-2">
                <Phone size={16} /> +33 1 XX XX XX XX
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} /> hello@coffeearts.fr
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} /> Paris, France
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-bold text-primary-foreground mb-4">Horaires</h3>
            <ul className="space-y-2 text-sm text-primary-foreground">
              <li>Lundi - Jeudi: 10h-20h</li>
              <li>Vendredi - Samedi: 10h-22h</li>
              <li>Dimanche: 11h-19h</li>
              <li className="text-accent">Fermé les jours fériés</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-primary-light my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground">
          <p>&copy; 2025 Coffee Arts Paris. Tous droits réservés.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-primary-foreground hover:text-accent transition-colors">
              Politique de confidentialité
            </Link>
            <Link href="#" className="text-primary-foreground hover:text-accent transition-colors">
              Conditions d'utilisation
            </Link>
            <Link href="#" className="text-primary-foreground hover:text-accent transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
