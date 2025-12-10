import Link from "next/link";

const riskFeed = [
  {
    timestamp: "2025-12-10 08:12",
    property: "Gulfview Resort – Tower A",
    type: "Flash flood risk",
    severity: "Critical",
    description: "Flash flood watch within 5km; parking structure and lower levels at risk.",
  },
  {
    timestamp: "2025-12-10 08:05",
    property: "Harborfront Suites",
    type: "Power outage likelihood",
    severity: "High",
    description: "Grid instability and prior event history indicate 35% outage risk.",
  },
  {
    timestamp: "2025-12-10 07:58",
    property: "Alpine Lodge & Spa",
    type: "Pipe freeze warning",
    severity: "Critical",
    description: "Sub-freezing temps and low flow detected on north wing risers.",
  },
  {
    timestamp: "2025-12-10 07:41",
    property: "Midtown Conference Hotel",
    type: "Lightning proximity",
    severity: "High",
    description: "Frequent cloud-to-ground strikes detected within 3km radius.",
  },
  {
    timestamp: "2025-12-10 07:33",
    property: "City Center Hotel – West",
    type: "HVAC failure signal",
    severity: "High",
    description:
      "Chiller load and vibration anomalies indicate likely compressor fault in tower B.",
  },
  {
    timestamp: "2025-12-10 07:20",
    property: "Airport Business Hotel",
    type: "Security incident",
    severity: "Medium",
    description:
      "Spike in access control alerts at service entrances over last 2 hours.",
  },
  {
    timestamp: "2025-12-10 07:02",
    property: "Metro Grand Hotel",
    type: "Water intrusion",
    severity: "Medium",
    description:
      "Roof drainage load and historical leaks indicate risk at ballroom foyer.",
  },
  {
    timestamp: "2025-12-10 06:51",
    property: "Riverside Convention Hotel",
    type: "Elevator service alert",
    severity: "Medium",
    description:
      "Repeat door faults logged on service elevator; risk of short-term outage.",
  },
  {
    timestamp: "2025-12-10 06:37",
    property: "Lakeside Conference Center",
    type: "Winter storm advisory",
    severity: "High",
    description:
      "Heavy snow and ice expected during check-in window; transport and staffing impact.",
  },
  {
    timestamp: "2025-12-10 06:15",
    property: "Seaside Villas",
    type: "Wind gust threshold reached",
    severity: "High",
    description:
      "Sustained gusts above outdoor operations threshold; pool and F&B areas impacted.",
  },
  {
    timestamp: "2025-12-10 05:59",
    property: "Downtown Boutique – East",
    type: "Fire panel trouble",
    severity: "Medium",
    description:
      "Intermittent sensor faults on level 7; manual verification recommended.",
  },
  {
    timestamp: "2025-12-10 05:42",
    property: "Harborfront Suites – North Tower",
    type: "Storm surge risk",
    severity: "Critical",
    description:
      "Tidal surge and rainfall forecasts put loading docks at flood threshold.",
  },
];

const properties = [
  { name: "Gulfview Resort – Tower A", index: 82 },
  { name: "Midtown Conference Hotel", index: 74 },
  { name: "Harborfront Suites", index: 68 },
  { name: "Alpine Lodge & Spa", index: 91 },
  { name: "City Center Hotel – West", index: 39 },
  { name: "Lakeside Conference Center", index: 55 },
];

function riskBadge(index) {
  if (index >= 70) {
    return {
      label: "High Risk",
      className: "bg-red-500/10 text-red-300 border-red-500/40",
    };
  }
  if (index >= 40) {
    return {
      label: "Elevated",
      className: "bg-yellow-500/10 text-yellow-200 border-yellow-500/40",
    };
  }
  return {
    label: "Stable",
    className: "bg-emerald-500/10 text-emerald-200 border-emerald-500/40",
  };
}

