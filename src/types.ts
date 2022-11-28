/**
 * Computes the hash of a given message.
 */
export type Hash = (message: string | Uint8Array) => Uint8Array;

/**
 * A stream of bits.
 */
export type BitIterator = IterableIterator<boolean>;

/**
 * A stream of numbers.
 */
export type NumberIterator = IterableIterator<number>;

/**
 * A stream of strings.
 */
 export type StringIterator = IterableIterator<string>;
