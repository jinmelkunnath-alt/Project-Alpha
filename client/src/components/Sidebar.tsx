import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  IconSearch,
  IconDocument,
  IconActivity,
  IconGlobe,
  IconLightbulb,
  IconSettings,
  IconChevronDown,
  IconChevronRight,
  IconChevronLeft,
  IconPanelLeft,
  IconCheck,
  IconAlphaEmblem,
} from './icons';

interface SidebarProps {
  onNavigate?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({ onNavigate, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [decisionsSubmenuOpen, setDecisionsSubmenuOpen] = useState(true);
  const [footerExpanded, setFooterExpanded] = useState(false);

  const isActive = (to: string) => {
    if (to === '/history') return location.pathname === '/history' || location.pathname.startsWith('/decision/');
    return location.pathname === to;
  };

  function handleNewDecision() {
    onNavigate?.();
    navigate('/');
    const el = document.getElementById('decision-input') as HTMLTextAreaElement | null;
    if (el) {
      el.focus();
    }
  }

  return (
    <aside
      className={`relative flex h-full shrink-0 flex-col border-r border-white/[0.06] bg-[#070a0d]/95 backdrop-blur-2xl transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Brand Header with Collapse Toggle */}
      <div className={`flex items-center pt-6 pb-5 transition-all ${isCollapsed ? 'justify-center px-3' : 'justify-between px-5'}`}>
        <div
          onClick={() => {
            onNavigate?.();
            navigate('/');
          }}
          className="flex items-center gap-2.5 cursor-pointer group"
          title="Project Alpha"
        >
          {/* Official Project Alpha Emblem */}
          <IconAlphaEmblem size={isCollapsed ? 32 : 36} className="transition-transform group-hover:scale-105" />

          {!isCollapsed && (
            <div className="leading-tight overflow-hidden whitespace-nowrap">
              <p className="text-[8px] font-semibold tracking-[0.38em] text-alpha-faint uppercase">PROJECT</p>
              <div className="text-[13px] font-bold tracking-[0.24em] text-white flex items-center gap-0.5">
                <span className="text-emerald-400">Λ</span>
                <span>L</span>
                <span>P</span>
                <span>H</span>
                <span className="text-emerald-400">Λ</span>
              </div>
              <p className="text-[7.5px] font-medium tracking-[0.2em] text-emerald-400/70 uppercase">A BRIGHTER TOMORROW</p>
            </div>
          )}
        </div>

        {/* Sidebar Collapse Toggle Button */}
        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-alpha-faint hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 transition-all ${
              isCollapsed ? 'absolute -right-3 top-7 z-40 bg-[#0c1117] shadow-lg' : ''
            }`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <IconChevronRight size={13} /> : <IconPanelLeft size={13} />}
          </button>
        )}
      </div>

      {/* Main Action: New Decision Button */}
      <div className="px-3 pb-3">
        <button
          type="button"
          onClick={handleNewDecision}
          className={`group flex w-full items-center rounded-xl border border-white/[0.08] bg-white/[0.03] text-xs font-medium text-white/90 shadow-sm transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/[0.06] hover:shadow-[0_0_20px_-5px_rgba(52,211,153,0.3)] ${
            isCollapsed ? 'justify-center p-2.5' : 'gap-3 px-3.5 py-2.5'
          }`}
          title="New Decision (/ or Ctrl+K)"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] text-emerald-400 transition-transform group-hover:scale-110">
            <IconSearch size={14} />
          </span>
          {!isCollapsed && <span className="font-medium tracking-wide whitespace-nowrap">New Decision</span>}
        </button>
      </div>

