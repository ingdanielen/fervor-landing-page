"use client"

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface OptimizedLoaderProps {
  onComplete?: () => void
  minDuration?: number
}

export function OptimizedLoader({ onComplete, minDuration = 1000 }: OptimizedLoaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    
    // Simular progreso de carga
    const interval = setInterval(() => {
      setProgress(prev => {
        const elapsed = Date.now() - startTime
        const timeProgress = Math.min(elapsed / minDuration, 1)
        const randomProgress = Math.random() * 0.1
        const newProgress = Math.min(prev + randomProgress, timeProgress)
        
        if (newProgress >= 1) {
          clearInterval(interval)
          setIsComplete(true)
          setTimeout(() => {
            onComplete?.()
          }, 500)
        }
        
        return newProgress
      })
    }, 50)

    return () => clearInterval(interval)
  }, [minDuration, onComplete])

  useEffect(() => {
    if (isComplete) {
      gsap.to('.loader-content', {
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        ease: "power2.out",
      })
    }
  }, [isComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="loader-content text-center">
        {/* Logo optimizado */}
        <div className="mb-8">
          <img 
            src="/images/Fervor logo 1(Blanco).png" 
            alt="Fervor Logo" 
            className="w-32 h-32 mx-auto animate-pulse"
            loading="eager"
          />
        </div>
        
        {/* Barra de progreso optimizada */}
        <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mx-auto mb-4">
          <div 
            className="h-full bg-gradient-to-r from-[#c4ff0d] to-[#8bc700] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        
        {/* Texto de carga */}
        <p className="text-white/80 text-sm font-medium">
          {progress < 0.3 ? 'Cargando recursos...' :
           progress < 0.7 ? 'Optimizando experiencia...' :
           progress < 0.9 ? 'Preparando animaciones...' :
           '¡Casi listo!'}
        </p>
        
        {/* Porcentaje */}
        <p className="text-[#c4ff0d] text-lg font-bold mt-2">
          {Math.round(progress * 100)}%
        </p>
      </div>
    </div>
  )
}

