'use client';

import { useWallet } from '../lib/wallet-provider';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, LogOut, Loader2, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export function WalletButton() {
  const { wallet, connect, disconnect } = useWallet();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (wallet.status === 'connecting') {
    return (
      <button
        disabled
        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-white/60"
      >
        <Loader2 className="h-4 w-4 animate-spin" />
        Connecting...
      </button>
    );
  }

  if (wallet.status === 'connected' && wallet.address) {
    const truncated = `${wallet.address.slice(0, 6)}...${wallet.address.slice(-4)}`;

    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 rounded-xl border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.06)] px-4 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-[rgba(0,245,160,0.35)] hover:bg-[rgba(0,245,160,0.1)]"
        >
          <span className="h-2 w-2 rounded-full bg-[#00F5A0] shadow-[0_0_8px_rgba(0,245,160,0.6)]" />
          <span className="font-mono text-xs">{truncated}</span>
          <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${showMenu ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-white/8 bg-[#0A0A0A] p-1 shadow-panel-lg backdrop-blur-xl"
            >
              <div className="px-3 py-3 border-b border-white/6">
                <p className="text-xs text-white/40 uppercase tracking-wider">Connected Wallet</p>
                <p className="mt-1 font-mono text-xs text-white/80 break-all">{wallet.address}</p>
              </div>
              <div className="px-3 py-2 border-b border-white/6">
                <div className="flex justify-between text-xs">
                  <span className="text-white/40">Network</span>
                  <span className="text-[#00F5A0]">{wallet.network}</span>
                </div>
                <div className="flex justify-between text-xs mt-1.5">
                  <span className="text-white/40">Balance</span>
                  <span className="text-white/80">{wallet.balance}</span>
                </div>
              </div>
              <button
                onClick={() => { disconnect(); setShowMenu(false); }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-red-400 transition-colors hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Disconnect Wallet
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <button
      onClick={connect}
      className="group relative flex items-center gap-2 rounded-xl border border-[rgba(0,245,160,0.25)] bg-[rgba(0,245,160,0.08)] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-[rgba(0,245,160,0.4)] hover:bg-[rgba(0,245,160,0.14)] hover:shadow-[0_0_24px_rgba(0,245,160,0.15)]"
    >
      <Wallet className="h-4 w-4 text-[#00F5A0]" />
      Connect Lace Wallet
    </button>
  );
}
