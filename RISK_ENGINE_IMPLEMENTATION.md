# Risk Engine Implementation Summary

## Status: COMPLETE ✓

The complete Hotel Risk Pro analysis engine has been built, tested, and integrated.

---

## What Was Built

### Core Analysis Engine

A production-ready, modular risk analysis system that evaluates hotel insurance survivability across 8 dimensions:

1. **Property Coverage Adequacy**
2. **Business Interruption Sufficiency**
3. **Liability Protection**
4. **Deductible Cash Flow Stress**
5. **Loss History Renewal Pressure**
6. **Operational Risk Amplification**
7. **Location/Hazard Severity**
8. **Overall Survivability**

---

## Module Breakdown

### 1. Main Orchestrator (`index.js`)

**Purpose:** Single entry point that coordinates all analysis modules

**Function:**
```javascript
analyzeHotelRisk(input) → HotelRiskAnalysis
```

**What it does:**
- Normalizes input data structure
- Runs all 8 analysis modules
- Calculates survivability score
- Generates scenarios
- Creates priority actions
- Produces report-ready output

**Input normalization:**
- Handles intake wizard format
- Handles direct API format
- Handles test fixture format

---

### 2. Type Definitions (`types.js`)

**Purpose:** JSDoc type definitions for type safety

**Defines:**
- `HotelProfile` - Property details
- `FinancialProfile` - Revenue and financial data
- `PolicyProfile` - Insurance policy structure
- `LossRunItem` - Historical claim data
- `OperationalRiskProfile` - Property condition
- `HazardProfile` - Location risks
- `ScenarioResult` - Scenario output shape
- `PriorityAction` - Action recommendation shape
- `HotelRiskAnalysis` - Complete output shape

---

### 3. Constants (`constants.js`)

**Purpose:** Centralized assumptions and thresholds

**Key constants:**

**Property Defaults:**
- Replacement cost per sq ft: $350-$425 (varies by construction)
- Average sq ft per room: 600 (proxy when sqft missing)
- Age uplift: 15% for properties >40 years old

**BI Defaults:**
- Major fire recovery: 14 months
- Major water recovery: 7 months
- Partial shutdown: 4 months
- Large property delay: +2 months
- Old property delay: +1 month
- Contractor scarcity delay: +3 months

**Liability Defaults:**
- Base need: $1M - $3M
- Pool/spa increment: +$500K
- Restaurant/bar increment: +$500K
- Event space increment: +$750K
- High-litigation increment: +$1M

**Score Weights:**
- Property: 30 points
- Business Interruption: 30 points
- Liability: 15 points
- Deductible: 10 points
- Loss History: 5 points
- Operations: 5 points
- Hazards: 5 points

---

### 4. Utilities (`utils.js`)

**Purpose:** Shared helper functions

**Functions:**
- `parseNumber()` - Safe numeric parsing
- `formatCurrency()` - Display formatting ($3.4M, $250K)
- `getNestedValue()` - Safe object property access
- `hasValue()` - Check for meaningful values
- `calculatePercentage()` - Percentage calculations
- `calculateBuildingAge()` - Age from year built

---

### 5. Completeness Analysis (`completeness.js`)

**Purpose:** Evaluate data quality and confidence

**What it does:**
- Checks for critical, important, and preferred fields
- Calculates weighted completeness percentage
- Determines confidence level (low/moderate/high)
- Lists missing critical fields
- Documents assumptions used

**Confidence levels:**
- **High:** All essential fields present, most important fields present
- **Moderate:** All essential fields present, some important fields missing
- **Low:** Missing essential fields

**Critical fields tracked:**
- Essential: rooms, state, revenue, property limit, BI limit, deductible
- Important: square footage, year built, monthly costs, reserves
- Preferred: construction type, roof age, payroll, ordinance/law coverage

---

### 6. Property Coverage Analysis (`property.js`)

**Purpose:** Determine if property is underinsured

