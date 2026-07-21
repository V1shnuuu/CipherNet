'use client';

import { motion } from 'framer-motion';
import { Sidebar } from '../../components/sidebar';
import { WalletButton } from '../../components/wallet-button';
import { MOCK_CONTRACT_ADDRESS } from '../../types';
import {
  BookOpen,
  Cpu,
  FileCode2,
  Layers,
  Shield,
  Wallet,
} from 'lucide-react';

const sections = [
  {
    id: 'overview',
    title: 'Overview',
    icon: BookOpen,
    content: `CipherNet is a privacy-preserving credential verification platform built on the Midnight Network. It enables organizations and individuals to issue, store, and verify credentials without exposing sensitive data. By utilizing zero-knowledge proofs through Midnight's Compact language, CipherNet ensures that verifiers only receive a cryptographic confirmation of authenticity while the full document remains strictly confidential.`,
  },
  {
    id: 'architecture',
    title: 'Architecture',
    icon: Layers,
    content: `The system consists of five layers:

• Frontend — Next.js 15 application with React 19, Framer Motion animations, and TailwindCSS
• Wallet Layer — Lace wallet integration via Midnight.js SDK for transaction signing
• Compact Contract — CredentialRegistry.compact deployed on Midnight Preprod
• Proof Server — Zero-knowledge proof generation and verification
• Managed Artifacts — Compiled circuits and verification keys in the managed/ directory`,
  },
  {
    id: 'privacy',
    title: 'Privacy Model',
    icon: Shield,
    content: `CipherNet separates data into two categories:

Public State (Ledger):
• Credential hash — SHA-256 digest of the credential
• Issuer identifier — Organization that issued the credential
• Timestamp — When the credential was registered
• Status — Active or Revoked

Private Witness (Local):
• Full credential document (degree, medical record, etc.)
• Owner identity (name, student ID, etc.)
• Detailed metadata (CGPA, scores, etc.)
• Encryption keys and nonces

The private witness never leaves the user's device. The Compact circuit uses it to generate a zero-knowledge proof that the credential is valid, without revealing any of its contents.`,
  },
  {
    id: 'wallet',
    title: 'Wallet Integration',
    icon: Wallet,
    content: `CipherNet connects to the Lace wallet browser extension for transaction signing. The wallet provides:

• Account address for identity on the Midnight network
• Transaction signing for registerCredential() and verifyCredential() calls
• Network selection (Preprod/Preview)
• Balance display in tMIDN tokens

Connect your wallet using the button in the header or dashboard.`,
  },
  {
    id: 'sdk',
    title: 'Midnight.js SDK',
    icon: Cpu,
    content: `The application integrates with the Midnight.js SDK to:

• Connect and disconnect the Lace wallet
• Execute Compact circuit calls (registerCredential, verifyCredential)
• Track transaction status and block confirmations
• Handle loading, success, and error states
• Display circuit execution metrics (proof size, execution time)`,
  },
  {
    id: 'contract',
    title: 'Smart Contract',
    icon: FileCode2,
    content: `The CredentialRegistry.compact contract provides three circuits:

registerCredential(credentialHash, issuer, timestamp)
  — Registers a new credential on the public ledger
  — Uses disclose() for public state fields only

verifyCredential(credentialHash, issuer, timestamp) → Boolean
  — Verifies a credential exists and matches the provided parameters
  — Returns only true/false (minimum disclosure)

isCredentialActive(credentialHash) → Boolean
  — Checks if a credential has active status

Contract Address: ${MOCK_CONTRACT_ADDRESS}
Network: Midnight Preprod`,
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#020202]">
      <Sidebar />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/6 bg-[#020202]/80 px-6 backdrop-blur-xl">
          <h2 className="text-sm font-medium text-white/40">Documentation</h2>
          <WalletButton />
        </header>
        <main className="p-6 lg:p-8">
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-2xl font-bold text-white">Documentation</h1>
              <p className="mt-1 text-sm text-white/40">
                Technical reference for the CipherNet platform and Midnight integration.
              </p>
            </motion.div>

            {/* Table of Contents */}
            <div className="mb-8 rounded-2xl border border-white/6 bg-[#0A0A0A] p-5">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/30">Contents</p>
              <nav className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                {sections.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/50 transition-colors hover:text-white hover:bg-white/[0.03]"
                  >
                    <s.icon className="h-3.5 w-3.5 text-[#00F5A0]" />
                    {s.title}
                  </a>
                ))}
              </nav>
            </div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <motion.section
                  key={section.id}
                  id={section.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="rounded-2xl border border-white/6 bg-[#0A0A0A] overflow-hidden"
                >
                  <div className="border-b border-white/6 px-6 py-4">
                    <div className="flex items-center gap-2">
                      <section.icon className="h-4 w-4 text-[#00F5A0]" />
                      <h2 className="text-sm font-semibold text-white">{section.title}</h2>
                    </div>
                  </div>
                  <div className="px-6 py-5">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-white/50">
                      {section.content}
                    </pre>
                  </div>
                </motion.section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
