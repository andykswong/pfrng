import { mathRandomByte } from '../math-random';

jest.spyOn(global.Math, 'random');

describe('mathRandomByte', () => {
  it('should return random byte from Math.random', () => {
    (Math.random as jest.Mock).mockReturnValueOnce(0.17);
    expect(mathRandomByte()).toBe(43); // floor(0.17 * 256) = 43
  });
});
