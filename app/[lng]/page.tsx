import { Hero } from "../../components/landing/hero";
import FeaturesSection from "../../components/landing/features";
import About from "../../components/landing/about";
// import TestimonialsSection from "../../components/landing/testimonials";
import { Pricing } from "../../components/landing/pricing";
import FaqSection from "../../components/landing/faq";
import { CTA } from "../../components/landing/cta";
import { Footer } from "../../components/landing/footer";

export default async function LandingPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero params={{
        lng: ""
      }} />
      <FeaturesSection params={{
        lng: ""
      }} />
      <About params={{
        lng: ""
      }} />
      {/* <TestimonialsSection params={{
        lng: ""
      }} /> */}
      <Pricing params={{
        lng: ""
      }} />
      <FaqSection params={{
        lng: ""
      }} />
      <CTA params={{
        lng: ""
      }} />
      <Footer params={{
        lng: ""
      }} />
    </div>
  );
}
