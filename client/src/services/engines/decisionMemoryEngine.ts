/**
 * Project Alpha - Decision Memory & Timeline Engine
 * Maintains an immutable ledger of decision states, assumptions, original vs current scores,
 * and chronological decision timeline events. Syncs with Firestore & local persistence.
 */

import type {
  DecisionMemoryRecord,
  TimelineEvent,
  TimelineEventType,
} from './types';

const STORAGE_KEY_DECISION_MEMORY = 'alpha_decision_memory_ledger';

export const DEFAULT_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-01',
    type: 'DECISION_CREATED',
    title: 'Decision Created',
    description: 'Mandate logged: "Enterprise AI Copilot launch in Q4 vs cash preservation".',
    timestamp: '2026-09-17T08:15:00Z',
    badgeColor: 'emerald',
  },
  {
    id: 'evt-02',
    type: 'RESEARCH_COMPLETED',
    title: 'Research & Ground Truth Harvested',
    description: '14 verifiable industry signals isolated; 2 conflicting secondary sources catalogued.',
    timestamp: '2026-09-17T08:15:08Z',
    badgeColor: 'blue',
  },
  {
    id: 'evt-03',
    type: 'RISK_IDENTIFIED',
    title: 'Asymmetric Risks Red-Teamed',
    description: 'Identified single-cloud GPU bottleneck and customer acquisition cost inflation.',
    timestamp: '2026-09-17T08:15:14Z',
    badgeColor: 'amber',
  },
  {
    id: 'evt-04',
    type: 'DECISION_CONFIRMED',
    title: 'Alpha Baseline Verdict Generated',
    description: 'Initial Conviction: 78% (GO). Recommended phased capital deployment.',
    timestamp: '2026-09-17T08:15:20Z',
    badgeColor: 'emerald',
  },
  {
    id: 'evt-05',
    type: 'MONITORING_ENABLED',
    title: '24/7 Radar Monitoring Activated',
    description: 'Bound 3 live tripwire kill-switches and vector feed telemetry.',
    timestamp: '2026-09-17T09:30:00Z',
    badgeColor: 'indigo',
  },
  {
    id: 'evt-06',
    type: 'NEW_EVIDENCE_DETECTED',
    title: 'External Change Detected',
    description: 'Competitor announced discounted enterprise tier; ad CPMs increased by 22%.',
    timestamp: '2026-09-17T11:45:00Z',
    badgeColor: 'rose',
  },
  {
    id: 'evt-07',
    type: 'DECISION_REASSESSED',
    title: 'Decision Re-Assessed via Alpha',
    description: 'Conviction updated: 78% → 64% (CONDITIONAL GO). Kill-switch distance narrowed.',
    timestamp: '2026-09-17T12:00:00Z',
    badgeColor: 'cyan',
  },
];

export const DEFAULT_DECISION_MEMORY: DecisionMemoryRecord = {
  decisionId: 'alpha-active-decision-001',
  title: 'Enterprise AI Decision Intelligence Copilot Q4 Launch',
  originalDecision: 'Launch enterprise AI decision intelligence copilot in Q4, allocating ₹25L in setup CapEx and ₹4.2L/mo operating runway.',
  createdAt: '2026-09-17T08:15:00Z',
  updatedAt: '2026-09-17T12:00:00Z',
  originalConvictionScore: 78,
  currentConvictionScore: 64,
  originalVerdict: 'GO',
  currentVerdict: 'CONDITIONAL GO',
  assumptions: [
    { id: 'as-01', text: 'CAC can be maintained below ₹4,200 via organic partner referrals', status: 'TESTING' },
    { id: 'as-02', text: 'Enterprise gross margins will stabilize at >75% after month 6', status: 'HELD' },
    { id: 'as-03', text: 'Competitor enterprise pricing will remain sticky above ₹8,000/mo', status: 'FAILED' },
    { id: 'as-04', text: 'Cloud inference API costs will decline 15% annually', status: 'HELD' },
  ],
  evidenceCount: 14,
  risksCount: 6,
  monitoringActive: true,
  timeline: DEFAULT_TIMELINE_EVENTS,
};

export function getStoredDecisionMemory(): DecisionMemoryRecord {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_DECISION_MEMORY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Failed to load decision memory from storage:', err);
  }
  return DEFAULT_DECISION_MEMORY;
}

export function saveDecisionMemory(record: DecisionMemoryRecord): void {
  try {
    localStorage.setItem(STORAGE_KEY_DECISION_MEMORY, JSON.stringify(record));
  } catch (err) {
    console.error('Failed to save decision memory:', err);
  }
}

export function appendTimelineEvent(
  type: TimelineEventType,
  title: string,
  description: string,
  badgeColor = 'emerald'
): DecisionMemoryRecord {
  const current = getStoredDecisionMemory();
  const newEvent: TimelineEvent = {
    id: `evt-${Date.now()}`,
    type,
    title,
    description,
    timestamp: new Date().toISOString(),
    badgeColor,
  };

  const updated: DecisionMemoryRecord = {
    ...current,
    updatedAt: new Date().toISOString(),
    timeline: [...current.timeline, newEvent],
  };

  saveDecisionMemory(updated);
  return updated;
}
