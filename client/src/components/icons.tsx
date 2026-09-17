import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 18, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  };
}

export function IconLogo(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" />
      <path d="M12 7v10M7.5 9.5l9 5M16.5 9.5l-9 5" />
    </svg>
  );
}

export function IconDashboard(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

export function IconTerminal(props: IconProps) {
  return (
    <svg {...base(props)}>
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function IconDocument(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M8 10h8M8 14h5" />
    </svg>
  );
}

export function IconShieldCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function IconAlert(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 2 20h20z" />
      <path d="M12 9v5M12 17h.01" />
    </svg>
  );
}

export function IconScale(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v18M7 21h10" />
      <path d="M5 8h14" />
      <path d="m5 8-3 5a3 3 0 0 0 6 0Z" />
      <path d="m19 8-3 5a3 3 0 0 0 6 0Z" />
    </svg>
  );
}

export function IconActivity(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function IconChevronRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconDatabase(props: IconProps) {
  return (
    <svg {...base(props)}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
}

export function IconCpu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6" y="6" width="12" height="12" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

// Minimal Alpha brand mark — an "A"/peak formed from a triangle with a crossbar.
export function IconAlpha(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 20.5 20H3.5Z" />
      <path d="M8.4 13.6h7.2" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12.5 9 17.5 20 6.5" />
    </svg>
  );
}

export function IconSettings(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

export function IconFlask(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M10 3v6.5L5.5 18a2 2 0 0 0 1.7 3h9.6a2 2 0 0 0 1.7-3L14 9.5V3" />
      <path d="M7.7 14h8.6" />
    </svg>
  );
}

export function IconList(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
  );
}

export function IconUser(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function IconUpload(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 15V3M8 7l4-4 4 4" />
      <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4l1.7 4.6L18.3 10l-4.6 1.7L12 16l-1.7-4.3L5.7 10l4.6-1.4z" />
    </svg>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export function IconMicrophone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  );
}

export function IconSend(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
    </svg>
  );
}

export function IconPaperclip(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M21 12.5 12.5 21a4.5 4.5 0 0 1-6.4-6.4l8.4-8.4a3 3 0 0 1 4.2 4.2L10.3 18.6a1.4 1.4 0 0 1-2-2L17 9" />
    </svg>
  );
}

export function IconGlobe(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z" />
    </svg>
  );
}

export function IconTrendUp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M21 7v6h-6" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 21 8l-9 5-9-5z" />
      <path d="M3 12l9 5 9-5" />
    </svg>
  );
}

export function IconShieldLine(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z" />
    </svg>
  );
}

export function IconRocket(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3c3 2 5 6 5 10l-5 5-5-5c0-4 2-8 5-10z" />
      <circle cx="12" cy="10" r="2" />
      <path d="M9 17l-2 3M15 17l2 3" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function IconLightning(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

export function IconLightbulb(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 18h6M10 22h4" />
      <path d="M12 2a7 7 0 0 0-7 7c0 2.6 1.4 4.8 3.5 6h7c2.1-1.2 3.5-3.4 3.5-6a7 7 0 0 0-7-7z" />
    </svg>
  );
}

export function IconTarget(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

export function IconRupee(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 3h12M6 8h12M6 13l7.5 8M6 13h3a4 4 0 0 0 0-8" />
    </svg>
  );
}

export function IconAlphaPeak(props: IconProps) {
  return (
    <svg {...base(props)} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      {/* Sleek lambda / stylized chevron A logo with emerald gradient compatibility */}
      <path d="M12.0001 2.5L2.80005 20.5H6.90005L12.0001 10.3L17.1001 20.5H21.2001L12.0001 2.5ZM12.0001 13.8L9.50005 18.8H14.5001L12.0001 13.8Z" />
    </svg>
  );
}

export function IconChevronLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

export function IconPanelLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  );
}

export function IconClaudeAsterisk({ size = 24, className = '', color = '#d97757' }: { size?: number; className?: string; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* 8-pointed rounded ray starburst matching Claude's icon */}
      <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}

// Official Project Alpha Diamond: Glowing 4-pointed diamond star flare from the logo
export function IconAlphaDiamond({
  size = 24,
  className = '',
  color = '#2dd4bf',
}: {
  size?: number;
  className?: string;
  color?: string;
}) {
  const safeId = color.replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-[0_0_10px_rgba(45,212,191,0.65)] ${className}`}
    >
      <defs>
        <radialGradient id={`alpha-diamond-glow-${safeId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="35%" stopColor={color} />
          <stop offset="70%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`alpha-diamond-grad-${safeId}`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>

      {/* Radial soft halo glow */}
      <circle cx="12" cy="12" r="10" fill={`url(#alpha-diamond-glow-${safeId})`} opacity="0.65" />

      {/* 4-pointed curved starburst / diamond flare matching the logo's center */}
      <path
        d="M12 2.5 Q12 12 21.5 12 Q12 12 12 21.5 Q12 12 2.5 12 Q12 12 12 2.5 Z"
        fill={`url(#alpha-diamond-grad-${safeId})`}
      />

      {/* Central brilliant white spark core */}
      <circle cx="12" cy="12" r="2.2" fill="#ffffff" className="drop-shadow-[0_0_4px_#ffffff]" />
    </svg>
  );
}

// Official Project Alpha Emblem: Clean rounded circular emblem without box frame
export function IconAlphaEmblem({
  size = 32,
  className = '',
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden select-none bg-slate-950 ${className}`}
    >
      <img
        src="/alpha-logo.png"
        alt="Project Alpha Logo"
        width={size}
        height={size}
        className="w-full h-full object-cover rounded-full scale-115 pointer-events-none"
        loading="eager"
      />
    </div>
  );
}

// Full Brand Lockup with geometric chevron letters
export function ProjectAlphaBrandLockup({
  size = 'md',
  showTagline = true,
  className = '',
}: {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  return (
    <div className={`flex flex-col items-center select-none ${className}`}>
      {/* Emblem */}
      <IconAlphaEmblem size={isSm ? 32 : isLg ? 64 : 44} />

      {/* PROJECT */}
      <p className={`font-semibold tracking-[0.42em] uppercase text-alpha-muted ${isSm ? 'text-[8px] mt-1' : isLg ? 'text-xs mt-3' : 'text-[10px] mt-2'}`}>
        PROJECT
      </p>

      {/* ALPHA with Chevron A's */}
      <div className={`font-bold tracking-[0.24em] text-white flex items-center gap-1.5 ${isSm ? 'text-base' : isLg ? 'text-4xl' : 'text-xl'}`}>
        {/* Chevron A */}
        <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.7)]">Λ</span>
        <span>L</span>
        <span>P</span>
        <span>H</span>
        {/* Chevron A */}
        <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.7)]">Λ</span>
      </div>

      {showTagline && (
        <>
          {/* Luminous Divider Bar */}
          <div className="relative my-1.5 flex items-center justify-center w-full max-w-[180px]">
            <span className="h-[1px] w-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="absolute h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
          </div>

          <p className="text-[8px] tracking-[0.3em] font-medium uppercase text-emerald-300/80">
            A BRIGHTER TOMORROW
          </p>
        </>
      )}
    </div>
  );
}




