import React, { useState } from 'react';
import DecisionVisualReport from '../components/DecisionVisualReport';
import FinancialViabilityCard from '../components/engines/FinancialViabilityCard';
import SensitivityWhatIfCard from '../components/engines/SensitivityWhatIfCard';
import EvidenceProvenanceCard from '../components/engines/EvidenceProvenanceCard';
import DecisionTimelineCard from '../components/engines/DecisionTimelineCard';
import ReAnalysisCard from '../components/engines/ReAnalysisCard';
import KillSwitchCard from '../components/engines/KillSwitchCard';
import ImpactChainCard from '../components/engines/ImpactChainCard';
import DecisionComparisonCard from '../components/engines/DecisionComparisonCard';
import DecisionAutopsyCard from '../components/engines/DecisionAutopsyCard';
import ExecutiveBriefCard from '../components/engines/ExecutiveBriefCard';
import {
  IconSparkle,
  IconTrendUp,
  IconRupee,
  IconScale,
  IconDocument,
  IconClock,
  IconAlert,
  IconActivity,
  IconFlask,
  IconAlphaEmblem,
} from '../components/icons';

type InsightsTab =
  | 'brief'
  | 'visual-report'
  | 'financial'
  | 'sensitivity'
  | 'evidence'
  | 'timeline'
  | 'reanalysis'
  | 'killswitches'
  | 'impactchain'
  | 'comparison'
  | 'autopsy';

export default function Insights() {
  const [activeTab, setActiveTab] = useState<InsightsTab>('brief');

  const tabs: Array<{ id: InsightsTab; label: string; icon: string; category?: string }> = [
    { id: 'brief', label: 'Executive Brief', icon: '📋' },
    { id: 'visual-report', label: 'Past, Present & Future Curves', icon: '📊' },
    { id: 'financial', label: 'Financial Viability', icon: '💼' },
    { id: 'sensitivity', label: 'Sensitivity / What-If', icon: '🎚️' },
    { id: 'evidence', label: 'Evidence & Conflicts', icon: '📑' },
    { id: 'timeline', label: 'Decision Memory & Timeline', icon: '⏱️' },
    { id: 'reanalysis', label: 'Re-Analysis ("RE-RUN")', icon: '🔄' },
    { id: 'killswitches', label: 'Kill-Switches', icon: '🛑' },
    { id: 'impactchain', label: 'Impact Chain', icon: '📡' },
    { id: 'comparison', label: 'Decision Comparison', icon: '⚖️' },
    { id: 'autopsy', label: 'Decision Autopsy', icon: '🔬' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-16 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200/80 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-lg bg-emerald-50 text-emerald-700">
              <IconSparkle size={15} />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-800">
              Strategic Decision Intelligence Platform
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Executive Decision Intelligence Suite
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium max-w-3xl leading-relaxed">
            Multi-engine executive suite: Financial viability models, live sensitivity what-if sliders, verified evidence provenance, kill-switch tripwires, and 30-second briefings.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 self-start sm:self-auto">
          <span className="h-2 w-2 rounded-full bg-emerald-600 pulse-dot" />
          <span className="font-mono">11 Modular Engines Active</span>
        </div>
      </div>

      {/* Navigation Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-100 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap rounded-xl px-3 py-2 text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-800'
                  : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Viewport */}
      <div className="space-y-6">
        {activeTab === 'brief' && <ExecutiveBriefCard />}
        {activeTab === 'visual-report' && <DecisionVisualReport />}
        {activeTab === 'financial' && <FinancialViabilityCard />}
        {activeTab === 'sensitivity' && <SensitivityWhatIfCard />}
        {activeTab === 'evidence' && <EvidenceProvenanceCard />}
        {activeTab === 'timeline' && <DecisionTimelineCard />}
        {activeTab === 'reanalysis' && <ReAnalysisCard />}
        {activeTab === 'killswitches' && <KillSwitchCard />}
        {activeTab === 'impactchain' && <ImpactChainCard />}
        {activeTab === 'comparison' && <DecisionComparisonCard />}
        {activeTab === 'autopsy' && <DecisionAutopsyCard />}
      </div>
    </div>
  );
}
