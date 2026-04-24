import { useEffect, useRef } from "react";
import { Brain, Eye, Globe, Zap, Shield, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Cognitive Edge",
    description: "LLM-powered technical analysis with confidence scores. Our AI reads the market narrative before it becomes consensus.",
    metric: null,
    accent: "cyan",
    span: "col-span-12 md:col-span-4",
  },
  {
    icon: Eye,
    title: "Whale Tracking",
    description: "Monitor whale wallets across 8 chains. Spot accumulation before the pump.",
    metric: "2,847 wallets tracked",
    accent: "green",
    span: "col-span-12 md:col-span-4",
  },
  {
    icon: Globe,
    title: "Cross-Exchange Mastery",
    description: "Real-time arbitrage across Binance, Bybit, and MEXC. Network fees and latency factored.",
    metric: "3 exchanges | 147 pairs",
    accent: "cyan",
    span: "col-span-12 md:col-span-4",
  },
  {
    icon: Zap,
    title: "Ferocious Scout",
    description: "Real-time intelligence from elite Telegram channels and on-chain feeds. Signal before noise.",
    metric: null,
    accent: "green",
    span: "col-span-12 md:col-span-4",
    live: true,
  },
  {
    icon: Shield,
    title: "Protocol Security",
    description: "Encrypted API keys. Zero-knowledge architecture. Your data never leaves your control.",
    metric: null,
    accent: "cyan",
    span: "col-span-12 md:col-span-4",
  },
  {
    icon: TrendingUp,
    title: "Alpha Velocity",
    description: "Average signal-to-profit window: 4.2 hours. Track. Trade. Win.",
    metric: "+340% avg. ROI tracked",
    accent: "green",
    span: "col-span-12 md:col-span-4",
  },
];

export default function BentoFeatures() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = el.querySelectorAll(".bento-card");
            cards.forEach((card, i) => {
              const htmlEl = card as HTMLElement;
              htmlEl.style.transition = `opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s, transform 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s`;
              htmlEl.style.opacity = "1";
              htmlEl.style.transform = "translateY(0)";
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="relative z-10 px-6 py-[120px]">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-1 rounded-full bg-[#00FFFF]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00FFFF]/60">
              Alpha Velocity Integrated
            </span>
          </div>
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold text-white tracking-[-0.015em]">
            Everything you need. Nothing you don&apos;t.
          </h2>
        </div>

        {/* Bento Grid */}
        <div ref={gridRef} className="grid grid-cols-12 gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            const accentColor = feature.accent === "cyan" ? "#00FFFF" : "#00E396";

            return (
              <div
                key={i}
                className={`bento-card ${feature.span} bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-8 hover:bg-white/[0.05] hover:border-white/[0.12] hover:-translate-y-0.5 transition-all duration-400 group`}
                style={{
                  opacity: 0,
                  transform: "translateY(60px)",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${accentColor}10` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: accentColor }} />
                    </div>
                    {feature.live && (
                      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#00E396]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E396] animate-pulse" />
                        LIVE
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed flex-1">{feature.description}</p>

                  {feature.metric && (
                    <p className="font-mono-data text-xs mt-4" style={{ color: accentColor }}>
                      {feature.metric}
                    </p>
                  )}

                  {/* Subtle gradient overlay */}
                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-full opacity-20 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${accentColor}20 0%, transparent 70%)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
