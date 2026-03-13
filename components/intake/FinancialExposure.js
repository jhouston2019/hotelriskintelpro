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
    <form onSubmit={handleSubmit} className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Tell Us About Revenue and Financial Exposure
          </h2>
          <p className="mt-2 text-base text-gray-600">
            This helps determine how long your business could survive if operations are interrupted.
          </p>
        </div>
      </div>

      {/* Revenue Information */}
      <div className="space-y-8">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Annual Gross Revenue <span className="text-red-600">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
            <input
              type="number"
              required
              value={formData.annualRevenue}
              onChange={(e) => handleChange("annualRevenue", e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              placeholder="e.g., 12000000"
            />
          </div>
          {monthlyRevenue > 0 && (
            <div className="mt-3 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3">
              <p className="text-sm font-medium text-blue-900">
                ≈ ${parseInt(monthlyRevenue).toLocaleString()} per month
              </p>
            </div>
          )}
        </div>

        {/* Revenue Mix */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Revenue Mix</h3>
          <p className="text-sm text-gray-600 mb-6">
            Percentage breakdown of your revenue sources
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Room Revenue %
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.roomRevenuePercent}
                  onChange={(e) => handleChange("roomRevenuePercent", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 70"
                />
                <span className="absolute right-4 top-4 text-base font-medium text-gray-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Food & Beverage %
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.fbRevenuePercent}
                  onChange={(e) => handleChange("fbRevenuePercent", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 20"
                />
                <span className="absolute right-4 top-4 text-base font-medium text-gray-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Event Revenue %
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.eventRevenuePercent}
                  onChange={(e) => handleChange("eventRevenuePercent", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 5"
                />
                <span className="absolute right-4 top-4 text-base font-medium text-gray-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Other Revenue %
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.otherRevenuePercent}
                  onChange={(e) => handleChange("otherRevenuePercent", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 5"
                />
                <span className="absolute right-4 top-4 text-base font-medium text-gray-500">%</span>
              </div>
            </div>
          </div>
          {percentageTotal > 0 && (
            <div
              className={`mt-4 rounded-lg border-2 px-4 py-3 ${
                Math.abs(percentageTotal - 100) < 1
                  ? "bg-green-50 border-green-200"
                  : "bg-orange-50 border-orange-200"
              }`}
            >
              <p
                className={`text-sm font-semibold ${
                  Math.abs(percentageTotal - 100) < 1
                    ? "text-green-700"
                    : "text-orange-700"
                }`}
              >
                Total: {percentageTotal.toFixed(1)}%
                {Math.abs(percentageTotal - 100) > 1 && " (should equal 100%)"}
              </p>
            </div>
          )}
        </div>

        {/* Operating Metrics */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Operating Metrics</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Average Occupancy % <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  required
                  value={formData.averageOccupancy}
                  onChange={(e) => handleChange("averageOccupancy", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 75"
                />
                <span className="absolute right-4 top-4 text-base font-medium text-gray-500">%</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                ADR (Average Daily Rate) <span className="text-sm text-gray-500">(optional)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.adr}
                  onChange={(e) => handleChange("adr", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 185"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Obligations */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Monthly Obligations</h3>
          <p className="text-sm text-gray-600 mb-6">
            Fixed costs that continue even if the hotel is closed
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Fixed Monthly Operating Costs <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.fixedMonthlyCosts}
                  onChange={(e) => handleChange("fixedMonthlyCosts", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 250000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Monthly Payroll Burden <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.monthlyPayroll}
                  onChange={(e) => handleChange("monthlyPayroll", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 180000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Monthly Debt Service / Mandatory Obligations <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.monthlyDebtService}
                  onChange={(e) => handleChange("monthlyDebtService", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 85000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Estimated Emergency Cash Reserves <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.emergencyCashReserves}
                  onChange={(e) => handleChange("emergencyCashReserves", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 500000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between pt-8 border-t-2 border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-base font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-hrip-navy px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-800 transition-all hover:shadow-xl"
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
