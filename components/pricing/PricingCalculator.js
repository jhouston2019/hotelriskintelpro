"use client";

import {
  DEFAULT_AVG_REVENUE_PER_PROPERTY,
  formatUsd,
  getPortfolioAnnualRevenue,
  getPricePerProperty,
  getPricingTier,
  getTotalMonthlyCost,
} from "../../lib/pricing";

/**
 * @param {{
 *   propertyCount: number,
 *   onPropertyCountChange: (n: number) => void,
 *   avgRevenuePerProperty: number,
 *   onAvgRevenueChange: (n: number) => void,
 * }} props
 */
export default function PricingCalculator({
  propertyCount,
  onPropertyCountChange,
  avgRevenuePerProperty,
  onAvgRevenueChange,
}) {
  const n = Math.max(1, Math.min(500, Math.floor(propertyCount) || 1));
  const pricePerProperty = getPricePerProperty(n);
  const monthlyTotal = getTotalMonthlyCost(n);
  const annualMonthlyTotal = monthlyTotal * 12;
  const portfolioRevenue = getPortfolioAnnualRevenue(n, avgRevenuePerProperty);
  const tier = getPricingTier(n);

  const tierBanner =
    n >= 20
      ? {
          className: "border-emerald-500/50 bg-emerald-950/40 text-emerald-200",
          text: "You've unlocked enterprise pricing: $99/property",
        }
      : n >= 10
        ? {
            className: "border-amber-500/50 bg-amber-950/40 text-amber-200",
            text: "You've unlocked portfolio pricing: $149/property",
          }
        : {
            className: "border-slate-600 bg-slate-900/80 text-slate-300",
            text: "Add 10+ properties for portfolio pricing ($149/property). 20+ for enterprise ($99/property).",
          };

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-black/20">
      <div>
        <h2 className="text-lg font-semibold text-white">Portfolio size</h2>
        <p className="mt-1 text-sm text-slate-400">
          Pricing automatically adjusts as your portfolio grows — per property only, no per-user fees.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <div>
          <div className="flex items-center justify-between gap-4">
            <label className="text-sm font-medium text-slate-200" htmlFor="property-slider">
              Properties: <span className="font-mono text-hrip-gold">{n}</span>
            </label>
            <input
              id="property-count"
              type="number"
              min={1}
              max={500}
              value={n}
              onChange={(e) => onPropertyCountChange(Number(e.target.value) || 1)}
              className="w-24 rounded border border-slate-700 bg-slate-900 px-2 py-1 text-right text-sm text-white"
            />
          </div>
          <input
            id="property-slider"
            type="range"
            min={1}
            max={50}
            value={Math.min(n, 50)}
            onChange={(e) => onPropertyCountChange(Number(e.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-hrip-gold"
          />
          <p className="mt-1 text-xs text-slate-500">Drag 1–50 for quick preview; type exact count for larger portfolios.</p>
        </div>

        <div className={`rounded-lg border px-4 py-3 text-sm font-medium ${tierBanner.className}`} role="status">
          {tierBanner.text}
        </div>

        <div className="grid gap-4 rounded-xl border border-slate-800 bg-slate-900/50 p-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Price per property</p>
            <p className="mt-1 text-2xl font-bold text-white">
              {formatUsd(pricePerProperty)}
              <span className="text-sm font-normal text-slate-400">/mo</span>
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Monthly total</p>
            <p className="mt-1 text-2xl font-bold text-white">{formatUsd(monthlyTotal)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Annual total (at monthly rate)</p>
            <p className="mt-1 text-xl font-semibold text-slate-200">{formatUsd(annualMonthlyTotal)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tier</p>
            <p className="mt-1 text-sm font-semibold text-slate-300">
              {tier === "standard" ? "Standard" : tier === "portfolio" ? "Portfolio" : "Enterprise"}
            </p>
          </div>
        </div>
      </div>

      {/* Portfolio anchor */}
      <div className="mt-8 border-t border-slate-800 pt-6">
        <p className="text-sm text-slate-300">
          <span className="font-semibold text-white">Protecting </span>
          {formatUsd(portfolioRevenue)} in annual revenue
        </p>
        <p className="mt-2 text-sm text-slate-300">
          <span className="font-semibold text-white">Monitoring </span>
          {formatUsd(portfolioRevenue * 0.02)} in potential exposure (2% of revenue — conservative)
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <label htmlFor="avg-rev" className="text-xs text-slate-500">
            Avg. revenue per property (for portfolio total)
          </label>
          <input
            id="avg-rev"
            type="number"
            step={100_000}
            min={100_000}
            value={avgRevenuePerProperty}
            onChange={(e) => onAvgRevenueChange(Number(e.target.value) || DEFAULT_AVG_REVENUE_PER_PROPERTY)}
            className="rounded border border-slate-700 bg-slate-900 px-2 py-1 text-sm text-white"
          />
        </div>
      </div>
    </section>
  );
}
