import type { AssumptionItem, AssumptionStatus } from '../data/mock';

const STATUS_STYLE: Record<AssumptionStatus, { label: string; cls: string }> = {
  stable: { label: 'Stable', cls: 'text-alpha-accent border-alpha-accent/30' },
  challenged: { label: 'Challenged', cls: 'text-alpha-warn border-alpha-warn/30' },
  contradicted: { label: 'Contradicted', cls: 'text-alpha-danger border-alpha-danger/30' },
};

export default function AssumptionsPanel({ items }: { items: AssumptionItem[] }) {
  return (
    <ul className="space-y-2">
      {items.map((a) => {
        const s = STATUS_STYLE[a.status];
        return (
          <li key={a.id} className="glass-soft px-3 py-2.5">
            <div className="flex items-start gap-2">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${a.status === 'stable' ? 'bg-alpha-accent' : a.status === 'challenged' ? 'bg-alpha-warn' : 'bg-alpha-danger'}`} />
              <p className="flex-1 text-sm text-alpha-ink">{a.text}</p>
              <span className={`chip shrink-0 border ${s.cls}`}>{s.label}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 pl-4 text-[11px] text-alpha-faint">
              <span>Supporting {a.supporting}</span>
              <span>Contradicting {a.contradicting}</span>
              <span>Impact {a.impact}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
