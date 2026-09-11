import { useState, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api, ApiError } from '../api/client';
import type { Decision } from '../types';
import {
  IconPaperclip,
  IconSearch,
  IconSparkle,
  IconRocket,
  IconGlobe,
  IconTrendUp,
  IconLayers,
  IconShieldLine,
} from '../components/icons';

const QUICK = [
  { text: 'Should we launch\na new product?', icon: IconRocket },
  { text: 'Enter a new\nmarket?', icon: IconGlobe },
  { text: 'Invest in this\nopportunity?', icon: IconTrendUp },
  { text: 'Build or buy?', icon: IconLayers },
  { text: 'How can we\nreduce risk?', icon: IconShieldLine },
];

export default function NewDecision() {
  const navigate = useNavigate();
  const { setActiveDecision } = useApp();
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function startDecision(text: string) {
    const raw = text.trim();
    if (!raw || submitting) return;
    // First line = the decision; remaining lines = context/constraints.
    const [titleLine, ...rest] = raw.split('\n');
    const title = titleLine.trim();
    const description = rest.join(' ').trim() || undefined;
    if (!title) return;

    const local: Decision = {
      id: crypto.randomUUID(),
      title,
      description: description ?? null,
      status: 'analyzing',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setSubmitting(true);
    try {
      // Persist via the API (Firestore) when configured; otherwise run locally.
      const { decision } = await api.createDecision({ title, description });
      setActiveDecision(decision);
      navigate(`/decision/${decision.id}/analyze`);
    } catch {
      // Local-only fallback so the demo flows without Firebase keys.
      setActiveDecision(local);
      navigate(`/decision/${local.id}/analyze`);
    }
  }

  function handleSend() {
    startDecision(value);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  const controls = [
    { label: 'Attachment', icon: IconPaperclip },
    { label: 'Search', icon: IconSearch },
    { label: 'Deep Analysis', icon: IconSparkle },
  ];

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-5 py-16">
      <div className="w-full max-w-2xl">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.3em] text-alpha-faint">
          New Decision
        </p>

        <h1 className="mt-5 text-center text-4xl font-semibold leading-[1.12] tracking-tight text-alpha-ink sm:text-5xl">
          What decision are you
          <br />
          <span className="text-alpha-accent">trying to make?</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-alpha-muted">
          Give Alpha the decision, context, evidence, and constraints. Alpha will challenge it
          before you commit.
        </p>

        {/* Cinematic AI input surface */}
        <div className="glass mt-8 rounded-3xl p-3 transition-all focus-within:border-alpha-accent/50 focus-within:shadow-glow">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Describe the decision you need Alpha to analyze…"
            className="w-full resize-none bg-transparent px-3 py-3 text-base text-alpha-ink placeholder:text-alpha-faint focus:outline-none"
          />
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 pb-1 pt-2">
            <div className="flex flex-wrap items-center gap-1 text-xs text-alpha-faint">
              {controls.map((c) => (
                <button
                  key={c.label}
                  type="button"
                  className="flex items-center gap-1.5 rounded-md px-2 py-1 transition-colors hover:bg-white/[0.04] hover:text-alpha-ink"
                >
                  <c.icon size={14} />
                  {c.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleSend}
              disabled={submitting}
              className="btn-primary shrink-0 disabled:opacity-60"
            >
              {submitting && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#04130d]/40 border-t-[#04130d]" />
              )}
              Analyze with Alpha →
            </button>
          </div>
        </div>

        {/* Example decision chips */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {QUICK.map((q) => (
            <button
              key={q.text}
              type="button"
              onClick={() => setValue(q.text.replace(/\n/g, ' '))}
              className="group rounded-2xl border border-alpha-border bg-white/[0.02] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-alpha-accent/40 hover:shadow-glow"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-alpha-accent">
                <q.icon size={16} />
              </span>
              <p className="mt-3 whitespace-pre-line text-sm leading-snug text-alpha-ink">{q.text}</p>
            </button>
          ))}
        </div>

        {/* Trust / status line */}
        <p className="mt-10 text-center text-xs text-alpha-faint">
          Alpha Decision Engine
          <br />
          <span className="text-alpha-muted">
            Evidence-aware • Risk-focused • Continuously verifiable
          </span>
        </p>
      </div>
    </div>
  );
}
