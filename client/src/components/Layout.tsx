import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AnimatedBackground from './AnimatedBackground';
import { IconMenu, IconLightning, IconUsers, IconCheck, IconAlphaEmblem } from './icons';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('alpha_sidebar_collapsed') === 'true';
  });

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem('alpha_sidebar_collapsed', String(next));
      return next;
    });
  };

  return (
    <div className="flex h-screen overflow-hidden app-bg text-alpha-ink relative">
      {/* Animated Cosmic Background Layer */}
      <AnimatedBackground />

      {/* Desktop sidebar with collapse support */}
      <div className="hidden md:flex h-full shrink-0 z-30">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={toggleSidebar}
        />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 h-full w-[270px]">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main viewport area */}
      <div className="flex min-w-0 flex-1 flex-col relative overflow-hidden">
        {/* Dedicated Global Top Header Bar — eliminates all overlaps */}
        <header className="h-16 shrink-0 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl px-4 sm:px-8 flex items-center justify-between z-20">
          {/* Left: Mobile trigger & Workspace context indicator */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 md:hidden hover:border-emerald-500 hover:text-emerald-800 transition-colors shadow-xs"
              aria-label="Open navigation"
            >
              <IconMenu size={18} />
            </button>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold tracking-wider text-slate-900 uppercase text-[10.5px]">Project Alpha</span>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 text-[11px] flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600 pulse-dot" />
                Cognitive OS · 24/7
              </span>
            </div>
          </div>

          {/* Right: Actions (Upgrade, Team Alpha, Profile Badge) */}
          <div className="flex items-center gap-3">
            {/* Upgrade Pill Button */}
            <button
              type="button"
              onClick={() => setShowUpgradeModal(true)}
              className="group flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-900"
            >
              <IconLightning size={13} className="text-emerald-600 transition-transform group-hover:scale-110" />
              <span>Upgrade</span>
            </button>

            {/* Team Pill Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowTeamDropdown(!showTeamDropdown)}
                className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-800 shadow-xs transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
              >
                <IconUsers size={14} className="text-slate-500" />
                <span>Team Alpha</span>
              </button>

              {showTeamDropdown && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-2 text-xs shadow-xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-2.5 py-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                    Active Team
                  </div>
                  <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-2.5 py-2 text-emerald-900 font-bold border border-emerald-200">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                      <span>Team Alpha</span>
                    </div>
                    <IconCheck size={14} />
                  </div>
                  <div className="mt-1 border-t border-slate-100 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowTeamDropdown(false)}
                      className="w-full text-left px-2.5 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded"
                    >
                      + Create New Workspace
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Initial Circle Badge */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 border border-emerald-300 text-xs font-bold text-emerald-800 shadow-xs">
              T
            </div>
          </div>
        </header>

        {/* Scrollable Main content — completely below header */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8 relative">
          <Outlet />
        </main>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="absolute right-5 top-5 rounded-full border border-slate-200 bg-slate-50 p-1.5 text-slate-500 hover:text-slate-900"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 text-emerald-700">
              <IconAlphaEmblem size={34} />
              <span className="text-xs font-bold tracking-wider uppercase">Alpha Enterprise Intelligence</span>
            </div>

            <h3 className="mt-3 text-2xl font-bold text-slate-900 tracking-tight">
              Decisions Where Being Wrong Is Expensive
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Unlock adversarial multi-agent red teaming, 10-year Monte Carlo black swan simulations, and autonomous 24/7 decision telemetry.
            </p>

            <div className="mt-6 space-y-3">
              {[
                'Adversarial Red Team: 5 specialized agents stress-test assumptions',
                'Future Scenario Simulation: Monte Carlo & Black Swan Stress Testing',
                'Continuous 24/7 Monitoring: Live news, financial, and regulatory signal alerts',
                'Private Enterprise Vault: Air-gapped single-tenant decision memory',
              ].map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-xs text-slate-800">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <IconCheck size={11} />
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-900"
              >
                Maybe Later
              </button>
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="btn-primary text-xs font-semibold px-5 py-2.5"
              >
                Upgrade to Alpha Pro
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
