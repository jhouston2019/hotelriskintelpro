# Hotel Risk Pro - Analysis Engine

## Overview

This is the core risk analysis engine for Hotel Risk Pro. It evaluates whether a hotel's insurance coverage and risk environment can realistically carry the business through a serious loss.

## Purpose

The engine produces:
- **Survivability Score** (0-100)
- **Coverage gap analysis** (property, BI, liability, deductible)
- **Plain-English findings** for hotel owners
- **Prioritized corrective actions**
- **Scenario-based projections**
- **Monitoring flags** for ongoing risk tracking

## Architecture

### Core Modules

```
lib/risk-engine/
├── index.js              # Main orchestrator
├── types.js              # Type definitions (JSDoc)
├── constants.js          # Default assumptions and thresholds
├── utils.js              # Utility functions
├── completeness.js       # Data completeness analysis
├── property.js           # Property coverage analysis
├── businessInterruption.js  # BI coverage analysis
├── liability.js          # Liability coverage analysis
├── deductible.js         # Deductible stress analysis
├── lossHistory.js        # Loss history and renewal pressure
├── operations.js         # Operational risk analysis
├── hazards.js            # Location and hazard analysis
├── scenarios.js          # Scenario engine (fire, water, liability, partial)
├── priorities.js         # Priority action generator
├── score.js              # Survivability score calculator
├── narrative.js          # Text generation for findings
├── fixtures.js           # Test data fixtures
├── test.js               # Test suite
└── README.md             # This file
```

## Usage

### Basic Usage

```javascript
const { analyzeHotelRisk } = require('./lib/risk-engine');

const input = {
  hotelProfile: { /* ... */ },
  financialProfile: { /* ... */ },
  policyProfile: { /* ... */ },
  lossRuns: [ /* ... */ ],
  operationalRiskProfile: { /* ... */ },
  hazardProfile: { /* ... */ },
};

const analysis = analyzeHotelRisk(input);

console.log(analysis.summary.survivabilityScore);
console.log(analysis.findings.headlineFindings);
console.log(analysis.priorities);
```

### Input Format

The engine accepts data in the format collected by the intake wizard:

```javascript
{
  hotelProfile: {
    hotelName: string,
    numberOfRooms: number,
    squareFootage: number | null,
    yearBuilt: number | null,
    constructionType: string | null,
    // ... other hotel details
  },
  financialProfile: {
    annualGrossRevenue: number,
    fixedMonthlyOperatingCosts: number | null,
    emergencyCashReserves: number | null,
    // ... other financial data
  },
  policyProfile: {
    propertyLimit: number,
    businessInterruptionLimit: number,
    liabilityLimit: number,
    deductible: number,
    // ... other policy details
  },
  lossRuns: [
    {
      claimYear: number,
      claimType: string,
      amountPaid: number,
      status: 'Open' | 'Closed',
      // ... other claim details
    }
  ],
  operationalRiskProfile: {
    priorRoofLeaks: boolean,
    deferredMaintenance: boolean,
    // ... other operational risks
  },
  hazardProfile: {
    floodZone: string,
    coastalWindExposure: boolean,
    contractorScarcity: boolean,
    // ... other hazards
  }
}
```

### Output Format

