import type { RandomByte } from './types';

const BYTE_SIZE = 256;

/**
 * A PRNG function that relies on `Math.random` method to generate random bytes
 */
export const mathRandomByte: RandomByte = () => Math.floor(Math.random() * BYTE_SIZE);
