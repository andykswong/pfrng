import { RandomBit } from './types';

/**
 * Bernoulli distribution of rational probability of success = k/n.
 * @see https://arxiv.org/pdf/1304.1916.pdf
 */
export function bernoulli(k: number, n: number): (randomBit: RandomBit) => boolean {
  if (!Number.isInteger(n) || !Number.isInteger(k) || n < 1 || k < 0) {
    throw new RangeError('k and n must be positive integers');
  } else if (k >= n) {
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
