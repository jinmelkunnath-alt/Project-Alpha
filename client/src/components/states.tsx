import type { ReactNode } from 'react';

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-alpha-muted">
      <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-alpha-accent" />
      {label}
    </div>
  );
}

export function NotFound({ message, action }: { message: string; action?: ReactNode }) {
  return (
    <div className="glass p-8 text-center">
      <p className="text-sm font-medium text-alpha-ink">{message}</p>
      {action}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  hint,
  action,
}: {
  icon?: ReactNode;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="glass flex flex-col items-center gap-3 p-10 text-center">
      {icon && (
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-alpha-faint">
          {icon}
        </span>
      )}
      <p className="text-sm font-medium text-alpha-ink">{title}</p>
      {hint && <p className="max-w-sm text-xs text-alpha-faint">{hint}</p>}
      {action}
    </div>
  );
}
