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

    // Palette of subtle industrial stardust colors for light background
    const colors = [
      'rgba(16, 185, 129, ',  // emerald-500
      'rgba(13, 148, 136, ',  // teal-600
      'rgba(99, 102, 241, ',  // indigo-500
      'rgba(148, 163, 184, ', // slate-400
      'rgba(5, 150, 105, ',   // emerald-600
    ];

    let particles: Particle[] = [];

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 22000), 55);
      particles = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 1.6 + 0.5;
        const baseAlpha = Math.random() * 0.35 + 0.1;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size,
          speedY: -(Math.random() * 0.2 + 0.05),
          speedX: (Math.random() - 0.5) * 0.1,
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

      const parallaxX = mouseRef.current.x * 20;
      const parallaxY = mouseRef.current.y * 15;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          p.y += p.speedY;
          p.x += p.speedX;

          if (p.y < -10) p.y = height + 10;
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;

          p.alpha = p.baseAlpha + Math.sin(clock * p.pulseSpeed * 60 + p.pulseOffset) * 0.15;
          if (p.alpha < 0.05) p.alpha = 0.05;
        }

        const renderX = p.x + parallaxX * (p.size / 2);
        const renderY = p.y + parallaxY * (p.size / 2);

        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.max(0, Math.min(1, p.alpha))})`;
        ctx.fill();
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
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none bg-slate-50">
      {/* Dynamic Soft Industrial Ambient Glow Highlights */}
      <div
        className="aurora-orb-1 absolute top-[0%] -left-[10%] h-[680px] w-[680px] rounded-full blur-[140px] opacity-25"
        style={{
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, rgba(209, 250, 229, 0.4) 45%, transparent 75%)',
        }}
      />

      <div
        className="aurora-orb-2 absolute top-[30%] -right-[10%] h-[550px] w-[550px] rounded-full blur-[160px] opacity-20"
        style={{
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.18) 0%, rgba(204, 251, 241, 0.3) 50%, transparent 80%)',
        }}
      />

      <div
        className="aurora-orb-3 absolute -bottom-[10%] left-[20%] h-[600px] w-[600px] rounded-full blur-[150px] opacity-15"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, rgba(238, 242, 255, 0.3) 55%, transparent 80%)',
        }}
      />

      {/* Interactive Stardust Starfield Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />
    </div>
  );
}
