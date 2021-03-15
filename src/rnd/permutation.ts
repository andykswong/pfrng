import { RandomUint } from './types';

/**
 * Random permutation of an array of given length, using Fisher-Yates algorithm.
 */
export function fisherYates(length: number): (randomUint: RandomUint) => number[] {
  if (!Number.isInteger(length) || length < 0) {
    throw new RangeError('length must be non-negative integer');
  }

  return (randomUint) => {
    const result: number[] = new Array(length);
    for (let i = 0; i < length; ++i) {
      const j = randomUint(i + 1);
      if (i !== j) {
        result[i] = result[j];
      }
      result[j] = i;
    }
    return result;
  };
}

export const randomPermutation = fisherYates;

/**
 * Shuffle an array in place using the given permutation.
 */
export function permute<T>(objs: T[], permutation: number[]): T[] {
  for (let i = 0; i < objs.length; ++i) {
    let obj = objs[i];
    let j = permutation[i];
    while (j != i) {
      [obj, objs[j]] = [objs[j], obj];
      [j, permutation[j]] = [permutation[j], j];
    }
    objs[i] = obj;
    permutation[i] = i;
  }
  return objs;
}
