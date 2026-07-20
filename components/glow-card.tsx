'use client';

import { type ReactNode, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowCard({ children, className, glowColor = 'rgba(0,245,160,0.15)' }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/6 bg-[#0A0A0A] p-6 transition-colors duration-300 hover:border-white/10',
        className
      )}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Mouse-tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, ${glowColor}, transparent 60%)`,
          opacity: mousePos.x !== 50 || mousePos.y !== 50 ? 0.8 : 0,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
