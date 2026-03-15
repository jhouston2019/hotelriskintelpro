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
  const [isParsing, setIsParsing] = useState(false);
  const [parsedFields, setParsedFields] = useState(new Set());

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ ...formData, uploadedFiles });
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Remove from parsed fields if manually edited
    if (parsedFields.has(field)) {
      setParsedFields(prev => {
        const next = new Set(prev);
        next.delete(field);
        return next;
      });
    }
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files);
    
    // Trigger parsing
    if (files.length > 0) {
      setIsParsing(true);
      
      try {
        // TODO: Call actual parsing API when backend is ready
        // const formData = new FormData()
        // files.forEach(file => formData.append('documents', file))
        // const response = await fetch('/api/parse/policy', {
        //   method: 'POST',
        //   body: formData
        // })
        // const parsed = await response.json()
        
        // Simulate parsing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock parsed data
        const mockParsed = {
          carrier: 'Travelers',
          propertyCoverageLimit: '15000000',
          biLimit: '6000000',
          liabilityLimit: '2000000',
          deductible: '50000',
        };
        
        // Update form with parsed values (only for empty fields)
        const fieldsUpdated = new Set();
        Object.keys(mockParsed).forEach(key => {
          if (!formData[key]) {
            setFormData(prev => ({ ...prev, [key]: mockParsed[key] }));
            fieldsUpdated.add(key);
          }
        });
        
        setParsedFields(fieldsUpdated);
        
      } catch (error) {
        console.error('Parsing failed:', error);
        alert('Could not parse document. Please enter details manually.');
      } finally {
        setIsParsing(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-hrip-navy to-hrip-blue flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Upload and Review Your Insurance Coverage
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Upload your policy documents or enter coverage details manually.
          </p>
        </div>
      </div>

      {/* File Upload */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Policy Documents
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Upload your policy PDF and declarations page. We'll extract coverage details automatically.
        </p>
        <label className="flex flex-col items-center justify-center w-full h-40 border-3 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-hrip-navy transition-all">
          <div className="flex flex-col items-center justify-center">
            <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="mb-1 text-base font-semibold text-gray-900">
              Click to upload or drag and drop
            </p>
            <p className="text-sm text-gray-600">PDF files only</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept=".pdf"
            multiple
            onChange={handleFileUpload}
          />
        </label>
        {isParsing && (
          <div className="mt-4 flex items-center gap-3 bg-blue-50 border-2 border-blue-200 rounded-lg px-4 py-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-hrip-navy"></div>
            <span className="text-sm font-medium text-gray-900">Extracting policy details...</span>
          </div>
        )}
        {uploadedFiles.length > 0 && !isParsing && (
          <div className="mt-4 space-y-2">
            {uploadedFiles.map((file, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-green-50 border-2 border-green-200 rounded-lg px-4 py-3">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-gray-900">{file.name}</span>
                <span className="ml-auto text-xs font-medium text-green-700">Parsed</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Policy Information */}
      <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Insurance Carrier <span className="text-red-600">*</span>
              {parsedFields.has('carrier') && (
                <span className="ml-2 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded">
                  Parsed from document
                </span>
              )}
            </label>
            <input
              type="text"
              required
              value={formData.carrier}
              onChange={(e) => handleChange("carrier", e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              placeholder="e.g., Travelers, Hartford"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Policy Start <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.policyPeriodStart}
                onChange={(e) => handleChange("policyPeriodStart", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Policy End <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                required
                value={formData.policyPeriodEnd}
                onChange={(e) => handleChange("policyPeriodEnd", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Coverage Limits */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Coverage Limits</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Property Coverage Limit <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.propertyCoverageLimit}
                  onChange={(e) => handleChange("propertyCoverageLimit", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 14000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Business Interruption Limit <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.biLimit}
                  onChange={(e) => handleChange("biLimit", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 5000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Liability Limit <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.liabilityLimit}
                  onChange={(e) => handleChange("liabilityLimit", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 2000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Deductible <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  required
                  value={formData.deductible}
                  onChange={(e) => handleChange("deductible", e.target.value)}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 50000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* BI Details */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Business Interruption Details</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                BI Waiting Period (days)
              </label>
              <input
                type="number"
                value={formData.biWaitingPeriod}
                onChange={(e) => handleChange("biWaitingPeriod", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                placeholder="e.g., 72"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                BI Restoration Period (months)
              </label>
              <input
                type="number"
                value={formData.biRestorationPeriod}
                onChange={(e) => handleChange("biRestorationPeriod", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                placeholder="e.g., 12"
              />
            </div>
          </div>
        </div>

        {/* Additional Coverages */}
        <div className="pt-8 border-t-2 border-gray-200">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Additional Coverages</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Flood Coverage
              </label>
              <select
                value={formData.floodCoverage}
                onChange={(e) => handleChange("floodCoverage", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="separate">Separate NFIP policy</option>
              </select>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Wind Coverage
              </label>
              <select
                value={formData.windCoverage}
                onChange={(e) => handleChange("windCoverage", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="separate">Separate wind policy</option>
              </select>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Equipment Breakdown
              </label>
              <select
                value={formData.equipmentBreakdown}
                onChange={(e) => handleChange("equipmentBreakdown", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Ordinance or Law Coverage
              </label>
              <select
                value={formData.ordinanceLawCoverage}
                onChange={(e) => handleChange("ordinanceLawCoverage", e.target.value)}
                className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
              >
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="unknown">Not sure</option>
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
