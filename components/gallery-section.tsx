"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: "/people-worshipping-at-church.jpg", alt: "People worshipping" },
  { src: "/speaker-preaching-at-church.jpg", alt: "Speaker preaching" },
  { src: "/worship-leader-singing.jpg", alt: "Worship leader" },
  { src: "/diverse-church-congregation.png", alt: "Church congregation" },
  { src: "/musician-playing-guitar.png", alt: "Musician playing" },
]

export function GallerySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [dragOffset, setDragOffset] = useState(0)
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const startAutoRotate = () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current)
      autoRotateRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
      }, 5000)
    }

    startAutoRotate()

    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.3,
        y: 150,
        rotationX: -120,
        rotationZ: -45,
        duration: 1.5,
        ease: "expo.out",
      })

      // Staggered entrance: cards 0 and 4 first, then 1 and 3, then 2 (center)
      const staggerOrder = [
        { index: 0, delay: 0 },
        { index: 4, delay: 0 },
        { index: 1, delay: 0.2 },
        { index: 3, delay: 0.2 },
        { index: 2, delay: 0.4 },
      ]

      staggerOrder.forEach(({ index, delay }) => {
        const card = cardsRef.current[index]
        if (card) {
          gsap.from(card, {
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 85%",
            },
            opacity: 0,
            y: 100,
            scale: 0.5,
            rotationY: 90,
            duration: 1.2,
            delay,
            ease: "back.out(2)",
          })
        }
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    cardsRef.current.forEach((card, index) => {
      if (!card) return

      let offset = index - currentIndex
      if (offset > galleryImages.length / 2) offset -= galleryImages.length
      else if (offset < -galleryImages.length / 2) offset += galleryImages.length

      const absOffset = Math.abs(offset)

      gsap.to(card, {
        x: offset * 220,
        z: -absOffset * 200,
        rotationY: offset * -25,
        scale: 1 - absOffset * 0.15,
        opacity: Math.max(0.3, 1 - absOffset * 0.2),
        filter: `brightness(${1 - absOffset * 0.2}) blur(${absOffset * 1}px)`,
        duration: 0.8,
        ease: "power3.out",
      })
    })
  }, [currentIndex])

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
      setCurrentIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
    } else if (dragOffset < -100) {
      setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
    }

    setIsDragging(false)
    setDragOffset(0)
  }

  return (
    <section ref={sectionRef} id="galeria" className="py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="max-w-2xl mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-balance">
            EXPLORA NUESTRA GALERÍA
            <br />
            DE FOTOS
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 text-balance">
            Aquí podrás observar todas esas momentos únicos de intimidad que se viven en nuestras "FERVOR" anteriores.
            Revive esos gratos momentos que vivimos en la presencia de Dios.
          </p>
          <Button className="bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90 gap-2 text-sm md:text-base hover:scale-105 transition-all">
            Ver más
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div
          ref={carouselRef}
          className="relative w-full h-[350px] md:h-[450px] lg:h-[500px]"
          style={{ perspective: "1500px" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            onMouseDown={(e) => handleDragStart(e.pageX)}
            onMouseMove={(e) => handleDragMove(e.pageX)}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={(e) => handleDragStart(e.touches[0].pageX)}
            onTouchMove={(e) => handleDragMove(e.touches[0].pageX)}
            onTouchEnd={handleDragEnd}
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{ transformStyle: "preserve-3d" }}
            >
              {galleryImages.map((image, index) => {
                let offset = index - currentIndex
                if (offset > galleryImages.length / 2) offset -= galleryImages.length
                else if (offset < -galleryImages.length / 2) offset += galleryImages.length

                const absOffset = Math.abs(offset)

                return (
                  <div
                    key={index}
                    ref={(el) => {
                      cardsRef.current[index] = el
                    }}
                    className="absolute w-[250px] h-[350px] md:w-[320px] md:h-[430px] lg:w-[380px] lg:h-[550px] rounded-2xl overflow-hidden border-2 border-[#c4ff0d]/40 shadow-2xl pointer-events-none"
                    style={{
                      transformStyle: "preserve-3d",
                      zIndex: 20 - absOffset,
                    }}
                    onMouseEnter={(e) => {
                      if (offset === 0) {
                        gsap.to(e.currentTarget, {
                          scale: 1.05,
                          rotationY: 0,
                          duration: 0.4,
                          ease: "power2.out",
                        })
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (offset === 0) {
                        gsap.to(e.currentTarget, {
                          scale: 1,
                          duration: 0.4,
                          ease: "power2.out",
                        })
                      }
                    }}
                  >
                    <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
                    {offset === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-[#c4ff0d] w-8 h-2 rounded-full"
                    : "bg-white/40 w-2 h-2 rounded-full hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
