"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface ImageData {
  src: string
  alt: string
  folder: string
}

interface SmartImageGalleryProps {
  maxImages?: number
  folders: string[]
  className?: string
  onImageLoad?: (images: ImageData[]) => void
}

// Lista de imágenes reales que existen en las carpetas
const REAL_IMAGES = {
  'Fervor-1': [
    'DSC00001.jpg', 'DSC00006.jpg', 'DSC00008.jpg', 'DSC00009.jpg', 'DSC00010.jpg',
    'DSC00011.jpg', 'DSC00013.jpg', 'DSC00016.jpg', 'DSC00019.jpg', 'DSC00020.jpg',
    'DSC00023.jpg', 'DSC00025.jpg', 'DSC00027.jpg', 'DSC00030.jpg', 'DSC00031.jpg',
    'DSC00033.jpg', 'DSC00034.jpg', 'DSC00036.jpg', 'DSC00037.jpg', 'DSC00043.jpg',
    'DSC00044.jpg', 'DSC00047.jpg', 'DSC00048.jpg', 'DSC00049.jpg', 'DSC00050.jpg',
    'DSC00051.jpg', 'DSC00054.jpg', 'DSC00056.jpg', 'DSC00057.jpg', 'DSC00061.jpg',
    'DSC00062.jpg', 'DSC00072.jpg', 'DSC00083.jpg', 'DSC00089.jpg', 'DSC00093.jpg',
    'DSC00095.jpg', 'DSC00104.jpg', 'DSC00105.jpg', 'DSC00107.jpg', 'DSC00112.jpg',
    'DSC00122.jpg', 'DSC00125.jpg', 'DSC00129.jpg', 'DSC00135.jpg', 'DSC00167.jpg',
    'DSC00171.jpg', 'DSC09813.jpg', 'DSC09814.jpg', 'DSC09817.jpg', 'DSC09818.jpg',
    'DSC09821.jpg', 'DSC09828.jpg', 'DSC09830.jpg', 'DSC09832.jpg', 'DSC09833.jpg',
    'DSC09840.jpg', 'DSC09848.jpg', 'DSC09854.jpg', 'DSC09855.jpg', 'DSC09856.jpg',
    'DSC09857.jpg', 'DSC09865.jpg', 'DSC09869.jpg', 'DSC09872.jpg', 'DSC09878.jpg',
    'DSC09886.jpg', 'DSC09888.jpg', 'DSC09893.jpg', 'DSC09894.jpg', 'DSC09896.jpg',
    'DSC09897.jpg', 'DSC09900.jpg', 'DSC09901.jpg', 'DSC09902.jpg', 'DSC09905.jpg',
    'DSC09907.jpg', 'DSC09909.jpg', 'DSC09912.jpg', 'DSC09918.jpg', 'DSC09919.jpg',
    'DSC09920.jpg', 'DSC09926.jpg', 'DSC09927.jpg', 'DSC09929.jpg', 'DSC09930.jpg',
    'DSC09931.jpg', 'DSC09933.jpg', 'DSC09934.jpg', 'DSC09937.jpg', 'DSC09940.jpg',
    'DSC09944.jpg', 'DSC09949.jpg', 'DSC09954.jpg', 'DSC09957.jpg', 'DSC09961.jpg',
    'DSC09962.jpg', 'DSC09963.jpg', 'DSC09965.jpg', 'DSC09967.jpg', 'DSC09969.jpg',
    'DSC09972.jpg', 'DSC09974.jpg', 'DSC09976.jpg', 'DSC09979.jpg', 'DSC09981.jpg',
    'DSC09982.jpg', 'DSC09992.jpg', 'DSC09995.jpg', 'DSC09996.jpg', 'DSC09997.jpg',
    'DSC09999.jpg'
  ],
  'Fervor-2': [
    'DSC00189.jpg', 'DSC00192.jpg', 'DSC00194.jpg', 'DSC00195.jpg', 'DSC00198.jpg',
    'DSC00203.jpg', 'DSC00206.jpg', 'DSC00207.jpg', 'DSC00209.jpg', 'DSC00211.jpg',
    'DSC00214.jpg', 'DSC00217.jpg', 'DSC00232.jpg', 'DSC00235.jpg', 'DSC00236.jpg',
    'DSC00239.jpg', 'DSC00244.jpg', 'DSC00249.jpg', 'DSC00252.jpg', 'DSC00255.jpg',
    'DSC00257.jpg', 'DSC00260.jpg', 'DSC00261.jpg', 'DSC00263.jpg', 'DSC00268.jpg',
    'DSC00272.jpg', 'DSC00274.jpg', 'DSC00276.jpg'
  ]
}

export function SmartImageGallery({ 
  maxImages = 18, 
  folders, 
  className = "",
  onImageLoad 
}: SmartImageGalleryProps) {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadImages = () => {
      try {
        const allImages: ImageData[] = []

        // Recopilar todas las imágenes reales de las carpetas especificadas
        folders.forEach(folder => {
          if (REAL_IMAGES[folder as keyof typeof REAL_IMAGES]) {
            const folderImages = REAL_IMAGES[folder as keyof typeof REAL_IMAGES].map(filename => ({
              src: `/images/${folder}/${filename}`,
              alt: `Memoria ${folder} - ${filename}`,
              folder
            }))
            allImages.push(...folderImages)
          }
        })

        // Mezclar aleatoriamente
        const shuffledImages = allImages.sort(() => Math.random() - 0.5)
        
        // Tomar el número máximo especificado
        const selectedImages = shuffledImages.slice(0, maxImages)
        
        setImages(selectedImages)
        setLoading(false)
        
        // Notificar al componente padre si es necesario
        if (onImageLoad) {
          onImageLoad(selectedImages)
        }
      } catch (error) {
        console.error('Error loading images:', error)
        setLoading(false)
      }
    }

    loadImages()
  }, [folders, maxImages, onImageLoad])

  if (loading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#c4ff0d] mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando imágenes...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 ${className}`}>
      {images.map((image, index) => (
        <div
          key={`${image.folder}-${index}`}
          className="group relative overflow-hidden rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-[#c4ff0d]/50 transition-all duration-300 hover:scale-105"
        >
          <div className="aspect-square relative">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              onError={(e) => {
                // Si la imagen no existe, ocultar el elemento
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
          </div>
        </div>
      ))}
    </div>
  )
}

// Hook para obtener imágenes aleatorias
export function useRandomImages(folders: string[], count: number) {
  const [images, setImages] = useState<string[]>([])

  useEffect(() => {
    const allImages: string[] = []

    folders.forEach(folder => {
      if (REAL_IMAGES[folder as keyof typeof REAL_IMAGES]) {
        const folderImages = REAL_IMAGES[folder as keyof typeof REAL_IMAGES].map(filename => 
          `/images/${folder}/${filename}`
        )
        allImages.push(...folderImages)
      }
    })

    // Mezclar aleatoriamente y tomar el número especificado
    const shuffledImages = allImages.sort(() => Math.random() - 0.5)
    setImages(shuffledImages.slice(0, count))
  }, [folders, count])

  return images
}
