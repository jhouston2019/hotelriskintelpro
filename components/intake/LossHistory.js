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
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-800 bg-slate-950/80 p-8">
      <h2 className="text-2xl font-semibold text-slate-100">
        Tell Us About Past Claims and Losses
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        Past claims can affect renewals, premiums, exclusions, and future insurability.
      </p>

      {/* Upload Loss Runs */}
      <div className="mt-8">
        <label className="block text-sm font-medium text-slate-300">
          Upload Loss Runs <span className="text-slate-500">(optional)</span>
        </label>
        <p className="mt-1 text-xs text-slate-400">
          Upload your 5-year loss run document. We&apos;ll extract claim details automatically.
        </p>
        <div className="mt-3">
          <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-900/50 hover:bg-slate-900 hover:border-slate-600 transition">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm text-slate-400">Upload loss run document</span>
            </div>
            <input type="file" className="hidden" accept=".pdf,.xlsx,.csv" />
          </label>
        </div>
      </div>

      {/* Manual Claims Entry */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-200">Claims History</h3>
          <button
            type="button"
            onClick={() => setShowAddClaim(true)}
            className="text-xs text-hrip-gold hover:text-amber-300 transition-colors"
          >
            + Add Claim Manually
          </button>
        </div>

        {/* Existing Claims */}
        {claims.length > 0 && (
          <div className="mt-4 space-y-3">
            {claims.map((claim) => (
              <div
                key={claim.id}
                className="rounded-lg border border-slate-800 bg-slate-900/50 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-slate-100">
                        {claim.type}
                      </span>
                      <span className="text-xs text-slate-500">({claim.year})</span>
                      {claim.status === "open" && (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] text-amber-300">
                          Open
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{claim.cause}</p>
                    {claim.amountPaid && (
                      <p className="mt-2 text-sm text-slate-300">
                        Paid: ${parseInt(claim.amountPaid).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveClaim(claim.id)}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Claim Form */}
        {showAddClaim && (
          <div className="mt-4 rounded-lg border border-hrip-gold/30 bg-slate-900/70 p-6">
            <h4 className="text-sm font-semibold text-slate-200">Add New Claim</h4>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  Claim Year *
                </label>
                <input
                  type="number"
                  value={newClaim.year}
                  onChange={(e) => setNewClaim({ ...newClaim, year: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., 2023"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  Claim Type *
                </label>
                <select
                  value={newClaim.type}
                  onChange={(e) => setNewClaim({ ...newClaim, type: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                >
                  <option value="">Select...</option>
                  <option value="Water Damage">Water Damage</option>
                  <option value="Fire">Fire</option>
                  <option value="Wind/Storm">Wind/Storm</option>
                  <option value="Liability">Liability</option>
                  <option value="Theft">Theft</option>
                  <option value="Equipment Breakdown">Equipment Breakdown</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  Cause of Loss *
                </label>
                <input
                  type="text"
                  value={newClaim.cause}
                  onChange={(e) => setNewClaim({ ...newClaim, cause: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                  placeholder="e.g., Roof leak"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  Amount Paid
                </label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-2 text-sm text-slate-500">$</span>
                  <input
                    type="number"
                    value={newClaim.amountPaid}
                    onChange={(e) => setNewClaim({ ...newClaim, amountPaid: e.target.value })}
                    className="w-full rounded-md border border-slate-700 bg-slate-900 pl-8 pr-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                    placeholder="e.g., 45000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300">
                  Status
                </label>
                <select
                  value={newClaim.status}
                  onChange={(e) => setNewClaim({ ...newClaim, status: e.target.value })}
                  className="mt-1 w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:border-hrip-gold focus:outline-none focus:ring-1 focus:ring-hrip-gold"
                >
                  <option value="">Select...</option>
                  <option value="closed">Closed</option>
                  <option value="open">Open</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="button"
                onClick={handleAddClaim}
                className="rounded-md bg-hrip-gold px-4 py-2 text-xs font-semibold text-slate-950 hover:bg-amber-300"
              >
                Add Claim
              </button>
              <button
                type="button"
                onClick={() => setShowAddClaim(false)}
                className="rounded-md border border-slate-700 px-4 py-2 text-xs text-slate-300 hover:bg-slate-900"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {claims.length === 0 && !showAddClaim && (
          <div className="mt-4 rounded-lg border border-slate-800 bg-slate-900/30 p-6 text-center">
            <p className="text-sm text-slate-400">No claims added yet</p>
            <p className="mt-1 text-xs text-slate-500">
              If you have no claims in the last 5 years, you can skip this step
            </p>
          </div>
        )}
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
