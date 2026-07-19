import { describe, expect, it } from 'vitest';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

describe('Managed contract surface', () => {
  it('contains the required Compact contract functions and disclose usage', async () => {
    const contractPath = path.join(process.cwd(), 'contracts', 'CredentialRegistry.compact');
    const source = await readFile(contractPath, 'utf8');

    expect(source).toContain('registerCredential');
    expect(source).toContain('verifyCredential');
    expect(source).toContain('disclose(');
    expect(source).toContain('credentialOwners');
    expect(source).toContain('privateWitnesses');
  });

  it('includes a deploy-oriented managed directory', async () => {
    const manifestPath = path.join(process.cwd(), 'managed', 'README.md');
    const readme = await readFile(manifestPath, 'utf8');

    expect(readme).toContain('Managed Artifacts');
    expect(readme).toContain('preview or preprod deployment');
  });
});
