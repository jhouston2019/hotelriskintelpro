const { SCENARIO_DEFAULTS } = require('./constants');
const { parseNumber, formatCurrency } = require('./utils');
const { estimateRecoveryMonths } = require('./businessInterruption');

/**
 * Generate scenario analyses
 * @param {Object} hotelProfile
 * @param {Object} financialProfile
 * @param {Object} policyProfile
 * @param {Object} hazardProfile
 * @param {Object} propertyAnalysis
 * @returns {Object} Scenario results
 */
function generateScenarios(hotelProfile, financialProfile, policyProfile, hazardProfile, propertyAnalysis) {
  const fireScenario = generateFireScenario(hotelProfile, financialProfile, policyProfile, hazardProfile, propertyAnalysis);
  const waterScenario = generateWaterScenario(hotelProfile, financialProfile, policyProfile, hazardProfile);
  const liabilityScenario = generateLiabilityScenario(hotelProfile, policyProfile, hazardProfile);
  const partialShutdownScenario = generatePartialShutdownScenario(hotelProfile, financialProfile, policyProfile);
  
  return {
    fireScenario,
    waterScenario,
    liabilityScenario,
    partialShutdownScenario,
  };
}

/**
 * Generate fire scenario
 */
function generateFireScenario(hotelProfile, financialProfile, policyProfile, hazardProfile, propertyAnalysis) {
  const estimatedReplacementCost = propertyAnalysis.estimatedReplacementCost || 0;
  const propertyLimit = parseNumber(policyProfile?.propertyLimit) || 0;
  const biLimit = parseNumber(policyProfile?.businessInterruptionLimit) || 0;
  const monthlyRevenue = parseNumber(financialProfile?.annualGrossRevenue) / 12 || 0;
  
  // Estimate fire loss (40% of replacement cost as default)
  const estimatedLossAmount = estimatedReplacementCost * SCENARIO_DEFAULTS.FIRE_LOSS_PCT_DEFAULT;
  
  // Estimate downtime
  const recoveryEstimate = estimateRecoveryMonths(hotelProfile, hazardProfile, 'majorFire');
  const estimatedDowntimeMonths = recoveryEstimate.months;
  
  // Calculate covered vs uncovered
  const propertyCovered = Math.min(estimatedLossAmount, propertyLimit);
  const propertyUncovered = Math.max(0, estimatedLossAmount - propertyLimit);
  
  const biMonthsCovered = monthlyRevenue > 0 ? Math.floor(biLimit / monthlyRevenue) : 0;
  const biCoveredMonths = Math.min(estimatedDowntimeMonths, biMonthsCovered);
  const biUncoveredMonths = Math.max(0, estimatedDowntimeMonths - biMonthsCovered);
  const biUncovered = biUncoveredMonths * monthlyRevenue;
  
  const totalUncovered = propertyUncovered + biUncovered;
  
  const summary = `A major fire affecting approximately 40% of the property could result in ${formatCurrency(estimatedLossAmount)} in property damage and ${estimatedDowntimeMonths} months of downtime. Your insurance may cover ${formatCurrency(propertyCovered)} in property damage and ${biCoveredMonths} months of lost revenue, leaving approximately ${formatCurrency(totalUncovered)} in uncovered exposure.`;
  
  return {
    title: 'Major Fire Scenario',
    estimatedLossAmount,
    estimatedDowntimeMonths,
    estimatedCoveredMonths: biCoveredMonths,
    estimatedUncoveredAmount: totalUncovered,
    summary,
  };
}

/**
 * Generate water damage scenario
 */
function generateWaterScenario(hotelProfile, financialProfile, policyProfile, hazardProfile) {
  const numberOfRooms = parseNumber(hotelProfile?.numberOfRooms) || 0;
  const squareFootage = parseNumber(hotelProfile?.squareFootage) || (numberOfRooms * 600);
  const propertyLimit = parseNumber(policyProfile?.propertyLimit) || 0;
  const biLimit = parseNumber(policyProfile?.businessInterruptionLimit) || 0;
  const monthlyRevenue = parseNumber(financialProfile?.annualGrossRevenue) / 12 || 0;
  
  // Estimate water loss (20% of property value as default)
  const estimatedPropertyValue = squareFootage * 350;
  const estimatedLossAmount = estimatedPropertyValue * SCENARIO_DEFAULTS.WATER_LOSS_PCT_DEFAULT;
  
  // Estimate downtime
  const recoveryEstimate = estimateRecoveryMonths(hotelProfile, hazardProfile, 'majorWater');
  const estimatedDowntimeMonths = recoveryEstimate.months;
  
  // Calculate covered vs uncovered
  const propertyCovered = Math.min(estimatedLossAmount, propertyLimit);
  const propertyUncovered = Math.max(0, estimatedLossAmount - propertyLimit);
  
  const biMonthsCovered = monthlyRevenue > 0 ? Math.floor(biLimit / monthlyRevenue) : 0;
  const biCoveredMonths = Math.min(estimatedDowntimeMonths, biMonthsCovered);
  const biUncoveredMonths = Math.max(0, estimatedDowntimeMonths - biMonthsCovered);
  const biUncovered = biUncoveredMonths * monthlyRevenue;
  
  const totalUncovered = propertyUncovered + biUncovered;
  
  const summary = `A major water event (pipe burst, roof failure, or flood-related damage) could result in ${formatCurrency(estimatedLossAmount)} in property damage and ${estimatedDowntimeMonths} months of downtime. Your insurance may cover ${formatCurrency(propertyCovered)} in property damage and ${biCoveredMonths} months of lost revenue, leaving approximately ${formatCurrency(totalUncovered)} in uncovered exposure.`;
  
  return {
    title: 'Major Water Damage Scenario',
    estimatedLossAmount,
    estimatedDowntimeMonths,
    estimatedCoveredMonths: biCoveredMonths,
    estimatedUncoveredAmount: totalUncovered,
    summary,
  };
}

