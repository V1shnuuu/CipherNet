'use client';

import { motion } from 'framer-motion';
import type { ActivityEvent } from '../types';
import {
  Wallet,
  LogOut,
  FileCheck2,
  ShieldCheck,
  ShieldX,
  Cpu,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  wallet_connected: Wallet,
  wallet_disconnected: LogOut,
  credential_registered: FileCheck2,
  credential_verified: ShieldCheck,
  verification_failed: ShieldX,
  circuit_executed: Cpu,
};

const colorMap: Record<string, string> = {
  wallet_connected: 'text-[#00F5A0]',
  wallet_disconnected: 'text-white/40',
  credential_registered: 'text-[#00D9FF]',
  credential_verified: 'text-[#00F5A0]',
  verification_failed: 'text-red-400',
  circuit_executed: 'text-[#00D9FF]',
};

interface ActivityTimelineProps {
  events: ActivityEvent[];
  maxItems?: number;
}

export function ActivityTimeline({ events, maxItems = 20 }: ActivityTimelineProps) {
  const displayed = events.slice(0, maxItems);

  if (displayed.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-white/6 bg-[#0A0A0A] py-16 text-center">
        <Cpu className="h-8 w-8 text-white/10 mb-3" />
        <p className="text-sm text-white/30">No activity yet</p>
        <p className="text-xs text-white/15 mt-1">Connect your wallet to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {displayed.map((event, index) => {
        const Icon = iconMap[event.type] || Cpu;
        const color = colorMap[event.type] || 'text-white/40';
        const time = new Date(event.timestamp);
        const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const dateStr = time.toLocaleDateString([], { month: 'short', day: 'numeric' });

        return (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="group flex gap-4 rounded-xl px-4 py-3 transition-colors duration-200 hover:bg-white/[0.02]"
          >
            {/* Timeline dot + line */}
            <div className="relative flex flex-col items-center">
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/6 bg-white/[0.03] ${color}`}>
                <Icon className="h-4 w-4" />
              </div>
              {index < displayed.length - 1 && (
                <div className="mt-1 w-px flex-1 bg-white/6" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pb-4">
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-sm font-medium text-white">{event.title}</p>
                <span className="shrink-0 text-xs text-white/20">{timeStr}</span>
              </div>
              <p className="mt-0.5 text-xs text-white/40 truncate">{event.description}</p>
              {event.txHash && (
                <p className="mt-1 font-mono text-[10px] text-white/15 truncate">
                  tx: {event.txHash}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
