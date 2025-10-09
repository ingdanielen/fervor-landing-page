"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const speakers = [
  {
    name: "SANDRA VILLAMIZAR",
    role: "Primera Sesión",
    time: "3:00 PM - 4:30 PM",
    description: "Esposa de pastor - \"Destilando en lo secreto: Cuando Dios prepara el aceite\"",
    image: "/images/Predicadores/sandra.jpeg",
  },
  {
    name: "NABONASAR PADAUÍ",
    role: "Segunda Sesión",
    time: "4:45 PM - 6:15 PM",
    description: "Secretario de directiva distrital - \"Marcado por el cielo: El día del derramamiento\"",
    image: "/images/Predicadores/nabonasar.jpg",
  },
  {
    name: "LUIS FERNANDO VÁSQUEZ",
    role: "Tercera Sesión",
    time: "6:30 PM - 8:00 PM",
    description: "Pastor - \"El peso del perfume: Frutos que huelen a llamado\"",
    image: "/images/Predicadores/luis-fernando.jpg",
  },
]

export function SpeakersSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const button1Ref = useRef<HTMLButtonElement>(null)
  const button2Ref = useRef<HTMLButtonElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: -100,
        scale: 0.8,
        duration: 1,
        ease: "power2.out",
        force3D: true,
      })

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        x: -100,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out",
        force3D: true,
      })

      // Animación de botones con referencias individuales
      const animateButtons = () => {
        const buttons = [button1Ref.current, button2Ref.current].filter(Boolean)
        
        if (buttons.length > 0) {
          gsap.from(buttons, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none none", 
            },
            opacity: 0,
            scale: 0.8,
            y: 30,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          })
        }
      }

      // Ejecutar animación con un pequeño delay para asegurar renderizado
      setTimeout(animateButtons, 100)

      const cards = cardsRef.current?.children
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          const cardElement = card as HTMLElement

          gsap.from(cardElement, {
            scrollTrigger: {
              trigger: cardElement,
              start: "top 85%",
              toggleActions: "play none none none",
            },
            opacity: 0,
            rotationY: 90,
            rotationX: -15,
            scale: 0.7,
            z: -200,
            duration: 0.8,
            ease: "power2.out",
            delay: index * 0.1,
          })

          const image = cardElement.querySelector(".speaker-image")
          const overlay = cardElement.querySelector(".speaker-overlay")
          const content = cardElement.querySelector(".speaker-content")
          const badge = cardElement.querySelector(".speaker-badge")

          cardElement.addEventListener("mouseenter", () => {
            gsap.to(cardElement, {
              y: -20,
              scale: 1.05,
              rotationY: 5,
              boxShadow: "0 40px 100px rgba(196, 255, 13, 0.6)",
              borderColor: "rgba(196, 255, 13, 1)",
              duration: 0.5,
              ease: "power2.out",
            })

            if (image) {
              gsap.to(image, {
                scale: 1.15,
                rotation: 2,
                filter: "grayscale(0%) brightness(1.2)",
                duration: 0.5,
              })
            }

            if (overlay) {
              gsap.to(overlay, {
                opacity: 0.2,
                duration: 1.2,
                ease: "power2.inOut",
              })
            }

            if (content) {
              gsap.to(content, {
                y: -10,
                duration: 0.5,
              })
            }

            if (badge) {
              gsap.to(badge, {
                scale: 1.1,
                rotation: -3,
                duration: 0.3,
              })
            }
          })

          cardElement.addEventListener("mouseleave", () => {
            gsap.to(cardElement, {
              y: 0,
              scale: 1,
              rotationY: 0,
              boxShadow: "0 10px 40px rgba(196, 255, 13, 0.2)",
              borderColor: "rgba(196, 255, 13, 0.4)",
              duration: 0.5,
              ease: "power2.out",
            })

            if (image) {
              gsap.to(image, {
                scale: 1,
                rotation: 0,
                filter: "grayscale(100%) brightness(1)",
                duration: 0.5,
              })
            }

            if (overlay) {
              gsap.to(overlay, {
                opacity: 0.8,
                duration: 1.2,
                ease: "power2.inOut",
              })
            }

            if (content) {
              gsap.to(content, {
                y: 0,
                duration: 0.5,
              })
            }

            if (badge) {
              gsap.to(badge, {
                scale: 1,
                rotation: 0,
                duration: 0.3,
              })
            }
          })
        })
      }
    })

    return () => ctx.revert()
  }, [])

  // Funciones para el scroll horizontal en mobile
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

    // Simplificado: solo necesita un pequeño movimiento
    if (dragOffset > 50) {
      setCurrentIndex((prev) => (prev === 0 ? speakers.length - 1 : prev - 1))
    } else if (dragOffset < -50) {
      setCurrentIndex((prev) => (prev + 1) % speakers.length)
    }

    setIsDragging(false)
    setDragOffset(0)
  }

  return (
    <section ref={sectionRef} id="predicadores" className="py-16 md:py-24 lg:py-32 relative z-10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 text-white tracking-tight"
            style={{ textShadow: "0 0 40px rgba(196, 255, 13, 0.5)", perspective: "1000px" }}
          >
            NUESTROS PREDICADORES
          </h2>
          <p
            ref={subtitleRef}
            className="text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 px-4 mb-6"
          >
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-[#c4ff0d] flex-shrink-0" />
            <span className="text-balance">Tres mensajes ungidos, tres momentos de revelación. Cada sesión ha sido preparada en oración para ministrar a tu vida de manera específica y profunda.</span>
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-[#c4ff0d] flex-shrink-0" />
          </p>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
            <Button
              ref={button1Ref}
              size="lg"
              className="bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90 font-black px-8 md:px-10 py-4 md:py-5 transition-all glow-border w-full sm:w-auto text-sm md:text-base shadow-xl hover:shadow-2xl hover:shadow-[#c4ff0d]/30"
            >
              INSCRIBIRME AHORA
            </Button>
            <Button
              ref={button2Ref}
              size="lg"
              className="bg-transparent border-2 border-[#c4ff0d] text-[#c4ff0d] hover:bg-[#c4ff0d] hover:text-black font-semibold px-6 md:px-8 transition-all glow-border w-full sm:w-auto text-sm md:text-base"
            >
              VER PRECIOS
            </Button>
          </div>
        </div>

        {/* Desktop: Grid layout */}
        <div
          ref={cardsRef}
          className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-7xl mx-auto"
          style={{ perspective: "2000px" }}
        >
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl md:rounded-[2rem] border-2 border-[#c4ff0d]/40 bg-black/60 backdrop-blur-sm transition-all duration-500"
            >
              <div className="absolute top-4 md:top-6 left-4 md:left-6 z-20 speaker-badge">
                <div className="bg-[#c4ff0d] text-black px-3 md:px-5 py-1.5 md:py-2 rounded-full font-black text-[10px] md:text-xs uppercase tracking-wider shadow-xl">
                  {speaker.role}
                </div>
              </div>

              <div className="aspect-[3/4] relative overflow-hidden">
                <div className="speaker-overlay smooth-fade-overlay absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 opacity-80" />
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  fill
                  className="speaker-image object-cover grayscale transition-all duration-500"
                />
              </div>

              <div className="speaker-content absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 z-20">
                <div className="mb-3 md:mb-4">
                  <h3 className="text-xl md:text-2xl lg:text-3xl font-black mb-1 md:mb-2 text-white leading-tight">
                    {speaker.name}
                  </h3>
                  <p className="text-[#c4ff0d] font-bold text-xs md:text-sm mb-1">{speaker.time}</p>
                  <p className="text-white/70 text-xs md:text-sm">{speaker.description}</p>
                </div>

                <Button
                  size="icon"
                  className="rounded-full bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90 shadow-lg hover:scale-110 transition-all duration-300 h-10 w-10 md:h-12 md:w-12"
                >
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>

              <div className="absolute top-0 right-0 w-32 h-32 bg-[#c4ff0d]/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            </div>
          ))}
        </div>

        {/* Mobile: Horizontal scroll with indicators */}
        <div className="md:hidden">
          <div
            className="relative w-full h-[400px] cursor-grab active:cursor-grabbing select-none"
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
              {speakers.map((speaker, index) => {
                let offset = index - currentIndex
                if (offset > speakers.length / 2) offset -= speakers.length
                else if (offset < -speakers.length / 2) offset += speakers.length

                const absOffset = Math.abs(offset)

                return (
                  <div
                    key={index}
                    className="absolute w-[280px] h-[380px] rounded-2xl overflow-hidden border-2 border-[#c4ff0d]/40 bg-black/60 backdrop-blur-sm transition-all duration-700"
                    style={{
                      transform: `translateX(${offset * 280 + dragOffset * 0.3}px) translateZ(${-absOffset * 200}px) rotateY(${offset * -25}deg) scale(${1 - absOffset * 0.15})`,
                      opacity: Math.max(0.3, 1 - absOffset * 0.2),
                      filter: `brightness(${1 - absOffset * 0.2}) blur(${absOffset * 1}px)`,
                      zIndex: 20 - absOffset,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-[#c4ff0d] text-black px-3 py-1.5 rounded-full font-black text-[10px] uppercase tracking-wider shadow-xl">
                        {speaker.role}
                      </div>
                    </div>

                    <div className="aspect-[3/4] relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10 opacity-80" />
                      <Image
                        src={speaker.image}
                        alt={speaker.name}
                        fill
                        className="object-cover grayscale transition-all duration-500"
                      />
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                      <div className="mb-3">
                        <h3 className="text-lg font-black mb-1 text-white leading-tight">
                          {speaker.name}
                        </h3>
                        <p className="text-[#c4ff0d] font-bold text-xs mb-1">{speaker.time}</p>
                        <p className="text-white/70 text-xs">{speaker.description}</p>
                      </div>

                      <Button
                        size="icon"
                        className="rounded-full bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90 shadow-lg h-8 w-8"
                      >
                        <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="absolute top-0 right-0 w-24 h-24 bg-[#c4ff0d]/10 blur-2xl rounded-full -translate-y-1/2 translate-x-1/2" />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Indicadores de scroll */}
          <div className="flex justify-center gap-2 mt-6">
            {speakers.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-[#c4ff0d] scale-125" : "bg-white/30"
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
    </section>
  )
}
