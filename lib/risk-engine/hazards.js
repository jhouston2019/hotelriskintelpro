/**
 * Analyze location and hazard exposure
 * @param {Object} hazardProfile
 * @param {Object} policyProfile
 * @returns {Object} Hazard analysis
 */
function analyzeHazards(hazardProfile = {}, policyProfile = {}) {
  const findings = [];
  const riskFactors = [];
  
  // Flood risk
  const floodZone = hazardProfile.floodZone?.toLowerCase();
  if (floodZone && !['none', 'x', 'unknown'].includes(floodZone)) {
    const isHighRisk = floodZone.includes('a') || floodZone.includes('v');
    findings.push({
      hazard: 'Flood Exposure',
      level: isHighRisk ? 'high' : 'moderate',
      impact: 'May require separate flood coverage and increase loss severity. Standard property policies typically exclude flood damage.',
      severity: isHighRisk ? 'high' : 'moderate',
    });
    riskFactors.push('flood');
    
    // Check if flood coverage exists
    if (!policyProfile.floodCoverage || policyProfile.floodCoverage === 0) {
      findings.push({
        hazard: 'Missing Flood Coverage',
        level: 'high',
        impact: 'Property is in flood zone but flood coverage not identified. Flood damage would be entirely uncovered.',
        severity: 'high',
      });
    }
  }
  
  // Coastal/wind risk
  const coastalWind = hazardProfile.coastalWindExposure;
  if (coastalWind === 'high' || coastalWind === true) {
    findings.push({
      hazard: 'Hurricane / Wind Risk',
      level: 'high',
      impact: 'Major storm events can cause extended closures, high rebuild costs, and regional contractor scarcity.',
      severity: 'high',
    });
    riskFactors.push('wind');
  }
  
  // Wildfire risk
  const wildfire = hazardProfile.wildfireExposure;
  if (wildfire === 'high' || wildfire === true) {
    findings.push({
      hazard: 'Wildfire Exposure',
      level: 'high',
      impact: 'Wildfire risk may affect property insurability and increase premiums or trigger exclusions.',
      severity: 'high',
    });
    riskFactors.push('wildfire');
  }
  
  // Storm/hail
  const stormHail = hazardProfile.stormHailExposure;
  if (stormHail === 'high') {
    findings.push({
      hazard: 'Storm / Hail Risk',
      level: 'high',
      impact: 'Frequent severe weather may increase roof and exterior damage claims.',
      severity: 'moderate',
    });
    riskFactors.push('storm');
  }
  
  // Contractor scarcity
  const contractorScarcity = hazardProfile.contractorScarcity;
  if (contractorScarcity === 'high' || contractorScarcity === true) {
    findings.push({
      hazard: 'Contractor Scarcity',
      level: 'high',
      impact: 'May significantly extend recovery timeline and increase costs after a major loss.',
      severity: 'moderate',
    });
    riskFactors.push('contractor_scarcity');
  }
  
  // Crime level
  const crimeLevel = hazardProfile.crimeLevel;
  if (crimeLevel === 'high') {
    findings.push({
      hazard: 'High Crime Area',
      level: 'high',
      impact: 'Increases liability exposure and may affect guest safety incidents.',
      severity: 'moderate',
    });
    riskFactors.push('crime');
  }
  
  // Litigation environment
  const litigation = hazardProfile.litigationSensitivity;
  if (litigation === 'high') {
    findings.push({
      hazard: 'High-Litigation Jurisdiction',
      level: 'high',
      impact: 'May increase liability claim severity and settlement amounts.',
      severity: 'moderate',
    });
    riskFactors.push('litigation');
  }
  
  // Overall explanation
  let overallExplanation = '';
  if (findings.length === 0) {
    overallExplanation = 'No major location-specific hazards identified.';
  } else {
    overallExplanation = 'Location-specific conditions may increase both the severity of loss and the time required to fully recover. These factors should be considered when evaluating coverage adequacy.';
  }
  
  return {
    findings,
    riskFactors,
    overallExplanation,
    subscore: calculateHazardSubscore(findings),
  };
}

/**
 * Calculate hazard subscore (0-5)
 * @param {Array} findings
 * @returns {number}
 */
function calculateHazardSubscore(findings) {
  const highSeverityCount = findings.filter(f => f.severity === 'high').length;
  const moderateSeverityCount = findings.filter(f => f.severity === 'moderate').length;
  
  if (highSeverityCount === 0 && moderateSeverityCount === 0) return 5;
  if (highSeverityCount >= 3) return 1;
  if (highSeverityCount >= 2 || moderateSeverityCount >= 3) return 2;
  if (highSeverityCount >= 1 || moderateSeverityCount >= 2) return 3;
  return 4;
}

module.exports = {
  analyzeHazards,
};
