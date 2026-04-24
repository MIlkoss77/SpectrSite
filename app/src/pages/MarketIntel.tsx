import { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Fish, Signal } from "lucide-react";

const signals = [
  { id: 1, time: "14:23:07", type: "BULLISH" as const, asset: "BTC/USDT", confidence: 87, source: "on-chain", text: "AI detects bullish divergence on 4H timeframe" },
  { id: 2, time: "14:21:33", type: "WHALE" as const, asset: "ETH", confidence: 92, source: "exchange", text: "12,400 ETH moved from cold wallet to Binance hot" },
  { id: 3, time: "14:19:45", type: "BEARISH" as const, asset: "SOL/USDT", confidence: 71, source: "exchange", text: "Large sell wall detected at $142" },
  { id: 4, time: "14:17:12", type: "BULLISH" as const, asset: "ARB/USDT", confidence: 78, source: "on-chain", text: "Whale accumulation pattern across 6 wallets" },
  { id: 5, time: "14:15:00", type: "WHALE" as const, asset: "DOGE", confidence: 65, source: "on-chain", text: "Elon-related wallet activated after 6 months dormancy" },
  { id: 6, time: "14:12:28", type: "BULLISH" as const, asset: "LINK/USDT", confidence: 94, source: "exchange", text: "Cross-exchange arbitrage opportunity: +0.8%" },
  { id: 7, time: "14:10:55", type: "BEARISH" as const, asset: "AVAX/USDT", confidence: 82, source: "exchange", text: "Funding rate spike suggests overcrowded longs" },
  { id: 8, time: "14:08:11", type: "WHALE" as const, asset: "MATIC", confidence: 88, source: "on-chain", text: "45M tokens unstaked, potential sell pressure" },
];

const filters = ["All", "Bullish", "Bearish", "Whale"] as const;

function getSignalConfig(type: string) {
  switch (type) {
    case "BULLISH":
      return { bg: "rgba(0,227,150,0.1)", text: "#00E396", icon: TrendingUp };
    case "BEARISH":
      return { bg: "rgba(255,80,80,0.1)", text: "#ff5050", icon: TrendingDown };
    case "WHALE":
      return { bg: "rgba(0,255,255,0.1)", text: "#00FFFF", icon: Fish };
    default:
      return { bg: "rgba(255,255,255,0.05)", text: "#FFFFFF", icon: Signal };
  }
}

export default function MarketIntel() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [visibleSignals, setVisibleSignals] = useState<number[]>([]);
  const streamRef = useRef<HTMLDivElement>(null);

  const filteredSignals = signals.filter((s) =>
    activeFilter === "All" ? true : s.type === activeFilter.toUpperCase()
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = streamRef.current?.querySelectorAll(".signal-card");
            cards?.forEach((_card, i) => {
              setTimeout(() => {
                setVisibleSignals((prev) => [...prev, i]);
              }, i * 100);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (streamRef.current) observer.observe(streamRef.current);
    return () => observer.disconnect();
  }, [activeFilter]);

  useEffect(() => {
    setVisibleSignals([]);
  }, [activeFilter]);

  return (
    <main className="relative z-10 pt-[72px]">
      {/* Hero */}
      <section className="min-h-[50vh] flex flex-col justify-center px-6 py-20">
        <div className="max-w-[900px] mx-auto w-full">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1 h-1 rounded-full bg-[#00FFFF]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00FFFF]/60">
              Market Intel
            </span>
          </div>
          <h1 className="text-[clamp(36px,5vw,64px)] font-extrabold text-white tracking-[-0.02em] mb-4">
            Alpha before it hits Twitter.
          </h1>
          <p className="text-base text-white/50 max-w-[520px] leading-relaxed mb-8">
            Real-time signal stream from the darkest corners of the market. Filtered. Verified. Actionable.
          </p>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-[#00FFFF] text-[#050505]"
                    : "bg-white/[0.03] text-white/60 border border-white/[0.08] hover:border-[#00FFFF]/30 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Signal Stream */}
      <section className="px-6 pb-20">
        <div className="max-w-[900px] mx-auto">
          <div
            ref={streamRef}
            className="bg-[rgba(0,0,0,0.5)] border border-white/[0.06] rounded-2xl overflow-hidden max-h-[70vh] overflow-y-auto"
          >
            {filteredSignals.map((signal, i) => {
              const config = getSignalConfig(signal.type);
              const Icon = config.icon;

              return (
                <div
                  key={signal.id}
                  className="signal-card px-6 py-5 border-b border-white/[0.04] hover:bg-white/[0.02] hover:border-l-2 hover:border-l-[#00FFFF] transition-all duration-300 cursor-pointer"
                  style={{
                    opacity: visibleSignals.includes(i) ? 1 : 0,
                    transform: visibleSignals.includes(i) ? "translateY(0)" : "translateY(-20px)",
                    transition: "opacity 0.4s ease, transform 0.4s ease",
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-data text-xs text-white/30">{signal.time}</span>
                    <span
                      className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ backgroundColor: config.bg, color: config.text }}
                    >
                      <Icon className="w-3 h-3" />
                      {signal.type}
                    </span>
                  </div>
                  <p className="text-sm text-white/80 mb-2">{signal.text}</p>
                  <div className="flex items-center gap-4">
                    <span className="font-mono-data text-xs text-[#00FFFF]">{signal.asset}</span>
                    <span className="font-mono-data text-xs text-[#00E396]">{signal.confidence}% confidence</span>
                    <span className="text-[11px] text-white/30 uppercase tracking-wider">{signal.source}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {[
              { value: "147", label: "SIGNALS TODAY", color: "#00FFFF" },
              { value: "78.4%", label: "ACCURACY", color: "#00E396" },
              { value: "4.2h", label: "TIME TO PROFIT", color: "#FFFFFF" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-6 text-center"
              >
                <p className="font-mono-data text-[clamp(24px,3vw,40px)] font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-[11px] font-semibold text-white/40 uppercase tracking-[0.1em] mt-1">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
