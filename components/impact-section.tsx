"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Flame, Heart, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const reasons = [
  {
    title: "ENCUENTRO GENUINO",
    subtitle: "Con la presencia de Dios",
    description: "Experimenta un encuentro genuino con la presencia de Dios que transformará tu vida para siempre. Una experiencia que marca un antes y un después en tu caminar espiritual.",
    image: "/speaker-preaching-at-church.jpg",
    gradient: "from-[#c4ff0d] via-[#a8d900] to-[#8bc700]",
    highlight: "TRANSFORMACIÓN TOTAL",
  },
  {
    title: "COMUNIDAD UNIDA",
    subtitle: "En fe y propósito",
    description: "Únete a una comunidad de creyentes apasionados que comparten el mismo fervor y propósito. Juntos experimentaremos la unidad que solo el Espíritu Santo puede crear.",
    image: "/people-worshipping-at-church.jpg",
    gradient: "from-[#c4ff0d] via-[#d4ff4d] to-[#e8ff8d]",
    highlight: "UNIDAD SOBRENATURAL",
  },
  {
    title: "PODER SOBRENATURAL",
    subtitle: "Manifestaciones del Espíritu",
    description: "Sé testigo de manifestaciones poderosas del Espíritu Santo que cambiarán tu perspectiva de lo imposible. Milagros, sanidades y renovación espiritual te esperan.",
    image: "/worship-leader-singing.jpg",
    gradient: "from-[#8bc700] via-[#c4ff0d] to-[#d4ff4d]",
    highlight: "MILAGROS REALES",
  },
]

