import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAnalysis } from '../context/AnalysisContext';
import DecisionContextPanel from '../components/DecisionContextPanel';
import AnalysisConsole from '../components/AnalysisConsole';
import IntelligencePanel from '../components/IntelligencePanel';
import OutcomeView from '../components/OutcomeView';
import { IconPlus, IconAlpha } from '../components/icons';

function NoDecision() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="glass max-w-md p-8 text-center">
        <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-alpha-accent to-alpha-accent-2 text-[#04130d] shadow-glow">
          <IconAlpha size={24} />
        </span>
        <h2 className="text-xl font-semibold text-alpha-ink">Start a new decision</h2>
        <p className="mt-2 text-sm text-alpha-muted">
          Submit a decision to open the Alpha analysis workspace.
        </p>
        <Link to="/decision/new" className="btn-primary mt-5">
          <IconPlus size={16} /> New Decision
        </Link>
      </div>
    </div>
  );
}

export default function Workspace() {
  const { activeDecision } = useApp();
  const { thinkingComplete, thinkingIndex, runAnalysis } = useAnalysis();
  const [params] = useSearchParams();
  const autoRan = useRef(false);

  // Auto-start the analysis when arriving from the landing input (?auto=1).
  useEffect(() => {
    if (autoRan.current) return;
    if (params.get('auto') === '1' && thinkingIndex < 0) {
      autoRan.current = true;
      runAnalysis();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!activeDecision) return <NoDecision />;

  return (
    <div>
      {/* Workspace header */}
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-alpha-accent to-alpha-accent-2 text-[#04130d] shadow-glow">
          <IconAlpha size={20} />
        </span>
        <div>
          <p className="text-[11px] uppercase tracking-[0.22em] text-alpha-faint">Alpha Decision Engine</p>
          <p className="text-sm font-semibold text-alpha-ink">Intelligence Workspace</p>
        </div>
        <Link to="/decision/new" className="btn-ghost ml-auto shrink-0">
          <IconPlus size={16} /> New Decision
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* LEFT — compact decision context */}
        <div className="lg:col-span-3 space-y-5">
          <DecisionContextPanel decision={activeDecision} />
        </div>

        {/* CENTER — analysis console → outcome */}
        <div className="lg:col-span-6 space-y-5">
          {thinkingComplete ? <OutcomeView /> : <AnalysisConsole />}
        </div>

        {/* RIGHT — compact intelligence panel */}
        <div className="lg:col-span-3 space-y-5">
          <IntelligencePanel />
        </div>
      </div>
    </div>
  );
}
