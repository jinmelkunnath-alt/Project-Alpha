import { useAnalysis } from '../context/AnalysisContext';
import type { Decision } from '../types';

export default function DecisionContextPanel({ decision }: { decision: Decision }) {
  const { thinkingComplete } = useAnalysis();

  return (
    <div className="space-y-4">
      <div className="glass p-5">
        <p className="panel-title">Decision</p>
        <p className="mt-2 text-[15px] font-semibold leading-snug text-alpha-ink">
          {decision.title}
        </p>
      </div>

      <div className="glass p-5">
        <p className="panel-title">Context</p>
        <p className="mt-2 text-sm leading-relaxed text-alpha-muted">
          {decision.description || 'No additional context provided.'}
        </p>
      </div>

      <div className="glass p-5">
        <p className="panel-title">Status</p>
        <div className="mt-2 flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              thinkingComplete ? 'bg-alpha-accent' : 'bg-alpha-warn pulse-dot'
            }`}
          />
          <span className="text-sm font-medium text-alpha-ink">
            {thinkingComplete ? 'Analysis complete' : 'Analyzing'}
          </span>
        </div>
      </div>
    </div>
  );
}
