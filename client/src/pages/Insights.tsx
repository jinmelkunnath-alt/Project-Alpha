import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import SignalPanel from '../components/SignalPanel';
import DecisionGraph from '../components/DecisionGraph';
import { GRAPH_NODES } from '../data/mock';
import { IconSparkle } from '../components/icons';

export default function Insights() {
  const { activeDecision } = useApp();

  if (!activeDecision) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="glass max-w-md p-8 text-center">
          <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-alpha-accent to-alpha-accent-2 text-[#04130d] shadow-glow">
            <IconSparkle size={24} />
          </span>
          <h2 className="text-xl font-semibold text-alpha-ink">No active decision</h2>
          <p className="mt-2 text-sm text-alpha-muted">
            Start a decision to surface its insights.
          </p>
          <Link to="/decision/new" className="btn-primary mt-5">
            New Decision
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="panel-title">Insights</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-alpha-ink lg:text-3xl">
        {activeDecision.title}
      </h1>
      <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SignalPanel />
        <DecisionGraph nodes={GRAPH_NODES} />
      </div>
    </div>
  );
}