**What it does:**
- Estimates replacement cost from square footage or room count
- Applies construction type adjustments
- Applies age uplift for older properties
- Calculates property gap
- Checks ordinance/law coverage for older properties
- Evaluates coinsurance penalty risk
- Generates plain-English explanation

**Key formulas:**
```
estimatedReplacementCost = squareFootage × costPerSqFt
propertyGap = max(0, estimatedReplacementCost - propertyLimit)
gapPercentage = (propertyGap / estimatedReplacementCost) × 100
```

**Adequacy status:**
- `adequate`: Gap = 0
- `marginal`: Gap > 0 but ≤ 10% of estimated need
- `inadequate`: Gap > 10%

**Subscore:** 0-30 points based on adequacy and gap percentage

---

### 7. Business Interruption Analysis (`businessInterruption.js`)

**Purpose:** Determine if BI coverage duration is sufficient

**What it does:**
- Calculates monthly revenue
- Determines months of BI coverage
- Estimates realistic recovery time with adjustments
- Calculates uncovered revenue exposure
- Evaluates waiting period impact
- Assesses fixed obligations pressure during uncovered period

**Key formulas:**
```
monthlyRevenue = annualGrossRevenue / 12
biMonthsCovered = biLimit / monthlyRevenue
uncoveredMonths = max(0, estimatedRecoveryMonths - biMonthsCovered)
uncoveredExposure = uncoveredMonths × monthlyRevenue
```

**Recovery time estimation:**
- Base estimate by scenario type
- Adjustments for property size, age, contractor scarcity
- Conservative assumptions

**Adequacy status:**
- `adequate`: Coverage ≥ recovery time
- `marginal`: Coverage within 2 months of recovery time
- `inadequate`: Coverage materially below recovery time

**Subscore:** 0-30 points based on coverage ratio

---

### 8. Liability Analysis (`liability.js`)

**Purpose:** Assess liability coverage adequacy

**What it does:**
- Calculates effective liability protection (primary + umbrella)
- Estimates liability need range based on exposure factors
- Identifies exposure amplifiers
- Compares coverage to estimated need

**Exposure factors:**
- Pool/spa presence
- Restaurant/bar operations
- Event space
- Parking/valet
- High-litigation jurisdiction

**Adequacy status:**
- `adequate`: Coverage ≥ 120% of high-end need
- `marginal`: Coverage ≥ 80% of low-end need
- `inadequate`: Coverage < 80% of low-end need

**Subscore:** 0-15 points based on coverage ratio

---

### 9. Deductible Stress Analysis (`deductible.js`)

**Purpose:** Evaluate cash flow impact of deductible

**What it does:**
- Compares deductible to emergency reserves
- Calculates deductible as multiple of monthly obligations
- Determines cash flow pressure

**Key metrics:**
- Deductible as % of reserves
- Deductible as multiple of monthly obligations (payroll + debt + fixed costs)

**Status thresholds:**
- `manageable`: ≤ 30% of reserves AND ≤ 0.5× monthly obligations
- `stressful`: 30-60% of reserves OR 0.5-1.0× monthly obligations
- `severe`: > 60% of reserves OR > 1.0× monthly obligations

**Subscore:** 0-10 points based on status

---

### 10. Loss History Analysis (`lossHistory.js`)

**Purpose:** Interpret claim history for renewal pressure

**What it does:**
- Counts total claims and open claims
- Calculates total paid losses
- Identifies recurring claim categories (≥2 of same type)
- Analyzes recent claims (last 3 years)
- Determines loss pressure band
- Generates specific findings for water claims, open claims, patterns

**Pressure bands:**
- `low`: 0-1 claims, no patterns
- `moderate`: 2-3 claims, or 1-2 recent, or 1 pattern
- `high`: ≥4 claims, or ≥3 recent, or ≥2 open, or multiple patterns

**Subscore:** 0-5 points based on pressure band and claim count

---

### 11. Operational Risk Analysis (`operations.js`)

**Purpose:** Translate property issues into insurance significance

**What it does:**
- Flags maintenance and condition issues
- Assigns severity levels
- Explains insurance relevance
- Generates plain-English implications

