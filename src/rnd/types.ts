/**
 * Generator of random bits.
 * @returns true/false at 50/50 chance
 */
export type RandomBit = () => boolean;

/**
 * Generator of random unsigned integer.
 * @param range the value range
 * @returns unsigned value of range [0, range) from uniform distribution
 */
export type RandomUint = (range: number) => number;
