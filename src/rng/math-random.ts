import type { NumberIterator } from '../types';

const BYTE_SIZE = 256;

/**
 * A PRNG that relies on `Math.random` method to generate random bytes.
 */
export function* mathRandomBytes(length = Infinity): NumberIterator {
  for (let i = 0; i < length; ++i) {
    yield (Math.random() * BYTE_SIZE) | 0;
  }
} 