**Risk factors tracked:**
- Prior roof leaks
- Mold/moisture history
- HVAC issues
- Plumbing issues
- Electrical issues
- Deferred maintenance
- Inspection deficiencies
- Code compliance issues

**Severity levels:**
- High: Inspection deficiencies
- Moderate: Roof leaks, plumbing, electrical, mold, deferred maintenance, code issues
- Low: HVAC issues

**Subscore:** 0-5 points based on severity and count

---

### 12. Hazard/Location Analysis (`hazards.js`)

**Purpose:** Evaluate environmental and local conditions

**What it does:**
- Assesses natural hazard exposure
- Identifies missing catastrophe coverage
- Evaluates local conditions affecting recovery
- Flags high-risk jurisdictions

**Hazards evaluated:**
- Flood zone (checks for missing flood coverage)
- Coastal/wind exposure
- Wildfire risk
- Storm/hail frequency
- Crime level
- Contractor scarcity
- Litigation environment

**Subscore:** 0-5 points based on hazard severity and count

---

### 13. Scenario Engine (`scenarios.js`)

**Purpose:** Generate four loss scenario projections

**Scenarios:**

**1. Major Fire Scenario**
- Loss amount: 40% of replacement cost
- Downtime: 14 months (adjusted)
- Calculates property covered/uncovered
- Calculates BI covered/uncovered months
- Total uncovered exposure

**2. Major Water Scenario**
- Loss amount: 20% of property value
- Downtime: 7 months (adjusted)
- Similar coverage calculations

**3. Severe Liability Scenario**
- Incident amount: $5M (severe case)
- Compares to effective liability protection
- Calculates uncovered amount

**4. Partial Shutdown Scenario**
- Affected rooms: 40% of total
- Revenue impact: 50% reduction
- Downtime: 4 months (adjusted)
- BI coverage vs uncovered revenue

**All scenarios include:**
- Estimated loss amount
- Estimated downtime (if applicable)
- Covered months/amounts
- Uncovered exposure
- Plain-English summary

---

### 14. Priority Action Generator (`priorities.js`)

**Purpose:** Create ranked corrective action list

**What it does:**
- Evaluates all analysis results
- Generates specific actions with urgency
- Scores actions by severity and impact
- Returns top 3-7 actions

**Action types generated:**
- Correct property underinsurance gap
- Increase BI coverage duration
- Address recurring water losses
- Add ordinance/law coverage
- Resolve inspection deficiencies
- Address deferred maintenance
- Obtain flood insurance (if in flood zone)
- Increase liability limits
- Review coinsurance compliance

**Urgency assignment:**
- `fix_now`: Missing flood coverage, recurring losses, inspection issues
- `fix_before_renewal`: Property gaps, BI shortfalls, liability inadequacy
- `monitor_closely`: Marginal issues, deferred maintenance

**Scoring:** Actions scored 0-100, sorted by priority

---

### 15. Survivability Score Calculator (`score.js`)

**Purpose:** Aggregate subscores into overall 0-100 score

**Component weights:**
```
Property:              30 points
Business Interruption: 30 points
Liability:             15 points
Deductible:            10 points
Loss History:           5 points
Operations:             5 points
Hazards:                5 points
─────────────────────────────
Total:                100 points
```

**Score bands:**
- **80-100:** Strong - Adequate protection
- **60-79:** Moderate - Some concerns
- **40-59:** Weak - Material gaps
- **0-39:** Critical - Severe exposure

**Output includes:**
- Total score
- Band classification
- Component breakdown (for transparency)

---

### 16. Narrative Generators (`narrative.js`)

**Purpose:** Generate plain-English text for reports

**Functions:**

**`generateHeadlineFindings()`**
- Creates 3-5 top-level findings
- Prioritizes critical issues
- Plain-English, owner-focused

**`generateIfNothingChangesNarrative()`**
- Builds worst-case scenario text
- Combines property, BI, loss history, operational risks
- Blunt but not sensationalized
- Financially grounded

