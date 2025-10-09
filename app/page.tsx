import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { EventInfoSection } from "@/components/event-info-section"
import { SpeakersSection } from "@/components/speakers-section"
import { GallerySection } from "@/components/gallery-section"
import { TextCarouselSection } from "@/components/text-carousel-section"
import { ImpactSection } from "@/components/impact-section"
import { LiveStreamSection } from "@/components/live-stream-section"
import { CountdownSection } from "@/components/countdown-section"
import { CallToHeavenSection } from "@/components/call-to-heaven-section"
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
          <EventInfoSection />
          <SpeakersSection />
          <GallerySection />
          <TextCarouselSection />
          <ImpactSection />
          <LiveStreamSection 
            isLiveStreamActive={false} 
            reelsVideos={["/images/videos/fervor-reveal.mp4"]} 
          />
          <CountdownSection />
          <CallToHeavenSection />
          <PricingSection />
          <PaymentSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
