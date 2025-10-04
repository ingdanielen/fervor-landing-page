"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Shield, CreditCard, Headphones } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function PaymentSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        scale: 0.9,
        y: 60,
        duration: 1,
        ease: "power3.out",
      })

      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
      })

      gsap.from(iconsRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 60,
        scale: 0.5,
        rotation: -10,
        duration: 1,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="pagos" className="py-12 md:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div
            ref={containerRef}
            className="rounded-2xl md:rounded-3xl border border-[#c4ff0d]/30 md:border-2 glass-effect p-6 md:p-8 lg:p-12"
          >
            <div ref={titleRef} className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-balance">
                PROCESO DE PAGO SEGURO
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-2 text-balance">
                Utiliza Wompi para realizar tu pago de forma segura y confiable
              </p>
              <Button
                size="lg"
                className="bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90 gap-2 text-sm md:text-base w-full sm:w-auto"
              >
                <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-[#c4ff0d]" />
                PAGAR CON WOMPI
              </Button>
            </div>

            <div ref={iconsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c4ff0d]/20 flex items-center justify-center mx-auto mb-2 md:mb-3 border border-[#c4ff0d]/30">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-[#c4ff0d]" />
                </div>
                <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">100% Seguro</h3>
                <p className="text-xs md:text-sm text-muted-foreground text-balance">
                  Tus datos están protegidos con encriptación SSL
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c4ff0d]/20 flex items-center justify-center mx-auto mb-2 md:mb-3 border border-[#c4ff0d]/30">
                  <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-[#c4ff0d]" />
                </div>
                <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Múltiples métodos</h3>
                <p className="text-xs md:text-sm text-muted-foreground text-balance">
                  Tarjetas, PSE, Efecty y más opciones disponibles
                </p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c4ff0d]/20 flex items-center justify-center mx-auto mb-2 md:mb-3 border border-[#c4ff0d]/30">
                  <Headphones className="h-5 w-5 md:h-6 md:w-6 text-[#c4ff0d]" />
                </div>
                <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Soporte 24/7</h3>
                <p className="text-xs md:text-sm text-muted-foreground text-balance">
                  Estamos disponibles para ayudarte en todo momento
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-[#c4ff0d]/20">
              <div>
                <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Términos y condiciones:</h4>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>• Reembolsos disponibles hasta 7 días antes del evento</li>
                  <li>• Las entradas incluyen IVA</li>
                  <li>• El certificado de entrada se enviará por email</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">¿Necesitas ayuda?</h4>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                  <li>• soporte@fervor.com</li>
                  <li>• WhatsApp: +57 300 123 4567</li>
                  <li>• Lun-Vie: 9AM-6PM</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
