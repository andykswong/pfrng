import { jest } from '@jest/globals';
import { RandomBit } from '../../rnd';
import { roller } from '../dice';

describe('diceRoller', () => {
  test.each([0, 2.5, -3])(
    'throw on non positive integer inputs of %p',
    (sides) => expect(() => roller(sides)).toThrow()
  );

  test.each([
    [6, [false, false, false], 1],
    [6, [true, false, true], 6],
    [10, [false, false, true, true], 4]
  ])(
    'given diceRoller of %p sides and generated random number of %p, returns %p',
    (sides, randomBits, expectedResult) => {
      const mockRandomBit = jest.fn();
      randomBits.forEach(mockRandomBit.mockReturnValueOnce);

      const rollerFn = roller(sides);
      const result = rollerFn(mockRandomBit as RandomBit);

      expect(result).toBe(expectedResult);
    }
  );
});
