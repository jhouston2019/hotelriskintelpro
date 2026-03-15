import { useState } from "react";

export default function LocationHazard({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    floodZone: data?.floodZone || "",
    coastalWindExposure: data?.coastalWindExposure || "",
    wildfireExposure: data?.wildfireExposure || "",
    freezeExposure: data?.freezeExposure || "",
    stormHailExposure: data?.stormHailExposure || "",
    crimeLevel: data?.crimeLevel || "",
    utilityInterruption: data?.utilityInterruption || "",
    contractorScarcity: data?.contractorScarcity || "",
    litigationEnvironment: data?.litigationEnvironment || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Tell Us About Local Risk Conditions
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Location-specific hazards that may affect loss severity and recovery time.
          </p>
        </div>
      </div>

      {/* Natural Hazards */}
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Natural Hazards</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Flood Zone <span className="text-red-600">*</span>
              </label>
              <select
                required
                value={formData.floodZone}
                onChange={(e) => handleChange("floodZone", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="none">Not in flood zone</option>
                <option value="x">Zone X (minimal risk)</option>
                <option value="a">Zone A (high risk)</option>
                <option value="ae">Zone AE (high risk with BFE)</option>
                <option value="v">Zone V (coastal high risk)</option>
                <option value="unknown">I don't know</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Coastal / Wind Exposure
              </label>
              <select
                value={formData.coastalWindExposure}
                onChange={(e) => handleChange("coastalWindExposure", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="none">No exposure</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Wildfire Exposure
              </label>
              <select
                value={formData.wildfireExposure}
                onChange={(e) => handleChange("wildfireExposure", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="none">No exposure</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Storm / Hail Exposure
              </label>
              <select
                value={formData.stormHailExposure}
                onChange={(e) => handleChange("stormHailExposure", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        </div>

        {/* Local Conditions */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Local Conditions</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Crime Level
              </label>
              <select
                value={formData.crimeLevel}
                onChange={(e) => handleChange("crimeLevel", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Contractor Scarcity / Rebuild Difficulty
              </label>
              <select
                value={formData.contractorScarcity}
                onChange={(e) => handleChange("contractorScarcity", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="low">Low - Contractors readily available</option>
                <option value="moderate">Moderate</option>
                <option value="high">High - Limited contractor availability</option>
              </select>
            </div>
          </div>
        </div>
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
