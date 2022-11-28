import type { NumberIterator } from '../types';

const BUFFER_SIZE = 256;

/**
 * Whether Web Crypto is available.
 */
export const hasWebCrypto = 'crypto' in globalThis;

/**
 * A CSPRNG that relies on `crypto.getRandomValues` to generate random bytes.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
 */
export function* webCryptoRandomBytes(length = Infinity, crypto: Crypto = globalThis.crypto): NumberIterator {
  let buffer = new Uint8Array(0);
  let bytesAvailable = 0;

  for (let i = 0; i < length; ++i) {
    if (bytesAvailable <= 0) {
      buffer = crypto.getRandomValues(new Uint8Array(Math.min(length - i, BUFFER_SIZE)));
      bytesAvailable = buffer.length;
    }

    yield buffer[buffer.length - (bytesAvailable--)];
  }
}
