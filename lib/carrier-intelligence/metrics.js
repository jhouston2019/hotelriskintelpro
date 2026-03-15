/**
 * Carrier Metrics Aggregation Engine
 * Calculates carrier behavior patterns and market benchmarks
 */

/**
 * Update carrier metrics for specific carrier
 * @param {string} carrierName
 * @returns {Object} Updated metrics
 */
export async function updateCarrierMetrics(carrierName) {
  try {
    // Fetch all policy intelligence for this carrier
    // const policies = await db.policyIntelligence.findMany({ where: { carrierName } })
    
    // Fetch all claim intelligence for this carrier
    // const claims = await db.claimIntelligence.findMany({ where: { carrierName } })
    
    // Mock data for implementation
    const policies = [];
    const claims = [];
    
    // Calculate policy metrics
    const policyMetrics = calculatePolicyMetrics(policies);
    
    // Calculate claim metrics
    const claimMetrics = calculateClaimMetrics(claims);
    
    // Calculate renewal strictness score
    const renewalScore = calculateRenewalStrictnessScore(policies, claims);
    
    // Combine all metrics
    const metrics = {
      carrierName,
      totalPolicies: policies.length,
      totalClaims: claims.length,
      ...policyMetrics,
      ...claimMetrics,
      renewalStrictnessScore: renewalScore,
      lastUpdated: new Date(),
    };
    
    // Upsert to carrier_metrics table
    // await db.carrierMetrics.upsert({
    //   where: { carrierName },
    //   update: metrics,
    //   create: metrics
    // })
    
    // Update carrier profile
    await updateCarrierProfile(carrierName, metrics);
    
    // Generate risk flags
    await generateCarrierRiskFlags(carrierName, metrics);
    
    return {
      success: true,
      metrics,
    };
    
  } catch (error) {
    console.error('Carrier metrics update failed:', error);
    throw error;
  }
}

/**
 * Calculate policy-based metrics
 * @param {Array} policies
 * @returns {Object} Policy metrics
 */
function calculatePolicyMetrics(policies) {
  if (policies.length === 0) {
    return {
      avgPropertyLimit: null,
      avgBiLimit: null,
      avgLiabilityLimit: null,
      avgDeductible: null,
      medianDeductible: null,
      avgBiMonthsCoverage: null,
      ordinanceCoverageRate: null,
      floodCoverageRate: null,
      windCoverageRate: null,
      sewerBackupCoverageRate: null,
    };
  }
  
  // Calculate averages
  const avgPropertyLimit = average(policies.map(p => p.propertyLimit).filter(v => v));
  const avgBiLimit = average(policies.map(p => p.biLimit).filter(v => v));
  const avgLiabilityLimit = average(policies.map(p => p.liabilityLimit).filter(v => v));
  const avgDeductible = average(policies.map(p => p.deductible).filter(v => v));
  
  // Calculate median deductible
  const deductibles = policies.map(p => p.deductible).filter(v => v).sort((a, b) => a - b);
  const medianDeductible = deductibles.length > 0 
    ? deductibles[Math.floor(deductibles.length / 2)]
    : null;
  
  // Calculate BI months coverage average
  const avgBiMonthsCoverage = average(policies.map(p => p.biLimitRatio).filter(v => v));
  
  // Calculate coverage rates
  const ordinanceCoverageRate = calculateRate(policies, p => p.ordinanceCoverage > 0);
  const floodCoverageRate = calculateRate(policies, p => p.floodCoverage === 'yes');
  const windCoverageRate = calculateRate(policies, p => p.windCoverage === 'yes');
  const sewerBackupCoverageRate = calculateRate(policies, p => p.sewerBackupCoverage === 'yes');
  
  return {
    avgPropertyLimit,
    avgBiLimit,
    avgLiabilityLimit,
    avgDeductible,
    medianDeductible,
    avgBiMonthsCoverage,
    ordinanceCoverageRate,
    floodCoverageRate,
    windCoverageRate,
    sewerBackupCoverageRate,
  };
}

/**
 * Calculate claim-based metrics
 * @param {Array} claims
 * @returns {Object} Claim metrics
 */
