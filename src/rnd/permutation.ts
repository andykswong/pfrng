import { assert } from '../assert';
import { BitIterator } from '../types';
import { randomUint } from './integer';

/**
 * Returns random permutation for a list of items of given length, using Fisher-Yates algorithm.
 */
export function randomPermutation(randomBits: BitIterator, length: number): number[] {
  assert(Number.isInteger(length) && length >= 0, 'length must be non-negative integer');

  const result: number[] = new Array(length);
  for (let i = 0; i < length; ++i) {
    const j = randomUint(randomBits, i + 1);
    if (i !== j) {
      result[i] = result[j];
    }
    result[j] = i;
  }

  return result;
}

/**
 * Shuffle a data array in place using the given permutation.
 */
export function permute<T>(data: T[], permutation: number[]): T[] {
  assert(data.length === permutation.length, 'data and permutation array must be of the same length');

  for (let i = 0; i < data.length; ++i) {
    if (permutation[i] < 0) {
        // permutation[i] is already correct, negate to unmark
        permutation[i] = ~permutation[i];
        continue;
    }
    let obj = data[i];
    let j = permutation[i];
    while (j !== i) {
      [obj, data[j]] = [data[j], obj];
      // mark permutation[j] as correct by negating it
      [permutation[j], j] = [~permutation[j], permutation[j]];
    }
    data[i] = obj;
  }
  return data;
}
