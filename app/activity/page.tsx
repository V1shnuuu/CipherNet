'use client';

import { useWallet } from '../../lib/wallet-provider';
import { Sidebar } from '../../components/sidebar';
import { WalletButton } from '../../components/wallet-button';
import { ActivityTimeline } from '../../components/activity-timeline';
import { motion } from 'framer-motion';

export default function ActivityPage() {
  const { activities } = useWallet();

  return (
    <div className="min-h-screen bg-[#020202]">
      <Sidebar />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/6 bg-[#020202]/80 px-6 backdrop-blur-xl">
          <h2 className="text-sm font-medium text-white/40">Activity</h2>
          <WalletButton />
        </header>
        <main className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white">Activity Log</h1>
              <p className="mt-1 text-sm text-white/40">
                A timeline of all your wallet, credential, and verification events.
              </p>
            </div>

            <div className="rounded-2xl border border-white/6 bg-[#0A0A0A] p-2">
              <ActivityTimeline events={activities} maxItems={50} />
            </div>

            {activities.length > 0 && (
              <p className="mt-4 text-center text-xs text-white/20">
                {activities.length} event{activities.length !== 1 ? 's' : ''} recorded
              </p>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
