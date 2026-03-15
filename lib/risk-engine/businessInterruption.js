const { BI_DEFAULTS } = require('./constants');
const { parseNumber, formatCurrency, calculateBuildingAge } = require('./utils');

/**
 * Estimate recovery time for different scenarios
 * @param {Object} hotelProfile
 * @param {Object} hazardProfile
 * @param {string} severityType
 * @returns {Object} Recovery estimate
 */
function estimateRecoveryMonths(hotelProfile, hazardProfile, severityType = 'majorFire') {
  let baseRecovery = BI_DEFAULTS.RECOVERY_ESTIMATES[severityType] || BI_DEFAULTS.RECOVERY_ESTIMATES.majorFire;
  let adjustments = [];
  
  const numberOfRooms = parseNumber(hotelProfile?.numberOfRooms);
  const yearBuilt = parseNumber(hotelProfile?.yearBuilt);
  const contractorScarcity = hazardProfile?.contractorScarcity;
  
  // Large property adjustment
  if (numberOfRooms && numberOfRooms > BI_DEFAULTS.LARGE_PROPERTY_ROOM_THRESHOLD) {
    baseRecovery += BI_DEFAULTS.LARGE_PROPERTY_DELAY_MONTHS;
    adjustments.push('Large property size increases rebuild complexity');
  }
  
  // Old property adjustment
  if (yearBuilt) {
    const buildingAge = calculateBuildingAge(yearBuilt);
    if (buildingAge && buildingAge > (new Date().getFullYear() - BI_DEFAULTS.OLD_PROPERTY_YEAR_THRESHOLD)) {
      baseRecovery += BI_DEFAULTS.OLD_PROPERTY_DELAY_MONTHS;
      adjustments.push('Older construction may require additional rebuild time');
    }
  }
  
  // Contractor scarcity adjustment
  if (contractorScarcity === 'high' || contractorScarcity === true) {
    baseRecovery += BI_DEFAULTS.CONTRACTOR_SCARCITY_DELAY_MONTHS;
    adjustments.push('Local contractor scarcity may extend recovery timeline');
  }
  
  return {
    months: baseRecovery,
    rationale: adjustments.join('; '),
  };
}

/**
 * Analyze business interruption coverage adequacy
 * @param {Object} financialProfile
 * @param {Object} policyProfile
 * @param {Object} hotelProfile
 * @param {Object} hazardProfile
 * @returns {Object} BI analysis
 */
