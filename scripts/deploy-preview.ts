import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const contractPath = path.join(process.cwd(), 'contracts', 'CredentialRegistry.compact');
const manifestPath = path.join(process.cwd(), 'managed', 'CredentialRegistry.manifest.json');

if (!existsSync(contractPath)) {
  throw new Error('Missing contracts/CredentialRegistry.compact.');
}

if (!existsSync(manifestPath)) {
  console.warn('Managed manifest not found. Run npm run compile:managed before preview deployment.');
}

console.log('Preview deployment checklist:');
console.log('- Build the frontend with npm run build.');
console.log('- Generate managed artifacts with npm run compile:managed.');
console.log('- Configure Midnight preview or preprod environment variables.');
console.log('- Publish the contract package and connect the contract address in .env.local.');
