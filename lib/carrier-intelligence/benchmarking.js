/**
 * Carrier Benchmarking and Comparison System
 * Compares hotel's carrier and policy structure to market intelligence
 */

import { getMarketBenchmarks } from './metrics';

/**
 * Generate carrier benchmark score for a hotel's policy
 * @param {Object} policyData - Hotel's policy data
 * @param {Object} hotelData - Hotel context
 * @param {string} carrierName - Carrier name
 * @returns {Object} Benchmark analysis
 */
export async function generateCarrierBenchmark(policyData, hotelData, carrierName) {
  try {
    // Fetch carrier metrics
    const carrierMetrics = await getCarrierMetrics(carrierName);
    
    // Fetch market benchmarks
    const marketBenchmarks = await getMarketBenchmarks();
    
    // Calculate hotel's BI ratio
    const hotelBiRatio = hotelData.annualRevenue
      ? (policyData.businessInterruptionLimit / hotelData.annualRevenue) * 12
      : null;
    
    // Generate comparisons
    const comparisons = {
      deductible: compareDeductible(policyData.deductible, carrierMetrics, marketBenchmarks),
      biCoverage: compareBICoverage(hotelBiRatio, carrierMetrics, marketBenchmarks),
      propertyLimit: comparePropertyLimit(policyData.propertyLimit, hotelData, carrierMetrics, marketBenchmarks),
      liabilityLimit: compareLiabilityLimit(policyData.liabilityLimit, carrierMetrics, marketBenchmarks),
      claimResolution: compareClaimResolution(carrierMetrics, marketBenchmarks),
    };
    
    // Calculate overall benchmark score
    const benchmarkScore = calculateBenchmarkScore(comparisons);
    
    // Generate insights
    const insights = generateBenchmarkInsights(comparisons, carrierName);
    
    // Get carrier risk flags
    const riskFlags = await getCarrierRiskFlags(carrierName);
    
    return {
      carrierName,
      benchmarkScore,
      scoreBand: getBenchmarkBand(benchmarkScore),
      comparisons,
      insights,
      riskFlags,
      marketContext: {
        totalCarriersTracked: marketBenchmarks.totalCarriersTracked || 0,
        dataConfidence: getDataConfidence(carrierMetrics),
      },
    };
    
  } catch (error) {
    console.error('Carrier benchmark generation failed:', error);
    return null;
  }
}

/**
 * Compare deductible to market
 * @param {number} hotelDeductible
 * @param {Object} carrierMetrics
 * @param {Object} marketBenchmarks
 * @returns {Object} Comparison
 */
function compareDeductible(hotelDeductible, carrierMetrics, marketBenchmarks) {
  const carrierAvg = carrierMetrics?.avgDeductible || marketBenchmarks.avgDeductible;
  const marketAvg = marketBenchmarks.avgDeductible;
  
  const vsCarrier = hotelDeductible - carrierAvg;
  const vsMarket = hotelDeductible - marketAvg;
  
  const vsCarrierPct = carrierAvg ? (vsCarrier / carrierAvg) * 100 : 0;
  const vsMarketPct = marketAvg ? (vsMarket / marketAvg) * 100 : 0;
  
  return {
    hotelValue: hotelDeductible,
    carrierAvg,
    marketAvg,
    vsCarrier,
    vsMarket,
    vsCarrierPct,
    vsMarketPct,
    status: vsMarketPct > 50 ? 'above_market' : vsMarketPct > 10 ? 'slightly_high' : vsMarketPct < -10 ? 'below_market' : 'market_aligned',
  };
}

/**
 * Compare BI coverage to market
 * @param {number} hotelBiRatio
 * @param {Object} carrierMetrics
 * @param {Object} marketBenchmarks
 * @returns {Object} Comparison
 */
function compareBICoverage(hotelBiRatio, carrierMetrics, marketBenchmarks) {
  if (!hotelBiRatio) return null;
  
  const carrierAvg = carrierMetrics?.avgBiMonthsCoverage || marketBenchmarks.avgBiMonths;
  const marketAvg = marketBenchmarks.avgBiMonths;
  
  const vsCarrier = hotelBiRatio - carrierAvg;
  const vsMarket = hotelBiRatio - marketAvg;
  
  return {
    hotelValue: hotelBiRatio,
    carrierAvg,
    marketAvg,
    vsCarrier,
    vsMarket,
    status: hotelBiRatio < marketAvg * 0.7 ? 'below_market' : hotelBiRatio < marketAvg * 0.9 ? 'slightly_low' : hotelBiRatio > marketAvg * 1.2 ? 'above_market' : 'market_aligned',
  };
}

