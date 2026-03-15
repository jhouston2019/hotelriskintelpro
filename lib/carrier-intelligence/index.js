/**
 * Carrier Intelligence System - Main Module
 * Orchestrates carrier behavior analysis and market comparisons
 */

import { ingestPolicyData, ingestClaimsData } from './ingestion';
import { updateCarrierMetrics, getMarketBenchmarks } from './metrics';
import { generateCarrierBenchmark } from './benchmarking';

/**
 * Analyze carrier behavior for a hotel's policy
 * @param {Object} policyData - Hotel's insurance policy
 * @param {Object} hotelData - Hotel profile
 * @param {Array} claimsData - Hotel's claims history
 * @returns {Object} Complete carrier intelligence analysis
 */
export async function analyzeCarrierBehavior(policyData, hotelData, claimsData = []) {
  try {
    const carrierName = policyData.carrier;
    
    if (!carrierName) {
      return {
        available: false,
        reason: 'Carrier name required for intelligence analysis',
      };
    }
    
    // 1. Ingest this hotel's data into intelligence dataset
    await ingestPolicyData(policyData, hotelData);
    if (claimsData.length > 0) {
      await ingestClaimsData(claimsData, carrierName, hotelData);
    }
    
    // 2. Update carrier metrics (if enough time has passed)
    // This would normally be a scheduled job, but we can trigger it here
    // await updateCarrierMetrics(carrierName)
    
    // 3. Generate carrier benchmark for this hotel
    const benchmark = await generateCarrierBenchmark(policyData, hotelData, carrierName);
    
    // 4. Get market context
    const marketBenchmarks = await getMarketBenchmarks();
    
    // 5. Generate carrier-specific insights
    const carrierInsights = generateCarrierInsights(benchmark, policyData, hotelData);
    
    // 6. Calculate competitive positioning
    const competitivePosition = calculateCompetitivePosition(benchmark);
    
    return {
      available: true,
      carrierName,
      benchmark,
      insights: carrierInsights,
      competitivePosition,
      marketContext: {
        totalCarriersTracked: marketBenchmarks.totalCarriersTracked || 6,
        dataConfidence: benchmark?.marketContext?.dataConfidence || 'moderate',
      },
    };
    
  } catch (error) {
    console.error('Carrier behavior analysis failed:', error);
    return {
      available: false,
      reason: 'Analysis failed',
      error: error.message,
    };
  }
}

/**
 * Generate carrier-specific insights
 * @param {Object} benchmark
 * @param {Object} policyData
 * @param {Object} hotelData
 * @returns {Array} Insights
 */
function generateCarrierInsights(benchmark, policyData, hotelData) {
  const insights = [];
  
  if (!benchmark) return insights;
  
  // Add benchmark insights
  if (benchmark.insights) {
    insights.push(...benchmark.insights);
  }
  
  // Add risk flag insights
  if (benchmark.riskFlags && benchmark.riskFlags.length > 0) {
    benchmark.riskFlags.forEach(flag => {
      insights.push({
        type: flag.flagType,
        severity: flag.severity,
        message: flag.message,
        detail: 'Based on analysis of multiple policies with this carrier.',
      });
    });
  }
  
  return insights;
}

/**
 * Calculate competitive positioning
 * @param {Object} benchmark
 * @returns {Object} Positioning analysis
 */
function calculateCompetitivePosition(benchmark) {
  if (!benchmark) {
    return {
      overall: 'unknown',
      strengths: [],
      weaknesses: [],
    };
  }
  
  const strengths = [];
  const weaknesses = [];
  
  // Analyze each comparison
  if (benchmark.comparisons.deductible) {
    if (benchmark.comparisons.deductible.status === 'below_market') {
      strengths.push('Deductible is below market average');
    } else if (benchmark.comparisons.deductible.status === 'above_market') {
      weaknesses.push('Deductible is significantly above market average');
    }
  }
  
  if (benchmark.comparisons.biCoverage) {
    if (benchmark.comparisons.biCoverage.status === 'above_market') {
      strengths.push('Business interruption coverage exceeds market norms');
    } else if (benchmark.comparisons.biCoverage.status === 'below_market') {
      weaknesses.push('Business interruption coverage is below market norms');
    }
  }
  
  if (benchmark.comparisons.claimResolution) {
    if (benchmark.comparisons.claimResolution.status === 'slower_than_market') {
      weaknesses.push('Carrier has slower-than-average claim resolution');
    }
  }
  
  // Determine overall positioning
  let overall = 'market_aligned';
  if (weaknesses.length >= 3) overall = 'below_market';
  else if (weaknesses.length >= 2) overall = 'needs_improvement';
  else if (strengths.length >= 2) overall = 'above_market';
  
  return {
    overall,
    benchmarkScore: benchmark.benchmarkScore,
    scoreBand: benchmark.scoreBand,
    strengths,
    weaknesses,
  };
}

/**
 * Get carrier intelligence summary for report
 * @param {string} carrierName
 * @returns {Object} Summary data
 */
export async function getCarrierIntelligenceSummary(carrierName) {
  try {
    // Fetch carrier profile
    // const profile = await db.carrierProfiles.findUnique({ where: { carrierName } })
    
    // Fetch carrier metrics
    // const metrics = await db.carrierMetrics.findUnique({ where: { carrierName } })
    
    // Fetch active risk flags
    // const flags = await db.carrierRiskFlags.findMany({
    //   where: { carrierName, isActive: true }
    // })
    
    // Mock data
    return {
      carrierName,
      profile: {
        avgPropertyDeductible: 55000,
        avgBiLimitRatio: 5.2,
        renewalStrictnessScore: 68,
        claimDisputeFrequency: 0.28,
        commonExclusions: ['Sewer backup', 'Flood', 'Mold (over $50K)'],
      },
      metrics: {
        totalPolicies: 47,
        totalClaims: 128,
        avgClaimResolutionMonths: 6.8,
        waterLossFrequency: 0.42,
      },
      riskFlags: [
        {
          type: 'high_deductible',
          severity: 'medium',
          message: 'Typically uses deductibles above market average',
        },
        {
          type: 'water_loss_disputes',
          severity: 'high',
          message: 'Higher-than-average water loss disputes',
        },
      ],
    };
    
  } catch (error) {
    console.error('Failed to fetch carrier intelligence:', error);
    return null;
  }
}

export {
  analyzeCarrierBehavior,
  getCarrierIntelligenceSummary,
};
