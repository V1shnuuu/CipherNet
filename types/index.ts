export type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

export interface WalletState {
  status: WalletStatus;
  address: string | null;
  network: string;
  balance: string | null;
}

export type CredentialStatus = 'active' | 'revoked' | 'pending';

export interface Credential {
  id: string;
  name: string;
  issuer: string;
  description: string;
  credentialHash: string;
  status: CredentialStatus;
  registeredAt: string;
  txHash: string;
}

export interface VerificationResult {
  verified: boolean;
  credentialHash: string;
  issuer: string;
  timestamp: string;
  circuitExecutionTime: number;
  proofSize: number;
}

export type ActivityEventType =
  | 'wallet_connected'
  | 'wallet_disconnected'
  | 'credential_registered'
  | 'credential_verified'
  | 'verification_failed'
  | 'circuit_executed';

export interface ActivityEvent {
  id: string;
  type: ActivityEventType;
  title: string;
  description: string;
  timestamp: string;
  txHash?: string;
  metadata?: Record<string, string>;
}

export interface NetworkInfo {
  name: string;
  chainId: string;
  contractAddress: string;
  explorerUrl: string;
  status: 'active' | 'degraded' | 'offline';
}

export interface ContractInfo {
  address: string;
  network: string;
  credentialCount: number;
  verificationCount: number;
}

export const MOCK_CONTRACT_ADDRESS = '0x8a9b3c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b';
export const MOCK_NETWORK = 'Midnight Preprod';
export const MOCK_CHAIN_ID = 'midnight-preprod-1';

/**
 * Lace DApp Connector interfaces based on Midnight's injected provider.
 */
export interface MidnightLaceProvider {
  enable: () => Promise<MidnightLaceAPI>;
  isEnabled: () => Promise<boolean>;
  apiVersion: string;
  name: string;
}

export interface MidnightLaceAPI {
  state: () => Promise<{ address: string }>; // Abstracted for demo purposes
  submitTransaction: (tx: unknown) => Promise<string>;
}
