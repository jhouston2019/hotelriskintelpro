import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-hrip-navy via-hrip-charcoal to-black">
      <header className="border-b border-slate-800/60 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
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
              <p className="text-[11px] text-slate-400">Secure access</p>
            </div>
          </Link>
          <Link
            href="/pricing"
            className="text-xs font-medium text-slate-300 hover:text-white"
          >
            View pricing
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/80 p-6 shadow-xl shadow-black/40">
          <h1 className="text-lg font-semibold tracking-tight text-slate-50">
            Sign in to your account
          </h1>
          <p className="mt-1 text-xs text-slate-400">
            Access the Hotel Risk Intel Pro dashboard for your portfolio.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-slate-200"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 shadow-sm focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                placeholder="you@hotelgroup.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-slate-200"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 shadow-sm focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-hrip-gold px-3 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-[11px] text-slate-500">
            This is a demo prototype. Authentication is simulated and will
            redirect directly to the dashboard.
          </p>
        </div>
      </main>
    </div>
  );
}


