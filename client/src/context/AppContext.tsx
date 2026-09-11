import { createContext, useContext, useState, type ReactNode } from 'react';
import type { Decision } from '../types';

interface AppContextValue {
  activeDecisionId: string | null;
  setActiveDecisionId: (id: string | null) => void;
  activeDecision: Decision | null;
  setActiveDecision: (d: Decision | null) => void;
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
      value={{ activeDecisionId, setActiveDecisionId, activeDecision, setActiveDecision }}
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
