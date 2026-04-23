import { Link } from "react-router";
import { Zap, Shield, Brain, BarChart3, Eye, Globe, TrendingUp, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#050505] border-t border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Spectr Logo" className="w-8 h-8 object-contain rounded-lg transition-transform duration-500 group-hover:scale-110" />
              <div className="flex items-center font-black tracking-tighter text-xl">
                <span className="text-white">SPECTR</span>
                <span className="text-[#00FFFF] ml-1.5">Trading</span>
              </div>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              For people who don&apos;t stop.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a href="#" className="text-white/40 hover:text-[#00FFFF] transition-colors duration-300" title="X (Twitter)">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-[#00FFFF] transition-colors duration-300" title="Telegram">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42l10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.702l-.333 4.965c.488 0 .704-.223.977-.485l2.344-2.279l4.875 3.6c.898.496 1.543.241 1.767-.83l3.194-15.048c.328-1.312-.5-1.907-1.355-1.529z" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-[#00FFFF] transition-colors duration-300" title="Discord">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025 13.225 13.225 0 0 0-3.257 1.011.041.041 0 0 0-.021.018C.356 6.024-.126 9.047.035 12.032a.057.057 0 0 0 .021.037c1.39 1.026 2.737 1.644 4.064 2.051a.053.053 0 0 0 .058-.019c.322-.442.605-.917.848-1.415a.053.053 0 0 0-.029-.073c-.447-.169-.871-.374-1.272-.612a.052.052 0 0 1-.005-.088 8.653 8.653 0 0 0 .255-.201.048.048 0 0 1 .05-.007c2.652 1.214 5.523 1.214 8.141 0a.048.048 0 0 1 .05.007c.085.066.17.132.255.201a.052.052 0 0 1-.005.088 9.71 9.71 0 0 1-1.272.612.053.053 0 0 0-.029.073c.245.497.527.972.848 1.415a.053.053 0 0 0 .058.019c1.332-.407 2.679-1.025 4.064-2.051a.056.056 0 0 0 .021-.037c.19-3.474-.303-6.471-2.505-9.125a.043.043 0 0 0-.021-.018ZM6.235 10.53c-.791 0-1.446-.72-1.446-1.604c0-.884.637-1.604 1.446-1.604s1.464.72 1.464 1.604c0 .884-.637 1.604-1.464 1.604Zm4.53 0c-.791 0-1.446-.72-1.446-1.604c0-.884.637-1.604 1.446-1.604s1.464.72 1.464 1.604c0 .884-.637 1.604-1.464 1.604Z" />
                </svg>
              </a>
              <a href="#" className="text-white/40 hover:text-[#00FFFF] transition-colors duration-300" title="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-[0.15em] mb-4">Product</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#00FFFF] transition-colors">
                <Brain className="w-4 h-4" /> AI Predictor
              </Link>
              <Link to="/" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#00FFFF] transition-colors">
                <Eye className="w-4 h-4" /> Whale Tracking
              </Link>
              <Link to="/" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#00FFFF] transition-colors">
                <Globe className="w-4 h-4" /> Cross-Exchange
              </Link>
              <Link to="/intel" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#00FFFF] transition-colors">
                <Zap className="w-4 h-4" /> Degen Intel
              </Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-[0.15em] mb-4">Company</h4>
            <div className="flex flex-col gap-3">
              <Link to="/" className="text-sm text-white/40 hover:text-[#00FFFF] transition-colors">About</Link>
              <Link to="/" className="text-sm text-white/40 hover:text-[#00FFFF] transition-colors">Blog</Link>
              <Link to="/contact" className="text-sm text-white/40 hover:text-[#00FFFF] transition-colors">Contact</Link>
              <Link to="/pricing" className="text-sm text-white/40 hover:text-[#00FFFF] transition-colors">Pricing</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white/60 uppercase tracking-[0.15em] mb-4">Legal</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="text-sm text-white/40 hover:text-[#00FFFF] transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-white/40 hover:text-[#00FFFF] transition-colors">Terms of Service</a>
              <a href="#" className="text-sm text-white/40 hover:text-[#00FFFF] transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-mono-data text-xs text-white/30">
            &copy; 2026 Spectr Trading. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <Shield className="w-3 h-3 text-[#00E396]" /> End-to-end encrypted
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <BarChart3 className="w-3 h-3 text-[#00FFFF]" /> 99.7% uptime
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/30">
              <TrendingUp className="w-3 h-3 text-[#00E396]" /> +340% avg ROI
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
