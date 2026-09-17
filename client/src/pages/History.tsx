import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { api } from '../api/client';
import { useApp } from '../context/AppContext';
import type { Decision } from '../types';
import { EmptyState, LoadingState } from '../components/states';
import { IconPlus, IconClock, IconArrowRight } from '../components/icons';
import { AnimatedShinyButton } from '@/components/eldoraui/animated-shiny-button';

export default function History() {
  const navigate = useNavigate();
  const { sessions, switchToSession, startNewSession, deleteSession } = useApp();
  const [decisions, setDecisions] = useState<Decision[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'chats' | 'registry'>('chats');

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

  function handleResumeChat(sessionId: string) {
    switchToSession(sessionId);
    navigate('/');
  }

  function handleStartNew() {
    startNewSession();
    navigate('/');
  }

  return (
    <div className="pb-16">
      <PageHeader
        eyebrow="History"
        title="Intelligence & Chat History"
        description="All conversational decision analyses, stress tests, and formal registry records."
        actions={
          <AnimatedShinyButton onClick={handleStartNew}>
            <IconPlus size={16} /> <span>New Chat Decision</span>
          </AnimatedShinyButton>
        }
      />

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/[0.08] mb-6">
        <button
          type="button"
          onClick={() => setActiveTab('chats')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
            activeTab === 'chats'
              ? 'border-emerald-400 text-white'
              : 'border-transparent text-alpha-muted hover:text-white'
          }`}
        >
          Chat Sessions ({sessions.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('registry')}
          className={`px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 -mb-px ${
            activeTab === 'registry'
              ? 'border-emerald-400 text-white'
              : 'border-transparent text-alpha-muted hover:text-white'
          }`}
        >
          Database Registry ({decisions ? decisions.length : '...'})
        </button>
      </div>

      {activeTab === 'chats' && (
        <div>
          {sessions.length === 0 ? (
            <EmptyState
              icon={<IconClock size={20} />}
              title="No chat sessions yet"
              hint="Start a conversation with Alpha to investigate your strategic decisions."
              action={
                <AnimatedShinyButton onClick={handleStartNew} className="mt-4">
                  <IconPlus size={16} /> <span>Start First Chat</span>
                </AnimatedShinyButton>
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sessions.map((session) => {
                const lastMsg = session.messages[session.messages.length - 1];
                const verdictMsg = session.messages.find((m) => m.verdict);

                return (
                  <div
                    key={session.id}
                    className="glass-card group flex flex-col justify-between p-5 transition-all hover:border-emerald-500/40 hover:shadow-glow"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="text-[11px] font-mono text-alpha-faint">
                          {new Date(session.updatedAt).toLocaleDateString()} • {session.messages.length} messages
                        </span>
                        {verdictMsg?.verdict && (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                              verdictMsg.verdict === 'GO'
                                ? 'bg-emerald-500/20 text-emerald-300'
                                : verdictMsg.verdict === 'CONDITIONAL GO'
                                ? 'bg-cyan-500/20 text-cyan-300'
                                : verdictMsg.verdict === 'CAUTION'
                                ? 'bg-amber-500/20 text-amber-300'
                                : 'bg-rose-500/20 text-rose-300'
                            }`}
                          >
                            {verdictMsg.verdict}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-semibold text-white leading-snug group-hover:text-emerald-300 transition-colors">
                        {session.title}
                      </h3>

                      {lastMsg && (
                        <p className="mt-2 line-clamp-2 text-xs text-alpha-muted leading-relaxed">
                          {lastMsg.content.slice(0, 140)}...
                        </p>
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.05] pt-3">
                      <button
                        type="button"
                        onClick={() => deleteSession(session.id)}
                        className="text-xs text-alpha-faint hover:text-rose-400 transition-colors"
                      >
                        Delete
                      </button>

                      <AnimatedShinyButton
                        onClick={() => handleResumeChat(session.id)}
                        className="text-xs py-1.5 px-3"
                      >
                        <span>Continue Chat →</span>
                      </AnimatedShinyButton>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'registry' && (
        <div>
          {error && <p className="text-sm text-alpha-danger mb-4">{error}</p>}
          {!decisions && !error && <LoadingState label="Loading decisions…" />}

          {decisions && decisions.length === 0 && (
            <EmptyState
              icon={<IconClock size={20} />}
              title="No decisions yet"
              hint="Create your first decision to begin populating the registry."
              action={
                <AnimatedShinyButton url="/decision/new" className="mt-4">
                  <IconPlus size={16} /> <span>New Decision</span>
                </AnimatedShinyButton>
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
      )}
    </div>
  );
}
