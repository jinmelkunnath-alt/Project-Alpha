export interface RiskSignal {
  id: string;
  title: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  detectedAt: string;
  source: string;
  description: string;
}

export interface MonitoredSource {
  id: string;
  name: string;
  type: 'regulatory' | 'market' | 'financial' | 'competitive' | 'tech';
  lastSync: string;
  status: 'Live' | 'Syncing' | 'Verified';
  itemCount: number;
}

export interface ImprovementItem {
  id: string;
  action: string;
  impact: 'High' | 'Medium';
  category: string;
  detail: string;
}

export interface MonitoredDecision {
  id: string;
  title: string;
  category: string;
  domain: string;
  registeredAt: string;
  status: 'Active 24/7' | 'Alert Triggered' | 'Verifying';
  confidence: number; // e.g. 84%
  confidenceDelta: number; // e.g. +3.2%
  probabilitySuccess: number; // e.g. 78.4%
  probabilityDownside: number; // e.g. 14.2%
  probabilityNeutral: number; // e.g. 7.4%
  summary: string;
  newRisks: RiskSignal[];
  sources: MonitoredSource[];
  improvements: ImprovementItem[];
  telemetry: {
    latencyMs: number;
    signalsToday: number;
    lastAudit: string;
    driftScore: string;
  };
}

