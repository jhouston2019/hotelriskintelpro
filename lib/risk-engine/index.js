/**
 * Hotel Risk Pro - Main Analysis Engine
 * 
 * This is the core orchestrator that runs all analysis modules
 * and produces a complete HotelRiskAnalysis output.
 */

const { analyzeCompleteness } = require('./completeness');
const { analyzePropertyCoverage } = require('./property');
const { analyzeBusinessInterruption } = require('./businessInterruption');
const { analyzeLiabilityCoverage } = require('./liability');
const { analyzeDeductibleStress } = require('./deductible');
const { analyzeLossHistory } = require('./lossHistory');
const { analyzeOperationalRisk } = require('./operations');
const { analyzeHazards } = require('./hazards');
const { generateScenarios } = require('./scenarios');
const { generatePriorityActions } = require('./priorities');
const { calculateSurvivabilityScore } = require('./score');
const { 
  generateIfNothingChangesNarrative, 
  generateHeadlineFindings, 
  generateMonitoringFlags 
} = require('./narrative');
const { formatCurrency } = require('./utils');

/**
 * Main analysis orchestrator
 * Analyzes hotel risk and produces complete report-ready output
 * 
 * @param {Object} input - Complete intake data
 * @param {Object} input.hotelProfile - Hotel property details
 * @param {Object} input.financialProfile - Revenue and financial data
 * @param {Object} input.policyProfile - Insurance policy details
 * @param {Array} input.lossRuns - Historical claims
 * @param {Object} input.operationalRiskProfile - Property condition data
 * @param {Object} input.hazardProfile - Location and hazard data
 * @returns {Object} HotelRiskAnalysis
 */
function analyzeHotelRisk(input) {
  // Normalize input structure (handle both old and new field names)
  const normalizedInput = normalizeInput(input);
  
  const {
    hotelProfile,
    financialProfile,
    policyProfile,
    lossRuns,
    operationalRiskProfile,
    hazardProfile,
  } = normalizedInput;
  
  // Step 1: Analyze completeness
  const completeness = analyzeCompleteness(normalizedInput);
  
  // Step 2: Run all analysis modules
  const propertyAnalysis = analyzePropertyCoverage(hotelProfile, policyProfile);
  const biAnalysis = analyzeBusinessInterruption(financialProfile, policyProfile, hotelProfile, hazardProfile);
  const liabilityAnalysis = analyzeLiabilityCoverage(hotelProfile, policyProfile, hazardProfile);
  const deductibleAnalysis = analyzeDeductibleStress(financialProfile, policyProfile);
  const lossHistoryAnalysis = analyzeLossHistory(lossRuns);
  const operationsAnalysis = analyzeOperationalRisk(operationalRiskProfile);
  const hazardsAnalysis = analyzeHazards(hazardProfile, policyProfile);
  
  // Step 3: Calculate survivability score
  const scoreResult = calculateSurvivabilityScore(
    propertyAnalysis,
    biAnalysis,
    liabilityAnalysis,
    deductibleAnalysis,
    lossHistoryAnalysis,
    operationsAnalysis,
    hazardsAnalysis
  );
  
  // Step 4: Generate scenarios
  const scenarioAnalysis = generateScenarios(
    hotelProfile,
    financialProfile,
    policyProfile,
    hazardProfile,
    propertyAnalysis
  );
  
  // Step 5: Generate priority actions
  const priorities = generatePriorityActions(
    propertyAnalysis,
    biAnalysis,
    liabilityAnalysis,
    deductibleAnalysis,
    lossHistoryAnalysis,
    operationsAnalysis,
    hazardsAnalysis,
    policyProfile
  );
  
  // Step 6: Generate narratives
  const analyses = {
    propertyAnalysis,
    biAnalysis,
    liabilityAnalysis,
    deductibleAnalysis,
    lossHistoryAnalysis,
  };
  
  const headlineFindings = generateHeadlineFindings(analyses);
  const ifNothingChanges = generateIfNothingChangesNarrative(
    propertyAnalysis,
    biAnalysis,
    lossHistoryAnalysis,
    operationsAnalysis
  );
  const monitoringFlags = generateMonitoringFlags({
    propertyAnalysis,
    biAnalysis,
    lossHistoryAnalysis,
    operationsAnalysis,
    hazardsAnalysis,
  });
  
  // Step 7: Assemble final output
  return {
    completeness: {
      percentComplete: completeness.percentComplete,
      confidence: completeness.confidence,
      missingCriticalFields: completeness.missingCriticalFields,
      assumptionsUsed: completeness.assumptionsUsed,
    },
    
    summary: {
      survivabilityScore: scoreResult.survivabilityScore,
      survivabilityBand: scoreResult.survivabilityBand,
      propertyCoverageGap: propertyAnalysis.propertyGap,
      biMonthsCovered: biAnalysis.biMonthsCovered,
      estimatedRecoveryMonths: biAnalysis.estimatedRecoveryMonths,
      estimatedUncoveredExposure: (propertyAnalysis.propertyGap || 0) + (biAnalysis.uncoveredExposure || 0),
    },
    
    findings: {
      headlineFindings,
      coverageFindings: [
        propertyAnalysis.explanation,
        propertyAnalysis.ordinanceLawFinding,
        propertyAnalysis.coinsuranceFinding,
      ].filter(Boolean),
      biFindings: [
        biAnalysis.explanation,
        biAnalysis.waitingPeriodFinding,
        biAnalysis.obligationsPressureFinding,
      ].filter(Boolean),
      liabilityFindings: [
        liabilityAnalysis.explanation,
        liabilityAnalysis.umbrellaFinding,
      ].filter(Boolean),
      lossHistoryFindings: [
        lossHistoryAnalysis.explanation,
        ...lossHistoryAnalysis.findings,
      ].filter(Boolean),
      operationalFindings: operationsAnalysis.findings.map(f => `${f.issue}: ${f.impact}`),
      hazardFindings: hazardsAnalysis.findings.map(f => `${f.hazard} (${f.level}): ${f.impact}`),
    },
    
    comparisons: {
      property: {
        policyLimit: propertyAnalysis.propertyLimit,
        estimatedNeed: propertyAnalysis.estimatedReplacementCost,
        gap: propertyAnalysis.propertyGap,
        adequacyStatus: propertyAnalysis.adequacyStatus,
        explanation: propertyAnalysis.explanation,
      },
      businessInterruption: {
        policyLimit: biAnalysis.biLimit,
        monthlyRevenue: biAnalysis.monthlyRevenue,
        monthsCovered: biAnalysis.biMonthsCovered,
        recoveryMonths: biAnalysis.estimatedRecoveryMonths,
        uncoveredExposure: biAnalysis.uncoveredExposure,
        adequacyStatus: biAnalysis.adequacyStatus,
        explanation: biAnalysis.explanation,
      },
      liability: {
        policyLimit: liabilityAnalysis.effectiveLiabilityProtection,
        estimatedNeedRangeLow: liabilityAnalysis.estimatedNeedLow,
        estimatedNeedRangeHigh: liabilityAnalysis.estimatedNeedHigh,
        adequacyStatus: liabilityAnalysis.adequacyStatus,
        explanation: liabilityAnalysis.explanation,
      },
      deductible: {
        deductible: deductibleAnalysis.deductible,
        monthlyObligationPressure: deductibleAnalysis.monthlyObligationPressure,
        adequacyStatus: deductibleAnalysis.adequacyStatus,
        explanation: deductibleAnalysis.explanation,
      },
    },
    
    lossHistory: {
      totalClaims: lossHistoryAnalysis.totalClaims,
      recurringCategories: lossHistoryAnalysis.recurringCategories,
      openClaimsCount: lossHistoryAnalysis.openClaimsCount,
      lossPressureBand: lossHistoryAnalysis.lossPressureBand,
      explanation: lossHistoryAnalysis.explanation,
    },
    
    scenarioAnalysis,
    
    priorities,
    
    ifNothingChanges,
    
    monitoringFlags,
    
    // Include raw analysis objects for advanced use
    _rawAnalyses: {
      property: propertyAnalysis,
      bi: biAnalysis,
      liability: liabilityAnalysis,
      deductible: deductibleAnalysis,
      lossHistory: lossHistoryAnalysis,
      operations: operationsAnalysis,
      hazards: hazardsAnalysis,
      score: scoreResult,
    },
  };
}

