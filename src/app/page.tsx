import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { RibbonBanner } from "@/components/RibbonBanner";
import { ServicesSection } from "@/components/ServicesSection";
import { GallerySection } from "@/components/GallerySection";
import { AboutSection } from "@/components/AboutSection";
import { BookingSection } from "@/components/BookingSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <RibbonBanner />
      <ServicesSection />
      <GallerySection />
      <AboutSection />
      <BookingSection />
      <TestimonialsSection />
      <Footer />
    </main>
  );
}
