/**
 * Analyze operational risk factors
 * @param {Object} operationalRiskProfile
 * @returns {Object} Operations analysis
 */
function analyzeOperationalRisk(operationalRiskProfile = {}) {
  const findings = [];
  const riskFactors = [];
  
  // Check for roof/moisture issues
  if (operationalRiskProfile.priorRoofLeaks === true || operationalRiskProfile.roofLeaks === 'yes') {
    findings.push({
      issue: 'Prior roof leaks',
      impact: 'May indicate ongoing water intrusion risk and increase future water-loss exposure.',
      severity: 'moderate',
    });
    riskFactors.push('roof_leaks');
  }
  
  if (operationalRiskProfile.moldMoistureHistory === true) {
    findings.push({
      issue: 'Mold or moisture history',
      impact: 'May signal chronic moisture issues that increase claim frequency and underwriting concern.',
      severity: 'moderate',
    });
    riskFactors.push('mold_moisture');
  }
  
  // Check for mechanical/systems issues
  if (operationalRiskProfile.hvacIssues === true || operationalRiskProfile.hvacIssues === 'yes') {
    findings.push({
      issue: 'HVAC age or issues',
      impact: 'Equipment breakdown risk and guest comfort concerns may affect operations and claims.',
      severity: 'low',
    });
    riskFactors.push('hvac');
  }
  
  if (operationalRiskProfile.plumbingIssues === true || operationalRiskProfile.plumbingIssues === 'yes') {
    findings.push({
      issue: 'Plumbing age or issues',
      impact: 'Increases water damage risk and potential for emergency shutdowns.',
      severity: 'moderate',
    });
    riskFactors.push('plumbing');
  }
  
  if (operationalRiskProfile.electricalIssues === true || operationalRiskProfile.electricalIssues === 'yes') {
    findings.push({
      issue: 'Electrical system issues',
      impact: 'May increase fire risk and equipment breakdown exposure.',
      severity: 'moderate',
    });
    riskFactors.push('electrical');
  }
  
  // Check for maintenance and compliance
  if (operationalRiskProfile.deferredMaintenance === true || operationalRiskProfile.deferredMaintenance === 'yes') {
    findings.push({
      issue: 'Deferred maintenance items',
      impact: 'Increases both claim frequency and severity risk. Insurers may view this as elevated exposure.',
      severity: 'moderate',
    });
    riskFactors.push('deferred_maintenance');
  }
  
  if (operationalRiskProfile.inspectionDeficiencies === true || operationalRiskProfile.inspectionDeficiencies === 'yes') {
    findings.push({
      issue: 'Inspection deficiencies',
      impact: 'Unresolved inspection issues may weaken insurability or affect renewal terms.',
      severity: 'high',
    });
    riskFactors.push('inspection_deficiencies');
  }
  
  if (operationalRiskProfile.codeComplianceIssues === true) {
    findings.push({
      issue: 'Code compliance issues',
      impact: 'May complicate recovery and increase rebuild costs if not addressed before a loss.',
      severity: 'moderate',
    });
    riskFactors.push('code_compliance');
  }
  
  // Overall assessment
  const highSeverityCount = findings.filter(f => f.severity === 'high').length;
  const moderateSeverityCount = findings.filter(f => f.severity === 'moderate').length;
  
  let overallExplanation = '';
  if (findings.length === 0) {
    overallExplanation = 'No major operational risks identified in current property condition assessment.';
  } else if (highSeverityCount > 0 || moderateSeverityCount >= 3) {
    overallExplanation = 'Multiple unresolved property or maintenance issues may increase both claim frequency and underwriting concern. Insurers may view these conditions as indicators of increased future loss risk.';
  } else {
    overallExplanation = 'Some operational risk factors identified. Addressing these may improve both loss prevention and insurability position.';
  }

  return {
    findings,
    riskFactors,
    overallExplanation,
    subscore: calculateOperationsSubscore(highSeverityCount, moderateSeverityCount),
  };
}

/**
 * Calculate operations subscore (0-5)
 * @param {number} highSeverityCount
 * @param {number} moderateSeverityCount
 * @returns {number}
 */
function calculateOperationsSubscore(highSeverityCount, moderateSeverityCount) {
  if (highSeverityCount === 0 && moderateSeverityCount === 0) return 5;
  if (highSeverityCount >= 2 || moderateSeverityCount >= 4) return 1;
  if (highSeverityCount >= 1 || moderateSeverityCount >= 3) return 2;
  if (moderateSeverityCount >= 2) return 3;
  return 4;
}

module.exports = {
  analyzeOperationalRisk,
};
