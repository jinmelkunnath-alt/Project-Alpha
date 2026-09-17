import React, { useState } from 'react';
import type { DecisionVariable, SensitivityAnalysisModel } from '../../services/engines/types';
import {
  DEFAULT_DECISION_VARIABLES,
  calculateSensitivityModel,
} from '../../services/engines/sensitivityEngine';
import { IconSparkle, IconTrendUp, IconAlert, IconScale } from '../icons';

interface SensitivityWhatIfCardProps {
  baselineScore?: number;
}

export default function SensitivityWhatIfCard({
  baselineScore = 78,
}: SensitivityWhatIfCardProps) {
  const [variables, setVariables] = useState<DecisionVariable[]>(() =>
    DEFAULT_DECISION_VARIABLES.map((v) => ({ ...v }))
  );

  const model: SensitivityAnalysisModel = calculateSensitivityModel(variables, baselineScore);
  const scoreDiff = model.recalculatedConfidenceScore - model.baselineConfidenceScore;

  function handleSliderChange(id: string, newVal: number) {
    setVariables((prev) =>
      prev.map((v) => (v.id === id ? { ...v, currentValue: newVal } : v))
    );
  }

  function handleReset() {
    setVariables(DEFAULT_DECISION_VARIABLES.map((v) => ({ ...v, currentValue: v.baselineValue })));
  }

  function formatValue(v: DecisionVariable, val: number): string {
    if (v.format === 'currency') {
      if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
      if (val >= 1000) return `₹${(val / 1000).toFixed(0)}k`;
      return `₹${val}`;
    }
    if (v.format === 'percentage') return `${val}%`;
    return `${val} ${v.unit}`;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              <IconScale size={15} />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Sensitivity & What-If Analysis
            </h3>
            <span className="rounded-full bg-indigo-100 px-2.5 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-800">
              Live Recalculation
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Simulate parameter perturbations (e.g. CAC, Price, Churn) and observe direct structural impacts on decision conviction.
          </p>
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="self-start sm:self-auto rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          Reset to Baseline
        </button>
      </div>

      {/* Real-Time Impact Dashboard Bar */}
      <div className="rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 via-white to-slate-50 p-4 mb-6 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
          {/* Conviction Score Delta */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Conviction Score
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold font-mono text-slate-900">
                {model.recalculatedConfidenceScore}%
              </span>
              <span
                className={`text-xs font-mono font-bold px-1.5 py-0.5 rounded ${
                  scoreDiff > 0
                    ? 'bg-emerald-100 text-emerald-800'
                    : scoreDiff < 0
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {scoreDiff > 0 ? `+${scoreDiff}` : scoreDiff} pts
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Baseline: {model.baselineConfidenceScore}%</span>
          </div>

          {/* Verdict Transition */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Alpha Verdict
            </span>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-bold font-mono uppercase tracking-wider ${
                  model.recalculatedVerdict === 'GO'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : model.recalculatedVerdict === 'CONDITIONAL GO'
                    ? 'bg-cyan-100 text-cyan-800 border border-cyan-300'
                    : model.recalculatedVerdict === 'CAUTION'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
              >
                {model.recalculatedVerdict}
              </span>
              {model.recalculatedVerdict !== model.baselineVerdict && (
                <span className="text-[10px] font-bold text-slate-400">
                  (was {model.baselineVerdict})
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Bayesian recommendation</span>
          </div>

          {/* Margin Shift */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Margin & Revenue Shift
            </span>
            <div className="flex items-baseline gap-1 mt-1 font-mono text-sm">
              <span className="font-bold text-slate-900">
                {model.impactResults.find((i) => i.variableId === 'price')?.impactOnMargin || 0}%
              </span>
              <span className="text-[11px] text-slate-500">margin Δ</span>
            </div>
            <span className="text-[10px] text-slate-400">Operating leverage</span>
          </div>

          {/* Break-Even Impact */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
              Payback Horizon
            </span>
            <div className="flex items-baseline gap-1 mt-1 font-mono text-sm">
              <span className="font-bold text-indigo-900">
                {scoreDiff >= 0 ? 'Accelerating' : 'Delayed'}
              </span>
            </div>
            <span className="text-[10px] text-slate-400">Trajectory delta</span>
          </div>
        </div>
      </div>

      {/* "Most Sensitive Variable" Callout Box */}
      <div className="rounded-xl border border-amber-300 bg-amber-50/50 p-4 mb-6">
        <div className="flex items-start gap-2.5">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-amber-200 text-amber-900">
            <IconAlert size={14} />
          </span>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Most Sensitive Variable Identified
              </span>
              <span className="rounded bg-amber-200/80 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-900">
                {model.mostSensitiveVariable.variableName}
              </span>
            </div>
            <p className="mt-1 text-xs text-amber-900/90 leading-relaxed">
              {model.mostSensitiveVariable.explanation}
            </p>
          </div>
        </div>
      </div>

      {/* Variable Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {variables.map((v) => {
          const isTopSensitive = v.id === model.mostSensitiveVariable.variableId;
          const isModified = v.currentValue !== v.baselineValue;

          return (
            <div
              key={v.id}
              className={`rounded-xl border p-3.5 transition-all ${
                isTopSensitive
                  ? 'border-indigo-300 bg-indigo-50/20 shadow-2xs'
                  : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800">{v.name}</span>
                  {isTopSensitive && (
                    <span className="rounded-full bg-indigo-100 text-indigo-800 px-2 py-0.2 text-[9px] font-bold uppercase tracking-wider">
                      Highest Influence
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 font-mono text-xs">
                  {isModified && (
                    <span className="text-slate-400 line-through text-[11px]">
                      {formatValue(v, v.baselineValue)}
                    </span>
                  )}
                  <span className={`font-bold ${isModified ? 'text-indigo-700' : 'text-slate-700'}`}>
                    {formatValue(v, v.currentValue)}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-slate-500 mb-2">{v.description}</p>

              {/* Slider control */}
              <input
                type="range"
                min={v.min}
                max={v.max}
                step={v.step}
                value={v.currentValue}
                onChange={(e) => handleSliderChange(v.id, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>{formatValue(v, v.min)}</span>
                <span className="text-slate-500 font-semibold">Base: {formatValue(v, v.baselineValue)}</span>
                <span>{formatValue(v, v.max)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
