/**
 * Type definitions for Hotel Risk Pro analysis engine
 * Using JSDoc for type safety in JavaScript
 */

/**
 * @typedef {Object} HotelProfile
 * @property {string} hotelName
 * @property {string} address
 * @property {string} city
 * @property {string} state
 * @property {string} zip
 * @property {number} numberOfRooms
 * @property {number|null} squareFootage
 * @property {number|null} yearBuilt
 * @property {number|null} yearRenovated
 * @property {number|null} numberOfFloors
 * @property {string|null} constructionType
 * @property {string|null} roofType
 * @property {number|null} roofAge
 * @property {string|null} sprinklerStatus
 * @property {string|null} fireAlarmStatus
 * @property {boolean|null} hasPoolSpa
 * @property {boolean|null} hasRestaurantBar
 * @property {boolean|null} hasEventSpace
 * @property {boolean|null} hasParkingStructureOrValet
 */

/**
 * @typedef {Object} FinancialProfile
 * @property {number|null} annualGrossRevenue
 * @property {number|null} roomRevenuePct
 * @property {number|null} foodBeverageRevenuePct
 * @property {number|null} eventRevenuePct
 * @property {number|null} otherRevenuePct
 * @property {number|null} averageOccupancy
 * @property {number|null} adr
 * @property {number|null} revpar
 * @property {number|null} fixedMonthlyOperatingCosts
 * @property {number|null} monthlyPayrollBurden
 * @property {number|null} monthlyDebtService
 * @property {number|null} emergencyCashReserves
 */

/**
 * @typedef {Object} PolicyProfile
 * @property {string|null} carrier
 * @property {string|null} policyPeriodStart
 * @property {string|null} policyPeriodEnd
 * @property {number|null} propertyLimit
 * @property {number|null} businessInterruptionLimit
 * @property {number|null} extraExpenseLimit
 * @property {number|null} liabilityLimit
 * @property {number|null} umbrellaLimit
 * @property {number|null} deductible
 * @property {number|null} biWaitingPeriodDays
 * @property {number|null} biRestorationPeriodMonths
 * @property {number|null} coinsurancePct
 * @property {number|null} ordinanceLawCoverage
 * @property {boolean|null} equipmentBreakdownCoverage
 * @property {number|null} floodCoverage
 * @property {number|null} windCoverage
 * @property {number|null} sewerBackupCoverage
 * @property {string[]} namedExclusions
 * @property {Array<{name: string, limit: number|null}>} sublimits
 * @property {Array<{name: string, limit: number|null}>} scheduledCoverages
 */

/**
 * @typedef {Object} LossRunItem
 * @property {number|null} claimYear
 * @property {string|null} claimDate
 * @property {string|null} claimType
 * @property {string|null} causeOfLoss
 * @property {number|null} amountPaid
 * @property {number|null} reserveAmount
 * @property {string|null} status
 * @property {string|null} propertyAreaAffected
 * @property {string|null} notes
 */

/**
 * @typedef {Object} OperationalRiskProfile
 * @property {string[]} knownMaintenanceIssues
 * @property {boolean|null} priorRoofLeaks
 * @property {boolean|null} hvacIssues
 * @property {boolean|null} plumbingIssues
 * @property {boolean|null} electricalIssues
 * @property {boolean|null} moldMoistureHistory
 * @property {boolean|null} securityIncidents
 * @property {boolean|null} frequentSlipFallIssues
 * @property {boolean|null} crimeConcerns
 * @property {boolean|null} deferredMaintenance
 * @property {boolean|null} inspectionDeficiencies
 * @property {boolean|null} codeComplianceIssues
 * @property {string[]} completedMitigationProjects
 * @property {string[]} unresolvedMitigationNeeds
 */

/**
 * @typedef {Object} HazardProfile
 * @property {string|null} floodZone
 * @property {boolean|null} coastalWindExposure
 * @property {boolean|null} wildfireExposure
 * @property {boolean|null} freezeExposure
 * @property {boolean|null} stormHailExposure
 * @property {string|null} crimeLevel
 * @property {boolean|null} utilityInterruptionRisk
 * @property {boolean|null} contractorScarcity
 * @property {string|null} litigationSensitivity
 */

/**
 * @typedef {Object} ScenarioResult
 * @property {string} title
 * @property {number|null} estimatedLossAmount
 * @property {number|null} estimatedDowntimeMonths
 * @property {number|null} estimatedCoveredMonths
 * @property {number|null} estimatedUncoveredAmount
 * @property {string} summary
 */

/**
 * @typedef {Object} PriorityAction
 * @property {string} title
 * @property {string} urgency
 * @property {string} category
 * @property {string} whyItMatters
 * @property {string} estimatedImpact
 */

/**
 * @typedef {Object} HotelRiskAnalysis
 * @property {Object} completeness
 * @property {number} completeness.percentComplete
 * @property {string} completeness.confidence
 * @property {string[]} completeness.missingCriticalFields
 * @property {string[]} completeness.assumptionsUsed
 * @property {Object} summary
 * @property {number} summary.survivabilityScore
 * @property {string} summary.survivabilityBand
 * @property {number|null} summary.propertyCoverageGap
 * @property {number|null} summary.biMonthsCovered
 * @property {number|null} summary.estimatedRecoveryMonths
 * @property {number|null} summary.estimatedUncoveredExposure
 * @property {Object} findings
 * @property {string[]} findings.headlineFindings
 * @property {string[]} findings.coverageFindings
 * @property {string[]} findings.biFindings
 * @property {string[]} findings.liabilityFindings
 * @property {string[]} findings.lossHistoryFindings
 * @property {string[]} findings.operationalFindings
 * @property {string[]} findings.hazardFindings
 * @property {Object} comparisons
 * @property {Object} lossHistory
 * @property {Object} scenarioAnalysis
 * @property {PriorityAction[]} priorities
 * @property {string} ifNothingChanges
 * @property {Object} monitoringFlags
 */

module.exports = {};
