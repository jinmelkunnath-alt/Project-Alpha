// Prototype / demo data for the Alpha analysis workspace.
// Clearly mock data so the interface can be fully demonstrated.
// Later milestones replace these with real engine output and Firebase persistence.

export type AssumptionStatus = 'stable' | 'challenged' | 'contradicted';
export type RiskSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type EvidenceKind = 'document' | 'source' | 'upload';

export interface AssumptionItem {
  id: string;
  text: string;
  status: AssumptionStatus;
  supporting: number;
  contradicting: number;
  impact: 'Low' | 'Medium' | 'High';
}

export interface RiskItem {
  id: string;
  title: string;
  severity: RiskSeverity;
  likelihood: string;
  description: string;
}

export interface EvidenceItem {
  id: string;
  name: string;
  kind: EvidenceKind;
  detail: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'decision' | 'assumptions' | 'evidence' | 'risks' | 'outcome';
  title: string;
  lines: { label: string; value: string; tone?: 'default' | 'warn' | 'danger' | 'accent' }[];
}

// ---------------------------------------------------------------------------
// Signals (mock) — used by the Insights panel
// ---------------------------------------------------------------------------
export interface Signals {
  evidenceStrength: number;
  riskExposure: number;
  marketOutlook: 'Positive' | 'Neutral' | 'Negative' | 'Analyzing';
  confidence: number;
}

export const FINAL_SIGNALS: Signals = {
  evidenceStrength: 78,
  riskExposure: 32,
  marketOutlook: 'Positive',
  confidence: 81,
};

// ---------------------------------------------------------------------------
// Analysis pipeline stages (legacy timeline; retained for compatibility)
// ---------------------------------------------------------------------------
export interface StageDef {
  key: string;
  label: string;
  detailKey: string;
  feed: string;
}

export const STAGES: StageDef[] = [
  { key: 'understand', label: 'Understanding decision', detailKey: 'understand', feed: 'Decision parsed' },
  { key: 'evidence', label: 'Extracting evidence', detailKey: 'evidence', feed: 'Evidence extracted' },
  { key: 'assumptions', label: 'Identifying assumptions', detailKey: 'assumptions', feed: 'Assumptions detected' },
  { key: 'risks', label: 'Stress-testing risks', detailKey: 'risks', feed: 'Risk analysis complete' },
  { key: 'market', label: 'Researching market', detailKey: 'market', feed: 'Market research complete' },
  { key: 'forecast', label: 'Forecasting outcomes', detailKey: 'forecast', feed: 'Outcomes forecast' },
  { key: 'verify', label: 'Cross-verifying findings', detailKey: 'verify', feed: 'Findings cross-verified' },
  { key: 'final', label: 'Final assessment', detailKey: 'final', feed: 'Final assessment complete' },
];

export interface StageDetail {
  title: string;
  line: string;
  metrics: [string, string][];
}

export const STAGE_DETAILS: Record<string, StageDetail> = {
  understand: {
    title: 'UNDERSTANDING DECISION',
    line: 'Alpha is parsing the decision, its objectives and constraints…',
    metrics: [['Objectives', '3'], ['Constraints', '5']],
  },
  evidence: {
    title: 'EXTRACTING EVIDENCE',
    line: 'Scanning attached documents and structuring source material…',
    metrics: [['Sources', '7'], ['Structured', '4']],
  },
  assumptions: {
    title: 'IDENTIFYING ASSUMPTIONS',
    line: 'Alpha is examining the decision for hidden assumptions…',
    metrics: [['Detected', '12'], ['High-impact', '4'], ['Conflicting', '2']],
  },
  risks: {
    title: 'STRESS-TESTING RISKS',
    line: 'Modeling failure modes and exposure across scenarios…',
    metrics: [['Risks', '9'], ['Critical', '1']],
  },
  market: {
    title: 'RESEARCHING MARKET',
    line: 'Gathering external market and competitive signals…',
    metrics: [['Signals', '15'], ['Positive', '11']],
  },
  forecast: {
    title: 'FORECASTING OUTCOMES',
    line: 'Simulating outcome trajectories under uncertainty…',
    metrics: [['Scenarios', '6'], ['Viable', '4']],
  },
  verify: {
    title: 'CROSS-VERIFYING FINDINGS',
    line: 'Validating each claim against the evidence base…',
    metrics: [['Checked', '28'], ['Conflicts', '3']],
  },
  final: {
    title: 'FINAL ASSESSMENT',
    line: 'Synthesizing verdict, confidence and monitoring plan…',
    metrics: [['Confidence', '81%'], ['Verdict', 'Proceed']],
  },
};

