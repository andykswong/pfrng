/**
 * Compute the hash of a given message.
 */
export type Hash = (message: string | Uint8Array) => Uint8Array;
