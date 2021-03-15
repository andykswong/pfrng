import { RandomByte } from '../rng';
import { RandomBit } from './types';

const BYTE_BITS = 8;

/**
 * Returns a random boolean at 50/50 chance.
 */
export function randomBit(randomByte: RandomByte): RandomBit {
  let bitAvailable = 0;
  let bits = 0;
  return () => {
    if (bitAvailable <= 0) {
      bits = randomByte();
      bitAvailable = BYTE_BITS;
    }
    return !!(bits & (1 << (--bitAvailable)));
  };
}
