/**
 * Mock Midnight SDK layer.
 * Simulates wallet connection, circuit execution, and proof generation
 * with realistic delays and status updates.
 */

function randomHex(bytes: number): string {
  const array = new Uint8Array(bytes);
  if (typeof globalThis.crypto !== 'undefined') {
    globalThis.crypto.getRandomValues(array);
  } else {
    for (let i = 0; i < bytes; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
  }
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

declare global {
  interface Window {
    midnight?: {
      mnLace?: {
        enable: () => Promise<any>;
      };
    };
  }
}

export async function connectLaceWallet(): Promise<{
  address: string;
  network: string;
}> {
  if (typeof window !== 'undefined' && window.midnight?.mnLace) {
    try {
      // Attempt to connect via the actual injected Lace DApp Connector
      const api = await window.midnight.mnLace.enable();
      // If we don't have the SDK to parse the state stream, we'll generate a consistent mock address
      // but the connection is real and the user will see the Lace authorization popup.
      return {
        address: `0x8a9b...${randomHex(4)}`, // Simulated address after real connection
        network: 'Midnight Preprod',
      };
    } catch (e) {
      console.error("Lace connection rejected", e);
      throw e;
    }
  }

  // Fallback to simulation if Lace is not installed
  await delay(1200 + Math.random() * 800);
  return {
    address: `0x${randomHex(20)}`,
    network: 'Midnight Preprod (Simulated)',
  };
}

export async function disconnectLaceWallet(): Promise<void> {
  // Midnight DApp connector doesn't typically have a strict disconnect() method,
  // but we can clear our local state.
  await delay(400);
}

export interface CircuitExecutionResult {
  success: boolean;
  txHash: string;
  blockNumber: number;
  gasUsed: string;
  executionTimeMs: number;
  proofSizeBytes: number;
}

export async function simulateRegisterCredential(
  credentialHash: string,
  _issuer: string,
  _timestamp: string,
  onProgress?: (step: string) => void
): Promise<CircuitExecutionResult> {
  onProgress?.('Preparing transaction...');
  await delay(600);

  onProgress?.('Generating zero-knowledge proof...');
  await delay(1500 + Math.random() * 1000);

  onProgress?.('Submitting to Midnight network...');
  await delay(800 + Math.random() * 600);

  onProgress?.('Awaiting block confirmation...');
  await delay(1200 + Math.random() * 800);

  const executionTimeMs = 3000 + Math.random() * 2000;

  return {
    success: true,
    txHash: `0x${randomHex(32)}`,
    blockNumber: 45000 + Math.floor(Math.random() * 5000),
    gasUsed: `${(0.002 + Math.random() * 0.003).toFixed(6)} tMIDN`,
    executionTimeMs,
    proofSizeBytes: 256 + Math.floor(Math.random() * 128),
  };
}

export async function simulateVerifyCredential(
  _credentialHash: string,
  _issuer: string,
  _timestamp: string,
  onProgress?: (step: string) => void
): Promise<CircuitExecutionResult & { verified: boolean }> {
  onProgress?.('Loading credential from ledger...');
  await delay(500);

  onProgress?.('Executing verifyCredential() circuit...');
  await delay(1800 + Math.random() * 1200);

  onProgress?.('Validating zero-knowledge proof...');
  await delay(1000 + Math.random() * 800);

  onProgress?.('Proof verified!');
  await delay(400);

  const executionTimeMs = 2500 + Math.random() * 1500;

  return {
    success: true,
    verified: true,
    txHash: `0x${randomHex(32)}`,
    blockNumber: 45000 + Math.floor(Math.random() * 5000),
    gasUsed: `${(0.001 + Math.random() * 0.002).toFixed(6)} tMIDN`,
    executionTimeMs,
    proofSizeBytes: 192 + Math.floor(Math.random() * 64),
  };
}

export async function sha256Hash(value: string): Promise<string> {
  const encoder = new TextEncoder();
  const buffer = encoder.encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', buffer);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}
