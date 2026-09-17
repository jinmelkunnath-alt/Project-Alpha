import { useState, useMemo } from 'react';
import {
  getMonitoredDecisions,
  addDecisionToMonitoring,
  type MonitoredDecision,
} from '../data/monitoredDecisions';
import {
  IconActivity,
  IconShieldLine,
  IconGlobe,
  IconTrendUp,
  IconSearch,
  IconPlus,
  IconCheck,
  IconArrowUp,
  IconLayers,
  IconAlert,
  IconScale,
  IconSparkle,
} from './icons';
import { AnimatedShinyButton } from './eldoraui/animated-shiny-button';

export default function MonitoredDecisionCards() {
  const [decisions, setDecisions] = useState<MonitoredDecision[]>(() => getMonitoredDecisions());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'alert' | 'high' | 'gtm' | 'infra'>('all');
  const [activeTabByCard, setActiveTabByCard] = useState<Record<string, 'risks' | 'sources' | 'improvements' | 'telemetry'>>({});
  const [stressTestingId, setStressTestingId] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');

  // Filtered decisions
  const filtered = useMemo(() => {
    return decisions.filter((d) => {
      const matchesSearch =
        d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.newRisks.some((r) => r.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        d.sources.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      if (selectedFilter === 'alert') return d.status === 'Alert Triggered';
      if (selectedFilter === 'high') return d.confidence >= 75;
      if (selectedFilter === 'gtm') return d.category.includes('Market') || d.category.includes('Expansion');
      if (selectedFilter === 'infra') return d.category.includes('Infrastructure') || d.category.includes('M&A');
      return true;
    });
  }, [decisions, searchQuery, selectedFilter]);

  // Handle stress test simulation
  function triggerStressTest(id: string) {
    setStressTestingId(id);
    setTimeout(() => {
      setStressTestingId(null);
      setDecisions((prev) =>
        prev.map((d) => {
          if (d.id === id) {
            return {
              ...d,
              telemetry: {
                ...d.telemetry,
                lastAudit: 'Just now (Red-Team Verified)',
                signalsToday: d.telemetry.signalsToday + 45,
              },
            };
          }
          return d;
        })
      );
    }, 1800);
  }

  function handleCreateDecision(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const created = addDecisionToMonitoring(newTitle.trim(), newSummary.trim() || undefined);
    setDecisions(getMonitoredDecisions());
    setNewTitle('');
    setNewSummary('');
    setShowAddModal(false);
  }

  const getActiveTab = (id: string) => activeTabByCard[id] || 'risks';
  const setActiveTab = (id: string, tab: 'risks' | 'sources' | 'improvements' | 'telemetry') => {
    setActiveTabByCard((prev) => ({ ...prev, [id]: tab }));
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-slate-200/80 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-700">
              24/7 Continuous Autonomous Radar
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Decisions Under 24/7 Monitoring
          </h1>
          <p className="mt-1.5 text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">
            Live cognitive telemetry stress-testing external signals, market drift, regulatory filings, and hidden assumption traps around your registered strategic commitments.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <AnimatedShinyButton onClick={() => setShowAddModal(true)}>
            <IconPlus size={15} />
            <span>Register New Decision</span>
          </AnimatedShinyButton>
        </div>
      </div>

      {/* Global Intelligence Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Registered</span>
            <span className="p-1 rounded-lg bg-emerald-50 text-emerald-700">
              <IconLayers size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">{decisions.length}</p>
          <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">● 100% active telemetry</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Avg Conviction</span>
            <span className="p-1 rounded-lg bg-blue-50 text-blue-700">
              <IconScale size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {Math.round(decisions.reduce((acc, d) => acc + d.confidence, 0) / decisions.length)}%
          </p>
          <p className="text-[11px] text-slate-500 font-medium mt-0.5">Bayesian confidence score</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Active Signals</span>
            <span className="p-1 rounded-lg bg-teal-50 text-teal-700">
              <IconActivity size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-slate-900">
            {decisions.reduce((acc, d) => acc + d.sources.length, 0)}
          </p>
          <p className="text-[11px] text-teal-700 font-semibold mt-0.5">Live verified feeds</p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">New Risks Flagged</span>
            <span className="p-1 rounded-lg bg-rose-50 text-rose-700">
              <IconAlert size={15} />
            </span>
          </div>
          <p className="mt-2 text-2xl font-bold text-rose-600">
            {decisions.reduce((acc, d) => acc + d.newRisks.length, 0)}
          </p>
          <p className="text-[11px] text-rose-600 font-semibold mt-0.5">Requires executive action</p>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <IconSearch size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search registered decisions, risks, sources..."
            className="w-full rounded-full border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
          {[
            { id: 'all', label: `All (${decisions.length})` },
            { id: 'alert', label: 'Alert Triggered', alert: true },
            { id: 'high', label: 'High Confidence' },
            { id: 'gtm', label: 'GTM & Expansion' },
            { id: 'infra', label: 'Capex & Infrastructure' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id as any)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                selectedFilter === tab.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards List */}
      <div className="space-y-6">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 p-12 text-center">
            <IconSearch size={28} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-base font-bold text-slate-800">No matching monitored decisions</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Try adjusting your search terms or filter settings to view your monitored commitments.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="mt-4 text-xs font-semibold text-emerald-700 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map((decision) => {
            const activeTab = getActiveTab(decision.id);
            const isStressTesting = stressTestingId === decision.id;

            return (
              <div
                key={decision.id}
                className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-7 shadow-sm transition-all duration-200 hover:border-slate-300 hover:shadow-md"
              >
                {/* Decision Header */}
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 border-b border-slate-100 pb-5">
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                        {decision.category}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="text-xs text-slate-500 font-medium">{decision.domain}</span>
                      <span className="text-slate-300">•</span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            decision.status === 'Alert Triggered'
                              ? 'bg-amber-500 pulse-dot'
                              : 'bg-emerald-600 pulse-dot'
                          }`}
                        />
                        <span
                          className={`text-xs font-bold ${
                            decision.status === 'Alert Triggered' ? 'text-amber-700' : 'text-emerald-700'
                          }`}
                        >
                          {decision.status}
                        </span>
                      </div>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {decision.title}
                    </h2>

                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-4xl font-normal">
                      {decision.summary}
                    </p>
                  </div>

                  <div className="flex items-center lg:flex-col lg:items-end gap-2 text-right shrink-0">
                    <span className="text-[11px] font-medium text-slate-400">{decision.registeredAt}</span>
                    <button
                      type="button"
                      disabled={isStressTesting}
                      onClick={() => triggerStressTest(decision.id)}
                      className="group flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900 transition-all disabled:opacity-50"
                    >
                      {isStressTesting ? (
                        <>
                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
                          <span>Simulating Multi-Agent Debate...</span>
                        </>
                      ) : (
                        <>
                          <IconSparkle size={13} className="text-emerald-600 transition-transform group-hover:scale-110" />
                          <span>Trigger Stress-Test</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Core Quantitative Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 my-5">
                  {/* Confidence */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Current Confidence</span>
                      <span
                        className={`font-bold flex items-center gap-0.5 text-[11px] ${
                          decision.confidenceDelta >= 0 ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {decision.confidenceDelta >= 0 ? '↑' : '↓'}
                        {Math.abs(decision.confidenceDelta)}%
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">{decision.confidence}%</span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase">Conviction</span>
                    </div>
                    {/* Visual Progress Meter */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          decision.confidence >= 75 ? 'bg-emerald-600' : 'bg-amber-500'
                        }`}
                        style={{ width: `${decision.confidence}%` }}
                      />
                    </div>
                  </div>

                  {/* Probability Breakdown */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Success Probability</span>
                      <span className="text-[10px] font-bold text-emerald-700 uppercase">Monte Carlo</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-emerald-700">
                        {decision.probabilitySuccess}%
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        vs {decision.probabilityDownside}% trap
                      </span>
                    </div>
                    {/* Stacked probability bar */}
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 flex">
                      <div
                        className="h-full bg-emerald-600"
                        style={{ width: `${decision.probabilitySuccess}%` }}
                        title={`Success: ${decision.probabilitySuccess}%`}
                      />
                      <div
                        className="h-full bg-amber-400"
                        style={{ width: `${decision.probabilityNeutral}%` }}
                        title={`Neutral: ${decision.probabilityNeutral}%`}
                      />
                      <div
                        className="h-full bg-rose-500"
                        style={{ width: `${decision.probabilityDownside}%` }}
                        title={`Downside Risk: ${decision.probabilityDownside}%`}
                      />
                    </div>
                  </div>

                  {/* Live Risks */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>New Risks Detected</span>
                      <span className="rounded-full bg-rose-100 text-rose-700 px-1.5 py-0.2 text-[10px] font-bold">
                        {decision.newRisks.filter((r) => r.severity === 'Critical' || r.severity === 'High').length} High
                      </span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">{decision.newRisks.length}</span>
                      <span className="text-[11px] text-slate-500 font-medium">signals flagged</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5 truncate">
                      Latest: {decision.newRisks[0]?.detectedAt || 'No active risks'}
                    </p>
                  </div>

                  {/* Active Sources */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                      <span>Verified Sources</span>
                      <span className="text-[10px] text-emerald-700 font-bold uppercase">All Active</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-black text-slate-900">{decision.sources.length}</span>
                      <span className="text-[11px] text-slate-500 font-medium">continuous feeds</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1.5 truncate">
                      Synced {decision.sources[0]?.lastSync || 'recently'}
                    </p>
                  </div>
                </div>

                {/* Sub-Section Navigation Tabs */}
                <div className="border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-1.5 border-b border-slate-200/80 mb-4 overflow-x-auto pb-1">
                    {[
                      {
                        key: 'risks',
                        label: `New Risks (${decision.newRisks.length})`,
                        icon: IconShieldLine,
                        badge: decision.newRisks.some((r) => r.severity === 'Critical') ? 'Critical' : undefined,
                      },
                      {
                        key: 'sources',
                        label: `Sources & Feeds (${decision.sources.length})`,
                        icon: IconGlobe,
                      },
                      {
                        key: 'improvements',
                        label: `Improvements & Actions (${decision.improvements.length})`,
                        icon: IconTrendUp,
                      },
                      {
                        key: 'telemetry',
                        label: 'Telemetry & Drift',
                        icon: IconActivity,
                      },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        type="button"
                        onClick={() => setActiveTab(decision.id, tab.key as any)}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-[5px] shrink-0 ${
                          activeTab === tab.key
                            ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50 rounded-t-lg'
                            : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-t-lg'
                        }`}
                      >
                        <tab.icon size={14} />
                        <span>{tab.label}</span>
                        {tab.badge && (
                          <span className="rounded-full bg-rose-500 text-white px-1.5 py-0.2 text-[9px] font-bold">
                            {tab.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content 1: Live New Risks */}
                  {activeTab === 'risks' && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      {decision.newRisks.map((risk) => (
                        <div
                          key={risk.id}
                          className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition-colors hover:bg-slate-50"
                        >
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                                  risk.severity === 'Critical'
                                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                                    : risk.severity === 'High'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                    : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                }`}
                              >
                                {risk.severity} Risk
                              </span>
                              <span className="text-xs font-bold text-slate-900">{risk.title}</span>
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed">{risk.description}</p>
                            <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-400">
                              <span>Source: <strong className="text-slate-600">{risk.source}</strong></span>
                              <span>•</span>
                              <span>Detected: {risk.detectedAt}</span>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-2 self-end sm:self-center">
                            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                              Red-Team Alert Armed
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab Content 2: Monitored Sources */}
                  {activeTab === 'sources' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in duration-150">
                      {decision.sources.map((source) => (
                        <div
                          key={source.id}
                          className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 hover:border-slate-300 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                              {source.type}
                            </span>
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 pulse-dot" />
                              {source.status}
                            </span>
                          </div>
                          <h4 className="mt-2 text-xs font-bold text-slate-900 leading-snug">{source.name}</h4>
                          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-200/60 pt-2">
                            <span>{source.itemCount} items parsed</span>
                            <span>Sync: {source.lastSync}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab Content 3: Recommended Improvements */}
                  {activeTab === 'improvements' && (
                    <div className="space-y-2.5 animate-in fade-in duration-150">
                      {decision.improvements.map((imp) => (
                        <div
                          key={imp.id}
                          className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="rounded-full bg-emerald-600 text-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                                  {imp.category}
                                </span>
                                <h4 className="text-xs font-bold text-slate-900">{imp.action}</h4>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed mt-1">
                                {imp.detail}
                              </p>
                            </div>
                            <span className="shrink-0 text-[11px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-1 rounded-md">
                              {imp.impact} Impact
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab Content 4: Telemetry & Drift */}
                  {activeTab === 'telemetry' && (
                    <div className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4.5 animate-in fade-in duration-150">
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium">Continuous Telemetry</p>
                          <p className="mt-1 text-base font-bold text-slate-900">{decision.telemetry.latencyMs} ms</p>
                          <p className="text-[10px] text-emerald-700 font-semibold">Real-time edge latency</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">Signals Evaluated Today</p>
                          <p className="mt-1 text-base font-bold text-slate-900">{decision.telemetry.signalsToday}</p>
                          <p className="text-[10px] text-slate-500">Autonomous news & filings</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">Decision Drift Factor</p>
                          <p className="mt-1 text-base font-bold text-slate-900">{decision.telemetry.driftScore}</p>
                          <p className="text-[10px] text-emerald-700 font-semibold">Low volatility</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium">Last Formal Verification</p>
                          <p className="mt-1 text-base font-bold text-slate-900">{decision.telemetry.lastAudit}</p>
                          <p className="text-[10px] text-slate-500">Automated multi-agent pass</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Register New Decision for 24/7 Monitoring */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="absolute right-5 top-5 rounded-full border border-slate-200 bg-slate-50 p-1.5 text-slate-500 hover:text-slate-900"
            >
              ✕
            </button>

            <div className="flex items-center gap-2.5 text-emerald-700 mb-2">
              <IconShieldLine size={24} />
              <span className="text-xs font-bold tracking-wider uppercase">Project Alpha 24/7 Radar</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
              Register Decision for 24/7 Monitoring
            </h3>
            <p className="mt-1 text-xs text-slate-500 leading-relaxed font-medium">
              Alpha will continuously monitor global news, SEC filings, regulatory bulletins, and market sentiment to warn you of assumption decay and emerging traps.
            </p>

            <form onSubmit={handleCreateDecision} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Decision Title / Hypothesis *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Expand manufacturing into Southeast Asia in Q2 2027"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Context & Core Assumptions (Optional)
                </label>
                <textarea
                  rows={3}
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Key stakes, capital commitment, competitor signals, or constraints to monitor..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary text-xs font-semibold px-5 py-2.5"
                >
                  Activate 24/7 Monitoring
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
