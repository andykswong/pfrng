import { randomBit } from '../bit';

describe('randomBit', () => {
  const BITS = [1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1] as const;
  const BYTES = [0b10011101, 0b01100000] as const;

  it('should return bit sequence from random bytes', () => {
    const mockRandomByte = jest.fn();
    BYTES.forEach(mockRandomByte.mockReturnValueOnce);

    const fn = randomBit(mockRandomByte);
    for (let i = 0; i < BITS.length; ++i) {
      expect(fn()).toBe(!!BITS[i]);
      expect(mockRandomByte).toBeCalledTimes((1 + i/8)|0);
    }
  });
});
