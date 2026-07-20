'use client';

import { useWallet } from '../../lib/wallet-provider';
import { Sidebar } from '../../components/sidebar';
import { WalletButton } from '../../components/wallet-button';
import { motion } from 'framer-motion';
import { Wallet, Globe, Trash2, LogOut, Hexagon, Copy, Check } from 'lucide-react';
import { MOCK_CONTRACT_ADDRESS, MOCK_NETWORK } from '../../types';
import { useState } from 'react';

export default function SettingsPage() {
  const { wallet, disconnect } = useWallet();
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(MOCK_CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAllData = () => {
    localStorage.removeItem('ciphernet_credentials');
    localStorage.removeItem('ciphernet_activities');
    localStorage.removeItem('ciphernet_verifications');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-[#020202]">
      <Sidebar />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/6 bg-[#020202]/80 px-6 backdrop-blur-xl">
          <h2 className="text-sm font-medium text-white/40">Settings</h2>
          <WalletButton />
        </header>
        <main className="p-6 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl space-y-6"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-white">Settings</h1>
              <p className="mt-1 text-sm text-white/40">Manage your wallet, network, and application preferences.</p>
            </div>

            {/* Wallet Section */}
            <div className="rounded-2xl border border-white/6 bg-[#0A0A0A] overflow-hidden">
              <div className="border-b border-white/6 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-[#00F5A0]" />
                  <h3 className="text-sm font-semibold text-white">Wallet</h3>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider">Status</p>
                    <p className="mt-1 text-sm text-white">
                      {wallet.status === 'connected' ? (
                        <span className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#00F5A0]" />
                          Connected
                        </span>
                      ) : (
                        <span className="text-white/40">Disconnected</span>
                      )}
                    </p>
                  </div>
                  {wallet.status === 'connected' && (
                    <button
                      onClick={disconnect}
                      className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Disconnect
                    </button>
                  )}
                </div>
                {wallet.address && (
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider">Address</p>
                    <p className="mt-1 font-mono text-xs text-white/60 break-all">{wallet.address}</p>
                  </div>
                )}
                {wallet.balance && (
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider">Balance</p>
                    <p className="mt-1 text-sm text-white">{wallet.balance}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Network Section */}
            <div className="rounded-2xl border border-white/6 bg-[#0A0A0A] overflow-hidden">
              <div className="border-b border-white/6 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#00D9FF]" />
                  <h3 className="text-sm font-semibold text-white">Network</h3>
                </div>
              </div>
              <div className="px-6 py-5 space-y-4">
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider">Network</p>
                  <p className="mt-1 text-sm text-white">{MOCK_NETWORK}</p>
                </div>
                <div>
                  <p className="text-xs text-white/30 uppercase tracking-wider">Contract Address</p>
                  <div className="mt-1 flex items-center gap-2">
                    <p className="font-mono text-xs text-white/60 break-all">{MOCK_CONTRACT_ADDRESS}</p>
                    <button onClick={copyAddress} className="shrink-0 p-1 text-white/30 hover:text-white/60">
                      {copied ? <Check className="h-3 w-3 text-[#00F5A0]" /> : <Copy className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Developer Options */}
            <div className="rounded-2xl border border-white/6 bg-[#0A0A0A] overflow-hidden">
              <div className="border-b border-white/6 px-6 py-4">
                <div className="flex items-center gap-2">
                  <Hexagon className="h-4 w-4 text-white/40" />
                  <h3 className="text-sm font-semibold text-white">Developer Options</h3>
                </div>
              </div>
              <div className="px-6 py-5">
                <button
                  onClick={clearAllData}
                  className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-2.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Clear All Local Data
                </button>
                <p className="mt-2 text-[10px] text-white/20">
                  Removes all stored credentials, activity logs, and wallet data from localStorage.
                </p>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
