import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const contractPath = path.join(process.cwd(), 'contracts', 'CredentialRegistry.compact');
const contractSource = await readFile(contractPath, 'utf8');

const requiredPatterns = [
  /import CompactStandardLibrary;/,
  /export sealed ledger credentialRecords: Map<Bytes<32>, CredentialRecord>;/,
  /export circuit registerCredential\(/,
  /export circuit verifyCredential\(/,
  /: Boolean/,
  /CredentialStatus\.ACTIVE/
];

const forbiddenPatterns = [
  /ownerSecret/i,
  /witnessNonce/i,
  /privateWitness/i,
  /credentialOwners/i,
  /privateWitnesses/i,
  /disclose\s*\(\s*credential\s*\)/i
];

const missingPatterns = requiredPatterns.filter((pattern) => !pattern.test(contractSource));
const leakedPatterns = forbiddenPatterns.filter((pattern) => pattern.test(contractSource));

if (missingPatterns.length > 0 || leakedPatterns.length > 0) {
  process.exitCode = 1;
  console.error('Contract privacy verification failed.');

  if (missingPatterns.length > 0) {
    console.error(`Missing required patterns: ${missingPatterns.map((pattern) => pattern.toString()).join(', ')}`);
  }

  if (leakedPatterns.length > 0) {
    console.error(`Forbidden private-data patterns found: ${leakedPatterns.map((pattern) => pattern.toString()).join(', ')}`);
  }

  throw new Error('CredentialRegistry.compact failed privacy-boundary verification.');
}

console.log('CredentialRegistry.compact passed public/private boundary verification.');
