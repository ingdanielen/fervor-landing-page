"use client"

import { useEffect, useRef } from "react"

interface Blob {
  x: number
  y: number
  radius: number
  opacity: number
  targetOpacity: number
  fadeInSpeed: number
  fadeOutSpeed: number
  lifetime: number
  maxLifetime: number
  fadingOut: boolean
  fadeOutStartTime: number
  fadeOutDuration: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const blobs: Blob[] = []
    const maxBlobs = 8

    const spawnBlob = () => {
      const isLeftSide = Math.random() > 0.5
      const sideMargin = canvas.width * 0.15

      // Varied sizes from small to very large
      const sizeVariant = Math.random()
      let radius: number
      if (sizeVariant < 0.3) {
        radius = Math.random() * 150 + 100 // Small: 100-250
      } else if (sizeVariant < 0.6) {
        radius = Math.random() * 200 + 250 // Medium: 250-450
      } else {
        radius = Math.random() * 300 + 450 // Large: 450-750
      }

      const newBlob: Blob = {
        x: isLeftSide ? Math.random() * sideMargin : canvas.width - Math.random() * sideMargin,
        y: Math.random() * canvas.height * 1.5 - canvas.height * 0.25, // Can extend beyond viewport
        radius: radius,
        opacity: 0,
        targetOpacity: Math.random() * 0.2 + 0.4, // Más sutil: 0.4-0.6
        fadeInSpeed: 0.001 + Math.random() * 0.0005, // Más lento para fade in suave
        fadeOutSpeed: 0.0008 + Math.random() * 0.0003, // Más lento para fade out suave
        lifetime: 0,
        maxLifetime: Math.random() * 1000 + 800, // Vida más larga
        fadingOut: false,
        fadeOutStartTime: 0,
        fadeOutDuration: Math.random() * 400 + 500, // Duración del fade out más larga
      }

      // Check for overlaps with existing blobs
      const hasOverlap = blobs.some((existingBlob) => {
        const distance = Math.sqrt(Math.pow(newBlob.x - existingBlob.x, 2) + Math.pow(newBlob.y - existingBlob.y, 2))
        return distance < (newBlob.radius + existingBlob.radius) * 0.7
      })

      if (!hasOverlap) {
        blobs.push(newBlob)
      }
    }

    // Initial blobs
    for (let i = 0; i < 4; i++) {
      spawnBlob()
    }

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      for (let i = blobs.length - 1; i >= 0; i--) {
        const blob = blobs[i]
        blob.lifetime++

        // Fade in logic - más suave y gradual
        if (!blob.fadingOut && blob.opacity < blob.targetOpacity) {
          blob.opacity = Math.min(blob.targetOpacity, blob.opacity + blob.fadeInSpeed)
        }

        // Start fade out at 80% of lifetime
        if (blob.lifetime > blob.maxLifetime * 0.8 && !blob.fadingOut) {
          blob.fadingOut = true
          blob.fadeOutStartTime = blob.lifetime
        }

        // Smooth fade out logic con curva de easing
        if (blob.fadingOut) {
          const fadeOutProgress = (blob.lifetime - blob.fadeOutStartTime) / blob.fadeOutDuration
          const easeOutProgress = 1 - Math.pow(1 - fadeOutProgress, 2) // Ease out quadratic para más suavidad
          
          blob.opacity = blob.targetOpacity * (1 - easeOutProgress)
          
          // Ensure opacity doesn't go below 0
          if (blob.opacity < 0) {
            blob.opacity = 0
          }
        }

        // Remove blob if fully faded or lifetime exceeded
        if (blob.opacity <= 0.001 || blob.lifetime > blob.maxLifetime + blob.fadeOutDuration) {
          blobs.splice(i, 1)
          continue
        }

        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.radius)
        gradient.addColorStop(0, `rgba(196, 255, 13, ${blob.opacity})`)
        gradient.addColorStop(0.2, `rgba(196, 255, 13, ${blob.opacity * 0.8})`)
        gradient.addColorStop(0.4, `rgba(196, 255, 13, ${blob.opacity * 0.5})`)
        gradient.addColorStop(0.6, `rgba(196, 255, 13, ${blob.opacity * 0.3})`)
        gradient.addColorStop(0.8, `rgba(196, 255, 13, ${blob.opacity * 0.1})`)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Spawn new blobs with better timing
      if (blobs.length < maxBlobs && Math.random() < 0.005) {
        spawnBlob()
      }

      // Grid overlay
      ctx.strokeStyle = "rgba(196, 255, 13, 0.04)"
      ctx.lineWidth = 1
      const gridSize = 50

      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-0">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  )
}
