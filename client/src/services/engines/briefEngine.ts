/**
 * Project Alpha - Executive Alpha Brief Engine
 * Synthesizes a compact, 30-second executive summary covering 8 mission-critical dimensions:
 * DECISION, CURRENT ASSESSMENT, PRIMARY OPPORTUNITY, PRIMARY WEAKNESS, CRITICAL DEPENDENCY,
 * FINANCIAL OUTLOOK, BREAKING POINT, and NEXT ACTION.
 */

import type { ExecutiveAlphaBriefData } from './types';

export const SAMPLE_EXECUTIVE_BRIEF: ExecutiveAlphaBriefData = {
  decision: 'Launch enterprise AI decision copilot in Q4, allocating ₹25L in CapEx and target ₹4.8k subscription.',
  currentAssessment: {
    verdict: 'CONDITIONAL GO',
    convictionScore: 64,
    assessmentStatement: 'Viable expansion path if CAC is contained through partner channels; severe downside if dragged into open-web ad bidding.',
  },
  primaryOpportunity:
    'First-mover category standardization among Tier 2 regional enterprises before legacy ERP suites ship built-in models.',
  primaryWeakness:
    'Saturated performance ad auctions driving customer acquisition cost to ₹4,120 (within 14% of maximum sustainable threshold).',
  criticalDependency:
    'Uninterrupted cloud GPU API token quotas and maintaining customer gross retention above 90% across initial 10 accounts.',
  financialOutlook: {
    setupCost: '₹25.0 Lakhs',
    twelveMonthROI: '+44% ROI (Expected Case)',
    breakEvenHorizon: 'Month 9 (Extended to M14 in Conservative Scenario)',
    runwayStatus: '18 Months from ₹75L cash reserves',
  },
  breakingPoint:
    'Blended CAC exceeds ₹4,800 for 2 consecutive monthly cohorts (Kill-Switch #01).',
  nextAction:
    'Finalize pilot agreements with 3 signed enterprise design partners prior to committing further performance ad budget.',
};

export function buildExecutiveAlphaBrief(custom?: Partial<ExecutiveAlphaBriefData>): ExecutiveAlphaBriefData {
  return {
    ...SAMPLE_EXECUTIVE_BRIEF,
    ...custom,
  };
}
