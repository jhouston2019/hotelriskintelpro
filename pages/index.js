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
        {/* Hero */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-hrip-navy mb-6">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Insurance Analysis for Hotel Owners
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                  Will Your Hotel Insurance Actually Save Your Business?
                </h1>
                <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                  Most hotel owners believe their insurance fully protects them. In reality, many policies leave properties underinsured, business interruption coverage too short, and major losses partially uncovered.
                </p>
                <p className="mt-4 text-lg font-medium text-gray-900">
                  Find out whether your hotel could financially survive a serious loss.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link
                    href="/intake"
                    className="inline-flex items-center justify-center rounded-lg bg-hrip-navy px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-800 transition-all hover:shadow-xl"
                  >
                    Analyze My Hotel Insurance
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link
                    href="#how-it-works"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
                  >
                    See How It Works
                  </Link>
                </div>
                
                {/* Value strip */}
                <div className="mt-10 grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Find hidden coverage gaps</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">See how long BI really lasts</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Estimate uncovered exposure</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 font-medium">Understand real survivability</span>
                  </div>
                </div>
              </div>

              {/* Right hero panel - Sample Report Preview */}
              <div className="rounded-2xl border-2 border-red-200 bg-white p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Sample Analysis
                  </p>
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-700">
                    High Risk
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl bg-gradient-to-br from-red-50 to-red-100 p-6 border border-red-200">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-red-900">Survivability Score</p>
                      <p className="text-5xl font-bold text-red-600">47<span className="text-2xl text-red-400">/100</span></p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200 px-5 py-4">
                      <p className="text-sm font-medium text-gray-700">Property Underinsured</p>
                      <p className="text-xl font-bold text-red-600">$3.4M</p>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200 px-5 py-4">
                      <p className="text-sm font-medium text-gray-700">BI Coverage Duration</p>
                      <p className="text-xl font-bold text-orange-600">5 Months</p>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-gray-50 border border-gray-200 px-5 py-4">
                      <p className="text-sm font-medium text-gray-700">Est. Recovery Time</p>
                      <p className="text-xl font-bold text-gray-900">14 Months</p>
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-red-50 border-2 border-red-300 px-5 py-4">
                      <p className="text-sm font-bold text-red-900">Potential Exposure</p>
                      <p className="text-xl font-bold text-red-600">$9.1M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Most Hotels Discover Their Coverage Problems After the Disaster
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                Major weaknesses are often invisible until after a fire, storm, water loss, or shutdown. By then, the financial damage is already done.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Property coverage too low</p>
                    <p className="mt-2 text-sm text-gray-700">Rebuild costs exceed policy limits</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Coinsurance penalties</p>
                    <p className="mt-2 text-sm text-gray-700">Underinsurance triggers penalty clauses</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">BI runs out early</p>
                    <p className="mt-2 text-sm text-gray-700">Coverage ends while recovery continues</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Exclusions block recovery</p>
                    <p className="mt-2 text-sm text-gray-700">Policy language limits critical claims</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Exposure Example */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  A Single Insurance Gap Can Cost Millions
                </h2>
                <p className="mt-4 text-lg text-gray-700">
                  If a major loss occurs, the owner may have to fund that gap personally.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-red-200 bg-white p-8 shadow-xl">
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
                    <span className="text-base font-medium text-gray-700">Replacement Value</span>
                    <span className="text-2xl font-bold text-gray-900">$20M</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b-2 border-gray-200">
                    <span className="text-base font-medium text-gray-700">Policy Limit</span>
                    <span className="text-2xl font-bold text-orange-600">$14M</span>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-base font-bold text-red-700">Coverage Gap</span>
                    <span className="text-3xl font-bold text-red-600">$6M</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Business Interruption Reality */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Business Interruption Coverage Often Runs Out Too Soon
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                Many owners think BI means they are covered until recovery. In reality, the coverage may only last a few months.
              </p>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl border-2 border-orange-200 bg-white p-8 shadow-xl">
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-700">Annual Revenue</span>
                    <span className="text-xl font-bold text-gray-900">$12M</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-gray-700">Monthly Revenue</span>
                    <span className="text-xl font-bold text-gray-900">$1M</span>
                  </div>
                  <div className="flex items-center justify-between pb-5 border-b-2 border-gray-200">
                    <span className="text-base font-medium text-gray-700">BI Coverage</span>
                    <span className="text-xl font-bold text-orange-600">$4M</span>
                  </div>
                  <div className="flex items-center justify-between bg-orange-50 rounded-lg p-4">
                    <span className="text-base font-semibold text-orange-900">Coverage Duration</span>
                    <span className="text-xl font-bold text-orange-600">4 months</span>
                  </div>
                  <div className="flex items-center justify-between pb-5 border-b-2 border-gray-200">
                    <span className="text-base font-medium text-gray-700">Typical Recovery</span>
                    <span className="text-xl font-bold text-gray-900">12–18 months</span>
                  </div>
                  <div className="flex items-center justify-between bg-red-50 rounded-lg p-4">
                    <span className="text-base font-bold text-red-900">Potential Revenue Exposure</span>
                    <span className="text-2xl font-bold text-red-600">$8M–$14M</span>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-center text-base font-semibold text-hrip-navy">
                Hotel Risk Pro shows this immediately.
              </p>
            </div>
          </div>
        </section>

        {/* What the Product Does */}
        <section className="py-20 bg-blue-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Hotel Risk Pro Reveals the Real Financial Risk in Your Insurance
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-blue-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-3">
                  Property coverage vs rebuild cost
                </p>
                <p className="text-sm text-gray-700">
                  Compare policy limits to actual replacement value
                </p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-3">
                  Business interruption vs revenue exposure
                </p>
                <p className="text-sm text-gray-700">
                  Calculate how long BI will actually last
                </p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-3">
                  Liability limits vs real claim risk
                </p>
                <p className="text-sm text-gray-700">
                  Assess whether liability coverage is sufficient
                </p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-3">
                  Deductible stress vs cash flow
                </p>
                <p className="text-sm text-gray-700">
                  Evaluate whether you can afford the deductible
                </p>
              </div>
              <div className="rounded-xl border border-blue-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue mb-6">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-lg font-bold text-gray-900 mb-3">
                  Loss patterns that may threaten renewal
                </p>
                <p className="text-sm text-gray-700">
                  Identify claim trends affecting insurability
                </p>
              </div>
            </div>
            <p className="mt-12 text-center text-lg font-semibold text-gray-900">
              The result is a clear Insurance Survivability Report.
            </p>
          </div>
        </section>

        {/* Core Value Proposition */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Know Whether Your Insurance Will Carry Your Business Through a Disaster
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 mb-6">
                  <span className="text-3xl font-bold text-red-600">1</span>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-3">
                  Are you underinsured?
                </p>
                <p className="text-base text-gray-700">
                  Find out if your property coverage matches actual rebuild costs
                </p>
              </div>
              <div className="rounded-2xl border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 mb-6">
                  <span className="text-3xl font-bold text-orange-600">2</span>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-3">
                  Would your insurance run out before you recover?
                </p>
                <p className="text-base text-gray-700">
                  See if BI coverage lasts long enough for full recovery
                </p>
              </div>
              <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 mb-6">
                  <span className="text-3xl font-bold text-red-600">3</span>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-3">
                  Are there hidden exclusions or coverage gaps?
                </p>
                <p className="text-base text-gray-700">
                  Identify policy language that limits critical claims
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Analyze Your Hotel Insurance in Minutes
              </h2>
              <p className="mt-4 text-lg text-gray-700">
                No onboarding call. No complicated setup. Just a guided analysis of whether your coverage actually protects your business.
              </p>
            </div>
            <div className="grid gap-12 md:grid-cols-3">
              <div className="relative text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue shadow-lg">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-3">
                  Enter basic hotel information
                </p>
                <p className="text-base text-gray-700">
                  Property value, revenue, location, and key details
                </p>
              </div>
              <div className="relative text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue shadow-lg">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-3">
                  Upload your insurance policy
                </p>
                <p className="text-base text-gray-700">
                  We analyze coverage limits, exclusions, and terms
                </p>
              </div>
              <div className="relative text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue shadow-lg">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900 mb-3">
                  Receive your survivability analysis
                </p>
                <p className="text-base text-gray-700">
                  Clear report showing gaps, exposure, and risk
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Cost vs Risk */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                The Cost of the Tool vs The Risk
              </h2>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white p-10 text-center hover:shadow-xl transition-shadow">
                <p className="text-sm font-bold uppercase tracking-wider text-blue-700 mb-4">
                  Hotel Risk Pro
                </p>
                <p className="text-5xl font-bold text-hrip-navy mb-2">$199<span className="text-2xl text-gray-600">/month</span></p>
                <p className="text-base text-gray-700">Complete insurance analysis</p>
              </div>
              <div className="rounded-2xl border-2 border-red-300 bg-gradient-to-br from-red-50 to-white p-10 text-center hover:shadow-xl transition-shadow">
                <p className="text-sm font-bold uppercase tracking-wider text-red-700 mb-4">
                  Potential Uncovered Loss
                </p>
                <p className="text-5xl font-bold text-red-600 mb-2">$5M–$20M+</p>
                <p className="text-base text-gray-700">If disaster strikes with gaps</p>
              </div>
            </div>
            <p className="mt-8 text-center text-lg text-gray-700 max-w-2xl mx-auto">
              The goal is simple: identify and correct insurance weaknesses before disaster occurs.
            </p>
          </div>
        </section>

        {/* Who It's For */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Built For Hotel Owners With Real Exposure
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 hover:border-hrip-navy hover:shadow-lg transition-all">
                <p className="font-semibold text-gray-900">Independent Hotel Owners</p>
              </div>
              <div className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 hover:border-hrip-navy hover:shadow-lg transition-all">
                <p className="font-semibold text-gray-900">Boutique Hotels</p>
              </div>
              <div className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 hover:border-hrip-navy hover:shadow-lg transition-all">
                <p className="font-semibold text-gray-900">Regional Hotel Groups</p>
              </div>
              <div className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 hover:border-hrip-navy hover:shadow-lg transition-all">
                <p className="font-semibold text-gray-900">Hospitality Investors</p>
              </div>
              <div className="rounded-xl border-2 border-gray-300 bg-white px-8 py-4 hover:border-hrip-navy hover:shadow-lg transition-all">
                <p className="font-semibold text-gray-900">Management Groups</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-hrip-navy via-blue-800 to-hrip-blue">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Find Out Whether Your Hotel Insurance Actually Protects Your Business
            </h2>
            <p className="mt-6 text-xl text-blue-100">
              Get a clear survivability analysis in minutes. No complicated setup. No enterprise onboarding.
            </p>
            <div className="mt-10">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center rounded-lg bg-white px-10 py-5 text-lg font-bold text-hrip-navy shadow-2xl hover:bg-gray-100 transition-all hover:scale-105"
              >
                Analyze My Coverage
                <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Hotel Risk Pro. All rights reserved.</p>
            <p className="text-sm text-gray-500">Insurance survivability check for hotel owners.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
