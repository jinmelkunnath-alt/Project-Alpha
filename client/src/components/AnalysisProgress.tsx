import { useAnalysis } from '../context/AnalysisContext';
import { STAGES } from '../data/mock';
import { IconSparkle } from './icons';

export default function AnalysisProgress() {
  const { stageIndex, isRunning, isComplete, runAnalysis } = useAnalysis();
  const total = STAGES.length;
  const pct = isComplete ? 100 : Math.round(((stageIndex + 1) / total) * 100);
  const current = STAGES[Math.max(0, stageIndex)]?.label ?? '—';

  return (
    <div className="glass p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="panel-title">Analysis Control</p>
          <p className="mt-1 truncate text-sm text-alpha-ink">
            {isRunning ? current : isComplete ? 'Analysis complete' : 'Ready to analyze'}
          </p>
        </div>
        {isComplete ? (
          <button type="button" className="btn-ghost shrink-0" onClick={runAnalysis}>
            Run again
          </button>
        ) : (
          <button
            type="button"
            className="btn-primary shrink-0"
            onClick={runAnalysis}
            disabled={isRunning}
          >
            {isRunning ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#04130d]/40 border-t-[#04130d]" />
                Running…
              </>
            ) : (
              <>
                <IconSparkle size={16} /> Run Analysis
              </>
            )}
          </button>
        )}
      </div>

      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full bg-alpha-accent transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-alpha-faint">
        {pct}% ·{' '}
        {isComplete
          ? 'all stages complete'
          : isRunning
            ? `processing stage ${stageIndex + 1} of ${total}`
            : `${total} stages · idle`}
      </p>
    </div>
  );
}
