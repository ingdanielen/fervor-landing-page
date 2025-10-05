// Configuración de rendimiento optimizada para Fervor 2025
export const PERFORMANCE_CONFIG = {
  // Configuración de animaciones por dispositivo
  animations: {
    mobile: {
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.1,
      force3D: true,
      disableComplexAnimations: false,
    },
    tablet: {
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.15,
      force3D: true,
      disableComplexAnimations: false,
    },
    desktop: {
      duration: 1.2,
      ease: "expo.out",
      stagger: 0.2,
      force3D: true,
      disableComplexAnimations: false,
    },
    reducedMotion: {
      duration: 0.3,
      ease: "power2.out",
      stagger: 0.05,
      force3D: false,
      disableComplexAnimations: true,
    },
  },

  // Configuración de imágenes
  images: {
    quality: {
      mobile: { priority: 85, normal: 75 },
      tablet: { priority: 90, normal: 80 },
      desktop: { priority: 95, normal: 85 },
      lowEnd: { priority: 75, normal: 60 },
    },
    sizes: {
      mobile: "(max-width: 768px) 100vw, 50vw",
      tablet: "(max-width: 1024px) 50vw, 33vw",
      desktop: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    },
  },

  // Configuración de lazy loading
  lazyLoading: {
    threshold: 0.1,
    rootMargin: "50px",
    enableIntersectionObserver: true,
  },

  // Configuración de GSAP
  gsap: {
    autoRefresh: true,
    force3D: true,
    nullTargetWarn: false,
  },

  // Configuración de ScrollTrigger
  scrollTrigger: {
    refreshPriority: -1,
    syncRefresh: true,
    ignoreMobileResize: true,
  },

  // Configuración de memoria
  memory: {
    maxCacheSize: 50, // Máximo número de elementos en caché
    cleanupInterval: 30000, // Limpiar caché cada 30 segundos
  },

  // Configuración de dispositivos de gama baja
  lowEndDevice: {
    maxConcurrentAnimations: 3,
    reduceParticleEffects: true,
    simplifyTransforms: true,
    disableBlurEffects: true,
  },
}

// Función para detectar dispositivo de gama baja
export function isLowEndDevice(): boolean {
  if (typeof window === 'undefined') return false
  
  return (
    navigator.hardwareConcurrency <= 2 || // Pocos cores
    ((navigator as any).deviceMemory && (navigator as any).deviceMemory <= 4) || // Poca RAM
    /Android [1-4]/.test(navigator.userAgent) || // Android antiguo
    /iPhone OS [1-9]/.test(navigator.userAgent) // iOS antiguo
  )
}

// Función para detectar preferencia de movimiento reducido
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Función para obtener configuración optimizada
export function getOptimizedConfig() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
  const isTablet = typeof window !== 'undefined' && window.innerWidth > 768 && window.innerWidth <= 1024
  const isDesktop = typeof window !== 'undefined' && window.innerWidth > 1024
  const lowEnd = isLowEndDevice()
  const reducedMotion = prefersReducedMotion()

  if (reducedMotion || lowEnd) {
    return PERFORMANCE_CONFIG.animations.reducedMotion
  }

  if (isMobile) {
    return PERFORMANCE_CONFIG.animations.mobile
  }

  if (isTablet) {
    return PERFORMANCE_CONFIG.animations.tablet
  }

  return PERFORMANCE_CONFIG.animations.desktop
}

