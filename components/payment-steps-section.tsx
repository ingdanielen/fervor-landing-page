"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Camera, Smartphone, Image as ImageIcon } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function PaymentStepsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const [isClient, setIsClient] = useState(false)

  const steps = [
    {
      number: "1",
      icon: Camera,
      title: "¡Toma un Screenshot!",
      description: "Tómale una captura de pantalla a este código QR."
    },
    {
      number: "2", 
      icon: Smartphone,
      title: "Paga con tu App",
      description: "Abre tu app de Nequi o Bancolombia Personas. Ve a la opción \"Escanear QR\"."
    },
    {
      number: "3",
      icon: ImageIcon,
      title: "Usa tu Foto", 
      description: "Selecciona la opción \"Escanear desde Fotos\" y elige el screenshot. ¡Confirma el pago y listo!"
    }
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      // Animación del contenedor principal
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

      // Animación del título
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

      // Animación de los pasos
      stepsRef.current.forEach((step, index) => {
        if (!step) return

        gsap.from(step, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          opacity: 0,
          y: 50,
          scale: 0.5,
          rotation: -10,
          duration: 1,
          delay: 0.4 + (index * 0.15),
          ease: "elastic.out(1, 0.5)",
        })
      })
    })

    return () => ctx.revert()
  }, [isClient])

  if (!isClient) {
    return (
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-700 rounded  mb-4"></div>
            <div className="h-4 bg-gray-700 rounded  w-3/4 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800/50 rounded-2xl p-6 h-64 "></div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div 
            ref={containerRef}
            className="rounded-2xl md:rounded-3xl border border-[#c4ff0d]/30 md:border-2 glass-effect p-6 md:p-8 lg:p-12"
          >
            
            {/* Título */}
            <div ref={titleRef} className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-balance">
                Paga en <span className="text-[#c4ff0d]">Sencillos Pasos</span>
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-2 text-balance">
                Sigue estos pasos simples para realizar tu pago de forma rápida y segura
              </p>
            </div>

            {/* Pasos */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon
                return (
                  <div
                    key={index}
                    ref={(el) => {
                      stepsRef.current[index] = el
                    }}
                    className="text-center bg-gray-800/20 border-2 border-gray-700/30 rounded-2xl p-3"
                  >
                    {/* Número con fondo verde */}
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-[#c4ff0d] rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-black font-black text-lg md:text-xl">{step.number}</span>
                      </div>
                    </div>

                    {/* Ícono */}
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c4ff0d]/20 flex items-center justify-center border border-[#c4ff0d]/30">
                        <Icon className="h-5 w-5 md:h-6 md:w-6 text-[#c4ff0d]" />
                      </div>
                    </div>

                    {/* Título */}
                    <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">
                      {step.title}
                    </h3>

                    {/* Descripción */}
                    <p className="text-xs md:text-sm text-muted-foreground text-balance">
                      {step.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
