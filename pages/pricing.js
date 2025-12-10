import Link from "next/link";

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-hrip-navy via-hrip-charcoal to-black">
      <header className="border-b border-slate-800/60 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hrip-gold/10 ring-1 ring-hrip-gold/40">
              <span className="text-xs font-semibold tracking-tight text-hrip-gold">
                HR
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-100">
                Hotel Risk Intel Pro
              </p>
              <p className="text-[11px] text-slate-400">Pricing</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-xs">
            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Dashboard
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

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10">
        <section>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
            Pricing built for serious hotel portfolios
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-400">
            Start with alerts and a daily digest, then graduate to full
            portfolio command and enterprise integrations as your program
            matures.
          </p>
        </section>

        <section className="mt-8 grid gap-6 md:grid-cols-3">
          {/* Tier 1 */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Tier 1
            </p>
            <h2 className="mt-2 text-sm font-semibold text-slate-50">
              Alerts + Daily Digest
            </h2>
            <p className="mt-3 text-3xl font-semibold text-slate-50">
              $499
              <span className="text-sm font-normal text-slate-400">/mo</span>
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Ideal for single brands or early-stage portfolio risk programs.
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-300">
              <li>• Real-time risk alerts for key properties</li>
              <li>• Daily email risk digest</li>
              <li>• Weather and infrastructure signal coverage</li>
              <li>• Basic portfolio summary view</li>
            </ul>
            <button className="mt-5 inline-flex items-center justify-center rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-medium text-slate-100 hover:border-slate-500 hover:bg-slate-900 transition">
              Talk to sales
            </button>
          </div>

          {/* Tier 2 */}
          <div className="relative flex flex-col rounded-2xl border border-hrip-gold/60 bg-slate-950/90 p-5 shadow-lg shadow-amber-500/30">
            <div className="absolute -top-3 right-4 rounded-full bg-hrip-gold px-2 py-0.5 text-[10px] font-semibold text-slate-950">
              Most popular
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-hrip-gold">
              Tier 2
            </p>
            <h2 className="mt-2 text-sm font-semibold text-slate-50">
              Portfolio Dashboard
            </h2>
            <p className="mt-3 text-3xl font-semibold text-slate-50">
              $1,500
              <span className="text-sm font-normal text-slate-400">/mo</span>
            </p>
            <p className="mt-2 text-xs text-slate-300">
              For multi-property owners, REITs, and asset managers who need a
              single pane of glass.
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-200">
              <li>• Full portfolio dashboard with property rankings</li>
              <li>• Real-time operational, weather, and infrastructure signals</li>
              <li>• Configurable alerting and daily digest</li>
              <li>• Exportable reports for leadership and boards</li>
            </ul>
            <button className="mt-5 inline-flex items-center justify-center rounded-md bg-hrip-gold px-3 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-300 transition">
              Request access
            </button>
          </div>

          {/* Tier 3 */}
          <div className="flex flex-col rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              Tier 3
            </p>
            <h2 className="mt-2 text-sm font-semibold text-slate-50">
              Enterprise Platform
            </h2>
            <p className="mt-3 text-3xl font-semibold text-slate-50">
              $5,000+
              <span className="text-sm font-normal text-slate-400">/mo</span>
            </p>
            <p className="mt-2 text-xs text-slate-400">
              For enterprise hotel groups that require deep integrations,
              automation, and governance controls.
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-xs text-slate-300">
              <li>• All Tier 2 capabilities</li>
              <li>• API access for risk data and signals</li>
              <li>• Integrations with internal systems and data warehouses</li>
              <li>• Automated reporting &amp; lead intelligence (internal only)</li>
              <li>• Enterprise support and implementation</li>
            </ul>
            <button className="mt-5 inline-flex items-center justify-center rounded-md border border-hrip-gold/70 bg-slate-950 px-3 py-2 text-xs font-semibold text-hrip-gold hover:bg-slate-900 hover:border-hrip-gold transition">
              Contact enterprise
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}


