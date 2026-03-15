import Link from "next/link";

export default function SurvivabilityReport({ data }) {
  const analysis = calculateAnalysis(data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Report Header */}
        <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Hotel Insurance Survivability Report
              </h1>
              <p className="mt-3 text-base text-gray-700 max-w-2xl">
                This report shows whether your insurance and current risk environment could realistically carry your hotel through a serious loss.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Report Date</p>
              <p className="text-base font-bold text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm border-t-2 border-gray-200 pt-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Hotel:</span>
              <span className="text-gray-900 font-semibold">{data.hotelProfile?.hotelName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Policy Period:</span>
              <span className="text-gray-900">
                {data.insurancePolicy?.policyPeriodStart} to {data.insurancePolicy?.policyPeriodEnd}
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Survivability Summary */}
        <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Your Current Risk Summary</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-6">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Survivability Score</p>
              <p className="mt-3 text-6xl font-bold text-red-600">
                {analysis.survivabilityScore}
                <span className="text-2xl text-gray-400">/100</span>
              </p>
              <p className="mt-3 text-sm text-gray-700 font-medium">
                {analysis.survivabilityScore < 50
                  ? "High risk of financial distress"
                  : analysis.survivabilityScore < 70
                  ? "Moderate survivability concerns"
                  : "Adequate protection"}
              </p>
            </div>
            <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-6">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Property Coverage Gap</p>
              <p className="mt-3 text-6xl font-bold text-red-600">
                {formatCurrency(analysis.propertyCoverageGap)}
              </p>
              <p className="mt-3 text-sm text-gray-700 font-medium">
                Potential uninsured rebuild cost
              </p>
            </div>
            <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">BI Coverage Window</p>
              <p className="mt-3 text-6xl font-bold text-amber-700">
                {analysis.biCoverageMonths}
              </p>
              <p className="mt-3 text-sm text-gray-700 font-medium">
                Months of revenue covered
              </p>
            </div>
            <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-6">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Estimated Uncovered Exposure</p>
              <p className="mt-3 text-6xl font-bold text-red-600">
                {formatCurrency(analysis.totalUncoveredExposure)}
              </p>
              <p className="mt-3 text-sm text-gray-700 font-medium">
                Total potential financial gap
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: What This Means */}
        <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">What This Means for Your Hotel</h2>
          <div className="mt-6 space-y-4">
            {analysis.findings.map((finding, idx) => (
              <div key={idx} className={`flex items-start gap-4 rounded-xl border-2 p-5 ${
                finding.severity === "critical"
                  ? "border-red-200 bg-red-50"
                  : "border-amber-200 bg-amber-50"
              }`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  finding.severity === "critical" ? "bg-red-600" : "bg-amber-600"
                }`}>
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-base text-gray-900 font-medium leading-relaxed">{finding.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Coverage vs Reality */}
        <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Coverage vs Real Financial Exposure</h2>
          <div className="mt-6 space-y-5">
            {analysis.coverageComparisons.map((comparison, idx) => (
              <div key={idx} className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{comparison.category}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    comparison.status === "adequate"
                      ? "bg-green-100 text-green-700"
                      : comparison.status === "gap"
                      ? "bg-red-100 text-red-700"
                      : "bg-amber-100 text-amber-700"
                  }`}>
                    {comparison.status === "adequate" ? "Adequate" : comparison.status === "gap" ? "Gap Identified" : "Review Needed"}
                  </span>
                </div>
                <div className="grid gap-3 text-sm">
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Policy Provides:</span>
                    <span className="text-gray-900 font-semibold">{comparison.policyProvides}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-200">
                    <span className="text-gray-600 font-medium">Likely Need:</span>
                    <span className="text-gray-900 font-semibold">{comparison.likelyNeed}</span>
                  </div>
                  {comparison.gap && (
                    <div className="flex justify-between py-2 bg-red-100 -mx-6 px-6 rounded-lg">
                      <span className="text-red-700 font-bold">Gap:</span>
                      <span className="text-red-700 font-bold text-lg">{comparison.gap}</span>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-sm text-gray-700 bg-white rounded-lg p-4 border border-gray-200">
                  {comparison.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Business Interruption Reality */}
        <div className="mt-8 rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">
            How Long Your Insurance Would Carry the Business
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border-2 border-gray-200 bg-white p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Annual Revenue</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatCurrency(data.financialExposure?.annualRevenue)}
              </p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-white p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Monthly Revenue</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatCurrency(analysis.monthlyRevenue)}
              </p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-white p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">BI Limit</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatCurrency(data.insurancePolicy?.biLimit)}
              </p>
            </div>
            <div className="rounded-xl border-2 border-amber-200 bg-amber-100 p-5">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Months Covered</p>
              <p className="mt-2 text-3xl font-bold text-amber-700">
                {analysis.biCoverageMonths} months
              </p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-white p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Estimated Recovery</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {analysis.estimatedRecoveryMonths} months
              </p>
            </div>
            <div className="rounded-xl border-2 border-red-200 bg-red-100 p-5">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wide">Revenue Exposure</p>
              <p className="mt-2 text-3xl font-bold text-red-700">
                {formatCurrency(analysis.revenueExposure)}
              </p>
            </div>
          </div>
          <div className="mt-6 rounded-xl bg-white border-2 border-gray-200 p-6">
            <p className="text-base text-gray-900 font-medium leading-relaxed">
              Based on current inputs, your insurance may stop supporting operations after{" "}
              <span className="font-bold text-amber-700">{analysis.biCoverageMonths} months</span>, while realistic recovery may require{" "}
              <span className="font-bold text-gray-900">{analysis.estimatedRecoveryMonths} months</span>.
            </p>
          </div>
        </div>

        {/* Section 5: Loss History & Renewal Pressure */}
        {data.lossHistory?.claims?.length > 0 && (
          <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">
              How Past Claims May Affect Future Coverage
            </h2>
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Claims</p>
                  <p className="mt-2 text-4xl font-bold text-gray-900">
                    {data.lossHistory.claims.length}
                  </p>
                </div>
                <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Open Claims</p>
                  <p className="mt-2 text-4xl font-bold text-amber-700">
                    {data.lossHistory.claims.filter((c) => c.status === "Open").length}
                  </p>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Paid</p>
                  <p className="mt-2 text-4xl font-bold text-gray-900">
                    {formatCurrency(
                      data.lossHistory.claims.reduce((sum, c) => sum + parseFloat(c.amountPaid || 0), 0)
                    )}
                  </p>
                </div>
              </div>
              {analysis.lossPatterns.length > 0 && (
                <div className="mt-6 space-y-3">
                  {analysis.lossPatterns.map((pattern, idx) => (
                    <div key={idx} className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-gray-900 font-medium">{pattern}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 6: Operational Risk Environment */}
        <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">
            Current Conditions Increasing Risk
          </h2>
          <div className="mt-6 space-y-3">
            {analysis.operationalRisks.length > 0 ? (
              analysis.operationalRisks.map((risk, idx) => (
                <div key={idx} className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-base font-bold text-gray-900">{risk.issue}</p>
                      <p className="mt-1 text-sm text-gray-700">{risk.impact}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 text-center">
                <p className="text-base text-green-800 font-medium">No major operational risks identified</p>
              </div>
            )}
          </div>
          <p className="mt-6 text-sm text-gray-700 border-t-2 border-gray-200 pt-5 bg-gray-50 rounded-lg p-4">
            This matters because insurers may view unresolved issues as indicators of increased future loss risk.
          </p>
        </div>

        {/* Section 7: Location & Hazard Risk */}
        <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">
            Location Risks That May Affect Loss Severity
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {analysis.locationRisks.map((risk, idx) => (
              <div key={idx} className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-base font-bold text-gray-900">{risk.hazard}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    risk.level === "high"
                      ? "bg-red-100 text-red-700"
                      : risk.level === "moderate"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {risk.level}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{risk.impact}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-700 border-t-2 border-gray-200 pt-5 bg-gray-50 rounded-lg p-4">
            These conditions may increase both the severity of loss and the time required to fully recover.
          </p>
        </div>

        {/* Section 8: Top Priority Actions */}
        <div className="mt-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">What You Should Fix First</h2>
          <div className="mt-6 space-y-4">
            {analysis.priorityActions.map((action, idx) => (
              <div key={idx} className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-bold text-gray-900">{action.title}</h3>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide flex-shrink-0 ${
                    action.urgency === "Fix Now"
                      ? "bg-red-100 text-red-700"
                      : action.urgency === "Fix Before Renewal"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-blue-100 text-blue-700"
                  }`}>
                    {action.urgency}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-3">{action.why}</p>
                <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                  <p className="text-sm font-semibold text-green-800">
                    <span className="text-green-600">Impact:</span> {action.impact}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 9: If Nothing Changes */}
        <div className="mt-8 rounded-2xl border-2 border-red-300 bg-gradient-to-br from-red-100 to-red-50 p-8 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 flex-shrink-0">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">What Happens If Nothing Changes</h2>
              <p className="mt-4 text-base text-gray-900 leading-relaxed font-medium">
                {analysis.worstCaseScenario}
              </p>
            </div>
          </div>
        </div>

        {/* Section 10: Report Footer / Next Steps */}
        <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-10 shadow-lg text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Strengthen Your Hotel's Protection
          </h2>
          <p className="mt-3 text-base text-gray-700">
            Take action on these findings to improve your hotel's financial survivability.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-lg bg-hrip-navy px-8 py-4 text-base font-bold text-white shadow-xl hover:bg-blue-800 transition-all hover:scale-105">
              Download PDF Report
            </button>
            <Link
              href="/intake"
              className="rounded-lg border-2 border-hrip-navy px-8 py-4 text-base font-bold text-hrip-navy transition-all hover:bg-blue-50"
            >
              Update My Risk Profile
            </Link>
            <Link
              href="/dashboard"
              className="rounded-lg border-2 border-gray-300 px-8 py-4 text-base font-bold text-gray-900 transition-all hover:bg-gray-50"
            >
              Monitor This Hotel
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateAnalysis(data) {
  const hotelProfile = data.hotelProfile || {};
  const financialExposure = data.financialExposure || {};
  const insurancePolicy = data.insurancePolicy || {};
  const lossHistory = data.lossHistory || {};
  const operationalRisk = data.operationalRisk || {};
  const locationHazard = data.locationHazard || {};

  const monthlyRevenue = parseFloat(financialExposure.annualRevenue || 0) / 12;
  const biLimit = parseFloat(insurancePolicy.biLimit || 0);
  const biCoverageMonths = monthlyRevenue > 0 ? Math.floor(biLimit / monthlyRevenue) : 0;
  
  const estimatedReplacementCost = parseFloat(hotelProfile.squareFootage || 0) * 350;
  const propertyCoverageLimit = parseFloat(insurancePolicy.propertyCoverageLimit || 0);
  const propertyCoverageGap = Math.max(0, estimatedReplacementCost - propertyCoverageLimit);
  
  const estimatedRecoveryMonths = 14;
  const revenueExposure = Math.max(0, (estimatedRecoveryMonths - biCoverageMonths) * monthlyRevenue);
  
  const totalUncoveredExposure = propertyCoverageGap + revenueExposure;

  let survivabilityScore = 100;
  if (propertyCoverageGap > 1000000) survivabilityScore -= 25;
  else if (propertyCoverageGap > 0) survivabilityScore -= 15;
  if (biCoverageMonths < 12) survivabilityScore -= 20;
  if (revenueExposure > 5000000) survivabilityScore -= 15;
  if (lossHistory.claims?.length > 3) survivabilityScore -= 10;
  if (lossHistory.claims?.some(c => c.status === "Open")) survivabilityScore -= 5;

  const findings = [];
  if (propertyCoverageGap > 0) {
    findings.push({
      severity: "critical",
      text: "Your property appears materially underinsured. A major loss could leave significant rebuilding costs uncovered.",
    });
  }
  if (biCoverageMonths < estimatedRecoveryMonths) {
    findings.push({
      severity: "critical",
      text: "Your business interruption coverage would likely run out before full recovery.",
    });
  }
  if (lossHistory.claims?.length > 2) {
    findings.push({
      severity: "moderate",
      text: "Your loss history may increase renewal pressure or result in coverage restrictions.",
    });
  }
  if (parseFloat(insurancePolicy.deductible || 0) > parseFloat(financialExposure.emergencyCashReserves || 0) * 0.3) {
    findings.push({
      severity: "moderate",
      text: "Your deductible may create short-term cash stress after a loss.",
    });
  }

  const coverageComparisons = [
    {
      category: "Property Coverage",
      policyProvides: formatCurrency(propertyCoverageLimit),
      likelyNeed: formatCurrency(estimatedReplacementCost),
      gap: propertyCoverageGap > 0 ? formatCurrency(propertyCoverageGap) : null,
      status: propertyCoverageGap > 0 ? "gap" : "adequate",
      explanation: propertyCoverageGap > 0
        ? "A major property loss could leave a large portion of rebuilding costs uninsured."
        : "Property coverage appears adequate for estimated replacement cost.",
    },
    {
      category: "Business Interruption",
      policyProvides: `${formatCurrency(biLimit)} (${biCoverageMonths} months)`,
      likelyNeed: `${estimatedRecoveryMonths} months of revenue`,
      gap: revenueExposure > 0 ? formatCurrency(revenueExposure) : null,
      status: revenueExposure > 0 ? "gap" : "adequate",
      explanation: revenueExposure > 0
        ? "BI coverage may run out before the hotel fully recovers operations and revenue."
        : "BI coverage appears adequate for typical recovery timeline.",
    },
    {
      category: "Liability Coverage",
      policyProvides: formatCurrency(insurancePolicy.liabilityLimit),
      likelyNeed: "Varies by incident",
      gap: null,
      status: parseFloat(insurancePolicy.liabilityLimit || 0) >= 2000000 ? "adequate" : "review",
      explanation: "Liability adequacy depends on specific incident severity and jurisdiction.",
    },
  ];

  const lossPatterns = [];
  if (lossHistory.claims) {
    const waterClaims = lossHistory.claims.filter(c => c.type === "Water").length;
    if (waterClaims >= 2) {
      lossPatterns.push("Repeated water losses may increase non-renewal risk or trigger exclusions.");
    }
    if (lossHistory.claims.some(c => c.status === "Open")) {
      lossPatterns.push("Open claims may affect renewal leverage and premium negotiations.");
    }
  }

  const operationalRisks = [];
  if (operationalRisk.roofLeaks === "yes") {
    operationalRisks.push({
      issue: "Prior roof leaks",
      impact: "May indicate ongoing water intrusion risk",
    });
  }
  if (operationalRisk.hvacIssues === "yes") {
    operationalRisks.push({
      issue: "HVAC age or issues",
      impact: "Equipment breakdown risk and guest comfort concerns",
    });
  }
  if (operationalRisk.deferredMaintenance === "yes") {
    operationalRisks.push({
      issue: "Deferred maintenance items",
      impact: "Increased loss frequency and severity risk",
    });
  }

  const locationRisks = [];
  if (locationHazard.floodZone && !["none", "x"].includes(locationHazard.floodZone)) {
    locationRisks.push({
      hazard: "Flood Exposure",
      level: locationHazard.floodZone.includes("a") || locationHazard.floodZone.includes("v") ? "high" : "moderate",
      impact: "May require separate flood coverage and increase loss severity",
    });
  }
  if (locationHazard.coastalWindExposure === "high") {
    locationRisks.push({
      hazard: "Hurricane / Wind Risk",
      level: "high",
      impact: "Major storm events can cause extended closures and high rebuild costs",
    });
  }
  if (locationHazard.contractorScarcity === "high") {
    locationRisks.push({
      hazard: "Contractor Scarcity",
      level: "high",
      impact: "May significantly extend recovery timeline and increase costs",
    });
  }

  const priorityActions = [];
  if (biCoverageMonths < estimatedRecoveryMonths) {
    priorityActions.push({
      title: "Increase business interruption coverage duration",
      why: "Current BI coverage may run out before full recovery",
      impact: `Could prevent ${formatCurrency(revenueExposure)} in uncovered revenue loss`,
      urgency: "Fix Before Renewal",
    });
  }
  if (propertyCoverageGap > 0) {
    priorityActions.push({
      title: "Correct property underinsurance gap",
      why: "Property coverage is below estimated replacement cost",
      impact: `Could prevent ${formatCurrency(propertyCoverageGap)} in uncovered rebuild costs`,
      urgency: "Fix Before Renewal",
    });
  }
  if (lossHistory.claims?.filter(c => c.type === "Water").length >= 2) {
    priorityActions.push({
      title: "Address recurring water-loss drivers",
      why: "Multiple water claims increase non-renewal risk",
      impact: "Reduces future claim frequency and improves insurability",
      urgency: "Fix Now",
    });
  }
  if (!insurancePolicy.ordinanceLawCoverage || insurancePolicy.ordinanceLawCoverage === "none") {
    priorityActions.push({
      title: "Review ordinance or law coverage",
      why: "May be required for code-compliant rebuild",
      impact: "Could prevent major cost overruns during reconstruction",
      urgency: "Fix Before Renewal",
    });
  }
  if (operationalRisk.inspectionDeficiencies === "yes") {
    priorityActions.push({
      title: "Resolve inspection deficiencies affecting insurability",
      why: "Unresolved deficiencies may affect renewal or coverage terms",
      impact: "Improves underwriting position and reduces loss risk",
      urgency: "Fix Now",
    });
  }

  const worstCaseScenario = `If a serious loss occurs under current conditions, your hotel may face ${formatCurrency(propertyCoverageGap)} in uninsured rebuilding costs and ${formatCurrency(revenueExposure)} in uncovered revenue during the extended recovery period. Combined with deductible obligations and potential coinsurance penalties, the total financial exposure could exceed ${formatCurrency(totalUncoveredExposure)}.`;

  return {
    survivabilityScore: Math.max(0, survivabilityScore),
    propertyCoverageGap,
    biCoverageMonths,
    estimatedRecoveryMonths,
    totalUncoveredExposure,
    monthlyRevenue,
    revenueExposure,
    findings,
    coverageComparisons,
    lossPatterns,
    operationalRisks,
    locationRisks,
    priorityActions,
    worstCaseScenario,
  };
}

function formatCurrency(value) {
  if (!value || value === 0) return "$0";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num.toLocaleString()}`;
}
