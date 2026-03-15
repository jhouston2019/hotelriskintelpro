import { useState } from "react";

export default function LossHistory({ data, onNext, onBack }) {
  const [claims, setClaims] = useState(data?.claims || []);
  const [showAddClaim, setShowAddClaim] = useState(false);
  const [newClaim, setNewClaim] = useState({
    year: "",
    date: "",
    type: "",
    cause: "",
    amountPaid: "",
    reserveAmount: "",
    status: "",
    areaAffected: "",
    notes: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext({ claims });
  };

  const handleAddClaim = () => {
    if (!newClaim.year || !newClaim.type || !newClaim.cause) {
      alert("Please fill in required claim fields");
      return;
    }
    setClaims([...claims, { ...newClaim, id: Date.now() }]);
    setNewClaim({
      year: "",
      date: "",
      type: "",
      cause: "",
      amountPaid: "",
      reserveAmount: "",
      status: "",
      areaAffected: "",
      notes: "",
    });
    setShowAddClaim(false);
  };

  const handleRemoveClaim = (id) => {
    setClaims(claims.filter((c) => c.id !== id));
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
            Tell Us About Past Claims and Losses
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Past claims can affect renewals, premiums, exclusions, and future insurability.
          </p>
        </div>
      </div>

      {/* Upload Loss Runs */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-900 mb-2">
          Upload Loss Runs <span className="text-sm text-gray-500">(optional)</span>
        </label>
        <p className="text-sm text-gray-600 mb-4">
          Upload your 5-year loss run document. We'll extract claim details automatically.
        </p>
        <label className="flex flex-col items-center justify-center w-full h-32 border-3 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-hrip-navy transition-all">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-base font-semibold text-gray-700">Upload loss run document</span>
          </div>
          <input type="file" className="hidden" accept=".pdf,.xlsx,.csv" />
        </label>
      </div>

      {/* Manual Claims Entry */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Claims History</h3>
          <button
            type="button"
            onClick={() => setShowAddClaim(!showAddClaim)}
            className="inline-flex items-center gap-2 rounded-lg border-2 border-hrip-navy bg-hrip-navy px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Claim
          </button>
        </div>

        {/* Existing Claims */}
        {claims.length > 0 && (
          <div className="space-y-4">
            {claims.map((claim) => (
              <div key={claim.id} className="rounded-xl border-2 border-gray-200 bg-gray-50 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-base font-bold text-gray-900">{claim.type} - {claim.year}</p>
                    <p className="text-sm text-gray-700 mt-1">{claim.cause}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveClaim(claim.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {claim.amountPaid && (
                    <div>
                      <span className="text-gray-600">Amount Paid:</span>
                      <span className="ml-2 font-semibold text-gray-900">${parseInt(claim.amountPaid).toLocaleString()}</span>
                    </div>
                  )}
                  {claim.status && (
                    <div>
                      <span className="text-gray-600">Status:</span>
                      <span className="ml-2 font-semibold text-gray-900">{claim.status}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Claim Form */}
        {showAddClaim && (
          <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-6">Add New Claim</h4>
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Claim Year <span className="text-red-600">*</span>
                </label>
                <input
                  type="number"
                  value={newClaim.year}
                  onChange={(e) => setNewClaim({ ...newClaim, year: e.target.value })}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 2023"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Claim Type <span className="text-red-600">*</span>
                </label>
                <select
                  value={newClaim.type}
                  onChange={(e) => setNewClaim({ ...newClaim, type: e.target.value })}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                >
                  <option value="">Select...</option>
                  <option value="Property">Property</option>
                  <option value="Liability">Liability</option>
                  <option value="Water">Water</option>
                  <option value="Fire">Fire</option>
                  <option value="Wind">Wind</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Cause of Loss <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  value={newClaim.cause}
                  onChange={(e) => setNewClaim({ ...newClaim, cause: e.target.value })}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., Roof leak"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Amount Paid
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                  <input
                    type="number"
                    value={newClaim.amountPaid}
                    onChange={(e) => setNewClaim({ ...newClaim, amountPaid: e.target.value })}
                    className="w-full rounded-lg border-2 border-gray-300 bg-white pl-10 pr-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                    placeholder="e.g., 45000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Status
                </label>
                <select
                  value={newClaim.status}
                  onChange={(e) => setNewClaim({ ...newClaim, status: e.target.value })}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                >
                  <option value="">Select...</option>
                  <option value="Closed">Closed</option>
                  <option value="Open">Open</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Area Affected
                </label>
                <input
                  type="text"
                  value={newClaim.areaAffected}
                  onChange={(e) => setNewClaim({ ...newClaim, areaAffected: e.target.value })}
                  className="w-full rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-base text-gray-900 placeholder-gray-400 focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20 transition-all"
                  placeholder="e.g., 3rd floor east wing"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowAddClaim(false)}
                className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddClaim}
                className="flex-1 rounded-lg bg-hrip-navy px-6 py-3 text-base font-semibold text-white hover:bg-blue-800 transition-all"
              >
                Save Claim
              </button>
            </div>
          </div>
        )}

        {claims.length === 0 && !showAddClaim && (
          <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-8 text-center">
            <p className="text-base text-gray-600">No claims added yet. Click "Add Claim" to enter past losses.</p>
          </div>
        )}
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
