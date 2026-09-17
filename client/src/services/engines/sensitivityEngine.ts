/**
 * Project Alpha - Sensitivity & What-If Engine
 * Allows interactive perturbation of key variables (Price, CAC, Demand, Churn, OpEx, etc.)
 * and recalculates Revenue, Margin, Break-even, Risk, and Confidence Score,
 * automatically identifying the "Most Sensitive Variable".
 */

import type {
  DecisionVariable,
  SensitivityImpactResult,
  SensitivityAnalysisModel,
} from './types';

export const DEFAULT_DECISION_VARIABLES: DecisionVariable[] = [
  {
    id: 'price',
    name: 'Unit Price / Subscription',
    category: 'pricing',
    baselineValue: 4800,
    currentValue: 4800,
    min: 1500,
    max: 12000,
    step: 100,
    unit: '₹',
    format: 'currency',
    description: 'Average realized price per monthly enterprise license',
  },
  {
    id: 'cac',
    name: 'Customer Acquisition Cost (CAC)',
    category: 'acquisition',
    baselineValue: 3500,
    currentValue: 3500,
    min: 500,
    max: 12000,
    step: 250,
    unit: '₹',
    format: 'currency',
    description: 'Blended sales, SDR, and marketing spend per acquired account',
  },
  {
    id: 'demand',
    name: 'Monthly Demand (New Accts)',
    category: 'market',
    baselineValue: 45,
    currentValue: 45,
    min: 5,
    max: 200,
    step: 5,
    unit: 'units',
    format: 'number',
    description: 'Gross new accounts added each month',
  },
  {
    id: 'churn',
    name: 'Monthly Churn Rate',
    category: 'operational',
    baselineValue: 3.5,
    currentValue: 3.5,
    min: 0.5,
    max: 15.0,
    step: 0.5,
    unit: '%',
    format: 'percentage',
    description: 'Monthly logo attrition percentage',
  },
  {
    id: 'opex',
    name: 'Monthly Operating Cost (OpEx)',
    category: 'cost',
    baselineValue: 420000,
    currentValue: 420000,
    min: 150000,
    max: 1200000,
    step: 10000,
    unit: '₹',
    format: 'currency',
    description: 'Fixed engineering, server, and overhead expenses',
  },
  {
    id: 'growth',
    name: 'Market Growth Rate (Annual)',
    category: 'market',
    baselineValue: 18,
    currentValue: 18,
    min: -10,
    max: 60,
    step: 2,
    unit: '%',
    format: 'percentage',
    description: 'Macro category expansion tailwind',
  },
  {
    id: 'conversion',
    name: 'Lead-to-Close Conversion',
    category: 'acquisition',
    baselineValue: 4.2,
    currentValue: 4.2,
    min: 0.5,
    max: 12.0,
    step: 0.1,
    unit: '%',
    format: 'percentage',
    description: 'Sales qualification funnel throughput',
  },
  {
    id: 'competition',
    name: 'Competitive Pressure Index',
    category: 'pricing',
    baselineValue: 50,
    currentValue: 50,
    min: 10,
    max: 100,
    step: 5,
    unit: 'pts',
    format: 'number',
    description: 'Aggressiveness of rival discounting and feature replication',
  },
];

/**
 * Calculates sensitivity model results given a modified set of variables
 */
