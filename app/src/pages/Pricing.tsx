import { useState, useEffect, useRef } from "react";
import { Check, Zap, Crown } from "lucide-react";

const proFeatures = [
  "Real-time AI predictions (87% avg. accuracy)",
  "Whale tracking across 8 chains",
  "Cross-exchange arbitrage alerts",
  "Ferocious Scout signal feed",
  "Priority support",
  "API access (100 req/min)",
];

const founderFeatures = [
  ...proFeatures,
  "Lifetime access — no recurring fees",
  "Unlimited API requests",
  "Founder badge in community",
  "Early access to new features",
  "Direct line to core team",
  "Custom alert configurations",
];

export default function Pricing() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative z-10 pt-[72px]">
      {/* Hero */}
      <section className="min-h-[40vh] flex flex-col items-center justify-center px-6 py-20 text-center">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-1 h-1 rounded-full bg-[#00FFFF]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00FFFF]/60">
            Protocol Access
          </span>
        </div>
        <h1 className="text-[clamp(36px,5vw,64px)] font-extrabold text-white tracking-[-0.02em] mb-4">
          Choose your edge.
        </h1>
        <p className="text-base text-white/50">
          No hidden fees. No lock-in. Just pure alpha.
        </p>
      </section>

      {/* Pricing Cards */}
      <section ref={sectionRef} className="px-6 pb-20">
        <div className="max-w-[800px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pro Plan */}
          <div
            className="bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-10 hover:bg-white/[0.05] hover:border-white/[0.12] transition-all duration-400"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="mb-6">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] bg-[rgba(0,255,255,0.1)] text-[#00FFFF] px-3 py-1 rounded-full mb-4">
                Most Popular
              </span>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#00FFFF]" />
                Pro: Cognitive Edge
              </h2>
            </div>

            <div className="mb-6">
              <span className="font-mono-data text-[clamp(24px,3vw,40px)] font-bold text-white">$29</span>
              <span className="text-white/40 text-sm ml-2">/month</span>
            </div>

            <p className="text-sm text-white/50 mb-8">
              Full market intelligence for serious traders.
            </p>

            <ul className="space-y-3 mb-8">
              {proFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                  <Check className="w-4 h-4 text-[#00E396] mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="w-full bg-[#00FFFF] text-[#050505] font-semibold text-sm py-3.5 rounded-lg hover:bg-[#00E396] transition-all duration-300 hover:-translate-y-0.5">
              Get Pro
            </button>
          </div>

          {/* Founder Plan */}
          <div
            className="relative bg-white/[0.03] backdrop-blur-[24px] border border-[rgba(0,255,255,0.15)] rounded-2xl p-10 hover:bg-white/[0.05] transition-all duration-400"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(40px)",
              transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
            }}
          >
            {/* Glow Effect */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                background: "radial-gradient(circle at center, rgba(0,255,255,0.08) 0%, transparent 70%)",
              }}
            />

            <div className="relative mb-6">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[0.1em] bg-[rgba(0,227,150,0.1)] text-[#00E396] px-3 py-1 rounded-full mb-4">
                Founder
              </span>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#00E396]" />
                Protocol Founder
              </h2>
            </div>

            <div className="relative mb-6">
              <span className="font-mono-data text-[clamp(24px,3vw,40px)] font-bold text-[#00E396]">$499</span>
              <span className="text-white/40 text-sm ml-2">one-time</span>
            </div>

            <p className="relative text-sm text-white/50 mb-8">
              Lifetime access. Eternal edge.
            </p>

            <ul className="relative space-y-3 mb-8">
              {founderFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/70">
                  <Check className="w-4 h-4 text-[#00E396] mt-0.5 flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <button className="relative w-full bg-[#00E396] text-[#050505] font-semibold text-sm py-3.5 rounded-lg hover:bg-[#00d185] transition-all duration-300 hover:-translate-y-0.5">
              Become a Founder
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
