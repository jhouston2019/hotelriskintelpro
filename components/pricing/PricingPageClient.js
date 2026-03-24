"use client";

import { useState } from "react";
import {
  DEFAULT_AVG_REVENUE_PER_PROPERTY,
  estimateSavings,
  getAnnualPlanTotal,
  getEffectiveMonthlyAnnualPlan,
  getPortfolioAnnualRevenue,
  getTotalMonthlyCost,
} from "../../lib/pricing";
import BillingToggle from "./BillingToggle";
import CheckoutReinforcement from "./CheckoutReinforcement";
import PricingCalculator from "./PricingCalculator";
import RoiTypicalBlock from "./RoiTypicalBlock";
import ValueComparison from "./ValueComparison";

export default function PricingPageClient() {
  const [propertyCount, setPropertyCount] = useState(1);
  const [avgRevenue, setAvgRevenue] = useState(DEFAULT_AVG_REVENUE_PER_PROPERTY);
  const [billing, setBilling] = useState("monthly");

  const n = Math.max(1, Math.min(500, Math.floor(propertyCount) || 1));
  const monthlyTotal = getTotalMonthlyCost(n);
  const portfolioRevenue = getPortfolioAnnualRevenue(n, avgRevenue);
  const { recoverable } = estimateSavings({ annualRevenue: portfolioRevenue });

  const annualSubscriptionCost =
    billing === "annual"
      ? getAnnualPlanTotal(monthlyTotal)
      : monthlyTotal * 12;

  const monthlyCostDisplay =
    billing === "annual"
      ? getEffectiveMonthlyAnnualPlan(monthlyTotal)
      : monthlyTotal;

  const monthlyEstimatedSavings = recoverable / 12;

  const roiMultiplier =
    annualSubscriptionCost > 0 ? recoverable / annualSubscriptionCost : 0;

  return (
    <div className="space-y-10">
      <PricingCalculator
        propertyCount={propertyCount}
        onPropertyCountChange={setPropertyCount}
        avgRevenuePerProperty={avgRevenue}
        onAvgRevenueChange={setAvgRevenue}
      />

      <BillingToggle
        billing={billing}
        onBillingChange={setBilling}
        monthlyTotal={monthlyTotal}
      />

      <ValueComparison
        portfolioAnnualRevenue={portfolioRevenue}
        annualSubscriptionCost={annualSubscriptionCost}
        roiMultiplier={roiMultiplier}
      />

      <RoiTypicalBlock />

      <CheckoutReinforcement
        monthlyCost={monthlyCostDisplay}
        estimatedMonthlySavings={monthlyEstimatedSavings}
      />
    </div>
  );
}
