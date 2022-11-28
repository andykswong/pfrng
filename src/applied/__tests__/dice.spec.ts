import { rollDice } from '../dice';

describe('rollDice', () => {
  test.each([0, 2.5, -3])(
    'throw on non positive integer inputs of %p',
    (sides) => expect(() => rollDice([].values(), sides)).toThrow()
  );

  test.each([
    [6, [false, false, false], 1],
    [6, [true, false, true], 6],
    [10, [false, false, true, true], 4]
  ])(
    'given dice of %p sides and generated random number of %p, returns %p',
    (sides, randomBits, expectedResult) => {
      expect(rollDice(randomBits.values(), sides)).toBe(expectedResult);
    }
  );
});
