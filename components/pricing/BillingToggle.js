"use client";

import { formatUsd, getAnnualPlanTotal, getEffectiveMonthlyAnnualPlan } from "../../lib/pricing";

/**
 * @param {{
 *   billing: 'monthly' | 'annual',
 *   onBillingChange: (b: 'monthly' | 'annual') => void,
 *   monthlyTotal: number,
 * }} props
 */
export default function BillingToggle({ billing, onBillingChange, monthlyTotal }) {
  const annualDue = getAnnualPlanTotal(monthlyTotal);
  const effectiveMonthly = getEffectiveMonthlyAnnualPlan(monthlyTotal);

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
      <h3 className="text-base font-semibold text-white">Billing</h3>
      <p className="mt-1 text-sm text-slate-400">Annual plan = pay for 10 months, get 2 months free.</p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onBillingChange("monthly")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            billing === "monthly"
              ? "bg-hrip-gold text-slate-950"
              : "border border-slate-600 text-slate-300 hover:border-slate-500"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          onClick={() => onBillingChange("annual")}
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            billing === "annual"
              ? "bg-hrip-gold text-slate-950"
              : "border border-slate-600 text-slate-300 hover:border-slate-500"
          }`}
        >
          Annual (2 months free)
        </button>
      </div>
      {billing === "annual" && (
        <div className="mt-4 rounded-lg border border-emerald-800/50 bg-emerald-950/20 px-4 py-3 text-sm text-emerald-100">
          <p>
            <span className="font-semibold">Annual due today:</span> {formatUsd(annualDue)}/year
          </p>
          <p className="mt-1 text-emerald-200/80">Effective monthly: {formatUsd(effectiveMonthly)}</p>
        </div>
      )}
    </section>
  );
}
