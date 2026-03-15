/**
 * Quick update modal for monitoring dashboard
 * Allows users to update specific data points without redoing full wizard
 */

import { useState } from 'react';

export default function QuickUpdateModal({ isOpen, onClose, updateType, onSave }) {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Save update to backend
      // await fetch('/api/hotel/quick-update', {
      //   method: 'POST',
      //   body: JSON.stringify({ updateType, data: formData })
      // })
      
      onSave?.(formData);
      onClose?.();
      
    } catch (error) {
      console.error('Update failed:', error);
      alert('Update failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderUpdateForm = () => {
    switch (updateType) {
      case 'claim':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Claim Type
              </label>
              <select
                value={formData.claimType || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, claimType: e.target.value }))}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
              >
                <option value="">Select type...</option>
                <option value="Water">Water</option>
                <option value="Fire">Fire</option>
                <option value="Liability">Liability</option>
                <option value="Wind">Wind</option>
                <option value="Theft">Theft</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Claim Date
              </label>
              <input
                type="date"
                value={formData.claimDate || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, claimDate: e.target.value }))}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Amount Paid (if known)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.amountPaid || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, amountPaid: e.target.value }))}
                  className="w-full rounded-lg border-2 border-gray-300 pl-10 pr-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
                  placeholder="0"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Status
              </label>
              <select
                value={formData.status || 'open'}
                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
              >
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>
        );
        
      case 'revenue':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Updated Annual Revenue
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.annualRevenue || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, annualRevenue: e.target.value }))}
                  className="w-full rounded-lg border-2 border-gray-300 pl-10 pr-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
                  placeholder="e.g., 12000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Updated Average Occupancy (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.averageOccupancy || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, averageOccupancy: e.target.value }))}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
                placeholder="e.g., 75"
              />
            </div>
          </div>
        );
        
      case 'property':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                What changed?
              </label>
              <textarea
                value={formData.changes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, changes: e.target.value }))}
                rows={4}
                className="w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
                placeholder="Describe renovations, new amenities, or property changes..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Estimated Cost of Changes
              </label>
              <div className="relative">
                <span className="absolute left-4 top-4 text-base font-medium text-gray-500">$</span>
                <input
                  type="number"
                  value={formData.costOfChanges || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, costOfChanges: e.target.value }))}
                  className="w-full rounded-lg border-2 border-gray-300 pl-10 pr-4 py-3 text-base focus:border-hrip-navy focus:outline-none focus:ring-2 focus:ring-hrip-navy/20"
                  placeholder="0"
                />
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  const titles = {
    claim: 'Add New Claim',
    revenue: 'Update Revenue',
    property: 'Update Property',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-hrip-navy to-hrip-blue px-8 py-6">
          <h2 className="text-2xl font-bold text-white">
            {titles[updateType] || 'Quick Update'}
          </h2>
          <p className="text-sm text-blue-100 mt-1">
            Update your hotel data and re-run analysis
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-6">
          {renderUpdateForm()}

          <div className="mt-6 flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg bg-hrip-navy px-6 py-3 text-base font-semibold text-white hover:bg-blue-800 transition-all disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save & Re-analyze'}
            </button>
          </div>
        </form>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
