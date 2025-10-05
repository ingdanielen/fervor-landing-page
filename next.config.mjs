/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Optimización de imágenes habilitada para mejor rendimiento
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Optimizaciones de rendimiento (removido optimizeCss experimental)
  experimental: {
    optimizePackageImports: ['gsap', 'lucide-react'],
  },
  // Compresión y optimización
  compress: true,
  poweredByHeader: false,
  // Optimización de bundle
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Optimización para producción
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          gsap: {
            test: /[\\/]node_modules[\\/]gsap[\\/]/,
            name: 'gsap',
            chunks: 'all',
            priority: 10,
          },
        },
      }
    }
    return config
  },
}

export default nextConfig
