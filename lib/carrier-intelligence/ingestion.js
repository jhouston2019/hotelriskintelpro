/**
 * Carrier Intelligence Data Ingestion
 * Extracts and normalizes policy and claims data for carrier pattern analysis
 */

/**
 * Ingest policy data into intelligence dataset
 * @param {Object} policyData - Policy data from user input
 * @param {Object} hotelData - Hotel context data
 * @returns {Object} Ingestion result
 */
export async function ingestPolicyData(policyData, hotelData) {
  try {
    // Extract key metrics
    const carrierName = normalizeCarrierName(policyData.carrier);
    const policyYear = new Date(policyData.policyPeriodStart).getFullYear();
    
    // Calculate BI limit ratio
    const biLimitRatio = hotelData.annualRevenue 
      ? (policyData.businessInterruptionLimit / hotelData.annualRevenue) * 12
      : null;
    
    // Create policy intelligence record
    const policyIntel = {
      carrierName,
      propertyLimit: policyData.propertyLimit,
      biLimit: policyData.businessInterruptionLimit,
      liabilityLimit: policyData.liabilityLimit,
      umbrellaLimit: policyData.umbrellaLimit,
      deductible: policyData.deductible,
      ordinanceCoverage: policyData.ordinanceLawCoverage,
      floodCoverage: policyData.floodCoverage,
      windCoverage: policyData.windCoverage,
      sewerBackupCoverage: policyData.sewerBackupCoverage,
      coinsurance: policyData.coinsurancePct,
      policyYear,
      hotelRooms: hotelData.numberOfRooms,
      hotelState: hotelData.state,
      annualRevenue: hotelData.annualRevenue,
      biLimitRatio,
    };
    
    // Insert into database
    // await db.policyIntelligence.create(policyIntel)
    
    // Trigger metrics update for this carrier
    // await scheduleCarrierMetricsUpdate(carrierName)
    
    return {
      success: true,
      carrierName,
      recordsCreated: 1,
    };
    
  } catch (error) {
    console.error('Policy ingestion failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Ingest claims data into intelligence dataset
 * @param {Array} claimsData - Array of claims
 * @param {string} carrierName - Carrier name
 * @param {Object} hotelData - Hotel context
 * @returns {Object} Ingestion result
 */
export async function ingestClaimsData(claimsData, carrierName, hotelData) {
  try {
    const normalizedCarrier = normalizeCarrierName(carrierName);
    const claimRecords = [];
    
    for (const claim of claimsData) {
      // Calculate resolution time if claim is closed
      let resolutionMonths = null;
      if (claim.status === 'closed' && claim.claimDate) {
        const claimDate = new Date(claim.claimDate);
        const today = new Date();
        resolutionMonths = Math.round((today - claimDate) / (1000 * 60 * 60 * 24 * 30));
      }
      
      // Detect dispute flags
      const disputeFlag = detectDisputeIndicators(claim);
      
      const claimIntel = {
        carrierName: normalizedCarrier,
        claimType: claim.claimType,
        causeOfLoss: claim.causeOfLoss,
        amountPaid: claim.amountPaid,
        amountReserved: claim.reserveAmount,
        disputeFlag,
        resolutionMonths,
        hotelRooms: hotelData.numberOfRooms,
        hotelState: hotelData.state,
        claimYear: claim.claimYear,
      };
      
      claimRecords.push(claimIntel);
      
      // Insert into database
      // await db.claimIntelligence.create(claimIntel)
    }
    
    // Trigger metrics update
    // await scheduleCarrierMetricsUpdate(normalizedCarrier)
    
    return {
      success: true,
      carrierName: normalizedCarrier,
      recordsCreated: claimRecords.length,
    };
    
  } catch (error) {
    console.error('Claims ingestion failed:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Normalize carrier name for consistent matching
 * @param {string} carrierName
 * @returns {string} Normalized name
 */
function normalizeCarrierName(carrierName) {
  if (!carrierName) return 'Unknown';
  
  // Remove common suffixes and normalize
  const normalized = carrierName
    .toLowerCase()
    .replace(/insurance company/gi, '')
    .replace(/insurance/gi, '')
    .replace(/inc\./gi, '')
    .replace(/llc/gi, '')
    .replace(/ltd/gi, '')
    .trim();
  
  // Map common variations
  const carrierMap = {
    'travelers': 'Travelers',
    'the travelers': 'Travelers',
    'liberty mutual': 'Liberty Mutual',
    'nationwide': 'Nationwide',
    'zurich': 'Zurich',
    'chubb': 'Chubb',
    'axa': 'AXA',
    'hartford': 'The Hartford',
    'the hartford': 'The Hartford',
    'aig': 'AIG',
    'allianz': 'Allianz',
  };
  
  return carrierMap[normalized] || capitalizeWords(carrierName);
}

/**
 * Detect dispute indicators in claim data
 * @param {Object} claim
 * @returns {boolean}
 */
function detectDisputeIndicators(claim) {
  // Indicators of potential dispute:
  // - Large reserve relative to paid amount
  // - Long resolution time
  // - Specific claim types with high dispute rates
  
  if (claim.reserveAmount && claim.amountPaid) {
    const reserveRatio = claim.reserveAmount / (claim.amountPaid + claim.reserveAmount);
    if (reserveRatio > 0.5) return true; // High reserve suggests uncertainty/dispute
  }
  
  // Water intrusion and mold claims often disputed
  if (claim.claimType?.toLowerCase().includes('water') || 
      claim.claimType?.toLowerCase().includes('mold')) {
    return true;
  }
  
  return false;
}

/**
 * Capitalize words in string
 * @param {string} str
 * @returns {string}
 */
function capitalizeWords(str) {
  return str.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Schedule carrier metrics update
 * @param {string} carrierName
 */
async function scheduleCarrierMetricsUpdate(carrierName) {
  // Queue aggregation job
  // await metricsQueue.add({ carrierName, action: 'update' })
}

module.exports = {
  ingestPolicyData,
  ingestClaimsData,
  normalizeCarrierName,
};
