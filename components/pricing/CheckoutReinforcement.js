"use client";

import { formatUsd } from "../../lib/pricing";

/**
 * @param {{
 *   monthlyCost: number,
 *   estimatedMonthlySavings: number,
 *   onCheckout?: () => void,
 * }} props
 */
export default function CheckoutReinforcement({
  monthlyCost,
  estimatedMonthlySavings,
  onCheckout,
}) {
  const net = estimatedMonthlySavings - monthlyCost;

  return (
    <section className="rounded-2xl border border-slate-700 bg-slate-900/90 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">Before you check out</h3>
      <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        <div className="rounded-lg bg-slate-950/80 p-3">
          <p className="text-xs text-slate-500">Monthly cost</p>
          <p className="mt-1 font-semibold text-white">{formatUsd(monthlyCost)}</p>
        </div>
        <div className="rounded-lg bg-slate-950/80 p-3">
          <p className="text-xs text-slate-500">Estimated monthly savings (modeled)</p>
          <p className="mt-1 font-semibold text-emerald-300">{formatUsd(estimatedMonthlySavings)}</p>
        </div>
        <div className="rounded-lg border border-emerald-800/40 bg-emerald-950/30 p-3">
          <p className="text-xs text-emerald-200/80">Net positive impact (monthly)</p>
          <p className="mt-1 font-semibold text-emerald-300">{formatUsd(net)}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onCheckout}
        className="mt-6 w-full rounded-lg bg-hrip-gold py-3 text-sm font-bold text-slate-950 hover:bg-amber-300 transition"
      >
        Continue to checkout
      </button>
      <p className="mt-3 text-center text-xs text-slate-500">
        Connect your payment provider (e.g. Stripe) to this action.
      </p>
    </section>
  );
}
