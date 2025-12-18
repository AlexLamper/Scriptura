import { HeroSection } from "../components/landing/hero";
import { UniqueFeaturesSection } from "../components/landing/unique-features";
import { AboutSection } from "../components/landing/about";
import { PricingSection } from "../components/landing/pricing";
import { FAQSection } from "../components/landing/faq";
import { Footer } from "../components/landing/footer";
import { Header } from "../components/landing/navbar";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { cookieName, fallbackLng } from "./i18n/settings";
import { generatePageMetadata } from "../lib/pageMetadata";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lng = cookieStore.get(cookieName)?.value || fallbackLng;
  return generatePageMetadata('home', lng);
}

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