function calculateClaimMetrics(claims) {
  if (claims.length === 0) {
    return {
      avgClaimSeverity: null,
      avgClaimResolutionMonths: null,
      waterLossFrequency: null,
      liabilityFrequency: null,
      fireFrequency: null,
      claimDisputeRate: null,
    };
  }
  
  // Calculate average claim severity
  const avgClaimSeverity = average(claims.map(c => c.amountPaid).filter(v => v));
  
  // Calculate average resolution time
  const resolutionTimes = claims.map(c => c.resolutionMonths).filter(v => v);
  const avgClaimResolutionMonths = average(resolutionTimes);
  
  // Calculate claim type frequencies
  const totalClaims = claims.length;
  const waterLossFrequency = calculateRate(claims, c => 
    c.claimType?.toLowerCase().includes('water') || 
    c.causeOfLoss?.toLowerCase().includes('water')
  );
  const liabilityFrequency = calculateRate(claims, c => 
    c.claimType?.toLowerCase().includes('liability')
  );
  const fireFrequency = calculateRate(claims, c => 
    c.claimType?.toLowerCase().includes('fire') || 
    c.causeOfLoss?.toLowerCase().includes('fire')
  );
  
  // Calculate dispute rate
  const claimDisputeRate = calculateRate(claims, c => c.disputeFlag === true);
  
  return {
    avgClaimSeverity,
    avgClaimResolutionMonths,
    waterLossFrequency,
    liabilityFrequency,
    fireFrequency,
    claimDisputeRate,
  };
}

/**
 * Calculate renewal strictness score
 * @param {Array} policies
 * @param {Array} claims
 * @returns {number} Score 0-100
 */
function calculateRenewalStrictnessScore(policies, claims) {
  let score = 50; // Baseline
  
  if (policies.length === 0) return score;
  
  // Higher deductibles suggest stricter underwriting
  const avgDeductible = average(policies.map(p => p.deductible).filter(v => v));
  if (avgDeductible > 75000) score += 15;
  else if (avgDeductible > 50000) score += 10;
  else if (avgDeductible < 25000) score -= 10;
  
  // Lower BI ratios suggest stricter terms
  const avgBiRatio = average(policies.map(p => p.biLimitRatio).filter(v => v));
  if (avgBiRatio < 4) score += 15;
  else if (avgBiRatio < 6) score += 10;
  else if (avgBiRatio > 9) score -= 10;
  
  // High coinsurance suggests stricter terms
  const avgCoinsurance = average(policies.map(p => p.coinsurance).filter(v => v));
  if (avgCoinsurance >= 90) score += 10;
  
  // Low coverage rates suggest restrictive carrier
  const ordinanceRate = calculateRate(policies, p => p.ordinanceCoverage > 0);
  const floodRate = calculateRate(policies, p => p.floodCoverage === 'yes');
  const sewerRate = calculateRate(policies, p => p.sewerBackupCoverage === 'yes');
  
  if (ordinanceRate < 0.3) score += 10;
  if (floodRate < 0.2) score += 5;
  if (sewerRate < 0.4) score += 5;
  
  // High dispute rate suggests difficult claims handling
  if (claims.length > 0) {
    const disputeRate = calculateRate(claims, c => c.disputeFlag);
    if (disputeRate > 0.4) score += 15;
    else if (disputeRate > 0.25) score += 10;
  }
  
  // Clamp to 0-100
  return Math.max(0, Math.min(100, score));
}

/**
 * Update carrier profile
 * @param {string} carrierName
 * @param {Object} metrics
 */
async function updateCarrierProfile(carrierName, metrics) {
  // Extract common exclusions from policies
  // const commonExclusions = await identifyCommonExclusions(carrierName)
  
  const profile = {
    carrierName,
    avgPropertyDeductible: metrics.avgDeductible,
    avgBiLimitRatio: metrics.avgBiMonthsCoverage,
    avgLiabilityLimit: metrics.avgLiabilityLimit,
    renewalStrictnessScore: metrics.renewalStrictnessScore,
    claimDisputeFrequency: metrics.claimDisputeRate,
    commonExclusions: [], // TODO: Extract from policies
    totalPoliciesAnalyzed: metrics.totalPolicies,
    totalClaimsAnalyzed: metrics.totalClaims,
  };
  
  // Upsert to carrier_profiles
  // await db.carrierProfiles.upsert({
  //   where: { carrierName },
  //   update: profile,
  //   create: profile
  // })
}

/**
 * Generate carrier risk flags
 * @param {string} carrierName
 * @param {Object} metrics
 */
