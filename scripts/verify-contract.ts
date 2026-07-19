import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const contractPath = path.join(process.cwd(), 'contracts', 'CredentialRegistry.compact');
const contractSource = await readFile(contractPath, 'utf8');

const requiredPatterns = [
  /export circuit registerCredential\(/,
  /export circuit verifyCredential\(/,
  /disclose\(/,
  /sealed ledger credentialRecords:/,
  /sealed ledger credentialOwners:/,
  /sealed ledger privateWitnesses:/
];

const missingPatterns = requiredPatterns.filter((pattern) => !pattern.test(contractSource));

if (missingPatterns.length > 0) {
  console.error('Contract verification failed. Missing required contract structure.');
  process.exitCode = 1;
  throw new Error(`Missing patterns: ${missingPatterns.map((pattern) => pattern.toString()).join(', ')}`);
}

console.log('CredentialRegistry.compact passed structural verification.');
