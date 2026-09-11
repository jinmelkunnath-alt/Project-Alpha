import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { IconMenu } from './icons';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden app-bg text-alpha-ink">
      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <div className="absolute left-0 top-0 h-full w-[280px]">
            <Sidebar onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile-only menu button (no global top bar by design) */}
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="fixed left-4 top-4 z-30 rounded-lg border border-white/10 bg-alpha-surface/70 px-2 py-2 text-alpha-ink backdrop-blur-xl md:hidden"
          aria-label="Open navigation"
        >
          <IconMenu size={18} />
        </button>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-12">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
