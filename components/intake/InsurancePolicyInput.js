import { useState } from "react";

export default function InsurancePolicyInput({ data, onNext, onBack }) {
  const [formData, setFormData] = useState({
    carrier: data?.carrier || "",
    policyPeriodStart: data?.policyPeriodStart || "",
    policyPeriodEnd: data?.policyPeriodEnd || "",
    propertyCoverageLimit: data?.propertyCoverageLimit || "",
    biLimit: data?.biLimit || "",
    extraExpenseLimit: data?.extraExpenseLimit || "",
    liabilityLimit: data?.liabilityLimit || "",
    umbrellaLimit: data?.umbrellaLimit || "",
    deductible: data?.deductible || "",
    biWaitingPeriod: data?.biWaitingPeriod || "",
    biRestorationPeriod: data?.biRestorationPeriod || "",
    coinsurancePercent: data?.coinsurancePercent || "",
    ordinanceLawCoverage: data?.ordinanceLawCoverage || "",
    equipmentBreakdown: data?.equipmentBreakdown || "",
    floodCoverage: data?.floodCoverage || "",
    windCoverage: data?.windCoverage || "",
    sewerBackup: data?.sewerBackup || "",
  });

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-800 bg-slate-950/80 p-8">
      <h2 className="text-2xl font-semibold text-slate-100">
        Upload and Review Your Insurance Coverage
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Upload your policy documents or enter coverage details manually.
      </p>

      {/* File Upload */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-slate-300">
          Policy Documents
        </label>
        <p className="mt-1 text-xs text-slate-400">
          Upload your policy PDF and declarations page. We&apos;ll extract coverage details automatically.
        </p>
        <div className="mt-3">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-900 hover:border-slate-600 transition">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-1 text-sm text-slate-400">
                <span className="font-medium">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500">PDF files only</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".pdf"
              multiple
              onChange={handleFileUpload}
            />
          </label>
          {uploadedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {uploadedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 rounded px-3 py-2">
                  <svg className="w-4 h-4 text-hrip-gold" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span>{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Policy Information */}
      <div className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-300">
              Insurance Carrier
            </label>
            <input
              type="text"
              required
              value={formData.carrier}
              onChange={(e) => handleChange("carrier", e.target.value)}
              className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              placeholder="e.g., Travelers"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Policy Start
              </label>
              <input
                type="date"
                required
                value={formData.policyPeriodStart}
                onChange={(e) => handleChange("policyPeriodStart", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Policy End
              </label>
              <input
                type="date"
                required
                value={formData.policyPeriodEnd}
                onChange={(e) => handleChange("policyPeriodEnd", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
              />
            </div>
          </div>
        </div>

        {/* Coverage Limits */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Coverage Limits</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Property Coverage Limit
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.propertyCoverageLimit}
                  onChange={(e) => handleChange("propertyCoverageLimit", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 14000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Business Interruption Limit
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.biLimit}
                  onChange={(e) => handleChange("biLimit", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 4000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Extra Expense Limit
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  value={formData.extraExpenseLimit}
                  onChange={(e) => handleChange("extraExpenseLimit", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 500000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                General Liability Limit
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.liabilityLimit}
                  onChange={(e) => handleChange("liabilityLimit", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 2000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Umbrella Limit <span className="text-slate-500">(if applicable)</span>
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  value={formData.umbrellaLimit}
                  onChange={(e) => handleChange("umbrellaLimit", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 5000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Deductible
              </label>
              <div className="relative mt-2">
                <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.deductible}
                  onChange={(e) => handleChange("deductible", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 25000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BI Terms */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Business Interruption Terms</h3>
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Waiting Period (days)
              </label>
              <input
                type="number"
                required
                value={formData.biWaitingPeriod}
                onChange={(e) => handleChange("biWaitingPeriod", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                placeholder="e.g., 72"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Restoration Period (months)
              </label>
              <input
                type="number"
                required
                value={formData.biRestorationPeriod}
                onChange={(e) => handleChange("biRestorationPeriod", e.target.value)}
                className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                placeholder="e.g., 12"
              />
              <p className="mt-1 text-xs text-slate-500">
                Maximum months of BI coverage
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300">
                Coinsurance %
              </label>
              <div className="relative mt-2">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={formData.coinsurancePercent}
                  onChange={(e) => handleChange("coinsurancePercent", e.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 80"
                />
                <span className="absolute right-3 top-2 text-sm text-slate-500">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Coverages */}
        <div className="pt-6 border-t border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200">Additional Coverages</h3>
          <div className="mt-4 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Ordinance or Law Coverage
                </label>
                <select
                  value={formData.ordinanceLawCoverage}
                  onChange={(e) => handleChange("ordinanceLawCoverage", e.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                >
                  <option value="">Select...</option>
                  <option value="none">None</option>
                  <option value="included">Included</option>
                  <option value="limited">Limited</option>
                  <option value="unknown">I don&apos;t know</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Equipment Breakdown
                </label>
                <select
                  value={formData.equipmentBreakdown}
                  onChange={(e) => handleChange("equipmentBreakdown", e.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unknown">I don&apos;t know</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Flood Coverage
                </label>
                <select
                  value={formData.floodCoverage}
                  onChange={(e) => handleChange("floodCoverage", e.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="separate">Separate NFIP policy</option>
                  <option value="unknown">I don&apos;t know</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Wind Coverage
                </label>
                <select
                  value={formData.windCoverage}
                  onChange={(e) => handleChange("windCoverage", e.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                >
                  <option value="">Select...</option>
                  <option value="included">Included</option>
                  <option value="excluded">Excluded</option>
                  <option value="separate">Separate wind policy</option>
                  <option value="unknown">I don&apos;t know</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300">
                  Sewer / Water Backup
                </label>
                <select
                  value={formData.sewerBackup}
                  onChange={(e) => handleChange("sewerBackup", e.target.value)}
                  className="mt-2 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                >
                  <option value="">Select...</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="unknown">I don&apos;t know</option>
                </select>
              </div>
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
