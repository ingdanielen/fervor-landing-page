"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
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
  const videoElementRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)

  // Funciones de control de video
  const togglePlay = () => {
    if (videoElementRef.current) {
      if (isPlaying) {
        videoElementRef.current.pause()
      } else {
        videoElementRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoElementRef.current) {
      videoElementRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        y: -50,
        scale: 0.8,
        duration: 1,
        ease: "power2.out",
      })

      // Animación del video container
      gsap.from(videoRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        opacity: 0,
        scale: 0.7,
        y: 100,
        rotationY: 45,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.2,
      })

      // Animación de elementos internos
      const videoElements = videoRef.current?.querySelectorAll('.video-element')
      if (videoElements) {
        gsap.from(videoElements, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
          opacity: 0,
          scale: 0.8,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.4,
          ease: "power2.out",
        })
      }

      // Efectos de hover sutiles
      videoRef.current?.addEventListener("mouseenter", () => {
        gsap.to(playButtonRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        })
      })

      videoRef.current?.addEventListener("mouseleave", () => {
        gsap.to(playButtonRef.current, {
          scale: 1,
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 text-white">
            {isLiveStreamActive ? "TRANSMISIÓN EN VIVO" : "VIDEO DESTACADO"}
          </h2>
          <p className="text-base md:text-lg text-white/80 max-w-3xl mx-auto px-4 text-balance">
            {isLiveStreamActive ? (
              <>
                ¡Ven y haz parte de nuestra comunidad!
                <br />
                Comparte nuestra transmisión en vivo!
              </>
            ) : (
              <>
                Descubre el poder y la presencia de Dios
                <br />
                en este momento especial de Fervor
              </>
            )}
          </p>
        </div>

        <div className="max-w-sm md:max-w-md lg:max-w-sm mx-auto">
          <div
            ref={videoRef}
            className="relative aspect-[9/16] rounded-2xl overflow-hidden border border-[#c4ff0d]/30 group cursor-pointer transition-all duration-300"
            style={{ perspective: "800px", transformStyle: "preserve-3d" }}
          >
            {/* Video real de Fervor */}
            <video
              ref={videoElementRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              playsInline
              preload="metadata"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              <source src="/images/videos/fervor-reveal.mp4" type="video/mp4" />
              Tu navegador no soporta el elemento de video.
            </video>

            {/* Overlay effects sutiles */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent video-element" />
            
            {/* Controles de video */}
            <div className="absolute inset-0 flex items-center justify-center video-element">
              <div className="relative">
                <div ref={glowRef} className="absolute inset-0 bg-[#c4ff0d]/10 rounded-full blur-xl scale-150" />
                <button
                  ref={playButtonRef}
                  onClick={togglePlay}
                  className="relative w-14 h-14 md:w-16 md:h-16 rounded-full border border-[#c4ff0d]/60 bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-all duration-300 hover:scale-105"
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5 md:h-6 md:w-6 text-[#c4ff0d] fill-[#c4ff0d]" />
                  ) : (
                    <Play className="h-5 w-5 md:h-6 md:w-6 text-[#c4ff0d] fill-[#c4ff0d] ml-0.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Control de volumen */}
            <div className="absolute bottom-3 right-3 video-element">
              <button
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border border-[#c4ff0d]/40 flex items-center justify-center hover:bg-black/80 transition-all duration-300"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-[#c4ff0d]" />
                ) : (
                  <Volume2 className="h-4 w-4 text-[#c4ff0d]" />
                )}
              </button>
            </div>

            {/* Badge de Fervor */}
            <div className="absolute top-3 left-3 video-element">
              <div className="bg-[#c4ff0d] text-black px-2 py-1 rounded-full font-black text-xs flex items-center gap-1 shadow-lg">
                <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />
                FERVOR
              </div>
            </div>
          </div>

          {/* Información adicional del video */}
          <div className="text-center mt-6 ">
            <p className="text-white/70 text-sm md:text-base">
              Experiencia la presencia de Dios en este momento especial
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
