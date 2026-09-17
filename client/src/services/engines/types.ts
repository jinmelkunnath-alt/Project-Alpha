/**
 * Project Alpha - Modular Decision Intelligence Engine Types
 */

// ==========================================
// 1. FINANCIAL VIABILITY ENGINE TYPES
// ==========================================
export type FinancialScenarioType = 'conservative' | 'expected' | 'optimistic';

export interface FinancialHorizonMonth {
  month: number;
  revenue: number;
  operatingCost: number;
  grossProfit: number;
  netCashFlow: number;
  cumulativeCash: number;
}

export interface FinancialScenarioProjection {
  scenario: FinancialScenarioType;
  label: string;
  monthlyRevenue: number;
  monthlyOperatingCost: number;
  monthlyProfitLoss: number;
  annualRevenue: number;
  annualProfitLoss: number;
  breakEvenMonth: number | null; // null if does not break even in 36m
  roiPercentage: number;
  paybackPeriodMonths: number | null;
  runwayMonths: number;
  projections12m: FinancialHorizonMonth[];
  projections24m: FinancialHorizonMonth[];
  projections36m: FinancialHorizonMonth[];
}

export interface FinancialViabilityModel {
  setupCost: number; // Initial CapEx / Investment
  cashReserves: number;
  unitPrice: number;
  unitVariableCost: number;
  initialUnitsPerMonth: number;
  monthlyGrowthRate: number; // e.g. 0.08 for 8%
  monthlyFixedCost: number;
  scenarios: Record<FinancialScenarioType, FinancialScenarioProjection>;
  currency: string;
  isScenarioEstimate: boolean; // Always true to label as estimate
  lastCalculatedAt: string;
}

// ==========================================
// 2. SENSITIVITY & WHAT-IF ENGINE TYPES
// ==========================================
export interface DecisionVariable {
  id: string;
  name: string;
  category: 'pricing' | 'acquisition' | 'market' | 'cost' | 'operational';
  baselineValue: number;
  currentValue: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  format: 'currency' | 'percentage' | 'number';
  description: string;
}

export interface SensitivityImpactResult {
  variableId: string;
  variableName: string;
  baselineValue: number;
  modifiedValue: number;
  deltaPercentage: number;
  elasticity: number; // % change in score per % change in variable
  impactOnRevenue: number;
  impactOnMargin: number; // in percentage points
  impactOnBreakEvenMonths: number;
  impactOnRiskScore: number;
  impactOnConfidenceScore: number;
}

export interface SensitivityAnalysisModel {
  variables: DecisionVariable[];
  baselineConfidenceScore: number;
  recalculatedConfidenceScore: number;
  baselineVerdict: 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT';
  recalculatedVerdict: 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT';
  mostSensitiveVariable: {
    variableId: string;
    variableName: string;
    sensitivityRank: number;
    swingMagnitude: number; // pts swing per 20% variance
    explanation: string;
  };
  impactResults: SensitivityImpactResult[];
}

// ==========================================
// 3. EVIDENCE PROVENANCE & CONFLICT TYPES
// ==========================================
export type EvidenceStatus =
  | 'VERIFIED'
  | 'AI-DERIVED'
  | 'USER-PROVIDED'
  | 'UNVERIFIED'
  | 'CONTRADICTED';

export interface EvidenceItem {
  id: string;
  source: string;
  sourceTitle: string;
  url?: string;
  publishedDate?: string;
  retrievalDate: string;
  extractedClaim: string;
  status: EvidenceStatus;
  credibilityWeight: number; // 0.0 to 1.0
  verificationNotes?: string;
}

export interface EvidenceConflict {
  id: string;
  parameterName: string;
  status: 'CONFLICT DETECTED' | 'UNRESOLVED' | 'RESOLVED_BY_ALPHA';
  sourceA: {
    source: string;
    claim: string;
    date?: string;
    methodology?: string;
    credibilityScore: number;
  };
  sourceB: {
    source: string;
    claim: string;
    date?: string;
    methodology?: string;
    credibilityScore: number;
  };
  divergenceAnalysis: string;
  resolutionReasoning?: string;
  alphaPreferredSource?: 'A' | 'B' | null;
  uncertaintyPenaltyPoints: number;
}

// ==========================================
// 4. DECISION MEMORY & TIMELINE TYPES
// ==========================================
export type TimelineEventType =
  | 'DECISION_CREATED'
  | 'RESEARCH_COMPLETED'
  | 'RISK_IDENTIFIED'
  | 'DECISION_CONFIRMED'
  | 'MONITORING_ENABLED'
  | 'NEW_EVIDENCE_DETECTED'
  | 'DECISION_REASSESSED'
  | 'KILL_SWITCH_TRIPPED';

export interface TimelineEvent {
  id: string;
  type: TimelineEventType;
  title: string;
  description: string;
  timestamp: string;
  badgeColor?: string;
  metadata?: Record<string, any>;
}

