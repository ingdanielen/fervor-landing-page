import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"
import { MemoriasClient } from "@/components/memorias-client"

// Generar imágenes en el servidor
const generateImages = () => {
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

  const allImages: Array<{src: string, alt: string, folder: string, width: number, height: number}> = []
  
  Object.entries(REAL_IMAGES).forEach(([folder, filenames]) => {
    filenames.forEach((filename, index) => {
      const width = 300 + (index % 5) * 100
      const height = 300 + (index % 3) * 100
      
      allImages.push({
        src: `/images/${folder}/${filename}`,
        alt: `Memoria ${folder} - ${filename}`,
        folder,
        width,
        height
      })
    })
  })
  
  return allImages
}

export default function MemoriasPage() {
  const images = generateImages()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        
        <main className="pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 text-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6">
                MEMORIAS
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                Revive los momentos más especiales de Fervor. Cada imagen cuenta una historia de fe, 
                transformación y avivamiento.
              </p>
            </div>
          </section>

          {/* Gallery Section */}
          <section className="py-8 md:py-16">
            <div className="container mx-auto px-4">
              <MemoriasClient images={images} />
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  )
}
