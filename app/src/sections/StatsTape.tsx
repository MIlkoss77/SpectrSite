const stats = [
  { value: "$2.4B+", label: "TRACKED VOLUME" },
  { value: "47", label: "EXCHANGES" },
  { value: "12,400+", label: "ALPHA SIGNALS" },
  { value: "99.7%", label: "UPTIME" },
  { value: "<50ms", label: "LATENCY" },
  { value: "24/7", label: "INTELLIGENCE" },
];

export default function StatsTape() {
  return (
    <section className="relative z-10 w-full h-20 bg-[rgba(0,0,0,0.4)] border-y border-white/[0.06] overflow-hidden flex items-center">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...stats, ...stats, ...stats].map((stat, i) => (
          <div key={i} className="flex items-center gap-6 mx-8">
            <span className="font-mono-data text-sm font-medium text-white tracking-[0.02em]">
              {stat.value}
            </span>
            <span className="font-mono-data text-xs text-white/40 uppercase tracking-[0.05em]">
              {stat.label}
            </span>
            <span className="w-1 h-1 bg-[#00FFFF] rotate-45" />
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