export function ImpactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
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
        },
        opacity: 0,
        y: 150,
        scale: 0.5,
        rotationX: -90,
        duration: 1.5,
        ease: "expo.out",
      })

      gsap.from(subtitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: 80,
        duration: 1.2,
        delay: 0.4,
        ease: "power4.out",
      })

      const cards = cardsRef.current?.children
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          const cardElement = card as HTMLElement

          gsap.from(cardElement, {
            scrollTrigger: {
              trigger: cardElement,
              start: "top 85%",
            },
            opacity: 0,
            y: 200,
            rotationY: 180,
            rotationX: -45,
            scale: 0.3,
            duration: 1.5,
            delay: index * 0.3,
            ease: "expo.out",
          })

          cardElement.addEventListener("mouseenter", () => {
            gsap.to(cardElement, {
              y: -20,
              scale: 1.05,
              rotationY: 3,
              duration: 0.7,
              ease: "power3.out",
            })

            const image = cardElement.querySelector(".card-image")
            if (image) {
              gsap.to(image, {
                scale: 1.1,
                duration: 0.7,
                ease: "power2.out",
              })
            }

            const glow = cardElement.querySelector(".card-glow")
            if (glow) {
              gsap.to(glow, {
                opacity: 1,
                scale: 1.3,
                duration: 0.6,
                ease: "power2.out",
              })
            }
          })

          cardElement.addEventListener("mouseleave", () => {
            gsap.to(cardElement, {
              y: 0,
              scale: 1,
              rotationY: 0,
              duration: 0.7,
              ease: "power3.out",
            })

            const image = cardElement.querySelector(".card-image")
            if (image) {
              gsap.to(image, {
                scale: 1,
                duration: 0.7,
              })
            }

            const glow = cardElement.querySelector(".card-glow")
            if (glow) {
              gsap.to(glow, {
                opacity: 0,
                scale: 1,
                duration: 0.6,
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

    if (dragOffset > 100) {
      setCurrentIndex((prev) => (prev === 0 ? reasons.length - 1 : prev - 1))
    } else if (dragOffset < -100) {
      setCurrentIndex((prev) => (prev + 1) % reasons.length)
    }

    setIsDragging(false)
    setDragOffset(0)
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-20">
          <h2
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 text-white"
            style={{ textShadow: "0 0 60px rgba(196, 255, 13, 0.6)" }}
          >
            ¿POR QUÉ ASISTIR A FERVOR?
          </h2>
          <p ref={subtitleRef} className="text-base md:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto text-balance">
            Descubre las razones que hacen de FERVOR una experiencia única e inolvidable
          </p>
        </div>

        {/* Desktop: Grid layout */}
        <div ref={cardsRef} className="hidden md:grid grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="relative group cursor-default"
              style={{ perspective: "1500px", transformStyle: "preserve-3d" }}
            >
              <div className="relative bg-black/90 backdrop-blur-md border-2 border-[#c4ff0d]/40 rounded-3xl overflow-hidden transition-all duration-700 hover:border-[#c4ff0d] hover:shadow-2xl hover:shadow-[#c4ff0d]/20">
                
                {/* Image Section */}
                <div className="relative h-80  overflow-hidden">
                  <div className="card-image absolute inset-0">
                    <Image
                      src={reason.image || "/placeholder.svg"}
                      alt={reason.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Gradient Overlays */}
                  <div className="absolute top-2/3 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent h-1/3" />
                  
                  {/* Highlight Badge */}
                  <div className="absolute top-6 left-6 z-10">
                    <div
                      className="px-4 py-2 rounded-full backdrop-blur-sm border border-[#c4ff0d]/50"
                      style={{
                        background: `linear-gradient(135deg, ${reason.gradient.replace("from-", "").replace(" via-", ", ").replace(" to-", ", ")})`,
                        boxShadow: "0 8px 32px rgba(196, 255, 13, 0.3)",
                      }}
                    >
                      <span className="text-black font-black text-xs md:text-sm tracking-wider">
                        {reason.highlight}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-5">
                  <div className="space-y-4">
                    <div>
                      <h3
                        className="text-2xl md:text-3xl font-black mb-2 bg-clip-text text-transparent leading-tight"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${reason.gradient.replace("from-", "").replace(" via-", ", ").replace(" to-", ", ")})`,
                        }}
                      >
                        {reason.title}
                      </h3>
                      <p
                        className="text-[#c4ff0d] font-bold text-sm md:text-base tracking-wider uppercase"
                        style={{
                          textShadow: "0 0 20px rgba(196, 255, 13, 0.5)",
                        }}
                      >
                        {reason.subtitle}
                      </p>
                    </div>

                    <p className="text-white/90 leading-relaxed text-base md:text-lg">
                      {reason.description}
                    </p>
                  </div>
                </div>

                {/* Glow Effects */}
                <div
                  className="card-glow absolute inset-0 opacity-0 transition-all duration-700 pointer-events-none blur-3xl"
                  style={{
                    background: `radial-gradient(circle at center, ${reason.gradient.replace("from-", "").split(" ")[0]}/40, transparent 70%)`,
                  }}
                />

                {/* Animated border glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
                  <div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: `linear-gradient(135deg, ${reason.gradient.replace("from-", "").replace(" via-", ", ").replace(" to-", ", ")})`,
                      filter: "blur(25px)",
                      opacity: 0.4,
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: Horizontal scroll with indicators */}
        <div className="md:hidden">
          <div
            className="relative w-full h-[450px] cursor-grab active:cursor-grabbing select-none"
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
              {reasons.map((reason, index) => {
                let offset = index - currentIndex
                if (offset > reasons.length / 2) offset -= reasons.length
                else if (offset < -reasons.length / 2) offset += reasons.length

                const absOffset = Math.abs(offset)

                return (
                  <div
                    key={index}
                    className="absolute w-[320px] h-[420px] rounded-3xl overflow-hidden border-2 border-[#c4ff0d]/40 bg-black/90 backdrop-blur-md transition-all duration-700"
                    style={{
                      transform: `translateX(${offset * 300 + dragOffset * 0.3}px) translateZ(${-absOffset * 200}px) rotateY(${offset * -25}deg) scale(${1 - absOffset * 0.15})`,
                      opacity: Math.max(0.3, 1 - absOffset * 0.2),
                      filter: `brightness(${1 - absOffset * 0.2}) blur(${absOffset * 1}px)`,
                      zIndex: 20 - absOffset,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <div className="absolute inset-0">
                        <Image
                          src={reason.image || "/placeholder.svg"}
                          alt={reason.title}
                          fill
                          className="object-cover transition-transform duration-700"
                        />
                      </div>
                      
                      {/* Gradient Overlays */}
                      <div className="absolute top-2/3 inset-0 bg-gradient-to-t from-black via-black/70 to-transparent h-1/3" />
                      
                      {/* Highlight Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <div
                          className="px-3 py-1.5 rounded-full backdrop-blur-sm border border-[#c4ff0d]/50"
                          style={{
                            background: `linear-gradient(135deg, ${reason.gradient.replace("from-", "").replace(" via-", ", ").replace(" to-", ", ")})`,
                            boxShadow: "0 8px 32px rgba(196, 255, 13, 0.3)",
                          }}
                        >
                          <span className="text-black font-black text-xs tracking-wider">
                            {reason.highlight}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative p-4">
                      <div className="space-y-3">
                        <div>
                          <h3
                            className="text-xl font-black mb-1 bg-clip-text text-transparent leading-tight"
                            style={{
                              backgroundImage: `linear-gradient(135deg, ${reason.gradient.replace("from-", "").replace(" via-", ", ").replace(" to-", ", ")})`,
                            }}
                          >
                            {reason.title}
                          </h3>
                          <p
                            className="text-[#c4ff0d] font-bold text-sm tracking-wider uppercase"
                            style={{
                              textShadow: "0 0 20px rgba(196, 255, 13, 0.5)",
                            }}
                          >
                            {reason.subtitle}
                          </p>
                        </div>

                        <p className="text-white/90 leading-relaxed text-sm">
                          {reason.description}
                        </p>
                      </div>
                    </div>

                    {/* Glow Effects */}
                    <div
                      className="absolute inset-0 opacity-0 transition-all duration-700 pointer-events-none blur-3xl"
                      style={{
                        background: `radial-gradient(circle at center, ${reason.gradient.replace("from-", "").split(" ")[0]}/40, transparent 70%)`,
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Indicadores de scroll */}
          <div className="flex justify-center gap-2 mt-6">
            {reasons.map((_, index) => (
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
