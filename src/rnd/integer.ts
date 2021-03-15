import { RandomBit } from './types';

/**
 * Implementation of the fast dice roller algorithm.
 * Returns an integer which is uniformly drawn from [0, n).
 * @see https://arxiv.org/pdf/1304.1916.pdf
 */
export function fdr(n: number): (randomBit: RandomBit) => number {
  if (!Number.isInteger(n) || n < 1) {
    throw new RangeError('n must be positive integer');
  } else if (n === 1) {
    return () => 0;
  }

  return randomBit => {
    let v = 1;
    let c = 0;
  
    for (;;) {
      v *= 2;
      c = 2 * c + (randomBit() ? 1 : 0);
      if (v >= n) {
        if (c < n) {
          break;
        } else {
          v -= n;
          c -= n;
        }
      }
    }

    return c;
  };
}

/**
 * Returns an unsigned integer which is uniformly drawn from [0, n).
 */
export const randomUint = fdr;

/**
 * Returns an integer which is uniformly drawn from [min, max).
 */
export function randomInt(min: number, max: number): (randomBit: RandomBit) => number {
  if (!Number.isInteger(max) || !Number.isInteger(min) || max <= min) {
    throw new RangeError('max must be an integer greater than min');
  }

  const range = max - min;
  const randFn = fdr(range);

  return (randomBit) => (min + randFn(randomBit));
}
