import { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
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
  IconPlus,
} from './icons';
import { AnimatedShinyButton } from './eldoraui/animated-shiny-button';

interface SidebarProps {
  onNavigate?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export default function Sidebar({ onNavigate, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { sessions, activeSessionId, switchToSession, startNewSession, deleteSession } = useApp();

  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [decisionsSubmenuOpen, setDecisionsSubmenuOpen] = useState(false);
  const [footerExpanded, setFooterExpanded] = useState(false);

  const isActive = (to: string) => {
    if (to === '/history') return location.pathname === '/history' || location.pathname.startsWith('/decision/');
    return location.pathname === to;
  };

  function handleNewDecision() {
    startNewSession();
    navigate('/');
    onNavigate?.();
    setTimeout(() => {
      const el = document.getElementById('decision-input') as HTMLTextAreaElement | null;
      if (el) {
        el.focus();
      }
    }, 50);
  }

  return (
    <aside
      className={`relative flex h-full shrink-0 flex-col border-r border-slate-200 bg-white backdrop-blur-2xl transition-all duration-300 ease-in-out ${
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
          <IconAlphaEmblem size={isCollapsed ? 32 : 36} className="transition-transform group-hover:scale-105" />

          {!isCollapsed && (
            <div className="leading-tight overflow-hidden whitespace-nowrap">
              <p className="text-[8px] font-bold tracking-[0.38em] text-slate-500 uppercase">PROJECT</p>
              <div className="text-[13px] font-bold tracking-[0.24em] text-slate-900 flex items-center gap-0.5">
                <span className="text-emerald-600">Λ</span>
                <span>L</span>
                <span>P</span>
                <span>H</span>
                <span className="text-emerald-600">Λ</span>
              </div>
              <p className="text-[7.5px] font-semibold tracking-[0.2em] text-emerald-700 uppercase">A BRIGHTER TOMORROW</p>
            </div>
          )}
        </div>

        {onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-800 transition-all ${
              isCollapsed ? 'absolute -right-3 top-7 z-40 bg-white shadow-md border-slate-300' : ''
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
        {isCollapsed ? (
          <button
            type="button"
            onClick={handleNewDecision}
            className="flex h-9 w-9 items-center justify-center mx-auto rounded-full border border-emerald-600/30 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
            title="New Decision"
          >
            <IconPlus size={16} />
          </button>
        ) : (
          <AnimatedShinyButton
            onClick={handleNewDecision}
            className="w-full text-xs py-2"
          >
            <IconPlus size={14} />
            <span>New Decision</span>
          </AnimatedShinyButton>
        )}
      </div>

      {/* Navigation & History Section */}
      <nav className="flex-1 overflow-y-auto px-2.5 py-1">
        <ul className="space-y-1">
          {/* Decisions */}
          <li>
            <NavLink
              to="/history"
              onClick={onNavigate}
              className={`nav-link ${isActive('/history') ? 'nav-link-active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
              title="Decisions"
            >
              <IconDocument size={17} className={isActive('/history') ? 'text-emerald-600' : 'text-slate-500 group-hover:text-slate-900'} />
              {!isCollapsed && <span>Decisions Registry</span>}
            </NavLink>
          </li>

          {/* Monitoring */}
          <li>
            <NavLink
              to="/monitoring"
              onClick={onNavigate}
              className={`nav-link ${isActive('/monitoring') ? 'nav-link-active' : ''} ${isCollapsed ? 'justify-center px-2' : ''}`}
              title="Monitoring"
            >
              <IconActivity size={17} className={isActive('/monitoring') ? 'text-emerald-600' : 'text-slate-500 group-hover:text-slate-900'} />
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
              <IconGlobe size={17} className={isActive('/research') ? 'text-emerald-600' : 'text-slate-500 group-hover:text-slate-900'} />
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
              <IconLightbulb size={17} className={isActive('/insights') ? 'text-emerald-600' : 'text-slate-500 group-hover:text-slate-900'} />
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
              <IconSettings size={17} className={isActive('/settings') ? 'text-emerald-600' : 'text-slate-500 group-hover:text-slate-900'} />
              {!isCollapsed && <span>Settings</span>}
            </NavLink>
          </li>
        </ul>

        {/* Recent Chats / Continuous Conversation History */}
        {!isCollapsed && sessions.length > 0 && (
          <div className="mt-5 border-t border-slate-200 pt-3.5">
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Chat History
              </span>
              <button
                type="button"
                onClick={handleNewDecision}
                className="text-slate-400 hover:text-emerald-600 text-xs transition-colors p-1"
                title="Start new chat"
              >
                <IconPlus size={12} />
              </button>
            </div>

            <div className="space-y-1">
              {sessions.map((s) => {
                const isCurrent = s.id === activeSessionId && location.pathname === '/';
                return (
                  <div
                    key={s.id}
                    onClick={() => {
                      switchToSession(s.id);
                      navigate('/');
                      onNavigate?.();
                    }}
                    className={`group relative flex items-center justify-between rounded-xl px-2.5 py-2 text-xs cursor-pointer transition-all ${
                      isCurrent
                        ? 'bg-emerald-50 text-emerald-900 font-bold border border-emerald-200 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="truncate flex-1 pr-2">
                      {s.title}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteSession(s.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 p-0.5 rounded transition-opacity"
                      title="Delete conversation"
                    >
                      ×
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Area: System Online, Profile & Taglines */}
      {/* Bottom Area: System Online, Profile & Taglines */}
      <div className="border-t border-slate-200 p-2.5 space-y-2.5 shrink-0 bg-slate-50/50">
        {/* System Online Status Card */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowStatusModal(!showStatusModal)}
            className={`flex items-center rounded-xl border border-slate-200 bg-white transition-all hover:border-emerald-400 hover:bg-slate-100 shadow-2xs ${
              isCollapsed
                ? 'h-9 w-9 mx-auto justify-center p-0'
                : 'w-full justify-between p-2 text-left'
            }`}
            title="System Online - 18ms latency"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-600" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-600" />
              </span>
              {!isCollapsed && (
                <div className="leading-tight overflow-hidden">
                  <p className="text-xs font-semibold text-slate-900 truncate">System Online</p>
                  <p className="text-[10px] text-slate-500 truncate">All systems operational</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <IconChevronDown size={13} className={`text-slate-400 transition-transform shrink-0 ${showStatusModal ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Status Details Diagnostics Dropdown */}
          {showStatusModal && (
            <div
              className={`absolute bottom-full mb-2 rounded-xl border border-slate-200 bg-white p-3 text-xs shadow-xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isCollapsed ? 'left-full ml-2 w-60' : 'left-0 w-60'
              }`}
            >
              <p className="font-bold text-slate-900 mb-2 flex items-center justify-between">
                <span>Diagnostics</span>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded font-bold">99.98% SLA</span>
              </p>
              <div className="space-y-1.5 text-slate-600 text-[11px]">
                <div className="flex justify-between">
                  <span>Inference:</span>
                  <span className="text-slate-900 font-medium">Gemini 3.8 Flash</span>
                </div>
                <div className="flex justify-between">
                  <span>Red Team:</span>
                  <span className="text-emerald-700 font-bold">Armed</span>
                </div>
                <div className="flex justify-between">
                  <span>Telemetry:</span>
                  <span className="text-emerald-700 font-bold">18ms</span>
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
            className={`flex items-center rounded-xl border border-slate-200 bg-white transition-all hover:border-emerald-400 hover:bg-slate-100 shadow-2xs ${
              isCollapsed
                ? 'h-9 w-9 mx-auto justify-center p-0'
                : 'w-full justify-between p-2 text-left'
            }`}
            title="Tace - Team Alpha"
          >
            <div className="flex items-center gap-2.5">
              <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-100 ring-1 ring-emerald-300">
                <span className="text-xs font-bold text-emerald-800">T</span>
                <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-600 ring-2 ring-white" />
              </div>
              {!isCollapsed && (
                <div className="leading-tight overflow-hidden">
                  <p className="text-xs font-bold text-slate-900 truncate">Tace</p>
                  <p className="text-[10px] text-slate-500 truncate">Team Alpha</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <IconChevronDown size={13} className={`text-slate-400 transition-transform shrink-0 ${showProfileMenu ? 'rotate-180' : ''}`} />
            )}
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div
              className={`absolute bottom-full mb-2 rounded-xl border border-slate-200 bg-white p-2 text-xs shadow-xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150 ${
                isCollapsed ? 'left-full ml-2 w-52' : 'left-0 w-52'
              }`}
            >
              <div className="px-2 py-1.5 border-b border-slate-100 mb-1">
                <p className="text-[10px] text-slate-500">Signed in as</p>
                <p className="text-xs font-bold text-slate-900 truncate">tace@projectalpha.ai</p>
              </div>
              <button
                type="button"
                onClick={() => { setShowProfileMenu(false); navigate('/settings'); }}
                className="w-full text-left px-2 py-1.5 rounded text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                Workspace Settings
              </button>
            </div>
          )}
        </div>

        {/* Footer Brand Slogan List */}
        {!isCollapsed && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setFooterExpanded(!footerExpanded)}
              className="flex w-full items-center justify-between text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 hover:text-slate-900 py-1 px-1 transition-colors"
            >
              <span>Methodology</span>
              <IconChevronDown size={11} className={`transition-transform ${footerExpanded ? 'rotate-180 text-emerald-600' : ''}`} />
            </button>
            {footerExpanded && (
              <div className="px-1 text-[8.5px] font-semibold uppercase tracking-[0.22em] text-slate-500 space-y-1 pt-1 pb-1 animate-in fade-in duration-150">
                <p className="hover:text-emerald-700 transition-colors">ANALYZE</p>
                <p className="hover:text-emerald-700 transition-colors">CHALLENGE</p>
                <p className="hover:text-emerald-700 transition-colors">VERIFY</p>
                <p className="hover:text-emerald-700 transition-colors">DECIDE</p>
                <p className="hover:text-emerald-700 transition-colors">MONITOR</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
