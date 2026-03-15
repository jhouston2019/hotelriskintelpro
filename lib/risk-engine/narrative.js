const { formatCurrency } = require('./utils');

/**
 * Generate "If Nothing Changes" narrative
 * @param {Object} propertyAnalysis
 * @param {Object} biAnalysis
 * @param {Object} lossHistoryAnalysis
 * @param {Object} operationsAnalysis
 * @returns {string} Narrative text
 */
function generateIfNothingChangesNarrative(
  propertyAnalysis,
  biAnalysis,
  lossHistoryAnalysis,
  operationsAnalysis
) {
  const risks = [];
  
  // Property risk
  if (propertyAnalysis.adequacyStatus === 'inadequate' && propertyAnalysis.propertyGap > 0) {
    risks.push(`${formatCurrency(propertyAnalysis.propertyGap)} in uninsured rebuilding costs`);
  }
  
  // BI risk
  if (biAnalysis.adequacyStatus === 'inadequate' && biAnalysis.uncoveredExposure > 0) {
    risks.push(`${formatCurrency(biAnalysis.uncoveredExposure)} in uncovered revenue during extended recovery`);
  }
  
  // Build narrative
  let narrative = 'If a serious loss occurs under current conditions, your hotel may face ';
  
  if (risks.length === 0) {
    narrative = 'Based on current analysis, your insurance coverage appears broadly aligned with identified risks. However, ongoing monitoring is recommended to ensure coverage keeps pace with property value changes, revenue growth, and evolving risk conditions.';
  } else if (risks.length === 1) {
    narrative += risks[0] + '.';
  } else {
    narrative += risks.join(' and ') + '.';
  }
  
  // Add loss history pressure if relevant
  if (lossHistoryAnalysis.lossPressureBand === 'high' && risks.length > 0) {
    narrative += ' Loss history and claim patterns may also increase renewal pressure or result in coverage restrictions if not addressed.';
  }
  
  // Add operational amplification if relevant
  if (operationsAnalysis.findings.length >= 2 && risks.length > 0) {
    narrative += ' Unresolved property and maintenance issues may further amplify loss severity and underwriting concern.';
  }
  
  // Add deductible/obligations context if severe
  if (risks.length > 0) {
    narrative += ' Combined with deductible obligations and potential coinsurance penalties, the total financial exposure could be substantial.';
  }
  
  return narrative;
}

/**
 * Generate headline findings
 * @param {Object} analyses
 * @returns {Array<string>} Headline findings
 */
function generateHeadlineFindings(analyses) {
  const headlines = [];
  
  const { propertyAnalysis, biAnalysis, liabilityAnalysis, deductibleAnalysis, lossHistoryAnalysis } = analyses;
  
  // Property finding
  if (propertyAnalysis.adequacyStatus === 'inadequate') {
    headlines.push('Your property appears materially underinsured.');
  } else if (propertyAnalysis.adequacyStatus === 'marginal') {
    headlines.push('Your property coverage is slightly below estimated replacement need.');
  }
  
  // BI finding
  if (biAnalysis.adequacyStatus === 'inadequate') {
    headlines.push('Your business interruption coverage would likely run out before full recovery.');
  } else if (biAnalysis.adequacyStatus === 'marginal') {
    headlines.push('Your business interruption coverage may be insufficient for extended recovery scenarios.');
  }
  
  // Loss history finding
  if (lossHistoryAnalysis.lossPressureBand === 'high') {
    headlines.push('Your loss history may increase renewal pressure or result in coverage restrictions.');
  }
  
  // Deductible finding
  if (deductibleAnalysis.adequacyStatus === 'severe' || deductibleAnalysis.adequacyStatus === 'stressful') {
    headlines.push('Your deductible may create short-term cash stress after a loss.');
  }
  
  // Liability finding
  if (liabilityAnalysis.adequacyStatus === 'inadequate') {
    headlines.push('Your liability coverage may be light for your property exposure profile.');
  }
  
  // If no major issues, add positive finding
  if (headlines.length === 0) {
    headlines.push('Your insurance coverage appears broadly aligned with identified risks.');
  }
  
  return headlines;
}

/**
 * Generate monitoring flags
 * @param {Object} analyses
 * @returns {Object} Monitoring flags
 */
function generateMonitoringFlags(analyses) {
  const { propertyAnalysis, biAnalysis, lossHistoryAnalysis, operationsAnalysis, hazardsAnalysis } = analyses;
  
  return {
    renewalRisk: lossHistoryAnalysis.lossPressureBand === 'high',
    underinsuranceRisk: propertyAnalysis.adequacyStatus === 'inadequate',
    biShortfallRisk: biAnalysis.adequacyStatus === 'inadequate',
    lossPatternRisk: lossHistoryAnalysis.recurringCategories.length > 0,
    operationalDeteriorationRisk: operationsAnalysis.findings.length >= 2,
    catastropheExposureRisk: hazardsAnalysis.findings.filter(f => f.severity === 'high').length > 0,
  };
}

module.exports = {
  generateIfNothingChangesNarrative,
  generateHeadlineFindings,
  generateMonitoringFlags,
};