async function generateCarrierRiskFlags(carrierName, metrics) {
  const flags = [];
  
  // Fetch market benchmarks
  const marketBenchmarks = await getMarketBenchmarks();
  
  // High deductible flag
  if (metrics.avgDeductible > marketBenchmarks.avgDeductible * 1.5) {
    flags.push({
      carrierName,
      flagType: 'high_deductible',
      flagSeverity: 'medium',
      flagMessage: `${carrierName} typically uses deductibles significantly above market average for hotels.`,
      supportingData: {
        carrierAvg: metrics.avgDeductible,
        marketAvg: marketBenchmarks.avgDeductible,
        difference: metrics.avgDeductible - marketBenchmarks.avgDeductible,
      },
    });
  }
  
  // Low BI coverage flag
  if (metrics.avgBiMonthsCoverage < marketBenchmarks.avgBiMonths * 0.7) {
    flags.push({
      carrierName,
      flagType: 'low_bi_coverage',
      flagSeverity: 'high',
      flagMessage: `${carrierName} tends to provide shorter business interruption coverage than market norms.`,
      supportingData: {
        carrierAvg: metrics.avgBiMonthsCoverage,
        marketAvg: marketBenchmarks.avgBiMonths,
      },
    });
  }
  
  // High dispute rate flag
  if (metrics.claimDisputeRate > marketBenchmarks.avgDisputeRate * 1.3) {
    flags.push({
      carrierName,
      flagType: 'high_dispute_rate',
      flagSeverity: 'high',
      flagMessage: `${carrierName} has a higher-than-average rate of claim disputes or delays.`,
      supportingData: {
        carrierRate: metrics.claimDisputeRate,
        marketRate: marketBenchmarks.avgDisputeRate,
      },
    });
  }
  
  // Slow claim resolution flag
  if (metrics.avgClaimResolutionMonths > marketBenchmarks.avgResolutionMonths * 1.4) {
    flags.push({
      carrierName,
      flagType: 'slow_resolution',
      flagSeverity: 'medium',
      flagMessage: `Claims with ${carrierName} historically take longer to resolve than industry averages.`,
      supportingData: {
        carrierAvg: metrics.avgClaimResolutionMonths,
        marketAvg: marketBenchmarks.avgResolutionMonths,
      },
    });
  }
  
  // High water loss dispute flag
  if (metrics.waterLossFrequency > 0.3 && metrics.claimDisputeRate > 0.3) {
    flags.push({
      carrierName,
      flagType: 'water_loss_disputes',
      flagSeverity: 'high',
      flagMessage: `${carrierName} has higher-than-average water loss disputes.`,
      supportingData: {
        waterFrequency: metrics.waterLossFrequency,
        disputeRate: metrics.claimDisputeRate,
      },
    });
  }
  
  // Save flags to database
  // await db.carrierRiskFlags.createMany({ data: flags })
  
  return flags;
}

/**
 * Get market benchmarks
 * @returns {Object} Market averages
 */
async function getMarketBenchmarks() {
  // Query market_benchmarks view
  // const benchmarks = await db.$queryRaw`SELECT * FROM market_benchmarks`
  
  // Mock benchmarks
  return {
    avgDeductible: 45000,
    avgBiMonths: 6.5,
    avgResolutionMonths: 5.2,
    avgDisputeRate: 0.22,
    avgPropertyLimit: 16000000,
    avgLiabilityLimit: 2500000,
  };
}

/**
 * Update all carrier metrics (batch job)
 * @returns {Object} Update summary
 */
export async function updateAllCarrierMetrics() {
  try {
    // Get distinct carriers
    // const carriers = await db.policyIntelligence.findMany({
    //   select: { carrierName: true },
    //   distinct: ['carrierName']
    // })
    
    const carriers = ['Travelers', 'Liberty Mutual', 'Nationwide', 'Zurich', 'Chubb', 'AXA'];
    const results = [];
    
    for (const carrier of carriers) {
      try {
        const result = await updateCarrierMetrics(carrier);
        results.push({ carrier, success: true });
      } catch (error) {
        console.error(`Failed to update ${carrier}:`, error);
        results.push({ carrier, success: false, error: error.message });
      }
    }
    
    return {
      success: true,
      carriersUpdated: results.filter(r => r.success).length,
      carriersFailed: results.filter(r => !r.success).length,
      results,
    };
    
  } catch (error) {
    console.error('Batch metrics update failed:', error);
    throw error;
  }
}

/**
 * Helper: Calculate average
 * @param {Array} values
 * @returns {number}
 */
function average(values) {
  if (values.length === 0) return null;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
}

/**
 * Helper: Calculate rate
 * @param {Array} items
 * @param {Function} predicate
 * @returns {number}
 */
function calculateRate(items, predicate) {
  if (items.length === 0) return null;
  const matching = items.filter(predicate).length;
  return matching / items.length;
}

export {
  getMarketBenchmarks,
};
