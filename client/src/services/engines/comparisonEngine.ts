/**
 * Project Alpha - Decision Comparison Engine
 * Evaluates multiple strategic pathways (Option A, Option B, Option C) across Cost,
 * Revenue Potential, Risk, Break-Even, Dependencies, Sensitivity, and Scenario Outcomes.
 * Synthesizes objective trade-offs without declaring a simplistic single "winner".
 */

import type { MultiOptionComparison, ComparisonOption } from './types';

export const SAMPLE_MULTI_OPTION_COMPARISON: MultiOptionComparison = {
  decisionContext: 'Enterprise AI Decision Intelligence Expansion Strategy for Q4',
  options: [
    {
      id: 'opt-a',
      label: 'OPTION A: Launch Immediately',
      tagline: 'Aggressive First-Mover Deployment',
      setupCost: 2500000, // ₹25L
      annualRevenuePotential: 4800000, // ₹48L
      breakEvenMonths: 9,
      riskScore: 68,
      convictionScore: 74,
      criticalDependencies: [
        'Unconstrained cloud GPU cluster access',
        'Direct founder-led enterprise sales closing',
        'Stability of initial unoptimized vector inference stack',
      ],
      sensitivityProfile: 'Extreme sensitivity to CAC and ad keyword auctions. 25% CAC spike delays break-even by 7 months.',
      monteCarloOutcomes: {
        p10WorstCase: '-₹14.2L (Early churn & ad exhaustion)',
        p50Expected: '+₹18.5L Net Operating Margin',
        p90BestCase: '+₹52.0L (Viral enterprise category lock-in)',
      },
      strategicTradeoff:
        'Maximizes market territory capture and investor momentum, but subjects balance sheet to severe early cash burn if sales qualification conversion falls below 3.5%.',
    },
    {
      id: 'opt-b',
      label: 'OPTION B: Launch After Pilot',
      tagline: 'De-risked 90-Day Enterprise Sandbox',
      setupCost: 1100000, // ₹11L
      annualRevenuePotential: 3400000, // ₹34L
      breakEvenMonths: 6,
      riskScore: 34,
      convictionScore: 86,
      criticalDependencies: [
        'Securing 3 design partners with formal LOIs',
        'Weekly telemetry feedback loops with enterprise pilot buyers',
      ],
      sensitivityProfile: 'Highly resilient to market volatility. Lower fixed burn buffers against temporary demand slowdowns.',
      monteCarloOutcomes: {
        p10WorstCase: '-₹3.5L (Controlled sandbox burn)',
        p50Expected: '+₹21.0L Net Operating Margin',
        p90BestCase: '+₹38.5L (High-conviction conversion to annual contracts)',
      },
      strategicTradeoff:
        'Superior capital efficiency and highest risk-adjusted conviction (86%), but concedes early organic keyword search prominence to well-funded rivals.',
    },
    {
      id: 'opt-c',
      label: 'OPTION C: Do Not Launch',
      tagline: 'Capital Preservation & Core Moat Deepening',
      setupCost: 150000, // ₹1.5L
      annualRevenuePotential: 0,
      breakEvenMonths: 0,
      riskScore: 22,
      convictionScore: 50,
      criticalDependencies: [
        'Protecting existing balance sheet runway (>24 months)',
        'Iterating foundational proprietary AI reasoning algorithms internally',
      ],
      sensitivityProfile: 'Zero direct market exposure, but 100% exposed to opportunity cost as competitors standardize the category.',
      monteCarloOutcomes: {
        p10WorstCase: '-₹4.2L (R&D infrastructure maintenance)',
        p50Expected: '₹0 (Full capital preservation)',
        p90BestCase: 'Preserves ₹75L cash reserves for secondary acquisition',
      },
      strategicTradeoff:
        'Guarantees zero commercial insolvency risk, but locks organization into passive spectator posture during the key foundational window of AI market formation.',
    },
  ],
  synthesisTradeoffs:
    'Trade-off Matrix Analysis: Option A delivers the greatest asymmetric revenue upside (+₹52L P90) but requires absorbing high early volatility. Option B offers the optimum risk-adjusted posture (86% conviction, 6-month break-even) by validating willingness-to-pay before committing capital to scale. Option C eliminates insolvency risk at the expense of permanent category forfeiture.',
};
