import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  color: string;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      mouseRef.current.targetX = (e.clientX / width - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Palette of subtle stardust colors
    const colors = [
      'rgba(45, 212, 191, ',   // cyan-400
      'rgba(52, 211, 153, ',   // emerald-400
      'rgba(147, 197, 253, ',  // blue-300
      'rgba(255, 255, 255, ',  // white
      'rgba(167, 243, 208, ',  // mint
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 18000), 75);
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.8 + 0.6;
        const baseAlpha = Math.random() * 0.45 + 0.15;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size,
          speedY: -(Math.random() * 0.25 + 0.08),
          speedX: (Math.random() - 0.5) * 0.15,
          alpha: baseAlpha,
          baseAlpha,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulseOffset: Math.random() * Math.PI * 2,
          color,
        });
      }
    };

    initParticles();

    let clock = 0;

    const render = () => {
      if (!ctx) return;

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      clock += 0.015;

      const parallaxX = mouseRef.current.x * 25;
      const parallaxY = mouseRef.current.y * 20;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Subtle drifting motion
          p.y += p.speedY;
          p.x += p.speedX;

          // Wrap around edges
          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          // Gentle sine pulsing twinkle
          p.alpha = p.baseAlpha + Math.sin(clock * p.pulseSpeed * 60 + p.pulseOffset) * 0.2;
          if (p.alpha < 0.05) p.alpha = 0.05;
        }

        const renderX = p.x + parallaxX * (p.size / 2);
        const renderY = p.y + parallaxY * (p.size / 2);

        // Draw particle
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.fill();

        // Extra soft halo for slightly larger particles
        if (p.size > 1.4) {
          ctx.beginPath();
          ctx.arc(renderX, renderY, p.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha * 0.18})`;
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
      {/* Dynamic Animated Aurora Nebula Orbs */}
      {/* Planetary Arc Luminous Glow on the left */}
      <div
        className="aurora-orb-1 absolute top-[5%] -left-[10%] h-[680px] w-[680px] rounded-full blur-[140px] opacity-45 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.45) 0%, rgba(13, 148, 136, 0.25) 45%, rgba(6, 78, 59, 0.1) 70%, transparent 85%)',
        }}
      />

      <div
        className="aurora-orb-2 absolute top-[25%] -right-[10%] h-[550px] w-[550px] rounded-full blur-[160px] opacity-25 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(45, 212, 191, 0.3) 0%, rgba(20, 184, 166, 0.12) 50%, transparent 80%)',
        }}
      />

      <div
        className="aurora-orb-3 absolute -bottom-[15%] left-[15%] h-[600px] w-[600px] rounded-full blur-[150px] opacity-25 mix-blend-screen"
        style={{
          background: 'radial-gradient(circle, rgba(52, 211, 153, 0.25) 0%, rgba(4, 120, 87, 0.1) 55%, transparent 80%)',
        }}
      />

      {/* Subtle Deep Cosmic Indigo Glow for depth */}
      <div
        className="aurora-orb-1 absolute top-[15%] left-[55%] -translate-x-1/2 h-[400px] w-[600px] rounded-full blur-[170px] opacity-15"
        style={{
          background: 'radial-gradient(ellipse, rgba(56, 189, 248, 0.2) 0%, rgba(30, 27, 75, 0.15) 70%, transparent 90%)',
        }}
      />

      {/* Interactive Stardust Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* Atmospheric Vignette & Contrast Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1300px 750px at 60% 45%, transparent 45%, rgba(4, 6, 8, 0.35) 80%, rgba(4, 6, 8, 0.8) 100%)',
        }}
      />
    </div>
  );
}
