-- Hotel Risk Pro Database Schema
-- PostgreSQL

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  stripe_customer_id VARCHAR(255) UNIQUE,
  last_login_at TIMESTAMP
);

-- Anonymous sessions (for pre-auth analysis)
CREATE TABLE anonymous_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP NOT NULL,
  converted_to_user_id UUID REFERENCES users(id),
  ip_address VARCHAR(45),
  user_agent TEXT
);

-- Hotels table
CREATE TABLE hotels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  session_id UUID REFERENCES anonymous_sessions(id),
  hotel_name VARCHAR(255) NOT NULL,
  address VARCHAR(255),
  city VARCHAR(100),
  state VARCHAR(2),
  zip VARCHAR(10),
  number_of_rooms INTEGER,
  square_footage INTEGER,
  year_built INTEGER,
  year_renovated INTEGER,
  number_of_floors INTEGER,
  construction_type VARCHAR(50),
  roof_type VARCHAR(50),
  roof_age INTEGER,
  sprinkler_status VARCHAR(20),
  fire_alarm_status VARCHAR(20),
  has_pool_spa BOOLEAN,
  has_restaurant_bar BOOLEAN,
  has_event_space BOOLEAN,
  has_parking_structure_or_valet BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true
);

-- Financial profiles
CREATE TABLE financial_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  annual_gross_revenue DECIMAL(15,2),
  room_revenue_pct DECIMAL(5,2),
  food_beverage_revenue_pct DECIMAL(5,2),
  event_revenue_pct DECIMAL(5,2),
  other_revenue_pct DECIMAL(5,2),
  average_occupancy DECIMAL(5,2),
  adr DECIMAL(10,2),
  revpar DECIMAL(10,2),
  fixed_monthly_operating_costs DECIMAL(12,2),
  monthly_payroll_burden DECIMAL(12,2),
  monthly_debt_service DECIMAL(12,2),
  emergency_cash_reserves DECIMAL(12,2),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insurance policies
CREATE TABLE insurance_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  carrier VARCHAR(255),
  policy_period_start DATE,
  policy_period_end DATE,
  property_limit DECIMAL(15,2),
  business_interruption_limit DECIMAL(15,2),
  extra_expense_limit DECIMAL(12,2),
  liability_limit DECIMAL(12,2),
  umbrella_limit DECIMAL(12,2),
  deductible DECIMAL(12,2),
  bi_waiting_period_days INTEGER,
  bi_restoration_period_months INTEGER,
  coinsurance_pct DECIMAL(5,2),
  ordinance_law_coverage DECIMAL(12,2),
  equipment_breakdown_coverage BOOLEAN,
  flood_coverage DECIMAL(12,2),
  wind_coverage DECIMAL(12,2),
  sewer_backup_coverage DECIMAL(12,2),
  named_exclusions TEXT[],
  sublimits JSONB,
  scheduled_coverages JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_current BOOLEAN DEFAULT true
);

-- Loss runs (claims)
CREATE TABLE loss_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  claim_year INTEGER,
  claim_date DATE,
  claim_type VARCHAR(100),
  cause_of_loss VARCHAR(255),
  amount_paid DECIMAL(12,2),
  reserve_amount DECIMAL(12,2),
  status VARCHAR(20),
  property_area_affected VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Operational risk profiles
CREATE TABLE operational_risk_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  prior_roof_leaks BOOLEAN,
  hvac_issues BOOLEAN,
  plumbing_issues BOOLEAN,
  electrical_issues BOOLEAN,
  mold_moisture_history BOOLEAN,
  security_incidents BOOLEAN,
  frequent_slip_fall_issues BOOLEAN,
  crime_concerns BOOLEAN,
  deferred_maintenance BOOLEAN,
  inspection_deficiencies BOOLEAN,
  code_compliance_issues BOOLEAN,
  known_maintenance_issues TEXT[],
  completed_mitigation_projects TEXT[],
  unresolved_mitigation_needs TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Hazard profiles
CREATE TABLE hazard_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  flood_zone VARCHAR(20),
  coastal_wind_exposure VARCHAR(20),
  wildfire_exposure VARCHAR(20),
  freeze_exposure VARCHAR(20),
  storm_hail_exposure VARCHAR(20),
  crime_level VARCHAR(20),
  utility_interruption_risk BOOLEAN,
  contractor_scarcity VARCHAR(20),
  litigation_sensitivity VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Uploaded documents
CREATE TABLE uploaded_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  session_id UUID REFERENCES anonymous_sessions(id),
  document_type VARCHAR(50),
  file_name VARCHAR(255),
  file_size INTEGER,
  storage_path VARCHAR(500),
  mime_type VARCHAR(100),
  uploaded_at TIMESTAMP DEFAULT NOW(),
  parsed_at TIMESTAMP,
  parsing_status VARCHAR(20),
  parsed_data JSONB,
  parsing_confidence DECIMAL(5,2)
);

-- Analyses (snapshots)
CREATE TABLE analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  session_id UUID REFERENCES anonymous_sessions(id),
  analysis_data JSONB NOT NULL,
  input_data JSONB NOT NULL,
  survivability_score INTEGER,
  survivability_band VARCHAR(20),
  property_coverage_gap DECIMAL(15,2),
  bi_months_covered INTEGER,
  estimated_uncovered_exposure DECIMAL(15,2),
  completeness_pct INTEGER,
  confidence_level VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW(),
  is_latest BOOLEAN DEFAULT true
);

-- Subscriptions
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  stripe_customer_id VARCHAR(255),
  plan_type VARCHAR(50),
  status VARCHAR(50),
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Monitoring alerts
CREATE TABLE monitoring_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id UUID REFERENCES hotels(id) ON DELETE CASCADE,
  alert_type VARCHAR(50),
  alert_message TEXT,
  severity VARCHAR(20),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_hotels_user_id ON hotels(user_id);
CREATE INDEX idx_hotels_session_id ON hotels(session_id);
CREATE INDEX idx_analyses_hotel_id ON analyses(hotel_id);
CREATE INDEX idx_analyses_user_id ON analyses(user_id);
CREATE INDEX idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_hotel_id ON subscriptions(hotel_id);
CREATE INDEX idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX idx_loss_runs_hotel_id ON loss_runs(hotel_id);
CREATE INDEX idx_uploaded_documents_hotel_id ON uploaded_documents(hotel_id);