// Initial visual preset (before Run Analysis): first two done, third active.
export const INITIAL_STAGE_INDEX = 2;

// ---------------------------------------------------------------------------
// "Thinking" / analysis console (simulated high-level system activity)
// This is a DEMO UI layer — observable multi-engine workflow, NOT hidden
// private model reasoning.
// ---------------------------------------------------------------------------
export interface AnalysisStep {
  label: string;
  bullets: string[];
}

export const ANALYSIS_STEPS: AnalysisStep[] = [
  { label: 'Decision Engine initialized', bullets: ['Parsed objectives and constraints', 'Mapped decision scope'] },
  { label: 'Evidence Engine initialized', bullets: ['Loaded 7 documents', 'Indexed 12 sources'] },
  { label: 'Searching relevant evidence', bullets: ['Market scans', 'Competitor teardowns', 'Regulatory briefs'] },
  { label: 'Evaluating market signals', bullets: ['Demand trend: upward', 'Competition: elevated'] },
  { label: 'Identifying assumptions', bullets: ['12 assumptions mapped', '4 high-impact', '2 conflicting'] },
  { label: 'Stress-testing risks', bullets: ['9 risks modeled', '1 critical scenario', 'Margin compression'] },
  { label: 'Comparing opposing arguments', bullets: ['Build vs buy', 'Organic vs paid growth'] },
  { label: 'Verifying evidence', bullets: ['Cross-checked claims', 'Resolved 3 conflicts'] },
  { label: 'Calculating confidence', bullets: ['Weighted signal model', 'Calibrated to priors'] },
  { label: 'Re-verifying critical findings', bullets: ['Re-ran top risks', 'Confirmed verdict stability'] },
  { label: 'Generating decision outcome', bullets: ['Synthesized recommendation', 'Prepared monitoring plan'] },
];

export const THINKING_STEPS: string[] = ANALYSIS_STEPS.map((s) => s.label);

export type SignalState = 'Positive' | 'Neutral' | 'Negative' | 'Analyzing';

export interface IntelligenceMetrics {
  evidence: number;
  risks: number;
  assumptions: number;
  marketSignal: SignalState;
  confidence: number;
}

export const INITIAL_METRICS: IntelligenceMetrics = {
  evidence: 0,
  risks: 0,
  assumptions: 0,
  marketSignal: 'Analyzing',
  confidence: 0,
};

// Deterministic demo metric updates at specific step indices.
export const THINKING_METRIC_UPDATES: Record<number, Partial<IntelligenceMetrics>> = {
  1: { evidence: 6 },
  2: { evidence: 12 },
  3: { marketSignal: 'Positive', confidence: 40 },
  4: { assumptions: 3 },
  5: { risks: 4 },
  6: { assumptions: 5 },
  7: { evidence: 12, confidence: 60 },
  8: { confidence: 78 },
  9: { risks: 7 },
  10: { assumptions: 5, marketSignal: 'Positive', confidence: 78 },
};

// Outcome (demo) shown after the analysis completes.
export const OUTCOME = {
  recommendation: 'PROCEED WITH CAUTION',
  confidence: 78,
  why: [
    'Strong demand tailwind for AI tutoring across metro campuses.',
    'Unit economics improve materially beyond ~50k active users.',
    'Differentiated outcome guarantees create defensible positioning.',
    'Evidence base is broad but leans on syndicated sources.',
  ],
  weakPoints: [
    {
      problem: 'Regulatory shift on student data',
      severity: 'High',
      explanation:
        'New data-protection rules could restrict profiling of minors, requiring re-architected consent flows.',
    },
    {
      problem: 'Incumbent price war',
      severity: 'Critical',
      explanation:
        'Established edtech players may subsidize to defend share, compressing near-term margins.',
    },
    {
      problem: 'Low paid-conversion in tier-2/3 cities',
      severity: 'Medium',
      explanation:
        'Willingness to pay drops outside metro campuses without institutional bundling.',
    },
  ],
  mitigations: [
    'Pilot a consent-first data architecture with legal review before launch.',
    'Compete on outcome guarantees rather than price.',
    'Partner with regional colleges to bundle institutional licenses.',
  ],
};

