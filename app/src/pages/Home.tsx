import Hero from "@/sections/Hero";
import StatsTape from "@/sections/StatsTape";
import BentoFeatures from "@/sections/BentoFeatures";
import TerminalPreview from "@/sections/TerminalPreview";
import CTABanner from "@/sections/CTABanner";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <StatsTape />
      <BentoFeatures />
      <TerminalPreview />
      <CTABanner />
    </main>
  );
}
