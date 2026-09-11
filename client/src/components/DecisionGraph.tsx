import { useState } from 'react';
import { IconChevronRight } from './icons';
import type { GraphNode } from '../data/mock';

const TONE: Record<string, string> = {
  default: 'text-alpha-muted',
  accent: 'text-alpha-accent',
  warn: 'text-alpha-warn',
  danger: 'text-alpha-danger',
};

export default function DecisionGraph({ nodes }: { nodes: GraphNode[] }) {
  const [selected, setSelected] = useState<string | null>('assumptions');
  const active = nodes.find((n) => n.id === selected) ?? null;

  return (
    <div className="glass p-5">
      <p className="panel-title mb-4">Decision Graph</p>

      <div className="flex flex-col items-stretch">
        {nodes.map((n, i) => {
          const isSel = n.id === selected;
          return (
            <div key={n.id} className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => setSelected(n.id)}
                className={`group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left transition-all ${
                  isSel
                    ? 'border-alpha-accent/50 bg-alpha-accent/[0.08] shadow-glow'
                    : 'border-alpha-border bg-white/[0.02] hover:border-white/15'
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`h-2 w-2 rounded-full ${isSel ? 'bg-alpha-accent' : 'bg-alpha-faint'}`}
                  />
                  <span
                    className={`text-xs font-semibold tracking-[0.16em] ${
                      isSel ? 'text-alpha-ink' : 'text-alpha-muted'
                    }`}
                  >
                    {n.label}
                  </span>
                </span>
                <IconChevronRight
                  size={14}
                  className={`text-alpha-faint transition-transform ${isSel ? 'rotate-90' : ''}`}
                />
              </button>
              {i < nodes.length - 1 && (
                <span className="my-1 h-5 w-px bg-gradient-to-b from-alpha-border to-transparent" />
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      {active && (
        <div className="mt-4 rounded-xl border border-alpha-border bg-black/20 p-4 rise">
          <p className="text-sm font-medium text-alpha-ink">{active.title}</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {active.lines.map((l) => (
              <div
                key={l.label}
                className="rounded-lg border border-alpha-edge bg-white/[0.02] px-3 py-2"
              >
                <p className="text-[10px] uppercase tracking-wider text-alpha-faint">{l.label}</p>
                <p className={`mt-0.5 text-sm font-semibold ${TONE[l.tone ?? 'default']}`}>
                  {l.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