**`generateMonitoringFlags()`**
- Sets boolean flags for dashboard alerts
- Tracks: renewal risk, underinsurance, BI shortfall, loss patterns, operational deterioration, catastrophe exposure

---

## Test Suite

### Test Fixtures (`fixtures.js`)

Six comprehensive test cases:

1. **Strongly Insured Hotel**
   - 120 rooms, Denver, CO
   - Adequate coverage across all categories
   - Expected score: 80-100
   - Result: ✓ 100/100

2. **Property-Underinsured Hotel**
   - 85 rooms, Charleston, SC
   - $11M property gap
   - In flood zone without flood coverage
   - Expected score: 60-79
   - Result: ✓ 63/100

3. **BI-Shortfall Hotel**
   - 145 rooms, Aspen, CO
   - BI covers only 3 months, recovery needs 17 months
   - $16.9M uncovered revenue exposure
   - Expected score: 60-79
   - Result: ✓ 73/100

4. **Repeated-Water-Loss Hotel**
   - 95 rooms, Seattle, WA
   - 3 water claims + 1 liability claim
   - Recurring water pattern
   - Multiple operational issues
   - Expected score: 60-79
   - Result: ✓ 72/100

5. **Partial-Data Hotel**
   - 48 rooms, Phoenix, AZ
   - Missing square footage, year built, costs, reserves
   - Tests partial-data mode
   - Expected: Lower completeness, documented assumptions
   - Result: ✓ 65% complete, moderate confidence

6. **Critical-Risk Hotel**
   - 200 rooms, Miami Beach, FL
   - $60M total uncovered exposure
   - 5 claims including open hurricane claim
   - Multiple operational issues
   - In flood zone without coverage
   - High hazard exposure
   - Expected score: 0-39
   - Result: ✓ 31/100

### Test Results

**All 6 tests PASS:**
- ✓ Output structure validation
- ✓ Score range validation (0-100)
- ✓ Appropriate findings generation
- ✓ Priority action logic
- ✓ Monitoring flag accuracy

Run tests: `node lib/risk-engine/test.js`

---

## Key Formulas

### Property Coverage
```
estimatedReplacementCost = squareFootage × costPerSqFt
  OR
estimatedReplacementCost = (rooms × 600) × costPerSqFt

propertyGap = max(0, estimatedReplacementCost - propertyLimit)
```

### Business Interruption
```
monthlyRevenue = annualGrossRevenue / 12
biMonthsCovered = biLimit / monthlyRevenue
uncoveredMonths = max(0, estimatedRecoveryMonths - biMonthsCovered)
uncoveredExposure = uncoveredMonths × monthlyRevenue
```

### Recovery Time
```
baseRecovery = scenarioType (14 months for fire, 7 for water, etc.)
+ largePropertyAdjustment (if >150 rooms: +2 months)
+ oldPropertyAdjustment (if built before 1980: +1 month)
+ contractorScarcityAdjustment (if high: +3 months)
```

### Liability Need Range
```
baseLow = $1M
baseHigh = $3M
+ poolSpa: +$500K to high
+ restaurantBar: +$500K to high
+ eventSpace: +$750K to both
+ parkingValet: +$250K to high
+ highLitigation: +$1M to both
```

### Deductible Stress
```
reserveRatio = deductible / emergencyReserves
obligationMultiple = deductible / monthlyObligations

manageable: reserveRatio ≤ 0.3 AND obligationMultiple ≤ 0.5
stressful: reserveRatio 0.3-0.6 OR obligationMultiple 0.5-1.0
severe: reserveRatio > 0.6 OR obligationMultiple > 1.0
```

---

## Design Principles

### 1. Explainable Logic
Every calculation is deterministic and can be audited. No black-box ML models. Hotel owners can understand how conclusions were reached.

### 2. Conservative Assumptions
When estimating needs or recovery times, the engine errs on the conservative side. Better to overestimate exposure than underestimate.

### 3. Partial Data Mode
The engine works even with incomplete data. It documents assumptions, adjusts confidence levels, and still produces useful guidance.

