import Link from "next/link";
import { analyzeHotelRisk } from "../lib/risk-engine";

export default function SurvivabilityReportV2({ data }) {
  // Run the full risk engine analysis
  const analysis = analyzeHotelRisk(data);
  
  const formatCurrency = (value) => {
    if (!value || value === 0) return '$0';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `$${(num / 1000).toFixed(0)}K`;
    }
    return `$${num.toLocaleString()}`;
  };

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
                {data.insurancePolicy?.policyPeriodStart || data.policyProfile?.policyPeriodStart} to {data.insurancePolicy?.policyPeriodEnd || data.policyProfile?.policyPeriodEnd}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Analysis Confidence:</span>
              <span className={`font-semibold ${
                analysis.completeness.confidence === 'high' ? 'text-green-700' :
                analysis.completeness.confidence === 'moderate' ? 'text-amber-700' :
                'text-red-700'
              }`}>
                {analysis.completeness.confidence.toUpperCase()} ({analysis.completeness.percentComplete}% complete)
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
                {analysis.summary.survivabilityScore}
                <span className="text-2xl text-gray-400">/100</span>
              </p>
              <p className="mt-3 text-sm text-gray-700 font-medium">
                {analysis.summary.survivabilityBand.charAt(0).toUpperCase() + analysis.summary.survivabilityBand.slice(1)} Protection
              </p>
            </div>
            <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-6">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Property Coverage Gap</p>
              <p className="mt-3 text-6xl font-bold text-red-600">
                {formatCurrency(analysis.summary.propertyCoverageGap)}
              </p>
              <p className="mt-3 text-sm text-gray-700 font-medium">
                Potential uninsured rebuild cost
              </p>
            </div>
            <div className="rounded-xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">BI Coverage Window</p>
              <p className="mt-3 text-6xl font-bold text-amber-700">
                {analysis.summary.biMonthsCovered || 0}
              </p>
              <p className="mt-3 text-sm text-gray-700 font-medium">
                Months of revenue covered
              </p>
            </div>
            <div className="rounded-xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-6">
              <p className="text-xs font-bold text-red-600 uppercase tracking-wide">Estimated Uncovered Exposure</p>
              <p className="mt-3 text-6xl font-bold text-red-600">
                {formatCurrency(analysis.summary.estimatedUncoveredExposure)}
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
            {analysis.findings.headlineFindings.map((finding, idx) => (
              <div key={idx} className="flex items-start gap-4 rounded-xl border-2 border-red-200 bg-red-50 p-5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-red-600">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-base text-gray-900 font-medium leading-relaxed">{finding}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Coverage vs Reality */}
        <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Coverage vs Real Financial Exposure</h2>
          <div className="mt-6 space-y-5">
            {/* Property Coverage */}
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Property Coverage</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  analysis.comparisons.property.adequacyStatus === 'adequate' ? 'bg-green-100 text-green-700' :
                  analysis.comparisons.property.adequacyStatus === 'inadequate' ? 'bg-red-100 text-red-700' :
                  analysis.comparisons.property.adequacyStatus === 'marginal' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {analysis.comparisons.property.adequacyStatus}
                </span>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Policy Provides:</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(analysis.comparisons.property.policyLimit)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Estimated Need:</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(analysis.comparisons.property.estimatedNeed)}</span>
                </div>
                {analysis.comparisons.property.gap > 0 && (
                  <div className="flex justify-between py-2 bg-red-100 -mx-6 px-6 rounded-lg">
                    <span className="text-red-700 font-bold">Gap:</span>
                    <span className="text-red-700 font-bold text-lg">{formatCurrency(analysis.comparisons.property.gap)}</span>
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm text-gray-700 bg-white rounded-lg p-4 border border-gray-200">
                {analysis.comparisons.property.explanation}
              </p>
            </div>

            {/* Business Interruption */}
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Business Interruption</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  analysis.comparisons.businessInterruption.adequacyStatus === 'adequate' ? 'bg-green-100 text-green-700' :
                  analysis.comparisons.businessInterruption.adequacyStatus === 'inadequate' ? 'bg-red-100 text-red-700' :
                  analysis.comparisons.businessInterruption.adequacyStatus === 'marginal' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {analysis.comparisons.businessInterruption.adequacyStatus}
                </span>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Policy Provides:</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(analysis.comparisons.businessInterruption.policyLimit)} ({analysis.comparisons.businessInterruption.monthsCovered || 0} months)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Likely Need:</span>
                  <span className="text-gray-900 font-semibold">{analysis.comparisons.businessInterruption.recoveryMonths} months of revenue</span>
                </div>
                {analysis.comparisons.businessInterruption.uncoveredExposure > 0 && (
                  <div className="flex justify-between py-2 bg-red-100 -mx-6 px-6 rounded-lg">
                    <span className="text-red-700 font-bold">Gap:</span>
                    <span className="text-red-700 font-bold text-lg">{formatCurrency(analysis.comparisons.businessInterruption.uncoveredExposure)}</span>
                  </div>
                )}
              </div>
              <p className="mt-4 text-sm text-gray-700 bg-white rounded-lg p-4 border border-gray-200">
                {analysis.comparisons.businessInterruption.explanation}
              </p>
            </div>

            {/* Liability Coverage */}
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Liability Coverage</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  analysis.comparisons.liability.adequacyStatus === 'adequate' ? 'bg-green-100 text-green-700' :
                  analysis.comparisons.liability.adequacyStatus === 'inadequate' ? 'bg-red-100 text-red-700' :
                  analysis.comparisons.liability.adequacyStatus === 'marginal' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {analysis.comparisons.liability.adequacyStatus}
                </span>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Policy Provides:</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(analysis.comparisons.liability.policyLimit)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Estimated Need Range:</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(analysis.comparisons.liability.estimatedNeedRangeLow)} - {formatCurrency(analysis.comparisons.liability.estimatedNeedRangeHigh)}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-700 bg-white rounded-lg p-4 border border-gray-200">
                {analysis.comparisons.liability.explanation}
              </p>
            </div>

            {/* Deductible Stress */}
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Deductible Stress</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                  analysis.comparisons.deductible.adequacyStatus === 'manageable' ? 'bg-green-100 text-green-700' :
                  analysis.comparisons.deductible.adequacyStatus === 'severe' ? 'bg-red-100 text-red-700' :
                  analysis.comparisons.deductible.adequacyStatus === 'stressful' ? 'bg-amber-100 text-amber-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {analysis.comparisons.deductible.adequacyStatus}
                </span>
              </div>
              <div className="grid gap-3 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Deductible:</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(analysis.comparisons.deductible.deductible)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Monthly Obligations:</span>
                  <span className="text-gray-900 font-semibold">{formatCurrency(analysis.comparisons.deductible.monthlyObligationPressure)}</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-700 bg-white rounded-lg p-4 border border-gray-200">
                {analysis.comparisons.deductible.explanation}
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Business Interruption Reality */}
        <div className="mt-8 rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">
            How Long Your Insurance Would Carry the Business
          </h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div className="rounded-xl border-2 border-gray-200 bg-white p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Monthly Revenue</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatCurrency(analysis.comparisons.businessInterruption.monthlyRevenue)}
              </p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-white p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">BI Limit</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {formatCurrency(analysis.comparisons.businessInterruption.policyLimit)}
              </p>
            </div>
            <div className="rounded-xl border-2 border-amber-200 bg-amber-100 p-5">
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Months Covered</p>
              <p className="mt-2 text-3xl font-bold text-amber-700">
                {analysis.comparisons.businessInterruption.monthsCovered || 0} months
              </p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-white p-5">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Estimated Recovery</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {analysis.comparisons.businessInterruption.recoveryMonths} months
              </p>
            </div>
          </div>
          {analysis.findings.biFindings.map((finding, idx) => (
            <div key={idx} className="mt-6 rounded-xl bg-white border-2 border-gray-200 p-6">
              <p className="text-base text-gray-900 font-medium leading-relaxed">{finding}</p>
            </div>
          ))}
        </div>

        {/* Section 5: Loss History & Renewal Pressure */}
        {analysis.lossHistory.totalClaims > 0 && (
          <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">
              How Past Claims May Affect Future Coverage
            </h2>
            <div className="mt-6 space-y-4">
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Claims</p>
                  <p className="mt-2 text-4xl font-bold text-gray-900">
                    {analysis.lossHistory.totalClaims}
                  </p>
                </div>
                <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs font-bold text-amber-700 uppercase tracking-wide">Open Claims</p>
                  <p className="mt-2 text-4xl font-bold text-amber-700">
                    {analysis.lossHistory.openClaimsCount}
                  </p>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Loss Pressure</p>
                  <p className="mt-2 text-2xl font-bold text-gray-900 uppercase">
                    {analysis.lossHistory.lossPressureBand}
                  </p>
                </div>
              </div>
              {analysis.findings.lossHistoryFindings.length > 0 && (
                <div className="mt-6 space-y-3">
                  {analysis.findings.lossHistoryFindings.map((finding, idx) => (
                    <div key={idx} className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm text-gray-900 font-medium">{finding}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Section 6: Operational Risk Environment */}
        {analysis.findings.operationalFindings.length > 0 && (
          <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">
              Current Conditions Increasing Risk
            </h2>
            <div className="mt-6 space-y-3">
              {analysis.findings.operationalFindings.map((finding, idx) => (
                <div key={idx} className="rounded-xl border-2 border-amber-200 bg-amber-50 p-5">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-base text-gray-900 font-medium">{finding}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-700 border-t-2 border-gray-200 pt-5 bg-gray-50 rounded-lg p-4">
              This matters because insurers may view unresolved issues as indicators of increased future loss risk.
            </p>
          </div>
        )}

        {/* Section 7: Location & Hazard Risk */}
        {analysis.findings.hazardFindings.length > 0 && (
          <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">
              Location Risks That May Affect Loss Severity
            </h2>
            <div className="mt-6 space-y-3">
              {analysis.findings.hazardFindings.map((finding, idx) => (
                <div key={idx} className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
                  <p className="text-base text-gray-900 font-medium">{finding}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-700 border-t-2 border-gray-200 pt-5 bg-gray-50 rounded-lg p-4">
              These conditions may increase both the severity of loss and the time required to fully recover.
            </p>
          </div>
        )}

        {/* Section 8: Top Priority Actions */}
        {analysis.priorities.length > 0 && (
          <div className="mt-8 rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900">What You Should Fix First</h2>
            <div className="mt-6 space-y-4">
              {analysis.priorities.map((action, idx) => (
                <div key={idx} className="rounded-xl border-2 border-gray-200 bg-white p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{action.title}</h3>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide flex-shrink-0 ${
                      action.urgency === 'fix_now' ? 'bg-red-100 text-red-700' :
                      action.urgency === 'fix_before_renewal' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {action.urgency.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{action.whyItMatters}</p>
                  <div className="rounded-lg bg-green-50 border border-green-200 p-4">
                    <p className="text-sm font-semibold text-green-800">
                      <span className="text-green-600">Impact:</span> {action.estimatedImpact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 9: Scenario Analysis */}
        <div className="mt-8 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900">Loss Scenario Analysis</h2>
          <p className="mt-2 text-base text-gray-600">
            How your insurance would respond to different types of losses.
          </p>
          <div className="mt-6 space-y-4">
            {Object.entries(analysis.scenarioAnalysis).map(([key, scenario]) => (
              <div key={key} className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">{scenario.title}</h3>
                <div className="grid gap-3 md:grid-cols-4 text-sm mb-4">
                  {scenario.estimatedLossAmount > 0 && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Loss Amount</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">{formatCurrency(scenario.estimatedLossAmount)}</p>
                    </div>
                  )}
                  {scenario.estimatedDowntimeMonths > 0 && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Downtime</p>
                      <p className="mt-1 text-xl font-bold text-gray-900">{scenario.estimatedDowntimeMonths} mo</p>
                    </div>
                  )}
                  {scenario.estimatedCoveredMonths > 0 && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Covered</p>
                      <p className="mt-1 text-xl font-bold text-green-700">{scenario.estimatedCoveredMonths} mo</p>
                    </div>
                  )}
                  {scenario.estimatedUncoveredAmount > 0 && (
                    <div className="text-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Uncovered</p>
                      <p className="mt-1 text-xl font-bold text-red-700">{formatCurrency(scenario.estimatedUncoveredAmount)}</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{scenario.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 10: If Nothing Changes */}
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
                {analysis.ifNothingChanges}
              </p>
            </div>
          </div>
        </div>

        {/* Section 11: Report Footer / Next Steps */}
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
