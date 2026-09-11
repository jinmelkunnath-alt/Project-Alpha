import type { RiskItem, RiskSeverity } from '../data/mock';

const SEVERITY_STYLE: Record<RiskSeverity, string> = {
  Low: 'text-alpha-faint border-alpha-border',
  Medium: 'text-alpha-warn border-alpha-warn/30',
  High: 'text-alpha-warn border-alpha-warn/40',
  Critical: 'text-alpha-danger border-alpha-danger/40',
};

export default function RiskPanel({ items }: { items: RiskItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((r) => (
        <li key={r.id} className="glass-soft px-3 py-2.5">
          <div className="flex items-center gap-2">
            <p className="flex-1 text-sm font-medium text-alpha-ink">{r.title}</p>
            <span className={`chip border ${SEVERITY_STYLE[r.severity]}`}>{r.severity}</span>
          </div>
          <p className="mt-1.5 text-xs text-alpha-muted">{r.description}</p>
          <p className="mt-1 text-[11px] text-alpha-faint">Likelihood: {r.likelihood}</p>
        </li>
      ))}
    </ul>
  );
}
