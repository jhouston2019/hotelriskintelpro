/**
 * Test Fixtures for Carrier Intelligence System
 * Provides sample data for testing carrier behavior analysis
 */

// Test Carriers
export const testCarriers = {
  travelers: 'Travelers',
  libertyMutual: 'Liberty Mutual',
  nationwide: 'Nationwide',
  zurich: 'Zurich',
  chubb: 'Chubb',
  axa: 'AXA',
};

// Mock Carrier Metrics
export const mockCarrierMetrics = {
  'Travelers': {
    carrierName: 'Travelers',
    totalPolicies: 47,
    totalClaims: 128,
    avgDeductible: 55000,
    avgBiMonthsCoverage: 5.2,
    avgClaimResolutionMonths: 6.8,
    claimDisputeRate: 0.28,
    avgPropertyLimit: 14500000,
    avgLiabilityLimit: 2200000,
    waterLossFrequency: 0.42,
    renewalStrictnessScore: 68,
  },
  'Liberty Mutual': {
    carrierName: 'Liberty Mutual',
    totalPolicies: 62,
    totalClaims: 156,
    avgDeductible: 42000,
    avgBiMonthsCoverage: 6.8,
    avgClaimResolutionMonths: 5.1,
    claimDisputeRate: 0.19,
    avgPropertyLimit: 16200000,
    avgLiabilityLimit: 2800000,
    waterLossFrequency: 0.35,
    renewalStrictnessScore: 52,
  },
  'Nationwide': {
    carrierName: 'Nationwide',
    totalPolicies: 38,
    totalClaims: 94,
    avgDeductible: 48000,
    avgBiMonthsCoverage: 6.2,
    avgClaimResolutionMonths: 5.8,
    claimDisputeRate: 0.24,
    avgPropertyLimit: 15100000,
    avgLiabilityLimit: 2400000,
    waterLossFrequency: 0.38,
    renewalStrictnessScore: 58,
  },
  'Zurich': {
    carrierName: 'Zurich',
    totalPolicies: 29,
    totalClaims: 71,
    avgDeductible: 62000,
    avgBiMonthsCoverage: 7.5,
    avgClaimResolutionMonths: 4.8,
    claimDisputeRate: 0.16,
    avgPropertyLimit: 18500000,
    avgLiabilityLimit: 3200000,
    waterLossFrequency: 0.28,
    renewalStrictnessScore: 45,
  },
  'Chubb': {
    carrierName: 'Chubb',
    totalPolicies: 34,
    totalClaims: 82,
    avgDeductible: 58000,
    avgBiMonthsCoverage: 8.2,
    avgClaimResolutionMonths: 4.5,
    claimDisputeRate: 0.14,
    avgPropertyLimit: 19800000,
    avgLiabilityLimit: 3500000,
    waterLossFrequency: 0.25,
    renewalStrictnessScore: 42,
  },
  'AXA': {
    carrierName: 'AXA',
    totalPolicies: 25,
    totalClaims: 68,
    avgDeductible: 51000,
    avgBiMonthsCoverage: 6.0,
    avgClaimResolutionMonths: 6.2,
    claimDisputeRate: 0.26,
    avgPropertyLimit: 15800000,
    avgLiabilityLimit: 2600000,
    waterLossFrequency: 0.40,
    renewalStrictnessScore: 62,
  },
};

// Mock Market Benchmarks
export const mockMarketBenchmarks = {
  avgDeductible: 45000,
  avgBiMonths: 6.5,
  avgResolutionMonths: 5.2,
  avgDisputeRate: 0.22,
  avgPropertyLimit: 16000000,
  avgLiabilityLimit: 2500000,
  totalCarriersTracked: 6,
};

