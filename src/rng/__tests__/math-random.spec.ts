import { jest } from '@jest/globals';
import { mathRandomBytes } from '../math-random';

jest.spyOn(global.Math, 'random');

describe('mathRandomBytes', () => {
  it('should return random bytes from Math.random', () => {
    jest.mocked(Math.random)
      .mockReturnValueOnce(0.17)
      .mockReturnValueOnce(0.3);
    
    const expected = [
      43, // floor(0.17 * 256) = 43
      76, // floor(0.3 * 256) = 76
    ];

    expect(Array.from(mathRandomBytes(2))).toStrictEqual(expected);
  });
});
