import { randomHex } from '../hex';

describe('randomHex', () => {
  test.each([-1, 1.5])(
    'throw on invalid inputs byteLength = %p',
    (byteLength) => expect(() => randomHex(byteLength)).toThrow()
  );

  test.each([
    [0, [0x01, 0x02], ''],
    [1, [0xab, 0xcd], 'ab'],
    [3, [0x01, 0xcc, 0x70], '01cc70'],
  ])(
    'given byteLength = %p, random bytes = %p, returns %p',
    (byteLength, randomBytes, expectedResult) => {
      const mockRandomByte = jest.fn();
      randomBytes.forEach(mockRandomByte.mockReturnValueOnce);
      expect(randomHex(byteLength)(mockRandomByte)).toBe(expectedResult);
      expect(mockRandomByte).toBeCalledTimes(byteLength);
    }
  );
});
