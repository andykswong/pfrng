import jsSHA from 'jssha/dist/sha512';
import { Hash } from '../types';

function hash(message: string | Uint8Array, algorithm: 'SHA-384' | 'SHA-512' = 'SHA-512'): Uint8Array {
  const shaObj = (message instanceof Uint8Array) ?
    new jsSHA(algorithm, 'UINT8ARRAY') :
    new jsSHA(algorithm, 'TEXT', { encoding: 'UTF8' });

  shaObj.update(message);

  return shaObj.getHash('UINT8ARRAY');
}

/**
 * Compute the SHA-512 hash of a given message.
 */
export const sha512: Hash = hash;

/**
 * Compute the SHA-384 hash of a given message.
 */
export const sha384: Hash = (message: string | Uint8Array) => hash(message, 'SHA-384');
