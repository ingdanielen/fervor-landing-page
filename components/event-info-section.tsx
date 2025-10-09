"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, Clock, MapPin, Users, Sparkles, Star, Heart, Zap, Navigation } from "lucide-react"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

export function EventInfoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const infoRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación simple y fluida del título
      gsap.fromTo(titleRef.current, {
        opacity: 0,
        y: -30,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2,
      })

      // Animación del subtítulo
      gsap.fromTo(subtitleRef.current, {
        opacity: 0,
        y: 20,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.4,
      })

      // Animación de la imagen
      gsap.fromTo(imageRef.current, {
        opacity: 0,
        scale: 0.95,
        y: 30,
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.6,
      })

      // Animación de la información
      gsap.fromTo(infoRef.current, {
        opacity: 0,
        x: 30,
      }, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.8,
      })

      // Animación de partículas simple
      if (particlesRef.current) {
        const particles = particlesRef.current.children
        Array.from(particles).forEach((particle, index) => {
          gsap.fromTo(particle, {
            opacity: 0,
            y: 20,
          }, {
            opacity: 0.2,
            y: 0,
            duration: 1,
            delay: 1 + (index * 0.1),
            ease: "power2.out",
            repeat: -1,
            yoyo: true,
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  const eventInfo = {
    date: "19 de octubre de 2025",
    time: "3:00 p. m. a 8:00 p. m.",
    location: "IPUC Soledad Central",
    address: "Cra. 26 #24-14, Soledad, Atlántico",
    experience: "Encuentro de adoración, unidad y poder del Espíritu Santo"
  }

  return (
    <section ref={sectionRef} className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
      {/* Fondo alineado con el visual key del proyecto */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-black" />
      
      {/* Efectos de partículas optimizados */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#c4ff0d] rounded-full opacity-20"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 15}%`,
            }}
          />
        ))}
      </div>

      {/* Efectos de luz optimizados */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-[#c4ff0d]/2 rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[#c4ff0d]/3 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Título principal */}
        <div className="text-center mb-8 md:mb-12">
          
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-5 text-white leading-tight"
            style={{ 
              textShadow: "0 0 30px rgba(196, 255, 13, 0.5)",
            }}
          >
            INFORMACIÓN
            <span className="ml-2 text-[#c4ff0d]">DEL EVENTO</span>
          </h2>
          
          <p
            ref={subtitleRef}
            className="text-base md:text-lg  text-white/90 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            En tiempos en que el ruido del mundo intenta apagar la fe,{" "}
            <span className="text-[#c4ff0d] font-bold">Fervor es una invitación a volver al fuego original</span>: 
            la presencia viva de Dios. Más que un evento, es una experiencia diseñada para{" "}
            <span className="text-[#c4ff0d] font-bold">renovar tu pasión, fortalecer tu fe y reavivar</span> lo que Dios depositó en ti.
          </p>
        </div>

        {/* Layout principal: Imagen + Información */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-7xl mx-auto">
          
          {/* Columna izquierda: Imagen de la iglesia con diseño épico */}
          <div ref={imageRef} className="relative">
            <div className="relative bg-black/60 backdrop-blur-sm border border-[#c4ff0d]/40 rounded-2xl p-5 md:p-6 shadow-xl overflow-hidden group hover:border-[#c4ff0d] transition-all duration-300">
              {/* Efectos de glow sutiles */}
              <div className="absolute inset-0 bg-[#c4ff0d]/5 rounded-2xl blur-xl" />
              
              {/* Imagen de la iglesia con efectos épicos */}
              <div className="relative aspect-[4/3] rounded-md overflow-hidden group mb-2">
                <Image
                  src="/images/location/soledad.png"
                  alt="IPUC Soledad Central - Ubicación del evento Fervor"
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Badge de ubicación épico */}
                <div className="absolute top-6 left-6 bg-gradient-to-r from-[#c4ff0d] to-[#a8d900] text-black px-4 py-2 rounded-full font-black text-sm flex items-center gap-2 shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform duration-300">
                  <Navigation className="h-4 w-4" />
                  UBICACIÓN
                </div>

                {/* Efectos de partículas en la imagen */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[#c4ff0d] rounded-full opacity-60 animate-ping"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.5}s`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Información de la iglesia con diseño impactante */}
              <div className="space-y-2">
                <div className="flex items-center gap-4 p-3 bg-[#c4ff0d]/10 rounded-xl border border-[#c4ff0d]/30 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c4ff0d] to-[#a8d900] flex items-center justify-center shadow-lg">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-[#c4ff0d] font-black text-xl">{eventInfo.location}</h3>
                    <p className="text-white/80 text-sm font-medium">{eventInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 p-3 bg-[#c4ff0d]/10 rounded-xl border border-[#c4ff0d]/30 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c4ff0d] to-[#a8d900] flex items-center justify-center shadow-lg">
                    <Users className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <h3 className="text-[#c4ff0d] font-black text-xl">Experiencia</h3>
                    <p className="text-white/80 text-sm font-medium">{eventInfo.experience}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Información del evento con diseño épico */}
          <div ref={infoRef} className="space-y-3">
            
            {/* Fecha y Hora con diseño impactante */}
            <div className="bg-black/60 backdrop-blur-sm border border-[#c4ff0d]/40 rounded-2xl p-5 md:p-6 shadow-xl hover:border-[#c4ff0d] transition-all duration-300 group">
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c4ff0d] to-[#a8d900] flex items-center justify-center shadow-xl">
                    <Calendar className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-[#c4ff0d] font-black text-2xl">Fecha del Evento</h3>
                    <p className="text-white/70 text-sm font-medium">Sábado de bendición</p>
                  </div>
                </div>
                
                <div className="mb-2 p-2 bg-[#c4ff0d]/10 rounded-xl border border-[#c4ff0d]/30">
                  <p className="text-white font-black text-xl md:text-2xl text-center">{eventInfo.date}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c4ff0d] to-[#a8d900] flex items-center justify-center shadow-xl">
                    <Clock className="h-8 w-8 text-black" />
                  </div>
                  <div>
                    <h3 className="text-[#c4ff0d] font-black text-2xl">Horario</h3>
                    <p className="text-white font-black text-xl md:text-2xl">{eventInfo.time}</p>
                    <p className="text-white/70 text-sm font-medium">5 horas de bendición continua</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Información adicional con diseño épico */}
            <div className="bg-black/60 backdrop-blur-sm border border-[#c4ff0d]/40 rounded-lg p-5 md:p-6 shadow-xl hover:border-[#c4ff0d] transition-all duration-300 group">
              
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c4ff0d] to-[#a8d900] flex items-center justify-center shadow-xl">
                    <Zap className="h-8 w-8 text-black animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-[#c4ff0d] font-black text-2xl">¿Qué esperar?</h3>
                    <p className="text-white/70 text-sm font-medium">Una experiencia transformadora</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Encuentro genuino con la presencia de Dios",
                    "Unidad en fe y propósito con la comunidad",
                    "Transformación espiritual profunda",
                    "Tres sesiones poderosas con predicadores ungidos"
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-[#c4ff0d]/10 rounded-lg border border-[#c4ff0d]/30">
                      <div className="w-3 h-3 bg-[#c4ff0d] rounded-full animate-pulse" />
                      <span className="text-white/90 text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Llamada a la acción épica */}
            <div className="text-center">
              <div className="inline-flex items-center gap-3 bg-[#c4ff0d]/10 backdrop-blur-sm border border-[#c4ff0d]/40 rounded-full px-6 py-3 shadow-lg hover:border-[#c4ff0d] transition-all duration-300">
                <Heart className="h-5 w-5 text-[#c4ff0d] animate-pulse" />
                <span className="text-white font-black text-sm md:text-base">
                  ¡No te pierdas esta experiencia transformadora!
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
