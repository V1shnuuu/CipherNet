export interface EncryptedCredential {
  algorithm: 'AES-GCM';
  ivHex: string;
  ciphertext: Uint8Array;
  plaintextSha256: string;
  ciphertextSha256: string;
}

export function bytesToHex(bytes: Uint8Array): string {
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function hexToBytes(hex: string): Uint8Array {
  const normalized = hex.trim().replace(/^0x/i, '');

  if (normalized.length % 2 !== 0 || /[^a-f0-9]/i.test(normalized)) {
    throw new Error('Expected an even-length hex string.');
  }

  const bytes = new Uint8Array(normalized.length / 2);

  for (let index = 0; index < normalized.length; index += 2) {
    bytes[index / 2] = Number.parseInt(normalized.slice(index, index + 2), 16);
  }

  return bytes;
}

export function utf8ToBytes(value: string): Uint8Array {
  return new TextEncoder().encode(value);
}

function toArrayBuffer(value: Uint8Array | ArrayBuffer): ArrayBuffer {
  if (value instanceof ArrayBuffer) {
    return value;
  }

  const buffer = new ArrayBuffer(value.byteLength);
  new Uint8Array(buffer).set(value);
  return buffer;
}

export async function sha256Hex(input: string | Uint8Array | ArrayBuffer): Promise<string> {
  const bytes = typeof input === 'string' ? utf8ToBytes(input) : input;
  const digest = await globalThis.crypto.subtle.digest('SHA-256', toArrayBuffer(bytes));
  return bytesToHex(new Uint8Array(digest));
}

export async function generateAesGcmKey(): Promise<CryptoKey> {
  return globalThis.crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
}

export async function exportAesGcmKeyHex(key: CryptoKey): Promise<string> {
  const rawKey = await globalThis.crypto.subtle.exportKey('raw', key);
  return bytesToHex(new Uint8Array(rawKey));
}

export async function importAesGcmKeyHex(rawKeyHex: string): Promise<CryptoKey> {
  return globalThis.crypto.subtle.importKey('raw', toArrayBuffer(hexToBytes(rawKeyHex)), 'AES-GCM', true, [
    'encrypt',
    'decrypt'
  ]);
}

export async function encryptCredentialBytes(plaintext: Uint8Array, key: CryptoKey): Promise<EncryptedCredential> {
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await globalThis.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: toArrayBuffer(iv) },
    key,
    toArrayBuffer(plaintext)
  );

  return {
    algorithm: 'AES-GCM',
    ivHex: bytesToHex(iv),
    ciphertext: new Uint8Array(ciphertext),
    plaintextSha256: await sha256Hex(plaintext),
    ciphertextSha256: await sha256Hex(ciphertext)
  };
}

export async function decryptCredentialBytes(encrypted: EncryptedCredential, key: CryptoKey): Promise<Uint8Array> {
  const plaintext = await globalThis.crypto.subtle.decrypt(
    { name: encrypted.algorithm, iv: toArrayBuffer(hexToBytes(encrypted.ivHex)) },
    key,
    toArrayBuffer(encrypted.ciphertext)
  );

  return new Uint8Array(plaintext);
}
