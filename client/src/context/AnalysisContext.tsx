import { createContext, useContext, useRef, useState, useCallback, type ReactNode } from 'react';
import {
  STAGES,
  INITIAL_STAGE_INDEX,
  FINAL_SIGNALS,
  ANALYSIS_STEPS,
  THINKING_METRIC_UPDATES,
  INITIAL_METRICS,
  type IntelligenceMetrics,
  type Signals,
} from '../data/mock';

export type ResearchStatus = 'idle' | 'running' | 'complete';

export interface ActivityEntry {
  id: string;
  time: string;
  text: string;
}

interface AnalysisContextValue {
  // Thinking presentation layer
  thinkingIndex: number; // -1 idle, 0..N-1 active step, N = all complete
  thinkingComplete: boolean;
  isThinking: boolean;
  metrics: IntelligenceMetrics;
  stepTimes: Record<number, string>;
  // Compatibility fields consumed by existing components
  stageIndex: number;
  isRunning: boolean;
  isComplete: boolean;
  researchStatus: ResearchStatus;
  signals: Signals;
  activity: ActivityEntry[];
  runAnalysis: () => void;
  reset: () => void;
}

const AnalysisContext = createContext<AnalysisContextValue | null>(null);

const STEP_MS = 750; // 11 steps => ~8.5s total (cinematic, not instant)
const N = ANALYSIS_STEPS.length;

function fmtTime(d: Date): string {
  return d.toLocaleTimeString('en-GB', { hour12: false });
}

function uuid(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

function seedActivity(): ActivityEntry[] {
  const base = Date.now();
  const mk = (offsetSec: number, text: string): ActivityEntry => ({
    id: uuid(),
    time: fmtTime(new Date(base - offsetSec * 1000)),
    text,
  });
  return [
    mk(14, 'Evidence Engine initialized'),
    mk(11, 'Document structure analyzed'),
    mk(8, 'Potential assumptions identified'),
    mk(5, 'Market research queued'),
    mk(2, 'Risk analysis initialized'),
  ];
}

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

export function AnalysisProvider({ children }: { children: ReactNode }) {
  // Single source of truth for the run.
  const [thinkingIndex, setThinkingIndex] = useState<number>(-1);
  const [thinkingComplete, setThinkingComplete] = useState(false);
  const [metrics, setMetrics] = useState<IntelligenceMetrics>({ ...INITIAL_METRICS });
  const [stepTimes, setStepTimes] = useState<Record<number, string>>({});
  const [activity, setActivity] = useState<ActivityEntry[]>(seedActivity());
  const runId = useRef(0);

  const pushActivity = useCallback((text: string) => {
    setActivity((prev) => {
      const next = [...prev, { id: uuid(), time: fmtTime(new Date()), text }];
      return next.slice(-14);
    });
  }, []);

  const reset = useCallback(() => {
    runId.current += 1;
    setThinkingIndex(-1);
    setThinkingComplete(false);
    setMetrics({ ...INITIAL_METRICS });
    setStepTimes({});
    setActivity(seedActivity());
  }, []);

  const runAnalysis = useCallback(async () => {
    if (thinkingIndex >= 0 && !thinkingComplete) return; // already running
    const myId = ++runId.current;
    setThinkingIndex(0);
    setThinkingComplete(false);
    setMetrics({ ...INITIAL_METRICS });
    setStepTimes({});
    pushActivity('Analysis run started');

    for (let i = 0; i < N; i++) {
      if (runId.current !== myId) return;
      setThinkingIndex(i);
      setStepTimes((prev) => ({ ...prev, [i]: fmtTime(new Date()) }));
      const update = THINKING_METRIC_UPDATES[i];
      if (update) setMetrics((m) => ({ ...m, ...update }));
      pushActivity(ANALYSIS_STEPS[i].label);
      await delay(STEP_MS);
      if (runId.current !== myId) return;
    }

    if (runId.current !== myId) return;
    setThinkingIndex(N); // none active, all complete
    setThinkingComplete(true);
    pushActivity('Analysis complete.');
  }, [thinkingIndex, thinkingComplete, pushActivity]);

  // Derived compatibility values.
  const isThinking = thinkingIndex >= 0 && !thinkingComplete;
  const stageIndex = thinkingComplete
    ? STAGES.length - 1
    : thinkingIndex < 0
      ? INITIAL_STAGE_INDEX
      : Math.min(STAGES.length - 1, Math.floor((thinkingIndex / N) * STAGES.length));
  const isRunning = isThinking;
  const isComplete = thinkingComplete;
  const researchStatus: ResearchStatus = thinkingComplete
    ? 'complete'
    : isThinking
      ? 'running'
      : 'idle';

  return (
    <AnalysisContext.Provider
      value={{
        thinkingIndex,
        thinkingComplete,
        isThinking,
        metrics,
        stepTimes,
        stageIndex,
        isRunning,
        isComplete,
        researchStatus,
        signals: FINAL_SIGNALS,
        activity,
        runAnalysis,
        reset,
      }}
    >
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis(): AnalysisContextValue {
  const ctx = useContext(AnalysisContext);
  if (!ctx) {
    throw new Error('useAnalysis must be used within an AnalysisProvider');
  }
  return ctx;
}
