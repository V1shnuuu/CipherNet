import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const contractPath = path.join(process.cwd(), 'contracts', 'CredentialRegistry.compact');
const manifestPath = path.join(process.cwd(), 'managed', 'CredentialRegistry.manifest.json');
const contractAddress = process.env.MIDNIGHT_CONTRACT_ADDRESS;
const network = process.env.MIDNIGHT_NETWORK ?? 'preview';

if (!existsSync(contractPath)) {
  throw new Error('Missing contracts/CredentialRegistry.compact.');
}

if (!existsSync(manifestPath)) {
  console.warn('Managed manifest not found. Run npm run compile:managed before preview deployment.');
}

let manifestSummary = 'unavailable';
if (existsSync(manifestPath)) {
  const manifest = JSON.parse(await readFile(manifestPath, 'utf8')) as { contractName?: string; sourceHash?: string };
  manifestSummary = `${manifest.contractName ?? 'CredentialRegistry'} (${manifest.sourceHash ?? 'no source hash'})`;
}

console.log('Preview deployment checklist:');
console.log(`- Network: ${network}`);
console.log(`- Managed manifest: ${manifestSummary}`);
console.log(`- Contract address: ${contractAddress ?? 'set MIDNIGHT_CONTRACT_ADDRESS to the deployed preview or preprod address'}`);
console.log('- Build the frontend with npm run build.');
console.log('- Generate managed artifacts with npm run compile:managed.');
console.log('- Configure Midnight preview or preprod environment variables.');
console.log('- Publish the contract package and connect the contract address in .env.local.');
