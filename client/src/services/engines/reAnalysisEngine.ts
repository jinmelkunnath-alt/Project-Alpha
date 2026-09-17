/**
 * Project Alpha - Re-Analysis Engine ("RE-RUN ALPHA")
 * Re-assesses active decisions when new evidence, market shifts, or assumption changes occur.
 * Computes Original vs Current score delta, factor attribution, and preserves state history.
 */

import type { ReAnalysisDiff } from './types';
import {
  getStoredDecisionMemory,
  saveDecisionMemory,
  appendTimelineEvent,
} from './decisionMemoryEngine';

export const SAMPLE_RE_ANALYSIS_DIFF: ReAnalysisDiff = {
  timestamp: new Date().toISOString(),
  originalScore: 78,
  currentScore: 64,
  changeScore: -14,
  originalVerdict: 'GO',
  currentVerdict: 'CONDITIONAL GO',
  attributionFactors: [
    {
      category: 'NEW_EVIDENCE',
      description: 'Competitor announced aggressive 40% enterprise discount in key European pilot markets.',
      scoreImpact: -5,
    },
    {
      category: 'ASSUMPTION_WEAKENED',
      description: 'CAC assumption of ₹3,500/acct compromised by saturated search keywords (+28% CPM inflation).',
      scoreImpact: -4,
    },
    {
      category: 'CONTRADICTION',
      description: 'Detected unresolved evidentiary contradiction regarding EU AI Act enforcement dates.',
      scoreImpact: -3,
    },
    {
      category: 'MARKET_SHIFT',
      description: 'Macro server cluster GPU lead-times stabilized; cloud hosting prices softened slightly.',
      scoreImpact: +2,
    },
    {
      category: 'ASSUMPTION_WEAKENED',
      description: 'Initial customer trial conversion velocity slowed from 4.2% to 3.1% in initial cohort.',
      scoreImpact: -4,
    },
  ],
  executiveSummary:
    'Conviction decreased by -14 points (from 78% to 64%), transitioning the verdict from unconditional GO to CONDITIONAL GO. The primary drag stems from competitor pricing discounting and elevated customer acquisition costs.',
};

/**
 * Executes a simulated or real "RE-RUN ALPHA" cycle against latest signals.
 */
export function executeReRunAlpha(customFactors?: ReAnalysisDiff['attributionFactors']): ReAnalysisDiff {
  const memory = getStoredDecisionMemory();
  const factors = customFactors || SAMPLE_RE_ANALYSIS_DIFF.attributionFactors;

  const totalDelta = factors.reduce((sum, f) => sum + f.scoreImpact, 0);
  const originalScore = memory.originalConvictionScore || 78;
  const currentScore = Math.max(15, Math.min(95, originalScore + totalDelta));

  const diff: ReAnalysisDiff = {
    timestamp: new Date().toISOString(),
    originalScore,
    currentScore,
    changeScore: totalDelta,
    originalVerdict: memory.originalVerdict || 'GO',
    currentVerdict: currentScore >= 75 ? 'GO' : currentScore >= 60 ? 'CONDITIONAL GO' : 'CAUTION',
    attributionFactors: factors,
    executiveSummary: `Re-analysis completed across 14 ground truth signals and 5 updated variables. Net conviction shift: ${
      totalDelta > 0 ? `+${totalDelta}` : totalDelta
    } pts (${originalScore}% → ${currentScore}%).`,
  };

  // Update memory and append to timeline
  memory.currentConvictionScore = currentScore;
  memory.currentVerdict = diff.currentVerdict as any;
  memory.updatedAt = new Date().toISOString();
  saveDecisionMemory(memory);

  appendTimelineEvent(
    'DECISION_REASSESSED',
    'RE-RUN ALPHA Completed',
    `Conviction updated from ${originalScore}% to ${currentScore}% (${diff.changeScore > 0 ? `+${diff.changeScore}` : diff.changeScore} pts).`,
    totalDelta < 0 ? 'amber' : 'emerald'
  );

  return diff;
}
