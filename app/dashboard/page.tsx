'use client';

import { useWallet } from '../../lib/wallet-provider';
import { StatCard } from '../../components/stat-card';
import { ActivityTimeline } from '../../components/activity-timeline';
import { GlowCard } from '../../components/glow-card';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Wallet,
  ShieldCheck,
  FileCheck2,
  Globe,
  ArrowRight,
  Copy,
  Check,
} from 'lucide-react';
import { useState } from 'react';

export default function DashboardPage() {
  const { wallet, credentials, activities, contractAddress, verificationCount, connect } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (wallet.status !== 'connected') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.03]">
            <Wallet className="h-8 w-8 text-white/20" />
          </div>
          <h1 className="text-2xl font-bold text-white">Connect Your Wallet</h1>
          <p className="mt-3 max-w-md text-sm text-white/40">
            Connect your Lace wallet to access the dashboard, register credentials, and run verifications.
          </p>
          <button
            onClick={connect}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-[rgba(0,245,160,0.25)] bg-[rgba(0,245,160,0.08)] px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[rgba(0,245,160,0.4)] hover:bg-[rgba(0,245,160,0.14)]"
          >
            <Wallet className="h-4 w-4 text-[#00F5A0]" />
            Connect Wallet
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-white/40">Overview of your CipherNet activity</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Wallet Status"
          value="Connected"
          icon={<Wallet className="h-5 w-5 text-[#00F5A0]" />}
          trend={wallet.address ? `${wallet.address.slice(0, 8)}...` : undefined}
        />
        <StatCard
          label="Credentials"
          value={credentials.length}
          icon={<FileCheck2 className="h-5 w-5 text-[#00D9FF]" />}
          trend={credentials.length > 0 ? `${credentials.length} registered` : 'None yet'}
        />
        <StatCard
          label="Verifications"
          value={verificationCount}
          icon={<ShieldCheck className="h-5 w-5 text-[#00F5A0]" />}
          trend={verificationCount > 0 ? 'All successful' : 'None yet'}
        />
        <StatCard
          label="Network"
          value="Preprod"
          icon={<Globe className="h-5 w-5 text-[#00D9FF]" />}
          trend="Active"
        />
      </div>

      {/* Contract Info */}
      <GlowCard className="p-0">
        <div className="p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-white/30">Deployed Contract</p>
          <div className="mt-3 flex items-center gap-3">
            <p className="font-mono text-sm text-white/70 break-all">{contractAddress}</p>
            <button
              onClick={copyAddress}
              className="shrink-0 rounded-lg p-1.5 text-white/30 transition-colors hover:text-white/60 hover:bg-white/[0.04]"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#00F5A0]" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
          <div className="mt-3 flex items-center gap-4 text-xs text-white/30">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00F5A0]" />
              Active
            </span>
            <span>Midnight Preprod</span>
            <span>CredentialRegistry.compact</span>
          </div>
        </div>
      </GlowCard>

      {/* Quick Actions + Activity */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-white/60">Quick Actions</h2>
          <Link
            href="/register"
            className="group flex items-center justify-between rounded-xl border border-white/6 bg-[#0A0A0A] p-4 transition-all duration-300 hover:border-[rgba(0,245,160,0.2)] hover:bg-[rgba(0,245,160,0.03)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,245,160,0.08)]">
                <FileCheck2 className="h-5 w-5 text-[#00F5A0]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Register Credential</p>
                <p className="text-xs text-white/30">Issue a new credential on-chain</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#00F5A0]" />
          </Link>
          <Link
            href="/verify"
            className="group flex items-center justify-between rounded-xl border border-white/6 bg-[#0A0A0A] p-4 transition-all duration-300 hover:border-[rgba(0,217,255,0.2)] hover:bg-[rgba(0,217,255,0.03)]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[rgba(0,217,255,0.08)]">
                <ShieldCheck className="h-5 w-5 text-[#00D9FF]" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Verify Credential</p>
                <p className="text-xs text-white/30">Run confidential verification</p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-white/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#00D9FF]" />
          </Link>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-white/60">Recent Activity</h2>
            <Link href="/activity" className="text-xs text-white/30 hover:text-white/50 transition-colors">
              View all
            </Link>
          </div>
          <div className="rounded-2xl border border-white/6 bg-[#0A0A0A] p-2">
            <ActivityTimeline events={activities} maxItems={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
