import React, { useState } from 'react';
import MonitoredDecisionCards from '../components/MonitoredDecisionCards';
import KillSwitchCard from '../components/engines/KillSwitchCard';
import ImpactChainCard from '../components/engines/ImpactChainCard';
import { IconActivity, IconAlert } from '../components/icons';

type MonitoringView = 'radar' | 'killswitches' | 'impactchain';

export default function Monitoring() {
  const [view, setView] = useState<MonitoringView>('radar');

  return (
    <div className="py-2 pb-14 animate-in fade-in duration-300 space-y-6">
      {/* Sub-navigation bar for 24/7 Monitoring */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-600" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-800">
              Master 24/7 Decision Telemetry
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Autonomous Decision Radar & Incident Response
          </h1>
        </div>

        {/* View Switcher Pills */}
        <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white p-1 shadow-2xs">
          <button
            type="button"
            onClick={() => setView('radar')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              view === 'radar'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>📡</span>
            <span>24/7 Radar Stream</span>
          </button>

          <button
            type="button"
            onClick={() => setView('impactchain')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              view === 'impactchain'
                ? 'bg-indigo-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⚡</span>
            <span>Impact Chain Cascade</span>
          </button>

          <button
            type="button"
            onClick={() => setView('killswitches')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
              view === 'killswitches'
                ? 'bg-rose-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🛑</span>
            <span>Kill-Switch Tripwires</span>
          </button>
        </div>
      </div>

      {/* Main View Port */}
      <div>
        {view === 'radar' && <MonitoredDecisionCards />}
        {view === 'impactchain' && <ImpactChainCard />}
        {view === 'killswitches' && <KillSwitchCard />}
      </div>
    </div>
  );
}
