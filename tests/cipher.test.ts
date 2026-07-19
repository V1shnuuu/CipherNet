import { describe, expect, it } from 'vitest';
import {
  canonicalizeCredential,
  createPrivateLedgerRecord,
  createPublicLedgerRecord,
  createVerificationReceipt,
  derivePrivateWitness,
  hashCredential,
  verifyCredentialHash,
  type CredentialRegistrationInput
} from '@/lib/cipher';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const sampleInput: CredentialRegistrationInput = {
  credentialType: 'Passport',
  issuer: 'Republic Identity Authority',
  subject: 'Ada Lovelace',
  issuedAt: '2026-07-19T00:00:00.000Z',
  documentHash: '0xabc123feedbeef',
  ownerSecret: 'owner-secret-alpha',
  witnessNonce: 'nonce-42'
};

describe('CipherNet credential flow', () => {
  it('registers a credential into public and private records', async () => {
    const publicRecord = await createPublicLedgerRecord(sampleInput);
    const privateRecord = await createPrivateLedgerRecord(sampleInput);

    expect(publicRecord.issuer).toBe('Republic Identity Authority');
    expect(publicRecord.timestamp).toBe(sampleInput.issuedAt);
    expect(publicRecord.credentialHash).toMatch(/^[a-f0-9]{64}$/);
    expect(privateRecord.ownerSecret).toBe(sampleInput.ownerSecret);
    expect(privateRecord.privateWitness).toMatch(/^[a-f0-9]{64}$/);
  });

  it('produces deterministic credential hashes', async () => {
    const canonical = canonicalizeCredential(sampleInput);
    const hash = await hashCredential(sampleInput);

    expect(canonical).toContain('passport');
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
    expect(await verifyCredentialHash(sampleInput, hash)).toBe(true);
    expect(await verifyCredentialHash(sampleInput, '0'.repeat(64))).toBe(false);
  });

  it('derives the private witness from owner secret and nonce', async () => {
    const hash = await hashCredential(sampleInput);
    const witness = await derivePrivateWitness(sampleInput.ownerSecret, sampleInput.witnessNonce, hash);

    expect(witness).toMatch(/^[a-f0-9]{64}$/);
    expect(witness).toBe(await derivePrivateWitness(sampleInput.ownerSecret, sampleInput.witnessNonce, hash));
  });

  it('creates a verification receipt with minimum disclosure semantics', async () => {
    const receipt = await createVerificationReceipt(sampleInput);

    expect(receipt.verified).toBe(true);
    expect(receipt.publicRecord.credentialHash).toMatch(/^[a-f0-9]{64}$/);
    expect(receipt.privateWitness).toMatch(/^[a-f0-9]{64}$/);
  });

  it('keeps the Compact contract present and structurally complete', async () => {
    const contractPath = path.join(process.cwd(), 'contracts', 'CredentialRegistry.compact');
    const contractSource = await readFile(contractPath, 'utf8');

    expect(contractSource).toContain('export circuit registerCredential(');
    expect(contractSource).toContain('export circuit verifyCredential(');
    expect(contractSource).toContain('disclose(');
    expect(contractSource).toContain('sealed ledger credentialRecords: Map<Field, CredentialRecord>;');
  });

  it('tracks the managed artifact manifest for deployment readiness', async () => {
    const manifestPath = path.join(process.cwd(), 'managed', 'CredentialRegistry.manifest.json');
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as { contractName: string; sourceHash: string };

    expect(manifest.contractName).toBe('CredentialRegistry');
    expect(manifest.sourceHash).toMatch(/^[a-f0-9]{64}$/i);
  });
});
