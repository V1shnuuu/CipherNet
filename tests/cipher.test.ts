import { describe, expect, it } from 'vitest';
import {
  createPublicLedgerRecord,
  deriveClientKeyFingerprint,
  hashPublicRecord,
  normalizeHex32,
  verifyPublicLedgerRecord,
  type PublicCredentialRegistrationInput
} from '../lib/cipher';
import {
  decryptCredentialBytes,
  encryptCredentialBytes,
  exportAesGcmKeyHex,
  generateAesGcmKey,
  importAesGcmKeyHex,
  sha256Hex,
  utf8ToBytes
} from '../packages/crypto/src';

const samplePublicInput: PublicCredentialRegistrationInput = {
  credentialHash: 'a'.repeat(64),
  issuer: 'b'.repeat(64),
  timestamp: '2026-07-19T00:00:00.000Z'
};

describe('CipherNet public credential model', () => {
  it('creates public ledger records without private credential material', () => {
    const record = createPublicLedgerRecord(samplePublicInput);

    expect(record).toEqual({ ...samplePublicInput, status: 'active' });
    expect(Object.keys(record)).toEqual(['credentialHash', 'issuer', 'timestamp', 'status']);
    expect(JSON.stringify(record)).not.toMatch(/ownerSecret|witnessNonce|subject|documentHash|privateWitness/i);
  });

  it('normalizes 32-byte hex values and rejects non-hashes', () => {
    expect(normalizeHex32(`0x${'A'.repeat(64)}`)).toBe('a'.repeat(64));
    expect(() => normalizeHex32('abc', 'credentialHash')).toThrow('credentialHash must be a 32-byte hex string.');
  });

  it('hashes public records deterministically', async () => {
    await expect(hashPublicRecord(samplePublicInput)).resolves.toMatch(/^[a-f0-9]{64}$/);
    await expect(hashPublicRecord(samplePublicInput)).resolves.toBe(await hashPublicRecord(samplePublicInput));
  });

  it('returns only a boolean verification result', () => {
    const record = createPublicLedgerRecord(samplePublicInput);
    const result = verifyPublicLedgerRecord(record, samplePublicInput);

    expect(result).toEqual({ verified: true });
    expect(Object.keys(result)).toEqual(['verified']);
  });

  it('does not verify revoked records', () => {
    const record = { ...createPublicLedgerRecord(samplePublicInput), status: 'revoked' as const };

    expect(verifyPublicLedgerRecord(record, samplePublicInput)).toEqual({ verified: false });
  });

  it('encrypts credential bytes before storage and decrypts them with the same AES key', async () => {
    const plaintext = utf8ToBytes('passport-number: P-1234567');
    const key = await generateAesGcmKey();
    const encrypted = await encryptCredentialBytes(plaintext, key);
    const decrypted = await decryptCredentialBytes(encrypted, key);

    expect(encrypted.algorithm).toBe('AES-GCM');
    expect(encrypted.ivHex).toMatch(/^[a-f0-9]{24}$/);
    expect(encrypted.plaintextSha256).toBe(await sha256Hex(plaintext));
    expect(encrypted.ciphertextSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(encrypted.ciphertext).not.toEqual(plaintext);
    expect(decrypted).toEqual(plaintext);
  });

  it('exports AES keys only for client-side custody and fingerprints them safely', async () => {
    const key = await generateAesGcmKey();
    const rawKeyHex = await exportAesGcmKeyHex(key);
    const imported = await importAesGcmKeyHex(rawKeyHex);

    expect(rawKeyHex).toMatch(/^[a-f0-9]{64}$/);
    await expect(deriveClientKeyFingerprint(rawKeyHex)).resolves.toMatch(/^[a-f0-9]{64}$/);
    await expect(exportAesGcmKeyHex(imported)).resolves.toBe(rawKeyHex);
  });
});
