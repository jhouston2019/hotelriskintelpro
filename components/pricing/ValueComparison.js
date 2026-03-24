"use client";

import { estimateSavings, formatUsd } from "../../lib/pricing";

/**
 * @param {{
 *   portfolioAnnualRevenue: number,
 *   annualSubscriptionCost: number,
 *   roiMultiplier: number,
 * }} props
 */
export default function ValueComparison({
  portfolioAnnualRevenue,
  annualSubscriptionCost,
  roiMultiplier,
}) {
  const { totalRisk, recoverable } = estimateSavings({ annualRevenue: portfolioAnnualRevenue });

  return (
    <section className="rounded-2xl border border-hrip-gold/30 bg-gradient-to-br from-slate-950 to-slate-900 p-6">
      <h3 className="text-base font-semibold text-white">Value vs. subscription</h3>
      <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-300">
        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Conservative model (portfolio)</p>
        <p>
          Estimated annual loss exposure: <span className="font-semibold text-amber-200">{formatUsd(totalRisk)}</span>
        </p>
        <p>
          Recoverable / preventable: <span className="font-semibold text-emerald-300">{formatUsd(recoverable)}</span>
          <span className="text-slate-500"> (25% of exposure at risk)</span>
        </p>
        <div className="border-t border-slate-800 pt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Your cost</p>
          <p className="mt-2 text-slate-200">
            Hotel Risk Pro: <span className="font-semibold text-white">{formatUsd(annualSubscriptionCost)}/year</span>
          </p>
          <p className="mt-3 text-lg font-bold text-hrip-gold">
            Estimated ROI: {roiMultiplier >= 1 ? `${roiMultiplier.toFixed(1)}×` : "—"} (recoverable ÷ cost)
          </p>
          <p className="mt-1 text-xs text-slate-500">Illustrative only — not a guarantee of savings.</p>
        </div>
      </div>
    </section>
  );
}
