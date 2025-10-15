"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, CreditCard, Headphones, Mail, MessageCircle, Clock, Users, User } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function SecurePaymentSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const termsRef = useRef<HTMLDivElement>(null)
  const helpRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const [activePaymentType, setActivePaymentType] = useState(0) // 0: Individual, 1: Múltiple
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  const paymentTypes = [
    {
      id: 0,
      name: "PAGO INDIVIDUAL",
      icon: User,
      description: "Para una sola entrada/manilla",
      qrImage: "/images/pagos/QR.png",
      price: "$12.000",
      features: [
        "Una entrada al evento",
        "Escoge tu asiento libremente",
        "Pago directo y seguro"
      ]
    },
    {
      id: 1,
      name: "PAGO MÚLTIPLE",
      icon: Users,
      description: "Para múltiples entradas/manillas",
      qrImage: "/images/pagos/multipay.jpeg",
      price: "Desde $12.000",
      features: [
        "Múltiples entradas",
        "Ideal para grupos y familias",
        "Pago consolidado"
      ]
    }
  ]

  const features = [
    {
      icon: Shield,
      title: "Privacidad Total",
      description: "Tus datos están protegidos con encriptación SSL"
    },
    {
      icon: CreditCard,
      title: "Múltiples métodos",
      description: "Paga con Tarjetas, PSE, Efecty, Nequi, Bancolombia y más."
    },
    {
      icon: Headphones,
      title: "Soporte 24/7",
      description: "Equipo disponible para ayudarte en todo momento"
    }
  ]

  const terms = [
    "Reembolsos disponibles hasta 7 días antes del evento",
    "Los precios incluyen IVA",
    "El certificado se entrega al finalizar el evento"
  ]

  const helpItems = [
    { icon: Mail, text: "decomtrupillos@gmail.com" },
    { icon: MessageCircle, text: "WhatsApp: +57 300 123 4567" },
    { icon: Clock, text: "Lun-Vie 9AM-6PM" }
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

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
      setActivePaymentType((prev) => (prev === 0 ? paymentTypes.length - 1 : prev - 1))
    } else if (dragOffset < -100) {
      setActivePaymentType((prev) => (prev + 1) % paymentTypes.length)
    }

    setIsDragging(false)
    setDragOffset(0)
  }

  const handlePaymentTypeChange = (index: number) => {
    setActivePaymentType(index)
  }

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

      // Animación del QR
      gsap.from(qrRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.8,
        duration: 1,
        delay: 0.2,
        ease: "back.out(1.7)",
      })

      // Animación de las características
      if (featuresRef.current) {
        gsap.from(featuresRef.current.children, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          opacity: 0,
          y: 50,
          scale: 0.5,
          rotation: -10,
          duration: 1,
          stagger: 0.15,
          delay: 0.4,
          ease: "elastic.out(1, 0.5)",
        })
      }

      // Animación de términos y ayuda
      gsap.from([termsRef.current, helpRef.current], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      })
    })

    return () => ctx.revert()
  }, [isClient])

  if (!isClient) {
    return (
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-700 rounded mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-8"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
          </div>
          
          {/* Desktop skeleton */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 mb-12">
            {[1, 2].map((i) => (
              <div key={i} className="bg-gray-800/50 rounded-2xl p-6 h-96">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-3"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 bg-gray-700 rounded"></div>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 bg-gray-700 rounded w-full"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile skeleton */}
          <div className="lg:hidden mb-12">
            <div className="w-[320px] h-[550px] bg-gray-800/50 rounded-2xl mx-auto">
              <div className="p-6">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-4"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto mb-3"></div>
                  <div className="h-8 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="w-48 h-48 bg-gray-700 rounded"></div>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="h-4 bg-gray-700 rounded w-full"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800/50 rounded-2xl p-6 h-32"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 rounded-2xl p-6 h-48"></div>
            <div className="bg-gray-800/50 rounded-2xl p-6 h-48"></div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div 
            ref={containerRef}
            className="rounded-2xl md:rounded-3xl border border-[#c4ff0d]/30 md:border-2 glass-effect p-6 md:p-8 lg:p-12"
          >
            
            {/* Título e instrucciones */}
            <div ref={titleRef} className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-balance">
                PROCESO DE PAGO SEGURO
              </h2>
              <p className="text-sm md:text-base text-muted-foreground mb-2 px-2 text-balance">
                Escanea el código QR con tu app Nequi o Bancolombia.
              </p>
              <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-2 text-balance">
                ¿No puedes escanear? ¡Toma un screenshot y paga desde tus fotos!
              </p>
            </div>

            {/* Desktop: Grid layout para ambos tipos de pago */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-8 mb-8">
              {paymentTypes.map((paymentType, index) => {
                const Icon = paymentType.icon
                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#c4ff0d]/30 glass-effect p-6 transition-all duration-300 hover:border-[#c4ff0d]/50"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-[#c4ff0d]/20 flex items-center justify-center mx-auto mb-4 border border-[#c4ff0d]/30">
                        <Icon className="h-8 w-8 text-[#c4ff0d]" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{paymentType.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{paymentType.description}</p>
                      <div className="text-2xl font-bold text-[#c4ff0d] mb-4">{paymentType.price}</div>
                    </div>

                    <div className="flex justify-center mb-6">
                      <div className="relative w-64 h-64">
                        <Image
                          src={paymentType.qrImage}
                          alt={`Código QR para ${paymentType.name.toLowerCase()}`}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>

                    <ul className="space-y-2 mb-6">
                      {paymentType.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-4 h-4 rounded-full bg-[#c4ff0d] flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

            {/* Mobile: Slide layout similar a pricing section */}
            <div className="lg:hidden">
              <div
                className="relative w-full h-[600px] cursor-grab active:cursor-grabbing select-none"
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
                  {paymentTypes.map((paymentType, index) => {
                    let offset = index - activePaymentType
                    if (offset > paymentTypes.length / 2) offset -= paymentTypes.length
                    else if (offset < -paymentTypes.length / 2) offset += paymentTypes.length

                    const absOffset = Math.abs(offset)
                    const Icon = paymentType.icon

                    return (
                      <div
                        key={index}
                        className="absolute w-[320px] h-[550px] rounded-2xl overflow-hidden border-2 border-[#c4ff0d]/40 glass-effect transition-all duration-700"
                        style={{
                          transform: `translateX(${offset * 300 + dragOffset * 0.3}px) translateZ(${-absOffset * 200}px) rotateY(${offset * -25}deg) scale(${1 - absOffset * 0.15})`,
                          opacity: Math.max(0.3, 1 - absOffset * 0.2),
                          filter: `brightness(${1 - absOffset * 0.2}) blur(${absOffset * 1}px)`,
                          zIndex: 20 - absOffset,
                          transformStyle: "preserve-3d",
                        }}
                        onClick={() => handlePaymentTypeChange(index)}
                      >
                        <div className="h-full p-6 text-white">
                          <div className="text-center mb-6">
                            <div className="w-16 h-16 rounded-full bg-[#c4ff0d]/20 flex items-center justify-center mx-auto mb-4 border border-[#c4ff0d]/30">
                              <Icon className="h-8 w-8 text-[#c4ff0d]" />
                            </div>
                            <h3 className="text-lg font-bold mb-2">{paymentType.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{paymentType.description}</p>
                            <div className="text-xl font-bold text-[#c4ff0d] mb-4">{paymentType.price}</div>
                          </div>

                          <div className="flex justify-center mb-6">
                            <div className="relative w-48 h-48">
                              <Image
                                src={paymentType.qrImage}
                                alt={`Código QR para ${paymentType.name.toLowerCase()}`}
                                fill
                                className="object-contain"
                                priority
                              />
                            </div>
                          </div>

                          <ul className="space-y-2">
                            {paymentType.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-center gap-2 text-sm">
                                <div className="w-4 h-4 rounded-full bg-[#c4ff0d] flex items-center justify-center flex-shrink-0">
                                  <div className="w-2 h-2 bg-black rounded-full"></div>
                                </div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Indicadores de scroll */}
              <div className="flex justify-center gap-2 mt-6">
                {paymentTypes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePaymentTypeChange(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activePaymentType ? "bg-[#c4ff0d] scale-125" : "bg-white/30"
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
                  <span>Arrastra para ver más opciones</span>
                </div>
              </div>
            </div>

            {/* Características generales */}
            <div ref={featuresRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8 mt-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="text-center"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c4ff0d]/20 flex items-center justify-center mx-auto mb-2 md:mb-3 border border-[#c4ff0d]/30">
                      <Icon className="h-5 w-5 md:h-6 md:w-6 text-[#c4ff0d]" />
                    </div>
                    <h3 className="font-semibold mb-1 md:mb-2 text-sm md:text-base">{feature.title}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground text-balance">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* Términos y Ayuda */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-[#c4ff0d]/20">
              {/* Términos y condiciones */}
              <div ref={termsRef}>
                <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Términos y Condiciones</h4>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                  {terms.map((term, index) => (
                    <li key={index}>• {term}</li>
                  ))}
                </ul>
              </div>

              {/* Ayuda */}
              <div ref={helpRef}>
                <h4 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">¿Necesitas ayuda?</h4>
                <ul className="text-xs md:text-sm text-muted-foreground space-y-1">
                  {helpItems.map((item, index) => (
                    <li key={index}>• {item.text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
