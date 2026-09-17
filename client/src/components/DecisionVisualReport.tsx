import { useState } from 'react';
import {
  IconTrendUp,
  IconScale,
  IconShieldLine,
  IconGlobe,
  IconActivity,
  IconCheck,
  IconAlert,
  IconSparkle,
  IconArrowRight,
  IconLayers,
  IconClock,
} from './icons';

export interface DecisionProfile {
  id: string;
  title: string;
  domain: string;
  category: string;
  verdict: 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT';
  convictionScore: number;
  executiveSummary: string;
  // Past, Present, Future data
  past: {
    period: string;
    headline: string;
    precedentsCount: number;
    baselineInsight: string;
    historicalWinRate: number;
    keyLesson: string;
  };
  present: {
    period: string;
    headline: string;
    evidenceStrength: number;
    activeVulnerabilities: number;
    criticalRealityCheck: string;
    immediateAction: string;
  };
  future: {
    period: string;
    headline: string;
    probabilitySuccess: number;
    bullTarget: string;
    baseTarget: string;
    bearTrap: string;
    killSwitch: string;
  };
  // Trajectory forecast coordinates for SVG (2024 to 2030)
  timelinePoints: {
    year: string;
    phase: 'Past' | 'Present' | 'Future';
    bull: number; // 0 - 100
    base: number; // 0 - 100
    bear: number; // 0 - 100
    label: string;
  }[];
  // Risk pie chart segments
  riskDistribution: {
    name: string;
    percentage: number;
    color: string;
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    description: string;
  }[];
  // Capital / resource allocation pie chart
  allocationDistribution: {
    name: string;
    percentage: number;
    color: string;
    rationale: string;
  }[];
  payoffMetrics: {
    upsideRatio: string;
    downsideFloor: string;
    paybackMonths: number;
    convexityType: string;
  };
}

