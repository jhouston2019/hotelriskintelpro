export default function ReviewAnalyze({ data, onNext, onBack }) {
  const handleAnalyze = () => {
    onNext(data);
  };

  const formatCurrency = (value) => {
    return value ? `$${parseInt(value).toLocaleString()}` : "Not provided";
  };

  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Review Your Hotel Risk Profile
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Review your information before running the survivability analysis.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Hotel Profile Summary */}
        <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Hotel Profile</h3>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Hotel Name:</span>
              <span className="text-gray-900 font-semibold">{data.hotelName || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="text-gray-900">{data.city}, {data.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Rooms:</span>
              <span className="text-gray-900">{data.numberOfRooms || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Square Footage:</span>
              <span className="text-gray-900">{data.squareFootage ? parseInt(data.squareFootage).toLocaleString() : "—"} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Year Built:</span>
              <span className="text-gray-900">{data.yearBuilt || "—"}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Financial Exposure</h3>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Annual Revenue:</span>
              <span className="text-gray-900 font-semibold">{formatCurrency(data.annualRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Monthly Revenue:</span>
              <span className="text-gray-900">{data.annualRevenue ? formatCurrency(data.annualRevenue / 12) : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Fixed Monthly Costs:</span>
              <span className="text-gray-900">{formatCurrency(data.fixedMonthlyCosts)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Emergency Reserves:</span>
              <span className="text-gray-900">{formatCurrency(data.emergencyCashReserves)}</span>
            </div>
          </div>
        </div>

        {/* Insurance Summary */}
        <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
          <h3 className="text-base font-bold text-gray-900 mb-4">Insurance Coverage</h3>
          <div className="grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Carrier:</span>
              <span className="text-gray-900 font-semibold">{data.carrier || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Property Limit:</span>
              <span className="text-gray-900">{formatCurrency(data.propertyCoverageLimit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">BI Limit:</span>
              <span className="text-gray-900">{formatCurrency(data.biLimit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Deductible:</span>
              <span className="text-gray-900">{formatCurrency(data.deductible)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-10 rounded-xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 p-8 text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Ready to Run Your Analysis
        </h3>
        <p className="text-base text-gray-700 mb-6">
          We'll analyze your hotel's insurance survivability and show you exactly where you're protected—and where you're not.
        </p>
        <button
          type="button"
          onClick={handleAnalyze}
          className="inline-flex items-center justify-center rounded-lg bg-hrip-navy px-10 py-5 text-lg font-bold text-white shadow-xl hover:bg-blue-800 transition-all hover:scale-105"
        >
          Run My Survivability Analysis
          <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between pt-8 border-t-2 border-gray-200">
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
          type="button"
          onClick={() => {
            localStorage.setItem("hotelRiskIntake", JSON.stringify(data));
            alert("Progress saved! You can return anytime to continue.");
          }}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
          </svg>
          Save and Finish Later
        </button>
      </div>
    </div>
  );
}
