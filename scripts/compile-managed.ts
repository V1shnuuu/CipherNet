import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const contractPath = path.join(root, 'contracts', 'CredentialRegistry.compact');
const managedDir = path.join(root, 'managed');
const circuitsDir = path.join(managedDir, 'circuits');
const keysDir = path.join(managedDir, 'keys');
const contractSource = await readFile(contractPath, 'utf8');
const sourceHash = createHash('sha256').update(contractSource).digest('hex');

await mkdir(circuitsDir, { recursive: true });
await mkdir(keysDir, { recursive: true });

const manifest = {
  contractName: 'CredentialRegistry',
  source: 'contracts/CredentialRegistry.compact',
  sourceHash,
  generatedAt: new Date().toISOString(),
  managedBy: 'CipherNet compile-managed script',
  note: 'Replace this manifest with Midnight toolchain output during preview/preprod compilation.'
};

await writeFile(path.join(managedDir, 'CredentialRegistry.manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
await writeFile(path.join(managedDir, 'CredentialRegistry.sourcehash'), `${sourceHash}\n`, 'utf8');
await writeFile(
  path.join(circuitsDir, 'README.md'),
  ['# Circuits', '', 'This directory is reserved for Midnight-generated circuit outputs for CredentialRegistry.', 'Replace this placeholder with the official compiled circuit artifacts before submission.'].join('\n') + '\n',
  'utf8'
);
await writeFile(
  path.join(keysDir, 'README.md'),
  ['# Keys', '', 'This directory is reserved for Midnight-generated proving and verification keys.', 'Replace this placeholder with the official toolchain outputs before preview or preprod deployment.'].join('\n') + '\n',
  'utf8'
);

console.log('Managed artifacts prepared in managed/.');
