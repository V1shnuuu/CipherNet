export type CredentialCategory = 'identity' | 'education' | 'medical' | 'financial';

export interface CredentialPayload {
  credentialType: string;
  issuer: string;
  subject: string;
  issuedAt: string;
  documentHash: string;
}

export interface PrivateWitness {
  ownerSecret: string;
  witnessNonce: string;
}

export interface CredentialRegistrationInput extends CredentialPayload, PrivateWitness {}

export interface PublicLedgerRecord {
  credentialHash: string;
  issuer: string;
  timestamp: string;
}

export interface PrivateLedgerRecord {
  credential: CredentialPayload;
  ownerSecret: string;
  privateWitness: string;
}

export interface VerificationReceipt {
  verified: boolean;
  publicRecord: PublicLedgerRecord;
  privateWitness: string;
}

async function sha256(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function canonicalizeCredential(credential: CredentialPayload): string {
  return JSON.stringify(
    {
      credentialType: credential.credentialType.trim().toLowerCase(),
      documentHash: credential.documentHash.trim().toLowerCase(),
      issuer: credential.issuer.trim().toLowerCase(),
      issuedAt: credential.issuedAt.trim(),
      subject: credential.subject.trim().toLowerCase()
    },
    ['credentialType', 'documentHash', 'issuer', 'issuedAt', 'subject']
  );
}

export async function hashCredential(credential: CredentialPayload): Promise<string> {
  return sha256(canonicalizeCredential(credential));
}

export async function derivePrivateWitness(ownerSecret: string, witnessNonce: string, credentialHash: string): Promise<string> {
  return sha256(`${ownerSecret.trim()}::${witnessNonce.trim()}::${credentialHash.trim().toLowerCase()}`);
}

export async function createPublicLedgerRecord(input: CredentialRegistrationInput): Promise<PublicLedgerRecord> {
  return {
    credentialHash: await hashCredential(input),
    issuer: input.issuer.trim(),
    timestamp: input.issuedAt.trim()
  };
}

export async function createPrivateLedgerRecord(input: CredentialRegistrationInput): Promise<PrivateLedgerRecord> {
  const credentialHash = await hashCredential(input);

  return {
    credential: {
      credentialType: input.credentialType.trim(),
      issuer: input.issuer.trim(),
      subject: input.subject.trim(),
      issuedAt: input.issuedAt.trim(),
      documentHash: input.documentHash.trim()
    },
    ownerSecret: input.ownerSecret.trim(),
    privateWitness: await derivePrivateWitness(input.ownerSecret, input.witnessNonce, credentialHash)
  };
}

export async function verifyCredentialHash(input: CredentialPayload, expectedHash: string): Promise<boolean> {
  return (await hashCredential(input)) === expectedHash.trim().toLowerCase();
}

export async function createVerificationReceipt(input: CredentialRegistrationInput, expectedHash?: string): Promise<VerificationReceipt> {
  const publicRecord = await createPublicLedgerRecord(input);
  const privateWitness = await derivePrivateWitness(input.ownerSecret, input.witnessNonce, publicRecord.credentialHash);

  return {
    verified: expectedHash ? publicRecord.credentialHash === expectedHash.trim().toLowerCase() : true,
    publicRecord,
    privateWitness
  };
}
