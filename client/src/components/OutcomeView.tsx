import { useState } from 'react';
import { OUTCOME } from '../data/mock';

const SEVERITY_TONE: Record<string, string> = {
  High: 'border-alpha-warn/40 text-alpha-warn',
  Critical: 'border-alpha-danger/40 text-alpha-danger',
  Medium: 'border-alpha-warn/30 text-alpha-warn',
  Low: 'border-alpha-border text-alpha-faint',
};

export default function OutcomeView() {
  const [monitored, setMonitored] = useState(false);

  return (
    <div className="glass p-6">
      <p className="panel-title">Alpha's Assessment</p>

      <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.14em] text-alpha-faint">Recommendation</p>
          <p className="mt-1 text-2xl font-semibold tracking-tight text-alpha-ink">
            {OUTCOME.recommendation}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[11px] uppercase tracking-[0.14em] text-alpha-faint">Confidence</p>
          <p className="mt-1 text-2xl font-semibold text-alpha-accent">{OUTCOME.confidence}%</p>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="text-sm font-semibold text-alpha-ink">Why</h3>
        <ul className="mt-2 space-y-1.5">
          {OUTCOME.why.map((w) => (
            <li key={w} className="text-sm leading-relaxed text-alpha-muted">
              • {w}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h3 className="text-sm font-semibold text-alpha-ink">Weak points</h3>
        <div className="mt-2 space-y-2">
          {OUTCOME.weakPoints.map((w, i) => (
            <div key={w.problem} className="rounded-xl border border-alpha-border bg-white/[0.02] p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-alpha-ink">{w.problem}</p>
                <span className={`chip border ${SEVERITY_TONE[w.severity] ?? ''}`}>{w.severity}</span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-alpha-muted">{w.explanation}</p>
              <p className="mt-2 text-xs text-alpha-accent/90">Alpha suggests: {OUTCOME.mitigations[i]}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6">
        {monitored ? (
          <div className="rounded-xl border border-alpha-accent/30 bg-alpha-accent/[0.06] p-4">
            <p className="text-sm font-medium text-alpha-ink">Decision added to monitoring.</p>
            <p className="mt-1 text-xs text-alpha-muted">Alpha will watch for relevant changes.</p>
          </div>
        ) : (
          <button type="button" onClick={() => setMonitored(true)} className="btn-primary w-full justify-center">
            ＋ Add to 24/7 Monitoring
          </button>
        )}
        <p className="mt-2 text-center text-[11px] text-alpha-faint">
          Track external signals that could change this assessment.
        </p>
      </div>
    </div>
  );
}