/**
 * Normalize input data structure
 * Handles both intake wizard format and direct test fixture format
 * @param {Object} input
 * @returns {Object} Normalized input
 */
function normalizeInput(input) {
  // If already has the expected structure (from fixtures or API)
  if (input.hotelProfile && input.financialProfile && input.policyProfile) {
    return {
      hotelProfile: input.hotelProfile || {},
      financialProfile: input.financialProfile || {},
      policyProfile: input.policyProfile || {},
      lossRuns: input.lossRuns || [],
      operationalRiskProfile: input.operationalRiskProfile || {},
      hazardProfile: input.hazardProfile || {},
    };
  }
  
  // Handle nested structure from intake wizard
  if (input.hotelProfile || input.financialExposure || input.insurancePolicy) {
    return {
      hotelProfile: input.hotelProfile || {},
      financialProfile: input.financialExposure || {},
      policyProfile: {
        carrier: input.insurancePolicy?.carrier,
        policyPeriodStart: input.insurancePolicy?.policyPeriodStart,
        policyPeriodEnd: input.insurancePolicy?.policyPeriodEnd,
        propertyLimit: input.insurancePolicy?.propertyCoverageLimit,
        businessInterruptionLimit: input.insurancePolicy?.biLimit,
        extraExpenseLimit: input.insurancePolicy?.extraExpenseLimit,
        liabilityLimit: input.insurancePolicy?.liabilityLimit,
        umbrellaLimit: input.insurancePolicy?.umbrellaLimit,
        deductible: input.insurancePolicy?.deductible,
        biWaitingPeriodDays: input.insurancePolicy?.biWaitingPeriod,
        biRestorationPeriodMonths: input.insurancePolicy?.biRestorationPeriod,
        coinsurancePct: input.insurancePolicy?.coinsurancePct,
        ordinanceLawCoverage: input.insurancePolicy?.ordinanceLawCoverage,
        equipmentBreakdownCoverage: input.insurancePolicy?.equipmentBreakdown,
        floodCoverage: input.insurancePolicy?.floodCoverage,
        windCoverage: input.insurancePolicy?.windCoverage,
        sewerBackupCoverage: input.insurancePolicy?.sewerBackup,
        namedExclusions: input.insurancePolicy?.namedExclusions || [],
        sublimits: input.insurancePolicy?.sublimits || [],
        scheduledCoverages: input.insurancePolicy?.scheduledCoverages || [],
      },
      lossRuns: input.lossHistory?.claims || [],
      operationalRiskProfile: input.operationalRisk || {},
      hazardProfile: input.locationHazard || {},
    };
  }
  
  // Fallback: return as-is
  return input;
}

module.exports = {
  analyzeHotelRisk,
};
