import { useState } from "react";

export default function OperationalRisk({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    roofLeaks: data?.roofLeaks || "",
    hvacIssues: data?.hvacIssues || "",
    plumbingIssues: data?.plumbingIssues || "",
    electricalIssues: data?.electricalIssues || "",
    moldMoistureHistory: data?.moldMoistureHistory || "",
    deferredMaintenance: data?.deferredMaintenance || "",
    inspectionDeficiencies: data?.inspectionDeficiencies || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const riskItems = [
    { id: "roofLeaks", label: "Prior Roof Leaks" },
    { id: "hvacIssues", label: "HVAC Age or Issues" },
    { id: "plumbingIssues", label: "Plumbing Age or Issues" },
    { id: "electricalIssues", label: "Electrical System Issues" },
    { id: "moldMoistureHistory", label: "Mold or Moisture History" },
    { id: "deferredMaintenance", label: "Deferred Maintenance Items" },
    { id: "inspectionDeficiencies", label: "Inspection Deficiencies" },
  ];

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Tell Us About Current Property and Operations Risk
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Property conditions that could increase loss severity or affect coverage.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {riskItems.map((item) => (
          <div key={item.id} className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6">
            <label className="block text-base font-semibold text-gray-900 mb-4">
              {item.label}
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleChange(item.id, "no")}
                className={`flex-1 rounded-lg border-2 px-6 py-3 text-base font-semibold transition-all ${
                  formData[item.id] === "no"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                No Issue
              </button>
              <button
                type="button"
                onClick={() => handleChange(item.id, "yes")}
                className={`flex-1 rounded-lg border-2 px-6 py-3 text-base font-semibold transition-all ${
                  formData[item.id] === "yes"
                    ? "border-red-500 bg-red-50 text-red-700"
                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                Issue Present
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between pt-8 border-t-2 border-gray-200">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-base font-semibold text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-lg bg-hrip-navy px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-blue-800 transition-all hover:shadow-xl"
        >
          Continue
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