// Test Hotel with Competitive Policy (Chubb)
export const competitivePolicyHotel = {
  hotelProfile: {
    hotelName: 'Riverside Inn',
    numberOfRooms: 85,
    totalSquareFootage: 65000,
    yearBuilt: 2005,
    state: 'CA',
  },
  financialProfile: {
    annualGrossRevenue: 4200000,
  },
  policyProfile: {
    carrier: 'Chubb',
    propertyLimit: 18000000,
    businessInterruptionLimit: 2800000, // ~8 months
    liabilityLimit: 3000000,
    umbrellaLimit: 5000000,
    deductible: 50000,
    policyPeriodStart: '2025-01-01',
    policyPeriodEnd: '2026-01-01',
  },
  lossRuns: [],
};

// Test Hotel with Below-Market Policy (Travelers)
export const belowMarketPolicyHotel = {
  hotelProfile: {
    hotelName: 'Budget Suites',
    numberOfRooms: 75,
    totalSquareFootage: 55000,
    yearBuilt: 1998,
    state: 'FL',
  },
  financialProfile: {
    annualGrossRevenue: 3600000,
  },
  policyProfile: {
    carrier: 'Travelers',
    propertyLimit: 10000000,
    businessInterruptionLimit: 1500000, // ~5 months
    liabilityLimit: 1500000,
    umbrellaLimit: 0,
    deductible: 75000,
    policyPeriodStart: '2025-03-01',
    policyPeriodEnd: '2026-03-01',
  },
  lossRuns: [
    {
      claimDate: '2023-08-15',
      claimType: 'Water damage',
      causeOfLoss: 'Pipe burst',
      amountPaid: 125000,
      reserveAmount: 50000,
      status: 'open',
      claimYear: 2023,
    },
  ],
};

// Test Hotel with High Dispute Carrier
export const highDisputeCarrierHotel = {
  hotelProfile: {
    hotelName: 'Coastal Resort',
    numberOfRooms: 120,
    totalSquareFootage: 95000,
    yearBuilt: 2010,
    state: 'SC',
  },
  financialProfile: {
    annualGrossRevenue: 6800000,
  },
  policyProfile: {
    carrier: 'AXA',
    propertyLimit: 22000000,
    businessInterruptionLimit: 3400000, // ~6 months
    liabilityLimit: 2500000,
    umbrellaLimit: 3000000,
    deductible: 60000,
    policyPeriodStart: '2025-06-01',
    policyPeriodEnd: '2026-06-01',
  },
  lossRuns: [
    {
      claimDate: '2024-02-10',
      claimType: 'Water damage',
      causeOfLoss: 'Roof leak',
      amountPaid: 85000,
      reserveAmount: 120000,
      status: 'open',
      claimYear: 2024,
    },
    {
      claimDate: '2023-11-05',
      claimType: 'Water damage',
      causeOfLoss: 'Plumbing failure',
      amountPaid: 42000,
      reserveAmount: 0,
      status: 'closed',
      claimYear: 2023,
    },
  ],
};

// Mock Policy Intelligence Records
export const mockPolicyIntelligence = [
  // Travelers policies
  {
    carrierName: 'Travelers',
    propertyLimit: 12000000,
    biLimit: 1800000,
    liabilityLimit: 2000000,
    deductible: 60000,
    biLimitRatio: 5.5,
    hotelRooms: 80,
    hotelState: 'TX',
    policyYear: 2025,
  },
  {
    carrierName: 'Travelers',
    propertyLimit: 9500000,
    biLimit: 1400000,
    liabilityLimit: 1500000,
    deductible: 50000,
    biLimitRatio: 4.8,
    hotelRooms: 65,
    hotelState: 'GA',
    policyYear: 2025,
  },
  // Liberty Mutual policies
  {
    carrierName: 'Liberty Mutual',
    propertyLimit: 16000000,
    biLimit: 2600000,
    liabilityLimit: 3000000,
    deductible: 40000,
    biLimitRatio: 7.2,
    hotelRooms: 95,
    hotelState: 'CA',
    policyYear: 2025,
  },
  {
    carrierName: 'Liberty Mutual',
    propertyLimit: 14500000,
    biLimit: 2200000,
    liabilityLimit: 2500000,
    deductible: 45000,
    biLimitRatio: 6.5,
    hotelRooms: 88,
    hotelState: 'NY',
    policyYear: 2025,
  },
];

