import dynamic from "next/dynamic";
import Link from "next/link";

const PricingPageClient = dynamic(
  () => import("../components/pricing/PricingPageClient"),
  { ssr: false }
);

const VALUE_BULLETS = [
  "Identify hidden financial risk before it becomes loss",
  "Recover underpaid or missed insurance dollars",
  "Prevent avoidable operational losses",
  "Prioritize daily actions based on real dollar impact",
];

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-black">
      <header className="border-b border-slate-800/60 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-hrip-gold/10 ring-1 ring-hrip-gold/40">
              <span className="text-xs font-semibold tracking-tight text-hrip-gold">HR</span>
            </div>
            <div>
              <p className="text-sm font-semibold tracking-tight text-slate-100">Hotel Risk Pro</p>
              <p className="text-[11px] text-slate-400">Pricing</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-xs">
            <Link href="/dashboard" className="text-slate-300 hover:text-white transition-colors">
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
        <section className="max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight text-slate-50 sm:text-3xl md:text-4xl">
            Protect and recover tens of thousands per property — for less than a single mistake
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Hotel Risk Pro identifies financial exposure, prevents avoidable losses, and surfaces recoverable dollars across your portfolio — daily.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-slate-200">
            {VALUE_BULLETS.map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-hrip-gold" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 rounded-lg border border-slate-700 bg-slate-900/50 px-4 py-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Simple rule:</span> one price per property per month — volume drops the rate automatically. No feature tiers. No per-user fees.
          </p>
        </section>

        <div className="mt-12">
          <PricingPageClient />
        </div>
      </main>
    </div>
  );
}
