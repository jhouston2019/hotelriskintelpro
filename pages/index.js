import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top navigation */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-hrip-navy to-hrip-blue">
              <span className="text-base font-bold tracking-tight text-white">
                HR
              </span>
            </div>
            <div>
              <p className="text-base font-bold tracking-tight text-gray-900">
                Hotel Risk Pro
              </p>
              <p className="text-xs text-gray-600">
                Insurance Survivability Check
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-8 text-sm font-medium">
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-hrip-navy transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-hrip-navy transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-red-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center mb-16">
              {/* Alert Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-6 py-3 text-base font-bold text-red-700 mb-8 border-2 border-red-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Most Hotels Are Underinsured — They Just Don't Know It
              </div>
              
              {/* Main Headline */}
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl mb-8 leading-tight max-w-5xl mx-auto">
                Would Your Hotel Survive a Major Loss?
              </h1>
              
              {/* Subheadline */}
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-2xl text-gray-700 leading-relaxed mb-8">
                  Hotel Risk Pro analyzes your insurance policy and financials to show whether your hotel would survive a major loss. Upload your policy and instantly see rebuild cost vs. coverage, when business interruption runs out, and how much exposure could be left uncovered.
                </p>
                
                {/* Value Strip */}
                <div className="grid md:grid-cols-2 gap-4 text-left bg-white border-2 border-gray-200 rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">See rebuild cost vs policy limits</p>
                      <p className="text-sm text-gray-600">Find out if your property coverage is enough</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Find out when BI coverage runs out</p>
                      <p className="text-sm text-gray-600">Compare coverage to actual recovery time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Estimate uncovered financial exposure</p>
                      <p className="text-sm text-gray-600">See the dollars your policy may leave at risk</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-bold text-gray-900 mb-1">Understand whether the business would survive</p>
                      <p className="text-sm text-gray-600">Get a clear survivability score and action plan</p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>

            {/* Live Dashboard Demo */}
            <div className="rounded-3xl border-4 border-gray-300 bg-white shadow-2xl overflow-hidden mb-12">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-hrip-navy to-hrip-blue px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold opacity-90 mb-2 uppercase tracking-wider">Example: What You'll See</p>
                    <h2 className="text-2xl font-bold">85-Room Boutique Hotel</h2>
                    <p className="text-sm opacity-90 mt-1">This is what you get after uploading your policy</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90 mb-1">Survivability Score</p>
                    <div className="inline-flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold text-2xl">47/100</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="p-8 bg-gray-50">
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Property Risk */}
                  <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-900 uppercase">Property Coverage</h3>
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        GAP
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Policy Limit</span>
                        <span className="text-base font-bold text-gray-900">$14.0M</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Rebuild Cost</span>
                        <span className="text-base font-bold text-gray-900">$17.4M</span>
                      </div>
                      <div className="pt-3 border-t-2 border-red-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-red-700">Uncovered</span>
                          <span className="text-2xl font-bold text-red-600">$3.4M</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Interruption Risk */}
                  <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-gray-900 uppercase">Business Interruption</h3>
                      <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        GAP
                      </span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Coverage Duration</span>
                        <span className="text-base font-bold text-orange-600">5 months</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Recovery Time</span>
                        <span className="text-base font-bold text-gray-900">14 months</span>
                      </div>
                      <div className="pt-3 border-t-2 border-red-200">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold text-red-700">Revenue at Risk</span>
                          <span className="text-2xl font-bold text-red-600">$5.4M</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Priority Actions */}
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl border-2 border-blue-200 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <h3 className="text-sm font-bold text-gray-900 uppercase">What to Fix</h3>
                    </div>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">1</span>
                        <span className="text-gray-700 font-medium">Increase BI coverage duration</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">2</span>
                        <span className="text-gray-700 font-medium">Close property coverage gap</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center text-xs font-bold">3</span>
                        <span className="text-gray-700 font-medium">Review ordinance coverage</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Total Exposure Callout */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
                <div className="relative">
                  <div className="text-center mb-6">
                    <p className="text-base font-bold uppercase tracking-wider mb-2 text-red-100">
                      Total Uncovered Exposure
                    </p>
                    <p className="text-7xl font-bold mb-2">$9.1M</p>
                    <p className="text-xl font-semibold">This hotel could lose this much if disaster strikes today</p>
                  </div>
                  <div className="flex items-center justify-center gap-8 pt-6 border-t-2 border-white border-opacity-20">
                    <div className="text-center">
                      <p className="text-sm opacity-90 mb-1">Cost to Fix Gaps</p>
                      <p className="text-3xl font-bold">~$800</p>
                      <p className="text-sm opacity-90">per month added premium</p>
                    </div>
                    <div className="text-5xl font-bold opacity-50">→</div>
                    <div className="text-center">
                      <p className="text-sm opacity-90 mb-1">Risk You Eliminate</p>
                      <p className="text-3xl font-bold">$9.1M+</p>
                      <p className="text-sm opacity-90">in uncovered exposure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Below Dashboard */}
            <div className="text-center mt-12">
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/intake"
                  className="inline-flex items-center justify-center rounded-xl bg-hrip-navy px-12 py-6 text-xl font-bold text-white shadow-2xl hover:bg-blue-800 transition-all hover:scale-105"
                >
                  Analyze My Hotel Insurance
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-12 py-6 text-xl font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
                >
                  See How It Works
                </Link>
              </div>
              <p className="text-base text-gray-600 mt-6">No onboarding call • Takes 15 minutes • See results immediately</p>
            </div>
          </div>
        </section>

        {/* One-Line Product Explanation */}
        <section className="py-12 bg-hrip-navy">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <p className="text-3xl font-bold text-white leading-relaxed">
              Hotel Risk Pro shows whether your insurance will actually keep your hotel alive after a major loss.
            </p>
          </div>
        </section>

        {/* What This Does */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What Hotel Risk Pro Actually Does
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Hotel Risk Pro shows hotel owners whether their insurance would actually protect the business after a major loss. It compares your coverage, revenue, and recovery risk to reveal where your policy may fail before disaster happens.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Checks Property Coverage</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Compares estimated rebuild cost to your policy limits so you can see if the building may be underinsured.
                </p>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Tests Business Interruption</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Shows how long your insurance would support the hotel during shutdown — and whether coverage may run out before recovery is complete.
                </p>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Calculates Financial Exposure</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Estimates how much risk could remain uncovered after a major fire, water loss, or extended interruption.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why This Matters
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed">
                Most hotels discover insurance gaps after a disaster, when it is already too late to fix them.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {/* Problem Block 1 */}
              <div className="rounded-2xl border-2 border-red-200 bg-white p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 flex-shrink-0">
                    <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Property Underinsurance</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      A hotel may cost far more to rebuild than the policy limit will pay.
                    </p>
                  </div>
                </div>
              </div>

              {/* Problem Block 2 */}
              <div className="rounded-2xl border-2 border-orange-200 bg-white p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Business Interruption Runs Out</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Insurance may stop supporting the business months before operations fully recover.
                    </p>
                  </div>
                </div>
              </div>

              {/* Problem Block 3 */}
              <div className="rounded-2xl border-2 border-yellow-200 bg-white p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100 flex-shrink-0">
                    <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Deductibles Create Cash Stress</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      A large deductible plus ongoing payroll, debt, and fixed costs can create immediate financial pressure.
                    </p>
                  </div>
                </div>
              </div>

              {/* Problem Block 4 */}
              <div className="rounded-2xl border-2 border-purple-200 bg-white p-8">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 flex-shrink-0">
                    <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Exclusions Leave Losses Uncovered</h3>
                    <p className="text-base text-gray-700 leading-relaxed">
                      Flood, sewer backup, ordinance, and other gaps can leave major losses only partially covered.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Closing Statement */}
            <div className="text-center mt-12">
              <p className="text-xl font-bold text-gray-900 bg-yellow-100 border-2 border-yellow-300 rounded-xl px-8 py-6 inline-block">
                Hotel Risk Pro helps identify these problems before they become catastrophic.
              </p>
            </div>
          </div>
        </section>

        {/* Financial Example */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How a Hidden Insurance Gap Turns Into a Major Financial Problem
              </h2>
            </div>

            <div className="rounded-3xl border-4 border-red-300 bg-gradient-to-br from-red-50 to-white p-10 shadow-2xl">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {/* Property Gap */}
                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">Property Coverage Gap</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">Estimated rebuild cost</span>
                      <span className="text-2xl font-bold text-gray-900">$20M</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">Property policy limit</span>
                      <span className="text-2xl font-bold text-gray-900">$14M</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-red-700">Coverage gap</span>
                      <span className="text-3xl font-bold text-red-600">$6M</span>
                    </div>
                  </div>
                </div>

                {/* BI Gap */}
                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wide">Business Interruption Gap</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">BI coverage</span>
                      <span className="text-2xl font-bold text-gray-900">$4M</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">Monthly revenue</span>
                      <span className="text-2xl font-bold text-gray-900">$1M</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">Coverage lasts</span>
                      <span className="text-2xl font-bold text-orange-600">4 months</span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                      <span className="text-base text-gray-600">Estimated recovery time</span>
                      <span className="text-2xl font-bold text-gray-900">12-18 months</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-lg font-bold text-red-700">Uncovered months</span>
                      <span className="text-3xl font-bold text-red-600">8-14</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Conclusion */}
              <div className="bg-red-600 rounded-2xl p-8 text-white text-center">
                <p className="text-2xl font-bold leading-relaxed">
                  In this example, the hotel could face millions in rebuilding shortfall plus months of uncovered interruption before it fully recovers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                What You Get After Uploading Your Policy
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-gray-200 p-6">
                  <svg className="w-6 h-6 text-hrip-navy flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Rebuild cost vs policy limit</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-gray-200 p-6">
                  <svg className="w-6 h-6 text-hrip-navy flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Business interruption coverage window</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-gray-200 p-6">
                  <svg className="w-6 h-6 text-hrip-navy flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Estimated uncovered exposure</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-gray-200 p-6">
                  <svg className="w-6 h-6 text-hrip-navy flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Recovery timeline vs coverage</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-gray-200 p-6">
                  <svg className="w-6 h-6 text-hrip-navy flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Insurance survivability score</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-gray-200 p-6">
                  <svg className="w-6 h-6 text-hrip-navy flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Plain-English action list</p>
                  </div>
                </div>
              </div>

              {/* Supporting Statement */}
              <div className="bg-hrip-navy rounded-2xl p-8 text-center">
                <p className="text-2xl font-bold text-white leading-relaxed">
                  You do not get a confusing insurance report. You get a clear answer to whether your hotel would likely survive a major loss.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue shadow-xl">
                    <span className="text-4xl font-bold text-white">1</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Upload your insurance policy
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Or enter coverage details manually if you prefer
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue shadow-xl">
                    <span className="text-4xl font-bold text-white">2</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Enter a few hotel and financial details
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Basic property info, revenue, and monthly costs
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue shadow-xl">
                    <span className="text-4xl font-bold text-white">3</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  See whether your hotel could financially survive a major loss
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  Get your survivability score and action plan
                </p>
              </div>
            </div>

            {/* Supporting Line */}
            <div className="text-center">
              <p className="text-xl text-gray-700 bg-blue-50 border-2 border-blue-200 rounded-xl px-8 py-6 inline-block">
                No onboarding call. No complicated setup. Just a guided insurance survivability check.
              </p>
            </div>
          </div>
        </section>

        {/* Why Owners Use It */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Why Hotel Owners Use It
              </h2>
            </div>

            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-blue-200 p-6">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-lg text-gray-900 font-medium">
                  To find hidden insurance gaps before renewal
                </p>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-blue-200 p-6">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-lg text-gray-900 font-medium">
                  To see whether BI coverage is actually enough
                </p>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-blue-200 p-6">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-lg text-gray-900 font-medium">
                  To understand real financial exposure before a loss happens
                </p>
              </div>

              <div className="flex items-start gap-4 bg-white rounded-xl border-2 border-blue-200 p-6">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <p className="text-lg text-gray-900 font-medium">
                  To avoid discovering coverage problems after disaster strikes
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-hrip-navy via-blue-800 to-hrip-blue">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6 leading-tight">
              Find Out Whether Your Hotel Insurance Would Actually Protect the Business
            </h2>
            <p className="text-2xl text-blue-100 mb-12 leading-relaxed">
              Upload your policy, review your exposure, and see whether your hotel would survive a major loss.
            </p>
            <Link
              href="/intake"
              className="inline-flex items-center justify-center rounded-xl bg-white px-12 py-6 text-2xl font-bold text-hrip-navy shadow-2xl hover:bg-gray-100 transition-all hover:scale-105"
            >
              Analyze My Hotel Insurance
              <svg className="ml-3 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-base text-blue-200 mt-6">Takes 15 minutes • No credit card required • See results immediately</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Hotel Risk Pro. All rights reserved.</p>
            <p className="text-sm text-gray-500">Insurance Survivability Check for Hotel Owners</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
