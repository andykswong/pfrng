import { assert } from '../assert';
import { RandomBit } from './types';

/**
 * Implementation of the fast dice roller algorithm.
 * Returns an integer which is uniformly drawn from [0, n).
 * @see https://arxiv.org/pdf/1304.1916.pdf
 * @internal
 */
export function fdr(n: number): (randomBit: RandomBit) => number {
  assert(Number.isInteger(n) && n > 0, 'n must be positive integer');

  if (n === 1) {
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
 * @see https://arxiv.org/pdf/1304.1916.pdf
 */
export const randomUint = fdr;

/**
 * Returns an integer which is uniformly drawn from [min, max).
 * @see https://arxiv.org/pdf/1304.1916.pdf
 */
export function randomInt(min: number, max: number): (randomBit: RandomBit) => number {
  assert(
    Number.isInteger(max) && Number.isInteger(min) && min < max,
    'max must be an integer greater than min'
  );

  const range = max - min;
  const randFn = randomUint(range);

  return (randomBit) => (min + randFn(randomBit));
}
