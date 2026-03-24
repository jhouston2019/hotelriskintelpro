import Link from "next/link";
import { useState, useEffect } from "react";

// ─── Demo dataset ────────────────────────────────────────────────────────────

const DEMO_DATA = {
  hotelProfile: {
    hotelName: "Riverside Boutique Inn",
    address: "412 Harbor View Drive",
    city: "Savannah",
    state: "GA",
    zip: "31401",
    numberOfRooms: "87",
    squareFootage: "68400",
    yearBuilt: "1992",
    yearRenovated: "2017",
    numberOfFloors: "6",
    constructionType: "masonry",
    roofType: "flat",
    roofAge: "9",
    sprinklerSystem: "yes",
    fireAlarmSystem: "yes",
    poolSpa: "yes",
    restaurantBar: "yes",
    eventSpace: "yes",
    parkingStructure: "no",
  },
  financialExposure: {
    annualRevenue: "4850000",
    roomRevenuePercent: "68",
    fbRevenuePercent: "18",
    eventRevenuePercent: "10",
    otherRevenuePercent: "4",
    averageOccupancy: "72",
    adr: "189",
    revpar: "136",
    fixedMonthlyCosts: "148000",
    monthlyPayroll: "112000",
    monthlyDebtService: "54000",
    emergencyCashReserves: "320000",
  },
  insurancePolicy: {
    carrier: "Zurich North America",
    policyPeriodStart: "2024-07-01",
    policyPeriodEnd: "2025-07-01",
    propertyCoverageLimit: "8500000",
    biLimit: "2400000",
    extraExpenseLimit: "250000",
    liabilityLimit: "1000000",
    umbrellaLimit: "5000000",
    deductible: "25000",
    biWaitingPeriod: "72",
    biRestorationPeriod: "12",
    coinsurancePercent: "80",
    ordinanceLawCoverage: "yes",
    equipmentBreakdown: "yes",
    floodCoverage: "no",
    windCoverage: "yes",
    sewerBackup: "no",
  },
  lossHistory: {
    claims: [
      {
        id: 1,
        year: "2022",
        date: "2022-08-14",
        type: "property",
        cause: "Water damage — roof membrane failure",
        amountPaid: "87400",
        reserveAmount: "0",
        status: "closed",
        areaAffected: "Top floor guest rooms (604–612)",
        notes: "Flat roof membrane cracked after heavy rainfall. 9 rooms out of service for 6 weeks.",
      },
      {
        id: 2,
        year: "2021",
        date: "2021-03-02",
        type: "liability",
        cause: "Slip and fall — pool deck",
        amountPaid: "42000",
        reserveAmount: "0",
        status: "closed",
        areaAffected: "Pool area",
        notes: "Guest sustained minor injuries. Settled out of court.",
      },
      {
        id: 3,
        year: "2023",
        date: "2023-11-18",
        type: "property",
        cause: "HVAC unit failure — water intrusion",
        amountPaid: "31500",
        reserveAmount: "5000",
        status: "closed",
        areaAffected: "3rd floor corridor and 4 rooms",
        notes: "Condensate drain line blockage caused ceiling damage.",
      },
    ],
  },
  operationalRisk: {
    roofLeaks: "yes",
    hvacIssues: "yes",
    plumbingIssues: "no",
    electricalIssues: "no",
    moldMoistureHistory: "yes",
    deferredMaintenance: "yes",
    inspectionDeficiencies: "no",
  },
  locationHazard: {
    floodZone: "ae",
    coastalWindExposure: "moderate",
    wildfireExposure: "none",
    freezeExposure: "low",
    stormHailExposure: "moderate",
    crimeLevel: "low",
    utilityInterruption: "low",
    contractorScarcity: "moderate",
    litigationEnvironment: "moderate",
  },
};

// ─── Helpers ────────────────────────────────────────────────────────────────

function fmt$( val ) {
  const n = parseFloat(val);
  if (!val || isNaN(n)) return "—";
  return "$" + n.toLocaleString();
}

function fmtPct(val) {
  if (!val && val !== 0) return "—";
  return `${val}%`;
}

function fmtNum(val) {
  if (!val && val !== 0) return "—";
  const n = parseFloat(val);
  return isNaN(n) ? String(val) : n.toLocaleString();
}

function fmtDate(val) {
  if (!val) return "—";
  try { return new Date(val).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }); }
  catch { return val; }
}

