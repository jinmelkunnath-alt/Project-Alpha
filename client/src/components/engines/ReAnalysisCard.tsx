import React, { useState } from 'react';
import type { ReAnalysisDiff } from '../../services/engines/types';
import {
  SAMPLE_RE_ANALYSIS_DIFF,
  executeReRunAlpha,
} from '../../services/engines/reAnalysisEngine';
import { IconSparkle, IconTrendUp, IconAlert, IconCheck } from '../icons';

interface ReAnalysisCardProps {
  initialDiff?: ReAnalysisDiff;
  onReRunComplete?: (newDiff: ReAnalysisDiff) => void;
}

export default function ReAnalysisCard({
  initialDiff,
  onReRunComplete,
}: ReAnalysisCardProps) {
  const [diff, setDiff] = useState<ReAnalysisDiff>(() => initialDiff || SAMPLE_RE_ANALYSIS_DIFF);
  const [isReRunning, setIsReRunning] = useState(false);

  function handleReRun() {
    setIsReRunning(true);
    setTimeout(() => {
      const updated = executeReRunAlpha();
      setDiff(updated);
      setIsReRunning(false);
      onReRunComplete?.(updated);
    }, 1100);
  }

  function renderCategoryBadge(cat: ReAnalysisDiff['attributionFactors'][0]['category']) {
    switch (cat) {
      case 'NEW_EVIDENCE':
        return <span className="bg-blue-100 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">New Evidence</span>;
      case 'ASSUMPTION_WEAKENED':
        return <span className="bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">Assumption Weakened</span>;
      case 'CONTRADICTION':
        return <span className="bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">Contradiction Detected</span>;
      case 'MARKET_SHIFT':
        return <span className="bg-indigo-100 text-indigo-800 border border-indigo-200 px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase">Market Shift</span>;
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <IconSparkle size={15} />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Re-Analysis Engine
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-700">
              State Diff
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Compare live telemetry updates against the original baseline decision and review attribution of conviction drift.
          </p>
        </div>

        {/* Trigger Button: RE-RUN ALPHA */}
        <button
          type="button"
          onClick={handleReRun}
          disabled={isReRunning}
          className="self-start sm:self-auto inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-slate-800 disabled:opacity-60 transition-all cursor-pointer"
        >
          {isReRunning ? (
            <>
              <span className="h-3 w-3 rounded-full border-2 border-white/30 border-t-white animate-spin" />
              <span>Re-Running Alpha...</span>
            </>
          ) : (
            <>
              <IconSparkle size={14} className="text-emerald-400" />
              <span>RE-RUN ALPHA</span>
            </>
          )}
        </button>
      </div>

      {/* Side-by-Side Score Delta Display (Exact spec format: ORIGINAL 78, CURRENT 64, CHANGE -14) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/70 mb-5 text-center">
        {/* ORIGINAL */}
        <div className="rounded-lg bg-white p-3 border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
            ORIGINAL
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-800">
            {diff.originalScore}
          </span>
          <span className="text-[10px] font-bold font-mono text-emerald-700 block mt-1">
            ({diff.originalVerdict})
          </span>
        </div>

        {/* CURRENT */}
        <div className="rounded-lg bg-white p-3 border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
            CURRENT
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
            {diff.currentScore}
          </span>
          <span className="text-[10px] font-bold font-mono text-cyan-700 block mt-1">
            ({diff.currentVerdict})
          </span>
        </div>

        {/* CHANGE */}
        <div
          className={`rounded-lg p-3 border shadow-2xs ${
            diff.changeScore >= 0
              ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
              : 'bg-rose-50/80 border-rose-200 text-rose-900'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 block mb-1">
            CHANGE
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold font-mono">
            {diff.changeScore > 0 ? `+${diff.changeScore}` : diff.changeScore}
          </span>
          <span className="text-[10px] font-bold font-mono block mt-1">
            points
          </span>
        </div>
      </div>

      {/* Executive Attribution Statement */}
      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80 mb-5">
        <strong>Executive Attribution Summary:</strong> {diff.executiveSummary}
      </p>

      {/* Why the State Changed - Detailed Factor Attribution */}
      <div>
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-1.5">
          <span>Attribution Factors: Why the State Changed</span>
          <span className="text-slate-400 font-normal">({diff.attributionFactors.length} signals evaluated)</span>
        </h4>

        <div className="space-y-2">
          {diff.attributionFactors.map((f, idx) => (
            <div
              key={idx}
              className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  {renderCategoryBadge(f.category)}
                </div>
                <p className="text-slate-800 font-medium leading-snug">
                  {f.description}
                </p>
              </div>

              <span
                className={`shrink-0 font-mono font-bold text-xs px-2 py-0.5 rounded ${
                  f.scoreImpact > 0
                    ? 'bg-emerald-50 text-emerald-800'
                    : 'bg-rose-50 text-rose-800'
                }`}
              >
                {f.scoreImpact > 0 ? `+${f.scoreImpact}` : f.scoreImpact} pts
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
