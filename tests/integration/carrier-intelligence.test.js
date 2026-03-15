/**
 * Integration Tests for Carrier Intelligence System
 */

const { analyzeCarrierBehavior } = require('../../lib/carrier-intelligence');
const { ingestPolicyData, ingestClaimsData } = require('../../lib/carrier-intelligence/ingestion');
const { updateCarrierMetrics, getMarketBenchmarks } = require('../../lib/carrier-intelligence/metrics');
const { generateCarrierBenchmark } = require('../../lib/carrier-intelligence/benchmarking');
const {
  competitivePolicyHotel,
  belowMarketPolicyHotel,
  highDisputeCarrierHotel,
  mockCarrierMetrics,
  mockMarketBenchmarks,
} = require('../fixtures/carrier-intelligence-fixtures');

describe('Carrier Intelligence System', () => {
  
  describe('Data Ingestion', () => {
    test('should ingest policy data correctly', async () => {
      const result = await ingestPolicyData(
        competitivePolicyHotel.policyProfile,
        competitivePolicyHotel.hotelProfile
      );
      
      expect(result.success).toBe(true);
      expect(result.carrierName).toBe('Chubb');
      expect(result.recordsCreated).toBe(1);
    });
    
    test('should ingest claims data correctly', async () => {
      const result = await ingestClaimsData(
        highDisputeCarrierHotel.lossRuns,
        'AXA',
        highDisputeCarrierHotel.hotelProfile
      );
      
      expect(result.success).toBe(true);
      expect(result.carrierName).toBe('AXA');
      expect(result.recordsCreated).toBe(2);
    });
    
    test('should normalize carrier names consistently', async () => {
      const variations = [
        'travelers insurance',
        'The Travelers',
        'TRAVELERS',
        'Travelers Insurance Company',
      ];
      
      for (const variation of variations) {
        const result = await ingestPolicyData(
          { ...competitivePolicyHotel.policyProfile, carrier: variation },
          competitivePolicyHotel.hotelProfile
        );
        
        expect(result.carrierName).toBe('Travelers');
      }
    });
  });
  
  describe('Carrier Benchmarking', () => {
    test('should generate high benchmark score for competitive policy', async () => {
      const benchmark = await generateCarrierBenchmark(
        competitivePolicyHotel.policyProfile,
        { ...competitivePolicyHotel.hotelProfile, annualRevenue: competitivePolicyHotel.financialProfile.annualGrossRevenue },
        'Chubb'
      );
      
      expect(benchmark).toBeDefined();
      expect(benchmark.benchmarkScore).toBeGreaterThanOrEqual(80);
      expect(benchmark.scoreBand).toBe('highly_competitive');
    });
    
    test('should generate low benchmark score for below-market policy', async () => {
      const benchmark = await generateCarrierBenchmark(
        belowMarketPolicyHotel.policyProfile,
        { ...belowMarketPolicyHotel.hotelProfile, annualRevenue: belowMarketPolicyHotel.financialProfile.annualGrossRevenue },
        'Travelers'
      );
      
      expect(benchmark).toBeDefined();
      expect(benchmark.benchmarkScore).toBeLessThan(70);
      expect(benchmark.scoreBand).toMatch(/below_market|significantly_below_market/);
    });
    
    test('should identify deductible above market', async () => {
      const benchmark = await generateCarrierBenchmark(
        belowMarketPolicyHotel.policyProfile,
        { ...belowMarketPolicyHotel.hotelProfile, annualRevenue: belowMarketPolicyHotel.financialProfile.annualGrossRevenue },
        'Travelers'
      );
      
      expect(benchmark.comparisons.deductible.status).toMatch(/above_market|slightly_high/);
      expect(benchmark.comparisons.deductible.hotelValue).toBeGreaterThan(benchmark.comparisons.deductible.marketAvg);
    });
    
    test('should identify BI coverage below market', async () => {
      const benchmark = await generateCarrierBenchmark(
        belowMarketPolicyHotel.policyProfile,
        { ...belowMarketPolicyHotel.hotelProfile, annualRevenue: belowMarketPolicyHotel.financialProfile.annualGrossRevenue },
        'Travelers'
      );
      
      expect(benchmark.comparisons.biCoverage).toBeDefined();
      expect(benchmark.comparisons.biCoverage.status).toMatch(/below_market|slightly_low/);
    });
    
    test('should generate actionable insights', async () => {
      const benchmark = await generateCarrierBenchmark(
        belowMarketPolicyHotel.policyProfile,
        { ...belowMarketPolicyHotel.hotelProfile, annualRevenue: belowMarketPolicyHotel.financialProfile.annualGrossRevenue },
        'Travelers'
      );
      
      expect(benchmark.insights).toBeDefined();
      expect(benchmark.insights.length).toBeGreaterThan(0);
      expect(benchmark.insights[0]).toHaveProperty('type');
      expect(benchmark.insights[0]).toHaveProperty('severity');
      expect(benchmark.insights[0]).toHaveProperty('message');
    });
  });
  
  describe('Carrier Behavior Analysis', () => {
    test('should return complete carrier intelligence for valid policy', async () => {
      const result = await analyzeCarrierBehavior(
        competitivePolicyHotel.policyProfile,
        { ...competitivePolicyHotel.hotelProfile, annualRevenue: competitivePolicyHotel.financialProfile.annualGrossRevenue },
        []
      );
      
      expect(result.available).toBe(true);
      expect(result.carrierName).toBe('Chubb');
      expect(result.benchmark).toBeDefined();
      expect(result.insights).toBeDefined();
      expect(result.competitivePosition).toBeDefined();
    });
    
    test('should handle missing carrier gracefully', async () => {
      const result = await analyzeCarrierBehavior(
        { ...competitivePolicyHotel.policyProfile, carrier: null },
        competitivePolicyHotel.hotelProfile,
        []
      );
      
      expect(result.available).toBe(false);
      expect(result.reason).toBeDefined();
    });
    
    test('should identify competitive strengths', async () => {
      const result = await analyzeCarrierBehavior(
        competitivePolicyHotel.policyProfile,
        { ...competitivePolicyHotel.hotelProfile, annualRevenue: competitivePolicyHotel.financialProfile.annualGrossRevenue },
        []
      );
      
      expect(result.competitivePosition.strengths.length).toBeGreaterThan(0);
    });
    
    test('should identify competitive weaknesses', async () => {
      const result = await analyzeCarrierBehavior(
        belowMarketPolicyHotel.policyProfile,
        { ...belowMarketPolicyHotel.hotelProfile, annualRevenue: belowMarketPolicyHotel.financialProfile.annualGrossRevenue },
        belowMarketPolicyHotel.lossRuns
      );
      
      expect(result.competitivePosition.weaknesses.length).toBeGreaterThan(0);
    });
    
    test('should detect carrier risk flags', async () => {
      const result = await analyzeCarrierBehavior(
        belowMarketPolicyHotel.policyProfile,
        { ...belowMarketPolicyHotel.hotelProfile, annualRevenue: belowMarketPolicyHotel.financialProfile.annualGrossRevenue },
        belowMarketPolicyHotel.lossRuns
      );
      
      expect(result.benchmark.riskFlags).toBeDefined();
      expect(result.benchmark.riskFlags.length).toBeGreaterThan(0);
    });
  });
  
  describe('Market Benchmarks', () => {
    test('should return valid market benchmarks', async () => {
      const benchmarks = await getMarketBenchmarks();
      
      expect(benchmarks).toBeDefined();
      expect(benchmarks.avgDeductible).toBeGreaterThan(0);
      expect(benchmarks.avgBiMonths).toBeGreaterThan(0);
      expect(benchmarks.avgResolutionMonths).toBeGreaterThan(0);
    });
  });
  
  describe('Competitive Position', () => {
    test('should classify highly competitive policy correctly', async () => {
      const result = await analyzeCarrierBehavior(
        competitivePolicyHotel.policyProfile,
        { ...competitivePolicyHotel.hotelProfile, annualRevenue: competitivePolicyHotel.financialProfile.annualGrossRevenue },
        []
      );
      
      expect(result.competitivePosition.overall).toMatch(/above_market|market_aligned/);
      expect(result.competitivePosition.benchmarkScore).toBeGreaterThanOrEqual(70);
    });
    
    test('should classify below-market policy correctly', async () => {
      const result = await analyzeCarrierBehavior(
        belowMarketPolicyHotel.policyProfile,
        { ...belowMarketPolicyHotel.hotelProfile, annualRevenue: belowMarketPolicyHotel.financialProfile.annualGrossRevenue },
        belowMarketPolicyHotel.lossRuns
      );
      
      expect(result.competitivePosition.overall).toMatch(/below_market|needs_improvement/);
      expect(result.competitivePosition.benchmarkScore).toBeLessThan(70);
    });
  });
  
  describe('Data Privacy', () => {
    test('should not expose individual hotel identities in carrier metrics', async () => {
      const benchmarks = await getMarketBenchmarks();
      
      // Benchmarks should only contain aggregated data
      expect(benchmarks).not.toHaveProperty('hotelName');
      expect(benchmarks).not.toHaveProperty('hotelId');
      expect(benchmarks).not.toHaveProperty('individualPolicies');
    });
    
    test('should anonymize carrier intelligence insights', async () => {
      const result = await analyzeCarrierBehavior(
        competitivePolicyHotel.policyProfile,
        { ...competitivePolicyHotel.hotelProfile, annualRevenue: competitivePolicyHotel.financialProfile.annualGrossRevenue },
        []
      );
      
      // Insights should not reference specific hotels
      result.insights.forEach(insight => {
        expect(insight.message.toLowerCase()).not.toContain('hotel name');
        expect(insight.message.toLowerCase()).not.toContain('specific property');
      });
    });
  });
  
  describe('Performance', () => {
    test('should complete carrier analysis within reasonable time', async () => {
      const startTime = Date.now();
      
      await analyzeCarrierBehavior(
        competitivePolicyHotel.policyProfile,
        { ...competitivePolicyHotel.hotelProfile, annualRevenue: competitivePolicyHotel.financialProfile.annualGrossRevenue },
        []
      );
      
      const duration = Date.now() - startTime;
      expect(duration).toBeLessThan(2000); // Should complete in under 2 seconds
    });
  });
});