export default function Dashboard() {
  const activeAlerts = riskFeed.length;
  const highRiskProperties = properties.filter((p) => p.index >= 70).length;
  const weatherThreats = riskFeed.filter((item) =>
    [
      "Flash flood risk",
      "Lightning proximity",
      "Winter storm advisory",
      "Wind gust threshold reached",
      "Storm surge risk",
      "Water intrusion",
    ].includes(item.type)
  ).length;

  return (
    <div className="min-h-screen flex bg-hrip-charcoal text-slate-100">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-col border-r border-slate-800 bg-slate-950/90 pt-5 md:flex">
        <div className="flex items-center gap-2 px-5 pb-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-hrip-gold/10 ring-1 ring-hrip-gold/40">
            <span className="text-sm font-semibold tracking-tight text-hrip-gold">
              HR
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-100">
              Hotel Risk Intel Pro
            </p>
            <p className="text-[11px] text-slate-500">Portfolio Command</p>
          </div>
        </div>
        <nav className="mt-2 flex-1 text-sm">
          <div className="px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
            Main
          </div>
          <ul className="mt-1 space-y-0.5 px-2">
            <li>
              <div className="flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-slate-50">
                <span className="h-1.5 w-1.5 rounded-full bg-hrip-gold" />
                <span className="text-xs font-medium">Dashboard</span>
              </div>
            </li>
            <li>
              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-900/70">
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                Risk Feed
              </button>
            </li>
            <li>
              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-900/70">
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                Properties
              </button>
            </li>
            <li>
              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-900/70">
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                Alerts
              </button>
            </li>
          </ul>
          <div className="mt-4 px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
            Admin
          </div>
          <ul className="mt-1 space-y-0.5 px-2">
            <li>
              <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-xs text-slate-300 hover:bg-slate-900/70">
                <span className="h-1 w-1 rounded-full bg-slate-600" />
                Settings
              </button>
            </li>
          </ul>
        </nav>
        <div className="border-t border-slate-800 px-4 py-3 text-[11px] text-slate-500">
          <p className="flex items-center justify-between">
            <span>Daily Digest</span>
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
              Enabled
            </span>
          </p>
          <p className="mt-1">
            Lead intelligence signals are available for internal preview only.
          </p>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex min-h-screen flex-1 flex-col">
        {/* Top bar */}
        <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
            <div>
              <p className="text-xs font-medium text-slate-400">
                Executive Portfolio View
              </p>
              <h1 className="text-base font-semibold tracking-tight text-slate-50 md:text-lg">
                Hotel Risk Intel Pro Dashboard
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/pricing"
                className="hidden text-xs text-slate-300 hover:text-white md:inline"
              >
                Pricing
              </Link>
              <div className="flex items-center gap-3">
                <div className="text-right text-[11px]">
                  <p className="font-medium text-slate-100">Portfolio Ops</p>
                  <p className="text-slate-500">Demo account</p>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-hrip-gold to-amber-500 text-xs font-semibold text-slate-950">
                  PR
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-4 py-6 md:px-6">
          {/* Summary row */}
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[11px] font-medium text-slate-400">
                Active Alerts (24h)
              </p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-2xl font-semibold text-slate-50">
                  {activeAlerts}
                </p>
                <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-300">
                  High signal density
                </span>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Combined weather, infrastructure, and operational alerts across
                your estate.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[11px] font-medium text-slate-400">
                High-Risk Properties
              </p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-2xl font-semibold text-slate-50">
                  {highRiskProperties}
                </p>
                <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                  Prioritize site calls
                </span>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Properties with a Risk Index of 80 or higher in the last 24
                hours.
              </p>
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
              <p className="text-[11px] font-medium text-slate-400">
                Weather Threats Today
              </p>
              <div className="mt-1 flex items-end justify-between">
                <p className="text-2xl font-semibold text-slate-50">
                  {weatherThreats}
                </p>
                <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-[10px] font-semibold text-sky-200">
                  Weather-driven
                </span>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">
                Alerts directly driven by severe weather, storms, temperature
                extremes, or flooding.
              </p>
            </div>
          </section>

          {/* Main content grid */}
          <section className="grid flex-1 gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            {/* Real-Time Risk Feed */}
            <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/80">
              <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
                <div>
                  <p className="text-xs font-semibold text-slate-100">
                    Real-Time Risk Feed
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Live incidents, ordered by operational impact.
                  </p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Streaming
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-t border-slate-800 text-xs">
                  <thead className="bg-slate-950">
                    <tr className="text-[11px] text-slate-400">
                      <th className="px-3 py-2 text-left font-medium">Timestamp</th>
                      <th className="px-3 py-2 text-left font-medium">
                        Property
                      </th>
                      <th className="px-3 py-2 text-left font-medium">
                        Risk Type
                      </th>
                      <th className="px-3 py-2 text-left font-medium">
                        Severity
                      </th>
                      <th className="px-3 py-2 text-left font-medium">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {riskFeed.map((item, index) => (
                      <tr
                        key={`${item.timestamp}-${index}`}
                        className="hover:bg-slate-900/60"
                      >
                        <td className="px-3 py-2 align-top text-[11px] text-slate-400 whitespace-nowrap">
                          {item.timestamp}
                        </td>
                        <td className="px-3 py-2 align-top text-[11px] text-slate-100 whitespace-nowrap">
                          {item.property}
                        </td>
                        <td className="px-3 py-2 align-top text-[11px] text-slate-200 whitespace-nowrap">
                          {item.type}
                        </td>
                        <td className="px-3 py-2 align-top text-[11px] whitespace-nowrap">
                          <span
                            className={
                              item.severity === "Critical"
                                ? "rounded-full bg-red-600/15 px-2 py-0.5 text-[10px] font-semibold text-red-300"
                                : item.severity === "High"
                                ? "rounded-full bg-red-500/10 px-2 py-0.5 text-[10px] font-semibold text-red-200"
                                : item.severity === "Medium"
                                ? "rounded-full bg-yellow-500/10 px-2 py-0.5 text-[10px] font-semibold text-yellow-200"
                                : "rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-200"
                            }
                          >
                            {item.severity}
                          </span>
                        </td>
                        <td className="px-3 py-2 align-top text-[11px] text-slate-300">
                          {item.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right column: Properties + Summary */}
            <div className="flex flex-col gap-4">
              {/* Property Portfolio Risk Overview */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-slate-100">
                      Property Portfolio Risk Overview
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Six sample assets ranked by today&apos;s Risk Index.
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-900 px-2 py-0.5 text-[10px] text-slate-400">
                    Internal demo
                  </span>
                </div>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {properties.map((property) => {
                    const badge = riskBadge(property.index);
                    return (
                      <div
                        key={property.name}
                        className="rounded-lg border border-slate-800 bg-slate-950/80 p-3"
                      >
                        <p className="text-xs font-medium text-slate-50">
                          {property.name}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div>
                            <p className="text-[11px] text-slate-400">
                              Risk Index
                            </p>
                            <p className="text-xl font-semibold text-slate-50">
                              {property.index}
                            </p>
                          </div>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] font-medium ${badge.className}`}
                          >
                            {badge.label}
                          </span>
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-slate-800">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-red-500"
                            style={{ width: `${property.index}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Today’s Risk Summary */}
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-xs font-semibold text-slate-100">
                  Today&apos;s Risk Summary
                </p>
                <p className="mt-1 text-[11px] text-slate-500">
                  At-a-glance view of where to focus across alerts, properties,
                  and weather.
                </p>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-800 bg-slate-950/90 p-3">
                    <p className="text-[11px] text-slate-400">Active Alerts</p>
                    <p className="mt-1 text-xl font-semibold text-slate-50">
                      {activeAlerts}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Generated from live feeds and historical risk baselines.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/90 p-3">
                    <p className="text-[11px] text-slate-400">
                      High-Risk Properties
                    </p>
                    <p className="mt-1 text-xl font-semibold text-slate-50">
                      {highRiskProperties}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Recommended for GM outreach and contingency planning.
                    </p>
                  </div>
                  <div className="rounded-lg border border-slate-800 bg-slate-950/90 p-3">
                    <p className="text-[11px] text-slate-400">
                      Weather Threats
                    </p>
                    <p className="mt-1 text-xl font-semibold text-slate-50">
                      {weatherThreats}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-500">
                      Weather-driven signals impacting today&apos;s operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}


