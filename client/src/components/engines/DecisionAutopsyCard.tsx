import React from 'react';
import type { DecisionAutopsyRecord } from '../../services/engines/types';
import { SAMPLE_DECISION_AUTOPSY } from '../../services/engines/autopsyEngine';
import { IconFlask, IconAlert, IconShieldCheck, IconClock } from '../icons';

interface DecisionAutopsyCardProps {
  autopsyData?: DecisionAutopsyRecord;
}

export default function DecisionAutopsyCard({
  autopsyData = SAMPLE_DECISION_AUTOPSY,
}: DecisionAutopsyCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50 text-purple-700 border border-purple-200">
              <IconFlask size={15} />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Decision Autopsy & Retrospective
            </h3>
            <span className="rounded-full bg-purple-100 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-purple-800">
              Future-Ready Post-Mortem
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Compare actual observed outcome against original baseline predictions to extract organizational learnings.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-500">
          <span>Decided: {autopsyData.decisionDate}</span>
          <span>&rarr;</span>
          <span>Evaluated: {autopsyData.evaluationDate}</span>
        </div>
      </div>

      {/* 4-Quadrant Comparative Matrix (Decision vs Assumptions vs Predicted vs Actual) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
        {/* 1. Original Decision */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
            01 · Original Decision
          </span>
          <p className="text-xs font-semibold text-slate-800 leading-snug">
            "{autopsyData.originalDecision}"
          </p>
        </div>

        {/* 2. Original Assumptions */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block mb-1">
            02 · Core Assumptions Staked
          </span>
          <p className="text-xs text-slate-700 leading-snug">
            Assumed competitor price stickiness, low organic CAC (&lt;₹3,500), and rapid payback within 9 months.
          </p>
        </div>

        {/* 3. Predicted Outcome */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 block mb-1">
            03 · Predicted Outcome (Alpha Baseline)
          </span>
          <p className="text-xs text-blue-950 font-medium leading-snug">
            {autopsyData.predictedOutcome}
          </p>
        </div>

        {/* 4. Actual Outcome */}
        <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 block mb-1">
            04 · Actual Realized Outcome
          </span>
          <p className="text-xs text-amber-950 font-semibold leading-snug">
            {autopsyData.actualOutcome}
          </p>
        </div>
      </div>

      {/* Assumptions Breakdown: Held vs Failed */}
      <div className="mb-6">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
          Assumption Audit: Which Held vs Failed
        </h4>
        <div className="space-y-2">
          {autopsyData.assumptionsEvaluated.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-xl border p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs ${
                item.status === 'HELD'
                  ? 'border-emerald-200 bg-emerald-50/30'
                  : 'border-rose-200 bg-rose-50/30'
              }`}
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold uppercase ${
                      item.status === 'HELD'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.status}
                  </span>
                  <span className="font-semibold text-slate-900">{item.assumption}</span>
                </div>
                <p className="text-[11px] text-slate-600 pl-0.5">
                  <strong>Observed Evidence:</strong> {item.evidenceObserved}
                </p>
              </div>

              <span className="shrink-0 text-[10px] font-mono font-semibold text-slate-500">
                Impact: <strong className="text-slate-800">{item.impactOnOutcome}</strong>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* First Warning Signal & Prediction Failure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6">
        {/* First Warning Signal */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
            First Detected Warning Signal
          </span>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 mb-1">
            <span>{autopsyData.firstWarningSignal.date}</span>
            <span className="h-1 w-1 rounded-full bg-slate-400" />
            <span className="text-indigo-700 font-mono text-[11px]">
              {autopsyData.firstWarningSignal.wasDetectedByMonitoring ? '✓ 24/7 Monitoring Caught' : 'Missed'}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            {autopsyData.firstWarningSignal.event}
          </p>
        </div>

        {/* Failed Prediction Component */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-3.5">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Which Prediction Failed
          </span>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {autopsyData.whichPredictionFailed}
          </p>
        </div>
      </div>

      {/* Counterfactual Lessons: What Could Have Been Done Differently */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mb-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
          Retrospective Lessons: What Could Have Been Done Differently
        </h4>
        <ul className="space-y-1.5 text-xs text-slate-700 pl-4 list-disc leading-relaxed">
          {autopsyData.retrospectiveLessons.map((lesson, idx) => (
            <li key={idx}>{lesson}</li>
          ))}
        </ul>
      </div>

      {/* Causal Certainty Disclaimer */}
      <div className="rounded-lg border border-slate-200 bg-white p-3 text-[10px] font-mono text-slate-500 leading-relaxed">
        <strong>EPSTEMIC HUMILITY NOTICE:</strong> {autopsyData.causalCertaintyDisclaimer}
      </div>
    </div>
  );
}
