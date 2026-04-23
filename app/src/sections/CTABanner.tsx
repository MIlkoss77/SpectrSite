import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export default function CTABanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 w-full py-[120px] border-y border-white/[0.06]"
      style={{
        background: "radial-gradient(ellipse at center, rgba(0,255,255,0.06) 0%, transparent 70%)",
      }}
    >
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <h2
          className="text-[clamp(36px,5vw,64px)] font-extrabold text-white tracking-[-0.02em] mb-4"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          Ready to stop missing?
        </h2>
        <p
          className="text-base text-white/50 mb-8"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          Join 12,000+ traders who never sleep.
        </p>
        <div
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 bg-[#00FFFF] text-[#050505] font-semibold text-base px-10 py-4 rounded-lg hover:bg-[#00E396] transition-all duration-300 hover:-translate-y-0.5 glow-cyan"
          >
            Get Pro Access
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="text-xs text-white/30 mt-4 font-mono-data">
            Starting at $29/month
          </p>
        </div>
      </div>
    </section>
  );
}
