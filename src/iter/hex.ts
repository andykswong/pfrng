import { assert } from '../assert';
import { toHex } from '../encoding';
import type { NumberIterator, StringIterator } from '../types';

/**
 * Generates hex strings with given byte length from a byte iterator.
 */
export function* hexIter(byteIter: NumberIterator, byteLength: number): StringIterator {
  assert(Number.isInteger(byteLength) && byteLength > 0, 'byteLength must be positive integer');

  outer:
  for (; ;) {
    const bytes = new Uint8Array(byteLength);
    for (let i = 0; i < byteLength; ++i) {
      const result = byteIter.next();
      if (result.done) { // Not enough bits left
        break outer;
      }

      bytes[i] = result.value;
    }
    yield toHex(bytes);
  }
}

/**
 * Generates hex strings that looks like a SHA2/3-512 hash from a byte iterator.
 */
export function sha512Iter(byteIter: NumberIterator): StringIterator {
  return hexIter(byteIter, 512);
}
