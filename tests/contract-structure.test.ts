import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const forbiddenPrivateLedgerPatterns = [
  /ownerSecret/i,
  /witnessNonce/i,
  /privateWitness/i,
  /credentialOwners/i,
  /privateWitnesses/i,
  /disclose\s*\(\s*credential\s*\)/i
];

describe('CredentialRegistry Compact privacy boundary', () => {
  it('stores only public credential facts in ledger state', async () => {
    const source = await readFile(path.join(process.cwd(), 'contracts', 'CredentialRegistry.compact'), 'utf8');

    expect(source).toContain('import CompactStandardLibrary;');
    expect(source).toContain('export sealed ledger credentialRecords');
    expect(source).toContain('credentialHash');
    expect(source).toContain('issuer');
    expect(source).toContain('timestamp');
    expect(source).toContain('status');
  });

  it('does not store or disclose private witness material', async () => {
    const source = await readFile(path.join(process.cwd(), 'contracts', 'CredentialRegistry.compact'), 'utf8');

    for (const pattern of forbiddenPrivateLedgerPatterns) {
      expect(source).not.toMatch(pattern);
    }
  });

  it('returns a boolean verification result instead of private proof material', async () => {
    const source = await readFile(path.join(process.cwd(), 'contracts', 'CredentialRegistry.compact'), 'utf8');

    expect(source).toMatch(/export circuit verifyCredential[\s\S]*\): Boolean/);
    expect(source).not.toMatch(/return .*private/i);
  });

  it('keeps managed artifacts honest about toolchain output status', async () => {
    const manifest = JSON.parse(
      await readFile(path.join(process.cwd(), 'managed', 'CredentialRegistry.manifest.json'), 'utf8')
    ) as { note?: string };

    expect(manifest.artifactStatus).toBe('compiled');
  });
});
