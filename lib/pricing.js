/**
 * Hotel Risk Pro — per-property pricing (no tiers by feature, no per-user).
 * Volume discounts by property count only.
 */

export const DEFAULT_AVG_REVENUE_PER_PROPERTY = 3_000_000;

/** @param {number} propertyCount */
export function getPricePerProperty(propertyCount) {
  const n = Math.max(0, Math.floor(Number(propertyCount)) || 0);
  if (n >= 20) return 99;
  if (n >= 10) return 149;
  return 199;
}

/** @param {number} propertyCount */
export function getTotalMonthlyCost(propertyCount) {
  const n = Math.max(0, Math.floor(Number(propertyCount)) || 0);
  return n * getPricePerProperty(n);
}

/**
 * @param {{ annualRevenue: number, riskExposurePercent?: number, recoveryRate?: number }} p
 * @returns {{ totalRisk: number, recoverable: number }}
 */
export function estimateSavings({
  annualRevenue,
  riskExposurePercent = 0.02,
  recoveryRate = 0.25,
}) {
  const rev = Math.max(0, Number(annualRevenue) || 0);
  const totalRisk = rev * riskExposurePercent;
  const recoverable = totalRisk * recoveryRate;
  return {
    totalRisk,
    recoverable,
  };
}

/**
 * Portfolio revenue for messaging: avg revenue × property count.
 * @param {number} propertyCount
 * @param {number} [avgRevenuePerProperty]
 */
export function getPortfolioAnnualRevenue(
  propertyCount,
  avgRevenuePerProperty = DEFAULT_AVG_REVENUE_PER_PROPERTY
) {
  const n = Math.max(0, Math.floor(Number(propertyCount)) || 0);
  const avg = Math.max(0, Number(avgRevenuePerProperty) || DEFAULT_AVG_REVENUE_PER_PROPERTY);
  return n * avg;
}

/**
 * Annual subscription when paying yearly (10 months billed — 2 months free).
 * @param {number} monthlyTotal
 */
export function getAnnualPlanTotal(monthlyTotal) {
  return monthlyTotal * 10;
}

/**
 * Effective monthly when on annual plan.
 * @param {number} monthlyTotal
 */
export function getEffectiveMonthlyAnnualPlan(monthlyTotal) {
  return getAnnualPlanTotal(monthlyTotal) / 12;
}

/**
 * @param {number} propertyCount
 * @returns {'standard' | 'portfolio' | 'enterprise'}
 */
export function getPricingTier(propertyCount) {
  const n = Math.max(0, Math.floor(Number(propertyCount)) || 0);
  if (n >= 20) return "enterprise";
  if (n >= 10) return "portfolio";
  return "standard";
}

export function formatUsd(n) {
  const x = Math.round(Number(n) || 0);
  return "$" + x.toLocaleString("en-US");
}
