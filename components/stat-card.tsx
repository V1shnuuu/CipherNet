'use client';

import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  className?: string;
}

export function StatCard({ label, value, icon, trend, className }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl border border-white/6 bg-[#0A0A0A] p-5 transition-colors duration-300 hover:border-white/10',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-white/30">{label}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</p>
          {trend && (
            <p className="mt-1 text-xs text-[#00F5A0]">{trend}</p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/6 bg-white/[0.03]">
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
