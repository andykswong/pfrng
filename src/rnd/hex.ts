import { toHex } from '../encoding';
import { RandomByte } from '../rng';

/**
 * Generate random hex string with given byte length.
 */
export function randomHex(byteLength: number): (randomByte: RandomByte) => string {
  if (!Number.isInteger(byteLength) || byteLength < 0) {
    throw new RangeError('byteLength must be non-negative integer');
  }

  return (randomByte) => {
    const bytes = new Uint8Array(byteLength);
    for (let i = 0; i < byteLength; ++i) {
      bytes[i] = randomByte();
    }
    return toHex(bytes);
  }
}

/**
 * Generate random hex string that looks like a SHA2/3-512 hash.
 */
export const randomSHA512 = randomHex(512);
