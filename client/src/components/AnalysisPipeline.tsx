import { useAnalysis } from '../context/AnalysisContext';
import { STAGES, STAGE_DETAILS, type StageDetail } from '../data/mock';
import { IconCheck } from './icons';

type StepState = 'done' | 'active' | 'pending';

function StepDot({ state }: { state: StepState }) {
  if (state === 'done') {
    return (
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-alpha-accent text-[#04130d]">
        <IconCheck size={13} />
      </span>
    );
  }
  if (state === 'active') {
    return (
      <span className="ring-pulse flex h-5 w-5 items-center justify-center rounded-full border border-alpha-accent/60 bg-alpha-accent/15">
        <span className="h-2 w-2 rounded-full bg-alpha-accent" />
      </span>
    );
  }
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-alpha-faint/40">
      <span className="h-1.5 w-1.5 rounded-full bg-alpha-faint/60" />
    </span>
  );
}

function LiveArea({ detail }: { detail: StageDetail }) {
  return (
    <div className="mt-4 rounded-xl border border-alpha-accent/20 bg-alpha-accent/[0.05] p-4 rise">
      <p className="text-[11px] font-semibold tracking-[0.18em] text-alpha-accent">
        {detail.title}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-alpha-muted">{detail.line}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {detail.metrics.map(([k, v]) => (
          <div
            key={k}
            className="rounded-lg border border-alpha-edge bg-white/[0.02] px-3 py-2"
          >
            <p className="text-[10px] uppercase tracking-wider text-alpha-faint">{k}</p>
            <p className="mt-0.5 text-lg font-semibold text-alpha-ink">{v}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalysisPipeline() {
  const { stageIndex, isRunning } = useAnalysis();

  return (
    <div className="glass p-5">
      <p className="panel-title mb-4">Alpha Decision Engine</p>
      <ol className="space-y-0.5">
        {STAGES.map((s, i) => {
          const state: StepState =
            i < stageIndex ? 'done' : i === stageIndex ? 'active' : 'pending';
          return (
            <li key={s.key} className="flex items-center gap-3 py-1.5">
              <StepDot state={state} />
              <span
                className={`text-sm ${
                  state === 'active'
                    ? 'font-medium text-alpha-ink'
                    : state === 'done'
                      ? 'text-alpha-muted'
                      : 'text-alpha-faint'
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ol>

      {stageIndex >= 0 && (
        <LiveArea detail={STAGE_DETAILS[STAGES[stageIndex].detailKey]} />
      )}
      {isRunning && (
        <p className="mt-3 text-[11px] text-alpha-faint">
          Live analysis running — results are simulated for this prototype.
        </p>
      )}
    </div>
  );
}
