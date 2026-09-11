import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { api } from '../api/client';
import { IconShieldCheck } from '../components/icons';

function Row({
  label,
  value,
  tone = 'default',
}: {
  label: string;
  value: string;
  tone?: 'default' | 'accent' | 'warn';
}) {
  const toneCls =
    tone === 'accent'
      ? 'text-alpha-accent'
      : tone === 'warn'
        ? 'text-alpha-warn'
        : 'text-alpha-ink';
  return (
    <div className="flex items-center justify-between border-b border-alpha-edge py-2.5 last:border-0">
      <span className="text-sm text-alpha-muted">{label}</span>
      <span className={`text-sm font-medium ${toneCls}`}>{value}</span>
    </div>
  );
}

export default function Settings() {
  const [firebase, setFirebase] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    api
      .getStatus()
      .then((s) => alive && setFirebase(s.firebase.configured))
      .catch(() => alive && setFirebase(false));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="max-w-3xl">
      <PageHeader
        eyebrow="Settings"
        title="Workspace Settings"
        description="Configuration for the Alpha decision engine."
      />

      <div className="space-y-4">
        <section className="glass p-5">
          <p className="panel-title mb-2">Backend</p>
          <Row
            label="Firebase"
            value={firebase === null ? '…' : firebase ? 'Connected' : 'Local-only (not configured)'}
            tone={firebase ? 'accent' : 'warn'}
          />
          <Row label="Data platform" value="Cloud Firestore + Storage" />
          <Row label="API" value="Express · /api" />
        </section>

        <section className="glass p-5">
          <p className="panel-title mb-3">Authentication</p>
          <div className="flex items-center gap-3 rounded-xl border border-alpha-border bg-white/[0.02] px-4 py-3">
            <IconShieldCheck size={18} className="text-alpha-faint" />
            <div>
              <p className="text-sm text-alpha-ink">Not implemented yet</p>
              <p className="text-xs text-alpha-faint">
                User authentication arrives in a later milestone.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