```javascript
{
  completeness: {
    percentComplete: number,
    confidence: 'low' | 'moderate' | 'high',
    missingCriticalFields: string[],
    assumptionsUsed: string[],
  },
  summary: {
    survivabilityScore: number,
    survivabilityBand: 'strong' | 'moderate' | 'weak' | 'critical',
    propertyCoverageGap: number | null,
    biMonthsCovered: number | null,
    estimatedRecoveryMonths: number | null,
    estimatedUncoveredExposure: number | null,
  },
  findings: {
    headlineFindings: string[],
    coverageFindings: string[],
    biFindings: string[],
    liabilityFindings: string[],
    lossHistoryFindings: string[],
    operationalFindings: string[],
    hazardFindings: string[],
  },
  comparisons: {
    property: { /* detailed property analysis */ },
    businessInterruption: { /* detailed BI analysis */ },
    liability: { /* detailed liability analysis */ },
    deductible: { /* detailed deductible analysis */ },
  },
  lossHistory: {
    totalClaims: number,
    recurringCategories: string[],
    openClaimsCount: number,
    lossPressureBand: 'low' | 'moderate' | 'high',
    explanation: string,
  },
  scenarioAnalysis: {
    fireScenario: { /* scenario details */ },
    waterScenario: { /* scenario details */ },
    liabilityScenario: { /* scenario details */ },
    partialShutdownScenario: { /* scenario details */ },
  },
  priorities: [
    {
      title: string,
      urgency: 'fix_now' | 'fix_before_renewal' | 'monitor_closely',
      category: string,
      whyItMatters: string,
      estimatedImpact: string,
    }
  ],
  ifNothingChanges: string,
  monitoringFlags: {
    renewalRisk: boolean,
    underinsuranceRisk: boolean,
    biShortfallRisk: boolean,
    lossPatternRisk: boolean,
    operationalDeteriorationRisk: boolean,
    catastropheExposureRisk: boolean,
  }
}
```

## Analysis Components

### 1. Property Coverage Analysis

**Module:** `property.js`

**What it does:**
- Estimates replacement cost using square footage or room count proxy
- Compares policy limit to estimated need
- Identifies underinsurance gaps
- Checks ordinance/law coverage for older properties
- Evaluates coinsurance penalty risk

**Key formulas:**
```
estimatedReplacementCost = squareFootage × costPerSqFt
propertyGap = max(0, estimatedReplacementCost - propertyLimit)
```

**Adequacy status:**
- `adequate`: Gap ≤ 0
- `marginal`: Gap > 0 but ≤ 10% of estimated need
- `inadequate`: Gap > 10%

### 2. Business Interruption Analysis

**Module:** `businessInterruption.js`

**What it does:**
- Calculates monthly revenue from annual revenue
- Determines how many months BI coverage would last
- Estimates realistic recovery time based on property characteristics
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

**Recovery time factors:**
- Base recovery estimate by scenario type
- Large property adjustment (+2 months if >150 rooms)
- Old property adjustment (+1 month if built before 1980)
- Contractor scarcity adjustment (+3 months)

### 3. Liability Analysis

**Module:** `liability.js`

**What it does:**
- Estimates liability need range based on exposure factors
- Includes umbrella coverage in effective protection
- Compares coverage to estimated need
- Identifies exposure amplifiers (pool, bar, events, parking, litigation environment)

**Exposure factors:**
- Base need: $1M - $3M
- Pool/spa: +$500K
- Restaurant/bar: +$500K
- Event space: +$750K
- Parking/valet: +$250K
- High-litigation jurisdiction: +$1M

### 4. Deductible Stress Analysis

**Module:** `deductible.js`

**What it does:**
- Compares deductible to emergency reserves
- Evaluates deductible as multiple of monthly obligations
- Determines cash flow pressure after loss

**Status thresholds:**
- `manageable`: Deductible ≤ 30% of reserves AND ≤ 0.5× monthly obligations
- `stressful`: Deductible 30-60% of reserves OR 0.5-1.0× monthly obligations
- `severe`: Deductible > 60% of reserves OR > 1.0× monthly obligations

### 5. Loss History Analysis

**Module:** `lossHistory.js`

**What it does:**
- Counts total claims and open claims
- Identifies recurring claim categories
- Analyzes recent claim frequency (last 3 years)
- Determines renewal pressure band

**Pressure bands:**
- `low`: Few or no claims, no repeating patterns
- `moderate`: Some claims or isolated patterns
- `high`: ≥4 claims, or ≥3 recent claims, or ≥2 open claims, or recurring patterns

### 6. Operational Risk Analysis

**Module:** `operations.js`

