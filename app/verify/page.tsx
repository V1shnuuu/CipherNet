'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../../lib/wallet-provider';
import { Sidebar } from '../../components/sidebar';
import { WalletButton } from '../../components/wallet-button';
import { VerificationAnimation } from '../../components/verification-animation';
import { Input } from '../../components/ui/input';
import { Wallet, Search, ArrowLeft, ShieldCheck, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function VerifyPage() {
  const { wallet, connect, credentials, logActivity, incrementVerifications } = useWallet();
  const [searchHash, setSearchHash] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [_selectedCredential, setSelectedCredential] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchHash.trim()) {
      setIsVerifying(true);
    }
  };

  const handleQuickVerify = (hash: string) => {
    setSearchHash(hash);
    setIsVerifying(true);
    setSelectedCredential(hash);
  };

  const handleVerificationComplete = () => {
    incrementVerifications();
    logActivity('credential_verified', 'Credential Verified', `Verification successful for hash ${searchHash.slice(0, 16)}...`);
  };

  const content = (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1 text-xs text-white/30 transition-colors hover:text-white/60">
          <ArrowLeft className="h-3 w-3" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white">Verify Credential</h1>
        <p className="mt-1 text-sm text-white/40">
          Run a confidential verification circuit. The credential data stays private — only the result is shared.
        </p>
      </div>

      {wallet.status !== 'connected' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-white/6 bg-[#0A0A0A] py-16 text-center"
        >
          <Wallet className="h-8 w-8 text-white/15 mb-3" />
          <p className="text-sm text-white/40">Connect your wallet to verify credentials</p>
          <button onClick={connect} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.06)] px-5 py-2.5 text-sm font-medium text-white">
            <Wallet className="h-4 w-4 text-[#00F5A0]" />
            Connect Wallet
          </button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {/* Search form */}
          <form onSubmit={handleSearch} className="flex gap-3">
            <div className="flex-1">
              <Input
                id="verify-hash"
                placeholder="Enter credential hash to verify..."
                value={searchHash}
                onChange={(e) => { setSearchHash(e.target.value); setIsVerifying(false); }}
                className="font-mono text-xs"
              />
            </div>
            <button
              type="submit"
              disabled={!searchHash.trim()}
              className="flex items-center gap-2 rounded-xl border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.08)] px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[rgba(0,245,160,0.35)] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Search className="h-4 w-4 text-[#00F5A0]" />
              Verify
            </button>
          </form>

          {/* Quick select from registered credentials */}
          {credentials.length > 0 && !isVerifying && (
            <div>
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/30">
                Your Registered Credentials
              </p>
              <div className="space-y-2">
                {credentials.map((cred) => (
                  <button
                    key={cred.id}
                    onClick={() => handleQuickVerify(cred.credentialHash)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/6 bg-[#0A0A0A] p-4 text-left transition-all duration-200 hover:border-white/10 hover:bg-white/[0.02]"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">{cred.name}</p>
                      <p className="mt-0.5 text-xs text-white/30">{cred.issuer}</p>
                      <p className="mt-1 font-mono text-[10px] text-white/15 truncate max-w-md">{cred.credentialHash}</p>
                    </div>
                    <ShieldCheck className="h-4 w-4 shrink-0 text-white/20" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Verification Animation */}
          <AnimatePresence mode="wait">
            {isVerifying && (
              <motion.div
                key="verification"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <VerificationAnimation
                  trigger={true}
                  onComplete={handleVerificationComplete}
                  credentialName={credentials.find((c) => c.credentialHash === searchHash)?.name || 'Credential'}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Privacy explanation & Success Indicator */}
          <div className="rounded-2xl border border-white/6 bg-[#0A0A0A] p-6">
            <div className="flex items-center gap-2 mb-3">
              <EyeOff className="h-4 w-4 text-[#00D9FF]" />
              <h3 className="text-sm font-semibold text-white">Circuit Execution & Observable Privacy</h3>
            </div>
            <p className="text-xs text-white/40 leading-relaxed">
              When you run a verification, the Midnight Compact circuit executes <code className="text-[#00D9FF]/60">verifyCredential()</code> locally using zero-knowledge proofs.
              The Lace wallet signs the transaction for the Preprod network, and the verifier receives only &quot;✓ VERIFIED&quot; or &quot;✗ FAILED&quot; — never the credential contents.
              The full document remains entirely in your private witness and is never disclosed to the ledger.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202]">
      <Sidebar />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/6 bg-[#020202]/80 px-6 backdrop-blur-xl">
          <h2 className="text-sm font-medium text-white/40">Verify Credential</h2>
          <WalletButton />
        </header>
        <main className="p-6 lg:p-8">{content}</main>
      </div>
    </div>
  );
}
