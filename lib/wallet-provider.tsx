'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import type { WalletState, WalletStatus, Credential, ActivityEvent, ActivityEventType } from '../types';
import { MOCK_CONTRACT_ADDRESS, MOCK_NETWORK } from '../types';
import { simulateWalletConnection, simulateWalletDisconnection } from './midnight-mock';

interface WalletContextValue {
  wallet: WalletState;
  credentials: Credential[];
  activities: ActivityEvent[];
  contractAddress: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  addCredential: (cred: Credential) => void;
  removeCredential: (id: string) => void;
  getCredentialByHash: (hash: string) => Credential | undefined;
  logActivity: (type: ActivityEventType, title: string, description: string, txHash?: string) => void;
  verificationCount: number;
  incrementVerifications: () => void;
}

const WalletContext = createContext<WalletContextValue | null>(null);

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const stored = localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : fallback;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage quota exceeded — ignore
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({
    status: 'disconnected',
    address: null,
    network: MOCK_NETWORK,
    balance: null,
  });

  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [activities, setActivities] = useState<ActivityEvent[]>([]);
  const [verificationCount, setVerificationCount] = useState(0);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const savedWallet = loadFromStorage<WalletState | null>('ciphernet_wallet', null);
    if (savedWallet && savedWallet.status === 'connected') {
      setWallet(savedWallet);
    }
    setCredentials(loadFromStorage<Credential[]>('ciphernet_credentials', []));
    setActivities(loadFromStorage<ActivityEvent[]>('ciphernet_activities', []));
    setVerificationCount(loadFromStorage<number>('ciphernet_verifications', 0));
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (wallet.status === 'connected') {
      saveToStorage('ciphernet_wallet', wallet);
    } else {
      localStorage.removeItem('ciphernet_wallet');
    }
  }, [wallet]);

  useEffect(() => { saveToStorage('ciphernet_credentials', credentials); }, [credentials]);
  useEffect(() => { saveToStorage('ciphernet_activities', activities); }, [activities]);
  useEffect(() => { saveToStorage('ciphernet_verifications', verificationCount); }, [verificationCount]);

  const logActivity = useCallback(
    (type: ActivityEventType, title: string, description: string, txHash?: string) => {
      const event: ActivityEvent = {
        id: generateId(),
        type,
        title,
        description,
        timestamp: new Date().toISOString(),
        txHash,
      };
      setActivities((prev) => [event, ...prev].slice(0, 100));
    },
    []
  );

  const connect = useCallback(async () => {
    setWallet((prev) => ({ ...prev, status: 'connecting' as WalletStatus }));
    try {
      const result = await simulateWalletConnection();
      setWallet({
        status: 'connected',
        address: result.address,
        network: result.network,
        balance: `${(10 + Math.random() * 90).toFixed(4)} tMIDN`,
      });
      logActivity('wallet_connected', 'Wallet Connected', `Connected to ${result.network}`);
    } catch {
      setWallet((prev) => ({ ...prev, status: 'error' as WalletStatus }));
    }
  }, [logActivity]);

  const disconnect = useCallback(async () => {
    await simulateWalletDisconnection();
    setWallet({
      status: 'disconnected',
      address: null,
      network: MOCK_NETWORK,
      balance: null,
    });
    logActivity('wallet_disconnected', 'Wallet Disconnected', 'Lace wallet disconnected');
  }, [logActivity]);

  const addCredential = useCallback((cred: Credential) => {
    setCredentials((prev) => [cred, ...prev]);
  }, []);

  const removeCredential = useCallback((id: string) => {
    setCredentials((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const getCredentialByHash = useCallback(
    (hash: string) => credentials.find((c) => c.credentialHash === hash),
    [credentials]
  );

  const incrementVerifications = useCallback(() => {
    setVerificationCount((prev) => prev + 1);
  }, []);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        credentials,
        activities,
        contractAddress: MOCK_CONTRACT_ADDRESS,
        connect,
        disconnect,
        addCredential,
        removeCredential,
        getCredentialByHash,
        logActivity,
        verificationCount,
        incrementVerifications,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within <WalletProvider>');
  return ctx;
}
