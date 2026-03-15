/**
 * Analysis orchestrator for Hotel Risk Pro
 * Coordinates data collection, normalization, analysis execution, and result persistence
 */

import { analyzeHotelRisk } from '../risk-engine';
import { extractValues } from '../parser';

/**
 * Run complete analysis for a hotel
 * @param {string} hotelId
 * @param {string} userIdOrSessionId
 * @returns {Object} Analysis result with ID
 */
export async function runHotelAnalysis(hotelId, userIdOrSessionId) {
  try {
    // 1. Fetch complete hotel data from database
    const hotelData = await fetchCompleteHotelData(hotelId);
    
    // 2. Fetch any parsed document data
    const parsedData = await fetchParsedDocumentData(hotelId);
    
    // 3. Merge manual and parsed data
    const normalizedInput = normalizeForEngine(hotelData, parsedData);
    
    // 4. Run risk engine analysis
    const analysisResult = analyzeHotelRisk(normalizedInput);
    
    // 5. Save analysis to database
    const analysisRecord = await saveAnalysisResult(
      hotelId,
      normalizedInput,
      analysisResult,
      userIdOrSessionId
    );
    
    // 6. Generate monitoring alerts if needed
    await generateMonitoringAlerts(hotelId, analysisResult);
    
    return {
      success: true,
      analysisId: analysisRecord.id,
      analysis: analysisResult,
    };
    
  } catch (error) {
    console.error('Analysis orchestration failed:', error);
    throw error;
  }
}

/**
 * Fetch complete hotel data from database
 * @param {string} hotelId
 * @returns {Object} Complete hotel data
 */
async function fetchCompleteHotelData(hotelId) {
  // Fetch from hotels, financial_profiles, insurance_policies, loss_runs, etc.
  // await HotelManager.getHotelComplete(hotelId)
  
  return {
    hotelProfile: {},
    financialExposure: {},
    insurancePolicy: {},
    lossHistory: { claims: [] },
    operationalRisk: {},
    locationHazard: {},
  };
}

/**
 * Fetch parsed document data
 * @param {string} hotelId
 * @returns {Object} Parsed data
 */
async function fetchParsedDocumentData(hotelId) {
  // Fetch documents with parsed_data
  // await DocumentManager.getHotelDocuments(hotelId)
  
  return {
    policyParsed: null,
    lossRunsParsed: null,
  };
}

/**
 * Normalize data for risk engine
 * @param {Object} hotelData
 * @param {Object} parsedData
 * @returns {Object} Normalized input
 */
function normalizeForEngine(hotelData, parsedData) {
  // Merge manual and parsed data
  const policyMerged = extractValues(
    require('../parser').mergeParsedAndManual(
      hotelData.insurancePolicy,
      parsedData.policyParsed
    )
  );
  
  // Build normalized structure for risk engine
  return {
    hotelProfile: {
      hotelName: hotelData.hotelProfile.hotelName,
      address: hotelData.hotelProfile.address,
      city: hotelData.hotelProfile.city,
      state: hotelData.hotelProfile.state,
      zip: hotelData.hotelProfile.zip,
      numberOfRooms: hotelData.hotelProfile.numberOfRooms,
      squareFootage: hotelData.hotelProfile.squareFootage,
      yearBuilt: hotelData.hotelProfile.yearBuilt,
      yearRenovated: hotelData.hotelProfile.yearRenovated,
      numberOfFloors: hotelData.hotelProfile.numberOfFloors,
      constructionType: hotelData.hotelProfile.constructionType,
      roofType: hotelData.hotelProfile.roofType,
      roofAge: hotelData.hotelProfile.roofAge,
      sprinklerStatus: hotelData.hotelProfile.sprinklerStatus,
      fireAlarmStatus: hotelData.hotelProfile.fireAlarmStatus,
      hasPoolSpa: hotelData.hotelProfile.hasPoolSpa,
      hasRestaurantBar: hotelData.hotelProfile.hasRestaurantBar,
      hasEventSpace: hotelData.hotelProfile.hasEventSpace,
      hasParkingStructureOrValet: hotelData.hotelProfile.hasParkingStructureOrValet,
    },
    financialProfile: {
      annualGrossRevenue: hotelData.financialExposure.annualRevenue,
      roomRevenuePct: hotelData.financialExposure.roomRevenuePct,
      foodBeverageRevenuePct: hotelData.financialExposure.foodBevRevenuePct,
      eventRevenuePct: hotelData.financialExposure.eventRevenuePct,
      otherRevenuePct: hotelData.financialExposure.otherRevenuePct,
      averageOccupancy: hotelData.financialExposure.averageOccupancy,
      adr: hotelData.financialExposure.adr,
      revpar: hotelData.financialExposure.revpar,
      fixedMonthlyOperatingCosts: hotelData.financialExposure.fixedMonthlyCosts,
      monthlyPayrollBurden: hotelData.financialExposure.monthlyPayroll,
      monthlyDebtService: hotelData.financialExposure.monthlyDebtService,
      emergencyCashReserves: hotelData.financialExposure.cashReserves,
    },
    policyProfile: policyMerged,
    lossRuns: hotelData.lossHistory.claims || [],
    operationalRiskProfile: hotelData.operationalRisk,
    hazardProfile: hotelData.locationHazard,
  };
}

/**
 * Save analysis result to database
 * @param {string} hotelId
 * @param {Object} inputData
 * @param {Object} analysisResult
 * @param {string} userIdOrSessionId
 * @returns {Object} Analysis record
 */
async function saveAnalysisResult(hotelId, inputData, analysisResult, userIdOrSessionId) {
  const record = {
    id: generateId(),
    hotelId,
    analysisData: analysisResult,
    inputData,
    survivabilityScore: analysisResult.summary.survivabilityScore,
    survivabilityBand: analysisResult.summary.survivabilityBand,
    propertyCoverageGap: analysisResult.summary.propertyCoverageGap,
    biMonthsCovered: analysisResult.summary.biMonthsCovered,
    estimatedUncoveredExposure: analysisResult.summary.estimatedUncoveredExposure,
    completenessPct: analysisResult.completeness.percentComplete,
    confidenceLevel: analysisResult.completeness.confidence,
    createdAt: new Date(),
    isLatest: true,
  };
  
  // Save to database
  // await AnalysisManager.saveAnalysis(hotelId, inputData, analysisResult, userIdOrSessionId)
  
  return record;
}

/**
 * Generate monitoring alerts based on analysis
 * @param {string} hotelId
 * @param {Object} analysisResult
 */
async function generateMonitoringAlerts(hotelId, analysisResult) {
  const alerts = [];
  
  // Check for critical findings
  if (analysisResult.monitoringFlags.underinsuranceRisk) {
    alerts.push({
      type: 'underinsurance',
      message: 'Property coverage gap detected',
      severity: 'high',
    });
  }
  
  if (analysisResult.monitoringFlags.biShortfallRisk) {
    alerts.push({
      type: 'bi_shortfall',
      message: 'Business interruption coverage may be insufficient',
      severity: 'high',
    });
  }
  
  if (analysisResult.monitoringFlags.renewalRisk) {
    alerts.push({
      type: 'renewal_pressure',
      message: 'Loss history may affect renewal',
      severity: 'medium',
    });
  }
  
  // Save alerts
  // await Promise.all(alerts.map(alert => AlertManager.createAlert(hotelId, alert)))
  
  return alerts;
}

function generateId() {
  return require('crypto').randomUUID();
}

module.exports = {
  runHotelAnalysis,
};
