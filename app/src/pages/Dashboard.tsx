import { useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import { User, BarChart3, Zap, Shield, Brain, TrendingUp, Settings, MessageSquare } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isLoading, isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <main className="relative z-10 pt-[72px] min-h-screen flex items-center justify-center">
        <div className="text-white/40 text-sm">Loading...</div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="relative z-10 pt-[72px]">
      <section className="px-6 py-12">
        <div className="max-w-[1200px] mx-auto">
          {/* Welcome Banner */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome back, <span className="text-[#00FFFF]">{user.name}</span>
            </h1>
            <p className="text-sm text-white/40">
              Here&apos;s your trading intelligence overview.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              {
                icon: Shield,
                label: "Account Status",
                value: "Active",
                color: "#00E396",
                sub: "Pro Plan",
              },
              {
                icon: Zap,
                label: "Signals Today",
                value: "147",
                color: "#00FFFF",
                sub: "+12 from yesterday",
              },
              {
                icon: BarChart3,
                label: "API Usage",
                value: "2,847",
                color: "#00FFFF",
                sub: "of 100,000 limit",
              },
              {
                icon: Brain,
                label: "AI Predictions",
                value: "87%",
                color: "#00E396",
                sub: "avg. accuracy",
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}10` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: stat.color }} />
                    </div>
                    <span className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</span>
                  </div>
                  <p className="font-mono-data text-2xl font-bold text-white mb-1">{stat.value}</p>
                  <p className="text-xs text-white/30">{stat.sub}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#00FFFF]" />
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/intel"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                >
                  <span className="text-sm text-white/70">View Signal Feed</span>
                  <Zap className="w-4 h-4 text-[#00E396]" />
                </Link>
                <Link
                  to="/pricing"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                >
                  <span className="text-sm text-white/70">Upgrade Plan</span>
                  <Shield className="w-4 h-4 text-[#00FFFF]" />
                </Link>
                <Link
                  to="/contact"
                  className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                >
                  <span className="text-sm text-white/70">Contact Support</span>
                  <MessageSquare className="w-4 h-4 text-[#00FFFF]" />
                </Link>
              </div>
            </div>

            <div className="bg-white/[0.03] backdrop-blur-[24px] border border-white/[0.08] rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5 text-[#00E396]" />
                Account
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00FFFF]/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-[#00FFFF]" />
                  </div>
                  <div>
                    <p className="text-sm text-white font-medium">{user.name}</p>
                    <p className="text-xs text-white/40 capitalize">{user.role} account</p>
                  </div>
                </div>
                <div className="pt-3 border-t border-white/[0.06]">
                  <p className="text-xs text-white/30 mb-1">Auth Method</p>
                  <p className="text-sm text-white/60 capitalize">{user.authType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
