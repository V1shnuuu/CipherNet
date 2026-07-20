export type CredentialStatus = 'active' | 'revoked';

export interface PublicCredentialRegistrationInput {
  credentialHash: string;
  issuer: string;
  timestamp: string;
}

export interface PublicLedgerRecord extends PublicCredentialRegistrationInput {
  status: CredentialStatus;
}

export interface ClientPrivateCredentialBundle {
  encryptedCredentialCid: string;
  encryptionKeyFingerprint: string;
  witnessNonce: string;
}

export interface VerificationResult {
  verified: boolean;
}

const HEX_32_BYTES = /^[a-f0-9]{64}$/i;

async function sha256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function normalizeHex32(value: string, fieldName = 'value'): string {
  const normalized = value.trim().replace(/^0x/i, '').toLowerCase();

  if (!HEX_32_BYTES.test(normalized)) {
    throw new Error(`${fieldName} must be a 32-byte hex string.`);
  }

  return normalized;
}

export function canonicalizePublicRecord(input: PublicCredentialRegistrationInput): string {
  return JSON.stringify(
    {
      credentialHash: normalizeHex32(input.credentialHash, 'credentialHash'),
      issuer: normalizeHex32(input.issuer, 'issuer'),
      timestamp: input.timestamp.trim()
    },
    ['credentialHash', 'issuer', 'timestamp']
  );
}

export async function hashPublicRecord(input: PublicCredentialRegistrationInput): Promise<string> {
  return sha256(canonicalizePublicRecord(input));
}

export function createPublicLedgerRecord(input: PublicCredentialRegistrationInput): PublicLedgerRecord {
  return {
    credentialHash: normalizeHex32(input.credentialHash, 'credentialHash'),
    issuer: normalizeHex32(input.issuer, 'issuer'),
    timestamp: input.timestamp.trim(),
    status: 'active'
  };
}

export function verifyPublicLedgerRecord(
  record: PublicLedgerRecord,
  expected: PublicCredentialRegistrationInput
): VerificationResult {
  return {
    verified:
      record.status === 'active' &&
      record.credentialHash === normalizeHex32(expected.credentialHash, 'credentialHash') &&
      record.issuer === normalizeHex32(expected.issuer, 'issuer') &&
      record.timestamp === expected.timestamp.trim()
  };
}

export async function deriveClientKeyFingerprint(rawKeyHex: string): Promise<string> {
  return sha256(`ciphernet:key-fingerprint:${normalizeHex32(rawKeyHex, 'rawKeyHex')}`);
}
