const { LIABILITY_DEFAULTS } = require('./constants');
const { parseNumber, formatCurrency } = require('./utils');

/**
 * Analyze liability coverage adequacy
 * @param {Object} hotelProfile
 * @param {Object} policyProfile
 * @param {Object} hazardProfile
 * @returns {Object} Liability analysis
 */
function analyzeLiabilityCoverage(hotelProfile, policyProfile, hazardProfile) {
  const liabilityLimit = parseNumber(policyProfile?.liabilityLimit);
  const umbrellaLimit = parseNumber(policyProfile?.umbrellaLimit);
  const effectiveLiabilityProtection = (liabilityLimit || 0) + (umbrellaLimit || 0);
  
  // Estimate liability need range based on exposure factors
  let estimatedNeedLow = LIABILITY_DEFAULTS.BASE_NEED_LOW;
  let estimatedNeedHigh = LIABILITY_DEFAULTS.BASE_NEED_HIGH;
  const exposureFactors = [];
  
  if (hotelProfile?.hasPoolSpa) {
    estimatedNeedHigh += LIABILITY_DEFAULTS.POOL_SPA_INCREMENT;
    exposureFactors.push('pool/spa');
  }
  
  if (hotelProfile?.hasRestaurantBar) {
    estimatedNeedHigh += LIABILITY_DEFAULTS.RESTAURANT_BAR_INCREMENT;
    exposureFactors.push('restaurant/bar');
  }
  
  if (hotelProfile?.hasEventSpace) {
    estimatedNeedLow += LIABILITY_DEFAULTS.EVENT_SPACE_INCREMENT / 2;
    estimatedNeedHigh += LIABILITY_DEFAULTS.EVENT_SPACE_INCREMENT;
    exposureFactors.push('event space');
  }
  
  if (hotelProfile?.hasParkingStructureOrValet) {
    estimatedNeedHigh += LIABILITY_DEFAULTS.PARKING_VALET_INCREMENT;
    exposureFactors.push('parking/valet');
  }
  
  if (hazardProfile?.litigationSensitivity === 'high') {
    estimatedNeedLow += LIABILITY_DEFAULTS.HIGH_LITIGATION_INCREMENT / 2;
    estimatedNeedHigh += LIABILITY_DEFAULTS.HIGH_LITIGATION_INCREMENT;
    exposureFactors.push('high-litigation jurisdiction');
  }
  
  // Determine adequacy
  let adequacyStatus = 'unknown';
  let explanation = '';
  
  if (effectiveLiabilityProtection > 0) {
    const adequateThreshold = estimatedNeedHigh * LIABILITY_DEFAULTS.ADEQUATE_COVERAGE_MULTIPLE;
    const marginalThreshold = estimatedNeedLow * LIABILITY_DEFAULTS.MARGINAL_COVERAGE_MULTIPLE;
    
    if (effectiveLiabilityProtection >= adequateThreshold) {
      adequacyStatus = 'adequate';
      explanation = `Your liability coverage (${formatCurrency(effectiveLiabilityProtection)} including umbrella) appears broadly aligned with common hotel exposure.`;
    } else if (effectiveLiabilityProtection >= marginalThreshold) {
      adequacyStatus = 'marginal';
      explanation = `Your liability coverage is ${formatCurrency(effectiveLiabilityProtection)}. Given your property's exposure factors (${exposureFactors.join(', ')}), you may want to consider stronger liability protection in the ${formatCurrency(estimatedNeedHigh)}+ range.`;
    } else {
      adequacyStatus = 'inadequate';
      explanation = `Current liability protection (${formatCurrency(effectiveLiabilityProtection)}) may be light for the exposure profile of this property. Amenities and guest traffic suggest liability needs in the ${formatCurrency(estimatedNeedLow)}-${formatCurrency(estimatedNeedHigh)} range.`;
    }
  } else {
    adequacyStatus = 'unknown';
    explanation = 'Liability coverage limit not provided. Unable to assess adequacy.';
  }
  
  // Umbrella finding
  let umbrellaFinding = null;
  if (!umbrellaLimit && liabilityLimit && liabilityLimit < 5000000) {
    umbrellaFinding = 'Consider adding umbrella coverage to increase total liability protection beyond primary policy limits.';
  }

  return {
    liabilityLimit,
    umbrellaLimit,
    effectiveLiabilityProtection,
    estimatedNeedLow,
    estimatedNeedHigh,
    exposureFactors,
    adequacyStatus,
    explanation,
    umbrellaFinding,
    subscore: calculateLiabilitySubscore(adequacyStatus, effectiveLiabilityProtection, estimatedNeedHigh),
  };
}

/**
 * Calculate liability subscore (0-15)
 * @param {string} adequacyStatus
 * @param {number} effectiveProtection
 * @param {number} estimatedNeedHigh
 * @returns {number}
 */
function calculateLiabilitySubscore(adequacyStatus, effectiveProtection, estimatedNeedHigh) {
  if (adequacyStatus === 'unknown') return 8;
  if (adequacyStatus === 'adequate') return 15;
  if (adequacyStatus === 'marginal') return 12;
  
  if (adequacyStatus === 'inadequate') {
    const coverageRatio = effectiveProtection / estimatedNeedHigh;
    if (coverageRatio < 0.3) return 3;
    if (coverageRatio < 0.5) return 6;
    if (coverageRatio < 0.7) return 9;
    return 10;
  }
  
  return 8;
}

module.exports = {
  analyzeLiabilityCoverage,
};