function analyzeBusinessInterruption(financialProfile, policyProfile, hotelProfile, hazardProfile) {
  const annualRevenue = parseNumber(financialProfile?.annualGrossRevenue);
  const biLimit = parseNumber(policyProfile?.businessInterruptionLimit);
  const biWaitingPeriodDays = parseNumber(policyProfile?.biWaitingPeriodDays);
  const fixedMonthlyCosts = parseNumber(financialProfile?.fixedMonthlyOperatingCosts);
  const monthlyPayroll = parseNumber(financialProfile?.monthlyPayrollBurden);
  const monthlyDebt = parseNumber(financialProfile?.monthlyDebtService);
  
  const monthlyRevenue = annualRevenue ? annualRevenue / 12 : null;
  const monthlyObligations = (fixedMonthlyCosts || 0) + (monthlyPayroll || 0) + (monthlyDebt || 0);
  
  // Calculate months covered
  let biMonthsCovered = null;
  if (biLimit && monthlyRevenue) {
    biMonthsCovered = Math.floor(biLimit / monthlyRevenue);
  }
  
  // Estimate recovery time
  const recoveryEstimate = estimateRecoveryMonths(hotelProfile, hazardProfile, 'majorFire');
  const estimatedRecoveryMonths = recoveryEstimate.months;
  
  // Calculate uncovered exposure
  let uncoveredMonths = null;
  let uncoveredExposure = null;
  let adequacyStatus = 'unknown';
  let explanation = '';
  
  if (biMonthsCovered !== null && estimatedRecoveryMonths) {
    uncoveredMonths = Math.max(0, estimatedRecoveryMonths - biMonthsCovered);
    uncoveredExposure = uncoveredMonths * (monthlyRevenue || 0);
    
    if (uncoveredMonths === 0) {
      adequacyStatus = 'adequate';
      explanation = `Your business interruption coverage appears adequate for typical recovery scenarios, supporting approximately ${biMonthsCovered} months of lost revenue.`;
    } else if (uncoveredMonths <= 2) {
      adequacyStatus = 'marginal';
      explanation = `Your business interruption coverage may support approximately ${biMonthsCovered} months of lost revenue. A major recovery could take ${estimatedRecoveryMonths} months, creating a potential ${uncoveredMonths}-month gap.`;
    } else {
      adequacyStatus = 'inadequate';
      explanation = `Your business interruption coverage would likely run out before full recovery. Coverage supports ${biMonthsCovered} months, but realistic recovery may require ${estimatedRecoveryMonths} months, leaving approximately ${formatCurrency(uncoveredExposure)} in uncovered revenue exposure.`;
    }
  } else if (!biLimit) {
    adequacyStatus = 'unknown';
    explanation = 'Business interruption limit not provided. Unable to assess coverage duration.';
  } else if (!monthlyRevenue) {
    adequacyStatus = 'unknown';
    explanation = 'Revenue data not provided. Unable to calculate coverage duration.';
  }
  
  // Waiting period impact
  let waitingPeriodFinding = null;
  if (biWaitingPeriodDays && biWaitingPeriodDays > 14) {
    const waitingMonths = Math.ceil(biWaitingPeriodDays / 30);
    waitingPeriodFinding = `Your policy has a ${biWaitingPeriodDays}-day waiting period before BI coverage begins. During this time, you must cover approximately ${formatCurrency(monthlyRevenue * (biWaitingPeriodDays / 30))} in lost revenue from reserves.`;
  }
  
  // Monthly obligations pressure
  let obligationsPressureFinding = null;
  if (monthlyObligations > 0 && uncoveredMonths > 0) {
    const totalObligationsExposure = monthlyObligations * uncoveredMonths;
    obligationsPressureFinding = `During uncovered months, you would still face approximately ${formatCurrency(totalObligationsExposure)} in fixed obligations (payroll, debt service, operating costs) without insurance support.`;
  }

  return {
    monthlyRevenue,
    biLimit,
    biMonthsCovered,
    estimatedRecoveryMonths,
    recoveryRationale: recoveryEstimate.rationale,
    uncoveredMonths,
    uncoveredExposure,
    adequacyStatus,
    explanation,
    waitingPeriodFinding,
    obligationsPressureFinding,
    subscore: calculateBISubscore(adequacyStatus, uncoveredMonths, estimatedRecoveryMonths),
  };
}

/**
 * Calculate BI subscore (0-30)
 * @param {string} adequacyStatus
 * @param {number|null} uncoveredMonths
 * @param {number|null} estimatedRecoveryMonths
 * @returns {number}
 */
function calculateBISubscore(adequacyStatus, uncoveredMonths, estimatedRecoveryMonths) {
  if (adequacyStatus === 'unknown') return 15;
  if (adequacyStatus === 'adequate') return 30;
  if (adequacyStatus === 'marginal') return 25;
  
  if (adequacyStatus === 'inadequate' && uncoveredMonths && estimatedRecoveryMonths) {
    const coverageRatio = (estimatedRecoveryMonths - uncoveredMonths) / estimatedRecoveryMonths;
    if (coverageRatio < 0.3) return 5;
    if (coverageRatio < 0.5) return 10;
    if (coverageRatio < 0.7) return 15;
    return 20;
  }
  
  return 15;
}

module.exports = {
  analyzeBusinessInterruption,
  estimateRecoveryMonths,
};
