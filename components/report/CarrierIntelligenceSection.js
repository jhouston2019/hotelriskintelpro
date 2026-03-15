/**
 * Carrier Intelligence Section Component
 * Displays carrier behavior analysis and market comparisons
 */

export default function CarrierIntelligenceSection({ carrierIntelligence }) {
  if (!carrierIntelligence || !carrierIntelligence.available) {
    return null;
  }
  
  const { carrierName, benchmark, insights, competitivePosition, marketContext } = carrierIntelligence;
  
  const formatCurrency = (value) => {
    if (!value || value === 0) return '$0';
    const num = typeof value === 'string' ? parseFloat(value) : value;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toLocaleString()}`;
  };
  
  const getBenchmarkColor = (scoreBand) => {
    switch (scoreBand) {
      case 'highly_competitive': return 'text-green-700 bg-green-50 border-green-200';
      case 'competitive': return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'below_market': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'significantly_below_market': return 'text-red-700 bg-red-50 border-red-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };
  
  const getBenchmarkLabel = (scoreBand) => {
    switch (scoreBand) {
      case 'highly_competitive': return 'Highly Competitive';
      case 'competitive': return 'Competitive';
      case 'below_market': return 'Below Market';
      case 'significantly_below_market': return 'Significantly Below Market';
      default: return 'Unknown';
    }
  };
  
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-700 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-700 bg-orange-50 border-orange-200';
      case 'low': return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };
  
  return (
    <div className="mt-12 rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Carrier Intelligence
          </h2>
          <div className="text-sm text-gray-500">
            Based on {marketContext.totalCarriersTracked} carriers tracked
          </div>
        </div>
        <p className="mt-2 text-base text-gray-700">
          How your insurer and policy structure compare to market norms
        </p>
      </div>
      
      {/* Benchmark Score Card */}
      <div className={`mb-8 rounded-xl border-2 p-6 ${getBenchmarkColor(benchmark?.scoreBand)}`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold uppercase tracking-wide opacity-80">
              Policy Competitiveness
            </div>
            <div className="mt-1 text-3xl font-bold">
              {benchmark?.benchmarkScore || 0}/100
            </div>
            <div className="mt-1 text-sm font-medium">
              {getBenchmarkLabel(benchmark?.scoreBand)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium opacity-80">
              {carrierName}
            </div>
            <div className="mt-1 text-xs opacity-70">
              Data confidence: {marketContext.dataConfidence}
            </div>
          </div>
        </div>
      </div>
      
      {/* Market Comparisons */}
      {benchmark?.comparisons && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            Your Policy vs. Market
          </h3>
          
          <div className="space-y-4">
            {/* Deductible Comparison */}
            {benchmark.comparisons.deductible && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Deductible</span>
                  <span className={`text-sm font-medium ${
                    benchmark.comparisons.deductible.status === 'above_market' ? 'text-red-600' :
                    benchmark.comparisons.deductible.status === 'below_market' ? 'text-green-600' :
                    'text-gray-600'
                  }`}>
                    {benchmark.comparisons.deductible.status === 'above_market' ? 'Above Market' :
                     benchmark.comparisons.deductible.status === 'below_market' ? 'Below Market' :
                     'Market Aligned'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Your Deductible</div>
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(benchmark.comparisons.deductible.hotelValue)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">{carrierName} Avg</div>
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(benchmark.comparisons.deductible.carrierAvg)}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Market Avg</div>
                    <div className="font-semibold text-gray-900">
                      {formatCurrency(benchmark.comparisons.deductible.marketAvg)}
                    </div>
                  </div>
                </div>
                {benchmark.comparisons.deductible.vsMarketPct !== 0 && (
                  <div className="mt-2 text-sm text-gray-700">
                    {benchmark.comparisons.deductible.vsMarketPct > 0 ? (
                      <span className="text-red-600">
                        {Math.abs(benchmark.comparisons.deductible.vsMarketPct).toFixed(0)}% above market average
                      </span>
                    ) : (
                      <span className="text-green-600">
                        {Math.abs(benchmark.comparisons.deductible.vsMarketPct).toFixed(0)}% below market average
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* BI Coverage Comparison */}
            {benchmark.comparisons.biCoverage && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Business Interruption Coverage</span>
                  <span className={`text-sm font-medium ${
                    benchmark.comparisons.biCoverage.status === 'below_market' ? 'text-red-600' :
                    benchmark.comparisons.biCoverage.status === 'above_market' ? 'text-green-600' :
                    'text-gray-600'
                  }`}>
                    {benchmark.comparisons.biCoverage.status === 'below_market' ? 'Below Market' :
                     benchmark.comparisons.biCoverage.status === 'above_market' ? 'Above Market' :
                     'Market Aligned'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">Your Coverage</div>
                    <div className="font-semibold text-gray-900">
                      {benchmark.comparisons.biCoverage.hotelValue.toFixed(1)} months
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">{carrierName} Avg</div>
                    <div className="font-semibold text-gray-900">
                      {benchmark.comparisons.biCoverage.carrierAvg.toFixed(1)} months
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Market Avg</div>
                    <div className="font-semibold text-gray-900">
                      {benchmark.comparisons.biCoverage.marketAvg.toFixed(1)} months
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Claim Resolution Comparison */}
            {benchmark.comparisons.claimResolution && (
              <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Claim Resolution Time</span>
                  <span className={`text-sm font-medium ${
                    benchmark.comparisons.claimResolution.status === 'slower_than_market' ? 'text-red-600' :
                    benchmark.comparisons.claimResolution.status === 'slightly_slower' ? 'text-orange-600' :
                    'text-gray-600'
                  }`}>
                    {benchmark.comparisons.claimResolution.status === 'slower_than_market' ? 'Slower Than Market' :
                     benchmark.comparisons.claimResolution.status === 'slightly_slower' ? 'Slightly Slower' :
                     'Market Aligned'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600">{carrierName} Avg Resolution</div>
                    <div className="font-semibold text-gray-900">
                      {benchmark.comparisons.claimResolution.carrierAvg.toFixed(1)} months
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600">Market Avg Resolution</div>
                    <div className="font-semibold text-gray-900">
                      {benchmark.comparisons.claimResolution.marketAvg.toFixed(1)} months
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Carrier Insights */}
      {insights && insights.length > 0 && (
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            Carrier Behavior Insights
          </h3>
          
          <div className="space-y-3">
            {insights.map((insight, idx) => (
              <div 
                key={idx}
                className={`rounded-lg border-2 p-4 ${getSeverityColor(insight.severity)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {insight.severity === 'high' && (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    )}
                    {insight.severity === 'medium' && (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">
                      {insight.message}
                    </div>
                    {insight.detail && (
                      <div className="mt-1 text-sm opacity-90">
                        {insight.detail}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Competitive Position Summary */}
      {competitivePosition && (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h3 className="mb-4 text-lg font-bold text-gray-900">
            Competitive Position
          </h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            {/* Strengths */}
            {competitivePosition.strengths.length > 0 && (
              <div>
                <div className="mb-2 text-sm font-semibold text-green-700">
                  Strengths
                </div>
                <ul className="space-y-1">
                  {competitivePosition.strengths.map((strength, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="h-4 w-4 flex-shrink-0 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Weaknesses */}
            {competitivePosition.weaknesses.length > 0 && (
              <div>
                <div className="mb-2 text-sm font-semibold text-red-700">
                  Areas Below Market
                </div>
                <ul className="space-y-1">
                  {competitivePosition.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="h-4 w-4 flex-shrink-0 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          {/* Overall Assessment */}
          <div className="mt-6 border-t border-gray-200 pt-4">
            <div className="text-sm text-gray-700">
              <span className="font-semibold">Overall Assessment:</span>
              {' '}
              {competitivePosition.overall === 'above_market' && 
                'Your policy structure is competitive relative to market norms.'}
              {competitivePosition.overall === 'market_aligned' && 
                'Your policy is generally aligned with market standards.'}
              {competitivePosition.overall === 'needs_improvement' && 
                'Your policy has some areas that fall below typical market coverage.'}
              {competitivePosition.overall === 'below_market' && 
                'Your policy structure is significantly below market norms in multiple areas.'}
            </div>
          </div>
        </div>
      )}
      
      {/* Carrier Risk Flags */}
      {benchmark?.riskFlags && benchmark.riskFlags.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-base font-bold text-gray-900">
            Carrier Behavior Patterns
          </h3>
          <div className="space-y-2">
            {benchmark.riskFlags.map((flag, idx) => (
              <div 
                key={idx}
                className="rounded-lg border border-gray-200 bg-gray-50 p-3 text-sm text-gray-700"
              >
                <div className="flex items-start gap-2">
                  <svg className="h-4 w-4 flex-shrink-0 text-gray-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>{flag.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* What This Means */}
      <div className="mt-8 rounded-lg bg-blue-50 border border-blue-200 p-6">
        <h3 className="mb-2 text-base font-bold text-blue-900">
          What This Means
        </h3>
        <p className="text-sm text-blue-800 leading-relaxed">
          This analysis compares your policy structure to patterns observed across multiple hotels 
          with {carrierName} and the broader insurance market. Significant deviations from market 
          norms may indicate opportunities to negotiate better terms, switch carriers, or adjust 
          coverage to better align with industry standards. Remember that every hotel is unique, 
          and some variations may be appropriate for your specific situation.
        </p>
      </div>
    </div>
  );
}