### 4. Plain-English Output
All findings avoid jargon. Examples:
- ✓ "Your insurance may run out after 5 months"
- ✓ "Your property may be underinsured by $3.4M"
- ✗ "Predictive intelligence indicates structural insurance insufficiency"

### 5. Owner-Focused
Every output answers real owner questions:
- "Am I protected?"
- "Will I run out of money?"
- "What should I fix?"
- "How bad could it get?"

---

## Integration

### With UI Components

The new `SurvivabilityReportV2` component uses the risk engine:

```javascript
import { analyzeHotelRisk } from '../lib/risk-engine';

export default function SurvivabilityReportV2({ data }) {
  const analysis = analyzeHotelRisk(data);
  
  return (
    <div>
      <h1>Score: {analysis.summary.survivabilityScore}/100</h1>
      {analysis.findings.headlineFindings.map(finding => (
        <p>{finding}</p>
      ))}
      {analysis.priorities.map(action => (
        <div>
          <h3>{action.title}</h3>
          <p>{action.whyItMatters}</p>
        </div>
      ))}
    </div>
  );
}
```

### With API Endpoints

New API endpoint at `/api/analyze`:

```javascript
POST /api/analyze
Content-Type: application/json

{
  "hotelProfile": { ... },
  "financialProfile": { ... },
  "policyProfile": { ... },
  "lossRuns": [ ... ],
  "operationalRiskProfile": { ... },
  "hazardProfile": { ... }
}

Response:
{
  "success": true,
  "analysis": { ... },
  "timestamp": "2026-03-15T..."
}
```

### With Dashboard

The monitoring dashboard can use `monitoringFlags` for alerts:

```javascript
const analysis = analyzeHotelRisk(data);

if (analysis.monitoringFlags.renewalRisk) {
  showAlert('Renewal pressure detected - review loss history');
}

if (analysis.monitoringFlags.underinsuranceRisk) {
  showAlert('Property underinsurance detected');
}
```

---

## Output Structure

### Complete Analysis Object

```javascript
{
  // Data quality assessment
  completeness: {
    percentComplete: 85,
    confidence: 'high',
    missingCriticalFields: [],
    assumptionsUsed: ['Property square footage estimated from room count'],
  },
  
  // Top-level summary
  summary: {
    survivabilityScore: 63,
    survivabilityBand: 'moderate',
    propertyCoverageGap: 11000000,
    biMonthsCovered: 12,
    estimatedRecoveryMonths: 15,
    estimatedUncoveredExposure: 12500000,
  },
  
  // Categorized findings
  findings: {
    headlineFindings: [
      'Your property appears materially underinsured.',
      'Your business interruption coverage may be insufficient for extended recovery scenarios.',
    ],
    coverageFindings: [...],
    biFindings: [...],
    liabilityFindings: [...],
    lossHistoryFindings: [...],
    operationalFindings: [...],
    hazardFindings: [...],
  },
  
  // Detailed comparisons
  comparisons: {
    property: {
      policyLimit: 14000000,
      estimatedNeed: 25000000,
      gap: 11000000,
      adequacyStatus: 'inadequate',
      explanation: '...',
    },
    businessInterruption: { ... },
    liability: { ... },
    deductible: { ... },
  },
  
  // Loss history summary
  lossHistory: {
    totalClaims: 3,
    recurringCategories: ['Water'],
    openClaimsCount: 1,
    lossPressureBand: 'moderate',
    explanation: '...',
  },
  
  // Four scenarios
  scenarioAnalysis: {
    fireScenario: { ... },
    waterScenario: { ... },
    liabilityScenario: { ... },
    partialShutdownScenario: { ... },
  },
  
  // Ranked actions
  priorities: [
    {
      title: 'Obtain flood insurance coverage',
      urgency: 'fix_now',
      category: 'hazard',
      whyItMatters: '...',
      estimatedImpact: '...',
    },
    // ... more actions
  ],
  
  // Worst-case narrative
  ifNothingChanges: 'If a serious loss occurs under current conditions...',
  
  // Dashboard alert flags
  monitoringFlags: {
    renewalRisk: false,
    underinsuranceRisk: true,
    biShortfallRisk: true,
    lossPatternRisk: false,
    operationalDeteriorationRisk: false,
    catastropheExposureRisk: true,
  },
}
```