**What it does:**
- Flags property condition issues that increase loss risk
- Translates maintenance issues into insurance significance
- Identifies factors that may affect insurability

**Risk factors tracked:**
- Roof leaks
- HVAC issues
- Plumbing issues
- Electrical issues
- Mold/moisture history
- Deferred maintenance
- Inspection deficiencies
- Code compliance issues

### 7. Hazard/Location Analysis

**Module:** `hazards.js`

**What it does:**
- Evaluates natural hazard exposure
- Identifies missing catastrophe coverage
- Assesses local conditions affecting recovery
- Flags high-risk jurisdictions

**Hazards evaluated:**
- Flood zone exposure
- Coastal/wind risk
- Wildfire exposure
- Storm/hail frequency
- Crime level
- Contractor scarcity
- Litigation environment

### 8. Scenario Engine

**Module:** `scenarios.js`

**What it does:**
- Generates four loss scenarios with financial projections
- Estimates loss amounts, downtime, and uncovered exposure
- Provides plain-English summaries

**Scenarios:**
1. **Major Fire** - 40% property loss, 14-month recovery
2. **Major Water** - 20% property loss, 7-month recovery
3. **Severe Liability** - $5M incident vs policy limits
4. **Partial Shutdown** - 40% room closure, 4-month recovery

### 9. Priority Action Generator

**Module:** `priorities.js`

**What it does:**
- Generates ranked corrective actions
- Assigns urgency levels
- Quantifies estimated impact
- Returns top 3-7 actions

**Urgency levels:**
- `fix_now`: Major financial gap or renewal danger
- `fix_before_renewal`: Important structural weakness
- `monitor_closely`: Material but not immediately catastrophic

### 10. Survivability Score

**Module:** `score.js`

**What it does:**
- Aggregates subscores from all analysis modules
- Produces 0-100 score
- Assigns survivability band

**Component weights:**
- Property adequacy: 30 points
- BI adequacy: 30 points
- Liability adequacy: 15 points
- Deductible manageability: 10 points
- Loss history: 5 points
- Operational risk: 5 points
- Hazard severity: 5 points

**Score bands:**
- 80-100: Strong
- 60-79: Moderate
- 40-59: Weak
- 0-39: Critical

## Design Principles

### 1. Explainable Logic
Every calculation uses deterministic formulas that can be audited and explained to hotel owners.

### 2. Conservative Assumptions
When data is incomplete, the engine uses conservative estimates and documents assumptions.

### 3. Partial Data Mode
The engine works even when critical fields are missing, adjusting confidence levels accordingly.

### 4. Plain-English Output
All findings are written for non-experts, avoiding jargon and focusing on financial consequences.

### 5. Owner-Focused
Outputs map directly to real owner concerns: "Will I run out of money?" "Am I protected?" "What should I fix?"

## Key Assumptions

### Property Valuation
- Default replacement cost: **$350/sq ft** (varies by construction type)
- Average room size proxy: **600 sq ft/room** (when square footage missing)
- Age uplift: **15%** for properties >40 years old without recent renovation

### Recovery Time Estimates
- Major fire: **14 months** (base)
- Major water: **7 months** (base)
- Partial shutdown: **4 months** (base)
- Large property: **+2 months**
- Old property: **+1 month**
- Contractor scarcity: **+3 months**

### Liability Need Ranges
- Base: **$1M - $3M**
- Increments for pool, bar, events, parking, high-litigation jurisdiction

### Critical Fields
**Essential** (required for high confidence):
- Number of rooms
- State
- Annual gross revenue
- Property limit
- Business interruption limit
- Deductible

**Important** (preferred for accurate analysis):
- Square footage
- Year built
- Fixed monthly costs
- Emergency reserves
- Liability limit
- BI restoration period

## Testing

Run the test suite:

```bash
node lib/risk-engine/test.js
```

### Test Fixtures

