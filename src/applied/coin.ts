import { RandomBit } from '../rnd';

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
export function flipCoin(randomBit: RandomBit): CoinSide {
  return randomBit() ? CoinSide.Head : CoinSide.Tail;
}
