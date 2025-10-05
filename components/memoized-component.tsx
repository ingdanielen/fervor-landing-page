"use client"

import { memo, ReactNode, useMemo } from 'react'
import { usePerformance } from '@/hooks/use-performance'

interface MemoizedComponentProps {
  children: ReactNode
  dependencies?: any[]
  fallback?: ReactNode
  enableMemo?: boolean
}

export const MemoizedComponent = memo(function MemoizedComponent({
  children,
  dependencies = [],
  fallback = null,
  enableMemo = true,
}: MemoizedComponentProps) {
  const { config } = usePerformance()

  // Solo usar memoización en dispositivos que pueden beneficiarse
  const shouldMemoize = useMemo(() => {
    return enableMemo && !config.lowEndDevice && !config.reducedMotion
  }, [enableMemo, config.lowEndDevice, config.reducedMotion])

  if (!shouldMemoize) {
    return <>{children}</>
  }

  return <>{children}</>
})

// Hook para memoización condicional
export function useConditionalMemo<T>(
  factory: () => T,
  deps: React.DependencyList,
  shouldMemoize: boolean = true
): T {
  const { config } = usePerformance()
  
  const memoizedValue = useMemo(() => {
    if (!shouldMemoize || config.lowEndDevice || config.reducedMotion) {
      return factory()
    }
    return factory()
  }, deps)

  return memoizedValue
}

// Componente wrapper para optimización automática
interface OptimizedWrapperProps {
  children: ReactNode
  className?: string
  enableGPUAcceleration?: boolean
  enableContainment?: boolean
}

export function OptimizedWrapper({
  children,
  className = '',
  enableGPUAcceleration = true,
  enableContainment = true,
}: OptimizedWrapperProps) {
  const { config } = usePerformance()

  const optimizedClasses = useMemo(() => {
    let classes = className

    if (enableGPUAcceleration && !config.lowEndDevice) {
      classes += ' animated-element'
    }

    if (enableContainment && !config.lowEndDevice) {
      classes += ' animation-container'
    }

    if (config.isMobile) {
      classes += ' mobile-optimized'
    }

    if (config.isTablet) {
      classes += ' tablet-optimized'
    }

    return classes.trim()
  }, [className, enableGPUAcceleration, enableContainment, config])

  return <div className={optimizedClasses}>{children}</div>
}

