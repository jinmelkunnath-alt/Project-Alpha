/**
 * Project Alpha - Financial Viability Engine
 * Performs mathematical financial calculations: CapEx, OpEx, Break-Even, Runway, ROI,
 * Payback Period, and multi-horizon (12m/24m/36m) projections across 3 scenario models.
 */

import type {
  FinancialViabilityModel,
  FinancialScenarioProjection,
  FinancialHorizonMonth,
  FinancialScenarioType,
} from './types';

export interface FinancialInputParams {
  setupCost: number; // CapEx
  cashReserves: number;
  monthlyFixedCost: number; // Fixed OpEx (rent, base salaries, server infrastructure)
  unitPrice: number; // Revenue per unit or customer MRR
  unitVariableCost: number; // COGS / variable hosting / delivery per unit
  initialUnitsPerMonth: number; // Starting volume
  monthlyGrowthRate: number; // Monthly compound growth rate (e.g. 0.07 for 7%)
  currency?: string;
}

/**
 * Generates month-by-month trajectory for 36 months based on growth, price, variable cost, and fixed cost.
 */
function calculateMonthlyTrajectory(
  horizonMonths: number,
  setupCost: number,
  cashReserves: number,
  monthlyFixedCost: number,
  unitPrice: number,
  unitVariableCost: number,
  initialUnits: number,
  growthRate: number
): { months: FinancialHorizonMonth[]; breakEvenMonth: number | null; paybackMonth: number | null } {
  const months: FinancialHorizonMonth[] = [];
  let cumulativeCash = cashReserves - setupCost;
  let cumulativeGrossProfit = 0;
  let breakEvenMonth: number | null = null;
  let paybackMonth: number | null = null;

  for (let m = 1; m <= horizonMonths; m++) {
    // Compound monthly unit growth with slight natural curve
    const units = Math.round(initialUnits * Math.pow(1 + growthRate, m - 1));
    const revenue = Math.round(units * unitPrice);
    const variableCost = Math.round(units * unitVariableCost);
    const operatingCost = Math.round(monthlyFixedCost + variableCost);
    const grossProfit = Math.round(revenue - operatingCost);
    const netCashFlow = grossProfit;

    cumulativeCash += netCashFlow;
    cumulativeGrossProfit += grossProfit;

    // Break-even month is when monthly operating profit first becomes consistently non-negative
    if (breakEvenMonth === null && grossProfit >= 0) {
      breakEvenMonth = m;
    }

    // Payback period is when cumulative net profit recoups initial setupCost
    if (paybackMonth === null && cumulativeGrossProfit >= setupCost) {
      paybackMonth = m;
    }

    months.push({
      month: m,
      revenue,
      operatingCost,
      grossProfit,
      netCashFlow,
      cumulativeCash,
    });
  }

  return { months, breakEvenMonth, paybackMonth };
}

/**
 * Computes scenario projection for a given scenario multiplier
 */
function buildScenarioProjection(
  scenario: FinancialScenarioType,
  label: string,
  params: FinancialInputParams,
  multiplier: { growthMult: number; priceMult: number; costMult: number }
): FinancialScenarioProjection {
  const effectiveGrowth = params.monthlyGrowthRate * multiplier.growthMult;
  const effectivePrice = params.unitPrice * multiplier.priceMult;
  const effectiveFixedCost = params.monthlyFixedCost * multiplier.costMult;
  const effectiveVarCost = params.unitVariableCost * multiplier.costMult;

  // 36 months full trajectory
  const { months: trajectory36, breakEvenMonth, paybackMonth } = calculateMonthlyTrajectory(
    36,
    params.setupCost,
    params.cashReserves,
    effectiveFixedCost,
    effectivePrice,
    effectiveVarCost,
    params.initialUnitsPerMonth,
    effectiveGrowth
  );

  const trajectory12 = trajectory36.slice(0, 12);
  const trajectory24 = trajectory36.slice(0, 24);

  // Month 1 baseline
  const m1 = trajectory36[0] || { revenue: 0, operatingCost: effectiveFixedCost, grossProfit: -effectiveFixedCost };
  const monthlyRevenue = m1.revenue;
  const monthlyOperatingCost = m1.operatingCost;
  const monthlyProfitLoss = m1.grossProfit;

  // Annual (sum of first 12 months)
  const annualRevenue = trajectory12.reduce((acc, curr) => acc + curr.revenue, 0);
  const annualProfitLoss = trajectory12.reduce((acc, curr) => acc + curr.grossProfit, 0);

  // ROI over 36 months = (Cumulative Net Profit / Setup Cost) * 100
  const netProfit36 = trajectory36.reduce((acc, curr) => acc + curr.grossProfit, 0);
  const roiPercentage = params.setupCost > 0
    ? Math.round(((netProfit36 - params.setupCost) / params.setupCost) * 100)
    : 0;

  // Runway in months: If net profit is negative, cashReserves / abs(monthlyProfitLoss)
  let runwayMonths = 999;
  if (monthlyProfitLoss < 0) {
    const burn = Math.abs(monthlyProfitLoss);
    runwayMonths = burn > 0 ? Math.max(1, Math.floor((params.cashReserves - params.setupCost) / burn)) : 999;
  } else {
    runwayMonths = 999; // Self-sustaining
  }

  return {
    scenario,
    label,
    monthlyRevenue,
    monthlyOperatingCost,
    monthlyProfitLoss,
    annualRevenue,
    annualProfitLoss,
    breakEvenMonth,
    roiPercentage,
    paybackPeriodMonths: paybackMonth,
    runwayMonths,
    projections12m: trajectory12,
    projections24m: trajectory24,
    projections36m: trajectory36,
  };
}

