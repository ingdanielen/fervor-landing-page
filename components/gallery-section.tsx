"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Lista de imágenes reales que existen en las carpetas
const REAL_IMAGES = {
  'Fervor-1': [
    'DSC00001.jpg', 'DSC00006.jpg', 'DSC00008.jpg', 'DSC00009.jpg', 'DSC00010.jpg',
    'DSC00011.jpg', 'DSC00013.jpg', 'DSC00016.jpg', 'DSC00019.jpg', 'DSC00020.jpg',
    'DSC00023.jpg', 'DSC00025.jpg', 'DSC00027.jpg', 'DSC00030.jpg', 'DSC00031.jpg',
    'DSC00033.jpg', 'DSC00034.jpg', 'DSC00036.jpg', 'DSC00037.jpg', 'DSC00043.jpg',
    'DSC00044.jpg', 'DSC00047.jpg', 'DSC00048.jpg', 'DSC00049.jpg', 'DSC00050.jpg',
    'DSC00051.jpg', 'DSC00054.jpg', 'DSC00056.jpg', 'DSC00057.jpg', 'DSC00061.jpg',
    'DSC00062.jpg', 'DSC00072.jpg', 'DSC00083.jpg', 'DSC00089.jpg', 'DSC00093.jpg',
    'DSC00095.jpg', 'DSC00104.jpg', 'DSC00105.jpg', 'DSC00107.jpg', 'DSC00112.jpg',
    'DSC00122.jpg', 'DSC00125.jpg', 'DSC00129.jpg', 'DSC00135.jpg', 'DSC00167.jpg',
    'DSC00171.jpg', 'DSC09813.jpg', 'DSC09814.jpg', 'DSC09817.jpg', 'DSC09818.jpg',
    'DSC09821.jpg', 'DSC09828.jpg', 'DSC09830.jpg', 'DSC09832.jpg', 'DSC09833.jpg',
    'DSC09840.jpg', 'DSC09848.jpg', 'DSC09854.jpg', 'DSC09855.jpg', 'DSC09856.jpg',
    'DSC09857.jpg', 'DSC09865.jpg', 'DSC09869.jpg', 'DSC09872.jpg', 'DSC09878.jpg',
    'DSC09886.jpg', 'DSC09888.jpg', 'DSC09893.jpg', 'DSC09894.jpg', 'DSC09896.jpg',
    'DSC09897.jpg', 'DSC09900.jpg', 'DSC09901.jpg', 'DSC09902.jpg', 'DSC09905.jpg',
    'DSC09907.jpg', 'DSC09909.jpg', 'DSC09912.jpg', 'DSC09918.jpg', 'DSC09919.jpg',
    'DSC09920.jpg', 'DSC09926.jpg', 'DSC09927.jpg', 'DSC09929.jpg', 'DSC09930.jpg',
    'DSC09931.jpg', 'DSC09933.jpg', 'DSC09934.jpg', 'DSC09937.jpg', 'DSC09940.jpg',
    'DSC09944.jpg', 'DSC09949.jpg', 'DSC09954.jpg', 'DSC09957.jpg', 'DSC09961.jpg',
    'DSC09962.jpg', 'DSC09963.jpg', 'DSC09965.jpg', 'DSC09967.jpg', 'DSC09969.jpg',
    'DSC09972.jpg', 'DSC09974.jpg', 'DSC09976.jpg', 'DSC09979.jpg', 'DSC09981.jpg',
    'DSC09982.jpg', 'DSC09992.jpg', 'DSC09995.jpg', 'DSC09996.jpg', 'DSC09997.jpg',
    'DSC09999.jpg'
  ],
  'Fervor-2': [
    'DSC00189.jpg', 'DSC00192.jpg', 'DSC00194.jpg', 'DSC00195.jpg', 'DSC00198.jpg',
    'DSC00203.jpg', 'DSC00206.jpg', 'DSC00207.jpg', 'DSC00209.jpg', 'DSC00211.jpg',
    'DSC00214.jpg', 'DSC00217.jpg', 'DSC00232.jpg', 'DSC00235.jpg', 'DSC00236.jpg',
    'DSC00239.jpg', 'DSC00244.jpg', 'DSC00249.jpg', 'DSC00252.jpg', 'DSC00255.jpg',
    'DSC00257.jpg', 'DSC00260.jpg', 'DSC00261.jpg', 'DSC00263.jpg', 'DSC00268.jpg',
    'DSC00272.jpg', 'DSC00274.jpg', 'DSC00276.jpg'
  ]
}

// Función para generar imágenes aleatorias solo una vez
const generateRandomGalleryImages = () => {
  const allImages: string[] = []
  
  // Recopilar todas las imágenes reales
  Object.entries(REAL_IMAGES).forEach(([folder, images]) => {
    images.forEach(filename => {
      allImages.push(`/images/${folder}/${filename}`)
    })
  })
  
  // Mezclar aleatoriamente y tomar máximo 18
  const shuffledImages = allImages.sort(() => Math.random() - 0.5)
  return shuffledImages.slice(0, 18).map(src => ({
    src,
    alt: `Memoria Fervor - ${src.split('/').pop()}`
  }))
}

// Generar las imágenes una sola vez al cargar el módulo
const galleryImages = generateRandomGalleryImages()

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

      // Solo animar cards visibles para mejor rendimiento
      if (absOffset <= 2) {
      gsap.to(card, {
        x: offset * 220,
        z: -absOffset * 200,
        rotationY: offset * -25,
        scale: 1 - absOffset * 0.15,
        opacity: Math.max(0.3, 1 - absOffset * 0.2),
        filter: `brightness(${1 - absOffset * 0.2}) blur(${absOffset * 0.5}px)`,
        duration: 0.6,
        ease: "power2.out",
        force3D: true,
      })
      } else {
        // Ocultar cards muy lejanas para evitar bugs visuales
        gsap.set(card, {
          opacity: 0,
          scale: 0.5,
          x: offset * 220,
          z: -500,
          rotationY: offset * -25,
        })
      }
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
          <Link href="/memorias">
            <Button className="bg-[#c4ff0d] text-black hover:bg-[#c4ff0d]/90 gap-2 text-sm md:text-base hover:scale-105 transition-all">
              Ver más
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
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

                // Solo renderizar cards cercanas para mejor rendimiento
                if (absOffset > 3) return null

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
                    <Image 
                      src={image.src || "/placeholder.svg"} 
                      alt={image.alt} 
                      fill 
                      className="object-cover" 
                      priority={absOffset === 0}
                      loading={absOffset <= 1 ? "eager" : "lazy"}
                    />
                    {offset === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Navigation dots - Movido fuera del carrusel */}
      <div className="flex justify-center gap-2 mt-8">
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
    </section>
  )
}
