const { CRITICAL_FIELDS } = require('./constants');
const { getNestedValue, hasValue } = require('./utils');

/**
 * Analyze data completeness and determine confidence level
 * @param {Object} input - Full input data
 * @returns {Object} Completeness analysis
 */
function analyzeCompleteness(input) {
  const missingCriticalFields = [];
  const assumptionsUsed = [];
  
  let essentialCount = 0;
  let essentialPresent = 0;
  let importantCount = 0;
  let importantPresent = 0;
  let preferredCount = 0;
  let preferredPresent = 0;

  // Check essential fields
  CRITICAL_FIELDS.essential.forEach(fieldPath => {
    essentialCount++;
    const value = getNestedValue(input, fieldPath);
    if (hasValue(value)) {
      essentialPresent++;
    } else {
      missingCriticalFields.push(fieldPath.split('.').pop());
    }
  });

  // Check important fields
  CRITICAL_FIELDS.important.forEach(fieldPath => {
    importantCount++;
    const value = getNestedValue(input, fieldPath);
    if (hasValue(value)) {
      importantPresent++;
    }
  });

  // Check preferred fields
  CRITICAL_FIELDS.preferred.forEach(fieldPath => {
    preferredCount++;
    const value = getNestedValue(input, fieldPath);
    if (hasValue(value)) {
      preferredPresent++;
    }
  });

  // Calculate weighted completeness
  const essentialPct = (essentialPresent / essentialCount) * 100;
  const importantPct = (importantPresent / importantCount) * 100;
  const preferredPct = (preferredPresent / preferredCount) * 100;
  
  const percentComplete = Math.round(
    (essentialPct * 0.6) + (importantPct * 0.3) + (preferredPct * 0.1)
  );

  // Determine confidence level
  let confidence = 'high';
  if (essentialPresent < essentialCount) {
    confidence = 'low';
  } else if (importantPresent < importantCount * 0.7) {
    confidence = 'moderate';
  }

  // Track assumptions
  if (!hasValue(input.hotelProfile?.squareFootage)) {
    assumptionsUsed.push('Property square footage estimated from room count');
  }
  if (!hasValue(input.policyProfile?.biRestorationPeriodMonths)) {
    assumptionsUsed.push('Business interruption restoration period estimated using recovery model');
  }
  if (!hasValue(input.hotelProfile?.yearBuilt)) {
    assumptionsUsed.push('Building age assumptions may affect property valuation accuracy');
  }
  if (!input.lossRuns || input.lossRuns.length === 0) {
    assumptionsUsed.push('Loss history analysis limited without claim data');
  }

  return {
    percentComplete,
    confidence,
    missingCriticalFields,
    assumptionsUsed,
  };
}

module.exports = {
  analyzeCompleteness,
};