export interface DecisionMemoryRecord {
  decisionId: string;
  title: string;
  originalDecision: string;
  createdAt: string;
  updatedAt: string;
  originalConvictionScore: number;
  currentConvictionScore: number;
  originalVerdict: 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT';
  currentVerdict: 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT';
  assumptions: Array<{ id: string; text: string; status: 'HELD' | 'FAILED' | 'TESTING' }>;
  evidenceCount: number;
  risksCount: number;
  monitoringActive: boolean;
  timeline: TimelineEvent[];
}

// ==========================================
// 5. RE-ANALYSIS TYPES ("RE-RUN ALPHA")
// ==========================================
export interface ReAnalysisDiff {
  timestamp: string;
  originalScore: number;
  currentScore: number;
  changeScore: number;
  originalVerdict: string;
  currentVerdict: string;
  attributionFactors: Array<{
    category: 'NEW_EVIDENCE' | 'ASSUMPTION_WEAKENED' | 'CONTRADICTION' | 'MARKET_SHIFT';
    description: string;
    scoreImpact: number;
  }>;
  executiveSummary: string;
}

// ==========================================
// 6. KILL-SWITCH ENGINE TYPES
// ==========================================
export type KillSwitchSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE';
export type KillSwitchTrigger = 'RE-EVALUATION' | 'PAUSE EXPANSION' | 'IMMEDIATE LIQUIDATION' | 'HEDGE RISK';

export interface KillSwitchRule {
  id: string;
  title: string;
  metric: string;
  condition: string;
  thresholdValue: string | number;
  currentObservedValue: string | number;
  isTripped: boolean;
  severity: KillSwitchSeverity;
  trigger: KillSwitchTrigger;
  recommendedAction: string;
  monitoringLinked: boolean;
}

// ==========================================
// 7. MONITORING IMPACT CHAIN TYPES
// ==========================================
export interface ImpactChainStep {
  stage: 'REAL_WORLD_EVENT' | 'AFFECTED_VARIABLE' | 'MODEL_IMPACT' | 'FINANCIAL_IMPACT' | 'DECISION_IMPACT' | 'RECOMMENDED_ACTION';
  label: string;
  headline: string;
  details: string;
  sentiment: 'negative' | 'positive' | 'warning' | 'neutral';
}

export interface EventImpactChain {
  id: string;
  detectedEventTitle: string;
  timestamp: string;
  source: string;
  chain: ImpactChainStep[];
}

// ==========================================
// 8. DECISION COMPARISON TYPES
// ==========================================
export interface ComparisonOption {
  id: string;
  label: string; // e.g. "OPTION A: Launch Immediately"
  tagline: string;
  setupCost: number;
  annualRevenuePotential: number;
  breakEvenMonths: number;
  riskScore: number; // 0-100 (higher is riskier)
  convictionScore: number; // 0-100
  criticalDependencies: string[];
  sensitivityProfile: string; // e.g. "Highly sensitive to CAC, resilient to price cuts"
  monteCarloOutcomes: {
    p10WorstCase: string;
    p50Expected: string;
    p90BestCase: string;
  };
  strategicTradeoff: string;
}

export interface MultiOptionComparison {
  decisionContext: string;
  options: ComparisonOption[];
  synthesisTradeoffs: string;
}

// ==========================================
// 9. DECISION AUTOPSY TYPES
// ==========================================
export interface AssumptionPostMortem {
  assumption: string;
  status: 'HELD' | 'FAILED' | 'PARTIAL';
  evidenceObserved: string;
  impactOnOutcome: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface DecisionAutopsyRecord {
  decisionId: string;
  originalDecision: string;
  decisionDate: string;
  evaluationDate: string;
  predictedOutcome: string;
  actualOutcome: string;
  varianceCategory: 'EXECUTION_FAILURE' | 'EXTERNAL_SHOCK' | 'UNDERESTIMATED_COMPETITION' | 'OVERPERFORMANCE' | 'ON_TRACK';
  assumptionsEvaluated: AssumptionPostMortem[];
  firstWarningSignal: {
    date: string;
    event: string;
    wasDetectedByMonitoring: boolean;
  };
  whichPredictionFailed: string;
  retrospectiveLessons: string[];
  causalCertaintyDisclaimer: string;
}

// ==========================================
// 10. EXECUTIVE ALPHA BRIEF TYPES
// ==========================================
export interface ExecutiveAlphaBriefData {
  decision: string;
  currentAssessment: {
    verdict: 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT';
    convictionScore: number;
    assessmentStatement: string;
  };
  primaryOpportunity: string;
  primaryWeakness: string;
  criticalDependency: string;
  financialOutlook: {
    setupCost: string;
    twelveMonthROI: string;
    breakEvenHorizon: string;
    runwayStatus: string;
  };
  breakingPoint: string; // Active kill switch condition
  nextAction: string; // 48-hour tactical priority
}
