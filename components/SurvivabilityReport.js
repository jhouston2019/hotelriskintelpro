import Link from "next/link";

export default function SurvivabilityReport({ data }) {
  const analysis = calculateAnalysis(data);

  return (
    <div className="min-h-screen bg-gradient-to-b from-hrip-navy via-hrip-charcoal to-black">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Report Header */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-100">
                Hotel Insurance Survivability Report
              </h1>
              <p className="mt-2 text-sm text-slate-400 max-w-2xl">
                This report shows whether your insurance and current risk environment could realistically carry your hotel through a serious loss.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Report Date</p>
              <p className="text-sm text-slate-300">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm border-t border-slate-800 pt-6">
            <div className="flex justify-between">
              <span className="text-slate-400">Hotel:</span>
              <span className="text-slate-100 font-medium">{data.hotelProfile?.hotelName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Policy Period:</span>
              <span className="text-slate-100">
                {data.insurancePolicy?.policyPeriodStart} to {data.insurancePolicy?.policyPeriodEnd}
              </span>
            </div>
          </div>
        </div>

        {/* Section 1: Survivability Summary */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/80 p-8">
          <h2 className="text-xl font-semibold text-slate-100">Your Current Risk Summary</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-6">
              <p className="text-xs font-medium text-red-300">Survivability Score</p>
              <p className="mt-2 text-5xl font-bold text-red-400">
                {analysis.survivabilityScore}
                <span className="text-2xl text-slate-500">/100</span>
              </p>
              <p className="mt-2 text-xs text-slate-400">
                {analysis.survivabilityScore < 50
                  ? "High risk of financial distress"
                  : analysis.survivabilityScore < 70
                  ? "Moderate survivability concerns"
                  : "Adequate protection"}
              </p>
            </div>
            <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-6">
              <p className="text-xs font-medium text-red-300">Property Coverage Gap</p>
              <p className="mt-2 text-5xl font-bold text-red-400">
                {formatCurrency(analysis.propertyCoverageGap)}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Potential uninsured rebuild cost
              </p>
            </div>
            <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-6">
              <p className="text-xs font-medium text-amber-300">BI Coverage Window</p>
              <p className="mt-2 text-5xl font-bold text-amber-400">
                {analysis.biCoverageMonths}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Months of revenue covered
              </p>
            </div>
            <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-6">
              <p className="text-xs font-medium text-red-300">Estimated Uncovered Exposure</p>
              <p className="mt-2 text-5xl font-bold text-red-400">
                {formatCurrency(analysis.totalUncoveredExposure)}
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Total potential financial gap
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: What This Means */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/80 p-8">
          <h2 className="text-xl font-semibold text-slate-100">What This Means for Your Hotel</h2>
          <div className="mt-6 space-y-4">
            {analysis.findings.map((finding, idx) => (
              <div key={idx} className="flex items-start gap-3 rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                  finding.severity === "critical" ? "bg-red-500/20" : "bg-amber-500/20"
                }`}>
                  <svg className={`w-4 h-4 ${finding.severity === "critical" ? "text-red-400" : "text-amber-400"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-sm text-slate-300">{finding.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Coverage vs Reality */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/80 p-8">
          <h2 className="text-xl font-semibold text-slate-100">Coverage vs Real Financial Exposure</h2>
          <div className="mt-6 space-y-4">
            {analysis.coverageComparisons.map((comparison, idx) => (
              <div key={idx} className="rounded-lg border border-slate-800 bg-slate-900/50 p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-sm font-semibold text-slate-200">{comparison.category}</h3>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    comparison.status === "adequate"
                      ? "bg-emerald-500/10 text-emerald-300"
                      : comparison.status === "gap"
                      ? "bg-red-500/10 text-red-300"
                      : "bg-amber-500/10 text-amber-300"
                  }`}>
                    {comparison.status === "adequate" ? "Adequate" : comparison.status === "gap" ? "Gap Identified" : "Review Needed"}
                  </span>
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Policy Provides:</span>
                    <span className="text-slate-100">{comparison.policyProvides}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Likely Need:</span>
                    <span className="text-slate-100">{comparison.likelyNeed}</span>
                  </div>
                  {comparison.gap && (
                    <div className="flex justify-between pt-2 border-t border-slate-800">
                      <span className="text-red-300 font-medium">Gap:</span>
                      <span className="text-red-400 font-semibold">{comparison.gap}</span>
                    </div>
                  )}
                </div>
                <p className="mt-4 text-xs text-slate-400 border-t border-slate-800 pt-3">
                  {comparison.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Business Interruption Reality */}
        <div className="mt-8 rounded-xl border border-amber-900/40 bg-gradient-to-br from-amber-950/10 to-slate-950 p-8">
          <h2 className="text-xl font-semibold text-slate-100">
            How Long Your Insurance Would Carry the Business
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Annual Revenue:</span>
                <span className="text-slate-100">{formatCurrency(data.financialExposure?.annualRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Revenue:</span>
                <span className="text-slate-100">{formatCurrency(analysis.monthlyRevenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">BI Limit:</span>
                <span className="text-slate-100">{formatCurrency(data.insurancePolicy?.biLimit)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Waiting Period:</span>
                <span className="text-slate-100">{data.insurancePolicy?.biWaitingPeriod} days</span>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-amber-300 font-medium">Months Covered:</span>
                <span className="text-amber-400 font-semibold text-lg">{analysis.biCoverageMonths}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Typical Recovery:</span>
                <span className="text-slate-100">{analysis.estimatedRecoveryMonths} months</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-slate-800">
                <span className="text-red-300 font-medium">Revenue Exposure:</span>
                <span className="text-red-400 font-semibold text-lg">{formatCurrency(analysis.revenueExposure)}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 rounded-lg border border-amber-900/40 bg-amber-950/20 p-4">
            <p className="text-sm text-amber-200">
              Based on current inputs, your insurance may stop supporting operations after{" "}
              <span className="font-semibold">{analysis.biCoverageMonths} months</span>, while realistic recovery may require{" "}
              <span className="font-semibold">{analysis.estimatedRecoveryMonths} months</span>.
            </p>
          </div>
        </div>

        {/* Section 5: Loss History & Renewal Pressure */}
        {data.lossHistory?.claims && data.lossHistory.claims.length > 0 && (
          <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/80 p-8">
            <h2 className="text-xl font-semibold text-slate-100">
              How Past Claims May Affect Future Coverage
            </h2>
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                  <p className="text-xs text-slate-400">Total Claims</p>
                  <p className="mt-1 text-2xl font-bold text-slate-100">
                    {data.lossHistory.claims.length}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                  <p className="text-xs text-slate-400">Open Claims</p>
                  <p className="mt-1 text-2xl font-bold text-amber-400">
                    {data.lossHistory.claims.filter((c) => c.status === "open").length}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                  <p className="text-xs text-slate-400">Total Paid</p>
                  <p className="mt-1 text-2xl font-bold text-slate-100">
                    {formatCurrency(
                      data.lossHistory.claims.reduce((sum, c) => sum + parseFloat(c.amountPaid || 0), 0)
                    )}
                  </p>
                </div>
              </div>
              {analysis.lossPatterns.length > 0 && (
                <div className="mt-4 space-y-2">
                  {analysis.lossPatterns.map((pattern, idx) => (
                    <div key={idx} className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-4">
                      <p className="text-sm text-amber-200">{pattern}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 6: Operational Risk Environment */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/80 p-8">
          <h2 className="text-xl font-semibold text-slate-100">
            Current Conditions Increasing Risk
          </h2>
          <div className="mt-6 space-y-3">
            {analysis.operationalRisks.length > 0 ? (
              analysis.operationalRisks.map((risk, idx) => (
                <div key={idx} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-slate-200">{risk.issue}</p>
                      <p className="mt-1 text-xs text-slate-400">{risk.impact}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-400">No major operational risks identified</p>
            )}
          </div>
          <p className="mt-6 text-xs text-slate-400 border-t border-slate-800 pt-4">
            This matters because insurers may view unresolved issues as indicators of increased future loss risk.
          </p>
        </div>

        {/* Section 7: Location & Hazard Risk */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/80 p-8">
          <h2 className="text-xl font-semibold text-slate-100">
            Location Risks That May Affect Loss Severity
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {analysis.locationRisks.map((risk, idx) => (
              <div key={idx} className="rounded-lg border border-slate-800 bg-slate-900/50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-200">{risk.hazard}</p>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    risk.level === "high"
                      ? "bg-red-500/10 text-red-300"
                      : risk.level === "moderate"
                      ? "bg-amber-500/10 text-amber-300"
                      : "bg-emerald-500/10 text-emerald-300"
                  }`}>
                    {risk.level}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-400">{risk.impact}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-slate-400 border-t border-slate-800 pt-4">
            These conditions may increase both the severity of loss and the time required to fully recover.
          </p>
        </div>

        {/* Section 8: Top Priority Actions */}
        <div className="mt-8 rounded-xl border border-hrip-gold/30 bg-gradient-to-br from-hrip-gold/5 to-slate-950 p-8">
          <h2 className="text-xl font-semibold text-slate-100">What You Should Fix First</h2>
          <div className="mt-6 space-y-4">
            {analysis.priorityActions.map((action, idx) => (
              <div key={idx} className="rounded-lg border border-slate-800 bg-slate-950/70 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-hrip-gold/20 text-xs font-bold text-hrip-gold">
                        {idx + 1}
                      </span>
                      <h3 className="text-sm font-semibold text-slate-100">{action.title}</h3>
                    </div>
                    <p className="mt-2 text-xs text-slate-400">{action.why}</p>
                    <p className="mt-2 text-xs text-slate-300">
                      <span className="text-slate-500">Impact:</span> {action.impact}
                    </p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-[10px] font-medium whitespace-nowrap ${
                    action.urgency === "Fix Now"
                      ? "bg-red-500/10 text-red-300"
                      : action.urgency === "Fix Before Renewal"
                      ? "bg-amber-500/10 text-amber-300"
                      : "bg-sky-500/10 text-sky-300"
                  }`}>
                    {action.urgency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 9: If Nothing Changes */}
        <div className="mt-8 rounded-xl border border-red-900/40 bg-gradient-to-br from-red-950/20 to-slate-950 p-8">
          <h2 className="text-xl font-semibold text-slate-100">What Happens If Nothing Changes</h2>
          <div className="mt-6">
            <p className="text-base text-slate-300 leading-relaxed">
              {analysis.worstCaseScenario}
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3 text-sm">
              <div className="rounded-lg border border-red-900/40 bg-red-950/30 p-4">
                <p className="text-xs text-red-300">Property Gap</p>
                <p className="mt-1 text-xl font-bold text-red-400">
                  {formatCurrency(analysis.propertyCoverageGap)}
                </p>
              </div>
              <div className="rounded-lg border border-red-900/40 bg-red-950/30 p-4">
                <p className="text-xs text-red-300">BI Shortfall</p>
                <p className="mt-1 text-xl font-bold text-red-400">
                  {formatCurrency(analysis.revenueExposure)}
                </p>
              </div>
              <div className="rounded-lg border border-red-900/40 bg-red-950/30 p-4">
                <p className="text-xs text-red-300">Total Exposure</p>
                <p className="mt-1 text-xl font-bold text-red-400">
                  {formatCurrency(analysis.totalUncoveredExposure)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 10: Report Footer / Next Steps */}
        <div className="mt-8 rounded-xl border border-slate-800 bg-slate-950/80 p-8 text-center">
          <h2 className="text-xl font-semibold text-slate-100">
            Strengthen Your Hotel&apos;s Protection
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Take action on these findings to improve your hotel&apos;s financial survivability.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <button className="rounded-md bg-hrip-gold px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300">
              Download PDF Report
            </button>
            <Link
              href="/intake"
              className="rounded-md border border-slate-700 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900"
            >
              Update My Risk Profile
            </Link>
            <Link
              href="/dashboard"
              className="rounded-md border border-slate-700 px-6 py-3 text-sm font-medium text-slate-100 transition hover:bg-slate-900"
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
  if (lossHistory.claims?.some(c => c.status === "open")) survivabilityScore -= 5;

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
    const waterClaims = lossHistory.claims.filter(c => c.type === "Water Damage").length;
    if (waterClaims >= 2) {
      lossPatterns.push("Repeated water losses may increase non-renewal risk or trigger exclusions.");
    }
    if (lossHistory.claims.some(c => c.status === "open")) {
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
  if (lossHistory.claims?.filter(c => c.type === "Water Damage").length >= 2) {
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
