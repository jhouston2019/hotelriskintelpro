const { SCORE_WEIGHTS, SCORE_BANDS } = require('./constants');

/**
 * Calculate overall survivability score
 * @param {Object} propertyAnalysis
 * @param {Object} biAnalysis
 * @param {Object} liabilityAnalysis
 * @param {Object} deductibleAnalysis
 * @param {Object} lossHistoryAnalysis
 * @param {Object} operationsAnalysis
 * @param {Object} hazardsAnalysis
 * @returns {Object} Score result
 */
function calculateSurvivabilityScore(
  propertyAnalysis,
  biAnalysis,
  liabilityAnalysis,
  deductibleAnalysis,
  lossHistoryAnalysis,
  operationsAnalysis,
  hazardsAnalysis
) {
  // Aggregate subscores
  const propertyScore = propertyAnalysis.subscore || 0;
  const biScore = biAnalysis.subscore || 0;
  const liabilityScore = liabilityAnalysis.subscore || 0;
  const deductibleScore = deductibleAnalysis.subscore || 0;
  const lossHistoryScore = lossHistoryAnalysis.subscore || 0;
  const operationsScore = operationsAnalysis.subscore || 0;
  const hazardsScore = hazardsAnalysis.subscore || 0;
  
  const totalScore = Math.round(
    propertyScore + 
    biScore + 
    liabilityScore + 
    deductibleScore + 
    lossHistoryScore + 
    operationsScore + 
    hazardsScore
  );
  
  // Determine band
  let survivabilityBand = 'weak';
  for (const [band, range] of Object.entries(SCORE_BANDS)) {
    if (totalScore >= range.min && totalScore <= range.max) {
      survivabilityBand = band;
      break;
    }
  }
  
  // Component breakdown for transparency
  const breakdown = {
    property: { score: propertyScore, weight: SCORE_WEIGHTS.property },
    businessInterruption: { score: biScore, weight: SCORE_WEIGHTS.businessInterruption },
    liability: { score: liabilityScore, weight: SCORE_WEIGHTS.liability },
    deductible: { score: deductibleScore, weight: SCORE_WEIGHTS.deductible },
    lossHistory: { score: lossHistoryScore, weight: SCORE_WEIGHTS.lossHistory },
    operations: { score: operationsScore, weight: SCORE_WEIGHTS.operations },
    hazards: { score: hazardsScore, weight: SCORE_WEIGHTS.hazards },
  };
  
  return {
    survivabilityScore: totalScore,
    survivabilityBand,
    breakdown,
  };
}

module.exports = {
  calculateSurvivabilityScore,
};
