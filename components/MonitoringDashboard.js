import Link from "next/link";
import { useState, useEffect } from "react";

export default function MonitoringDashboard() {
  const [hotelData, setHotelData] = useState(null);
  const [daysUntilRenewal, setDaysUntilRenewal] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("hotelRiskAnalysis");
    if (stored) {
      const data = JSON.parse(stored);
      setHotelData(data);
      
      if (data.insurancePolicy?.policyPeriodEnd) {
        const endDate = new Date(data.insurancePolicy.policyPeriodEnd);
        const today = new Date();
        const diffTime = endDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysUntilRenewal(diffDays);
      }
    }
  }, []);

  if (!hotelData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-hrip-navy via-hrip-charcoal to-black">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-12 text-center">
            <h2 className="text-xl font-semibold text-slate-100">
              No Hotel Analysis Found
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Complete your insurance survivability analysis to start monitoring.
            </p>
            <div className="mt-6">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center rounded-md bg-hrip-gold px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
              >
                Start Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const survivabilityScore = 47;
  const openIssues = 4;

  return (
    <div className="min-h-screen bg-gradient-to-b from-hrip-navy via-hrip-charcoal to-black">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-100">
              {hotelData.hotelProfile?.hotelName || "Your Hotel"}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Insurance Survivability Monitoring
            </p>
          </div>
          <Link
            href="/report"
            className="text-sm text-hrip-gold hover:text-amber-300 transition-colors"
          >
            View Full Report →
          </Link>
        </div>

        {/* Key Metrics */}
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          <div className="rounded-xl border border-red-900/40 bg-red-950/20 p-5">
            <p className="text-xs text-red-300">Survivability Score</p>
            <p className="mt-2 text-3xl font-bold text-red-400">
              {survivabilityScore}
              <span className="text-lg text-slate-500">/100</span>
            </p>
            <p className="mt-2 text-[10px] text-slate-500">Last updated today</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-xs text-slate-400">Renewal Countdown</p>
            <p className="mt-2 text-3xl font-bold text-slate-100">
              {daysUntilRenewal}
            </p>
            <p className="mt-2 text-[10px] text-slate-500">Days until renewal</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-xs text-slate-400">Open Priority Issues</p>
            <p className="mt-2 text-3xl font-bold text-amber-400">
              {openIssues}
            </p>
            <p className="mt-2 text-[10px] text-slate-500">Require attention</p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-5">
            <p className="text-xs text-slate-400">New Claims</p>
            <p className="mt-2 text-3xl font-bold text-slate-100">
              0
            </p>
            <p className="mt-2 text-[10px] text-slate-500">Since last review</p>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/80 p-6">
          <h2 className="text-lg font-semibold text-slate-100">Priority Actions</h2>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-100">
                    Increase business interruption coverage duration
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Current BI coverage may run out before full recovery
                  </p>
                </div>
                <span className="rounded-full bg-red-500/10 px-2 py-1 text-[10px] font-medium text-red-300 whitespace-nowrap">
                  Fix Before Renewal
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-100">
                    Correct property underinsurance gap
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Property coverage is below estimated replacement cost
                  </p>
                </div>
                <span className="rounded-full bg-amber-500/10 px-2 py-1 text-[10px] font-medium text-amber-300 whitespace-nowrap">
                  Fix Before Renewal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Update Prompts */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/80 p-6">
          <h2 className="text-lg font-semibold text-slate-100">Keep Your Analysis Current</h2>
          <p className="mt-2 text-sm text-slate-400">
            Answer these quick questions to maintain analysis accuracy.
          </p>
          <div className="mt-4 space-y-3">
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-sm text-slate-300">Any new claims since your last review?</p>
              <div className="mt-3 flex gap-3">
                <button className="rounded-md border border-slate-700 px-4 py-1.5 text-xs text-slate-300 hover:bg-slate-900">
                  No
                </button>
                <button className="rounded-md border border-hrip-gold/30 px-4 py-1.5 text-xs text-hrip-gold hover:bg-hrip-gold/10">
                  Yes, add claim
                </button>
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-sm text-slate-300">Has revenue changed materially?</p>
              <div className="mt-3 flex gap-3">
                <button className="rounded-md border border-slate-700 px-4 py-1.5 text-xs text-slate-300 hover:bg-slate-900">
                  No
                </button>
                <button className="rounded-md border border-hrip-gold/30 px-4 py-1.5 text-xs text-hrip-gold hover:bg-hrip-gold/10">
                  Yes, update revenue
                </button>
              </div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
              <p className="text-sm text-slate-300">Any major renovations or added amenities?</p>
              <div className="mt-3 flex gap-3">
                <button className="rounded-md border border-slate-700 px-4 py-1.5 text-xs text-slate-300 hover:bg-slate-900">
                  No
                </button>
                <button className="rounded-md border border-hrip-gold/30 px-4 py-1.5 text-xs text-hrip-gold hover:bg-hrip-gold/10">
                  Yes, update property
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/report"
            className="rounded-md bg-hrip-gold px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
          >
            View Full Report
          </Link>
          <Link
            href="/intake"
            className="rounded-md border border-slate-700 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900"
          >
            Update Risk Profile
          </Link>
          <button className="rounded-md border border-slate-700 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900">
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}
