"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const row1Texts = [
  "AVIVAMIENTO",
  "TRANSFORMACIÓN",
  "FERVOR",
  "PASIÓN",
  "ADORACIÓN",
  "AVIVAMIENTO",
  "TRANSFORMACIÓN",
  "FERVOR",
]

const row2Texts = ["COMUNIDAD", "UNIDAD", "ESPERANZA", "FE", "AMOR", "COMUNIDAD", "UNIDAD", "ESPERANZA"]

const row3Texts = ["RENOVACIÓN", "PODER", "GLORIA", "PRESENCIA", "MILAGROS", "RENOVACIÓN", "PODER", "GLORIA"]

export function TextCarouselSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
      })

      if (row1Ref.current) {
        // Crear animación infinita sin reiniciarse
        const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
        tl1.to(row1Ref.current, {
          x: "-50%",
          duration: 20,
          ease: "none",
        });

        gsap.from(row1Ref.current.children, {
          scrollTrigger: {
            trigger: row1Ref.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 80,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        })
      }

      if (row2Ref.current) {
        gsap.set(row2Ref.current, { x: "-50%" })
        
        // Crear animación infinita sin reiniciarse
        const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
        tl2.to(row2Ref.current, {
          x: "0%",
          duration: 25,
          ease: "none",
        });

        gsap.from(row2Ref.current.children, {
          scrollTrigger: {
            trigger: row2Ref.current,
            start: "top 85%",
          },
          opacity: 0,
          y: -80,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        })
      }

      if (row3Ref.current) {
        // Crear animación infinita sin reiniciarse
        const tl3 = gsap.timeline({ repeat: -1, yoyo: true });
        tl3.to(row3Ref.current, {
          x: "-50%",
          duration: 22,
          ease: "none",
        });

        gsap.from(row3Ref.current.children, {
          scrollTrigger: {
            trigger: row3Ref.current,
            start: "top 85%",
          },
          opacity: 0,
          y: 80,
          duration: 1,
          stagger: 0.08,
          ease: "power3.out",
        })
      }
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 overflow-hidden relative">
      {/* Gradient overlays for fade effect */}

      <div className="space-y-6 md:space-y-8">
        {/* Row 1: Moving right */}
        <div className="relative overflow-hidden">
          <div ref={row1Ref} className="flex gap-6 md:gap-8 whitespace-nowrap">
            {row1Texts.map((text, index) => (
              <div
                key={index}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#c4ff0d]/20 hover:text-[#c4ff0d] transition-colors duration-300 cursor-default select-none"
                style={{
                  textShadow: "0 0 30px rgba(196, 255, 13, 0.3)",
                  WebkitTextStroke: "1px rgba(196, 255, 13, 0.5)",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Moving left */}
        <div className="relative overflow-hidden">
          <div ref={row2Ref} className="flex gap-6 md:gap-8 whitespace-nowrap">
            {row2Texts.map((text, index) => (
              <div
                key={index}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white/20 hover:text-white transition-colors duration-300 cursor-default select-none"
                style={{
                  textShadow: "0 0 30px rgba(255, 255, 255, 0.2)",
                  WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Moving right */}
        <div className="relative overflow-hidden">
          <div ref={row3Ref} className="flex gap-6 md:gap-8 whitespace-nowrap">
            {row3Texts.map((text, index) => (
              <div
                key={index}
                className="text-5xl   md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#c4ff0d]/20 hover:text-[#c4ff0d] transition-colors duration-300 cursor-default select-none"
                style={{
                  textShadow: "0 0 30px rgba(196, 255, 13, 0.3)",
                  WebkitTextStroke: "1px rgba(196, 255, 13, 0.5)",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
