import { useEffect, useRef, useState } from "react";

const terminalLines = [
  { text: "$ spectr --monitor BTC/USDT", color: "#00FFFF", delay: 0 },
  { text: "[14:23:07] Whale alert: 2,400 BTC moved to cold storage", color: "#00E396", delay: 800 },
  { text: "[14:23:12] AI Confidence: 87% — Bullish divergence on 4H", color: "#FFFFFF", delay: 1600 },
  { text: "[14:23:15] MEXC/Binance spread: +0.34% ($128 profit/10K)", color: "#00FFFF", delay: 2400 },
  { text: "$ spectr --track whale-0x7a...3f21", color: "rgba(255,255,255,0.5)", delay: 3200 },
  { text: "[14:23:19] New position: 450 ETH → Uniswap V3", color: "#00E396", delay: 4000 },
];

export default function TerminalPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [typedTexts, setTypedTexts] = useState<string[]>([]);
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

  useEffect(() => {
    if (!isVisible) return;

    let lineIndex = 0;
    let charIndex = 0;
    const texts: string[] = new Array(terminalLines.length).fill("");

    const typeInterval = setInterval(() => {
      if (lineIndex >= terminalLines.length) {
        clearInterval(typeInterval);
        return;
      }

      const line = terminalLines[lineIndex];
      if (charIndex < line.text.length) {
        texts[lineIndex] = line.text.slice(0, charIndex + 1);
        setTypedTexts([...texts]);
        charIndex++;
      } else {
        lineIndex++;
        charIndex = 0;
        setVisibleLines(lineIndex);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [isVisible]);

  return (
    <section ref={sectionRef} className="relative z-10 px-6 py-[120px]">
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-1 h-1 rounded-full bg-[#00FFFF]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#00FFFF]/60">
              The Terminal
            </span>
          </div>
          <h2 className="text-[clamp(28px,3.5vw,48px)] font-bold text-white tracking-[-0.015em]">
            See what others don&apos;t.
          </h2>
        </div>

        {/* Terminal Window */}
        <div
          className="bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl overflow-hidden"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(80px)",
            transition: "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {/* Title Bar */}
          <div className="h-10 bg-[rgba(0,0,0,0.5)] flex items-center px-4 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <span className="w-3 h-3 rounded-full bg-[#28CA42]" />
            </div>
            <span className="flex-1 text-center font-mono-data text-xs text-white/40">
              spectr-terminal v2.4
            </span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono-data text-[13px] leading-relaxed min-h-[280px]">
            {terminalLines.map((line, i) => (
              <div
                key={i}
                className="mb-2"
                style={{
                  opacity: i <= visibleLines ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              >
                <span style={{ color: line.color }}>
                  {typedTexts[i] || ""}
                  {i === visibleLines && (
                    <span className="inline-block w-2 h-4 bg-[#00FFFF] ml-0.5 animate-pulse" />
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
