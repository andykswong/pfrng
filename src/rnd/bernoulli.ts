import { assert } from '../assert';
import { BitIterator } from '../types';

/**
 * Bernoulli distribution of rational probability of success = k/n.
 * @see https://arxiv.org/pdf/1304.1916.pdf
 */
export function bernoulli(randomBits: BitIterator, k: number, n: number): boolean {
  assert(Number.isInteger(n) && n > 0, 'n must be positive integer');
  assert(Number.isInteger(k) && k >= 0, 'k must be non-negative integer');

  if (k >= n) { // handles edge case where k/n >= 1 (always success)
    return true;
  }

  let v = k;
  let b = false;

  let done = false;
  do {
    v *= 2;
    if (v >= n) {
      v -= n;
      b = true;
    } else if (v === 0) {
      return false;
    } else {
      b = false;
    }

    const result = randomBits.next();
    assert(!result.done, 'not enough random bits');
    done = result.done || result.value;
  } while (!done);

  return b;
}
