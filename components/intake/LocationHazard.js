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
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-800 bg-slate-950/80 p-8">
      <h2 className="text-2xl font-semibold text-slate-100">
        Tell Us About Local Risk Conditions
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Location-specific hazards that may affect loss severity and recovery time.
      </p>

      {/* Natural Hazards */}
      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Flood Zone
            </label>
            <select
              required
              value={formData.floodZone}
              onChange={(e) => handleChange("floodZone", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
            >
              <option value="">Select...</option>
              <option value="none">Not in flood zone</option>
              <option value="x">Zone X (minimal risk)</option>
              <option value="a">Zone A (high risk)</option>
              <option value="ae">Zone AE (high risk with BFE)</option>
              <option value="v">Zone V (coastal high risk)</option>
              <option value="unknown">I don&apos;t know</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Coastal / Wind Exposure
            </label>
            <select
              required
              value={formData.coastalWindExposure}
              onChange={(e) => handleChange("coastalWindExposure", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
            >
              <option value="">Select...</option>
              <option value="none">No coastal exposure</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High (hurricane zone)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Wildfire Exposure
            </label>
            <select
              required
              value={formData.wildfireExposure}
              onChange={(e) => handleChange("wildfireExposure", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
            >
              <option value="">Select...</option>
              <option value="none">No wildfire risk</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Freeze Exposure
            </label>
            <select
              required
              value={formData.freezeExposure}
              onChange={(e) => handleChange("freezeExposure", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
            >
              <option value="">Select...</option>
              <option value="none">Rarely freezes</option>
              <option value="occasional">Occasional freezing</option>
              <option value="frequent">Frequent hard freezes</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Storm / Hail Exposure
            </label>
            <select
              required
              value={formData.stormHailExposure}
              onChange={(e) => handleChange("stormHailExposure", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
            >
              <option value="">Select...</option>
              <option value="low">Low</option>
              <option value="moderate">Moderate</option>
              <option value="high">High (tornado alley, hail belt)</option>
            </select>
          </div>
        </div>

        {/* Operational Environment */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Operational Environment</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Local Crime Level
              </label>
              <select
                required
                value={formData.crimeLevel}
                onChange={(e) => handleChange("crimeLevel", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              >
                <option value="">Select...</option>
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Utility Interruption Concerns
              </label>
              <select
                required
                value={formData.utilityInterruption}
                onChange={(e) => handleChange("utilityInterruption", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              >
                <option value="">Select...</option>
                <option value="low">Rare outages</option>
                <option value="moderate">Occasional outages</option>
                <option value="high">Frequent outages</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Contractor Scarcity / Rebuild Difficulty
              </label>
              <select
                required
                value={formData.contractorScarcity}
                onChange={(e) => handleChange("contractorScarcity", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              >
                <option value="">Select...</option>
                <option value="low">Easy to rebuild</option>
                <option value="moderate">Moderate difficulty</option>
                <option value="high">High difficulty (remote, limited contractors)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Local Litigation Sensitivity
              </label>
              <select
                required
                value={formData.litigationEnvironment}
                onChange={(e) => handleChange("litigationEnvironment", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              >
                <option value="">Select...</option>
                <option value="low">Low litigation environment</option>
                <option value="moderate">Moderate</option>
                <option value="high">High (plaintiff-friendly jurisdiction)</option>
              </select>
            </div>
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
