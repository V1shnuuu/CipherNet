export type NavigationItem = {
  label: string;
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: string;
};

export type WorkflowStep = {
  label: string;
  detail: string;
};

export type ArchitectureLayer = {
  title: string;
  detail: string;
};

export type ComparisonItem = {
  label: string;
  publicState: string;
  privateWitness: string;
};

export type TechItem = {
  name: string;
  detail: string;
};

export type DevWorkflowStep = {
  title: string;
  detail: string;
};

export type RoadmapItem = {
  phase: string;
  title: string;
  detail: string;
};

export const navigation: NavigationItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'Roadmap', href: '#roadmap' }
];

export const features: FeatureItem[] = [
  {
    title: 'Confidential Credentials',
    description: 'Prove ownership of sensitive documents without exposing the underlying file or personal data.',
    icon: 'shield'
  },
  {
    title: 'Public State Boundary',
    description: 'Keep owner secrets, nonces, signatures, and plaintext metadata out of ledger state.',
    icon: 'fingerprint'
  },
  {
    title: 'Zero Knowledge Pending',
    description: 'The current code protects the state boundary while real proof circuits and verifier wiring are added.',
    icon: 'sparkles'
  },
  {
    title: 'Hash Verification',
    description: 'Credential integrity is anchored to a canonical hash, making tamper detection straightforward and auditable.',
    icon: 'hash'
  },
  {
    title: 'Issuer Registry',
    description: 'Authorized issuers remain explicit in public state, giving organizations a clear trust boundary.',
    icon: 'badge-check'
  },
  {
    title: 'Secure Storage',
    description: 'Encrypted bytes are prepared client-side before any storage provider receives credential data.',
    icon: 'database'
  },
  {
    title: 'Developer Friendly',
    description: 'The repository is organized for a real team: contract, backend, frontend, tests, scripts, and docs.',
    icon: 'blocks'
  },
  {
    title: 'Midnight Native',
    description: 'The submission is centered on Midnight confidential contracts, managed artifacts, and preview-network deployment.',
    icon: 'moon-star'
  }
];

export const workflowSteps: WorkflowStep[] = [
  { label: 'User', detail: 'An individual opens CipherNet and selects a credential to verify.' },
  { label: 'Encrypt Locally', detail: 'Credential bytes are encrypted with AES-GCM before storage or upload.' },
  { label: 'Generate Hash', detail: 'The encrypted credential has a deterministic SHA-256 digest for registration.' },
  { label: 'Private Material', detail: 'Owner secrets, nonces, signatures, and plaintext metadata stay client-side.' },
  { label: 'Compact Contract', detail: 'The contract stores only the hash, issuer, timestamp, and status.' },
  { label: 'Verification', detail: 'The registry returns a boolean based on public record matching.' },
  { label: 'Success', detail: 'The verifier sees only the minimum information needed to trust the result.' }
];

export const architectureLayers: ArchitectureLayer[] = [
  { title: 'Frontend', detail: 'Next.js 15 app with premium motion design and a privacy-first product narrative.' },
  { title: 'Compact Contract', detail: 'CredentialRegistry encodes public state and private witness handling on Midnight.' },
  { title: 'Public Record API', detail: 'Express service rejects private fields and hashes public registration payloads only.' },
  { title: 'Managed Manifest', detail: 'managed/ contains a source-audit hash, not compiled circuits or keys.' },
  { title: 'Toolchain Pending', detail: 'Official Midnight compilation and deployment remain the next Phase 1 milestone.' }
];

export const stateComparison: ComparisonItem[] = [
  {
    label: 'Credential hash',
    publicState: 'Stored on-chain as a deterministic reference for integrity checks.',
    privateWitness: 'Computed from encrypted credential bytes and never expanded into plaintext on the backend.'
  },
  {
    label: 'Issuer',
    publicState: 'Stored publicly so trust can be attributed to an authorized organization.',
    privateWitness: 'No extra issuer metadata is disclosed beyond the verified identity.'
  },
  {
    label: 'Timestamp',
    publicState: 'Stored publicly to support auditability and lifecycle tracking.',
    privateWitness: 'No hidden time data is needed for the proof step.'
  },
  {
    label: 'Credential file',
    publicState: 'Never stored as a readable document.',
    privateWitness: 'Remains client-side. The contract never discloses or stores the credential bytes.'
  }
];

export const techStack: TechItem[] = [
  { name: 'Next.js 15', detail: 'App Router, metadata, and server components for the public experience.' },
  { name: 'React 19', detail: 'Modern component model with motion-friendly client boundaries.' },
  { name: 'TypeScript', detail: 'Strict typing across frontend, backend, scripts, and tests.' },
  { name: 'TailwindCSS', detail: 'Utility-first styling tuned to the CipherNet visual system.' },
  { name: 'shadcn/ui', detail: 'Accessible primitives implemented in the project to keep the stack lightweight.' },
  { name: 'Framer Motion', detail: 'Premium transitions, parallax, magnetic hover, and scroll reveal.' },
  { name: 'Express', detail: 'Compact backend surface for health checks and public-record hashing.' },
  { name: 'Vitest', detail: 'Fast unit tests for crypto, public records, and privacy-boundary regressions.' }
];

export const developerWorkflow: DevWorkflowStep[] = [
  { title: 'Clone and install', detail: 'Install npm dependencies and copy the environment template.' },
  { title: 'Run locally', detail: 'Start the Next.js app and Express proof server in parallel.' },
  { title: 'Prepare manifest', detail: 'Run the managed source-audit script to hash the current contract source.' },
  { title: 'Verify contract', detail: 'Use the verification script and Vitest suite to guard the public/private boundary.' },
  { title: 'Compile officially', detail: 'Use the Midnight toolchain before any preview or preprod deployment.' }
];

export const roadmap: RoadmapItem[] = [
  {
    phase: '01',
    title: 'Public Beta Foundation',
    detail: 'Ship a public-only registry, client encryption, storage boundary, and honest local verification checks.'
  },
  {
    phase: '02',
    title: 'Issuer Console',
    detail: 'Add issuer onboarding, managed credential issuance, and revocation controls for trusted organizations.'
  },
  {
    phase: '03',
    title: 'Proof Automation',
    detail: 'Introduce richer circuits, proof composition, and policy-driven disclosure for more credential types.'
  },
  {
    phase: '04',
    title: 'Enterprise Network',
    detail: 'Expand into role-based access, org-level policy, and multi-tenant governance across Midnight deployments.'
  }
];
