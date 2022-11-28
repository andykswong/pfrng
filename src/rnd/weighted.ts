import { assert } from '../assert';
import { BitIterator } from '../types';

/**
 * Returns a random choice `i` from items of given positive integer `weights[i]`
 * with probability `weights[i] / sum(weights)`.
 * This implements the fast loaded dice roller algorithm.
 * @see https://arxiv.org/pdf/2003.03830.pdf
 */
export function randomChoice(weights: number[]): (randomBits: BitIterator) => number {
  const n = weights.length;
  assert(n > 0, 'weights must not be empty');

  if (n <= 1) { // handles edge case of 1 choice
    return () => 0;
  }

  const a: number[] = new Array(n + 1);
  let m = 0;

  for (let i = 0; i < n; ++i) {
    a[i] = weights[i];
    assert(Number.isInteger(a[i]) && a[i] > 0, 'weights must be positive integers');
    m += a[i];
  }

  const k = Math.ceil(Math.log2(m));
  a[n] = 2 ** k - m;

  const h: number[][] = new Array(k);  // FLDR DDG tree. Stores leaf node labels at each level
  for (let j = 0; j < k; ++j) {
    h[j] = [];
    for (let i = 0; i < a.length; ++i) {
      if (a[i] & (1 << (k - 1 - j))) {
        h[j].push(i);
      }
    }
  }

  return randomBits => {
    let d = 0;
    let c = 0;

    let done = false;
    while (!done) {
      const result = randomBits.next();
      assert(!(done = !!result.done), 'not enough random bits');

      d = 2 * d + (1 - (result.value ? 1 : 0));
      if (d < h[c].length) {
        if (h[c][d] < n) {
          done = true;
        } else {  // Out of range, restart
          d = 0;
          c = 0;
        }
      } else {  // Go to next level of tree
        d -= h[c].length;
        c += 1;
      }
    }

    return h[c][d];
  };
}
