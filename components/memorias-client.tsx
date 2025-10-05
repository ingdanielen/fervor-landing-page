"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageData {
  src: string
  alt: string
  folder: string
  width: number
  height: number
}

interface MemoriasClientProps {
  images: ImageData[]
}

export function MemoriasClient({ images }: MemoriasClientProps) {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = (image: ImageData) => {
    setSelectedImage(image)
    setIsModalOpen(true)
  }

  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement('a')
      link.href = selectedImage.src
      link.download = selectedImage.alt
      link.click()
    }
  }

  const handleShare = async () => {
    if (selectedImage && navigator.share) {
      try {
        await navigator.share({
          title: selectedImage.alt,
          text: 'Mira esta memoria de Fervor',
          url: selectedImage.src,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-4 md:gap-6">
        {images.map((image, index) => {
          const aspectRatio = image.width / image.height
          
          let gridSpan = "col-span-1"
          if (aspectRatio > 1.5) {
            // Imágenes anchas: 2 columnas en móvil, 3 en desktop
            gridSpan = "col-span-2 sm:col-span-3"
          } else if (aspectRatio < 0.7) {
            // Imágenes altas: 1 columna pero 2 filas
            gridSpan = "col-span-1 row-span-2"
          }

          return (
            <div
              key={`${image.folder}-${index}`}
              className={`group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-[#c4ff0d]/50 transition-all duration-300 hover:scale-105 cursor-pointer ${gridSpan}`}
              style={{
                aspectRatio: aspectRatio > 1.5 ? '2/1' : aspectRatio < 0.7 ? '1/2' : '1/1',
                minHeight: '120px' // Altura mínima para móvil
              }}
              onClick={() => handleImageClick(image)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.parentElement?.parentElement?.remove()
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Image info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium truncate">{image.alt}</p>
                  <p className="text-xs text-gray-300">{image.folder}</p>
                </div>

                {/* Click indicator */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black/50 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 bg-black/95 border-gray-700">
          {selectedImage && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={() => setIsModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>

              <div className="relative w-full h-[70vh]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              <div className="p-6 bg-gradient-to-t from-black to-transparent">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">{selectedImage.alt}</h3>
                    <p className="text-gray-300">{selectedImage.folder}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                      className="bg-transparent border-gray-600 text-white hover:bg-gray-800"
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Compartir
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

    </>
  )
}
