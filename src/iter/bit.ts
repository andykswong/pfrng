import type { BitIterator, NumberIterator } from '../types';

const BYTE_BITS = 8;

/**
 * Iterator adaptor that, given a byte stream, iterates through each bit of it.
 */
export function* bitIter(byteIter: NumberIterator): BitIterator {
  for (const byte of byteIter) {
    for (let bitAvailable = BYTE_BITS; bitAvailable > 0; --bitAvailable) {
      yield !!(byte & (1 << (bitAvailable - 1)));
    }
  }
}
