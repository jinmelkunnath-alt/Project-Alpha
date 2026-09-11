import { useState } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { ANALYSIS_STEPS } from '../data/mock';
import { IconCheck, IconChevronRight } from './icons';

type StepState = 'done' | 'active' | 'pending';

function StepMark({ state }: { state: StepState }) {
  if (state === 'done') {
    return (
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-alpha-accent text-[#04130d]">
        <IconCheck size={13} />
      </span>
    );
  }
  if (state === 'active') {
    return (
      <span className="ring-pulse flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-alpha-accent/60 bg-alpha-accent/15">
        <span className="h-2 w-2 rounded-full bg-alpha-accent" />
      </span>
    );
  }
  return (
    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-alpha-faint/40">
      <span className="h-1.5 w-1.5 rounded-full bg-alpha-faint/60" />
    </span>
  );
}

function StepRow({
  step,
  state,
  time,
}: {
  step: { label: string; bullets: string[] };
  state: StepState;
  time?: string;
}) {
  const [open, setOpen] = useState(false);
  const expandable = step.bullets.length > 0;
  return (
    <li className="relative border-l border-white/[0.08] pl-5 pb-4 last:pb-0">
      <span className="absolute -left-[11px] top-0.5">
        <StepMark state={state} />
      </span>
      <button
        type="button"
        onClick={() => expandable && setOpen((o) => !o)}
        className="flex w-full items-center gap-3 py-0.5 text-left"
      >
        <span
          className={`text-sm ${
            state === 'active'
              ? 'font-medium text-alpha-ink'
              : state === 'done'
                ? 'text-alpha-muted'
                : 'text-alpha-faint/60'
          }`}
        >
          {step.label}
        </span>
        {time && <span className="ml-auto font-mono text-[11px] text-alpha-faint">{time}</span>}
        {expandable && (
          <IconChevronRight
            size={14}
            className={`text-alpha-faint transition-transform ${open ? 'rotate-90' : ''}`}
          />
        )}
      </button>
      {open && expandable && (
        <ul className="mt-1.5 space-y-1 pl-1">
          {step.bullets.map((b) => (
            <li key={b} className="text-xs text-alpha-muted">
              • {b}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function AnalysisConsole() {
  const { thinkingIndex, thinkingComplete, stepTimes, runAnalysis } = useAnalysis();
  const N = ANALYSIS_STEPS.length;
  const started = thinkingIndex >= 0 || thinkingComplete;
  const pct = thinkingComplete ? 100 : Math.round(((thinkingIndex + 1) / N) * 100);

  return (
    <div className="glass p-6">
      <p className="text-sm font-medium text-alpha-ink">
        {thinkingComplete ? 'Analysis complete' : 'Alpha is analyzing your decision…'}
      </p>

      <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-alpha-accent transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="mt-5 space-y-0">
        {ANALYSIS_STEPS.map((step, i) => {
          const state: StepState =
            i < thinkingIndex
              ? 'done'
              : i === thinkingIndex && !thinkingComplete
                ? 'active'
                : 'pending';
          return <StepRow key={i} step={step} state={state} time={stepTimes[i]} />;
        })}
      </ul>

      {!started && (
        <button type="button" onClick={runAnalysis} className="btn-ghost mt-4">
          Begin analysis
        </button>
      )}
      {started && !thinkingComplete && (
        <p className="mt-4 text-[11px] text-alpha-faint">Simulated processing — demo mode.</p>
      )}
    </div>
  );
}
