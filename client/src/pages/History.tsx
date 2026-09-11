import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { api } from '../api/client';
import type { Decision } from '../types';
import { EmptyState, LoadingState } from '../components/states';
import { IconPlus, IconClock, IconArrowRight } from '../components/icons';

export default function History() {
  const [decisions, setDecisions] = useState<Decision[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    api
      .listDecisions()
      .then(({ decisions }) => alive && setDecisions(decisions))
      .catch(() => alive && setError('Failed to load decisions.'));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="History"
        title="Decision Registry"
        description="All decisions captured in PROJECT ALPHA, persisted in SQLite."
        actions={
          <Link to="/decision/new" className="btn-primary">
            <IconPlus size={16} /> New Decision
          </Link>
        }
      />

      {error && <p className="text-sm text-alpha-danger">{error}</p>}

      {!decisions && !error && <LoadingState label="Loading decisions…" />}

      {decisions && decisions.length === 0 && (
        <EmptyState
          icon={<IconClock size={20} />}
          title="No decisions yet"
          hint="Create your first decision to begin populating the registry."
          action={
            <Link to="/decision/new" className="btn-primary mt-4">
              <IconPlus size={16} /> New Decision
            </Link>
          }
        />
      )}

      {decisions && decisions.length > 0 && (
        <div className="glass overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-alpha-border text-xs uppercase tracking-wider text-alpha-faint">
              <tr>
                <th className="px-5 py-3 font-medium">Title</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Created</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {decisions.map((d) => (
                <tr
                  key={d.id}
                  className="border-b border-alpha-edge transition-colors last:border-0 hover:bg-white/[0.03]"
                >
                  <td className="px-5 py-3">
                    <Link
                      to={`/decision/${d.id}`}
                      className="font-medium text-alpha-ink hover:text-alpha-accent"
                    >
                      {d.title}
                    </Link>
                    <p className="font-mono text-xs text-alpha-faint">{d.id.slice(0, 8)}</p>
                  </td>
                  <td className="px-5 py-3">
                    <span className="chip">{d.status}</span>
                  </td>
                  <td className="px-5 py-3 text-alpha-muted">
                    {new Date(d.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link to={`/decision/${d.id}`} className="text-alpha-faint hover:text-alpha-accent">
                      <IconArrowRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
