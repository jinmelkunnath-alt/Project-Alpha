import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { Pipeline } from '../components/Pipeline';
import { LoadingState, NotFound } from '../components/states';
import { api, ApiError } from '../api/client';
import type { Decision } from '../types';
import { useApp } from '../context/AppContext';
import {
  IconDocument,
  IconSearch,
  IconChat,
  IconShieldCheck,
  IconAlert,
  IconScale,
  IconArrowRight,
} from '../components/icons';

const STAGES = [
  { key: 'evidence', label: 'Evidence', icon: IconDocument, desc: 'Extract and structure source evidence.' },
  { key: 'research', label: 'Research', icon: IconSearch, desc: 'Gather external context via search.' },
  { key: 'debate', label: 'Debate', icon: IconChat, desc: 'Model opposing positions.' },
  { key: 'verification', label: 'Verification', icon: IconShieldCheck, desc: 'Validate claims and sources.' },
  { key: 'risks', label: 'Risks', icon: IconAlert, desc: 'Surface and score risks.' },
  { key: 'verdict', label: 'Verdict', icon: IconScale, desc: 'Produce a scored recommendation.' },
];

export default function DecisionDetail() {
  const { id = '' } = useParams();
  const { setActiveDecisionId } = useApp();
  const [decision, setDecision] = useState<Decision | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .getDecision(id)
      .then(({ decision }) => {
        if (!alive) return;
        setDecision(decision);
        setActiveDecisionId(decision.id);
      })
      .catch((e) => alive && setError(e instanceof ApiError ? e.message : 'Failed to load decision.'))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [id, setActiveDecisionId]);

  if (loading) return <LoadingState />;
  if (error || !decision) {
    return (
      <NotFound
        message={error ?? 'Decision not found.'}
        action={
          <Link to="/history" className="btn-ghost mt-4">
            Back to history
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow={`Decision · ${decision.id.slice(0, 8)}`}
        title={decision.title}
        description={decision.description ?? 'No description provided.'}
        actions={
          <span className="chip">
            <span className="h-1.5 w-1.5 rounded-full bg-alpha-accent" /> {decision.status}
          </span>
        }
      />

      <section className="glass p-5">
        <p className="panel-title mb-3">Pipeline</p>
        <Pipeline current={decision.status} />
      </section>

      <section className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {STAGES.map((s) => (
          <Link
            key={s.key}
            to={`/decision/${decision.id}/${s.key}`}
            className="group glass flex items-start gap-3 p-4 transition-colors hover:border-alpha-accent/40"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-alpha-accent">
              <s.icon size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-alpha-ink">{s.label}</p>
              <p className="mt-0.5 text-xs text-alpha-faint">{s.desc}</p>
            </div>
            <IconArrowRight
              size={16}
              className="mt-1 text-alpha-faint transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        ))}
      </section>

      <p className="mt-5 text-xs text-alpha-faint">
        Created {new Date(decision.created_at).toLocaleString()} · Updated{' '}
        {new Date(decision.updated_at).toLocaleString()}
      </p>
    </div>
  );
}
