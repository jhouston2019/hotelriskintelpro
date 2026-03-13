export default function ReviewAnalyze({ data, onNext, onBack }) {
  const handleAnalyze = () => {
    onNext(data);
  };

  const formatCurrency = (value) => {
    return value ? `$${parseInt(value).toLocaleString()}` : "Not provided";
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-8">
      <h2 className="text-2xl font-semibold text-slate-100">
        Review Your Hotel Risk Profile
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Review your information before running the survivability analysis.
      </p>

      <div className="mt-8 space-y-6">
        {/* Hotel Profile Summary */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Hotel Profile</h3>
          <div className="mt-3 grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Hotel Name:</span>
              <span className="text-slate-100 font-medium">{data.hotelName || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Location:</span>
              <span className="text-slate-100">{data.city}, {data.state}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Rooms:</span>
              <span className="text-slate-100">{data.numberOfRooms || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Square Footage:</span>
              <span className="text-slate-100">{data.squareFootage ? parseInt(data.squareFootage).toLocaleString() : "—"} sq ft</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Year Built:</span>
              <span className="text-slate-100">{data.yearBuilt || "—"}</span>
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Financial Exposure</h3>
          <div className="mt-3 grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Annual Revenue:</span>
              <span className="text-slate-100 font-medium">{formatCurrency(data.annualRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Monthly Revenue:</span>
              <span className="text-slate-100">{data.annualRevenue ? formatCurrency(data.annualRevenue / 12) : "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Fixed Monthly Costs:</span>
              <span className="text-slate-100">{formatCurrency(data.fixedMonthlyCosts)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Emergency Reserves:</span>
              <span className="text-slate-100">{formatCurrency(data.emergencyCashReserves)}</span>
            </div>
          </div>
        </div>

        {/* Insurance Summary */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Insurance Coverage</h3>
          <div className="mt-3 grid gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Carrier:</span>
              <span className="text-slate-100 font-medium">{data.carrier || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Property Limit:</span>
              <span className="text-slate-100">{formatCurrency(data.propertyCoverageLimit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">BI Limit:</span>
              <span className="text-slate-100">{formatCurrency(data.biLimit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">BI Restoration Period:</span>
              <span className="text-slate-100">{data.biRestorationPeriod || "—"} months</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Deductible:</span>
              <span className="text-slate-100">{formatCurrency(data.deductible)}</span>
            </div>
          </div>
        </div>

        {/* Loss History Summary */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Loss History</h3>
          <div className="mt-3 text-sm">
            {data.claims && data.claims.length > 0 ? (
              <div className="space-y-2">
                <p className="text-slate-400">
                  {data.claims.length} claim{data.claims.length !== 1 ? "s" : ""} reported
                </p>
                {data.claims.map((claim, idx) => (
                  <div key={idx} className="flex justify-between text-xs">
                    <span className="text-slate-400">{claim.type} ({claim.year})</span>
                    <span className="text-slate-300">{formatCurrency(claim.amountPaid)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-400">No claims reported</p>
            )}
          </div>
        </div>

        {/* Operational Risk Summary */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Operational Risk</h3>
          <div className="mt-3 text-sm text-slate-400">
            {Object.entries(data).filter(([key, value]) => value === "yes" && key.includes("Issues")).length > 0
              ? `${Object.entries(data).filter(([key, value]) => value === "yes").length} risk factors identified`
              : "No major operational risks reported"}
          </div>
        </div>

        {/* Location Risk Summary */}
        <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-5">
          <h3 className="text-sm font-semibold text-slate-200">Location Risk</h3>
          <div className="mt-3 grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-400">Flood Zone:</span>
              <span className="text-slate-100">{data.floodZone || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Wind Exposure:</span>
              <span className="text-slate-100">{data.coastalWindExposure || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Wildfire Risk:</span>
              <span className="text-slate-100">{data.wildfireExposure || "—"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 rounded-lg border border-hrip-gold/30 bg-gradient-to-br from-hrip-gold/5 to-slate-950 p-6">
        <p className="text-sm font-medium text-slate-200">
          Ready to analyze your hotel&apos;s insurance survivability
        </p>
        <p className="mt-1 text-xs text-slate-400">
          We&apos;ll generate a comprehensive report showing coverage gaps, BI exposure, and priority actions.
        </p>
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
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => {
              localStorage.setItem("hotelRiskIntake", JSON.stringify(data));
              alert("Progress saved!");
            }}
            className="rounded-md border border-slate-700 px-6 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-900"
          >
            Save and Finish Later
          </button>
          <button
            type="button"
            onClick={handleAnalyze}
            className="rounded-md bg-hrip-gold px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
          >
            Run My Survivability Analysis
          </button>
        </div>
      </div>
    </div>
  );
}