---

## Files Created

### Core Engine
- `lib/risk-engine/index.js` - Main orchestrator (180 lines)
- `lib/risk-engine/types.js` - Type definitions (150 lines)
- `lib/risk-engine/constants.js` - Constants and defaults (140 lines)
- `lib/risk-engine/utils.js` - Utility functions (80 lines)

### Analysis Modules
- `lib/risk-engine/completeness.js` - Completeness analysis (90 lines)
- `lib/risk-engine/property.js` - Property coverage (140 lines)
- `lib/risk-engine/businessInterruption.js` - BI analysis (130 lines)
- `lib/risk-engine/liability.js` - Liability analysis (110 lines)
- `lib/risk-engine/deductible.js` - Deductible stress (70 lines)
- `lib/risk-engine/lossHistory.js` - Loss history (120 lines)
- `lib/risk-engine/operations.js` - Operational risk (100 lines)
- `lib/risk-engine/hazards.js` - Hazard analysis (120 lines)

### Supporting Modules
- `lib/risk-engine/scenarios.js` - Scenario engine (180 lines)
- `lib/risk-engine/priorities.js` - Priority actions (140 lines)
- `lib/risk-engine/score.js` - Score calculator (70 lines)
- `lib/risk-engine/narrative.js` - Text generation (100 lines)

### Testing
- `lib/risk-engine/fixtures.js` - Test data (450 lines)
- `lib/risk-engine/test.js` - Test suite (150 lines)

### Documentation
- `lib/risk-engine/README.md` - Engine documentation

### Integration
- `components/SurvivabilityReportV2.js` - Report component using engine
- `pages/api/analyze.js` - API endpoint
- `pages/report.js` - Updated to use V2 component

**Total:** ~2,500 lines of production-quality analysis code

---

## What's Next

### Immediate Use
The engine is production-ready and can be used immediately for:
- Real-time dashboard analysis
- PDF report generation
- API-based analysis requests
- Monitoring and alerting

### Future Enhancements

**1. Advanced Recovery Models**
- ML-based recovery time prediction
- Historical recovery data integration
- Regional adjustment factors

**2. Industry Benchmarking**
- Compare to similar hotels
- Percentile rankings
- Market-standard coverage levels

**3. Real-Time Data Integration**
- Live replacement cost APIs
- FEMA flood zone lookups
- Catastrophe event feeds
- Carrier rating data

**4. Enhanced Scenario Engine**
- Custom scenario builder
- Monte Carlo simulations
- Stress testing
- Multi-peril combinations

**5. Carrier-Specific Logic**
- Known carrier behaviors
- Claim handling reputation
- Renewal patterns
- Coverage interpretation

---

## Philosophy

**This is not actuarial modeling.**

This is practical, financially grounded guidance for hotel owners who need to know: "Am I protected?"

**This is not a black box.**

Every formula is explainable. Every assumption is documented. Every finding can be traced back to specific inputs.

**This is not enterprise software.**

The engine produces outputs that hotel owners can understand and act on, without needing insurance expertise.

---

## Conclusion

The Hotel Risk Pro analysis engine is complete, tested, and production-ready. It provides comprehensive, explainable, owner-friendly risk analysis that powers the entire platform.

The engine successfully:
- ✓ Evaluates 8 dimensions of hotel insurance risk
- ✓ Produces 0-100 survivability score with component breakdown
- ✓ Generates plain-English findings for non-experts
- ✓ Creates prioritized, actionable recommendations
- ✓ Handles partial data gracefully with documented assumptions
- ✓ Runs 4 scenario projections
- ✓ Sets monitoring flags for ongoing tracking
- ✓ Passes all test cases
- ✓ Integrates with UI components and API endpoints

The system is ready for production use and backend integration.
