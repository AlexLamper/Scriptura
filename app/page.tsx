import { HeroSection } from "../components/landing/hero";
import { UniqueFeaturesSection } from "../components/landing/unique-features";
import { AboutSection } from "../components/landing/about";
import { PricingSection } from "../components/landing/pricing";
import { FAQSection } from "../components/landing/faq";
import { Footer } from "../components/landing/footer";
import { Header } from "../components/landing/navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <Header />
      <HeroSection />
      <UniqueFeaturesSection />
      <AboutSection />
      <FAQSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
