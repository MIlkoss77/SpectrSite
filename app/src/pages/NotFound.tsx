import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="font-mono-data text-[clamp(64px,12vw,120px)] font-bold text-[#00FFFF]/20 mb-4">
          404
        </h1>
        <h2 className="text-2xl font-bold text-white mb-2">Signal not found.</h2>
        <p className="text-sm text-white/40 mb-8">
          This frequency doesn&apos;t exist. Return to base.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#00FFFF] text-[#050505] font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#00E396] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </main>
  );
}