export const INITIAL_MONITORED_DECISIONS: MonitoredDecision[] = [
  {
    id: 'dec-copilot-q4',
    title: 'Enterprise AI Decision Copilot Q4 Launch: Risk Runway vs. First-Mover Advantage',
    category: 'Strategic Go-To-Market',
    domain: 'Enterprise B2B SaaS / Deep Tech',
    registeredAt: 'Registered Sep 12, 2026 · 24/7 Continuous Radar',
    status: 'Active 24/7',
    confidence: 84,
    confidenceDelta: 3.2,
    probabilitySuccess: 78.4,
    probabilityDownside: 14.2,
    probabilityNeutral: 7.4,
    summary:
      'Launching in Q4 captures $12M ARR early pipeline before incumbents release bundled assistants. Cash runway remains elastic under a phased pilot conversion model.',
    newRisks: [
      {
        id: 'r1',
        title: 'Competitor Synthetix announced private beta pricing 20% below target tier',
        severity: 'Critical',
        detectedAt: '2 hours ago',
        source: 'SEC Form 8-K & TechCrunch Intelligence',
        description:
          'Pricing pressure may force discounting on initial 5 enterprise pilot contracts unless custom adversarial defense features are highlighted.',
      },
      {
        id: 'r2',
        title: 'Enterprise procurement drag cycles lengthening to 75 days in Q4',
        severity: 'Medium',
        detectedAt: '6 hours ago',
        source: 'B2B Software Purchasing Index',
        description:
          'End-of-year budget freezes could push contract signatures from December to late January.',
      },
    ],
    sources: [
      {
        id: 's1',
        name: 'SEC EDGAR 8-K & 10-Q Feeds',
        type: 'regulatory',
        lastSync: '4m ago',
        status: 'Live',
        itemCount: 42,
      },
      {
        id: 's2',
        name: 'Bloomberg Terminal Tech Syndicate',
        type: 'financial',
        lastSync: '1m ago',
        status: 'Live',
        itemCount: 128,
      },
      {
        id: 's3',
        name: 'Reuters Enterprise Software Radar',
        type: 'market',
        lastSync: '12m ago',
        status: 'Live',
        itemCount: 19,
      },
      {
        id: 's4',
        name: 'arXiv LLM Reasoning & Red-Teaming',
        type: 'tech',
        lastSync: '1h ago',
        status: 'Verified',
        itemCount: 28,
      },
      {
        id: 's5',
        name: 'GitHub Open-Source LLM Benchmark Commits',
        type: 'competitive',
        lastSync: '18m ago',
        status: 'Live',
        itemCount: 114,
      },
    ],
    improvements: [
      {
        id: 'i1',
        action: 'Structure pilots as paid Proof-of-Value with pre-committed annual conversions',
        impact: 'High',
        category: 'Revenue Protection',
        detail: 'Hedges $1.8M in runway burn while validating customer commitment upfront.',
      },
      {
        id: 'i2',
        action: 'Implement dual-vendor inference failover (AWS + CoreWeave)',
        impact: 'High',
        category: 'Cost & Latency',
        detail: 'Reduces GPU inference unit cost by 28% and guarantees 99.95% uptime SLA.',
      },
      {
        id: 'i3',
        action: 'Release automated SOC2 Type II compliance audit packet',
        impact: 'Medium',
        category: 'Procurement Velocity',
        detail: 'Compresses enterprise security approval review time from 6 weeks to 11 business days.',
      },
    ],
    telemetry: {
      latencyMs: 18,
      signalsToday: 1420,
      lastAudit: 'Today, 09:42 UTC',
      driftScore: 'Low (0.04)',
    },
  },
  {
    id: 'dec-eu-expansion',
    title: 'European Union Expansion for AI Platform under EU AI Act Regulations',
    category: 'Regulatory Compliance & Global Expansion',
    domain: 'Legal Tech / Sovereign Cloud',
    registeredAt: 'Registered Sep 8, 2026 · 24/7 Continuous Radar',
    status: 'Alert Triggered',
    confidence: 62,
    confidenceDelta: -7.4,
    probabilitySuccess: 58.0,
    probabilityDownside: 32.5,
    probabilityNeutral: 9.5,
    summary:
      'High market upside in DACH and Benelux, but recent Article 50 disclosure mandates introduce compliance overhead and audit penalties.',
    newRisks: [
      {
        id: 'r3',
        title: 'EU AI Act Article 50 guidelines require algorithmic transparency auditing by Q1',
        severity: 'Critical',
        detectedAt: 'Yesterday',
        source: 'Official Journal of the European Union',
        description:
          'Mandatory conformity assessment could impose €180k audit costs and require explicit watermark tagging on all synthetic decision trees.',
      },
      {
        id: 'r4',
        title: 'Frankfurt datacenter colocation capacity tightens due to power caps',
        severity: 'High',
        detectedAt: '1 day ago',
        source: 'European Data Centre Association',
        description:
          'Strict sovereign data residency requires local hosting; delays in rack delivery could push launch by 60 days.',
      },
      {
        id: 'r5',
        title: 'Local EU enterprise competitors forming sovereign LLM consortium',
        severity: 'Medium',
        detectedAt: '2 days ago',
        source: 'Politico Pro Europe Tech Wire',
        description:
          'German industrial clients prioritizing EU-headquartered vendors over US cloud-backed platforms.',
      },
    ],
    sources: [
      {
        id: 's6',
        name: 'Official Journal of the European Union',
        type: 'regulatory',
        lastSync: '8m ago',
        status: 'Live',
        itemCount: 14,
      },
      {
        id: 's7',
        name: 'GDPR & AI Act Enforcement Tracker',
        type: 'regulatory',
        lastSync: '22m ago',
        status: 'Live',
        itemCount: 39,
      },
      {
        id: 's8',
        name: 'Politico Pro Europe Tech Policy Wire',
        type: 'market',
        lastSync: '35m ago',
        status: 'Live',
        itemCount: 8,
      },
      {
        id: 's9',
        name: 'Court of Justice of the EU (CJEU) Decisions',
        type: 'regulatory',
        lastSync: '3h ago',
        status: 'Verified',
        itemCount: 4,
      },
    ],
    improvements: [
      {
        id: 'i4',
        action: 'Partner with certified EU sovereign cloud provider (OVHcloud / Hetzner)',
        impact: 'High',
        category: 'Data Residency',
        detail: 'Completely eliminates transatlantic data transfer objections from European DPOs.',
      },
      {
        id: 'i5',
        action: 'Obtain preliminary ISO/IEC 42001 (AI Management System) certification',
        impact: 'High',
        category: 'Compliance Moat',
        detail: 'Preemptively satisfies EU AI Act conformity criteria and builds enterprise trust.',
      },
      {
        id: 'i6',
        action: 'Establish Brussels advisory panel for model compliance pre-clearance',
        impact: 'Medium',
        category: 'Regulatory Relations',
        detail: 'Reduces regulatory surprise risk by providing 6-month advance notice on enforcement rules.',
      },
    ],
    telemetry: {
      latencyMs: 24,
      signalsToday: 890,
      lastAudit: 'Today, 08:15 UTC',
      driftScore: 'Elevated (0.28)',
    },
  },
  {
    id: 'dec-gpu-cluster',
    title: 'Build In-House GPU Inference Cluster ($4.5M Capex) vs Third-Party Cloud APIs',
    category: 'Infrastructure & Capital Allocation',
    domain: 'Deep Learning Hardware & Cloud Economics',
    registeredAt: 'Registered Sep 3, 2026 · 24/7 Continuous Radar',
    status: 'Active 24/7',
    confidence: 79,
    confidenceDelta: 4.1,
    probabilitySuccess: 82.5,
    probabilityDownside: 11.0,
    probabilityNeutral: 6.5,
    summary:
      'In-house cluster amortizes to $0.0028/1k tokens vs $0.0092/1k tokens on public cloud, saving $3.2M over 24 months with 84% payback probability.',
    newRisks: [
      {
        id: 'r6',
        title: 'Tier-1 distributor H200 cluster lead-time stretched from 16 to 22 weeks',
        severity: 'Medium',
        detectedAt: '3 days ago',
        source: 'SemiAnalysis Hardware Supply Wire',
        description:
          'Fab packaging bottlenecks could delay physical cluster commissioning into late Q1.',
      },
      {
        id: 'r7',
        title: 'Pacific Northwest colocation electricity tariff increased by 8%',
        severity: 'Low',
        detectedAt: '4 days ago',
        source: 'Regional Energy Utility Board',
        description:
          'Adds approximately $14,000/month in operational power cost across 128 server racks.',
      },
    ],
    sources: [
      {
        id: 's10',
        name: 'SemiAnalysis Semiconductor & Hardware Feed',
        type: 'tech',
        lastSync: '15m ago',
        status: 'Live',
        itemCount: 19,
      },
      {
        id: 's11',
        name: 'Spot Cloud GPU Pricing API (Lambda / AWS / CoreWeave)',
        type: 'financial',
        lastSync: '5m ago',
        status: 'Live',
        itemCount: 310,
      },
      {
        id: 's12',
        name: 'TSMC CoWoS Advanced Packaging Capacity Updates',
        type: 'market',
        lastSync: '2h ago',
        status: 'Verified',
        itemCount: 7,
      },
    ],
    improvements: [
      {
        id: 'i7',
        action: 'Secure 6-month reserved cloud capacity bridge while hardware delivers',
        impact: 'High',
        category: 'Risk Hedging',
        detail: 'Prevents customer onboarding stalls during the 22-week physical hardware fulfillment window.',
      },
      {
        id: 'i8',
        action: 'Execute 36-month lease with secondary market residual value buyout',
        impact: 'High',
        category: 'Capital Preservation',
        detail: 'Protects against hardware obsolescence if next-generation silicon arrives sooner than modeled.',
      },
    ],
    telemetry: {
      latencyMs: 14,
      signalsToday: 2140,
      lastAudit: 'Today, 09:10 UTC',
      driftScore: 'Low (0.02)',
    },
  },
  {
    id: 'dec-startup-acq',
    title: 'Acquire Specialized AI Red-Teaming Startup ($8M) vs Build Proprietary Engine',
    category: 'M&A & Corporate Development',
    domain: 'Adversarial Security & Intellectual Property',
    registeredAt: 'Registered Sep 10, 2026 · 24/7 Continuous Radar',
    status: 'Active 24/7',
    confidence: 71,
    confidenceDelta: 0.2,
    probabilitySuccess: 69.0,
    probabilityDownside: 22.0,
    probabilityNeutral: 9.0,
    summary:
      'Acquisition brings 4 issued patents and 6 elite security researchers, accelerating the red-teaming timeline by 14 months if retention covenants hold.',
    newRisks: [
      {
        id: 'r8',
        title: 'Founder retention cliff: 2 lead ML security researchers have vesting milestone',
        severity: 'High',
        detectedAt: '1 day ago',
        source: 'PitchBook & LinkedIn Talent Movement Radar',
        description:
          'High probability of key researcher departure unless compensatory retention bonus pools are frontloaded.',
      },
      {
        id: 'r9',
        title: 'Patent freedom-to-operate overlap in automated jailbreak detection',
        severity: 'Low',
        detectedAt: '2 days ago',
        source: 'USPTO Patent Registry',
        description:
          'Prior art review required on Claims 4-8 before final execution of the asset purchase agreement.',
      },
    ],
    sources: [
      {
        id: 's13',
        name: 'PitchBook VC & M&A Deal Database',
        type: 'financial',
        lastSync: '25m ago',
        status: 'Live',
        itemCount: 15,
      },
      {
        id: 's14',
        name: 'USPTO Patent Assignment & Claims Registry',
        type: 'regulatory',
        lastSync: '1h ago',
        status: 'Live',
        itemCount: 7,
      },
      {
        id: 's15',
        name: 'LinkedIn Talent Departure & Hiring Velocity Radar',
        type: 'competitive',
        lastSync: '45m ago',
        status: 'Live',
        itemCount: 22,
      },
    ],
    improvements: [
      {
        id: 'i9',
        action: 'Tie 50% of purchase price into 3-year performance milestones',
        impact: 'High',
        category: 'Deal Terms',
        detail: 'Aligns founders with platform enterprise integration and customer retention benchmarks.',
      },
      {
        id: 'i10',
        action: 'Mandate independent third-party clean-room IP audit',
        impact: 'High',
        category: 'Legal Protection',
        detail: 'Eliminates open-source GPL contamination risk and validates proprietary trade secrets.',
      },
    ],
    telemetry: {
      latencyMs: 19,
      signalsToday: 670,
      lastAudit: 'Today, 07:30 UTC',
      driftScore: 'Stable (0.05)',
    },
  },
];

