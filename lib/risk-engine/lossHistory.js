const { LOSS_HISTORY_DEFAULTS } = require('./constants');
const { parseNumber, formatCurrency, getCurrentYear } = require('./utils');

/**
 * Analyze loss history and renewal pressure
 * @param {Array} lossRuns
 * @returns {Object} Loss history analysis
 */
function analyzeLossHistory(lossRuns = []) {
  const totalClaims = lossRuns.length;
  const openClaimsCount = lossRuns.filter(claim => claim.status === 'Open' || claim.status === 'open').length;
  
  // Calculate total paid losses
  const totalPaidLosses = lossRuns.reduce((sum, claim) => {
    return sum + (parseNumber(claim.amountPaid) || 0);
  }, 0);
  
  // Identify recurring categories
  const claimTypeCount = {};
  lossRuns.forEach(claim => {
    const type = claim.claimType || claim.type || 'Unknown';
    claimTypeCount[type] = (claimTypeCount[type] || 0) + 1;
  });
  
  const recurringCategories = Object.entries(claimTypeCount)
    .filter(([_, count]) => count >= LOSS_HISTORY_DEFAULTS.RECURRING_PATTERN_THRESHOLD)
    .map(([type, count]) => ({ type, count }));
  
  // Analyze recent claims (last 3 years)
  const currentYear = getCurrentYear();
  const recentClaims = lossRuns.filter(claim => {
    const claimYear = parseNumber(claim.claimYear);
    return claimYear && (currentYear - claimYear) <= LOSS_HISTORY_DEFAULTS.RECENT_CLAIMS_WINDOW;
  });
  
  // Determine loss pressure band
  let lossPressureBand = 'low';
  let explanation = '';
  const findings = [];
  
  if (totalClaims === 0) {
    lossPressureBand = 'low';
    explanation = 'No claims reported in available loss history. This suggests lower immediate renewal pressure.';
  } else if (totalClaims >= LOSS_HISTORY_DEFAULTS.HIGH_PRESSURE_CLAIM_COUNT || 
             recentClaims.length >= 3 || 
             openClaimsCount >= 2 || 
             recurringCategories.length >= 2) {
    lossPressureBand = 'high';
    explanation = 'Your loss history may create significant renewal pressure or result in coverage restrictions.';
    
    if (recurringCategories.length > 0) {
      findings.push(`Repeated ${recurringCategories.map(r => r.type).join(' and ')} claims may increase non-renewal risk or trigger exclusions.`);
    }
    if (openClaimsCount > 0) {
      findings.push(`${openClaimsCount} open claim${openClaimsCount > 1 ? 's' : ''} may affect renewal leverage and premium negotiations.`);
    }
    if (recentClaims.length >= 3) {
      findings.push(`${recentClaims.length} claims in the past ${LOSS_HISTORY_DEFAULTS.RECENT_CLAIMS_WINDOW} years may signal elevated risk to underwriters.`);
    }
  } else if (totalClaims >= LOSS_HISTORY_DEFAULTS.MODERATE_PRESSURE_CLAIM_COUNT || 
             recentClaims.length >= 2 || 
             openClaimsCount >= 1 || 
             recurringCategories.length >= 1) {
    lossPressureBand = 'moderate';
    explanation = 'Your loss history shows some claim activity that may influence renewal terms or premiums.';
    
    if (recurringCategories.length > 0) {
      findings.push(`Multiple ${recurringCategories[0].type} claims may warrant underwriting attention.`);
    }
    if (openClaimsCount > 0) {
      findings.push('Open claim may be reviewed during renewal process.');
    }
  } else {
    lossPressureBand = 'low';
    explanation = 'Limited recent loss activity suggests lower immediate renewal pressure.';
  }
  
  // Water damage specific analysis
  const waterClaims = lossRuns.filter(c => 
    (c.claimType || c.type || '').toLowerCase().includes('water') ||
    (c.causeOfLoss || '').toLowerCase().includes('water') ||
    (c.causeOfLoss || '').toLowerCase().includes('leak')
  );
  
  if (waterClaims.length >= 2) {
    findings.push(`${waterClaims.length} water-related claims suggest potential ongoing moisture or plumbing issues that may increase underwriting scrutiny.`);
  }

  return {
    totalClaims,
    openClaimsCount,
    totalPaidLosses,
    recurringCategories: recurringCategories.map(r => r.type),
    recentClaimsCount: recentClaims.length,
    lossPressureBand,
    explanation,
    findings,
    subscore: calculateLossHistorySubscore(lossPressureBand, totalClaims, openClaimsCount),
  };
}

/**
 * Calculate loss history subscore (0-5)
 * @param {string} lossPressureBand
 * @param {number} totalClaims
 * @param {number} openClaimsCount
 * @returns {number}
 */
function calculateLossHistorySubscore(lossPressureBand, totalClaims, openClaimsCount) {
  if (lossPressureBand === 'low') return 5;
  if (lossPressureBand === 'moderate') return 3;
  if (lossPressureBand === 'high') {
    if (totalClaims >= 6 || openClaimsCount >= 3) return 0;
    return 1;
  }
  return 3;
}

module.exports = {
  analyzeLossHistory,
};
