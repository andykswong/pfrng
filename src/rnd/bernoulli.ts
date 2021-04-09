import { assert } from '../assert';
import { RandomBit } from './types';

/**
 * Bernoulli distribution of rational probability of success = k/n.
 * @see https://arxiv.org/pdf/1304.1916.pdf
 */
export function bernoulli(k: number, n: number): (randomBit: RandomBit) => boolean {
  assert(Number.isInteger(n)&& n > 0, 'n must be positive integer');
  assert(Number.isInteger(k) && k >= 0, 'k must be non-negative integer');

  if (k >= n) {
    return () => true;
  }

  return (randomBit) => {
    let v = k;
    let b = false;
  
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
    } while (!randomBit());

    return b;
  };
}
