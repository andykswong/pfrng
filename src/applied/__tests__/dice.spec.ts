import { randomUint } from '../../rnd';
import { roller } from '../dice';

jest.mock('../../rnd');

describe('diceRoller', () => {
  const mockRandomBit = jest.fn();

  test.each([0, 2.5, -3])(
    'throw on non positive integer inputs of %p',
    (sides) => expect(() => roller(sides)).toThrow()
  );

  test.each([[6, 0, 1], [6, 5, 6], [10, 3, 4]])(
    'given diceRoller of %p sides and generated random number of %p, returns %p',
    (sides, rand, expectedResult) => {
      const mockRandomUint = jest.fn();
      (randomUint as jest.Mock).mockReturnValueOnce(mockRandomUint);
      mockRandomUint.mockReturnValueOnce(rand);

      const rollerFn = roller(sides);
      const result = rollerFn(mockRandomBit);

      expect(result).toBe(expectedResult);
      expect(randomUint).toBeCalledWith(sides);
      expect(mockRandomUint).toBeCalledWith(mockRandomBit);
    }
  );
});
