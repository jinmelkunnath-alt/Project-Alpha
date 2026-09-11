import { NavLink, useLocation } from 'react-router-dom';
import type { ComponentType } from 'react';
import { IconAlpha, IconPlus, IconList, IconActivity, IconFlask, IconSparkle } from './icons';

type IconType = ComponentType<{ size?: number; className?: string }>;

interface NavItem {
  label: string;
  icon: IconType;
  to: string;
}

const NAV: NavItem[] = [
  { label: 'New Decision', icon: IconPlus, to: '/decision/new' },
  { label: 'Decisions', icon: IconList, to: '/history' },
  { label: 'Monitoring', icon: IconActivity, to: '/monitoring' },
  { label: 'Research', icon: IconFlask, to: '/research' },
  { label: 'Insights', icon: IconSparkle, to: '/insights' },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation();

  const isActive = (to: string) => {
    if (to === '/history') return location.pathname === '/history' || location.pathname.startsWith('/decision');
    return location.pathname === to;
  };

  return (
    <aside className="flex h-full w-[280px] shrink-0 flex-col border-r border-white/[0.06] bg-[#0a0c11]">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-alpha-accent to-alpha-accent-2 text-[#04130d] shadow-glow">
          <IconAlpha size={20} />
        </span>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-[0.22em] text-alpha-ink">ALPHA</p>
          <p className="text-[10px] uppercase tracking-[0.2em] text-alpha-faint">PROJECT ALPHA</p>
        </div>
      </div>

      <div className="mx-3 h-px bg-alpha-border" />

      <nav className="flex-1 overflow-y-auto px-3 py-5">
        <ul className="space-y-1">
          {NAV.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.to}
                onClick={onNavigate}
                className={`nav-link ${isActive(item.to) ? 'nav-link-active' : ''}`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom: system status */}
      <div className="border-t border-alpha-border p-5">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-alpha-success" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-alpha-success" />
          </span>
          <div className="leading-tight">
            <p className="text-xs font-medium text-alpha-ink">System Online</p>
            <p className="text-[11px] text-alpha-faint">All systems operational</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
