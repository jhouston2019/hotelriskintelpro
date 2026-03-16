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
                Risk Intelligence Monitoring
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
        <section className="bg-gradient-to-b from-slate-50 via-white to-white py-20">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-16">
              {/* Hero Content */}
              <div className="max-w-6xl mx-auto mb-12 text-center">
                {/* Hero Headline */}
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6 sm:text-5xl lg:text-6xl leading-tight">
                  Hotel Risk Pro Saves Hotel Owners Thousands in Insurance Costs and Prevents Millions in Uncovered Loss Exposure
                </h1>

                {/* Subheadline */}
                <p className="text-xl text-gray-700 leading-relaxed mb-6 max-w-5xl mx-auto">
                  HRP analyzes your hotel's insurance coverage, rebuild exposure, business interruption protection, and financial risk structure to reveal where a disaster could leave the business responsible for major losses.
                </p>

                {/* Automation Message */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200 px-8 py-5 mb-10 max-w-4xl mx-auto">
                  <p className="text-lg font-bold text-gray-900 text-center">
                    Setup takes about 15 minutes. After that, Hotel Risk Pro continuously monitors your risk structure automatically.
                  </p>
                  <div className="flex items-center justify-center gap-6 mt-4 text-sm font-semibold text-gray-700">
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Automated
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Simple
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Fast
                    </span>
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      No onboarding headache
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                  <Link
                    href="/dashboard"
                    className="w-full sm:w-auto rounded-lg bg-hrip-navy px-8 py-4 text-lg font-bold text-white hover:bg-hrip-blue transition-all shadow-lg hover:shadow-xl"
                  >
                    Monitor My Hotel Risk
                  </Link>
                  <Link
                    href="#what-it-monitors"
                    className="w-full sm:w-auto rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
                  >
                    See What It Monitors
                  </Link>
                </div>
              </div>
            </div>

            {/* Live Dashboard Demo */}
            <div className="rounded-3xl border-4 border-gray-300 bg-white shadow-2xl overflow-hidden">
              {/* Dashboard Header */}
              <div className="bg-gradient-to-r from-hrip-navy to-hrip-blue px-8 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold opacity-90 mb-2 uppercase tracking-wider">Example: What You'll See</p>
                    <h2 className="text-2xl font-bold">85-Room Boutique Hotel</h2>
                    <p className="text-sm opacity-90 mt-1">Continuous monitoring dashboard</p>
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
            <div className="text-center">
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/intake"
                  className="inline-flex items-center justify-center rounded-xl bg-hrip-navy px-12 py-6 text-xl font-bold text-white shadow-2xl hover:bg-blue-800 transition-all hover:scale-105"
                >
                  Monitor My Hotel Risk
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href="#what-it-monitors"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-gray-300 bg-white px-12 py-6 text-xl font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all"
                >
                  See What It Monitors
                </Link>
              </div>
              <p className="text-base text-gray-600 mt-6">Continuous monitoring • Setup takes 15 minutes • $199/month</p>
            </div>
          </div>
        </section>

        {/* What Happens Without Hotel Risk Pro */}
        <section className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                What Happens Without Hotel Risk Pro
              </h2>
              
              <div className="mb-10">
                <p className="text-xl text-gray-800 leading-relaxed mb-4 text-center">
                  When hotels do not continuously monitor their insurance and risk structure, problems often remain hidden until a major loss occurs.
                </p>
                <p className="text-xl font-bold text-gray-900 leading-relaxed text-center">
                  At that point, correction is no longer possible.
                </p>
              </div>

              <div className="bg-white rounded-2xl border-2 border-red-200 p-10 shadow-xl mb-10">
                <p className="text-lg font-bold text-gray-900 mb-6">
                  Without ongoing risk intelligence, hotels often discover:
                </p>
                <ul className="space-y-5 text-lg text-gray-900">
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-red-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Rebuild costs exceed policy limits, leaving millions in uncovered property damage.</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-red-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Business interruption coverage runs out before the property can realistically reopen.</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-red-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Coinsurance penalties reduce claim payments, cutting recovery funds when they are needed most.</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-red-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Policy exclusions or sublimits limit coverage, leaving major losses partially uncovered.</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-red-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Revenue exposure during downtime creates financial strain the business cannot absorb.</span>
                  </li>
                  <li className="flex items-start gap-4 p-4 rounded-lg bg-red-50 border border-red-200">
                    <span className="text-red-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Claim history increases renewal pressure, leading to higher premiums or reduced coverage options.</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-10 text-white text-center shadow-2xl">
                <p className="text-xl leading-relaxed mb-6">
                  Many hotel owners discover these issues only after a disaster, when the financial consequences are already locked in.
                </p>
                <p className="text-2xl font-bold leading-relaxed">
                  Hotel Risk Pro exists to identify and correct these conditions before a loss exposes them.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - 3 Steps */}
        <section className="py-20 bg-gradient-to-b from-white to-slate-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                How It Works
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Step 1 */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-hrip-navy text-white text-2xl font-bold mb-6 mx-auto">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Upload Your Policy
                </h3>
                <p className="text-base text-gray-700 leading-relaxed text-center">
                  Upload your hotel insurance policy and basic property information.
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-hrip-navy text-white text-2xl font-bold mb-6 mx-auto">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  HRP Analyzes Your Risk Structure
                </h3>
                <p className="text-base text-gray-700 leading-relaxed text-center">
                  The platform evaluates coverage, rebuild exposure, business interruption protection, coinsurance risks, and other financial variables.
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-hrip-navy text-white text-2xl font-bold mb-6 mx-auto">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Continuous Risk Monitoring
                </h3>
                <p className="text-base text-gray-700 leading-relaxed text-center">
                  HRP continuously monitors those conditions and alerts you when risk exposure changes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What Hotel Risk Pro Is */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-5xl mx-auto">
              {/* Introduction */}
              <div className="mb-12">
                <p className="text-3xl font-bold text-gray-900 mb-6 leading-relaxed">
                  Hotel Risk Pro is a dynamic insurance and loss-risk intelligence system for hotel owners.
                </p>
                <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                  It takes the things that determine how a loss actually affects a hotel:
                </p>
                <div className="grid md:grid-cols-2 gap-3 mb-6 text-lg text-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-hrip-navy font-bold">•</span>
                    <span>Insurance policy structure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-hrip-navy font-bold">•</span>
                    <span>Rebuild cost exposure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-hrip-navy font-bold">•</span>
                    <span>Business interruption coverage</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-hrip-navy font-bold">•</span>
                    <span>Coinsurance provisions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-hrip-navy font-bold">•</span>
                    <span>Exclusions and sublimits</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-hrip-navy font-bold">•</span>
                    <span>Revenue dependence</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-hrip-navy font-bold">•</span>
                    <span>Recovery timelines</span>
                  </div>
                </div>
                <p className="text-xl font-bold text-gray-900 leading-relaxed">
                  …and turns them into clear financial outcomes.
                </p>
              </div>

              {/* Instead of reading */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-200 p-8 mb-12 shadow-lg">
                <p className="text-xl text-gray-700 mb-4 leading-relaxed">
                  Instead of reading a policy, the owner sees:
                </p>
                <ul className="space-y-3 text-lg text-gray-900">
                  <li className="flex items-start gap-3">
                    <span className="text-hrip-navy font-bold text-xl">→</span>
                    <span className="font-medium">How much a disaster could cost</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-hrip-navy font-bold text-xl">→</span>
                    <span className="font-medium">How much insurance would actually pay</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-hrip-navy font-bold text-xl">→</span>
                    <span className="font-medium">What financial gap remains</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-hrip-navy font-bold text-xl">→</span>
                    <span className="font-medium">What needs to be fixed</span>
                  </li>
                </ul>
              </div>

              {/* In Simple Terms */}
              <div className="bg-hrip-navy rounded-2xl p-10 mb-12 text-white text-center shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">In Simple Terms</h2>
                <p className="text-2xl leading-relaxed mb-4">
                  Hotel Risk Pro answers one question:
                </p>
                <p className="text-3xl font-bold leading-relaxed mb-6">
                  "If my hotel suffers a major loss tomorrow, what would the financial damage actually be?"
                </p>
                <p className="text-2xl font-semibold">
                  Then it helps prevent that damage.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How Hotel Risk Pro Benefits & Protects Your Business */}
        <section id="what-it-monitors" className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-10 text-center">How Hotel Risk Pro Benefits & Protects Your Business</h2>
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-10 shadow-lg">
                <ul className="space-y-5 text-lg text-gray-900">
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Reads and interprets the hotel's insurance policy</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Compares coverage to real rebuild cost and exposure</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Calculates business interruption survivability</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Identifies coverage gaps and claim-payment risks</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Shows the dollar exposure that could remain after insurance</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Recommends the fixes needed to eliminate those gaps</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Continuously monitors those conditions as they change</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Takes Minutes. HRP Runs Automatically */}
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                Setup Takes Minutes. HRP Runs Automatically.
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-8 text-center">
                Hotel Risk Pro is designed to be simple for hotel owners to deploy and use.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-10 text-center">
                There is no complicated onboarding process and no technical setup.
              </p>

              <div className="bg-white rounded-2xl border-2 border-blue-200 p-10 shadow-lg">
                <ul className="space-y-5 text-lg text-gray-900">
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Upload your insurance policy</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Enter basic property and revenue information</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">HRP automatically analyzes your risk structure</span>
                  </li>
                </ul>
              </div>

              <p className="text-xl text-gray-900 leading-relaxed mt-10 text-center font-medium">
                From there, the platform continuously monitors your risk environment and alerts you when conditions change.
              </p>
            </div>
          </div>
        </section>

        {/* What HRP Does Day-to-Day */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
                What HRP Does Day-to-Day
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-10 text-center">
                Once your hotel is set up, Hotel Risk Pro automatically:
              </p>

              <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl border-2 border-gray-200 p-10 shadow-lg">
                <ul className="space-y-5 text-lg text-gray-900">
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Monitors coverage vs rebuild exposure</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Tracks business interruption sustainability</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Flags coinsurance and policy structure risks</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Detects coverage gaps as conditions change</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-hrip-navy font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Alerts owners when financial exposure increases</span>
                  </li>
                </ul>
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mt-10 text-center">
                Owners can check the dashboard anytime to see the current protection status of their hotel.
              </p>
            </div>
          </div>
        </section>

        {/* Why It's Valuable */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why It's Valuable
              </h2>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-200 p-10 shadow-lg">
                <ul className="space-y-5 text-lg text-gray-900">
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Prevents millions in hidden exposure from building unnoticed.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Reduces the time it takes to understand how a loss will affect the business.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Reduces claim stress by clarifying what the policy structure should and should not cover.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Helps owners make faster decisions before, during, and after a loss.</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-blue-600 font-bold text-2xl flex-shrink-0">•</span>
                    <span className="font-medium">Protects profitability, financial resilience, and asset value over time.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Intelligence Output */}
        <section className="py-20 bg-gray-50">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                What Owners See
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
              {/* Monitoring Output 1 */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900 uppercase">Property Coverage vs Current Rebuild Exposure</h3>
                  <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                    GAP
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Policy Limit</span>
                    <span className="text-base font-bold text-gray-900">$14.0M</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current Rebuild Cost</span>
                    <span className="text-base font-bold text-gray-900">$17.4M</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  Property exposure has drifted above current policy limits.
                </p>
              </div>

              {/* Monitoring Output 2 */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900 uppercase">BI Sustainability Window</h3>
                  <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                    ALERT
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Coverage Duration</span>
                    <span className="text-base font-bold text-orange-600">5 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Realistic Recovery</span>
                    <span className="text-base font-bold text-gray-900">12-18 months</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
                  Business interruption may no longer support realistic recovery timelines.
                </p>
              </div>

              {/* Monitoring Output 3 */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900 uppercase">Coinsurance Risk Flag</h3>
                  <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                    WATCH
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Required Coverage</span>
                    <span className="text-base font-bold text-gray-900">90%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current Coverage</span>
                    <span className="text-base font-bold text-yellow-600">82%</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  Coinsurance penalty could reduce claim payments by 8-10%.
                </p>
              </div>

              {/* Monitoring Output 4 */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900 uppercase">Renewal Pressure Signal</h3>
                  <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                    ELEVATED
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Water Claims (3 yrs)</span>
                    <span className="text-base font-bold text-gray-900">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Total Paid</span>
                    <span className="text-base font-bold text-gray-900">$380K</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
                  Repeated water claims may increase renewal pressure.
                </p>
              </div>

              {/* Monitoring Output 5 */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900 uppercase">Coverage Gap Alert</h3>
                  <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                    CRITICAL
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Flood Coverage</span>
                    <span className="text-base font-bold text-red-600">None</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sewer Backup</span>
                    <span className="text-base font-bold text-red-600">Excluded</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 bg-red-50 border border-red-200 rounded-lg p-3">
                  Major water-related losses could be only partially covered.
                </p>
              </div>

              {/* Monitoring Output 6 */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-gray-900 uppercase">Recovery Resilience Rating</h3>
                  <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-bold">
                    WEAK
                  </span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Cash Reserves</span>
                    <span className="text-base font-bold text-gray-900">2.1 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Deductible</span>
                    <span className="text-base font-bold text-gray-900">$250K</span>
                  </div>
                </div>
                <p className="text-sm text-gray-700 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  Limited reserves may create cash stress during claim period.
                </p>
              </div>
            </div>

            {/* Total Exposure Summary */}
            <div className="max-w-3xl mx-auto mt-12">
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-10 text-white text-center">
                <p className="text-base font-bold uppercase tracking-wider mb-2 text-red-100">
                  Total Uncovered Financial Exposure
                </p>
                <p className="text-6xl font-bold mb-3">$9.1M</p>
                <p className="text-lg">Potential financial damage if a major loss occurs today</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why This Is a Subscription */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why This Is a Subscription
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-12">
                The insurance and financial risk structure of a hotel is never static. Rebuild costs change, revenue changes, policy terms change, claims occur, and the asset's exposure profile evolves over time. Hotel Risk Pro exists to monitor those changes continuously so owners do not discover critical weaknesses only after a loss.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="flex items-start gap-4 bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-base text-gray-900 font-medium">
                  Ongoing monitoring
                </p>
              </div>

              <div className="flex items-start gap-4 bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-base text-gray-900 font-medium">
                  Ongoing alerts
                </p>
              </div>

              <div className="flex items-start gap-4 bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-base text-gray-900 font-medium">
                  Ongoing policy/exposure alignment
                </p>
              </div>

              <div className="flex items-start gap-4 bg-blue-50 rounded-xl border-2 border-blue-200 p-6">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-base text-gray-900 font-medium">
                  Ongoing risk drift detection
                </p>
              </div>

              <div className="flex items-start gap-4 bg-blue-50 rounded-xl border-2 border-blue-200 p-6 md:col-span-2">
                <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <p className="text-base text-gray-900 font-medium">
                  Ongoing protection of financial resilience
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Who This Is For */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="text-center max-w-4xl mx-auto mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Built For Hospitality Owners Who Need Ongoing Protection
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6 text-center">
                <p className="text-lg font-bold text-gray-900">Independent hotel owners</p>
              </div>
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6 text-center">
                <p className="text-lg font-bold text-gray-900">Boutique hotel groups</p>
              </div>
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6 text-center">
                <p className="text-lg font-bold text-gray-900">Regional operators</p>
              </div>
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6 text-center">
                <p className="text-lg font-bold text-gray-900">Hospitality investors</p>
              </div>
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6 text-center">
                <p className="text-lg font-bold text-gray-900">Asset managers</p>
              </div>
              <div className="bg-gray-50 rounded-xl border-2 border-gray-200 p-6 text-center">
                <p className="text-lg font-bold text-gray-900">Owners protecting long-term property value</p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 bg-gradient-to-br from-hrip-navy via-blue-800 to-hrip-blue">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6 leading-tight">
              Continuously Monitor the Risk Structure Behind Your Hotel
            </h2>
            <p className="text-2xl text-blue-100 mb-12 leading-relaxed">
              Hotel Risk Pro helps you track the insurance, interruption, and financial exposure factors that determine how your business performs when losses occur.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center rounded-xl bg-white px-12 py-6 text-2xl font-bold text-hrip-navy shadow-2xl hover:bg-gray-100 transition-all hover:scale-105"
              >
                Monitor My Hotel Risk
                <svg className="ml-3 w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <Link
                href="#what-it-monitors"
                className="inline-flex items-center justify-center rounded-xl border-2 border-white bg-transparent px-12 py-6 text-2xl font-semibold text-white hover:bg-white hover:bg-opacity-10 transition-all"
              >
                See What It Monitors
              </Link>
            </div>
            <p className="text-base text-blue-200 mt-6">Continuous monitoring • Setup takes 15 minutes • $199/month</p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} Hotel Risk Pro. All rights reserved.</p>
            <p className="text-sm text-gray-500">Risk Intelligence Monitoring for Hotel Owners</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
