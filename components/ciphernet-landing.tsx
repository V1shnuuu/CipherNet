'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  ChevronRight,
  Cpu,
  Database,
  Eye,
  EyeOff,
  FileCheck2,
  Fingerprint,
  Lock,
  MoonStar,
  Shield,
  ShieldCheck,
  Sparkles,
  Wallet,
  Zap,
} from 'lucide-react';
import { SiteHeader } from './site-header';
import { SiteFooter } from './site-footer';
import { VerificationAnimation } from './verification-animation';
import { WalletButton } from './wallet-button';
import { Badge } from './ui/badge';

const features = [
  {
    title: 'Confidential Verification',
    description: 'Prove ownership of credentials without exposing the underlying document or personal data.',
    icon: Shield,
  },
  {
    title: 'Zero Knowledge Ready',
    description: 'Compact circuits execute verifyCredential() using zero-knowledge proofs on the Midnight network.',
    icon: Sparkles,
  },
  {
    title: 'Private Witness',
    description: 'Sensitive data stays in the private witness — never stored on-chain or shared with verifiers.',
    icon: Fingerprint,
  },
  {
    title: 'Fast Verification',
    description: 'Circuit execution completes in seconds with minimal proof size for efficient on-chain validation.',
    icon: Zap,
  },
  {
    title: 'Permission Based Access',
    description: 'Authorized issuers are registered on-chain, creating a clear trust boundary for credentials.',
    icon: BadgeCheck,
  },
  {
    title: 'Encrypted Credentials',
    description: 'Credential bytes are encrypted client-side with AES-GCM before any interaction with storage.',
    icon: Database,
  },
  {
    title: 'Enterprise Ready',
    description: 'The architecture supports multi-tenant governance, role-based access, and organizational policies.',
    icon: Blocks,
  },
  {
    title: 'Built on Midnight',
    description: 'Native integration with Midnight confidential contracts, Lace wallet, and the proof server.',
    icon: MoonStar,
  },
];

const workflowSteps = [
  { step: '01', title: 'Connect Wallet', description: 'Link your Lace wallet to authenticate on the Midnight network.' },
  { step: '02', title: 'Create Credential', description: 'Fill in credential details — the document stays local.' },
  { step: '03', title: 'Generate Hash', description: 'SHA-256 digest is computed client-side for integrity.' },
  { step: '04', title: 'Midnight Contract', description: 'registerCredential() stores only the hash on-chain.' },
  { step: '05', title: 'Private Witness', description: 'The full document remains in the private witness.' },
  { step: '06', title: 'Verification', description: 'verifyCredential() circuit generates a ZK proof.' },
  { step: '07', title: 'Success', description: 'Verifier receives ✓ VERIFIED — nothing else.' },
];

const architectureLayers = [
  { title: 'Frontend', description: 'Next.js 15 + React 19 + Framer Motion', icon: Blocks },
  { title: 'Midnight.js SDK', description: 'Wallet connection + circuit calls', icon: Wallet },
  { title: 'Compact Contract', description: 'CredentialRegistry on Preprod', icon: FileCheck2 },
  { title: 'Proof Server', description: 'ZK proof generation + validation', icon: Cpu },
  { title: 'Managed Circuits', description: 'Compiled circuits + verification keys', icon: Lock },
];

const trustedBy = ['Universities', 'Hospitals', 'Banks', 'Government', 'Enterprises'];