export function calculateSensitivityModel(
  variables: DecisionVariable[],
  baselineScore = 78
): SensitivityAnalysisModel {
  // Baseline benchmarks
  const varMap = new Map(variables.map((v) => [v.id, v]));

  const price = varMap.get('price')?.currentValue ?? 4800;
  const basePrice = varMap.get('price')?.baselineValue ?? 4800;

  const cac = varMap.get('cac')?.currentValue ?? 3500;
  const baseCac = varMap.get('cac')?.baselineValue ?? 3500;

  const demand = varMap.get('demand')?.currentValue ?? 45;
  const baseDemand = varMap.get('demand')?.baselineValue ?? 45;

  const churn = varMap.get('churn')?.currentValue ?? 3.5;
  const baseChurn = varMap.get('churn')?.baselineValue ?? 3.5;

  const opex = varMap.get('opex')?.currentValue ?? 420000;
  const baseOpex = varMap.get('opex')?.baselineValue ?? 420000;

  const competition = varMap.get('competition')?.currentValue ?? 50;
  const baseComp = varMap.get('competition')?.baselineValue ?? 50;

  // Percentage deviations from baseline
  const priceDeltaRatio = (price - basePrice) / basePrice;
  const cacDeltaRatio = (cac - baseCac) / baseCac;
  const demandDeltaRatio = (demand - baseDemand) / baseDemand;
  const churnDeltaRatio = (churn - baseChurn) / baseChurn;
  const opexDeltaRatio = (opex - baseOpex) / baseOpex;
  const compDeltaRatio = (competition - baseComp) / baseComp;

  // Confidence Score dynamic impact formula
  // Score increases with higher price, higher demand
  // Score decreases with higher CAC, higher churn, higher opex, higher competition
  const deltaPriceImpact = priceDeltaRatio * 22; // Price has strong positive leverage
  const deltaDemandImpact = demandDeltaRatio * 18;
  const deltaCacImpact = -cacDeltaRatio * 20; // CAC has heavy downside leverage
  const deltaChurnImpact = -churnDeltaRatio * 16;
  const deltaOpexImpact = -opexDeltaRatio * 14;
  const deltaCompImpact = -compDeltaRatio * 10;

  const totalDelta = Math.round(
    deltaPriceImpact +
      deltaDemandImpact +
      deltaCacImpact +
      deltaChurnImpact +
      deltaOpexImpact +
      deltaCompImpact
  );

  const recalculatedScore = Math.max(12, Math.min(96, baselineScore + totalDelta));

  // Determine verdicts based on scores
  function scoreToVerdict(score: number): 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT' {
    if (score >= 75) return 'GO';
    if (score >= 60) return 'CONDITIONAL GO';
    if (score >= 42) return 'CAUTION';
    return 'PIVOT';
  }

  // Individual variable impact results and elasticity ranking
  const impactResults: SensitivityImpactResult[] = variables.map((v) => {
    const deltaPct = v.baselineValue !== 0 ? ((v.currentValue - v.baselineValue) / v.baselineValue) * 100 : 0;

    let scoreImp = 0;
    let revImp = 0;
    let marginImp = 0;
    let breakEvenImp = 0;

    switch (v.id) {
      case 'price':
        scoreImp = (deltaPct / 100) * 22;
        revImp = (deltaPct / 100) * 100; // Revenue changes 1:1 with price
        marginImp = (deltaPct / 100) * 12;
        breakEvenImp = -(deltaPct / 100) * 4; // Higher price reduces break-even months
        break;
      case 'cac':
        scoreImp = -(deltaPct / 100) * 20;
        revImp = 0;
        marginImp = -(deltaPct / 100) * 8;
        breakEvenImp = (deltaPct / 100) * 5; // Higher CAC delays payback
        break;
      case 'demand':
        scoreImp = (deltaPct / 100) * 18;
        revImp = (deltaPct / 100) * 95;
        marginImp = (deltaPct / 100) * 4;
        breakEvenImp = -(deltaPct / 100) * 6;
        break;
      case 'churn':
        scoreImp = -(deltaPct / 100) * 16;
        revImp = -(deltaPct / 100) * 15;
        marginImp = -(deltaPct / 100) * 7;
        breakEvenImp = (deltaPct / 100) * 4;
        break;
      case 'opex':
        scoreImp = -(deltaPct / 100) * 14;
        revImp = 0;
        marginImp = -(deltaPct / 100) * 10;
        breakEvenImp = (deltaPct / 100) * 7;
        break;
      case 'competition':
        scoreImp = -(deltaPct / 100) * 10;
        revImp = -(deltaPct / 100) * 12;
        marginImp = -(deltaPct / 100) * 5;
        breakEvenImp = (deltaPct / 100) * 3;
        break;
      default:
        scoreImp = (deltaPct / 100) * 8;
        revImp = (deltaPct / 100) * 5;
        marginImp = (deltaPct / 100) * 2;
        breakEvenImp = -(deltaPct / 100) * 2;
    }

    const elasticity = deltaPct !== 0 ? Math.abs(scoreImp / deltaPct) : 0.2;

    return {
      variableId: v.id,
      variableName: v.name,
      baselineValue: v.baselineValue,
      modifiedValue: v.currentValue,
      deltaPercentage: Math.round(deltaPct * 10) / 10,
      elasticity: Math.round(elasticity * 100) / 100,
      impactOnRevenue: Math.round(revImp * 10) / 10,
      impactOnMargin: Math.round(marginImp * 10) / 10,
      impactOnBreakEvenMonths: Math.round(breakEvenImp * 10) / 10,
      impactOnRiskScore: -Math.round(scoreImp),
      impactOnConfidenceScore: Math.round(scoreImp),
    };
  });

  // Calculate most sensitive variable by elasticity (swing per 20% variance)
  const sortedByElasticity = [...impactResults].sort((a, b) => b.elasticity - a.elasticity);
  const topSensitive = sortedByElasticity[0] || impactResults[0];

  return {
    variables,
    baselineConfidenceScore: baselineScore,
    recalculatedConfidenceScore: recalculatedScore,
    baselineVerdict: scoreToVerdict(baselineScore),
    recalculatedVerdict: scoreToVerdict(recalculatedScore),
    mostSensitiveVariable: {
      variableId: topSensitive.variableId,
      variableName: topSensitive.variableName,
      sensitivityRank: 1,
      swingMagnitude: Math.round(topSensitive.elasticity * 20),
      explanation: `${topSensitive.variableName} has the steepest asymmetric impact (${Math.round(topSensitive.elasticity * 20)} pts score swing per 20% variance). Even modest market shifts here dictate whether this decision remains a 'GO' or collapses into 'PIVOT'.`,
    },
    impactResults,
  };
}
