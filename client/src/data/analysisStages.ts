// Analysis stage definitions + aggregate intelligence summary shape.
// Deterministic, demo-only data. Real engines (see services/engines) will
// later replace the data backing these stages without changing the UI.

export type EngineName = 'analysis' | 'evidence' | 'risk' | 'research' | 'prediction';

export type TraceNode =
  | 'Decision'
  | 'Assumptions'
  | 'Evidence'
  | 'Risks'
  | 'Scenarios'
  | 'Debate'
  | 'Verification'
  | 'Outcome';

export const TRACE_NODES: TraceNode[] = [
  'Decision',
  'Assumptions',
  'Evidence',
  'Risks',
  'Scenarios',
  'Debate',
  'Verification',
  'Outcome',
];

export type ResearchStatus = 'Idle' | 'Active' | 'Complete';

export interface IntelligenceSummary {
  confidence: number;
  evidence: number;
  assumptions: number;
  risks: number;
  scenarios: number;
  yearsAnalyzed: string;
  researchStatus: ResearchStatus;
}

export interface StageDef {
  id: string;
  title: string;
  engine: EngineName;
  trace: TraceNode;
}

export const ANALYSIS_STAGES: StageDef[] = [
  { id: 'init-decision', title: 'INITIALIZING DECISION ENGINE', engine: 'analysis', trace: 'Decision' },
  { id: 'parse-context', title: 'PARSING DECISION CONTEXT', engine: 'analysis', trace: 'Decision' },
  { id: 'extract-assumptions', title: 'EXTRACTING ASSUMPTIONS', engine: 'analysis', trace: 'Assumptions' },
  { id: 'init-evidence', title: 'INITIALIZING EVIDENCE ENGINE', engine: 'evidence', trace: 'Evidence' },
  { id: 'collect-evidence', title: 'COLLECTING RELEVANT EVIDENCE', engine: 'evidence', trace: 'Evidence' },
  { id: 'init-risk', title: 'INITIALIZING RISK ENGINE', engine: 'risk', trace: 'Risks' },
  { id: 'identify-risks', title: 'IDENTIFYING RISKS', engine: 'risk', trace: 'Risks' },
  { id: 'market-research', title: 'MARKET RESEARCH', engine: 'research', trace: 'Scenarios' },
  { id: 'competitive', title: 'COMPETITIVE LANDSCAPE', engine: 'research', trace: 'Scenarios' },
  { id: 'future-2026', title: 'FUTURE RELEVANCE — 2026', engine: 'prediction', trace: 'Scenarios' },
  { id: 'future-2027', title: 'FUTURE RELEVANCE — 2027', engine: 'prediction', trace: 'Scenarios' },
  { id: 'future-2028', title: 'FUTURE RELEVANCE — 2028', engine: 'prediction', trace: 'Scenarios' },
  { id: 'future-2029', title: 'FUTURE RELEVANCE — 2029', engine: 'prediction', trace: 'Scenarios' },
  { id: 'future-2030', title: 'FUTURE RELEVANCE — 2030', engine: 'prediction', trace: 'Scenarios' },
  { id: 'adversarial', title: 'ADVERSARIAL DEBATE', engine: 'analysis', trace: 'Debate' },
  { id: 'cross-check', title: 'CROSS-CHECKING CLAIMS', engine: 'analysis', trace: 'Verification' },
  { id: 're-evaluate', title: 'RE-EVALUATING ASSUMPTIONS', engine: 'analysis', trace: 'Verification' },
  { id: 'probability', title: 'PROBABILITY CALCULATION', engine: 'prediction', trace: 'Outcome' },
  { id: 'final-verify', title: 'FINAL VERIFICATION', engine: 'analysis', trace: 'Verification' },
  { id: 'synthesize', title: 'SYNTHESIZING OUTCOME', engine: 'analysis', trace: 'Outcome' },
];

export const INITIAL_SUMMARY: IntelligenceSummary = {
  confidence: 0,
  evidence: 0,
  assumptions: 0,
  risks: 0,
  scenarios: 0,
  yearsAnalyzed: '—',
  researchStatus: 'Idle',
};