function capitalize(str) {
  if (!str) return "—";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Inline field display
function Field({ label, value, mono = false }) {
  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-0.5 leading-none">{label}</p>
      <p className={`text-base font-semibold text-white leading-tight ${mono ? "font-mono" : ""}`}>
        {value || "—"}
      </p>
    </div>
  );
}

// Coloured badge
function Badge({ value, type = "neutral" }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-base font-semibold";
  if (!value || value === "—") return <span className={`${base} bg-slate-700 text-slate-400`}>—</span>;

  const low = ["no", "none", "low", "x"].includes(String(value).toLowerCase());
  const high = ["yes", "high", "v", "ae", "a"].includes(String(value).toLowerCase());
  const warn = ["moderate", "partial", "unknown"].includes(String(value).toLowerCase());

  if (type === "risk") {
    if (low) return <span className={`${base} bg-green-100 text-green-700`}>{capitalize(value)}</span>;
    if (high) return <span className={`${base} bg-red-100 text-red-700`}>{capitalize(value)}</span>;
    if (warn) return <span className={`${base} bg-amber-100 text-amber-700`}>{capitalize(value)}</span>;
    return <span className={`${base} bg-slate-700 text-slate-200`}>{capitalize(value)}</span>;
  }

  if (type === "bool") {
    const isYes = String(value).toLowerCase() === "yes";
    return <span className={`${base} ${isYes ? "bg-blue-100 text-blue-700" : "bg-slate-700 text-slate-400"}`}>{capitalize(value)}</span>;
  }

  return <span className={`${base} bg-slate-700 text-slate-200`}>{capitalize(value)}</span>;
}

// Section card wrapper
function SectionCard({ icon, title, color, children, compact }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 shadow-none overflow-hidden">
      <div className={`flex items-center justify-between px-3 py-2.5 border-b border-slate-700 ${color}`}>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-800/20 [&_svg]:w-3.5 [&_svg]:h-3.5">
            {icon}
          </div>
          <h3 className="text-base font-bold text-white uppercase tracking-wide">{title}</h3>
        </div>
        <Link
          href="/intake"
          className="rounded bg-slate-800/20 px-2 py-1 text-sm font-semibold text-white hover:bg-slate-800/30 transition-colors"
        >
          Edit
        </Link>
      </div>
      <div className={compact ? "p-3" : "p-6"}>{children}</div>
    </div>
  );
}

// ─── Section components ──────────────────────────────────────────────────────

