import { HashData } from '../../../test/data';
import { toHex } from '../../../encoding';
import { sha512, sha384 } from '../jssha512';

describe('nodejs hash', () => {
  test.each(HashData.SHA384)(
    'given message = %p, jssha384 returns %p',
    (message, expectedResult) => {
      expect(toHex(sha384(message))).toBe(expectedResult);
    }
  );

  test.each(HashData.SHA512)(
    'given message = %p, jssha512 returns %p',
    (message, expectedResult) => {
      expect(toHex(sha512(message))).toBe(expectedResult);
    }
  );
});
