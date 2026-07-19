"use client";

import { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function AnimatedBackground() {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(
    () => [
      { top: '14%', left: '8%', size: 6, delay: 0 },
      { top: '28%', left: '78%', size: 10, delay: 0.8 },
      { top: '63%', left: '12%', size: 7, delay: 1.4 },
      { top: '72%', left: '82%', size: 9, delay: 1.9 },
      { top: '42%', left: '52%', size: 12, delay: 0.4 }
    ],
    []
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(0,245,160,0.15),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(0,217,255,0.16),transparent_24%),radial-gradient(circle_at_20%_80%,rgba(110,231,183,0.1),transparent_28%)]" />
      <div className="absolute inset-0 subtle-grid opacity-20 [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

      <motion.div
        aria-hidden
        className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[rgba(0,245,160,0.18)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, 26, -18, 0], y: [0, -16, 18, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-[rgba(0,217,255,0.16)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, -24, 18, 0], y: [0, 18, -14, 0], scale: [1, 1.12, 0.98, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-[-7rem] left-1/3 h-96 w-96 rounded-full bg-[rgba(110,231,183,0.12)] blur-3xl"
        animate={prefersReducedMotion ? undefined : { x: [0, 10, -14, 0], y: [0, -12, 18, 0], scale: [1, 1.08, 0.92, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {particles.map((particle) => (
        <motion.span
          key={`${particle.top}-${particle.left}`}
          aria-hidden
          className="absolute rounded-full bg-[linear-gradient(135deg,rgba(0,245,160,0.95),rgba(0,217,255,0.9))] shadow-[0_0_30px_rgba(0,245,160,0.38)]"
          style={{ top: particle.top, left: particle.left, width: particle.size, height: particle.size }}
          animate={prefersReducedMotion ? undefined : { y: [0, -12, 0], opacity: [0.45, 1, 0.45], scale: [1, 1.28, 1] }}
          transition={{ duration: 5 + particle.delay, repeat: Infinity, ease: 'easeInOut', delay: particle.delay }}
        />
      ))}
    </div>
  );
}
