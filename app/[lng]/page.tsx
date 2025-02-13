import { Hero } from "../../components/landing/hero";
import { Features } from "../../components/landing/features";
import { HowItWorks } from "../../components/landing/how-it-works";
import { Testimonials } from "../../components/landing/testimonials";
import { Pricing } from "../../components/landing/pricing";
import { FAQ } from "../../components/landing/faq";
import { CTA } from "../../components/landing/cta";
import { Footer } from "../../components/landing/footer";

export default async function LandingPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero params={{
        lng: ""
      }} />
      <Features params={{
        lng: ""
      }} />
      <HowItWorks params={{
        lng: ""
      }} />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
