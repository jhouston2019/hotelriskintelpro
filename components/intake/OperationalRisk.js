import { useState } from "react";

export default function OperationalRisk({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    maintenanceIssues: data?.maintenanceIssues || "",
    roofLeaks: data?.roofLeaks || "",
    hvacIssues: data?.hvacIssues || "",
    plumbingIssues: data?.plumbingIssues || "",
    electricalIssues: data?.electricalIssues || "",
    moldMoistureHistory: data?.moldMoistureHistory || "",
    securityIncidents: data?.securityIncidents || "",
    slipFallFrequency: data?.slipFallFrequency || "",
    crimeConcerns: data?.crimeConcerns || "",
    deferredMaintenance: data?.deferredMaintenance || "",
    inspectionDeficiencies: data?.inspectionDeficiencies || "",
    complianceIssues: data?.complianceIssues || "",
    completedMitigation: data?.completedMitigation || "",
    unresolvedNeeds: data?.unresolvedNeeds || "",
  });

  const [expandedSections, setExpandedSections] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const riskItems = [
    {
      id: "roofLeaks",
      label: "Prior Roof Leaks",
      detail: "roofLeaksDetail",
      detailLabel: "Describe the roof leak history",
    },
    {
      id: "hvacIssues",
      label: "HVAC Age or Issues",
      detail: "hvacIssuesDetail",
      detailLabel: "Describe HVAC concerns",
    },
    {
      id: "plumbingIssues",
      label: "Plumbing Age or Issues",
      detail: "plumbingIssuesDetail",
      detailLabel: "Describe plumbing concerns",
    },
    {
      id: "electricalIssues",
      label: "Electrical System Issues",
      detail: "electricalIssuesDetail",
      detailLabel: "Describe electrical concerns",
    },
    {
      id: "moldMoistureHistory",
      label: "Mold or Moisture History",
      detail: "moldMoistureDetail",
      detailLabel: "Describe mold/moisture issues",
    },
    {
      id: "securityIncidents",
      label: "Security Incidents",
      detail: "securityIncidentsDetail",
      detailLabel: "Describe security concerns",
    },
    {
      id: "slipFallFrequency",
      label: "Slip and Fall Frequency",
      detail: "slipFallDetail",
      detailLabel: "Describe slip/fall patterns",
    },
    {
      id: "crimeConcerns",
      label: "Crime or Security Concerns",
      detail: "crimeDetail",
      detailLabel: "Describe crime/security issues",
    },
    {
      id: "deferredMaintenance",
      label: "Deferred Maintenance Items",
      detail: "deferredMaintenanceDetail",
      detailLabel: "List deferred maintenance",
    },
    {
      id: "inspectionDeficiencies",
      label: "Inspection Deficiencies",
      detail: "inspectionDeficienciesDetail",
      detailLabel: "Describe inspection findings",
    },
    {
      id: "complianceIssues",
      label: "Code Compliance Issues",
      detail: "complianceIssuesDetail",
      detailLabel: "Describe compliance gaps",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-800 bg-slate-950/80 p-8">
      <h2 className="text-2xl font-semibold text-slate-100">
        Tell Us About Current Property and Operations Risk
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Known issues and maintenance concerns that may increase loss risk or affect insurability.
      </p>

      <div className="mt-8 space-y-3">
        {riskItems.map((item) => (
          <div key={item.id} className="rounded-lg border border-slate-800 bg-slate-900/50">
            <div className="flex items-center justify-between p-4">
              <label className="flex items-center gap-3 flex-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData[item.id] === "yes"}
                  onChange={(e) => {
                    handleChange(item.id, e.target.checked ? "yes" : "no");
                    if (e.target.checked) {
                      toggleSection(item.id);
                    }
                  }}
                  className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-hrip-gold focus:ring-hrip-gold focus:ring-offset-slate-950"
                />
                <span className="text-sm text-slate-300">{item.label}</span>
              </label>
              {formData[item.id] === "yes" && (
                <button
                  type="button"
                  onClick={() => toggleSection(item.id)}
                  className="text-xs text-slate-500 hover:text-slate-400"
                >
                  {expandedSections[item.id] ? "Hide" : "Add Details"}
                </button>
              )}
            </div>
            {formData[item.id] === "yes" && expandedSections[item.id] && (
              <div className="border-t border-slate-800 p-4">
                <label className="block text-xs font-medium text-slate-300">
                  {item.detailLabel}
                </label>
                <textarea
                  value={formData[item.detail] || ""}
                  onChange={(e) => handleChange(item.detail, e.target.value)}
                  rows={3}
                  className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="Provide details..."
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mitigation */}
      <div className="mt-8 pt-6 border-t border-slate-800">
        <h3 className="text-sm font-semibold text-slate-200">Mitigation Projects</h3>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Completed Mitigation Projects <span className="text-slate-500">(optional)</span>
            </label>
            <textarea
              value={formData.completedMitigation}
              onChange={(e) => handleChange("completedMitigation", e.target.value)}
              rows={2}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              placeholder="e.g., New roof 2023, HVAC upgrade 2024"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Unresolved Mitigation Needs <span className="text-slate-500">(optional)</span>
            </label>
            <textarea
              value={formData.unresolvedNeeds}
              onChange={(e) => handleChange("unresolvedNeeds", e.target.value)}
              rows={2}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              placeholder="e.g., Parking lot drainage, elevator modernization"
            />
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between pt-6 border-t border-slate-800">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-slate-400 hover:text-slate-300"
        >
          ← Back
        </button>
        <button
          type="submit"
          className="rounded-md bg-hrip-gold px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-500/30 transition hover:bg-amber-300"
        >
          Continue
        </button>
      </div>
    </form>
  );
}
