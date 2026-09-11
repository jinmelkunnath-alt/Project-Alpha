import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { ReactNode } from 'react';
import PageHeader from './PageHeader';
import ModulePlaceholder from './Placeholder';
import { LoadingState, NotFound } from './states';
import { api, ApiError } from '../api/client';
import type { Decision } from '../types';
import { useApp } from '../context/AppContext';

interface StagePageProps {
  stage: string;
  title: string;
  icon: ReactNode;
  description?: string;
}

// Shared shell for the decision-scoped pipeline modules. Loads the decision for
// context, then renders the "not yet active" placeholder. AI logic arrives later.
export default function StagePage({ stage, title, icon, description }: StagePageProps) {
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
        eyebrow={decision.title}
        title={title}
        description={`Decision context for "${decision.title}".`}
        actions={
          <Link to={`/decision/${decision.id}`} className="btn-ghost">
            Overview
          </Link>
        }
      />
      <ModulePlaceholder stage={stage} title={title} icon={icon} description={description} />
    </div>
  );
}
