/**
 * Project Alpha - Kill-Switch Engine
 * Defines quantitative, measurable tripwires under which an active decision must be
 * paused, re-evaluated, or liquidated. Connects directly to the 24/7 Monitoring radar.
 */

import type { KillSwitchRule, KillSwitchSeverity, KillSwitchTrigger } from './types';

export const SAMPLE_KILL_SWITCH_RULES: KillSwitchRule[] = [
  {
    id: 'ks-01',
    title: 'KILL-SWITCH #01 · CAC Exhaustion Tripwire',
    metric: 'Customer Acquisition Cost (CAC)',
    condition: 'Blended CAC exceeds ₹4,800 for 2 consecutive monthly cohorts.',
    thresholdValue: '₹4,800 / acct',
    currentObservedValue: '₹4,120 / acct',
    isTripped: false,
    severity: 'HIGH',
    trigger: 'RE-EVALUATION',
    recommendedAction: 'Pause digital performance advertising expansion and re-anchor sales efforts to organic partner channels.',
    monitoringLinked: true,
  },
  {
    id: 'ks-02',
    title: 'KILL-SWITCH #02 · Runway Depletion Velocity',
    metric: 'Monthly Net Cash Burn',
    condition: 'Monthly net burn exceeds ₹5.5L without achieving ≥12% MoM customer growth.',
    thresholdValue: '₹5,50,000 / mo',
    currentObservedValue: '₹4,20,000 / mo',
    isTripped: false,
    severity: 'CRITICAL',
    trigger: 'PAUSE EXPANSION',
    recommendedAction: 'Instantly freeze non-revenue headcount and renegotiate cloud infrastructure tier commits to preserve 18-month runway.',
    monitoringLinked: true,
  },
  {
    id: 'ks-03',
    title: 'KILL-SWITCH #03 · Predatory Price War',
    metric: 'Competitor Equivalent Pricing',
    condition: 'Tier 1 rival drops enterprise pricing by >45% below our unit delivery COGS.',
    thresholdValue: '-45% below COGS',
    currentObservedValue: '-25% promotional discount',
    isTripped: false,
    severity: 'HIGH',
    trigger: 'RE-EVALUATION',
    recommendedAction: 'Reorient enterprise value proposition away from generic model speed toward audited compliance and data residency.',
    monitoringLinked: true,
  },
  {
    id: 'ks-04',
    title: 'KILL-SWITCH #04 · Critical Regulatory Invalidation',
    metric: 'Regulatory Conformity Mandate',
    condition: 'Formal EU AI Act enforcement date mandated with <90 days compliance runway.',
    thresholdValue: '< 90 Days',
    currentObservedValue: '~180 Days pending guidance',
    isTripped: false,
    severity: 'CRITICAL',
    trigger: 'HEDGE RISK',
    recommendedAction: 'Immediately compartmentalize high-risk inference pipeline modules and initiate third-party legal readiness audit.',
    monitoringLinked: true,
  },
];

export function evaluateKillSwitches(rules: KillSwitchRule[] = SAMPLE_KILL_SWITCH_RULES): {
  activeCount: number;
  trippedCount: number;
  criticalCount: number;
  nearestThreshold: KillSwitchRule;
} {
  const tripped = rules.filter((r) => r.isTripped);
  const critical = rules.filter((r) => r.severity === 'CRITICAL');

  return {
    activeCount: rules.length,
    trippedCount: tripped.length,
    criticalCount: critical.length,
    nearestThreshold: rules[0],
  };
}
