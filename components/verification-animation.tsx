'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldCheck, Loader2, Lock, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { useState, useCallback } from 'react';

type VerificationStep = 'idle' | 'loading' | 'proving' | 'verifying' | 'success' | 'error';

interface VerificationAnimationProps {
  onComplete?: (verified: boolean) => void;
  trigger?: boolean;
  credentialName?: string;
}

const HIDDEN_FIELDS = [
  { label: 'Full Name', value: '█████ ██████████' },
  { label: 'Student ID', value: '████████' },
  { label: 'CGPA', value: '█.██' },
  { label: 'Institution', value: '████████ ██████████' },
  { label: 'Date of Issue', value: '██/██/████' },
];

const stepMessages: Record<VerificationStep, string> = {
  idle: 'Ready to verify',
  loading: 'Loading public state from ledger...',
  proving: 'Generating ZK Proof locally (Owner Secret is hidden)...',
  verifying: 'Network validating proof without seeing data...',
  success: 'Verification Complete (Observable Privacy Proven)',
  error: 'Verification Failed',
};

export function VerificationAnimation({ onComplete, trigger, credentialName = 'Degree Certificate' }: VerificationAnimationProps) {
  const [step, setStep] = useState<VerificationStep>('idle');

  const runVerification = useCallback(async () => {
    if (step !== 'idle') return;

    setStep('loading');
    await new Promise((r) => setTimeout(r, 1200));

    setStep('proving');
    await new Promise((r) => setTimeout(r, 2200));

    setStep('verifying');
    await new Promise((r) => setTimeout(r, 1500));

    setStep('success');
    onComplete?.(true);
  }, [step, onComplete]);

  // Auto-trigger
  if (trigger && step === 'idle') {
    runVerification();
  }

  const isProcessing = step === 'loading' || step === 'proving' || step === 'verifying';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-[#0A0A0A]">
      {/* Header */}
      <div className="border-b border-white/6 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${step === 'success' ? 'bg-[rgba(0,245,160,0.1)]' : 'bg-white/[0.04]'} transition-colors duration-500`}>
              {step === 'success' ? (
                <ShieldCheck className="h-5 w-5 text-[#00F5A0]" />
              ) : (
                <Shield className="h-5 w-5 text-white/40" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{credentialName}</h3>
              <p className="text-xs text-white/40">{stepMessages[step]}</p>
            </div>
          </div>
          {isProcessing && <Loader2 className="h-4 w-4 animate-spin text-[#00D9FF]" />}
        </div>
      </div>

      {/* Privacy Demo: Hidden Fields */}
      <div className="px-6 py-5">
        <div className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/30">
          <EyeOff className="h-3.5 w-3.5" />
          Private Data (Never Revealed)
        </div>
        <div className="space-y-2.5">
          {HIDDEN_FIELDS.map((field) => (
            <div key={field.label} className="flex items-center justify-between rounded-lg bg-white/[0.02] px-4 py-2.5">
              <span className="text-xs text-white/30">{field.label}</span>
              <span className="font-mono text-xs text-white/10 select-none">{field.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Verification Result */}
      <AnimatePresence mode="wait">
        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="border-t border-white/6"
          >
            <div className="px-6 py-5">
              <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-white/30">
                <Eye className="h-3.5 w-3.5" />
                Verification Result (Only This Is Shared)
              </div>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
                className="flex items-center gap-4 rounded-xl border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.05)] px-5 py-4"
              >
                <CheckCircle2 className="h-8 w-8 text-[#00F5A0]" />
                <div>
                  <p className="text-lg font-bold text-[#00F5A0]">✓ VERIFIED</p>
                  <p className="text-xs text-white/40">Credential is authentic. No sensitive data was disclosed.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      {isProcessing && (
        <div className="h-0.5 w-full overflow-hidden bg-white/5">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00F5A0] to-[#00D9FF]"
            initial={{ width: '0%' }}
            animate={{
              width: step === 'loading' ? '30%' : step === 'proving' ? '65%' : '90%',
            }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* Start Button */}
      {step === 'idle' && !trigger && (
        <div className="border-t border-white/6 px-6 py-4">
          <button
            onClick={runVerification}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.06)] py-3 text-sm font-medium text-white transition-all duration-300 hover:border-[rgba(0,245,160,0.35)] hover:bg-[rgba(0,245,160,0.12)]"
          >
            <Lock className="h-4 w-4 text-[#00F5A0]" />
            Run Confidential Verification
          </button>
        </div>
      )}

      {/* Reset */}
      {step === 'success' && (
        <div className="border-t border-white/6 px-6 py-3">
          <button
            onClick={() => setStep('idle')}
            className="text-xs text-white/30 transition-colors hover:text-white/60"
          >
            Reset demo
          </button>
        </div>
      )}
    </div>
  );
}
