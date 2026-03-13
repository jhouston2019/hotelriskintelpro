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
                Risk Intelligence System
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
        {/* Hero with Live Dashboard Demo */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="mx-auto max-w-7xl px-6">
            {/* Headline */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-hrip-navy mb-4">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Hotel Insurance Risk Intelligence
              </div>
              
              <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
                See Your Insurance Risk in Real-Time
              </h1>
              
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Identify millions in uncovered exposure before disaster strikes
              </p>
            </div>

            {/* Live Dashboard Demo */}
            <div className="rounded-3xl border-4 border-gray-300 bg-white shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-hrip-navy to-hrip-blue px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold opacity-90 mb-1">LIVE DEMO</p>
                    <h2 className="text-2xl font-bold">Riverside Boutique Hotel - 85 Rooms</h2>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90 mb-1">Risk Status</p>
                    <div className="inline-flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-bold">HIGH RISK</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Metrics - Dollar Savings Emphasized */}
              <div className="p-8 bg-gray-50">
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  {/* Survivability Score */}
                  <div className="bg-white rounded-2xl border-2 border-red-200 p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs font-bold text-gray-600 uppercase">Survivability</p>
                    </div>
                    <p className="text-5xl font-bold text-red-600 mb-2">47<span className="text-2xl text-red-400">/100</span></p>
                    <p className="text-xs text-red-700 font-semibold">Critical Risk Level</p>
                  </div>

                  {/* Total Exposure - EMPHASIZED */}
                  <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-2xl p-6 shadow-xl md:col-span-2 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-12 -mb-12"></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <p className="text-sm font-bold text-white uppercase tracking-wider">Total Uncovered Exposure</p>
                      </div>
                      <p className="text-6xl font-bold text-white mb-2">$9.1M</p>
                      <p className="text-base text-red-100 font-semibold">Potential loss if disaster strikes today</p>
                    </div>
                  </div>

                  {/* Renewal Countdown */}
                  <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-5 h-5 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <p className="text-xs font-bold text-gray-600 uppercase">Renewal In</p>
                    </div>
                    <p className="text-5xl font-bold text-orange-600 mb-2">47</p>
                    <p className="text-xs text-orange-700 font-semibold">Days to Fix Issues</p>
                  </div>
                </div>

                {/* Risk Breakdown */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Property Risk */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
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
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
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
                      <h3 className="text-sm font-bold text-gray-900 uppercase">Fix Before Renewal</h3>
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

              {/* Potential Savings Callout */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-20">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold opacity-90 mb-1">POTENTIAL SAVINGS IF FIXED</p>
                      <p className="text-4xl font-bold">$9.1M+ Protected</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm opacity-90 mb-2">Cost to Fix</p>
                    <p className="text-2xl font-bold">~$800/month</p>
                    <p className="text-xs opacity-90">Additional premium</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Below Dashboard */}
            <div className="text-center mt-12">
              <p className="text-xl text-gray-900 font-semibold mb-6">
                Get Your Hotel's Risk Intelligence Dashboard
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/intake"
                  className="inline-flex items-center justify-center rounded-lg bg-hrip-navy px-10 py-5 text-lg font-bold text-white shadow-xl hover:bg-blue-800 transition-all hover:scale-105"
                >
                  Analyze My Hotel Now
                  <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-gray-300 bg-white px-10 py-5 text-lg font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
                >
                  See How It Works
                </Link>
              </div>
              <p className="text-sm text-gray-600 mt-4">Takes 15 minutes • No sales call required • $199/month</p>
            </div>
          </div>
        </section>

        {/* What You Get */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Your Complete Risk Intelligence System
              </h2>
              <p className="text-lg text-gray-700">
                Real-time monitoring and analysis of your hotel's insurance risk
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Coverage Gap Detection</h3>
                <p className="text-base text-gray-700 mb-4">
                  Instantly see where your policy limits fall short of actual replacement costs and revenue exposure.
                </p>
                <p className="text-2xl font-bold text-red-600">$3.4M+ avg. gap found</p>
              </div>

              <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">BI Duration Analysis</h3>
                <p className="text-base text-gray-700 mb-4">
                  Calculate exactly when your business interruption coverage runs out vs. when you'll actually recover.
                </p>
                <p className="text-2xl font-bold text-orange-600">9 month avg. shortfall</p>
              </div>

              <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 hover:shadow-xl transition-shadow">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 mb-6">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Renewal Risk Tracking</h3>
                <p className="text-base text-gray-700 mb-4">
                  Monitor claim patterns and property conditions that could trigger exclusions or non-renewal.
                </p>
                <p className="text-2xl font-bold text-blue-600">47 days to renewal</p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Get Your Risk Intelligence Dashboard in 3 Steps
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue shadow-lg">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Enter Hotel Data
                </h3>
                <p className="text-base text-gray-700">
                  Property details, revenue, and financial obligations (10 minutes)
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue shadow-lg">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Upload Policy
                </h3>
                <p className="text-base text-gray-700">
                  Upload your insurance policy or enter coverage manually (5 minutes)
                </p>
              </div>

              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue shadow-lg">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Get Dashboard
                </h3>
                <p className="text-base text-gray-700">
                  Instant access to your risk intelligence dashboard (Immediate)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing with Savings Emphasis */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                $199/month vs. $9M+ in Uncovered Risk
              </h2>
              <p className="text-xl text-gray-700">
                The average hotel we analyze has $9.1M in uncovered exposure
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="rounded-2xl border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-white p-10 text-center">
                <p className="text-sm font-bold uppercase tracking-wider text-blue-700 mb-4">
                  Hotel Risk Pro
                </p>
                <p className="text-6xl font-bold text-hrip-navy mb-2">$199</p>
                <p className="text-xl text-gray-600 mb-8">/month</p>
                <ul className="text-left space-y-3 text-base text-gray-700">
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Real-time risk intelligence dashboard</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Coverage gap detection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Renewal alerts & monitoring</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Priority action recommendations</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border-4 border-red-400 bg-gradient-to-br from-red-50 to-white p-10 text-center relative overflow-hidden">
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold rotate-12">
                  AVERAGE RISK
                </div>
                <p className="text-sm font-bold uppercase tracking-wider text-red-700 mb-4">
                  Uncovered Exposure
                </p>
                <p className="text-6xl font-bold text-red-600 mb-2">$9.1M</p>
                <p className="text-xl text-gray-600 mb-8">average gap found</p>
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-left">
                  <p className="text-sm font-bold text-red-900 mb-3">What's at risk:</p>
                  <ul className="space-y-2 text-sm text-red-900">
                    <li>• $3.4M property coverage gap</li>
                    <li>• $5.4M business interruption shortfall</li>
                    <li>• $300K deductible cash stress</li>
                    <li>• Potential business closure</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-hrip-navy via-blue-800 to-hrip-blue">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              See Your Hotel's Risk Intelligence Dashboard
            </h2>
            <p className="text-xl text-blue-100 mb-4">
              Find out exactly where you're exposed in 15 minutes
            </p>
            <p className="text-3xl font-bold text-white mb-10">
              Average hotel saves $9.1M+ in uncovered risk
            </p>
            <Link
              href="/intake"
              className="inline-flex items-center justify-center rounded-lg bg-white px-10 py-5 text-lg font-bold text-hrip-navy shadow-2xl hover:bg-gray-100 transition-all hover:scale-105"
            >
              Get My Dashboard Now
              <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <p className="text-sm text-blue-200 mt-6">No credit card required • 15 minute setup • $199/month</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Hotel Risk Pro. All rights reserved.</p>
            <p className="text-sm text-gray-500">Risk Intelligence System for Hotel Owners</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
