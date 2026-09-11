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
      <div className="hidden md:flex h-full">
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
        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-4 z-40 rounded-xl border border-white/10 bg-alpha-surface/80 p-2 text-alpha-ink backdrop-blur-xl md:hidden hover:border-emerald-500/40"
          aria-label="Open navigation"
        >
          <IconMenu size={20} />
        </button>

        {/* Global Top-Right Header (Matches screenshot) */}
        <header className="absolute top-6 right-8 z-30 flex items-center gap-3">
          {/* Upgrade Pill Button */}
          <button
            type="button"
            onClick={() => setShowUpgradeModal(true)}
            className="group flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-xl transition-all duration-200 hover:border-emerald-400/50 hover:bg-emerald-500/10 hover:shadow-[0_0_20px_-5px_rgba(52,211,153,0.4)]"
          >
            <IconLightning size={13} className="text-emerald-400 transition-transform group-hover:scale-110" />
            <span>Upgrade</span>
          </button>

          {/* Team Pill Button */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowTeamDropdown(!showTeamDropdown)}
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 text-xs font-medium text-white/90 backdrop-blur-xl transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06]"
            >
              <IconUsers size={14} className="text-alpha-muted" />
              <span>Team Alpha</span>
            </button>

            {showTeamDropdown && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl border border-white/10 bg-[#0c1116]/95 p-2 text-xs shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 text-alpha-faint text-[10px] font-semibold uppercase tracking-wider">
                  Active Team
                </div>
                <div className="flex items-center justify-between rounded-lg bg-emerald-500/10 px-2.5 py-2 text-emerald-300 font-medium">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Team Alpha</span>
                  </div>
                  <IconCheck size={14} />
                </div>
                <div className="mt-1 border-t border-white/[0.06] pt-1">
                  <button
                    type="button"
                    onClick={() => setShowTeamDropdown(false)}
                    className="w-full text-left px-2.5 py-1.5 text-alpha-muted hover:text-white hover:bg-white/[0.04] rounded"
                  >
                    + Create New Workspace
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Initial Circle Badge */}
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-800/60 ring-1 ring-emerald-500/40 text-xs font-semibold text-emerald-300 shadow-[0_0_15px_-3px_rgba(52,211,153,0.3)]">
            T
          </div>
        </header>

        {/* Scrollable Main content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl border border-white/10 bg-[#090d11]/95 p-7 shadow-2xl backdrop-blur-2xl">
            <button
              type="button"
              onClick={() => setShowUpgradeModal(false)}
              className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/[0.04] p-1.5 text-alpha-muted hover:text-white"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 text-emerald-400">
              <IconAlphaEmblem size={34} />
              <span className="text-xs font-semibold tracking-wider uppercase">Alpha Enterprise Intelligence</span>
            </div>

            <h3 className="mt-3 text-2xl font-bold text-white tracking-tight">
              Decisions Where Being Wrong Is Expensive
            </h3>
            <p className="mt-2 text-sm text-alpha-muted leading-relaxed">
              Unlock adversarial multi-agent red teaming, 10-year Monte Carlo black swan simulations, and autonomous 24/7 decision telemetry.
            </p>

            <div className="mt-6 space-y-3">
              {[
                'Adversarial Red Team: 5 specialized agents stress-test assumptions',
                'Future Scenario Simulation: Monte Carlo & Black Swan Stress Testing',
                'Continuous 24/7 Monitoring: Live news, financial, and regulatory signal alerts',
                'Private Enterprise Vault: Air-gapped single-tenant decision memory',
              ].map((feat) => (
                <div key={feat} className="flex items-start gap-2.5 text-xs text-alpha-ink">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <IconCheck size={11} />
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-end gap-3 border-t border-white/[0.08] pt-5">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(false)}
                className="rounded-xl px-4 py-2 text-xs font-medium text-alpha-muted hover:text-white"
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
