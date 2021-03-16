import { RandomBit, randomUint } from '../rnd';

/**
 * Return a dice roller.
 */
export function diceRoller(sides: number): (randomBit: RandomBit) => number {
  console.assert(Number.isInteger(sides) && sides > 0, 'sides must be positive integer');
  const urand = randomUint(sides);
  return (randomBit) => urand(randomBit) + 1;
}

/** Return a 4 sided dice roller. */
export const d4 = diceRoller.bind(null, 4);

/** Return a 6 sided dice roller. */
export const d6 = diceRoller.bind(null, 6);

/** Return a 8 sided dice roller. */
export const d8 = diceRoller.bind(null, 8);

/** Return a 10 sided dice roller. */
export const d10 = diceRoller.bind(null, 10);

/** Return a 12 sided dice roller. */
export const d12 = diceRoller.bind(null, 12);

/** Return a 20 sided dice roller. */
export const d20 = diceRoller.bind(null, 20);
