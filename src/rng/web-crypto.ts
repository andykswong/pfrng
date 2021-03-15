import type { RandomByte } from './types';

const BUFFER_SIZE = 256;

let buffer = new Uint8Array(0);
let bytesAvailable = 0;

export const hasWebCrypto = 'crypto' in globalThis;

/**
 * A CSPRNG function that relies on the globally-available `crypto.getRandomValues` to generate random byte,
 * which is typically available in modern browsers.
 * See https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 */
export const webCryptoRandomByte: RandomByte = () => {
  if (bytesAvailable <= 0) {
    buffer = crypto.getRandomValues(new Uint8Array(BUFFER_SIZE));
    bytesAvailable = BUFFER_SIZE;
  }
  return buffer[BUFFER_SIZE - (bytesAvailable--)];
};