/**
 * Generate liability scenario
 */
function generateLiabilityScenario(hotelProfile, policyProfile, hazardProfile) {
  const liabilityLimit = parseNumber(policyProfile?.liabilityLimit) || 0;
  const umbrellaLimit = parseNumber(policyProfile?.umbrellaLimit) || 0;
  const effectiveProtection = liabilityLimit + umbrellaLimit;
  
  // Use typical liability incident amount
  const typicalIncident = SCENARIO_DEFAULTS.LIABILITY_INCIDENT_TYPICAL;
  const severeIncident = SCENARIO_DEFAULTS.LIABILITY_INCIDENT_HIGH;
  
  let summary = '';
  if (effectiveProtection >= severeIncident) {
    summary = `Your liability protection (${formatCurrency(effectiveProtection)}) appears adequate for most liability scenarios. A typical guest injury claim (${formatCurrency(typicalIncident)}) would be covered, as would more severe incidents up to your policy limits.`;
  } else if (effectiveProtection >= typicalIncident) {
    summary = `Your liability protection (${formatCurrency(effectiveProtection)}) would cover typical guest injury claims (${formatCurrency(typicalIncident)}), but a severe incident exceeding ${formatCurrency(effectiveProtection)} could create uncovered exposure. Given your amenities${hotelProfile?.hasPoolSpa ? ' (including pool/spa)' : ''}${hotelProfile?.hasRestaurantBar ? ' and restaurant/bar operations' : ''}, consider whether current limits are sufficient.`;
  } else {
    summary = `Your liability protection (${formatCurrency(effectiveProtection)}) may be insufficient for severe liability scenarios. A major guest injury, food-related illness outbreak, or premises liability claim could exceed your coverage, particularly in high-litigation jurisdictions.`;
  }
  
  const estimatedUncovered = Math.max(0, severeIncident - effectiveProtection);
  
  return {
    title: 'Severe Liability Scenario',
    estimatedLossAmount: severeIncident,
    estimatedDowntimeMonths: 0,
    estimatedCoveredMonths: 0,
    estimatedUncoveredAmount: estimatedUncovered,
    summary,
  };
}

/**
 * Generate partial shutdown scenario
 */
function generatePartialShutdownScenario(hotelProfile, financialProfile, policyProfile) {
  const numberOfRooms = parseNumber(hotelProfile?.numberOfRooms) || 0;
  const annualRevenue = parseNumber(financialProfile?.annualGrossRevenue) || 0;
  const monthlyRevenue = annualRevenue / 12;
  const biLimit = parseNumber(policyProfile?.businessInterruptionLimit) || 0;
  
  // Assume 40% of rooms affected
  const affectedRooms = Math.floor(numberOfRooms * SCENARIO_DEFAULTS.PARTIAL_SHUTDOWN_ROOM_PCT);
  const revenueImpact = SCENARIO_DEFAULTS.PARTIAL_SHUTDOWN_REVENUE_IMPACT;
  const monthlyRevenueLoss = monthlyRevenue * revenueImpact;
  
  // Estimate downtime for partial shutdown
  const recoveryEstimate = estimateRecoveryMonths(hotelProfile, {}, 'partialShutdown');
  const estimatedDowntimeMonths = recoveryEstimate.months;
  
  const totalRevenueLoss = monthlyRevenueLoss * estimatedDowntimeMonths;
  const biMonthsCovered = monthlyRevenueLoss > 0 ? Math.floor(biLimit / monthlyRevenueLoss) : 0;
  const biCoveredMonths = Math.min(estimatedDowntimeMonths, biMonthsCovered);
  const biUncoveredMonths = Math.max(0, estimatedDowntimeMonths - biCoveredMonths);
  const biUncovered = biUncoveredMonths * monthlyRevenueLoss;
  
  const summary = `A partial shutdown (e.g., wing closure, major mechanical failure, or remediation project) affecting approximately ${affectedRooms} rooms could reduce revenue by ${Math.round(revenueImpact * 100)}% for ${estimatedDowntimeMonths} months. Total revenue impact: ${formatCurrency(totalRevenueLoss)}. Your BI coverage may support ${biCoveredMonths} months, leaving approximately ${formatCurrency(biUncovered)} in uncovered revenue loss.`;
  
  return {
    title: 'Partial Shutdown Scenario',
    estimatedLossAmount: totalRevenueLoss,
    estimatedDowntimeMonths,
    estimatedCoveredMonths: biCoveredMonths,
    estimatedUncoveredAmount: biUncovered,
    summary,
  };
}

module.exports = {
  generateScenarios,
};