/**
 * Builds the complete Financial Viability Model with Expected, Optimistic, and Conservative scenarios.
 */
export function buildFinancialViabilityModel(
  customParams?: Partial<FinancialInputParams>
): FinancialViabilityModel {
  // Executive default parameters calibrated for standard tech / expansion decision
  const params: FinancialInputParams = {
    setupCost: 2500000, // ₹25 Lakhs / $30k setup cost
    cashReserves: 7500000, // ₹75 Lakhs cash on hand
    monthlyFixedCost: 420000, // ₹4.2 Lakhs / mo fixed overhead
    unitPrice: 4800, // ₹4,800 unit price / subscription
    unitVariableCost: 650, // ₹650 marginal delivery cost
    initialUnitsPerMonth: 85, // 85 starting monthly customers
    monthlyGrowthRate: 0.08, // 8% monthly growth
    currency: '₹',
    ...customParams,
  };

  // 1. Conservative: Slower growth (0.6x), higher costs (+15%), slightly discounted pricing (-10%)
  const conservative = buildScenarioProjection('conservative', 'Conservative (Pessimistic Stress)', params, {
    growthMult: 0.55,
    priceMult: 0.90,
    costMult: 1.18,
  });

  // 2. Expected: Baseline median assumptions
  const expected = buildScenarioProjection('expected', 'Expected (Base Case Strategy)', params, {
    growthMult: 1.0,
    priceMult: 1.0,
    costMult: 1.0,
  });

  // 3. Optimistic: Strong tailwinds (+35% growth, +10% pricing power, -8% variable cost efficiency)
  const optimistic = buildScenarioProjection('optimistic', 'Optimistic (High Expansion)', params, {
    growthMult: 1.45,
    priceMult: 1.10,
    costMult: 0.92,
  });

  return {
    setupCost: params.setupCost,
    cashReserves: params.cashReserves,
    unitPrice: params.unitPrice,
    unitVariableCost: params.unitVariableCost,
    initialUnitsPerMonth: params.initialUnitsPerMonth,
    monthlyGrowthRate: params.monthlyGrowthRate,
    monthlyFixedCost: params.monthlyFixedCost,
    currency: params.currency || '₹',
    scenarios: {
      conservative,
      expected,
      optimistic,
    },
    isScenarioEstimate: true,
    lastCalculatedAt: new Date().toISOString(),
  };
}

/**
 * Format currency with compact denominations (K, L, Cr)
 */
export function formatFinancialValue(val: number, currency = '₹'): string {
  const isNegative = val < 0;
  const abs = Math.abs(val);

  if (currency === '₹') {
    if (abs >= 10000000) {
      return `${isNegative ? '-' : ''}₹${(abs / 10000000).toFixed(2)} Cr`;
    }
    if (abs >= 100000) {
      return `${isNegative ? '-' : ''}₹${(abs / 100000).toFixed(1)} L`;
    }
    if (abs >= 1000) {
      return `${isNegative ? '-' : ''}₹${(abs / 1000).toFixed(0)}k`;
    }
    return `${isNegative ? '-' : ''}₹${abs}`;
  }

  // Fallback / International USD format
  if (abs >= 1000000) {
    return `${isNegative ? '-' : ''}${(abs / 1000000).toFixed(1)}M`;
  }
  if (abs >= 1000) {
    return `${isNegative ? '-' : ''}${(abs / 1000).toFixed(0)}k`;
  }
  return `${isNegative ? '-' : ''}${abs}`;
}
