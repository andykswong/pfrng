import { hasWebCrypto, webCryptoRandomByte } from './web-crypto';
import { mathRandomByte } from './math-random';
import { RandomByte } from './types';

/**
 * RandomByte implementation for the Web.
 */
export const webRandomByte: RandomByte = hasWebCrypto ? webCryptoRandomByte : mathRandomByte;
