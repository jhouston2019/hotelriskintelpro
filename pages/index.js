import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-hrip-navy via-hrip-charcoal to-black">
      {/* Top navigation */}
      <header className="border-b border-slate-800/60 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hrip-gold/10 ring-1 ring-hrip-gold/40">
              <span className="text-sm font-semibold tracking-tight text-hrip-gold">
                HR
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-100">
                Hotel Risk Pro
              </p>
              <p className="text-xs text-slate-400">
                Insurance Survivability Check
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/pricing"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/login"
              className="rounded-md border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900 transition-colors"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-12">
        {/* Hero */}
        <section className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-center">
          <div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl leading-tight">
              Will Your Hotel Insurance Actually Save Your Business?
            </h1>
            <p className="mt-5 text-base text-slate-300 leading-relaxed">
              Most hotel owners believe their insurance fully protects them. In reality, many policies leave properties underinsured, business interruption coverage too short, and major losses partially uncovered.
            </p>
            <p className="mt-3 text-base text-slate-300 leading-relaxed">
              Hotel Risk Pro helps you find out whether your hotel could financially survive a serious loss.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center rounded-md bg-hrip-gold px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
              >
                Analyze My Hotel Insurance
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-900/40 px-6 py-3 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
              >
                See How It Works
              </Link>
            </div>
            
            {/* Value strip */}
            <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-hrip-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">Find hidden coverage gaps</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-hrip-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">See how long BI really lasts</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-hrip-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">Estimate uncovered exposure</span>
              </div>
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-hrip-gold mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-slate-400">Understand your real survivability</span>
              </div>
            </div>
          </div>

          {/* Right hero panel - Sample Report Preview */}
          <div className="rounded-2xl border border-red-900/40 bg-slate-950/70 p-5 shadow-xl shadow-red-950/40">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Sample Analysis
              </p>
              <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-medium text-red-300">
                High Risk
              </span>
            </div>
            <div className="mt-4 space-y-4 text-xs text-slate-200">
              <div className="rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="text-[11px] text-slate-400">Survivability Score</p>
                  <p className="text-2xl font-bold text-red-400">47<span className="text-sm text-slate-500">/100</span></p>
                </div>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                  <p className="text-[11px] text-slate-400">Property Underinsured</p>
                  <p className="text-sm font-semibold text-red-400">$3.4M</p>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                  <p className="text-[11px] text-slate-400">BI Coverage Duration</p>
                  <p className="text-sm font-semibold text-amber-300">5 Months</p>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                  <p className="text-[11px] text-slate-400">Est. Recovery Time</p>
                  <p className="text-sm font-semibold text-slate-300">14 Months</p>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-red-900/50 bg-red-950/30 px-3 py-2">
                  <p className="text-[11px] text-red-300 font-medium">Potential Exposure</p>
                  <p className="text-sm font-bold text-red-400">$9.1M</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Most Hotels Discover Their Coverage Problems After the Disaster
          </h2>
          <p className="mt-4 max-w-3xl text-base text-slate-300 leading-relaxed">
            Many owners assume their coverage is adequate. Major weaknesses are often invisible until after a fire, storm, water loss, or shutdown. By then, the financial damage is already done.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">Property coverage too low</p>
                  <p className="mt-1 text-xs text-slate-400">Rebuild costs exceed policy limits</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">Coinsurance penalties reduce payout</p>
                  <p className="mt-1 text-xs text-slate-400">Underinsurance triggers penalty clauses</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">Business interruption runs out before reopening</p>
                  <p className="mt-1 text-xs text-slate-400">Coverage ends while recovery continues</p>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">Exclusions block key recovery</p>
                  <p className="mt-1 text-xs text-slate-400">Policy language limits critical claims</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Exposure Example */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            A Single Insurance Gap Can Cost Millions
          </h2>
          <div className="mt-8 max-w-2xl">
            <div className="rounded-xl border border-red-900/40 bg-gradient-to-br from-slate-950 via-red-950/10 to-slate-950 p-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-sm text-slate-400">Replacement Value</span>
                  <span className="text-xl font-semibold text-slate-100">$20M</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-sm text-slate-400">Policy Limit</span>
                  <span className="text-xl font-semibold text-amber-300">$14M</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-red-300">Coverage Gap</span>
                  <span className="text-2xl font-bold text-red-400">$6M</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-300">
              If a major loss occurs, the owner may have to fund that gap personally.
            </p>
          </div>
        </section>

        {/* Business Interruption Reality */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Business Interruption Coverage Often Runs Out Too Soon
          </h2>
          <p className="mt-4 max-w-3xl text-base text-slate-300 leading-relaxed">
            Many owners think BI means they are covered until recovery. In reality, the coverage may only last a few months. Major hotel recovery can take much longer.
          </p>
          <div className="mt-8 max-w-2xl">
            <div className="rounded-xl border border-amber-900/40 bg-gradient-to-br from-slate-950 via-amber-950/10 to-slate-950 p-8">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Annual Revenue</span>
                  <span className="text-lg font-semibold text-slate-100">$12M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Monthly Revenue</span>
                  <span className="text-lg font-semibold text-slate-100">$1M</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-sm text-slate-400">BI Coverage</span>
                  <span className="text-lg font-semibold text-amber-300">$4M</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-amber-300">Coverage Duration</span>
                  <span className="text-lg font-semibold text-amber-300">4 months</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-sm text-slate-300">Typical Recovery</span>
                  <span className="text-lg font-semibold text-slate-100">12–18 months</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-medium text-red-300">Potential Revenue Exposure</span>
                  <span className="text-xl font-bold text-red-400">$8M–$14M</span>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm font-medium text-hrip-gold">
              Hotel Risk Pro shows this immediately.
            </p>
          </div>
        </section>

        {/* What the Product Does */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Hotel Risk Pro Reveals the Real Financial Risk in Your Insurance
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hrip-gold/10">
                <svg className="w-6 h-6 text-hrip-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-100">
                Property coverage vs rebuild cost
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Compare policy limits to actual replacement value
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hrip-gold/10">
                <svg className="w-6 h-6 text-hrip-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-100">
                Business interruption vs revenue exposure
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Calculate how long BI will actually last
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hrip-gold/10">
                <svg className="w-6 h-6 text-hrip-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-100">
                Liability limits vs real claim risk
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Assess whether liability coverage is sufficient
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hrip-gold/10">
                <svg className="w-6 h-6 text-hrip-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-100">
                Deductible stress vs cash flow
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Evaluate whether you can afford the deductible
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-hrip-gold/10">
                <svg className="w-6 h-6 text-hrip-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="mt-4 text-sm font-medium text-slate-100">
                Loss patterns that may threaten renewal
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Identify claim trends affecting insurability
              </p>
            </div>
          </div>
          <p className="mt-8 text-base font-medium text-slate-200">
            The result is a clear Insurance Survivability Report.
          </p>
        </section>

        {/* Core Value Proposition */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Know Whether Your Insurance Will Carry Your Business Through a Disaster
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-red-900/40 bg-gradient-to-br from-red-950/20 to-slate-950 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 ring-1 ring-red-500/20">
                <span className="text-2xl font-bold text-red-400">1</span>
              </div>
              <p className="mt-4 text-base font-medium text-slate-100">
                Are you underinsured?
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Find out if your property coverage matches actual rebuild costs
              </p>
            </div>
            <div className="rounded-xl border border-amber-900/40 bg-gradient-to-br from-amber-950/20 to-slate-950 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20">
                <span className="text-2xl font-bold text-amber-400">2</span>
              </div>
              <p className="mt-4 text-base font-medium text-slate-100">
                Would your insurance run out before you recover?
              </p>
              <p className="mt-2 text-sm text-slate-400">
                See if BI coverage lasts long enough for full recovery
              </p>
            </div>
            <div className="rounded-xl border border-red-900/40 bg-gradient-to-br from-red-950/20 to-slate-950 p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 ring-1 ring-red-500/20">
                <span className="text-2xl font-bold text-red-400">3</span>
              </div>
              <p className="mt-4 text-base font-medium text-slate-100">
                Are there hidden exclusions or coverage gaps?
              </p>
              <p className="mt-2 text-sm text-slate-400">
                Identify policy language that limits critical claims
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Analyze Your Hotel Insurance in Minutes
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-hrip-gold text-slate-950 font-bold text-lg">
                  1
                </div>
                <div>
                  <p className="text-base font-medium text-slate-100">
                    Enter basic hotel information
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Property value, revenue, location, and key details
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-hrip-gold text-slate-950 font-bold text-lg">
                  2
                </div>
                <div>
                  <p className="text-base font-medium text-slate-100">
                    Upload your insurance policy
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    We analyze coverage limits, exclusions, and terms
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-hrip-gold text-slate-950 font-bold text-lg">
                  3
                </div>
                <div>
                  <p className="text-base font-medium text-slate-100">
                    Receive your survivability analysis
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Clear report showing gaps, exposure, and risk
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="mt-8 text-sm text-slate-300">
            No onboarding call. No complicated setup. Just a guided analysis of whether your coverage actually protects your business.
          </p>
        </section>

        {/* Sample Output */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            What You&apos;ll See
          </h2>
          <div className="mt-8 max-w-3xl">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-8 shadow-xl shadow-black/40">
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-800">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                    Insurance Survivability Report
                  </p>
                  <p className="mt-1 text-sm text-slate-500">Boutique Hotel - 85 Rooms</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Overall Score</p>
                  <p className="text-4xl font-bold text-red-400">47<span className="text-xl text-slate-500">/100</span></p>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
                  <p className="text-xs text-red-300 font-medium">Property Underinsured</p>
                  <p className="mt-2 text-2xl font-bold text-red-400">$3.4M</p>
                  <p className="mt-1 text-xs text-slate-400">Policy limit below rebuild cost</p>
                </div>
                <div className="rounded-lg border border-amber-900/40 bg-amber-950/20 p-4">
                  <p className="text-xs text-amber-300 font-medium">BI Coverage Duration</p>
                  <p className="mt-2 text-2xl font-bold text-amber-400">5 Months</p>
                  <p className="mt-1 text-xs text-slate-400">May not cover full recovery</p>
                </div>
                <div className="rounded-lg border border-slate-800 bg-slate-900/60 p-4">
                  <p className="text-xs text-slate-400">Estimated Recovery Time</p>
                  <p className="mt-2 text-2xl font-bold text-slate-200">14 Months</p>
                  <p className="mt-1 text-xs text-slate-400">Based on similar losses</p>
                </div>
                <div className="rounded-lg border border-red-900/40 bg-red-950/20 p-4">
                  <p className="text-xs text-red-300 font-medium">Potential Exposure</p>
                  <p className="mt-2 text-2xl font-bold text-red-400">$9.1M</p>
                  <p className="mt-1 text-xs text-slate-400">Total uncovered risk</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost vs Risk */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            The Cost of the Tool vs The Risk
          </h2>
          <div className="mt-8 max-w-2xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-xl border border-hrip-gold/40 bg-gradient-to-br from-hrip-gold/5 to-slate-950 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hrip-gold/90">
                  Hotel Risk Pro
                </p>
                <p className="mt-3 text-3xl font-bold text-hrip-gold">$199<span className="text-lg text-slate-400">/month</span></p>
                <p className="mt-2 text-xs text-slate-400">Complete insurance analysis</p>
              </div>
              <div className="rounded-xl border border-red-900/40 bg-gradient-to-br from-red-950/20 to-slate-950 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                  Potential Uncovered Loss
                </p>
                <p className="mt-3 text-3xl font-bold text-red-400">$5M–$20M+</p>
                <p className="mt-2 text-xs text-slate-400">If disaster strikes with gaps</p>
              </div>
            </div>
            <p className="mt-6 text-sm text-slate-300">
              The goal is simple: identify and correct insurance weaknesses before disaster occurs.
            </p>
          </div>
        </section>

        {/* Who It's For */}
        <section className="mt-20">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
            Built For Hotel Owners With Real Exposure
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-5">
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 text-center">
              <p className="text-sm font-medium text-slate-100">Independent Hotel Owners</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 text-center">
              <p className="text-sm font-medium text-slate-100">Boutique Hotels</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 text-center">
              <p className="text-sm font-medium text-slate-100">Regional Hotel Groups</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 text-center">
              <p className="text-sm font-medium text-slate-100">Hospitality Investors</p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4 text-center">
              <p className="text-sm font-medium text-slate-100">Management Groups</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-20 mb-12 border-t border-slate-800/80 pt-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-100">
              Find Out Whether Your Hotel Insurance Actually Protects Your Business
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Get a clear survivability analysis in minutes. No complicated setup. No enterprise onboarding.
            </p>
            <div className="mt-8">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center rounded-md bg-hrip-gold px-8 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
              >
                Analyze My Coverage
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Hotel Risk Pro. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-slate-600">Insurance survivability check for hotel owners.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
