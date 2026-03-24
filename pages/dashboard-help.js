import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";
import { GLOSSARY_ENTRIES, GLOSSARY_GROUPS, DASHBOARD_HELP_INTRO } from "../lib/dashboard-glossary";

export default function DashboardHelpPage() {
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard help &amp; glossary | Hotel Risk Pro</title>
        <meta name="description" content="Definitions and how-to for every Hotel Risk Pro dashboard term." />
      </Head>

      <div className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 bg-slate-900">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-500/90">Hotel Risk Pro</p>
              <h1 className="text-xl font-bold text-white">Dashboard help &amp; glossary</h1>
            </div>
            <Link
              href="/dashboard"
              className="rounded-lg bg-hrip-gold px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300"
            >
              Back to dashboard
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-4xl px-4 py-8">
          <section className="mb-10 rounded-xl border border-slate-700 bg-slate-900/80 p-6">
            <h2 className="text-lg font-bold text-white">{DASHBOARD_HELP_INTRO.title}</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
              {DASHBOARD_HELP_INTRO.body.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </section>

          <nav className="mb-10 rounded-xl border border-slate-800 bg-slate-900/50 p-4" aria-label="Glossary table of contents">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Jump to section</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {GLOSSARY_GROUPS.map((g) => (
                <a
                  key={g}
                  href={`#group-${slugify(g)}`}
                  className="rounded-full border border-slate-600 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300 hover:border-amber-500/50 hover:text-amber-200"
                >
                  {g}
                </a>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Every term below has a direct link: <code className="rounded bg-slate-800 px-1 text-amber-200/90">/dashboard-help#term-id</code>
            </p>
          </nav>

          {GLOSSARY_GROUPS.map((group) => {
            const items = GLOSSARY_ENTRIES.filter((e) => e.group === group);
            return (
              <section key={group} id={`group-${slugify(group)}`} className="mb-12 scroll-mt-24">
                <h2 className="border-b border-slate-700 pb-2 text-base font-bold uppercase tracking-wide text-amber-400/90">
                  {group}
                </h2>
                <ul className="mt-4 space-y-6">
                  {items.map((entry) => (
                    <li
                      key={entry.id}
                      id={entry.id}
                      className="scroll-mt-24 rounded-lg border border-slate-800 bg-slate-900/60 p-4"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold text-white">{entry.term}</h3>
                        <span className="font-mono text-xs text-slate-500">#{entry.id}</span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{entry.definition}</p>
                      {entry.howTo && (
                        <div className="mt-3 border-t border-slate-800 pt-3">
                          <p className="text-xs font-bold uppercase tracking-wide text-emerald-400/90">How to use it</p>
                          <p className="mt-1 text-sm text-slate-400">{entry.howTo}</p>
                        </div>
                      )}
                      <p className="mt-3 text-xs text-slate-600">
                        Direct link:{" "}
                        <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-amber-200/90">
                          /dashboard-help#{entry.id}
                        </code>
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}

          <footer className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
            <Link href="/dashboard" className="font-semibold text-amber-500 hover:text-amber-400">
              Return to dashboard
            </Link>
          </footer>
        </div>
      </div>
    </>
  );
}

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
