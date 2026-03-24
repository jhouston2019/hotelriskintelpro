"use client";

import { estimateSavings, formatUsd, getTotalMonthlyCost } from "../../lib/pricing";

/** Static “typical property” example for trust-building. */
export default function RoiTypicalBlock() {
  const rev = 5_000_000;
  const { totalRisk: tr, recoverable: rec } = estimateSavings({ annualRevenue: rev });
  const onePropAnnual = getTotalMonthlyCost(1) * 12;
  const net = rec - onePropAnnual;

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/80 p-6">
      <h3 className="text-base font-semibold text-white">Typical property</h3>
      <div className="mt-4 space-y-2 text-sm text-slate-300">
        <p>Annual revenue: {formatUsd(rev)}</p>
        <p>Estimated risk exposure (2%): {formatUsd(tr)}</p>
        <p>Recoverable / preventable (25%): {formatUsd(rec)}</p>
        <p>Hotel Risk Pro cost (1 property): {formatUsd(onePropAnnual)}/year</p>
        <p className="pt-2 text-base font-semibold text-emerald-300">
          → Net impact (modeled): +{formatUsd(net)}/year
        </p>
      </div>
    </section>
  );
}
