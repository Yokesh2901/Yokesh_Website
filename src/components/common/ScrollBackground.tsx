import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import type { StudioLighting } from '../layout/Navbar';

interface ScrollBackgroundProps {
  lightingMode?: StudioLighting;
}

export const ScrollBackground: React.FC<ScrollBackgroundProps> = ({ lightingMode = 'daylight' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  // Smooth springs for scroll-driven gradient orb positions
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  
  const orb1Y = useTransform(smoothProgress, [0, 1], ['0%', '160%']);
  const orb1X = useTransform(smoothProgress, [0, 1], ['5%', '65%']);

  const orb2Y = useTransform(smoothProgress, [0, 1], ['15%', '180%']);
  const orb2X = useTransform(smoothProgress, [0, 1], ['80%', '15%']);

  const orb3Y = useTransform(smoothProgress, [0, 1], ['40%', '220%']);
  const orb3X = useTransform(smoothProgress, [0, 1], ['25%', '75%']);

  // Generative Scroll-Reactive Neural Lattice Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Node particles
    const particleCount = Math.min(Math.floor(window.innerWidth / 35), 45);
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 1.5 + Math.random() * 2,
      baseAlpha: 0.25 + Math.random() * 0.35,
      color: Math.random() > 0.5 ? '#6366f1' : '#0ea5e9' // Indigo or Sky
    }));

    let lastScrollY = window.scrollY;
    let scrollDelta = 0;

    const onScroll = () => {
      const currentScrollY = window.scrollY;
      scrollDelta = (currentScrollY - lastScrollY) * 0.15;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Damp scroll delta
      scrollDelta *= 0.92;

      // Update & draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move with normal velocity + scroll velocity effect
        p.x += p.vx;
        p.y += p.vy - scrollDelta * 0.4;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.baseAlpha;
        ctx.fill();

        // Connect nearby nodes with synaptic lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 140;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = '#818cf8';
            ctx.globalAlpha = lineAlpha;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Dynamic Ambient Light Orbs that morph and glide with scroll */}
      <motion.div
        className={`absolute w-[650px] h-[650px] rounded-full blur-[130px] will-change-transform transition-colors duration-700 ${
          lightingMode === 'twilight'
            ? 'bg-gradient-to-tr from-indigo-900/40 to-blue-900/30'
            : lightingMode === 'prism'
            ? 'bg-gradient-to-tr from-fuchsia-300/40 to-cyan-200/40'
            : 'bg-gradient-to-tr from-indigo-200/40 to-blue-200/30'
        }`}
        style={{ top: orb1Y, left: orb1X }}
      />
      <motion.div
        className={`absolute w-[550px] h-[550px] rounded-full blur-[120px] will-change-transform transition-colors duration-700 ${
          lightingMode === 'twilight'
            ? 'bg-gradient-to-br from-purple-950/40 to-cyan-950/30'
            : lightingMode === 'prism'
            ? 'bg-gradient-to-br from-amber-200/35 to-rose-200/35'
            : 'bg-gradient-to-br from-sky-200/35 to-teal-100/30'
        }`}
        style={{ top: orb2Y, left: orb2X }}
      />
      <motion.div
        className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] will-change-transform transition-colors duration-700 ${
          lightingMode === 'twilight'
            ? 'bg-gradient-to-tl from-slate-900/50 to-indigo-950/40'
            : lightingMode === 'prism'
            ? 'bg-gradient-to-tl from-violet-300/35 to-emerald-200/30'
            : 'bg-gradient-to-tl from-purple-200/30 to-rose-100/25'
        }`}
        style={{ top: orb3Y, left: orb3X }}
      />

      {/* 2. Delicate Generative Neural Synaptic Lattice Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-65"
      />

      {/* 3. Subtle Clean Blueprint Lines Grid */}
      <div className="absolute inset-0 tech-grid-bg opacity-40" />
    </div>
  );
};
