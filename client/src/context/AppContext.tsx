import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Decision } from '../types';
import {
  getStoredSessions,
  saveSessions,
  getActiveSessionId,
  setActiveSessionId as storeActiveSessionId,
  createNewSession,
  updateSessionMessages,
  deleteSessionById,
  type ChatSession,
  type ChatMessage,
} from '../services/chatStorage';

interface AppContextValue {
  activeDecisionId: string | null;
  setActiveDecisionId: (id: string | null) => void;
  activeDecision: Decision | null;
  setActiveDecision: (d: Decision | null) => void;

  // Continuous Chat Sessions
  sessions: ChatSession[];
  activeSessionId: string;
  currentSession: ChatSession | undefined;
  switchToSession: (id: string) => void;
  startNewSession: (title?: string) => ChatSession;
  deleteSession: (id: string) => void;
  appendMessageToSession: (
    sessionId: string,
    message: Omit<ChatMessage, 'id' | 'timestamp'>,
    customTitle?: string
  ) => ChatMessage;
}

const ID_KEY = 'alpha.activeDecisionId';
const DECISION_KEY = 'alpha.activeDecision';

const AppContext = createContext<AppContextValue | null>(null);

function readId(): string | null {
  try {
    return localStorage.getItem(ID_KEY);
  } catch {
    return null;
  }
}

function readDecision(): Decision | null {
  try {
    const raw = localStorage.getItem(DECISION_KEY);
    return raw ? (JSON.parse(raw) as Decision) : null;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [activeDecisionId, setActiveDecisionIdState] = useState<string | null>(readId);
  const [activeDecision, setActiveDecisionState] = useState<Decision | null>(readDecision);

  // Chat sessions state
  const [sessions, setSessions] = useState<ChatSession[]>(() => getStoredSessions());
  const [activeSessionId, setActiveSessionIdStateInternal] = useState<string>(() => getActiveSessionId());

  const currentSession = sessions.find((s) => s.id === activeSessionId) || sessions[0];

  const switchToSession = (id: string) => {
    setActiveSessionIdStateInternal(id);
    storeActiveSessionId(id);
  };

  const startNewSession = (title?: string) => {
    const fresh = createNewSession(title);
    setSessions(getStoredSessions());
    setActiveSessionIdStateInternal(fresh.id);
    return fresh;
  };

  const deleteSession = (id: string) => {
    const updated = deleteSessionById(id);
    if (updated.length === 0) {
      const fresh = createNewSession();
      setSessions([fresh]);
      setActiveSessionIdStateInternal(fresh.id);
    } else {
      setSessions(updated);
      if (activeSessionId === id) {
        setActiveSessionIdStateInternal(updated[0].id);
        storeActiveSessionId(updated[0].id);
      }
    }
  };

  const appendMessageToSession = (
    sessionId: string,
    msgData: Omit<ChatMessage, 'id' | 'timestamp'>,
    customTitle?: string
  ): ChatMessage => {
    // Read directly from storage to eliminate any stale React state closure issues
    const freshSessions = getStoredSessions();
    const target = freshSessions.find((s) => s.id === sessionId);
    const newMsg: ChatMessage = {
      ...msgData,
      id: 'msg-' + crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    const existingMessages = target?.messages ? [...target.messages] : [];
    const updatedMessages = [...existingMessages, newMsg];
    updateSessionMessages(sessionId, updatedMessages, customTitle);
    setSessions(getStoredSessions());
    return newMsg;
  };

  const setActiveDecisionId = (id: string | null) => {
    setActiveDecisionIdState(id);
    try {
      if (id) localStorage.setItem(ID_KEY, id);
      else localStorage.removeItem(ID_KEY);
    } catch {
      /* storage unavailable — ignore */
    }
  };

  const setActiveDecision = (d: Decision | null) => {
    setActiveDecisionState(d);
    try {
      if (d) {
        localStorage.setItem(DECISION_KEY, JSON.stringify(d));
        localStorage.setItem(ID_KEY, d.id);
      } else {
        localStorage.removeItem(DECISION_KEY);
        localStorage.removeItem(ID_KEY);
      }
    } catch {
      /* storage unavailable — ignore */
    }
  };

  return (
    <AppContext.Provider
      value={{
        activeDecisionId,
        setActiveDecisionId,
        activeDecision,
        setActiveDecision,
        sessions,
        activeSessionId,
        currentSession,
        switchToSession,
        startNewSession,
        deleteSession,
        appendMessageToSession,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return ctx;
}
