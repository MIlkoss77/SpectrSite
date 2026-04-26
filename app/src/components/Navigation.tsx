import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Menu, X, LogOut, User, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const navLinks = [
    { label: "Features", path: "/#features" },
    { label: "Market Intel", path: "/intel" },
    { label: "Pro Stack", path: "/#pro-stack" },
    { label: "Academy", path: "/#academy" },
    { label: "Pricing", path: "/pricing" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(5,5,5,0.7)] backdrop-blur-[24px] border-b border-white/[0.06]">
      <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <img 
              src="/logo.png" 
              alt="Spectr Logo" 
              className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex items-center font-black tracking-tighter text-2xl">
            <span className="text-white">SPECTR</span>
            <span className="text-[#00FFFF] ml-2">Trading</span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isHashLink = link.path.startsWith("/#");
            const isActive = isHashLink 
              ? (location.pathname === "/" && location.hash === link.path.substring(1))
              : (location.pathname === link.path);

            return (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#00FFFF]"
                    : "text-white/60 hover:text-[#00FFFF]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {isAdmin && (
            <Link
              to="/messages"
              className={`text-sm font-medium transition-colors duration-300 flex items-center gap-1 ${
                location.pathname === "/messages"
                  ? "text-[#00FFFF]"
                  : "text-white/60 hover:text-[#00FFFF]"
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin
            </Link>
          )}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
              >
                <User className="w-4 h-4" />
                {user.name || user.username || 'Trader'}
              </Link>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-sm text-white/40 hover:text-[#00FFFF] transition-colors border border-white/[0.15] rounded-lg px-4 py-2 hover:border-[#00FFFF]"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <a
                href="https://app.spectrtrading.com/login"
                className="text-sm font-semibold text-white/60 hover:text-[#00FFFF] transition-colors"
              >
                Login
              </a>
              <a
                href="https://app.spectrtrading.com/login"
                className="text-sm font-semibold text-[#050505] bg-[#00FFFF] rounded-lg px-6 py-2.5 hover:bg-[#00E396] transition-all duration-300 shadow-[0_0_20px_rgba(0,255,255,0.35)] hover:shadow-[0_0_28px_rgba(0,255,255,0.55)]"
              >
                Sign Up
              </a>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[rgba(5,5,5,0.95)] backdrop-blur-[32px] border-t border-white/[0.06] px-6 py-6">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isHashLink = link.path.startsWith("/#");
              const isActive = isHashLink 
                ? (location.pathname === "/" && location.hash === link.path.substring(1))
                : (location.pathname === link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-base font-medium ${
                    isActive
                      ? "text-[#00FFFF]"
                      : "text-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                to="/messages"
                onClick={() => setMobileOpen(false)}
                className="text-base font-medium text-white/60 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Admin Dashboard
              </Link>
            )}
            <div className="border-t border-white/[0.06] pt-4 mt-2 flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 text-white/60"
                  >
                    <User className="w-4 h-4" />
                    {user.name || user.username || 'Trader'}
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false); }}
                    className="flex items-center gap-2 text-[#00FFFF]"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <a
                    href="https://app.spectrtrading.com/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-center text-white/60 py-2.5 font-semibold"
                  >
                    Login
                  </a>
                  <a
                    href="https://app.spectrtrading.com/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-center text-[#050505] bg-[#00FFFF] rounded-lg py-2.5 font-semibold shadow-[0_0_20px_rgba(0,255,255,0.35)]"
                  >
                    Sign Up
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