      {/* Primary Navigation & Collapsible Menus */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-1">
        <ul className="space-y-1">
          {/* Decisions with Collapsible Submenu */}
          <li>
            <div className="flex flex-col">
              <div
                className={`group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-all ${
                  isActive('/history')
                    ? 'bg-white/[0.06] text-white shadow-[inset_3px_0_0_0_rgba(52,211,153,0.85),inset_0_0_0_1px_rgba(255,255,255,0.08)]'
                    : 'text-alpha-muted hover:bg-white/[0.04] hover:text-white'
                }`}
              >
                <NavLink
                  to="/history"
                  onClick={onNavigate}
                  className={`flex flex-1 items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}
                  title="Decisions"
                >
                  <IconDocument size={17} className={isActive('/history') ? 'text-emerald-400' : 'text-alpha-muted group-hover:text-white'} />
                  {!isCollapsed && <span>Decisions</span>}
                </NavLink>

                {/* Collapsible toggle chevron */}
                {!isCollapsed && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setDecisionsSubmenuOpen(!decisionsSubmenuOpen);
                    }}
                    className="p-1 text-alpha-faint hover:text-white transition-colors"
                    title={decisionsSubmenuOpen ? 'Collapse menu' : 'Expand menu'}
                  >
                    <IconChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${decisionsSubmenuOpen ? 'rotate-0 text-emerald-400' : '-rotate-90'}`}
                    />
                  </button>
                )}
              </div>

              {/* Collapsible Submenu Content */}
              {!isCollapsed && decisionsSubmenuOpen && (
                <div className="ml-7 mt-1 space-y-0.5 border-l border-white/[0.08] pl-2.5 py-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
                  <NavLink
                    to="/history"
                    onClick={onNavigate}
                    className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-alpha-muted hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    <span>All Decisions</span>
                    <span className="text-[10px] text-alpha-faint bg-white/[0.04] px-1.5 py-0.5 rounded">History</span>
                  </NavLink>
                  <NavLink
                    to="/decision/new"
                    onClick={onNavigate}
                    className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-alpha-muted hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    <span>Active Analysis</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </NavLink>
                  <NavLink
                    to="/monitoring"
                    onClick={onNavigate}
                    className="flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-alpha-muted hover:bg-white/[0.04] hover:text-white transition-colors"
                  >
                    <span>Under Watch</span>
                    <span className="text-[10px] text-emerald-400/80">24/7</span>
                  </NavLink>
                </div>
              )}
            </div>
          </li>

          {/* Monitoring */}
          <li>
            <NavLink
              to="/monitoring"
              onClick={onNavigate}
              className={`nav-link ${isActive('/monitoring') ? 'nav-link-active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
              title="Monitoring"
            >
              <IconActivity size={17} className={isActive('/monitoring') ? 'text-emerald-400' : 'text-alpha-muted group-hover:text-white'} />
              {!isCollapsed && <span>Monitoring</span>}
            </NavLink>
          </li>

          {/* Research */}
          <li>
            <NavLink
              to="/research"
              onClick={onNavigate}
              className={`nav-link ${isActive('/research') ? 'nav-link-active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
              title="Research"
            >
              <IconGlobe size={17} className={isActive('/research') ? 'text-emerald-400' : 'text-alpha-muted group-hover:text-white'} />
              {!isCollapsed && <span>Research</span>}
            </NavLink>
          </li>

          {/* Insights */}
          <li>
            <NavLink
              to="/insights"
              onClick={onNavigate}
              className={`nav-link ${isActive('/insights') ? 'nav-link-active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
              title="Insights"
            >
              <IconLightbulb size={17} className={isActive('/insights') ? 'text-emerald-400' : 'text-alpha-muted group-hover:text-white'} />
              {!isCollapsed && <span>Insights</span>}
            </NavLink>
          </li>

          {/* Settings */}
          <li>
            <NavLink
              to="/settings"
              onClick={onNavigate}
              className={`nav-link ${isActive('/settings') ? 'nav-link-active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
              title="Settings"
            >
              <IconSettings size={17} className={isActive('/settings') ? 'text-emerald-400' : 'text-alpha-muted group-hover:text-white'} />
              {!isCollapsed && <span>Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Bottom Area: System Online, Profile & Taglines (Compact when collapsed) */}
      <div className="border-t border-white/[0.06] p-3 space-y-2 shrink-0">
        {/* System Online Status Card */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowStatusModal(!showStatusModal)}
            className={`flex w-full items-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 text-left transition-all hover:bg-white/[0.05] ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
            title="System Online - 18ms latency"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {!isCollapsed && (
                <div className="leading-tight overflow-hidden">
                  <p className="text-xs font-medium text-white/90 truncate">System Online</p>
                  <p className="text-[10px] text-alpha-faint truncate">All systems operational</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <IconChevronDown size={13} className={`text-alpha-faint transition-transform shrink-0 ${showStatusModal ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Status Details Diagnostics Dropdown */}
          {showStatusModal && (
            <div
              className={`absolute bottom-full mb-2 rounded-xl border border-white/10 bg-[#0c1116]/95 p-3 text-xs shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isCollapsed ? 'left-full ml-2 w-60' : 'left-0 w-60'
              }`}
            >
              <p className="font-semibold text-white mb-2 flex items-center justify-between">
                <span>Diagnostics</span>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">99.98% SLA</span>
              </p>
              <div className="space-y-1.5 text-alpha-muted text-[11px]">
                <div className="flex justify-between">
                  <span>Inference:</span>
                  <span className="text-white">Gemini 3.8 Flash</span>
                </div>
                <div className="flex justify-between">
                  <span>Red Team:</span>
                  <span className="text-emerald-400">Armed</span>
                </div>
                <div className="flex justify-between">
                  <span>Telemetry:</span>
                  <span className="text-emerald-400">18ms</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className={`flex w-full items-center rounded-xl border border-white/[0.06] bg-white/[0.02] p-2 text-left transition-all hover:bg-white/[0.05] ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
            title="Tace - Team Alpha"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-950/80 ring-1 ring-emerald-500/50">
                <span className="text-xs font-bold text-emerald-300">T</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-[#070a0d]" />
              </div>
              {!isCollapsed && (
                <div className="leading-tight overflow-hidden">
                  <p className="text-xs font-semibold text-white truncate">Tace</p>
                  <p className="text-[10px] text-alpha-faint truncate">Team Alpha</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <IconChevronDown size={13} className={`text-alpha-faint transition-transform shrink-0 ${showProfileMenu ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div
              className={`absolute bottom-full mb-2 rounded-xl border border-white/10 bg-[#0c1116]/95 p-2 text-xs shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isCollapsed ? 'left-full ml-2 w-52' : 'left-0 w-52'
              }`}
            >
              <div className="px-2 py-1.5 border-b border-white/[0.06] mb-1">
                <p className="text-[10px] text-alpha-faint">Signed in as</p>
                <p className="text-xs font-semibold text-white truncate">tace@projectalpha.ai</p>
              </div>
              <button
                type="button"
                onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
                className="w-full text-left px-2 py-1.5 rounded text-alpha-muted hover:bg-white/[0.05] hover:text-white"
              >
                Workspace Settings
              </button>
            </div>
          )}
        </div>

        {/* Footer Brand Slogan List (collapsible toggleable to prevent squishing) */}
        {!isCollapsed && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setFooterExpanded(!footerExpanded)}
              className="flex w-full items-center justify-between text-[9px] font-semibold uppercase tracking-[0.25em] text-alpha-faint/70 hover:text-white py-1 px-1 transition-colors"
            >
              <span>Methodology</span>
              <IconChevronDown size={11} className={`transition-transform ${footerExpanded ? 'rotate-180 text-emerald-400' : ''}`} />
            </button>
            {footerExpanded && (
              <div className="px-1 text-[8.5px] font-medium uppercase tracking-[0.22em] text-alpha-faint/80 space-y-1 pt-1 pb-1 animate-in fade-in duration-150">
                <p className="hover:text-emerald-400 transition-colors">ANALYZE</p>
                <p className="hover:text-emerald-400 transition-colors">CHALLENGE</p>
                <p className="hover:text-emerald-400 transition-colors">VERIFY</p>
                <p className="hover:text-emerald-400 transition-colors">DECIDE</p>
                <p className="hover:text-emerald-400 transition-colors">MONITOR</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
