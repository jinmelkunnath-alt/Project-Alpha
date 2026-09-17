import React, { useState } from 'react';
import type { MultiOptionComparison, ComparisonOption } from '../../services/engines/types';
import { SAMPLE_MULTI_OPTION_COMPARISON } from '../../services/engines/comparisonEngine';
import { formatFinancialValue } from '../../services/engines/financialEngine';
import { IconScale, IconTrendUp, IconAlert, IconCheck } from '../icons';

interface DecisionComparisonCardProps {
  comparisonData?: MultiOptionComparison;
}

export default function DecisionComparisonCard({
  comparisonData = SAMPLE_MULTI_OPTION_COMPARISON,
}: DecisionComparisonCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string>(
    comparisonData.options[0]?.id || ''
  );

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <IconScale size={15} />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Multi-Strategy Decision Comparison
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-bold text-slate-700">
              Trade-Off Matrix
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Rigorous side-by-side appraisal across CapEx, revenue upside, downside vulnerability, and Monte Carlo multi-horizons.
          </p>
        </div>
      </div>

      {/* Strategic Synthesis Executive Banner */}
      <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4 mb-6 text-xs text-indigo-950 leading-relaxed">
        <strong className="text-indigo-900 block font-bold uppercase tracking-wider text-[10px] mb-1">
          Strategic Synthesis (No False Winner — Objective Trade-Offs):
        </strong>
        {comparisonData.synthesisTradeoffs}
      </div>

      {/* Side-by-Side 3 Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {comparisonData.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;

          return (
            <div
              key={opt.id}
              onClick={() => setSelectedOptionId(opt.id)}
              className={`rounded-xl border p-4 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-400 bg-white shadow-md ring-2 ring-indigo-200'
                  : 'border-slate-200 bg-slate-50/40 hover:bg-slate-50'
              }`}
            >
              <div>
                {/* Title & Tagline */}
                <div className="mb-3">
                  <h4 className="text-xs font-extrabold uppercase tracking-tight text-slate-900">
                    {opt.label}
                  </h4>
                  <span className="text-[11px] font-medium text-slate-500 block mt-0.5">
                    {opt.tagline}
                  </span>
                </div>

                {/* Quantitative KPIs Table */}
                <div className="space-y-1.5 font-mono text-xs border-y border-slate-100 py-3 mb-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-[11px]">Setup Cost:</span>
                    <span className="font-bold text-slate-900">{formatFinancialValue(opt.setupCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-[11px]">Annual Rev:</span>
                    <span className="font-bold text-emerald-700">
                      {opt.annualRevenuePotential > 0 ? formatFinancialValue(opt.annualRevenuePotential) : '₹0'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-[11px]">Break-Even:</span>
                    <span className="font-bold text-slate-900">
                      {opt.breakEvenMonths > 0 ? `${opt.breakEvenMonths} Mo` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-[11px]">Risk Index:</span>
                    <span
                      className={`font-bold ${
                        opt.riskScore > 50 ? 'text-rose-700' : 'text-emerald-700'
                      }`}
                    >
                      {opt.riskScore}/100
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 text-[11px]">Conviction:</span>
                    <span className="font-bold text-indigo-700">{opt.convictionScore}%</span>
                  </div>
                </div>

                {/* Monte Carlo Spread (P10 / P50 / P90) */}
                <div className="rounded-lg bg-slate-50 p-2.5 text-[10px] font-mono space-y-1 mb-3">
                  <span className="text-slate-400 font-bold uppercase tracking-wider block">
                    Multiverse Outcomes
                  </span>
                  <div className="flex justify-between text-rose-700">
                    <span>P10 Worst:</span>
                    <span className="font-semibold">{opt.monteCarloOutcomes.p10WorstCase}</span>
                  </div>
                  <div className="flex justify-between text-slate-800">
                    <span>P50 Base:</span>
                    <span className="font-semibold">{opt.monteCarloOutcomes.p50Expected}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>P90 Bull:</span>
                    <span className="font-semibold">{opt.monteCarloOutcomes.p90BestCase}</span>
                  </div>
                </div>

                {/* Key Strategic Dependencies */}
                <div className="text-[11px] mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                    Dependencies
                  </span>
                  <ul className="space-y-1 text-slate-600 pl-3 list-disc">
                    {opt.criticalDependencies.map((dep, i) => (
                      <li key={i}>{dep}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Tradeoff Summary */}
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-700 italic bg-white/80 p-2 rounded">
                "{opt.strategicTradeoff}"
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
