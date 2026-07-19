"use client";

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Blocks,
  Database,
  Fingerprint,
  Hash,
  Lock,
  MoonStar,
  Shield,
  Sparkles
} from 'lucide-react';
import { AnimatedBackground } from '@/components/animated-background';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { SectionHeading } from '@/components/section-heading';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import {
  architectureLayers,
  developerWorkflow,
  features,
  roadmap,
  stateComparison,
  techStack,
  workflowSteps
} from '@/lib/site';
import { cn } from '@/lib/utils';

const featureIcons = {
  shield: Shield,
  fingerprint: Fingerprint,
  sparkles: Sparkles,
  hash: Hash,
  'badge-check': BadgeCheck,
  database: Database,
  blocks: Blocks,
  'moon-star': MoonStar
} as const;

export function CipherNetLanding() {
  return (
    <div id="top" className="relative overflow-hidden">
      <SiteHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <ArchitectureSection />
        <StateSection />
        <TechnologySection />
        <DeveloperWorkflowSection />
        <RoadmapSection />
        <section id="docs" className="section-shell">
          <div className="container-shell">
            <Card className="overflow-hidden border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(0,245,160,0.04),rgba(0,217,255,0.03))]">
              <CardHeader>
                <Badge tone="cyan" className="mb-4 w-fit">
                  Documentation ready
                </Badge>
                <CardTitle>Deployment-first repository structure</CardTitle>
                <CardDescription>
                  The README, docs, contract, managed artifacts, tests, and scripts are organized for a real Midnight submission, not a throwaway demo.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6 md:grid-cols-3">
                <InfoChip label="Frontend" value="Next.js 15 + React 19 + Framer Motion" />
                <InfoChip label="Blockchain" value="Midnight Compact + confidential state" />
                <InfoChip label="Quality" value="Strict TypeScript + Vitest + Express" />
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const [pointer, setPointer] = useState({ x: 50, y: 45 });

  const glowStyle = useMemo(
    () => ({
      '--pointer-x': `${pointer.x}%`,
      '--pointer-y': `${pointer.y}%`
    } as React.CSSProperties),
    [pointer]
  );

  return (
    <section className="relative border-b border-white/5 pb-20 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
      <AnimatedBackground />
      <div className="container-shell relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 24 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <Badge tone="emerald" className="mb-6">
              Midnight Moonshots / New Moon submission
            </Badge>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              <span className="text-gradient">Privacy-first Credential Verification</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted sm:text-xl">
              Verify credentials without exposing sensitive data. CipherNet demonstrates Midnight confidential smart contracts, private witness handling, and minimum-disclosure verification for real-world identity, education, medical, and financial records.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild className="group px-7">
                <a href="#deployment" className="inline-flex items-center gap-2">
                  Deploy Contract
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </Button>
              <Button variant="secondary" size="lg" asChild className="group px-7">
                <a href="#docs" className="inline-flex items-center gap-2">
                  View Documentation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </Button>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-muted">
              <Badge tone="subtle">Compact Contract</Badge>
              <Badge tone="subtle">Private Witness</Badge>
              <Badge tone="subtle">Preview Network Ready</Badge>
              <Badge tone="subtle">Vitest Passing</Badge>
            </div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.94 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
            onPointerMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - bounds.left) / bounds.width) * 100;
              const y = ((event.clientY - bounds.top) / bounds.height) * 100;
              setPointer({ x, y });
            }}
            onPointerLeave={() => setPointer({ x: 50, y: 45 })}
            className="relative"
            style={glowStyle}
          >
            <div
              className="absolute inset-0 rounded-[2rem] opacity-80 blur-3xl transition duration-300"
              style={{
                background:
                  'radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(0,245,160,0.25), transparent 30%), radial-gradient(circle at 70% 20%, rgba(0,217,255,0.2), transparent 20%)'
              }}
            />

            <div className="relative rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-4 shadow-panel backdrop-blur-2xl sm:p-5">
              <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_center,rgba(0,245,160,0.08),transparent_58%)]" />
              <div className="relative grid gap-4">
                <FloatingCard className="md:ml-10 md:w-[80%]" title="Public Ledger" badge="issuer / hash / timestamp" accent="emerald">
                  <LedgerLine label="credential hash" value="0x6b9f…92a1" />
                  <LedgerLine label="issuer" value="Midnight University" />
                  <LedgerLine label="timestamp" value="2026-07-19 00:00 UTC" />
                </FloatingCard>

                <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
                  <FloatingCard title="Private Witness" badge="owner secret / proof path" accent="cyan">
                    <div className="space-y-3 text-sm text-muted">
                      <p>The original document never becomes public state. Only the witness-derived proof path is used.</p>
                      <div className="grid gap-2 rounded-2xl border border-white/8 bg-black/30 p-4">
                        <Skeleton className="h-3 w-3/5" />
                        <Skeleton className="h-3 w-4/5" />
                        <Skeleton className="h-3 w-2/5" />
                      </div>
                    </div>
                  </FloatingCard>

                  <FloatingCard title="Verification Result" badge="success" accent="emerald" className="md:translate-y-8">
                    <div className="space-y-3 text-sm text-muted">
                      <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(0,245,160,0.2)] bg-[rgba(0,245,160,0.08)] px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-[#d4ffef]">
                        <Lock className="h-3.5 w-3.5" /> Minimum disclosure
                      </div>
                      <p>Verifier receives only the facts needed to confirm authenticity, not the sensitive document itself.</p>
                    </div>
                  </FloatingCard>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="section-shell">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Capabilities"
          title="Built around privacy, trust, and low-disclosure verification."
          description="CipherNet focuses on the primitives the accelerator cares about: Midnight tooling, a Compact contract, private witness handling, and a clean product surface that can scale into a real platform."
        />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = featureIcons[feature.icon as keyof typeof featureIcons];
            return (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                className="glass-panel glow-border rounded-[1.75rem] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/[0.05]"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[rgba(0,245,160,0.95)] shadow-[0_0_24px_rgba(0,245,160,0.08)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{feature.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section id="how-it-works" className="section-shell border-y border-white/5 bg-white/[0.015]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Workflow"
          title="A clean verification journey from upload to success."
          description="The flow is intentionally linear and easy to explain to users, investors, and reviewers: the credential is transformed into a canonical hash, the private witness stays private, and Midnight verifies the result."
        />

        <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-7">
          {workflowSteps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={cn('relative flex flex-col gap-3 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5', index < workflowSteps.length - 1 ? 'lg:after:absolute lg:after:right-[-1.1rem] lg:after:top-1/2 lg:after:h-px lg:after:w-4 lg:after:bg-[linear-gradient(90deg,rgba(0,245,160,0.5),rgba(0,217,255,0.5))]' : '')}
            >
              <span className="text-xs font-medium uppercase tracking-[0.28em] text-[rgba(0,245,160,0.95)]">0{index + 1}</span>
              <h3 className="text-base font-semibold text-white">{step.label}</h3>
              <p className="text-sm leading-6 text-muted">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section id="architecture" className="section-shell">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Architecture"
          title="A direct line from product intent to Midnight deployment."
          description="The architecture is intentionally compact: a premium frontend, an Express proof server, generated managed artifacts, and the Midnight contract as the confidentiality boundary."
        />

        <div className="grid gap-5 lg:grid-cols-5">
          {architectureLayers.map((layer, index) => (
            <motion.article
              key={layer.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="glass-panel glow-border relative rounded-[1.75rem] p-6"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-[rgba(0,217,255,0.95)]">
                {index === 0 ? <Blocks className="h-5 w-5" /> : index === 1 ? <Lock className="h-5 w-5" /> : index === 2 ? <Shield className="h-5 w-5" /> : index === 3 ? <Sparkles className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
              </div>
              <h3 className="text-lg font-semibold text-white">{layer.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{layer.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StateSection() {
  return (
    <section className="section-shell border-y border-white/5 bg-white/[0.015]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Privacy model"
          title="Public state vs private witness is the core design choice."
          description="CipherNet uses the public ledger only for facts that must be globally auditable. Everything else remains private and is used only through witness evaluation and disclose()."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          {stateComparison.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass-panel rounded-[1.75rem] p-6"
            >
              <Badge tone={index % 2 === 0 ? 'emerald' : 'cyan'} className="mb-4">
                {item.label}
              </Badge>
              <div className="grid gap-4 md:grid-cols-2">
                <ComparisonBlock title="Public State" description={item.publicState} />
                <ComparisonBlock title="Private Witness" description={item.privateWitness} />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Technology"
          title="A production-minded stack with modern defaults."
          description="Every part of the stack is deliberate: Next.js for the product surface, Express for verification services, Compact for the confidential contract, and Vitest for fast feedback."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {techStack.map((tech, index) => (
            <motion.article
              key={tech.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5"
            >
              <h3 className="text-base font-semibold text-white">{tech.name}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{tech.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function DeveloperWorkflowSection() {
  return (
    <section className="section-shell border-y border-white/5 bg-white/[0.015]">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Developer workflow"
          title="A clean path from local development to preview deployment."
          description="The repository includes the files needed for a serious engineering workflow: deterministic contract checks, managed artifact generation, test coverage, and deploy scripts."
        />

        <div className="grid gap-4 lg:grid-cols-5">
          {developerWorkflow.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass-panel rounded-[1.5rem] p-5"
            >
              <div className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-[rgba(0,245,160,0.9)]">Step 0{index + 1}</div>
              <h3 className="text-base font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{step.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function RoadmapSection() {
  return (
    <section id="roadmap" className="section-shell">
      <div className="container-shell">
        <SectionHeading
          eyebrow="Roadmap"
          title="Start with the New Moon foundation, then expand into a credential network."
          description="This submission is intentionally focused on the level-one proof of concept. The roadmap shows where CipherNet goes next once the Midnight foundation is validated."
        />

        <div className="grid gap-4 lg:grid-cols-4">
          {roadmap.map((item, index) => (
            <motion.article
              key={item.phase}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="glass-panel glow-border rounded-[1.75rem] p-6"
            >
              <div className="text-xs font-medium uppercase tracking-[0.32em] text-[rgba(0,217,255,0.95)]">{item.phase}</div>
              <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
      <div id="deployment" className="container-shell mt-8">
        <Card className="bg-[linear-gradient(135deg,rgba(0,245,160,0.08),rgba(0,217,255,0.06),rgba(255,255,255,0.03))]">
          <CardHeader>
            <Badge tone="emerald" className="mb-4 w-fit">
              Deployment ready
            </Badge>
            <CardTitle>Preview or preprod is the next real milestone.</CardTitle>
            <CardDescription>
              Wire the generated managed artifacts into the Midnight toolchain, point the frontend at the deployed contract address, and keep the privacy boundary intact.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="group" asChild>
              <a href="#top" className="inline-flex items-center gap-2">
                Review from top
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

function FloatingCard({
  title,
  badge,
  accent,
  className,
  children
}: {
  title: string;
  badge: string;
  accent: 'emerald' | 'cyan';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.4)] backdrop-blur-xl',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <Badge tone={accent} className="whitespace-nowrap">
          {badge}
        </Badge>
      </div>
      {children}
    </div>
  );
}

function LedgerLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/6 py-3 last:border-0 last:pb-0 first:pt-0">
      <span className="text-xs uppercase tracking-[0.24em] text-muted">{label}</span>
      <span className="font-mono text-xs text-white/90">{value}</span>
    </div>
  );
}

function ComparisonBlock({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
      <div className="text-xs font-medium uppercase tracking-[0.24em] text-[rgba(0,245,160,0.9)]">{title}</div>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
    </div>
  );
}

function InfoChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.5rem] border border-white/8 bg-black/20 p-5">
      <div className="text-xs font-medium uppercase tracking-[0.24em] text-muted">{label}</div>
      <p className="mt-3 text-base leading-7 text-white">{value}</p>
    </div>
  );
}
