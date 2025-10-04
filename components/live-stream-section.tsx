"use client"

import { useEffect, useRef } from "react"
import { Play } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface LiveStreamSectionProps {
  isLiveStreamActive?: boolean
  reelsVideos?: string[]
}

export function LiveStreamSection({ 
  isLiveStreamActive = false, 
  reelsVideos = [] 
}: LiveStreamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const playButtonRef = useRef<HTMLButtonElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación más rápida y fluida del título
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        y: 50,
        scale: 0.8,
        duration: 0.8,
        ease: "power2.out",
      })

      // Animación más rápida del video container
      gsap.from(videoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        opacity: 0,
        scale: 0.7,
        y: 100,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.2,
      })

      // Animación de elementos internos más rápida
      const videoElements = videoRef.current?.querySelectorAll('.video-element')
      if (videoElements) {
        gsap.from(videoElements, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          ease: "power2.out",
        })
      }

      videoRef.current?.addEventListener("mouseenter", () => {
        gsap.to(playButtonRef.current, {
          scale: 1.2,
          boxShadow: "0 0 30px rgba(196, 255, 13, 0.8)",
          duration: 0.3,
          ease: "power2.out",
        })
      })

      videoRef.current?.addEventListener("mouseleave", () => {
        gsap.to(playButtonRef.current, {
          scale: 1,
          boxShadow: "0 0 0px rgba(196, 255, 13, 0)",
          duration: 0.3,
          ease: "power2.out",
        })
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 relative">
      <div className="container mx-auto px-4">
        <div ref={titleRef} className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">
            {isLiveStreamActive ? "TRANSMISIÓN EN VIVO" : "VIDEOS DESTACADOS"}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-4 text-balance">
            {isLiveStreamActive ? (
              <>
                ¡Ven y haz parte de nuestra comunidad!
                <br />
                Comparte nuestra transmisión en vivo!
              </>
            ) : (
              <>
                Descubre los momentos más impactantes
                <br />
                de nuestras reuniones anteriores
              </>
            )}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div
            ref={videoRef}
            className="relative aspect-video rounded-2xl md:rounded-3xl overflow-hidden border-2 border-[#c4ff0d]/60 glass-effect group cursor-pointer hover:border-[#c4ff0d] transition-all duration-700 hover:shadow-2xl hover:shadow-[#c4ff0d]/30"
            style={{ perspective: "2000px", transformStyle: "preserve-3d" }}
          >
            {/* Background layers */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#c4ff0d]/10 via-transparent to-transparent" />
            
            {/* Main content area */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative video-element">
                <div ref={glowRef} className="absolute inset-0 bg-[#c4ff0d]/30 rounded-full blur-3xl scale-150" />
                <button
                  ref={playButtonRef}
                  className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-4 border-[#c4ff0d] bg-[#c4ff0d]/20 backdrop-blur-md flex items-center justify-center hover:bg-[#c4ff0d]/40 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-[#c4ff0d]/50"
                >
                  <Play className="h-8 w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 text-[#c4ff0d] fill-[#c4ff0d] ml-1" />
                </button>
                
                {/* Status indicator */}
                {isLiveStreamActive && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    EN VIVO
                  </div>
                )}
              </div>
            </div>
            
            {/* Background content */}
            {isLiveStreamActive ? (
              // Live stream content
              <div className="absolute inset-0 opacity-40 video-element">
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: "url(/placeholder.svg?height=600&width=1000&query=church congregation worship)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
              </div>
            ) : (
              // Reels videos content
              <div className="absolute inset-0 opacity-40 video-element">
                {reelsVideos.length > 0 ? (
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${reelsVideos[0]})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: "url(/placeholder.svg?height=600&width=1000&query=church worship highlights)",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  />
                )}
              </div>
            )}
            
            {/* Overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent video-element" />
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60 video-element" />
            
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
              <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#c4ff0d] via-[#a8d900] to-[#c4ff0d] blur-2xl scale-110" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
