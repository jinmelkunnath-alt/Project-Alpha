import { useState, type ReactNode } from 'react';
import { IconChevronRight } from './icons';

interface CollapsibleProps {
  title: string;
  icon?: ReactNode;
  count?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

export default function Collapsible({
  title,
  icon,
  count,
  defaultOpen = false,
  children,
}: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass-soft overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/[0.02]"
      >
        {icon && <span className="text-alpha-accent">{icon}</span>}
        <span className="text-sm font-medium text-alpha-ink">{title}</span>
        {count != null && <span className="chip">{count}</span>}
        <IconChevronRight
          size={16}
          className={`ml-auto text-alpha-faint transition-transform duration-300 ${
            open ? 'rotate-90' : ''
          }`}
        />
      </button>
      {open && (
        <div className="px-4 pb-4 pt-1 rise">{children}</div>
      )}
    </div>
  );
}
