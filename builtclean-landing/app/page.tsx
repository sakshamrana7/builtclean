import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Stats from "@/components/Stats";
import LiveDemo from "@/components/LiveDemo";
import Features from "@/components/Features";
import Comparison from "@/components/Comparison";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CtaSection from "@/components/CtaSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Navbar />
      <Hero />
      <Marquee />
      <Stats />
      <LiveDemo />
      <Features />
      <Comparison />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <CtaSection />
      <Footer />
    </main>
  );
}
