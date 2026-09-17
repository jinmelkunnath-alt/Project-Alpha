/**
 * Project Alpha - Decision Autopsy Engine
 * Future-ready retrospective evaluation module that compares Original Decision vs Assumptions
 * vs Predicted Outcome vs Actual Outcome, identifying failed assumptions and lessons.
 */

import type { DecisionAutopsyRecord } from './types';

export const SAMPLE_DECISION_AUTOPSY: DecisionAutopsyRecord = {
  decisionId: 'alpha-active-decision-001',
  originalDecision: 'Launch enterprise AI copilot in Q4 with ₹25L setup CapEx and target ₹4.8k subscription pricing.',
  decisionDate: '2026-01-15',
  evaluationDate: '2026-09-17',
  predictedOutcome: 'Achieve ₹48L annual run-rate within 12 months with break-even by Month 9 at 4.2% lead conversion.',
  actualOutcome: 'Achieved ₹29.4L run-rate at Month 8; break-even delayed to Month 14 due to competitor price war.',
  varianceCategory: 'UNDERESTIMATED_COMPETITION',
  assumptionsEvaluated: [
    {
      assumption: 'Competitors would maintain legacy enterprise pricing >₹8,000/mo.',
      status: 'FAILED',
      evidenceObserved: 'Rival vendor introduced an aggressive ₹2,500/mo promotional tier in March 2026.',
      impactOnOutcome: 'HIGH',
    },
    {
      assumption: 'Cloud GPU inference infrastructure unit costs would decrease by 15% annually.',
      status: 'HELD',
      evidenceObserved: 'Inference API pricing declined by 18.2% across major hyperscalers as expected.',
      impactOnOutcome: 'LOW',
    },
    {
      assumption: 'Customer Acquisition Cost (CAC) would remain below ₹3,500/acct via organic search.',
      status: 'FAILED',
      evidenceObserved: 'Search auction CPM inflation escalated blended CAC to ₹4,800/acct by June.',
      impactOnOutcome: 'HIGH',
    },
    {
      assumption: 'Client gross retention would stabilize above 92% post-onboarding.',
      status: 'HELD',
      evidenceObserved: 'Net logo retention stood at 94.1%, confirming high product utility once deployed.',
      impactOnOutcome: 'MEDIUM',
    },
  ],
  firstWarningSignal: {
    date: '2026-03-08',
    event: 'Search ad auction CPC for "AI decision engine" spiked 32% in 48 hours.',
    wasDetectedByMonitoring: true,
  },
  whichPredictionFailed:
    'The linear customer acquisition volume prediction (45 units/mo) failed due to price resistance introduced by rival discounting.',
  retrospectiveLessons: [
    'Lock in long-term enterprise pilot contracts prior to broad public marketing launches.',
    'Anchor pricing against proprietary compliance and audited guarantees rather than speed or general intelligence.',
    'Maintain a dedicated CAC contingency hedge equal to at least 35% of total launch budget.',
  ],
  causalCertaintyDisclaimer:
    'Observational Retrospective Notice: Correlations noted between competitor discounting and slowed acquisition velocity do not establish strict monocausal proof. Macro tech spending pullbacks may represent confounding secondary drivers.',
};
