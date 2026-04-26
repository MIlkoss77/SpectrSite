import { useState } from "react";
import { Link } from "react-router";
import { LogIn, UserPlus, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { trpc } from "@/providers/trpc";

function getOAuthUrl() {
  const kimiAuthUrl = import.meta.env.VITE_KIMI_AUTH_URL;
  const appID = import.meta.env.VITE_APP_ID;
  const redirectUri = `${window.location.origin}/api/oauth/callback`;
  const state = btoa(redirectUri);

  const url = new URL(`${kimiAuthUrl}/api/oauth/authorize`);
  url.searchParams.set("client_id", appID);
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "profile");
  url.searchParams.set("state", state);

  return url.toString();
}

export default function Login() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const registerMutation = trpc.localAuth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem("local_auth_token", data.token);
      window.location.href = "/";
    },
    onError: (err) => setError(err.message),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "register") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords don't match");
        return;
      }
      registerMutation.mutate({
        username: formData.username,
        displayName: formData.displayName || undefined,
        email: formData.email || undefined,
        password: formData.password,
      });
    } else {
      loginMutation.mutate({
        username: formData.username,
        password: formData.password,
      });
    }
  };

  const isPending = loginMutation.isPending || registerMutation.isPending;

  return (
    <main className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-[420px]">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>

        {/* Auth Card */}
        <div className="bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <img src="/logo.png" alt="Spectr Logo" className="w-10 h-10 object-contain rounded-xl transition-transform duration-500 hover:scale-110" />
              <div className="flex items-center font-black tracking-tighter text-2xl">
                <span className="text-white">SPECTR</span>
                <span className="text-[#00FFFF] ml-2">Trading</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-white">
              {mode === "login" ? "Welcome back" : "Create account"}
            </h2>
            <p className="text-sm text-white/40 mt-1">
              {mode === "login" ? "Sign in to your Spectr account" : "Join the elite"}
            </p>
          </div>

          {/* OAuth */}
          <button
            onClick={() => { window.location.href = getOAuthUrl(); }}
            className="w-full bg-white text-[#050505] font-semibold text-sm py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
          >
            Continue with Kimi
          </button>

          <button
            onClick={() => { window.location.href = `${import.meta.env.VITE_API_BASE || 'http://localhost:3000'}/api/auth/google`; }}
            className="w-full mt-3 bg-white text-[#050505] font-semibold text-sm py-3 rounded-lg hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-white/[0.08]" />
            <span className="text-xs text-white/30 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/[0.08]" />
          </div>

          {/* Local Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Username"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00FFFF]/50 transition-colors"
              />
            </div>

            {mode === "register" && (
              <>
                <div>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    placeholder="Display name (optional)"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00FFFF]/50 transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Email (optional)"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00FFFF]/50 transition-colors"
                  />
                </div>
              </>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Password"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00FFFF]/50 transition-colors pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {mode === "register" && (
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="Confirm password"
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-[#00FFFF]/50 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            )}

            {error && <p className="text-xs text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-[#00FFFF] text-[#050505] font-semibold text-sm py-3.5 rounded-lg hover:bg-[#00E396] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {mode === "login" ? (
                <>
                  <LogIn className="w-4 h-4" />
                  {isPending ? "Signing in..." : "Sign In"}
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  {isPending ? "Creating..." : "Create Account"}
                </>
              )}
            </button>
          </form>

          {/* Toggle */}
          <p className="text-center text-sm text-white/40 mt-6">
            {mode === "login" ? (
              <>
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => { setMode("register"); setError(""); }}
                  className="text-[#00FFFF] hover:text-[#00E396] transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => { setMode("login"); setError(""); }}
                  className="text-[#00FFFF] hover:text-[#00E396] transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
