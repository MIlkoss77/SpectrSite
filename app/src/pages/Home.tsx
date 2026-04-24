import Hero from "@/sections/Hero";
import StatsTape from "@/sections/StatsTape";
import BentoFeatures from "@/sections/BentoFeatures";
import TerminalPreview from "@/sections/TerminalPreview";
import ProStack from "@/sections/ProStack";
import SpectrAcademy from "@/sections/SpectrAcademy";
import CTABanner from "@/sections/CTABanner";

export default function Home() {
  return (
    <main className="relative z-10">
      <Hero />
      <StatsTape />
      <BentoFeatures />
      <TerminalPreview />
      <ProStack />
      <SpectrAcademy />
      <CTABanner />
    </main>
  );
}
