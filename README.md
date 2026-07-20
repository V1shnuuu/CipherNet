<div align="center">
  <img src="https://raw.githubusercontent.com/V1shnuuu/CipherNet/main/public/logo.svg" alt="CipherNet Logo" width="120" />
  
  # CipherNet

  **The Privacy Layer for Digital Trust.**<br>
  *Built for Midnight Moonshots Accelerator – Level 2 (Waxing Crescent)*

  [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
  [![Midnight Network](https://img.shields.io/badge/Midnight-Preprod-00F5A0)](https://midnight.network)
  [![Compact Version](https://img.shields.io/badge/Compact-v0.23-00D9FF)](https://docs.midnight.network)
  [![Live Demo](https://img.shields.io/badge/Live-Demo-purple)](https://cipher-net-eight.vercel.app/)

  <br>

  [Live Demo](https://cipher-net-eight.vercel.app/) · [Video Walkthrough](#) · [Architecture](#architecture) · [Getting Started](#getting-started)
</div>

<br>

## 📖 The Story

The current digital credential landscape is broken. When a user needs to prove their qualifications—whether it's a university degree, a medical license, or a professional certification—they are forced to send plaintext PDFs or high-resolution images to third parties.

This creates massive data honeypots, exposing sensitive personal information (PII) to potential breaches, identity theft, and unauthorized profiling.

**CipherNet solves this.** We built a decentralized credential verification platform on the Midnight network. Organizations no longer receive your sensitive documents. Instead, our Compact smart contract utilizes zero-knowledge proofs to verify the authenticity of a credential. Verifiers receive a simple, cryptographically guaranteed `✓ VERIFIED` response—and nothing else.

---

## ✨ Features

- **Confidential Credentials:** Keep owner secrets, plaintext metadata, and signatures off-chain.
- **Observable Privacy:** The verification circuit `verifyCredential()` executes using zero-knowledge proofs, returning only a boolean result.
- **Public State Boundary:** The contract stores only the canonical SHA-256 credential hash, the issuer, timestamp, and active status.
- **Premium User Experience:** Built with Next.js 15, React 19, and Framer Motion, offering a stunning, production-ready interface matching top-tier startup aesthetics.
- **Lace Wallet Integration:** Seamlessly connects to the Lace wallet for transaction signing on the Midnight Preprod network.

---

## 🏗️ Architecture & Privacy Model

CipherNet intentionally separates data into two categories to preserve the privacy boundary:

### 1. Public State (Midnight Ledger)
The `CredentialRegistry.compact` contract manages the public state. It never stores private data.
- **Credential Hash:** A deterministic SHA-256 reference for integrity checks.
- **Issuer Identifier:** The organization that authorized the credential.
- **Timestamp & Status:** For lifecycle tracking and revocation.

### 2. Private Witness (Client-Side)
The actual credential data never leaves the user's device in plaintext.
- **Full Credential Document:** The PDF or structured data.
- **Owner PII:** Full name, ID numbers, grades, etc.
- **Signatures & Nonces:** Used during proof generation.

When a verifier requests proof, the client generates a zero-knowledge proof locally and submits it to the Midnight network. The network verifies the proof against the public state and returns a boolean result.

---

## 🛠️ Tech Stack

- **Smart Contracts:** Midnight Compact (`v0.23`)
- **Frontend Framework:** Next.js 15 (App Router)
- **UI & Styling:** TailwindCSS, Shadcn UI, Framer Motion
- **Wallet Integration:** Midnight.js SDK & Lace Wallet (Simulated for Vercel deployment)
- **Language:** TypeScript

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.x` or later
- npm or pnpm
- (Optional) Midnight Toolchain for local contract compilation

### 1. Clone & Install
```bash
git clone https://github.com/V1shnuuu/CipherNet.git
cd CipherNet
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the dApp.

### 3. Contract Interactions (Mocked for Vercel)
For this hackathon submission, the live Vercel deployment utilizes a highly realistic mock layer (`lib/midnight-mock.ts`) to simulate Lace wallet connections and zero-knowledge circuit executions. This is because the official `@midnight-ntwrk/midnight.js` SDK is not currently available as a public npm package for Vercel deployment. 

The mock layer perfectly replicates the expected behavior, delays, and API shape of the actual SDK.

---

## 📁 Repository Structure

```
CipherNet/
├── app/                  # Next.js 15 App Router (Dashboard, Verify, Register, etc.)
├── components/           # React components (UI primitives, animations, layout)
├── contracts/            # Midnight Compact smart contracts
├── hooks/                # Custom React hooks
├── lib/                  # Utilities, mock SDK, and Context providers
├── managed/              # Compiled circuits and verification keys (manifests)
├── scripts/              # Tooling for deployment and compilation
├── types/                # TypeScript interfaces
└── README.md             # Project documentation
```

---

## 📜 Smart Contract Reference

Located in `contracts/CredentialRegistry.compact`:

```compact
export circuit registerCredential(credentialHash: Bytes<32>, issuer: Bytes<32>, timestamp: Uint<64>): []
```
Registers a new credential. The circuit uses `disclose()` to move the hash, issuer, and timestamp into the public ledger state.

```compact
export circuit verifyCredential(credentialHash: Bytes<32>, issuer: Bytes<32>, timestamp: Uint<64>): Boolean
```
Verifies a credential exists and is active. Generates a zero-knowledge proof without disclosing the underlying data.

---

## 🗺️ Roadmap

- **Phase 1 (Current):** Foundation - Contract deployment, wallet integration, mock SDK, credential registration and verification UI.
- **Phase 2 (Upcoming):** Issuer Console - Organization onboarding, managed issuance, and revocation controls.
- **Phase 3 (Upcoming):** Proof Automation - Advanced circuits, proof composition, and policy-driven disclosure.
- **Phase 4 (Upcoming):** Enterprise Network - Multi-tenant governance, role-based access, and cross-chain verification.

---

<div align="center">
  <p>Built with privacy by design for the <strong>Midnight Moonshots Accelerator</strong>.</p>
</div>
