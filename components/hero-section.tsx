"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { MapPin, Flame } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"

gsap.registerPlugin(ScrollTrigger)

const speakers = [
  {
    name: "LUIS FERNANDO VÁSQUEZ",
    image: "/professional-church-speaker-.jpg?height=400&width=400&query=Luis Fernando Vasquez church speaker",
  },
  {
    name: "SANDRA VILLAMIZAR",
    image: "/professional-church-speaker-.jpg?height=400&width=400&query=Sandra Villamizar church speaker",
  },
  {
    name: "JAIRO NASAR PADAUÍ",
    image: "/professional-church-speaker-.jpg?height=400&width=400&query=Jairo Nasar Padaui church speaker",
  },
]

export function HeroSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const detailsRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const speakersRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación brutal del logo
      gsap.fromTo(logoRef.current, {
        opacity: 0,
        scale: 0.1,
        rotation: 360,
        y: -200,
        x: -200,
        skewX: 45,
        skewY: 45,
        filter: "blur(20px) brightness(0)",
      }, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        y: 0,
        x: 0,
        skewX: 0,
        skewY: 0,
        filter: "blur(0px) brightness(1)",
        duration: 2.5,
        ease: "elastic.out(1, 0.8)",
        delay: 0.2,
        onComplete: () => {
          // Iniciar animación de loop continuo después de la entrada
          const logoLoopTimeline = gsap.timeline({ repeat: -1 })
          logoLoopTimeline
            .to(logoRef.current, {
              filter: "drop-shadow(0 0 30px rgba(196, 255, 13, 0.6)) brightness(1.1)",
              scale: 1.02,
              duration: 2,
              ease: "power2.inOut",
            })
            .to(logoRef.current, {
              filter: "drop-shadow(0 0 15px rgba(196, 255, 13, 0.3)) brightness(1)",
              scale: 1,
              duration: 2,
              ease: "power2.inOut",
            })
        }
      })

      gsap.from(detailsRef.current?.children || [], {
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 1,
        delay: 1.2,
        stagger: 0.2,
        ease: "back.out(1.7)",
      })

      gsap.from(buttonsRef.current?.children || [], {
        opacity: 0,
        scale: 0.5,
        rotation: -10,
        duration: 0.8,
        delay: 1.8,
        stagger: 0.15,
        ease: "elastic.out(1, 0.5)",
      })

      gsap.from(speakersRef.current?.children || [], {
        opacity: 0,
        scale: 0.3,
        y: 80,
        rotation: -20,
        duration: 1.2,
        delay: 2.1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.6)",
      })

      gsap.to(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
        y: 200,
        scale: 0.9,
        opacity: 0,
        ease: "none",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 lg:py-40 overflow-hidden min-h-screen flex items-center"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <div ref={titleRef} className="relative mb-6 md:mb-8">
            <Image
              ref={logoRef}
              src="/images/Fervor logo 2 (Aceite).png"
              alt="FERVOR"
              width={600}
              height={200}
              className="h-32 sm:h-40 md:h-48 lg:h-56 xl:h-64 w-auto mx-auto"
              priority
            />
          </div>

          <div ref={detailsRef} className="space-y-3 md:space-y-4 mb-6 md:mb-8">
            <p className="text-xl sm:text-2xl md:text-3xl font-bold font-altone">19 DE OCTUBRE • 3PM - 8PM</p>
            <p className="text-base md:text-lg text-muted-foreground uppercase tracking-wide font-altone">Tarde de Alabanza</p>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm px-4">
              <MapPin className="h-4 w-4 text-[#c4ff0d] flex-shrink-0" />
              <span className="text-balance font-altone">IPUC SOLEDAD CENTRAL | CRA. 26 #24 - 14</span>
            </div>
          </div>

          <div ref={speakersRef} className="flex items-center justify-center gap-3 md:gap-4 mb-8 md:mb-10">
            {speakers.map((speaker, index) => (
              <div
                key={index}
                className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-3 border-[#c4ff0d] shadow-lg shadow-[#c4ff0d]/30"
              >
                <Image
                  src={speaker.image || "/placeholder.svg"}
                  alt={speaker.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            ))}
          </div>

          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0">
            <Button
              size="lg"
              className="bg-transparent border-2 border-[#c4ff0d] text-[#c4ff0d] hover:bg-[#c4ff0d] hover:text-black font-semibold px-6 md:px-8 transition-all glow-border w-full sm:w-auto text-sm md:text-base"
            >
              CUPOS LIMITADOS
            </Button>
            <Button
              size="lg"
              className="bg-transparent border-2 border-[#c4ff0d] text-[#c4ff0d] hover:bg-[#c4ff0d] hover:text-black font-semibold px-6 md:px-8 transition-all glow-border w-full sm:w-auto text-sm md:text-base"
            >
              ENTRADAS DISPONIBLES
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
