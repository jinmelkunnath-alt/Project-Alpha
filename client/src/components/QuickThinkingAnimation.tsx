import { useState, useEffect } from 'react';
import { IconAlphaEmblem, IconSparkle } from './icons';

interface QuickThinkingAnimationProps {
  elapsedMs?: number;
}

const QUICK_THINKING_TOKENS = [
  'Parsing follow-up parameters & decision context...',
  'Checking secondary assumptions against ground truth...',
  'Stress-testing Bayesian sensitivity & drawdown margins...',
  'Calibrating trade-off vectors & execution velocity...',
  'Synthesizing concise tactical playbook...',
];

export default function QuickThinkingAnimation({ elapsedMs = 0 }: QuickThinkingAnimationProps) {
  const [tokenIndex, setTokenIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTokenIndex((prev) => (prev + 1) % QUICK_THINKING_TOKENS.length);
    }, 450);
    return () => clearInterval(timer);
  }, []);

  const elapsedSec = (elapsedMs / 1000).toFixed(1);

  return (
    <div className="flex items-start gap-3.5 my-4 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
      {/* Small Alpha Emblem — circular */}
      <IconAlphaEmblem size={32} className="shadow-xs ring-1 ring-emerald-500/25 shrink-0" />

      {/* Modern AI Model Quick Thinking Card */}
      <div className="flex-1 rounded-2xl border border-slate-200/90 bg-white/95 px-4 py-3 shadow-xs backdrop-blur-md">
        {/* Header: Small 'Thinking' text with pulsing dot and timer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <IconSparkle size={13} className="text-emerald-600 animate-pulse" />
              Thinking
            </span>
          </div>

          <span className="text-[11px] font-mono text-slate-400 font-medium">
            {elapsedSec}s
          </span>
        </div>

        {/* Dynamic dummy data stream line passing through */}
        <div className="mt-2 flex items-center gap-2 overflow-hidden">
          <span className="text-[10px] font-mono text-emerald-600 font-bold shrink-0">
            &gt;
          </span>
          <p
            key={tokenIndex}
            className="text-[11.5px] font-mono text-slate-600 truncate animate-in fade-in slide-in-from-left-1 duration-150"
          >
            {QUICK_THINKING_TOKENS[tokenIndex]}
          </p>
        </div>

        {/* Subtle animated shimmer line */}
        <div className="mt-2.5 h-0.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-full animate-pulse w-3/4" />
        </div>
      </div>
    </div>
  );
}