export const SEED_EVIDENCE: EvidenceItem[] = [
  { id: 'ev-1', name: 'Market scan — India edtech 2026', kind: 'source', detail: 'Syndicated report · 18 pp' },
  { id: 'ev-2', name: 'Competitor teardown — top 5 platforms', kind: 'source', detail: 'Internal analysis' },
  { id: 'ev-3', name: 'Pilot cohort survey (n=240)', kind: 'document', detail: 'Raw responses + summary' },
  { id: 'ev-4', name: 'Regulatory brief — UGC & data', kind: 'document', detail: 'Compliance note' },
];

export const SEED_ASSUMPTIONS: AssumptionItem[] = [
  {
    id: 'a-1',
    text: 'Market demand will continue growing through 2028',
    status: 'challenged',
    supporting: 3,
    contradicting: 1,
    impact: 'High',
  },
  {
    id: 'a-2',
    text: 'Indian college students will pay a recurring subscription',
    status: 'stable',
    supporting: 5,
    contradicting: 0,
    impact: 'High',
  },
  {
    id: 'a-3',
    text: 'AI tutoring outperforms human tutors on pass rates',
    status: 'contradicted',
    supporting: 1,
    contradicting: 2,
    impact: 'Medium',
  },
  {
    id: 'a-4',
    text: 'Distribution via campus partners is low-cost',
    status: 'stable',
    supporting: 4,
    contradicting: 1,
    impact: 'Medium',
  },
  {
    id: 'a-5',
    text: 'Content moderation cost stays under 4% of revenue',
    status: 'challenged',
    supporting: 2,
    contradicting: 2,
    impact: 'Low',
  },
];

export const SEED_RISKS: RiskItem[] = [
  {
    id: 'r-1',
    title: 'Regulatory shift on student data',
    severity: 'High',
    likelihood: 'Possible',
    description: 'New data-protection rules could restrict profiling of minors.',
  },
  {
    id: 'r-2',
    title: 'Incumbent price war',
    severity: 'Critical',
    likelihood: 'Likely',
    description: 'Established players may subsidize to defend share.',
  },
  {
    id: 'r-3',
    title: 'Low paid-conversion in tier-2/3 cities',
    severity: 'Medium',
    likelihood: 'Possible',
    description: 'Willingness to pay drops outside metro campuses.',
  },
  {
    id: 'r-4',
    title: 'Model hallucination in grading',
    severity: 'Medium',
    likelihood: 'Possible',
    description: 'Errors could damage academic trust and retention.',
  },
];

export const GRAPH_NODES: GraphNode[] = [
  {
    id: 'decision',
    label: 'DECISION',
    type: 'decision',
    title: 'Launch AI study platform for Indian college students (2027)',
    lines: [
      { label: 'Status', value: 'Analyzing', tone: 'accent' },
      { label: 'Stages', value: '8 / 8' },
    ],
  },
  {
    id: 'assumptions',
    label: 'ASSUMPTIONS',
    type: 'assumptions',
    title: 'Market demand will continue growing through 2028',
    lines: [
      { label: 'Status', value: '⚠ Challenged', tone: 'warn' },
      { label: 'Supporting evidence', value: '3' },
      { label: 'Contradicting evidence', value: '1' },
      { label: 'Impact', value: 'High', tone: 'accent' },
    ],
  },
  {
    id: 'evidence',
    label: 'EVIDENCE',
    type: 'evidence',
    title: 'Evidence base',
    lines: [
      { label: 'Documents', value: '7' },
      { label: 'Sources', value: '12' },
      { label: 'Strength', value: '78%', tone: 'accent' },
    ],
  },
  {
    id: 'risks',
    label: 'RISKS',
    type: 'risks',
    title: 'Open risk register',
    lines: [
      { label: 'Open', value: '9' },
      { label: 'Critical', value: '1', tone: 'danger' },
      { label: 'Exposure', value: '32%', tone: 'warn' },
    ],
  },
  {
    id: 'outcome',
    label: 'OUTCOME',
    type: 'outcome',
    title: 'Forecast verdict',
    lines: [
      { label: 'Market outlook', value: 'Positive', tone: 'accent' },
      { label: 'Confidence', value: '81%' },
    ],
  },
];
