import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SpeakersSection } from "@/components/speakers-section"
import { GallerySection } from "@/components/gallery-section"
import { TextCarouselSection } from "@/components/text-carousel-section"
import { ImpactSection } from "@/components/impact-section"
import { LiveStreamSection } from "@/components/live-stream-section"
import { CountdownSection } from "@/components/countdown-section"
import { PricingSection } from "@/components/pricing-section"
import { PaymentSection } from "@/components/payment-section"
import { Footer } from "@/components/footer"
import { AnimatedBackground } from "@/components/animated-background"

export default function Page() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <SpeakersSection />
          <GallerySection />
          <TextCarouselSection />
          <ImpactSection />
          <LiveStreamSection 
            isLiveStreamActive={false} 
            reelsVideos={[
              "/placeholder.svg?height=600&width=400&query=worship moment 1",
              "/placeholder.svg?height=600&width=400&query=worship moment 2",
              "/placeholder.svg?height=600&width=400&query=worship moment 3"
            ]} 
          />
          <CountdownSection />
          <PricingSection />
          <PaymentSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
