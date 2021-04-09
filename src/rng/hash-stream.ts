import { Hash } from '../hash';
import { RandomByte } from './types';

/**
 * The internal state of the hash stream.
 */
export interface RandomByteFromHashState {
  /** Current nonce. */
  n: number;
  /** Current hash bytes consumed. */
  b: number;
}

/**
 * Generator of random bytes from hash stream.
 */
export interface RandomByteFromHash extends RandomByte {
  /**
   * The readonly internal state of the hash stream.
   */
  readonly state: Readonly<RandomByteFromHashState>;
}

/**
 * A deterministic PRNG that generates random byte stream from hashes of a seed.
 * @see https://www.stat.berkeley.edu/~stark/Java/Html/sha256Rand.htm
 */
export function randomByteFromHash(
  hash: Hash, seed: string, state?: Partial<RandomByteFromHashState>
): RandomByteFromHash {
  const stateObj: RandomByteFromHashState = {
    n: state?.n || 0,
    b: state?.b || 0
  };
  const hashFn = () => hash(`${seed}${stateObj.n ? `,${stateObj.n}` : ''}`);
  let buffer = hashFn();

  const randFn = () => {
    if ((stateObj.b >= buffer.length)) {
      stateObj.n += Math.floor(stateObj.b / buffer.length);
      stateObj.b %= buffer.length;
      buffer = hashFn();
    }
    return buffer[stateObj.b++];
  };
  randFn.state = stateObj;

  return randFn;
}
