# CipherNet

**CipherNet** is a privacy-first credential verification platform built on the Midnight Network. It enables organizations and individuals to issue, store, and verify credentials (such as university degrees, medical records, or financial statements) without exposing the underlying sensitive data. By utilizing zero-knowledge proofs, CipherNet ensures that a verifier only receives a cryptographic confirmation of authenticity (a "minimum disclosure" proof) while the full document remains strictly confidential.

## Setup Instructions

To run CipherNet locally, ensure you have Node.js (>=22.0.0) installed. 

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/V1shnuuu/CipherNet.git
   cd CipherNet
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile the Midnight smart contracts (generates circuits and keys in the `managed/` directory):
   ```bash
   npm run compile:managed
   ```
4. Run the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the application.

## State Management: Public State vs Private Witness

CipherNet's architecture intentionally separates public on-chain state from private off-chain data to ensure absolute privacy for credential holders.

- **Public State (Ledger)**: The Midnight public ledger only stores non-identifying metadata, such as the credential hash, the issuer's signature or identifier, and timestamp of issuance. This state proves that a credential was issued by a valid entity at a specific time, but reveals nothing about who holds the credential or what it contains.
- **Private Witness (Local Data)**: The actual sensitive contents of the credential (e.g., student name, grades, social security number) exist entirely off-chain as a "Private Witness". When a user needs to prove a fact (e.g., "I have a degree from Midnight University"), the local proof server generates a zero-knowledge proof using the private witness. This proof is then verified against the public state on the ledger, achieving minimum disclosure.
