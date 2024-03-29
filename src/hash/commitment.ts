import { toHex } from '../encoding';
import { Hash } from '../types';

/**
 * Returns the commitment of given salted message as a hash.
 */
export function commitment(hash: Hash, message: string, salt = ''): string {
  return toHex(hash(message + salt));
}
