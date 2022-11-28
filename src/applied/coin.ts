import { assert } from '../assert';
import { BitIterator } from '../types';

/**
 * Result of a coin flip.
 */
export enum CoinSide {
  Head = 1,
  Tail = 0
}

/**
 * Flip a coin.
 */
export function flipCoin(randomBits: BitIterator): CoinSide {
  const result = randomBits.next();
  assert(!result.done, 'not enough random bits');
  return result.value ? CoinSide.Head : CoinSide.Tail;
}
