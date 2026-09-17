import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AnimatedShinyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  url?: string;
  onClick?: () => void;
}

export function AnimatedShinyButton({
  children,
  className = '',
  url,
  onClick,
  ...props
}: AnimatedShinyButtonProps) {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick();
    }
    if (url) {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        window.location.href = url;
      } else {
        navigate(url);
      }
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-emerald-600/30 bg-emerald-600 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md active:scale-[0.98] ${className}`}
      {...props}
    >
      {/* Button Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 font-mono tracking-wider text-white">
        {children}
      </span>
    </button>
  );
}

export default AnimatedShinyButton;
