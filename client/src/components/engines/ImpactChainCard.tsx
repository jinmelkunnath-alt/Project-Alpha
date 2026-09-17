import React, { useState } from 'react';
import type { EventImpactChain, ImpactChainStep } from '../../services/engines/types';
import { SAMPLE_IMPACT_CHAINS } from '../../services/engines/impactChainEngine';
import { IconActivity, IconArrowRight, IconShieldCheck, IconAlert } from '../icons';

interface ImpactChainCardProps {
  initialChains?: EventImpactChain[];
}

export default function ImpactChainCard({
  initialChains = SAMPLE_IMPACT_CHAINS,
}: ImpactChainCardProps) {
  const [chains] = useState<EventImpactChain[]>(initialChains);
  const [selectedChainId, setSelectedChainId] = useState<string>(chains[0]?.id || '');

  const activeChain = chains.find((c) => c.id === selectedChainId) || chains[0];

  function renderStageIcon(stage: ImpactChainStep['stage']) {
    switch (stage) {
      case 'REAL_WORLD_EVENT':
        return '📡';
      case 'AFFECTED_VARIABLE':
        return '🎚️';
      case 'MODEL_IMPACT':
        return '🧮';
      case 'FINANCIAL_IMPACT':
        return '📉';
      case 'DECISION_IMPACT':
        return '⚖️';
      case 'RECOMMENDED_ACTION':
        return '⚡';
    }
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              <IconActivity size={15} />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Monitoring &rarr; Impact Chain Engine
            </h3>
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-800">
              Causality Flow
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Transforms raw real-world telemetry alerts into systematic downstream impacts on model parameters, financials, and actions.
          </p>
        </div>

        {/* Chain selector pills */}
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1">
          {chains.map((c, idx) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setSelectedChainId(c.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                selectedChainId === c.id
                  ? 'bg-white text-indigo-900 shadow-2xs border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Event #{idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Active Event Banner */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 font-mono tracking-wider block">
            Detected Live Event
          </span>
          <span className="text-xs font-bold text-slate-900">
            {activeChain.detectedEventTitle}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
          <span>Source: {activeChain.source}</span>
          <span>•</span>
          <span>{new Date(activeChain.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* 6-Stage Horizontal/Vertical Impact Cascade */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 relative">
        {activeChain.chain.map((step, idx) => {
          const isAction = step.stage === 'RECOMMENDED_ACTION';

          return (
            <div
              key={idx}
              className={`relative rounded-xl border p-3.5 flex flex-col justify-between transition-all ${
                isAction
                  ? 'border-emerald-300 bg-emerald-50/40 shadow-xs'
                  : step.sentiment === 'negative'
                  ? 'border-rose-200 bg-rose-50/20'
                  : step.sentiment === 'warning'
                  ? 'border-amber-200 bg-amber-50/20'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div>
                {/* Stage Header with Number & Icon */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400">
                    Step 0{idx + 1}
                  </span>
                  <span className="text-base select-none">{renderStageIcon(step.stage)}</span>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  {step.label}
                </span>

                <h5 className="text-xs font-bold text-slate-900 leading-snug mb-1.5">
                  {step.headline}
                </h5>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {step.details}
                </p>
              </div>

              {/* Connecting indicator */}
              {idx < activeChain.chain.length - 1 && (
                <div className="mt-2 pt-2 border-t border-slate-200/60 hidden lg:flex justify-end text-slate-400">
                  <IconArrowRight size={13} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
