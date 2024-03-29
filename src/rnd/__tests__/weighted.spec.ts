import { randomChoice } from '../weighted';

describe('randomChoice', () => {
  test.each([[[]], [[1, -1]], [[0, 1]]])(
    'throw on invalid weights = %p',
    (weights) => expect(() => randomChoice(weights)).toThrow()
  );

  test.each([
    [[1], [], 0],
    [[1, 1], [true], 0],
    [[2, 2], [false], 1],
    [[1, 3], [true], 1],
    [[1, 3], [false, true], 0],
    [[1, 1, 1], [false, true], 2],
    [[1, 1, 1], [true, true], 0],
    [[1, 1, 1], [false, false, true, true], 0],
  ])(
    'given weights = %p, random bits = %p, returns %p',
    (weights, randomBits, expectedResult) => {
      expect(randomChoice(weights)(randomBits.values())).toBe(expectedResult);
    }
  );
});
