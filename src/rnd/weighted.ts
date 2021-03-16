import { RandomBit } from './types';

/**
 * Implementation of the fast loaded dice roller algorithm.
 * Given positive integers weights[i], returns random integer i with probability (weight[i]s / sum(weights)).
 * @see https://arxiv.org/pdf/2003.03830.pdf
 */
export function fldr(weights: number[]): (randomBit: RandomBit) => number {
  const n = weights.length;
  const a: number[] = new Array(n + 1);
  let m = 0;

  for (let i = 0; i < n; ++i) {
    a[i] = weights[i];
    console.assert(Number.isInteger(a[i]) && a[i] >= 0, 'weights must be non-negative integers');
    m += a[i];
  }

  console.assert(m > 0, 'weight array must contain at least 1 positive integer');

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

  return randomBit => {
    let d = 0;
    let c = 0;

    for (; ;) {
      d = 2 * d + (1 - (randomBit() ? 1 : 0));
      if (d < h[c].length) {
        if (h[c][d] < n) {
          break;
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

/**
 * Returns a random choice from items of given positive integer weights
 */
export const randomChoice = fldr;
