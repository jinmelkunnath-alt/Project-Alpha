import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { api, ApiError } from '../api/client';
import type { Decision } from '../types';
import {
  IconSend,
  IconMicrophone,
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

export default function Dashboard() {
  const navigate = useNavigate();
  const { setActiveDecision } = useApp();
  const [value, setValue] = useState('');

  async function startDecision(text: string) {
    const title = text.trim();
    if (!title) return;
    const local: Decision = {
      id: crypto.randomUUID(),
      title,
      description: null,
      status: 'analyzing',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    try {
      // Prefer the API (Firestore) when configured; otherwise run locally.
      const { decision } = await api.createDecision({ title });
      setActiveDecision(decision);
      navigate(`/decision/${decision.id}/analyze`);
    } catch (err) {
      if (err instanceof ApiError && err.status !== 503) {
        // Non-config errors: still open the workspace so the demo flows.
      }
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

  return (
    <div className="relative flex min-h-[calc(100vh-2rem)] flex-col items-center justify-center px-5 pb-28 pt-16">
      {/* Right-side vertical branding (upper-right, viewport-anchored) */}
      <div className="pointer-events-none fixed right-8 top-24 hidden flex-col items-center gap-3 text-alpha-faint lg:flex">
        {['Better', 'Questions', 'Brighter', 'Tomorrows'].map((w) => (
          <span key={w} className="text-[11px] font-medium uppercase tracking-[0.3em]">
            {w}
          </span>
        ))}
        <span className="mt-2 h-px w-8 bg-alpha-accent/60" />
      </div>

      {/* Bottom-center tagline */}
      <div className="pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium uppercase tracking-[0.35em] text-alpha-faint">
        Built for bigger thinking
      </div>

      {/* Bottom-right status card */}
        <div className="fixed bottom-6 right-6 hidden w-[210px] glass-soft p-3 xl:block">
        <div className="flex items-start gap-2">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-alpha-accent pulse-dot" />
          <p className="text-xs leading-relaxed text-alpha-muted">
            Your decisions deserve a second opinion. Alpha is here 24/7.
          </p>
        </div>
      </div>

      {/* Central content */}
      <div className="w-full max-w-2xl">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.3em] text-alpha-faint">
          Project Alpha
        </p>

        <h1 className="mt-5 text-center text-4xl font-semibold leading-[1.12] tracking-tight text-alpha-ink sm:text-5xl">
          What decision are you
          <br />
          <span className="text-alpha-accent">trying to make?</span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-center text-sm leading-relaxed text-alpha-muted">
          Alpha investigates the evidence, challenges assumptions, and stress-tests your
          decision before you commit.
        </p>

        {/* Premium glass input */}
        <div className="glass mt-8 rounded-3xl p-3 transition-all focus-within:border-alpha-accent/50 focus-within:shadow-glow">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Describe your decision, upload evidence, or ask anything…"
            className="w-full resize-none bg-transparent px-3 py-3 text-base text-alpha-ink placeholder:text-alpha-faint focus:outline-none"
          />
          <div className="flex items-center justify-between gap-2 px-2 pb-1 pt-2">
            <div className="flex flex-wrap items-center gap-1 text-xs text-alpha-faint">
              <button type="button" className="rounded-md px-2 py-1 transition-colors hover:bg-white/[0.04] hover:text-alpha-ink">
                /
              </button>
              <button type="button" className="rounded-md px-2 py-1 transition-colors hover:bg-white/[0.04] hover:text-alpha-ink">
                Search
              </button>
              <button type="button" className="rounded-md px-2 py-1 transition-colors hover:bg-white/[0.04] hover:text-alpha-ink">
                Deep Analysis
              </button>
              <button type="button" className="rounded-md px-2 py-1 transition-colors hover:bg-white/[0.04] hover:text-alpha-ink">
                Attach
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-full text-alpha-faint transition-colors hover:bg-white/[0.04] hover:text-alpha-ink"
                aria-label="Voice input"
              >
                <IconMicrophone size={18} />
              </button>
              <button
                type="button"
                onClick={handleSend}
                className="flex h-9 items-center gap-2 rounded-full bg-alpha-accent px-4 text-sm font-medium text-[#04130d] shadow-glow transition-colors hover:bg-alpha-accent/90"
                aria-label="Send"
              >
                <IconSend size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Quick decision cards */}
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
      </div>
    </div>
  );
}
