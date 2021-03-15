import { randomBytes } from 'crypto';

import type { RandomByte } from './types';

const BUFFER_SIZE = 256;

let buffer = new Uint8Array(0);
let bytesAvailable = 0;

/**
 * A CSPRNG function that relies on the node-available `crypto.randomBytes` method to generate random bytes.
 * See https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
 */
export const nodeRandomByte: RandomByte = () => {
  if (bytesAvailable <= 0) {
    buffer = randomBytes(BUFFER_SIZE);
    bytesAvailable = BUFFER_SIZE;
  }
  return buffer[BUFFER_SIZE - (bytesAvailable--)];
};
