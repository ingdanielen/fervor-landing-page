"use client"

import { useEffect, useState, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function CountdownSection() {
  // Función para calcular el tiempo restante hasta el 19 de septiembre
  const calculateTimeLeft = () => {
    const now = new Date()
    const targetDate = new Date(now.getFullYear(), 8, 19, 15, 0, 0) // 19 de septiembre a las 3:00 PM
    
    // Si ya pasó el 19 de septiembre de este año, usar el del próximo año
    if (now > targetDate) {
      targetDate.setFullYear(now.getFullYear() + 1)
    }
    
    const difference = targetDate.getTime() - now.getTime()
    
    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)
      
      return { days, hours, minutes, seconds }
    }
    
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  const sectionRef = useRef<HTMLElement>(null)
  const numbersRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const prevTimeRef = useRef(timeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        opacity: 0,
        y: -100,
        scale: 0.3,
        rotationX: -90,
        duration: 1.5,
        ease: "elastic.out(1, 0.8)",
      })

      gsap.from(numbersRef.current?.children || [], {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
        opacity: 0,
        scale: 0.2,
        rotationY: 180,
        rotationX: -90,
        y: 150,
        duration: 2,
        stagger: 0.3,
        ease: "back.out(2)",
        delay: 0.5,
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const numbers = numbersRef.current?.querySelectorAll(".countdown-number")
    if (!numbers) return

    Object.keys(timeLeft).forEach((key, index) => {
      const currentValue = timeLeft[key as keyof typeof timeLeft]
      const prevValue = prevTimeRef.current[key as keyof typeof timeLeft]

      if (currentValue !== prevValue) {
        const numberElement = numbers[index]
        gsap.fromTo(
          numberElement,
          {
            rotationX: 0,
            opacity: 1,
            scale: 1,
          },
          {
            rotationX: 90,
            opacity: 0,
            scale: 0.8,
            duration: 0.25,
            ease: "power2.in",
            onComplete: () => {
              gsap.fromTo(
                numberElement,
                {
                  rotationX: -90,
                  opacity: 0,
                  scale: 0.8,
                },
                {
                  rotationX: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.25,
                  ease: "power2.out",
                },
              )
            },
          },
        )
      }
    })

    prevTimeRef.current = timeLeft
  }, [timeLeft])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 lg:py-32 relative ">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 ref={titleRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 md:mb-12 font-altone">
            FALTAN TAN SOLO
          </h2>

          <div
            ref={numbersRef}
            className="flex justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 mb-8 px-2"
            style={{ perspective: "1000px" }}
          >
            {[
              { value: timeLeft.days, label: "DÍAS" },
              { value: timeLeft.hours, label: "HORAS" },
              { value: timeLeft.minutes, label: "MINUTOS" },
              { value: timeLeft.seconds, label: "SEGUNDOS" },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="countdown-number text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tabular-nums glow-text font-altone"
                  style={{ 
                    perspective: "500px",
                    textShadow: "0 0 40px rgba(196, 255, 13, 0.8)",
                    filter: "drop-shadow(0 0 20px rgba(196, 255, 13, 0.6))"
                  }}
                >
                  {String(item.value).padStart(2, "0")}
                </div>
                <div className="text-sm sm:text-base md:text-lg text-[#c4ff0d] mt-2 md:mt-3 uppercase tracking-wider font-altone font-bold">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje adicional */}
          <div className="mt-8 md:mt-12">
            <p className="text-lg sm:text-xl md:text-2xl text-white/80 font-altone">
              ¡No te pierdas esta experiencia única!
            </p>
            <p className="text-sm sm:text-base md:text-lg text-[#c4ff0d]/80 mt-2 font-altone">
              Cupos limitados • Reserva tu lugar ahora
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