/**
 * Compare property limit to market
 * @param {number} hotelPropertyLimit
 * @param {Object} hotelData
 * @param {Object} carrierMetrics
 * @param {Object} marketBenchmarks
 * @returns {Object} Comparison
 */
function comparePropertyLimit(hotelPropertyLimit, hotelData, carrierMetrics, marketBenchmarks) {
  const carrierAvg = carrierMetrics?.avgPropertyLimit || marketBenchmarks.avgPropertyLimit;
  const marketAvg = marketBenchmarks.avgPropertyLimit;
  
  // Normalize by hotel size (per room)
  const hotelPerRoom = hotelData.numberOfRooms ? hotelPropertyLimit / hotelData.numberOfRooms : null;
  
  return {
    hotelValue: hotelPropertyLimit,
    hotelPerRoom,
    carrierAvg,
    marketAvg,
    status: hotelPropertyLimit < marketAvg * 0.7 ? 'below_market' : 'market_aligned',
  };
}

/**
 * Compare liability limit to market
 * @param {number} hotelLiabilityLimit
 * @param {Object} carrierMetrics
 * @param {Object} marketBenchmarks
 * @returns {Object} Comparison
 */
function compareLiabilityLimit(hotelLiabilityLimit, carrierMetrics, marketBenchmarks) {
  const carrierAvg = carrierMetrics?.avgLiabilityLimit || marketBenchmarks.avgLiabilityLimit;
  const marketAvg = marketBenchmarks.avgLiabilityLimit;
  
  return {
    hotelValue: hotelLiabilityLimit,
    carrierAvg,
    marketAvg,
    status: hotelLiabilityLimit < marketAvg * 0.6 ? 'below_market' : hotelLiabilityLimit < marketAvg * 0.8 ? 'slightly_low' : 'market_aligned',
  };
}

/**
 * Compare claim resolution time
 * @param {Object} carrierMetrics
 * @param {Object} marketBenchmarks
 * @returns {Object} Comparison
 */
function compareClaimResolution(carrierMetrics, marketBenchmarks) {
  const carrierAvg = carrierMetrics?.avgClaimResolutionMonths;
  const marketAvg = marketBenchmarks.avgResolutionMonths;
  
  if (!carrierAvg) return null;
  
  return {
    carrierAvg,
    marketAvg,
    difference: carrierAvg - marketAvg,
    status: carrierAvg > marketAvg * 1.4 ? 'slower_than_market' : carrierAvg > marketAvg * 1.1 ? 'slightly_slower' : 'market_aligned',
  };
}

/**
 * Calculate overall benchmark score
 * @param {Object} comparisons
 * @returns {number} Score 0-100
 */
