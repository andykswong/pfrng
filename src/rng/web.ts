import { hasWebCrypto, webCryptoRandomBytes } from './web-crypto';
import { mathRandomBytes } from './math-random';
import type { NumberIterator } from '../types';

/**
 * A random byte iterator implementation for the Web that uses `crypto.getRandomValues` if available,
 * and falls back to `Math.random` otherwise.
 */
export const webRandomBytes: (length?: number) => NumberIterator = hasWebCrypto ? webCryptoRandomBytes : mathRandomBytes;
