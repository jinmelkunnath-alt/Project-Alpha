import { useAnalysis } from '../context/AnalysisContext';

export default function IntelligencePanel() {
  const { metrics } = useAnalysis();

  const rows: { label: string; value: string; accent?: boolean }[] = [
    { label: 'Evidence', value: `${metrics.evidence} signals` },
    { label: 'Risks', value: `${metrics.risks} identified` },
    { label: 'Assumptions', value: `${metrics.assumptions} detected` },
    {
      label: 'Market Signal',
      value: metrics.marketSignal,
      accent: metrics.marketSignal === 'Positive',
    },
    { label: 'Confidence', value: `${metrics.confidence}%`, accent: true },
  ];

  return (
    <div className="glass p-5">
      <p className="panel-title mb-2">Intelligence</p>
      <div className="divide-y divide-alpha-edge">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between py-2.5">
            <span className="text-[11px] uppercase tracking-[0.14em] text-alpha-faint">{r.label}</span>
            <span
              className={`text-sm font-semibold ${
                r.accent ? 'text-alpha-accent' : 'text-alpha-ink'
              }`}
            >
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