// Local storage persistence helper
const STORAGE_KEY = 'alpha_monitored_decisions_v1';

export function getMonitoredDecisions(): MonitoredDecision[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_MONITORED_DECISIONS));
      return INITIAL_MONITORED_DECISIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MONITORED_DECISIONS;
  } catch {
    return INITIAL_MONITORED_DECISIONS;
  }
}

export function saveMonitoredDecisions(decisions: MonitoredDecision[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(decisions));
  } catch (err) {
    console.error('Failed to save monitored decisions:', err);
  }
}

export function addDecisionToMonitoring(title: string, summary?: string): MonitoredDecision {
  const current = getMonitoredDecisions();
  const newDecision: MonitoredDecision = {
    id: 'dec-' + crypto.randomUUID(),
    title,
    category: 'Strategic Decision Analysis',
    domain: 'Enterprise Operations',
    registeredAt: `Registered ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} · 24/7 Continuous Radar`,
    status: 'Active 24/7',
    confidence: 81,
    confidenceDelta: 1.5,
    probabilitySuccess: 76.5,
    probabilityDownside: 15.0,
    probabilityNeutral: 8.5,
    summary: summary || 'Continuous 24/7 autonomous intelligence radar monitoring market signals, competitive shifts, and hidden trap assumptions.',
    newRisks: [
      {
        id: 'nr-' + crypto.randomUUID(),
        title: 'Early market consensus shift detected across secondary industry channels',
        severity: 'Medium',
        detectedAt: 'Just now',
        source: 'Alpha 24/7 Autonomous Radar',
        description: 'External signal corroboration underway across 14 indexed financial and news feeds.',
      },
    ],
    sources: [
      {
        id: 'ns-1',
        name: 'Bloomberg & Reuters Real-time Syndicate',
        type: 'market',
        lastSync: 'Just now',
        status: 'Live',
        itemCount: 24,
      },
      {
        id: 'ns-2',
        name: 'SEC EDGAR & Regulatory Bulletin Radar',
        type: 'regulatory',
        lastSync: 'Just now',
        status: 'Live',
        itemCount: 16,
      },
      {
        id: 'ns-3',
        name: 'Global Tech & Competitive Intelligence Feed',
        type: 'tech',
        lastSync: 'Just now',
        status: 'Live',
        itemCount: 48,
      },
    ],
    improvements: [
      {
        id: 'ni-1',
        action: 'Establish bi-weekly threshold review for early assumption invalidation',
        impact: 'High',
        category: 'Risk Management',
        detail: 'Triggers automated red-team re-evaluation if confidence score drifts below 70%.',
      },
    ],
    telemetry: {
      latencyMs: 16,
      signalsToday: 320,
      lastAudit: 'Just now',
      driftScore: 'Stable (0.01)',
    },
  };

  const updated = [newDecision, ...current];
  saveMonitoredDecisions(updated);
  return newDecision;
}
