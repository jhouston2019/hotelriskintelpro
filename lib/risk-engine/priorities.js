const { formatCurrency } = require('./utils');

/**
 * Generate prioritized corrective actions
 * @param {Object} propertyAnalysis
 * @param {Object} biAnalysis
 * @param {Object} liabilityAnalysis
 * @param {Object} deductibleAnalysis
 * @param {Object} lossHistoryAnalysis
 * @param {Object} operationsAnalysis
 * @param {Object} hazardsAnalysis
 * @param {Object} policyProfile
 * @returns {Array} Priority actions
 */
function generatePriorityActions(
  propertyAnalysis,
  biAnalysis,
  liabilityAnalysis,
  deductibleAnalysis,
  lossHistoryAnalysis,
  operationsAnalysis,
  hazardsAnalysis,
  policyProfile
) {
  const actions = [];
  
  // Property underinsurance
  if (propertyAnalysis.adequacyStatus === 'inadequate' && propertyAnalysis.propertyGap > 500000) {
    actions.push({
      title: 'Correct property underinsurance gap',
      urgency: 'fix_before_renewal',
      category: 'property',
      whyItMatters: 'Property coverage is materially below estimated replacement cost. A total loss could leave significant rebuilding costs uncovered.',
      estimatedImpact: `Could prevent ${formatCurrency(propertyAnalysis.propertyGap)} in uncovered rebuild costs.`,
      score: 95,
    });
  }
  
  // Business interruption shortfall
  if (biAnalysis.adequacyStatus === 'inadequate' && biAnalysis.uncoveredMonths > 3) {
    actions.push({
      title: 'Increase business interruption coverage duration',
      urgency: 'fix_before_renewal',
      category: 'bi',
      whyItMatters: `Current BI coverage may run out after ${biAnalysis.biMonthsCovered} months, but realistic recovery may require ${biAnalysis.estimatedRecoveryMonths} months.`,
      estimatedImpact: `Could prevent ${formatCurrency(biAnalysis.uncoveredExposure)} in uncovered revenue loss during extended recovery.`,
      score: 95,
    });
  } else if (biAnalysis.adequacyStatus === 'marginal') {
    actions.push({
      title: 'Review business interruption coverage duration',
      urgency: 'monitor_closely',
      category: 'bi',
      whyItMatters: 'BI coverage is close to estimated recovery needs but may be insufficient for extended scenarios.',
      estimatedImpact: 'Provides buffer for recovery delays or complications.',
      score: 70,
    });
  }
  
  // Recurring water losses
  if (lossHistoryAnalysis.recurringCategories.some(cat => cat.toLowerCase().includes('water'))) {
    actions.push({
      title: 'Address recurring water-loss drivers',
      urgency: 'fix_now',
      category: 'loss_history',
      whyItMatters: 'Multiple water claims increase non-renewal risk and may trigger coverage exclusions or restrictions.',
      estimatedImpact: 'Reduces future claim frequency, improves insurability, and prevents potential coverage loss.',
      score: 90,
    });
  }
  
  // Ordinance/law coverage missing
  if (propertyAnalysis.ordinanceLawFinding) {
    actions.push({
      title: 'Add ordinance or law coverage',
      urgency: 'fix_before_renewal',
      category: 'property',
      whyItMatters: 'Older property may require code upgrades during rebuild that are not covered by standard property insurance.',
      estimatedImpact: 'Could prevent major cost overruns during reconstruction due to current code requirements.',
      score: 80,
    });
  }
  
  // Inspection deficiencies
  if (operationsAnalysis.findings.some(f => f.issue.toLowerCase().includes('inspection'))) {
    actions.push({
      title: 'Resolve inspection deficiencies affecting insurability',
      urgency: 'fix_now',
      category: 'operations',
      whyItMatters: 'Unresolved deficiencies may affect renewal terms or create coverage disputes after a loss.',
      estimatedImpact: 'Improves underwriting position and reduces loss risk.',
      score: 85,
    });
  }
  
  // Deferred maintenance
  if (operationsAnalysis.findings.some(f => f.issue.toLowerCase().includes('maintenance'))) {
    actions.push({
      title: 'Address deferred maintenance items',
      urgency: 'monitor_closely',
      category: 'operations',
      whyItMatters: 'Deferred maintenance increases both claim frequency and underwriting concern.',
      estimatedImpact: 'Reduces loss exposure and improves renewal position.',
      score: 75,
    });
  }
  
  // Severe deductible stress
  if (deductibleAnalysis.adequacyStatus === 'severe') {
    actions.push({
      title: 'Increase emergency cash reserves or reduce deductible',
      urgency: 'fix_before_renewal',
      category: 'deductible',
      whyItMatters: 'Current deductible may create immediate cash flow pressure after a loss.',
      estimatedImpact: 'Improves financial flexibility during claim recovery period.',
      score: 80,
    });
  }
  
  // Missing flood coverage in flood zone
  const floodFinding = hazardsAnalysis.findings.find(f => f.hazard === 'Missing Flood Coverage');
  if (floodFinding) {
    actions.push({
      title: 'Obtain flood insurance coverage',
      urgency: 'fix_now',
      category: 'hazard',
      whyItMatters: 'Property is in flood zone but flood coverage not identified. Flood damage would be entirely uncovered by standard policy.',
      estimatedImpact: 'Eliminates catastrophic flood exposure gap.',
      score: 100,
    });
  }
  
  // Liability inadequacy
  if (liabilityAnalysis.adequacyStatus === 'inadequate') {
    actions.push({
      title: 'Increase liability coverage limits',
      urgency: 'fix_before_renewal',
      category: 'liability',
      whyItMatters: 'Current liability protection may be insufficient for severe incidents given property exposure factors.',
      estimatedImpact: 'Protects against catastrophic liability claims that could exceed current limits.',
      score: 75,
    });
  }
  
  // Coinsurance penalty risk
  if (propertyAnalysis.coinsuranceFinding) {
    actions.push({
      title: 'Review coinsurance compliance',
      urgency: 'fix_before_renewal',
      category: 'property',
      whyItMatters: 'Coinsurance penalty may further reduce claim payment if property is underinsured at time of loss.',
      estimatedImpact: 'Prevents claim payout reductions due to underinsurance penalties.',
      score: 85,
    });
  }
  
  // Sort by score (highest priority first) and take top 7
  actions.sort((a, b) => b.score - a.score);
  return actions.slice(0, 7);
}

module.exports = {
  generatePriorityActions,
};
