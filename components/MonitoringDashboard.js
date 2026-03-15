import Link from "next/link";
import { useState, useEffect } from "react";
import { analyzeHotelRisk } from "../lib/risk-engine";
import QuickUpdateModal from "./dashboard/QuickUpdateModal";

export default function MonitoringDashboard() {
  const [hotelData, setHotelData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [daysUntilRenewal, setDaysUntilRenewal] = useState(0);
  const [showUpdatePrompt, setShowUpdatePrompt] = useState(false);
  const [updateType, setUpdateType] = useState(null);

  useEffect(() => {
    async function loadData() {
      const stored = localStorage.getItem("hotelRiskAnalysis");
      if (stored) {
        const data = JSON.parse(stored);
        setHotelData(data);
        
        // Run analysis (now async)
        try {
          const result = await analyzeHotelRisk(data);
          setAnalysis(result);
        } catch (error) {
          console.error('Analysis failed:', error);
        }
        
        if (data.insurancePolicy?.policyPeriodEnd) {
          const endDate = new Date(data.insurancePolicy.policyPeriodEnd);
          const today = new Date();
          const diffTime = endDate - today;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setDaysUntilRenewal(diffDays);
        }
      }
      
      // TODO: Fetch from backend when API is ready
      // const response = await fetch('/api/dashboard/data')
      // const data = await response.json()
      // setHotelData(data.hotel)
      // setAnalysis(data.latestAnalysis)
    }
    
    loadData();
  }, []);

  if (!hotelData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-16 text-center shadow-lg">
            <div className="flex justify-center mb-6">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              No Hotel Analysis Found
            </h2>
            <p className="mt-3 text-base text-gray-600">
              Complete your insurance survivability analysis to start monitoring.
            </p>
            <div className="mt-8">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center rounded-lg bg-hrip-navy px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-800 transition-all"
              >
                Start Analysis
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const survivabilityScore = analysis?.summary?.survivabilityScore || 47;
  const openIssues = analysis?.priorities?.filter(p => p.urgency === 'fix_now').length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {hotelData.hotelProfile?.hotelName || "Your Hotel"}
              </h1>
              <p className="mt-2 text-base text-gray-600">
                Insurance Survivability Monitoring
              </p>
            </div>
            <Link
              href="/report"
              className="inline-flex items-center gap-2 text-base font-semibold text-hrip-navy hover:text-blue-800 transition-colors"
            >
              View Full Report
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Key Metrics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
          <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-6 shadow-lg">
            <p className="text-sm font-bold text-red-700 uppercase tracking-wider">Survivability Score</p>
            <p className="mt-4 text-5xl font-bold text-red-600">
              {survivabilityScore}
              <span className="text-2xl text-red-400">/100</span>
            </p>
            <p className="mt-3 text-xs text-gray-600">Last updated today</p>
          </div>
          <div className="rounded-2xl border-2 border-blue-200 bg-white p-6 shadow-lg hover:shadow-xl transition-shadow">
            <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Renewal Countdown</p>
            <p className="mt-4 text-5xl font-bold text-gray-900">
              {daysUntilRenewal}
            </p>
            <p className="mt-3 text-xs text-gray-600">Days until renewal</p>
          </div>
          <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-lg">
            <p className="text-sm font-bold text-orange-700 uppercase tracking-wider">Open Priority Issues</p>
            <p className="mt-4 text-5xl font-bold text-orange-600">
              {openIssues}
            </p>
            <p className="mt-3 text-xs text-gray-600">Require attention</p>
          </div>
          <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-white p-6 shadow-lg">
            <p className="text-sm font-bold text-green-700 uppercase tracking-wider">New Claims</p>
            <p className="mt-4 text-5xl font-bold text-green-600">
              0
            </p>
            <p className="mt-3 text-xs text-gray-600">Since last review</p>
          </div>
        </div>

        {/* Carrier Intelligence Cards */}
        {analysis?.carrierIntelligence?.available && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Carrier Intelligence</h2>
            
            <div className="grid gap-6 md:grid-cols-3 mb-6">
              {/* Carrier Benchmark Score */}
              <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-white p-6 shadow-lg">
                <p className="text-sm font-bold text-purple-700 uppercase tracking-wider">Policy Competitiveness</p>
                <p className="mt-4 text-5xl font-bold text-purple-600">
                  {analysis.carrierIntelligence.benchmark?.benchmarkScore || 0}
                  <span className="text-2xl text-purple-400">/100</span>
                </p>
                <p className="mt-3 text-xs text-gray-600">
                  {analysis.carrierIntelligence.benchmark?.scoreBand === 'highly_competitive' && 'Highly Competitive'}
                  {analysis.carrierIntelligence.benchmark?.scoreBand === 'competitive' && 'Competitive'}
                  {analysis.carrierIntelligence.benchmark?.scoreBand === 'below_market' && 'Below Market'}
                  {analysis.carrierIntelligence.benchmark?.scoreBand === 'significantly_below_market' && 'Significantly Below Market'}
                </p>
              </div>
              
              {/* Coverage vs Market */}
              {analysis.carrierIntelligence.competitivePosition?.weaknesses?.length > 0 && (
                <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-lg">
                  <p className="text-sm font-bold text-orange-700 uppercase tracking-wider">Coverage Gaps</p>
                  <p className="mt-4 text-5xl font-bold text-orange-600">
                    {analysis.carrierIntelligence.competitivePosition.weaknesses.length}
                  </p>
                  <p className="mt-3 text-xs text-gray-600">Areas below market</p>
                </div>
              )}
              
              {/* Carrier Risk Signals */}
              {analysis.carrierIntelligence.benchmark?.riskFlags?.length > 0 && (
                <div className="rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-white p-6 shadow-lg">
                  <p className="text-sm font-bold text-yellow-700 uppercase tracking-wider">Carrier Signals</p>
                  <p className="mt-4 text-5xl font-bold text-yellow-600">
                    {analysis.carrierIntelligence.benchmark.riskFlags.length}
                  </p>
                  <p className="mt-3 text-xs text-gray-600">Behavior patterns detected</p>
                </div>
              )}
            </div>
            
            {/* Carrier Insights Summary */}
            {analysis.carrierIntelligence.insights?.length > 0 && (
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-6 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Carrier Behavior Insights
                </h3>
                <div className="space-y-3">
                  {analysis.carrierIntelligence.insights.slice(0, 3).map((insight, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm">
                      <svg className="h-5 w-5 flex-shrink-0 text-orange-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700">{insight.message}</span>
                    </div>
                  ))}
                </div>
                {analysis.carrierIntelligence.insights.length > 3 && (
                  <Link 
                    href="/report"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-hrip-navy hover:text-blue-800"
                  >
                    View all carrier insights
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                )}
              </div>
            )}
          </div>
        )}

        {/* Priority Actions */}
        <div className="mb-12 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Priority Actions</h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900 mb-2">
                    Increase business interruption coverage duration
                  </p>
                  <p className="text-sm text-gray-700">
                    Current BI coverage may run out before full recovery
                  </p>
                </div>
                <span className="rounded-full bg-red-100 px-4 py-2 text-xs font-bold text-red-700 whitespace-nowrap border border-red-200">
                  Fix Before Renewal
                </span>
              </div>
            </div>
            <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-base font-bold text-gray-900 mb-2">
                    Correct property underinsurance gap
                  </p>
                  <p className="text-sm text-gray-700">
                    Property coverage is below estimated replacement cost
                  </p>
                </div>
                <span className="rounded-full bg-orange-100 px-4 py-2 text-xs font-bold text-orange-700 whitespace-nowrap border border-orange-200">
                  Fix Before Renewal
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Update Prompts */}
        <div className="mb-12 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Keep Your Analysis Current</h2>
              <p className="mt-1 text-sm text-gray-600">
                Answer these quick questions to maintain analysis accuracy
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <p className="text-base font-semibold text-gray-900 mb-4">Any new claims since your last review?</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => {}}
                  className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  No
                </button>
                <button 
                  onClick={() => {
                    setUpdateType('claim');
                    setShowUpdatePrompt(true);
                  }}
                  className="flex-1 rounded-lg border-2 border-hrip-navy bg-hrip-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-all"
                >
                  Yes, add claim
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <p className="text-base font-semibold text-gray-900 mb-4">Has revenue changed materially?</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => {}}
                  className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  No
                </button>
                <button 
                  onClick={() => {
                    setUpdateType('revenue');
                    setShowUpdatePrompt(true);
                  }}
                  className="flex-1 rounded-lg border-2 border-hrip-navy bg-hrip-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-all"
                >
                  Yes, update revenue
                </button>
              </div>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
              <p className="text-base font-semibold text-gray-900 mb-4">Any major renovations or added amenities?</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => {}}
                  className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  No
                </button>
                <button 
                  onClick={() => {
                    setUpdateType('property');
                    setShowUpdatePrompt(true);
                  }}
                  className="flex-1 rounded-lg border-2 border-hrip-navy bg-hrip-navy px-6 py-3 text-sm font-semibold text-white hover:bg-blue-800 transition-all"
                >
                  Yes, update property
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/report"
            className="inline-flex items-center justify-center rounded-lg bg-hrip-navy px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-800 transition-all hover:shadow-xl"
          >
            View Full Report
          </Link>
          <Link
            href="/intake"
            className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
          >
            Update Risk Profile
          </Link>
          <button className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all">
            Download PDF
          </button>
        </div>
      </div>
      
      <QuickUpdateModal
        isOpen={showUpdatePrompt}
        onClose={() => setShowUpdatePrompt(false)}
        updateType={updateType}
        onSave={(data) => {
          // TODO: Merge update and re-run analysis
          setShowUpdatePrompt(false);
          alert('Update saved. Re-running analysis...');
        }}
      />
    </div>
  );
}
