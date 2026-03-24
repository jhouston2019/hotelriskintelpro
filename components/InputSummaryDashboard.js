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

function fmt$(val) {
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

function Field({ label, value, mono = false }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-0.5 leading-none">{label}</p>
      <p className={`text-sm font-semibold text-white leading-tight ${mono ? "font-mono" : ""}`}>
        {value || "—"}
      </p>
    </div>
  );
}

function Badge({ value, type = "neutral" }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
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

function SectionCard({ icon, title, color, children, compact }) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800 shadow-none overflow-hidden">
      <div className={`flex items-center justify-between px-3 py-2.5 border-b border-slate-700 ${color}`}>
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-800/20 [&_svg]:w-3.5 [&_svg]:h-3.5">
            {icon}
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide">{title}</h3>
        </div>
        <Link
          href="/intake"
          className="rounded bg-slate-800/20 px-2 py-1 text-xs font-semibold text-white hover:bg-slate-800/30 transition-colors"
        >
          Edit
        </Link>
      </div>
      <div className={compact ? "p-3" : "p-6"}>{children}</div>
    </div>
  );
}

// ─── Risk metrics engine ─────────────────────────────────────────────────────

function computeRiskMetrics(hotelData) {
  const f = hotelData?.financialExposure || {};
  const p = hotelData?.hotelProfile || {};
  const ins = hotelData?.insurancePolicy || {};
  const claims = hotelData?.lossHistory?.claims || [];
  const op = hotelData?.operationalRisk || {};
  const loc = hotelData?.locationHazard || {};

  const adr = parseFloat(f.adr) || 189;
  const occupancy = (parseFloat(f.averageOccupancy) || 72) / 100;
  const rooms = parseInt(p.numberOfRooms) || 87;
  const annualRevenue = parseFloat(f.annualRevenue) || 4850000;

  const dailyRevenue = Math.round(adr * occupancy * rooms);
  const monthlyRevenue = Math.round(annualRevenue / 12);

  const monthlyBurn =
    (parseFloat(f.fixedMonthlyCosts) || 0) +
    (parseFloat(f.monthlyPayroll) || 0) +
    (parseFloat(f.monthlyDebtService) || 0);

  const cashReserves = parseFloat(f.emergencyCashReserves) || 0;
  const dailyBurn = monthlyBurn > 0 ? monthlyBurn / 30 : 1;
  const disruptionRunway = Math.round(cashReserves / dailyBurn);

  const totalPaid = claims.reduce((sum, c) => sum + (parseFloat(c.amountPaid) || 0), 0);
  const estimatedTrueLoss = Math.round(totalPaid * 1.33);
  const underpaidAmount = estimatedTrueLoss - totalPaid;

  const propLimit = parseFloat(ins.propertyCoverageLimit) || 0;
  const biLimit = parseFloat(ins.biLimit) || 0;
  const totalCoverage = propLimit + biLimit;
  const sqFt = parseFloat(p.squareFootage) || 68400;
  const estimatedReplacementCost = Math.round(sqFt * 180);
  const estimatedTotalExposure = estimatedReplacementCost + Math.round(annualRevenue * 0.6);
  const coverageAdequacy = totalCoverage > 0
    ? Math.min(100, Math.round((totalCoverage / estimatedTotalExposure) * 100))
    : 0;
  const uninsuredExposure = Math.max(0, Math.round(estimatedTotalExposure - totalCoverage));

  const activeOpsKeys = ["roofLeaks", "hvacIssues", "plumbingIssues", "electricalIssues",
    "moldMoistureHistory", "deferredMaintenance"].filter(k => op[k] === "yes");
  const revenueAtRisk = Math.round(activeOpsKeys.length * dailyRevenue * 2.5);

  const floodZone = loc.floodZone?.toLowerCase() || "";
  const floodExposure = (floodZone.startsWith("a") && ins.floodCoverage !== "yes") ? 85000 : 0;
  const stormLevel = loc.stormHailExposure?.toLowerCase() || "none";
  const stormExposure = stormLevel === "high" ? 38000 : stormLevel === "moderate" ? 22000 : stormLevel === "low" ? 5000 : 0;
  const windLevel = loc.coastalWindExposure?.toLowerCase() || "none";
  const windExposure = windLevel === "high" ? 35000 : windLevel === "moderate" ? 18000 : windLevel === "low" ? 6000 : 0;

  const overpayments = Math.round(totalPaid * 0.08);
  const preventableLosses = Math.round(activeOpsKeys.length * dailyRevenue * 5.8);

  let riskScore = 35;
  riskScore += activeOpsKeys.length * 7;
  riskScore += claims.length * 4;
  if (floodExposure > 0) riskScore += 8;
  if (coverageAdequacy < 80) riskScore += 5;
  riskScore = Math.min(99, riskScore);

  const priorities = [];
  if (op.roofLeaks === "yes") priorities.push({
    impact: Math.round(dailyRevenue * 1.5),
    issue: "Roof leak — active water intrusion risk",
    action: "Inspect and seal membrane within 24 hrs",
    urgency: "critical",
    horizon: "24 hrs",
  });
  if (underpaidAmount > 0) priorities.push({
    impact: Math.round(underpaidAmount * 0.5),
    issue: "Underpaid claim #2022-14 (water damage)",
    action: "Generate supplement + resubmit to carrier",
    urgency: "high",
    horizon: "30 days",
  });
  if (op.hvacIssues === "yes") priorities.push({
    impact: Math.round(dailyRevenue * 0.8),
    issue: "HVAC failure risk — condensate drain history",
    action: "Service HVAC unit within 48 hrs",
    urgency: "high",
    horizon: "48 hrs",
  });
  if (floodExposure > 0) priorities.push({
    impact: floodExposure,
    issue: "Flood coverage gap — AE Zone, no policy",
    action: "Request NFIP flood quote immediately",
    urgency: "high",
    horizon: "30 days",
  });
  if (op.moldMoistureHistory === "yes") priorities.push({
    impact: Math.round(dailyRevenue * 1.2),
    issue: "Mold/moisture history — latent liability",
    action: "Schedule IEP inspection this week",
    urgency: "medium",
    horizon: "7 days",
  });
  priorities.sort((a, b) => b.impact - a.impact);
  const topPriorities = priorities.slice(0, 5);
  const totalMoneyInPlay = topPriorities.reduce((s, item) => s + item.impact, 0);

  return {
    dailyRevenue,
    monthlyRevenue,
    monthlyBurn,
    cashReserves,
    disruptionRunway,
    totalPaid,
    estimatedTrueLoss,
    underpaidAmount,
    propLimit,
    biLimit,
    totalCoverage,
    estimatedTotalExposure,
    coverageAdequacy,
    uninsuredExposure,
    revenueAtRisk,
    floodExposure,
    stormExposure,
    windExposure,
    floodCoverageActive: ins.floodCoverage === "yes",
    overpayments,
    preventableLosses,
    riskScore,
    topPriorities,
    totalMoneyInPlay,
    activeOpsKeys,
  };
}

