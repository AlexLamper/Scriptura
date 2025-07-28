import { HeroSection } from "../../components/landing/hero";
import { FeaturesSection } from "../../components/landing/features";
import { AboutSection } from "../../components/landing/about";
import { PricingSection } from "../../components/landing/pricing";
import { FAQSection } from "../../components/landing/faq";
import { Footer } from "../../components/landing/footer";
import { Header } from "../../components/landing/navbar";

export default async function LandingPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header params={{
        lng: ""
      }} />
      <HeroSection params={{
        lng: ""
      }} />
      <AboutSection params={{
        lng: ""
      }} />
      <FeaturesSection params={{
        lng: ""
      }} />
      <PricingSection params={{
        lng: ""
      }} />
      <FAQSection params={{
        lng: ""
      }} />
      <Footer params={{
        lng: ""
      }} />
    </div>
  );
}
