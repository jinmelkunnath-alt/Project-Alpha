import React, { useState } from 'react';
import type {
  FinancialViabilityModel,
  FinancialScenarioType,
} from '../../services/engines/types';
import {
  buildFinancialViabilityModel,
  formatFinancialValue,
} from '../../services/engines/financialEngine';
import { IconTrendUp, IconRupee, IconAlert } from '../icons';

interface FinancialViabilityCardProps {
  initialModel?: FinancialViabilityModel;
  compact?: boolean;
}

export default function FinancialViabilityCard({
  initialModel,
  compact = false,
}: FinancialViabilityCardProps) {
  const [model] = useState<FinancialViabilityModel>(
    () => initialModel || buildFinancialViabilityModel()
  );
  const [selectedScenario, setSelectedScenario] = useState<FinancialScenarioType>('expected');
  const [selectedHorizon, setSelectedHorizon] = useState<'12m' | '24m' | '36m'>('24m');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  const scenario = model.scenarios[selectedScenario];
  const currency = model.currency;

  const trajectory =
    selectedHorizon === '12m'
      ? scenario.projections12m
      : selectedHorizon === '24m'
      ? scenario.projections24m
      : scenario.projections36m;

  // Chart dimensions & scaling
  const maxRevenue = Math.max(...trajectory.map((p) => p.revenue), 10000);
  const maxCost = Math.max(...trajectory.map((p) => p.operatingCost), 10000);
  const chartMax = Math.max(maxRevenue, maxCost) * 1.15;

  const svgWidth = 720;
  const svgHeight = 220;
  const paddingX = 45;
  const paddingY = 25;
  const plotWidth = svgWidth - paddingX * 2;
  const plotHeight = svgHeight - paddingY * 2;

  // Points for Revenue & Cost curves
  const revPoints = trajectory.map((p, idx) => {
    const x = paddingX + (idx / (trajectory.length - 1)) * plotWidth;
    const y = svgHeight - paddingY - (p.revenue / chartMax) * plotHeight;
    return { x, y, val: p.revenue, month: p.month };
  });

  const costPoints = trajectory.map((p, idx) => {
    const x = paddingX + (idx / (trajectory.length - 1)) * plotWidth;
    const y = svgHeight - paddingY - (p.operatingCost / chartMax) * plotHeight;
    return { x, y, val: p.operatingCost, month: p.month };
  });

  const revPath = revPoints.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`),
    ''
  );
  const costPath = costPoints.reduce(
    (acc, pt, i) => (i === 0 ? `M ${pt.x},${pt.y}` : `${acc} L ${pt.x},${pt.y}`),
    ''
  );
  const revArea = `${revPath} L ${revPoints[revPoints.length - 1].x},${svgHeight - paddingY} L ${revPoints[0].x},${svgHeight - paddingY} Z`;

  // Dynamically calculate metrics for the active horizon selection (12m, 24m, 36m)
  const horizonRevenue = trajectory.reduce((acc, curr) => acc + curr.revenue, 0);
  const horizonProfitLoss = trajectory.reduce((acc, curr) => acc + curr.grossProfit, 0);
  const horizonRoi =
    model.setupCost > 0
      ? Math.round(((horizonProfitLoss - model.setupCost) / model.setupCost) * 100)
      : 0;

  const hoveredData = hoveredMonth !== null ? trajectory.find((t) => t.month === hoveredMonth) : null;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
              <IconRupee size={15} />
            </span>
            <h3 className="text-base font-bold text-slate-900 tracking-tight">
              Financial Viability Engine
            </h3>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-600">
              Mathematical Model
            </span>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Empirical baseline simulation for business setup, operating run-rate, and break-even trajectories.
          </p>
        </div>

        {/* Disclaimer Notice */}
        <div className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50/70 px-3 py-1.5 text-[11px] text-amber-800 shrink-0">
          <IconAlert size={13} className="shrink-0 text-amber-600" />
          <span>Probabilistic Scenario Estimates</span>
        </div>
      </div>

      {/* Scenario & Horizon Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        {/* Scenarios: Conservative, Expected, Optimistic */}
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1">
          {(['conservative', 'expected', 'optimistic'] as FinancialScenarioType[]).map((sc) => {
            const active = selectedScenario === sc;
            return (
              <button
                key={sc}
                type="button"
                onClick={() => setSelectedScenario(sc)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
                  active
                    ? 'bg-white text-emerald-900 shadow-xs border border-emerald-300 font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {sc === 'conservative' && '🛡️ Conservative'}
                {sc === 'expected' && '⚖️ Expected'}
                {sc === 'optimistic' && '🚀 Optimistic'}
              </button>
            );
          })}
        </div>

        {/* Horizon: 12m, 24m, 36m */}
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1">
          {(['12m', '24m', '36m'] as const).map((h) => {
            const active = selectedHorizon === h;
            return (
              <button
                key={h}
                type="button"
                onClick={() => setSelectedHorizon(h)}
                className={`rounded-lg px-3 py-1 text-xs font-mono font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {h} Horizon
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Content Wrapper for Smooth Transitions */}
      <div key={`${selectedScenario}-${selectedHorizon}`} className="animate-in fade-in duration-200">
        {/* Key Metric KPI Cards Grid — Fully Responsive, zero horizontal scroll breaking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-6">
          {/* 1. Setup Cost */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Estimated Setup Cost
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 font-mono mt-1 block truncate">
                {formatFinancialValue(model.setupCost, currency)}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block truncate">Initial CapEx & Hardware</span>
          </div>

          {/* 2. Monthly OpEx & Revenue */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Monthly Run-Rate
              </span>
              <div className="mt-1 font-mono leading-tight">
                <div className="text-xs sm:text-sm font-bold text-emerald-700 truncate">
                  Rev: {formatFinancialValue(scenario.monthlyRevenue, currency)}
                </div>
                <div className="text-xs text-slate-600 font-medium truncate mt-0.5">
                  Cost: {formatFinancialValue(scenario.monthlyOperatingCost, currency)}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block truncate">Month 1 Baseline</span>
          </div>

          {/* 3. Monthly & Horizon Profit/Loss — Dynamically updates with Horizon */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Net P&L ({selectedHorizon.toUpperCase()})
              </span>
              <span
                className={`text-base sm:text-lg font-bold font-mono mt-1 block truncate ${
                  horizonProfitLoss >= 0 ? 'text-emerald-700' : 'text-rose-700'
                }`}
              >
                {formatFinancialValue(horizonProfitLoss, currency)}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block truncate">
              Cum. Rev: {formatFinancialValue(horizonRevenue, currency)}
            </span>
          </div>

          {/* 4. Break-even & Payback */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Break-Even Point
              </span>
              <span className="text-base sm:text-lg font-bold text-indigo-900 font-mono mt-1 block truncate">
                {scenario.breakEvenMonth ? `Month ${scenario.breakEvenMonth}` : '> 36 Months'}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block truncate">
              Payback: {scenario.paybackPeriodMonths ? `Mo ${scenario.paybackPeriodMonths}` : 'Extended'}
            </span>
          </div>

          {/* 5. Runway & Horizon ROI — Dynamically updates with Horizon without overflowing */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                Runway & {selectedHorizon.toUpperCase()} ROI
              </span>
              <div className="mt-1 font-mono">
                <span className="text-sm sm:text-base font-bold text-slate-900 block truncate">
                  {scenario.runwayMonths >= 999 ? 'Sustainable' : `${scenario.runwayMonths} Mo Runway`}
                </span>
                <span className={`text-xs font-bold block mt-0.5 ${horizonRoi >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                  ({horizonRoi > 0 ? '+' : ''}{horizonRoi}% ROI)
                </span>
              </div>
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block truncate">From ₹75L cash reserves</span>
          </div>
        </div>

        {/* Trajectory Projection SVG Chart */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/40 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-700">Projected Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-slate-400 shrink-0" />
                <span className="font-semibold text-slate-700">Operating Cost</span>
              </div>
              {scenario.breakEvenMonth && scenario.breakEvenMonth <= trajectory.length && (
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-600 shrink-0 animate-ping" />
                  <span className="font-bold text-indigo-800">★ Break-Even (Month {scenario.breakEvenMonth})</span>
                </div>
              )}
            </div>
          </div>

          {/* Fixed Height Tooltip Header — Prevents graph shaking or layout jumping on hover */}
          <div className="h-8 mb-3 px-3 flex items-center justify-between rounded-lg bg-white border border-slate-200/80 text-xs font-mono shadow-2xs overflow-hidden">
            {hoveredData ? (
              <div className="flex items-center gap-2 sm:gap-3 truncate w-full">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                  Month {hoveredData.month}
                </span>
                <span className="text-slate-600 truncate">
                  Rev: <strong className="text-emerald-700">{formatFinancialValue(hoveredData.revenue, currency)}</strong>
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-slate-600 truncate hidden sm:inline">
                  Cost: <strong className="text-slate-700">{formatFinancialValue(hoveredData.operatingCost, currency)}</strong>
                </span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-slate-600 truncate">
                  Net: <strong className={hoveredData.grossProfit >= 0 ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}>
                    {formatFinancialValue(hoveredData.grossProfit, currency)}
                  </strong>
                </span>
              </div>
            ) : (
              <span className="text-slate-500 font-normal flex items-center gap-1.5 text-[11px] truncate">
                <span>📊</span>
                <span className="truncate">Hover over graph data points to inspect monthly revenue & cost breakdown.</span>
              </span>
            )}
          </div>

          {/* SVG Curve Display — Fluid, smooth SVG without hover shaking */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-48 sm:h-56 select-none overflow-visible"
            >
              <defs>
                <linearGradient id="finRevArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#059669" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Horizontal Grid lines */}
              {[0.25, 0.5, 0.75, 1.0].map((ratio) => {
                const y = svgHeight - paddingY - ratio * plotHeight;
                return (
                  <line
                    key={ratio}
                    x1={paddingX}
                    y1={y}
                    x2={svgWidth - paddingX}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}

              {/* Area fill for revenue */}
              <path d={revArea} fill="url(#finRevArea)" />

              {/* Revenue Line */}
              <path
                d={revPath}
                fill="none"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* Cost Line */}
              <path
                d={costPath}
                fill="none"
                stroke="#64748b"
                strokeWidth="2"
                strokeDasharray="5 4"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              {/* Break-even vertical tripwire marker */}
              {scenario.breakEvenMonth && scenario.breakEvenMonth <= trajectory.length && (
                (() => {
                  const beIdx = scenario.breakEvenMonth - 1;
                  const beX = paddingX + (beIdx / (trajectory.length - 1)) * plotWidth;
                  return (
                    <g pointerEvents="none">
                      <line
                        x1={beX}
                        y1={paddingY}
                        x2={beX}
                        y2={svgHeight - paddingY}
                        stroke="#4f46e5"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                        vectorEffect="non-scaling-stroke"
                      />
                      <circle cx={beX} cy={svgHeight - paddingY} r="4" fill="#4f46e5" />
                      <text
                        x={beX}
                        y={paddingY - 8}
                        textAnchor="middle"
                        className="text-[9px] font-mono font-bold fill-indigo-800"
                      >
                        BREAK-EVEN (M{scenario.breakEvenMonth})
                      </text>
                    </g>
                  );
                })()
              )}

              {/* Interactive Data Points */}
              {revPoints.map((pt) => {
                const isHovered = hoveredMonth === pt.month;
                return (
                  <g
                    key={pt.month}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredMonth(pt.month)}
                    onMouseLeave={() => setHoveredMonth(null)}
                  >
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? 5.5 : 3.5}
                      fill="#059669"
                      stroke="#ffffff"
                      strokeWidth={isHovered ? 2 : 1}
                    />
                    {/* Invisible broad hover zone */}
                    <rect
                      x={pt.x - 12}
                      y={paddingY}
                      width={24}
                      height={plotHeight}
                      fill="transparent"
                    />
                    {/* Month axis label */}
                    {(pt.month === 1 || pt.month % 3 === 0 || pt.month === trajectory.length) && (
                      <text
                        x={pt.x}
                        y={svgHeight - paddingY + 16}
                        textAnchor="middle"
                        className="text-[9px] font-mono fill-slate-500"
                      >
                        M{pt.month}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
