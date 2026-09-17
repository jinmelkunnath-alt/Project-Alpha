export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinkingMode?: 'deep' | 'quick';
  thinkingTimeMs?: number;
  thinkingLogs?: string[];
  verdict?: 'GO' | 'CONDITIONAL GO' | 'CAUTION' | 'PIVOT';
  convictionScore?: number;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = 'project_alpha_chat_sessions_v1';
const ACTIVE_SESSION_KEY = 'project_alpha_active_session_id';

const DEFAULT_SESSIONS: ChatSession[] = [
  {
    id: 'sample-session-1',
    title: 'Enterprise AI Copilot Q4 Launch Risk',
    createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
    messages: [
      {
        id: 'msg-1',
        role: 'user',
        content: 'Should we launch our enterprise AI decision copilot in Q4, risking cash runway vs gaining first-mover advantage?',
        timestamp: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
      },
      {
        id: 'msg-2',
        role: 'assistant',
        content: `### Executive Verdict: CONDITIONAL GO (Phased Beta)

**Strategic Conviction Score: 84%**

Launching full general availability in Q4 introduces existential runway compression if conversion cycles exceed 90 days. However, ceding first-mover velocity in enterprise AI procurement allows legacy incumbents to lock annual enterprise contracts.

#### Critical Asymmetric Arbitrage
* **Runway Protection**: Restrict Q4 to 12 design-partner tier enterprises with non-refundable 50% pilot deposits ($35K each). This self-funds AWS/Azure inference cluster commitments.
* **Red-Team Failure Mode**: Enterprise SOC2 Type II & EU AI Act compliance paperwork delays close rates by an average of 42 business days.
* **Recommendation**: Announce exclusive closed preview Oct 15; convert pilots into multi-year commitments in Q1.`,
        thinkingTimeMs: 3840,
        thinkingLogs: [
          'Deconstructing capital depletion velocity vs ARR lock-in curve...',
          'Simulating enterprise SOC2 Type II procurement drag cycles across 14,000 permutations...',
          'Testing cash runway elasticity under pessimistic 120-day collection terms...',
          'Calibrating counterfactual first-mover erosion against incumbent bundled offerings...',
          'Synthesizing asymmetric risk mitigation: self-funding design partner model...',
          'Verdict compiled with 84% statistical conviction.',
        ],
        verdict: 'CONDITIONAL GO',
        convictionScore: 84,
        timestamp: new Date(Date.now() - 3600 * 1000 * 4 + 4000).toISOString(),
      },
    ],
  },
];

export function getStoredSessions(): ChatSession[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SESSIONS));
      return DEFAULT_SESSIONS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_SESSIONS;
  } catch (err) {
    console.error('Failed to load chat sessions:', err);
    return DEFAULT_SESSIONS;
  }
}

export function saveSessions(sessions: ChatSession[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to save chat sessions:', err);
  }
}

export function getActiveSessionId(): string {
  try {
    const active = localStorage.getItem(ACTIVE_SESSION_KEY);
    if (active) return active;
  } catch {
    /* ignore */
  }
  const sessions = getStoredSessions();
  return sessions[0]?.id ?? '';
}

export function setActiveSessionId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_SESSION_KEY, id);
  } catch {
    /* ignore */
  }
}

export function createNewSession(initialTitle?: string): ChatSession {
  const newSession: ChatSession = {
    id: 'session-' + crypto.randomUUID(),
    title: initialTitle || 'New Decision Analysis',
    messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const sessions = [newSession, ...getStoredSessions()];
  saveSessions(sessions);
  setActiveSessionId(newSession.id);
  return newSession;
}

export function getSessionById(id: string): ChatSession | undefined {
  const sessions = getStoredSessions();
  return sessions.find((s) => s.id === id);
}

export function updateSessionMessages(
  sessionId: string,
  messages: ChatMessage[],
  updatedTitle?: string
): ChatSession | undefined {
  const sessions = getStoredSessions();
  const index = sessions.findIndex((s) => s.id === sessionId);
  if (index === -1) return undefined;

  const current = sessions[index];
  const updated: ChatSession = {
    ...current,
    title: updatedTitle ?? current.title,
    messages,
    updatedAt: new Date().toISOString(),
  };

  sessions[index] = updated;
  saveSessions(sessions);
  return updated;
}

export function deleteSessionById(id: string): ChatSession[] {
  const sessions = getStoredSessions().filter((s) => s.id !== id);
  saveSessions(sessions);
  return sessions;
}
