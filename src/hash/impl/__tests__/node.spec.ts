import { HashData } from '../../../test/data';
import { toHex } from '../../../encoding';
import { sha384, sha512, sha3_384, sha3_512 } from '../node';

describe('nodejs hash', () => {
  test.each(HashData.SHA384)(
    'given message = %p, sha384 returns %p',
    (message, expectedResult) => {
      expect(toHex(sha384(message))).toBe(expectedResult);
    }
  );

  test.each(HashData.SHA512)(
    'given message = %p, sha512 returns %p',
    (message, expectedResult) => {
      expect(toHex(sha512(message))).toBe(expectedResult);
    }
  );

  test.each(HashData.SHA3_384)(
    'given message = %p, sha3_384 returns %p',
    (message, expectedResult) => {
      expect(toHex(sha3_384(message))).toBe(expectedResult);
    }
  );

  test.each(HashData.SHA3_512)(
    'given message = %p, sha3_512 returns %p',
    (message, expectedResult) => {
      expect(toHex(sha3_512(message))).toBe(expectedResult);
    }
  );
});
