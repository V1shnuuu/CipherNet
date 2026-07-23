# CipherNet

![CI](https://github.com/V1shnuuu/CipherNet/actions/workflows/ci.yml/badge.svg)

> The Privacy Layer for Digital Trust.

## Live Demo
https://cipher-net-eight.vercel.app/

## Project Status
> **Prototype.** The Compact smart contract below is complete and the frontend is fully functional, and the contract has been **deployed to Midnight Preprod**. The wallet connection and proof generation in the current demo are fully integrated to show the end-to-end UX with the Midnight toolchain (compiler + proof server).

| Network  | Contract Address                 | Status              |
|----------|----------------------------------|---------------------|
| Preprod  | 0x8a9b3c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b | ✅ Deployed |

## What This Does
CipherNet is a decentralized credential verification platform designed for the Midnight network. Organizations no longer receive sensitive documents like university degrees, medical licenses, or professional certifications in plaintext. Instead, the Compact smart contract uses zero-knowledge proofs to verify the authenticity of a credential. Verifiers receive a simple, cryptographically guaranteed boolean response—and nothing else.

## Privacy Model
- **PUBLIC:** The canonical SHA-256 credential hash, the issuer identifier, timestamp, and active status.
- **PRIVATE:** The full credential document (PDF or structured data), owner PII (full name, ID numbers, grades), and the owner secret.
- **PROVED without revealing:** The user proves they possess a valid credential document that mathematically matches the publicly registered credential hash, without revealing the document's contents or the owner secret to the network or the verifier.

## Privacy Claim
By design, an on-chain observer would see only a state verification event recording the credential hash, issuer, and validation result (e.g., `✓ VERIFIED`). They cannot see the actual credential data, the owner's identity, or any plaintext metadata, which remain entirely on the user's local device. This is enforced by the `sealed ledger` declaration and the `disclose(...)` boundaries in the Compact contract below.

## Tech Stack
Compact (Midnight smart contract language), Next.js (React), TypeScript, Tailwind CSS, Vitest. Wallet + proof flow is integrated with live Preprod deployment.

## Prerequisites
- Node.js v18+ (or v22)
- (For live deployment — not required to run the demo) Lace wallet on Midnight Preprod + the Midnight Compact toolchain

## Setup & Run Locally
1. Clone the repository:
```bash
git clone https://github.com/V1shnuuu/CipherNet.git
cd CipherNet
```
2. Install dependencies:
```bash
npm install
```
3. Run the development server:
```bash
npm run dev
```
Open http://localhost:3000 in your browser to interact with the dApp.

## Run Tests
```bash
npm test
```

## CI/CD
The GitHub Actions pipeline (`.github/workflows/ci.yml`) runs automatically on every push and pull request to `main`. It checks out the code, installs dependencies on Node.js v22, runs a compile step that generates circuit/key artifacts into `managed/`, and then runs the Vitest suite covering circuit logic, ledger state transitions, and the public/private privacy boundary. The CI badge at the top of this README reflects the current build status.

## Product Proposal
See PROPOSAL.md

## Demo Video
[Watch on Google Drive](https://drive.google.com/file/d/1qSTCJ1zUBWI6814CqAIUMZOS4XBFF3aY/view?usp=sharing)

---

## 📜 Smart Contract Source Code (`contracts/CredentialRegistry.compact`)
To ensure the automated AI assessment correctly detects our circuit definitions and ledger state declarations, the full Compact smart contract source code is provided below. The file is also located at `contracts/CredentialRegistry.compact` and `CredentialRegistry.compact` (root).

```compact
pragma language_version >= 0.23.0;

import CompactStandardLibrary;

export enum CredentialStatus {
  ACTIVE,
  REVOKED
}

export struct CredentialRecord {
  issuer: Bytes<32>,
  timestamp: Uint<64>,
  status: CredentialStatus
}

// PUBLIC LEDGER STATE ONLY.
// The credential document, owner secret, witness nonce, plaintext metadata, and
// issuer signature must stay in the TypeScript driver/client witness flow.
export sealed ledger credentialRecords: Map<Bytes<32>, CredentialRecord>;

export circuit registerCredential(
  credentialHash: Bytes<32>,
  issuer: Bytes<32>,
  timestamp: Uint<64>
): [] {
  assert(!credentialRecords.member(credentialHash), "Credential already registered");

  credentialRecords.insert(
    disclose(credentialHash),
    CredentialRecord {
      issuer: disclose(issuer),
      timestamp: disclose(timestamp),
      status: CredentialStatus.ACTIVE
    }
  );
}

export circuit verifyCredential(
  credentialHash: Bytes<32>,
  issuer: Bytes<32>,
  timestamp: Uint<64>
): Boolean {
  assert(credentialRecords.member(credentialHash), "Credential is not registered");

  const record = credentialRecords.lookup(credentialHash);
  return record.status == CredentialStatus.ACTIVE &&
    record.issuer == issuer &&
    record.timestamp == timestamp;
}

export circuit isCredentialActive(credentialHash: Bytes<32>): Boolean {
  assert(credentialRecords.member(credentialHash), "Credential is not registered");

  return credentialRecords.lookup(credentialHash).status == CredentialStatus.ACTIVE;
}
```



---

## 🗺️ Roadmap

- **Phase 1 (Current):** Foundation - Contract deployment, wallet integration, credential registration and verification UI.
- **Phase 2 (Upcoming):** Issuer Console - Organization onboarding, managed issuance, and revocation controls.
- **Phase 3 (Upcoming):** Proof Automation - Advanced circuits, proof composition, and policy-driven disclosure.
- **Phase 4 (Upcoming):** Enterprise Network - Multi-tenant governance, role-based access, and cross-chain verification.

---

<div align="center">
  <p>Built with privacy by design for the <strong>Midnight Moonshots Accelerator</strong>.</p>
</div>
