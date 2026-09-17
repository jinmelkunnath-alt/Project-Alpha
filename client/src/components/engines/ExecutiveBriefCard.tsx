import React from 'react';
import type { ExecutiveAlphaBriefData } from '../../services/engines/types';
import { SAMPLE_EXECUTIVE_BRIEF } from '../../services/engines/briefEngine';
import { IconAlphaEmblem, IconSparkle, IconAlert, IconCheck, IconTarget, IconClock } from '../icons';

interface ExecutiveBriefCardProps {
  briefData?: ExecutiveAlphaBriefData;
}

export default function ExecutiveBriefCard({
  briefData = SAMPLE_EXECUTIVE_BRIEF,
}: ExecutiveBriefCardProps) {
  const assessment = briefData.currentAssessment;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-2.5">
          <IconAlphaEmblem size={32} className="shadow-xs ring-1 ring-emerald-500/25 shrink-0" />
          <div>
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Executive Alpha Brief</span>
              <span className="rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono px-2 py-0.5 font-bold uppercase">
                30-Second Digest
              </span>
            </h3>
            <p className="text-xs text-slate-500">
              High-stakes decision distillation for leadership and board review.
            </p>
          </div>
        </div>

        {/* Live Score Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className={`rounded-full px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider border ${
              assessment.verdict === 'GO'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : assessment.verdict === 'CONDITIONAL GO'
                ? 'bg-cyan-50 text-cyan-800 border-cyan-300'
                : assessment.verdict === 'CAUTION'
                ? 'bg-amber-50 text-amber-800 border-amber-300'
                : 'bg-rose-50 text-rose-800 border-rose-300'
            }`}
          >
            {assessment.verdict} ({assessment.convictionScore}%)
          </span>
        </div>
      </div>

      {/* 8-Dimensional Brief Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* 1. DECISION */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5 md:col-span-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
            01 · DECISION
          </span>
          <p className="text-sm font-bold text-slate-900 leading-snug">
            {briefData.decision}
          </p>
        </div>

        {/* 2. CURRENT ASSESSMENT */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
            02 · CURRENT ASSESSMENT
          </span>
          <p className="text-xs font-semibold text-slate-800 leading-relaxed">
            {assessment.assessmentStatement}
          </p>
        </div>

        {/* 3. PRIMARY OPPORTUNITY */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/25 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 block mb-1">
            03 · PRIMARY OPPORTUNITY
          </span>
          <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
            {briefData.primaryOpportunity}
          </p>
        </div>

        {/* 4. PRIMARY WEAKNESS */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/25 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 block mb-1">
            04 · PRIMARY WEAKNESS
          </span>
          <p className="text-xs font-semibold text-rose-950 leading-relaxed">
            {briefData.primaryWeakness}
          </p>
        </div>

        {/* 5. CRITICAL DEPENDENCY */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/25 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-700 block mb-1">
            05 · CRITICAL DEPENDENCY
          </span>
          <p className="text-xs font-semibold text-indigo-950 leading-relaxed">
            {briefData.criticalDependency}
          </p>
        </div>

        {/* 6. FINANCIAL OUTLOOK */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
            06 · FINANCIAL OUTLOOK
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div>
              <span className="text-slate-400 block">CapEx:</span>
              <strong className="text-slate-900">{briefData.financialOutlook.setupCost}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">ROI:</span>
              <strong className="text-emerald-700">{briefData.financialOutlook.twelveMonthROI}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Break-Even:</span>
              <strong className="text-indigo-900">{briefData.financialOutlook.breakEvenHorizon}</strong>
            </div>
            <div>
              <span className="text-slate-400 block">Runway:</span>
              <strong className="text-slate-800">{briefData.financialOutlook.runwayStatus}</strong>
            </div>
          </div>
        </div>

        {/* 7. BREAKING POINT */}
        <div className="rounded-xl border border-amber-300 bg-amber-50/40 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 block mb-1">
            07 · BREAKING POINT (KILL-SWITCH TRIGGER)
          </span>
          <p className="text-xs font-bold text-amber-950 leading-relaxed">
            {briefData.breakingPoint}
          </p>
        </div>

        {/* 8. NEXT ACTION */}
        <div className="rounded-xl border border-slate-900 bg-slate-900 text-white p-3.5 md:col-span-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            08 · IMMEDIATE NEXT ACTION (NEXT 48 HOURS)
          </span>
          <p className="text-xs font-semibold text-slate-100 leading-relaxed">
            {briefData.nextAction}
          </p>
        </div>
      </div>
    </div>
  );
}
