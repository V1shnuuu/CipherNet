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
    title: 'Private Witness',
    description: 'Keep owner secrets and witness material off the public ledger while still enabling deterministic checks.',
    icon: 'fingerprint'
  },
  {
    title: 'Zero Knowledge Ready',
    description: 'The product is designed around proof-first verification so future circuits can move from witness checks to full ZK proofs.',
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
    description: 'Public and private state are intentionally separated to reduce accidental disclosure and simplify compliance.',
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
  { label: 'Upload Credential', detail: 'Only the minimal metadata required for verification is introduced into the flow.' },
  { label: 'Generate Hash', detail: 'The credential is canonicalized and converted into a deterministic digest.' },
  { label: 'Private Witness', detail: 'Owner secret and witness data remain private and never become public state.' },
  { label: 'Compact Contract', detail: 'The contract stores the hash, issuer, and timestamp while guarding private material.' },
  { label: 'Verification', detail: 'The proof path confirms authenticity without revealing the original document.' },
  { label: 'Success', detail: 'The verifier sees only the minimum information needed to trust the result.' }
];

export const architectureLayers: ArchitectureLayer[] = [
  { title: 'Frontend', detail: 'Next.js 15 app with premium motion design and a privacy-first product narrative.' },
  { title: 'Compact Contract', detail: 'CredentialRegistry encodes public state and private witness handling on Midnight.' },
  { title: 'Proof Server', detail: 'Express service validates preview requests and prepares verification payloads.' },
  { title: 'Managed Circuits', detail: 'Generated artifacts live in managed/ and are ready for Midnight toolchain output.' },
  { title: 'Preview Network', detail: 'The codebase is structured for deployment to Midnight preview or preprod.' }
];

export const stateComparison: ComparisonItem[] = [
  {
    label: 'Credential hash',
    publicState: 'Stored on-chain as a deterministic reference for integrity checks.',
    privateWitness: 'Not revealed; only the derived witness path is used during verification.'
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
    privateWitness: 'Remains private, with disclose() revealing only the minimal witness context.'
  }
];

export const techStack: TechItem[] = [
  { name: 'Next.js 15', detail: 'App Router, metadata, and server components for the public experience.' },
  { name: 'React 19', detail: 'Modern component model with motion-friendly client boundaries.' },
  { name: 'TypeScript', detail: 'Strict typing across frontend, backend, scripts, and tests.' },
  { name: 'TailwindCSS', detail: 'Utility-first styling tuned to the CipherNet visual system.' },
  { name: 'shadcn/ui', detail: 'Accessible primitives implemented in the project to keep the stack lightweight.' },
  { name: 'Framer Motion', detail: 'Premium transitions, parallax, magnetic hover, and scroll reveal.' },
  { name: 'Express', detail: 'Compact backend surface for health checks and verification previews.' },
  { name: 'Vitest', detail: 'Fast unit tests for the contract model, hashing flow, and repo requirements.' }
];

export const developerWorkflow: DevWorkflowStep[] = [
  { title: 'Clone and install', detail: 'Install npm dependencies and copy the environment template.' },
  { title: 'Run locally', detail: 'Start the Next.js app and Express proof server in parallel.' },
  { title: 'Prepare managed artifacts', detail: 'Run the managed compilation script when Midnight tooling is available.' },
  { title: 'Verify contract', detail: 'Use the verification script and Vitest suite to guard the privacy model.' },
  { title: 'Deploy preview', detail: 'Connect the contract to Midnight preview or preprod, then ship the frontend.' }
];

export const roadmap: RoadmapItem[] = [
  {
    phase: '01',
    title: 'Public Beta Foundation',
    detail: 'Ship the New Moon submission with the core verification flow, stable design system, and deployment path.'
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
