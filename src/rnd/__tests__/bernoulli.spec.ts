import { bernoulli } from '../bernoulli';

describe('bernoulli', () => {
  test.each([[1, 0], [1, -1], [1, 1.5], [-1, 1], [1.2, 2]])(
    'throw on invalid inputs k = %p, n = %p',
    (k, n) => expect(() => bernoulli([].values(), k, n)).toThrow()
  );

  test.each([[3, 2], [5, 5]])(
    'given k = %p >= n = %p, always returns true',
    (k, n) => {
      expect(bernoulli([].values(), k, n)).toBe(true);
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
      expect(bernoulli(randomBits.values(), k, n)).toBe(expectedResult);
    }
  );
});
