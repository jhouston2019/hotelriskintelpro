import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const SITE_PAGES = [
  {
    name: "Home",
    route: "/",
    file: "pages/index.js",
    description: "Public landing page — hero, features, pricing overview, and CTA",
    category: "Public",
    color: "bg-hrip-navy",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    name: "Intake Form",
    route: "/intake",
    file: "pages/intake.js",
    description: "7-step wizard collecting hotel profile, financials, insurance, loss history, operational risk, and location hazards",
    category: "App",
    color: "bg-hrip-blue",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "Dashboard",
    route: "/dashboard",
    file: "pages/dashboard.js → components/InputSummaryDashboard.js",
    description: "Input data summary — displays all 6 intake sections (hotel profile, financials, insurance, loss history, operations, location)",
    category: "App",
    color: "bg-hrip-blue",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    name: "Risk Report",
    route: "/report",
    file: "pages/report.js → components/SurvivabilityReportV2.js",
    description: "Full survivability analysis report — coverage gaps, BI exposure, financial risk scoring, and recommendations",
    category: "App",
    color: "bg-violet-700",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    name: "Pricing",
    route: "/pricing",
    file: "pages/pricing.js",
    description: "Subscription pricing page — plan tiers, features list, and sign-up CTA",
    category: "Public",
    color: "bg-emerald-700",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    name: "Login",
    route: "/login",
    file: "pages/login.js",
    description: "User login — email/password form, currently simulated (no real auth backend)",
    category: "Auth",
    color: "bg-slate-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    name: "Admin Login",
    route: "/admin/login",
    file: "pages/admin/login.js",
    description: "Admin authentication page — protected with hardcoded credentials",
    category: "Admin",
    color: "bg-hrip-gold",
    textDark: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    name: "Admin Dashboard",
    route: "/admin",
    file: "pages/admin/index.js",
    description: "This page — internal admin overview of all site pages",
    category: "Admin",
    color: "bg-hrip-gold",
    textDark: true,
    current: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    ),
  },
  {
    name: "Analyze (Redirect)",
    route: "/analyze",
    file: "pages/analyze.js",
    description: "Redirect stub — immediately forwards to /intake",
    category: "App",
    color: "bg-gray-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const CATEGORIES = ["All", "Public", "App", "Auth", "Admin"];

const CATEGORY_COLORS = {
  Public: "bg-hrip-navy/10 text-hrip-navy border-hrip-navy/20",
  App: "bg-blue-100 text-blue-700 border-blue-200",
  Auth: "bg-slate-100 text-slate-600 border-slate-200",
  Admin: "bg-amber-100 text-amber-700 border-amber-200",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("hrpAdminAuth") !== "true") {
        router.replace("/admin/login");
      } else {
        setAuthed(true);
      }
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("hrpAdminAuth");
    router.push("/admin/login");
  };

  const filtered = filter === "All" ? SITE_PAGES : SITE_PAGES.filter((p) => p.category === filter);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hrip-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-950 sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hrip-gold/10 ring-2 ring-hrip-gold/30">
              <svg className="w-4 h-4 text-hrip-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Hotel Risk Pro — Admin</p>
              <p className="text-xs text-slate-500">Internal page review dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" target="_blank" className="text-xs font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View Site
            </Link>
            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-red-500/50 hover:text-red-400 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
        {/* Stats row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Total Pages", value: SITE_PAGES.length },
            { label: "Public Pages", value: SITE_PAGES.filter((p) => p.category === "Public").length },
            { label: "App Pages", value: SITE_PAGES.filter((p) => p.category === "App").length },
            { label: "Admin Pages", value: SITE_PAGES.filter((p) => p.category === "Admin").length },
          ].map(({ label, value }) => (
            <div key={label} className="rounded-xl border border-slate-800 bg-slate-900 px-5 py-4">
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                filter === cat
                  ? "bg-hrip-gold text-slate-950"
                  : "border border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white"
              }`}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 opacity-70">
                  ({SITE_PAGES.filter((p) => p.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Page cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((page) => (
            <div
              key={page.route}
              className={`group rounded-2xl border bg-slate-900 overflow-hidden transition-all hover:border-slate-600 hover:shadow-xl hover:shadow-black/40 ${
                page.current ? "border-hrip-gold/40" : "border-slate-800"
              }`}
            >
              {/* Card header */}
              <div className={`flex items-center justify-between px-5 py-3.5 ${page.color}`}>
                <div className="flex items-center gap-2.5">
                  <span className={page.textDark ? "text-slate-900" : "text-white"}>
                    {page.icon}
                  </span>
                  <span className={`text-sm font-bold ${page.textDark ? "text-slate-900" : "text-white"}`}>
                    {page.name}
                  </span>
                </div>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${CATEGORY_COLORS[page.category]}`}
                  style={{ background: "rgba(255,255,255,0.15)", borderColor: "rgba(255,255,255,0.3)", color: page.textDark ? "#1e293b" : "white" }}
                >
                  {page.category}
                </span>
              </div>

              {/* Card body */}
              <div className="px-5 py-4 flex flex-col gap-3">
                <div>
                  <p className="text-xs font-mono text-slate-400">{page.route}</p>
                  <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{page.description}</p>
                </div>
                <div className="rounded-lg bg-slate-800/60 px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-600 mb-0.5">File</p>
                  <p className="text-xs font-mono text-slate-400 break-all">{page.file}</p>
                </div>
                <div className="flex gap-2 pt-1">
                  {page.current ? (
                    <span className="flex-1 rounded-lg bg-hrip-gold/10 border border-hrip-gold/30 px-3 py-2 text-xs font-semibold text-hrip-gold text-center">
                      Current page
                    </span>
                  ) : (
                    <Link
                      href={page.route}
                      target="_blank"
                      className="flex-1 rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open Page
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Credentials reminder */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600 mb-3">Admin Credentials</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-800 px-4 py-3">
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mb-0.5">Email</p>
              <p className="text-sm font-mono text-slate-200">admin@hotelriskpro.com</p>
            </div>
            <div className="rounded-lg bg-slate-800 px-4 py-3">
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide mb-0.5">Password</p>
              <p className="text-sm font-mono text-slate-200">HRP-Admin-2024</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-600 mt-3">These are hardcoded credentials for prototype use. Replace with real authentication before production.</p>
        </div>
      </div>
    </div>
  );
}
