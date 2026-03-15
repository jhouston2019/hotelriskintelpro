const { PROPERTY_DEFAULTS } = require('./constants');
const { parseNumber, formatCurrency, calculateBuildingAge } = require('./utils');

/**
 * Analyze property coverage adequacy
 * @param {Object} hotelProfile
 * @param {Object} policyProfile
 * @returns {Object} Property analysis
 */
function analyzePropertyCoverage(hotelProfile, policyProfile) {
  const propertyLimit = parseNumber(policyProfile?.propertyLimit);
  const squareFootage = parseNumber(hotelProfile?.squareFootage);
  const numberOfRooms = parseNumber(hotelProfile?.numberOfRooms);
  const yearBuilt = parseNumber(hotelProfile?.yearBuilt);
  const yearRenovated = parseNumber(hotelProfile?.yearRenovated);
  const constructionType = hotelProfile?.constructionType?.toLowerCase();
  
  // Estimate replacement cost
  let estimatedReplacementCost = null;
  let estimationMethod = null;
  
  if (squareFootage) {
    // Use square footage if available
    const costPerSqFt = PROPERTY_DEFAULTS.REPLACEMENT_COST_PER_SQFT[constructionType] 
      || PROPERTY_DEFAULTS.REPLACEMENT_COST_PER_SQFT.default;
    estimatedReplacementCost = squareFootage * costPerSqFt;
    estimationMethod = 'square_footage';
  } else if (numberOfRooms) {
    // Fallback to room count proxy
    const estimatedSqFt = numberOfRooms * PROPERTY_DEFAULTS.AVG_SQFT_PER_ROOM;
    const costPerSqFt = PROPERTY_DEFAULTS.REPLACEMENT_COST_PER_SQFT.default;
    estimatedReplacementCost = estimatedSqFt * costPerSqFt;
    estimationMethod = 'room_count_proxy';
  }
  
  // Apply age uplift for older properties without recent renovation
  if (estimatedReplacementCost && yearBuilt) {
    const buildingAge = calculateBuildingAge(yearBuilt);
    const yearsSinceRenovation = yearRenovated ? calculateBuildingAge(yearRenovated) : buildingAge;
    
    if (buildingAge > PROPERTY_DEFAULTS.AGE_UPLIFT_THRESHOLD_YEARS && yearsSinceRenovation > 15) {
      estimatedReplacementCost *= PROPERTY_DEFAULTS.AGE_UPLIFT_FACTOR;
      estimationMethod += '_with_age_uplift';
    }
  }
  
  // Calculate gap
  let propertyGap = null;
  let adequacyStatus = 'unknown';
  let explanation = '';
  
  if (estimatedReplacementCost && propertyLimit) {
    propertyGap = Math.max(0, estimatedReplacementCost - propertyLimit);
    const gapPercentage = (propertyGap / estimatedReplacementCost) * 100;
    
    if (propertyGap === 0) {
      adequacyStatus = 'adequate';
      explanation = 'Property coverage appears adequate for estimated replacement cost.';
    } else if (gapPercentage <= 10) {
      adequacyStatus = 'marginal';
      explanation = `Property coverage is slightly below estimated replacement need by approximately ${formatCurrency(propertyGap)}. This may be acceptable depending on coinsurance terms and actual rebuild scope.`;
    } else {
      adequacyStatus = 'inadequate';
      explanation = `Your hotel may be underinsured by approximately ${formatCurrency(propertyGap)} for a major property loss. A total loss could leave a large portion of rebuilding costs uncovered.`;
    }
  } else if (!propertyLimit) {
    adequacyStatus = 'unknown';
    explanation = 'Property coverage limit not provided. Unable to assess adequacy.';
  } else if (!estimatedReplacementCost) {
    adequacyStatus = 'unknown';
    explanation = 'Insufficient property data to estimate replacement cost. Analysis confidence is low.';
  }
  
  // Check ordinance/law coverage
  const ordinanceLawCoverage = parseNumber(policyProfile?.ordinanceLawCoverage);
  const buildingAge = yearBuilt ? calculateBuildingAge(yearBuilt) : null;
  const needsOrdinanceLaw = buildingAge && buildingAge > 30;
  
  let ordinanceLawFinding = null;
  if (needsOrdinanceLaw && (!ordinanceLawCoverage || ordinanceLawCoverage === 0)) {
    ordinanceLawFinding = 'Older property without ordinance or law coverage may face code-upgrade costs during rebuild that are not covered by standard property insurance.';
  }
  
  // Check coinsurance risk
  const coinsurancePct = parseNumber(policyProfile?.coinsurancePct);
  let coinsuranceFinding = null;
  if (coinsurancePct && coinsurancePct >= 80 && adequacyStatus === 'inadequate') {
    coinsuranceFinding = `Coinsurance penalty may further reduce claim payment if property is underinsured at time of loss. With ${coinsurancePct}% coinsurance, being underinsured can trigger significant payout reductions.`;
  }

  return {
    estimatedReplacementCost,
    estimationMethod,
    propertyLimit,
    propertyGap,
    adequacyStatus,
    explanation,
    ordinanceLawFinding,
    coinsuranceFinding,
    subscore: calculatePropertySubscore(adequacyStatus, propertyGap, estimatedReplacementCost),
  };
}

/**
 * Calculate property subscore (0-30)
 * @param {string} adequacyStatus
 * @param {number|null} propertyGap
 * @param {number|null} estimatedReplacementCost
 * @returns {number}
 */
function calculatePropertySubscore(adequacyStatus, propertyGap, estimatedReplacementCost) {
  if (adequacyStatus === 'unknown') return 15;
  if (adequacyStatus === 'adequate') return 30;
  
  if (adequacyStatus === 'marginal') return 25;
  
  if (adequacyStatus === 'inadequate' && propertyGap && estimatedReplacementCost) {
    const gapPct = (propertyGap / estimatedReplacementCost) * 100;
    if (gapPct > 40) return 5;
    if (gapPct > 25) return 10;
    if (gapPct > 15) return 15;
    return 20;
  }
  
  return 15;
}

module.exports = {
  analyzePropertyCoverage,
};
