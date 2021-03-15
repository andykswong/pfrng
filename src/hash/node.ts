import { createHash } from 'crypto';
import { Hash } from './types';

function hash(message: string | Uint8Array, algorithm: 'sha384' | 'sha512' | 'sha3-384' | 'sha3-512'): Uint8Array {
  const hash = createHash(algorithm);
  hash.update(message);

  return hash.digest();
}

/**
 * Compute the SHA-384 hash of a given message.
 */
export const sha384: Hash = (message: string | Uint8Array) => hash(message, 'sha384');

/**
 * Compute the SHA-512 hash of a given message.
 */
export const sha512: Hash = (message: string | Uint8Array) => hash(message, 'sha512');

/**
 * Compute the SHA3-384 hash of a given message.
 */
export const sha3_384: Hash = (message: string | Uint8Array) => hash(message, 'sha3-384');

/**
 * Compute the SHA3-512 hash of a given message.
 */
export const sha3_512: Hash = (message: string | Uint8Array) => hash(message, 'sha3-512');
