import { randomUint, randomInt } from '../integer';

describe('randomUint', () => {
  test.each([0, -1, 2.5])(
    'throw on invalid input n = %p',
    (n) => expect(() => randomUint([].values(), n)).toThrow()
  );

  test.each([
    [1, [], 0],
    [2, [false], 0],
    [2, [true], 1],
    [3, [false, false], 0],
    [3, [false, true], 1],
    [3, [true, false], 2],
    [3, [true, true, false, false], 0],
    [3, [true, true, false, true], 1],
    [3, [true, true, true, false], 2],
  ])(
    'given n = %p, random bits = %p, returns %p',
    (n, randomBits, expectedResult) => {
      expect(randomUint(randomBits.values(), n)).toBe(expectedResult);
    }
  );
});

describe('randomInt', () => {
  test.each([[1, 2.5], [1.5, 2], [1, 1], [3, 2]])(
    'throw on invalid input min = %p, max = %p',
    (min, max) => expect(() => randomInt([].values(), min, max)).toThrow()
  );

  test.each([
    [-1, 0, [], -1],
    [3, 6, [true, false], 5],
    [-2, 1, [true, true, false, false], -2],
  ])(
    'given min = %p, max = %p, random bits = %p, returns %p',
    (min, max, randomBits, expectedResult) => {
      expect(randomInt(randomBits.values(), min, max)).toBe(expectedResult);
    }
  );
});
