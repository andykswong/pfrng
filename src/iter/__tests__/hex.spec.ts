import { hexIter } from '../hex';

describe('hexIter', () => {
  test.each([
    [0],
    [-1],
    [1.5]
  ])(
    'throw on invalid inputs byteLength = %p',
    (byteLength) => {
      expect(() => Array.from(hexIter([].values(), byteLength))).toThrow()
    }
  );

  test.each([
    [1, [0xab, 0xcd], ['ab', 'cd']],
    [3, [0x01, 0xcc, 0x70], ['01cc70']],
  ])(
    'given byteLength = %p, random bytes = %p, returns %p',
    (byteLength, randomBytes, expectedResult) => {
      const iter = hexIter(randomBytes.values(), byteLength);
      expect(Array.from(iter)).toStrictEqual(expectedResult);
    }
  );
});
