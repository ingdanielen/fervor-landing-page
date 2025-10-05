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
    'renovación',
    'milagros',
    'fe',
    'esperanza',
    'comunidad cristiana',
    'conferencia espiritual'
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
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
