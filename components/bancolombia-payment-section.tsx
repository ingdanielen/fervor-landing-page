"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function BancolombiaPaymentSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const greenCircleRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const ctx = gsap.context(() => {
      // Animación del círculo verde de fondo
      gsap.from(greenCircleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        scale: 0,
        opacity: 0,
        duration: 1.2,
        ease: "back.out(2)",
      })

      // Animación del teléfono
      gsap.from(phoneRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: -200,
        y: 100,
        rotation: -15,
        opacity: 0,
        duration: 1.5,
        delay: 0.2,
        ease: "power3.out",
      })

      // Animación del contenido de texto
      gsap.from([titleRef.current, textRef.current, buttonRef.current], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        x: 200,
        opacity: 0,
        duration: 1.2,
        delay: 0.4,
        stagger: 0.2,
        ease: "power2.out",
      })

      // Animación de entrada del contenedor de contenido
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        scale: 0.8,
        opacity: 0,
        duration: 1,
        delay: 0.3,
        ease: "power2.out",
      })
    })

    return () => ctx.revert()
  }, [isClient])

  if (!isClient) {
    return (
      <section className="py-16 md:py-24 lg:py-32 relative overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 "></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-center items-center min-h-[600px]">
            <div className=" backdrop-blur-md rounded-3xl p-8 w-full max-w-6xl h-[500px] animate-pulse"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-8 relative overflow-hidden min-h-screen flex items-center">
      {/* Fondo oscuro */}
      <div className="absolute inset-0 "></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Card principal que contiene todo */}
        <div className="backdrop-blur-md rounded-3xl p-6 md:p-4 border-2 border-gray-700/60 shadow-2xl relative overflow-visible max-w-7xl mx-auto h-auto md:h-96">
          {/* Círculo verde detrás del teléfono - fuera de la card para que se vea completo */}
          <div
            ref={greenCircleRef}
            className="absolute md:left-1/2 -translate-x-1/2 top-56  md:left-12 md:translate-x-0 md:top-1/2 transform md:-translate-y-1/2 w-[350px] h-[350px] md:w-[400px] md:h-[400px] rounded-full bg-[#A3FF00] opacity-80 z-10"
          ></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-8 lg:gap-12 xl:gap-16 relative z-20">
            {/* Sección del teléfono - sobresale de la card */}
            <div ref={phoneRef} className="flex-shrink-0 relative z-30 w-full md:w-auto order-1 md:order-1">
              <div className="relative mx-auto w-[380px] h-[600px] md:absolute md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 md:w-[450px] md:h-[800px]">
                <Image
                  src="/images/pagos/phone-banco.png"
                  alt="Teléfono mostrando pago con Bancolombia"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 380px, 600px"
                  style={{
                    filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3))",
                  }}
                />
              </div>
            </div>

            {/* Sección de contenido */}
            <div ref={contentRef} className="flex-1 max-w-2xl order-2 md:order-2 text-center md:text-left">
              {/* Título principal */}
              <h2
                ref={titleRef}
                className="flex flex-col text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 md:mb-4 leading-tight"
              >
                <span className="text-[#A3FF00]">Paga fácil y seguro</span>
                <span className="text-white">con Bancolombia</span>
              </h2>

              {/* Texto descriptivo */}
              <p
                ref={textRef}
                className="text-white text-base md:text-lg lg:text-xl lg:max-w-full md:max-w-xl mb-6 md:mb-4 leading-relaxed"
              >
                Haz tu pago desde Bancolombia App, A la Mano o Nequi. Verifica el número o escanea el QR, ingresa el
                valor y en detalle escribe tu cédula y "Pago manilla Fervor" para registrar tu aporte.
              </p>

              {/* Botón de acción */}
              <Button
                ref={buttonRef}
                size="lg"
                className="bg-[#A3FF00] text-black hover:bg-[#A3FF00]/90 font-black px-8 sm:px-8 md:px-10 lg:px-12 py-4 sm:py-4 md:py-5 lg:py-6 text-base sm:text-lg md:text-xl rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-[#A3FF00]/30 transform hover:scale-105 w-full md:w-auto"
              >
                REALIZAR PAGO
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
