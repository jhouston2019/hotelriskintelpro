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
                Hotel Risk Intel Pro
              </p>
              <p className="text-xs text-slate-400">
                AI-Powered Risk Intelligence
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
            <div className="inline-flex items-center gap-2 rounded-full border border-hrip-gold/30 bg-hrip-navy/70 px-3 py-1 text-xs text-hrip-gold/90 shadow-sm shadow-hrip-gold/10">
              <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live operational risk visibility
            </div>
            <h1 className="mt-5 text-3xl font-semibold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
              Hotel Risk Intel Pro
            </h1>
            <p className="mt-3 text-lg font-medium text-slate-200">
              AI-Powered Real-Time Hotel Risk Intelligence
            </p>
            <p className="mt-4 max-w-xl text-sm text-slate-400">
              Real-time operational, weather, and infrastructure risk signals —
              delivered instantly. Anticipate disruption, protect assets, and
              keep every stay running smoothly across your entire portfolio.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md bg-hrip-gold px-5 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
              >
                View Dashboard
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-900/40 px-5 py-2.5 text-sm font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
              >
                Request Access
              </Link>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Designed for multi-property hotel groups, REITs, and institutional
              owners who can’t afford blind spots.
            </p>
          </div>

          {/* Right hero panel */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 shadow-xl shadow-black/40">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                Portfolio Snapshot
              </p>
              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                Real-time feed
              </span>
            </div>
            <div className="mt-4 grid gap-4 text-xs text-slate-200">
              <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                <div>
                  <p className="text-[11px] text-slate-400">
                    Active alerts (last 24h)
                  </p>
                  <p className="text-base font-semibold text-slate-50">27</p>
                </div>
                <span className="rounded-md bg-red-500/10 px-2 py-1 text-[10px] font-semibold text-red-400">
                  5 Critical
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-2">
                <div>
                  <p className="text-[11px] text-slate-400">
                    High-risk properties
                  </p>
                  <p className="text-base font-semibold text-slate-50">8</p>
                </div>
                <span className="rounded-md bg-amber-500/10 px-2 py-1 text-[10px] font-semibold text-amber-300">
                  Focus watchlist
                </span>
              </div>
              <div className="rounded-lg border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-3 py-3">
                <p className="text-[11px] font-medium text-slate-300">
                  Live risk signals
                </p>
                <ul className="mt-2 space-y-1.5 text-[11px] text-slate-400">
                  <li className="flex items-center justify-between">
                    <span>Flash flood watch — Gulf Coast</span>
                    <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] text-red-300">
                      Severe
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>HVAC failure anomaly — Midtown Tower</span>
                    <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-200">
                      High
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Security incident trend — Downtown West</span>
                    <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] text-sky-200">
                      Monitoring
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mt-16">
          <h2 className="text-base font-semibold tracking-tight text-slate-100">
            How It Works
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Hotel Risk Intel Pro continuously fuses weather, infrastructure, and
            on-the-ground operational signals into one live, prioritized feed —
            so your teams see the next disruption before guests ever feel it.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hrip-gold/90">
                Weather Alerts
              </p>
              <p className="mt-3 text-sm font-medium text-slate-100">
                Hyperlocal weather and climate risk
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Lightning, flash floods, heat waves, winter storms and more —
                tuned to each property&apos;s footprint with severity scoring
                built for operations.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hrip-gold/90">
                Infrastructure Signals
              </p>
              <p className="mt-3 text-sm font-medium text-slate-100">
                Power, water, and systems health
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Outage probabilities, pipe freeze risk, HVAC stress, and other
                infrastructure anomalies that threaten guest experience and
                asset value.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-hrip-gold/90">
                Operational Risk Index
              </p>
              <p className="mt-3 text-sm font-medium text-slate-100">
                One score per property, per day
              </p>
              <p className="mt-2 text-xs text-slate-400">
                A single, explainable risk index that rolls up incidents,
                signals, and trends — so executives can see which assets need
                attention first.
              </p>
            </div>
          </div>
        </section>

        {/* Who Uses This */}
        <section className="mt-16 mb-12 border-t border-slate-800/80 pt-10">
          <h2 className="text-base font-semibold tracking-tight text-slate-100">
            Who Uses This
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Built for cross-functional hotel portfolios where operations,
            finance, and risk can&apos;t afford to act on stale information.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <p className="text-sm font-medium text-slate-100">
                Hotel Owners &amp; REITs
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Asset-level risk visibility for capital protection, insurance
                conversations, and board-ready reporting.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <p className="text-sm font-medium text-slate-100">
                Portfolio &amp; Asset Managers
              </p>
              <p className="mt-2 text-xs text-slate-400">
                Rank properties by risk, prioritize capex, and coordinate with
                GMs before issues turn into revenue-impacting events.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-4">
              <p className="text-sm font-medium text-slate-100">Risk Teams</p>
              <p className="mt-2 text-xs text-slate-400">
                Central risk, safety, and security teams who need a single pane
                of glass across severe weather, infrastructure, and incidents.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-4 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} Hotel Risk Intel Pro. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-slate-600">Real-time hotel risk intelligence.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


