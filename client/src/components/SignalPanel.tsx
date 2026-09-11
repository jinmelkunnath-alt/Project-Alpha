import { useEffect, useState } from 'react';
import { useAnalysis } from '../context/AnalysisContext';

function useCountUp(target: number, duration = 900) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function Meter({
  label,
  value,
  tone,
  locked,
}: {
  label: string;
  value: number;
  tone: 'accent' | 'warn';
  locked: boolean;
}) {
  const v = useCountUp(value);

  if (locked) {
    return (
      <div>
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-alpha-muted">{label}</span>
          <span className="text-2xl font-semibold tabular-nums tracking-tight text-alpha-faint">
            —
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full rounded-full bg-white/[0.06]" style={{ width: '0%' }} />
        </div>
      </div>
    );
  }

  const bar = tone === 'warn' ? 'bg-alpha-warn' : 'bg-alpha-accent';
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-alpha-muted">{label}</span>
        <span className="text-2xl font-semibold tabular-nums tracking-tight text-alpha-ink">
          {v}
          <span className="text-base text-alpha-faint">%</span>
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${bar} transition-[width] duration-700`}
          style={{ width: `${v}%` }}
        />
      </div>
    </div>
  );
}

export default function SignalPanel() {
  const { signals, isThinking } = useAnalysis();
  const locked = isThinking; // outcome is revealed only after analysis completes

  const outlookTone =
    signals.marketOutlook === 'Positive'
      ? 'text-alpha-accent border-alpha-accent/30'
      : signals.marketOutlook === 'Negative'
        ? 'text-alpha-danger border-alpha-danger/30'
        : 'text-alpha-faint border-alpha-border';

  return (
    <div className="glass p-5">
      <p className="panel-title mb-4">Signals / Insights</p>
      <div className="space-y-4">
        <Meter label="Evidence Strength" value={signals.evidenceStrength} tone="accent" locked={locked} />
        <Meter label="Risk Exposure" value={signals.riskExposure} tone="warn" locked={locked} />
        <Meter label="Confidence" value={signals.confidence} tone="accent" locked={locked} />
        <div className="flex items-center justify-between border-t border-alpha-edge pt-3">
          <span className="text-sm text-alpha-muted">Market Outlook</span>
          <span className={`chip border ${locked ? 'text-alpha-faint border-alpha-border' : outlookTone}`}>
            {locked ? 'Pending' : signals.marketOutlook}
          </span>
        </div>
      </div>
    </div>
  );
}
