import { assert } from '../assert';
import type { BitIterator } from '../types';

/**
 * Returns an unsigned integer which is uniformly drawn from [0, n).
 * This implements the fast dice roller algorithm.
 * @see https://arxiv.org/pdf/1304.1916.pdf
 */
export function randomUint(randomBits: BitIterator, n: number): number {
  assert(Number.isInteger(n) && n > 0, 'n must be positive integer');

  if (n <= 1) { // handles edge case of 0 range
    return 0;
  }

  let v = 1;
  let c = 0;

  let done = false;
  while (!done) {
    const result = randomBits.next();
    assert(!(done = !!result.done), 'not enough random bits');

    v *= 2;
    c = 2 * c + (result.value ? 1 : 0);
    if (v >= n) {
      if (c < n) {
        done = true;
      } else {
        v -= n;
        c -= n;
      }
    }
  }

  return c;
}

/**
 * Returns an integer which is uniformly drawn from [min, max).
 */
export function randomInt(randomBits: BitIterator, min: number, max: number): number {
  assert(
    Number.isInteger(max) && Number.isInteger(min) && min < max,
    'max must be an integer greater than min'
  );

  const range = max - min;
  return min + randomUint(randomBits, range);
}
