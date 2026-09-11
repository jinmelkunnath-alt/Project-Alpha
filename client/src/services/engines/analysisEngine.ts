// Analysis engine — orchestrates the staged sequence using the domain engines.
// Pure, UI-agnostic. The UI only depends on the callback data shapes below,
// so swapping these for real AI/API calls later requires no UI changes.

import { ANALYSIS_STAGES, type IntelligenceSummary, type ResearchStatus } from '../../data/analysisStages';
import { evidenceEngine } from './evidenceEngine';
import { riskEngine } from './riskEngine';
import { researchEngine } from './researchEngine';
import { predictionEngine } from './predictionEngine';
import { debateEngine } from './debateEngine';
import { verificationEngine } from './verificationEngine';

export const STAGE_DELAY_MS = 450; // 20 stages => ~9s total (snappy for demos)
export const STAGE_COUNT = ANALYSIS_STAGES.length;

export interface StageOutcome {
  bullets: string[];
  metric?: Partial<IntelligenceSummary>;
}

function computeStage(index: number): StageOutcome {
  const stage = ANALYSIS_STAGES[index];
  switch (stage.id) {
    case 'init-decision':
      return { bullets: ['Decision Engine initialized', 'Workspace scoped', 'Context loaded'] };
    case 'parse-context':
      return { bullets: ['Decision objective identified', 'Constraints extracted', 'Success criteria identified'] };
    case 'extract-assumptions':
      return { bullets: ['3 assumptions detected', '4 high-impact assumptions', '2 conflicting assumptions'], metric: { assumptions: 7 } };
    case 'init-evidence':
      return { bullets: evidenceEngine.initialize().bullets };
    case 'collect-evidence': {
      const r = evidenceEngine.collect();
      return { bullets: r.bullets, metric: { evidence: r.evidence } };
    }
    case 'init-risk':
      return { bullets: riskEngine.initialize().bullets };
    case 'identify-risks': {
      const r = riskEngine.identify();
      return { bullets: r.bullets, metric: { risks: r.risks } };
    }
    case 'market-research': {
      const r = researchEngine.market();
      return { bullets: r.bullets, metric: { researchStatus: r.researchStatus as ResearchStatus } };
    }
    case 'competitive': {
      const r = researchEngine.competitive();
      return { bullets: r.bullets, metric: { researchStatus: r.researchStatus as ResearchStatus } };
    }
    case 'future-2026':
    case 'future-2027':
    case 'future-2028':
    case 'future-2029':
    case 'future-2030': {
      const year = Number(stage.id.split('-')[1]);
      return {
        bullets: predictionEngine.future(year).bullets,
        metric: stage.id === 'future-2030' ? { scenarios: 5, yearsAnalyzed: '2026–2030', confidence: 72 } : undefined,
      };
    }
    case 'adversarial':
      return { bullets: debateEngine.construct().bullets };
    case 'cross-check':
      return { bullets: verificationEngine.crossCheck().bullets };
    case 're-evaluate':
      return { bullets: verificationEngine.reEvaluate().bullets };
    case 'probability': {
      const r = predictionEngine.probability();
      return { bullets: r.bullets, metric: { confidence: r.confidence } };
    }
    case 'final-verify':
      return { bullets: verificationEngine.final().bullets };
    case 'synthesize':
      return { bullets: ['Outcome synthesized', 'Verdict prepared'] };
    default:
      return { bullets: [stage.title] };
  }
}

export interface RunOptions {
  onStage: (index: number, outcome: StageOutcome) => void;
  onElapsed?: (ms: number) => void;
  isCancelled?: () => boolean;
}

export function runAnalysis(opts: RunOptions): Promise<void> {
  const start = Date.now();
  const timer = setInterval(() => opts.onElapsed?.(Date.now() - start), 200);
  return new Promise<void>((resolve) => {
    (async () => {
      try {
        for (let i = 0; i < ANALYSIS_STAGES.length; i++) {
          if (opts.isCancelled?.()) break;
          opts.onStage(i, computeStage(i));
          await new Promise((r) => setTimeout(r, STAGE_DELAY_MS));
        }
      } finally {
        clearInterval(timer);
        opts.onElapsed?.(Date.now() - start);
        resolve();
      }
    })();
  });
}