function calculateBenchmarkScore(comparisons) {
  let score = 100;
  
  // Deductible component (weight: 25)
  if (comparisons.deductible) {
    if (comparisons.deductible.status === 'above_market') score -= 25;
    else if (comparisons.deductible.status === 'slightly_high') score -= 15;
    else if (comparisons.deductible.status === 'below_market') score += 5;
  }
  
  // BI coverage component (weight: 35)
  if (comparisons.biCoverage) {
    if (comparisons.biCoverage.status === 'below_market') score -= 35;
    else if (comparisons.biCoverage.status === 'slightly_low') score -= 20;
    else if (comparisons.biCoverage.status === 'above_market') score += 10;
  }
  
  // Property limit component (weight: 20)
  if (comparisons.propertyLimit) {
    if (comparisons.propertyLimit.status === 'below_market') score -= 20;
  }
  
  // Liability component (weight: 10)
  if (comparisons.liabilityLimit) {
    if (comparisons.liabilityLimit.status === 'below_market') score -= 10;
    else if (comparisons.liabilityLimit.status === 'slightly_low') score -= 5;
  }
  
  // Claim resolution component (weight: 10)
  if (comparisons.claimResolution) {
    if (comparisons.claimResolution.status === 'slower_than_market') score -= 10;
    else if (comparisons.claimResolution.status === 'slightly_slower') score -= 5;
  }
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Get benchmark band
 * @param {number} score
 * @returns {string}
 */
function getBenchmarkBand(score) {
  if (score >= 85) return 'highly_competitive';
  if (score >= 70) return 'competitive';
  if (score >= 50) return 'below_market';
  return 'significantly_below_market';
}

/**
 * Generate benchmark insights
 * @param {Object} comparisons
 * @param {string} carrierName
 * @returns {Array} Insights
 */
function generateBenchmarkInsights(comparisons, carrierName) {
  const insights = [];
  
  // Deductible insights
  if (comparisons.deductible?.status === 'above_market') {
    insights.push({
      type: 'deductible',
      severity: 'medium',
      message: `Your deductible is ${Math.abs(comparisons.deductible.vsMarketPct).toFixed(0)}% above market average for similar hotels.`,
      detail: `${carrierName} typically uses higher deductibles than market norms.`,
    });
  }
  
  // BI coverage insights
  if (comparisons.biCoverage?.status === 'below_market') {
    insights.push({
      type: 'bi_coverage',
      severity: 'high',
      message: `Your business interruption coverage is ${Math.abs(comparisons.biCoverage.vsMarket).toFixed(1)} months shorter than market average.`,
      detail: `${carrierName} tends to provide shorter BI coverage than typical market offerings.`,
    });
  } else if (comparisons.biCoverage?.status === 'slightly_low') {
    insights.push({
      type: 'bi_coverage',
      severity: 'medium',
      message: `Your business interruption coverage is slightly below market norms.`,
      detail: `Comparable hotels typically carry ${comparisons.biCoverage.marketAvg.toFixed(1)} months of BI coverage.`,
    });
  }
  
  // Property limit insights
  if (comparisons.propertyLimit?.status === 'below_market') {
    insights.push({
      type: 'property_limit',
      severity: 'high',
      message: `Your property coverage limit appears below typical market levels for hotels of this size.`,
      detail: `Market average property limit: ${formatCurrency(comparisons.propertyLimit.marketAvg)}`,
    });
  }
  
  // Liability insights
  if (comparisons.liabilityLimit?.status === 'below_market') {
    insights.push({
      type: 'liability',
      severity: 'medium',
      message: `Your liability coverage is below market average for hotels.`,
      detail: `Market average liability limit: ${formatCurrency(comparisons.liabilityLimit.marketAvg)}`,
    });
  }
  
  // Claim resolution insights
  if (comparisons.claimResolution?.status === 'slower_than_market') {
    insights.push({
      type: 'claim_resolution',
      severity: 'medium',
      message: `Claims with ${carrierName} historically take ${comparisons.claimResolution.difference.toFixed(1)} months longer to resolve than industry averages.`,
      detail: `This may extend business interruption periods and increase financial stress.`,
    });
  }
  
  return insights;
}

/**
 * Get carrier metrics
 * @param {string} carrierName
 * @returns {Object} Carrier metrics
 */
async function getCarrierMetrics(carrierName) {
  // Fetch from carrier_metrics table
  // const metrics = await db.carrierMetrics.findUnique({ where: { carrierName } })
  
  // Mock data
  return {
    carrierName,
    avgDeductible: 55000,
    avgBiMonthsCoverage: 5.2,
    avgClaimResolutionMonths: 6.8,
    claimDisputeRate: 0.28,
    avgPropertyLimit: 14500000,
    avgLiabilityLimit: 2200000,
  };
}

/**
 * Get carrier risk flags
 * @param {string} carrierName
 * @returns {Array} Active risk flags
 */
async function getCarrierRiskFlags(carrierName) {
  // Fetch from carrier_risk_flags table
  // const flags = await db.carrierRiskFlags.findMany({
  //   where: { carrierName, isActive: true }
  // })
  
  // Mock data
  return [
    {
      flagType: 'high_deductible',
      severity: 'medium',
      message: `${carrierName} typically uses deductibles significantly above market average for hotels.`,
    },
    {
      flagType: 'water_loss_disputes',
      severity: 'high',
      message: `${carrierName} has higher-than-average water loss disputes.`,
    },
  ];
}

/**
 * Get data confidence level
 * @param {Object} carrierMetrics
 * @returns {string}
 */
function getDataConfidence(carrierMetrics) {
  if (!carrierMetrics || carrierMetrics.totalPolicies < 5) return 'low';
  if (carrierMetrics.totalPolicies < 20) return 'moderate';
  return 'high';
}

/**
 * Format currency
 * @param {number} value
 * @returns {string}
 */
function formatCurrency(value) {
  if (!value) return '$0';
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
  return `$${value.toLocaleString()}`;
}

module.exports = {
  generateCarrierBenchmark,
  getCarrierMetrics,
  getCarrierRiskFlags,
};
