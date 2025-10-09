import Link from "next/link"
import { Flame, Facebook, Instagram, Twitter, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[#c4ff0d]/20 glass-effect">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3 md:mb-4">
              <Flame className="h-5 w-5 md:h-6 md:w-6 text-[#c4ff0d]" />
              <span className="text-lg md:text-xl font-bold">FERVOR</span>
            </Link>
            <p className="text-xs md:text-sm text-muted-foreground text-balance">
              Tarde de alabanza y adoración • Experimentando la presencia de Dios
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Enlaces</h3>
            <ul className="space-y-2 text-xs md:text-sm">
              <li>
                <Link href="#home" className="text-muted-foreground hover:text-[#c4ff0d] transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#predicadores" className="text-muted-foreground hover:text-[#c4ff0d] transition-colors">
                  Predicadores
                </Link>
              </li>
              <li>
                <Link href="#galeria" className="text-muted-foreground hover:text-[#c4ff0d] transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="#pagos" className="text-muted-foreground hover:text-[#c4ff0d] transition-colors">
                  Pagos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Contacto</h3>
            <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
              <li>IPUC Soledad Central</li>
              <li>Cra. 26 #24-14</li>
              <li>Soledad, Atlántico</li>
              <li>soporte@fervor.com</li>
              <li>WhatsApp: +57 300 123 4567</li>
              <li>(Lun-Vie, 9:00 a. m. a 6:00 p. m.)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Síguenos</h3>
            <div className="flex gap-3 md:gap-4">
              <Link
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#c4ff0d]/10 border border-[#c4ff0d]/30 flex items-center justify-center hover:bg-[#c4ff0d] hover:text-black transition-all"
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#c4ff0d]/10 border border-[#c4ff0d]/30 flex items-center justify-center hover:bg-[#c4ff0d] hover:text-black transition-all"
              >
                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#c4ff0d]/10 border border-[#c4ff0d]/30 flex items-center justify-center hover:bg-[#c4ff0d] hover:text-black transition-all"
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
              <Link
                href="#"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#c4ff0d]/10 border border-[#c4ff0d]/30 flex items-center justify-center hover:bg-[#c4ff0d] hover:text-black transition-all"
              >
                <Youtube className="h-4 w-4 md:h-5 md:w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-[#c4ff0d]/20 text-center text-xs md:text-sm text-muted-foreground">
          <p>© 2025 Fervor • Todos los derechos reservados</p>
        </div>
      </div>
    </footer>
  )
}
