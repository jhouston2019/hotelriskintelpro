/**
 * Subscription prompt modal
 * Shown when user tries to access paid features
 */

export default function SubscriptionPrompt({ isOpen, onClose, onSubscribe, feature }) {
  if (!isOpen) return null;

  const featureMessages = {
    pdf_export: {
      title: 'Export Your Full Report',
      description: 'Download a professional PDF report with complete analysis, scenarios, and priority actions.',
    },
    monitoring: {
      title: 'Enable Ongoing Monitoring',
      description: 'Track your hotel risk over time, get renewal alerts, and receive updates when conditions change.',
    },
    save_hotel: {
      title: 'Save Your Hotel Profile',
      description: 'Permanently save your hotel data and analysis results for future access.',
    },
    rerun_analysis: {
      title: 'Re-run Analysis',
      description: 'Update your analysis with new data and track changes over time.',
    },
  };

  const message = featureMessages[feature] || {
    title: 'Unlock Full Features',
    description: 'Subscribe to access all Hotel Risk Pro features.',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-hrip-navy to-hrip-blue px-8 py-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {message.title}
          </h2>
          <p className="text-lg text-blue-100">
            {message.description}
          </p>
        </div>

        {/* Content */}
        <div className="px-8 py-8">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Subscription Includes:
            </h3>
            <ul className="space-y-3">
              {[
                'Full PDF report export',
                'Permanent hotel profile storage',
                'Ongoing risk monitoring',
                'Renewal countdown and alerts',
                'Quick update and re-analysis',
                'Analysis history tracking',
                'Priority action tracking',
              ].map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="border-2 border-gray-200 rounded-xl p-6">
              <div className="text-sm font-semibold text-gray-600 mb-2">Monthly</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$199</div>
              <div className="text-sm text-gray-600">per hotel / month</div>
            </div>
            <div className="border-2 border-hrip-navy rounded-xl p-6 bg-blue-50 relative">
              <div className="absolute -top-3 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                Save $388
              </div>
              <div className="text-sm font-semibold text-hrip-navy mb-2">Yearly</div>
              <div className="text-3xl font-bold text-gray-900 mb-1">$1,999</div>
              <div className="text-sm text-gray-600">per hotel / year</div>
            </div>
          </div>

          {/* Value proposition */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <div className="text-sm font-bold text-gray-900 mb-1">
                  The Cost of the Tool vs The Risk
                </div>
                <div className="text-sm text-gray-700">
                  Hotel Risk Pro: $199/month. Potential uncovered loss: $5M–$20M+. The goal is simple: identify and correct insurance weaknesses before disaster occurs.
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border-2 border-gray-300 px-6 py-3 text-base font-semibold text-gray-900 hover:bg-gray-50 transition-all"
            >
              Not Now
            </button>
            <button
              type="button"
              onClick={onSubscribe}
              className="flex-1 rounded-lg bg-hrip-navy px-6 py-3 text-base font-semibold text-white hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl"
            >
              Subscribe Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