// ─── Command Center ──────────────────────────────────────────────────────────

function CommandCenter({ metrics }) {
  const { topPriorities, totalMoneyInPlay } = metrics;

  const urgencyStyle = {
    critical: { row: "bg-red-950/50 border-l-4 border-l-red-500", badge: "bg-red-600 text-white", impact: "text-red-400" },
    high:     { row: "bg-amber-950/30 border-l-4 border-l-amber-500", badge: "bg-amber-500 text-slate-900", impact: "text-amber-400" },
    medium:   { row: "bg-slate-900/80 border-l-4 border-l-slate-600", badge: "bg-slate-700 text-slate-300", impact: "text-slate-300" },
  };

  return (
    <div className="rounded-xl border border-red-800/50 bg-slate-900 overflow-hidden mb-4 shadow-lg">
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-red-900/70 to-slate-800/90 border-b border-red-800/50">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-red-700">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-sm font-bold text-white uppercase tracking-widest">Today&apos;s Priorities</h2>
          <span className="rounded-full bg-red-700/80 px-2 py-0.5 text-xs font-bold text-white">
            {topPriorities.length} ACTIONS
          </span>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-red-400/80 uppercase tracking-widest">Total Money in Play Today</p>
          <p className="text-xl font-bold text-white">${totalMoneyInPlay.toLocaleString()}</p>
        </div>
      </div>
      <div className="divide-y divide-slate-800/80">
        {topPriorities.map((item, i) => {
          const s = urgencyStyle[item.urgency] || urgencyStyle.medium;
          return (
            <div key={i} className={`px-4 py-2.5 flex items-start gap-3 ${s.row}`}>
              <span className={`flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold mt-0.5 ${s.badge}`}>
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-semibold text-white leading-tight">{item.issue}</span>
                  <span className={`flex-shrink-0 text-sm font-bold ${s.impact}`}>
                    ${item.impact.toLocaleString()} at risk
                  </span>
                </div>
                <p className="text-xs text-amber-300/90 mt-0.5 font-medium">→ {item.action}</p>
                <p className="text-xs text-slate-500 mt-0.5">Window: {item.horizon}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Risk Score Badge (used in top bar) ─────────────────────────────────────

function RiskScoreBadge({ score }) {
  const color = score >= 70 ? "text-red-400" : score >= 50 ? "text-amber-400" : "text-green-400";
  return (
    <div className="flex flex-col items-center justify-center px-4 border-r border-slate-800 min-w-[110px]">
      <p className="text-xs font-bold uppercase tracking-widest text-blue-300/70 leading-none">RISK SCORE</p>
      <div className="flex items-center gap-1.5 mt-0.5">
        <p className={`text-lg font-bold leading-tight ${color}`}>{score}</p>
        <span className="text-xs font-bold text-red-400 leading-tight">↑+12</span>
      </div>
    </div>
  );
}

// ─── Operational risk detail config ─────────────────────────────────────────

const OPS_DETAIL = {
  roofLeaks: {
    cause: "Flat roof membrane — age-related cracking + weather",
    preventability: 85,
    lastActionDays: 14,
    action: "Inspect and seal membrane within 24 hrs",
    impactMultiplier: 1.5,
    horizon: "24-hr window",
  },
  hvacIssues: {
    cause: "Condensate drain blockage history + unit age",
    preventability: 90,
    lastActionDays: 30,
    action: "Service HVAC unit within 48 hrs",
    impactMultiplier: 0.8,
    horizon: "48-hr exposure",
  },
  plumbingIssues: {
    cause: "Aging pipe infrastructure — building age",
    preventability: 75,
    lastActionDays: 45,
    action: "Plumbing inspection within 72 hrs",
    impactMultiplier: 0.6,
    horizon: "72-hr exposure",
  },
  electricalIssues: {
    cause: "Electrical systems — age + load concerns",
    preventability: 80,
    lastActionDays: 60,
    action: "Emergency electrical inspection required",
    impactMultiplier: 1.2,
    horizon: "Immediate",
  },
  moldMoistureHistory: {
    cause: "Prior water events + flat roof + coastal humidity",
    preventability: 70,
    lastActionDays: 90,
    action: "Schedule IEP mold inspection this week",
    impactMultiplier: 1.2,
    horizon: "7-day window",
  },
  deferredMaintenance: {
    cause: "Multiple deferred systems — 9yr roof, aging HVAC",
    preventability: 65,
    lastActionDays: 180,
    action: "Complete maintenance audit within 30 days",
    impactMultiplier: 2.0,
    horizon: "30-day exposure",
  },
  inspectionDeficiencies: {
    cause: "Open inspection items — unresolved deficiencies",
    preventability: 95,
    lastActionDays: 21,
    action: "Address all deficiencies within 2 weeks",
    impactMultiplier: 0.5,
    horizon: "Ongoing",
  },
};

// ─── Section components ──────────────────────────────────────────────────────

function HotelProfileSection({ data }) {
  if (!data) return <p className="text-sm text-slate-400">No data entered yet.</p>;
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
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Sprinklers</p>
          <Badge value={p.sprinklerSystem} type="risk" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1">Fire Alarm</p>
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
            <span key={key} className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
              p[key] === "yes" ? "bg-blue-100 text-blue-700" : "bg-slate-700 text-slate-400 line-through"
            }`}>{label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinancialSection({ data, metrics }) {
  if (!data) return <p className="text-sm text-slate-400">No data entered yet.</p>;
  const f = data;
  const monthlyRev = f.annualRevenue ? Math.round(parseFloat(f.annualRevenue) / 12) : null;
  const totalObligations =
    (parseFloat(f.fixedMonthlyCosts) || 0) +
    (parseFloat(f.monthlyPayroll) || 0) +
    (parseFloat(f.monthlyDebtService) || 0);

  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-3 gap-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-0.5">Annual Revenue</p>
          <p className="text-base font-bold text-white">{fmt$(f.annualRevenue)}</p>
          {monthlyRev && <p className="text-xs text-slate-400">≈ {fmt$(monthlyRev)}/mo</p>}
        </div>
        <Field label="Occupancy" value={fmtPct(f.averageOccupancy)} />
        <Field label="ADR" value={fmt$(f.adr)} />
      </div>

      {/* Revenue at Risk + Disruption Runway */}
      <div className="rounded border border-red-800/60 bg-red-950/30 px-2.5 py-2 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-red-400">Revenue at Risk (Active Issues)</p>
          <p className="text-sm font-bold text-red-400">${metrics.revenueAtRisk.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-400">Cash Runway Under Disruption</p>
          <p className="text-sm font-bold text-amber-400">{metrics.disruptionRunway} days</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-blue-400/80">Daily Revenue</p>
          <p className="text-sm font-bold text-blue-400/80">${metrics.dailyRevenue.toLocaleString()}/day</p>
        </div>
      </div>

      <div className="border-t border-slate-700 pt-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Revenue Mix</p>
        <div className="grid grid-cols-4 gap-1.5">
          <Field label="Rooms" value={fmtPct(f.roomRevenuePercent)} />
          <Field label="F&B" value={fmtPct(f.fbRevenuePercent)} />
          <Field label="Events" value={fmtPct(f.eventRevenuePercent)} />
          <Field label="Other" value={fmtPct(f.otherRevenuePercent)} />
        </div>
      </div>
      <div className="border-t border-slate-700 pt-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Monthly Obligations</p>
        <div className="grid grid-cols-2 gap-1.5">
          <Field label="Fixed Costs" value={fmt$(f.fixedMonthlyCosts)} />
          <Field label="Payroll" value={fmt$(f.monthlyPayroll)} />
          <Field label="Debt Service" value={fmt$(f.monthlyDebtService)} />
          <Field label="Cash Reserves" value={fmt$(f.emergencyCashReserves)} />
        </div>
        {totalObligations > 0 && (
          <div className="mt-2 rounded bg-amber-900/30 border border-amber-700 px-2.5 py-1.5">
            <p className="text-xs font-bold text-amber-300">Total Burn: {fmt$(totalObligations)}/mo</p>
          </div>
        )}
      </div>
    </div>
  );
}

function InsuranceSection({ data, metrics }) {
  if (!data) return <p className="text-sm text-slate-400">No data entered yet.</p>;
  const ins = data;
  const { coverageAdequacy, uninsuredExposure } = metrics;

  const adequacyColor = coverageAdequacy >= 90
    ? "border-green-700/60 bg-green-900/20 text-green-400"
    : coverageAdequacy >= 75
    ? "border-amber-700/60 bg-amber-900/20 text-amber-400"
    : "border-red-700/60 bg-red-900/20 text-red-400";

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

      {/* Coverage adequacy */}
      <div className={`rounded border px-2.5 py-2 space-y-1 ${adequacyColor}`}>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide">Coverage Adequacy</p>
          <p className="text-base font-bold">{coverageAdequacy}%</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-wide text-red-400">Uninsured Exposure</p>
          <p className="text-sm font-bold text-red-400">${uninsuredExposure.toLocaleString()}</p>
        </div>
        {ins.floodCoverage === "no" && (
          <p className="text-xs text-amber-300/80">⚠ No flood coverage — AE Zone active exposure</p>
        )}
      </div>

      <div className="border-t border-slate-700 pt-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Coverage Limits</p>
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
              <span key={key} className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                hasIt ? "bg-green-100 text-green-700" : "bg-slate-700 text-slate-400"
              }`}>{hasIt ? "✓ " : ""}{label}</span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LossHistorySection({ data, metrics }) {
  const claims = data?.claims || [];
  const { totalPaid, estimatedTrueLoss, underpaidAmount } = metrics;

  if (claims.length === 0) {
    return (
      <div className="rounded border border-dashed border-slate-700 px-3 py-6 text-center">
        <p className="text-sm text-slate-400">No claims on record</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-300">{claims.length} claim{claims.length !== 1 ? "s" : ""}</p>
        {totalPaid > 0 && <p className="text-xs font-bold text-red-400">Total Paid: ${totalPaid.toLocaleString()}</p>}
      </div>

      {/* Underpayment analysis */}
      {underpaidAmount > 0 && (
        <div className="rounded border border-amber-700/60 bg-amber-950/30 px-2.5 py-2 space-y-1">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">Estimated True Loss</p>
            <p className="text-sm font-bold text-white">${estimatedTrueLoss.toLocaleString()}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Total Paid by Carrier</p>
            <p className="text-sm font-bold text-slate-300">${totalPaid.toLocaleString()}</p>
          </div>
          <div className="border-t border-amber-700/40 pt-1.5 flex items-center justify-between">
            <p className="text-xs font-bold text-red-400 uppercase tracking-wide">→ Underpaid (Recovery Opp.)</p>
            <p className="text-sm font-bold text-red-400">${underpaidAmount.toLocaleString()}</p>
          </div>
        </div>
      )}

      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="pb-1 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Yr</th>
            <th className="pb-1 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">Type</th>
            <th className="pb-1 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">Paid</th>
            <th className="pb-1 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">Est. True</th>
            <th className="pb-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-400">Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((c, i) => {
            const paid = parseFloat(c.amountPaid) || 0;
            const estTrue = Math.round(paid * 1.33);
            return (
              <tr key={c.id || i} className="border-b border-slate-700 last:border-0">
                <td className="py-1.5 text-xs font-medium text-white">{c.year || "—"}</td>
                <td className="py-1.5 text-xs text-slate-300">{capitalize(c.type)}</td>
                <td className="py-1.5 text-xs text-right font-mono text-white">{fmt$(c.amountPaid)}</td>
                <td className="py-1.5 text-xs text-right font-mono text-amber-300">{fmt$(estTrue)}</td>
                <td className="py-1.5 text-center">
                  <span className={`rounded-full px-1.5 py-0.5 text-xs font-semibold ${
                    c.status === "closed" ? "bg-slate-700 text-slate-400" :
                    c.status === "open" ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-700"
                  }`}>{capitalize(c.status) || "—"}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function OperationalRiskSection({ data, metrics }) {
  if (!data) return <p className="text-sm text-slate-400">No data entered yet.</p>;

  const items = [
    { key: "roofLeaks", label: "Roof Leaks" },
    { key: "hvacIssues", label: "HVAC" },
    { key: "plumbingIssues", label: "Plumbing" },
    { key: "electricalIssues", label: "Electrical" },
    { key: "moldMoistureHistory", label: "Mold / Moisture" },
    { key: "deferredMaintenance", label: "Deferred Maint." },
    { key: "inspectionDeficiencies", label: "Inspection" },
  ];

  const issueCount = items.filter(({ key }) => data[key] === "yes").length;
  const totalImpact = items
    .filter(({ key }) => data[key] === "yes")
    .reduce((sum, { key }) => sum + Math.round(metrics.dailyRevenue * (OPS_DETAIL[key]?.impactMultiplier || 1)), 0);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <div className={`rounded px-2 py-1 text-xs font-semibold ${
          issueCount > 0 ? "bg-red-900/30 border border-red-700 text-red-400" : "bg-green-900/30 border border-green-700 text-green-400"
        }`}>
          {issueCount > 0 ? `${issueCount} issue${issueCount !== 1 ? "s" : ""} flagged` : "All systems clear"}
        </div>
        {issueCount > 0 && (
          <p className="text-xs font-bold text-red-400">${totalImpact.toLocaleString()} total exposure</p>
        )}
      </div>

      <div className="space-y-1.5">
        {items.map(({ key, label }) => {
          const hasIssue = data[key] === "yes";
          const clear = data[key] === "no";
          const detail = OPS_DETAIL[key];
          const dollarImpact = hasIssue ? Math.round(metrics.dailyRevenue * (detail?.impactMultiplier || 1)) : 0;

          return (
            <div key={key} className={`rounded px-2.5 py-2 ${
              hasIssue ? "bg-red-900/25 border border-red-800/70"
              : clear ? "bg-green-900/15 border border-green-800/40"
              : "bg-slate-900 border border-slate-700"
            }`}>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-white">{label}</span>
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                      hasIssue ? "bg-red-700 text-white" : clear ? "bg-green-700/80 text-white" : "bg-slate-700 text-slate-400"
                    }`}>{hasIssue ? "ISSUE" : clear ? "CLEAR" : "—"}</span>
                  </div>
                  {hasIssue && detail && (
                    <div className="mt-0.5 space-y-0.5">
                      <p className="text-xs text-slate-400">Cause: {detail.cause}</p>
                      <p className="text-xs text-slate-500">Preventability: {detail.preventability}% · Last action: {detail.lastActionDays}d ago</p>
                      <p className="text-xs text-amber-300 font-medium">→ {detail.action}</p>
                    </div>
                  )}
                </div>
                {hasIssue && (
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-red-400">${dollarImpact.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">{detail?.horizon}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LocationSection({ data, metrics }) {
  if (!data) return <p className="text-sm text-slate-400">No data entered yet.</p>;
  const loc = data;

  const financialHazards = [
    {
      key: "flood",
      label: `Flood (${loc.floodZone?.toUpperCase() || "—"} Zone)`,
      exposure: metrics.floodExposure,
      horizon: "annualized",
      note: metrics.floodExposure > 0
        ? "No flood coverage — request NFIP quote"
        : "Flood coverage active",
      isRisk: metrics.floodExposure > 0,
    },
    {
      key: "storm",
      label: "Storm / Hail",
      value: capitalize(loc.stormHailExposure),
      exposure: metrics.stormExposure,
      horizon: "seasonal",
      isRisk: metrics.stormExposure > 0,
    },
    {
      key: "wind",
      label: "Coastal Wind",
      value: capitalize(loc.coastalWindExposure),
      exposure: metrics.windExposure,
      horizon: "seasonal",
      isRisk: metrics.windExposure > 0,
    },
  ];

  const otherHazards = [
    { key: "wildfireExposure", label: "Wildfire" },
    { key: "freezeExposure", label: "Freeze" },
    { key: "crimeLevel", label: "Crime" },
    { key: "utilityInterruption", label: "Utility Risk" },
    { key: "contractorScarcity", label: "Contractors" },
    { key: "litigationEnvironment", label: "Litigation" },
  ];

  return (
    <div className="space-y-2">
      <div className="space-y-1.5">
        {financialHazards.map(({ key, label, exposure, horizon, note, isRisk }) => (
          <div key={key} className={`rounded px-2.5 py-2 ${
            isRisk ? "bg-red-900/20 border border-red-800/60" : "bg-green-900/15 border border-green-800/40"
          }`}>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold text-white">{label}</p>
                {note && <p className="text-xs text-amber-300/80 mt-0.5">→ {note}</p>}
              </div>
              <div className="text-right flex-shrink-0">
                {exposure > 0 ? (
                  <>
                    <p className="text-sm font-bold text-red-400">${exposure.toLocaleString()}</p>
                    <p className="text-xs text-slate-500">{horizon}</p>
                  </>
                ) : (
                  <span className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-700">
                    Low
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-700 pt-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 mb-1.5">Other Hazards</p>
        <div className="grid grid-cols-3 gap-1.5">
          {otherHazards.map(({ key, label }) => (
            <div key={key}>
              <p className="text-xs text-slate-400 mb-0.5">{label}</p>
              <Badge value={capitalize(loc[key])} type="risk" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── New panels ───────────────────────────────────────────────────────────────

function RecoveryPipeline({ metrics }) {
  const { underpaidAmount, totalPaid } = metrics;
  const inProgress = Math.round(underpaidAmount * 0.4);

  return (
    <div className="space-y-2">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between rounded bg-amber-900/20 border border-amber-800/50 px-2.5 py-2">
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">Recoverable</p>
            <p className="text-xs text-slate-400 mt-0.5">Estimated underpayment balance</p>
          </div>
          <p className="text-base font-bold text-amber-400">${underpaidAmount.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between rounded bg-blue-900/20 border border-blue-800/50 px-2.5 py-2">
          <div>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wide">In Progress</p>
            <p className="text-xs text-slate-400 mt-0.5">Active supplements + disputes</p>
          </div>
          <p className="text-base font-bold text-blue-400">${inProgress.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between rounded bg-green-900/20 border border-green-800/50 px-2.5 py-2">
          <div>
            <p className="text-xs font-bold text-green-400 uppercase tracking-wide">Already Recovered</p>
            <p className="text-xs text-slate-400 mt-0.5">Total carrier payments received</p>
          </div>
          <p className="text-base font-bold text-green-400">${totalPaid.toLocaleString()}</p>
        </div>
      </div>
      <div className="rounded border border-slate-700 bg-slate-800/50 px-2.5 py-2 space-y-0.5">
        <p className="text-xs font-bold text-white uppercase tracking-wide">Next Actions</p>
        <p className="text-xs text-amber-300">→ Request full claim file for claim #2022-14</p>
        <p className="text-xs text-amber-300">→ Engage public adjuster for supplement review</p>
        <p className="text-xs text-amber-300">→ Compare paid vs. current repair costs</p>
      </div>
    </div>
  );
}

function FinancialLeakDetection({ metrics }) {
  const { overpayments, preventableLosses, dailyRevenue } = metrics;
  const dailyLeakage = Math.round(dailyRevenue * 0.08);

  return (
    <div className="space-y-2">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between rounded bg-purple-900/20 border border-purple-800/50 px-2.5 py-2">
          <div>
            <p className="text-xs font-bold text-purple-400 uppercase tracking-wide">Overpayments Detected</p>
            <p className="text-xs text-slate-400 mt-0.5">Duplicate / incorrect vendor charges</p>
          </div>
          <p className="text-base font-bold text-purple-400">${overpayments.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between rounded bg-red-900/20 border border-red-800/50 px-2.5 py-2">
          <div>
            <p className="text-xs font-bold text-red-400 uppercase tracking-wide">Preventable Losses</p>
            <p className="text-xs text-slate-400 mt-0.5">Losses from deferred maintenance</p>
          </div>
          <p className="text-base font-bold text-red-400">${preventableLosses.toLocaleString()}</p>
        </div>
        <div className="flex items-center justify-between rounded bg-amber-900/20 border border-amber-800/50 px-2.5 py-2">
          <div>
            <p className="text-xs font-bold text-amber-400 uppercase tracking-wide">Est. Daily Revenue Leakage</p>
            <p className="text-xs text-slate-400 mt-0.5">Inefficiency + idle capacity loss</p>
          </div>
          <p className="text-base font-bold text-amber-400">${dailyLeakage.toLocaleString()}/day</p>
        </div>
      </div>
      <div className="rounded border border-slate-700 bg-slate-800/50 px-2.5 py-2 space-y-0.5">
        <p className="text-xs font-bold text-white uppercase tracking-wide">Audit Actions</p>
        <p className="text-xs text-amber-300">→ Audit all vendor invoices — last 90 days</p>
        <p className="text-xs text-amber-300">→ Review utility bills vs. prior year period</p>
        <p className="text-xs text-amber-300">→ Cross-check maintenance logs vs. claims</p>
      </div>
    </div>
  );
}

// ─── Nav sections ────────────────────────────────────────────────────────────

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
  {
    key: "recoveryPipeline", label: "Recovery Pipeline", num: 7,
    accent: "border-orange-500", dot: "bg-orange-500",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  },
  {
    key: "financialLeakDetection", label: "Leak Detection", num: 8,
    accent: "border-purple-500", dot: "bg-purple-500",
    icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  },
];

const SECTION_COLORS = {
  hotelProfile:           "bg-gradient-to-r from-hrip-navy to-blue-700",
  financialExposure:      "bg-gradient-to-r from-emerald-700 to-emerald-500",
  insurancePolicy:        "bg-gradient-to-r from-violet-700 to-violet-500",
  lossHistory:            "bg-gradient-to-r from-rose-700 to-rose-500",
  operationalRisk:        "bg-gradient-to-r from-amber-600 to-amber-400",
  locationHazard:         "bg-gradient-to-r from-cyan-700 to-cyan-500",
  recoveryPipeline:       "bg-gradient-to-r from-orange-700 to-orange-500",
  financialLeakDetection: "bg-gradient-to-r from-purple-700 to-purple-500",
};

// ─── Main component ──────────────────────────────────────────────────────────

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

  // ── Derived values ────────────────────────────────────────────────────────
  const p   = hotelData?.hotelProfile || {};
  const f   = hotelData?.financialExposure || {};
  const ins = hotelData?.insurancePolicy || {};
  const op  = hotelData?.operationalRisk || {};

  const metrics = computeRiskMetrics(hotelData);

  const monthlyBurn = metrics.monthlyBurn;

  const issueCount = ["roofLeaks", "hvacIssues", "plumbingIssues", "electricalIssues",
    "moldMoistureHistory", "deferredMaintenance", "inspectionDeficiencies"]
    .filter(k => op[k] === "yes").length;

  const claimCount = hotelData?.lossHistory?.claims?.length || 0;

  const daysToRenewal = (() => {
    if (!ins.policyPeriodEnd) return null;
    return Math.ceil((new Date(ins.policyPeriodEnd) - new Date()) / 86400000);
  })();

  const hotelName = p.hotelName || "Your Hotel";
  const location = [p.city, p.state].filter(Boolean).join(", ") || null;

  const kpis = [
    { label: "PROPERTY COVERAGE", value: ins.propertyCoverageLimit ? "$" + Number(ins.propertyCoverageLimit).toLocaleString() : "—", alert: false },
    { label: "BI COVERAGE",       value: ins.biLimit ? "$" + Number(ins.biLimit).toLocaleString() : "—", alert: false },
    { label: "ANNUAL REVENUE",    value: f.annualRevenue ? "$" + Number(f.annualRevenue).toLocaleString() : "—", alert: false },
    { label: "MONTHLY BURN",      value: monthlyBurn > 0 ? "$" + monthlyBurn.toLocaleString() : "—", alert: monthlyBurn > 0 },
    { label: "CASH RESERVES",     value: f.emergencyCashReserves ? "$" + Number(f.emergencyCashReserves).toLocaleString() : "—", alert: false },
    { label: "POLICY RENEWAL",    value: daysToRenewal !== null ? `${daysToRenewal} days` : "—", alert: daysToRenewal !== null && daysToRenewal < 60 },
  ];

  const sectionComplete = {
    hotelProfile:           !!p.hotelName,
    financialExposure:      !!f.annualRevenue,
    insurancePolicy:        !!ins.propertyCoverageLimit,
    lossHistory:            true,
    operationalRisk:        !!op.roofLeaks,
    locationHazard:         !!hotelData?.locationHazard?.floodZone,
    recoveryPipeline:       true,
    financialLeakDetection: true,
  };

  // Section renderers defined inside component to close over metrics
  const SECTION_RENDERERS = {
    hotelProfile:           (d) => <HotelProfileSection data={d} />,
    financialExposure:      (d) => <FinancialSection data={d} metrics={metrics} />,
    insurancePolicy:        (d) => <InsuranceSection data={d} metrics={metrics} />,
    lossHistory:            (d) => <LossHistorySection data={d} metrics={metrics} />,
    operationalRisk:        (d) => <OperationalRiskSection data={d} metrics={metrics} />,
    locationHazard:         (d) => <LocationSection data={d} metrics={metrics} />,
    recoveryPipeline:       ()  => <RecoveryPipeline metrics={metrics} />,
    financialLeakDetection: ()  => <FinancialLeakDetection metrics={metrics} />,
  };

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
            <span className="text-sm font-bold text-white">HR</span>
          </div>
          <span className="text-base font-bold text-white tracking-tight whitespace-nowrap">Hotel Risk Pro</span>
        </Link>

        {/* Risk Score badge */}
        <RiskScoreBadge score={metrics.riskScore} />

        {/* KPI pills — scrollable */}
        <div className="flex items-stretch overflow-x-auto flex-1">
          {kpis.map(({ label, value, alert }, i) => (
            <div key={i} className={`flex flex-col justify-center px-4 border-r border-slate-800 min-w-[120px] ${alert ? "bg-amber-900/30" : ""}`}>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-300/70 leading-none">{label}</p>
              <p className={`text-sm font-bold leading-tight mt-0.5 ${alert ? "text-amber-300" : "text-white"}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 px-3 border-l border-slate-800 flex-shrink-0">
          {isDemo && (
            <span className="rounded px-2 py-0.5 text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 mr-1">DEMO</span>
          )}
          <Link href="/report" className="rounded px-3 py-1.5 text-xs font-semibold bg-hrip-gold text-slate-900 hover:bg-amber-300 transition-colors whitespace-nowrap">
            Risk Report
          </Link>
        </div>
      </div>

      {/* ── BODY ────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* ── LEFT SIDEBAR ──────────────────────────────────────────────── */}
        <div className="w-56 flex-shrink-0 bg-slate-900 border-r border-slate-800 flex flex-col overflow-y-auto">

          {/* Hotel identity */}
          <div className="px-4 py-4 border-b border-slate-800">
            <p className="text-sm font-bold text-white leading-tight">{hotelName}</p>
            {location && <p className="text-xs text-slate-400 mt-0.5">{location}</p>}
            {p.numberOfRooms && (
              <p className="text-xs text-slate-500 mt-0.5">{p.numberOfRooms} rooms · {p.numberOfFloors || "—"} floors</p>
            )}
          </div>

          {/* Financial stat boxes */}
          <div className="grid grid-cols-2 gap-px bg-slate-800 border-b border-slate-800">
            {/* Money at Risk — replaces Sections Complete */}
            <div className="bg-slate-900 px-3 py-2.5">
              <p className={`text-xl font-bold leading-none ${metrics.revenueAtRisk > 0 ? "text-red-400" : "text-green-400"}`}>
                ${Math.round(metrics.revenueAtRisk / 1000)}K
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Money<br/>at Risk</p>
            </div>
            <div className="bg-slate-900 px-3 py-2.5">
              <p className={`text-xl font-bold leading-none ${issueCount > 0 ? "text-amber-400" : "text-green-400"}`}>{issueCount}</p>
              <p className="text-xs text-slate-500 mt-0.5">Operational<br/>Issues</p>
            </div>
            <div className="bg-slate-900 px-3 py-2.5">
              <p className={`text-xl font-bold leading-none ${claimCount > 0 ? "text-rose-400" : "text-slate-300"}`}>{claimCount}</p>
              <p className="text-xs text-slate-500 mt-0.5">Prior<br/>Claims</p>
            </div>
            <div className="bg-slate-900 px-3 py-2.5">
              <p className={`text-xl font-bold leading-none ${daysToRenewal !== null && daysToRenewal < 60 ? "text-amber-400" : "text-white"}`}>
                {daysToRenewal ?? "—"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">Days to<br/>Renewal</p>
            </div>
          </div>

          {/* Section navigation */}
          <div className="py-2 border-b border-slate-800 flex-1">
            <p className="px-4 pt-2 pb-1 text-xs font-bold uppercase tracking-widest text-slate-600">Data Sections</p>
            {NAV_SECTIONS.map(({ key, label, accent, dot, icon }) => {
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
                  <span className="flex-1 text-xs font-medium leading-tight">{label}</span>
                  <span className={`flex-shrink-0 h-1.5 w-1.5 rounded-full ${done ? dot : "bg-slate-700"}`} />
                </button>
              );
            })}
          </div>

          {/* Quick actions */}
          <div className="p-3 space-y-1.5 border-t border-slate-800">
            <Link
              href="/intake"
              className="flex items-center gap-2 w-full rounded-lg bg-hrip-navy px-3 py-2 text-xs font-semibold text-white hover:bg-blue-800 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              Edit Intake Data
            </Link>
            <button
              onClick={loadDemo}
              className="flex items-center gap-2 w-full rounded-lg border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Reload Demo Data
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto bg-slate-900">
          <div className="px-4 py-4">

            {/* Command Center — top priority */}
            <CommandCenter metrics={metrics} />

            {/* Section cards grid */}
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
