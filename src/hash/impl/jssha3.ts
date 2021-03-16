import jsSHA from 'jssha/dist/sha3';
import { Hash } from '../types';

function hash(message: string | Uint8Array, algorithm: 'SHA3-384' | 'SHA3-512' = 'SHA3-512'): Uint8Array {
  const shaObj = (message instanceof Uint8Array) ?
    new jsSHA(algorithm, 'UINT8ARRAY') :
    new jsSHA(algorithm, 'TEXT', { encoding: 'UTF8' });

  shaObj.update(message);

  return shaObj.getHash('UINT8ARRAY');
}

/**
 * Compute the SHA3-512 hash of a given message.
 */
export const jssha3_512: Hash = hash;

/**
 * Compute the SHA3-384 hash of a given message.
 */
export const jssha3_384: Hash = (message: string | Uint8Array) => hash(message, 'SHA3-384');
