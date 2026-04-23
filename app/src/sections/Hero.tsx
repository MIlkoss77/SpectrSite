import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, ChevronDown } from "lucide-react";

function AnimatedHeroSVG() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const nodes = svg.querySelectorAll(".network-node");
    const dots = svg.querySelectorAll(".traveling-dot");

    nodes.forEach((node, i) => {
      const el = node as SVGCircleElement;
      el.style.animationDelay = `${i * 0.3}s`;
    });

    dots.forEach((dot, i) => {
      const el = dot as SVGCircleElement;
      el.style.animationDelay = `${i * 0.8}s`;
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 600"
      className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>{`
          .network-node {
            animation: nodePulse 3s ease-in-out infinite;
            transform-origin: center;
          }
          .traveling-dot {
            animation: dotTravel 6s linear infinite;
          }
          @keyframes nodePulse {
            0%, 100% { transform: scale(1); opacity: 0.4; }
            50% { transform: scale(1.5); opacity: 0.8; }
          }
          @keyframes dotTravel {
            0% { offset-distance: 0%; }
            100% { offset-distance: 100%; }
          }
        `}</style>
      </defs>
      {/* Connection lines */}
      <g stroke="rgba(0,255,255,0.12)" strokeWidth="0.5" fill="none">
        <line x1="200" y1="150" x2="350" y2="200" />
        <line x1="350" y1="200" x2="500" y2="150" />
        <line x1="500" y1="150" x2="600" y2="250" />
        <line x1="200" y1="150" x2="250" y2="300" />
        <line x1="350" y1="200" x2="400" y2="350" />
        <line x1="500" y1="150" x2="450" y2="350" />
        <line x1="600" y1="250" x2="550" y2="400" />
        <line x1="250" y1="300" x2="400" y2="350" />
        <line x1="400" y1="350" x2="550" y2="400" />
        <line x1="250" y1="300" x2="200" y2="450" />
        <line x1="400" y1="350" x2="350" y2="500" />
        <line x1="550" y1="400" x2="500" y2="500" />
        <line x1="200" y1="450" x2="350" y2="500" />
        <line x1="350" y1="500" x2="500" y2="500" />
        <line x1="600" y1="250" x2="650" y2="350" />
        <line x1="150" y1="250" x2="200" y2="150" />
        <line x1="150" y1="250" x2="250" y2="300" />
        <line x1="650" y1="350" x2="550" y2="400" />
      </g>

      {/* Nodes */}
      <circle className="network-node" cx="200" cy="150" r="5" fill="rgba(0,255,255,0.5)" />
      <circle className="network-node" cx="350" cy="200" r="6" fill="rgba(0,255,255,0.5)" />
      <circle className="network-node" cx="500" cy="150" r="4" fill="rgba(0,227,150,0.5)" />
      <circle className="network-node" cx="600" cy="250" r="5" fill="rgba(0,255,255,0.5)" />
      <circle className="network-node" cx="250" cy="300" r="5" fill="rgba(0,227,150,0.5)" />
      <circle className="network-node" cx="400" cy="350" r="7" fill="rgba(0,255,255,0.6)" />
      <circle className="network-node" cx="450" cy="350" r="4" fill="rgba(0,255,255,0.4)" />
      <circle className="network-node" cx="550" cy="400" r="5" fill="rgba(0,227,150,0.5)" />
      <circle className="network-node" cx="200" cy="450" r="4" fill="rgba(0,255,255,0.4)" />
      <circle className="network-node" cx="350" cy="500" r="5" fill="rgba(0,255,255,0.5)" />
      <circle className="network-node" cx="500" cy="500" r="4" fill="rgba(0,227,150,0.5)" />
      <circle className="network-node" cx="150" cy="250" r="3" fill="rgba(0,255,255,0.3)" />
      <circle className="network-node" cx="650" cy="350" r="4" fill="rgba(0,255,255,0.4)" />

      {/* Traveling dots on paths */}
      <circle r="2" fill="#00FFFF">
        <animateMotion dur="4s" repeatCount="indefinite" path="M200,150 L350,200 L500,150" />
      </circle>
      <circle r="2" fill="#00E396">
        <animateMotion dur="5s" repeatCount="indefinite" path="M250,300 L400,350 L550,400" />
      </circle>
      <circle r="2" fill="#00FFFF">
        <animateMotion dur="6s" repeatCount="indefinite" path="M350,200 L400,350 L350,500" />
      </circle>
      <circle r="1.5" fill="#00E396">
        <animateMotion dur="7s" repeatCount="indefinite" path="M500,150 L600,250 L650,350" />
      </circle>
    </svg>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const children = el.querySelectorAll(".hero-animate");
    children.forEach((child, i) => {
      const htmlEl = child as HTMLElement;
      htmlEl.style.opacity = "0";
      htmlEl.style.transform = "translateY(40px)";
      htmlEl.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.15}s`;
      setTimeout(() => {
        htmlEl.style.opacity = "1";
        htmlEl.style.transform = "translateY(0)";
      }, 200);
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Animated SVG Background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[600px] max-w-full">
          <AnimatedHeroSVG />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-[700px]">
        <div className="hero-animate flex items-center justify-center gap-2 mb-6">
          <span className="w-1 h-1 rounded-full bg-[#00FFFF]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00FFFF]/60">
            The market doesn&apos;t sleep
          </span>
        </div>

        <h1 className="hero-animate text-[clamp(48px,8vw,96px)] font-black leading-[0.95] tracking-[-0.03em]">
          <span className="text-white block">For people who</span>
          <span className="text-[#00FFFF] glow-cyan-text block">don&apos;t stop.</span>
        </h1>

        <p className="hero-animate mt-6 text-base text-white/60 max-w-[560px] mx-auto leading-relaxed">
          Spectr Trading is the intelligence layer between you and the market. Real-time alpha. Cross-exchange mastery. AI-powered edge.
        </p>

        <div className="hero-animate flex items-center justify-center gap-4 mt-10">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 bg-[#00FFFF] text-[#050505] font-semibold text-sm px-7 py-3.5 rounded-lg hover:bg-[#00E396] transition-all duration-300 hover:-translate-y-0.5 glow-cyan"
          >
            Secure Your Access
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/intel"
            className="inline-flex items-center gap-2 bg-transparent text-white font-medium text-sm px-7 py-3.5 rounded-lg border border-white/[0.15] hover:border-[#00FFFF] hover:text-[#00FFFF] hover:bg-[rgba(0,255,255,0.05)] transition-all duration-300"
          >
            Explore Features
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-animate absolute bottom-8 left-1/2 -translate-x-1/2">
        <ChevronDown className="w-5 h-5 text-white/30 animate-bounce" />
      </div>
    </section>
  );
}
