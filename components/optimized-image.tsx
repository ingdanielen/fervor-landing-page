"use client"

import Image from 'next/image'
import { useState, useCallback } from 'react'
import { usePerformance } from '@/hooks/use-performance'

interface OptimizedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
  onError?: () => void
}

export function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const { getImageQuality, getImageSizes, config } = usePerformance()

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
    onLoad?.()
  }, [onLoad])

  const handleError = useCallback(() => {
    setHasError(true)
    onError?.()
  }, [onError])

  // Configuración optimizada según dispositivo
  const optimizedQuality = quality ?? getImageQuality(priority)
  const optimizedSizes = sizes ?? getImageSizes('(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw')
  
  // Clases de optimización
  const optimizedClasses = `
    ${className}
    ${isLoaded ? 'opacity-100' : 'opacity-0'}
    transition-opacity duration-300 ease-out
    ${config.isMobile ? 'mobile-optimized' : ''}
    ${config.isTablet ? 'tablet-optimized' : ''}
  `.trim()

  if (hasError) {
    return (
      <div 
        className={`bg-gray-800 flex items-center justify-center ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <span className="text-gray-400 text-sm">Error al cargar imagen</span>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden">
      {/* Placeholder mientras carga */}
      {!isLoaded && (
        <div 
          className={`absolute inset-0 bg-gray-800 animate-pulse ${fill ? 'w-full h-full' : ''}`}
          style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
        />
      )}
      
      {/* Imagen optimizada */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={optimizedClasses}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        sizes={optimizedSizes}
        quality={optimizedQuality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        // Optimizaciones adicionales
        unoptimized={false}
        draggable={false}
      />
    </div>
  )
}

