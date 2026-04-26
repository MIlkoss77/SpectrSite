import { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    window.location.href = "https://app.spectrtrading.com/login";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00FFFF]"></div>
        <p className="text-white/40 font-medium tracking-widest uppercase text-xs">Redirecting to Protocol Terminal...</p>
      </div>
    </div>
  );
}
