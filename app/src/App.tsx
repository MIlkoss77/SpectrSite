import { Routes, Route } from "react-router";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import MilkyWayBackground from "@/components/MilkyWayBackground";
import Navigation from "@/components/Navigation";
import ScrollHandler from "@/components/ScrollHandler";
import Footer from "@/components/Footer";
import Home from "./pages/Home";
import MarketIntel from "./pages/MarketIntel";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="relative min-h-screen bg-[#050505]">
        <MilkyWayBackground />
        <ScrollHandler />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intel" element={<MarketIntel />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </ReactLenis>
  );
}