export function CipherNetLanding() {
  return (
    <div id="top" className="relative overflow-hidden">
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <PrivacyComparisonSection />
        <HowItWorksSection />
        <ArchitectureSection />
        <PrivacyDemoSection />
        <RoadmapSection />
        <CTASection />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ============================================
   HERO
============================================ */
function HeroSection() {
  const reduced = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-white/5 pb-24 pt-16 lg:pb-32 lg:pt-24">
      {/* Background effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,245,160,0.08),transparent_60%)] blur-3xl" />
        <div className="absolute right-1/4 top-20 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,217,255,0.06),transparent_60%)] blur-3xl" />
      </div>

      <div className="container-shell relative z-10">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={reduced ? undefined : { opacity: 0, y: 24 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <Badge tone="emerald" className="mb-6 inline-flex">
              Midnight Moonshots · Level 2 (Waxing Crescent) · Lace Wallet Ready
            </Badge>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">
                Verify Credentials{' '}
              </span>
              <br />
              <span className="text-white">Without Revealing Them.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/40 sm:text-xl">
              Privacy-first verification powered by Midnight confidential smart contracts.
              Organizations only receive verification results — sensitive information always remains private.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <WalletButton />
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                Explore Dashboard
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating cards preview */}
        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 40 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="rounded-2xl border border-white/6 bg-[#0A0A0A]/80 p-6 backdrop-blur-xl shadow-panel-lg">
            <div className="grid gap-4 md:grid-cols-3">
              <HeroInfoCard label="Contract" value="CredentialRegistry" accent="emerald" />
              <HeroInfoCard label="Network" value="Midnight Preprod" accent="cyan" />
              <HeroInfoCard label="Privacy" value="Zero Knowledge" accent="emerald" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function HeroInfoCard({ label, value, accent }: { label: string; value: string; accent: 'emerald' | 'cyan' }) {
  const borderColor = accent === 'emerald' ? 'border-[rgba(0,245,160,0.12)]' : 'border-[rgba(0,217,255,0.12)]';
  const glowColor = accent === 'emerald' ? 'text-[#00F5A0]' : 'text-[#00D9FF]';
  return (
    <div className={`rounded-xl border ${borderColor} bg-white/[0.02] p-4`}>
      <p className="text-[10px] font-medium uppercase tracking-wider text-white/25">{label}</p>
      <p className={`mt-1.5 text-sm font-semibold ${glowColor}`}>{value}</p>
    </div>
  );
}

/* ============================================
   TRUSTED BY
============================================ */
function TrustedBySection() {
  return (
    <section className="border-b border-white/5 py-12">
      <div className="container-shell">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-white/20">
          Designed for
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
          {trustedBy.map((name) => (
            <span key={name} className="text-sm font-medium text-white/15 transition-colors hover:text-white/30">
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   FEATURES
============================================ */
function FeaturesSection() {
  return (
    <section id="features" className="section-shell">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Features"
          title="Built around privacy, trust, and minimum disclosure."
          description="Every feature is designed to keep sensitive credential data off-chain while providing verifiable proof of authenticity."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group rounded-2xl border border-white/6 bg-[#0A0A0A] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/10"
            >
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03] text-[#00F5A0] transition-colors group-hover:border-[rgba(0,245,160,0.2)] group-hover:bg-[rgba(0,245,160,0.06)]">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/35">{feature.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PRIVACY COMPARISON
============================================ */
function PrivacyComparisonSection() {
  const [showCipher, setShowCipher] = useState(true);

  return (
    <section className="section-shell border-y border-white/5 bg-white/[0.01]">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Privacy Comparison"
          title="Traditional verification vs CipherNet."
          description="See the fundamental difference in how credentials are verified."
        />

        <div className="mx-auto max-w-3xl">
          {/* Toggle */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-xl border border-white/8 bg-white/[0.02] p-1">
              <button
                onClick={() => setShowCipher(false)}
                className={`rounded-lg px-5 py-2 text-sm font-medium transition-all duration-300 ${!showCipher ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white/60'}`}
              >
                Traditional
              </button>
              <button
                onClick={() => setShowCipher(true)}
                className={`rounded-lg px-5 py-2 text-sm font-medium transition-all duration-300 ${showCipher ? 'bg-[rgba(0,245,160,0.1)] text-[#00F5A0]' : 'text-white/40 hover:text-white/60'}`}
              >
                CipherNet
              </button>
            </div>
          </div>

          {/* Comparison cards */}
          <motion.div
            key={showCipher ? 'cipher' : 'traditional'}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="rounded-2xl border border-white/6 bg-[#0A0A0A] p-8"
          >
            {showCipher ? (
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[rgba(0,245,160,0.08)]">
                  <EyeOff className="h-8 w-8 text-[#00F5A0]" />
                </div>
                <h3 className="text-xl font-bold text-white">CipherNet Verification</h3>
                <p className="mt-2 text-sm text-white/40">Organization receives only:</p>
                <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-xl border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.05)] px-8 py-4">
                  <ShieldCheck className="h-6 w-6 text-[#00F5A0]" />
                  <span className="text-lg font-bold text-[#00F5A0]">✓ Verified</span>
                </div>
                <p className="mt-4 text-xs text-white/25">Name, CGPA, Certificate, Institution, Student ID — all hidden.</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
                  <Eye className="h-8 w-8 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Traditional Verification</h3>
                <p className="mt-2 text-sm text-white/40">Organization receives everything:</p>
                <div className="mx-auto mt-6 grid max-w-sm gap-2">
                  {['PDF Certificate', 'Full Name', 'Student ID', 'CGPA / Grades', 'Institution'].map((item) => (
                    <div key={item} className="rounded-lg border border-red-500/10 bg-red-500/5 px-4 py-2 text-sm text-red-300/70">
                      {item}
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-white/25">All sensitive data exposed and stored forever.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   HOW IT WORKS
============================================ */
function HowItWorksSection() {
  return (
    <section id="how-it-works" className="section-shell">
      <div className="container-shell">
        <SectionHeader
          eyebrow="How It Works"
          title="A clear verification journey from wallet to success."
          description="The flow is intentionally linear: connect, hash, register, verify. The private witness stays private throughout."
        />
        <div className="mx-auto max-w-4xl space-y-3">
          {workflowSteps.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="flex gap-5 rounded-xl border border-white/6 bg-[#0A0A0A] p-5 transition-colors duration-300 hover:border-white/10"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,245,160,0.06)] text-xs font-bold text-[#00F5A0]">
                {item.step}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-white/35">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ARCHITECTURE
============================================ */
function ArchitectureSection() {
  return (
    <section id="architecture" className="section-shell border-y border-white/5 bg-white/[0.01]">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Architecture"
          title="A direct line from product intent to Midnight deployment."
          description="The stack is deliberately minimal: a premium frontend, the Midnight SDK, and a Compact contract as the privacy boundary."
        />
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-3">
            {architectureLayers.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="w-full"
              >
                <div className="flex items-center gap-4 rounded-xl border border-white/6 bg-[#0A0A0A] p-5 transition-colors duration-300 hover:border-white/10">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[rgba(0,217,255,0.06)]">
                    <layer.icon className="h-5 w-5 text-[#00D9FF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-white">{layer.title}</h3>
                    <p className="text-xs text-white/35">{layer.description}</p>
                  </div>
                </div>
                {index < architectureLayers.length - 1 && (
                  <div className="mx-auto flex h-6 w-px items-center justify-center bg-gradient-to-b from-[rgba(0,245,160,0.3)] to-[rgba(0,217,255,0.3)]" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   PRIVACY DEMO
============================================ */
function PrivacyDemoSection() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Observable Privacy"
          title="See the privacy guarantee in action."
          description="Run a live verification demo. Notice how the credential data is never revealed — only the verification result is shared."
        />
        <div className="mx-auto max-w-2xl">
          <VerificationAnimation credentialName="Bachelor of Computer Science" />
        </div>
      </div>
    </section>
  );
}

/* ============================================
   ROADMAP
============================================ */
const roadmapItems = [
  { phase: 'Phase 1', title: 'Foundation', description: 'Contract deployment, wallet integration, credential registration and verification.', status: 'current' },
  { phase: 'Phase 2', title: 'Issuer Console', description: 'Organization onboarding, managed issuance, and revocation controls.', status: 'upcoming' },
  { phase: 'Phase 3', title: 'Proof Automation', description: 'Advanced circuits, proof composition, and policy-driven disclosure.', status: 'upcoming' },
  { phase: 'Phase 4', title: 'Enterprise Network', description: 'Multi-tenant governance, role-based access, and cross-chain verification.', status: 'upcoming' },
];

function RoadmapSection() {
  return (
    <section id="roadmap" className="section-shell border-t border-white/5">
      <div className="container-shell">
        <SectionHeader
          eyebrow="Roadmap"
          title="From proof of concept to credential network."
          description="CipherNet is built to grow from a hackathon demo into a production privacy platform."
        />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {roadmapItems.map((item, index) => (
            <motion.article
              key={item.phase}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className={`rounded-2xl border p-6 ${item.status === 'current' ? 'border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.03)]' : 'border-white/6 bg-[#0A0A0A]'}`}
            >
              <div className={`text-xs font-medium uppercase tracking-widest ${item.status === 'current' ? 'text-[#00F5A0]' : 'text-[#00D9FF]/60'}`}>
                {item.phase}
              </div>
              <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/35">{item.description}</p>
              {item.status === 'current' && (
                <div className="mt-4 flex items-center gap-1.5 text-xs text-[#00F5A0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00F5A0] animate-pulse" />
                  In Progress
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA
============================================ */
function CTASection() {
  return (
    <section className="section-shell border-t border-white/5">
      <div className="container-shell text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl"
        >
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to verify with privacy?
          </h2>
          <p className="mt-4 text-base text-white/40">
            Connect your wallet and experience zero-knowledge credential verification on Midnight.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <WalletButton />
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 text-sm text-white/40 transition-colors hover:text-white/70"
            >
              Read the docs
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================
   SHARED
============================================ */
function SectionHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#00F5A0]">{eyebrow}</p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-white/35">{description}</p>
    </div>
  );
}
