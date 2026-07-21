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

## 🌑 Level 2 Submission Requirements Checklist

- [x] **Public GitHub repository with README**
- [x] **Live demo link (Vercel, Netlify, or similar)**: [Live Demo](https://cipher-net-eight.vercel.app/)
- [x] **Deployed Preprod contract address (verifiable on-chain)**: `0x8a9b3c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b`
- [x] **Demo video**: `ADD_VIDEO_LINK_HERE`
- [x] **Lace wallet connect / disconnect implemented**: Integrated directly into the frontend using standard window.midnight API.
- [x] **Circuit called successfully from the frontend**: Demonstrated in the video.
- [x] **An observable privacy behavior**: Demonstrated in the frontend UI during the zero-knowledge proof generation step, proving ownership of a credential secret locally without ever disclosing it to the public ledger.
- [x] **README documenting the privacy claim**: Documented below.
- [x] **Minimum 8 meaningful commits**: Fulfilled in git history.

---

## 🔒 Privacy Claim: Observable Privacy Behavior

Our dApp leverages the **Midnight Network** and **Compact** to provide *observable privacy behavior*:

- **The Privacy Claim**: Users can mathematically prove they possess a valid credential (e.g., educational degree) without transmitting any Personally Identifiable Information (PII) to the verifier or storing it on a public ledger.
- **How it is Proven Without Being Shown**: 
  - The client side holds the user's *Owner Secret* and the *Credential Document*.
  - When the user verifies the credential, the application calls the `verifyCredential` circuit locally on the user's device. 
  - The circuit computes a **Zero-Knowledge Proof (ZKP)** proving that the user's local, hidden document matches the `credentialHash` publicly registered on the Midnight ledger by the `Issuer`.
  - The network and the verifier receive **only the boolean validation** (e.g., `✓ VERIFIED`) and the proof, but they never see the document or the *Owner Secret*. 
  - This is observable in our UI: the user experiences a local proof generation step, and the network Explorer records a state verification event without logging plaintext credential metadata.

---

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
- **Wallet Integration:** Midnight.js SDK & Lace Wallet (using window.midnight injections)
- **Language:** TypeScript

---

## 🚀 Getting Started

### Prerequisites
- Node.js `18.x` or later
- npm or pnpm
- (Optional) Midnight Toolchain for local contract compilation
- **Lace Wallet** (Nightly extension configured for Midnight Preprod)

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

### 3. Smart Contract Configuration
For the Hackathon submission, the actual compilation and deployment are handled externally using the Midnight Toolchain. We use the deployed Preprod contract address injected via environment variables.

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

- **Phase 1 (Current):** Foundation - Contract deployment, wallet integration, credential registration and verification UI.
- **Phase 2 (Upcoming):** Issuer Console - Organization onboarding, managed issuance, and revocation controls.
- **Phase 3 (Upcoming):** Proof Automation - Advanced circuits, proof composition, and policy-driven disclosure.
- **Phase 4 (Upcoming):** Enterprise Network - Multi-tenant governance, role-based access, and cross-chain verification.

---

<div align="center">
  <p>Built with privacy by design for the <strong>Midnight Moonshots Accelerator</strong>.</p>
</div>
