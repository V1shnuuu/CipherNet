import type { EncryptedCredential } from '../../packages/crypto/src';

export interface IpfsStorageConfig {
  endpoint: string;
  bearerToken: string;
}

export interface StoredEncryptedCredential {
  cid: string;
  ciphertextSha256: string;
  ivHex: string;
  algorithm: EncryptedCredential['algorithm'];
}

interface ProviderCidResponse {
  cid?: unknown;
  Hash?: unknown;
  IpfsHash?: unknown;
}

function extractCid(value: ProviderCidResponse): string {
  const cid = value.cid ?? value.Hash ?? value.IpfsHash;

  if (typeof cid !== 'string' || cid.trim().length === 0) {
    throw new Error('IPFS provider response did not include a CID.');
  }

  return cid.trim();
}

export async function storeEncryptedCredential(
  encrypted: EncryptedCredential,
  config: IpfsStorageConfig
): Promise<StoredEncryptedCredential> {
  if (config.endpoint.trim().length === 0 || config.bearerToken.trim().length === 0) {
    throw new Error('IPFS endpoint and bearer token are required.');
  }

  const ciphertext = new ArrayBuffer(encrypted.ciphertext.byteLength);
  new Uint8Array(ciphertext).set(encrypted.ciphertext);

  const form = new FormData();
  form.append(
    'file',
    new Blob([ciphertext], { type: 'application/octet-stream' }),
    `${encrypted.ciphertextSha256}.bin`
  );

  const response = await fetch(config.endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.bearerToken}`
    },
    body: form
  });

  if (!response.ok) {
    throw new Error(`IPFS upload failed with HTTP ${response.status}.`);
  }

  const providerResponse = (await response.json()) as ProviderCidResponse;

  return {
    cid: extractCid(providerResponse),
    ciphertextSha256: encrypted.ciphertextSha256,
    ivHex: encrypted.ivHex,
    algorithm: encrypted.algorithm
  };
}
