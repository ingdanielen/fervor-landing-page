import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import '../styles/fonts.css'

export const metadata: Metadata = {
  title: 'Fervor 2025 - Avivamiento y Transformación Espiritual',
  description: 'Únete al evento más poderoso del año. Fervor 2025 trae avivamiento, transformación espiritual y renovación a tu vida. Predicadores internacionales, adoración poderosa y milagros. ¡No te lo pierdas!',
  keywords: [
    'Fervor 2025',
    'avivamiento',
    'transformación espiritual',
    'evento cristiano',
    'predicadores',
    'adoración',
    'ipuc',
    'trupillo',
    'conferencia espiritual',
    'renovación',
    'milagros',
    'fe',
    'esperanza',
    'comunidad cristiana',
  ],
  authors: [{ name: 'Fervor' }],
  creator: 'Fervor',
  publisher: 'Fervor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://fervor2025.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fervor 2025 - Avivamiento y Transformación Espiritual',
    description: 'Únete al evento más poderoso del año. Fervor 2025 trae avivamiento, transformación espiritual y renovación a tu vida.',
    url: 'https://fervor2025.com',
    siteName: 'Fervor 2025',
    images: [
      {
        url: '/images/meta/screenshot.png',
        width: 1200,
        height: 630,
        alt: 'Fervor 2025 - Evento de Avivamiento y Transformación Espiritual',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fervor 2025 - Avivamiento y Transformación Espiritual',
    description: 'Únete al evento más poderoso del año. Fervor 2025 trae avivamiento, transformación espiritual y renovación a tu vida.',
    images: ['/images/meta/screenshot.png'],
    creator: '@fervor2025',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <head>
        {/* Optimizaciones de rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//vercel.live" />
        
        {/* Preload de recursos críticos */}
        <link rel="preload" href="/images/Fervor logo 1(Blanco).png" as="image" />
        <link rel="preload" href="/images/meta/screenshot.png" as="image" />
        
        {/* Meta tags de rendimiento */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        
        {/* Optimización para móviles */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} animation-container`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
