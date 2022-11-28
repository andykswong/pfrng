import { jest } from '@jest/globals';
import { bernoulli } from '../bernoulli';
import { RandomBit } from '../types';

describe('bernoulli', () => {
  test.each([[1, 0], [1, -1], [1, 1.5], [-1, 1], [1.2, 2]])(
    'throw on invalid inputs k = %p, n = %p',
    (k, n) => expect(() => bernoulli(k, n)).toThrow()
  );

  test.each([[3, 2], [5, 5]])(
    'given k = %p >= n = %p, always returns true',
    (k, n) => {
      const mockRandomBit = jest.fn();
      expect(bernoulli(k, n)(mockRandomBit as RandomBit)).toBe(true);
      expect(mockRandomBit).not.toBeCalled();
    }
  );

  test.each([
    [0, 5, [], false],
    [1, 2, [true], true],
    [1, 2, [false], false],
    [1, 3, [false, false, true], false],
    [1, 3, [false, false, false, true], true],
    [3, 4, [true], true],
    [3, 4, [false, true], true],
    [3, 4, [false, false], false],
  ])(
    'given k = %p, n = %p, random bits = %p, returns %p',
    (k, n, randomBits, expectedResult) => {
      const mockRandomBit = jest.fn();
      randomBits.forEach(mockRandomBit.mockReturnValueOnce);
      expect(bernoulli(k, n)(mockRandomBit as RandomBit)).toBe(expectedResult);
      expect(mockRandomBit).toBeCalledTimes(randomBits.length);
    }
  );
});
