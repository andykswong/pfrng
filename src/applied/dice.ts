import { assert } from '../assert';
import { randomUint } from '../rnd';
import { BitIterator } from '../types';

/**
 * A dice roller.
 */
export function rollDice(randomBits: BitIterator, sides: number): number {
  assert(Number.isInteger(sides) && sides > 0, 'sides must be positive integer');
  return randomUint(randomBits, sides) + 1;
}
