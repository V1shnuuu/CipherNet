'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWallet } from '../../lib/wallet-provider';
import { simulateRegisterCredential, sha256Hash } from '../../lib/midnight-mock';
import { Sidebar } from '../../components/sidebar';
import { WalletButton } from '../../components/wallet-button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Wallet, Loader2, CheckCircle2, Hash, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import type { Credential } from '../../types';

type RegisterStep = 'form' | 'hashing' | 'submitting' | 'success';

export default function RegisterPage() {
  const { wallet, connect, addCredential, logActivity } = useWallet();
  const [step, setStep] = useState<RegisterStep>('form');
  const [progress, setProgress] = useState('');
  const [form, setForm] = useState({
    name: '',
    issuer: '',
    description: '',
    credentialId: '',
  });
  const [result, setResult] = useState<{ hash: string; txHash: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.issuer || !form.credentialId) return;

    setStep('hashing');
    setProgress('Generating SHA-256 credential hash...');
    const credentialHash = await sha256Hash(`${form.credentialId}:${form.issuer}:${form.name}`);
    await new Promise((r) => setTimeout(r, 800));

    setStep('submitting');
    const issuerHash = await sha256Hash(form.issuer);
    const timestamp = Date.now().toString();

    const res = await simulateRegisterCredential(
      credentialHash,
      issuerHash,
      timestamp,
      (s) => setProgress(s)
    );

    setProgress('Requesting Lace wallet signature for transaction...');
    await new Promise((r) => setTimeout(r, 1500));

    const credential: Credential = {
      id: `cred-${Date.now()}`,
      name: form.name,
      issuer: form.issuer,
      description: form.description,
      credentialHash,
      status: 'active',
      registeredAt: new Date().toISOString(),
      txHash: res.txHash,
    };

    addCredential(credential);
    logActivity('credential_registered', 'Credential Registered', `${form.name} by ${form.issuer}`, res.txHash);
    logActivity('circuit_executed', 'Circuit Executed', `registerCredential() completed in ${Math.round(res.executionTimeMs)}ms`, res.txHash);

    setResult({ hash: credentialHash, txHash: res.txHash });
    setStep('success');
  };

  const content = (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <Link href="/dashboard" className="mb-4 inline-flex items-center gap-1 text-xs text-white/30 transition-colors hover:text-white/60">
          <ArrowLeft className="h-3 w-3" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold text-white">Register Credential</h1>
        <p className="mt-1 text-sm text-white/40">
          Create a new credential on the Midnight ledger. The document stays private — only the hash is stored.
        </p>
      </div>

      {wallet.status !== 'connected' ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-white/6 bg-[#0A0A0A] py-16 text-center"
        >
          <Wallet className="h-8 w-8 text-white/15 mb-3" />
          <p className="text-sm text-white/40">Connect your wallet to register credentials</p>
          <button onClick={connect} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.06)] px-5 py-2.5 text-sm font-medium text-white">
            <Wallet className="h-4 w-4 text-[#00F5A0]" />
            Connect Wallet
          </button>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-white/6 bg-[#0A0A0A] p-6"
            >
              <Input
                id="cred-name"
                label="Credential Name"
                placeholder="e.g., Bachelor of Computer Science"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                id="cred-issuer"
                label="Issuer"
                placeholder="e.g., Midnight University"
                value={form.issuer}
                onChange={(e) => setForm({ ...form, issuer: e.target.value })}
                required
              />
              <Textarea
                id="cred-description"
                label="Description (optional)"
                placeholder="Brief description of the credential..."
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <Input
                id="cred-id"
                label="Credential ID"
                placeholder="e.g., CERT-2026-001234"
                value={form.credentialId}
                onChange={(e) => setForm({ ...form, credentialId: e.target.value })}
                required
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.08)] py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-[rgba(0,245,160,0.35)] hover:bg-[rgba(0,245,160,0.14)]"
              >
                <Hash className="h-4 w-4 text-[#00F5A0]" />
                Generate Hash & Register
              </button>
            </motion.form>
          )}

          {(step === 'hashing' || step === 'submitting') && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/6 bg-[#0A0A0A] py-20 text-center"
            >
              <Loader2 className="h-10 w-10 animate-spin text-[#00D9FF] mb-4" />
              <p className="text-sm font-medium text-white">{progress}</p>
              <p className="mt-2 text-xs text-white/30">This may take a few seconds...</p>
            </motion.div>
          )}

          {step === 'success' && result && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center rounded-2xl border border-[rgba(0,245,160,0.15)] bg-[rgba(0,245,160,0.03)] py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle2 className="h-16 w-16 text-[#00F5A0] mb-4" />
              </motion.div>
              <h2 className="text-xl font-bold text-white">Credential Registered!</h2>
              <p className="mt-2 text-sm text-white/40 max-w-md">
                {form.name} has been successfully registered on the Midnight ledger.
              </p>
              <div className="mt-6 w-full max-w-md space-y-2 text-left px-8">
                <div className="rounded-lg bg-black/30 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-white/30">Credential Hash</p>
                  <p className="mt-1 font-mono text-xs text-white/60 break-all">{result.hash}</p>
                </div>
                <div className="rounded-lg bg-black/30 p-3">
                  <p className="text-[10px] uppercase tracking-wider text-white/30">Transaction Hash</p>
                  <p className="mt-1 font-mono text-xs text-white/60 break-all">{result.txHash}</p>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => { setStep('form'); setForm({ name: '', issuer: '', description: '', credentialId: '' }); setResult(null); }}
                  className="rounded-xl border border-white/8 px-5 py-2.5 text-sm text-white/60 transition-colors hover:border-white/15 hover:text-white"
                >
                  Register Another
                </button>
                <Link
                  href="/verify"
                  className="rounded-xl border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.06)] px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-[rgba(0,245,160,0.12)]"
                >
                  Verify Credential
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202]">
      <Sidebar />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/6 bg-[#020202]/80 px-6 backdrop-blur-xl">
          <h2 className="text-sm font-medium text-white/40">Register Credential</h2>
          <WalletButton />
        </header>
        <main className="p-6 lg:p-8">{content}</main>
      </div>
    </div>
  );
}
