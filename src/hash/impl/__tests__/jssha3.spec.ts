import { HashData } from './data';
import { toHex } from '../../../encoding';
import { sha3_512, sha3_384 } from '../jssha3';

describe('nodejs hash', () => {
  test.each(HashData.SHA3_384)(
    'given message = %p, jssha3_384 returns %p',
    (message, expectedResult) => {
      expect(toHex(sha3_384(message))).toBe(expectedResult);
    }
  );

  test.each(HashData.SHA3_512)(
    'given message = %p, jssha3_512 returns %p',
    (message, expectedResult) => {
      expect(toHex(sha3_512(message))).toBe(expectedResult);
    }
  );
});
