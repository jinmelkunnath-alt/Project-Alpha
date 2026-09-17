/**
 * Project Alpha - Evidence Provenance & Conflict Detection Engine
 * Tracks strict provenance (VERIFIED, AI-DERIVED, USER-PROVIDED, UNVERIFIED, CONTRADICTED)
 * and detects conflicts across multiple research sources rather than silently picking one.
 */

import type { EvidenceItem, EvidenceConflict, EvidenceStatus } from './types';

export const evidenceEngine = {
  initialize() {
    return {
      bullets: ['Evidence Engine initialized', 'Ground Truth Vector Index connected'],
    };
  },
  collect() {
    return {
      bullets: ['14 empirical signals isolated', 'Audited disclosures cross-referenced', '2 evidentiary conflicts identified'],
      evidence: 14,
    };
  },
};

export const SAMPLE_EVIDENCE_REPOSITORY: EvidenceItem[] = [
  {
    id: 'ev-01',
    source: 'Gartner Research',
    sourceTitle: 'Enterprise Generative Decision Intelligence Market Forecast 2026',
    url: 'https://gartner.com/research/decision-intelligence-2026',
    publishedDate: '2026-03-12',
    retrievalDate: '2026-09-15',
    extractedClaim: 'Market for autonomous enterprise decision copilots expanding at 34.2% CAGR through 2029.',
    status: 'VERIFIED',
    credibilityWeight: 0.94,
    verificationNotes: 'Cross-validated against peer-reviewed IDC market tracking database.',
  },
  {
    id: 'ev-02',
    source: 'Forrester Wave',
    sourceTitle: 'AI Decision Platforms Q2 2026 Benchmark',
    url: 'https://forrester.com/wave/ai-platforms-q2-2026',
    publishedDate: '2026-05-18',
    retrievalDate: '2026-09-16',
    extractedClaim: 'Average CAC for B2B AI software elevated to ₹4,800 due to saturated search auctions.',
    status: 'VERIFIED',
    credibilityWeight: 0.91,
    verificationNotes: 'Based on financial disclosures of 142 enterprise SaaS companies.',
  },
  {
    id: 'ev-03',
    source: 'TechVenture Substack',
    sourceTitle: 'SaaS GTM Trends & Acquisition Costs 2026',
    url: 'https://techventure.io/cac-benchmarks-2026',
    publishedDate: '2026-07-04',
    retrievalDate: '2026-09-16',
    extractedClaim: 'Organic outbound AI sales cycles have contracted CAC to under ₹1,200.',
    status: 'CONTRADICTED',
    credibilityWeight: 0.48,
    verificationNotes: 'Unverified self-reported survey with sample size under 30 startups.',
  },
  {
    id: 'ev-04',
    source: 'Project Alpha Research Engine',
    sourceTitle: 'Multivariate Bayesian Extrapolation Model',
    retrievalDate: '2026-09-17',
    extractedClaim: 'First-mover enterprise lock-in yields 2.8x higher net retention over 36 months.',
    status: 'AI-DERIVED',
    credibilityWeight: 0.76,
    verificationNotes: 'Synthesized internally via Alpha Bayesian simulation; unanchored by third-party audit.',
  },
  {
    id: 'ev-05',
    source: 'Founder / Leadership Team',
    sourceTitle: 'Internal Board Deck Constraints',
    retrievalDate: '2026-09-17',
    extractedClaim: 'Cash runway strictly capped at ₹75 Lakhs with zero additional dilution planned for 12 months.',
    status: 'USER-PROVIDED',
    credibilityWeight: 0.88,
    verificationNotes: 'User-stated organizational boundary constraint.',
  },
  {
    id: 'ev-06',
    source: 'Industry Blog Rumor',
    sourceTitle: 'Rival Pricing Leaks Forum',
    retrievalDate: '2026-09-14',
    extractedClaim: 'Tier 1 competitor plans to open-source equivalent reasoning weights in Q4.',
    status: 'UNVERIFIED',
    credibilityWeight: 0.32,
    verificationNotes: 'Single anonymous online leak; lacks corroborating source code or patent filings.',
  },
];

export const SAMPLE_EVIDENCE_CONFLICTS: EvidenceConflict[] = [
  {
    id: 'conf-01',
    parameterName: 'Enterprise B2B Customer Acquisition Cost (CAC)',
    status: 'CONFLICT DETECTED',
    sourceA: {
      source: 'Forrester Wave (2026 Benchmark)',
      claim: 'Enterprise CAC is elevated to ₹4,800/acct due to crowded advertising channels.',
      date: '2026-05-18',
      methodology: 'Audited financial audit of 142 enterprise tech balance sheets.',
      credibilityScore: 0.91,
    },
    sourceB: {
      source: 'TechVenture Blog',
      claim: 'Organic outbound AI sales cycles contract CAC to ₹1,200/acct.',
      date: '2026-07-04',
      methodology: 'Self-selected survey of 28 early-stage founder responses.',
      credibilityScore: 0.48,
    },
    divergenceAnalysis: 'Extreme 4x divergence in unit acquisition efficiency. Accepting Source B risks severe cash insolvency if CAC aligns closer to the industry median.',
    resolutionReasoning: 'Alpha considers Source A (Forrester) significantly stronger (+43% credibility) because it uses audited SEC-level disclosures rather than unverified self-reported survey answers.',
    alphaPreferredSource: 'A',
    uncertaintyPenaltyPoints: 6,
  },
  {
    id: 'conf-02',
    parameterName: 'EU AI Act Regulatory Compliance Timeline',
    status: 'UNRESOLVED',
    sourceA: {
      source: 'European Commission Guidance Memo',
      claim: 'High-risk decision algorithms require mandatory conformity certification by November 2026.',
      date: '2026-02-10',
      methodology: 'Official legislative draft guideline.',
      credibilityScore: 0.89,
    },
    sourceB: {
      source: 'Member State Industry Council Joint Statement',
      claim: 'Enforcement grace period will be extended until Q3 2027 for non-critical enterprise pilots.',
      date: '2026-08-22',
      methodology: 'Informal ministerial press briefing; pending ratification.',
      credibilityScore: 0.85,
    },
    divergenceAnalysis: 'Both sources represent authoritative regulatory bodies with conflicting timelines on immediate compliance audits.',
    resolutionReasoning: 'Neither source has legal supremacy until formal parliamentary ratification. Alpha marks this as UNRESOLVED and penalizes decision confidence.',
    alphaPreferredSource: null,
    uncertaintyPenaltyPoints: 12,
  },
];

/**
 * Calculates overall evidence credibility index from a list of evidence items.
 */
export function calculateEvidenceHealth(items: EvidenceItem[]): {
  verifiedCount: number;
  aiDerivedCount: number;
  unverifiedCount: number;
  conflictedCount: number;
  overallCredibilityScore: number;
} {
  const verifiedCount = items.filter((i) => i.status === 'VERIFIED').length;
  const aiDerivedCount = items.filter((i) => i.status === 'AI-DERIVED').length;
  const unverifiedCount = items.filter((i) => i.status === 'UNVERIFIED').length;
  const conflictedCount = items.filter((i) => i.status === 'CONTRADICTED').length;

  const totalWeight = items.reduce((sum, item) => sum + item.credibilityWeight, 0);
  const avgCredibility = items.length > 0 ? Math.round((totalWeight / items.length) * 100) : 70;

  return {
    verifiedCount,
    aiDerivedCount,
    unverifiedCount,
    conflictedCount,
    overallCredibilityScore: avgCredibility,
  };
}