Six test fixtures cover key scenarios:
1. **Strongly Insured Hotel** - Adequate coverage, high score
2. **Property-Underinsured Hotel** - Major property gap
3. **BI-Shortfall Hotel** - Insufficient BI duration
4. **Repeated-Water-Loss Hotel** - High loss pressure, recurring claims
5. **Partial-Data Hotel** - Missing fields, lower confidence
6. **Critical-Risk Hotel** - Multiple severe issues

All tests validate:
- Output structure completeness
- Score range validity (0-100)
- Appropriate findings generation
- Priority action logic
- Monitoring flag accuracy

## Integration

### With UI Components

```javascript
// In SurvivabilityReportV2.js
import { analyzeHotelRisk } from '../lib/risk-engine';

export default function SurvivabilityReportV2({ data }) {
  const analysis = analyzeHotelRisk(data);
  
  return (
    <div>
      <h1>Survivability Score: {analysis.summary.survivabilityScore}</h1>
      {analysis.findings.headlineFindings.map(finding => (
        <p>{finding}</p>
      ))}
    </div>
  );
}
```

### With API Endpoints

```javascript
// In pages/api/analyze.js
import { analyzeHotelRisk } from '../../lib/risk-engine';

export default function handler(req, res) {
  const input = req.body;
  const analysis = analyzeHotelRisk(input);
  res.status(200).json(analysis);
}
```

## Extending the Engine

### Adding New Analysis Modules

1. Create new module file in `lib/risk-engine/`
2. Export analysis function
3. Import in `index.js` orchestrator
4. Add to analysis flow
5. Update output structure
6. Add test fixture

### Modifying Assumptions

Edit `constants.js` to adjust:
- Replacement cost per square foot
- Recovery time estimates
- Liability need ranges
- Score weights
- Adequacy thresholds

### Adding New Scenarios

Edit `scenarios.js` to add scenario generators following the pattern:
```javascript
function generateNewScenario(hotelProfile, financialProfile, policyProfile) {
  // Calculate loss amount
  // Estimate downtime
  // Calculate covered vs uncovered
  // Generate summary
  
  return {
    title: string,
    estimatedLossAmount: number,
    estimatedDowntimeMonths: number,
    estimatedCoveredMonths: number,
    estimatedUncoveredAmount: number,
    summary: string,
  };
}
```

## Production Considerations

### Performance
- All calculations are synchronous and fast (<100ms for typical inputs)
- No external API calls
- Suitable for real-time dashboard updates

### Accuracy
- Formulas are conservative by design
- Assumptions are documented in output
- Confidence levels reflect data completeness
- Not actuarial precision—practical owner guidance

### Maintenance
- Constants are centralized for easy updates
- Modular structure allows independent module updates
- Test suite validates changes
- JSDoc provides inline documentation

## Future Enhancements

### Potential Additions
1. **Industry Benchmarking** - Compare to similar hotels
2. **Historical Trend Analysis** - Track changes over time
3. **Carrier-Specific Rules** - Adjust for known carrier behaviors
4. **Regional Cost Adjustments** - State/city-specific replacement costs
5. **Advanced Recovery Models** - ML-based recovery time prediction
6. **Real-Time Data Integration** - Live catastrophe feeds, market rates
7. **PDF Report Generation** - Server-side PDF creation from analysis output

### API Integration Points
- **Replacement Cost APIs** - Real-time property valuation
- **Hazard Data APIs** - FEMA flood zones, wildfire maps
- **Carrier Rating APIs** - Financial strength, claim handling reputation
- **Market Data APIs** - Local ADR, occupancy benchmarks

## Philosophy

**Simple on the surface, comprehensive underneath.**

The engine captures everything needed for serious risk analysis but presents it in plain English that hotel owners can understand and act on.

**Financially focused, not technically focused.**

Every output emphasizes dollar exposure, time windows, and business survivability—not abstract risk scores or technical insurance terminology.

**Practical, not actuarial.**

This is not precision underwriting. It's practical guidance to help hotel owners identify material insurance gaps before disaster occurs.
