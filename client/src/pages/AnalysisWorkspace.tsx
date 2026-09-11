import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { IconAlpha, IconCheck, IconArrowRight } from '../components/icons';
import {
  ANALYSIS_STAGES,
  INITIAL_SUMMARY,
  TRACE_NODES,
  type IntelligenceSummary,
  type TraceNode,
} from '../data/analysisStages';
import { runAnalysis, STAGE_COUNT, type StageOutcome } from '../services/engines/analysisEngine';

const THINKING_PHRASES = [
  'Examining decision structure…',
  'Identifying hidden assumptions…',
  'Searching for contradictory evidence…',
  'Stress-testing the strongest argument…',
  'Comparing competing scenarios…',
  'Re-evaluating confidence…',
  'Synthesizing opposing views…',
];

function nowStamp(): string {
  return new Date().toLocaleTimeString('en-GB', { hour12: false });
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [disp, setDisp] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 500);
      setDisp(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <span>{disp}{suffix}</span>;
}

interface EventResult {
  bullets: string[];
  metric?: Partial<IntelligenceSummary>;
  timestamp: string;
}

function StreamCard({
  title,
  state,
  result,
  thinking,
}: {
  title: string;
  state: 'done' | 'active' | 'pending';
  result?: EventResult;
  thinking?: string;
}) {
  return (
    <li className="relative border-l border-white/[0.08] pl-5 pb-4 last:pb-0">
      <span className="absolute -left-[11px] top-0.5">
        {state === 'done' ? (
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-alpha-accent text-[#04130d]">
            <IconCheck size={13} />
          </span>
        ) : state === 'active' ? (
          <span className="ring-pulse flex h-5 w-5 items-center justify-center rounded-full border border-alpha-accent/60 bg-alpha-accent/15">
            <span className="h-2 w-2 rounded-full bg-alpha-accent" />
          </span>
        ) : (
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-alpha-faint/40">
            <span className="h-1.5 w-1.5 rounded-full bg-alpha-faint/60" />
          </span>
        )}
      </span>

      <div className="py-0.5">
        <div className="flex items-baseline justify-between gap-3">
          <p
            className={`text-sm ${
              state === 'active'
                ? 'font-medium text-alpha-ink'
                : state === 'done'
                  ? 'text-alpha-muted'
                  : 'text-alpha-faint/60'
            }`}
          >
            {title}
          </p>
          {result && <span className="font-mono text-[11px] text-alpha-faint">{result.timestamp}</span>}
        </div>

        {state === 'active' && (
          <p className="mt-1 flex items-center gap-2 text-xs text-alpha-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-alpha-accent pulse-dot" />
            {thinking ?? 'Thinking…'}
          </p>
        )}

        {state === 'done' && result && (
          <ul className="mt-1.5 space-y-0.5">
            {result.bullets.map((b) => (
              <li key={b} className="text-xs text-alpha-muted">
                • {b}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

function DecisionTrace({ current, complete }: { current: number; complete: boolean }) {
  const currentNode: TraceNode | null = complete
    ? 'Outcome'
    : current >= 0
      ? ANALYSIS_STAGES[current].trace
      : null;
  const currentOrder = currentNode ? TRACE_NODES.indexOf(currentNode) : -1;

  return (
    <div className="glass p-5">
      <p className="panel-title mb-3">Decision Trace</p>
      <ul className="space-y-0">
        {TRACE_NODES.map((node, i) => {
          const done = complete || i < currentOrder;
          const active = !complete && i === currentOrder;
          return (
            <li key={node} className="relative flex items-center gap-3 py-1">
              <span
                className={`h-2 w-2 shrink-0 rounded-full ${
                  active ? 'bg-alpha-accent ring-pulse' : done ? 'bg-alpha-accent/70' : 'bg-alpha-faint/40'
                }`}
              />
              <span
                className={`text-xs ${
                  active ? 'font-medium text-alpha-ink' : done ? 'text-alpha-muted' : 'text-alpha-faint/60'
                }`}
              >
                {node}
              </span>
              {i < TRACE_NODES.length - 1 && (
                <span className="absolute left-1 top-4 h-3 w-px bg-white/10" />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function fmtElapsed(ms: number): string {
  const total = Math.floor(ms / 1000);
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

export default function AnalysisWorkspace() {
  const { activeDecision } = useApp();
  const { id } = useParams();
  const navigate = useNavigate();

  const [results, setResults] = useState<Record<number, EventResult>>({});
  const [current, setCurrent] = useState(-1);
  const [elapsed, setElapsed] = useState(0);
  const [summary, setSummary] = useState<IntelligenceSummary>(INITIAL_SUMMARY);
  const [complete, setComplete] = useState(false);
  const [thinkingIdx, setThinkingIdx] = useState(0);
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    runAnalysis({
      onStage: (i, outcome: StageOutcome) => {
        setResults((prev) => ({
          ...prev,
          [i]: { bullets: outcome.bullets, metric: outcome.metric, timestamp: nowStamp() },
        }));
        setCurrent(i);
        if (outcome.metric) setSummary((prev) => ({ ...prev, ...outcome.metric }));
      },
      onElapsed: setElapsed,
      isCancelled: () => cancelled.current,
    }).then(() => {
      if (!cancelled.current) {
        setCurrent(STAGE_COUNT);
        setComplete(true);
      }
    });
    return () => {
      cancelled.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (complete) return;
    const t = setInterval(() => setThinkingIdx((i) => (i + 1) % THINKING_PHRASES.length), 850);
    return () => clearInterval(t);
  }, [complete]);

  if (!activeDecision) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="glass max-w-md p-8 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-alpha-accent to-alpha-accent-2 text-[#04130d] shadow-glow">
            <IconAlpha size={24} />
          </span>
          <h2 className="text-xl font-semibold text-alpha-ink">No active decision</h2>
          <p className="mt-2 text-sm text-alpha-muted">
            Create a decision to open the analysis workspace.
          </p>
          <button onClick={() => navigate('/decision/new')} className="btn-primary mt-5">
            New Decision
          </button>
        </div>
      </div>
    );
  }

  const progress = complete ? 100 : Math.round((Math.max(0, current) / STAGE_COUNT) * 100);
  const currentTitle = complete
    ? 'COMPLETE'
    : current >= 0
      ? ANALYSIS_STAGES[current].title
      : 'STARTING';

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-alpha-accent to-alpha-accent-2 text-[#04130d] shadow-glow">
            <IconAlpha size={20} />
          </span>
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.22em] text-alpha-faint">ALPHA / PROJECT ALPHA</p>
            <p className="text-sm font-semibold text-alpha-ink">ANALYZING DECISION</p>
            <p className="max-w-[60vw] truncate text-sm text-alpha-muted">{activeDecision.title}</p>
          </div>
        </div>
        <div className="text-right">
          <span
            className={`chip ${
              complete ? 'border-alpha-accent/30 text-alpha-accent' : 'border-alpha-warn/30 text-alpha-warn'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                complete ? 'bg-alpha-accent' : 'bg-alpha-warn pulse-dot'
              }`}
            />
            {complete ? 'ANALYSIS COMPLETE' : 'ANALYSIS ACTIVE · LIVE'}
          </span>
          <p className="mt-1 font-mono text-sm text-alpha-ink">{fmtElapsed(elapsed)}</p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* LEFT — decision context + trace */}
        <div className="space-y-5 lg:col-span-3">
          <div className="glass p-5">
            <p className="panel-title">Decision</p>
            <p className="mt-2 text-[15px] font-semibold leading-snug text-alpha-ink">
              {activeDecision.title}
            </p>
            {activeDecision.description && (
              <p className="mt-2 text-sm leading-relaxed text-alpha-muted">{activeDecision.description}</p>
            )}
          </div>
          <DecisionTrace current={current} complete={complete} />
        </div>

        {/* CENTER — progress + activity stream */}
        <div className="space-y-5 lg:col-span-6">
          {complete && (
            <div className="glass p-6 text-center">
              <p className="text-2xl font-semibold tracking-tight text-alpha-ink">✓ ANALYSIS COMPLETE</p>
              <p className="mt-1 text-sm text-alpha-muted">
                Alpha has finished stress-testing this decision.
              </p>
              <div className="mx-auto mt-4 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
                <Stat label="Confidence" value={`${summary.confidence}%`} />
                <Stat label="Evidence evaluated" value={`${summary.evidence}`} />
                <Stat label="Risks identified" value={`${summary.risks}`} />
                <Stat label="Assumptions challenged" value={`${summary.assumptions}`} />
                <Stat label="Scenarios evaluated" value={`${summary.scenarios}`} />
                <Stat label="Years analyzed" value={summary.yearsAnalyzed} />
              </div>
              <button
                onClick={() => navigate(`/decision/${id ?? activeDecision.id}/outcome`)}
                className="btn-primary mx-auto mt-5"
              >
                VIEW OUTCOME <IconArrowRight size={16} />
              </button>
            </div>
          )}

          <div className="glass p-4">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-alpha-faint">
              <span>ANALYSIS</span>
              <span>{progress}%</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
              <div
                className="h-full rounded-full bg-alpha-accent transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-alpha-muted">
              Stage: <span className="text-alpha-ink">{currentTitle}</span>
            </p>
          </div>

          <div className="glass p-5">
            <p className="panel-title mb-3">Activity</p>
            <ul className="space-y-0">
              {ANALYSIS_STAGES.map((stage, i) => {
                const state: 'done' | 'active' | 'pending' =
                  i < current ? 'done' : i === current && !complete ? 'active' : 'pending';
                return (
                  <StreamCard
                    key={stage.id}
                    title={stage.title}
                    state={state}
                    result={results[i]}
                    thinking={state === 'active' ? THINKING_PHRASES[thinkingIdx] : undefined}
                  />
                );
              })}
            </ul>
            {!complete && (
              <p className="mt-4 text-[11px] text-alpha-faint">Simulated processing — demo mode.</p>
            )}
          </div>
        </div>

        {/* RIGHT — Decision Intelligence */}
        <div className="lg:col-span-3">
          <div className="glass p-5">
            <p className="panel-title mb-3">Decision Intelligence</p>
            <div className="space-y-3">
              <Row label="Confidence" value={<AnimatedNumber value={summary.confidence} suffix="%" />} />
              <Row label="Evidence" value={<AnimatedNumber value={summary.evidence} suffix=" signals" />} />
              <Row label="Assumptions" value={<AnimatedNumber value={summary.assumptions} suffix=" detected" />} />
              <Row label="Risks" value={<AnimatedNumber value={summary.risks} suffix=" identified" />} />
              <Row label="Scenarios" value={<AnimatedNumber value={summary.scenarios} suffix=" evaluated" />} />
              <Row label="Years analyzed" value={summary.yearsAnalyzed} />
              <Row
                label="Research"
                value={
                  <span
                    className={
                      summary.researchStatus === 'Complete'
                        ? 'text-alpha-accent'
                        : summary.researchStatus === 'Active'
                          ? 'text-alpha-warn'
                          : 'text-alpha-faint'
                    }
                  >
                    {summary.researchStatus}
                  </span>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between border-b border-alpha-edge pb-2 last:border-0 last:pb-0">
      <span className="text-xs uppercase tracking-wider text-alpha-faint">{label}</span>
      <span className="text-sm font-semibold text-alpha-ink">{value}</span>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-alpha-border bg-white/[0.02] p-3">
      <p className="text-[10px] uppercase tracking-wider text-alpha-faint">{label}</p>
      <p className="mt-0.5 text-lg font-semibold text-alpha-ink">{value}</p>
    </div>
  );
}
