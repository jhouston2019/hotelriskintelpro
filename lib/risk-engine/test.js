/**
 * Test suite for Hotel Risk Pro analysis engine
 * Run with: node lib/risk-engine/test.js
 */

const { analyzeHotelRisk } = require('./index');
const {
  stronglyInsuredHotel,
  propertyUnderinsuredHotel,
  biShortfallHotel,
  repeatedWaterLossHotel,
  partialDataHotel,
  criticalRiskHotel,
} = require('./fixtures');

function runTests() {
  console.log('🧪 Running Hotel Risk Engine Tests\n');
  console.log('='.repeat(80));
  
  // Test 1: Strongly insured hotel
  console.log('\n📊 TEST 1: Strongly Insured Hotel');
  console.log('-'.repeat(80));
  const result1 = analyzeHotelRisk(stronglyInsuredHotel);
  console.log(`Hotel: ${stronglyInsuredHotel.hotelProfile.hotelName}`);
  console.log(`Survivability Score: ${result1.summary.survivabilityScore}/100 (${result1.summary.survivabilityBand})`);
  console.log(`Property Gap: ${formatCurrency(result1.summary.propertyCoverageGap)}`);
  console.log(`BI Months Covered: ${result1.summary.biMonthsCovered}`);
  console.log(`Completeness: ${result1.completeness.percentComplete}% (${result1.completeness.confidence} confidence)`);
  console.log(`Priority Actions: ${result1.priorities.length}`);
  console.log(`✓ Expected: High score (80+), minimal gaps`);
  console.log(`✓ Actual: ${result1.summary.survivabilityScore >= 80 ? 'PASS' : 'FAIL'}`);
  
  // Test 2: Property-underinsured hotel
  console.log('\n📊 TEST 2: Property-Underinsured Hotel');
  console.log('-'.repeat(80));
  const result2 = analyzeHotelRisk(propertyUnderinsuredHotel);
  console.log(`Hotel: ${propertyUnderinsuredHotel.hotelProfile.hotelName}`);
  console.log(`Survivability Score: ${result2.summary.survivabilityScore}/100 (${result2.summary.survivabilityBand})`);
  console.log(`Property Gap: ${formatCurrency(result2.summary.propertyCoverageGap)}`);
  console.log(`Property Status: ${result2.comparisons.property.adequacyStatus}`);
  console.log(`Priority Actions: ${result2.priorities.length}`);
  console.log(`Top Priority: ${result2.priorities[0]?.title || 'None'}`);
  console.log(`✓ Expected: Property gap identified, score reduced, priority action generated`);
  console.log(`✓ Actual: ${result2.summary.propertyCoverageGap > 0 && result2.priorities.some(p => p.category === 'property') ? 'PASS' : 'FAIL'}`);
  
  // Test 3: BI-shortfall hotel
  console.log('\n📊 TEST 3: BI-Shortfall Hotel');
  console.log('-'.repeat(80));
  const result3 = analyzeHotelRisk(biShortfallHotel);
  console.log(`Hotel: ${biShortfallHotel.hotelProfile.hotelName}`);
  console.log(`Survivability Score: ${result3.summary.survivabilityScore}/100 (${result3.summary.survivabilityBand})`);
  console.log(`BI Months Covered: ${result3.summary.biMonthsCovered}`);
  console.log(`Estimated Recovery: ${result3.summary.estimatedRecoveryMonths} months`);
  console.log(`BI Status: ${result3.comparisons.businessInterruption.adequacyStatus}`);
  console.log(`Uncovered BI Exposure: ${formatCurrency(result3.comparisons.businessInterruption.uncoveredExposure)}`);
  console.log(`✓ Expected: BI shortfall identified, priority action for BI increase`);
  console.log(`✓ Actual: ${result3.comparisons.businessInterruption.adequacyStatus === 'inadequate' && result3.priorities.some(p => p.category === 'bi') ? 'PASS' : 'FAIL'}`);
  
  // Test 4: Repeated-water-loss hotel
  console.log('\n📊 TEST 4: Repeated-Water-Loss Hotel');
  console.log('-'.repeat(80));
  const result4 = analyzeHotelRisk(repeatedWaterLossHotel);
  console.log(`Hotel: ${repeatedWaterLossHotel.hotelProfile.hotelName}`);
  console.log(`Survivability Score: ${result4.summary.survivabilityScore}/100 (${result4.summary.survivabilityBand})`);
  console.log(`Total Claims: ${result4.lossHistory.totalClaims}`);
  console.log(`Recurring Categories: ${result4.lossHistory.recurringCategories.join(', ') || 'None'}`);
  console.log(`Loss Pressure Band: ${result4.lossHistory.lossPressureBand}`);
  console.log(`Operational Findings: ${result4.findings.operationalFindings.length}`);
  console.log(`✓ Expected: High loss pressure, water pattern identified, operational risks flagged`);
  console.log(`✓ Actual: ${result4.lossHistory.lossPressureBand === 'high' && result4.lossHistory.recurringCategories.length > 0 ? 'PASS' : 'FAIL'}`);
  
  // Test 5: Partial-data hotel
  console.log('\n📊 TEST 5: Partial-Data Hotel');
  console.log('-'.repeat(80));
  const result5 = analyzeHotelRisk(partialDataHotel);
  console.log(`Hotel: ${partialDataHotel.hotelProfile.hotelName}`);
  console.log(`Survivability Score: ${result5.summary.survivabilityScore}/100 (${result5.summary.survivabilityBand})`);
  console.log(`Completeness: ${result5.completeness.percentComplete}% (${result5.completeness.confidence} confidence)`);
  console.log(`Missing Fields: ${result5.completeness.missingCriticalFields.length}`);
  console.log(`Assumptions Used: ${result5.completeness.assumptionsUsed.length}`);
  console.log(`✓ Expected: Lower completeness, moderate/low confidence, assumptions documented`);
  console.log(`✓ Actual: ${result5.completeness.percentComplete < 80 && result5.completeness.assumptionsUsed.length > 0 ? 'PASS' : 'FAIL'}`);
  
  // Test 6: Critical-risk hotel
  console.log('\n📊 TEST 6: Critical-Risk Hotel');
  console.log('-'.repeat(80));
  const result6 = analyzeHotelRisk(criticalRiskHotel);
  console.log(`Hotel: ${criticalRiskHotel.hotelProfile.hotelName}`);
  console.log(`Survivability Score: ${result6.summary.survivabilityScore}/100 (${result6.summary.survivabilityBand})`);
  console.log(`Total Uncovered Exposure: ${formatCurrency(result6.summary.estimatedUncoveredExposure)}`);
  console.log(`Priority Actions: ${result6.priorities.length}`);
  console.log(`Monitoring Flags Active: ${Object.values(result6.monitoringFlags).filter(Boolean).length}`);
  console.log(`Headline Findings: ${result6.findings.headlineFindings.length}`);
  console.log(`✓ Expected: Low score (< 50), multiple priority actions, multiple monitoring flags`);
  console.log(`✓ Actual: ${result6.summary.survivabilityScore < 50 && result6.priorities.length >= 5 ? 'PASS' : 'FAIL'}`);
  
  // Summary
  console.log('\n' + '='.repeat(80));
  console.log('📋 TEST SUMMARY\n');
  
  const allResults = [result1, result2, result3, result4, result5, result6];
  
  console.log('Output Structure Validation:');
  allResults.forEach((result, idx) => {
    const hasRequiredFields = 
      result.completeness &&
      result.summary &&
      result.findings &&
      result.comparisons &&
      result.lossHistory &&
      result.scenarioAnalysis &&
      result.priorities &&
      result.ifNothingChanges &&
      result.monitoringFlags;
    console.log(`  Test ${idx + 1}: ${hasRequiredFields ? '✓ PASS' : '✗ FAIL'} - All required fields present`);
  });
  
  console.log('\nScore Range Validation:');
  allResults.forEach((result, idx) => {
    const validScore = result.summary.survivabilityScore >= 0 && result.summary.survivabilityScore <= 100;
    console.log(`  Test ${idx + 1}: ${validScore ? '✓ PASS' : '✗ FAIL'} - Score in valid range (${result.summary.survivabilityScore})`);
  });
  
  console.log('\n✅ All tests completed!\n');
}

function formatCurrency(value) {
  if (!value || value === 0) return '$0';
  const num = typeof value === 'string' ? parseFloat(value) : value;
  if (num >= 1000000) {
    return `$${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `$${(num / 1000).toFixed(0)}K`;
  }
  return `$${num.toLocaleString()}`;
}

// Run tests if executed directly
if (require.main === module) {
  runTests();
}

module.exports = {
  runTests,
};
