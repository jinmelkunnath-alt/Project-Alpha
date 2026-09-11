import type { ReactNode } from 'react';

interface PlaceholderProps {
  title: string;
  stage: string;
  description?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

// Clear, non-misleading "module not yet active" panel for future AI functionality.
export default function ModulePlaceholder({
  title,
  stage,
  description,
  icon,
  children,
}: PlaceholderProps) {
  return (
    <div className="glass relative overflow-hidden p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(91,141,239,0.7),transparent_50%)]" />
      </div>

      <div className="relative">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-alpha-accent">
            {icon}
          </span>
          <div className="min-w-0">
            <p className="panel-title">Module · {stage}</p>
            <h2 className="text-lg font-semibold text-alpha-ink">{title}</h2>
          </div>
          <span className="chip ml-auto border-alpha-warn/30 text-alpha-warn">
            <span className="h-1.5 w-1.5 rounded-full bg-alpha-warn" />
            Not yet active
          </span>
        </div>

        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-alpha-muted">
          {description ??
            'This analysis module is part of the PROJECT ALPHA pipeline and will be enabled in a later development milestone. No AI services are connected yet.'}
        </p>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            'LLM orchestration pending',
            'External search pending',
            'Verification engine pending',
          ].map((t) => (
            <div
              key={t}
              className="glass-soft flex items-center gap-2 px-3 py-2.5 text-xs text-alpha-faint"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-alpha-faint/60" />
              {t}
            </div>
          ))}
        </div>

        {children}
      </div>
    </div>
  );
}