export const PRECONFIGURED_REPORTS: DecisionProfile[] = [
  {
    id: 'report-copilot-q4',
    title: 'Enterprise AI Decision Copilot Q4 Launch: Risk Runway vs. First-Mover Advantage',
    domain: 'Enterprise B2B SaaS / Cognitive OS',
    category: 'Go-To-Market Strategy',
    verdict: 'CONDITIONAL GO',
    convictionScore: 86,
    executiveSummary:
      'Launching in Q4 captures $12M ARR early pipeline before incumbents bundle generic assistants. Cash runway remains elastic under a phased pilot conversion model.',
    past: {
      period: '2024–2025 Baseline Ground Truth',
      headline: '42 Historical Precedents Analyzed',
      precedentsCount: 42,
      baselineInsight:
        'In enterprise SaaS platform shifts, vendors that waited for feature parity lost 64% of Fortune 500 design pipeline to aggressive first movers.',
      historicalWinRate: 71,
      keyLesson:
        'Early adopters buy into the strategic conviction and feedback loop, not polished perfection. Delaying launch is more lethal than shipping a focused v1.',
    },
    present: {
      period: '2026 Present Reality Check',
      headline: 'Current Stress-Test Diagnostic',
      evidenceStrength: 88,
      activeVulnerabilities: 2,
      criticalRealityCheck:
        'Current cash runway supports 14 months of unhedged burn. Inference compute costs will spike without upfront customer deposit commitments.',
      immediateAction:
        'Require $50K non-refundable pilot deposits from initial 15 enterprise design partners to self-fund dedicated GPU clusters.',
    },
    future: {
      period: '2027–2030 Horizon Prediction',
      headline: 'Probabilistic Multi-Scenario Trajectory',
      probabilitySuccess: 78.4,
      bullTarget: '$38M ARR by 2028 (Convex Market Leadership)',
      baseTarget: '$19.5M ARR by 2028 (Steady Enterprise Ramp)',
      bearTrap: 'Sub-65% pilot conversion causing $2.4M runway bleed',
      killSwitch: 'If fewer than 8 of 15 pilots convert by Day 90, halt broad marketing and pivot to channel integration.',
    },
    timelinePoints: [
      { year: '2024', phase: 'Past', bull: 22, base: 22, bear: 22, label: 'Historical industry average ARR baseline' },
      { year: '2025', phase: 'Past', bull: 34, base: 34, bear: 34, label: 'Pilot cohort initial demand signal' },
      { year: '2026', phase: 'Present', bull: 52, base: 50, bear: 46, label: 'Current Launch Inflection Point' },
      { year: '2027', phase: 'Future', bull: 74, base: 64, bear: 36, label: 'Design partner annual renewal cycle' },
      { year: '2028', phase: 'Future', bull: 90, base: 76, bear: 28, label: 'Scale tier commercial availability' },
      { year: '2030', phase: 'Future', bull: 98, base: 84, bear: 20, label: 'Terminal market valuation multiple' },
    ],
    riskDistribution: [
      { name: 'Competitive Discounting', percentage: 36, color: '#ef4444', severity: 'Critical', description: 'Incumbents discounting baseline copilots to retain seat licenses.' },
      { name: 'Procurement Drag', percentage: 28, color: '#f59e0b', severity: 'High', description: 'Enterprise SOC2 and legal security cycles averaging 75+ days in Q4.' },
      { name: 'Inference Unit Margin', percentage: 22, color: '#10b981', severity: 'Medium', description: 'Token volume spikes eroding gross margins before cache optimization.' },
      { name: 'Customer Churn Trap', percentage: 14, color: '#3b82f6', severity: 'Low', description: 'Early pilots failing to integrate into executive weekly workflows.' },
    ],
    allocationDistribution: [
      { name: 'Dedicated Inference Clusters', percentage: 42, color: '#059669', rationale: 'Guarantees sub-18ms latency SLA for executive stress testing.' },
      { name: 'Enterprise Pilot Enablement', percentage: 28, color: '#0284c7', rationale: 'White-glove onboarding for Fortune 500 pilot cohorts.' },
      { name: 'Adversarial Defense R&D', percentage: 18, color: '#6366f1', rationale: 'Multi-agent red teaming to maintain accuracy moat.' },
      { name: 'Kill-Switch Capital Reserve', percentage: 12, color: '#f43f5e', rationale: 'Emergency liquid reserve protecting baseline cash runway.' },
    ],
    payoffMetrics: {
      upsideRatio: '+4.4x',
      downsideFloor: '-1.0x (Pilot Hedged)',
      paybackMonths: 8.4,
      convexityType: 'Positive Asymmetric Skew',
    },
  },
  {
    id: 'report-eu-expansion',
    title: 'European Union Expansion for AI Platform under EU AI Act Regulations',
    domain: 'Legal Tech / Sovereign Cloud Compliance',
    category: 'Regulatory Expansion',
    verdict: 'PIVOT',
    convictionScore: 81,
    executiveSummary:
      'Direct subsidiary expansion into the EU introduces €650K in immediate compliance overhead. Recommending a strategic pivot to certified sovereign channel partnerships.',
    past: {
      period: '2023–2025 Regulatory Precedents',
      headline: '31 Cross-Border Expansion Audits',
      precedentsCount: 31,
      baselineInsight:
        'US AI firms attempting direct German/French expansion without sovereign local datacenters faced an average 11-month regulatory approval delay.',
      historicalWinRate: 42,
      keyLesson:
        'Regulatory friction cannot be solved by engineering alone; local sovereign hosting is mandatory for European enterprise contracts.',
    },
    present: {
      period: '2026 Compliance Reality Check',
      headline: 'EU AI Act Article 50 Enforcement',
      evidenceStrength: 92,
      activeVulnerabilities: 3,
      criticalRealityCheck:
        'Article 50 guidelines impose strict transparency logging and algorithmic auditing. Direct legal registration creates immediate audit exposure.',
      immediateAction:
        'Structure expansion via certified European distributor (OVHcloud/Hetzner hosting) to bypass direct entity establishment.',
    },
    future: {
      period: '2027–2030 Horizon Prediction',
      headline: 'Channel Partnership Payoff Curve',
      probabilitySuccess: 68.2,
      bullTarget: '€22M European ARR via Channel Consortium by 2028',
      baseTarget: '€11M European ARR with zero direct regulatory liability',
      bearTrap: '€1.2M GDPR penalty & market freeze under direct subsidiary route',
      killSwitch: 'If sovereign channel agreements are not signed within 120 days, reallocate expansion funds into domestic US enterprise sales.',
    },
    timelinePoints: [
      { year: '2024', phase: 'Past', bull: 18, base: 18, bear: 18, label: 'EU AI Act initial whitepaper baseline' },
      { year: '2025', phase: 'Past', bull: 28, base: 26, bear: 22, label: 'Compliance advisory audits' },
      { year: '2026', phase: 'Present', bull: 45, base: 40, bear: 25, label: 'Sovereign Channel Pivot Inflection' },
      { year: '2027', phase: 'Future', bull: 68, base: 56, bear: 20, label: 'DACH region enterprise distribution' },
      { year: '2028', phase: 'Future', bull: 82, base: 68, bear: 15, label: 'Pan-European sovereign deployment' },
      { year: '2030', phase: 'Future', bull: 92, base: 78, bear: 12, label: 'Standardized European decision OS' },
    ],
    riskDistribution: [
      { name: 'Regulatory Penalty Risk', percentage: 44, color: '#ef4444', severity: 'Critical', description: 'Up to 7% global turnover fines under non-compliant algorithmic transparency.' },
      { name: 'Data Residency Mandate', percentage: 26, color: '#f59e0b', severity: 'High', description: 'Frankfurt-only datacenter storage requirements.' },
      { name: 'Local Consortium Competition', percentage: 18, color: '#3b82f6', severity: 'Medium', description: 'Subsidized European models capturing regional government tenders.' },
      { name: 'Contract Currency Hedging', percentage: 12, color: '#10b981', severity: 'Low', description: 'Euro-dollar exchange rate volatility on multi-year renewals.' },
    ],
    allocationDistribution: [
      { name: 'Sovereign Cloud Infrastructure', percentage: 48, color: '#059669', rationale: 'Certified EU-native hosting and data isolation.' },
      { name: 'EU Regulatory Legal Advisory', percentage: 26, color: '#0284c7', rationale: 'Pre-clearing watermarking and bias audit criteria.' },
      { name: 'Channel Partner Incentives', percentage: 16, color: '#6366f1', rationale: 'Revenue-share agreements with tier-1 European integrators.' },
      { name: 'Compliance Reserve', percentage: 10, color: '#f43f5e', rationale: 'Dedicated fund for independent conformity audits.' },
    ],
    payoffMetrics: {
      upsideRatio: '+3.1x',
      downsideFloor: '-0.3x (Protected by Channel Pivot)',
      paybackMonths: 11.2,
      convexityType: 'Risk-Mitigated Strategic Arbitrage',
    },
  },
  {
    id: 'report-gpu-capex',
    title: 'Build In-House GPU Inference Cluster ($4.5M Capex) vs Third-Party Cloud APIs',
    domain: 'Infrastructure & Deep Learning Economics',
    category: 'Capital Allocation',
    verdict: 'GO',
    convictionScore: 92,
    executiveSummary:
      'Direct allocation into dedicated hardware yields a 64% unit margin advantage and amortizes to $0.0028/1k tokens over 24 months with 8.4-month payback.',
    past: {
      period: '2024–2025 Cloud API Spend Baseline',
      headline: 'Historical Inference Cost Curve',
      precedentsCount: 54,
      baselineInsight:
        'Companies relying on public cloud API tiers experienced 3.4x bill shocks once production token query volume crossed 50M requests/day.',
      historicalWinRate: 84,
      keyLesson:
        'At scale, hardware ownership is an insurmountable gross margin moat against competitors paying retail API markups.',
    },
    present: {
      period: '2026 Capex Inflection',
      headline: 'Payback Model Diagnostics',
      evidenceStrength: 95,
      activeVulnerabilities: 1,
      criticalRealityCheck:
        'Nvidia H200 cluster lead times have stretched to 22 weeks. A temporary reserved cloud buffer is required to prevent capacity starvation.',
      immediateAction:
        'Issue hardware PO with 36-month lease financing while securing 6-month reserved spot capacity.',
    },
    future: {
      period: '2027–2030 Horizon Prediction',
      headline: 'Compounding Unit Margin Superiority',
      probabilitySuccess: 84.5,
      bullTarget: '$8.2M Cumulative Net Savings by Month 24',
      baseTarget: '$5.4M Net Savings with 70% secondary hardware liquidation floor',
      bearTrap: 'Demand slowdown extending payback from 8.4 months to 20 months',
      killSwitch: 'Lease agreement includes residual value buyout clause allowing equipment return after month 24.',
    },
    timelinePoints: [
      { year: '2024', phase: 'Past', bull: 20, base: 20, bear: 20, label: 'Cloud API variable cost baseline' },
      { year: '2025', phase: 'Past', bull: 32, base: 32, bear: 32, label: 'Initial scale margin pressure' },
      { year: '2026', phase: 'Present', bull: 60, base: 58, bear: 48, label: 'Hardware Deployment Inflection' },
      { year: '2027', phase: 'Future', bull: 85, base: 78, bear: 45, label: 'Full 64% token unit cost savings' },
      { year: '2028', phase: 'Future', bull: 94, base: 88, bear: 40, label: 'Hardware fully amortized' },
      { year: '2030', phase: 'Future', bull: 99, base: 92, bear: 38, label: 'Next-gen compute upgrade rollover' },
    ],
    riskDistribution: [
      { name: 'Hardware Lead Time Delay', percentage: 40, color: '#f59e0b', severity: 'High', description: '22-week fab fulfillment delay during deployment.' },
      { name: 'Silicon Obsolescence', percentage: 30, color: '#3b82f6', severity: 'Medium', description: 'Next-gen architecture release compressing residual secondary value.' },
      { name: 'Facility Electricity Tariffs', percentage: 18, color: '#10b981', severity: 'Low', description: 'Datacenter PUE power price increases.' },
      { name: 'Hardware Failure / RMA Drag', percentage: 12, color: '#6366f1', severity: 'Low', description: 'Node downtime during replacement cycles.' },
    ],
    allocationDistribution: [
      { name: 'H200 Server Nodes & Interconnect', percentage: 65, color: '#059669', rationale: 'Physical compute hardware and high-speed InfiniBand switches.' },
      { name: 'Colocation Hosting & Power', percentage: 18, color: '#0284c7', rationale: 'Locked 3-year power purchase and cooling agreement.' },
      { name: 'Buffer Cloud API Bridging', percentage: 12, color: '#f59e0b', rationale: 'Reserved cloud capacity buffer during physical delivery.' },
      { name: 'Spare Parts & Maintenance', percentage: 5, color: '#6366f1', rationale: 'Onsite cold spares for instant hardware failover.' },
    ],
    payoffMetrics: {
      upsideRatio: '+5.8x',
      downsideFloor: '-0.4x (Hardware Resale Floor)',
      paybackMonths: 8.4,
      convexityType: 'Compounding Margin Leverage',
    },
  },
];

