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
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">{label}</p>
      <p className={`text-sm font-medium text-gray-900 ${mono ? "font-mono" : ""}`}>
        {value || "—"}
      </p>
    </div>
  );
}

// Coloured badge
function Badge({ value, type = "neutral" }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold";
  if (!value || value === "—") return <span className={`${base} bg-gray-100 text-gray-500`}>—</span>;

  const low = ["no", "none", "low", "x"].includes(String(value).toLowerCase());
  const high = ["yes", "high", "v", "ae", "a"].includes(String(value).toLowerCase());
  const warn = ["moderate", "partial", "unknown"].includes(String(value).toLowerCase());

  if (type === "risk") {
    if (low) return <span className={`${base} bg-green-100 text-green-700`}>{capitalize(value)}</span>;
    if (high) return <span className={`${base} bg-red-100 text-red-700`}>{capitalize(value)}</span>;
    if (warn) return <span className={`${base} bg-amber-100 text-amber-700`}>{capitalize(value)}</span>;
    return <span className={`${base} bg-gray-100 text-gray-700`}>{capitalize(value)}</span>;
  }

  if (type === "bool") {
    const isYes = String(value).toLowerCase() === "yes";
    return <span className={`${base} ${isYes ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>{capitalize(value)}</span>;
  }

  return <span className={`${base} bg-gray-100 text-gray-700`}>{capitalize(value)}</span>;
}

// Section card wrapper
function SectionCard({ icon, title, color, children, sectionIndex }) {
  return (
    <div className="rounded-2xl border-2 border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className={`flex items-center justify-between px-6 py-4 border-b border-gray-100 ${color}`}>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/20">
            {icon}
          </div>
          <h3 className="text-base font-bold text-white">{title}</h3>
        </div>
        <Link
          href="/intake"
          className="rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/30 transition-colors"
        >
          Edit
        </Link>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

// ─── Section components ──────────────────────────────────────────────────────

function HotelProfileSection({ data }) {
  if (!data) return <p className="text-sm text-gray-400">No data entered yet.</p>;
  const p = data;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Hotel Name" value={p.hotelName} />
        <Field label="Rooms" value={fmtNum(p.numberOfRooms)} />
        <Field label="Floors" value={fmtNum(p.numberOfFloors)} />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Address" value={[p.address, p.city, p.state, p.zip].filter(Boolean).join(", ") || "—"} />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Built" value={p.yearBuilt || "—"} />
          <Field label="Renovated" value={p.yearRenovated || "—"} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Sq. Footage" value={fmtNum(p.squareFootage)} />
        <Field label="Construction" value={capitalize(p.constructionType)} />
        <Field label="Roof Type" value={capitalize(p.roofType)} />
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Roof Age" value={p.roofAge ? `${p.roofAge} yrs` : "—"} />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Sprinklers</p>
          <Badge value={p.sprinklerSystem} type="risk" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">Fire Alarm</p>
          <Badge value={p.fireAlarmSystem} type="risk" />
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Amenities</p>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "poolSpa", label: "Pool / Spa" },
            { key: "restaurantBar", label: "Restaurant / Bar" },
            { key: "eventSpace", label: "Event Space" },
            { key: "parkingStructure", label: "Parking Structure" },
          ].map(({ key, label }) => (
            <span
              key={key}
              className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                p[key] === "yes"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-400 line-through"
              }`}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function FinancialSection({ data }) {
  if (!data) return <p className="text-sm text-gray-400">No data entered yet.</p>;
  const f = data;
  const monthlyRev = f.annualRevenue ? Math.round(parseFloat(f.annualRevenue) / 12) : null;
  const totalObligations =
    (parseFloat(f.fixedMonthlyCosts) || 0) +
    (parseFloat(f.monthlyPayroll) || 0) +
    (parseFloat(f.monthlyDebtService) || 0);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="col-span-2 sm:col-span-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-0.5">Annual Revenue</p>
          <p className="text-lg font-bold text-hrip-navy">{fmt$(f.annualRevenue)}</p>
          {monthlyRev && (
            <p className="text-xs text-gray-500 mt-0.5">≈ {fmt$(monthlyRev)} / month</p>
          )}
        </div>
        <Field label="Avg Occupancy" value={fmtPct(f.averageOccupancy)} />
        <Field label="ADR" value={fmt$(f.adr)} />
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Revenue Mix</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Field label="Rooms" value={fmtPct(f.roomRevenuePercent)} />
          <Field label="F&B" value={fmtPct(f.fbRevenuePercent)} />
          <Field label="Events" value={fmtPct(f.eventRevenuePercent)} />
          <Field label="Other" value={fmtPct(f.otherRevenuePercent)} />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Monthly Obligations</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Fixed Operating Costs" value={fmt$(f.fixedMonthlyCosts)} />
          <Field label="Payroll" value={fmt$(f.monthlyPayroll)} />
          <Field label="Debt Service" value={fmt$(f.monthlyDebtService)} />
          <Field label="Emergency Reserves" value={fmt$(f.emergencyCashReserves)} />
        </div>
        {totalObligations > 0 && (
          <div className="mt-3 rounded-lg bg-amber-50 border border-amber-200 px-4 py-2.5">
            <p className="text-sm font-semibold text-amber-800">
              Total Monthly Burn: {fmt$(totalObligations)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function InsuranceSection({ data }) {
  if (!data) return <p className="text-sm text-gray-400">No data entered yet.</p>;
  const ins = data;

  const coverages = [
    { key: "ordinanceLawCoverage", label: "Ordinance & Law" },
    { key: "equipmentBreakdown", label: "Equipment Breakdown" },
    { key: "floodCoverage", label: "Flood Coverage" },
    { key: "windCoverage", label: "Wind Coverage" },
    { key: "sewerBackup", label: "Sewer Backup" },
  ];

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Field label="Carrier" value={ins.carrier} />
        <Field label="Policy Start" value={fmtDate(ins.policyPeriodStart)} />
        <Field label="Policy End" value={fmtDate(ins.policyPeriodEnd)} />
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Coverage Limits</p>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Property Coverage" value={fmt$(ins.propertyCoverageLimit)} />
          <Field label="Business Interruption" value={fmt$(ins.biLimit)} />
          <Field label="Extra Expense" value={fmt$(ins.extraExpenseLimit)} />
          <Field label="General Liability" value={fmt$(ins.liabilityLimit)} />
          <Field label="Umbrella" value={fmt$(ins.umbrellaLimit)} />
          <Field label="Deductible" value={fmt$(ins.deductible)} />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">BI Parameters</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Field label="Waiting Period" value={ins.biWaitingPeriod ? `${ins.biWaitingPeriod} days` : "—"} />
          <Field label="Restoration Period" value={ins.biRestorationPeriod ? `${ins.biRestorationPeriod} months` : "—"} />
          <Field label="Coinsurance" value={fmtPct(ins.coinsurancePercent)} />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Additional Coverages</p>
        <div className="flex flex-wrap gap-2">
          {coverages.map(({ key, label }) => {
            const val = ins[key];
            const hasIt = val && val !== "no" && val !== "";
            return (
              <span
                key={key}
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                  hasIt ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                }`}
              >
                {hasIt ? "✓ " : ""}{label}
              </span>
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
      <div className="rounded-xl border-2 border-dashed border-gray-200 px-6 py-8 text-center">
        <p className="text-sm font-medium text-gray-400">No claims on record</p>
      </div>
    );
  }

  const totalPaid = claims.reduce((sum, c) => sum + (parseFloat(c.amountPaid) || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">{claims.length} claim{claims.length !== 1 ? "s" : ""} on record</p>
        {totalPaid > 0 && (
          <p className="text-sm font-bold text-red-700">Total Paid: {fmt$(totalPaid)}</p>
        )}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Year</th>
              <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Type</th>
              <th className="pb-2 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Cause</th>
              <th className="pb-2 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">Paid</th>
              <th className="pb-2 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((c, i) => (
              <tr key={c.id || i} className="border-b border-gray-100 last:border-0">
                <td className="py-2.5 font-medium text-gray-900">{c.year || "—"}</td>
                <td className="py-2.5 text-gray-700">{capitalize(c.type)}</td>
                <td className="py-2.5 text-gray-700">{capitalize(c.cause)}</td>
                <td className="py-2.5 text-right font-mono text-gray-900">{fmt$(c.amountPaid)}</td>
                <td className="py-2.5 text-center">
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                    c.status === "closed" ? "bg-gray-100 text-gray-600" :
                    c.status === "open" ? "bg-amber-100 text-amber-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {capitalize(c.status) || "—"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function OperationalRiskSection({ data }) {
  if (!data) return <p className="text-sm text-gray-400">No data entered yet.</p>;

  const items = [
    { key: "roofLeaks", label: "Roof Leaks" },
    { key: "hvacIssues", label: "HVAC Issues" },
    { key: "plumbingIssues", label: "Plumbing Issues" },
    { key: "electricalIssues", label: "Electrical Issues" },
    { key: "moldMoistureHistory", label: "Mold / Moisture" },
    { key: "deferredMaintenance", label: "Deferred Maintenance" },
    { key: "inspectionDeficiencies", label: "Inspection Deficiencies" },
  ];

  const issueCount = items.filter(({ key }) => data[key] === "yes").length;
  const allClear = issueCount === 0 && items.every(({ key }) => data[key]);

  return (
    <div className="space-y-3">
      {allClear && (
        <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-2.5">
          <p className="text-sm font-semibold text-green-700">All systems — no issues reported</p>
        </div>
      )}
      {issueCount > 0 && (
        <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5">
          <p className="text-sm font-semibold text-red-700">{issueCount} issue{issueCount !== 1 ? "s" : ""} flagged</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {items.map(({ key, label }) => {
          const val = data[key];
          const hasIssue = val === "yes";
          const noIssue = val === "no";
          return (
            <div
              key={key}
              className={`flex items-center justify-between rounded-lg border-2 px-4 py-3 ${
                hasIssue ? "border-red-200 bg-red-50" :
                noIssue ? "border-green-200 bg-green-50" :
                "border-gray-200 bg-gray-50"
              }`}
            >
              <span className="text-sm font-medium text-gray-800">{label}</span>
              <span className={`text-xs font-bold ${
                hasIssue ? "text-red-600" :
                noIssue ? "text-green-600" :
                "text-gray-400"
              }`}>
                {hasIssue ? "ISSUE" : noIssue ? "CLEAR" : "—"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LocationSection({ data }) {
  if (!data) return <p className="text-sm text-gray-400">No data entered yet.</p>;
  const loc = data;

  const hazards = [
    { key: "floodZone", label: "Flood Zone", format: (v) => v?.toUpperCase() },
    { key: "coastalWindExposure", label: "Coastal Wind" },
    { key: "wildfireExposure", label: "Wildfire" },
    { key: "freezeExposure", label: "Freeze" },
    { key: "stormHailExposure", label: "Storm / Hail" },
  ];

  const conditions = [
    { key: "crimeLevel", label: "Crime Level" },
    { key: "utilityInterruption", label: "Utility Risk" },
    { key: "contractorScarcity", label: "Contractor Scarcity" },
    { key: "litigationEnvironment", label: "Litigation Env." },
  ];

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Natural Hazards</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {hazards.map(({ key, label, format }) => {
            const raw = loc[key];
            const display = format ? format(raw) : capitalize(raw);
            return (
              <div key={key} className="flex flex-col gap-1">
                <p className="text-xs text-gray-500">{label}</p>
                <Badge value={display || raw} type="risk" />
              </div>
            );
          })}
        </div>
      </div>
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Local Conditions</p>
        <div className="grid grid-cols-2 gap-2">
          {conditions.map(({ key, label }) => (
            <div key={key} className="flex flex-col gap-1">
              <p className="text-xs text-gray-500">{label}</p>
              <Badge value={loc[key]} type="risk" />
            </div>
          ))}
        </div>
      </div>
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
    <div className="rounded-2xl border-2 border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-bold text-gray-900">Data Completeness</p>
        <span className={`text-sm font-bold ${pct === 100 ? "text-green-600" : "text-hrip-navy"}`}>
          {done} / {sections.length} sections &mdash; {pct}%
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-gray-100 overflow-hidden">
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
              className={`text-xs rounded-full px-2.5 py-1 font-semibold ${
                complete ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
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

export default function InputSummaryDashboard() {
  const [hotelData, setHotelData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem("hotelRiskAnalysis") || localStorage.getItem("hotelRiskIntake");
    if (raw) {
      try {
        setHotelData(JSON.parse(raw));
        setIsDemo(false);
      } catch {
        setHotelData(DEMO_DATA);
        setIsDemo(true);
      }
    } else {
      // No real data — show demo data by default
      setHotelData(DEMO_DATA);
      setIsDemo(true);
    }
    setLoaded(true);
  }, []);

  const loadDemo = () => {
    localStorage.setItem("hotelRiskAnalysis", JSON.stringify(DEMO_DATA));
    setHotelData(DEMO_DATA);
  };

  const clearData = () => {
    localStorage.removeItem("hotelRiskAnalysis");
    localStorage.removeItem("hotelRiskIntake");
    setHotelData(null);
  };

  const hotelName = hotelData?.hotelProfile?.hotelName || "Your Hotel";
  const city = hotelData?.hotelProfile?.city;
  const state = hotelData?.hotelProfile?.state;
  const location = city && state ? `${city}, ${state}` : null;

  const sections = [
    {
      key: "hotelProfile",
      title: "Hotel Profile",
      color: "bg-gradient-to-r from-hrip-navy to-blue-700",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      render: (d) => <HotelProfileSection data={d} />,
    },
    {
      key: "financialExposure",
      title: "Financial Exposure",
      color: "bg-gradient-to-r from-emerald-700 to-emerald-500",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      render: (d) => <FinancialSection data={d} />,
    },
    {
      key: "insurancePolicy",
      title: "Insurance Coverage",
      color: "bg-gradient-to-r from-violet-700 to-violet-500",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      render: (d) => <InsuranceSection data={d} />,
    },
    {
      key: "lossHistory",
      title: "Loss History",
      color: "bg-gradient-to-r from-rose-700 to-rose-500",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      render: (d) => <LossHistorySection data={d} />,
    },
    {
      key: "operationalRisk",
      title: "Operational Risk",
      color: "bg-gradient-to-r from-amber-600 to-amber-400",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      render: (d) => <OperationalRiskSection data={d} />,
    },
    {
      key: "locationHazard",
      title: "Location & Hazards",
      color: "bg-gradient-to-r from-cyan-700 to-cyan-500",
      icon: (
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      render: (d) => <LocationSection data={d} />,
    },
  ];

  // ── Loading ──────────────────────────────────────────────────────────────
  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-hrip-navy" />
      </div>
    );
  }

  // ── Empty state ──────────────────────────────────────────────────────────
  if (!hotelData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Nav hotelName={null} location={null} />
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-hrip-navy to-hrip-blue">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">No Data Found</h2>
          <p className="text-gray-600 mb-8">
            Complete the intake form to populate your dashboard, or load demo data to preview the layout.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/intake"
              className="inline-flex items-center gap-2 rounded-xl bg-hrip-navy px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-800 transition-all"
            >
              Start Intake Form
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <button
              onClick={loadDemo}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-hrip-navy px-8 py-4 text-base font-semibold text-hrip-navy hover:bg-hrip-navy hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Load Demo Data
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Full dashboard ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50">
      <Nav hotelName={hotelName} location={location} />

      <div className="mx-auto max-w-6xl px-6 py-10 space-y-6">
        {/* Completeness bar */}
        <CompletenessBar data={hotelData} />

        {/* Action bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-900">{hotelName}</h1>
              {isDemo && (
                <span className="rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-xs font-bold text-amber-700">
                  DEMO
                </span>
              )}
            </div>
            {location && <p className="text-sm text-gray-500">{location}</p>}
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={loadDemo}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-gray-400 hover:text-gray-900 transition-all"
              title="Overwrite with demo data"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Demo Data
            </button>
            <button
              onClick={clearData}
              className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:border-red-300 hover:text-red-600 transition-all"
              title="Clear all data"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Clear
            </button>
            <Link
              href="/intake"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-hrip-navy px-4 py-2 text-sm font-semibold text-hrip-navy hover:bg-hrip-navy hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Data
            </Link>
            <Link
              href="/report"
              className="inline-flex items-center gap-2 rounded-lg bg-hrip-navy px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              View Risk Report
            </Link>
          </div>
        </div>

        {/* Section cards — 2-column layout on wide screens */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sections.map(({ key, title, color, icon, render }) => (
            <SectionCard key={key} title={title} color={color} icon={icon}>
              {render(hotelData[key])}
            </SectionCard>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function Nav({ hotelName, location }) {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-hrip-navy to-hrip-blue">
              <span className="text-sm font-bold tracking-tight text-white">HR</span>
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-gray-900">Hotel Risk Pro</p>
              {hotelName && location && (
                <p className="text-xs text-gray-500">{hotelName} &mdash; {location}</p>
              )}
              {hotelName && !location && (
                <p className="text-xs text-gray-500">{hotelName}</p>
              )}
            </div>
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/dashboard" className="text-hrip-navy font-semibold border-b-2 border-hrip-navy pb-0.5">
            Dashboard
          </Link>
          <Link href="/report" className="text-gray-600 hover:text-hrip-navy transition-colors">
            Report
          </Link>
          <Link href="/intake" className="rounded-lg border-2 border-gray-300 px-3 py-1.5 text-sm font-semibold text-gray-900 hover:border-hrip-navy hover:bg-gray-50 transition-all">
            Edit Intake
          </Link>
        </nav>
      </div>
    </header>
  );
}
