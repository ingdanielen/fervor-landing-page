"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Flame, ArrowRight, Sparkles, Heart, Zap } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function CallToHeavenSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const verseRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación épica del título con efectos de partículas
      gsap.fromTo(titleRef.current, {
        opacity: 0,
        scale: 0.3,
        rotationX: 90,
        y: -200,
        filter: "blur(20px) brightness(0)",
      }, {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        y: 0,
        filter: "blur(0px) brightness(1)",
        duration: 2,
        ease: "elastic.out(1, 0.8)",
        delay: 0.2,
        onComplete: () => {
          setIsVisible(true)
          // Efecto de pulso continuo en el título
          gsap.to(titleRef.current, {
            textShadow: "0 0 60px rgba(196, 255, 13, 0.8), 0 0 120px rgba(196, 255, 13, 0.4)",
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut"
          })
        }
      })

      // Animación dramática del versículo
      gsap.fromTo(verseRef.current, {
        opacity: 0,
        scale: 0.8,
        rotationY: 45,
        y: 100,
        filter: "blur(10px)",
      }, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        y: 0,
        filter: "blur(0px)",
        duration: 1.5,
        delay: 0.8,
        ease: "power3.out",
      })

      // Animación del texto descriptivo
      gsap.from(descriptionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 1.2,
        ease: "power2.out",
      })

      // Animación épica del botón
      gsap.fromTo(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
        rotation: -180,
        y: 100,
        filter: "blur(15px) brightness(0)",
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        filter: "blur(0px) brightness(1)",
        duration: 1.5,
        delay: 1.6,
        ease: "elastic.out(1, 0.6)",
      })

      // Animación de partículas de fondo
      if (particlesRef.current) {
        const particles = particlesRef.current.children
        Array.from(particles).forEach((particle, index) => {
          gsap.fromTo(particle, {
            opacity: 0,
            scale: 0,
            y: Math.random() * 200 + 100,
            x: Math.random() * 400 - 200,
            rotation: Math.random() * 360,
          }, {
            opacity: 0.6,
            scale: 1,
            y: 0,
            x: 0,
            rotation: 360,
            duration: 2 + Math.random() * 2,
            delay: index * 0.1,
            ease: "power2.out",
            repeat: -1,
            yoyo: true,
          })
        })
      }

      // Efectos de hover en el botón
      buttonRef.current?.addEventListener("mouseenter", () => {
        gsap.to(buttonRef.current, {
          scale: 1.05,
          boxShadow: "0 0 50px rgba(196, 255, 13, 0.8), 0 0 100px rgba(196, 255, 13, 0.4)",
          duration: 0.3,
          ease: "power2.out"
        })
      })

      buttonRef.current?.addEventListener("mouseleave", () => {
        gsap.to(buttonRef.current, {
          scale: 1,
          boxShadow: "0 0 30px rgba(196, 255, 13, 0.5)",
          duration: 0.3,
          ease: "power2.out"
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Fondo alineado con el visual key del proyecto */}
      <div className="absolute inset-0 b" />
      
      {/* Efectos de partículas sutiles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#c4ff0d] rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Efectos de luz sutiles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-[#c4ff0d]/3 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-[#c4ff0d]/2 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Layout responsive: Desktop horizontal, Mobile vertical */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[60vh] lg:min-h-[70vh]">
            
            {/* Columna izquierda: Título y versículo */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8">
              {/* Icono compacto */}
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-[#c4ff0d] rounded-full blur-xl opacity-30 animate-pulse" />
                  <div className="relative bg-gradient-to-br from-[#c4ff0d] to-[#a8d900] p-4 md:p-5 rounded-full shadow-xl">
                    <Flame className="h-8 w-8 md:h-10 md:w-10 text-black" />
                  </div>
                </div>
              </div>

              {/* Título principal */}
              <h2
                ref={titleRef}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight"
                style={{ 
                  textShadow: "0 0 30px rgba(196, 255, 13, 0.5)",
                }}
              >
                UN LLAMADO
                <br />
                <span className="text-[#c4ff0d]">DEL CIELO</span>
              </h2>

              {/* Versículo bíblico compacto */}
              <div
                ref={verseRef}
                className="relative"
              >
                <div className="bg-black/60 backdrop-blur-sm border border-[#c4ff0d]/40 rounded-2xl p-6 md:p-8 shadow-xl">
                  <div className="flex items-center justify-center lg:justify-start mb-4">
                    <Zap className="h-5 w-5 text-[#c4ff0d] mr-2 animate-pulse" />
                    <span className="text-[#c4ff0d] font-bold text-sm md:text-base">PALABRA DE DIOS</span>
                    <Zap className="h-5 w-5 text-[#c4ff0d] ml-2 animate-pulse" />
                  </div>
                  
                  <blockquote className="text-lg md:text-xl lg:text-2xl font-bold text-[#c4ff0d] mb-4 italic leading-relaxed">
                    "El fervor del Espíritu nos impulsa a servir al Señor con pasión."
                  </blockquote>
                  
                  <div className="flex items-center justify-center lg:justify-start">
                    <div className="w-8 h-0.5 bg-[#c4ff0d] mr-3" />
                    <cite className="text-sm md:text-base text-white/80 font-semibold not-italic">
                      Romanos 12:11
                    </cite>
                    <div className="w-8 h-0.5 bg-[#c4ff0d] ml-3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Columna derecha: Descripción y botón */}
            <div className="text-center lg:text-left space-y-6 md:space-y-8 flex flex-col justify-center">
              {/* Texto descriptivo */}
              <p
                ref={descriptionRef}
                className="text-base md:text-lg lg:text-xl text-white/90 leading-relaxed font-medium"
              >
                Este es tu momento. Dios te está llamando a una experiencia que{" "}
                <span className="text-[#c4ff0d] font-bold">transformará tu vida espiritual</span>. 
                No dejes pasar esta oportunidad de estar en la presencia del Señor junto a hermanos que comparten tu misma pasión por adorarle.{" "}
                <span className="text-[#c4ff0d] font-bold">Fervor será un hito en tu caminar con Cristo</span>.
              </p>

              {/* Botón épico */}
              <div className="flex justify-center lg:justify-start">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#c4ff0d] rounded-xl blur-xl opacity-30 animate-pulse" />
                  <Button
                    ref={buttonRef}
                    size="lg"
                    className="relative bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90 font-black px-8 md:px-10 py-4 md:py-5 text-lg md:text-xl transition-all duration-300 shadow-xl border-2 border-[#c4ff0d] hover:border-white transform hover:scale-105"
                    style={{
                      boxShadow: "0 0 20px rgba(196, 255, 13, 0.4)",
                    }}
                  >
                    <ArrowRight className="h-5 w-5 md:h-6 md:w-6 mr-2" />
                    INSCRIBIRME AHORA
                    <Sparkles className="h-4 w-4 md:h-5 md:w-5 ml-2 animate-bounce" />
                  </Button>
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-4">
                <Heart className="h-5 w-5 text-[#c4ff0d] animate-pulse" />
                <span className="text-white/70 text-sm md:text-base font-medium">
                  Experiencia transformadora
                </span>
                <Sparkles className="h-5 w-5 text-[#c4ff0d] animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Efectos de borde sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c4ff0d]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c4ff0d]/30 to-transparent" />
      </div>
    </section>
  )
}
