/**
 * Project Alpha - Monitoring Impact Chain Engine
 * Transforms raw external intelligence alerts into 6-tier deterministic causality chains:
 * REAL-WORLD EVENT → AFFECTED VARIABLE → MODEL IMPACT → FINANCIAL IMPACT → DECISION IMPACT → RECOMMENDED ACTION
 */

import type { EventImpactChain, ImpactChainStep } from './types';

export const SAMPLE_IMPACT_CHAINS: EventImpactChain[] = [
  {
    id: 'chain-01',
    detectedEventTitle: 'Competitor Launches 40% Cheaper Decision Copilot',
    timestamp: '2026-09-17T11:45:00Z',
    source: 'TechCrunch & Pricing Wire Feed',
    chain: [
      {
        stage: 'REAL_WORLD_EVENT',
        label: 'Real-World Event',
        headline: 'Competitor Launches Cheaper Product',
        details: 'Rival vendor introduces entry-tier subscription at ₹2,500/mo with free migration subsidies.',
        sentiment: 'warning',
      },
      {
        stage: 'AFFECTED_VARIABLE',
        label: 'Affected Variable',
        headline: 'Competitive Pressure Index (+35%)',
        details: 'Buyer willingness-to-pay encounters downward price anchoring across prospective pipeline.',
        sentiment: 'warning',
      },
      {
        stage: 'MODEL_IMPACT',
        label: 'Model Impact',
        headline: 'Expected Market Share / Volume Decelerates',
        details: 'Projected initial cohort adoption velocity reduces from 45 accts/mo to 32 accts/mo.',
        sentiment: 'negative',
      },
      {
        stage: 'FINANCIAL_IMPACT',
        label: 'Financial Impact',
        headline: 'Projected Net Profit & Runway Compress',
        details: 'Annual gross revenue contracts by ₹18.4L; break-even delayed from Month 9 to Month 14.',
        sentiment: 'negative',
      },
      {
        stage: 'DECISION_IMPACT',
        label: 'Decision Impact',
        headline: 'Decision Conviction Decreases (78% → 64%)',
        details: 'Decision posture shifts from unconditional "GO" to "CONDITIONAL GO".',
        sentiment: 'negative',
      },
      {
        stage: 'RECOMMENDED_ACTION',
        label: 'Recommended Action',
        headline: 'Pivot Value Proposition to Verified Moats',
        details: 'Halt price competition; emphasize SOC2 Type II compliance, on-premise vector embeddings, and zero hallucination audits.',
        sentiment: 'positive',
      },
    ],
  },
  {
    id: 'chain-02',
    detectedEventTitle: 'Search Ad Auction Saturation Drives CAC Spike',
    timestamp: '2026-09-17T09:20:00Z',
    source: 'Google Ads & Meta Business API Telemetry',
    chain: [
      {
        stage: 'REAL_WORLD_EVENT',
        label: 'Real-World Event',
        headline: 'Search Auction CPMs Rise 28%',
        details: 'Major enterprise AI players increase bidding on keywords related to decision support.',
        sentiment: 'warning',
      },
      {
        stage: 'AFFECTED_VARIABLE',
        label: 'Affected Variable',
        headline: 'Customer Acquisition Cost (CAC: ₹3.5k → ₹4.8k)',
        details: 'Blended unit acquisition costs climb 37%, eroding first-year unit gross profit.',
        sentiment: 'negative',
      },
      {
        stage: 'MODEL_IMPACT',
        label: 'Model Impact',
        headline: 'Payback Period Expands to 11 Months',
        details: 'LTV/CAC ratio compresses from 4.8x to 2.6x, approaching the caution boundary.',
        sentiment: 'negative',
      },
      {
        stage: 'FINANCIAL_IMPACT',
        label: 'Financial Impact',
        headline: 'Operating Cash Flow Depletes Faster',
        details: 'Monthly cash burn increases by ₹65,000 to maintain required new customer run-rate.',
        sentiment: 'negative',
      },
      {
        stage: 'DECISION_IMPACT',
        label: 'Decision Impact',
        headline: 'Near-Kill Switch Warning Triggered',
        details: 'Current CAC (₹4,120) is within 14% of the Kill-Switch #01 tripwire limit (₹4,800).',
        sentiment: 'warning',
      },
      {
        stage: 'RECOMMENDED_ACTION',
        label: 'Recommended Action',
        headline: 'Reallocate 60% of Ad Spend to Channel Partnerships',
        details: 'Sponsor vertical compliance webinars and co-market with boutique system integrators.',
        sentiment: 'positive',
      },
    ],
  },
];
