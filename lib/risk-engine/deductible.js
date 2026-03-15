const { DEDUCTIBLE_DEFAULTS } = require('./constants');
const { parseNumber, formatCurrency } = require('./utils');

/**
 * Analyze deductible stress and cash flow impact
 * @param {Object} financialProfile
 * @param {Object} policyProfile
 * @returns {Object} Deductible analysis
 */
function analyzeDeductibleStress(financialProfile, policyProfile) {
  const deductible = parseNumber(policyProfile?.deductible);
  const emergencyReserves = parseNumber(financialProfile?.emergencyCashReserves);
  const fixedMonthlyCosts = parseNumber(financialProfile?.fixedMonthlyOperatingCosts);
  const monthlyPayroll = parseNumber(financialProfile?.monthlyPayrollBurden);
  const monthlyDebt = parseNumber(financialProfile?.monthlyDebtService);
  
  const monthlyObligationPressure = (fixedMonthlyCosts || 0) + (monthlyPayroll || 0) + (monthlyDebt || 0);
  
  let adequacyStatus = 'unknown';
  let explanation = '';
  
  if (deductible && emergencyReserves !== null && monthlyObligationPressure > 0) {
    const deductibleReservePct = deductible / emergencyReserves;
    const deductibleMonthlyMultiple = deductible / monthlyObligationPressure;
    
    if (deductibleReservePct <= DEDUCTIBLE_DEFAULTS.MANAGEABLE_RESERVE_PCT && 
        deductibleMonthlyMultiple <= DEDUCTIBLE_DEFAULTS.MANAGEABLE_MONTHLY_MULTIPLE) {
      adequacyStatus = 'manageable';
      explanation = `Your deductible (${formatCurrency(deductible)}) appears manageable relative to current liquidity and monthly obligations.`;
    } else if (deductibleReservePct >= DEDUCTIBLE_DEFAULTS.STRESSFUL_RESERVE_PCT || 
               deductibleMonthlyMultiple >= DEDUCTIBLE_DEFAULTS.STRESSFUL_MONTHLY_MULTIPLE) {
      adequacyStatus = 'severe';
      explanation = `Your deductible (${formatCurrency(deductible)}) represents ${Math.round(deductibleReservePct * 100)}% of emergency reserves and ${deductibleMonthlyMultiple.toFixed(1)}x monthly obligations. A large deductible combined with fixed obligations may create immediate financial pressure before claim payments stabilize.`;
    } else {
      adequacyStatus = 'stressful';
      explanation = `Your deductible (${formatCurrency(deductible)}) may create short-term cash stress following a major loss, consuming ${Math.round(deductibleReservePct * 100)}% of emergency reserves.`;
    }
  } else if (!deductible) {
    adequacyStatus = 'unknown';
    explanation = 'Deductible amount not provided. Unable to assess cash flow impact.';
  } else if (emergencyReserves === null) {
    adequacyStatus = 'unknown';
    explanation = 'Emergency cash reserves not provided. Unable to assess deductible manageability.';
  }

  return {
    deductible,
    emergencyReserves,
    monthlyObligationPressure,
    adequacyStatus,
    explanation,
    subscore: calculateDeductibleSubscore(adequacyStatus),
  };
}

/**
 * Calculate deductible subscore (0-10)
 * @param {string} adequacyStatus
 * @returns {number}
 */
function calculateDeductibleSubscore(adequacyStatus) {
  if (adequacyStatus === 'unknown') return 5;
  if (adequacyStatus === 'manageable') return 10;
  if (adequacyStatus === 'stressful') return 6;
  if (adequacyStatus === 'severe') return 2;
  return 5;
}

module.exports = {
  analyzeDeductibleStress,
};