function HotelProfileSection({ data }) {
  if (!data) return <p className="text-base text-slate-400">No data entered yet.</p>;
  const p = data;
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-3 gap-2">
        <Field label="Hotel Name" value={p.hotelName} />
        <Field label="Rooms" value={fmtNum(p.numberOfRooms)} />
        <Field label="Floors" value={fmtNum(p.numberOfFloors)} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <Field label="Address" value={[p.address, p.city, p.state, p.zip].filter(Boolean).join(", ") || "—"} />
        <div className="grid grid-cols-2 gap-2">
          <Field label="Built" value={p.yearBuilt || "—"} />
          <Field label="Renovated" value={p.yearRenovated || "—"} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <Field label="Sq. Ft." value={fmtNum(p.squareFootage)} />
        <Field label="Construction" value={capitalize(p.constructionType)} />
        <Field label="Roof" value={`${capitalize(p.roofType)}${p.roofAge ? ` · ${p.roofAge}yr` : ""}`} />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-1">Sprinklers</p>
          <Badge value={p.sprinklerSystem} type="risk" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-1">Fire Alarm</p>
          <Badge value={p.fireAlarmSystem} type="risk" />
        </div>
      </div>
      <div className="border-t border-slate-700 pt-2">
        <div className="flex flex-wrap gap-1">
          {[
            { key: "poolSpa", label: "Pool/Spa" },
            { key: "restaurantBar", label: "Restaurant" },
            { key: "eventSpace", label: "Events" },
            { key: "parkingStructure", label: "Parking" },
          ].map(({ key, label }) => (
            <span key={key} className={`rounded-full px-2 py-0.5 text-sm font-semibold ${
              p[key] === "yes" ? "bg-blue-100 text-blue-700" : "bg-slate-700 text-slate-400 line-through"
            }`}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinancialSection({ data }) {
  if (!data) return <p className="text-base text-slate-400">No data entered yet.</p>;
  const f = data;
  const monthlyRev = f.annualRevenue ? Math.round(parseFloat(f.annualRevenue) / 12) : null;
  const totalObligations =
    (parseFloat(f.fixedMonthlyCosts) || 0) +
    (parseFloat(f.monthlyPayroll) || 0) +
    (parseFloat(f.monthlyDebtService) || 0);

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-3 gap-2">
        <div className="col-span-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-0.5">Annual Revenue</p>
          <p className="text-lg font-bold text-white">{fmt$(f.annualRevenue)}</p>
          {monthlyRev && <p className="text-sm text-slate-400">≈ {fmt$(monthlyRev)}/mo</p>}
        </div>
        <Field label="Occupancy" value={fmtPct(f.averageOccupancy)} />
        <Field label="ADR" value={fmt$(f.adr)} />
      </div>
      <div className="border-t border-slate-700 pt-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Revenue Mix</p>
        <div className="grid grid-cols-4 gap-1.5">
          <Field label="Rooms" value={fmtPct(f.roomRevenuePercent)} />
          <Field label="F&B" value={fmtPct(f.fbRevenuePercent)} />
          <Field label="Events" value={fmtPct(f.eventRevenuePercent)} />
          <Field label="Other" value={fmtPct(f.otherRevenuePercent)} />
        </div>
      </div>
      <div className="border-t border-slate-700 pt-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Monthly Obligations</p>
        <div className="grid grid-cols-2 gap-1.5">
          <Field label="Fixed Costs" value={fmt$(f.fixedMonthlyCosts)} />
          <Field label="Payroll" value={fmt$(f.monthlyPayroll)} />
          <Field label="Debt Service" value={fmt$(f.monthlyDebtService)} />
          <Field label="Cash Reserves" value={fmt$(f.emergencyCashReserves)} />
        </div>
        {totalObligations > 0 && (
          <div className="mt-2 rounded bg-amber-900/30 border border-amber-700 px-2.5 py-1.5">
            <p className="text-base font-bold text-amber-800">Total Burn: {fmt$(totalObligations)}/mo</p>
          </div>
        )}
      </div>
    </div>
  );
}

function InsuranceSection({ data }) {
  if (!data) return <p className="text-base text-slate-400">No data entered yet.</p>;
  const ins = data;
  const coverages = [
    { key: "ordinanceLawCoverage", label: "Ordinance & Law" },
    { key: "equipmentBreakdown", label: "Equip. Breakdown" },
    { key: "floodCoverage", label: "Flood" },
    { key: "windCoverage", label: "Wind" },
    { key: "sewerBackup", label: "Sewer Backup" },
  ];

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-3 gap-2">
        <Field label="Carrier" value={ins.carrier} />
        <Field label="Start" value={fmtDate(ins.policyPeriodStart)} />
        <Field label="End" value={fmtDate(ins.policyPeriodEnd)} />
      </div>
      <div className="border-t border-slate-700 pt-2">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Coverage Limits</p>
        <div className="grid grid-cols-2 gap-1.5">
          <Field label="Property" value={fmt$(ins.propertyCoverageLimit)} />
          <Field label="Bus. Interruption" value={fmt$(ins.biLimit)} />
          <Field label="Extra Expense" value={fmt$(ins.extraExpenseLimit)} />
          <Field label="Liability" value={fmt$(ins.liabilityLimit)} />
          <Field label="Umbrella" value={fmt$(ins.umbrellaLimit)} />
          <Field label="Deductible" value={fmt$(ins.deductible)} />
        </div>
      </div>
      <div className="border-t border-slate-700 pt-2">
        <div className="grid grid-cols-3 gap-1.5">
          <Field label="BI Waiting" value={ins.biWaitingPeriod ? `${ins.biWaitingPeriod}d` : "—"} />
          <Field label="BI Period" value={ins.biRestorationPeriod ? `${ins.biRestorationPeriod}mo` : "—"} />
          <Field label="Coinsurance" value={fmtPct(ins.coinsurancePercent)} />
        </div>
      </div>
      <div className="border-t border-slate-700 pt-2">
        <div className="flex flex-wrap gap-1">
          {coverages.map(({ key, label }) => {
            const hasIt = ins[key] && ins[key] !== "no" && ins[key] !== "";
            return (
              <span key={key} className={`rounded-full px-2 py-0.5 text-sm font-semibold ${
                hasIt ? "bg-green-100 text-green-700" : "bg-slate-700 text-slate-400"
              }`}>{hasIt ? "✓ " : ""}{label}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LossHistorySection({ data }) {
  const claims = data?.claims || [];
  if (claims.length === 0) {
    return (
      <div className="rounded border border-dashed border-slate-700 px-3 py-6 text-center">
        <p className="text-base text-slate-400">No claims on record</p>
      </div>
    );
  }
  const totalPaid = claims.reduce((sum, c) => sum + (parseFloat(c.amountPaid) || 0), 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-base font-semibold text-slate-300">{claims.length} claim{claims.length !== 1 ? "s" : ""}</p>
        {totalPaid > 0 && <p className="text-base font-bold text-red-700">Total: {fmt$(totalPaid)}</p>}
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="pb-1 text-left text-sm font-semibold uppercase tracking-wide text-slate-400">Yr</th>
            <th className="pb-1 text-left text-sm font-semibold uppercase tracking-wide text-slate-400">Type</th>
            <th className="pb-1 text-right text-sm font-semibold uppercase tracking-wide text-slate-400">Paid</th>
            <th className="pb-1 text-center text-sm font-semibold uppercase tracking-wide text-slate-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((c, i) => (
            <tr key={c.id || i} className="border-b border-slate-700 last:border-0">
              <td className="py-1.5 text-base font-medium text-white">{c.year || "—"}</td>
              <td className="py-1.5 text-base text-slate-300">{capitalize(c.type)}</td>
              <td className="py-1.5 text-base text-right font-mono text-white">{fmt$(c.amountPaid)}</td>
              <td className="py-1.5 text-center">
                <span className={`rounded-full px-1.5 py-0.5 text-sm font-semibold ${
                  c.status === "closed" ? "bg-slate-700 text-slate-400" :
                  c.status === "open" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                }`}>{capitalize(c.status) || "—"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OperationalRiskSection({ data }) {
  if (!data) return <p className="text-base text-slate-400">No data entered yet.</p>;
  const items = [
    { key: "roofLeaks", label: "Roof Leaks" },
    { key: "hvacIssues", label: "HVAC" },
    { key: "plumbingIssues", label: "Plumbing" },
    { key: "electricalIssues", label: "Electrical" },
    { key: "moldMoistureHistory", label: "Mold/Moisture" },
    { key: "deferredMaintenance", label: "Deferred Maint." },
    { key: "inspectionDeficiencies", label: "Inspection" },
  ];
  const issueCount = items.filter(({ key }) => data[key] === "yes").length;

  return (
    <div className="space-y-2">
      <div className={`rounded px-2.5 py-1.5 text-base font-semibold ${
        issueCount > 0 ? "bg-red-900/30 border border-red-700 text-red-700" : "bg-green-900/30 border border-green-700 text-green-700"
      }`}>
        {issueCount > 0 ? `${issueCount} issue${issueCount !== 1 ? "s" : ""} flagged` : "All systems clear"}
      </div>
      <div className="space-y-1">
        {items.map(({ key, label }) => {
          const hasIssue = data[key] === "yes";
          const clear = data[key] === "no";
          return (
            <div key={key} className={`flex items-center justify-between rounded px-2.5 py-1.5 ${
              hasIssue ? "bg-red-900/30 border border-red-800" :
              clear ? "bg-green-900/30 border border-green-800" : "bg-slate-900 border border-slate-700"
            }`}>
              <span className="text-base text-slate-200">{label}</span>
              <span className={`text-sm font-bold ${hasIssue ? "text-red-600" : clear ? "text-green-600" : "text-slate-400"}`}>
                {hasIssue ? "ISSUE" : clear ? "CLEAR" : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LocationSection({ data }) {
  if (!data) return <p className="text-base text-slate-400">No data entered yet.</p>;
  const loc = data;

  const all = [
    { key: "floodZone", label: "Flood Zone", format: (v) => v?.toUpperCase() },
    { key: "coastalWindExposure", label: "Coastal Wind" },
    { key: "wildfireExposure", label: "Wildfire" },
    { key: "freezeExposure", label: "Freeze" },
    { key: "stormHailExposure", label: "Storm/Hail" },
    { key: "crimeLevel", label: "Crime" },
    { key: "utilityInterruption", label: "Utility Risk" },
    { key: "contractorScarcity", label: "Contractors" },
    { key: "litigationEnvironment", label: "Litigation" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {all.map(({ key, label, format }) => {
        const raw = loc[key];
        const display = format ? format(raw) : capitalize(raw);
        return (
          <div key={key}>
            <p className="text-sm text-slate-400 mb-0.5">{label}</p>
            <Badge value={display || raw} type="risk" />
          </div>
        );
      })}
    </div>
  );
}

// ─── Completeness bar ────────────────────────────────────────────────────────

function CompletenessBar({ data }) {
  const sections = [
    { key: "hotelProfile", label: "Hotel Profile", check: (d) => !!d?.hotelName },
    { key: "financialExposure", label: "Financials", check: (d) => !!d?.annualRevenue },
    { key: "insurancePolicy", label: "Insurance", check: (d) => !!d?.propertyCoverageLimit },
    { key: "lossHistory", label: "Loss History", check: (d) => d !== null && d !== undefined },
    { key: "operationalRisk", label: "Operations", check: (d) => !!d?.roofLeaks },
    { key: "locationHazard", label: "Location", check: (d) => !!d?.floodZone },
  ];

  const done = sections.filter(({ key, check }) => data && check(data[key])).length;
  const pct = Math.round((done / sections.length) * 100);

  return (
    <div className="rounded-2xl border-2 border-slate-700 bg-slate-800 p-5 shadow-none">
      <div className="flex items-center justify-between mb-3">
        <p className="text-lg font-bold text-white">Data Completeness</p>
        <span className={`text-lg font-bold ${pct === 100 ? "text-green-600" : "text-white"}`}>
          {done} / {sections.length} sections &mdash; {pct}%
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-700 overflow-hidden">
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${pct === 100 ? "bg-green-500" : "bg-gradient-to-r from-hrip-navy to-hrip-blue"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {sections.map(({ key, label, check }) => {
          const complete = data && check(data[key]);
          return (
            <span
              key={key}
              className={`text-base rounded-full px-2.5 py-1 font-semibold ${
                complete ? "bg-green-100 text-green-700" : "bg-slate-700 text-slate-400"
              }`}
            >
              {complete ? "✓ " : ""}{label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

const NAV_SECTIONS = [
  {
    key: "hotelProfile", label: "Hotel Profile", num: 1,
    accent: "border-blue-500", dot: "bg-blue-500",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  },
  {
    key: "financialExposure", label: "Financial Exposure", num: 2,
    accent: "border-emerald-500", dot: "bg-emerald-500",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  },
  {
    key: "insurancePolicy", label: "Insurance Coverage", num: 3,
    accent: "border-violet-500", dot: "bg-violet-500",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  },
  {
    key: "lossHistory", label: "Loss History", num: 4,
    accent: "border-rose-500", dot: "bg-rose-500",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  },
  {
    key: "operationalRisk", label: "Operational Risk", num: 5,
    accent: "border-amber-500", dot: "bg-amber-500",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
  },
  {
    key: "locationHazard", label: "Location & Hazards", num: 6,
    accent: "border-cyan-500", dot: "bg-cyan-500",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  },
];

const SECTION_COLORS = {
  hotelProfile:     "bg-gradient-to-r from-hrip-navy to-blue-700",
  financialExposure:"bg-gradient-to-r from-emerald-700 to-emerald-500",
  insurancePolicy:  "bg-gradient-to-r from-violet-700 to-violet-500",
  lossHistory:      "bg-gradient-to-r from-rose-700 to-rose-500",
  operationalRisk:  "bg-gradient-to-r from-amber-600 to-amber-400",
  locationHazard:   "bg-gradient-to-r from-cyan-700 to-cyan-500",
};

const SECTION_RENDERERS = {
  hotelProfile:     (d) => <HotelProfileSection data={d} />,
  financialExposure:(d) => <FinancialSection data={d} />,
  insurancePolicy:  (d) => <InsuranceSection data={d} />,
  lossHistory:      (d) => <LossHistorySection data={d} />,
  operationalRisk:  (d) => <OperationalRiskSection data={d} />,
  locationHazard:   (d) => <LocationSection data={d} />,
};

export default function InputSummaryDashboard() {
  const [hotelData, setHotelData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [activeSection, setActiveSection] = useState("hotelProfile");

  useEffect(() => {
    const raw = localStorage.getItem("hotelRiskAnalysis") || localStorage.getItem("hotelRiskIntake");
    if (raw) {
      try { setHotelData(JSON.parse(raw)); setIsDemo(false); }
      catch { setHotelData(DEMO_DATA); setIsDemo(true); }
    } else {
      setHotelData(DEMO_DATA);
      setIsDemo(true);
    }
    setLoaded(true);
  }, []);

  // Track which section is in view
  useEffect(() => {
    if (!loaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    NAV_SECTIONS.forEach(({ key }) => {
      const el = document.getElementById(key);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [loaded]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const loadDemo = () => {
    localStorage.setItem("hotelRiskAnalysis", JSON.stringify(DEMO_DATA));
    setHotelData(DEMO_DATA);
    setIsDemo(true);
  };

  const clearData = () => {
    localStorage.removeItem("hotelRiskAnalysis");
    localStorage.removeItem("hotelRiskIntake");
    setHotelData(DEMO_DATA);
    setIsDemo(true);
  };

  // ── Derived KPIs ─────────────────────────────────────────────────────────
  const p = hotelData?.hotelProfile || {};
  const f = hotelData?.financialExposure || {};
  const ins = hotelData?.insurancePolicy || {};
  const op = hotelData?.operationalRisk || {};

  const monthlyBurn =
    (parseFloat(f.fixedMonthlyCosts) || 0) +
    (parseFloat(f.monthlyPayroll) || 0) +
    (parseFloat(f.monthlyDebtService) || 0);

  const issueCount = ["roofLeaks","hvacIssues","plumbingIssues","electricalIssues",
    "moldMoistureHistory","deferredMaintenance","inspectionDeficiencies"]
    .filter(k => op[k] === "yes").length;

  const claimCount = hotelData?.lossHistory?.claims?.length || 0;

  const daysToRenewal = (() => {
    if (!ins.policyPeriodEnd) return null;
    const d = Math.ceil((new Date(ins.policyPeriodEnd) - new Date()) / 86400000);
    return d;
  })();

  const hotelName = p.hotelName || "Your Hotel";
  const location = [p.city, p.state].filter(Boolean).join(", ") || null;

  const kpis = [
    { label: "PROPERTY COVERAGE", value: ins.propertyCoverageLimit ? "$" + Number(ins.propertyCoverageLimit).toLocaleString() : "—", alert: false },
    { label: "BI COVERAGE", value: ins.biLimit ? "$" + Number(ins.biLimit).toLocaleString() : "—", alert: false },
    { label: "ANNUAL REVENUE", value: f.annualRevenue ? "$" + Number(f.annualRevenue).toLocaleString() : "—", alert: false },
    { label: "MONTHLY BURN", value: monthlyBurn > 0 ? "$" + monthlyBurn.toLocaleString() : "—", alert: monthlyBurn > 0 },
    { label: "CASH RESERVES", value: f.emergencyCashReserves ? "$" + Number(f.emergencyCashReserves).toLocaleString() : "—", alert: false },
    { label: "POLICY RENEWAL", value: daysToRenewal !== null ? `${daysToRenewal} days` : "—", alert: daysToRenewal !== null && daysToRenewal < 60 },
  ];

  // ── Completeness ─────────────────────────────────────────────────────────
  const sectionComplete = {
    hotelProfile:      !!p.hotelName,
    financialExposure: !!f.annualRevenue,
    insurancePolicy:   !!ins.propertyCoverageLimit,
    lossHistory:       true,
    operationalRisk:   !!op.roofLeaks,
    locationHazard:    !!hotelData?.locationHazard?.floodZone,
  };
  const completedCount = Object.values(sectionComplete).filter(Boolean).length;

  if (!loaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-hrip-gold" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-950">

      {/* ── TOP BAR ─────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-slate-900 border-b border-slate-800 flex items-stretch h-12">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 px-4 border-r border-slate-800 hover:bg-slate-800 transition-colors flex-shrink-0">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-slate-800/10">
            <span className="text-base font-bold text-white">HR</span>
          </div>
          <span className="text-lg font-bold text-white tracking-tight whitespace-nowrap">Hotel Risk Pro</span>
        </Link>

        {/* KPI pills — scrollable on small screens */}
        <div className="flex items-stretch overflow-x-auto flex-1">
          {kpis.map(({ label, value, alert }, i) => (
            <div key={i} className={`flex flex-col justify-center px-4 border-r border-slate-800 min-w-[120px] ${alert ? "bg-amber-900/30" : ""}`}>
              <p className="text-sm font-bold uppercase tracking-widest text-blue-300/70 leading-none">{label}</p>
              <p className={`text-lg font-bold leading-tight mt-0.5 ${alert ? "text-amber-300" : "text-white"}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 px-3 border-l border-slate-800 flex-shrink-0">
          {isDemo && (
            <span className="rounded px-2 py-0.5 text-sm font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mr-1">DEMO</span>
          )}
          <Link href="/report" className="rounded px-3 py-1.5 text-base font-semibold bg-hrip-gold text-slate-900 hover:bg-amber-300 transition-colors whitespace-nowrap">
            Risk Report
          </Link>
        </div>
      </div>

      {/* ── BODY (sidebar + content) ─────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR ──────────────────────────────────────────────── */}
        <div className="w-56 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">

          {/* Hotel identity */}
          <div className="px-4 py-4 border-b border-slate-800">
            <p className="text-base font-bold text-white leading-tight">{hotelName}</p>
            {location && <p className="text-sm text-slate-400 mt-0.5">{location}</p>}
            {p.numberOfRooms && (
              <p className="text-sm text-slate-500 mt-0.5">{p.numberOfRooms} rooms · {p.numberOfFloors || "—"} floors</p>
            )}
          </div>

          {/* Stat boxes */}
          <div className="grid grid-cols-2 gap-px bg-slate-800 border-b border-slate-800">
            <div className="bg-slate-900 px-3 py-2.5">
              <p className="text-2xl font-bold text-white leading-none">{completedCount}</p>
              <p className="text-sm text-slate-500 mt-0.5">Sections<br/>Complete</p>
            </div>
            <div className="bg-slate-900 px-3 py-2.5">
              <p className={`text-2xl font-bold leading-none ${issueCount > 0 ? "text-amber-400" : "text-green-400"}`}>{issueCount}</p>
              <p className="text-sm text-slate-500 mt-0.5">Operational<br/>Issues</p>
            </div>
            <div className="bg-slate-900 px-3 py-2.5">
              <p className={`text-2xl font-bold leading-none ${claimCount > 0 ? "text-rose-400" : "text-slate-300"}`}>{claimCount}</p>
              <p className="text-sm text-slate-500 mt-0.5">Prior<br/>Claims</p>
            </div>
            <div className="bg-slate-900 px-3 py-2.5">
              <p className="text-2xl font-bold text-white leading-none">{daysToRenewal ?? "—"}</p>
              <p className="text-sm text-slate-500 mt-0.5">Days to<br/>Renewal</p>
            </div>
          </div>

          {/* Section navigation */}
          <div className="py-2 border-b border-slate-800 flex-1">
            <p className="px-4 pt-2 pb-1 text-sm font-bold uppercase tracking-widest text-slate-600">Data Sections</p>
            {NAV_SECTIONS.map(({ key, label, num, accent, dot, icon }) => {
              const active = activeSection === key;
              const done = sectionComplete[key];
              return (
                <button
                  key={key}
                  onClick={() => scrollTo(key)}
                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left transition-colors border-l-2 ${
                    active
                      ? `${accent} bg-slate-800 text-white`
                      : "border-transparent text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                  }`}
                >
                  <span className="flex-shrink-0 opacity-70">{icon}</span>
                  <span className="flex-1 text-base font-medium leading-tight">{label}</span>
                  <span className={`flex-shrink-0 h-1.5 w-1.5 rounded-full ${done ? dot : "bg-slate-700"}`} />
                </button>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="p-3 space-y-1.5 border-t border-slate-800">
            <Link
              href="/intake"
              className="flex items-center gap-2 w-full rounded-lg bg-hrip-navy px-3 py-2 text-base font-semibold text-white hover:bg-blue-800 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Edit Intake Data
            </Link>
            <button
              onClick={loadDemo}
              className="flex items-center gap-2 w-full rounded-lg border border-slate-700 px-3 py-2 text-base font-semibold text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Reload Demo Data
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto bg-slate-900">
          <div className="px-4 py-4">
            <div className="grid grid-cols-3 gap-4">
              {NAV_SECTIONS.map(({ key, label, icon }) => (
                <div key={key} id={key} className="scroll-mt-4">
                  <SectionCard
                    title={label}
                    color={SECTION_COLORS[key]}
                    icon={<span className="text-white">{icon}</span>}
                    compact
                  >
                    {SECTION_RENDERERS[key](hotelData?.[key])}
                  </SectionCard>
                </div>
              ))}
            </div>
            <div className="h-6" />
          </div>
        </div>

      </div>
    </div>
  );
}