// Mock Claim Intelligence Records
export const mockClaimIntelligence = [
  // Travelers claims
  {
    carrierName: 'Travelers',
    claimType: 'Water damage',
    causeOfLoss: 'Pipe burst',
    amountPaid: 95000,
    amountReserved: 45000,
    disputeFlag: true,
    resolutionMonths: 8,
    hotelRooms: 75,
    hotelState: 'FL',
    claimYear: 2024,
  },
  {
    carrierName: 'Travelers',
    claimType: 'Fire',
    causeOfLoss: 'Kitchen fire',
    amountPaid: 425000,
    amountReserved: 0,
    disputeFlag: false,
    resolutionMonths: 6,
    hotelRooms: 110,
    hotelState: 'TX',
    claimYear: 2023,
  },
  // Liberty Mutual claims
  {
    carrierName: 'Liberty Mutual',
    claimType: 'Water damage',
    causeOfLoss: 'Roof leak',
    amountPaid: 78000,
    amountReserved: 0,
    disputeFlag: false,
    resolutionMonths: 4,
    hotelRooms: 82,
    hotelState: 'CA',
    claimYear: 2024,
  },
  {
    carrierName: 'Liberty Mutual',
    claimType: 'Liability',
    causeOfLoss: 'Slip and fall',
    amountPaid: 185000,
    amountReserved: 0,
    disputeFlag: false,
    resolutionMonths: 5,
    hotelRooms: 95,
    hotelState: 'NY',
    claimYear: 2024,
  },
];

// Expected Carrier Risk Flags
export const expectedCarrierFlags = {
  'Travelers': [
    {
      flagType: 'high_deductible',
      severity: 'medium',
      message: 'Travelers typically uses deductibles significantly above market average for hotels.',
    },
    {
      flagType: 'water_loss_disputes',
      severity: 'high',
      message: 'Travelers has higher-than-average water loss disputes.',
    },
    {
      flagType: 'slow_resolution',
      severity: 'medium',
      message: 'Claims with Travelers historically take longer to resolve than industry averages.',
    },
  ],
  'Liberty Mutual': [
    {
      flagType: 'fast_resolution',
      severity: 'low',
      message: 'Liberty Mutual has faster-than-average claim resolution times.',
    },
  ],
  'Chubb': [
    {
      flagType: 'premium_coverage',
      severity: 'low',
      message: 'Chubb typically provides above-market coverage levels.',
    },
  ],
};

// Test Scenario: Competitive Policy
export const competitivePolicyScenario = {
  input: competitivePolicyHotel,
  expectedBenchmarkScore: 85, // Should be in "highly_competitive" range
  expectedScoreBand: 'highly_competitive',
  expectedInsights: [
    'above_market',
  ],
};

// Test Scenario: Below Market Policy
export const belowMarketPolicyScenario = {
  input: belowMarketPolicyHotel,
  expectedBenchmarkScore: 55, // Should be in "below_market" range
  expectedScoreBand: 'below_market',
  expectedInsights: [
    'high_deductible',
    'low_bi_coverage',
    'slow_resolution',
  ],
};

// Test Scenario: High Dispute Carrier
export const highDisputeCarrierScenario = {
  input: highDisputeCarrierHotel,
  expectedBenchmarkScore: 62,
  expectedScoreBand: 'competitive',
  expectedFlags: [
    'water_loss_disputes',
    'high_dispute_rate',
  ],
};

module.exports = {
  testCarriers,
  mockCarrierMetrics,
  mockMarketBenchmarks,
  mockPolicyIntelligence,
  mockClaimIntelligence,
  expectedCarrierFlags,
  competitivePolicyHotel,
  belowMarketPolicyHotel,
  highDisputeCarrierHotel,
  competitivePolicyScenario,
  belowMarketPolicyScenario,
  highDisputeCarrierScenario,
};
