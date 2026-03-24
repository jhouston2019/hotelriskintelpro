import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const ADMIN_EMAIL = "admin@hotelriskpro.com";
const ADMIN_PASSWORD = "HRP-Admin-2024";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("hrpAdminAuth") === "true") {
      router.replace("/admin");
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("hrpAdminAuth", "true");
        router.push("/admin");
      } else {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-hrip-navy">
      {/* Header */}
      <header className="border-b border-slate-800/60 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hrip-gold/10 ring-1 ring-hrip-gold/40">
              <span className="text-xs font-semibold tracking-tight text-hrip-gold">HR</span>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-100">Hotel Risk Pro</p>
              <p className="text-[11px] text-slate-400">Admin Access</p>
            </div>
          </Link>
          <Link href="/" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">
            ← Back to site
          </Link>
        </div>
      </header>

      {/* Login card */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          {/* Lock icon */}
          <div className="flex justify-center mb-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-hrip-gold/10 ring-2 ring-hrip-gold/30">
              <svg className="w-7 h-7 text-hrip-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-xl font-bold text-white">Admin Login</h1>
            <p className="mt-1 text-xs text-slate-400">Restricted access — Hotel Risk Pro internal</p>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-900/80 p-6 shadow-2xl shadow-black/50">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold transition-colors"
                  placeholder="admin@hotelriskpro.com"
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold transition-colors"
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                />
              </div>

              {error && (
                <div className="rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2.5">
                  <p className="text-xs font-medium text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 w-full rounded-lg bg-hrip-gold px-4 py-2.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/20 hover:bg-amber-300 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying...
                  </span>
                ) : "Sign In"}
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-[11px] text-slate-600">
            This area is restricted to authorised administrators only.
          </p>
        </div>
      </main>
    </div>
  );
}
