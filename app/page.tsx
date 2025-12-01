import { HeroSection } from "../components/landing/hero";
import { UniqueFeaturesSection } from "../components/landing/unique-features";
import { AboutSection } from "../components/landing/about";
import { PricingSection } from "../components/landing/pricing";
import { FAQSection } from "../components/landing/faq";
import { Footer } from "../components/landing/footer";
import { Header } from "../components/landing/navbar";

interface LandingPageProps {
  params: Promise<{
    lng: string;
  }>;
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { lng } = await params;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header params={{ lng }} />
      <HeroSection params={{ lng }} />
      <UniqueFeaturesSection params={{ lng }} />
      <AboutSection params={{ lng }} />
      <FAQSection params={{ lng }} />
      <PricingSection params={{ lng }} />
      <Footer params={{ lng }} />
    </div>
  );
}
