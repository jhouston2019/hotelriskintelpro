-- Carrier Behavior Intelligence Schema
-- Extends Hotel Risk Pro with carrier pattern analysis

-- Carrier profiles (aggregated intelligence)
CREATE TABLE carrier_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_name VARCHAR(255) UNIQUE NOT NULL,
  avg_property_deductible DECIMAL(12,2),
  avg_bi_limit_ratio DECIMAL(5,2),
  avg_liability_limit DECIMAL(12,2),
  renewal_strictness_score INTEGER,
  claim_dispute_frequency DECIMAL(5,2),
  common_exclusions TEXT[],
  total_policies_analyzed INTEGER DEFAULT 0,
  total_claims_analyzed INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Policy intelligence (normalized policy data)
CREATE TABLE policy_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_name VARCHAR(255) NOT NULL,
  property_limit DECIMAL(15,2),
  bi_limit DECIMAL(15,2),
  liability_limit DECIMAL(12,2),
  umbrella_limit DECIMAL(12,2),
  deductible DECIMAL(12,2),
  ordinance_coverage DECIMAL(12,2),
  flood_coverage VARCHAR(20),
  wind_coverage VARCHAR(20),
  sewer_backup_coverage VARCHAR(20),
  coinsurance_pct DECIMAL(5,2),
  policy_year INTEGER,
  hotel_rooms INTEGER,
  hotel_state VARCHAR(2),
  annual_revenue DECIMAL(15,2),
  bi_limit_ratio DECIMAL(5,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Claim intelligence (normalized claims data)
CREATE TABLE claim_intelligence (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_name VARCHAR(255) NOT NULL,
  claim_type VARCHAR(100),
  cause_of_loss VARCHAR(255),
  amount_paid DECIMAL(12,2),
  amount_reserved DECIMAL(12,2),
  dispute_flag BOOLEAN DEFAULT false,
  resolution_months INTEGER,
  hotel_rooms INTEGER,
  hotel_state VARCHAR(2),
  claim_year INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Carrier metrics (aggregated statistics)
CREATE TABLE carrier_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_name VARCHAR(255) UNIQUE NOT NULL,
  total_policies INTEGER DEFAULT 0,
  total_claims INTEGER DEFAULT 0,
  avg_claim_severity DECIMAL(12,2),
  avg_claim_resolution_months DECIMAL(5,2),
  water_loss_frequency DECIMAL(5,2),
  liability_frequency DECIMAL(5,2),
  fire_frequency DECIMAL(5,2),
  renewal_nonrenewal_rate DECIMAL(5,2),
  claim_dispute_rate DECIMAL(5,2),
  avg_property_limit DECIMAL(15,2),
  avg_bi_limit DECIMAL(15,2),
  avg_liability_limit DECIMAL(12,2),
  avg_deductible DECIMAL(12,2),
  median_deductible DECIMAL(12,2),
  avg_bi_months_coverage DECIMAL(5,2),
  ordinance_coverage_rate DECIMAL(5,2),
  flood_coverage_rate DECIMAL(5,2),
  wind_coverage_rate DECIMAL(5,2),
  sewer_backup_coverage_rate DECIMAL(5,2),
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Carrier risk flags (automated insights)
CREATE TABLE carrier_risk_flags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  carrier_name VARCHAR(255) NOT NULL,
  flag_type VARCHAR(100),
  flag_severity VARCHAR(20),
  flag_message TEXT,
  supporting_data JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Indexes for performance
CREATE INDEX idx_policy_intelligence_carrier ON policy_intelligence(carrier_name);
CREATE INDEX idx_policy_intelligence_year ON policy_intelligence(policy_year);
CREATE INDEX idx_claim_intelligence_carrier ON claim_intelligence(carrier_name);
CREATE INDEX idx_claim_intelligence_type ON claim_intelligence(claim_type);
CREATE INDEX idx_claim_intelligence_year ON claim_intelligence(claim_year);
CREATE INDEX idx_carrier_metrics_carrier ON carrier_metrics(carrier_name);
CREATE INDEX idx_carrier_risk_flags_carrier ON carrier_risk_flags(carrier_name);
CREATE INDEX idx_carrier_risk_flags_active ON carrier_risk_flags(is_active);

-- Carrier comparison view (for quick queries)
CREATE VIEW carrier_comparison_summary AS
SELECT 
  cm.carrier_name,
  cm.total_policies,
  cm.total_claims,
  cm.avg_deductible,
  cm.avg_bi_months_coverage,
  cm.avg_claim_resolution_months,
  cm.claim_dispute_rate,
  cp.renewal_strictness_score,
  cp.common_exclusions
FROM carrier_metrics cm
LEFT JOIN carrier_profiles cp ON cm.carrier_name = cp.carrier_name
WHERE cm.total_policies >= 5;

-- Market benchmarks view (industry averages)
CREATE VIEW market_benchmarks AS
SELECT 
  AVG(avg_deductible) as market_avg_deductible,
  AVG(avg_bi_months_coverage) as market_avg_bi_months,
  AVG(avg_claim_resolution_months) as market_avg_resolution_months,
  AVG(claim_dispute_rate) as market_avg_dispute_rate,
  AVG(avg_property_limit) as market_avg_property_limit,
  AVG(avg_liability_limit) as market_avg_liability_limit,
  COUNT(DISTINCT carrier_name) as total_carriers_tracked
FROM carrier_metrics
WHERE total_policies >= 5;
