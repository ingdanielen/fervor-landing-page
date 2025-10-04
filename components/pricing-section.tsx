"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Check, Zap, Users, User, UsersRound } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const plans = [
  {
    name: "PAREJA",
    icon: Users,
    price: "$30.000",
    priceLabel: "pesos",
    description: "Opción más popular",
    features: ["Asientos preferenciales", "Comida gratis", "Acceso anticipado", "Meet and greet"],
    highlighted: false,
  },
  {
    name: "INDIVIDUAL",
    icon: User,
    price: "$15.000",
    priceLabel: "pesos",
    description: "Opción más popular",
    features: ["Asientos preferenciales", "Comida gratis", "Acceso anticipado", "Meet and greet"],
    highlighted: true,
  },
  {
    name: "GRUPO",
    icon: UsersRound,
    price: "$75.000",
    priceLabel: "pesos",
    description: "Opción más popular",
    features: ["Asientos preferenciales", "Comida gratis", "Acceso anticipado", "Meet and greet"],
    highlighted: false,
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const [activeCard, setActiveCard] = useState(1) // Individual is default active
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        opacity: 0,
        scale: 0.3,
        rotationY: 180,
        y: 100,
        duration: 1.2,
        ease: "back.out(2)",
      })

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.3,
        ease: "elastic.out(1, 0.5)",
      })

      gsap.from(badgeRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.5,
        ease: "power2.out",
      })

      // Animación de entrada de las cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return

        gsap.from(card, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          y: 200,
          scale: 0.8,
          rotationY: 0,
          rotationZ: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: index * 0.2,
        })
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      const isActive = index === activeCard
      const isLeft = index < activeCard
      const isRight = index > activeCard
      const distance = Math.abs(index - activeCard)

      let x = 0
      let y = 0
      let z = 0
      let rotationY = 0
      let rotationZ = 0
      let scale = 1
      let opacity = 1

      if (isActive) {
        // Tarjeta activa en el centro
        x = 0
        y = 0
        z = 100
        rotationY = 0
        rotationZ = 0
        scale = 1
        opacity = 1
      } else if (isLeft) {
        // Tarjeta izquierda: parte superior hacia afuera (rotación sutil)
        x = -distance * 280
        y = distance * 20
        z = -distance * 120
        rotationY = -15 - (distance * 5) // Inclinación sutil hacia afuera
        rotationZ = -8 - (distance * 4) // Inclinación ligera hacia afuera
        scale = 0.85 - (distance * 0.05)
        opacity = 0.8 - (distance * 0.1)
      } else if (isRight) {
        // Tarjeta derecha: parte superior hacia afuera (rotación sutil)
        x = distance * 280
        y = distance * 20
        z = -distance * 120
        rotationY = 15 + (distance * 5) // Inclinación sutil hacia afuera
        rotationZ = 8 + (distance * 3) // Inclinación ligera hacia afuera
        scale = 0.85 - (distance * 0.05)
        opacity = 0.8 - (distance * 0.1)
      }

      gsap.to(card, {
        x,
        y,
        z,
        rotationY,
        rotationZ,
        scale,
        opacity,
        zIndex: isActive ? 50 : 30 - distance * 5,
        duration: 0.6,
        ease: "power2.out",
        transformOrigin: "center center",
      })
    })
  }, [activeCard])

  const handleCardInteraction = (index: number) => {
    setActiveCard(index)
  }

  // Funciones para el comportamiento de arrastre en mobile
  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    setStartX(clientX)
    setDragOffset(0)
  }

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return
    const diff = clientX - startX
    setDragOffset(diff)
  }

  const handleDragEnd = () => {
    if (!isDragging) return

    if (dragOffset > 100) {
      setActiveCard((prev) => (prev === 0 ? plans.length - 1 : prev - 1))
    } else if (dragOffset < -100) {
      setActiveCard((prev) => (prev + 1) % plans.length)
    }

    setIsDragging(false)
    setDragOffset(0)
  }

  return (
    <section ref={sectionRef} id="inscripcion" className="py-16 md:py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6 md:mb-8">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 text-white tracking-tight"
            style={{ textShadow: "0 0 40px rgba(196, 255, 13, 0.5)" }}
          >
            INSCRIPCIÓN
          </h2>
          <p ref={subtitleRef} className="text-base md:text-lg lg:text-xl text-white/80 mb-6 md:mb-8 px-4">
            Elige la opción que mejor se adapte a ti
          </p>
        </div>

        <div ref={badgeRef} className="flex justify-center mb-10 md:mb-16 px-4">
          <div className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-[#c4ff0d] to-[#c4ff0d]/90 text-black px-4 md:px-8 py-3 md:py-4 rounded-full font-black text-xs md:text-sm uppercase tracking-wider shadow-xl text-center">
            <Zap className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
            <span className="text-balance">¡Precio especial hasta el 15 de Octubre!</span>
            <Zap className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto" style={{ perspective: "4000px" }}>
          {/* Desktop: Deck of cards effect */}
          <div className="hidden lg:flex justify-center items-center relative" style={{ height: "800px" }}>
            {plans.map((plan, index) => {
              const Icon = plan.icon
              const isActive = index === activeCard

              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardsRef.current[index] = el
                  }}
                  className={`absolute rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 border-2 transition-all duration-500 cursor-pointer ${
                    plan.highlighted
                      ? "bg-gradient-to-br from-[#c4ff0d] to-[#c4ff0d]/90 text-black border-[#c4ff0d] shadow-2xl shadow-[#c4ff0d]/30"
                      : "bg-black/60 backdrop-blur-sm text-white border-[#c4ff0d]/40"
                  }`}
                  style={{
                    width: "380px",
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => handleCardInteraction(index)}
                  onMouseEnter={(e) => {
                    if (isActive) {
                      gsap.to(e.currentTarget, {
                        y: -15,
                        scale: 1.03,
                        boxShadow: "0 30px 80px rgba(196, 255, 13, 0.4)",
                        duration: 0.15,
                        ease: "power2.out",
                      })
                    } else {
                      // Solo cambiar la tarjeta activa sin animaciones adicionales
                      handleCardInteraction(index)
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isActive) {
                      gsap.to(e.currentTarget, {
                        y: 0,
                        scale: 1,
                        boxShadow: "0 20px 60px rgba(196, 255, 13, 0.3)",
                        duration: 0.15,
                        ease: "power2.out",
                      })
                    }
                  }}
                >
                  <div className="flex justify-center mb-4 md:mb-6">
                    <div
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center ${
                        plan.highlighted ? "bg-black/20" : "bg-[#c4ff0d]/20"
                      }`}
                    >
                      <Icon
                        className={`h-8 w-8 md:h-10 md:w-10 ${plan.highlighted ? "text-black" : "text-[#c4ff0d]"}`}
                      />
                    </div>
                  </div>

                  <div className="text-center mb-6 md:mb-8">
                    <div
                      className={`inline-block px-4 md:px-6 py-1.5 md:py-2 rounded-full text-[10px] md:text-xs font-black mb-4 md:mb-6 uppercase tracking-wider ${
                        plan.highlighted ? "bg-black/20 text-black" : "bg-[#c4ff0d]/20 text-[#c4ff0d]"
                      }`}
                    >
                      {plan.name}
                    </div>

                    <div className="flex items-baseline justify-center gap-2 mb-2 md:mb-3">
                      <span className="text-4xl md:text-5xl lg:text-6xl font-black">{plan.price}</span>
                      <span className="text-xs md:text-sm opacity-70 font-bold">{plan.priceLabel}</span>
                    </div>
                    <p className={`text-xs md:text-sm font-bold ${plan.highlighted ? "opacity-80" : "opacity-70"}`}>
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 md:space-y-4 mb-6 md:mb-10">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 md:gap-3">
                        <div
                          className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center ${
                            plan.highlighted ? "bg-black/20" : "bg-[#c4ff0d]/20"
                          }`}
                        >
                          <Check
                            className={`h-3 w-3 md:h-4 md:w-4 ${plan.highlighted ? "text-black" : "text-[#c4ff0d]"} stroke-[3]`}
                          />
                        </div>
                        <span className="text-xs md:text-sm font-bold">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full font-black py-5 md:py-7 text-sm md:text-base rounded-xl md:rounded-2xl shadow-xl transition-all duration-300 ${
                      plan.highlighted
                        ? "bg-black text-[#c4ff0d] hover:bg-black/90"
                        : "bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90"
                    }`}
                  >
                    SELECCIONAR
                  </Button>
                </div>
              )
            })}
          </div>

          {/* Mobile: Horizontal scroll with indicators */}
          <div className="lg:hidden">
            <div
              className="relative w-full h-[500px] cursor-grab active:cursor-grabbing select-none"
              style={{ perspective: "1500px" }}
              onMouseDown={(e) => handleDragStart(e.pageX)}
              onMouseMove={(e) => handleDragMove(e.pageX)}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={(e) => handleDragStart(e.touches[0].pageX)}
              onTouchMove={(e) => handleDragMove(e.touches[0].pageX)}
              onTouchEnd={handleDragEnd}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {plans.map((plan, index) => {
                  let offset = index - activeCard
                  if (offset > plans.length / 2) offset -= plans.length
                  else if (offset < -plans.length / 2) offset += plans.length

                  const absOffset = Math.abs(offset)
                  const Icon = plan.icon

                  return (
                    <div
                      key={index}
                      className="absolute w-[300px] h-[450px] rounded-2xl overflow-hidden border-2 border-[#c4ff0d]/40 bg-black/60 backdrop-blur-sm transition-all duration-700"
                      style={{
                        transform: `translateX(${offset * 280 + dragOffset * 0.3}px) translateZ(${-absOffset * 200}px) rotateY(${offset * -25}deg) scale(${1 - absOffset * 0.15})`,
                        opacity: Math.max(0.3, 1 - absOffset * 0.2),
                        filter: `brightness(${1 - absOffset * 0.2}) blur(${absOffset * 1}px)`,
                        zIndex: 20 - absOffset,
                        transformStyle: "preserve-3d",
                      }}
                    >
                      <div className={`h-full p-6 ${plan.highlighted ? "text-black" : "text-white"}`}>
                        <div className="flex justify-center mb-4">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              plan.highlighted ? "bg-black/20" : "bg-[#c4ff0d]/20"
                            }`}
                          >
                            <Icon className={`h-8 w-8 ${plan.highlighted ? "text-black" : "text-[#c4ff0d]"}`} />
                          </div>
                        </div>

                        <div className="text-center mb-6">
                          <div
                            className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black mb-4 uppercase tracking-wider ${
                              plan.highlighted ? "bg-black/20 text-black" : "bg-[#c4ff0d]/20 text-[#c4ff0d]"
                            }`}
                          >
                            {plan.name}
                          </div>

                          <div className="flex items-baseline justify-center gap-2 mb-2">
                            <span className="text-4xl font-black">{plan.price}</span>
                            <span className="text-xs opacity-70 font-bold">{plan.priceLabel}</span>
                          </div>
                          <p className={`text-xs font-bold ${plan.highlighted ? "opacity-80" : "opacity-70"}`}>
                            {plan.description}
                          </p>
                        </div>

                        <ul className="space-y-3 mb-6">
                          {plan.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2">
                              <div
                                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                                  plan.highlighted ? "bg-black/20" : "bg-[#c4ff0d]/20"
                                }`}
                              >
                                <Check
                                  className={`h-3 w-3 ${plan.highlighted ? "text-black" : "text-[#c4ff0d]"} stroke-[3]`}
                                />
                              </div>
                              <span className="text-xs font-bold">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        <Button
                          className={`w-full font-black py-5 text-sm rounded-xl shadow-xl transition-all duration-300 ${
                            plan.highlighted
                              ? "bg-black text-[#c4ff0d] hover:bg-black/90"
                              : "bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90"
                          }`}
                          onClick={() => handleCardInteraction(index)}
                        >
                          SELECCIONAR
                        </Button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Indicadores de scroll */}
            <div className="flex justify-center gap-2 mt-6">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleCardInteraction(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeCard ? "bg-[#c4ff0d] scale-125" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* Indicador de arrastre */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center gap-2 text-white/60 text-xs">
                <div className="w-4 h-4 border border-white/30 rounded-full flex items-center justify-center">
                  <div className="w-1 h-1 bg-white/60 rounded-full"></div>
                </div>
                <span>Arrastra para ver más</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-xs md:text-sm text-white/60 italic">- Oferta por tiempo limitado -</p>
        </div>
      </div>
    </section>
  )
}
