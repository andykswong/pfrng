import crypto from 'crypto';
import type { NumberIterator } from '../types';

const BUFFER_SIZE = 256;

/**
 * A CSPRNG that relies on the Node `crypto.randomBytes` method to generate random bytes.
 * @see https://nodejs.org/api/crypto.html#cryptorandombytessize-callback
 */
export function* nodeCryptoRandomBytes(length = Infinity): NumberIterator {
  let buffer = new Uint8Array(0);
  let bytesAvailable = 0;

  for (let i = 0; i < length; ++i) {
    if (bytesAvailable <= 0) {
      buffer = crypto.randomBytes(Math.min(length - i, BUFFER_SIZE));
      bytesAvailable = buffer.length;
    }

    yield buffer[buffer.length - (bytesAvailable--)];
  }
}
