import { useEffect, useState, useCallback } from 'react'

interface PerformanceConfig {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  reducedMotion: boolean
  lowEndDevice: boolean
}

export function usePerformance() {
  const [config, setConfig] = useState<PerformanceConfig>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    reducedMotion: false,
    lowEndDevice: false,
  })

  const detectDevice = useCallback(() => {
    const width = window.innerWidth
    const isMobile = width <= 768
    const isTablet = width > 768 && width <= 1024
    const isDesktop = width > 1024
    
    // Detectar preferencia de movimiento reducido
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Detectar dispositivos de gama baja basado en hardware
    const lowEndDevice = 
      navigator.hardwareConcurrency <= 2 || // Pocos cores
      ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) || // Poca RAM
      /Android [1-4]/.test(navigator.userAgent) || // Android antiguo
      /iPhone OS [1-9]/.test(navigator.userAgent) // iOS antiguo

    setConfig({
      isMobile,
      isTablet,
      isDesktop,
      reducedMotion,
      lowEndDevice,
    })
  }, [])

  useEffect(() => {
    detectDevice()
    
    const handleResize = () => {
      detectDevice()
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleMotionChange = () => {
      detectDevice()
    }

    window.addEventListener('resize', handleResize)
    mediaQuery.addEventListener('change', handleMotionChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [detectDevice])

  const getAnimationConfig = useCallback(() => {
    if (config.reducedMotion || config.lowEndDevice) {
      return {
        duration: 0.3,
        ease: "power2.out",
        stagger: 0.05,
        force3D: false,
        disableComplexAnimations: true,
      }
    }

    if (config.isMobile) {
      return {
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        force3D: true,
        disableComplexAnimations: false,
      }
    }

    if (config.isTablet) {
      return {
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        force3D: true,
        disableComplexAnimations: false,
      }
    }

    return {
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.2,
      force3D: true,
      disableComplexAnimations: false,
    }
  }, [config])

  const shouldReduceAnimations = useCallback(() => {
    return config.reducedMotion || config.lowEndDevice || config.isMobile
  }, [config])

  const getImageQuality = useCallback((priority: boolean = false) => {
    if (config.lowEndDevice) return priority ? 75 : 60
    if (config.isMobile) return priority ? 85 : 75
    if (config.isTablet) return priority ? 90 : 80
    return priority ? 95 : 85
  }, [config])

  const getImageSizes = useCallback((breakpoints: string) => {
    if (config.isMobile) return "(max-width: 768px) 100vw, 50vw"
    if (config.isTablet) return "(max-width: 1024px) 50vw, 33vw"
    return breakpoints
  }, [config])

  return {
    config,
    getAnimationConfig,
    shouldReduceAnimations,
    getImageQuality,
    getImageSizes,
  }
}

