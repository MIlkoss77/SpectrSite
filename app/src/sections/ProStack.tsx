import { Brain, Cpu, Activity, Zap, Database, Globe, Network, Shield, Fingerprint } from "lucide-react";

export default function ProStack() {
  return (
    <section id="pro-stack" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            The <span className="text-[#00FFFF] glow-cyan-text">Pro Stack</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            A dual-engine approach combining advanced market intelligence with human performance optimization.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#00FFFF]/20 to-transparent -translate-x-1/2" />

          {/* Left Column: AI Power */}
          <div className="glass-panel p-8 rounded-2xl border border-white/[0.05] relative overflow-hidden group hover:border-[#00FFFF]/30 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FFFF]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#00FFFF]/10 transition-colors duration-500" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#00FFFF]/10 flex items-center justify-center border border-[#00FFFF]/20">
                <Cpu className="w-6 h-6 text-[#00FFFF]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">AI Power</h3>
                <p className="text-white/50 text-sm">The Machine Engine</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1"><Zap className="w-5 h-5 text-[#00FFFF]" /></div>
                <div>
                  <h4 className="text-white font-semibold">Scout Signals</h4>
                  <p className="text-white/60 text-sm mt-1">Real-time AI validation. Sub-second alpha detection.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Globe className="w-5 h-5 text-[#00FFFF]" /></div>
                <div>
                  <h4 className="text-white font-semibold">NLP News Sentiment</h4>
                  <p className="text-white/60 text-sm mt-1">Filtering the noise. Instant market impact scoring.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Network className="w-5 h-5 text-[#00FFFF]" /></div>
                <div>
                  <h4 className="text-white font-semibold">Arbitrage Monitoring</h4>
                  <p className="text-white/60 text-sm mt-1">Continuous scanning for cross-exchange price gaps.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Database className="w-5 h-5 text-[#00FFFF]" /></div>
                <div>
                  <h4 className="text-white font-semibold">Predictive Models</h4>
                  <p className="text-white/60 text-sm mt-1">Statistical edge derived from deep historical pattern matching.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Biological Edge */}
          <div className="glass-panel p-8 rounded-2xl border border-white/[0.05] relative overflow-hidden group hover:border-[#00E396]/30 transition-colors duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E396]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#00E396]/10 transition-colors duration-500" />
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-[#00E396]/10 flex items-center justify-center border border-[#00E396]/20">
                <Brain className="w-6 h-6 text-[#00E396]" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Biological Edge</h3>
                <p className="text-white/50 text-sm">The Human Optimization</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="mt-1"><Activity className="w-5 h-5 text-[#00E396]" /></div>
                <div>
                  <h4 className="text-white font-semibold">Academy Access</h4>
                  <p className="text-white/60 text-sm mt-1">Master classes on the intersection of trading and neuroscience.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Fingerprint className="w-5 h-5 text-[#00E396]" /></div>
                <div>
                  <h4 className="text-white font-semibold">Neuro-Guides</h4>
                  <p className="text-white/60 text-sm mt-1">Actionable protocols for focus, endurance, and tilt prevention.</p>
                </div>
              </div>
              
              {/* Spectr Club Callout */}
              <div className="mt-8 p-5 rounded-xl bg-gradient-to-br from-[#00E396]/10 to-transparent border border-[#00E396]/20">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-[#00E396]" />
                  <h4 className="text-white font-bold">Spectr Club Inner Circle</h4>
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-3">
                  Unlock access to our private, invite-only Discord community. An elite hub where high-performers share insights on:
                </p>
                <ul className="text-sm text-[#00E396] space-y-2 list-disc list-inside">
                  <li>Cutting-edge supplements & nootropics</li>
                  <li>Applied neurobiology for traders</li>
                  <li>Performance psychology & stress management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center">
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-[#00FFFF] text-[#050505] font-semibold text-sm px-8 py-4 rounded-lg hover:bg-[#00E396] transition-all duration-300 hover:-translate-y-0.5 glow-cyan"
          >
            Upgrade to Pro Stack
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
