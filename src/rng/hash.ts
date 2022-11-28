import type { Hash, NumberIterator } from '../types';

/**
 * The state of a hash-based random bytes iterator.
 */
export interface RandomBytesFromHashState {
  /** Total number of bytes to generate. */
  length: number;

  /** Current nonce. */
  nonce?: number;

  /** Current hash bytes consumed. */
  index?: number;
}

/**
 * A deterministic PRNG that generates a random byte iterator from hashes of a seed.
 * @see https://www.stat.berkeley.edu/~stark/Java/Html/sha256Rand.htm
 */
export function* randomBytesFromHash(
  hash: Hash, seed: string, state: RandomBytesFromHashState = { length: Infinity }
): NumberIterator {
  const hashFn = () => hash(`${seed}${state.nonce ? `,${state.nonce}` : ''}`);
  let buffer = hashFn();

  while (state.length > 0) {
    --state.length;
    const index = state.index = state.index || 0;

    if (index >= buffer.length) {
      state.nonce = (state.nonce || 0) + ((index / buffer.length) | 0);
      state.index = index % buffer.length;
      buffer = hashFn();
    }

    yield buffer[state.index++];
  }
}
