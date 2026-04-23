import { Routes, Route } from "react-router";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";
import MilkyWayBackground from "@/components/MilkyWayBackground";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import Home from "./pages/Home";
import DegenIntel from "./pages/DegenIntel";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Messages from "./pages/Messages";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="relative min-h-screen bg-[#050505]">
        <MilkyWayBackground />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intel" element={<DegenIntel />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <AIChat />
      </div>
    </ReactLenis>
  );
}
