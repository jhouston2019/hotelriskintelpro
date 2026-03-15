/**
 * Constants and default assumptions for Hotel Risk Pro analysis engine
 */

// Property valuation defaults
const PROPERTY_DEFAULTS = {
  // Replacement cost per square foot by construction type
  REPLACEMENT_COST_PER_SQFT: {
    wood: 400,
    masonry: 350,
    concrete: 375,
    steel: 425,
    default: 350,
  },
  
  // Average square footage per room (used when sqft missing)
  AVG_SQFT_PER_ROOM: 600,
  
  // Property value uplift for older properties without recent renovation
  AGE_UPLIFT_THRESHOLD_YEARS: 40,
  AGE_UPLIFT_FACTOR: 1.15,
};

// Business interruption defaults
const BI_DEFAULTS = {
  // Conservative recovery time estimates by scenario type (months)
  RECOVERY_ESTIMATES: {
    majorFire: 14,
    majorWater: 7,
    partialShutdown: 4,
    catastrophicEvent: 18,
  },
  
  // Recovery time adjustments
  CONTRACTOR_SCARCITY_DELAY_MONTHS: 3,
  LARGE_PROPERTY_DELAY_MONTHS: 2,
  OLD_PROPERTY_DELAY_MONTHS: 1,
  
  // Thresholds
  LARGE_PROPERTY_ROOM_THRESHOLD: 150,
  OLD_PROPERTY_YEAR_THRESHOLD: 1980,
};

// Liability defaults
const LIABILITY_DEFAULTS = {
  // Base liability need range
  BASE_NEED_LOW: 1000000,
  BASE_NEED_HIGH: 3000000,
  
  // Exposure increments
  POOL_SPA_INCREMENT: 500000,
  RESTAURANT_BAR_INCREMENT: 500000,
  EVENT_SPACE_INCREMENT: 750000,
  PARKING_VALET_INCREMENT: 250000,
  HIGH_LITIGATION_INCREMENT: 1000000,
  
  // Adequacy thresholds
  ADEQUATE_COVERAGE_MULTIPLE: 1.2,
  MARGINAL_COVERAGE_MULTIPLE: 0.8,
};

// Deductible stress defaults
const DEDUCTIBLE_DEFAULTS = {
  // Deductible as percentage of reserves thresholds
  MANAGEABLE_RESERVE_PCT: 0.3,
  STRESSFUL_RESERVE_PCT: 0.6,
  
  // Deductible as multiple of monthly obligations
  MANAGEABLE_MONTHLY_MULTIPLE: 0.5,
  STRESSFUL_MONTHLY_MULTIPLE: 1.0,
};

// Loss history defaults
const LOSS_HISTORY_DEFAULTS = {
  // Claim frequency thresholds
  MODERATE_PRESSURE_CLAIM_COUNT: 2,
  HIGH_PRESSURE_CLAIM_COUNT: 4,
  
  // Recurring pattern thresholds
  RECURRING_PATTERN_THRESHOLD: 2,
  
  // Recent claims window (years)
  RECENT_CLAIMS_WINDOW: 3,
};

// Survivability score weights
const SCORE_WEIGHTS = {
  property: 30,
  businessInterruption: 30,
  liability: 15,
  deductible: 10,
  lossHistory: 5,
  operations: 5,
  hazards: 5,
};

// Survivability score bands
const SCORE_BANDS = {
  strong: { min: 80, max: 100, label: "Strong" },
  moderate: { min: 60, max: 79, label: "Moderate" },
  weak: { min: 40, max: 59, label: "Weak" },
  critical: { min: 0, max: 39, label: "Critical" },
};

// Scenario defaults
const SCENARIO_DEFAULTS = {
  // Fire scenario assumptions
  FIRE_LOSS_PCT_LOW: 0.25,
  FIRE_LOSS_PCT_HIGH: 0.60,
  FIRE_LOSS_PCT_DEFAULT: 0.40,
  
  // Water scenario assumptions
  WATER_LOSS_PCT_LOW: 0.10,
  WATER_LOSS_PCT_HIGH: 0.30,
  WATER_LOSS_PCT_DEFAULT: 0.20,
  
  // Liability scenario range
  LIABILITY_INCIDENT_LOW: 500000,
  LIABILITY_INCIDENT_HIGH: 5000000,
  LIABILITY_INCIDENT_TYPICAL: 2000000,
  
  // Partial shutdown assumptions
  PARTIAL_SHUTDOWN_ROOM_PCT: 0.40,
  PARTIAL_SHUTDOWN_REVENUE_IMPACT: 0.50,
};

// Critical fields for completeness analysis
const CRITICAL_FIELDS = {
  essential: [
    'hotelProfile.numberOfRooms',
    'hotelProfile.state',
    'financialProfile.annualGrossRevenue',
    'policyProfile.propertyLimit',
    'policyProfile.businessInterruptionLimit',
    'policyProfile.deductible',
  ],
  important: [
    'hotelProfile.squareFootage',
    'hotelProfile.yearBuilt',
    'financialProfile.fixedMonthlyOperatingCosts',
    'financialProfile.emergencyCashReserves',
    'policyProfile.liabilityLimit',
    'policyProfile.biRestorationPeriodMonths',
  ],
  preferred: [
    'hotelProfile.constructionType',
    'hotelProfile.roofAge',
    'financialProfile.monthlyPayrollBurden',
    'policyProfile.ordinanceLawCoverage',
    'lossRuns',
  ],
};

module.exports = {
  PROPERTY_DEFAULTS,
  BI_DEFAULTS,
  LIABILITY_DEFAULTS,
  DEDUCTIBLE_DEFAULTS,
  LOSS_HISTORY_DEFAULTS,
  SCORE_WEIGHTS,
  SCORE_BANDS,
  SCENARIO_DEFAULTS,
  CRITICAL_FIELDS,
};