interface DecisionVisualReportProps {
  initialDecisionId?: string;
  onDecisionChange?: (id: string) => void;
  compact?: boolean;
}

export default function DecisionVisualReport({
  initialDecisionId,
  onDecisionChange,
  compact = false,
}: DecisionVisualReportProps) {
  const [selectedId, setSelectedId] = useState<string>(
    initialDecisionId || PRECONFIGURED_REPORTS[0].id
  );
  const [hoveredPoint, setHoveredPoint] = useState<any | null>(null);
  const [hoveredRisk, setHoveredRisk] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'past' | 'present' | 'future'>('all');

  const report =
    PRECONFIGURED_REPORTS.find((r) => r.id === selectedId) || PRECONFIGURED_REPORTS[0];

  function handleSelect(id: string) {
    setSelectedId(id);
    onDecisionChange?.(id);
  }

  // SVG Chart dimensions
  const svgWidth = 840;
  const svgHeight = 280;
  const padX = 60;
  const padY = 40;
  const chartW = svgWidth - padX * 2;
  const chartH = svgHeight - padY * 2;

  const points = report.timelinePoints;
  const getX = (idx: number) => padX + (idx / (points.length - 1)) * chartW;
  const getY = (val: number) => padY + chartH - (val / 100) * chartH;

  // Build SVG paths for Bull, Base, Bear
  const bullPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.bull)}`).join(' ');
  const basePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.base)}`).join(' ');
  const bearPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(p.bear)}`).join(' ');

  // Bull Area Gradient fill
  const bullAreaPath = `${bullPath} L ${getX(points.length - 1)} ${padY + chartH} L ${getX(0)} ${padY + chartH} Z`;

  // SVG Pie Chart calculations for Risk
  let cumulativeAngle = 0;
  const pieRadius = 80;
  const pieCenter = 95;
  const donutHole = 52;

  const pieSlices = report.riskDistribution.map((item) => {
    const angle = (item.percentage / 100) * 360;
    const startAngle = cumulativeAngle;
    const endAngle = cumulativeAngle + angle;
    cumulativeAngle += angle;

    const startRad = ((startAngle - 90) * Math.PI) / 180;
    const endRad = ((endAngle - 90) * Math.PI) / 180;

    const x1 = pieCenter + pieRadius * Math.cos(startRad);
    const y1 = pieCenter + pieRadius * Math.sin(startRad);
    const x2 = pieCenter + pieRadius * Math.cos(endRad);
    const y2 = pieCenter + pieRadius * Math.sin(endRad);

    const x1Inner = pieCenter + donutHole * Math.cos(startRad);
    const y1Inner = pieCenter + donutHole * Math.sin(startRad);
    const x2Inner = pieCenter + donutHole * Math.cos(endRad);
    const y2Inner = pieCenter + donutHole * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;
    const pathData = `M ${x1} ${y1} A ${pieRadius} ${pieRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x2Inner} ${y2Inner} A ${donutHole} ${donutHole} 0 ${largeArc} 0 ${x1Inner} ${y1Inner} Z`;

    return {
      ...item,
      pathData,
      startAngle,
      endAngle,
    };
  });

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-300">
      {/* ── 1. DECISION SELECTOR & EXECUTIVE REPORT HEADER ── */}
      <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-1.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                {report.category}
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-slate-500 font-medium">{report.domain}</span>
              <span className="text-slate-300">•</span>
              <span className="text-xs text-emerald-700 font-bold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 pulse-dot" />
                Alpha Verified Decision Brief
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug">
              {report.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl font-normal">
              {report.executiveSummary}
            </p>
          </div>

          {/* Verdict & Conviction Badge */}
          <div className="flex items-center lg:flex-col lg:items-end gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-black uppercase tracking-wider border shadow-xs ${
                  report.verdict === 'GO'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : report.verdict === 'CONDITIONAL GO'
                    ? 'bg-cyan-100 text-cyan-900 border-cyan-300'
                    : report.verdict === 'CAUTION'
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-rose-100 text-rose-900 border-rose-300'
                }`}
              >
                {report.verdict}
              </span>
              <div className="rounded-full bg-slate-100 border border-slate-200 px-3 py-1 text-xs font-bold text-slate-800">
                {report.convictionScore}% Conviction
              </div>
            </div>
            <span className="text-[11px] text-slate-400 font-medium">10,000 Monte Carlo Iterations</span>
          </div>
        </div>

        {/* Quick Switcher Pills for Other Registered Decisions */}
        <div className="pt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Switch Decision:</span>
          {PRECONFIGURED_REPORTS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => handleSelect(r.id)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all truncate max-w-xs ${
                selectedId === r.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title={r.title}
            >
              {r.title.slice(0, 36)}…
            </button>
          ))}
        </div>
      </div>

      {/* ── 2. THE MASTERPIECE PREDICTIVE GRAPH (PAST → PRESENT → FUTURE) ── */}
      <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-xl p-6 sm:p-7 shadow-xs">
        {/* Full-width Title & Tagline at Top */}
        <div className="w-full mb-4">
          <div className="flex items-center gap-2 mb-1.5">
            <IconTrendUp size={18} className="text-emerald-600 shrink-0" />
            <h2 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
              Decision Trajectory: Past Track Record to Future Forecast (2024–2030)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            See what happened in the past (2024–2025), where you stand today (2026), and the 3 predicted future paths through 2030.
          </p>
        </div>

        {/* Indicators Row: Positioned BETWEEN Text & Graph */}
        <div className="w-full pb-3 mb-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold">
            <div className="flex items-center gap-1.5 bg-emerald-50/90 px-3 py-1.5 rounded-full border border-emerald-200/80 shadow-2xs" title="High-growth best case outcome if all goals are achieved">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-xs" />
              <span className="text-emerald-950 font-bold">Best Outcome</span>
              <span className="text-emerald-700/90 text-[11px] font-normal">(Optimistic)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-blue-50/90 px-3 py-1.5 rounded-full border border-blue-200/80 shadow-2xs" title="Expected outcome based on market data and normal execution">
              <span className="h-2 w-2 rounded-full bg-blue-600 shadow-xs" />
              <span className="text-blue-950 font-bold">Expected Path</span>
              <span className="text-blue-700/90 text-[11px] font-normal">(Most Likely)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-rose-50/90 px-3 py-1.5 rounded-full border border-rose-200/80 shadow-2xs" title="Downside risk if challenges or delays happen">
              <span className="h-2 w-2 rounded-full bg-rose-500 shadow-xs" />
              <span className="text-rose-950 font-bold">Risk Scenario</span>
              <span className="text-rose-700/90 text-[11px] font-normal">(Worst Case)</span>
            </div>
          </div>

          <span className="text-[11px] font-mono text-slate-400 font-medium hidden md:inline">
            10,000 Multiverse Simulations
          </span>
        </div>

        {/* SVG Interactive Multi-Horizon Curve Chart */}
        <div className="relative w-full overflow-x-auto rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50/70 to-white p-4">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-auto max-h-[320px] select-none overflow-visible"
          >
            <defs>
              {/* Bull Area Gradient */}
              <linearGradient id="bullGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="baseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Clear Y-Axis Title on Chart */}
            <text
              x={padX}
              y={padY - 14}
              textAnchor="start"
              fontSize="9"
              fontWeight="bold"
              fill="#64748b"
              letterSpacing="0.04em"
            >
              PREDICTED SUCCESS SCORE (%)
            </text>

            {/* Gridlines */}
            {[0.25, 0.5, 0.75, 1.0].map((frac, idx) => {
              const y = padY + chartH - frac * chartH;
              return (
                <g key={idx}>
                  <line
                    x1={padX}
                    y1={y}
                    x2={padX + chartW}
                    y2={y}
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                    strokeWidth="1"
                  />
                  <text
                    x={padX - 12}
                    y={y + 3}
                    textAnchor="end"
                    fontSize="10"
                    fill="#94a3b8"
                    fontFamily="monospace"
                  >
                    {Math.round(frac * 100)}%
                  </text>
                </g>
              );
            })}

            {/* Present Checkpoint Vertical Divider (Year 2026) */}
            <line
              x1={getX(2)}
              y1={padY - 10}
              x2={getX(2)}
              y2={padY + chartH}
              stroke="#059669"
              strokeWidth="2"
              strokeDasharray="5 3"
            />
            <rect
              x={getX(2) - 52}
              y={padY - 26}
              width="104"
              height="20"
              rx="10"
              fill="#059669"
              className="shadow-sm"
            />
            <text
              x={getX(2)}
              y={padY - 13}
              textAnchor="middle"
              fontSize="9.5"
              fill="#ffffff"
              fontWeight="bold"
              letterSpacing="0.04em"
            >
              📍 TODAY (2026)
            </text>

            {/* Bull Area */}
            <path d={bullAreaPath} fill="url(#bullGradient)" />

            {/* Bear Line (Dashed Rose) */}
            <path
              d={bearPath}
              fill="none"
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
            />

            {/* Base Line (Solid Blue) */}
            <path
              d={basePath}
              fill="none"
              stroke="#2563eb"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Bull Line (Solid Vibrant Emerald) */}
            <path
              d={bullPath}
              fill="none"
              stroke="#059669"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Year Labels along bottom */}
            {points.map((pt, i) => (
              <g key={pt.year} className="cursor-pointer">
                <line
                  x1={getX(i)}
                  y1={padY + chartH}
                  x2={getX(i)}
                  y2={padY + chartH + 6}
                  stroke="#cbd5e1"
                  strokeWidth="1.5"
                />
                <text
                  x={getX(i)}
                  y={padY + chartH + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="bold"
                  fill={i === 2 ? '#059669' : i < 2 ? '#64748b' : '#0f172a'}
                >
                  {pt.year}
                </text>
                <text
                  x={getX(i)}
                  y={padY + chartH + 32}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="600"
                  fill={i === 2 ? '#059669' : '#94a3b8'}
                  className="uppercase tracking-wider"
                >
                  {i === 2 ? 'Today' : pt.phase}
                </text>

                {/* Point markers */}
                {/* Bull Point */}
                <circle
                  cx={getX(i)}
                  cy={getY(pt.bull)}
                  r={hoveredPoint?.idx === i && hoveredPoint?.type === 'bull' ? 7 : 5}
                  fill="#ffffff"
                  stroke="#059669"
                  strokeWidth="3"
                  className="transition-all duration-150"
                  onMouseEnter={() => setHoveredPoint({ idx: i, type: 'bull', val: pt.bull, text: pt.label, year: pt.year, labelName: 'Best Outcome' })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Base Point */}
                <circle
                  cx={getX(i)}
                  cy={getY(pt.base)}
                  r={hoveredPoint?.idx === i && hoveredPoint?.type === 'base' ? 6 : 4}
                  fill="#ffffff"
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                  onMouseEnter={() => setHoveredPoint({ idx: i, type: 'base', val: pt.base, text: pt.label, year: pt.year, labelName: 'Expected Path' })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />

                {/* Bear Point */}
                <circle
                  cx={getX(i)}
                  cy={getY(pt.bear)}
                  r={hoveredPoint?.idx === i && hoveredPoint?.type === 'bear' ? 6 : 4}
                  fill="#ffffff"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                  className="transition-all duration-150"
                  onMouseEnter={() => setHoveredPoint({ idx: i, type: 'bear', val: pt.bear, text: pt.label, year: pt.year, labelName: 'Risk Scenario' })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            ))}
          </svg>

          {/* Interactive Hover Tooltip Bar — Fixed h-11 container to prevent any layout shifts or graph shaking */}
          <div className="mt-3 h-11 flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-white border border-slate-200/80 shadow-xs text-xs gap-2 overflow-hidden">
            {hoveredPoint ? (
              <div className="flex items-center gap-2 truncate">
                <span className="rounded-md bg-slate-100 px-2 py-0.5 font-bold text-slate-900 font-mono text-[11px] shrink-0">
                  {hoveredPoint.year} · {hoveredPoint.labelName || 'FORECAST'}
                </span>
                <span className="font-bold text-emerald-700 shrink-0">{hoveredPoint.val}% Rating</span>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <span className="text-slate-700 font-medium truncate">{hoveredPoint.text}</span>
              </div>
            ) : (
              <span className="text-slate-500 font-medium flex items-center gap-1.5 truncate">
                <span>💡</span>
                <span className="truncate">Hover over any dot on the chart lines to see detailed projections.</span>
              </span>
            )}
            <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full shrink-0">
              AI Confidence: 99.3%
            </span>
          </div>
        </div>
      </div>

      {/* ── 3. TWO PIE CHARTS & QUANTITATIVE CONVEXITY GAUGES ── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Pie Chart 1: Risk & Vulnerability Distribution */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <IconShieldLine size={15} className="text-rose-600" />
                <span>Risk & Vulnerability Distribution</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Key operational and market failure modes isolated by red team</p>
            </div>
            <span className="rounded-full bg-slate-100 text-slate-600 border border-slate-200 px-2.5 py-0.5 text-[10px] font-mono font-medium">
              Red-Team Audited
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* SVG Donut Chart */}
            <div className="relative shrink-0 w-[140px] h-[140px] my-auto">
              <svg viewBox="0 0 190 190" className="w-full h-full transform -rotate-90">
                {pieSlices.map((slice, idx) => (
                  <path
                    key={idx}
                    d={slice.pathData}
                    fill={slice.color}
                    className="cursor-pointer transition-all duration-200 hover:opacity-85 hover:scale-[1.03] transform origin-center"
                    onMouseEnter={() => setHoveredRisk(slice)}
                    onMouseLeave={() => setHoveredRisk(null)}
                  />
                ))}
              </svg>
              {/* Center hole with clean text that never overflows or touches the ring */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center select-none px-1">
                <span className="text-2xl font-black text-slate-900 leading-none">
                  {hoveredRisk ? `${hoveredRisk.percentage}%` : '4'}
                </span>
                <span className="text-[8.5px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                  {hoveredRisk ? 'SHARE' : 'KEY RISKS'}
                </span>
              </div>
            </div>

            {/* Legend with full word wrap and clean padding */}
            <div className="space-y-2 flex-1 min-w-0 w-full text-xs">
              {report.riskDistribution.map((r, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredRisk(r)}
                  onMouseLeave={() => setHoveredRisk(null)}
                  className={`flex items-start justify-between p-2 rounded-xl transition-colors cursor-pointer min-w-0 ${
                    hoveredRisk?.name === r.name ? 'bg-slate-100' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-2.5 min-w-0 flex-1 pr-2">
                    <span className="h-3 w-3 rounded-md shrink-0 mt-0.5" style={{ backgroundColor: r.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 leading-snug break-words">{r.name}</p>
                      <p className="text-[11px] text-slate-500 leading-normal break-words mt-0.5">{r.description}</p>
                    </div>
                  </div>
                  <span className="font-black text-slate-900 shrink-0 text-xs ml-2 mt-0.5">{r.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pie Chart 2: Capital & Resource Deployment Efficiency */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <IconScale size={15} className="text-emerald-600" />
                <span>Capital & Resource Allocation</span>
              </h3>
              <p className="text-[11px] text-slate-500 mt-0.5">Recommended budget allocation to maximize asymmetric upside</p>
            </div>
            <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-mono font-bold">
              Optimized
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* SVG Donut Chart */}
            <div className="relative shrink-0 w-[140px] h-[140px] my-auto">
              <svg viewBox="0 0 190 190" className="w-full h-full transform -rotate-90">
                {(() => {
                  let angleAcc = 0;
                  return report.allocationDistribution.map((item, idx) => {
                    const angle = (item.percentage / 100) * 360;
                    const startAngle = angleAcc;
                    const endAngle = angleAcc + angle;
                    angleAcc += angle;

                    const startRad = ((startAngle - 90) * Math.PI) / 180;
                    const endRad = ((endAngle - 90) * Math.PI) / 180;

                    const x1 = pieCenter + pieRadius * Math.cos(startRad);
                    const y1 = pieCenter + pieRadius * Math.sin(startRad);
                    const x2 = pieCenter + pieRadius * Math.cos(endRad);
                    const y2 = pieCenter + pieRadius * Math.sin(endRad);

                    const x1Inner = pieCenter + donutHole * Math.cos(startRad);
                    const y1Inner = pieCenter + donutHole * Math.sin(startRad);
                    const x2Inner = pieCenter + donutHole * Math.cos(endRad);
                    const y2Inner = pieCenter + donutHole * Math.sin(endRad);

                    const largeArc = angle > 180 ? 1 : 0;
                    const pathData = `M ${x1} ${y1} A ${pieRadius} ${pieRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x2Inner} ${y2Inner} A ${donutHole} ${donutHole} 0 ${largeArc} 0 ${x1Inner} ${y1Inner} Z`;

                    return (
                      <path
                        key={idx}
                        d={pathData}
                        fill={item.color}
                        className="cursor-pointer transition-all duration-200 hover:opacity-85 hover:scale-[1.03] transform origin-center"
                      />
                    );
                  });
                })()}
              </svg>
              {/* Center hole with clean text that never overflows or touches the ring */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center select-none px-1">
                <span className="text-xl font-black text-emerald-700 leading-none">{report.payoffMetrics.upsideRatio}</span>
                <span className="text-[8.5px] font-bold text-emerald-800/70 uppercase tracking-wider mt-1">UPSIDE</span>
              </div>
            </div>

            {/* Legend with full word wrap and clean padding */}
            <div className="space-y-2 flex-1 min-w-0 w-full text-xs">
              {report.allocationDistribution.map((a, i) => (
                <div key={i} className="flex items-start justify-between p-2 rounded-xl hover:bg-slate-50 transition-colors min-w-0">
                  <div className="flex items-start gap-2.5 min-w-0 flex-1 pr-2">
                    <span className="h-3 w-3 rounded-md shrink-0 mt-0.5" style={{ backgroundColor: a.color }} />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-900 leading-snug break-words">{a.name}</p>
                      <p className="text-[11px] text-slate-500 leading-normal break-words mt-0.5">{a.rationale}</p>
                    </div>
                  </div>
                  <span className="font-black text-slate-900 shrink-0 text-xs ml-2 mt-0.5">{a.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. PAST, PRESENT & FUTURE MINIMALIST STRATEGIC SYNTHESIS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* PAST CARD — clean, scannable, minimalist */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-slate-400">
                Past Precedents
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10.5px] font-mono font-bold text-slate-700">
                {report.past.historicalWinRate}% Win Rate
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              {report.past.headline}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              {report.past.baselineInsight}
            </p>
          </div>

          <div className="rounded-xl border-l-2 border-slate-400 bg-slate-50/60 p-3 text-xs text-slate-700">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Core Historical Lesson
            </span>
            <p className="italic font-medium text-slate-800 leading-relaxed">
              "{report.past.keyLesson}"
            </p>
          </div>
        </div>

        {/* PRESENT CARD — clean reality check with soft emerald tone */}
        <div className="rounded-2xl border border-emerald-200/80 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-emerald-300 transition-colors">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                Present Reality Check
              </span>
              <span className="rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 text-[10.5px] font-mono font-bold">
                {report.present.evidenceStrength}% Verified
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              {report.present.headline}
            </h4>

            <p className="text-xs text-slate-600 leading-relaxed">
              {report.present.criticalRealityCheck}
            </p>
          </div>

          <div className="rounded-xl border-l-2 border-emerald-500 bg-emerald-50/40 p-3 text-xs">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              Immediate 48H Action
            </span>
            <p className="font-semibold text-slate-900 leading-snug">
              {report.present.immediateAction}
            </p>
          </div>
        </div>

        {/* FUTURE CARD — clean probabilistic trajectory with circuit breaker */}
        <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-indigo-700">
                Future Horizon (2027–2030)
              </span>
              <span className="rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 px-2.5 py-0.5 text-[10.5px] font-mono font-bold">
                {report.future.probabilitySuccess}% Prob
              </span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              {report.future.headline}
            </h4>

            <div className="space-y-1.5 text-xs text-slate-700">
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                <p><strong className="text-slate-900">Bull Target:</strong> {report.future.bullTarget}</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                <p><strong className="text-slate-900">Bear Trap:</strong> {report.future.bearTrap}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border-l-2 border-rose-400 bg-rose-50/30 p-3 text-xs">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-700 block mb-1">
              Mandatory Kill-Switch Tripwire
            </span>
            <p className="text-slate-800 leading-snug font-medium">
              {report.future.killSwitch}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
