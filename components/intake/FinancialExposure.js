import { useState, useEffect } from "react";

export default function FinancialExposure({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    annualRevenue: data?.annualRevenue || "",
    roomRevenuePercent: data?.roomRevenuePercent || "",
    fbRevenuePercent: data?.fbRevenuePercent || "",
    eventRevenuePercent: data?.eventRevenuePercent || "",
    otherRevenuePercent: data?.otherRevenuePercent || "",
    averageOccupancy: data?.averageOccupancy || "",
    adr: data?.adr || "",
    revpar: data?.revpar || "",
    fixedMonthlyCosts: data?.fixedMonthlyCosts || "",
    monthlyPayroll: data?.monthlyPayroll || "",
    monthlyDebtService: data?.monthlyDebtService || "",
    emergencyCashReserves: data?.emergencyCashReserves || "",
  });

  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [percentageTotal, setPercentageTotal] = useState(0);

  useEffect(() => {
    if (formData.annualRevenue) {
      setMonthlyRevenue((parseFloat(formData.annualRevenue) / 12).toFixed(0));
    }
  }, [formData.annualRevenue]);

  useEffect(() => {
    const total =
      parseFloat(formData.roomRevenuePercent || 0) +
      parseFloat(formData.fbRevenuePercent || 0) +
      parseFloat(formData.eventRevenuePercent || 0) +
      parseFloat(formData.otherRevenuePercent || 0);
    setPercentageTotal(total);
  }, [
    formData.roomRevenuePercent,
    formData.fbRevenuePercent,
    formData.eventRevenuePercent,
    formData.otherRevenuePercent,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (percentageTotal > 0 && Math.abs(percentageTotal - 100) > 1) {
      alert("Revenue percentages should add up to approximately 100%");
      return;
    }
    onNext(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-800 bg-slate-950/80 p-8">
      <h2 className="text-2xl font-semibold text-slate-100">
        Tell Us About Revenue and Financial Exposure
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        This helps determine how long your business could survive if operations are interrupted.
      </p>

      {/* Revenue Information */}
      <div className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-300">
            Annual Gross Revenue
          </label>
          <div className="relative mt-2">
            <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
            <input
              type="number"
              required
              value={formData.annualRevenue}
              onChange={(e) => handleChange("annualRevenue", e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              placeholder="e.g., 12000000"
            />
          </div>
          {monthlyRevenue > 0 && (
            <p className="mt-2 text-xs text-slate-500">
              ≈ ${parseInt(monthlyRevenue).toLocaleString()} per month
            </p>
          )}
        </div>

        {/* Revenue Mix */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Revenue Mix</h3>
          <p className="mt-1 text-xs text-slate-400">
            Percentage breakdown of your revenue sources
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Room Revenue %
              </label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.roomRevenuePercent}
                  onChange={(e) => handleChange("roomRevenuePercent", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 70"
                />
                <span className="absolute right-3 top-2 text-sm text-slate-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Food & Beverage %
              </label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.fbRevenuePercent}
                  onChange={(e) => handleChange("fbRevenuePercent", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 20"
                />
                <span className="absolute right-3 top-2 text-sm text-slate-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Event Revenue %
              </label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.eventRevenuePercent}
                  onChange={(e) => handleChange("eventRevenuePercent", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 5"
                />
                <span className="absolute right-3 top-2 text-sm text-slate-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Other Revenue %
              </label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.otherRevenuePercent}
                  onChange={(e) => handleChange("otherRevenuePercent", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 5"
                />
                <span className="absolute right-3 top-2 text-sm text-slate-500">%</span>
              </div>
            </div>
          </div>
          {percentageTotal > 0 && (
            <p
              className={`mt-2 text-xs ${
                Math.abs(percentageTotal - 100) < 1
                  ? "text-emerald-400"
                  : "text-amber-400"
              }`}
            >
              Total: {percentageTotal.toFixed(1)}%
              {Math.abs(percentageTotal - 100) > 1 && " (should equal 100%)"}
            </p>
          )}
        </div>

        {/* Operating Metrics */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Operating Metrics</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Average Occupancy %
              </label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                  value={formData.averageOccupancy}
                  onChange={(e) => handleChange("averageOccupancy", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 75"
                />
                <span className="absolute right-3 top-2 text-sm text-slate-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                ADR (Average Daily Rate) <span className="text-slate-500">(optional)</span>
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  value={formData.adr}
                  onChange={(e) => handleChange("adr", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 185"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Obligations */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Monthly Obligations</h3>
          <p className="mt-1 text-xs text-slate-400">
            Fixed costs that continue even if the hotel is closed
          </p>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Fixed Monthly Operating Costs
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.fixedMonthlyCosts}
                  onChange={(e) => handleChange("fixedMonthlyCosts", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 250000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Monthly Payroll Burden
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.monthlyPayroll}
                  onChange={(e) => handleChange("monthlyPayroll", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 180000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Monthly Debt Service / Mandatory Obligations
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.monthlyDebtService}
                  onChange={(e) => handleChange("monthlyDebtService", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 85000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Estimated Emergency Cash Reserves
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.emergencyCashReserves}
                  onChange={(e) => handleChange("emergencyCashReserves", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 500000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-slate-400 hover:text-slate-300"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="rounded-md bg-hrip-gold px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
