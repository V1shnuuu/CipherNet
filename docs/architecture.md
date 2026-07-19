# CipherNet Architecture

CipherNet is intentionally split into four small trust boundaries:

1. The Next.js frontend handles product storytelling, onboarding, and verification UX.
2. The Express server provides local proof workflow utilities and health checks.
3. The Midnight Compact contract stores public facts and guarded witness state.
4. The managed folder captures generated artifacts required for preview or preprod deployment.

The design keeps the public ledger small and auditable while the sensitive witness material stays off the public surface.
